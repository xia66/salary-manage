import React from 'react'
import { Table, Input, Icon, Button, Popconfirm,Cascader } from 'antd';
export let setColumns =function(key){
	//以下this是MessageShow组件对象
	switch(key){
		case "test":
		    this.columns= [{
		      title: 'name',
		      dataIndex: 'name',
		      width: '30%',  
		      render: (text, record) => { 
		        //console.log(text);//text是一开始传入这个单元格的数据Edward King 0
		        //console.log(record);//record是一开始传入这一行的数据{key: "1", name: "Edward King 1", age: "32", address: "London, Park Lane no. 1"}
		        return (
		          <EditableCell
		            value={text}
		            onChange={this.onCellChange(record.key, 'name')}//这里其实把修改后的值传给了匿名函数
		          /> )
		      },
		    }, {
		      title: 'age',
		      dataIndex: 'age',
		    }, {
		      title: 'address',
		      dataIndex: 'address',
		    }, {
		      title: 'operation',
		      dataIndex: 'operation',
		      render: (text, record) => {
		      	//text和record
		        return (
		          this.state.dataSource.length > 1 ?
		          (
		            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
		              <a href="javascript:;">Delete</a>
		            </Popconfirm>
		          ) : null
		        );
		      },
		    }]; 
		    break;
	    case 'user':
	    	this.columns=[{
	    		title: '工号',		//title可以随意命名
		     	dataIndex: 'id'	//dataIndex和dataSource的键对应
	    	},{
	    		title:'用户名',
	    		dataIndex:'username',
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'username',record)}
			          /> )
		      	},
	    	},{
	    		title:'密码',
	    		dataIndex:'password',
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'password',record)}
			          /> )
		      	},
	    	},{
	    		title:'姓名',
	    		dataIndex:'name',
	    		render: (text, record) => {
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'name',record)}
			          /> )
		      	},
	    	},{
	    		title:"性别",
	    		dataIndex:"sex",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'sex',record)}
			            type="select"
			            options={[{value:"男",label: '男'},{value:"女",label: '女'}]}
			          /> )
		      	},
	    	},{
	    		title:'年龄',
	    		dataIndex:'age',
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'age',record)}
			          /> )
		      	},
	    	},{
	    		title:'部门',
	    		dataIndex:"depart",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'depart',record)}
			          /> )
		      	},
	    	},{
	    		title:"职位",
	    		dataIndex:"job",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'job',record)}
			          /> )
		      	},
	    	},{
		      title: 'operation',
		      dataIndex: 'operation',
		      render: (text, record) => {
		        return (
		          this.state.dataSource.length > 1 ?
		          (
		            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key,record)}>
		              <a href="javascript:;">Delete</a>
		            </Popconfirm>
		          ) : null
		        );
		      },
		    }];
	    	break;
	    case 'department':
	    	this.columns=[{
	    		title:"职位id",
	    		dataIndex:"jobid"
	    	},{
	    		title: '部门',		//title可以随意命名
		     	dataIndex: 'depart',	//dataIndex和dataSource的键对应
		     	render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'depart',record)}
			          /> )
		      	}
	    	},{
	    		title:'职位',
	    		dataIndex:'job',
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'job',record)}
			          /> )
		      	}
	    	},{
	    		title:"职位等级",
	    		dataIndex:"jobclass",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'jobclass',record)}
			            type="select"
			            options={[{value:1,label:'1'},{value:2,label: '2'},{value:3,label:'3'},{value:4,label:'4'},{value:5,label: '5'},{value:6,label:'6'},{value:7,label: '7'},{value:8,label:'8'},{value:9,label: '9'},{value:10,label: '10'}]}
			          /> )
		      	}
	    	},{
	    		title:'基本工资/￥/月',
	    		dataIndex:'basepay',
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'basepay',record)}
			          /> )
		      	}
	    	},{
		      title: 'operation',
		      dataIndex: 'operation',
		      render: (text, record) => {
		        return (
		          this.state.dataSource.length > 1 ?
		          (
		            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key,record)}>
		              <a href="javascript:;">Delete</a>
		            </Popconfirm>
		          ) : null
		        );
		      },
		    }];
	    	break;
	    case 'attendance':
	    	this.columns=[{
	    		title: '工号',		//title可以随意命名
		     	dataIndex: 'id'	//dataIndex和dataSource的键对应
	    	},{
	    		title:'姓名',
	    		dataIndex:'name'
	    	},{
	    		title:"一月",
	    		dataIndex:"jan",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'jan',record)}
			          /> )
		      	}
	    	},{
	    		title:"二月",
	    		dataIndex:"feb",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'feb',record)}
			          /> )
		      	}
	    	},{
	    		title:"三月",
	    		dataIndex:"march",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'march',record)}
			          /> )
		      	}
	    	},{
	    		title:"四月",
	    		dataIndex:"april",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'april',record)}
			          /> )
		      	}
	    	},{
	    		title:"五月",
	    		dataIndex:"may",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'may',record)}
			          /> )
		      	}
	    	},{
	    		title:"六月",
	    		dataIndex:"june",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'june',record)}
			          /> )
		      	}
	    	},{
	    		title:"七月",
	    		dataIndex:"july",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'july',record)}
			          /> )
		      	}
	    	},{
	    		title:"八月",
	    		dataIndex:"aug",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'aug',record)}
			          /> )
		      	}
	    	},{
	    		title:"九月",
	    		dataIndex:"sept",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'sept',record)}
			          /> )
		      	}
	    	},{
	    		title:"十月",
	    		dataIndex:"oct",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'oct',record)}
			          /> )
		      	}
	    	},{
	    		title:"十一月",
	    		dataIndex:"nov",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'nov',record)}
			          /> )
		      	}
	    	},{
	    		title:"十二月",
	    		dataIndex:"dece",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'dece',record)}
			          /> )
		      	}
	    	}];
	    	break;
	    case "allowance":
	    	this.columns=[{
	    		title: '工号',		//title可以随意命名
		     	dataIndex: 'id'	//dataIndex和dataSource的键对应
	    	},{
	    		title:'姓名',
	    		dataIndex:'name'
	    	},{
	    		title:"加班时长/小时",
	    		dataIndex:"time",
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'time',record)}
			          /> )
		      	}
	    	},{
	    		title:'每小时津贴',
	    		dataIndex:'perhour',
	    		render: (text, record) => { 
			        return (
			          <EditableCell
			            value={text}
			            onChange={this.onCellChange(record.key, 'perhour',record)}
			          /> )
		      	}
	    	}];
	    	break;
	}
}
class EditableCell extends React.Component {
  constructor(){
    super();
    this.state = {
    //value: this.props.value,好像在这里读取不到this.props
    editable: false,
    }
  }
componentWillMount(){
    this.setState({
    value: this.props.value
    })
  }
  //先修改本组件的state,然后check就会把修改后的发给父组件
  handleChange(e){
    const value = e.target.value;
    this.setState({ value });
    //console.log(this.state.value);
  }
  //选择框的回调
  selectHandleChange(value){
  	value=value[0];
  	this.setState({value});
  }
  //确认修改完成，然后会把修改后的数据发给父组件的onCellChange函数进行处理
  check(){
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
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
        ):this.props.type=="select"?(
         //写一个下拉列表组件
         	<div>
          		<Cascader options={this.props.options} placeholder="Please select" onChange={(value)=>this.selectHandleChange(value)}/>
	            <Icon
	              type="check"
	              className="editable-cell-icon-check"
	              onClick={()=>{this.check()}}
	            />
          	</div>
        ):(
        <Input
          value={value}
          onChange={(e)=>this.handleChange(e)}
          onPressEnter={()=>this.check()}
          suffix={
            <Icon
              type="check"
              className="editable-cell-icon-check"
              onClick={()=>{this.check()}}
            />
          }
        />
        )
      }
    </div>
    );
  }
}