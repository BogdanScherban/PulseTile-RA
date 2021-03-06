import React, { Component } from "react";
import { get } from "lodash";

import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Menu from '@material-ui/core/Menu';

import { pageHasTitle } from "../../../../core/common/Topbar/functions";
import PageTitle from "../../../../core/common/Topbar/fragments/PageTitle";
import PatientBanner from "../../../../core/common/Topbar/fragments/PatientBanner";

const styles = theme => ({
    lowPart: {
        display: "flex",
        flexDirection: "column",
        padding: 0,
    },
    menuAndBanner: {
        display: "flex",
        width: "100%",
        minHeight: "auto",
        border: "1px solid #e5e5e5",
        padding: 0,
        backgroundColor: "white",
        justifyContent: "space-between",
    },
    menuButtonBlock: {
        display: "inline-flex",
        position: "relative",
        minWidth: 238,
        minHeight: 90,
        borderRight: "1px solid #e5e5e5",
        justifyContent: "center",
        alignItems: "center",
    },
    menuButton: {
        borderRadius: 15,
        maxHeight: 20,
        minWidth: 64,
        color: theme.global.mainColor,
        textTransform: "none",
        backgroundColor: "white",
        '&:hover': {
            backgroundColor: theme.global.mainColor,
            color: "white",
        },
        '&:active': {
            backgroundColor: theme.global.mainColor,
            color: "white",
        },
    },
    title: {
        display: "block",
        width: "100%",
        flexGrow: 1,
        color: "white",
        backgroundColor: theme.global.mainColor,
        textAlign: "center",
        paddingTop: 5,
        paddingBottom: 5,
        fontWeight: 800,
    },
    patientInfo: {
        color: "black",
        padding: "11px 14px",
        marginLeft: 5,
    },
    gridBlock: {
        padding: "0px !important",
        marginTop: 5,
        marginBottom: 5,
    },
});

/**
 * This component returns button which toggle sidebar menu
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @param {shape}   classes
 * @param {func}    setSidebarVisibility
 * @param {boolean} isSidebarOpen
 * @constructor
 */
const MenuButton = ({ classes, setSidebarVisibility, isSidebarOpen }) => {
    return (
        <div className={classes.menuButtonBlock}>
            <Button variant="contained" color="primary" className={classes.menuButton} onClick={() => setSidebarVisibility(!isSidebarOpen)}>
                { !isSidebarOpen ? <MenuIcon /> : <CloseIcon /> }
                { !isSidebarOpen ? 'Menu' : 'Close' }
            </Button>
        </div>
    );
};

/**
 * This component returns low part of Showcase TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 * @constructor
 */
class LowPart extends Component {

    componentWillMount() {
        this.props.setSidebarVisibility(true);
    }

    render() {
        const { classes, isSidebarOpen, setSidebarVisibility, location, patientInfo } = this.props;
        const isPageHasTitle = pageHasTitle(location);
        return (
            <Toolbar className={classes.lowPart}>
                {
                    isPageHasTitle &&
                        <PageTitle classes={classes} location={location} />
                }
                <div className={classes.menuAndBanner}>
                    <MenuButton classes={classes} setSidebarVisibility={setSidebarVisibility} isSidebarOpen={isSidebarOpen} />
                    {
                        !isPageHasTitle &&
                            <PatientBanner location={location} classes={classes} patientInfo={patientInfo} />
                    }
                </div>
            </Toolbar>
        );
    }

};

export default withStyles(styles)(LowPart);
