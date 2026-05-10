import React, { useCallback, useState } from 'react';
import { Alert, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import { clearExpiryInbox, getExpiryInbox, removeExpiryInboxEntry, type ExpiryInboxEntry } from '../../utils/expiryInbox';
import MyPageLayout from './MyPageLayout';

function formatDday(days: number | null): string {
  if (days === null || Number.isNaN(days)) return 'D-day -';
  if (days < 0) return `만료 ${Math.abs(days)}일 전`;
  if (days === 0) return '오늘 만료';
  return `D-${days}`;
}

function ExpiryInboxPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [items, setItems] = useState<ExpiryInboxEntry[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const refresh = async () => {
    setRefreshing(true);
    try {
      setItems(await getExpiryInbox());
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, []),
  );

  return (
    <MyPageLayout
      activeTab="알림 기록"
      scrollProps={{ refreshControl: <RefreshControl refreshing={refreshing} onRefresh={refresh} /> }}
    >
      <View style={[styles.sectionCard, shadows.card]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>Inventory Alert</Text>
            <Text style={styles.title}>유통기한 알림 기록</Text>
            <Text style={styles.subtitle}>웹과 동일하게 로컬에 쌓인 알림 기록을 확인합니다.</Text>
          </View>
          <View style={styles.countPill}>
            <Text style={styles.countPillText}>{items.length} items</Text>
          </View>
        </View>

        <Pressable
          style={[styles.danger, items.length === 0 && styles.disabled]}
          onPress={() => {
            if (items.length === 0) return;
            Alert.alert('삭제', '모든 기록을 삭제할까요?', [
              { text: '취소', style: 'cancel' },
              {
                text: '삭제',
                style: 'destructive',
                onPress: async () => {
                  await clearExpiryInbox();
                  await refresh();
                },
              },
            ]);
          }}
        >
          <Text style={styles.dangerText}>기록 전체 삭제</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {items.map((it) => (
          <View key={it.id} style={[styles.item, shadows.card]}>
            <View style={styles.statusDot} />
            <View style={styles.itemBody}>
              <Text style={styles.itemTitle}>{it.name || '이름 없음'}</Text>
              <Text style={styles.meta}>
                {it.place} · {formatDday(it.daysUntilExpiry)}
              </Text>
            </View>
            <Pressable
              style={styles.removeButton}
              onPress={async () => {
                await removeExpiryInboxEntry(it.id);
                await refresh();
              }}
            >
              <Text style={styles.removeText}>삭제</Text>
            </Pressable>
          </View>
        ))}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>기록이 없습니다.</Text>
        </View>
      ) : null}

      <Pressable style={styles.secondary} onPress={() => (navigation as any).navigate('NotificationSettings')}>
        <Text style={styles.secondaryText}>알림 설정으로</Text>
      </Pressable>
    </MyPageLayout>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  title: {
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
  danger: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.red200,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.red50,
  },
  disabled: {
    opacity: 0.45,
  },
  dangerText: {
    color: colors.red600,
    fontWeight: '800',
  },
  list: {
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.stone200,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.orange500,
  },
  itemBody: {
    flex: 1,
  },
  itemTitle: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  meta: {
    marginTop: 4,
    color: colors.stone500,
    fontSize: fontSize.sm,
  },
  removeButton: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.red200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  removeText: {
    color: colors.red600,
    fontWeight: '700',
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
    color: colors.stone500,
  },
  secondary: {
    borderWidth: 1,
    borderColor: colors.stone200,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryText: {
    fontWeight: '800',
    color: colors.stone700,
  },
});

export default ExpiryInboxPage;
