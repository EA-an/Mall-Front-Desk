import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import home from "./home"
import shopcart from "./shopcart"
import search from "./search"
import detail from "./detail"
import user from "./user"
import trade from "./trade"
export default new Vuex.Store({
    modules: {home,search,detail,shopcart,user,trade}

});