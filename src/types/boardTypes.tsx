type CommentType = {
    profileImg: string,
    userId: string,
    time: string,
    content: string,
}

export type ListValueType = {
    boardId: string;
    title: string;
    userId: string;
    profileImg: string;
    time: string;
    viewCount: number;
}

export type SelectedBoardType = {
    boardId: string,
    title: string,
    content: string,
    userId: string,
    profileImg: string,
    time: string,
    viewCount: number,
    comments: CommentType[]
}