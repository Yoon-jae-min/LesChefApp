import React, { createContext, ReactNode, useContext, useRef } from "react"

type MainContextProp = {
}

const MainContext = createContext<MainContextProp | undefined>(undefined);

export const MainProvider = ({children}: {children: ReactNode}) => {

    return(
        <MainContext.Provider value={{}}>
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