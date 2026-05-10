import React, { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import {
  getNotificationSettings,
  resetNotificationSettings,
  saveNotificationSettings,
  type NotificationSettings,
} from '../../utils/notificationSettings';
import MyPageLayout from './MyPageLayout';

function Row(props: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowLabel}>{props.label}</Text>
        <Text style={styles.rowDescription}>{props.description}</Text>
      </View>
      <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        thumbColor={props.value ? colors.orange600 : colors.white}
        trackColor={{ false: colors.stone200, true: colors.orange200 }}
      />
    </View>
  );
}

function NotificationSettingsPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [settings, setSettings] = useState<NotificationSettings | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const saved = await getNotificationSettings();
      if (!cancelled) {
        setSettings(saved);
      }
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

  return (
    <MyPageLayout activeTab="알림 설정">
      <View style={[styles.sectionCard, shadows.card]}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Notification</Text>
          <Text style={styles.title}>알림 설정</Text>
          <Text style={styles.subtitle}>
            유통기한 알림 기준과 표시 방식을 웹 마이페이지처럼 한곳에서 조정해요.
          </Text>
        </View>

        {settings ? (
          <View style={styles.rows}>
            <Row
              label="알림 사용"
              description="유통기한 알림 표시 여부"
              value={settings.enabled}
              onValueChange={(v) => patch({ enabled: v })}
            />
            <Row
              label="만료 표시"
              description="이미 만료된 재료도 알림에 포함"
              value={settings.showExpired}
              onValueChange={(v) => patch({ showExpired: v })}
            />
            <Row
              label="1일 전"
              description="긴급 단계 알림"
              value={settings.showUrgent}
              onValueChange={(v) => patch({ showUrgent: v })}
            />
            <Row
              label="3일 전"
              description="경고 단계 알림"
              value={settings.showWarning}
              onValueChange={(v) => patch({ showWarning: v })}
            />
            <Row
              label="7일 전"
              description="알림 단계 표시"
              value={settings.showNotice}
              onValueChange={(v) => patch({ showNotice: v })}
            />
            <Row
              label="자동 닫기"
              description="확인 후 알림을 자동으로 정리"
              value={settings.autoClose}
              onValueChange={(v) => patch({ autoClose: v })}
            />
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>설정을 불러오는 중입니다.</Text>
          </View>
        )}

        <View style={styles.actions}>
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
          <Pressable style={styles.primary} onPress={() => (navigation as any).navigate('ExpiryInbox')}>
            <Text style={styles.primaryText}>알림 기록 보기</Text>
          </Pressable>
        </View>
      </View>
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
    gap: spacing.lg,
  },
  header: {
    gap: spacing.xs,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.stone800,
  },
  subtitle: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.stone500,
  },
  rows: {
    gap: spacing.sm,
  },
  row: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowLabel: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  rowDescription: {
    marginTop: 2,
    fontSize: fontSize.sm,
    color: colors.stone500,
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
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  secondary: {
    flex: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryText: {
    fontWeight: '800',
    color: colors.stone700,
  },
  primary: {
    flex: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.orange600,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  primaryText: {
    fontWeight: '800',
    color: colors.white,
  },
});

export default NotificationSettingsPage;
