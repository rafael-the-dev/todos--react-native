import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import mobileLightBg from "./assets/images/bg-mobile-light.jpg";
import iconMoon from "./assets/images/icon-moon.svg";

import Form from './components/form';
import { useFetch } from './hooks';

export default function App() {
    const { data, error, loading } = useFetch({ 
        autoFetch: true, 
        url: "https://pro-todos.netlify.app/api/todos" 
    });

    const todos = data?.todos ?? [];
    console.log(todos)
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{ uri: mobileLightBg }}
                style={styles.bgImage}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Todo</Text>
                    <TouchableOpacity>
                        <Image 
                            source={{ uri: iconMoon }}
                            style={styles.themeIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Form />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bgImage: {
        height: 200,
        paddingHorizontal: '5%',
        paddingTop: "1.2rem"
    },
    headerContent: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        color: "#FFF",
        fontSize: "1.4rem",
        fontWeight: "bold",
        letterSpacing: 4,
        textTransform: "uppercase"
    },
    themeIcon: {
        height: 15,
        width: 15
    }
});
