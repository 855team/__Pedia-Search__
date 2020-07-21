import React,{Component} from 'react';
import "../css/self.css";
import 'materialize-css';
import "../css/kg.css";
import { Toast } from 'react-materialize';
import * as d3 from 'd3';
import {history} from '../utils/history';

class Gragh2 extends Component {

    constructor(props){
        super(props);
        this.state={
            data : this.props.data,
            t1_text : this.parsenode(),
            t2_text : this.parselink()
        }
    }
    componentDidMount() {
        this.draw();
    }
    parsenode(){
        let data=this.props.data;
        let tmp=[];
        tmp.push({ name: data.title, type:"center"})
        for(let i=0;i<data.linked_words.length;i++){
            let a={ name: data.linked_words[i].title};
            tmp.push(a)
        }
        return tmp;

    }
    parselink(){
        let data=this.props.data;
        let tmp=[];
        for(let i=0;i<data.linked_words.length;i++){
            let a={ source: 0, target: i+1, rela: data.linked_words[i].weight, type: "包含关系" };
            tmp.push(a)
        }
        return tmp;
    }
    contentHook = (item)=>{
        return "<div>"+item.name+"</div>"
    }
    draw=()=> {
        try {
            let data = {}
            data.nodes = this.state.t1_text;
            data.links = this.state.t2_text;
            let config = {
                width: document.getElementById("container2").clientWidth,
                height: document.getElementById("container2").clientHeight
            }
            this.initKG(data, config, "#container2")
        } catch (err) {
            Toast('渲染存在异常', 2000)
            console.info(err)
        }
    }
    initKG = (data, config, container)=> {
        //data:nodes 至少需要一个name
        let nodeDict = data.nodes;
        let links = data.links;
        let his=this.props.history;
        console.log(data)

        let nodes = {};

        links.forEach((link)=> {
            //利用source和target名称进行连线以及节点的确认
            link.source = nodeDict[link.source]
            nodes[link.source.name] = link.source
            link.target = nodeDict[link.target]
            nodes[link.target.name] = link.target
        });

        //默认的节点配色方案

        let defaultNodeColor = [
            //粉红
            { fill: "rgb(249, 235, 249)", stroke: "rgb(162, 84, 162)", text: "rgb(162, 84, 162)" },
            { fill: "rgb(112, 202, 225)", stroke: "#23b3d7", text: "rgb(93, 76, 93)" },
            //灰色
            { fill: "#ccc", stroke: "rgb(145, 138, 138)", text: "#333" },
            { fill: "#D9C8AE", stroke: "#c0a378", text: "rgb(60, 60, 60)" },
            { fill: "rgb(178, 229, 183)", stroke: "rgb(98, 182, 105)", text: "rgb(60, 60, 60)" },
            //红
            { fill: "rgb(248, 152, 152)", stroke: "rgb(233, 115, 116)", text: "rgb(60, 60, 60)" }
        ]

        //默认的关系配色方案
        let defaultLinkColor = [
            { color: "rgb(162, 84, 162)" },
            { color: "rgb(145, 138, 138)" },
            { color: "#23b3d7" },
            { color: "#c0a378" },
            { color: "rgb(98, 182, 105)" },
            { color: "rgb(233, 115, 116)" }
        ]

        //为node分配方案
        let colorDict = [];
        //配色循环指针
        let point1 = 0;
        Object.keys(data.nodes).forEach((key)=> {
            let type = data.nodes[key].type == null ? (data.nodes[key].type = "default") : data.nodes[key].type
            if (colorDict[type] == null) {
                colorDict[type] = defaultNodeColor[point1]
                point1 = (point1 + 1) % defaultNodeColor.length
            }
        });

        //为link分配配色方案
        let colorLinkDict = [];
        //配色循环指针
        let point2 = 0;
        Object.keys(data.links).forEach((key)=> {
            let type = data.links[key].type == null ? (data.links[key].type = "default") : data.links[key].type
            if (colorLinkDict[type] == null) {
                colorLinkDict[type] = defaultLinkColor[point2]
                point2 = (point2 + 1) % defaultLinkColor.length
            }
        });

        let width = config.width? config.width:1560,
            height = config.height? config.height:800;

        let force = d3.layout.force()
            //设定节点数组
            .nodes(d3.values(nodes))
            //设定关系数组
            .links(links)
            //canvas大小
            .size([width, height])
            //连接线长度
            .linkDistance(120)
            //作用力，大于0吸引小于0排斥
            .charge(-1200)
            //指时间间隔，隔一段时间刷新一次画面
            .on("tick", tick)
            //开始转换
            .start();
        //缩放配置
        let zoom = d3.behavior.zoom()
            .scaleExtent([0, 2])
            //缩放callback
            .on("zoom", zoomed);

        //缩放回调函数
        function zoomed() {
            //svg下的g标签移动大小
            svg.selectAll("g").attr("transform",
                "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
        }

        //添加svg元素进行图形的绘制
        let svg = d3.select(container).append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom)
        ;

        //箭头
        let marker =
            //添加一个marker标签来绘制箭头
            svg.append("marker")
                .attr("id", "resolved")//箭头id，用于其他标记进行引用时的url
                .attr("markerUnits", "userSpaceOnUse")//定义标记的坐标系统，userSpaceOnUse表示按照引用的元件来决定，strokeWidth按照用户单位决定
                .attr("viewBox", "0 -5 10 10")//坐标系的区域
                .attr("refX", 40)//箭头坐标
                .attr("refY", 0)
                .attr("markerWidth", 12)//标识的大小
                .attr("markerHeight", 12)
                .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
                .attr("stroke-width", 3)//箭头宽度
                .append("path")
                .attr("d", "M0,-5L10,0L0,5")//绘制箭头，路径为一个三角形，有疑问参考svg的path http://www.runoob.com/svg/svg-path.html
                .attr('fill', '#000000');//箭头颜色

        //设置连接线
        let edges_line = svg.append("g").selectAll(".edgepath")
            .data(force.links())//连线数据
            .enter()//当数组中的个数大于元素个数时，由d3创建空元素并与数组中超出的部分进行绑定。
            //可以参考http://www.ourd3js.com/wordpress/797/ enter、exit、update的区别
            .append("path")//添加path标签
            .attr({
                'd': function (d) { return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y },//变量 d 是由D3.js提供的一个在匿名函数中的可用变量。这个变量是对当前要处理的元素的_data_属性的引用。
                'class': 'edgepath',//定义该path标签class为edgepath
                'id': function (d, i) { return 'edgepath' + i; }
            })// i也是d3.js提供的变量，表示当前处理的HTML元素在已选元素选集中的索引值
            .style("stroke", function (link) {
                //config:边框色
                return colorLinkDict[link.type].color;
            })//设置线条颜色
            .style("stroke-width", 1)//线条粗细
            .attr("marker-end", "url(#resolved)");//根据箭头标记的id号引用箭头

        //连线上的文字
        let edges_text = svg.append("g").selectAll(".edgelabel")
            .data(force.links())
            .enter()
            .append("text")//添加text标签
            .attr({
                'class': 'edgelabel',//定义该text标签class为edgelabel
                'id': function (d, i) { return 'edgepath' + i; },
                'dx': 60,//在连线上的坐标
                'dy': 0
            });

        //设置线条上的文字路径
        edges_text.append('textPath')
            .attr('xlink:href', function (d, i) { return '#edgepath' + i })
            .style("pointer-events", "none")
            .text(function (d) { return d.rela; });

        function drag() {//拖拽函数
            return force.drag()
                .on("dragstart", function (d) {
                    d3.event.sourceEvent.stopPropagation(); //取消默认事件
                    //d.fixed = true;    //拖拽开始后设定被拖拽对象为固定

                });
            //.on("drag", dragmove);
        }

        //圆圈的提示文字 根据需要到数据库中进行读取数据
        let tooltip = d3.select("body")
            .append("div")//添加div并设置成透明
            .attr("class", "tooltip")
            .style("opacity", 0.0);

        //圆圈
        //当前选中的节点
        let lastFocusNode;
        let circle = svg.append("g")
            .selectAll("circle")
            .data(force.nodes())//表示使用force.nodes数据
            .enter().append("circle")
            //config:背景色
            .style("fill", function (node) {

                return colorDict[node.type].fill;
            })
            .style('stroke', function (node) {
                //config:边框色
                return colorDict[node.type].stroke;
            })
            .attr("r", 30)
            .on("click", function (node) {
                //单击时让连接线加粗
                //再次点击还原
                edges_line.style("stroke-width", function (line) {
                    //当与连接点连接时变粗
                    if ((line.source.name == node.name || line.target.name == node.name) ) {
                        if (line.focus && node.focus){
                            line.focus = false;
                            return 1;
                        }else{
                            line.focus = true;
                            return 2.5;
                        }
                    }else{
                        return 1;
                    }

                });
                circle.style('stroke-width', 1);//所有的圆圈边框
                //焦点取反
                node.focus = !node.focus
                //判断是不是点击的同一个node
                if (lastFocusNode != node && lastFocusNode != null){
                    lastFocusNode.focus = false
                }
                //进行判断
                if (node.focus) {
                    //被选中的圆圈边框
                    d3.select(this).style('stroke-width', 2.5);
                }else{
                    d3.select(this).style('stroke-width', 1);
                }
                lastFocusNode = node;
            })
            .on("dblclick", function (node) {
                his.push("/search/"+node.name);
            })
            .on("mouseover", function (d) {
                //config：替换成需要回显的html
                let content;
                if (config.contentHook){
                    content = config.contentHook(d);
                }else{
                    content = config.content;
                }
                tooltip.html(content)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity", 1.0);

            })
            .on("mousemove", function (d) {
                tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 20) + "px");

            })
            .on("mouseout", function (d) {
                tooltip.style("opacity", 0.0);

            })
            .call(drag());//使顶点可以被拖动


        svg.selectAll("g").call(drag());//为svg下的所有g标签添加拖拽事件
        //svg.selectAll("circle").call(drag());
        //svg.selectAll("path").call(drag());
        svg.on("dblclick.zoom", function () {
        });//取消svg和圆圈的双击放大事件（d3中默认开启7个事件，关闭防止与上面的双击事件冲突）
        circle.on("dblclick.zoom", null);

        let text = svg.append("g").selectAll("text")
            .data(force.nodes())
            //返回缺失元素的占位对象（placeholder），指向绑定的数据中比选定元素集多出的一部分元素。
            .enter()
            .append("text")//添加text标签
            .attr("dy", ".35em") //将文字下移
            .attr("text-anchor", "middle")//在圆圈中加上数据
            .style('fill', function (node) {
                return colorDict[node.type].text;
            }).attr('x', function (d) {
                let re_en = /[a-zA-Z]+/g;
                //如果是全英文，不换行
                if (d.name.match(re_en)) {
                    d3.select(this).append('tspan')//添加tspan用来方便时使用绝对或相对坐标来调整文本
                        .attr('x', 0)
                        .attr('y', 2)
                        .text(function () { return d.name; });
                }
                //如果小于8个字符，不换行
                else if (d.name.length <= 8) {
                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', 2)
                        .text(function () { return d.name; });
                } else if (d.name.length >= 16) {//大于16个字符时，将14个字后的内容显示为。。。
                    let top = d.name.substring(0, 8);
                    let bot = d.name.substring(8, 14) + "...";

                    d3.select(this).text(function () { return ''; });

                    d3.select(this).append('tspan')//前n个字
                        .attr('x', 0)
                        .attr('y', -7)
                        .text(function () { return top; });

                    d3.select(this).append('tspan')//后n个字
                        .attr('x', 0)
                        .attr('y', 10)
                        .text(function () { return bot; });

                }
                else {//8-16字符分两行显示
                    let top = d.name.substring(0, 8);
                    let bot = d.name.substring(8, d.name.length);

                    d3.select(this).text(function () { return ''; });

                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', -7)
                        .text(function () { return top; });

                    d3.select(this).append('tspan')
                        .attr('x', 0)
                        .attr('y', 10)
                        .text(function () { return bot; });
                }

            });

        function tick() {//刷新页面函数

            circle.attr("transform", transform1);//圆圈
            text.attr("transform", transform1);//顶点文字
            edges_line.attr('d', function (d) { //连接线
                let path = 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
                return path;
            });

            edges_text.attr('transform', function (d, i) {//连线上的文字
                if (d.target.x < d.source.x) {//判断起点和终点的位置，来让文字一直显示在线的上方且一直是正对用户
                    let bbox = this.getBBox();//获取矩形空间,并且调整翻转中心。（因为svg与css中的翻转不同，具体区别可看http://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/）
                    let rx = bbox.x + bbox.width / 2;
                    let ry = bbox.y + bbox.height / 2;
                    return 'rotate(180 ' + rx + ' ' + ry + ')';
                }
                else {
                    return 'rotate(0)';
                }
            })
                .attr('dx', function (d, i) {

                    return Math.sqrt(Math.pow(d.target.x - d.source.x, 2) + Math.pow(d.target.y - d.source.y, 2)) / 2 - 20;
                    //设置文字一直显示在线的中间

                })
            ;
        }
        //设置圆圈和文字的坐标
        function transform1(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }
    }
    render(){
        return(
            <div className="row" style={{marginTop: 10,display: "flex"}}>
                <div className="col s12 m7" style={{float: "right",marginRight: "4rem"}}>
                    <div className="card">
                        <div id="container2" className="card-image container" style={{width:"1156px", height:"500px" }}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Gragh2;