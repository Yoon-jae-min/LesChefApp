// 웹의 내 정보 페이지를 React Native로 변환
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';

function InfoPage(): React.JSX.Element {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState<'warning' | 'password' | 'reason' | 'final'>('warning');
  const [password, setPassword] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nickname, setNickname] = useState('user');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // TODO: API 호출
        // const data = await fetchUserInfo();
        // setNickname(data.nickName || 'user');
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const deleteReasons = [
    '서비스 이용이 불편함',
    '원하는 기능이 없음',
    '다른 서비스 이용',
    '개인정보 보호 우려',
    '기타',
  ];

  if (loading) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.gray500} />
          <Text style={styles.loadingText}>정보를 불러오는 중입니다...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 프로필 카드 */}
          <View style={[styles.profileCard, shadows.card]}>
            <View style={styles.profileHeader}>
              <View style={styles.profileIcon}>
                <Text style={styles.profileIconText}>👤</Text>
              </View>
              <View>
                <Text style={styles.profileLabel}>Profile</Text>
                <Text style={styles.profileName}>{nickname}</Text>
                <Text style={styles.profileSubtitle}>나의 LesChef 요리 여정</Text>
              </View>
            </View>
          </View>

          {/* 메뉴 버튼들 */}
          <View style={styles.menuSection}>
            {['정보확인', '정보변경', '비밀번호 변경'].map((label) => (
              <Pressable key={label} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>{label}</Text>
              </Pressable>
            ))}
            <Pressable 
              style={[styles.menuButton, styles.deleteButton]}
              onPress={() => setShowDeleteConfirm(true)}
            >
              <Text style={[styles.menuButtonText, styles.deleteButtonText]}>회원 탈퇴</Text>
            </Pressable>
          </View>

          {/* 기한 임박 물품 */}
          <View style={[styles.section, shadows.card]}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionLabel}>Inventory Alert</Text>
                <Text style={styles.sectionTitle}>기한 임박 물품</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>0 items</Text>
              </View>
            </View>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                아직 임박한 재료가 없어요. 재료를 추가하면 여기에서 바로 확인할 수 있어요.
              </Text>
            </View>
          </View>

          {/* 나의 인기 레시피 */}
          <View style={[styles.section, shadows.card]}>
            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionLabel}>My Recipes</Text>
                <Text style={styles.sectionTitle}>나의 인기 레시피</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>준비 중</Text>
              </View>
            </View>
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                레시피를 저장하거나 좋아요하면 이곳에 summary가 표시됩니다.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 회원 탈퇴 모달 */}
      <Modal
        visible={showDeleteConfirm}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteConfirm(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {deleteStep === 'warning' && (
              <>
                <View style={styles.warningIcon}>
                  <Text style={styles.warningIconText}>⚠️</Text>
                </View>
                <Text style={styles.modalTitle}>회원 탈퇴</Text>
                <Text style={styles.modalSubtitle}>정말로 회원 탈퇴를 하시겠습니까?</Text>
                <View style={styles.warningBox}>
                  <Text style={styles.warningTitle}>탈퇴 시 삭제되는 정보:</Text>
                  <Text style={styles.warningItem}>• 계정 정보 및 프로필</Text>
                  <Text style={styles.warningItem}>• 작성한 레시피 및 게시글</Text>
                  <Text style={styles.warningItem}>• 보관함 재료 정보</Text>
                  <Text style={styles.warningItem}>• 즐겨찾기 및 저장된 레시피</Text>
                  <Text style={styles.warningFinal}>⚠️ 모든 데이터는 복구할 수 없습니다.</Text>
                </View>
                <View style={styles.modalButtons}>
                  <Pressable 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setShowDeleteConfirm(false)}
                  >
                    <Text style={styles.cancelButtonText}>취소</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={() => setDeleteStep('password')}
                  >
                    <Text style={styles.confirmButtonText}>계속하기</Text>
                  </Pressable>
                </View>
              </>
            )}

            {deleteStep === 'password' && (
              <>
                <Text style={styles.modalTitle}>비밀번호 확인</Text>
                <Text style={styles.modalSubtitle}>보안을 위해 비밀번호를 입력해주세요.</Text>
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  placeholder="비밀번호를 입력하세요"
                  secureTextEntry
                  style={styles.passwordInput}
                  placeholderTextColor={colors.gray500}
                />
                {passwordError && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
                <View style={styles.modalButtons}>
                  <Pressable 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setDeleteStep('warning')}
                  >
                    <Text style={styles.cancelButtonText}>이전</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={() => setDeleteStep('reason')}
                  >
                    <Text style={styles.confirmButtonText}>확인</Text>
                  </Pressable>
                </View>
              </>
            )}

            {deleteStep === 'reason' && (
              <>
                <Text style={styles.modalTitle}>탈퇴 사유</Text>
                <Text style={styles.modalSubtitle}>서비스 개선을 위해 탈퇴 사유를 알려주세요. (선택사항)</Text>
                <View style={styles.reasonList}>
                  {deleteReasons.map((reason) => (
                    <Pressable
                      key={reason}
                      style={[
                        styles.reasonItem,
                        deleteReason === reason && styles.reasonItemActive,
                      ]}
                      onPress={() => {
                        setDeleteReason(reason);
                        if (reason !== '기타') {
                          setCustomReason('');
                        }
                      }}
                    >
                      <Text style={styles.reasonText}>{reason}</Text>
                    </Pressable>
                  ))}
                  {deleteReason === '기타' && (
                    <TextInput
                      value={customReason}
                      onChangeText={setCustomReason}
                      placeholder="탈퇴 사유를 입력해주세요"
                      multiline
                      style={styles.customReasonInput}
                      placeholderTextColor={colors.gray500}
                    />
                  )}
                </View>
                <View style={styles.modalButtons}>
                  <Pressable 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setDeleteStep('password')}
                  >
                    <Text style={styles.cancelButtonText}>이전</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.modalButton, styles.confirmButton, !deleteReason && styles.disabledButton]}
                    onPress={() => setDeleteStep('final')}
                    disabled={!deleteReason}
                  >
                    <Text style={styles.confirmButtonText}>다음</Text>
                  </Pressable>
                </View>
              </>
            )}

            {deleteStep === 'final' && (
              <>
                <View style={styles.warningIcon}>
                  <Text style={styles.warningIconText}>🗑️</Text>
                </View>
                <Text style={styles.modalTitle}>최종 확인</Text>
                <Text style={styles.modalSubtitle}>정말로 탈퇴하시겠습니까?</Text>
                <View style={styles.finalReasonBox}>
                  <Text style={styles.finalReasonLabel}>선택하신 탈퇴 사유:</Text>
                  <Text style={styles.finalReasonText}>
                    {deleteReason}
                    {deleteReason === '기타' && customReason && ` - ${customReason}`}
                  </Text>
                </View>
                <View style={styles.modalButtons}>
                  <Pressable 
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setDeleteStep('reason')}
                  >
                    <Text style={styles.cancelButtonText}>이전</Text>
                  </Pressable>
                  <Pressable 
                    style={[styles.modalButton, styles.finalDeleteButton]}
                    onPress={() => {
                      // TODO: API 호출
                      Alert.alert('안내', '회원 탈퇴 API 연동 후 처리됩니다.');
                      setShowDeleteConfirm(false);
                    }}
                  >
                    <Text style={styles.finalDeleteButtonText}>탈퇴하기</Text>
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  content: {
    maxWidth: 1152,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    marginTop: spacing.md,
  },
  profileCard: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  profileHeader: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.orange100,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIconText: {
    fontSize: 40,
  },
  profileLabel: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray600,
  },
  profileName: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
  },
  profileSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray700,
  },
  menuSection: {
    gap: spacing.md,
  },
  menuButton: {
    width: '100%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
  },
  menuButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
    textAlign: 'center',
  },
  deleteButton: {
    borderColor: colors.red200,
  },
  deleteButtonText: {
    color: colors.red600,
  },
  section: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  sectionLabel: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray400,
  },
  sectionTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
  },
  badge: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: fontSize.xs,
    color: colors.gray500,
  },
  emptyBox: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.gray400,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing['2xl'],
    maxWidth: 448,
    width: '100%',
    maxHeight: '90%',
  },
  warningIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.red100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  warningIconText: {
    fontSize: 32,
  },
  modalTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  modalSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray600,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  warningBox: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.red50,
    borderWidth: 1,
    borderColor: colors.red200,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  warningTitle: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.red600,
    marginBottom: spacing.xs,
  },
  warningItem: {
    fontSize: fontSize.xs,
    color: colors.red600,
    marginBottom: spacing.xs,
  },
  warningFinal: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.red600,
    marginTop: spacing.md,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.md,
    alignItems: 'center',
  },
  cancelButton: {
    borderColor: colors.gray200,
  },
  cancelButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
  },
  confirmButton: {
    borderColor: colors.red200,
    backgroundColor: colors.red50,
  },
  confirmButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.red600,
  },
  disabledButton: {
    opacity: 0.5,
  },
  passwordInput: {
    width: '100%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: colors.gray900,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.red500,
    marginBottom: spacing.md,
  },
  reasonList: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  reasonItem: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
  },
  reasonItemActive: {
    borderColor: colors.gray300,
  },
  reasonText: {
    fontSize: fontSize.sm,
    color: colors.gray700,
  },
  customReasonInput: {
    width: '100%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: colors.gray900,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  finalReasonBox: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  finalReasonLabel: {
    fontSize: fontSize.xs,
    color: colors.gray600,
    marginBottom: spacing.xs,
  },
  finalReasonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray900,
  },
  finalDeleteButton: {
    borderColor: colors.red200,
    backgroundColor: colors.red600,
  },
  finalDeleteButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.white,
  },
});

export default InfoPage;

