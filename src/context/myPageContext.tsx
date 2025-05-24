import React, { createContext, ReactNode, useContext, useRef } from "react"
import { pageValueType } from "src/types/commonTypes";

type MyPageContextProp = {
    myPageDetail: React.RefObject<pageValueType>;
    focus: React.RefObject<boolean>;
}

const MyPageContext = createContext<MyPageContextProp | undefined>(undefined);

export const MyPageProvider = ({children}: {children: ReactNode}) => {
    const myPageDetail = useRef({
        prev: "",
        now: ""
    });
    const focus = useRef(false);

    return(
        <MyPageContext.Provider value={{myPageDetail, focus}}>
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