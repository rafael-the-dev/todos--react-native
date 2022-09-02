import { useCallback, useContext, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors } from "../../styles/colors"; 
import { ThemeContext } from "../../context";

const { darkBlue, gray } = colors;

const Form = () => {
    const [ value, setValue ] = useState("");
    const [ isChecked, setIsChecked ] = useState(false);
    const { isLightTheme } = useContext(ThemeContext)

    const changeHandler = useCallback(text => setValue(text), []);

    return (
        <View style={[ styles.container, isLightTheme ? styles.lightBg : styles.darkBg ]}>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#4630EB' : undefined}
            />
            <TextInput 
                onChangeText={changeHandler}
                placeholder="Create a new todo..."
                style={[ styles.input, isLightTheme ? styles.lightInputColor : styles.darkInputColor ]}
                value={value}
            />
            <TouchableOpacity>
                <MaterialIcons name="send" size={17} color="#76B6FC" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: "2.5rem",
        paddingHorizontal: 7
    },
    darkBg: {
        backgroundColor: darkBlue
    },
    lightBg: {
        backgroundColor: "#FFF"
    },
    input: {
        borderWidth: 0,
        flexGrow: 1,
        marginLeft: 6,
        paddingVertical: ".8rem"
    },
    
    darkInputColor: {
        color: gray
    },
    lightInputColor: {
        color: darkBlue
    }
})

export default Form;