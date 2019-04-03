import React, { Component } from "react"
import get from "lodash/get";
import { connect } from 'react-redux';

import { withStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { httpErrorAction } from '../../actions/httpErrorAction';
import CustomLogoutButton from "../Buttons/CustomLogoutButton";

const styles = theme => ({
    dialogBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 300,
        minWidth: 500,
        marginBottom: 10,
    },
    titleBlock: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 48,
        paddingLeft: 20,
        backgroundColor: theme.palette.mainColor,
        color: "#fff",
        fontSize: 18,
        fontWeight: 800,
    },
    description: {
        fontSize: 15,
        textAlign: "center",
    },
    toolbar: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 15,
    },
    reloadButton: {
        display: "block",
        width: 140,
        height: 40,
        margin: "8px !important",
        color: "white",
        backgroundColor: theme.palette.dangerColor,
        borderRadius: 25,
        fontSize: 16,
        fontWeight: 800,
        "&:hover": {
            color: theme.palette.dangerColor,
            backgroundColor: "white",
        },
    }
});

class HandleErrorModal extends Component {

    state = {
        isErrorModalOpen: false,
    };

    isSessionExpired = (status, message) => {
        return (Number(status) === 400 && message.includes('JWT')) || Number(status) === 403;
    };

    getErrorDescription = (status, isJwtOld) => {
        let result = 'Something is wrong';
        if (Number(status) === 404) {
            result = 'API is currently unavailable';
        } else if (Number(status) > 499) {
            result = 'Something is wrong with the server. Please try again later.';
        } else if (isJwtOld) {
            result = 'Your session has expired. Click the button to log in again.';
        }
        return result;
    };

    closeModal = () => {
        this.setState(
            { isErrorModalOpen: false },
            () => this.props.removeErrorNotification()
        );
    };

    render() {
        const { classes, status, message, httpErrors, ...rest } = this.props;
        const { isErrorModalOpen } = this.state;

        const errorStatus = get(httpErrors, 'status', null);
        const errorMessage = get(httpErrors, 'message', null);

        const isOpen = isErrorModalOpen || (errorStatus && errorMessage);

        const isJwtOld = this.isSessionExpired(errorStatus, errorMessage);
        const errorDescription = this.getErrorDescription(errorStatus, isJwtOld);
        return (
            <React.Fragment>
                <Dialog open={isOpen} {...rest}>
                    <div className={classes.dialogBlock} >
                        <Typography className={classes.titleBlock}>
                            Connection Error
                        </Typography>
                        <Typography className={classes.description}>{errorDescription}</Typography>
                        <div className={classes.toolbar}>
                            <Button onClick={() => this.closeModal()}>Close</Button>
                            { isJwtOld
                                ? <CustomLogoutButton title="Login again" hideIcon={true} />
                                : <Button className={classes.reloadButton} onClick={() => window.location.reload()}>Reload page</Button>
                            }
                        </div>
                    </div>
                </Dialog>
            </React.Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        httpErrors: state.custom.httpErrors.data
    };
};

const mapDispatchToProps = dispatch => ({
    removeErrorNotification() {
        dispatch(httpErrorAction.remove());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HandleErrorModal));