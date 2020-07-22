import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import grey from "@material-ui/core/colors/grey";

const useStyles = {
    /** 引号 **/
    quotation: {
        color: grey[500]
    },
    /** 下划线 **/
    DesTitleWrapper: {
        borderBottom: '2px solid lightgreen',
        height: '20px',
        display: 'inline-block'
    }
};

/** 标题 **/
const DesLine = withStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
    }
}))(Typography);

/** 防止文本溢出 **/
const lineFunc = (data) => {
    const visualWidth = (text, size, family) => {
        let ruler = document.getElementById('ruler');
        ruler.style.fontSize = size || 'inherit';
        ruler.style.fontFamily = family || 'inherit';
        ruler.style.fontWeight= '500';
        ruler.style.lineHeight= '1.57';
        ruler.style.letterSpacing = '0.00714em';
        ruler.textContent = text;
        return ruler.scrollWidth;
    };

    let length = data.length * document.body.clientWidth * (5 / 12) / visualWidth(data,'0.875rem', 'Roboto, Helvetica", Arial, sans-serif');
    let ret = data.substr(0, length - 4) + '...';
    const containerWidth = document.body.clientWidth * (5 / 12);

    while (visualWidth(ret, '0.875rem', 'Roboto, Helvetica", Arial, sans-serif') + 8.77 * 2 + 10 < containerWidth && ret.length - 2 <= data.length) {
        ret = data.substr(0, ret.length - 2) + '...';
    }

    while (visualWidth(ret, '0.875rem', 'Roboto, Helvetica", Arial, sans-serif') + 8.77 * 2 + 10 > containerWidth && ret.length >= 0) {
        ret = ret.substr(0, ret.length - 4) + '...';
    }

    return ret;
};

/** 显示搜索引擎结果的组件
 ** 布局：上引号（左），文本（中），下引号（右）
 **/
class DescriptionLine extends React.Component {
    render() {
        let { classes }  = this.props;
        return (
            <Box style={{ display: 'block' }}>
                <Typography variant="subtitle2" display="inline" className={ classes.quotation }>“&nbsp;</Typography>
                <Box className={ classes.DesTitleWrapper } id={ this.props.idx }>
                    <DesLine variant="subtitle2" display="inline" noWrap> { lineFunc(this.props.data) } </DesLine>
                </Box>
                <Typography variant="subtitle2" display="inline" className={ classes.quotation }>&nbsp;”</Typography>
            </Box>
        );
    }
}

export default withStyles(useStyles)(DescriptionLine);