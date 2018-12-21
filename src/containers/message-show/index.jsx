import React from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './index.less'
import {setColumns} from './setColumns.jsx'
import {getMessage,addMessage,deleteMessage,updateMessage} from './ajax.jsx'
export default class MessageShow extends React.Component {
  constructor(props,context) {
    super(props,context);
    //columns规定了每个表项，如果没有使用render函数返回一个组件，那么默认是一个用于展示数据的单元格
    this.state = {
      message:"user",//哪个表，默认是在对员工表进行增删改查
      dataSource:[],//填入表格的数据
      count: 0,//获取的数据个数，数据个数新增的时候有用
    };
  }

  //这里onCellChange是返回一个函数，这个函数的参数是子组件修改后的值，而key和dataIndex是
  //为子组件onChange赋值时直接写的参数，key代表的是第几个员工的数据，dataIndex代表的是哪个数据，比如name
  //根据key和当前数据修改dataSource,后期应该添加根据this.state.message向服务器发送信息
  onCellChange(key, dataIndex,record){ 
    //record是前一次这一列的所有数据
    return (value) => {
      updateMessage.call(this,this.state.message,key,record,dataIndex,value)
    };
  }
  //删除的回调函数
  onDelete(key,record){
    deleteMessage.call(this,this.state.message,key,record);
    //const dataSource = [...this.state.dataSource];
    //this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  //增加的回调函数
  handleAdd(){
    addMessage.call(this,this.state.message);
  }
  //验证是否为管理员登录
  checkLogin(){
    function isLogin(){
      function getCookie(cname)
      {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
          var c = ca[i].trim();
          if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
      }
      if(getCookie('username')=='123') return true;
      return false;
    }
    if(!isLogin()){
      alert("仅限管理员登录后访问");
      window.location.href="http://localhost:9001/";
    }
  }
  componentWillMount(){
    this.checkLogin();
    let message=window.location.href.split("show-")[1];
    //this.setState({message},()=>{console.log(this.state.message)});//setState是异步函数，想看刚设置的state得这样
    this.setState({message});//设置现在是对哪个表进行增删改查
    //下面的函数根据message设置了表格
    setColumns.call(this,message);//为了避免这个页面太复杂，把设置表格单元格的代码放在setColumns.jsx中,且用call将其中的this指回了
    //获取填入表格的数据,里面设置了this.state.dataSource
    getMessage.call(this,message);
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div id="show">
        <Button onClick={()=>{this.handleAdd()}} type="primary" style={{ marginBottom: 16 }} disabled={(this.state.message=='user'||this.state.message=='department')?false:true}>
          {this.state.message=='user'?"新增员工":"新增职位"}
        </Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
