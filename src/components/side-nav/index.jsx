import React from 'react'
import {Row,Col,Menu, Modal,notification,Select,Badge,Table, Input, Icon, Button, Popconfirm,Cascader} from 'antd'
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
import './index.less';
import {connect } from 'react-redux'
class SideNav extends React.Component{
	constructor(props, context) {
        super(props, context);
        this.state={
            collapsed: true,//是否收缩
            sendModalVisible:false,//发送modal是否可见
            confirmModalVisible:false,//接受modal是否可见
            time:0, //加班时间
            dataSource:[],
            hasMessage:false,
        }
        this.columns=[{
              title: 'name',
              dataIndex: 'name',
              width: '30%',
            }, {
              title: 'depart',
              dataIndex: 'depart',
            }, {
              title: 'time/小时',
              dataIndex: 'time',
            },{
                title:'是否确认',
                dataIndex:'flag',
                render: (text, record) => { 
                    return (
                      <EditableCell
                        value={text}
                        onChange={this.onCellChange(record.key, 'flag',record)}
                      /> )
                }
            }
        ]; 
    }
    //切换侧边导航是否收缩
    toggleCollapsed(){
        this.setState({
          collapsed: false,
        });
    }
    untoggleCollapsed(){
        this.setState({
          collapsed: true,
        });
    }
    //点击后发送消息Modal可见
    clickSendHandle(){
        if(this.props.who=='manager'){
            notification['warning']({
                message: '管理员不需要发送加班时间',
                description: '想要访问此页请使用职员账号登录',
              });
        }else if(this.props.who=='staff'){
            this.setState({sendModalVisible:true})
        }
    }
    //点击发送消息框的取消回调，框消失
    handleSendModalCancel(){
        this.setState({sendModalVisible:false});
    }
    //选择加班时间
    handleSendChange(time){
        this.setState({time:parseInt(time)});
    }
    //发送消息框的确认发送回调
    handleSendModalOk(){
        const {id,name,depart,job,jobclass}=this.props.message;
        //console.log({id,name,depart,jobclass,time:this.state.time});
        $.ajax({
            url:"http://localhost:8080/galary-manage/AddtimemessageServlet",
            type:"post",
            data:{id,name,depart,jobclass,time:this.state.time},
            //dataType:"json",
            success:function(data, textStatus, jqXHR ){
                notification['info']({
                    message: '发送成功',
                    description: '你的加班消息已经发送成功，待上司确认后，你的加班时间会增加',
                  });
            },
            error: function(jqXHR, textStatus, errorMsg){
                alert("请求失败：" + errorMsg);
            }
        })
    }
    //点击后接收消息框可见
    clickConfirmHandle(){
         if(this.props.who=='manager'){
            notification['warning']({
                message: '管理员不需要发送加班时间',
                description: '想要访问此页请使用职员账号登录',
              });
        }else if(this.props.who=='staff'){
            this.setState({confirmModalVisible:true})
        }
    }
    //接收消息框取消
    handleConfirmModalCancel(){
        this.setState({confirmModalVisible:false})
    }
    //接收消息框确认
    handleConfirmModalOk(){
        const _this=this;
        //把state的dataSource取出来发送
        let {dataSource}=this.state;
        console.log(dataSource);
        $.ajax({
            url:"http://localhost:8080/galary-manage/ConfirmtimemessageServlet",
            type:"post",
            data:{data:JSON.stringify(dataSource)},
            //dataType:"json",
            success:function(data, textStatus, jqXHR){
                //发送成功则清除dataSource
                _this.setState({dataSource:[],hasMessage:false});
            },
            error: function(jqXHR, textStatus, errorMsg){
                
            }
        })
    }
    //选择是否确认下属加班，修改datasource
    onCellChange(key, dataIndex,record){ 
        //record是前一次这一列的所有数据
        return (value) => {
            let {dataSource}=this.state;
            dataSource.forEach(function(item,index){
                if(item.key==key){
                    if(value=="yes")
                        dataSource[index].flag=1;
                    else if(value=="no")
                        dataSource[index].flag=2;
                    else
                        dataSource[index].flag=3; 

                }
            })
            //console.log(dataSource);
        };
    }
    //props改变时调用,职员一登陆就会改变props.message
    componentWillReceiveProps(nextProps){
        const _this=this;
        //console.log(this.props.message);
        if(nextProps.message){
            var {id,name,depart,job,jobclass}=nextProps.message;
        }
        //console.log({id,name,depart,job,jobclass});
        //console.log({id,name,depart,jobclass,time:this.state.time})
        if(nextProps.who=="staff"&&nextProps.message){
            $.ajax({
                url:"http://localhost:8080/galary-manage/GettimemessageServlet",
                type:"post",
                data:{id,name,depart,jobclass,time:this.state.time},
                dataType:"json",
                success:function(data, textStatus, jqXHR){
                    if(data){
                        console.log(data)
                        //为每项添加一个key值
                        data.forEach(function(item,index){
                            data[index].key=index;
                        })
                        _this.setState({dataSource:data,hasMessage:true});
                        notification['info']({
                            message: '你的下属有新的加班消息',
                            description: '请确认下属加班信息是否正确',
                          });
                    }
                    //
                },
                error: function(jqXHR, textStatus, errorMsg){
                    //alert("请求失败：" + errorMsg);
                }
            })
        }
    }
    render(){
        
    	return(
    		<div id="side-nav" onMouseEnter={()=>this.toggleCollapsed()} onMouseLeave={()=>this.untoggleCollapsed()}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    style={{height:"100%"}}
                >
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span>Options</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="desktop" />
                        <span onClick={()=>this.clickSendHandle()}>报告加班</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        {this.state.hasMessage?<Badge dot/>:""}
                        <Icon type="mail"/>
                        <span onClick={()=>this.clickConfirmHandle()}>我的消息</span>
                    </Menu.Item>
                </Menu>
                <Modal title="上报加班时间" visible={this.state.sendModalVisible} onOk={()=>this.handleSendModalOk()}
                    onCancel={()=>this.handleSendModalCancel()} okText="发送"
                >
                    {this.props.message?
                        this.props.message.depart+"-"+this.props.message.job+"-"+this.props.message.name+"-加班时间-":""}
                    <Select defaultValue="1" style={{ width: 80 }} onChange={(time)=>this.handleSendChange(time)}>
                        <Option value="1">1小时</Option> 
                        <Option value="2">2小时</Option> 
                        <Option value="3">3小时</Option> 
                        <Option value="4">4小时</Option>
                        <Option value="5">5小时</Option> 
                        <Option value="6">6小时</Option> 
                        <Option value="7">7小时</Option> 
                        <Option value="8">8小时</Option>
                    </Select>
                </Modal>
                <Modal title="下属加班时间确认" visible={this.state.confirmModalVisible} onOk={()=>this.handleConfirmModalOk()}
                    onCancel={()=>this.handleConfirmModalCancel()} okText="发送确认"
                >
                    <Table bordered dataSource={this.state.dataSource} columns={this.columns} />
                </Modal>
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
export default SideNav = connect(mapStateToProps, mapDispatchToProps)(SideNav);

//以下是可修改单元格的定义
class EditableCell extends React.Component {
  constructor(){
    super();
    this.state = {
    //value: this.props.value,好像在这里读取不到this.props
    editable: false,
    }
  }
  //选择框的回调,先修改本组件的state,然后check就会把修改后的发给父组件
  selectHandleChange(value){
    value=value[0];
    this.setState({value});
  }
  //确认修改完成，然后会把修改后的数据发给父组件的onCellChange函数进行处理
  check(){
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);//触发父组件的修改事件回调
    }
  }
  //点击进行修改
  edit(){
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
    <div className="editable-cell">
      {
        //不可修改则是用于展示的单元格,可修改有两种,下拉选框(专门用于职位,但是在部位职位表又应该用输入框)和输入框
        !editable ? (
          <div style={{ paddingRight: 24 }}>
            {value || ' '}
            <Icon
              type="edit"
              className="editable-cell-icon"
              onClick={()=>{this.edit()}}
            />
          </div>
        ):(
            <div>
                <Cascader options={[{value:"yes",label: '确认'},{value:"no",label: '否认'},{value:"unknow",label:"不知道"}]} placeholder="Please select" onChange={(value)=>this.selectHandleChange(value)}/>
                <Icon
                  type="check"
                  className="editable-cell-icon-check"
                  onClick={()=>{this.check()}}
                />
            </div>
        )
      }
    </div>
    );
  }
}