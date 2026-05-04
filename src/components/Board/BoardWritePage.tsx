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
          <Text style={styles.title}>새 글 작성</Text>
          <Text style={styles.meta}>{boardType === 'notice' ? '공지' : '자유'} 게시판</Text>
          <Text style={styles.label}>제목</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="제목" />
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={content}
            onChangeText={setContent}
            placeholder="내용"
            multiline
          />
          <Pressable style={styles.btn} onPress={onSubmit} disabled={loading}>
            <Text style={styles.btnText}>{loading ? '등록 중…' : '등록'}</Text>
          </Pressable>
          <Pressable onPress={() => (navigation as any).goBack()}>
            <Text style={styles.back}>취소</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  scroll: { padding: spacing.lg },
  card: { borderRadius: borderRadius.xl, borderWidth: 1, borderColor: colors.gray200, padding: spacing.lg, gap: spacing.sm },
  title: { fontSize: fontSize['2xl'], fontWeight: '800' },
  meta: { color: colors.gray600, fontSize: fontSize.sm },
  label: { marginTop: spacing.sm, fontWeight: '700', color: colors.gray800 },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    color: colors.gray900,
  },
  textarea: { minHeight: 160, textAlignVertical: 'top' },
  btn: {
    marginTop: spacing.md,
    backgroundColor: colors.gray900,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '800' },
  back: { marginTop: spacing.md, textAlign: 'center', color: colors.gray600, textDecorationLine: 'underline' },
});

export default BoardWritePage;
