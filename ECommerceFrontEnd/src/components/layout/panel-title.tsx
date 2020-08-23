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
                color="inherit"
                style={{ flex: 1 }}>
                {
                    props.title
                }
            </Typography>
            <Link style={{ textDecoration: "none" }} to={props.componentLink} >
                <Button color="secondary" variant="contained" size="small">
                    {props.buttonText}
                </Button>
            </Link>
        </AccordionSummary>
    )
}

export default PanelTitle;