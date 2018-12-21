import './index.less'
import React from 'react'
import {Row,Col,Button,Icon,Tabs,Form,Input,Modal,notification} from 'antd'
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Search = Input.Search;
import {Router, Route, Link, browserHistory} from 'react-router'
import {connect } from 'react-redux'
import {CalcAllMessage} from './../CalcAllMessage.jsx'
class Nav extends React.Component{
	constructor(props, context) {
        super(props, context);
        this.state={
            modalVisible:!this.props.isLogin,//登陆和注册是否可见,通过Store的loginState.state控制
            allData:[]  //所有职工信息，用于搜索
        }
    }
    //导航栏的公用点击事件句柄
    handleClick(value,e){
        //像退出按钮中onClick那样可以通过e.target获得事件源对象,而this还是这个nav类
        //e?console.log(e.target):"";
        //点击登陆/注册按钮则让面板显示
        if(value=="login"){
            this.setState({modalVisible:true})
        }
        //登出
        else if(value=="loginOut"){
            this.props.loginOut();//发出登出dispatch
        }
    }
    //搜索回调
    handleSearch(value){
        if(this.props.who=='manager'){
            (new CalcAllMessage("searchStaffMessage",this,value)).getAllMessage();
        }else if(this.props.who=="staff"){
            notification['warning']({
                message: '普通员工无法使用此功能',
                description: '其他员工的工资情况是不对你公开的',
              });
        }
        //console.log(value);
        //this.props.login(manager,{id:2,name:"bilibili",depart:"研发部",job:"副部长",jobclass:3});
    }
    //上面的函数得到所有信息存放在allData后就会执行这个函数真正搜索
    startSearch(value){
        let flag=-1;
        this.state.allData.forEach((item,index)=>{
            if(item.name==value){
                //利用login函数将信息设置为搜索员工
                this.props.login("manager",item);
                flag=index;
            }
        })
        if(flag==-1){
            notification['warning']({
                message: '此员工不存在',
                description: '可能姓名输入错误',
              });
        }
    }
    //设置登录注册面板是否可见
    setModalVisible(value){
        //console.log(this);
        this.setState({modalVisible:value});
    }
    render(){
        const {isLogin,login,loginOut}=this.props;
        const _this=this;
        const userShow = this.props.isLogin? 
            <Col span={4}>
                <Link target="_blank" style={{display:"inline",color:"white"}}>
                    <span style={{fontSize:"0.28rem"}}>欢迎,{this.props.who=="manager"?"manager":this.props.message.name}</span>
                </Link>
                <Button ghost htmlType="button" onClick={(e)=>{this.handleClick("loginOut",e);}} style={{width:"40%"}}>退出</Button>
            </Col>
            :
            <Col span={4}> 
                <Button ghost htmlType="button" onClick={()=>{this.handleClick("login")}}>登录</Button>
            </Col>
            ;
    	return(          
            <div id="nav">
                <div className="background"></div>
                <div className="real">
                    <Row style={{marginTop:"0.5rem"}}>
                        <Col span={1}></Col>
                        <Col span={5} className="introduce">假的有限公司<br/>可还行工资管理系统</Col>
                        <Col span={2}></Col>
                        <Col span={6}><Search placeholder="搜索员工姓名" size="large" onSearch={(value)=>this.handleSearch(value)}/></Col>
                        <Col span={6}></Col>
                        {userShow}
            	   </Row>
                </div>
                {/*注册和登陆界面*/}
                <LoginModal modalVisible={this.state.modalVisible} setModalVisible={this.setModalVisible.bind(this)}/>{/*这里必须bind(this),不然调用这个函数的就是modal的props*/}
            </div>
    	)
    }
}

