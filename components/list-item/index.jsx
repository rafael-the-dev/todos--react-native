import {StyleSheet, Text,  TouchableOpacity,  View } from "react-native";
import Checkbox from 'expo-checkbox';

import { MaterialIcons } from '@expo/vector-icons';

const ListItem = ({ isComplete, task }) => {

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={isComplete}
                onValueChange={setIsChecked}
                color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.text}>
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
        borderColor: "#E3E4F1",
        borderStyle: "solid",
        borderWidth: 1,
        flexDirection: "row"
    },
    text: {
        flexGrow: 1,
        marginHorizontal: 6
    }
})

export default ListItem;