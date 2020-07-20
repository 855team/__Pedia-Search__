import { darkTheme } from "./theme";

function State() {
    this.state = [];
    this.state['theme'] = darkTheme;
    this.set = (key, value) => {
        this.state[key] = value;
    };

    this.get = (key) => {
        return this.state[key];
    }
}

export const Global = new State();