import React, { Component } from 'react';
import get from "lodash/get";
import { setSidebarVisibility } from 'react-admin';
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';

import TopPart from "./fragments/TopPart";
import LowPart from "./fragments/LowPart";

import { demographicsAction } from "../../actions/demographocsAction";
import { themeCommonElements } from "../../../version/config/theme.config";

/**
 * This is common component for custom core TopBar
 *
 * @author Bogdan Shcherban <bsc@piogroup.net>
 */
class CustomTopbar extends Component {

    componentDidMount() {
        const currentUserID = localStorage.getItem('userId');
        this.props.getDemographicsAction(currentUserID);
    }

    render() {
        const ThemeTopBar = get(themeCommonElements, 'topbar', false);
        if (ThemeTopBar) {
            return (
                <ThemeTopBar {...this.props} />
            );
        }
        return (
            <AppBar position="static">
                <TopPart {...this.props} />
                <LowPart {...this.props} />
            </AppBar>
        );
    }
};

const mapStateToProps = state => {
    return {
        isLoading: get(state, 'admin.loading', false),
        location: get(state, 'router.location', null),
        isSidebarOpen: get(state, 'admin.ui.sidebarOpen', true),
        patientInfo: get(state, 'custom.demographics.data', null),
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDemographicsAction(userId) {
            dispatch(demographicsAction.request(userId));
        },
        setSidebarVisibility(params) {
            dispatch(setSidebarVisibility(params));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTopbar);

