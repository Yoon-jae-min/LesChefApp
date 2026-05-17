import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import { getGoogleLoginUrl, getKakaoLoginUrl, getNaverLoginUrl } from '../../config/apiConfig';
import { fetchUserInfo } from '../../api/auth/user';
import { getAccessToken } from '../../api/tokenStorage';
import { unlinkSocial, type SocialProvider } from '../../api/auth/socialLink';
import type { UserInfoResponse } from '../../api/auth/types';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import MyPageLayout from './MyPageLayout';

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


function MyPage(): React.JSX.Element {
  return (
    <MyPageLayout activeTab="내 정보">
      <InfoContent />
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
