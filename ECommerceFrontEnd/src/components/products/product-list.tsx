import React, { useState, useEffect } from 'react';
import { ComponentRoutes, CommonElements } from '../../enums';
import ListUi from '../layout/list-ui';
import { ListRequest, ListResponse, ProductModel } from '../../models';
import { TableRow, TableCell, IconButton, withStyles, Grid, FormControl, FormGroup, FormLabel, Select, Paper, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NoRecordFound } from '../layout/no-record-found';
import { tableStyles } from "../../styles/table";
import DeleteConfirmation from "../layout/delete-confirmation";

interface Props {
    classes: any;
}

const ProductList = (props: Props) => {
    const columnNames = [
        "Sample Taken By", "Date Sample Taken", "Time Sample Taken", "Sample Type", "Sample Status", "Sample Delivered to Lab By",
        "Date Sample Divered to Lab", "Time Sample Divered to Lab", "Sample Given To", "Date QC Tests Completed", "Time QC Tests Completed", "Actions"
    ];

    const [data, setData] = useState([]);
    const [recordCount, setRecordCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentRecord, setRecord] = useState(undefined);

    const autoCompleteData = [
        {
            label: "UF (ultrafine), cell 9 discharge, SFPE",
            value: "1"
        },
        {
            value: "2",
            label: "Wet Plant, SNG Sump 1-2, atomite"
        },
        {
            value: "3",
            label: "dryer, FSD 22, atomite"
        },
        {
            value: "4",
            label: "UF (ultrafine), bird 212, supermite"
        },
        {
            value: "5",
            label: "EPF, turbulizer 3, supercoat"
        },
        {
            value: "6",
            label: "Slurry Plant, SNG Sump 11-16, supermite"
        }
    ]

    useEffect(() => {
        const request = new ListRequest();
        request.PageNumber = page;
        request.PageSize = pageSize;
        loadListData(request);
    }, [])

    const loadListData = (request) => {
        if (page !== request.PageNumber) {
            setPage(request.PageNumber);
        }

        if (pageSize !== request.PageSize) {
            setPageSize(request.PageSize);
        }

        const sample1 = {
            id: 1,
            sample_taken_by: "Bernard",
            date_sample_taken: "9/17/2020",
            time_sample_taken: "10:20 AM",
            sample_type: "normal",
            sample_status: "taken",
            sample_delivered_to_lab_by: "Joe Doe",
            date_sample_delivered_to_lab: "9/17/2020",
            time_sample_delevered_to_lab: "10:55 AM",
            sample_given_to: "",
            date_qc_tests_completed: "",
            time_qc_tests_completed: ""
        }

        const sample2 = {
            id: 2,
            sample_taken_by: "Bernard",
            date_sample_taken: "9/17/2020",
            time_sample_taken: "11:20 AM",
            sample_type: "recheck",
            sample_status: "delivered to lab",
            sample_delivered_to_lab_by: "Joe Doe",
            date_sample_delivered_to_lab: "9/17/2020",
            time_sample_delevered_to_lab: "03:55 PM",
            sample_given_to: "",
            date_qc_tests_completed: "",
            time_qc_tests_completed: ""
        }

        const sample3 = {
            id: 3,
            sample_taken_by: "Don Jahnson",
            date_sample_taken: "9/17/2020",
            time_sample_taken: "10:45 AM",
            sample_type: "recheck",
            sample_status: "partial QC test results",
            sample_delivered_to_lab_by: "Joe Doe",
            date_sample_delivered_to_lab: "9/17/2020",
            time_sample_delevered_to_lab: "11:55 AM",
            sample_given_to: "",
            date_qc_tests_completed: "",
            time_qc_tests_completed: ""
        }


        const sample4 = {
            id: 4,
            sample_taken_by: "Glen Mexwell",
            date_sample_taken: "9/18/2020",
            time_sample_taken: "10:50 AM",
            sample_type: "normal",
            sample_status: "QC test complete",
            sample_delivered_to_lab_by: "Mathew Cyuprik",
            date_sample_delivered_to_lab: "9/19/2020",
            time_sample_delevered_to_lab: "06:55 PM",
            sample_given_to: "Danger LAB",
            date_qc_tests_completed: "9/20/2020",
            time_qc_tests_completed: "10:05 AM"
        }

        const sample5 = {
            id: 5,
            sample_taken_by: "Dan Bekkers",
            date_sample_taken: "9/28/2020",
            time_sample_taken: "10:10 AM",
            sample_type: "na",
            sample_status: "equiment down",
            sample_delivered_to_lab_by: "Max Hen",
            date_sample_delivered_to_lab: "",
            time_sample_delevered_to_lab: "",
            sample_given_to: "",
            date_qc_tests_completed: "",
            time_qc_tests_completed: ""
        }

        const result = {
            Items: [sample1, sample2, sample3, sample4, sample5],
            Count: 5
        }

        if (result && result.Items && result.Count) {
            setData(result.Items);
            setRecordCount(result.Count);
        }
    }

    const onEdit = (record) => {

    }

    const onCloseDelete = () => {
        setRecord(undefined);
        setOpenDelete(false);
    };

    const onOpenDelete = (record: any) => {
        setRecord(record);
        setOpenDelete(true);
    };

    const onDelete = async () => {
        if (currentRecord) {
            const index = data.findIndex(a => a.id === currentRecord.id);
            if (index > -1) {
                data.splice(index, 1);
            }

            setData([...data]);
        }

        onCloseDelete();
    }

    const renderEditButton = (dataRecord) => {
        return (
            <Link style={{ textDecoration: "none" }} to={ComponentRoutes.ProductDetail} >
                <IconButton onClick={(event) => onEdit(dataRecord)}>
                    <Edit />
                </IconButton>
            </Link>
        )
    }

    const renderDeleteConfirmation = () => {
        if (openDelete) {
            return (
                <DeleteConfirmation
                    open={openDelete}
                    title={"Sample"}
                    message={""}
                    onClose={onCloseDelete}
                    onSubmit={onDelete}
                />
            );
        } else {
            return null;
        }
    };

    const addNew = (e) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        const existingData = [...data]
        existingData.push({ is_new: true, id: new Date().getTime() });
        setData(existingData);
    }

    const renderRows = () => {
        return data && data.length ?
            data.map((dataRecord: any, index) =>
                <TableRow key={index}>
                    <TableCell>
                        <TextField value={dataRecord.sample_taken_by} />
                    </TableCell>
                    <TableCell>
                        <TextField type="date" value={dataRecord.date_sample_taken} />
                    </TableCell>
                    <TableCell>
                        <TextField type="time" />
                    </TableCell>
                    <TableCell>
                        <FormLabel style={{ backgroundColor: dataRecord.sample_type === "normal" ? "green" : dataRecord.sample_type === "recheck" ? "yellow" : "", padding: 8 }}>
                            {dataRecord.sample_type}
                        </FormLabel>
                    </TableCell>
                    <TableCell>
                        <Select>
                            <option value="taken">taken</option>
                            <option value="delivered to lab">delivered to lab</option>
                            <option value="partial QC test results">partial QC test results</option>
                            <option value="equipment down">equipment down</option>
                            <option value="QC test complete">QC test complete</option>
                            <option value="not taken - late">not taken - late</option>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <TextField value={dataRecord.sample_delivered_to_lab_by} />
                    </TableCell>
                    <TableCell>
                        <TextField type="date" />
                    </TableCell>
                    <TableCell>
                        <TextField type="time" />
                    </TableCell>
                    <TableCell>
                        <TextField value={dataRecord.sample_given_to} />
                    </TableCell>
                    <TableCell>
                        <TextField type="date" />
                    </TableCell>
                    <TableCell>
                        <TextField type="time" />
                    </TableCell>
                    <TableCell>
                        {
                            renderEditButton(dataRecord)
                        }
                        {
                            dataRecord.is_new && <IconButton onClick={(event) => onOpenDelete(dataRecord)}>
                                <Delete />
                            </IconButton>
                        }

                    </TableCell>
                </TableRow>
            ) : <NoRecordFound colspan={columnNames.length} />
    }

    return (
        <div style={{ padding: 16 }}>
            <Grid container>
                <Grid item md={4} xs={12}>
                    <FormGroup style={{ padding: 8 }}>
                        <FormControl style={{ marginBottom: 8 }}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={autoCompleteData}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => <TextField {...params} label="PL. PU, Prod Description" variant="outlined" />}
                            />
                        </FormControl>
                    </FormGroup>
                </Grid>
                <Grid item md={4}>
                </Grid>
                <Grid item md={4}>
                    <Button style={{ float: "right", right: 10 }} size="large" variant="contained" color="primary">
                        Save
                    </Button>
                </Grid>
            </Grid>
            <ListUi
                columnNames={columnNames}
                title="Sample Tracking - List"
                addAction={addNew}
                totalRecords={recordCount}
                renderRows={renderRows}
                loadData={loadListData}
                classes={props.classes}
            />
            {
                renderDeleteConfirmation()
            }
        </div>
    )
}

export default withStyles(tableStyles as any, { withTheme: true })(ProductList);