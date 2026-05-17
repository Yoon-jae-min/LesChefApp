import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import FilterTabs from '../common/FilterTabs';
import MyPageLayout from './MyPageLayout';
import {
  addFoodItem,
  deleteFoodItem,
  updateFoodItem,
} from '../../api/foods/content';
import {
  addStoragePlace,
  deleteStoragePlace,
  fetchFoodsList,
  updateStoragePlace,
} from '../../api/foods/place';
import type { FoodItem, StoragePlace } from '../../api/foods/types';

type ItemFormState = {
  name: string;
  volume: number;
  unit: string;
  expiryDate: string;
  memo: string;
};

const EMPTY_FORM: ItemFormState = {
  name: '',
  volume: 1,
  unit: '개',
  expiryDate: '',
  memo: '',
};

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const formatExpiry = (value: Date | string) => {
  if (typeof value === 'string') {
    return value.slice(0, 10);
  }
  return new Date(value).toISOString().slice(0, 10);
};

const getDday = (dateStr: string) => {
  if (!dateStr) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((target.getTime() - today.getTime()) / MS_PER_DAY);
  if (Number.isNaN(diffDays)) return null;
  return diffDays;
};

const getPriority = (dday: number | null) => {
  if (dday === null) {
    return {
      label: '정보 없음',
      tone: { backgroundColor: colors.gray100, borderColor: colors.gray200, textColor: colors.gray500 },
    };
  }
  if (dday < 0) {
    return {
      label: '폐기 필요',
      tone: { backgroundColor: colors.red50, borderColor: colors.red200, textColor: colors.red600 },
    };
  }
  if (dday <= 2) {
    return {
      label: '긴급',
      tone: { backgroundColor: colors.orange50, borderColor: colors.orange200, textColor: colors.orange500 },
    };
  }
  if (dday <= 5) {
    return {
      label: '주의',
      tone: { backgroundColor: colors.yellow50, borderColor: colors.yellow200, textColor: colors.gray700 },
    };
  }
  return {
    label: '안정',
    tone: { backgroundColor: colors.green50, borderColor: colors.green100, textColor: colors.green600 },
  };
};

