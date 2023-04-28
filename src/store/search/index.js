import { reqGetSearchInfo } from "@/api";
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
const getters = {
  goodsList(state) {
    //如果网络不好 会导致返回一个undefined v-fro遍历会导致错误 所以们要返回一个空数组 ||[] 以防万一
    return state.searchList.goodsList||[];
  },
  trademarkList(state){
    return state.searchList.trademarkList||[];
  },
  attrsList(state){
    return state.searchList.attrsList||[];

  }
};
export default {
  state,
  mutations,
  actions,
  getters,
};
