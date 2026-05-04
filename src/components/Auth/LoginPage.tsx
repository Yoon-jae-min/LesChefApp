// 웹의 로그인 페이지를 React Native로 변환
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';
import { login } from '../../api/auth/login';
import { persistUserSession } from '../../lib/session';
import { getGoogleLoginUrl, getKakaoLoginUrl, getNaverLoginUrl } from '../../config/apiConfig';

function LoginPage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saveSession, setSaveSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const result = await login({
        customerId: email.trim(),
        customerPwd: password,
      });

      if (result.text === 'login Success') {
        await persistUserSession(result);
        Alert.alert('로그인 성공', '로그인되었습니다.');
        (navigation as any).goBack();
      } else {
        throw new Error('로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('로그인 실패:', err);
      setError(err instanceof Error ? err.message : '아이디 또는 비밀번호가 올바르지 않습니다.');
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
              <Text style={styles.brandLabel}>Welcome back</Text>
              <Text style={styles.brandTitle}>
                나만의 요리 여정,{'\n'}
                <Text style={styles.brandTitleHighlight}>LesChef</Text> 와{' '}
                <Text style={styles.brandTitleUnderline}>계속</Text>
              </Text>
              <Text style={styles.brandDescription}>
                즐겨찾기, 식재료 관리, 맞춤 레시피 추천까지. 로그인하면
                나에게 딱 맞춘 LesChef의 서비스를 온전히 경험할 수 있어요.
              </Text>

              <View style={styles.featuresList}>
                {[
                  '내 냉장고를 기반으로 한 레시피 추천',
                  '게시판 글쓰기 및 커뮤니티 참여',
                  '마이페이지에서 즐겨찾기와 저장함 관리',
                ].map((item, index) => (
                  <View key={index} style={styles.featureItem}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 로그인 폼 */}
            <View style={[styles.formSection, shadows.card]}>
              <View style={styles.formHeader}>
                <Text style={styles.formTitle}>계정으로 로그인</Text>
                <Text style={styles.formSubtitle}>
                  LesChef 서비스 이용을 위해 로그인해 주세요.
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
                  <Text style={styles.label}>비밀번호</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 입력해주세요"
                    placeholderTextColor={colors.gray500}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <View style={styles.optionsRow}>
                  <Pressable
                    onPress={() => setSaveSession(!saveSession)}
                    style={styles.checkboxRow}
                  >
                    <View style={[styles.checkbox, saveSession && styles.checkboxChecked]}>
                      {saveSession && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                    <Text style={styles.checkboxLabel}>로그인 상태 유지</Text>
                  </Pressable>

                  <View style={styles.findLinks}>
                    <Pressable onPress={() => Alert.alert('아이디 찾기', '기능 구현 예정')}>
                      <Text style={styles.findLinkText}>아이디 찾기</Text>
                    </Pressable>
                    <Text style={styles.findLinkDivider}>|</Text>
                    <Pressable onPress={() => Alert.alert('비밀번호 찾기', '기능 구현 예정')}>
                      <Text style={styles.findLinkText}>비밀번호 찾기</Text>
                    </Pressable>
                  </View>
                </View>

                {error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <Pressable style={styles.submitButton} onPress={handleLogin}>
                  <Text style={styles.submitButtonText}>로그인하기</Text>
                </Pressable>
              </View>

              {/* SNS 로그인 구분선 */}
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>SNS 계정으로 시작</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* SNS 로그인 버튼 */}
              <View style={styles.snsButtons}>
                <Pressable
                  style={styles.snsButton}
                  onPress={async () => {
                    try {
                      await Linking.openURL(getKakaoLoginUrl());
                    } catch (e) {
                      Alert.alert('카카오 로그인', (e as Error).message);
                    }
                  }}
                >
                  <Text style={styles.snsButtonText}>카카오</Text>
                </Pressable>
                <Pressable
                  style={styles.snsButton}
                  onPress={async () => {
                    try {
                      await Linking.openURL(getNaverLoginUrl());
                    } catch (e) {
                      Alert.alert('네이버 로그인', (e as Error).message);
                    }
                  }}
                >
                  <Text style={styles.snsButtonText}>네이버</Text>
                </Pressable>
                <Pressable
                  style={styles.snsButton}
                  onPress={async () => {
                    try {
                      await Linking.openURL(getGoogleLoginUrl());
                    } catch (e) {
                      Alert.alert('구글 로그인', (e as Error).message);
                    }
                  }}
                >
                  <Text style={styles.snsButtonText}>구글</Text>
                </Pressable>
              </View>

              <View style={styles.findRow}>
                <Text style={styles.findLink} onPress={() => (navigation as any).navigate('FindId')}>
                  아이디 찾기
                </Text>
                <Text style={styles.findSep}>|</Text>
                <Text
                  style={styles.findLink}
                  onPress={() => (navigation as any).navigate('FindPassword')}
                >
                  비밀번호 찾기
                </Text>
              </View>

              {/* 회원가입 링크 */}
              <View style={styles.signupPrompt}>
                <Text style={styles.signupPromptText}>
                  아직 회원이 아니신가요?{' '}
                  <Text
                    style={styles.signupLink}
                    onPress={() => (navigation as any).navigate('SignUp')}
                  >
                    회원가입
                  </Text>
                  으로 간편하게 시작해 보세요.
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
    backgroundColor: colors.orange50, // bg-gradient-to-br from-orange-50 via-white to-yellow-50
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
    color: colors.orange500, // gradient 효과는 단일 색상으로 대체
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
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  checkboxLabel: {
    fontSize: fontSize.sm,
    color: colors.gray600,
  },
  findLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  findLinkText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
  },
  findLinkDivider: {
    fontSize: fontSize.sm,
    color: colors.gray300,
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
  findRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  findLink: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray800,
    textDecorationLine: 'underline',
  },
  findSep: {
    fontSize: fontSize.sm,
    color: colors.gray400,
  },
  signupPrompt: {
    marginTop: spacing.lg,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  signupPromptText: {
    fontSize: fontSize.sm,
    color: colors.gray600,
    textAlign: 'center',
  },
  signupLink: {
    fontWeight: '600',
    color: colors.black,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;

