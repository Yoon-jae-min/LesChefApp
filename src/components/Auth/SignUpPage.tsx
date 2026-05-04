// 웹의 회원가입 페이지를 React Native로 변환
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';
import { signup } from '../../api/auth/signup';

function SignUpPage(): React.JSX.Element {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setError(null);

    // 유효성 검사
    if (!email || !password || !confirmPassword || !nickname) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    if (!agreeToTerms) {
      setError('이용약관에 동의해주세요.');
      return;
    }

    try {
      await signup({
        id: email.trim(),
        email: email.trim(),
        pwd: password,
        nickName: nickname.trim(),
      });
      Alert.alert('회원가입 완료', '회원가입이 완료되었습니다!', [
        {
          text: '확인',
          onPress: () => (navigation as any).navigate('Login'),
        },
      ]);
    } catch (err) {
      console.error('회원가입 실패:', err);
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <View style={styles.container}>
      <Top />
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* 브랜드 메시지 */}
            <View style={[styles.brandSection, shadows.card]}>
              <Text style={styles.brandLabel}>Join us</Text>
              <Text style={styles.brandTitle}>
                새로운 요리 여정,{'\n'}
                <Text style={styles.brandTitleHighlight}>LesChef</Text> 와{' '}
                <Text style={styles.brandTitleUnderline}>시작</Text>
              </Text>
              <Text style={styles.brandDescription}>
                냉장고 재료 관리부터 맞춤 레시피 추천까지. 지금 가입하고
                나만의 요리 여정을 시작해보세요.
              </Text>

              <View style={styles.featuresList}>
                {[
                  '냉장고 재료 기반 레시피 추천',
                  '커뮤니티에서 레시피 공유',
                  '즐겨찾기와 보관함 관리',
                ].map((item, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 회원가입 폼 */}
            <View style={[styles.formSection, shadows.card]}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>회원가입</Text>
                <Text style={styles.formSubtitle}>
                  LesChef와 함께 요리 여정을 시작해보세요.
                </Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>이메일</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.gray500}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>닉네임</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="닉네임을 입력해주세요"
                    placeholderTextColor={colors.gray500}
                    value={nickname}
                    onChangeText={setNickname}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>비밀번호</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 입력해주세요 (최소 6자)"
                    placeholderTextColor={colors.gray500}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>비밀번호 확인</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 다시 입력해주세요"
                    placeholderTextColor={colors.gray500}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.termsContainer}>
                  <Pressable
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                    style={styles.checkboxRow}
                  >
                    <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                      {agreeToTerms && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <View style={styles.termsTextContainer}>
                      <Text style={styles.termsText}>
                        <Text
                          style={styles.termsLink}
                          onPress={() => Alert.alert('이용약관', '이용약관 내용')}
                        >
                          이용약관
                        </Text>
                        및{' '}
                        <Text
                          style={styles.termsLink}
                          onPress={() => Alert.alert('개인정보처리방침', '개인정보처리방침 내용')}
                        >
                          개인정보처리방침
                        </Text>
                        에 동의합니다.
                      </Text>
                    </View>
                  </Pressable>
                </View>

                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <Pressable style={styles.submitButton} onPress={handleSignup}>
                  <Text style={styles.submitButtonText}>회원가입하기</Text>
                </Pressable>
              </View>

              {/* SNS 회원가입 구분선 */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>SNS 계정으로 시작</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* SNS 회원가입 버튼 */}
              <View style={styles.snsButtons}>
                {['카카오', '네이버', '구글'].map((provider) => (
                  <Pressable
                    key={provider}
                    style={styles.snsButton}
                    onPress={() => Alert.alert(`${provider} 회원가입`, '기능 구현 예정')}
                  >
                    <Text style={styles.snsButtonText}>{provider}</Text>
                  </Pressable>
                ))}
              </View>

              {/* 로그인 링크 */}
              <View style={styles.loginPrompt}>
                <Text style={styles.loginPromptText}>
                  이미 회원이신가요?{' '}
                  <Text
                    style={styles.loginLink}
                    onPress={() => (navigation as any).navigate('Login')}
                  >
                    로그인
                  </Text>
                  하러 가기
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orange50,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  content: {
    maxWidth: 1152,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.xl,
  },
  brandSection: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  brandLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 3.2,
    color: colors.gray500,
  },
  brandTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: '600',
    color: colors.gray900,
    marginTop: spacing.md,
    lineHeight: fontSize['3xl'] * 1.2,
  },
  brandTitleHighlight: {
    color: colors.orange500,
  },
  brandTitleUnderline: {
    textDecorationLine: 'underline',
    textDecorationColor: colors.orange200,
  },
  brandDescription: {
    fontSize: fontSize.base,
    color: colors.gray600,
    marginTop: spacing.md,
    lineHeight: fontSize.base * 1.5,
  },
  featuresList: {
    marginTop: spacing.lg,
    gap: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs + 4,
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.black,
    marginTop: 6,
  },
  featureText: {
    fontSize: fontSize.sm,
    color: colors.gray800,
    flex: 1,
    lineHeight: fontSize.sm * 1.5,
  },
  formSection: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  formHeader: {
    marginBottom: spacing.lg,
  },
  formTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
  },
  formSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    marginTop: spacing.xs / 2,
  },
  form: {
    gap: spacing.lg,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
  },
  input: {
    width: '100%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 4,
    fontSize: fontSize.sm,
    color: colors.gray900,
    backgroundColor: colors.white,
  },
  termsContainer: {
    marginTop: spacing.xs,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: fontSize.sm,
    color: colors.gray600,
    lineHeight: fontSize.sm * 1.5,
  },
  termsLink: {
    color: colors.black,
    textDecorationLine: 'underline',
  },
  errorContainer: {
    marginTop: spacing.xs,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.red500,
  },
  submitButton: {
    width: '100%',
    borderRadius: borderRadius.xl,
    backgroundColor: colors.black,
    paddingVertical: spacing.xs + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
  dividerText: {
    fontSize: fontSize.xs,
    color: colors.gray400,
  },
  snsButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  snsButton: {
    flex: 1,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingVertical: spacing.xs + 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snsButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
  },
  loginPrompt: {
    marginTop: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  loginPromptText: {
    fontSize: fontSize.sm,
    color: colors.gray600,
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: '600',
    color: colors.black,
    textDecorationLine: 'underline',
  },
});

export default SignUpPage;

