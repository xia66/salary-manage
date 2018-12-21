export let getMessage=function(message){
	 const _this=this;//在ajax里this是指向ajax对象的，所以需要在外面声明_this
    $.ajax({
        url: "http://localhost:8080/galary-manage/GettablemessageServlet",
        type: "POST",
        data:{message:message,type:"getAllMessage"},
        dataType:"json",    /*如果说明返回数据类型是json，那么jquery会帮我们自动将数据转化为js对象或数组*/
        success: function(data, textStatus, jqXHR ){
            if(data){
              data.forEach(function(item,index){
                //为每一个数据都加上一个key方便后面的增删改查，而且防止报错
                item.key=index;
              })
  	        	_this.setState({
  	        		dataSource:data,
  	        		count:data.length,
  	        	})
            }
        },
        error: function(jqXHR, textStatus, errorMsg){
          alert("请求失败：" + errorMsg);
      }
    });	
}
export let addMessage=function(message){
    const { count, dataSource } = this.state;
    const _this=this;
    let newData={};
    message=="department"?
      newData={message:message,key:count,jobid:count,depart:"",job:"",jobclass:0,basepay:0}
      :newData={message:message,key:count,id: count,name: '',sex: '',age: '',depart:"",job:""};  
    $.ajax({
        url: "http://localhost:8080/galary-manage/AddmessageServlet",
        type: "POST",
        data:newData,
        //dataType:"json",    //由于没有返回数据，所以不要声明返回为json，不然会报错json解析为空
        success: function(data, textStatus, jqXHR ){
            console.log(1);
            _this.setState({
              dataSource:[...dataSource, newData],
              count: count + 1
            })
        },
        error: function(jqXHR, textStatus, errorMsg){
          alert("请求失败：" + errorMsg);
      }
    });
    
}
//record是这条记录
export let deleteMessage=function(message,key,record){
    //console.log(Object.assign({message},record));
    const _this=this;
    const { count, dataSource } = this.state;
    $.ajax({
        url: "http://localhost:8080/galary-manage/DeletemessageServlet",
        type: "POST",
        data:Object.assign({message},record),
        //dataType:"json",    //由于没有返回数据，所以不要声明返回为json，不然会报错json解析为空
        success: function(data, textStatus, jqXHR ){
          _this.setState({ 
            dataSource: dataSource.filter(item => item.key !== key) ,
            count:_this.state.count-1
          });
        },
        error: function(jqXHR, textStatus, errorMsg){
          alert("请求失败：" + errorMsg);
      }
    });
}
//message说明是哪个表，key说明是第几行数据，record就是那一行数据未修改前的值,dataIndex说明是哪个字段，value是修改的数据
export let updateMessage=function(message,key,record,dataIndex,value){
    //先检测数据格式是否正确，比如年龄必须是数字
    if(CheckValue(dataIndex,value)!="success"){
        alert(CheckValue(dataIndex,value));
        location.reload();//刷新一下页面
    }else{
      const _this=this;
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);//找到修改的是哪一列数据,这个是用于前端的
      record[dataIndex]=value;
      //console.log(Object.assign({message},{dataIndex},record));
      $.ajax({
          url: "http://localhost:8080/galary-manage/UpdatemessageServlet",
          type: "POST",
          data:Object.assign({message},{dataIndex},record),//dataIndex表示是修改了哪一个字段
          //dataType:"json",    //由于没有返回数据，所以不要声明返回为json，不然会报错json解析为空
          success: function(data, textStatus, jqXHR ){
            switch(data){
              case '1':
                alert("请先填写部门");
                location.reload();
                break;
              case '2':
                alert("职位已经存在");
                location.reload();
                break;
              case '3':
                alert("请先填写部门");
                location.reload();
                break;
              case '4':
                alert("部门或职位不存在");
                location.reload();
                break;
              default:
                if (target) {
                  target[dataIndex] = value;
                  _this.setState({ dataSource });
                }
                break;
            }
            
          },
          error: function(jqXHR, textStatus, errorMsg){
            alert("请求失败：" + errorMsg);
            //location.reload();//刷新一下页面
        }
      });
    }
}
//检测数据
function CheckValue(dataIndex,value){
  switch(dataIndex){
    case 'age':
      if(parseInt(value)>80||parseInt(value)<18){
        return '年龄应该是18到80';
      }else{
        return 'success';
      }
      break;
    case 'basepay':
      if(parseInt(value)>500000||parseInt(value)<0){
        return '工资应该在0到500000间';
      }else{
        return 'success';
      }
      break;
    case 'jan': case 'march': case 'may': case 'july': case 'aug': case 'oct': case 'dece': 
      if(parseInt(value)>31||parseInt(value)<0){
        return '大月出勤时间应该是0到31';
      }else{
        return 'success';
      }
      break;
    case 'april': case 'june': case 'sept': case 'nov': 
      if(parseInt(value)>30||parseInt(value)<0){
        return '小月出勤时间应该是0到30';
      }else{
        return 'success';
      }
      break;
    case 'feb':
      if(parseInt(value)>29||parseInt(value)<0){
        return '平月出勤时间应该是0到29';
      }else{
        return 'success';
      }
      break;
    case 'time':
      if(parseInt(value)>1000||parseInt(value)<0){
        return '数据不合理';
      }else{
        return 'success';
      }
      break;
    case 'perhour':
      if(parseInt(value)>1000||parseInt(value)<0){
        return '数据不合理';
      }else{
        return 'success';
      }
      break;
    default:
      return 'success';
  }
}