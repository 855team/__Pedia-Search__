import {postRequest_v3,postRequest_v2} from "../utils/Ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import {Global} from "../utils/Global";
import cookie from 'react-cookies'



export const login = (data,his) => {
    const url = `http://49.235.245.206:8080/login`;
    message.config({
        prefixCls: 'my-message',
        className: 'my-message'
    });
    console.log("data:",data);
    const callback = (data) => {
        console.log("login",data)
        if(data.code == 401) {
            alert(data.message);
        }
        if(data.code == 200){
            Global.set('login',1);
            Global.setName(data.data.name);
            message.success(data.message);
            his.push("/index");
        }
    };
    postRequest_v3(url, data, callback);
};

export const register = (data,his) => {
    const url = `http://49.235.245.206:8080/user/register`;
    console.log("data:",data);
    message.config({
        prefixCls: 'my-message',
        className: 'my-message'
    });
    const callback = (data) => {
        console.log("register",data)
        if(data== 0) {
            message.error("注册失败");
        }
        if(data!=0) {
            his.push("/index");
            message.success("注册成功");
        }
    };
    postRequest_v2(url, data, callback);
};


export const logout = (his) => {
    const url = `http://49.235.245.206:8080/logout`;
    message.config({
        prefixCls: 'my-message',
        className: 'my-message'
    });
    const callback = (data) => {
        if(data.code == 200) {
            //cookie.remove('JSESSIONID');
            Global.logout();
            Global.setName("");
            message.success(data.message);
            his.push("/index")
        }
        else{
            message.error(data.message);
        }
    };
    postRequest_v3(url, {}, callback);
};

export const saverecord = (data) => {
    const url = `http://49.235.245.206:8080/user/saverecord`;
    const callback = (data) => {
        console.log(data);
        if(data==null) {
            ;
        }
        else{
            if(data.code==403){
                message.error(data.message);
            }
        }
    };
    postRequest_v3(url, data, callback);
};

export const queryrecord = (callback) => {
    const url = `http://49.235.245.206:8080/user/queryrecord`;
    postRequest_v3(url, {}, callback);
};

export const checklogin = (callback) => {
    const url = `http://49.235.245.206:8080/user/checklogin`;
    postRequest_v3(url, {}, callback);
};


