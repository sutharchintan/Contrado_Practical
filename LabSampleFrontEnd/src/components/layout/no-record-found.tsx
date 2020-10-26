import React from 'react';
import { TableRow, TableCell, Typography } from '@material-ui/core';

interface Props {
    /**
     * defines the colspan for table column
     */
    colspan?: number;
}

/**
 * no record found
 * @param props 
 */
export const NoRecordFound = (props: Props) => {
    return (
        <TableRow>
            <TableCell style={{ textAlign: "center" }} colSpan={props.colspan}>
                <Typography variant="body1">
                    No record founds.
                </Typography>
            </TableCell>
        </TableRow>
    )
}