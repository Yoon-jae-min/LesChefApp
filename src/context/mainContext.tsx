import React, { createContext, ReactNode, useContext, useRef } from "react"

type MainContextProp = {
    focus: React.RefObject<boolean>;
}

const MainContext = createContext<MainContextProp | undefined>(undefined);

export const MainProvider = ({children}: {children: ReactNode}) => {
    const focus = useRef(false);

    return(
        <MainContext.Provider value={{focus}}>
            {children}
        </MainContext.Provider>
    )
}

export const useMain = (): MainContextProp => {
    const context = useContext(MainContext);
    if(!context){
        throw new Error("provider안에서 사용해야합니다.");
    }
    return context;
}