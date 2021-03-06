import { takeEvery, put } from 'redux-saga/effects';

import { token, domainName } from "../token";
import { USER_INFO_ACTION, userInfoAction } from "../actions/userInfoAction";

export default takeEvery(USER_INFO_ACTION.REQUEST, function*(action) {
    const apiPatientsUser = 'api/user';
    const url = domainName + '/' + apiPatientsUser;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + token,
        'X-Requested-With': "XMLHttpRequest",
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(userInfoAction.success(result))
    } catch(e) {
        yield put(userInfoAction.error(e))
    }
});
