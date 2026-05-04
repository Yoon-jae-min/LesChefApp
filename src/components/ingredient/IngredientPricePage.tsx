import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { getIngredientPrices, type IngredientPriceItem } from '../../api/ingredientPrice';

function IngredientPricePage(): React.JSX.Element {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<IngredientPriceItem[]>([]);
  const [date, setDate] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getIngredientPrices();
        if (cancelled) return;
        if (res.error) throw new Error(res.message || '데이터를 불러오지 못했습니다.');
        setItems(res.data || []);
        setDate(res.date || '');
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : '오류가 발생했습니다.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Top />
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={[styles.headerCard, shadows.card]}>
            <Text style={styles.kicker}>Market</Text>
            <Text style={styles.title}>식재료 물가</Text>
            {date ? <Text style={styles.date}>기준일 {date}</Text> : null}
          </View>
          {loading && (
            <View style={styles.center}>
              <ActivityIndicator color={colors.gray600} />
              <Text style={styles.muted}>불러오는 중…</Text>
            </View>
          )}
          {error && !loading ? <Text style={styles.error}>{error}</Text> : null}
          {!loading &&
            !error &&
            items.map((it) => (
              <View key={it.name} style={[styles.row, shadows.card]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{it.name}</Text>
                  <Text style={styles.muted}>
                    {it.unit} · 변동 {it.change ?? '—'} ({it.changeRate ?? '—'}%)
                  </Text>
                </View>
                <Text style={styles.price}>{it.price.toLocaleString()}원</Text>
              </View>
            ))}
          <Pressable onPress={() => (navigation as any).goBack()}>
            <Text style={styles.back}>닫기</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  safe: { flex: 1 },
  scroll: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing['2xl'] },
  headerCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.lg,
    backgroundColor: colors.white,
  },
  kicker: { fontSize: fontSize.xs, fontWeight: '700', color: colors.orange500, letterSpacing: 2 },
  title: { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.gray900, marginTop: 4 },
  date: { marginTop: 6, fontSize: fontSize.sm, color: colors.gray600 },
  center: { alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm },
  muted: { fontSize: fontSize.sm, color: colors.gray500 },
  error: { color: colors.red600 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
    backgroundColor: colors.white,
  },
  name: { fontSize: fontSize.base, fontWeight: '700', color: colors.gray900 },
  price: { fontSize: fontSize.lg, fontWeight: '800', color: colors.gray900 },
  back: { textAlign: 'center', marginTop: spacing.lg, color: colors.gray600, textDecorationLine: 'underline' },
});

export default IngredientPricePage;
