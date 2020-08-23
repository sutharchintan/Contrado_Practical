import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ComponentRoutes } from '../../enums';
import ProductListContainer from '../products/product-list-container';
import ProductDetailContainer from '../products/product-detail-container';
import ProductCategoryListContainer from '../product-category/product-category-list-container';
import ProductCategoryContainer from '../product-category/product-category-container';
import ProductAttributeListContainer from '../product-attributes/product-attribute-list-container';
import ProductAttributeContainer from "../product-attributes/product-attribute-container";
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
                <Route exact path={ComponentRoutes.ProductDetail} component={ProductDetailContainer}></Route>
                <Route exact path={ComponentRoutes.ProductCategories} component={ProductCategoryListContainer}></Route>
                <Route exact path={ComponentRoutes.ProductCategory} component={ProductCategoryContainer}></Route>
                <Route exact path={ComponentRoutes.ProductAttributes} component={ProductAttributeListContainer}></Route>
                <Route exact path={ComponentRoutes.ProductAttribute} component={ProductAttributeContainer}></Route>
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