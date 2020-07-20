import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

/** 组件容器（背景），基于Paper组件 **/
const PropCardWrapper = withStyles((theme) => ({
    root: {
        height: '45px',
        lineHeight: '45px',
        background: theme.status.propCard,
        margin: '7px 7px'
    }
}))(Paper);

/** 属性名的包裹容器 **/
const KeyTextWrapper = withStyles((theme) => ({
    root: {
        float: 'left',
        display: 'block',
        verticalAlign: 'middle',
        margin: '0 5%',
        maxWidth: '20%'
    }
}))(Box);

/** 属性名文本 **/
const KeyText = withStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        whiteSpace:'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth:'100%',
        display:'inline-block',
        fontSize: 14
    }
}))(Box);

/** 属性值的包裹容器，绿色的小叶片，使用float居右，内部使用flex使得文字居中 **/
const ValueTextWrapper = withStyles((theme) => ({
    root: {
        height: '25px',
        float: 'right',
        margin: '10px 10px',
        background: '#90ee90ee',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderBottomRightRadius: '14px',
        borderTopLeftRadius: '14px',
        maxWidth: '60%'
    }
}))(Box);

/** 属性值文本 **/
const ValueText = withStyles((theme) => ({
    root: {
        color: 'black',
        margin: '2px 7px 0 7px'
    }
}))(Typography);

/** 摘要卡片里属性栏的小组件
 ** 布局：属性名（左），属性值（右），比例大致为1:3
 ** 特性：过长输入会用省略号截断
 **/
class PropCard extends React.Component {
    render() {
        let data = this.props.data;
        return (
            <Grid item xs={6}>
                <PropCardWrapper>
                    <KeyTextWrapper>
                        <KeyText component="span">{ data.key }</KeyText>
                    </KeyTextWrapper>
                    <ValueTextWrapper>
                        <ValueText variant="caption" noWrap>{ data.value }</ValueText>
                    </ValueTextWrapper>
                </PropCardWrapper>
            </Grid>
        )
    }
}

export default PropCard;