import React from "react";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import grey from "@material-ui/core/colors/grey";

/** 组件容器（背景），基于Card组件 **/
const Container = withStyles((theme) => ({
    root: {
        background: theme.status.searchBrief,
        width: '100%'
    }
}))(Card);

/** 文本，修改颜色为主题色 **/
const Text = withStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        margin: '2.5px 10px'
    }
}))(Typography);

const useStyles = {
    /** 标题，淡蓝色，无下划线 **/
    title: {
        color: '#3aaaff',
        textDecoration: 'none'
    },
    /** 链接，较深灰色，无下划线 **/
    link: {
        color: grey[800],
        textDecoration: 'none'
    },
    /** 描述 **/
    des: {

    }
};

/** 显示搜索引擎结果的组件
 ** 布局：标题（上），链接（中），描述（下）
 ** 特殊：描述字数上限为100
 **/
class SearchBrief extends React.Component {
    render() {
        let data = this.props.data;
        let { classes } = this.props;
        if (data == null) return null;
        return (
            <Container>
                <CardContent>
                    <Text className={ classes.title } variant="subtitle1" component="a" href={ data.url } display="block" noWrap>{ data.title }</Text>
                    <Text className={ classes.link } variant="caption" component="a" href={ data.url } display="block" noWrap>{ data.url }</Text>
                    <Text className={ classes.des } variant="body2" display="block">{ data.des.length > 100 ? data.des.substr(0, 97) + '...' : data.des }</Text>
                </CardContent>
            </Container>
        )
    }
}

export default withStyles(useStyles)(SearchBrief);