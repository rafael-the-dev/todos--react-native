import {StyleSheet, Text,  TouchableOpacity,  View } from "react-native";
import Checkbox from 'expo-checkbox';

import { MaterialIcons } from '@expo/vector-icons';

const ListItem = ({ isComplete, task }) => {

    return (
        <View style={styles.container}>
            <Checkbox
                style={styles.checkbox}
                value={isComplete}
                color={isComplete ? '#4630EB' : undefined}
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
        backgroundColor: "#FFF",
        borderColor: "#E3E4F1",
        borderRadius: 5,
        borderStyle: "solid",
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingHorizontal: '5%',
        paddingVertical: 10
    },
    text: {
        flexGrow: 1,
        fontSize: "1.1rem",
        marginHorizontal: 10
    }
})

export default ListItem;