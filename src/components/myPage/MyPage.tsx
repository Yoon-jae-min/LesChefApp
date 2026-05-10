import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Image, Linking, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FilterTabs from '../common/FilterTabs';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { API_CONFIG, getGoogleLoginUrl, getKakaoLoginUrl, getNaverLoginUrl } from '../../config/apiConfig';
import { fetchUserInfo } from '../../api/auth/user';
import { getAccessToken } from '../../api/tokenStorage';
import { unlinkSocial, type SocialProvider } from '../../api/auth/socialLink';
import { fetchMyRecipeList, fetchWishRecipeList } from '../../api/recipe/queries';
import type { RecipeListItem } from '../../types/apiRecipe';
import type { UserInfoResponse } from '../../api/auth/types';
import {
  getNotificationSettings,
  saveNotificationSettings,
  type NotificationSettings,
} from '../../utils/notificationSettings';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import MyPageLayout, { type MyPageTabLabel } from './MyPageLayout';

type StoredUser = {
  id?: string;
  name?: string;
  nickName?: string;
  tel?: string;
};

type SocialProviderConfig = {
  provider: SocialProvider;
  label: string;
  linkedKey: 'kakaoLinked' | 'googleLinked' | 'naverLinked';
};

const SOCIAL_PROVIDERS: SocialProviderConfig[] = [
  { provider: 'kakao', label: 'Kakao', linkedKey: 'kakaoLinked' },
  { provider: 'google', label: 'Google', linkedKey: 'googleLinked' },
  { provider: 'naver', label: 'Naver', linkedKey: 'naverLinked' },
];

type StorageZone = '냉장실' | '냉동실' | '야채칸' | '실온';

const STORAGE_ZONES: StorageZone[] = ['냉장실', '냉동실', '야채칸', '실온'];

const SAMPLE_INVENTORY: Record<StorageZone, Array<{ id: string; name: string; amount: string; dday: string }>> = {
  냉장실: [
    { id: '1', name: '방울토마토', amount: '1팩', dday: 'D-3' },
    { id: '2', name: '두부', amount: '2모', dday: 'D-1' },
  ],
  냉동실: [{ id: '3', name: '닭가슴살', amount: '5팩', dday: 'D-30' }],
  야채칸: [{ id: '4', name: '양파', amount: '3개', dday: 'D-7' }],
  실온: [{ id: '5', name: '감자', amount: '6개', dday: 'D-5' }],
};

function resolveUrl(u?: string) {
  if (!u) return undefined;
  if (u.startsWith('http')) return u;
  return `${API_CONFIG.BASE_URL}${u.startsWith('/') ? '' : '/'}${u}`;
}

function hasSuccessfulSocialLink(url: string): boolean {
  return url.startsWith('leschefapp://social/callback') && url.includes('linkStatus=success');
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  count,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  count?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionHeaderText}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {count ? (
        <View style={styles.countPill}>
          <Text style={styles.countPillText}>{count}</Text>
        </View>
      ) : null}
    </View>
  );
}

function EmptyBox({ children }: { children: string }) {
  return (
    <View style={styles.emptyBox}>
      <Text style={styles.emptyText}>{children}</Text>
    </View>
  );
}

