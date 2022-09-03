import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors } from "../../styles/colors"; 
import { useLazyFetch  } from "../../hooks";
import { ThemeContext } from "../../context";

const { darkBlue, gray } = colors;

const Form = ({ refresh }) => {
    const [ value, setValue ] = useState("");
    const [ isChecked, setIsChecked ] = useState(false);
    const { isLightTheme } = useContext(ThemeContext);

    const valueRef = useRef("");
    const checkedRef = useRef(false);

    const { lazyFetch } = useLazyFetch();

    const changeHandler = useCallback(text => setValue(text), []);

    const submitHandler = useCallback(() => {
        const options = {
            body: JSON.stringify({ isComplete: checkedRef.current, task: valueRef.current }),
            method: "POST"
        };

        lazyFetch({
            options, 
            onError: () => { setValue(""); refresh(); },
            url: "https://pro-todos.netlify.app/api/todos"
        })
    }, [ lazyFetch ]);

    useEffect(() => {
        valueRef.current = value;
    }, [ value ]);

    useEffect(() => {
        checkedRef.current = isChecked;
    }, [ isChecked ])

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
            <TouchableOpacity onPress={submitHandler}>
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