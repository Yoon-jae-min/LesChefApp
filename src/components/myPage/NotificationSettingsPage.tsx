import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Switch, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import {
  getNotificationSettings,
  saveNotificationSettings,
  resetNotificationSettings,
  type NotificationSettings,
} from '../../utils/notificationSettings';

function Row(props: {
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{props.label}</Text>
      <Switch value={props.value} onValueChange={props.onValueChange} />
    </View>
  );
}

function NotificationSettingsPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await getNotificationSettings();
      if (!cancelled) setSettings(s);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const patch = async (partial: Partial<NotificationSettings>) => {
    if (!settings) return;
    const next = { ...settings, ...partial };
    setSettings(next);
    await saveNotificationSettings(partial);
  };

  if (!settings) {
    return (
      <View style={styles.container}>
        <Top />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.title}>알림 설정</Text>
          <Text style={styles.sub}>유통기한 알림을 조정합니다. (기기 로컬 저장)</Text>
          <Row label="알림 사용" value={settings.enabled} onValueChange={(v) => patch({ enabled: v })} />
          <Row label="만료 표시" value={settings.showExpired} onValueChange={(v) => patch({ showExpired: v })} />
          <Row label="1일 전(긴급)" value={settings.showUrgent} onValueChange={(v) => patch({ showUrgent: v })} />
          <Row label="3일 전(경고)" value={settings.showWarning} onValueChange={(v) => patch({ showWarning: v })} />
          <Row label="7일 전(알림)" value={settings.showNotice} onValueChange={(v) => patch({ showNotice: v })} />
          <Row label="자동 닫기" value={settings.autoClose} onValueChange={(v) => patch({ autoClose: v })} />
          <Pressable
            style={styles.secondary}
            onPress={async () => {
              Alert.alert('초기화', '알림 설정을 기본값으로 되돌릴까요?', [
                { text: '취소', style: 'cancel' },
                {
                  text: '초기화',
                  style: 'destructive',
                  onPress: async () => {
                    await resetNotificationSettings();
                    setSettings(await getNotificationSettings());
                  },
                },
              ]);
            }}
          >
            <Text style={styles.secondaryText}>설정 초기화</Text>
          </Pressable>
          <Pressable style={styles.secondary} onPress={() => (navigation as any).navigate('ExpiryInbox')}>
            <Text style={styles.secondaryText}>유통기한 알림 기록 보기</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg },
  card: { borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.gray200, padding: spacing.lg, gap: spacing.sm },
  title: { fontSize: fontSize['2xl'], fontWeight: '800' },
  sub: { color: colors.gray600, fontSize: fontSize.sm },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.sm },
  rowLabel: { fontSize: fontSize.base, color: colors.gray900, fontWeight: '600' },
  secondary: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryText: { fontWeight: '700', color: colors.gray900 },
});

export default NotificationSettingsPage;
