//引入antd样式
//这里注意把antd的样式文件放最上面，这样才能修改antd的样式
import 'antd/dist/antd.css'
//引入公共样式
import './static/common.css'
import React from 'react'
import { render } from 'react-dom' 
import { Provider } from 'react-redux'
import { Router, Route, hashHistory,IndexRoute,browserHistory} from 'react-router'
import RootApp from './containers/app.jsx'
import Home from './containers/home/index.jsx'
import MessageShow from './containers/message-show/index.jsx'
import { createStore } from 'redux'; 
import {reducer} from './reducer/index.js';
//store  
let store = createStore(reducer);


export default class Root extends React.Component {
	render() {
		return (
			<Provider store={store}>  
				<Router history={browserHistory}>
					<Route path="/" component={RootApp}>
						<IndexRoute component={Home}/>
						<Router path="/-:who" component={Home}/>
						<Router path="/show-:messageType" component={MessageShow}/>
					</Route>
				</Router>
			</Provider>
		);
	};
}
render(<Root/>,document.getElementById('root'));




// 引入 ECharts 主模块
/*import echarts from 'echarts/lib/echarts'
import 'echarts'


class EchartsTest extends React.Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
		var dom = document.getElementById("main");
		var myChart = echarts.init(dom);
		var app = {};
		var option = null;
		app.title = '环形图';

		option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
		    },
		    series: [
		        {
		            name:'访问来源',
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
		            data:[
		                {value:335, name:'直接访问'},
		                {value:310, name:'邮件营销'},
		                {value:234, name:'联盟广告'},
		                {value:135, name:'视频广告'},
		                {value:1548, name:'搜索引擎'}
		            ]
		        }
		    ]
		};
		
		if (option && typeof option === "object") {
		    myChart.setOption(option, true);
		}
    }
    render() {
        return (
            <div id="main" style={{ width: 400, height: 400,border:"1px solid red"}}></div>
        );
    }
}
render(<EchartsTest/>,document.getElementById('root'));*/