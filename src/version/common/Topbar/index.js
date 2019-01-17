import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';

import TopPart from "./fragments/TopPart";
import LowPart from "./fragments/LowPart";
import styles from "../../styles";

/**
 * This is common component for theme TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
const ThemeTopBar = ({ classes, ...rest }) => {

    console.log(classes)

    return (
        <AppBar position="static" className={classes.appBar}>
            <TopPart {...rest} />
            <LowPart {...rest} />
        </AppBar>
    );
};

export default withStyles(styles.header)(ThemeTopBar);