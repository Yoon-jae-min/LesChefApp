export type BoardWriteData = {
  title: string;
  content: string;
  boardType?: 'notice' | 'free';
  id?: string;
  nickName?: string;
};

export type BoardEditData = {
  id: string;
  title: string;
  content: string;
};

export type BoardListParams = {
  page?: number;
  limit?: number;
  type?: 'notice' | 'free';
};

export type BoardListResponse = {
  list: Array<{
    _id: string;
    title: string;
    nickName?: string;
    userId?: string;
    viewCount?: number;
    boardType?: 'notice' | 'free';
    createdAt?: string;
    updatedAt?: string;
  }>;
  page: number;
  limit: number;
  total: number;
};

export type BoardDetailResponse = {
  content: {
    _id: string;
    title: string;
    nickName?: string;
    userId?: string;
    viewCount?: number;
    content: string;
    boardType?: 'notice' | 'free';
    createdAt?: string;
    updatedAt?: string;
  };
  comments: Array<{
    _id: string;
    boardId: string;
    nickName?: string;
    userId?: string;
    content: string;
    createdAt?: string;
  }>;
  likeCount?: number;
  liked?: boolean;
};

export type ToggleBoardLikeResponse = {
  liked: boolean;
  likeCount: number;
};
