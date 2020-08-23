import { createContext } from 'react';
import { createMuiTheme } from '@material-ui/core';

const lightTheme = () => {
    return createMuiTheme({
        palette : {
            primary: {
                main: "#2196f3",
                light: "#35baf6",
                dark: "#1769aa"
            },
            secondary: {
                main: "#9E9E9E",
                light: "#F5F5F5",
                dark: "#616161"
            }
        }
    })
}

export const themes = {
    defaultTheme : lightTheme()
}

export const ThemeContext = createContext(themes.defaultTheme);