/***********************************************注册和登陆界面*********************************************/
class LoginModal extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state={
           loginRight:"success", //error或success
           key:'manager',   //manager或普通职员登陆
           allData:[],
        }
    }
    //选择哪个登录
    handelTabChange(key){
        this.setState({key});
    }
    //登录
    handleSubmit(){
        let $from=document.getElementById("login");
        if(this.state.key=="manager"){
            if($("#manager")[0].elements[0].value=='123'&&$("#manager")[0].elements[1].value=='123'){
                this.props.login("manager");//ajax如果成功则发出登录的dispatch
                function setCookie(cname,cvalue,exdays){
                    var path="/";/*设置路径使user.html可以访问本页面设置的cookie*/
                    document.cookie=cname+'='+cvalue+';path='+path;
                }
                setCookie('username',"123");
                this.props.setModalVisible(false);
            }else{
                this.setState({loginRight:"error"});
                setTimeout((()=>this.setState({loginRight:"success"})),1000);
            }
        }
        //员工登录则获取所有员工信息，然后startCheckStaffLogin在CalcAllMessage里面被调用检测是哪个员工登陆，
        //再把这个员工信息存入store
        else if(this.state.key=="staff"){
            (new CalcAllMessage("getAllLoginMessage",this)).getAllMessage();
        }         
    }
    //这个在CalcAllMessage被调用，然后登陆的职工的所有信息被存到store.loginMessage.message
    startCheckStaffLogin(){
        //console.log(this.state.allData);
        let flag=false;//职工账号密码是否正确标志
        let usermessage;
        this.state.allData.forEach(function(item,index){
            if(item.username==$("#staff")[0].elements[0].value&&item.password==$("#staff")[0].elements[1].value){
                flag=true;
                usermessage=item;
            }
        });
        if(flag==true){
            //在所有信息里找到符合的则允许登陆，并存信息到store
            this.props.login("staff",usermessage);
        }else{
            this.setState({loginRight:"error"});
            setTimeout((()=>this.setState({loginRight:"success"})),1000);
        }
        
    }
    //关闭的话验证是否已经登录
    closeHandle(){
        function isLogin(){
            if((this.props.isLogin==true)&&(this.props.who=='manager'))
                return true;
            return false;
        }
        this.props.setModalVisible(false);
        if(!isLogin.call(this)){
            this.props.setModalVisible(true)
        }
    }
//如果没有登录则跳转到登录页
    render(){
        return(
            //modal的取消和X的回调都是onCancel
            <Modal title="本页需登录后访问" visible={!this.props.isLogin} onCancel= {()=>this.closeHandle()} onOk={()=>this.closeHandle()} okText="关闭">
                <Tabs type="card" onChange={(key)=>this.handelTabChange(key)}>
                    <TabPane tab="管理员登录" key="manager">
                        <Form id="manager">
                            <FormItem label="账户" validateStatus={this.state.loginRight}>
                                <Input placeholder="请输入您的账号"/>
                            </FormItem>
                            <FormItem label="密码" help={this.state.loginRight=="success"?"":"账号或密码错误"} validateStatus={this.state.loginRight}>
                                <Input type="password" placeholder="请输入您的密码"/>
                            </FormItem>
                            <Button type="primary" htmlType="button" onClick={()=>{this.handleSubmit();}}>登录</Button>
                        </Form>
                    </TabPane>
                    <TabPane tab="职员登录" key="staff">
                        <Form id="staff">
                            <FormItem label="账户" validateStatus={this.state.loginRight}>
                                <Input placeholder="请输入您的账号"/>
                            </FormItem>
                            <FormItem label="密码" help={this.state.loginRight=="success"?"":"账号或密码错误"} validateStatus={this.state.loginRight}>
                                <Input type="password" placeholder="请输入您的密码"/>
                            </FormItem>
                            <Button type="primary" htmlType="button" onClick={()=>{this.handleSubmit();}}>登录</Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>        
        )
    }
}
//与store连接
function mapStateToProps(state){ 
    return { isLogin: state.loginState.isLogin,who:state.loginState.who,message:state.loginState.message}  //相当于组件的this.props.text=state.text
}  
function mapDispatchToProps(dispatch){  
    return{  
        login:(who,message)=>dispatch({type:'login',who,message}), 
        loginOut:()=>dispatch({type:'loginOut'})  
    }  
}  
//这里把nav组件和LoginModal都和redux连起来了,所以它们的this.props.loginstate={state:false,username:"",userid:""}
//this.props.login=dispatch('login');   this.props.loginOut=dispatch('loginOut')
export default Nav = connect(mapStateToProps, mapDispatchToProps)(Nav);
LoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModal);