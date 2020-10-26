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
    const renderTableCell = (index) => {
        if (index < 5)
            return props.classes.tableHeadReceiver
        else if (index < 9)
            return props.classes.tableHeadDeliver
        else if (index < 11)
            return props.classes.tableHeadCompleted
        else
            return props.classes.tableHead
    }

    return (
        <TableHead className={props.classes.tableHead}>
            <TableRow>
                {
                    props.columnNames.map((columnName, index) =>
                        <TableCell key={index} className={renderTableCell(index)}>
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