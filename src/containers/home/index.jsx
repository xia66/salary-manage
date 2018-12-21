import React from 'react'
import SideNav from '../../components/side-nav/index.jsx'
import HomeHeader from '../../components/home_header/index.jsx'
import HomeContent1 from '../../components/home_content1/index.jsx'
import HomeContent2 from '../../components/home_content2/index.jsx'
import './index.less'
import {Row,Col} from 'antd'
export default class Home extends React.Component{
	constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div id="home">
                <Row>
                    <Col span={1}><SideNav/></Col>
                    <Col span={23}>
                        <div id="content">
                            <HomeHeader></HomeHeader>
                            <HomeContent1></HomeContent1>
                            <HomeContent2></HomeContent2>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
