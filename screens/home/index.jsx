import { useCallback, useContext, useId, useMemo, useState } from 'react';
import { Image, ImageBackground, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import mobileLightBg from "../../assets/images/bg-mobile-light.jpg";
import mobileDarkBg from "../../assets/images/bg-mobile-dark.jpg";
import iconMoon from "../../assets/images/icon-moon.svg";
import iconSun from "../../assets/images/icon-sun.svg";

import { ThemeContext } from '../../context';
import { colors } from "../../styles/colors";
import { useFetch } from '../../hooks';

import Form from '../../components/form';
import ListItem from '../../components/list-item';
import Tab from '../../components/tab';

const { dark, darkBlue, gray } = colors;

const Home = () => {
    const [ tab, setTab ] = useState("ALL");
    const id = useId();
    const { isLightTheme, toggleTheme } = useContext(ThemeContext);

    const { data, error, loading } = useFetch({ 
        autoFetch: true, 
        url: "https://pro-todos.netlify.app/api/todos" 
    });


    const todos = useMemo(() => data?.todos ?? [], [ data ]);
    const filteredTodos = useMemo(() => {
        if(tab === "ACTIVE") {
            return todos.filter(item => !item.isComplete);
        }

        if(tab === "COMPLETED") {
            return todos.filter(item => item.isComplete);
        }

        return todos;
    }, [ todos, tab ]);

    const leftTodos = useMemo(() => todos.filter(item => !item.isComplete).length, [ todos ]);

    const itemBg = useMemo(() => {
        return isLightTheme ? styles.LightBg : styles.darkBg;
    }, [ isLightTheme ])

    const getKey = useCallback((item, index) => `${index}-${id}`, []);
    const getItem = useCallback(({ item }) => <ListItem { ...item } />, []);
    const changeTab = useCallback(prop => () => setTab(prop), []);
    
    return (
        <View style={[ styles.container, isLightTheme ? styles.containerLight : styles.containerDark ]}>
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
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={filteredTodos}
                            keyExtractor={getKey}
                            renderItem={getItem} 
                        />
                    </View>
                    <View style={[ styles.item, styles.row, itemBg ]}>
                        <Text style={styles.grayColor}>{ leftTodos } item{ leftTodos > 1 ? "s" : ""} left</Text>
                        <TouchableOpacity>
                            <Text style={styles.grayColor}>Clear Completed</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[ styles.item, styles.tabsContainer, itemBg ]}>
                        <Tab id="ALL" label="All" onPress={changeTab("ALL")} selectedTab={tab} />
                        <Tab id="ACTIVE" label="Active" onPress={changeTab("ACTIVE")} selectedTab={tab} />
                        <Tab id="COMPLETED" label="Completed" onPress={changeTab("COMPLETED")} selectedTab={tab} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerLight: {
        backgroundColor: '#F7F7F8'
    },
    containerDark: {
        backgroundColor: dark
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
        height: 20,
        width: 20
    },
    todosContainer: {
        position: "relative"
    },
    todosListContainer: {
        left: "5%",
        position: "absolute",
        top: 0,
        transform: "translate(0, -30px)",
        width: "90%"
    },
    flatListContainer: {
        borderRadius: 5,
        overflow: "hidden"
    },
    item: {
        paddingHorizontal: "5%",
        paddingVertical: ".7rem"
    },
    darkBg: {
        backgroundColor: darkBlue
    },
    LightBg: {
        backgroundColor: "#FFF"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    footerDarkTheme: {
        backgroundColor: darkBlue
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "2rem"
    },
    grayColor: {
        color: gray
    }
});

export default Home;