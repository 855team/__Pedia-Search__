import React from 'react';
import { DatePicker,Card } from 'antd';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react'
import { Row, Col } from 'antd';
import * as userService from '../services/userService'
const { RangePicker } = DatePicker;



class Hotwords extends React.Component {
    constructor(props){
        super(props);
        this.state={
            time:null,
            hot:[],
            times:[]
        }
    }
    getOption = ()=>{
        let option = {
            title: {
                text: '热点词条'
            },
            tooltip:{
                trigger: 'axis'
            },
            xAxis: {
                data: this.state.hot,
                axisLabel:{interval: 0}
            },
            yAxis: {
                type: 'value',
                minInterval: 1
            },
            series : [
                {
                    type:'bar',
                    barWidth: '50%',
                    data:this.state.times
                }
            ]
        }
        return option;
    }
    settime=(value,dateString)=>{
        console.log(dateString)
        this.setState({
            time:dateString
        })
        let data={
            "size":8,
            "startTime":dateString[0]+" 00:00:00",
            "endTime":dateString[1]+" 23:59:59"
        }
        let callback=(data)=>{
            let num=data.length;
            let newhot=[];
            let newtimes=[];
            for( let i=0;i<num;i++){
                newhot.push(data[i].keyword);
                newtimes.push(data[i].times)
            }
            this.setState({
                hot:newhot,
                times:newtimes
            })
        }
        userService.create(data,callback)
    }
    render(){

        return(
            <div>
                <Row style={{marginRight:"0"}}>
                <RangePicker onChange={this.settime}/>
                </Row>
                <Row style={{width:"960px",marginTop:"50px"}}>
                    <ReactEcharts option={this.getOption()}/>
                </Row>
            </div>
        )
    }
}

export default Hotwords;