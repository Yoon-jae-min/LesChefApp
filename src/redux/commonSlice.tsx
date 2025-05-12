import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryValueType } from "../types/commonTypes";

const initialState = {
    // categoryTotal : [
    //     {
    //         main: "Main",
    //         sub: ["Default"],
    //         detail: [["Default"]],
    //         detail_1: [[["Default"]]], 
    //     },
    //     {
    //         main: "Recipe",
    //         sub: ["List", "Info"],
    //         detail: [["Korean", "Japanese", "Chinese", "Western", "Other"], ["Default"]],
    //         detail_1: [[["전체", "국/찌개", "밥/면", "반찬", "기타"],
    //                     ["전체", "국/전골", "밥", "면", "기타"],
    //                     ["전체", "튀김, 찜", "밥", "면", "기타"],
    //                     ["전체", "스프/스튜", "빵", "면", "기타"],
    //                     ["Default"]],[["Default"]]]
    //     },
    //     {
    //         main: "MyPage",
    //         sub: ["Info", "Foods", "WishList", "MyRecipe", "RecipeInfo", "RecipeWrite"],
    //         detail: [["Default"], 
    //                 ["Default"], 
    //                 ["Korean", "Japanese", "Chinese", "Western", "Other"], 
    //                 ["Korean", "Japanese", "Chinese", "Western", "Other"], ["Default"], ["Default"]],
    //         detail_1: [[["Default"]],[["Default"]], 
    //                     [["전체", "국/찌개", "밥/면", "반찬", "기타"],
    //                     ["전체", "국/전골", "밥", "면", "기타"],
    //                     ["전체", "튀김, 찜", "밥", "면", "기타"],
    //                     ["전체", "스프/스튜", "빵", "면", "기타"],
    //                     ["Default"]],
    //                     [["전체", "국/찌개", "밥/면", "반찬", "기타"],
    //                     ["전체", "국/전골", "밥", "면", "기타"],
    //                     ["전체", "튀김, 찜", "밥", "면", "기타"],
    //                     ["전체", "스프/스튜", "빵", "면", "기타"],
    //                     ["Default"]], [["Default"]], [["Default"]]]
    //     },
    //     {
    //         main: "Board",
    //         sub: ["List", "Info", "Write"],
    //         detail: [["Notice", "Board"], ["Default"], ["Default"]],
    //         detail_1: [[["Default"], ["Default"]], [["Default"]], [["Default"]]]
    //     }
    // ],
    categoryValue: {
        main: "Main",
        sub: "Default",
        detail: "Default",
        detail_1: "Default"
    }
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers:{
        setCategoryValue: (state, action: PayloadAction<CategoryValueType>) => {
            state.categoryValue = action.payload;
        },
        resetCategoryValue: (state) => {
            state.categoryValue = initialState.categoryValue;
        }
    }
});

export const {setCategoryValue, resetCategoryValue} = categorySlice.actions;
export default categorySlice.reducer;