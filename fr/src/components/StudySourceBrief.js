import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import CardContent from "@material-ui/core/CardContent";

/** 组件容器（背景），基于Card组件 **/
const Container = withStyles((theme) => ({
    root: {
        background: theme.status.searchBrief,
        width: '100%'
    }
}))(Card);

/** 包裹文本的容器，重载了margin **/
const TextWrapper = withStyles((theme) => ({
    root: {
        '&:last-child': {
            paddingBottom: '10px'
        },
        padding: '10px 0 0px 10px'
    }
}))(CardContent);

/** 文本，修改颜色为主题色 **/
const Text = withStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary
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
    }
};

class StudySourceBrief extends React.Component {
    /** 鼠标悬浮，标签/描述 变色 **/
    handleMouseOver() {
        let props = this.props;
        this.props.callback(props.data.tagIdx, props.data.desIdx, props.tagColor[1], props.desColor[1]);
    }

    /** 鼠标移走，标签/描述 颜色恢复 **/
    handleMouseLeave() {
        let props = this.props;
        this.props.callback(props.data.tagIdx, props.data.desIdx, props.tagColor[0], props.desColor[0]);
    }

    render() {
        let data = this.props.data;
        let { classes } = this.props;
        if (data == null) return null;
        return (
            <Container
                onMouseEnter={ this.handleMouseOver.bind(this) }
                onMouseLeave={ this.handleMouseLeave.bind(this) }
            >
                <TextWrapper>
                    <Text className={ classes.title } variant="subtitle2" component="a" href={ data.url } display="block" noWrap>{ data.title }</Text>
                    <Text className={ classes.link } variant="caption" component="a" href={ data.url } display="block" noWrap>{ data.url }</Text>
                </TextWrapper>
            </Container>
        )
    }
}

export default withStyles(useStyles)(StudySourceBrief);