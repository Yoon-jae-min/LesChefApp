//기타
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

//style
import styles from "@styles/myPage/body/recipeWrite/info/infoInput.style";

const mainCg = [
    {label: "한식", value: "korean"},
    {label: "일식", value: "japanese"},
    {label: "중식", value: "chinese"},
    {label: "양식", value: "western"},
    {label: "기타", value: "other"}
]

const subCg = [["국/찌개", "밥/면", "반찬", "기타"],
                ["국/전골", "밥", "면", "기타"],
                ["튀김, 찜", "밥", "면", "기타"],
                ["스프/스튜", "빵", "면", "기타"],
                ["기타"]];

function InfoInput(): React.JSX.Element{
    const [mainOpen, setMainOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [mainArray, setMainArray] = useState(mainCg);
    const [subArray, setSubArray] = useState([{ label: "", value: "" }]);
    const [mainSelect, setMainSelect] = useState("");
    const [subSelect, setSubSelect] = useState("");
    

    const subSwitch = (index: number) => {
        setSubArray(subCg[index].map(item => ({label: item, value: item})));
    }

    return(
        <View style={styles.container}>
            <View style={styles.eachBox}>
                <View style={styles.dropBox}>
                    <DropDownPicker
                        open={mainOpen}
                        setOpen={setMainOpen}
                        value={mainSelect}
                        setValue={setMainSelect}
                        items={mainArray}
                        setItems={setMainArray}
                        placeholder="main"
                        style={styles.dropClose}
                        dropDownContainerStyle={styles.dropOpen}
                        ArrowDownIconComponent={() => null}
                        ArrowUpIconComponent={() => null}
                        showTickIcon={false}
                        onChangeValue={(value) => {
                            const index = mainCg.findIndex(item => item.value === value);
                            subSwitch(index)}}/>
                </View>
                <View style={styles.dropBox}>
                    <DropDownPicker
                        open={subOpen}
                        setOpen={setSubOpen}
                        value={subSelect}
                        setValue={setSubSelect}
                        items={subArray}
                        placeholder="sub"
                        style={styles.dropClose}
                        dropDownContainerStyle={styles.dropOpen}
                        ArrowDownIconComponent={() => null}
                        ArrowUpIconComponent={() => null}
                        showTickIcon={false}/>
                </View>
            </View>
            <View style={styles.eachBox}>
                <View style={styles.each}>
                    <TextInput keyboardType="numeric" style={styles.eachText} placeholder="양(인분)"/>
                </View>
                <View style={styles.each}>
                    <TextInput keyboardType="numeric" style={styles.eachText} placeholder="시간"/>
                </View>
            </View>
        </View>
    )
}

export default InfoInput;