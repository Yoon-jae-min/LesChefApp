import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { findIdByProfile } from '../../api/auth/accountRecovery';

function FindIdPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setError(null);
    if (!name.trim() || !tel.trim()) {
      setError('이름과 전화번호를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await findIdByProfile(name, tel);
      Alert.alert('아이디 찾기', `회원 아이디: ${res.maskedId}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : '요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Top />
      <SafeAreaView edges={['bottom']} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={[styles.card, shadows.card]}>
            <Text style={styles.title}>아이디 찾기</Text>
            <Text style={styles.sub}>가입 시 등록한 이름과 전화번호를 입력해주세요.</Text>
            <Text style={styles.label}>이름</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="이름" />
            <Text style={styles.label}>전화번호</Text>
            <TextInput style={styles.input} value={tel} onChangeText={setTel} placeholder="010-0000-0000" />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Pressable style={styles.btn} onPress={onSubmit} disabled={loading}>
              <Text style={styles.btnText}>{loading ? '확인 중…' : '찾기'}</Text>
            </Pressable>
            <Pressable onPress={() => (navigation as any).goBack()}>
              <Text style={styles.back}>돌아가기</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  safe: { flex: 1 },
  scroll: { padding: spacing.lg },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: { fontSize: fontSize['2xl'], fontWeight: '700', color: colors.gray900 },
  sub: { fontSize: fontSize.sm, color: colors.gray600 },
  label: { marginTop: spacing.sm, fontSize: fontSize.sm, fontWeight: '600', color: colors.gray800 },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: fontSize.base,
    color: colors.gray900,
  },
  error: { color: colors.red600, fontSize: fontSize.sm },
  btn: {
    marginTop: spacing.md,
    backgroundColor: colors.gray900,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '700' },
  back: { marginTop: spacing.md, textAlign: 'center', color: colors.gray600, textDecorationLine: 'underline' },
});

export default FindIdPage;
