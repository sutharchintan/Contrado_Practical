import React, { useContext, useState } from 'react';
import { FormControl, FormGroup, Button, Grid, Select, Paper, TextField, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { ThemeContext } from '../../contexts/theme-context';
import { setUserDetails } from "../../contexts/user-context";
import { MuiThemeProvider } from '@material-ui/core';
import LoaderContainer from '../loader/loader-container';
import ErrorMessageContainer from '../message/error-message-container';

import bgImage from '../../assets/lab_back.jpg'
import logoImage from '../../assets/logo.png'
import loginImage from '../../assets/login.jpg';
import { Autocomplete } from '@material-ui/lab';
import { UserRoles } from '../../enums/user-roles';

const styles = {
    bgContainer: {
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%'
    }
};

interface LoginProps {
    onLogin: (model) => any;
    onMessage: (message) => void;
}

const Login = (props: LoginProps) => {
    const themeContext = useContext(ThemeContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const autoCompleteData = [
        {
            value: "1",
            label: UserRoles.Sample_Receiver
        },
        {
            value: "2",
            label: UserRoles.Sample_Deliver
        }
        ,
        {
            value: "3",
            label: UserRoles.Sample_View
        }
    ]

    const handleLogin = async () => {
        if (!userName) {
            props.onMessage("UserName is required.");
            return;
        }

        if (!password) {
            props.onMessage("Password is required.");
            return;
        }

        const loginData = await props.onLogin({
            Username: userName,
            Password: password
        });

        if (loginData) {
            setUserDetails(loginData);
            window.location.reload();
        }
    }

    return (
        <MuiThemeProvider theme={themeContext}>
            <div style={styles.bgContainer}>
                <img src={logoImage} style={{ height: 100, width: 100, position: "absolute", top: 30, left: 120 }} />
                <Grid container>
                    <Grid item md={4}>
                    </Grid>

                    <Grid item md={3} xs={12} style={{ marginLeft: 100 }}>
                        <Paper style={{ padding: 32, marginTop: "25%" }}>
                            <FormGroup style={{ marginBottom: 16 }}>
                                <FormControl>
                                    <img src={loginImage} style={{ height: 80, width: 80 }} />
                                    <Typography variant="h6" color="primary" gutterBottom style={{ position: "absolute", marginLeft: 100, marginTop: 25 }}>
                                        Lab Sample Tracking
                                    </Typography>
                                </FormControl>
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 16 }}>
                                <FormControl>
                                    <TextField label="UserName" variant="outlined" onChange={(e) => setUserName(e.target.value)}>

                                    </TextField>
                                </FormControl>
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 16 }}>
                                <FormControl>
                                    <TextField type="password" label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}>

                                    </TextField>
                                </FormControl>
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 16 }}>
                                <FormControl>
                                    <Autocomplete
                                        id="combo-box-role"
                                        options={autoCompleteData}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} label="User Role" variant="outlined" />}
                                    />
                                </FormControl>
                            </FormGroup>
                            <FormGroup style={{ marginBottom: 16 }}>
                                <FormControl>
                                    <Button color="primary" style={{ color: "#ffffff" }} variant="contained" onClick={handleLogin}>
                                        Login
                                </Button>
                                </FormControl>
                            </FormGroup>
                        </Paper>
                    </Grid>

                    <Grid item md={4}>
                    </Grid>
                </Grid>
            </div>
            <LoaderContainer />
            <ErrorMessageContainer />
        </MuiThemeProvider>
    )
}

export default withRouter(Login as any);