//기타
import React, { createContext, ReactNode, useContext, useRef } from "react";

//type
import { CategoryTotalType, CategoryValueType, pageValueType } from "../types/commonTypes";

type CommonContextType = {
    categoryTotal: CategoryTotalType[];
    prev: React.RefObject<CategoryValueType[]>;
    success: React.RefObject<boolean>;
}

const CommonContext = createContext<CommonContextType | undefined>(undefined);

export const CommonProvider = ({children}: {children: ReactNode}) => {
    const categoryTotal: CategoryTotalType[] = [
        {
            main: "Main",
            sub: ["Default"],
            detail: [["Default"]],
            detail_1: [[["Default"]]], 
        },
        {
            main: "Recipe",
            sub: ["List", "Info"],
            detail: [["Korean", "Japanese", "Chinese", "Western", "Other"], ["Default"]],
            detail_1: [[["전체", "국/찌개", "밥/면", "반찬", "기타"],
                        ["전체", "국/전골", "밥", "면", "기타"],
                        ["전체", "튀김, 찜", "밥", "면", "기타"],
                        ["전체", "스프/스튜", "빵", "면", "기타"],
                        ["Default"]],[["Default"]]]
        },
        {
            main: "MyPage",
            sub: ["Info", "Storage", "WishList", "MyRecipe", "RecipeInfo", "RecipeWrite"],
            detail: [["Default"], 
                    ["Default"], 
                    ["Korean", "Japanese", "Chinese", "Western", "Other"], 
                    ["Korean", "Japanese", "Chinese", "Western", "Other"], ["Default"], ["Default"]],
            detail_1: [[["Default"]],[["Default"]], 
                        [["전체", "국/찌개", "밥/면", "반찬", "기타"],
                        ["전체", "국/전골", "밥", "면", "기타"],
                        ["전체", "튀김, 찜", "밥", "면", "기타"],
                        ["전체", "스프/스튜", "빵", "면", "기타"],
                        ["Default"]],
                        [["전체", "국/찌개", "밥/면", "반찬", "기타"],
                        ["전체", "국/전골", "밥", "면", "기타"],
                        ["전체", "튀김, 찜", "밥", "면", "기타"],
                        ["전체", "스프/스튜", "빵", "면", "기타"],
                        ["Default"]], [["Default"]], [["Default"]]]
        },
        {
            main: "Community",
            sub: ["List", "Info", "Write"],
            detail: [["Notice", "Board"], ["Default"], ["Default"]],
            detail_1: [[["Default"], ["Default"]], [["Default"]], [["Default"]]]
        }
    ];
    const prev = useRef<CategoryValueType[]>([]);
    const success = useRef<boolean>(false);

    return(
        <CommonContext.Provider value={{categoryTotal, prev, success}}>
            {children}
        </CommonContext.Provider>
    )
}

export const useCommon = (): CommonContextType => {
    const context = useContext(CommonContext);
    if(!context){
        throw new Error("useCommon은 CommonProvider 내부에서 사용해야 합니다.");
    }
    return context;
}