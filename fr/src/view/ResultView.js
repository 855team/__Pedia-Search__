import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import {postRequest,postRequest_v2} from "../utils/Ajax";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from "@material-ui/core/styles";
import { Box, fade } from "@material-ui/core";
import { Global } from "../utils/Global";
import Gragh from "../components/Gragh";
import Gragh2 from "../components/Gragh2";
import ToggleButton from "@material-ui/lab/ToggleButton";
import {darkTheme, lightTheme} from "../utils/theme";
import Brightness5SharpIcon from "@material-ui/icons/Brightness5Sharp";
import NightsStaySharpIcon from "@material-ui/icons/NightsStaySharp";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import {withRouter} from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import {Menu, Dropdown, Drawer} from 'antd';
import {checklogin, logout} from "../services/userService";
import {saverecord,queryrecord} from '../services/userService'

/** 整体容器（背景） **/
const Container = withStyles((theme) => ({
    root: {
        minHeight: '100vh',
        width: '100vw',
        background: theme.background.default
    }
}))(Box);

/** 搜索框的包裹容器 **/
const SearchBarWrapper = withStyles((theme) => ({
    root: {
        width: '100vw',
        height: '80px',
        // background: theme.status.resultTop,
        borderBottom: 'grey solid 1px'
    }
}))(Box);

/** 搜索框 **/
const SearchInput = withStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '15px'
    },
    input: {
        borderRadius:
            30,
        position: 'relative',
        backgroundColor: theme.palette.common.white,
        border: '5px solid #ced4da',
        fontSize: 15,
        width: '100%',
        height: '20px',
        padding: '10px 12px',
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
            boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.secondary.main,
        },
        '&:focus': {
            boxShadow: `${fade(theme.palette.primary.main, 0.4)} 0 0 0 0.3rem`,
            borderColor: theme.palette.primary.main,
        }
    },
}))(InputBase);

/** 大标题（搜索框旁边）**/
const Title = withStyles((theme) => ({
    root: {
        color: theme.palette.primary.main,
        fontFamily: 'Bradley Hand, fantasy',
        width: '90px',
        alignSelf: 'flex-end',
        textDecoration: 'none',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}))(Typography);

/** 搜索引擎结果（下）小组件的包裹容器 **/
const SearchBriefWrapper = withStyles({
    root: {
        marginTop: '20px'
    }
})(Box);

/** 学习来源（右）小组件的包裹容器 **/
const StudySourceBriefWrapper = withStyles({
    root: {
        marginTop: '15px'
    }
})(Box);

/** 学习来源标题，设置主题色 **/
const StudySourceBriefTitle = withStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary
    }
}))(Typography);

/** 应用于大布局的顶部margin **/
const AreaWrapper = withStyles({
    root: {
        marginTop: '30px'
    }
})(Box);

const useStyles = {
    /** 大标题（搜索框旁边）的包裹容器 **/
    titleWrapper: {
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }
};

/** 空数据模板 **/
const relatedtags_template = {
    title:"上海",
    linked_words:[
        {
            title:"中国",
            weight:3
        },
        {
            title:"川建国",
            weight:2
        }
    ]
};
const context_template = {
    "title":"上海",
    "text":"上海是一座城市,上海不只是一座城市。上海是一座海上的城市，这句话说的是错的。这句话说的为什么是错的，因为上海学生不认同这个观点。我怎么会说这么多废话，因为想让句子长一点",
    "linked_words":[
        {
            text: "文本4",
            page_id: "123456"
        }
    ],
    "sections":[{
        "title":"历史",
        "text":"参见balabala",
        "linked_words":[
            {
                text: "文本5",
                page_id: "123456"
            }
        ],
        "sections":[
            {
                "title":"早期历史",
                "text":"正文6",
                "linked_words":[
                    {
                        text: "文本7",
                        page_id: "123456"
                    }
                ],
                sections: []
            },
            {
                "title":"开埠初期",
                "text":"正文",
                "linked_words":[
                    {
                        text: "文本8",
                        page_id: "123456"
                    }
                ],
                "sections" :[
                    {
                        "title":"工人",
                        "text":"正文9",
                        "linked_words":[
                            {
                                text: "文本10",
                                page_id: "123456"
                            }
                        ]
                    }
                ]
            }
        ]
    },{
        "title":"地理",
        "text":"上海在海上",
        "linked_words":[
            {
                text: "文本3",
                page_id: "123456"
            }
        ],
        "sections":[
            {
                "title":"河流",
                "text":"正文1",
                "linked_words":[
                    {
                        text: "文本2",
                        page_id: "123456"
                    }
                ],
                sections: []
            },
            {
                "title":"地形",
                "text":"正文11",
                "linked_words":[
                    {
                        text: "文本12",
                        page_id: "123456"
                    }
                ],
                "sections" :[
                    {
                        "title":"山脉",
                        "text":"正文",
                        "linked_words":[
                            {
                                text: "文本13",
                                page_id: "123456"
                            }
                        ]
                    }
                ]
            }
        ]
    }
    ]
}
/** 搜索结果
 ** 布局：摘要（右）、搜索引擎结果（下）、学习来源（右）
 **/
