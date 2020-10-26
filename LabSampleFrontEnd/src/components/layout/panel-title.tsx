import React, { useContext } from 'react';
import { AccordionSummary, Typography, Button } from "@material-ui/core";
import { ThemeContext } from '../../contexts/theme-context';
import { Link } from 'react-router-dom';

interface Props {
    /**
     * defines the title for panel title
     */
    title: string;

    /**
     * defines the button text
     */
    buttonText: string;

    /**
     * defines the component link
     */
    componentLink?: string;

    /**
     * children for panel title
     */
    children?: any;

    /**
     * on add action
     */
    onAdd?: any; 
}


const PanelTitle = (props: Props) => {
    const themeContext = useContext(ThemeContext);

    return (
        <AccordionSummary
            style={{
                backgroundColor: themeContext.palette.primary.main,
                color: themeContext.palette.primary.contrastText,
                height: 48,
                minHeight: 48
            }}>
            <Typography
                variant="subtitle1"
                style={{ flex: 1}}>
                {
                    props.title
                }
            </Typography>
            <Button color="primary" variant="contained" size="small" onClick={props.onAdd}>
                {props.buttonText}
            </Button>
        </AccordionSummary>
    )
}

export default PanelTitle;