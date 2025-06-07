import React, { createContext, ReactNode, useContext, useRef } from "react";
import { pageValueType } from "../types/commonTypes";

type RecipeContextProp = {
}

const RecipeContext = createContext<RecipeContextProp | undefined>(undefined);

export const RecipeProvider = ({children}: {children: ReactNode}) => {
    return(
        <RecipeContext.Provider value={{}}>
            {children}
        </RecipeContext.Provider>
    )
}

export const useRecipe = (): RecipeContextProp => {
    const context = useContext(RecipeContext);
    if(!context){
        throw new Error("provider 안에서 사용해야 합니다.");
    }
    return context;
}