function InfoContent() {
  const [user, setUser] = useState<StoredUser & Partial<UserInfoResponse>>({});
  const [loadingUser, setLoadingUser] = useState(false);
  const [linkingProvider, setLinkingProvider] = useState<SocialProvider | null>(null);

  const loadUser = async () => {
    setLoadingUser(true);
    try {
      const data = await fetchUserInfo();
      setUser(data);
      await AsyncStorage.setItem(
        STORAGE_KEYS.CURRENT_USER,
        JSON.stringify({
          id: data.id,
          name: data.name,
          nickName: data.nickName,
          tel: data.tel,
        }),
      );
    } catch (error) {
      console.error('사용자 정보 로드 실패:', error);
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      setUser(raw ? JSON.parse(raw) : {});
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener('url', ({ url }) => {
      if (hasSuccessfulSocialLink(url)) {
        loadUser();
      }
    });
    return () => subscription.remove();
  }, []);

  const nickname = user.nickName || user.name || 'user';

  const openSocialLink = async (provider: SocialProvider) => {
    setLinkingProvider(provider);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        Alert.alert('로그인 필요', '소셜 계정 연동은 로그인 후 이용할 수 있습니다.');
        return;
      }

      const url =
        provider === 'kakao'
          ? getKakaoLoginUrl('link', accessToken)
          : provider === 'google'
            ? getGoogleLoginUrl('link', accessToken)
            : getNaverLoginUrl('link', accessToken);
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('연동 실패', error instanceof Error ? error.message : '소셜 계정 연동을 시작하지 못했습니다.');
    } finally {
      setLinkingProvider(null);
    }
  };

  const handleUnlink = (provider: SocialProvider) => {
    Alert.alert('연동 해제', '계정 연동을 해제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '해제',
        style: 'destructive',
        onPress: async () => {
          setLinkingProvider(provider);
          try {
            await unlinkSocial(provider);
            Alert.alert('연동 해제', '계정 연동이 해제되었습니다.');
            await loadUser();
          } catch (error) {
            Alert.alert('연동 해제 실패', error instanceof Error ? error.message : '연동 해제에 실패했습니다.');
          } finally {
            setLinkingProvider(null);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.stack}>
      <View style={[styles.profileCard, shadows.card]}>
        {loadingUser ? <ActivityIndicator color={colors.orange600} /> : null}
        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{nickname.slice(0, 1).toUpperCase()}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.eyebrow}>Profile</Text>
            <Text style={styles.profileName}>{nickname}</Text>
            <Text style={styles.subtitle}>나의 LesChef 요리 여정</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          {[
            ['ID', user.id],
            ['Name', user.name],
            ['Nickname', user.nickName],
            ['Tel', user.tel],
          ].map(([label, value]) => (
            <View key={label} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{label}</Text>
              <Text style={styles.infoValue}>{value || '-'}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, shadows.card]}>
        <SectionHeader eyebrow="Account Link" title="소셜 계정 연동" />
        {SOCIAL_PROVIDERS.map((item) => {
          const linked = Boolean(user[item.linkedKey]);
          const isBusy = linkingProvider === item.provider;
          return (
          <View key={item.provider} style={styles.socialRow}>
            <View>
              <Text style={styles.socialName}>{item.label}</Text>
              <Text style={styles.subtitle}>{linked ? '연동됨' : '아직 연동되지 않았어요'}</Text>
            </View>
            <Pressable
              disabled={isBusy}
              style={[styles.orangePill, linked && styles.unlinkPill, isBusy && styles.disabledPill]}
              onPress={() => (linked ? handleUnlink(item.provider) : openSocialLink(item.provider))}
            >
              <Text style={[styles.orangePillText, linked && styles.unlinkPillText]}>
                {isBusy ? '처리 중' : linked ? '해제' : '연동하기'}
              </Text>
            </Pressable>
          </View>
          );
        })}
      </View>

      <View style={[styles.card, shadows.card]}>
        <SectionHeader eyebrow="Inventory Alert" title="기한 임박 물품" count="0 items" />
        <EmptyBox>아직 임박한 재료가 없어요. 재료를 추가하면 여기에서 바로 확인할 수 있어요.</EmptyBox>
      </View>
    </View>
  );
}

function StorageContent() {
  const [activePlace, setActivePlace] = useState<StorageZone>('냉장실');
  const items = SAMPLE_INVENTORY[activePlace];

  return (
    <View style={styles.stack}>
      <View style={[styles.card, shadows.card]}>
        <SectionHeader
          eyebrow="My Fridge"
          title="보관 재료 인벤토리"
          subtitle="재료가 얼마나 남았는지, 언제 써야 하는지 한눈에 확인하세요."
          count={`${items.length} items`}
        />
        <FilterTabs
          items={STORAGE_ZONES}
          activeItem={activePlace}
          onItemChange={(item) => setActivePlace(item as StorageZone)}
          variant="gray"
        />
      </View>

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.id} style={[styles.storageCard, shadows.card]}>
            <Text style={styles.eyebrow}>Ingredient</Text>
            <Text style={styles.itemTitle}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.amount}</Text>
            <View style={styles.orangePill}>
              <Text style={styles.orangePillText}>{item.dday}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function NotificationContent({ activeTab }: { activeTab: MyPageTabLabel }) {
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    if (activeTab !== '알림 설정') {
      return;
    }
    getNotificationSettings().then(setSettings);
  }, [activeTab]);

  const patch = async (partial: Partial<NotificationSettings>) => {
    if (!settings) return;
    const next = { ...settings, ...partial };
    setSettings(next);
    await saveNotificationSettings(partial);
  };

  if (activeTab === '알림 설정') {
    return (
      <View style={[styles.card, shadows.card]}>
        <SectionHeader
          eyebrow="Notification"
          title="알림 설정"
          subtitle="유통기한 알림 기준과 표시 방식을 조정해요."
        />
        {settings ? (
          <View style={styles.stackSmall}>
            {[
              ['알림 사용', 'enabled'],
              ['만료 표시', 'showExpired'],
              ['1일 전', 'showUrgent'],
              ['3일 전', 'showWarning'],
              ['7일 전', 'showNotice'],
            ].map(([label, key]) => (
              <View key={key} style={styles.settingRow}>
                <Text style={styles.settingLabel}>{label}</Text>
                <Switch
                  value={Boolean(settings[key as keyof NotificationSettings])}
                  onValueChange={(value) => patch({ [key]: value } as Partial<NotificationSettings>)}
                  thumbColor={Boolean(settings[key as keyof NotificationSettings]) ? colors.orange600 : colors.white}
                  trackColor={{ false: colors.stone200, true: colors.orange200 }}
                />
              </View>
            ))}
          </View>
        ) : (
          <ActivityIndicator color={colors.orange600} />
        )}
      </View>
    );
  }

  return (
    <View style={[styles.card, shadows.card]}>
      <SectionHeader
        eyebrow="Inventory Alert"
        title="유통기한 알림 기록"
        subtitle="웹과 동일하게 로컬에 쌓인 알림 기록을 확인합니다."
        count="0 items"
      />
      <EmptyBox>기록이 없습니다.</EmptyBox>
    </View>
  );
}

