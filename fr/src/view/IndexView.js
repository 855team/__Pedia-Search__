import React,{useState} from "react";

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
import {logout,checklogin,queryrecord} from "../services/userService";
import { Drawer, Button } from 'antd';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {postRequest_v2} from "../utils/Ajax";



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

const useStyles = null;

/** 首页（一个巨大的搜索框）
 ** 布局：标题、搜索框
 **/
class IndexView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            theme: Global.get('theme'),
            searchText: '',
            visible:false,
            historyquery:[],
            open:false,
            options:[]
        };
    }
    async componentDidMount() {
        this.setState({
            theme: Global.get('theme'),
        });
        let callback=(data)=>{
            if(data.code==403){
                Global.set('login',0);
                Global.set('username',"")
            }
            if(data.code==200){
                Global.set('login',1);
                Global.set('username',data.username)
                this.props.history.push('/index')
            }
        }
        await checklogin(callback);
        let callback2=(data)=>{
            this.setState({
                historyquery:data
            })
        }
        queryrecord(callback2);
    }
    loggout(){
        logout(this.props.history)
    }
    showhistory(){
        let box=[];
        for(let i=0;i<this.state.historyquery.length;i++){
            box.push(<Menu.Item key={i}>{this.state.historyquery[i].keyword}</Menu.Item>)
        }
        return(
            <Menu>
                {box}
            </Menu>
        )
    }

    render() {
        const showDrawer = () => {
            this.setState({
                visible:true
            })
        };
        const onClose = () => {
            this.setState({
                visible:false
            })
        };
        const handleMenuItemClick = (event, index) => {
            this.setState({
                searchText:this.state.options[index]
            })
        };
        const elasticsearch=(keyword)=>{
            const callback = (json) => {
                let lst=[]
                let allwords=json.hits.hits
                for(let i=0;i<allwords.length;i++){
                    lst.push(allwords[i]._source.title)
                }
                this.setState({
                    options:lst
                });
            };
            const _data=
            {
                "query": {
                "bool": {
                    "must": [
                        {
                            "prefix": {
                                "title.keyword": keyword
                            }
                        }
                    ]
                }
            },
                "size": 5
            }
            let postRequest = (url,data,callback) => {
                console.log(data)
                let opts={
                    method: "POST",
                    body: data,
                    headers:{
                        'Content-Type': "application/json"
                    }
                }

                fetch(url,opts)
                    .then((response)=>{
                        return response.json()
                    })
                    .then((data)=>{
                        callback(data);
                    })
                    .catch((error)=>{
                        console.log(error);
                    })
            }
            postRequest('http://49.235.245.206:9200/search/_search',JSON.stringify(_data), callback);
        }
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={showDrawer} className="showhistory">
                        我的浏览历史
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.loggout.bind(this)} className="tologout">
                        登出
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <ThemeProvider theme={ this.state.theme }>
                <Container>
                    {Global.Islogin()?
                    <Drawer
                        className="drawer"
                        title="浏览历史"
                        placement="right"
                        closable={true}
                        onClose={onClose}
                        visible={this.state.visible}
                    >
                        {this.showhistory()}
                    </Drawer>:null}
                    {Global.Islogin()?
                        <ToggleButton
                            value="right"
                            style={{ position: 'absolute', left: '2%', top: '3%' }}
                        >
                            <Dropdown  overlay={menu} className="dropdown">
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    Welcome,{Global.getName()}
                                </a>
                            </Dropdown>
                        </ToggleButton>
                        :
                        <ToggleButton
                            data-testid="notlogin"
                            value="right"
                            style={{ position: 'absolute', left: '3%', top: '3%' }}
                            onClick={() => {
                                this.props.history.push("/login");
                            }}
                        >
                            <AddCircleOutlineIcon className="tologin" data-testid="tologin"/>
                        </ToggleButton>}

                    <CenterWrapper elevation={ 20 }>
                        <Title variant="h1">Pedia Search</Title>
                        <SearchInput
                            className="searchinput"
                            data-testid="searchinput"
                            value={ this.state.searchText }
                            onChange={(event) => {
                                this.setState({
                                    searchText: event.target.value,
                                });
                                elasticsearch(event.target.value)
                                if(event.target.value){
                                    this.setState({
                                        open:true
                                    });
                                }
                                else{
                                    this.setState({
                                        open:false
                                    });
                                }
                            }}
                            onKeyDown={(event) => {
                                if (event.keyCode === 13) {
                                    this.props.history.push('/search/' + this.state.searchText);
                                }
                            }}
                        />
                        {this.state.open ? (
                            <MenuList id="split-button-menu" style={{left:180}}>
                                {this.state.options.map((option, index) => (
                                    <MenuItem
                                        key={option}
                                        onClick={(event) => handleMenuItemClick(event, index)}
                                        style={{color:"white",lineHeight:"100%"}}
                                    >
                                        {option}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        ) : null}
                    </CenterWrapper>
                </Container>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(IndexView);