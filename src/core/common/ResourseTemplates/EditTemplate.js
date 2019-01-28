import React from "react";
import {
    Edit,
    SimpleForm,
    TextInput,
    DisabledInput,
    DateInput,
    LongTextInput
} from "react-admin";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import EditFormToolbar from "../../common/Toolbars/EditFormToolbar";
import { MAIN_COLOR } from "../../config/styles";

const styles = {
    editBlock: {
        width: '100%',
        backgroundColor: "white",
        margin: "15px 15px 15px 0px",
    },
    blockTitle: {
        display: "flex",
        alignItems: "center",
        height: "49px",
        color: "white",
        backgroundColor: MAIN_COLOR,
        fontSize: "18px",
        fontWeight: "700",
        paddingLeft: "15px",
    },
    editForm: {
        '& > div': {
            paddingTop: "0px !important",
            paddingLeft: "10px !important",
            paddingRight: "10px !important",
        },
    },
};

/**
 * This component returns block with template for plugin edit form
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape} classes
 * @param {func}  changeViewType
 * @param {shape} rest
 * @constructor
 */
const EditTemplate = ({ classes, blockTitle, children, changeViewType, ...rest }) => (
    <div className={classes.editBlock}>
        <Typography className={classes.blockTitle}>{blockTitle}</Typography>
        <Edit {...rest}>
            <SimpleForm className={classes.editForm} toolbar={<EditFormToolbar changeViewType={changeViewType} />}>
                {children}
            </SimpleForm>
        </Edit>
    </div>
);

export default withStyles(styles)(EditTemplate);