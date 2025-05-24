import React, { createContext, ReactNode, useContext, useRef } from "react";
import { pageValueType } from "../types/commonTypes";

type CommunityContextProp = {
    communityLT: React.RefObject<string>;
    communityDetail: React.RefObject<pageValueType>;
    focus: React.RefObject<boolean>;
}

const CommunityContext = createContext<CommunityContextProp | undefined>(undefined);

export const CommunityProvider = ({children}: {children: ReactNode}) => {
    const communityLT = useRef("");
    const communityDetail = useRef({
        prev: "",
        now: ""
    });
    const focus = useRef(false);

    return(
        <CommunityContext.Provider value={{communityLT, communityDetail, focus}}>
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