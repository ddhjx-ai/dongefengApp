import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant';
import API from './API/loginApi.js'
import {
    Host
} from '@/config'

export const httpGet = (url, params, token) => {
    const authorization = token ? token : sessionStorage.getItem('Authorization');
    let keys = Object.keys(params);
    let str = '';
    for (let i = 0; i < keys.length; i++) {
        if (params[keys[i]] instanceof Array) {
            params[keys[i]].forEach(item => {
                str += `${keys[i]}=${item}&`
            });
        } else {
            str += `${keys[i]}=${params[keys[i]]}&`
        }
    }
    str = str.substr(0, str.length - 1)
    return axios({
        url: API[url] + '?' + str,
        method: 'get',
        headers: {
            // 'Authorization': ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBpZCI6Ind4NmYyOTgzNzQ3NmMzZjBhMiIsInBlcnNvbmlkIjoiNDAyODg4NzM1YzM5NjA0MTAxNWMzZTY5NWVlMDAwNjQiLCJyb2xlcyI6eyI0MDI4ODY4NDVlY2M3YmJiMDE1ZjFmMGIzZTljMDA3NSI6IlNUVURFTlQiLCI0MDI4ODY4NDVlY2M3YmJiMDE1ZjFmMGIzZWNkMDA3NyI6IkdVQVJESUFOIiwiNDAyODg2ODQ2MmE5OGU4NjAxNjUzY2M3MmNiNzAxNzciOiJTTUFOQUdFUiIsIjQwMjg4ODczNWMzOTYwNDEwMTVjM2U2OTVlZTIwMDY2IjoiVEVBQ0hFUiIsIjQwMjg4ODczNWMzOTYwNDEwMTVjM2U2YTk2NzYwMDhjIjoiU1RVREVOVCIsIjQwMjg4ODczNWMzOTYwNDEwMTVjM2U2YTk2ODkwMDhlIjoiR1VBUkRJQU4ifSwiYXVkIjoid3giLCJleHAiOjE1NjY1NTMyNDgsImlhdCI6MTU2NTk0ODQ0OCwiaXNzIjoid3gucGtnIiwibmJmIjoxNTY1OTQ4NDQ4LCJzdWIiOiJvMjJRSDFuRTIxbjRoazNlMDNEbjNDNTI5M3BJIn0.yWloFjSN9Jx4gxetwF4ln7bQzkA4nV6BnuUytPEm-RE',
            // 'X-ROLE': '43378d38e6d246bab5b9ec7d718ad061.TEACHER'
            'api-token': sessionStorage.getItem('Authorization'),
            // 'X-ROLE': sessionStorage.getItem('XROLE')
        },
    })
}
 
export const httpPost = (url, params, token) => {
   
    axios.defaults.baseURL =  '/cross/' 
    
    return axios({
        url:API[url],
        method: 'post',
        data: {
            ...params
        },
        headers: {
            'api-token': sessionStorage.getItem('Authorization')
        },
    })
}
 
export const httpPost1 = (url, params, token) => {
     
      axios.defaults.baseURL =  '/otherWeb/' ;
      console.log( axios.defaults.baseURL)
    // const authorization = token ? token : sessionStorage.getItem('token');
    return axios({
        url:  API[url],
        method: 'post',
        data: {
            ...params
        },
        headers: {
            
            'api-token': sessionStorage.getItem('Authorization')
        },
    })
}

    /**
     **上传接口**
     **/
const newAxios = axios.create({
    transformRequest: [(data) => {
        return data
    }]
})

export const httpImgUpoad = (params, callback = () => {}) => {
    axios.defaults.baseURL =  '/camera/' 
    return newAxios({
        url: API.fileUpload,
        // url: API[url],
        method: 'post',
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function(progressEvent) { //原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
                //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
                //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
                callback(progressEvent);
            }
        },
        data: params
    })
}

// axios 全局配置
// axios.defaults.baseURL = Host
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
const devTimeout = 10000;
const proTimeout = 30000;
axios.defaults.timeout = process.env.NODE_ENV === 'development' ? devTimeout : proTimeout;
axios.defaults.transformRequest = [(data) => {
    return JSON.stringify(data)
}]
axios.interceptors.request.use(function(config) {
  
    return config
}, function(error) {
    return Promise.reject(error)
})

function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }

axios.interceptors.response.use((response) => {
    // console.log('response.data：')
     console.log( response.data.code)
    //表示登陆失效
    // alert("我是一个警告框！");
    if(response.data.code == '060004'){
        // (function(){

        //     window.alert = function(name){
        //     var iframe = document.createElement("IFRAME");
        //     iframe.style.display="none";
        //     iframe.setAttribute("src", 'data:text/plain');
        //     document.documentElement.appendChild(iframe);
        //     window.frames[0].window.alert(name);
        //     iframe.parentNode.removeChild(iframe);
        //     }
        //     })();
            
        //这个地方我该咋办
      //  alert("您的账号登陆已过期或在其它地方登陆，请重新登陆")
        Toast.fail("您的账号登陆已过期或在其它地方登陆，请重新登陆")
        sleep(5000);
        localStorage.clear()
       
        var storage = window.sessionStorage;
        storage.setItem("Authorization", '123')
        location.href= '/'
        return 
    }
    return response.data

}, (error) => {
    Vue.prototype.$message.error('请求失败');
    if (error) throw error
})