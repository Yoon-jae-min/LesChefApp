//기타
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";


//style
import styles from "@styles/myPage/body/recipeWrite/recipeWrite.style";

//Component
import UploadTop from "../../../common/useElement/btnAndTitle/uploadTop";
import IngredientInput from "./ingredient/ingredientInput";
import StepInput from "./step/stepInput";
import InfoInput from "./info/infoInput";
import ImgSelect from "./imgSelect";

//Redux
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

//Navigation
import { useFocusEffect } from "@react-navigation/native";

//Context
import { useCommon } from "../../../../context/commonContext";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

function RecipeWrite(): React.JSX.Element{
    const {categoryTotal, success} = useCommon();
    const {categoryChange} = useCategory();
    const categoryValue = useSelector((state: RootState) => state.category.categoryValue);
    const selectedBoard = useSelector((state: RootState) => state.board.selectedBoard);
    const [imgSelectOpen, setImgSelectOpen] = useState(false);
    const imgInputType = useRef<{type: string; index: number;}>({type: "", index: 0});
    const [imgDate, setImgDate] = useState<string | undefined | null>(null);

    useFocusEffect(
        useCallback(() => {
            if(!success.current){
                const mainIndex = categoryTotal.findIndex(item => item.main === "MyPage");
                const subIndex = categoryTotal[mainIndex].sub.findIndex(item => item === "RecipeWrite");
                categoryChange(mainIndex, subIndex, 0 , 0);
                success.current = true;
            }
            return () => {
                success.current = false;
            }
        }, [])
    );

    const addImg = async (type: string) => {
        setImgSelectOpen(false);
        if(type === "cancel"){
            return;
        }
        const result = type === "camera" ? 
            await launchCamera({mediaType: "photo"}) : 
            await launchImageLibrary({mediaType: "photo"});
        if (!result.didCancel && result.assets?.[0]?.uri) {
            switch (imgInputType.current.type){
                case "main":
                    setImgDate(result.assets[0].uri);
                    break;
                case "step":
                    break;
                default:
                    break;
            }
        }
    }

    return(
        <View style={styles.container}>
            <UploadTop
                selectedTitle={selectedBoard.title}
                categoryValue={categoryValue}
                categoryTotal={categoryTotal}/>
            <FlatList
                style={styles.scroll}
                showsVerticalScrollIndicator={false}
                data={[]}
                renderItem={() => null}
                ListHeaderComponent={
                    <React.Fragment>
                        <InfoInput/>
                        <Pressable 
                            style={styles.imgInputBox} 
                            onPress={() => {
                                setImgSelectOpen(true); 
                                imgInputType.current = {...imgInputType.current, type: "main"};}}>
                            {imgDate === null ? 
                                <Image style={styles.imgAddBtn} source={require("../../../../assets/image/addUnit.png")}/> :
                                <Image style={[styles.img, {}]} source={{uri: imgDate}}/>}
                        </Pressable>
                        <IngredientInput/>
                        <StepInput setImgSelectOpen={setImgSelectOpen} imgInputType={imgInputType}/>
                    </React.Fragment>
                }/>
            <Modal 
                visible={imgSelectOpen} 
                animationType="none"
                transparent={true} 
                onRequestClose={() => setImgSelectOpen(false)}>
                <ImgSelect addImg={addImg} imgSelectOpen={imgSelectOpen}/>
            </Modal>
        </View>
    )
}

export default RecipeWrite;