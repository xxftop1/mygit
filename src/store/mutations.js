import * as types from './mutation-types.js';

export default {
    [types.UPDATE_KHNY](state, khny) {
        state.khny = khny;
    },
    [types.UPDATE_DEPT](state, deptObj) {
        state.deptId = deptObj.deptId;
        state.deptName = deptObj.deptName;
    },
    [types.UPDATE_CORP](state, corpObj) {
        state.corpId = corpObj.corpId;
        state.corpName = corpObj.corpName;
    },
    [types.UPDATE_REJECT](state, hasReject) {
        state.hasReject = hasReject;
    },
    [types.UPDATE_PROCESSSTATE](state, processState) {
        state.processState = processState;
    },
    [types.UPDATE_OVER](state, clickOver) {
        state.clickOver = clickOver;
    }
};