import {postRequest_v3,postRequest_v2} from "../utils/Ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import {Global} from "../utils/Global";



export const login = (data) => {
    const url = `http://49.235.245.206:8080/login`;
    console.log("data:",data);
    const callback = (data) => {
        console.log("login",data)
        if(data.code == 401) {
            message.error(data.message);
        }
        if(data.code == 200){
            Global.set('login',1);
            Global.setName(data.data.name);
            message.success(data.message);
            history.push("/index");
            window.location.reload();
        }
    };
    postRequest_v2(url, data, callback);
};

export const register = (data) => {
    const url = `http://49.235.245.206:8080/user/register`;
    console.log("data:",data);
    const callback = (data) => {
        console.log("register",data)
        if(data== 0) {
            message.error("注册失败");
        }
        if(data!=0) {
            history.push("/index");
            alert("注册成功");
            window.location.reload();
        }
    };
    postRequest_v2(url, data, callback);
};


export const logout = () => {
    const url = `http://49.235.245.206:8080/logout`;
    const callback = (data) => {
        if(data.status == 200) {
            Global.logout();
            Global.setName("");
            message.success(data.msg);
        }
        else{
            message.error(data.msg);
        }
    };
    postRequest_v2(url, {}, callback);
};

export const saverecord = (data) => {
    const url = `http://49.235.245.206:8080/user/saverecord`;
    const callback = (data) => {
        if(data==null) {
            ;
        }
        else{
            if(data.code==403){
                message.error(data.message);
            }
        }
    };
    postRequest_v2(url, {}, callback);
};

export const queryrecord = (data,callback) => {
    const url = `http://49.235.245.206:8080/user/queryrecord`;
    postRequest_v2(url, {}, callback);
};


