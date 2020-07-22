KGView是一个jquery框架下的d3js案例
我把它移植到react中后（uitest），跑不通
uitest中有两个简单的d3的静态案例，能够跑通

如果这个案例能跑通的话，我们的项目改编这个会容易很多

跑不通的可能原因：
1. KGinit代码没有修改到位（主要是style的写法，和jquery的语法）
2. d3js在react中的包和原项目的包不太一样
我分别试过，报错各不相同
```
const d3=require("d3");
import d3 from "react-d3-library"
import * as d3 from "react-d3-library"
import * as d3 from "d3"
import "min.d3.v3.js"(这个项目是v3版本的，官网最新的d5)
```
