import React,{Component} from 'react';
import * as d3 from "d3";


class Demo2 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.oneMethod()
    }

    oneMethod() {   //定义一个方法
        var width = 400;    //定义svg的宽度
        var height = 400;   //定义svg的高度
        var svg = d3.select("#drawSVG") //选择容器
            .append('svg')  //将svg放入容器里面
            .attr("width", width)   //设置svg的宽度
            .attr("height", height) //设置svg的高度
            .style("background-color", "red")    //设置svg的背景颜色
            .style("border-radius", "50%")   //设置svg的圆角


        svg.append("circle")    //在<svg>中添加<circle>标签
            .attr("cx", "200px")    //设置圆形的x坐标
            .attr("cy", "200px")    //设置圆形的y坐标
            .attr("r", "100px")     //设置圆形的半径
            .attr("fill", "yellow")     //设置圆形的填充色
    }





    render() {
        return (
            <div id="drawSVG" ></div>
        );
    }
}

export default Demo2;














































