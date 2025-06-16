import { createContext, ReactNode, useContext } from "react";

//Board
type BoardListType = {
    boardId: string;
    title: string;
    userId: string;
    profileImg: string;
    time: string;
    viewCount: number;
}

//Recipe
type RecipeListType = {
    recipeId: string;
    foodName: string;
    foodImg: string;
    userId: string;
    profileImg: string;
    mainCg: string;
    subCg: string;
    time: number;
}

//Storage
type StorageItem = {
    name: string,
    amount: string,
    expire: string,
}

type StorageListType = {
    place: string,
    items: StorageItem[]
}

type DummyType = {
    boardListData: BoardListType[][];
    recipeListData: RecipeListType[];
    storageListData: StorageListType[];
}

const DummyContext = createContext<DummyType | undefined>(undefined);

export const DummyProvider = ({children}: {children: ReactNode}) => {
    const boardListData = [
        [
            {
                boardId: "11111",
                title: "공지1",
                userId: "admin2",
                profileImg: "",
                time: "2025.03.01 19:19:19",
                viewCount: 0,
            },
            {
                boardId: "22222",
                title: "반갑습니다",
                userId: "admin2",
                profileImg: "",
                time: "2025.01.22 05:30:12",
                viewCount: 0,
            },
            {
                boardId: "33333",
                title: "이벤트1",
                userId: "admin1",
                profileImg: "",
                time: "2024.12.12 00:11:22",
                viewCount: 0,
            }
        ],
        [
            {
                boardId: "!11111",
                title: "테스트--------",
                userId: "woasl",
                profileImg: "",
                time: "2025.05.01 20:30:48",
                viewCount: 4,
            },
            {
                boardId: "!22222",
                title: "자유 게시판",
                userId: "free",
                profileImg: "",
                time: "2025.01.15 10:23:45",
                viewCount: 1002,
            },
            {
                boardId: "!33333",
                title: "안녕하세요!!!!!!",
                userId: "hello123",
                profileImg: "",
                time: "2024.12.22 09:11:22",
                viewCount: 123,
            },
            {
                boardId: "!44444",
                title: "좋은하루입니다",
                userId: "tleod1818",
                profileImg: "",
                time: "2024.12.12 00:11:22",
                viewCount: 1526,
            },
        ]
    ];

    const recipeListData = [
        {
            recipeId: "1",
            foodName: "성게미역국",
            foodImg: "../../assets/image/noImage.png",
            userId: "yoon",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "국/찌개",
            time: 30,
        },
        {
            recipeId: "2",
            foodName: "미역오이냉국",
            foodImg: "../../assets/image/noImage.png",
            userId: "hong",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "국/찌개",
            time: 10,
        },
        {
            recipeId: "3",
            foodName: "곤드레전",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "기타",
            time: 20,
        },
        {
            recipeId: "4",
            foodName: "김치 비빔 국수",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "밥/면",
            time: 20,
        },
        {
            recipeId: "5",
            foodName: "꼬막장",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "반찬",
            time: 20,
        },
        {
            recipeId: "6",
            foodName: "파채불고기",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "반찬",
            time: 20,
        },
        {
            recipeId: "7",
            foodName: "표고버섯 덮밥",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Korean",
            subCg: "밥/면",
            time: 20,
        },
        {
            recipeId: "8",
            foodName: "스키야키",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Japanese",
            subCg: "국/전골",
            time: 20,
        },
        {
            recipeId: "9",
            foodName: "마라탕",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Chinese",
            subCg: "기타",
            time: 20,
        },
        {
            recipeId: "10",
            foodName: "까르보나라",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Western",
            subCg: "면",
            time: 20,
        },
        {
            recipeId: "11",
            foodName: "상하이 파스타",
            foodImg: "../../assets/image/noImage.png",
            userId: "kim",
            profileImg: "../../assets/image/profile.png",
            mainCg: "Other",
            subCg: "면",
            time: 20,
        }
    ]

    const storageListData = [
        {
            place: "냉장고",
            items: [
                {
                    name: "양파",
                    amount: "2망",
                    expire: "2025.07.10" 
                },
                {
                    name: "닭",
                    amount: "1마리",
                    expire: "2025.06.26" 
                }
            ]
        },
        {
            place: "서랍",
            items: [
                {
                    name: "고무장갑",
                    amount: "5개",
                    expire: "-" 
                },
                {
                    name: "물티슈",
                    amount: "5개",
                    expire: "-" 
                }
            ]
        },
        {
            place: "김치냉장고",
            items: [
                {
                    name: "김치",
                    amount: "2통",
                    expire: "2026.01.02" 
                },
                {
                    name: "사과",
                    amount: "11개",
                    expire: "2025.08.20" 
                }
            ]
        }
    ];

    return(
        <DummyContext.Provider value={{boardListData, recipeListData, storageListData}}>
            {children}
        </DummyContext.Provider>
    )
}

export const useDummy = (): DummyType => {
    const context = useContext(DummyContext);
    if(!context){
        throw new Error("provider 내부에서 실행 필요");
    }
    return context;
}