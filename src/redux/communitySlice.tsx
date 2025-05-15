import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SelectedBoardType } from "../types/boardTypes";

const initialState = {
    selectedBoard: {
        boardId: "",
        title: "",
        content: "",
        userId: "",
        profileImg: "",
        time: "",
        viewCount: 0,
        comments:[{
            profileImg: "",
            userId: "",
            time: "",
            content: "",
        }]
    }
}

const communitySlice = createSlice({
    name: "board", 
    initialState,
    reducers:{
        setSelectedBoard: (state, action: PayloadAction<SelectedBoardType>) => {
            state.selectedBoard = action.payload;
        },
        resetSelectedBoard: (state) => {
            state.selectedBoard = initialState.selectedBoard;
        }
    }
});

export const {setSelectedBoard, resetSelectedBoard} = communitySlice.actions;
export default communitySlice.reducer;