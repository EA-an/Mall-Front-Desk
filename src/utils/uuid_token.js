import{v4 as uuidv4} from 'uuid'
//要确保随机生成一个字符串，且每次执行不发生变化，因为游客身份需要持久存储
export const getUUID=()=>{
   let uuid_token=localStorage.getItem('UUIDTOKEN')
   //没有则生成临时身份并且存到localstorage中  java中单例模式也是这样的
   if(!uuid_token){
    uuid_token=uuidv4();
    localStorage.setItem('UUIDTOKEN',uuid_token)
   }
   return uuid_token
}