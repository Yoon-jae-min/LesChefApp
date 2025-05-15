import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectedRecipeType } from "../types/recipeTypes"

const initialState = {
    selectedRecipe: {
        recipeId: "",
        title: "",
        mainSolt: "",
        subSolt: "",
        portion: 0,
        time: 0,
        imgUrl: "",
        ingres: [{
            sortName: "",
            units:[{
                name: "",
                amount: 0,
                unit: "",
            }]
        }],
        steps: [{
            stepNum: 0,
            imgUrl: "",
            content: "",
        }],
        comments: [{
            profileImg: "",
            userId: "",
            time: "",
            content: "",
        }]
    }
}

const recipeSlice = createSlice({
    name: "Recipe",
    initialState,
    reducers: {
        setSelectedRecipe: (state, action: PayloadAction<SelectedRecipeType>) => {
            state.selectedRecipe = action.payload;
        },
        resetSelectedRecipe: (state) => {
            state.selectedRecipe = initialState.selectedRecipe;
        }
    }
});

export const {setSelectedRecipe, resetSelectedRecipe} = recipeSlice.actions;
export default recipeSlice.reducer;