function RecipeContent({ activeTab }: { activeTab: MyPageTabLabel }) {
  const navigation = useNavigation();
  const [list, setList] = useState<RecipeListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data =
          activeTab === '찜 레시피'
            ? await fetchWishRecipeList()
            : await fetchMyRecipeList();
        const nextList = activeTab === '찜 레시피' ? data.wishList || [] : data.list || [];
        if (!cancelled) setList(nextList);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : '불러오지 못했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (activeTab === '찜 레시피' || activeTab === '나의 레시피') {
      load();
    }
    return () => {
      cancelled = true;
    };
  }, [activeTab]);

  return (
    <View style={[styles.card, shadows.card]}>
      <SectionHeader
        eyebrow={activeTab === '찜 레시피' ? 'Favorites' : 'My Recipes'}
        title={activeTab}
        subtitle="레시피 탭 안에서 아래 콘텐츠만 바뀌도록 구성했어요."
        count={`${list.length} items`}
      />
      {loading ? <ActivityIndicator color={colors.orange600} /> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.stackSmall}>
        {list.map((recipe) => {
          const id = recipe._id || recipe.recipeName;
          const uri = resolveUrl(recipe.recipeImg);
          return (
            <Pressable
              key={id}
              style={styles.recipeRow}
              onPress={() =>
                (navigation as any).navigate('Recipe', {
                  screen: 'RecipeDetail',
                  params: { id, recipeName: recipe.recipeName },
                })
              }
            >
              {uri ? <Image source={{ uri }} style={styles.thumb} /> : <View style={[styles.thumb, styles.thumbEmpty]} />}
              <View style={styles.recipeText}>
                <Text style={styles.itemTitle}>{recipe.recipeName}</Text>
                <Text style={styles.subtitle}>{recipe.subCategory || recipe.majorCategory || '카테고리 없음'}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
      {!loading && !error && list.length === 0 ? (
        <EmptyBox>{activeTab === '찜 레시피' ? '찜한 레시피가 없습니다.' : '등록한 레시피가 없습니다.'}</EmptyBox>
      ) : null}
    </View>
  );
}

function MyPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<MyPageTabLabel>('내 정보');

  const content = useMemo(() => {
    if (activeTab === '내 정보') return <InfoContent />;
    if (activeTab === '보관함') return <StorageContent />;
    if (activeTab === '알림 기록' || activeTab === '알림 설정') return <NotificationContent activeTab={activeTab} />;
    return <RecipeContent activeTab={activeTab} />;
  }, [activeTab]);

  return (
    <MyPageLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {content}
    </MyPageLayout>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: spacing.lg,
  },
  stackSmall: {
    gap: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  card: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.lg,
    gap: spacing.md,
  },
  profileCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.sm,
    gap: spacing.md,
  },
  profileHero: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.orange100,
    backgroundColor: colors.orange50,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSize['3xl'],
    fontWeight: '800',
    color: colors.orange600,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    marginTop: spacing.xs,
    fontSize: fontSize['2xl'],
    fontWeight: '800',
    color: colors.stone800,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sectionHeaderText: {
    flex: 1,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  sectionTitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.stone800,
  },
  subtitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.stone500,
  },
  countPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  countPillText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.stone500,
  },
  infoBox: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.md,
  },
  infoRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.stone100,
    gap: spacing.xs,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.stone800,
  },
  socialRow: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  socialName: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  orangePill: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.orange200,
    backgroundColor: colors.orange50,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  orangePillText: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.orange600,
  },
  unlinkPill: {
    borderColor: colors.red200,
    backgroundColor: colors.red50,
  },
  unlinkPillText: {
    color: colors.red600,
  },
  disabledPill: {
    opacity: 0.5,
  },
  emptyBox: {
    borderRadius: 22,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: colors.stone500,
    fontSize: fontSize.sm,
    lineHeight: 20,
  },
  storageCard: {
    flex: 1,
    minWidth: '45%',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.md,
    gap: spacing.xs,
  },
  itemTitle: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  settingRow: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  recipeRow: {
    flexDirection: 'row',
    gap: spacing.md,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
  },
  thumbEmpty: {
    backgroundColor: colors.stone100,
  },
  recipeText: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: colors.red600,
  },
});

export default MyPage;
