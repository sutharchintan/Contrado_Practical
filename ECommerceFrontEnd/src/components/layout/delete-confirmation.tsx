import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, FormLabel, Button, Divider } from '@material-ui/core';

interface Props {
    open: boolean;

    title: string;

    message: string;

    onClose: () => void;

    onSubmit: () => void;
}

/**
 * delete confirmation dialog
 * @param props 
 */
const DeleteConfirmation = (props: Props) => {

    const renderDialog = () => {
        return (
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle>
                    Delete
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <FormGroup>
                        <FormLabel>
                            Are you sure you want to delete this : {props.message} ?
                        </FormLabel>
                    </FormGroup>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={props.onSubmit}>
                        Submit
            </Button>
                    <Button variant="contained" color="secondary" onClick={props.onClose}>
                        Cancel
            </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (props.open ? renderDialog() : null)
}

export default DeleteConfirmation;