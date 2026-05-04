import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Top from '../common/Top';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import { fetchBoardDetail } from '../../api/board/queries';
import { toggleBoardLike } from '../../api/board/like';
import { createBoardComment } from '../../api/board/comment';
import type { BoardDetailResponse } from '../../api/board/types';

function BoardDetailPage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = (route.params as { id?: string }) || {};

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<BoardDetailResponse | null>(null);
  const [comment, setComment] = useState('');

  const reload = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchBoardDetail(String(id));
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : '불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, [id]);

  const onLike = async () => {
    if (!id) return;
    try {
      const res = await toggleBoardLike(String(id));
      setData((prev) =>
        prev
          ? { ...prev, likeCount: res.likeCount, liked: res.liked, content: { ...prev.content } }
          : prev,
      );
    } catch {
      Alert.alert('좋아요', '처리에 실패했습니다.');
    }
  };

  const onComment = async () => {
    if (!id || !comment.trim()) return;
    try {
      await createBoardComment({ boardId: String(id), content: comment.trim() });
      setComment('');
      await reload();
    } catch (e) {
      Alert.alert('댓글', e instanceof Error ? e.message : '작성에 실패했습니다.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.muted}>불러오는 중…</Text>
        </View>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.container}>
        <Top />
        <View style={styles.center}>
          <Text style={styles.errorText}>{error || '게시글을 찾을 수 없습니다.'}</Text>
          <Pressable onPress={() => (navigation as any).goBack()}>
            <Text style={styles.muted}>돌아가기</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const c = data.content;

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, shadows.card]}>
          <Text style={styles.title}>{c.title}</Text>
          <Text style={styles.meta}>
            {c.nickName || '익명'} · 조회 {c.viewCount ?? 0} · 좋아요 {data.likeCount ?? 0}
          </Text>
          <Text style={styles.body}>{c.content}</Text>
          <Pressable style={styles.likeBtn} onPress={onLike}>
            <Text style={styles.likeText}>{data.liked ? '♥ 좋아요 취소' : '♡ 좋아요'}</Text>
          </Pressable>
          <Pressable
            style={styles.editBtn}
            onPress={() =>
              (navigation as any).navigate('BoardEdit', {
                id: c._id,
                title: c.title,
                content: c.content,
                boardType: c.boardType,
              })
            }
          >
            <Text style={styles.editText}>수정</Text>
          </Pressable>
        </View>

        <View style={[styles.card, shadows.card]}>
          <Text style={styles.sectionTitle}>댓글</Text>
          <View style={styles.commentRow}>
            <TextInput
              style={styles.input}
              value={comment}
              onChangeText={setComment}
              placeholder="댓글을 입력하세요"
              placeholderTextColor={colors.gray500}
            />
            <Pressable style={styles.send} onPress={onComment}>
              <Text style={styles.sendText}>등록</Text>
            </Pressable>
          </View>
          {data.comments?.length ? (
            data.comments.map((cm) => (
              <View key={cm._id} style={styles.cmt}>
                <Text style={styles.cmtMeta}>{cm.nickName || '익명'}</Text>
                <Text style={styles.cmtBody}>{cm.content}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.muted}>댓글이 없습니다.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  scroll: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing['2xl'] },
  card: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: spacing.lg,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  title: { fontSize: fontSize['2xl'], fontWeight: '800', color: colors.gray900 },
  meta: { fontSize: fontSize.sm, color: colors.gray600 },
  body: { fontSize: fontSize.base, color: colors.gray800, lineHeight: 22, marginTop: spacing.sm },
  likeBtn: {
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  likeText: { fontWeight: '700', color: colors.gray900 },
  editBtn: { alignSelf: 'flex-end' },
  editText: { color: colors.gray700, textDecorationLine: 'underline' },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: '800' },
  commentRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.gray900,
  },
  send: {
    backgroundColor: colors.gray900,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  sendText: { color: colors.white, fontWeight: '700' },
  cmt: { paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.gray100 },
  cmtMeta: { fontSize: fontSize.xs, color: colors.gray500 },
  cmtBody: { marginTop: 4, color: colors.gray900 },
  muted: { color: colors.gray500 },
  errorText: { color: colors.red600, textAlign: 'center', paddingHorizontal: spacing.lg },
});

export default BoardDetailPage;
