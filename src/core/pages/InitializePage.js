import React, { Component } from "react";
import { get } from "lodash";
import { connect } from 'react-redux';
import { userLogin } from 'react-admin';

import { initializeAction } from "../actions/initializeAction";
import { userInfoAction } from "../actions/userInfoAction";

const OLD_PATIENT_DELAY = 1000;
const NEW_PATIENT_DELAY = 5000;

class InitializePage extends Component {

    componentDidMount() {
        this.props.initializeUser();
    }

    componentWillReceiveProps(newProps) {
        const { userInfo, initialize } = newProps;

        console.log('userInfo', userInfo);
        console.log('initialize', initialize);

        if (get(initialize, 'status', null) === 'loading_data') {
            const isNewPatient = get(initialize, 'new_patient', false);
            setInterval(this.props.initializeUser(), isNewPatient ? OLD_PATIENT_DELAY : NEW_PATIENT_DELAY);
        } else if (get(newProps, 'initialize.ok', false) && !userInfo) {
            this.props.getUserInfo();
        }

        if (userInfo) {
            this.props.userLogin({}, '/');
        }
    }

    render() {
        return (
            <h1>Loading...</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.custom.userInfo.data,
        initialize: state.custom.initialize.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initializeUser() {
            dispatch(initializeAction.request());
        },
        getUserInfo() {
            dispatch(userInfoAction.request());
        },
        userLogin(params, url) {
            dispatch(userLogin(params, url));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitializePage);
