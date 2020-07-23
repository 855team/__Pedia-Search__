import config from 'config';
import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';

export const power = (data) => {
    const url = `${config.apiUrl}/power`;
    console.log(data);
    const callback = (data) => {
        if(data.status >= 0) {
            message.success("禁用成功");
        }
        else{
            message.error("禁用失败");
        }
    };
    postRequest(url, data, callback);
};

export const unpower = (data) => {
    const url = `${config.apiUrl}/unpower`;
    const callback = (data) => {
        if(data.status >= 0) {
            message.success("解禁成功");
        }
        else{
            message.error("解禁失败");
        }
    };
    postRequest(url, data, callback);
};

export const login = (data) => {
    const url = `${config.apiUrl}/login`;
    console.log("data:",data);
    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data.userId));
            console.log("login",data);
            if(data.data.privilege==1){
                message.error("该账户已被禁用");
            }
            if(data.data.userType==1){
                history.push("/manageView");
                message.success(data.msg);
            }
            if(data.data.userType==0&&data.data.privilege==0){
                history.push("/");
                message.success(data.msg);
            }
            
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const register = (data) => {
    const url = `${config.apiUrl}/register`;
    console.log("data:",data);
    const callback = (data) => {
        if(data.status >= 0) {
            history.push("/login");
            message.success("注册成功");
        }
        else{
            message.error("注册失败");
        }
    };
    postRequest(url, data, callback);
};


export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if(data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

