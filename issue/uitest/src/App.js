import React from 'react';
import Test from './Test';              //计划使用antd的Popover来呈现text
import Circle from './Circle';          //konva画图
import Network from './Network';        //canvas画图
import Demo from './d3demo';            //一个动态d3实例，跑不通
                                        //Demo的呈现效果和本项目有很多相近之处 http://www.molapages.xyz/KGView/
                                        //原项目是基于jquery的，移植到react后不能正确运行
import Demo2 from './d3';               //一个静态的d3实例
import TestCharts from "./d3-an";       //一个静态的d3实例
import './App.css';

function App() {
  return (
      <div>
        <Demo/>
      </div>

  );
}

export default App;
