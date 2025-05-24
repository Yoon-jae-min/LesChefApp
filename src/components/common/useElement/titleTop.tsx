// //기타
// import React from "react";
// import { Image, Pressable, Text, TextInput, View } from "react-native";

// //Type
// import { CategoryTotalType, CategoryValueType } from "../../../types/commonTypes";
// import { NavigateType } from "../../../types/navigateTypes";

// //Navigation
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { useNavigation } from "@react-navigation/native";

// //Redux
// import { useDispatch } from "react-redux";
// import { setCategoryValue } from "../../../redux/commonSlice";

// //style
// import styles from "@styles/common/useElement/titleTop.style";

// //context
// import { useMyPage } from "../../../context/myPageContext";
// import { useRecipe } from "../../../context/recipeContext";
// import { useCommon } from "../../../context/commonContext";

// type NavigationProps = NativeStackNavigationProp<NavigateType>;

// type Props = {
//     selectedTitle: string;
//     categoryValue: CategoryValueType;
//     categoryTotal: CategoryTotalType[];
// }

// function TitleTop(props: Props): React.JSX.Element{
//     const { selectedTitle, categoryValue, categoryTotal} = props;
//     const {mainPage, subPage} = useCommon();
//     const {mySub} = useMyPage();
//     const {recipeSub, recipeDetail} = useRecipe();
//     const dispatch = useDispatch();
//     const navigation = useNavigation<NavigationProps>();
//     const pressType = (categoryValue.sub === "Info" || mySub.current === "WishList") ? "like" :
//                         categoryValue.sub === "RecipeWrite" ? "upload" : "edit";

//     const pressBtn = (type: string) => {
//         switch (type) {
//             case "back":
//                 const mainIndex = categoryTotal.findIndex(item => item.main === mainPage.current);
//                 const subIndex = categoryTotal[mainIndex].sub.
//                     findIndex(item => mainPage.current === "MyPage" ? 
//                         item === mySub.current  : item === "List");
//                 const detailIndex = mainPage.current === "Recipe" ?
//                             categoryTotal[mainIndex].detail[subIndex].findIndex(item => item === recipeDetail.current) : 0
                
//                 if(categoryValue.main === "Recipe"){
//                     subPage.current = "List";
//                 }

//                 dispatch(setCategoryValue({
//                     ...categoryValue,
//                     sub: categoryTotal[mainIndex].sub[subIndex],
//                     detail: categoryTotal[mainIndex].detail[subIndex][detailIndex],
//                     detail_1: categoryTotal[mainIndex].detail_1[subIndex][detailIndex][0],
//                 }));
//                 navigation.goBack();
//                 break;
//             case "like":
//                 console.log("좋아요");
//                 break;
//             case "edit":
//                 console.log("편집");
//                 break;
//             case "upload":
//                 console.log("업로드");
//                 break;
//             default:
//                 break;
//         }
//     }

//     return(
//         <View style={styles.container}>
//             <Pressable onPress={() => pressBtn("back")}>
//                 <Image style={styles.leftIcon} source={require("../../../assets/image/back.png")}/>
//             </Pressable>
//             {(categoryValue.sub === "Info" || categoryValue.sub === "RecipeInfo")  
//                 && <Text style={[styles.center, styles.title]}>{selectedTitle}</Text>}
//             {(categoryValue.sub === "Write" || categoryValue.sub === "RecipeWrite") 
//                 && <TextInput style={[styles.center, styles.inputTitle]} placeholder="- title -"/>}
//             <Pressable onPress={() => pressBtn(pressType)}>
//                 {categoryValue.sub === "Info" ?
//                     (categoryValue.main === "Recipe" ? 
//                         <Image style={styles.rightIcon} source={require("../../../assets/image/unlike.png")}/>:
//                         <Image style={styles.rightIcon} source={require("../../../assets/image/thumb.png")}/>):
//                     (mySub.current === "WishList" ? 
//                         <Image style={styles.rightIcon} source={require("../../../assets/image/like.png")}/>:
//                         (categoryValue.sub === "RecipeWrite" ? 
//                             <Image style={styles.rightIcon} source={require("../../../assets/image/upload.png")}/>:
//                             <Image style={styles.rightIcon} source={require("../../../assets/image/write.png")}/>)
//                 )}
//             </Pressable>
//         </View>
//     )
// }

// export default TitleTop;