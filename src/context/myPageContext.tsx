import React, { createContext, ReactNode, useContext } from "react"

type MyPageContextProp = {
}

const MyPageContext = createContext<MyPageContextProp | undefined>(undefined);

export const MyPageProvider = ({children}: {children: ReactNode}) => {
    return(
        <MyPageContext.Provider value={{}}>
            {children}
        </MyPageContext.Provider>
    )
}

export const useMyPage = (): MyPageContextProp => {
    const context = useContext(MyPageContext);
    if(!context){
        throw new Error("provider 안에서 사용해야 합니다.");
    }
    return context;
}