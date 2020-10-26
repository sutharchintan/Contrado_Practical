import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ComponentRoutes } from '../../enums';
import ProductListContainer from '../products/product-list-container';

/**
 * main content component
 */
const MainContent = () => {

    /**
     * render components routing
     */
    const renderComponents = () => {
        return (
            <Switch>
                <Route exact path={ComponentRoutes.Index} component={ProductListContainer}></Route>
                <Route exact path={ComponentRoutes.Products} component={ProductListContainer}></Route>
            </Switch>
        )
    }

    /**
     * return the elements for main content
     */
    return (
        <main style={{ marginTop: 64 }}>
            {renderComponents()}
        </main>
    )
}

export default MainContent;