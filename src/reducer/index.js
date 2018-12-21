import { combineReducers } from 'redux';
//reducer  
export const reducer=combineReducers({
   //当dispath时，相当于把state.text当作子state传入，但最后又是把总的state返回，所以取state得时候要注意
    loginState
})
//为什么不用es6的方式声明函数，因为只有使用function声明才可以声明和定义提前，不然只有声明提前，函数是无效的。
//这是函数参数默认值的写法，如果state实参是undefined,那么会把initial赋给state
function loginState(state={isLogin:false},action){
    switch(action.type){
        case 'login':
            //只有普通职员登录才有message
            return {isLogin:true,who:action.who,message:action.message};
        case 'loginOut':
            return {isLogin:false,who:"none"};
        default:
            return {isLogin:false,who:"none"};
            //return {isLogin:true,who:"manager",message:{id:2,name:"bilibili",depart:"研发部",job:"副部长",jobclass:3}};
            //return {isLogin:true,who:"staff",message:{id:2,name:"bilibili",depart:"研发部",job:"副部长",jobclass:3}};
    }
}