import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { borderRadius, colors, fontSize, shadows, spacing } from '../../styles/theme';
import { STORAGE_KEYS } from '../../constants/storageKeys';
import MyPageLayout from './MyPageLayout';

type DeleteStep = 'warning' | 'password' | 'reason' | 'final';

type StoredUser = {
  id?: string;
  name?: string;
  nickName?: string;
  tel?: string;
};

const deleteReasons = [
  '서비스 이용이 불편함',
  '원하는 기능이 없음',
  '다른 서비스 이용',
  '개인정보 보호 우려',
  '기타',
];

function InfoField({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.infoField}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '-'}</Text>
    </View>
  );
}

function SocialRow({ provider, linked }: { provider: string; linked: boolean }) {
  return (
    <View style={styles.socialRow}>
      <View>
        <Text style={styles.socialName}>{provider}</Text>
        <Text style={styles.socialHint}>{linked ? '연동됨' : '아직 연동되지 않았어요'}</Text>
      </View>
      <View style={[styles.socialBadge, linked ? styles.socialBadgeOn : styles.socialBadgeOff]}>
        <Text style={[styles.socialBadgeText, linked ? styles.socialBadgeTextOn : styles.socialBadgeTextOff]}>
          {linked ? 'Linked' : 'Connect'}
        </Text>
      </View>
    </View>
  );
}

