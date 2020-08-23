import React from 'react';
import { TableHead, TableRow, TableCell } from '@material-ui/core';

interface Props {
    /**
     * defines the column names
     */
    columnNames: string[];

    /**
     * defines the classes
     */
    classes: any;
}

const TableHeader = (props: Props) => {
    return (
        <TableHead className={props.classes.tableHead}>
            <TableRow>
                {
                    props.columnNames.map((columnName, index) =>
                        <TableCell key={index} className={props.classes.tableHeadCell} >
                            {
                                columnName
                            }
                        </TableCell>
                    )
                }
            </TableRow>
        </TableHead>
    )
}

export default TableHeader;