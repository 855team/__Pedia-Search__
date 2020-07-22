import { createMuiTheme } from "@material-ui/core";
import { lightBlue, yellow } from "@material-ui/core/colors";
import grey from "@material-ui/core/colors/grey";

/** （默认）主题：暗 **/
export const darkTheme = createMuiTheme({
    background: {
        default: 'linear-gradient(135deg, #000000e0, grey)',
        paper: grey[800]
    },
    status: {
        indexCenterWrapper: '#00000000',
        linkCard: grey[500],
        propCard: grey[600],
        searchBrief: grey[700],
        resultTop: 'black'
    },
    palette: {
        primary: lightBlue,
        secondary: yellow,
        text: {
            secondary: '#ffffff'
        }
    }
});

/** （默认）主题：亮 **/
export const lightTheme = createMuiTheme({
    background: {
        default: 'white',
        paper: 'white'
    },
    status: {
        indexCenterWrapper: '#e3e3e3',
        linkCard: 'white',
        propCard: 'white',
        searchBrief: 'white',
        resultTop: 'white'
    },
    palette: {
        primary: lightBlue,
        secondary: yellow,
        text: {
            secondary: '#000000'
        }
    }
});