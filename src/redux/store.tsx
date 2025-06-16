import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice";
import communityReducer from "./communitySlice";
import recipeReducer from "./recipeSlice";
import storageReducer from "./storageSlice"

export const store = configureStore({
    reducer:{
        category: commonReducer,
        board: communityReducer,
        recipe: recipeReducer,
        storage: storageReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;