import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import SearchBrief from "../components/SearchBrief";
import StudySourceBrief from "../components/StudySourceBrief";
import Skeleton from "@material-ui/lab/Skeleton";
import {postRequest_v2} from "../utils/Ajax";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import AbstractCard from "../components/AbstractCard";
import { ThemeProvider } from "@material-ui/core/styles";
import { Box, fade } from "@material-ui/core";
import { Global } from "../utils/Global";
import { history } from '../utils/history';
import Gragh from "../components/Gragh";
import Gragh2 from "../components/Gragh2";
import ToggleButton from "@material-ui/lab/ToggleButton";
import {darkTheme, lightTheme} from "../utils/theme";
import Brightness5SharpIcon from "@material-ui/icons/Brightness5Sharp";
import NightsStaySharpIcon from "@material-ui/icons/NightsStaySharp";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

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
    "text":"上海是一座城市",
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
            context: context_template,
            relatedtags: relatedtags_template,
            gragh:0, //Gragh
            searchText: this.props.match.params.keyword
        };
    }

    componentDidMount() {
        //this.postRequest(this.props.match.params.keyword);
    }

    /** 向后端口请求搜索结果数据 **/
    postRequest(keyword) {
        const callback = (json) => {
            console.log(json);
            let map = new Map();
            json.tagLinks.forEach((ite) => {
                if (!map.has(ite.url + ite.title)) {
                    let tmp = {
                        title: '',
                        url: '',
                        tagIdx: [],
                        desIdx: []
                    };
                    tmp.title = ite.title;
                    tmp.url = ite.url;
                    tmp.tagIdx = ite.idx;
                    map.set(ite.url + ite.title, tmp);
                } else {
                    let tmp = map.get(ite.url + ite.title);
                    tmp.tagIdx = tmp.tagIdx.concat(ite.idx);
                    map.set(ite.url + ite.title, tmp);
                }
            });
            json.desLinks.forEach((ite) => {
                if (!map.has(ite.url + ite.title)) {
                    let tmp = {
                        title: '',
                        url: '',
                        tagIdx: [],
                        desIdx: []
                    };
                    tmp.title = ite.title;
                    tmp.url = ite.url;
                    tmp.desIdx = ite.idx;
                    map.set(ite.url + ite.title, tmp);
                } else {
                    let tmp = map.get(ite.url + ite.title);
                    tmp.desIdx = tmp.desIdx.concat(ite.idx);
                    map.set(ite.url + ite.title, tmp);
                }
            });

            let mapToArray = [];
            map.forEach((ite) => {
                let tmp = ite;
                let deDup = new Set(ite.tagIdx);
                tmp.tagIdx = Array.from(deDup);
                deDup = new Set(ite.desIdx);
                tmp.desIdx = Array.from(deDup);

                mapToArray.push(tmp);
            });
            this.setState({
                data: json,
                studySourceRelations: mapToArray,
                dataReady: true
            });
        };

        let data = {"keyword": keyword};

        postRequest_v2('http://121.199.61.129:7777', data, callback);
    }

    render() {
        let { classes } = this.props;
        return (
            <ThemeProvider theme={ Global.get('theme') }>
                <Container>
                    <SearchBarWrapper>
                        <Grid container>
                            <Grid item xs={2}>
                                <Box className={ classes.titleWrapper }>
                                    <Title variant="h5" onClick={() => { this.props.history.push('/index')} }>&nbsp;Pedia</Title>
                                    <Title variant="h5" onClick={() => { this.props.history.push('/index')} }>Search</Title>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <SearchInput
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
                                            this.postRequest(this.state.searchText);
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <ToggleButtonGroup style={{ position: 'absolute', right: '5%', top: '3%' }}>
                            <ToggleButton
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
                    <Grid container>
                        <Grid item xs={1} />
                        <Grid item xs={5}>
                            <AreaWrapper>
                                {this.state.gragh?<Gragh2 data={this.state.relatedtags} history={this.props.history}/>
                                :<Gragh data={this.state.context} history={this.props.history}/>}
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

export default withStyles(useStyles)(ResultView);