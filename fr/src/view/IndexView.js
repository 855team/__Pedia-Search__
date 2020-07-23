import React from "react";

import InputBase from '@material-ui/core/InputBase';
import withStyles from "@material-ui/core/styles/withStyles";
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ToggleButton from '@material-ui/lab/ToggleButton';
import Brightness5SharpIcon from "@material-ui/icons/Brightness5Sharp";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ThemeProvider } from "@material-ui/core/styles";
import { fade, Paper } from "@material-ui/core";
import { darkTheme, lightTheme } from '../utils/theme';
import { history } from '../utils/history';
import { Global } from "../utils/Global";
import { Menu, Dropdown } from 'antd';

/* 样式与theme相关的需要用 withStyles(theme => ({}))(xxx) 定义带样式的组件 */
/** 搜索框，基于InputBase组件 **/
const SearchInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        }
    },
    input: {
        borderRadius: 30,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '5px solid #ced4da',
        fontSize: 32,
        width: '50vw',
        height: '8vh',
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.4rem`,
            borderColor: theme.palette.secondary.main,
        },
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.4)} 0 0 0 0.6rem`,
            borderColor: theme.palette.primary.main,
        }
    },
}))(InputBase);

/** 整个页面的最大容器 **/
const Container = withStyles((theme) => ({
    root: {
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: theme.background.default,
        '& .MuiInputBase-root': {
            height: '12vh',
            alignSelf: 'center'
        }
    }
}))(Box);

/** 标题，淡入动画（动画全局共享，定义在App.css） **/
const Title = withStyles((theme) => ({
    root: {
        alignSelf: 'center',
        paddingBottom: '7vh',
        color: theme.palette.primary.main,
        fontFamily: 'Bradley Hand, fantasy',
        animationName: 'fade-in',
        animationDuration: '1s',
        animationFillMode: 'forwards',
        webkitAnimationDuration: '3s'
    }
}))(Typography);

/** 包裹着标题和搜索框的漂浮纸片 **/
const CenterWrapper = withStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: theme.status.indexCenterWrapper,
        position: 'absolute',
        alignSelf: 'center',
        top: '8vh',
        height: '75vh',
        width: '80vw'
    }
}))(Paper);

/* 样式与theme无关的使用类似css的格式搭配className属性定义样式  */
const useStyles = {
};

/** 首页（一个巨大的搜索框）
 ** 布局：标题、搜索框
 **/
class IndexView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            theme: Global.get('theme'),
            searchText: ''
        };
    }
    componentDidMount() {
        this.setState({
            theme: Global.get('theme')
        });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        我的浏览历史
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        登出
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <ThemeProvider theme={ this.state.theme }>
                <Container>
                    {Global.Islogin()?
                        <ToggleButton
                            value="right"
                            style={{ position: 'absolute', left: '2%', top: '3%' }}
                        >
                            <Dropdown overlay={menu} >
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Welcome,{Global.getName()}
                                </a>
                            </Dropdown>
                        </ToggleButton>
                        :
                        <ToggleButton
                            value="right"
                            style={{ position: 'absolute', left: '3%', top: '3%' }}
                            onClick={() => {
                                this.props.history.push("/login");
                            }}
                        >
                            <AddCircleOutlineIcon/>
                        </ToggleButton>}

                    <CenterWrapper elevation={ 20 }>
                        <Title variant="h1">Pedia Search</Title>
                        <SearchInput
                            value={ this.state.searchText }
                            onChange={(event) => {
                                this.setState({
                                    searchText: event.target.value
                                });
                            }}
                            onKeyDown={(event) => {
                                if (event.keyCode === 13) {
                                    this.props.history.push('/search/' + this.state.searchText);
                                }
                            }}
                        />
                    </CenterWrapper>
                </Container>
            </ThemeProvider>
        )
    }
}

export default withRouter(withStyles(useStyles)(IndexView));