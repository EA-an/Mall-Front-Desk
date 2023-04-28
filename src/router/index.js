import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
//使用插件
Vue.use(VueRouter);
//引入路由组件
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
// import Home from "@/pages/Home";
//路由懒加载home
import Detail from "@/pages/Detail";
import Search from "@/pages/Search";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import GroupOrder from "@/pages/Center/groupOrder";
import MyOrder from "@/pages/Center/myOrder";
//重写push 方法和replace方法  因为如果是编程式路由导航（声明式路由导航底层解决了） 重复跳转当前路由url不变的1话 会报错
//因为vue-router引入了promise push方法实际上是返回了一个promise 需要传递成功和失败回调才不会报错
let orginPush = VueRouter.prototype.push;
let orginReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    orginPush.call(this, location, resolve, reject);
    //这里调用call方法是为了让重写后的push方法还是以vue-router实例作为上下文
  } else {
    orginPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    orginReplace.call(this, location, resolve, reject);
  } else {
    orginReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//配置路由
//show 是 是否展示footer组件
let router = new VueRouter({
  routes: [
    {
      path: '/communication',
      component: () => import('@/pages/Communication/Communication'),
      children: [
        {
          path: 'event',
          component: () => import('@/pages/Communication/EventTest/EventTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'model',
          component: () => import('@/pages/Communication/ModelTest/ModelTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'sync',
          component: () => import('@/pages/Communication/SyncTest/SyncTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'attrs-listeners',
          component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'children-parent',
          component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
          meta: {
            isHideFooter: true
          },
        },
        {
          path: 'scope-slot',
          component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
          meta: {
            isHideFooter: true
          },
        }
      ],
    },
    {
      path: "/home",
      component:()=>import("@/pages/Home"),
      meta: { show: true },
    },
    {
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true },
      name: "search",
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false },
    },
    {
      path: "/detail/:skuid",
      component: Detail,
      meta: { show: true },
    },
    //重定向 当项目已启动 访问/立马让其访问首页
    {
      path: "*",
      redirect: "/home",
    },
    {
      path: "/addcartsuccess",
      component: AddCartSuccess,
      name: "addcartsuccess",
      meta: { show: true },
    },
    {
      path: "/shopcart",
      component: ShopCart,
      meta: { show: true },
    },
    {
      path: "/trade",
      component: Trade,
      meta: { show: true },
      //路由独享守卫
      beforeEnter:(to,from,next)=>{
          if(from.path=="/shopcart")
            next()
          else{
            next(false)
          }
      }
    },
    {
      path: "/pay",
      component: Pay,
      meta: { show: true },
      beforeEnter:(to,from,next)=>{
        if(from.path=="/trade")
          next()
        else{
          next(false)
        }
    }
    },
    {
      path: "/paysuccess",
      component: PaySuccess,
      meta: { show: true },
    },
    {
      path: "/center",
      component: Center,
      meta: { show: true },
      children: [
        {
          path: "myorder",
          component: MyOrder,
        },
        {
          path: "grouporder",
          component: GroupOrder,
        },
        {
          path: "/center",
          redirect: "/center/myorder",
        },
      ],
    },
  ],
  scrollBehavior(to, from, savePosition) {
    return { y: 0 };
  },
});
let name = store.state.user.userInfo.name;
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  next();
  let token = store.state.user.token;
  if (token) {
    //登陆了就无法返回登录页面
    if (to.path =="/login"){ next("/") ;}
    else {
      if (name) next();
      else {
        //获取用户信息在首页展示
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token过期了，虽然能成功自动登录，但是token过期了无法通过token获取信息
          //需要清空token 重新登录
          await store.dispatch("userLogOut");
          next("/login");
        }
      }
    }
  } else {
    //未登录无法去交易相关和支付相关和个人中心
    let toPath = to.path;
    if (toPath == "/trade" || toPath == "/pay" || toPath == "/center") {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
