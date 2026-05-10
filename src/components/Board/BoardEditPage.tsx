import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { updateBoard } from '../../api/board/crud';
import { fetchBoardDetail } from '../../api/board/queries';

function BoardEditPage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const { id, title: initialTitle, content: initialContent } = (route.params as {
    id?: string;
    title?: string;
    content?: string;
  }) || {};

  const [title, setTitle] = useState(initialTitle || '');
  const [content, setContent] = useState(initialContent || '');
  const [loading, setLoading] = useState(false);
  const [bootLoading, setBootLoading] = useState(!initialTitle && !initialContent && !!id);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id || (initialTitle && initialContent)) {
        setBootLoading(false);
        return;
      }
      try {
        const detail = await fetchBoardDetail(String(id));
        if (cancelled) return;
        setTitle(detail.content.title);
        setContent(detail.content.content);
      } catch (e) {
        Alert.alert('오류', e instanceof Error ? e.message : '게시글을 불러오지 못했습니다.');
      } finally {
        if (!cancelled) setBootLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, initialTitle, initialContent]);

  const onSubmit = async () => {
    if (!id) {
      Alert.alert('오류', '게시글 ID가 없습니다.');
      return;
    }
    if (!title.trim() || !content.trim()) {
      Alert.alert('수정', '제목과 내용을 입력해주세요.');
      return;
    }
    setLoading(true);
    try {
      await updateBoard({ id: String(id), title: title.trim(), content: content.trim() });
      Alert.alert('완료', '수정되었습니다.', [{ text: '확인', onPress: () => (navigation as any).goBack() }]);
    } catch (e) {
      Alert.alert('오류', e instanceof Error ? e.message : '수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (bootLoading) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.eyebrow}>Board</Text>
          <Text style={styles.title}>글 수정</Text>
          <Text style={styles.meta}>게시글 내용을 수정하고 저장해주세요.</Text>
          <Text style={styles.label}>제목</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} />
          <Text style={styles.label}>내용</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={content}
            onChangeText={setContent}
            multiline
          />
          <Pressable style={[styles.btn, shadows.orangeButton]} onPress={onSubmit} disabled={loading}>
            <Text style={styles.btnText}>{loading ? '저장 중…' : '저장'}</Text>
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

export default BoardEditPage;
