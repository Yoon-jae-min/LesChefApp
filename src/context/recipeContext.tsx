import React, { createContext, ReactNode, useContext, useRef } from "react";
import { pageValueType } from "../types/commonTypes";

type RecipeContextProp = {
    recipeLT: React.RefObject<string>;
    recipeSub: React.RefObject<string>;
    recipeDetail: React.RefObject<pageValueType>;
    focus: React.RefObject<boolean>;
}

const RecipeContext = createContext<RecipeContextProp | undefined>(undefined);

export const RecipeProvider = ({children}: {children: ReactNode}) => {
    const recipeLT = useRef("");
    const recipeSub = useRef("");
    const recipeDetail = useRef({
        prev: "",
        now: "",
    });
    const focus = useRef(false);

    return(
        <RecipeContext.Provider value={{recipeLT, recipeSub, recipeDetail, focus}}>
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