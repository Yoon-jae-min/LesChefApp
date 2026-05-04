import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { verifyPasswordReset, completePasswordReset } from '../../api/auth/accountRecovery';

function FindPasswordPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [step, setStep] = useState<'verify' | 'reset'>('verify');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newPwd2, setNewPwd2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    setError(null);
    if (!id.trim() || !name.trim() || !tel.trim()) {
      setError('모든 필드를 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      const res = await verifyPasswordReset(id, name, tel);
      setResetToken(res.resetToken);
      setStep('reset');
      Alert.alert('본인 확인 완료', `비밀번호를 재설정해주세요. (유효 ${res.expiresInMinutes}분)`);
    } catch (e) {
      setError(e instanceof Error ? e.message : '요청에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    setError(null);
    if (!newPwd || newPwd.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }
    if (newPwd !== newPwd2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      await completePasswordReset(resetToken, newPwd);
      Alert.alert('완료', '비밀번호가 변경되었습니다.', [
        { text: '확인', onPress: () => (navigation as any).navigate('Login') },
      ]);
    } catch (e) {
      setError(e instanceof Error ? e.message : '재설정에 실패했습니다.');
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
            <Text style={styles.title}>비밀번호 찾기</Text>
            {step === 'verify' ? (
              <>
                <Text style={styles.sub}>가입 정보를 입력하면 재설정 링크(토큰)를 발급합니다.</Text>
                <Text style={styles.label}>아이디(이메일)</Text>
                <TextInput style={styles.input} value={id} onChangeText={setId} autoCapitalize="none" />
                <Text style={styles.label}>이름</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
                <Text style={styles.label}>전화번호</Text>
                <TextInput style={styles.input} value={tel} onChangeText={setTel} />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Pressable style={styles.btn} onPress={onVerify} disabled={loading}>
                  <Text style={styles.btnText}>{loading ? '확인 중…' : '본인 확인'}</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.sub}>새 비밀번호를 입력해주세요.</Text>
                <Text style={styles.label}>새 비밀번호</Text>
                <TextInput
                  style={styles.input}
                  value={newPwd}
                  onChangeText={setNewPwd}
                  secureTextEntry
                />
                <Text style={styles.label}>새 비밀번호 확인</Text>
                <TextInput
                  style={styles.input}
                  value={newPwd2}
                  onChangeText={setNewPwd2}
                  secureTextEntry
                />
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Pressable style={styles.btn} onPress={onReset} disabled={loading}>
                  <Text style={styles.btnText}>{loading ? '처리 중…' : '비밀번호 변경'}</Text>
                </Pressable>
              </>
            )}
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

export default FindPasswordPage;
