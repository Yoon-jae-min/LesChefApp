import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryValueType } from "../types/commonTypes";

const initialState = {
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