import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

/** 组件容器（背景），基于Card组件 **/
const LinkCardWrapper = withStyles((theme) => ({
    root: {
        background: theme.status.linkCard,
        height: '80px',
        width: '100%',
        marginBottom: '15px'
    }
}))(Card);

/** 垂直分割线 **/
const VerticalDivider = (color) => {
    const Ret = withStyles((theme) => ({
        root: {
            margin: 'auto 15px',
            border: '3px solid ' + color,
            width: '0',
            float: 'left',
            height: '80px',
        }
    }))(Box);
    return <Ret />;
};

/** 摘要卡片里属性栏和标签栏下面展开后的链接卡片
 ** 布局：垂直分割线（左），链接标题（右上），链接（右下）
 ** 特性：垂直分割线与关联的标签或描述会变色，过长输入会用省略号截断
 **/
class LinkCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            color: 'black' /* 分割线颜色 */
        }
    }

    /** 鼠标悬浮，标签/描述 变色 **/
    handleMouseOver() {
        this.setState({
            color: 'blue'
        });
        this.props.data.idx.forEach((ite) => {
            this.props.callback(ite, this.props.color[1]);
        });
    }

    /** 鼠标移走，标签/描述 颜色恢复 **/
    handleMouseLeave() {
        this.setState({
            color: 'black'
        });
        this.props.data.idx.forEach((ite) => {
            this.props.callback(ite, this.props.color[0]);
        });
    }

    render() {
        let data = this.props.data;
        return (
            <LinkCardWrapper
                onMouseEnter={ this.handleMouseOver.bind(this) }
                onMouseLeave={ this.handleMouseLeave.bind(this) }
            >
                { VerticalDivider(this.state.color) }
                <CardContent>
                    <Box>
                        <Typography variant="subtitle2" noWrap gutterBottom>{ data.title }</Typography>
                        <Typography variant="caption" display="block" noWrap gutterBottom>{ data.url }</Typography>
                    </Box>
                </CardContent>
            </LinkCardWrapper>
        );
    }
}

export default LinkCard;