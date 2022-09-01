import { createContext, useCallback, useState } from "react";


const ThemeContext = createContext();
ThemeContext.displayName = "ThemeContext";

const ThemeContextProvider = ({ children }) => {
    const [ theme, setTheme ] = useState("light");

    const isLightTheme = theme === "light";

    const toggleTheme = useCallback(() => {
        setTheme(currentTheme => currentTheme === "light" ? "dark" : "light");
    }, []);

    return (
        <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
            { children }
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeContextProvider };