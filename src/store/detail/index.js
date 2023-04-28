import{reqGetGoodsInfo,reqAddOrUpdateShopCart} from"@/api/index"
import{getUUID} from "@/utils/uuid_token"
const state = {
    goodInfo:{},
    uuid_token:getUUID()
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
};
const actions = {
   async getGoodInfo({commit},skuId){
        const result=await reqGetGoodsInfo(skuId)
        if(result.code=200){
            commit('GETGOODINFO',result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        const result=await reqAddOrUpdateShopCart(skuId, skuNum)
        if(result.code==200){
            return "ok"
        }
        else {
            return Promise.reject(new Error('faile'))
        }
    }

};
const getters = {
    //这里直接返回 state.goodInfo.categoryView 会报错  因为一开始goodInfo 是空对象 没有categoryview 这个属性
    //但是数据回来又可以成功展示 所以会报错但不会影响展示
    //至少返回一个空对象 因为可以 对象. （至少不会报错） 但是不可以 undefined. 
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
