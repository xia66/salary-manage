import './index.less'
import React from 'react'
import Nav from '../nav/index.jsx'
import {Row,Col,Input,Menu,Icon,notification} from 'antd'
import PropTypes from 'prop-types'
const Search = Input.Search;
class HomeHeader extends React.Component{
	constructor(props, context) {
        super(props, context);
        this.state={
            
        }
    }
    
    clickHandle(e,message){
        const loginState=this.context.store.getState().loginState;
        if((loginState.isLogin==true)&&(loginState.who=='manager')){
            window.open("http://localhost:9001/"+"show-"+message);

        }else{
            notification['warning']({
                message: '仅限管理员访问',
                description: '想要访问此页请使用管理员账号登录',
              });
        }
    }
    mouseEnterHandle(e){
        $('.'+e.target.className+" .anticon").animate({fontSize:"2rem"},300);

    }
    mouseLeaveHandle(e){
        $('.'+e.target.className+" .anticon").animate({fontSize:"1rem"},300);
    }
    render() {
        return (
            <div id="header">
            	<Nav></Nav>{/*这里引用了导航组件*/}
                <div className="header-content">
                    <Row>
                        <Col span={2}></Col>
                        <Col span={20} className="four-space">
                            <div className="user" onClick={(e)=>this.clickHandle(e,"user")} onMouseEnter={(e)=>this.mouseEnterHandle(e)} onMouseLeave={(e)=>this.mouseLeaveHandle(e)}>
                                <Icon type="idcard"/>
                                <span className="title">员工基本信息</span>
                            </div>
                            <div className="department" onClick={(e)=>this.clickHandle(e,"department")} onMouseEnter={(e)=>this.mouseEnterHandle(e)} onMouseLeave={(e)=>this.mouseLeaveHandle(e)}>
                                <Icon type="team" />
                                <span className="title">部门职位信息</span>
                            </div>
                            <div className="attendance" onClick={(e)=>this.clickHandle(e,"attendance")} onMouseEnter={(e)=>this.mouseEnterHandle(e)} onMouseLeave={(e)=>this.mouseLeaveHandle(e)}>
                                <Icon type="contacts" />
                                <span className="title">员工考勤情况</span>
                            </div>
                            <div className="allowance" onClick={(e)=>this.clickHandle(e,"allowance")} onMouseEnter={(e)=>this.mouseEnterHandle(e)} onMouseLeave={(e)=>this.mouseLeaveHandle(e)}>
                                <Icon type="wallet" />
                                <span className="title">员工加班津贴</span>
                            </div>
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                </div>
            </div>
        )
    }
}
HomeHeader.contextTypes = { store: PropTypes.object.isRequired }
export default HomeHeader;