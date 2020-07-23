import { darkTheme } from "./theme";

function State() {
    this.state = [];
    this.state['theme'] = darkTheme;
    this.state['login'] = 1;
    this.state['userid'] = null;
    this.state['username'] = "Linton";
    this.Islogin=()=>{
        return this.state['login']
    }
    this.getName=()=>{
        return this.state['username']
    }
    this.set = (key, value) => {
        this.state[key] = value;
    };

    this.get = (key) => {
        return this.state[key];
    }
}

export const Global = new State();