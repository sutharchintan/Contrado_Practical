import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Paper, Button, Grid } from '@material-ui/core';
import { ThemeContext } from '../../contexts/theme-context';
import { ComponentRoutes } from '../../enums';
import { Link } from 'react-router-dom';

/**
 * header component
 */
const Header = () => {
    /**
     * the theme context
     */
    const themeContext = useContext(ThemeContext);

    /**
     * render paper block
     * @param title 
     * @param component 
     */
    const renderPaperBlock = (title: string, component: string) => {
        return (
            <Paper style={{ backgroundColor: themeContext.palette.primary.main, width: "100%", height: 60 }}>
                <Link to={component} style={{ textDecoration: "none" }}>
                    <Button fullWidth variant="contained" color="secondary" style={{ padding: 12 }}>
                        {title}
                    </Button>
                </Link>
            </Paper>
        )
    }

    /**
     * return the header component elements
     */
    return (
        <AppBar color="primary">
            <Toolbar>
                <Grid container>
                    <Grid item md={3} xs={12}>
                        <div>
                            <Typography variant="h4" style={{ marginTop: 10 }}>
                                ECommerce Demo
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Grid container spacing={8}>
                            <Grid item md={4} xs={12}>
                                {renderPaperBlock("Products", ComponentRoutes.Products)}
                            </Grid>
                            <Grid item md={4} xs={12}>
                                {renderPaperBlock("Product Categories", ComponentRoutes.ProductCategories)}
                            </Grid>
                            <Grid item md={4} xs={12}>
                                {renderPaperBlock("Product Attributes", ComponentRoutes.ProductAttributes)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header;