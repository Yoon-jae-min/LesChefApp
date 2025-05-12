import { NavigatorScreenParams } from "@react-navigation/native";

export type NavigateType = {
    Main: undefined;
    Recipe: NavigatorScreenParams<RecipeSubType>;
    Board: NavigatorScreenParams<BoardSubType>;
    MyPage: NavigatorScreenParams<MyPageSubType>;
};

//sub
export type RecipeSubType = {
    List: undefined;
    Info: undefined;
}

export type BoardSubType = {
    List: undefined;
    Info: undefined;
    Write: undefined;
}

export type MyPageSubType = {
    Info: undefined;
    Foods: undefined;
    WishList: undefined;
    MyRecipe: undefined;
}

//detail
// export type RecipeListType = {
//     Korean: undefined;
//     Japanese: undefined;
//     Chinese: undefined;
//     Western: undefined;
//     Other: undefined;
// }

// export type BoardDetailType = {
//     Notice: undefined;
//     Board: undefined;
// }