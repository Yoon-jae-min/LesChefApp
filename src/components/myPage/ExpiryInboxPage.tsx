import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { clearExpiryInbox, getExpiryInbox, removeExpiryInboxEntry, type ExpiryInboxEntry } from '../../utils/expiryInbox';

function formatDday(days: number | null): string {
  if (days === null || Number.isNaN(days)) return 'D-day —';
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
    <View style={styles.container}>
      <Top />
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
      >
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.title}>유통기한 알림 기록</Text>
          <Text style={styles.sub}>웹과 동일하게 로컬에 쌓인 알림 기록을 확인합니다.</Text>
          <Pressable
            style={styles.danger}
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

        {items.map((it) => (
          <View key={it.id} style={[styles.item, shadows.card]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{it.name || '이름 없음'}</Text>
              <Text style={styles.meta}>
                {it.place} · {formatDday(it.daysUntilExpiry)}
              </Text>
            </View>
            <Pressable
              onPress={async () => {
                await removeExpiryInboxEntry(it.id);
                await refresh();
              }}
            >
              <Text style={styles.remove}>삭제</Text>
            </Pressable>
          </View>
        ))}

        {items.length === 0 ? <Text style={styles.muted}>기록이 없습니다.</Text> : null}

        <Pressable style={styles.secondary} onPress={() => (navigation as any).navigate('NotificationSettings')}>
          <Text style={styles.secondaryText}>알림 설정으로</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing['2xl'] },
  card: { borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.gray200, padding: spacing.lg, gap: spacing.sm },
  title: { fontSize: fontSize['2xl'], fontWeight: '800' },
  sub: { color: colors.gray600, fontSize: fontSize.sm },
  danger: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.red200,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.red50,
  },
  dangerText: { color: colors.red600, fontWeight: '800' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  itemTitle: { fontSize: fontSize.base, fontWeight: '800' },
  meta: { marginTop: 4, color: colors.gray600, fontSize: fontSize.sm },
  remove: { color: colors.red600, fontWeight: '700' },
  muted: { color: colors.gray500 },
  secondary: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryText: { fontWeight: '800', color: colors.gray900 },
});

export default ExpiryInboxPage;
