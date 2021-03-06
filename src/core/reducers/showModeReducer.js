import { get } from "lodash";

import { SHOW_MODE_ACTION } from "../actions/showModeAction";

const initialState = {
    data: null,
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODE_ACTION.REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SHOW_MODE_ACTION.SUCCESS:
            return {
                ...state,
                loading: false,
                data: get(action, "data", null),
            };
        case SHOW_MODE_ACTION.FAILURE:
            return {
                ...state,
                loading: false,
                error: get(action, "error", null),
            };
        default:
            return state;
    }
}