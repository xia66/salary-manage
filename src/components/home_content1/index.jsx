import React from 'react'
import './index.less'
import {Row,Col} from 'antd'
import DepartPie from './departPie.jsx'
import DepartBarChart from './departBarChart.jsx'
import {CalcAllMessage} from './../CalcAllMessage.jsx'
export default class HomeContent1 extends React.Component{
	constructor(props,context) {
    	super(props);
    }
    
    render(){
    	return(
    		<div id="content1">
    			<Row>
    				<Col span={2}></Col>
    				<Col span={8}>
    					<DepartPie/>
    				</Col>
    				<Col span={12}>
                        <DepartBarChart/>
                    </Col>
    				<Col span={2}></Col>
    			</Row>
    		</div>
    	)
    }

}