import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Skeleton from '@material-ui/lab/Skeleton';
import LinkCard from "./LinkCard";
import DescriptionLine from "./DescriptionLine";
import PropCard from "./PropCard";

/** 组件容器（背景），基于Paper组件 **/
const CardWrapper = withStyles((theme) =>({
    root: {
        background: theme.background.paper
    }
}))(Paper);

/** 组件标题 **/
const CardTitle = withStyles((theme) => ({
    root: {
        color: theme.palette.text.secondary,
        marginLeft: '20px'
    }
}))(Typography);

/** 属性栏等栏目的包裹容器 **/
const CardItemWrapper = withStyles((theme) =>({
    root: {
        background: theme.background.paper,
        borderBottom: '2px dotted black'
    }
}))(Box);

/** 折叠面板展开后的包裹容器 **/
const AccordionWrapper = withStyles((theme) =>({
    root: {
        background: theme.background.paper
    }
}))(Accordion);

const useStyles = {
    /** 标题栏包裹容器 **/
    header: {
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    headerTitle: {

    },
    properties: {

    },
    /** 属性栏标题 **/
    propTitle: {
        marginTop: '10px'
    },
    tags: {

    },
    /** 标签栏标题 **/
    tagsTitle: {
        marginTop: '10px'
    },
    /** 标签栏所有纸片的包裹容器 **/
    tagChipsWrapper: {
        lineHeight: '40px',
        paddingBottom: '10px'
    },
    /** 标签栏纸片，背景淡绿 **/
    tagChip: {
        backgroundColor: '#90ee90cc'
    },
    /** 标签栏单个纸片的包裹容器 **/
    tagChipCellWrapper: {
        display: 'inline',
        margin: '10px 0 0 20px'
    },
    /** 去除箭头按钮周围的阴影 **/
    accordion: {
        boxShadow: 'none',
    },
    /** 折叠箭头 **/
    accordionSummary: {
        border: 0,
        '& .MuiAccordionSummary-expandIcon': {
            alignSelf: 'center'
        },
        '& .MuiAccordionSummary-content': {
            flexGrow: '0'
        }
    },
    /** 折叠面板展开后的包裹容器 **/
    accordionDetail: {
        display: 'block'
    },
    /** 描述栏包裹容器 **/
    description: {
        borderBottom: 'none'
    },
    /** 描述栏标题 **/
    descriptionTitle: {
        marginTop: '10px'
    },
    /** 描述栏所有小组件的包裹容器 **/
    descriptionLinesWrapper: {
        lineHeight: '0px',
        marginBottom: '10px'
    },
    /** 描述栏小组件的包裹容器 **/
    descriptionLineCellWrapper: {
        display: 'inline-flex',
        margin: '5px 0 0 10px'
    }
};

/** 摘要卡片
 ** 布局：从上到下：标题、属性、标签、描述
 **/
class AbstractCard extends React.Component {
    render() {
        let { classes } = this.props;
        let data = this.props.data;
        let ready = this.props.dataReady;
        let tagSkeletonIte = [];
        let abstractCardWidth = document.body.offsetWidth * 5 / 12;
        let descriptionLineWidth = (abstractCardWidth - 4 * 10) / 3;
        for (let i = 0; i < Math.floor(abstractCardWidth / (18 + 40)); ++i) {
            tagSkeletonIte.push(i);
        }
        return (
            <CardWrapper elevation={ 10 }>
                <CardItemWrapper className={ classes.header }>
                    {
                        ready ?
                            <CardTitle className={ classes.headerTitle } variant="h5">{ data.title }</CardTitle>
                            :
                            null
                    }
                </CardItemWrapper>
                <CardItemWrapper className={ classes.properties }>
                    <CardTitle className={ classes.propTitle } variant="h6">属性</CardTitle>
                    <Grid container>
                        {
                            ready ?
                                data.props.map((ite, index) =>
                                    <PropCard key={ 'propCardWrapper-' + index } data={ ite }/>
                                )
                                :
                                [0, 1].map((ite) =>
                                    <Grid item xs={ 6 } key={ 'propsSkeleton-' + ite }>
                                        <Skeleton height={ '70px' } style={{ margin: '7px 7px' }}/>
                                    </Grid>
                                )
                        }
                    </Grid>
                </CardItemWrapper>
                <CardItemWrapper className={ classes.tags }>
                    <CardTitle className={ classes.tagsTitle } variant="h6">标签</CardTitle>
                    <Box className={ classes.tagChipsWrapper } id="tagChips-wrapper" >
                        {
                            ready ?
                                data.tags.map((ite, index) => (
                                    <Box key={ 'tagChipWrapper-' + index } className={ classes.tagChipCellWrapper }>
                                        <Chip
                                            variant="outlined"
                                            label={ite}
                                            className={ classes.tagChip }
                                            component="a"
                                            href={ite}
                                            id={'tagChip-' + index}
                                            clickable
                                        />
                                    </Box>
                                ))
                                :
                                tagSkeletonIte.map((ite) =>
                                    <Skeleton key={ 'tagChipSkeleton-' + ite } variant="circle" width={40} height={40} style={{ margin: '10px 0 0 18px', display: 'inline-block' }} />
                                )
                        }
                    </Box>
                    <AccordionWrapper className={ classes.accordion }>
                        <AccordionSummary className={ classes.accordionSummary } expandIcon={<ExpandMoreIcon />} />
                        <AccordionDetails className={ classes.accordionDetail }>
                            {
                                data.tagLinks.map((ite, index) =>
                                    <LinkCard
                                        key={ 'tagChipLinkCard-' + index }
                                        data={ ite }
                                        color={ ['#90ee90cc', '#ff0000bb'] }
                                        callback={(idx, color) => {
                                            document.getElementById('tagChip-' + idx).style.backgroundColor = color
                                        }}
                                    />
                                )
                            }
                        </AccordionDetails>
                    </AccordionWrapper>
                </CardItemWrapper>
                <CardItemWrapper className={ classes.description }>
                    <CardTitle className={ classes.descriptionTitle } variant="h6">描述</CardTitle>
                    <Box className={ classes.descriptionLinesWrapper }>
                        {
                            ready ?
                                data.des.map((ite, index) =>
                                    <Box key={ 'desLineWrapper-' + index } className={ classes.descriptionLineCellWrapper }>
                                        <DescriptionLine data={ite} idx={'desLine-' + index}/>
                                    </Box>
                                )
                                :
                                [0 ,1, 2].map((ite) =>
                                    <Skeleton key={ 'DesLineSkeleton-' + ite } variant="text" width={ descriptionLineWidth } height={ 20 } style={{ display: 'inline-flex', margin: '5px 0 0 10px' }} />
                                )
                        }
                    </Box>
                    <AccordionWrapper className={ classes.accordion }>
                        <AccordionSummary className={ classes.accordionSummary } expandIcon={<ExpandMoreIcon />} />
                        <AccordionDetails className={ classes.accordionDetail }>
                            {
                                data.desLinks.map((ite, index) =>
                                    <LinkCard
                                        key={ 'desLinkCard-' + index }
                                        data={ ite }
                                        color={ ['#90ee90', '#ff0000'] }
                                        callback={(idx, color) => {
                                            document.getElementById('desLine-' + idx).style.borderBottom = '2px solid ' + color
                                        }}
                                    />
                                )
                            }
                        </AccordionDetails>
                    </AccordionWrapper>
                </CardItemWrapper>
            </CardWrapper>
        );
    }
}

export default withStyles(useStyles)(AbstractCard);