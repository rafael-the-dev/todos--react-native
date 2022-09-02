import {StyleSheet, Text,  TouchableOpacity,  View } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';

import { colors } from "../../styles/colors";
import { useContext } from "react";
import { ThemeContext } from "../../context";

const { darkBlue, lightGray } = colors;

const ListItem = ({ isComplete, task }) => {
    const { isLightTheme } = useContext(ThemeContext);
    
    const lightThemeContainer = [ styles.lightBorder, styles.lightBg ];
    const darkThemeContainer = [styles.darkBorder, styles.darkBg ];

    return (
        <View style={[ styles.container, isLightTheme ? lightThemeContainer : darkThemeContainer ]}>
            <Checkbox
                style={styles.checkbox}
                value={isComplete}
                color={isComplete ? '#4630EB' : undefined}
            />
            <Text style={[ styles.text, isLightTheme ? "" : styles.lightText ]}>
                { task }
            </Text>
            <TouchableOpacity>
                <MaterialIcons name="close" size={18} color="#E3E4F1" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        borderStyle: "solid",
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingHorizontal: '5%',
        paddingVertical: 10
    },
    darkBorder: {
        borderColor: "#979797"
    },
    lightBorder: {
        borderColor: lightGray,
    },
    darkBg: {
        backgroundColor: darkBlue
    },
    lightBg: {
        backgroundColor: "#FFF"
    },
    text: {
        flexGrow: 1,
        fontSize: "1.1rem",
        marginHorizontal: 10
    },
    lightText: {
        color: lightGray
    }
})

export default ListItem;