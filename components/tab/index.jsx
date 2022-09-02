import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { colors } from "../../styles/colors";

const { blue, gray } = colors;

const Button = ({ id, label, onPress, selectedTab }) => {

    return (
        <TouchableOpacity 
            onPress={onPress}
            style={styles.container}>
            <Text style={[ styles.label, selectedTab === id ? styles.selected : styles.notSelected ]}>
                { label }
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 10
    },
    label: {},
    notSelected: {
        color: gray
    },
    selected: {
        color: blue
    }
});

export default Button;