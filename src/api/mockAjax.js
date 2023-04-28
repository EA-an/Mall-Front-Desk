import axios from "axios"

//引入进度条 和进度条样式
import nprogress from "nprogress"
import "nprogress/nprogress.css"
//对axios进行二次封装 
const requests = axios.create({
    //配置基础路径 ，url中会默认带上baseURL
    baseURL: "/mock",
    //配置超时时间 如果请求超过5秒还没回应就是请求失败了
    timeout: 5000

})
//配置请求拦截器 发请求前 请求拦截器能检测到 可以在请求发出前做些事情
requests.interceptors.request.use((config) => {
    //config:配置对象 包含请求头等属性
    nprogress.start();
    return config
})
//配置响应拦截器 同理与请求拦截器 
requests.interceptors.response.use((res) => {
    //成功回调  服务器响应数据成功后 响应拦截器可以检测到
    nprogress.done();
    return res.data
}, (err) => {
    //失败回调  结束Promise链
    return Promise.reject(new Error('faile'))
})
export default requests

