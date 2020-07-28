import { darkTheme } from "./theme";
import {message} from "antd";

function State() {
    this.state = [];
    this.state['theme'] = darkTheme;
    this.state['login'] = 0;
    this.state['userid'] = null;
    this.state['username'] = "Linton";
    this.Islogin=()=>{
        return this.state['login']
    }
    this.logout=()=>{
        this.state['login']=0;
    }
    this.login=()=>{
        this.state['login']=1;
    }
    this.getName=()=>{
        return this.state['username']
    }
    this.setName=(name)=>{
        this.state['username'] = name;
    }
    this.set = (key, value) => {
        this.state[key] = value;
        console.log(key,this.state[key])
    };

    this.get = (key) => {
        return this.state[key];
    }
}

export const Global = new State();