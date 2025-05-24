import { NavigatorScreenParams } from "@react-navigation/native";

export type NavigateType = {
    Main: undefined;
    Recipe: NavigatorScreenParams<RecipeSubType>;
    Community: NavigatorScreenParams<CommunitySubType>;
    MyPage: NavigatorScreenParams<MyPageSubType>;
};

//sub
export type RecipeSubType = {
    List: undefined;
    Info: undefined;
}

export type CommunitySubType = {
    List: undefined;
    Info: undefined;
    Write: undefined;
}

export type MyPageSubType = {
    Info: undefined;
    Foods: undefined;
    WishList: undefined;
    MyRecipe: undefined;
    RecipeInfo: undefined;
    RecipeWrite: undefined;
}