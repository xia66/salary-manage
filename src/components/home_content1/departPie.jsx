import React from 'react'
import './index.less'
import echarts from 'echarts/lib/echarts'
import 'echarts'
import {CalcAllMessage} from './../CalcAllMessage.jsx'
export default class DepartPie extends React.Component{
	constructor(props,context) {
    	super(props);
        //console.log(this.props.data);
        this.state={
            //data:this.props.data
            data:[
                {name:"xx",value:123},
                {name:"yy",value:234},
                {name:"zz",value:345},
            ]
        }
    }
    componentWillMount(){
        (new CalcAllMessage("DepartGalaryMessage",this)).getAllMessage();
    }
    //控制echart开始渲染，如果一开始就渲染，那么无法再改变，而ajax和setState都是异步，所以很可能导致一直渲染失败
    startRender() {
        // 基于准备好的dom，初始化echarts实例
        var dom = $('#content1 .depart-pie')[0];
        //由于在css文件中用rem为容器做单位无效，所以手动获取rem的大小，设置px为单位。
        $('#content1 .depart-pie').css({height:10*40 * (document.documentElement.clientWidth / 1349) + "px"});
        var myChart = echarts.init(dom);//把本类所返回的dom成为容器
        var app = {};
        var option = null;
        option = {
            title : {
                text: '部门工资占比图',
                //subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data:this.state.data.map(function(item,index){
                    return item.name;
                })
            },
            series: [
                {
                    name:'部门总工资',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.state.data,
                }
            ]
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    render(){
    	return(
        	<div className="depart-pie">
            </div>
    	)
    }

}