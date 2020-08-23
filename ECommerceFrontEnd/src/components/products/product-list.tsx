import React, { useState, useEffect } from 'react';
import { ComponentRoutes, CommonElements } from '../../enums';
import ListUi from '../layout/list-ui';
import { ListRequest, ListResponse, ProductModel } from '../../models';
import { TableRow, TableCell, IconButton, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { NoRecordFound } from '../layout/no-record-found';
import { tableStyles } from "../../styles/table";

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

    useEffect(() => {
        const request = new ListRequest();
        request.PageNumber = page;
        request.PageSize = pageSize;
        loadListData(request);
    }, [])

    const loadListData = async (request) => {
        if(page !== request.PageNumber) {
            setPage(request.PageNumber);
        }

        if(pageSize !== request.PageSize) {
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

    const onDelete = async (id) => {
        await props.delete(id);
        await loadListData({ PageNumber: page, PageSize: pageSize});
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

    const renderRows = () => {
        return data && data.length ?
            data.map((dataRecord: ProductModel, index) =>
                <TableRow key={index}>
                    <TableCell>
                        {
                            renderEditButton(dataRecord)
                        }

                        <IconButton onClick={(event) => onDelete(dataRecord.ProdCatId)}>
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
        <ListUi
            columnNames={columnNames}
            title="Product - List"
            addLink={ComponentRoutes.ProductDetail}
            totalRecords={recordCount}
            renderRows={renderRows}
            loadData={loadListData}
            classes={props.classes}
        />
    )
}

export default withStyles(tableStyles as any, { withTheme: true })(ProductList);