import React from 'react'
import './index.less'
import echarts from 'echarts/lib/echarts'
import 'echarts'
import {CalcAllMessage} from './../CalcAllMessage.jsx'
export default class DepartBarChart extends React.Component{
	constructor(props,context) {
    	super(props);
    	this.state={
            data:[
                {depart:'政治部',value:[1,2,3,4,5,6,7,8,9,10,11,12]},
                {depart:'研发部',value:[1,2,3,4,5,6,7,8,9,10,11,12]},
                {depart:'杜工部',value:[1,2,3,4,5,6,7,8,9,10,11,12]},
                {depart:'财务部',value:[1,2,3,4,5,6,7,8,9,10,11,12]},
                {depart:'编辑部',value:[1,2,3,4,5,6,7,8,9,10,11,12]},
                {depart:'人力部',value:[1,2,3,4,5,6,7,8,9,10,11,12]},
            ],
    	}
    }
    componentWillMount(){
        (new CalcAllMessage("DepartMonthGalaryMessage",this)).getAllMessage();
    }
    startRender() {
        let dom =$("#content1 .depart-bar-chart")[0];
        //容器的高度必须用px做单位
        $("#content1 .depart-bar-chart").css({height:10*40 * (document.documentElement.clientWidth / 1349) + "px"});
        let myChart = echarts.init(dom);
        let app = {};
        let option = null;
        let series=this.state.data.map(function(item){
            return({
                name:item.depart,
                type:'bar',
                data:item.value,
                markPoint : {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            })
        })

        option = {
            title : {
                text: '部门月工资走势图',
                //subtext: '纯属虚构'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:this.state.data.map(function(item){return item.depart;})
            },
            toolbox: {
                show : true,
                feature : {
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series:series,
        };
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    render(){
    	return(
    		<div className="depart-bar-chart">
    			
    		</div>
    	)
    }

}