class ResultView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            context: null,
            relatedtags: null,
            gragh:-1, //Gragh
            searchText: this.props.match.params.keyword,
            historyquery:[]
        };
    }

    async componentDidMount() {
        let callback= (data)=>{
            if(data.code==403){
                Global.set('login',0);
                Global.set('username',"")
            }
            if(data.code==200){
                Global.set('login',1);
                Global.set('username',data.username)
            }
        }
        await checklogin(callback);


        let callback2=(data)=>{
            this.setState({
                historyquery:data
            })
        }
        queryrecord(callback2);
        await this.postRequest(this.props.match.params.keyword);
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

    /** 向后端口请求搜索结果数据 **/
    postRequest(keyword) {
        const callback1 = (json) => {
            this.setState({
                context:json
            });
            this.setState({
                gragh:0
            })
        };
        const callback2 = (json) => {
            let title=json.title
            let linked_words=json.linked_words.slice(0,15)
            this.setState({
                relatedtags: {"title":title,"linked_words":linked_words}
            });
            this.setState({
                gragh:0
            })
        };
        let data = {"keyword": keyword};
        postRequest_v2('http://49.235.245.206:8080/search/wiki', data, callback1);
        postRequest_v2('http://49.235.245.206:8080/search/related', data, callback2);
        let tosave = {"keyword": keyword,last_keyword:""};
        if(Global.Islogin()){
            saverecord(tosave);
        }

    }
    loggout=()=>{
        logout(this.props.history)
    }

    render() {
        let { classes } = this.props;
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
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" className="showhistory" onClick={showDrawer}>
                        我的浏览历史
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" className="tologout" onClick={this.loggout.bind(this)}>
                        登出
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <ThemeProvider theme={ Global.get('theme') }>
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
                            <Dropdown overlay={menu} className="dropdown" >
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
                    <SearchBarWrapper>
                        <Grid container>
                            <Grid item xs={3}>
                                <Box className={ classes.titleWrapper }>
                                    <Title variant="h5" onClick={() => { this.props.history.push('/index')} }>&nbsp;Pedia</Title>
                                    <Title variant="h5" onClick={() => { this.props.history.push('/index')} }>Search</Title>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <SearchInput
                                    data-testid="searchinput"
                                    value={ this.state.searchText }
                                    onChange={(event) => {
                                        this.setState({
                                            searchText: event.target.value
                                        });
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.keyCode === 13) {
                                            this.setState({
                                                dataReady: false
                                            });
                                            this.props.history.push('/search/' + this.state.searchText);
                                            window.location.reload();
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <ToggleButtonGroup style={{ position: 'absolute', right: '5%', top: '3%' }}>
                            <ToggleButton
                                data-testid="gragh1"
                                value="left"
                                onClick={() => {
                                    this.setState({
                                        gragh:0
                                    })
                                }}
                            >
                                <Brightness5SharpIcon />
                            </ToggleButton>
                            <ToggleButton
                                data-testid="gragh2"
                                value="right"
                                onClick={() => {
                                    this.setState({
                                        gragh:1
                                    })
                                }}
                            >
                                <NightsStaySharpIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </SearchBarWrapper>
                    <Grid container data-testid="gragh1-container">
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                            <AreaWrapper>
                                {this.state.gragh==-1?null:(this.state.gragh==1?<Gragh2 data={this.state.relatedtags} history={this.props.history}/>
                                :<Gragh data-testid="initgragh" data={this.state.context} history={this.props.history}/>)}
                            </AreaWrapper>
                        </Grid>
                        <Grid item xs={1} />
                    </Grid>
                    <Box style={{ height: '7vh' }} />
                </Container>
            </ThemeProvider>
        )
    }
}

export default withRouter(withStyles(useStyles)(ResultView));