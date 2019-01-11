import { takeEvery, put } from 'redux-saga/effects';
import { token } from "../token";
import { PATIENTS_STATISTIC, patientStatisticAction } from '../actions/patientsStatisticAction';

export default takeEvery(PATIENTS_STATISTIC.REQUEST, function*() {
    const domainName = "http://dev.ripple.foundation";
    const apiPatientsUser = 'api/patients';
    const url = domainName + '/' + apiPatientsUser;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(patientStatisticAction.success(result))
    } catch(e) {
        yield put(patientStatisticAction.error(e))
    }
});