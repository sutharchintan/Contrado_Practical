import React, { useContext } from 'react';
import { IconButton, withStyles } from '@material-ui/core';
import { LastPage, FirstPage, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { ThemeContext } from '../../contexts/theme-context';

interface Props {

    page: number;

    count: number;

    rowsPerPage: number;

    classes: any;

    onChangePage: (event, page) => void;
}

/**
 * action styles
 * @param theme the theme
 */
const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing() * 2.5,
    },
});

const TablePager = (props: Props) => {
    const { classes, count, page, rowsPerPage } = props;
    const themeContext = useContext(ThemeContext);

    /**
     * handle first page button click
     */
    const handleFirstPageButtonClick = (event) => {
        props.onChangePage(event, 0);
    };

    /**
     * handle back button click
     */
    const handleBackButtonClick = event => {
        props.onChangePage(event, props.page - 1);
    };

    /**
     * handle next button click
     */
    const handleNextButtonClick = event => {
        props.onChangePage(event, props.page + 1);
    };

    /**
    * handle last page button click
    */
    const handleLastPageButtonClick = event => {
        props.onChangePage(
            event,
            Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1),
        );
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                {themeContext.direction === 'rtl' ? <LastPage /> : <FirstPage />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="Previous Page"
            >
                {themeContext.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                {themeContext.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                {themeContext.direction === 'rtl' ? <FirstPage /> : <LastPage />}
            </IconButton>
        </div>
    )
}

export default withStyles(actionsStyles, { withTheme: true })(TablePager);