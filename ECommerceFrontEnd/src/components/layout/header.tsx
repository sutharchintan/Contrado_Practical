import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Paper, Button, Grid, IconButton } from '@material-ui/core';
import { ThemeContext } from '../../contexts/theme-context';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/logo.png'
import headerBgImage from '../../assets/header.jpg';
import { Person, PowerSettingsNew } from '@material-ui/icons';


const styles = {
    headerBgContainer: {
        backgroundImage: `url(${headerBgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
};


/**
 * header component
 */
const Header = () => {
    /**
     * the theme context
     */
    const themeContext = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.removeItem("LAB_AUTHENTICATED")
        window.location.href = window.location.host;
        window.location.reload();
    }

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
        <AppBar color="primary" style={styles.headerBgContainer}>
            <Toolbar>
                <Grid container>
                    <Grid item md={1} xs={2}>
                        <img src={logoImage} style={{ width: 80, height: 60 }} />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <div>
                            <Typography variant="h4" style={{ marginTop: 10, color: "#fff" }}>
                                Lab Sample Tracking
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <IconButton
                    style={{ float: "right", color: "#fff" }}
                    onClick={handleLogout}
                    title="Logout"
                >
                    <PowerSettingsNew />
                </IconButton>
                <IconButton
                    style={{ float: "right", color: "#fff" }}
                    title="Profile"
                >
                    <Person />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;