import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectedListType } from "src/types/myPageTypes"

const initialState = {
    currentList: {
        place: "",
        items: [
            {
                name: "",
                amount: "",
                expire: ""
            }
        ]
    }
}

const storageSlice = createSlice({
    name: "Storage",
    initialState,
    reducers: {
        setCurrentList: (state, action: PayloadAction<SelectedListType>) => {
            state.currentList = action.payload;
        },
        resetCurrentList: (state) => {
            state.currentList = initialState.currentList
        }
    }
});

export const {setCurrentList, resetCurrentList} = storageSlice.actions;
export default storageSlice.reducer;