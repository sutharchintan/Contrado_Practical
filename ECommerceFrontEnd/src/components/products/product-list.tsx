import React, { useState, useEffect } from 'react';
import ListUi from '../layout/list-ui';
import { TableRow, TableCell, IconButton, withStyles, Grid, FormControl, FormGroup, FormLabel, Select, TextField, Button, Paper } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Delete, Save, Search } from '@material-ui/icons';
import { NoRecordFound } from '../layout/no-record-found';
import { tableStyles } from "../../styles/table";
import DeleteConfirmation from "../layout/delete-confirmation";
import { getUserDetails } from '../../contexts/user-context';
import { UserRoles } from '../../enums/user-roles';
import { SampleModel } from '../../models';
import moment from "moment";
import { ProductLines, ProductUnits, ProductsDesc } from '../../enums/product-types';

interface Props {
    classes: any;
    getSamples: (request: any) => any;
    viewSamples: (request: any) => any;
    addSample: (model: any) => void;
    updateSample: (model: any) => void;
    onMessage: (message: string) => void;
}

const ProductList = (props: Props) => {
    const columnNames = [
        "Sample Taken By", "Date Sample Taken", "Time Sample Taken", "Sample Type", "Sample Status", "Sample Delivered to Lab By",
        "Date Sample Divered to Lab", "Time Sample Divered to Lab", "Sample Given To", "Date QC Tests Completed", "Time QC Tests Completed", "Actions"
    ];

    const [data, setData] = useState<SampleModel[]>([]);
    const [recordCount, setRecordCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentRecord, setRecord] = useState(undefined);
    const [selectedProduct, setSelectedProduct] = useState(undefined);
    const userDetails = getUserDetails();

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
        loadListData();
    }, [])

    const loadListData = async () => {
        const request = {
            userId: userDetails.user_id,
            roleName: userDetails.user_role
        } as any;

        const productData = getSelectedProductData();
        if (productData) {
            request.product_line = productData.Production_Line;
            request.product_unit = productData.Production_Unit;
            request.product_desc = productData.Product_Desc;
        }

        let result;

        if (userDetails.user_role === UserRoles.Sample_View) {
            result = await props.viewSamples(request);
        } else {
            result = await props.getSamples(request);
        }

        if (result && result.Items && result.Count) {
            setData(result.Items);
            setRecordCount(result.Count);
        }
    }

    const getSelectedProductData = () => {
        var returnValue;
        if (selectedProduct) {
            returnValue = {} as any;
            const products = selectedProduct.split(",")
            if (products && products.length) {
                returnValue.Production_Line = products[0];
                returnValue.Production_Line_Id = ProductLines.find(p => p.name === products[0].trim()).id;
                returnValue.Production_Unit = products[1].trim();
                returnValue.Production_Unit_Id = ProductUnits.find(p => p.name === products[1].trim()).id;
                returnValue.Product_Desc = products[2].trim();
                returnValue.Product_Id = ProductsDesc.find(p => p.name === products[2].trim()).id;
            }

            returnValue.Var_Desc = selectedProduct;
        }

        return returnValue;
    }

    const onSaveRecord = async (dataRecord: SampleModel) => {
        if (dataRecord.is_new) {
            const sampleRecord = { ...dataRecord };
            if (selectedProduct) {
                const productData = getSelectedProductData();
                if (productData) {
                    sampleRecord.Production_Line = productData.Production_Line;
                    sampleRecord.Production_Line_Id = productData.Production_Line_Id
                    sampleRecord.Production_Unit = productData.Production_Unit;
                    sampleRecord.Production_Unit_Id = productData.Production_Unit_Id;
                    sampleRecord.Product_Desc = productData.Product_Desc;
                    sampleRecord.Product_Id = productData.Product_Id;
                    sampleRecord.Var_Desc = productData.Var_Desc;
                }
            }
            else {
                props.onMessage("Please select PL. PU, Prod Description");
                return;
            }

            delete sampleRecord.is_new;
            delete sampleRecord.id;
            sampleRecord.CreatedBy = userDetails.user_code;
            sampleRecord.UpdatedBy = userDetails.user_code;

            await props.addSample(sampleRecord);
        } else {
            dataRecord.UpdatedBy = userDetails.user_code;
            await props.updateSample(dataRecord);
        }
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

    const onSaveData = async () => {
        for (let i = 0; i < data.length; i++) {
            const dataRecord = data[i] as SampleModel;
            await onSaveRecord(dataRecord);
        }

        await loadListData();
    }

    const renderEditButton = (dataRecord) => {
        return (
            <IconButton color="primary" onClick={(event) => onSaveRecord(dataRecord)}>
                <Save />
            </IconButton>
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
        existingData.push({ is_new: true, id: new Date().getTime() } as any);
        setData(existingData);
    }

    const onAutoCompleteChange = (e: any) => {
        if (e && e.currentTarget) {
            setSelectedProduct(e.currentTarget.textContent);
        }
    }

    const onSearch = async () => {
        if (!selectedProduct) {
            props.onMessage("Please select PL. PU, Prod Description");
            return;
        }

        await loadListData();
    }

    const renderRows = () => {
        const { classes } = props;
        return data && data.length ?
            data.map((dataRecord: SampleModel, index) =>
                <TableRow key={index} className={classes.tableRow}>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Receiver && !dataRecord.Sample_Delivered_To_Lab_By ?
                                <TextField defaultValue={dataRecord.Sample_Taken_By}
                                    onChange={(e) => {
                                        dataRecord.Sample_Taken_By = e.target.value
                                    }} /> :
                                <FormLabel>{dataRecord.Sample_Taken_By} </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Receiver && !dataRecord.Sample_Delivered_To_Lab_By ?
                                <TextField type="date" defaultValue={dataRecord.Date_Sample_Taken ? moment(dataRecord.Date_Sample_Taken).format("YYYY-MM-DD") : ''}
                                    onChange={(e) => {
                                        dataRecord.Date_Sample_Taken = new Date(e.target.value);
                                    }}
                                /> :
                                <FormLabel>{dataRecord.Date_Sample_Taken ? moment(dataRecord.Date_Sample_Taken).format("MM/DD/YYYY") : ''} </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Receiver && !dataRecord.Sample_Delivered_To_Lab_By ?
                                <TextField type="time" defaultValue={dataRecord.Time_Sample_Taken}
                                    onChange={(e) => {
                                        dataRecord.Time_Sample_Taken = e.target.value
                                    }}
                                />
                                :
                                <FormLabel>{dataRecord.Time_Sample_Taken} </FormLabel>
                        }

                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Receiver && !dataRecord.Sample_Delivered_To_Lab_By ?
                                <TextField defaultValue={dataRecord.Sample_Type}
                                    onChange={(e) => {
                                        dataRecord.Sample_Type = e.target.value
                                    }}
                                />
                                :
                                <FormLabel style={{ backgroundColor: dataRecord.Sample_Type === "normal" ? "green" : dataRecord.Sample_Type === "recheck" ? "yellow" : "", padding: 8 }}>
                                    {dataRecord.Sample_Type}
                                </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Receiver && !dataRecord.Sample_Delivered_To_Lab_By ?
                                <Select defaultValue={dataRecord.Sample_Status}
                                    onChange={(e) => {
                                        dataRecord.Sample_Status = e.target.value as any
                                    }}
                                >
                                    <option value="taken">taken</option>
                                    <option value="delivered to lab">delivered to lab</option>
                                    <option value="partial QC test results">partial QC test results</option>
                                    <option value="equipment down">equipment down</option>
                                    <option value="QC test complete">QC test complete</option>
                                    <option value="not taken - late">not taken - late</option>
                                </Select>
                                :
                                <FormLabel>
                                    {dataRecord.Sample_Status}
                                </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Deliver && !dataRecord.QC_Test_Completed_Date ?
                                <TextField defaultValue={dataRecord.Sample_Delivered_To_Lab_By}
                                    onChange={(e) => {
                                        dataRecord.Sample_Delivered_To_Lab_By = e.target.value
                                    }}
                                />
                                :
                                <FormLabel>{dataRecord.Sample_Delivered_To_Lab_By} </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Deliver && !dataRecord.QC_Test_Completed_Date ?
                                <TextField type="date" defaultValue={dataRecord.Sample_Delivered_Date_Time ? moment(dataRecord.Sample_Delivered_Date_Time).format("YYYY-MM-DD") : ''}
                                    onChange={(e) => {

                                        dataRecord.Sample_Delivered_Date_Time = new Date(e.target.value);
                                    }}
                                /> :
                                <FormLabel>{dataRecord.Sample_Delivered_Date_Time ? moment(dataRecord.Sample_Delivered_Date_Time).format("MM/DD/YYYY") : ''} </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Deliver && !dataRecord.QC_Test_Completed_Date ?
                                <TextField type="time" defaultValue={dataRecord.Sample_Delivered_Time}
                                    onChange={(e) => {
                                        dataRecord.Sample_Delivered_Time = e.target.value
                                    }}
                                />
                                :
                                <FormLabel>{dataRecord.Sample_Delivered_Time} </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        {
                            userDetails.user_role === UserRoles.Sample_Deliver && !dataRecord.QC_Test_Completed_Date ?
                                <TextField defaultValue={dataRecord.Sample_Given_To}
                                    onChange={(e) => {
                                        dataRecord.Sample_Given_To = e.target.value
                                    }}
                                />
                                :
                                <FormLabel>{dataRecord.Sample_Given_To} </FormLabel>
                        }
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        <FormLabel>{dataRecord.QC_Test_Completed_Date ? moment(dataRecord.QC_Test_Completed_Date).format("MM/DD/YYYY") : ''} </FormLabel>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                        <FormLabel>{dataRecord.QC_Test_Completed_Time} </FormLabel>
                    </TableCell>
                    {
                        userDetails.user_role !== UserRoles.Sample_View ?
                            <TableCell className={classes.tableCell}>
                                {
                                    renderEditButton(dataRecord)
                                }
                                {
                                    dataRecord.is_new && <IconButton onClick={(event) => onOpenDelete(dataRecord)}>
                                        <Delete />
                                    </IconButton>
                                }
                            </TableCell> : null
                    }
                </TableRow>
            ) : <NoRecordFound colspan={columnNames.length} />
    }

    const renderSaveButton = () => {
        return <Button style={{ marginTop: 12, float: "right", right: 10 }} size="large" variant="contained" color="primary" onClick={onSaveData}>
            Save
    </Button>
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
                                onChange={onAutoCompleteChange}
                                renderInput={(params) => <TextField {...params} label="PL. PU, Prod Description" variant="outlined" />}
                            />

                        </FormControl>
                    </FormGroup>
                </Grid>
                <Grid item md={4}>
                    <Button style={{ marginTop: 12 }} color="primary" size="large" variant="contained" onClick={onSearch}>
                        <Search />
                                 Search
                            </Button>
                </Grid>
                <Grid item md={4}>
                    {renderSaveButton()}
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

            <Grid container>
                <Grid item md={12} xs={12}>
                    <Paper>
                        {renderSaveButton()}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(tableStyles as any, { withTheme: true })(ProductList);