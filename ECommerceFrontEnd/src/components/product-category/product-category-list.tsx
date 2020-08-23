import React, { useEffect, useState } from 'react';
import ListUi from '../layout/list-ui';
import { ComponentRoutes, CommonElements } from '../../enums';
import { ListRequest, ListResponse, ProductCategoryModel } from '../../models';
import { TableRow, TableCell, IconButton, withStyles } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { tableStyles } from "../../styles/table";

interface Props {
    classes: any;

    setRecord: (record) => void;

    loadList: (request) => any;

    delete: (id: number) => any;
}

const ProductCategoryList = (props: Props) => {
    const columnNames = ["Actions", "Name"];
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
        
        const result = await props.loadList(request) as ListResponse<ProductCategoryModel>;
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
            <IconButton onClick={(event) => onEdit(dataRecord)}>
                <Edit />
            </IconButton>
        )
    }

    const renderRows = () => {
        return data && data.length ?
            data.map((dataRecord: ProductCategoryModel, index) =>
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
                        {dataRecord.CategoryName}
                    </TableCell>
                </TableRow>

            ) : null
    }

    return (
        <ListUi
            columnNames={columnNames}
            title="Product Category - List"
            addLink={ComponentRoutes.ProductCategory}
            totalRecords={recordCount}
            renderRows={renderRows}
            loadData={loadListData}
            classes={props.classes}
        />
    )
}

export default withStyles(tableStyles as any, { withTheme: true })(ProductCategoryList);