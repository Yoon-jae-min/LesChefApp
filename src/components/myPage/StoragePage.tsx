// 웹의 보관함 페이지를 React Native로 변환
import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal, TextInput } from 'react-native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';
import FilterTabs from '../common/FilterTabs';

type StorageZone = '냉장실' | '냉동실' | '야채칸' | '실온' | '기타';

type InventoryItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  purchaseDate: string;
  expiryDate: string;
  memo?: string;
};

type InventoryMap = Record<StorageZone, InventoryItem[]>;

const STORAGE_ZONES: StorageZone[] = ['냉장실', '냉동실', '야채칸', '실온', '기타'];

const SAMPLE_INVENTORY: InventoryMap = {
  냉장실: [
    {
      id: '1',
      name: '방울토마토',
      quantity: 1,
      unit: '팩',
      purchaseDate: '2025-01-15',
      expiryDate: '2025-01-25',
    },
    {
      id: '2',
      name: '두부',
      quantity: 2,
      unit: '모',
      purchaseDate: '2025-01-21',
      expiryDate: '2025-01-28',
    },
  ],
  냉동실: [
    {
      id: '3',
      name: '닭가슴살',
      quantity: 5,
      unit: '팩',
      purchaseDate: '2025-01-10',
      expiryDate: '2025-03-10',
    },
  ],
  야채칸: [
    {
      id: '4',
      name: '양파',
      quantity: 3,
      unit: '개',
      purchaseDate: '2025-01-12',
      expiryDate: '2025-02-05',
    },
  ],
  실온: [
    {
      id: '5',
      name: '감자',
      quantity: 6,
      unit: '개',
      purchaseDate: '2025-01-09',
      expiryDate: '2025-02-01',
    },
  ],
  기타: [],
};

const UNITS = ['개', '팩', '봉지', '모', '컵', '병', '기타'];

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const getDday = (dateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((target.getTime() - today.getTime()) / MS_PER_DAY);
  if (Number.isNaN(diffDays)) return null;
  return diffDays;
};

const getPriority = (dday: number | null) => {
  if (dday === null) return { label: '정보 없음', tone: { backgroundColor: colors.gray100, borderColor: colors.gray200, textColor: colors.gray500 } };
  if (dday < 0) return { label: '폐기 필요', tone: { backgroundColor: colors.red50, borderColor: colors.red200, textColor: colors.red600 } };
  if (dday <= 2) return { label: '긴급', tone: { backgroundColor: colors.orange50, borderColor: colors.orange200, textColor: colors.orange500 } };
  if (dday <= 5) return { label: '주의', tone: { backgroundColor: colors.yellow50, borderColor: colors.yellow200, textColor: colors.gray700 } };
  return { label: '안정', tone: { backgroundColor: colors.green50, borderColor: colors.green100, textColor: colors.green600 } };
};

