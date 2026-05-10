import React from 'react';
import { ScrollView, StyleSheet, Text, View, type ScrollViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import TabNavigation from '../common/TabNavigation';
import { colors, fontSize, spacing } from '../../styles/theme';

export type MyPageTabLabel =
  | '내 정보'
  | '알림 기록'
  | '알림 설정'
  | '보관함'
  | '찜 레시피'
  | '나의 레시피';

type MyPagePrimaryTabLabel = '내 정보' | '보관함' | '알림' | '레시피';

const PRIMARY_TABS: Array<{ label: MyPagePrimaryTabLabel; screen: string }> = [
  { label: '내 정보', screen: 'MyPageInfo' },
  { label: '보관함', screen: 'MyPageStorage' },
  { label: '알림', screen: 'ExpiryInbox' },
  { label: '레시피', screen: 'MyPageFavorites' },
];

const NOTIFICATION_TABS: Array<{ label: MyPageTabLabel; screen: string }> = [
  { label: '알림 기록', screen: 'ExpiryInbox' },
  { label: '알림 설정', screen: 'NotificationSettings' },
];

const RECIPE_TABS: Array<{ label: MyPageTabLabel; screen: string }> = [
  { label: '찜 레시피', screen: 'MyPageFavorites' },
  { label: '나의 레시피', screen: 'MyPageRecipes' },
];

const SUB_TABS = [...NOTIFICATION_TABS, ...RECIPE_TABS];

type MyPageLayoutProps = {
  activeTab: MyPageTabLabel;
  children: React.ReactNode;
  onTabChange?: (tab: MyPageTabLabel) => void;
  scrollProps?: Omit<ScrollViewProps, 'children' | 'contentContainerStyle'>;
};

function MyPageLayout({ activeTab, children, onTabChange, scrollProps }: MyPageLayoutProps): React.JSX.Element {
  const navigation = useNavigation();

  const activePrimaryTab: MyPagePrimaryTabLabel =
    activeTab === '알림 기록' || activeTab === '알림 설정'
      ? '알림'
      : activeTab === '찜 레시피' || activeTab === '나의 레시피'
        ? '레시피'
        : activeTab;

  const secondaryTabs =
    activePrimaryTab === '알림'
      ? NOTIFICATION_TABS
      : activePrimaryTab === '레시피'
        ? RECIPE_TABS
        : [];

  const navigateToScreen = (screen: string) => {
    (navigation as any).navigate(screen);
  };

  const selectTab = (tab: MyPageTabLabel, screen: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      navigateToScreen(screen);
    }
  };

  const handlePrimaryTabChange = (tab: string) => {
    if (tab === activePrimaryTab) {
      return;
    }
    const target = PRIMARY_TABS.find((item) => item.label === tab);
    if (target) {
      const targetTab =
        target.label === '알림' ? '알림 기록' : target.label === '레시피' ? '찜 레시피' : target.label;
      selectTab(targetTab, target.screen);
    }
  };

  const handleSecondaryTabChange = (tab: string) => {
    if (tab === activeTab) {
      return;
    }
    const target = SUB_TABS.find((item) => item.label === tab);
    if (target) {
      selectTab(target.label, target.screen);
    }
  };

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView
        {...scrollProps}
        style={[styles.scrollView, scrollProps?.style]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={scrollProps?.showsVerticalScrollIndicator ?? false}
      >
        <View style={styles.content}>
          <View style={styles.pageHeader}>
            <Text style={styles.eyebrow}>My Page</Text>
            <Text style={styles.title}>마이페이지</Text>
            <Text style={styles.subtitle}>
              내 정보와 알림, 보관함, 레시피를 한곳에서 관리해요.
            </Text>
          </View>

          <View style={styles.tabWrap}>
            <TabNavigation
              tabs={PRIMARY_TABS.map((item) => item.label)}
              activeTab={activePrimaryTab}
              onTabChange={handlePrimaryTabChange}
            />
            {secondaryTabs.length > 0 ? (
              <View style={styles.secondaryTabWrap}>
                <TabNavigation
                  tabs={secondaryTabs.map((item) => item.label)}
                  activeTab={activeTab}
                  onTabChange={handleSecondaryTabChange}
                />
              </View>
            ) : null}
          </View>

          {children}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing['2xl'],
  },
  content: {
    width: '100%',
    maxWidth: 1152,
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.lg,
  },
  pageHeader: {
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    color: colors.orange600,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: '800',
    letterSpacing: -0.4,
    color: colors.stone800,
  },
  subtitle: {
    maxWidth: 360,
    textAlign: 'center',
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.stone500,
  },
  tabWrap: {
    marginBottom: spacing.md,
  },
  secondaryTabWrap: {
    marginTop: spacing.sm,
  },
});

export default MyPageLayout;
