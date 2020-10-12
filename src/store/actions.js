import * as types from './mutation-types.js';

export default {
    updateYgsLc({ commit }, { khny, deptObj, corpObj }) {
        commit(types.UPDATE_KHNY, khny);
        commit(types.UPDATE_DEPT, deptObj);
        commit(types.UPDATE_CORP, corpObj);
    }
};