function StoragePage(): React.JSX.Element {
  const [places, setPlaces] = useState<StoragePlace[]>([]);
  const [activePlaceId, setActivePlaceId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [form, setForm] = useState<ItemFormState>(EMPTY_FORM);

  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [newPlaceName, setNewPlaceName] = useState('');
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [renamePlaceValue, setRenamePlaceValue] = useState('');
  const [placeActionLoading, setPlaceActionLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFoodsList();
      const nextPlaces = data.sectionList || [];
      setPlaces(nextPlaces);
      setActivePlaceId((prev) => {
        if (prev && nextPlaces.some((p) => p._id === prev)) return prev;
        return nextPlaces[0]?._id || '';
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : '보관함을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const activePlace = useMemo(
    () => places.find((p) => p._id === activePlaceId) || null,
    [places, activePlaceId],
  );

  const filteredItems = activePlace?.foodList || [];

  const editingItem = useMemo(() => {
    if (!editingItemId) return null;
    return filteredItems.find((item) => item._id === editingItemId) || null;
  }, [editingItemId, filteredItems]);

  const placeTabLabels = places.map((p) => p.name);

  const handleOpenItemModal = (item?: FoodItem) => {
    if (item) {
      setEditingItemId(item._id);
      setForm({
        name: item.name ?? '',
        volume: item.volume ?? 1,
        unit: item.unit || '개',
        expiryDate: formatExpiry(item.expirate),
        memo: '',
      });
    } else {
      setEditingItemId(null);
      setForm({ ...EMPTY_FORM });
    }
    setIsItemModalOpen(true);
  };

  const handleSubmitItem = async () => {
    if (!activePlaceId) {
      Alert.alert('알림', '보관 장소를 먼저 추가해주세요.');
      return;
    }
    const trimmedName = form.name.trim();
    if (!trimmedName) {
      Alert.alert('알림', '재료명을 입력해주세요.');
      return;
    }
    if (!form.expiryDate.trim()) {
      Alert.alert('알림', '유통기한을 입력해주세요.');
      return;
    }

    setSubmitting(true);
    try {
      if (editingItem) {
        await updateFoodItem({
          contentId: editingItem._id,
          name: trimmedName,
          volume: Number(form.volume) || 0,
          unit: form.unit,
          date: form.expiryDate,
        });
      } else {
        await addFoodItem({
          placeId: activePlaceId,
          name: trimmedName,
          volume: Number(form.volume) || 0,
          unit: form.unit,
          expiryDate: form.expiryDate,
        });
      }
      setIsItemModalOpen(false);
      setEditingItemId(null);
      setForm({ ...EMPTY_FORM });
      await load();
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteItem = (item: FoodItem) => {
    Alert.alert('재료 삭제', `"${item.name}"을(를) 삭제할까요?`, [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          setDeletingId(item._id);
          try {
            await deleteFoodItem(item._id);
            await load();
          } catch (e) {
            Alert.alert('오류', e instanceof Error ? e.message : '삭제에 실패했습니다.');
          } finally {
            setDeletingId(null);
          }
        },
      },
    ]);
  };

  const handleAddPlace = async () => {
    const placeName = newPlaceName.trim();
    if (!placeName) {
      Alert.alert('알림', '보관 장소 이름을 입력해주세요.');
      return;
    }
    setPlaceActionLoading(true);
    try {
      await addStoragePlace(placeName);
      setNewPlaceName('');
      setIsPlaceModalOpen(false);
      await load();
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '장소 추가에 실패했습니다.');
    } finally {
      setPlaceActionLoading(false);
    }
  };

  const handleRenamePlace = async () => {
    if (!activePlaceId) return;
    const nextName = renamePlaceValue.trim();
    if (!nextName) {
      Alert.alert('알림', '새 장소 이름을 입력해주세요.');
      return;
    }
    setPlaceActionLoading(true);
    try {
      const res = await updateStoragePlace(activePlaceId, nextName);
      if (res.exist) {
        throw new Error('이미 같은 이름의 보관 장소가 있습니다.');
      }
      setIsRenameModalOpen(false);
      setRenamePlaceValue('');
      await load();
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '이름 변경에 실패했습니다.');
    } finally {
      setPlaceActionLoading(false);
    }
  };

  const handleDeletePlace = () => {
    if (!activePlaceId || !activePlace) return;
    const count = filteredItems.length;
    Alert.alert(
      '보관 장소 삭제',
      count > 0
        ? `"${activePlace.name}" 장소와 등록된 재료 ${count}개가 함께 삭제됩니다.`
        : `"${activePlace.name}" 장소를 삭제할까요?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            setPlaceActionLoading(true);
            try {
              await deleteStoragePlace(activePlaceId);
              await load();
            } catch (e) {
              Alert.alert('오류', e instanceof Error ? e.message : '장소 삭제에 실패했습니다.');
            } finally {
              setPlaceActionLoading(false);
            }
          },
        },
      ],
    );
  };

  const handlePlaceTabChange = (placeName: string) => {
    const target = places.find((p) => p.name === placeName);
    if (target) setActivePlaceId(target._id);
  };

  return (
    <MyPageLayout
      activeTab="보관함"
      scrollProps={{
        refreshControl: <RefreshControl refreshing={loading} onRefresh={load} />,
      }}
    >
      <View style={[styles.header, shadows.card]}>
        <View>
          <Text style={styles.headerLabel}>My Fridge</Text>
          <Text style={styles.headerTitle}>보관 재료 인벤토리</Text>
          <Text style={styles.headerSubtitle}>
            재료가 얼마나 남았는지, 언제 써야 하는지 한눈에 확인하세요.
          </Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable style={styles.secondaryButton} onPress={() => setIsPlaceModalOpen(true)}>
            <Text style={styles.secondaryButtonText}>장소 추가</Text>
          </Pressable>
          <Pressable
            style={[styles.secondaryButton, !activePlaceId && styles.disabledButton]}
            disabled={!activePlaceId}
            onPress={() => {
              setRenamePlaceValue(activePlace?.name || '');
              setIsRenameModalOpen(true);
            }}
          >
            <Text style={styles.secondaryButtonText}>이름 변경</Text>
          </Pressable>
          <Pressable
            style={[styles.secondaryButton, styles.dangerOutlineButton, !activePlaceId && styles.disabledButton]}
            disabled={!activePlaceId || placeActionLoading}
            onPress={handleDeletePlace}
          >
            <Text style={styles.dangerOutlineButtonText}>장소 삭제</Text>
          </Pressable>
          <Pressable
            style={[styles.addButton, !activePlaceId && styles.disabledButton]}
            disabled={!activePlaceId}
            onPress={() => handleOpenItemModal()}
          >
            <Text style={styles.addButtonText}>재료 추가하기</Text>
          </Pressable>
        </View>
      </View>

      {loading && places.length === 0 ? (
        <ActivityIndicator color={colors.orange600} style={styles.loader} />
      ) : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {places.length > 0 ? (
        <View style={styles.filterContainer}>
          <FilterTabs
            items={placeTabLabels}
            activeItem={activePlace?.name || placeTabLabels[0]}
            onItemChange={handlePlaceTabChange}
            variant="gray"
          />
        </View>
      ) : null}

      {!loading && !error && places.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>아직 등록된 보관 장소가 없어요. 장소 추가로 시작해보세요.</Text>
        </View>
      ) : !loading && !error && filteredItems.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyText}>
            아직 {activePlace?.name ?? '이 장소'}에 등록된 재료가 없어요.
          </Text>
        </View>
      ) : (
        <View style={styles.itemsGrid}>
          {filteredItems.map((item) => {
            const expiry = formatExpiry(item.expirate);
            const dday = getDday(expiry);
            const priority = getPriority(dday);
            const isDeleting = deletingId === item._id;
            return (
              <View key={item._id} style={[styles.itemCard, shadows.card]}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemLabel}>Ingredient</Text>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemQuantity}>
                      {item.volume}
                      {item.unit}
                    </Text>
                  </View>
                  <View style={[styles.priorityBadge, priority.tone]}>
                    <Text style={[styles.priorityText, { color: priority.tone.textColor }]}>
                      {priority.label}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemInfo}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>유통기한</Text>
                    <Text style={[styles.infoValue, dday !== null && dday < 3 && { color: colors.orange500 }]}>
                      {expiry || '-'}
                    </Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>D-Day</Text>
                    <Text style={[styles.infoValue, dday !== null && dday < 0 && { color: colors.red600 }]}>
                      {dday === null ? '-' : dday === 0 ? 'D-DAY' : dday > 0 ? `D-${dday}` : `D+${Math.abs(dday)}`}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemActions}>
                  <Pressable style={styles.actionButton} onPress={() => handleOpenItemModal(item)}>
                    <Text style={styles.actionButtonText}>수정</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.actionButton, styles.deleteActionButton]}
                    disabled={isDeleting}
                    onPress={() => handleDeleteItem(item)}
                  >
                    <Text style={[styles.actionButtonText, styles.deleteActionButtonText]}>
                      {isDeleting ? '삭제 중…' : '삭제'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <Modal visible={isItemModalOpen} transparent animationType="fade" onRequestClose={() => setIsItemModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalLabel}>Inventory</Text>
              <Text style={styles.modalTitle}>{editingItem ? '재료 수정' : '새 재료 추가'}</Text>
              <Text style={styles.modalSubtitle}>
                {activePlace?.name ?? '보관 장소'}에 보관 중인 재료 정보를 입력해주세요.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>재료명</Text>
                <TextInput
                  value={form.name}
                  onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
                  placeholder="예) 양파"
                  style={styles.formInput}
                  placeholderTextColor={colors.gray500}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>수량</Text>
                  <TextInput
                    value={String(form.volume)}
                    onChangeText={(text) => setForm((prev) => ({ ...prev, volume: Number(text) || 0 }))}
                    keyboardType="numeric"
                    style={styles.formInput}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>단위</Text>
                  <TextInput
                    value={form.unit}
                    onChangeText={(text) => setForm((prev) => ({ ...prev, unit: text }))}
                    placeholder="개, 팩, g"
                    style={styles.formInput}
                    placeholderTextColor={colors.gray500}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>유통기한</Text>
                <TextInput
                  value={form.expiryDate}
                  onChangeText={(text) => setForm((prev) => ({ ...prev, expiryDate: text }))}
                  placeholder="YYYY-MM-DD"
                  style={styles.formInput}
                  placeholderTextColor={colors.gray500}
                />
              </View>

              <Pressable
                style={[styles.submitButton, submitting && styles.disabledButton]}
                disabled={submitting}
                onPress={handleSubmitItem}
              >
                <Text style={styles.submitButtonText}>
                  {submitting ? '저장 중…' : editingItem ? '재료 정보 업데이트' : '재료 추가하기'}
                </Text>
              </Pressable>
            </View>

            <Pressable style={styles.closeButton} onPress={() => setIsItemModalOpen(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={isPlaceModalOpen} transparent animationType="fade" onRequestClose={() => setIsPlaceModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>보관 장소 추가</Text>
            <TextInput
              value={newPlaceName}
              onChangeText={setNewPlaceName}
              placeholder="예) 냉장실"
              style={[styles.formInput, { marginTop: spacing.md }]}
              placeholderTextColor={colors.gray500}
            />
            <Pressable
              style={[styles.submitButton, placeActionLoading && styles.disabledButton]}
              disabled={placeActionLoading}
              onPress={handleAddPlace}
            >
              <Text style={styles.submitButtonText}>{placeActionLoading ? '추가 중…' : '추가하기'}</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setIsPlaceModalOpen(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isRenameModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsRenameModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>보관 장소 이름 변경</Text>
            <TextInput
              value={renamePlaceValue}
              onChangeText={setRenamePlaceValue}
              placeholder="새 장소 이름"
              style={[styles.formInput, { marginTop: spacing.md }]}
              placeholderTextColor={colors.gray500}
            />
            <Pressable
              style={[styles.submitButton, placeActionLoading && styles.disabledButton]}
              disabled={placeActionLoading}
              onPress={handleRenamePlace}
            >
              <Text style={styles.submitButtonText}>{placeActionLoading ? '변경 중…' : '변경하기'}</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setIsRenameModalOpen(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </MyPageLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.md,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.lg,
  },
  headerLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.stone500,
  },
  headerTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: '600',
    color: colors.stone800,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.stone500,
  },
  headerActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  secondaryButton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.stone800,
  },
  dangerOutlineButton: {
    borderColor: colors.red200,
  },
  dangerOutlineButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.red600,
  },
  addButton: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  addButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.stone800,
  },
  disabledButton: {
    opacity: 0.5,
  },
  loader: {
    marginVertical: spacing.lg,
  },
  errorText: {
    color: colors.red600,
    fontSize: fontSize.sm,
  },
  filterContainer: {
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.stone50,
    padding: spacing.md,
  },
  emptyBox: {
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    padding: spacing['2xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    textAlign: 'center',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  itemCard: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  itemLabel: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: colors.gray400,
  },
  itemName: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
  },
  itemQuantity: {
    fontSize: fontSize.sm,
    color: colors.gray500,
  },
  priorityBadge: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  priorityText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
  },
  itemInfo: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    color: colors.gray400,
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray900,
  },
  itemActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    minWidth: '40%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
  },
  deleteActionButton: {
    borderColor: colors.red200,
  },
  deleteActionButtonText: {
    color: colors.red600,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing['2xl'],
    maxWidth: 512,
    width: '100%',
    maxHeight: '90%',
  },
  modalHeader: {
    marginBottom: spacing.lg,
  },
  modalLabel: {
    fontSize: fontSize.xs,
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray400,
  },
  modalTitle: {
    fontSize: fontSize['2xl'],
    fontWeight: '600',
    color: colors.gray900,
    marginTop: spacing.xs,
  },
  modalSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    marginTop: spacing.xs,
  },
  form: {
    gap: spacing.md,
  },
  formGroup: {
    gap: spacing.xs,
  },
  formRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  formLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.gray700,
  },
  formInput: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.md,
    fontSize: fontSize.sm,
    color: colors.gray900,
  },
  submitButton: {
    width: '100%',
    borderRadius: borderRadius.xl,
    backgroundColor: colors.black,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  submitButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.white,
  },
  closeButton: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: fontSize.xl,
    color: colors.gray500,
  },
});

export default StoragePage;