function StoragePage(): React.JSX.Element {
  const [activePlace, setActivePlace] = useState<StorageZone>('냉장실');
  const [inventory, setInventory] = useState<InventoryMap>(SAMPLE_INVENTORY);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const editingItem = useMemo(() => {
    if (!editingItemId) return null;
    return inventory[activePlace].find((item) => item.id === editingItemId) || null;
  }, [editingItemId, inventory, activePlace]);

  const [form, setForm] = useState<Omit<InventoryItem, 'id'>>({
    name: '',
    quantity: 1,
    unit: '개',
    purchaseDate: '',
    expiryDate: '',
    memo: '',
  });

  const filteredItems = inventory[activePlace];

  const handleOpenModal = (item?: InventoryItem) => {
    if (item) {
      setEditingItemId(item.id);
      setForm({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        purchaseDate: item.purchaseDate,
        expiryDate: item.expiryDate,
        memo: item.memo || '',
      });
    } else {
      setEditingItemId(null);
      setForm({
        name: '',
        quantity: 1,
        unit: '개',
        purchaseDate: '',
        expiryDate: '',
        memo: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    const newItem: InventoryItem = {
      id: editingItemId ?? `item-${Date.now()}`,
      ...form,
    };

    setInventory((prev) => {
      const list = prev[activePlace];
      const existingIndex = list.findIndex((item) => item.id === editingItemId);
      let nextList: InventoryItem[];
      if (existingIndex >= 0) {
        nextList = [...list];
        nextList[existingIndex] = newItem;
      } else {
        nextList = [...list, newItem];
      }
      return { ...prev, [activePlace]: nextList };
    });

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setInventory((prev) => ({
      ...prev,
      [activePlace]: prev[activePlace].filter((item) => item.id !== id),
    }));
  };

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 헤더 */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerLabel}>My Fridge</Text>
              <Text style={styles.headerTitle}>보관 재료 인벤토리</Text>
              <Text style={styles.headerSubtitle}>
                재료가 얼마나 남았는지, 언제 써야 하는지 한눈에 확인하세요.
              </Text>
            </View>
            <Pressable 
              style={styles.addButton}
              onPress={() => handleOpenModal()}
            >
              <Text style={styles.addButtonText}>재료 추가하기</Text>
            </Pressable>
          </View>

          {/* 필터 탭 */}
          <View style={styles.filterContainer}>
            <FilterTabs
              items={STORAGE_ZONES}
              activeItem={activePlace}
              onItemChange={(item) => setActivePlace(item as StorageZone)}
              variant="gray"
            />
          </View>

          {/* 재료 리스트 */}
          {filteredItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                아직 {activePlace}에 등록된 재료가 없어요.
              </Text>
            </View>
          ) : (
            <View style={styles.itemsGrid}>
              {filteredItems.map((item) => {
                const dday = getDday(item.expiryDate);
                const priority = getPriority(dday);
                return (
                  <View key={item.id} style={[styles.itemCard, shadows.card]}>
                    <View style={styles.itemHeader}>
                      <View>
                        <Text style={styles.itemLabel}>Ingredient</Text>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemQuantity}>
                          {item.quantity}
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
                        <Text style={styles.infoLabel}>구매일</Text>
                        <Text style={styles.infoValue}>{item.purchaseDate || '-'}</Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>유통기한</Text>
                        <Text style={[styles.infoValue, dday !== null && dday < 3 && { color: colors.orange500 }]}> 
                          {item.expiryDate || '-'}
                        </Text>
                      </View>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>D-Day</Text>
                        <Text style={[styles.infoValue, dday !== null && dday < 0 && { color: colors.red600 }]}>
                          {dday === null ? '-' : dday === 0 ? 'D-DAY' : dday > 0 ? `D-${dday}` : `D+${Math.abs(dday)}`}
                        </Text>
                      </View>
                    </View>

                    {item.memo && (
                      <View style={styles.memoBox}>
                        <Text style={styles.memoText}>{item.memo}</Text>
                      </View>
                    )}

                    <View style={styles.itemActions}>
                      <Pressable 
                        style={styles.actionButton}
                        onPress={() => handleOpenModal(item)}
                      >
                        <Text style={styles.actionButtonText}>수정</Text>
                      </Pressable>
                      <Pressable 
                        style={[styles.actionButton, styles.deleteActionButton]}
                        onPress={() => handleDelete(item.id)}
                      >
                        <Text style={[styles.actionButtonText, styles.deleteActionButtonText]}>삭제</Text>
                      </Pressable>
                      <Pressable style={[styles.actionButton, styles.findActionButton]}>
                        <Text style={[styles.actionButtonText, styles.findActionButtonText]}>레시피 찾기</Text>
                      </Pressable>
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* 모달 */}
      <Modal
        visible={isModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalLabel}>Inventory</Text>
              <Text style={styles.modalTitle}>
                {editingItem ? '재료 수정' : '새 재료 추가'}
              </Text>
              <Text style={styles.modalSubtitle}>
                {activePlace}에 보관 중인 재료 정보를 입력해주세요.
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
                    value={form.quantity.toString()}
                    onChangeText={(text) => setForm((prev) => ({ ...prev, quantity: Number(text) || 0 }))}
                    keyboardType="numeric"
                    style={styles.formInput}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>단위</Text>
                  <View style={styles.formInput}>
                    {/* TODO: Picker 추가 */}
                    <Text style={styles.formInputText}>{form.unit}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>구매일</Text>
                  <TextInput
                    value={form.purchaseDate}
                    onChangeText={(text) => setForm((prev) => ({ ...prev, purchaseDate: text }))}
                    placeholder="YYYY-MM-DD"
                    style={styles.formInput}
                    placeholderTextColor={colors.gray500}
                  />
                </View>
                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>유통기한</Text>
                  <TextInput
                    value={form.expiryDate}
                    onChangeText={(text) => setForm((prev) => ({ ...prev, expiryDate: text }))}
                    placeholder="YYYY-MM-DD"
                    style={styles.formInput}
                    placeholderTextColor={colors.gray500}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>메모 (선택)</Text>
                <TextInput
                  value={form.memo}
                  onChangeText={(text) => setForm((prev) => ({ ...prev, memo: text }))}
                  placeholder="레시피 계획, 손질 상태 등 자유롭게 기록하세요."
                  multiline
                  style={[styles.formInput, styles.formTextarea]}
                  placeholderTextColor={colors.gray500}
                />
              </View>

              <Pressable 
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>
                  {editingItem ? '재료 정보 업데이트' : '재료 추가하기'}
                </Text>
              </Pressable>
            </View>

            <Pressable 
              style={styles.closeButton}
              onPress={() => setIsModalOpen(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
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
  header: {
    gap: spacing.md,
  },
  headerLabel: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray400,
  },
  headerTitle: {
    fontSize: fontSize['3xl'],
    fontWeight: '600',
    color: colors.gray900,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.gray500,
  },
  addButton: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
  },
  addButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.gray900,
  },
  filterContainer: {
    borderRadius: borderRadius.xl + 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
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
  memoBox: {
    borderRadius: borderRadius.xl,
    backgroundColor: colors.gray50,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  memoText: {
    fontSize: fontSize.sm,
    color: colors.gray600,
  },
  itemActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    minWidth: '30%',
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
  findActionButton: {
    borderColor: colors.green100,
  },
  findActionButtonText: {
    color: colors.green600,
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
  formInputText: {
    fontSize: fontSize.sm,
    color: colors.gray900,
  },
  formTextarea: {
    minHeight: 80,
    textAlignVertical: 'top',
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

