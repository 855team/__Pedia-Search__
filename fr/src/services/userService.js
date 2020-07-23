import {postRequest} from "../utils/Ajax";
import {history} from '../utils/history';
import {message} from 'antd';



export const login = (data) => {
    const url = `login`;
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
    const url = `register`;
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
    const url = `logout`;

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
    const url = `checkSession`;
    postRequest(url, {}, callback);
};

