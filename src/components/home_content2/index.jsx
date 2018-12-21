import React from 'react'
import './index.less'
import {Row,Col,Table} from 'antd'
import {CalcAllMessage} from './../CalcAllMessage.jsx'
import {connect } from 'react-redux'
class HomeContent2 extends React.Component{
	constructor(props,context) {
    	super(props,context);
    	this.state={
            oneStaffMessage:[],//某个职员的全部信息
    	}
        this.columns=[{
                title: '工号',
                dataIndex: 'id',
            },{
                title: '姓名',
                dataIndex: 'name',
            },{
                title:"部门",
                dataIndex:"depart"
            },{
                title:"职位",
                dataIndex:"job"
            },{
                title:"一月",
                dataIndex:"jan"
            },{
                title:"二月",
                dataIndex:"feb"
            },{
                title:"三月",
                dataIndex:"march"
            },{
                title:"四月",
                dataIndex:"april"
            },{
                title:"五月",
                dataIndex:"may"
            },{
                title:"六月",
                dataIndex:"june"
            },{
                title:"七月",
                dataIndex:"july"
            },{
                title:"八月",
                dataIndex:"aug"
            },{
                title:"九月",
                dataIndex:"sept"
            },{
                title:"十月",
                dataIndex:"oct"
            },{
                title:"十一月",
                dataIndex:"nov"
            },{
                title:"十二月",
                dataIndex:"dece"
            },{
                title:"总工资",
                dataIndex:"allpay"
            },{
                title:"加班时长",
                dataIndex:"time"
            },{
                title:"加班薪资",
                dataIndex:"addpay"
            },{
                title:"年终奖",
                dataIndex:"endpay"
            }
        ]
    }
    componentWillMount(){
        (new CalcAllMessage('PeopleGalaryMessage',this)).getAllMessage();
    }
    //在职员登陆后会修改props.message，这时候如果message有的话可以根据message得到这个职员的所有信息
    //再根据信息计算出工资等填入表单。搜索的时候也是修改store的message信息，也会触发这个函数
    componentWillReceiveProps(nextProps){
        let oneStaffMessage=[];
        if(nextProps.message){
            const {id,name,depart,job,basepay,jan,feb,march,april,may,june,july,aug,sept,oct,nov,dece,time,perhour}=nextProps.message;
            let allpay=Math.ceil((jan+feb+march+april+may+june+july+aug+sept+oct+nov+dece)*basepay/12);
            oneStaffMessage[0]={key:0,id,name,depart,job,basepay,jan:Math.ceil(jan/22*basepay),feb:Math.ceil(feb/22*basepay),march:Math.ceil(march/22*basepay),april:Math.ceil(april/22*basepay),may:Math.ceil(may/22*basepay),
                june:Math.ceil(june/22*basepay),july:Math.ceil(july/22*basepay),aug:Math.ceil(aug/22*basepay),sept:Math.ceil(sept/22*basepay),oct:Math.ceil(oct/22*basepay),nov:Math.ceil(nov/22*basepay),dece:Math.ceil(dece/22*basepay),
                allpay,time,addpay:time*perhour,endpay:Math.ceil((allpay+time*perhour)/12),
            }
        }
        this.setState({oneStaffMessage});
    }
    render(){
        const columns = this.columns;
    	return(
    		<div id="content2">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>{this.props.who=='manager'?'员工详细信息':'我的详细信息'}</Col>
                    <Col span={2}></Col>
                </Row>
    			<Row>
    				<Col span={2}></Col>
    				<Col span={20}>
                        <div className="galary-table">
                            <Table bordered dataSource={this.props.message?this.state.oneStaffMessage:this.state.PeopleGalaryMessage} columns={columns} />
                        </div>
                    </Col>
    				<Col span={2}></Col>
    			</Row>
    		</div>
    	)
    }
}
//与store连接
function mapStateToProps(state){ 
    return { isLogin: state.loginState.isLogin,who:state.loginState.who,message:state.loginState.message}  //相当于组件的this.props.text=state.text
}  
function mapDispatchToProps(dispatch){  
    return{  
        login:(who)=>dispatch({type:'login',who:who}), 
        loginOut:()=>dispatch({type:'loginOut'})  
    }  
}  
//这里把nav组件和LoginModal都和redux连起来了,所以它们的this.props.loginstate={state:false,username:"",userid:""}
//this.props.login=dispatch('login');   this.props.loginOut=dispatch('loginOut')
export default HomeContent2 = connect(mapStateToProps, mapDispatchToProps)(HomeContent2);