import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import InputBase from "@material-ui/core/InputBase";
import SearchBrief from "../components/SearchBrief";
import StudySourceBrief from "../components/StudySourceBrief";
import Skeleton from "@material-ui/lab/Skeleton";
import ajaxRequest from "../utils/Ajax";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import AbstractCard from "../components/AbstractCard";
import { ThemeProvider } from "@material-ui/core/styles";
import { Box, fade } from "@material-ui/core";
import { Global } from "../utils/Global";

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
        background: theme.status.resultTop,
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
        borderRadius: 30,
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
const dataTemplate = {
    title: '',
    tags: [],
    des: [],
    tagLinks: [],
    desLinks: [],
    props: [],
    urls: []
};

/** 搜索结果
 ** 布局：摘要（右）、搜索引擎结果（下）、学习来源（右）
 **/
class ResultView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: dataTemplate,
            studySourceRelations: [],
            dataReady: false,
            searchText: this.props.match.params.keyword
        };

        this.postRequest = this.postRequest.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.postRequest(this.props.match.params.keyword);
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

        let data = new FormData();
        data.append('keyword', keyword);

        ajaxRequest('/api/handle', data, callback, 'POST');
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
                    </SearchBarWrapper>
                    <Grid container>
                        <Grid item xs={2} />
                        <Grid item xs={5}>
                            <AreaWrapper>
                                <AbstractCard data={ this.state.data } dataReady={ this.state.dataReady } />
                            </AreaWrapper>
                            <AreaWrapper>
                                {
                                    this.state.dataReady ?
                                        this.state.data.urls.map((ite, index) =>
                                            <SearchBriefWrapper key={ 'SearchBriefWrapper-' + index }>
                                                <SearchBrief data={ ite }/>
                                            </SearchBriefWrapper>
                                        )
                                        : [0, 1].map((ite) => (
                                            <SearchBriefWrapper key={ 'SearchBriefWrapper-' + ite }>
                                                <Skeleton variant="rect" width={ '100%' } height={ '117px' } style={{ borderRadius: '7px' }} />
                                            </SearchBriefWrapper>
                                        ))
                                }
                            </AreaWrapper>
                        </Grid>
                        <Grid item xs={1} />
                        <Grid item xs={3} >
                            <AreaWrapper>
                                <StudySourceBriefTitle variant="subtitle1">主要学习来源</StudySourceBriefTitle>
                                {
                                    this.state.dataReady ?
                                        this.state.studySourceRelations.map((ite, index) => (
                                            <StudySourceBriefWrapper key={ 'StudySourceBriefWrapper-' + index }>
                                                <StudySourceBrief
                                                    data={ ite }
                                                    tagColor={['#90ee90cc', '#ff0000bb']}
                                                    desColor={['#90ee90', '#ff0000']}
                                                    callback={(tagIdx, desIdx, tagColor, desColor) => {
                                                        tagIdx.forEach((ite) => {
                                                            document.getElementById('tagChip-' + ite).style.backgroundColor = tagColor
                                                        });
                                                        desIdx.forEach((ite) => {
                                                            document.getElementById('desLine-' + ite).style.borderBottom = '2px solid ' + desColor;
                                                        });
                                                    }}
                                                />
                                            </StudySourceBriefWrapper>
                                        )) : [0, 1, 2, 3, 4, 5, 6, 7].map((ite) =>
                                            <StudySourceBriefWrapper key={ 'StudySourceBriefWrapper-' + ite }>
                                                <Skeleton variant="rect" width={'100%'} height={'60px'}
                                                          style={{ borderRadius: '7px' }}/>
                                            </StudySourceBriefWrapper>
                                        )
                                }
                            </AreaWrapper>
                        </Grid>
                    </Grid>
                    <Box style={{ height: '7vh' }} />
                </Container>
            </ThemeProvider>
        )
    }
}

export default withStyles(useStyles)(ResultView);