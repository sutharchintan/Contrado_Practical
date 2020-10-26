import React, { useContext } from 'react';
import Header from './header-container';
import { ThemeContext } from '../../contexts/theme-context';
import { MuiThemeProvider } from '@material-ui/core';
import MainContent from './main-content';
import LoaderContainer from '../loader/loader-container';
import ErrorMessageContainer from '../message/error-message-container';

const Layout = (props) => {
    const themeContext = useContext(ThemeContext)
    return (
        <MuiThemeProvider theme={themeContext}>
            <Header />
            <MainContent />
            <LoaderContainer />
            <ErrorMessageContainer />
        </MuiThemeProvider>
    )
}

export default Layout;