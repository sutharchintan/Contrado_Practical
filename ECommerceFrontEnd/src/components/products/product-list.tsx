import React, { useState, useEffect } from 'react';
import { ComponentRoutes, CommonElements } from '../../enums';
import ListUi from '../layout/list-ui';
import { ListRequest, ListResponse, ProductModel } from '../../models';
import { TableRow, TableCell, IconButton, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NoRecordFound } from '../layout/no-record-found';
import { tableStyles } from "../../styles/table";
import DeleteConfirmation from "../layout/delete-confirmation";

interface Props {
    classes: any;

    loadList: (request) => any;

    delete: (id: number) => any;

    setRecord: (record) => void;
}

const ProductList = (props: Props) => {
    const columnNames = ["Actions", "Name", "Description"];
    const [data, setData] = useState([]);
    const [recordCount, setRecordCount] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [openDelete, setOpenDelete] = useState(false);
    const [currentRecord, setRecord] = useState(undefined);

    useEffect(() => {
        const request = new ListRequest();
        request.PageNumber = page;
        request.PageSize = pageSize;
        loadListData(request);
    }, [])

    const loadListData = async (request) => {
        if (page !== request.PageNumber) {
            setPage(request.PageNumber);
        }

        if (pageSize !== request.PageSize) {
            setPageSize(request.PageSize);
        }

        const result = await props.loadList(request) as ListResponse<ProductModel>;
        if (result && result.Items && result.Count) {
            setData(result.Items);
            setRecordCount(result.Count);
        }
    }

    const onEdit = (record) => {
        props.setRecord(record);
        const detailElement = document.getElementById(CommonElements.detail_link);
        if (detailElement) {
            detailElement.click();
        }
    }

    const onCloseDelete = () => {
        setRecord(undefined);
        setOpenDelete(false);
    };

    const onOpenDelete = (record: ProductModel) => {
        setRecord(record);
        setOpenDelete(true);
    };


    const onDelete = async () => {
        await props.delete(currentRecord.ProductId);
        await loadListData({ PageNumber: page, PageSize: pageSize });
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
                    title={"Product"}
                    message={currentRecord ? "'" + (currentRecord as ProductModel).ProdName + "'" : ""}
                    onClose={onCloseDelete}
                    onSubmit={onDelete}
                />
            );
        } else {
            return null;
        }
    };

    const renderRows = () => {
        return data && data.length ?
            data.map((dataRecord: ProductModel, index) =>
                <TableRow key={index}>
                    <TableCell>
                        {
                            renderEditButton(dataRecord)
                        }

                        <IconButton onClick={(event) => onOpenDelete(dataRecord)}>
                            <Delete />
                        </IconButton>
                    </TableCell>
                    <TableCell>
                        {dataRecord.ProdName}
                    </TableCell>
                    <TableCell>
                        {dataRecord.ProdDescription}
                    </TableCell>
                </TableRow>
            ) : <NoRecordFound colspan={columnNames.length} />
    }

    return (
        <>
            <ListUi
                columnNames={columnNames}
                title="Product - List"
                addLink={ComponentRoutes.ProductDetail}
                totalRecords={recordCount}
                renderRows={renderRows}
                loadData={loadListData}
                classes={props.classes}
            />
            {
                renderDeleteConfirmation()
            }
        </>
    )
}

export default withStyles(tableStyles as any, { withTheme: true })(ProductList);