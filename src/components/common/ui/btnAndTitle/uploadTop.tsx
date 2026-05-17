//기타
import React, { useState, useEffect } from "react";
import { Image, Pressable, TextInput, View, Alert, Modal, Text } from "react-native";
import { validateText } from "@utils/validation";
import { pickImage, ImagePickerMethod, getAvailableMethods } from "@utils/imagePicker";
//Style
import styles from "./uploadTop.style";

//Navigation
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

//Type
import { CategoryTotalType, CategoryValueType } from "../../../../types/commonTypes";
import { NavigateType } from "../../../../types/navigateTypes";

//Navigation
import { useNavigation } from "@react-navigation/native";

//Context
import { useCommon } from "../../../../context/commonContext";

//hooks
import { useCategory } from "../../../../hooks/useCategory";

type NavigationProps = NativeStackNavigationProp<NavigateType>;

type Props = {
    selectedTitle: string;
    categoryValue: CategoryValueType;
    categoryTotal: CategoryTotalType[];
}

function UploadTop(props: Props): React.JSX.Element{
    const {selectedTitle, categoryValue, categoryTotal} = props;
    const {prev} = useCommon();
    const {categoryChange} = useCategory();
    const navigation = useNavigation<NavigationProps>();
    const [title, setTitle] = useState("");
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [showMethodSelector, setShowMethodSelector] = useState(false);
    const [pickerMethod, setPickerMethod] = useState<ImagePickerMethod>("auto");
    const [availableMethods, setAvailableMethods] = useState<('expo' | 'react-native')[]>([]);

    useEffect(() => {
        // 사용 가능한 방법 확인
        const methods = getAvailableMethods();
        setAvailableMethods(methods);
    }, []);

    const selectImageMethod = (method: ImagePickerMethod) => {
        setPickerMethod(method);
        setShowMethodSelector(false);
    };

    const handleImageSelect = async (source: 'camera' | 'library') => {
        try {
            const result = await pickImage(source, pickerMethod);
            if (result) {
                setSelectedImage(result.uri);
                Alert.alert("성공", "이미지가 선택되었습니다.");
            }
        } catch (error: any) {
            Alert.alert("오류", error.message || "이미지 선택 중 오류가 발생했습니다.");
        }
    };

    const validateAndUpload = () => {
        // 제목 검증
        const titleError = validateText.required(title, "제목");
        if (titleError) {
            Alert.alert("입력 오류", titleError);
            return;
        }

        const titleLengthError = validateText.maxLength(title, 100, "제목");
        if (titleLengthError) {
            Alert.alert("입력 오류", titleLengthError);
            return;
        }

        // TODO: 실제 업로드 로직 구현 (selectedImage 포함)
        console.log("업로드:", title, selectedImage);
        Alert.alert("성공", "업로드가 완료되었습니다.");
    }

    const pressBtn = (type: string) => {
        switch (type) {
            case "back":
                const mainIndex = categoryTotal.findIndex(item => item.main === categoryValue.main);
                const subIndex = categoryTotal[mainIndex].sub
                        .findIndex(item => item === prev.current[prev.current.length - 1].sub);
                const detailIndex = categoryTotal[mainIndex].detail[subIndex].findIndex((item) => 
                    item === prev.current[prev.current.length - 1].detail);   
                categoryChange(mainIndex, subIndex, detailIndex, 0);
                navigation.goBack();
                break;
            case "upload":
                validateAndUpload();
                break;
            case "image":
                setShowMethodSelector(true);
                break;
            case "method-select":
                setShowMethodSelector(true);
                break;
            default:
                break;
        }
    }

    return(
        <View>
            <View style={styles.container}>
                <Pressable onPress={() => pressBtn("back")}>
                    <Text style={styles.leftIcon}>←</Text>
                </Pressable>
                <TextInput 
                    style={[styles.center, styles.inputTitle]} 
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                    maxLength={100}
                />
                <Pressable onPress={() => pressBtn("upload")}>
                    <Text style={styles.rightIcon}>↑</Text>
                </Pressable>
            </View>
            
            {/* 이미지 선택 및 방법 선택 버튼 */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 10, alignItems: "center" }}>
                <Pressable 
                    onPress={() => handleImageSelect("library")}
                    style={{ padding: 10, backgroundColor: "#f0f0f0", borderRadius: 5, marginRight: 10 }}>
                    <Text style={{ fontSize: 14 }}>📷 이미지 선택</Text>
                </Pressable>
                <Pressable 
                    onPress={() => pressBtn("method-select")}
                    style={{ padding: 10, backgroundColor: "#e0e0e0", borderRadius: 5 }}>
                    <Text style={{ fontSize: 12 }}>
                        방법: {pickerMethod === "auto" ? "자동" : pickerMethod === "expo" ? "Expo" : "React Native"}
                    </Text>
                </Pressable>
            </View>

            {/* 선택된 이미지 미리보기 */}
            {selectedImage && (
                <View style={{ padding: 10, alignItems: "center" }}>
                    <Image 
                        source={{ uri: selectedImage }} 
                        style={{ width: 100, height: 100, borderRadius: 5 }}
                        resizeMode="cover"
                    />
                    <Pressable 
                        onPress={() => setSelectedImage(null)}
                        style={{ marginTop: 5, padding: 5 }}>
                        <Text style={{ fontSize: 12, color: "red" }}>이미지 제거</Text>
                    </Pressable>
                </View>
            )}

            {/* 이미지 선택 방법 선택 모달 */}
            <Modal
                visible={showMethodSelector}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowMethodSelector(false)}>
                <Pressable 
                    style={{ 
                        flex: 1, 
                        backgroundColor: "rgba(0,0,0,0.5)", 
                        justifyContent: "center", 
                        alignItems: "center" 
                    }}
                    onPress={() => setShowMethodSelector(false)}>
                    <Pressable 
                        style={{ 
                            backgroundColor: "white", 
                            borderRadius: 10, 
                            padding: 20, 
                            width: "80%",
                            maxWidth: 300
                        }}
                        onPress={(e) => e.stopPropagation()}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center" }}>
                            이미지 선택 방법
                        </Text>
                        
                        <Pressable 
                            onPress={() => selectImageMethod("auto")}
                            style={{ 
                                padding: 15, 
                                backgroundColor: pickerMethod === "auto" ? "#e3f2fd" : "#f5f5f5",
                                borderRadius: 5,
                                marginBottom: 10
                            }}>
                            <Text style={{ fontSize: 16, fontWeight: pickerMethod === "auto" ? "bold" : "normal" }}>
                                자동 (환경 감지)
                            </Text>
                            <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                                Expo Go 또는 에뮬레이터 자동 감지
                            </Text>
                        </Pressable>

                        {availableMethods.includes("expo") && (
                            <Pressable 
                                onPress={() => selectImageMethod("expo")}
                                style={{ 
                                    padding: 15, 
                                    backgroundColor: pickerMethod === "expo" ? "#e3f2fd" : "#f5f5f5",
                                    borderRadius: 5,
                                    marginBottom: 10
                                }}>
                                <Text style={{ fontSize: 16, fontWeight: pickerMethod === "expo" ? "bold" : "normal" }}>
                                    Expo Image Picker
                                </Text>
                                <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                                    Expo Go에서 사용
                                </Text>
                            </Pressable>
                        )}

                        {availableMethods.includes("react-native") && (
                            <Pressable 
                                onPress={() => selectImageMethod("react-native")}
                                style={{ 
                                    padding: 15, 
                                    backgroundColor: pickerMethod === "react-native" ? "#e3f2fd" : "#f5f5f5",
                                    borderRadius: 5,
                                    marginBottom: 10
                                }}>
                                <Text style={{ fontSize: 16, fontWeight: pickerMethod === "react-native" ? "bold" : "normal" }}>
                                    React Native Image Picker
                                </Text>
                                <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                                    에뮬레이터/스탠드얼론에서 사용
                                </Text>
                            </Pressable>
                        )}

                        <Pressable 
                            onPress={() => setShowMethodSelector(false)}
                            style={{ 
                                padding: 15, 
                                backgroundColor: "#f44336", 
                                borderRadius: 5,
                                marginTop: 10
                            }}>
                            <Text style={{ fontSize: 16, color: "white", textAlign: "center", fontWeight: "bold" }}>
                                취소
                            </Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}

export default UploadTop;