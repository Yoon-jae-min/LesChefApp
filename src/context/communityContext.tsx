import React, { createContext, ReactNode, useContext, useRef, useState } from "react";

type CommunityContextType = {
    communityLT: React.RefObject<string>;
    // communityLT: string;
    // setCommunityLT: React.Dispatch<React.SetStateAction<string>>;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider = ({children}: {children: ReactNode}) => {
    const communityLT = useRef("");
    // const [communityLT, setCommunityLT] = useState("Notice");

    return (
        <CommunityContext.Provider value={{communityLT}}>
            {children}
        </CommunityContext.Provider>
    )
}

export const useCommunity = (): CommunityContextType => {
    const context = useContext(CommunityContext);
    if(!context){
        throw new Error("useCmmunity는 CommunityProvider 내부에서 사용해야 합니다.");
    }
    return context;
}