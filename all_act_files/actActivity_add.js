define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	var dataHelper = require("$UI/jrsm/js/datahelper");
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/jrsm/module/lib/utils");
	var array = require("$UI/system/lib/base/array");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");//校验
	
	var flag2 = false;
	var rowId;
	var initStartTime;		//修改模式的页面初始化带过来的开始时间
	var initEndTime;		//修改模式的页面初始化带过来的结束时间
	var addActivityData;
	var serverTime = global.getServiceTime();
	var Model = function(){
		this.callParent();
	};
	
	//页面初始化
	Model.prototype.modelLoad = function(event){
		addActivityData = this.comp("addActivityData");
		this.queryStoreName();
		this.queryitemCatalogs();
		$.loadSelectValues(this.comp("queryActivityTypeData"),"act_activity_type",false);
	};
	
	Model.prototype.modelParamsReceive = function(event){
		addActivityData.clear();
		rowId =  this.params.rowId;
		var _this=this;
		if(rowId){			//判断rowId是否有值，有则编辑
			global.ajax({
				url:"/jrsm/actActivity/queryActivity",
				data:{rowId:rowId},
				success: function(Data){
					addActivityData.newData({
						"defaultValues" : [{
							rowId: Data.data[0].rowId,
							displayColor : Data.data[0].displayColor,
							storeCode : Data.data[0].storeCode,
							storeName : Data.data[0].storeName,
							chargerCode: Data.data[0].chargerCode,
							chargerName: Data.data[0].chargerName,
							startDate: Data.data[0].startDate.split(" ")[0],
							endDate: Data.data[0].endDate.split(" ")[0],
							activityType: Data.data[0].activityType,
							bigCatalogId: Data.data[0].bigCatalogId,
							smallCatalogId: Data.data[0].smallCatalogId,
							dataFrom: Data.data[0].dataFrom,
							bigCatalogName: Data.data[0].bigCatalogName,
							smallCatalogName: Data.data[0].smallCatalogName,
							bdItemCatalogs: Data.data[0].bdApplyItemcatalogs,
						}]
					});
					initStartTime = Data.data[0].startDate.split(" ")[0];
					initEndTime = Data.data[0].endDate.split(" ")[0];
					var codes="";
					var item = Data.data[0].bdApplyItemcatalogs;		//请求得到的商品
					var catalogCode =_this.comp("queryItemOneData").getValue("catalogCode");
					for(var index in item){
						codes += item[index].itemCatalogCode+" ";
						if(item[index].itemCatalogCode == catalogCode){
							addActivityData.setValue("chargerCode1",catalogCode);
							addActivityData.setValue("chargerCodeiD",110 );
						}
					}
					var activityType = Data.data[0].activityType;
					if(activityType){
						var data ={
							val:activityType
						};
						_this.queryBigCatalog(data);
					}
					var bigCatalogId = Data.data[0].bigCatalogId;
					if(bigCatalogId){
						var data2 ={
								val: bigCatalogId
							};
						_this.select3Change(data2);
					}
					_this.sourceItems = codes;//保存原有的商品code用来区分新增或编辑
					codes = codes.substring(0,codes.length-1);
					_this.comp("checkboxGroup2").val(codes);
					if(codes){
						var data3 ={
								aa:codes
							};
						_this.checkboxGroup2Change(data3);
					}
					if(Data.data[0].actiivityStatus){			//如果有施策状态的，施策类型不可修改
						$("#activityType").attr("disabled","true");
						$("#bigCatalog input").attr("disabled","true");
						$("#smallCatalog input").attr("disabled","true");
					}
					if( new Date(initStartTime) <= new Date(serverTime) ){	//开始时间小于系统时间的，时间不能修改，灰掉！
						$("#startTime").attr("disabled","true");
					}
					if( new Date(initEndTime) <= new Date(serverTime) ){	//结束时间时间小于系统时间的，时间不能修改，灰掉！
						$("#endTime").attr("disabled","true");
					}
					//对总部一括录入施策(“BATCH”)
					if( Data.data[0].dataFrom =="BATCH"){					// 一括录入（“BATCH”）开始时间不能修改，灰掉！
						$("#activityType").attr("disabled","true");
						$("#bigCatalog input").attr("disabled","true");
						$("#smallCatalog input").attr("disabled","true");
						$("#checkbox_group1 input").attr("disabled","true");
						$("#checkbox_group2 input").attr("disabled","true");
						$("#startTime").attr("disabled","true");
						if( new Date(initEndTime) <= new Date(serverTime) ){	//结束时间时间小于系统时间的，不能修改，灰掉！
							$("#endTime").attr("disabled","true");
							$("#login_save").attr("disabled","true");
						}
						flag2 = true;
					}
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
		} else{
		//新增
			addActivityData.newData({
				"defaultValues" : [{
					storeName : this.params.shopName,
					storeCode : this.params.shopId,
					chargerCode: this.params.userId,
					chargerName: this.params.userName,
					startDate: this.params.the_start_time,
					endDate: this.params.the_start_time,
					bigCatalogId:"",
					smallCatalogId:"",
					bdItemCatalogs: "",
					chargerCode1: ""
				}]
			});
		}
		//
		setTimeout(function(){
			$("#checkbox_group2").find("label").eq(1).css("margin-right","400px");
		},300);
		
	};
	//查询店铺，获取店铺信息
	Model.prototype.queryStoreName = function(event){
		var queryStoreNameData = this.comp('queryStoreNameData');
		var data = {};
		$.SimpleEngineeSyn("/jrsm/bdStore/query",data,queryStoreNameData,true);
	};

	//查询商品，获取商品信息
	Model.prototype.queryitemCatalogs = function(event){
		var queryItemCatalogsData = this.comp('queryItemCatalogsData');
		var data = {};
		$.SimpleEngineeSyn("/jrsm/bdItemCatalog/selectListAll",data,queryItemCatalogsData,true);
	};
	function unique(arr){
		for(var m=0; m<arr.length; m++){
			for(var n= m+1; n<arr.length; n++){
				if((arr[n].createdBy ===arr[m].createdBy) && (arr[n].storeId ===arr[m].storeId)){
					arr.splice(n, 1);
					n--;
				}
			}
		}
		return arr;
	}
	
	//增加（登録）保存按钮
	Model.prototype.insertClick = function(event){
		var compareArr =(this.params.postArr);
		var me = this;
		var url;
		var chargerCode1= addActivityData.getValue("chargerCode1");
		var chargerName1= addActivityData.getValue("chargerName1");
		var chargerNameId= addActivityData.getValue("chargerCodeiD");
		if(chargerCode1){
			this.comp("addItemCatalogData").newData({
				"defaultValues" : [{
					itemCatalogCode : chargerCode1,
					itemCatalogName: chargerName1,
					billId: chargerNameId
				}]
			});
		}
		var addItemCatalogData = this.comp("addItemCatalogData");
		var head = dataHelper.getHeadLieDataToJson( addActivityData, addItemCatalogData,"bdApplyItemcatalogs");
		var startDate = addActivityData.getValue("startDate");
		var endDate = addActivityData.getValue("endDate");

		if(head.rowId){
			url = "/jrsm/actActivity/update";
			//修改计划的开始日期不能小于过去一周的日期(修改开始日期以后做判断,没有修改日期不做判断);
//			if((startDate != initStartTime) &&( new Date(startDate) <= new Date(serverTime).setDate(new Date(serverTime).getDate() -7) )){
//				dialoghelper.error(messagehelper.get("act.activity_add.I011"));
//				return;
//			}
		}else{
			url = "/jrsm/actActivity/insert";
			//新增计划的开始日期不能小于当前日期
			if( new Date(startDate) <= new Date(serverTime) ){	
				dialoghelper.error(messagehelper.get("act.activity_add.I010"));
				return;
			}
		}
		if(!startDate){	//开始时间不能为空
			dialoghelper.error(messagehelper.get("act.activity_add.I001"));
			return;
		}
		if(!endDate){	//结束时间不能为空
			dialoghelper.error(messagehelper.get("act.activity_add.I002"));
			return;
		}
		
		if(flag2){												//针对一括录入的
			if( new Date(endDate) < new Date(serverTime) ){		//一括录入的修改结束时间只能大于系统时间
				dialoghelper.error(messagehelper.get("act.activity_add.I012"));
				return;
			}else if( new Date(endDate) < new Date(initEndTime) ){	//一括录入的修改结束时间只能大于原有时间
				dialoghelper.error(messagehelper.get("act.activity_add.I013"));
				return;
			}
		}

		if( endDate < startDate ){	//时间不合法
			dialoghelper.error(messagehelper.get("act.activity_add.I003"));
			return;
		}
		var activityType = addActivityData.getValue("activityType");
		if(!activityType){	
			dialoghelper.error(messagehelper.get("act.activity_add.I004"));
			return;
		}
		var bigCatalogId = addActivityData.getValue("bigCatalogId");
		if(!bigCatalogId){	
			dialoghelper.error(messagehelper.get("act.activity_add.I005"));
			return;
		}
		var smallCatalogId = addActivityData.getValue("smallCatalogId");
		if(!smallCatalogId){
			dialoghelper.error(messagehelper.get("act.activity_add.I006"));
			return;
		}
		var itemCatalogs = addActivityData.getValue("bdItemCatalogs");
		if(!itemCatalogs ){	
			if(!chargerCode1){
				dialoghelper.error(messagehelper.get("act.activity_add.I007"));
				return;
			}
		}
		var strCode = head.bdItemCatalogs.split(" ");
		strCode.push(chargerCode1);
		for(var i=0; i<strCode.length; i++){	//数组去空值
			if(strCode[i] ===""){
				strCode.splice(i, 1);
				i--;
			}
		}

		var flag=true;
		var compareInfo =  head.startDate +';'+ head.endDate +';'+ head.smallCatalogName +';'+ strCode.toString();
		console.log(compareInfo);
		compareArr.forEach(function(val){
//			if(val.strCode.length >1) val.strCode.sort(sortNumber);
			var compare_everyArr =val.startTime +';'+ val.endTime +';'+ val.smallCatalogName +';'+ val.strCode.toString();
			if(compare_everyArr === compareInfo){
				flag = false;
				dialoghelper.error(messagehelper.get("act.activity_add.I008"));
			}
		});
		if(flag){
			global.ajax({
				url:url,
				data:head,
				async:false,
				success: function(Data){
					me.resetBtnClick();
					me.close();
					me.owner.send(head,itemCatalogs);
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
			parent.queryActivity();
		}
	};
	function sortNumber(a,b){
		return a.slice(1) - b.slice(1);
	}
	
	Model.prototype.resetBtnClick = function(event){
		addActivityData.clear();
		this.close();
		addActivityData.refreshData();
	};
	
	
	//级联选择类型
	Model.prototype.queryBigCatalog = function(event){
		var value;
		if(event.val){
			value=event.val;
		}else{
			value=event.source.val();
			addActivityData.setValue("bigCatalogName",null);
			addActivityData.setValue("bigCatalogId",null);		
			addActivityData.setValue("smallCatalogId",null);
			addActivityData.setValue("smallCatalogName",null);
		}
		var bigTypeNameData = this.comp('bigTypeNameData');
		if(value == "A"){
			value = "N";
		}
		if(value == "B"){
			value = "Y";
		}
		var data = {
			"processFlag" : value,
			"typeCatalog" : "D"
		};
		$.SimpleEngineeSyn("/jrsm/actActivityType/queryByAdd", data, bigTypeNameData, true);
	};
	
	//大类型
	Model.prototype.select3Change = function(event){
		var data;
		if(event.val){
			var value2=event.val;
			 data = {
				"parentId":value2,
				"typeCatalog" : "S"
			};
		}else{
			var value=event.source.value;
			addActivityData.setValue("smallTypeName",null);
			addActivityData.setValue("smallCatalogId",null);
			addActivityData.setValue("smallCatalogName",null);
			
			//选择大类型时将颜色和名称带过去存到活动表里面
			var typeColor;
			var typeName;
			var row = this.comp("bigTypeNameData").find([ "rowId" ], [ value ]);
			if (row.length > 0) {
				typeColor = row[0].val("typeColor");
				typeName = row[0].val("typeName");
			}
			addActivityData.setValue("displayColor",typeColor);
			addActivityData.setValue("bigCatalogName",typeName);
			 data = {
				"parentId":value,
				"typeCatalog" : "S"
			};
		}
		var smallTypeNameData = this.comp('smallTypeNameData');
		
		$.SimpleEngineeSyn("/jrsm/actActivityType/queryByAdd", data, smallTypeNameData, true);
	};

	Model.prototype.checkboxGroup2Change = function(event){
		//选中复选框提交，将复选框的名称set进去，存到数据库里
		var value;
		if(event.aa){
			 value=event.aa;
		}else{
			 value= event.source.val();
		}
		var catalogName="";
		var codes=value.split(" ");
		var sourceItems=this.sourceItems===null?" ":this.sourceItems;

		this.comp("addItemCatalogData").clear();
		var hasArray= [];
		for(var item in codes) {
			var row = this.comp("queryItemCatalogsData").find([ "catalogCode" ], [ codes[item] ]);
			if (row.length > 0) {
				catalogName= row[0].val("catalogName");
			}
			var billId="";
			if(sourceItems){
				if(sourceItems.indexOf(codes[item]+" ")!=-1){
					billId = addActivityData.val("rowId");
					hasArray.push(codes[item]);
				}
			}
			this.comp("addItemCatalogData").newData({
				"defaultValues" : [{
					itemCatalogCode : codes[item],
					itemCatalogName: catalogName,
					billId: billId
				}]
			});
		}
		var sourceItemsArray = [];
		if(sourceItems){
			sourceItemsArray = sourceItems.split(" ");
		}
		for(var item in sourceItemsArray) {			//原先的数据   hasArray已选的数据
			var sourceItem = sourceItemsArray[item];
			if(sourceItem ===""){
				continue;
			}
			var index = array.indexOf(hasArray,sourceItem);
			if(index ==-1){
				var catalogName2 ="";
				var row2 = this.comp("queryItemCatalogsData").find([ "catalogCode" ], [ sourceItem ]);
				if (row2.length > 0) {
					catalogName2 = row2[0].val("catalogName");
				}
				
				this.comp("addItemCatalogData").newData({
					"defaultValues" : [{
						itemCatalogCode : sourceItemsArray[item],
						itemCatalogName: catalogName2,
						billId: "-1"
					}]
				});
				
			}		
		}
	};
	
	var parent;
	Model.prototype.windowReceiver1Receive = function(event){
		parent = event.sender.getModel();
	};
	

	return Model;
});