import React from 'react';
import { AccordionActions, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CommonElements } from '../../enums';

interface Props {

    backLink: string;

    handleCancel: () => void;

    handleSave: () => void;
}

const DetailActions = (props: Props) => {

    return (
        <AccordionActions style={{ justifyContent: "center" }}>
            <Button size="small" variant="contained" onClick={props.handleCancel}>
                {"Cancel"}
            </Button>
            <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={props.handleSave}
            >
                {"Save"}
            </Button>
            <Link id={CommonElements.list_link} style={{ display: "none" }} to={props.backLink} >
            </Link>
        </AccordionActions>
    )
}

export default DetailActions;