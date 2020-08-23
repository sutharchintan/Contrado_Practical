import React from 'react';
import { themes, ThemeContext } from '../contexts/theme-context';
import Layout from './layout/layout';
import { Provider } from 'react-redux'
import { store } from '../contexts/store-context';

const RootComponent = () => {
    return (
        <Provider store={store}>
            <ThemeContext.Provider value={themes.defaultTheme}>
                <Layout>
                </Layout>
            </ThemeContext.Provider>
        </Provider>
    )
}

export default RootComponent;