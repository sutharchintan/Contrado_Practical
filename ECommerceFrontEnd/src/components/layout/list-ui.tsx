import React, { useReducer, useEffect } from 'react';
import { Accordion, AccordionDetails, Grid, Table, TableBody, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import PanelTitle from './panel-title';
import TableHeader from './table-header';
import TablePager from './table-pager';
import { PagerState } from '../../models';
import { pagerReducer } from '../../reducers/pager-reducer';
import { PagerActions } from '../../enums/pager-actions';
import { Link } from 'react-router-dom';
import { CommonElements } from '../../enums';

interface Props {

    title: string;

    addLink: string;

    columnNames: string[];

    totalRecords: number;

    classes: any;

    renderRows: () => any;

    loadData: (request) => any;
}


const ListUi = (props: Props) => {
    const [pagerState, dispatch] = useReducer(pagerReducer, new PagerState());

    useEffect(() => {
        dispatch({ type: PagerActions.Set_Pager, payload: { totalRecords: props.totalRecords } });
    }, [props.totalRecords])

    const onPageChanged = (event, page) => {
        const changedPage = page + 1;
        dispatch({ type: PagerActions.Set_Pager, payload: { page: changedPage } });

        if (props.loadData) {
            props.loadData({ PageNumber: changedPage, PageSize: pagerState.pageSize })
        }
    }

    const onChangeRowsPerPage = (event) => {
        const pageSize = event.target.value
        dispatch({ type: PagerActions.Set_Pager, payload: { pageSize: pageSize } });

        if (props.loadData) {
            props.loadData({ PageNumber: pagerState.page, PageSize: pageSize })
        }
    }

    /**
     * render table footer
     */
    const renderTableFooter = () => {
        return pagerState.totalRecords ? (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        colSpan={props.columnNames.length}
                        count={pagerState.totalRecords}
                        rowsPerPage={pagerState.pageSize}
                        page={pagerState.page - 1}
                        onChangePage={onPageChanged}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        ActionsComponent={TablePager as any}
                    />
                </TableRow>
            </TableFooter>
        ) : null;
    }

    const renderTableHeader = () => {
        return (
            <TableHeader columnNames={props.columnNames} classes={props.classes} />
        )
    }

    const renderTableBody = () => {
        return (
            <TableBody>
                {props.renderRows ? props.renderRows() : null}
            </TableBody>
        )
    }

    const renderDetails = () => {
        return (
            <AccordionDetails>
                <Grid container>
                    <Table className={props.classes.table}>
                        {
                            renderTableHeader()
                        }
                        {
                            renderTableBody()
                        }
                        {
                            renderTableFooter()
                        }
                    </Table>
                </Grid>
            </AccordionDetails>
        )
    }

    const renderLink = () => {
        return (
            <Link id={CommonElements.detail_link} style={{ textDecoration: "none", display: "none" }} to={props.addLink}>
            </Link>
        )
    }

    return (
        <Accordion style={{ margin: 0 }} defaultExpanded>
            <PanelTitle title={props.title} componentLink={props.addLink} buttonText="Add"></PanelTitle>
            {
                renderDetails()
            }
            {
                renderLink()
            }
        </Accordion>
    )
}

export default ListUi;