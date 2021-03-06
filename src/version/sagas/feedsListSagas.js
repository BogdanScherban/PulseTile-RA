import { takeEvery, put } from 'redux-saga/effects';

import { tokenFor8000 } from "../../core/token";
import { FEEDS_LIST_ACTION, feedsListAction } from "../actions/feedsListAction";

export default takeEvery(FEEDS_LIST_ACTION.REQUEST, function*(action) {
    const domainName = "http://dev.ripple.foundation:8000";
    const apiPatientsUser = 'api/feeds';
    const url = domainName + '/' + apiPatientsUser;
    let options = {};
    options.method = "GET";
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers = {
        Authorization: "Bearer " + tokenFor8000,
    };
    try {
        const result = yield fetch(url, options).then(res => res.json());
        yield put(feedsListAction.success(result))
    } catch(e) {
        yield put(feedsListAction.error(e))
    }
});
