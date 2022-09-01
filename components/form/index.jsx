import { useCallback, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons'; 


const Form = () => {
    const [ value, setValue ] = useState("");
    const [ isChecked, setIsChecked ] = useState(false);

    const changeHandler = useCallback(text => setValue(text), []);

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setIsChecked}
                color={isChecked ? '#4630EB' : undefined}
            />
            <TextInput 
                onChangeText={changeHandler}
                placeholder="Create a new todo..."
                style={styles.input}
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
        backgroundColor: "#FFF",
        flexDirection: "row",
        marginTop: "2.5rem",
        paddingHorizontal: 7
    },
    input: {
        borderWidth: 0,
        flexGrow: 1,
        marginLeft: 6,
        paddingVertical: ".8rem"
    }
})

export default Form;