function InfoPage(): React.JSX.Element {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteStep, setDeleteStep] = useState<DeleteStep>('warning');
  const [password, setPassword] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [user, setUser] = useState<StoredUser>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
        setUser(raw ? JSON.parse(raw) : {});
      } catch (err) {
        console.error('사용자 정보 로드 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const closeDeleteModal = () => {
    setShowDeleteConfirm(false);
    setDeleteStep('warning');
    setPassword('');
    setDeleteReason('');
    setCustomReason('');
  };

  if (loading) {
    return (
      <MyPageLayout activeTab="내 정보">
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color={colors.orange600} />
          <Text style={styles.loadingText}>정보를 불러오는 중입니다...</Text>
        </View>
      </MyPageLayout>
    );
  }

  const nickname = user.nickName || user.name || 'user';

  return (
    <MyPageLayout activeTab="내 정보">
      <View style={styles.dashboard}>
        <View style={[styles.profileCard, shadows.card]}>
          <View style={styles.profileHero}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{nickname.slice(0, 1).toUpperCase()}</Text>
            </View>
            <View style={styles.profileTextWrap}>
              <Text style={styles.cardEyebrow}>Profile</Text>
              <Text style={styles.profileName}>{nickname}</Text>
              <Text style={styles.profileSubtitle}>나의 LesChef 요리 여정</Text>
            </View>
          </View>

          <View style={styles.profileInfoBox}>
            <InfoField label="ID" value={user.id} />
            <InfoField label="Name" value={user.name} />
            <InfoField label="Nickname" value={user.nickName} />
            <InfoField label="Tel" value={user.tel} />
          </View>

          <View style={styles.actionGrid}>
            {['정보확인', '정보변경', '비밀번호 변경'].map((label) => (
              <Pressable
                key={label}
                style={styles.actionTile}
                onPress={() => Alert.alert('안내', `${label} 기능은 웹 기능과 연결 예정입니다.`)}
              >
                <Text style={styles.actionTileText}>{label}</Text>
              </Pressable>
            ))}
            <Pressable
              style={[styles.actionTile, styles.withdrawTile]}
              onPress={() => setShowDeleteConfirm(true)}
            >
              <Text style={[styles.actionTileText, styles.withdrawText]}>회원 탈퇴</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.sectionCard, shadows.card]}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.cardEyebrow}>Account Link</Text>
              <Text style={styles.sectionTitle}>소셜 계정 연동</Text>
            </View>
          </View>
          <SocialRow provider="Kakao" linked={false} />
          <SocialRow provider="Google" linked={false} />
          <SocialRow provider="Naver" linked={false} />
        </View>

        <View style={[styles.sectionCard, shadows.card]}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.cardEyebrow}>Inventory Alert</Text>
              <Text style={styles.sectionTitle}>기한 임박 물품</Text>
            </View>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>0 items</Text>
            </View>
          </View>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              아직 임박한 재료가 없어요. 재료를 추가하면 여기에서 바로 확인할 수 있어요.
            </Text>
          </View>
        </View>

        <View style={[styles.sectionCard, shadows.card]}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.cardEyebrow}>My Recipes</Text>
              <Text style={styles.sectionTitle}>나의 인기 레시피</Text>
            </View>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>준비 중</Text>
            </View>
          </View>
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>
              내가 작성한 레시피 중 반응이 좋은 레시피를 웹처럼 이곳에 보여줄 예정입니다.
            </Text>
          </View>
        </View>
      </View>

      <Modal
        visible={showDeleteConfirm}
        transparent
        animationType="fade"
        onRequestClose={closeDeleteModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {deleteStep === 'warning' && (
              <>
                <Text style={styles.modalEyebrow}>Withdraw</Text>
                <Text style={styles.modalTitle}>회원 탈퇴</Text>
                <Text style={styles.modalSubtitle}>정말로 회원 탈퇴를 진행하시겠습니까?</Text>
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>계정 정보, 작성한 레시피, 보관함 정보는 복구할 수 없습니다.</Text>
                </View>
                <View style={styles.modalButtons}>
                  <Pressable style={styles.cancelButton} onPress={closeDeleteModal}>
                    <Text style={styles.cancelButtonText}>취소</Text>
                  </Pressable>
                  <Pressable style={styles.confirmButton} onPress={() => setDeleteStep('password')}>
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
                  onChangeText={setPassword}
                  placeholder="비밀번호를 입력하세요"
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor={colors.stone500}
                />
                <View style={styles.modalButtons}>
                  <Pressable style={styles.cancelButton} onPress={() => setDeleteStep('warning')}>
                    <Text style={styles.cancelButtonText}>이전</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.confirmButton, !password && styles.disabledButton]}
                    disabled={!password}
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
                <Text style={styles.modalSubtitle}>서비스 개선을 위해 사유를 알려주세요.</Text>
                <View style={styles.reasonList}>
                  {deleteReasons.map((reason) => (
                    <Pressable
                      key={reason}
                      style={[styles.reasonItem, deleteReason === reason && styles.reasonItemActive]}
                      onPress={() => setDeleteReason(reason)}
                    >
                      <Text style={styles.reasonText}>{reason}</Text>
                    </Pressable>
                  ))}
                </View>
                {deleteReason === '기타' ? (
                  <TextInput
                    value={customReason}
                    onChangeText={setCustomReason}
                    placeholder="탈퇴 사유를 입력해주세요"
                    multiline
                    style={[styles.input, styles.textarea]}
                    placeholderTextColor={colors.stone500}
                  />
                ) : null}
                <View style={styles.modalButtons}>
                  <Pressable style={styles.cancelButton} onPress={() => setDeleteStep('password')}>
                    <Text style={styles.cancelButtonText}>이전</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.confirmButton, !deleteReason && styles.disabledButton]}
                    disabled={!deleteReason}
                    onPress={() => setDeleteStep('final')}
                  >
                    <Text style={styles.confirmButtonText}>다음</Text>
                  </Pressable>
                </View>
              </>
            )}

            {deleteStep === 'final' && (
              <>
                <Text style={styles.modalTitle}>최종 확인</Text>
                <Text style={styles.modalSubtitle}>정말로 탈퇴하시겠습니까?</Text>
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>
                    선택 사유: {deleteReason}
                    {deleteReason === '기타' && customReason ? ` - ${customReason}` : ''}
                  </Text>
                </View>
                <View style={styles.modalButtons}>
                  <Pressable style={styles.cancelButton} onPress={() => setDeleteStep('reason')}>
                    <Text style={styles.cancelButtonText}>이전</Text>
                  </Pressable>
                  <Pressable
                    style={styles.finalDeleteButton}
                    onPress={() => {
                      Alert.alert('안내', '회원 탈퇴 API 연동 후 처리됩니다.');
                      closeDeleteModal();
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
    </MyPageLayout>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    gap: spacing.lg,
  },
  loadingCard: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.stone500,
  },
  profileCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.sm,
    gap: spacing.md,
  },
  profileHero: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.orange100,
    backgroundColor: colors.orange50,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: fontSize['3xl'],
    fontWeight: '800',
    color: colors.orange600,
  },
  profileTextWrap: {
    flex: 1,
  },
  cardEyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  profileName: {
    marginTop: spacing.xs,
    fontSize: fontSize['2xl'],
    fontWeight: '800',
    color: colors.stone800,
  },
  profileSubtitle: {
    marginTop: 2,
    fontSize: fontSize.sm,
    color: colors.stone500,
  },
  profileInfoBox: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  infoField: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.stone100,
    gap: spacing.xs,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.stone500,
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.stone800,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionTile: {
    flex: 1,
    minWidth: '45%',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingVertical: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  actionTileText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.stone700,
  },
  withdrawTile: {
    borderColor: colors.red200,
    backgroundColor: colors.red50,
  },
  withdrawText: {
    color: colors.red600,
  },
  sectionCard: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.lg,
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  sectionTitle: {
    marginTop: spacing.xs,
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.stone800,
  },
  countPill: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  countPillText: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    color: colors.stone500,
  },
  socialRow: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  socialName: {
    fontSize: fontSize.base,
    fontWeight: '800',
    color: colors.stone800,
  },
  socialHint: {
    marginTop: 2,
    fontSize: fontSize.sm,
    color: colors.stone500,
  },
  socialBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  socialBadgeOn: {
    borderColor: colors.green100,
    backgroundColor: colors.green50,
  },
  socialBadgeOff: {
    borderColor: colors.orange200,
    backgroundColor: colors.orange50,
  },
  socialBadgeText: {
    fontSize: fontSize.xs,
    fontWeight: '800',
  },
  socialBadgeTextOn: {
    color: colors.green600,
  },
  socialBadgeTextOff: {
    color: colors.orange600,
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
    textAlign: 'center',
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.stone500,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(41, 37, 36, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modalContent: {
    width: '100%',
    maxWidth: 448,
    maxHeight: '90%',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.xl,
    gap: spacing.md,
  },
  modalEyebrow: {
    textAlign: 'center',
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: colors.red600,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: fontSize['2xl'],
    fontWeight: '800',
    color: colors.stone800,
  },
  modalSubtitle: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.stone500,
  },
  warningBox: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.red200,
    backgroundColor: colors.red50,
    padding: spacing.md,
  },
  warningText: {
    fontSize: fontSize.sm,
    lineHeight: 20,
    color: colors.red600,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  cancelButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    padding: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: colors.stone700,
  },
  confirmButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.orange600,
    padding: spacing.md,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: colors.white,
  },
  disabledButton: {
    opacity: 0.45,
  },
  input: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: colors.stone800,
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  reasonList: {
    gap: spacing.sm,
  },
  reasonItem: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.stone200,
    padding: spacing.md,
  },
  reasonItemActive: {
    borderColor: colors.orange400,
    backgroundColor: colors.orange50,
  },
  reasonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.stone700,
  },
  finalDeleteButton: {
    flex: 1,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.red600,
    padding: spacing.md,
    alignItems: 'center',
  },
  finalDeleteButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '800',
    color: colors.white,
  },
});

export default InfoPage;
