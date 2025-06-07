import React, { createContext, ReactNode, useContext } from "react";

type CommunityContextProp = {
}

const CommunityContext = createContext<CommunityContextProp | undefined>(undefined);

export const CommunityProvider = ({children}: {children: ReactNode}) => {
    return(
        <CommunityContext.Provider value={{}}>
            {children}
        </CommunityContext.Provider>
    )
}

export const useCommunity = (): CommunityContextProp => {
    const context = useContext(CommunityContext);
    if(!context){
        throw new Error("provider 안에서 사용되어야 합니다.");
    }
    return context;
}