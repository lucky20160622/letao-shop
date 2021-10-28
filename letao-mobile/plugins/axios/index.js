//流程：   在请求拦截中读取store上的token并且设置请求头，在响应拦截中，遇到错误，弹框提示用户，在错误拦截中进行页面跳转，或者提示用户

//1.引入http状态码
import { httpcode } from "./httpcode";
//2.引入vant中的toast提示框组件
import { Toast } from "vant";

//3.请求和响应拦截
export default function ({ $axios,store , redirect }, inject) {
  //4.1请求拦截
  $axios.onRequest(config => {
    // console.log(store.state);
    // 在请求头中要设置 token 
    // 已登录,   
    if (store.state.token) {
        // 后端有开启JWT校验, 前端调用接口 需要设置token
        $axios.setHeader('Authorization', `Bearer ${store.state.token}`);
    }
    return config;
})


  //5.响应拦截器
  $axios.onResponse(response => {
    //5.1让请求返回的数据等于response.data
    const { status, msg } = response.data
    //5.2如果返回数据报错,不等于200的话，则使用Toast弹框提示用户错误
    if (status !== 200) {
      Toast(msg)
    }
  })

  //6.错误拦截
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    //6.2弹框提示
    Toast(httpcode[code])
    //6.3如果http状态码返回404，则重定向到404页面
    if (code === 404) {
      redirect('/404')
      //6.4如果http状态码返回401，则重定向到登录页面
    } else if (code === 401) {
      redirect('/my/login')
    }
  })

  // 封装请求方法
  let requestMethod = {};
  ['$get', '$post', '$delete', '$put'].forEach(method => {
    // 请求方法
    requestMethod[method] = (url, data) => {
      return $axios[method](url, data);
    }

  });

  inject('request', requestMethod);
}

//1.请求方法封装
// export default function ({ $axios, redirect, store }, inject) {
//   //2.创建一个空对象，把所有的请求方法，存到数组里面，遍历，区分参数 params 还是data
//   let requestMethods = {}
//   //2.遍历四个请求方法
//   ['$get', '$post', '$delete', '$put'].forEach(method => {
//     //三元表达式判断这个请求是get还是delete，根据请求的不同返回不同的数据
//     requestMethods[method] = function (url, data) {
//       return $axios[method](
//         url,
//         data
//       )
//     }
//   })
//   inject('request',requestMethods)
// }