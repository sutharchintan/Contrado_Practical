import React from 'react';
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
    showError: boolean;
    errorMessage: string;
    onClose: () => void;
}

const ErrorMessage = (props: Props) => {
    const { onClose, showError, errorMessage } = props;

    const renderSnackBar = () => {
        return (
            <Snackbar open={showError} autoHideDuration={6000} onClose={onClose}>
                <Alert onClose={onClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        )
    }

    return (
        props.showError ? renderSnackBar() : null
    )
}

export default ErrorMessage