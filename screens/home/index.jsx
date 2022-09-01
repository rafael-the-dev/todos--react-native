import { useCallback, useContext, useId } from 'react';
import { Image, ImageBackground, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import mobileLightBg from "../../assets/images/bg-mobile-light.jpg";
import mobileDarkBg from "../../assets/images/bg-mobile-dark.jpg";
import iconMoon from "../../assets/images/icon-moon.svg";
import iconSun from "../../assets/images/icon-sun.svg";

import { ThemeContext } from '../../context';

import Form from '../../components/form';
import ListItem from '../../components/list-item';
import { useFetch } from '../../hooks';

const Home = () => {
    const id = useId();
    const { isLightTheme, toggleTheme } = useContext(ThemeContext);
    console.log(isLightTheme)

    const { data, error, loading } = useFetch({ 
        autoFetch: true, 
        url: "https://pro-todos.netlify.app/api/todos" 
    });

    const todos = data?.todos ?? [];

    const getKey = useCallback((item, index) => `${index}-${id}`, []);
    const getItem = useCallback(({ item }) => <ListItem { ...item } />, [])
    
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{ uri: isLightTheme ? mobileLightBg : mobileDarkBg }}
                style={styles.bgImage}
            >
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Todo</Text>
                    <TouchableOpacity onPress={toggleTheme}>
                        <Image 
                            source={{ uri: isLightTheme ? iconMoon : iconSun }}
                            style={styles.themeIcon}
                        />
                    </TouchableOpacity>
                </View>
                <Form />
            </ImageBackground>
            <View style={styles.todosContainer}>
                <View style={styles.todosListContainer}>
                    <FlatList
                        data={todos}
                        keyExtractor={getKey}
                        renderItem={getItem} 
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F8',
    },
    bgImage: {
        height: 220,
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
    },
    todosContainer: {
        position: "relative"
    },
    todosListContainer: {
        left: "5%",
        position: "absolute",
        top: 0,
        transform: "translate(0, -40%)",
        width: "90%"
    }
});

export default Home;