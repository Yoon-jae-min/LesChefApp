import React, { createContext, ReactNode, useContext, useRef, useState } from "react";

type RecipeContextType = {
    recipeLT: React.RefObject<string>;
    // recipeLT: string;
    // setRecipeLT: React.Dispatch<React.SetStateAction<string>>;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({children}: {children: ReactNode}) => {
    const recipeLT = useRef("");
    // const [recipeLT, setRecipeLT] = useState("Korean");

    return(
        <RecipeContext.Provider value={{recipeLT}}>
            {children}
        </RecipeContext.Provider>
    )
}

export const useRecipe = (): RecipeContextType => {
    const context = useContext(RecipeContext);
    if(!context){
        throw new Error("useRecipe는 RecipeProvider 내부에서 사용해야 합니다.");
    }
    return context; 
}