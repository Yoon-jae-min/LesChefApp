//기타
import React, { useCallback, useRef, useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, View, Alert } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { validateImage } from "../../../utils/imageValidation";


//style
import styles from "@styles/myPage/body/recipeWrite/recipeWrite.style";

//Component
import UploadTop from "../../../common/useElement/btnAndTitle/uploadTop";
import IngredientInput from "./ingredient/ingredientInput";
import StepInput from "./step/stepInput";
import InfoInput from "./info/infoInput";
import ImgSelect from "../../modal/imgSelect";

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
        
        try {
            const result = type === "camera" ? 
                await launchCamera({mediaType: "photo"}) : 
                await launchImageLibrary({mediaType: "photo"});
            
            // 이미지 검증
            const validation = validateImage(result);
            
            if (!validation.isValid) {
                Alert.alert("이미지 오류", validation.error || "이미지를 선택할 수 없습니다.");
                return;
            }
            
            if (validation.asset?.uri) {
                switch (imgInputType.current.type){
                    case "main":
                        setImgDate(validation.asset.uri);
                        break;
                    case "step":
                        break;
                    default:
                        break;
                }
            }
        } catch (error: any) {
            console.error("Image selection error:", error);
            Alert.alert("오류", "이미지를 선택하는 중 오류가 발생했습니다.");
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