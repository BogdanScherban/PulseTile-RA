import React from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';

import tableHeaders from "../config/tableHeaders";

const styles = theme => ({
    tableHeaderBlock: {
        background: theme.tableHeader.tableHeaderBlock.background,
        backgroundSize: "cover",
        color: "white",
        paddingLeft: "14px",
        paddingTop: "25px",
        paddingBottom: "14px"
    },
    title: {
        marginTop: 0,
    }
});

/**
 * This component returns header for table
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {string} resource
 * @constructor
 */
const TableHeader = ({ classes, resource }) => (
    <div className={classes.tableHeaderBlock} >
        <h1 className={classes.title}>{get(tableHeaders, [resource, 'title'], null)}</h1>
        <p>{get(tableHeaders, [resource, 'description'], null)}</p>
    </div>
);

export default withStyles(styles)(TableHeader);