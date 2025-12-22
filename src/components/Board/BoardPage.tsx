// 웹의 게시판 페이지를 React Native로 변환
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, borderRadius, shadows, fontSize, spacing } from '../../styles/theme';
import Top from '../common/Top';
import TabNavigation from '../common/TabNavigation';

const CATEGORY_TABS = ['공지', '자유'] as const;
const CATEGORY_TO_KEY: Record<string, string> = {
  공지: 'notice',
  자유: 'free',
};

const KEY_TO_CATEGORY: Record<string, string> = {
  notice: '공지',
  free: '자유',
};

type Post = {
  _id: string;
  title: string;
  content: string;
  nickName?: string;
  createdAt?: string;
};

function BoardPage(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute();
  const category = (route.params as any)?.category || 'notice';
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // TODO: API 호출
        // const data = await fetchBoardList({ page: 1, limit: 20 });
        // setPosts(data.list || []);
        
        // 임시 데이터
        setPosts([]);
      } catch (err) {
        setError(err instanceof Error ? err.message : '게시글을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [category]);

  const handleTabChange = (tab: string) => {
    const newCategory = CATEGORY_TO_KEY[tab];
    if (newCategory) {
      navigation.setParams({ category: newCategory } as any);
    }
  };

  const currentDisplay = KEY_TO_CATEGORY[category] || '공지';

  return (
    <View style={styles.container}>
      <Top />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* 상단 카테고리 탭 */}
          <View style={styles.tabContainer}>
            <TabNavigation
              tabs={[...CATEGORY_TABS]}
              activeTab={currentDisplay}
              onTabChange={handleTabChange}
            />
          </View>

          {/* 게시글 리스트 */}
          {loading && (
            <View style={styles.centerContainer}>
              <ActivityIndicator size="large" color={colors.gray500} />
              <Text style={styles.loadingText}>게시글을 불러오는 중입니다...</Text>
            </View>
          )}

          {error && !loading && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {!loading && !error && posts.length === 0 && (
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>게시글이 없습니다.</Text>
            </View>
          )}

          {!loading && !error && posts.length > 0 && (
            <View style={styles.postsGrid}>
              {posts.map((post) => (
                <Pressable
                  key={post._id}
                  style={[styles.postCard, shadows.card]}
                  onPress={() => navigation.navigate('BoardDetail' as never, { 
                    id: post._id,
                    type: category,
                  } as never)}
                >
                  <View style={styles.postHeader}>
                    <View style={styles.postHeaderContent}>
                      <Text style={styles.postLabel}>Board</Text>
                      <View style={styles.postCategoryBadge}>
                        <Text style={styles.postCategoryText}>{currentDisplay}</Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.postTitle} numberOfLines={1}>
                    {post.title}
                  </Text>
                  <Text style={styles.postContent} numberOfLines={2}>
                    {post.content}
                  </Text>
                  <View style={styles.postFooter}>
                    <Text style={styles.postAuthor}>{post.nickName || '익명'}</Text>
                    <Text style={styles.postDate} numberOfLines={1}>
                      {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
                    </Text>
                  </View>
                  <View style={styles.postActions}>
                    <Pressable 
                      style={styles.editButton}
                      onPress={(e) => {
                        e.stopPropagation();
                        navigation.navigate('BoardEdit' as never, { 
                          id: post._id,
                          type: category,
                        } as never);
                      }}
                    >
                      <Text style={styles.editButtonText}>편집</Text>
                    </Pressable>
                    <Text style={styles.viewText}>게시글 상세 보기</Text>
                    <Text style={styles.arrow}>→</Text>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
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
  tabContainer: {
    marginBottom: spacing.lg,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
  },
  loadingText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
    marginTop: spacing.md,
  },
  errorContainer: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.red200,
    backgroundColor: colors.red50,
    padding: spacing.md,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.red600,
  },
  emptyText: {
    fontSize: fontSize.sm,
    color: colors.gray500,
  },
  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
  },
  postCard: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    padding: spacing.md,
  },
  postHeader: {
    marginBottom: spacing.md,
  },
  postHeaderContent: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
    backgroundColor: colors.gray50,
    padding: spacing.md,
  },
  postLabel: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    color: colors.gray600,
  },
  postCategoryBadge: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  postCategoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.gray900,
  },
  postTitle: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.gray900,
    marginBottom: spacing.xs,
  },
  postContent: {
    fontSize: fontSize.sm,
    color: colors.gray600,
    marginBottom: spacing.md,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  postAuthor: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.gray900,
  },
  postDate: {
    fontSize: fontSize.xs,
    color: colors.gray500,
    maxWidth: 120,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButton: {
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  editButtonText: {
    fontSize: fontSize.xs,
    fontWeight: '500',
    color: colors.gray700,
  },
  viewText: {
    fontSize: fontSize.xs,
    color: colors.gray500,
  },
  arrow: {
    fontSize: fontSize.xs,
    fontWeight: '600',
    color: colors.gray800,
  },
});

export default BoardPage;

