import { createContext } from 'react';
import { createMuiTheme } from '@material-ui/core';

const lightTheme = () => {
    return createMuiTheme({
        palette : {
            primary: {
                main: "#007bff",
                light: "#66a2e3",
                dark: "#0956ab"
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