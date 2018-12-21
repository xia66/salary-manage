export class CalcAllMessage{
	constructor(key,target,value){
		this.allMessage=[];
		this.PeopleGalaryMessage=[];
		this.DepartGalaryMessage=[];
		this.DepartMonthGalaryMessage=[];
		this.key=key;	//说明是什么功能
		this.target=target;	//调用的对象
		this.value=value;//这个只在搜索时有用，搜索的值
		//先获取所有数据
		
		//计算所有人工资，把数据放入相应数组，需要的地方导入这个数组即可
		//this.calcPeopleGalaryMessage();
		//this.calcDepartGalaryMessage();
	}
	getAllMessage(){
		const _this=this;
		$.ajax({
	        url: "http://localhost:8080/galary-manage/GetusermessageServlet",
	        type: "POST",
	        data:{type:"getAllMessage"},
	        dataType:"json",    /*如果说明返回数据类型是json，那么jquery会帮我们自动将数据转化为js对象或数组*/
	        success: function(data, textStatus, jqXHR ){
	        	//console.log(data)
	            if(data){
	            	_this.allMessage=data;
	            	switch(_this.key){
	            		//所有人员详细信息表
	            		case 'PeopleGalaryMessage':
	            			_this.calcPeopleGalaryMessage();
	            			_this.target.setState({PeopleGalaryMessage:_this.PeopleGalaryMessage});
	            			break;
	            		//所有部门总工资图
	            		case 'DepartGalaryMessage':
	            			_this.calcDepartGalaryMessage();
	            			_this.target.setState({data:_this.DepartGalaryMessage});
	            			_this.target.startRender();
	            			break;
	            		//所有部门月工资走势图
	            		case 'DepartMonthGalaryMessage':
	            			_this.calcDepartMonthGalaryMessage();
	            			_this.target.setState({data:_this.DepartMonthGalaryMessage});
	            			_this.target.startRender();
	            			break;
	            		//登陆获取所有员工信息给allData,根据员工登陆的用户名和密码得到具体是哪个员工，再把这个员工信息存入store
	            		case 'getAllLoginMessage':
	            			_this.target.setState({allData:_this.allMessage});
	            			//检测登陆
	            			_this.target.startCheckStaffLogin();
	            			break;
	            		//搜索功能
	            		case 'searchStaffMessage':
	            			_this.target.setState({allData:_this.allMessage});
	            			_this.target.startSearch(_this.value);
	            			break;
	            	}
	            	//_this.calcDepartMonthGalaryMessage();
	            }
	        },
	        error: function(jqXHR, textStatus, errorMsg){
	          	//alert("请求失败：" + errorMsg);
	      	}
	    });
	}
	calcPeopleGalaryMessage(){
		let PeopleGalaryMessage=[];
		this.allMessage.forEach(function(item,index){
			const {id,name,depart,job,basepay,jan,feb,march,april,may,june,july,aug,sept,oct,nov,dece,time,perhour}=item;
			let allpay=Math.ceil((jan+feb+march+april+may+june+july+aug+sept+oct+nov+dece)*basepay/12);
			PeopleGalaryMessage[index]={key:index,id,name,depart,job,basepay,jan:Math.ceil(jan/22*basepay),feb:Math.ceil(feb/22*basepay),march:Math.ceil(march/22*basepay),april:Math.ceil(april/22*basepay),may:Math.ceil(may/22*basepay),
				june:Math.ceil(june/22*basepay),july:Math.ceil(july/22*basepay),aug:Math.ceil(aug/22*basepay),sept:Math.ceil(sept/22*basepay),oct:Math.ceil(oct/22*basepay),nov:Math.ceil(nov/22*basepay),dece:Math.ceil(dece/22*basepay),
				allpay,time,addpay:time*perhour,endpay:Math.ceil((allpay+time*perhour)/12),
			}
		});
		this.PeopleGalaryMessage=PeopleGalaryMessage;
	}
	calcDepartGalaryMessage(){
		let DepartGalaryMessage=[];
		this.allMessage.forEach(function(item,index){
			const {id,name,depart,job,basepay,jan,feb,march,april,may,june,july,aug,sept,oct,nov,dece,time,perhour}=item;
			let allpay=Math.ceil((jan+feb+march+april+may+june+july+aug+sept+oct+nov+dece)*basepay/12);
			DepartGalaryMessage[index]={
				depart,pay:allpay,
			}
		});
		//this.DepartGalaryMessage=DepartGalaryMessage;
		let tempObj={};//暂时用对象存储所有部门的工资，然后再转为类似data的数组
        DepartGalaryMessage.forEach(function(item,index){
            if(tempObj[item.depart]){
                tempObj[item.depart]+=item.pay;
            }else{
                tempObj[item.depart]=item.pay;
            }
        });
        //对象转数组
        let index=0;
        let arr=[];
        for(let key in tempObj){
            let obj={};
            obj.name=key;
            obj.value=tempObj[key];
            arr[index++]=obj;
        }
		this.DepartGalaryMessage=arr;
	}
	calcDepartMonthGalaryMessage(){
		let DepartMonthGalaryMessage=[];
		let tempArr=[];//暂时把所有人的存在这里，还没有按部门合并
		this.allMessage.forEach(function(item,index){
			const {id,name,depart,job,basepay,jan,feb,march,april,may,june,july,aug,sept,oct,nov,dece,time,perhour}=item;
			tempArr[index]={depart,value:[Math.ceil(jan/22*basepay),Math.ceil(feb/22*basepay),Math.ceil(march/22*basepay),Math.ceil(april/22*basepay),Math.ceil(may/22*basepay),Math.ceil(june/22*basepay),Math.ceil(july/22*basepay),
				Math.ceil(aug/22*basepay),Math.ceil(sept/22*basepay),Math.ceil(oct/22*basepay),Math.ceil(nov/22*basepay),Math.ceil(dece/22*basepay),]
			}
		})
		//合并暂存到一个对象
		let tempObj={};
		//console.log(tempArr);//在这里输出的如果是一个引用类型，那么下面改变了这个引用类型的话，这里输出的东西在控制台看也会改变
		tempArr.forEach(function(item,index){
			if(tempObj[item.depart]){
				item.value.forEach(function(item1,index1){
					tempObj[item.depart][index1]+=item1;
				})
			}else{
				tempObj[item.depart]=item.value;
			}
		});
		//console.log(tempObj);
		let index=0;
		let arr=[];
		for(let key in tempObj){
			let obj={};
			obj.depart=key;
			obj.value=tempObj[key];
			arr[index++]=obj;
		}
		//console.log(arr);
		this.DepartMonthGalaryMessage=arr;
	}
}