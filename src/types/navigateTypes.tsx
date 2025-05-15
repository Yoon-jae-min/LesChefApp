import { NavigatorScreenParams } from "@react-navigation/native";

export type NavigateType = {
    Main: undefined;
    Recipe: NavigatorScreenParams<RecipeSubType>;
    Community: NavigatorScreenParams<CommunitySubType>;
    MyPage: undefined;
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