import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fontSize, spacing } from '../../styles/theme';
import Top from './Top';

type PlaceholderParams = {
  title?: string;
  message?: string;
};

/**
 * 아직 전용 화면이 없는 스택 경로용 플레이스홀더. 상단 앱 바는 웹·앱 톤을 맞추기 위해 Top을 유지합니다.
 */
function PlaceholderScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const p = (route.params as PlaceholderParams | undefined) ?? {};
  const title = p.title ?? '준비 중';
  const message = p.message ?? '이 기능은 곧 모바일 앱에서도 이용할 수 있어요.';

  return (
    <View style={styles.container}>
      <Top />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <Pressable style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>돌아가기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize['2xl'],
    fontWeight: '700',
    color: colors.gray900,
  },
  message: {
    fontSize: fontSize.base,
    color: colors.gray600,
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.gray900,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
});

export default PlaceholderScreen;
