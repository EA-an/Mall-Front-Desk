import mockRequests from "./mockAjax";
import requests from "./Ajax";
//获取三级联动数据
export const reqGetCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });
export const reqGetBannerList = () => mockRequests.get("/banner");
export const reqGetFloorList = () => mockRequests.get("/floor");
//获取搜索模块数据
export const reqGetSearchInfo = (params) =>
  requests({ url: "/list", method: "post", data: params });
//获取详情模块数据
export const reqGetGoodsInfo = (skuid) =>
  requests({ url: `/item/${skuid}`, method: "get" });
//将产品添加到购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });
//获取购物车列表
export const reqCartList = () =>
  requests({ url: "/cart/cartList/", method: "get" });
//删除购物车列表
export const reqDeleteCartById = (skuId) =>
  requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" });
//修改购物车产品选中信息
export const reqUpdateCheckedById = (skuId, IsChecked) =>
  requests({ url: `/cart/checkCart/${skuId}/${IsChecked}`, method: "get" });
//获取验证码接口
export const reqGetCode = (phone) =>
  requests({ url: `/user/passport/sendCode/${phone}`, method: "get" });
//注册接口
export const reqUserRegister = (data) =>
  requests({ url: "/user/passport/register", data, method: "post" });
//登录接口
export const reqUserLogin = (data) =>
  requests({ url: "/user/passport/login", data, method: "post" });
//获取用户信息（带着token）
export const reqGetUserInfo = () =>
  requests({ url: "/user/passport/auth/getUserInfo", method: "get" });
//退出登录
export const reqLogOut = () =>
  requests({ url: "/user/passport/logout", method: "get" });
//获取用户地址信息
export const reqAddressInfo = () =>
  requests({ url: "/user/userAddress/auth/findUserAddressList",method: "get",});
//获取商品清单
export const reqOrderInfo = () =>
  requests({ url: "/order/auth/trade", method: "get" });
//提交订单请求
export const reqSubmitOrder= (tradeNo,data) =>
requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method: "post" });
//获取支付信息
export const reqPayInfo =(orderId)=>
requests({url:`/payment/weixin/createNative/${orderId}`,method:"get"})
//查询支付订单状态
export const reqPayStatus =(orderId)=>
requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:"get"})
//获取订单列表
export const reqMyOrderList =(page,limit)=>
requests({url:`/order/auth/${page}/${limit}`,method:"get"})
