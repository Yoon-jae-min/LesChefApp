//Context
import { useCommon } from "../context/commonContext";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { setCategoryValue } from "../redux/commonSlice";
import { RootState } from "../redux/store";

export const useCategory = () => {
    const {categoryTotal} = useCommon();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const dispatch = useDispatch();

    const categoryChange = (main: number, sub: number, detail: number, detail_1: number) => {
        const nextValue = {
            main: categoryTotal[main].main,
            sub: categoryTotal[main].sub[sub],
            detail: categoryTotal[main].detail[sub][detail],
            detail_1: categoryTotal[main].detail_1[sub][detail][detail_1]
        };
        dispatch(setCategoryValue({
            ...categoryValue,
            ...nextValue
        }));
    }

    return{
        categoryChange
    }
}