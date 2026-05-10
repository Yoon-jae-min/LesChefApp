import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { createBoard } from '../../api/board/crud';

function BoardWritePage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const boardType = (route.params as { boardType?: 'notice' | 'free' })?.boardType || 'free';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('작성', '제목과 내용을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      await createBoard({ title: title.trim(), content: content.trim(), boardType });
      Alert.alert('완료', '글이 등록되었습니다.', [{ text: '확인', onPress: () => (navigation as any).goBack() }]);
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.eyebrow}>Board</Text>
          <Text style={styles.title}>새 글 작성</Text>
          <Text style={styles.meta}>{boardType === 'notice' ? '공지' : '자유'} 게시판에 공유할 내용을 작성해주세요.</Text>
          <Text style={styles.label}>제목</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력해주세요"
            placeholderTextColor={colors.stone500}
          />
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={content}
            onChangeText={setContent}
            placeholder="내용을 입력해주세요"
            placeholderTextColor={colors.stone500}
            multiline
          />
          <Pressable style={[styles.btn, shadows.orangeButton]} onPress={onSubmit} disabled={loading}>
            <Text style={styles.btnText}>{loading ? '등록 중…' : '등록'}</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => (navigation as any).goBack()}>
            <Text style={styles.back}>취소</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.md, paddingBottom: spacing['2xl'] },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.stone200,
    backgroundColor: colors.white,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  eyebrow: {
    fontSize: fontSize.xs,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: colors.orange600,
    textTransform: 'uppercase',
  },
  title: { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.gray900 },
  meta: { color: colors.stone500, fontSize: fontSize.sm, lineHeight: fontSize.sm * 1.45 },
  label: { marginTop: spacing.sm, fontWeight: '700', color: colors.stone700 },
  input: {
    borderWidth: 1,
    borderColor: colors.stone200,
    borderRadius: borderRadius.md,
    backgroundColor: colors.stone50,
    padding: spacing.md,
    color: colors.gray900,
  },
  textarea: { minHeight: 160, textAlignVertical: 'top' },
  btn: {
    marginTop: spacing.md,
    backgroundColor: colors.orange600,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '800' },
  cancelButton: { marginTop: spacing.sm, alignItems: 'center', paddingVertical: spacing.sm },
  back: { textAlign: 'center', color: colors.stone500, fontWeight: '700' },
});

export default BoardWritePage;
