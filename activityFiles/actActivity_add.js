define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	var dataHelper = require("$UI/jrsm/js/datahelper");
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/jrsm/module/lib/utils");
	var array = require("$UI/system/lib/base/array");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");//校验
	
	var Model = function(){
		this.callParent();
	};
	
	//页面初始化
	Model.prototype.modelLoad = function(event){
		var me = this;
		me.queryStoreName();
		me.queryOneItemCatalogs();
		me.queryitemCatalogs();
		$.loadSelectValues(this.comp("queryActivityTypeData"),"act_activity_type",false);
		
	};
	
	//查询店铺，获取店铺信息
	Model.prototype.queryStoreName = function(event){
		var queryStoreNameData = this.comp('queryStoreNameData');
		var data = {};
		$.SimpleEngineeSyn("/jrsm/bdStore/query",data,queryStoreNameData,true);
	};
	
	//查询商品，获取one商品信息
	Model.prototype.queryOneItemCatalogs = function(event){
		var queryItemOneData = this.comp('queryItemOneData');
		var data2 = {};
		$.SimpleEngineeSyn("/jrsm/bdItemCatalog/queryOneLine",data2,queryItemOneData,true);
	};
	//查询商品，获取商品信息
	Model.prototype.queryitemCatalogs = function(event){
		var queryItemCatalogsData = this.comp('queryItemCatalogsData');
		var data = {};
		$.SimpleEngineeSyn("/jrsm/bdItemCatalog/queryDeleteFirst",data,queryItemCatalogsData,true);
	};
	
	
	//增加（登録）
	Model.prototype.insertClick = function(event){
		var compareArr =(this.params.postArr);
		var me = this;
		var url;
		var chargerCode1=this.comp("addActivityData").getValue("chargerCode1");
		var chargerName1=this.comp("addActivityData").getValue("chargerName1");
		var chargerNameId=this.comp("addActivityData").getValue("chargerCodeiD");
		if(chargerCode1){
			this.comp("addItemCatalogData").newData({
					"defaultValues" : [{
						itemCatalogCode : chargerCode1,
						itemCatalogName: chargerName1,
						billId: chargerNameId
					}]
				});
		}
		var addData=this.comp("addActivityData");
		var addItemCatalogData=this.comp("addItemCatalogData");
		var head=dataHelper.getHeadLieDataToJson(addData,addItemCatalogData,"bdApplyItemcatalogs"); 
		if(head.rowId){
			url = "/jrsm/actActivity/update";
		}else{
			url = "/jrsm/actActivity/insert";
		}
		
		var endDate = this.comp("addActivityData").getValue("endDate");
		if(!endDate){	//时间不能为空
			dialoghelper.error(messagehelper.get("act.activity_add.I002"));
			return;
		}
		var startDate = this.comp("addActivityData").getValue("startDate");
		if(!startDate){	//结束时间不能为空
			dialoghelper.error(messagehelper.get("act.activity_add.I001"));
			return;
		}
		if( new Date(startDate) <= new Date().setDate(new Date().getDate() -7) ){	//开始日期不能小于过去一周的日期
			dialoghelper.error("开始日期不能小于过去一周的日期。");
			return;
		}
		if(flag2 &&( new Date(startDate) < new Date() )){
			dialoghelper.error("开始日期不能小于当前日期。");
			return;
		}
		var flag1 = ( this.comp("addActivityData").getValue("endDate") <= this.comp("addActivityData").getValue("startDate") );
		if(flag1){	//时间不合法
			dialoghelper.error(messagehelper.get("act.activity_add.I003"));
			return;
		}
		var activityType = this.comp("addActivityData").getValue("activityType");
		if(!activityType){	
			dialoghelper.error(messagehelper.get("act.activity_add.I004"));
			return;
		}
		var bigCatalogId = this.comp("addActivityData").getValue("bigCatalogId");
		if(!bigCatalogId){	
			dialoghelper.error(messagehelper.get("act.activity_add.I005"));
			return;
		}
		var smallCatalogId = this.comp("addActivityData").getValue("smallCatalogId");
		if(!smallCatalogId){
			dialoghelper.error(messagehelper.get("act.activity_add.I006"));
			return;
		}
		//取值不稳定
		var itemCatalogs=this.comp("addActivityData").getValue("bdItemCatalogs");
		if(!itemCatalogs ){	
			if(!chargerCode1){
				dialoghelper.error(messagehelper.get("act.activity_add.I007"));
				return;
			}
		}
		console.log(head);
		var strCode = head.bdItemCatalogs.split(" ");
		strCode.push(chargerCode1);
		
		strCode.sort(sortNumber);
		for(var i=0; i<strCode.length; i++){	//数组去空值
			if(strCode[i] ===""){
				strCode.splice(i, 1);
				i =i -1;
			}
		}
		console.log(strCode);
		var flag=true;
		var compareInfo =  head.startDate +';'+ head.endDate +';'+ head.smallCatalogName +';'+ strCode.toString();
		console.log(compareInfo);
		compareArr.forEach(function(val){
			val.strCode.sort(sortNumber);
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
		return a.slice(1) - b.slice(1)
	}
	
	Model.prototype.resetBtnClick = function(event){
		this.comp("addActivityData").clear();
		this.close();
		this.comp("addActivityData").refreshData();
		linesNo=0;
		lineId=0;
	};
	var flag2 = false;
	Model.prototype.modelParamsReceive = function(event){
		var addData=this.comp("addActivityData");
		addData.clear();
		var rowId =  this.params.rowId;
		$.loadSelectValues(this.comp("queryActivityTypeData"),"act_activity_type",false);	
	
		//判断rowId是否有值，有则编辑
		var _this=this;
		if(rowId){
			global.ajax({
				url:"/jrsm/actActivity/queryActivity",
				data:{rowId:rowId},
				success: function(Data){
					addData.newData({
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
					
					var codes="";
					var item=Data.data[0].bdApplyItemcatalogs;
					var catalogCode =_this.comp("queryItemOneData").getValue("catalogCode");
					for(var index in item){
						codes+=item[index].itemCatalogCode+" ";
						if(item[index].itemCatalogCode==catalogCode){
							addData.setValue("chargerCode1",catalogCode);
							addData.setValue("chargerCodeiD",110 );
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
						var data ={
								val: bigCatalogId
							};
						_this.select3Change(data);
					}
					_this.sourceItems=codes;//保存原有的商品code用来区分新增或编辑
					codes=codes.substring(0,codes.length-1);
					_this.comp("checkboxGroup2").val(codes);
					if(codes){
						var data ={
								aa:codes
							};
						_this.checkboxGroup2Change(data);
					}
					if( Data.data[0].dataFrom =="BATCH"){
						$("#activityType").attr("disabled","true");
						$("#bigCatalog input").attr("disabled","true");
						$("#smallCatalog input").attr("disabled","true");
						$("#checkbox_group1 input").attr("disabled","true");
						$("#checkbox_group2 input").attr("disabled","true");
						if( Data.data[0].bigCatalogName =="促销活动"){
							$("#startTime").attr("disabled","true");
							$("#endTime").attr("disabled","true");
						}
						flag2 = true;
					}
					if( (Data.data[0].dataFrom =="BATCH")&&( Data.data[0].bigCatalogName =="促销活动")){
						$("#login_save").attr("disabled",true);
					}else{
						$("#login_save").attr("disabled",false);
					}
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
		} else{
		//新增
			addData.newData({
				"defaultValues" : [{
					storeName : this.params.shopName,
					storeCode : this.params.shopId,
					chargerCode: this.params.userId,
					chargerName: this.params.userName,
					startDate: this.params.the_start_time,
					endDate: this.params.the_start_time,
					bigCatalogId:"",
					smallCatalogId:"",
					itemCatalogs: "",
					chargerCode1: ""
				}]
			});
		}
		
	};
	
	//级联选择类型
	Model.prototype.queryBigCatalog = function(event){
		if(event.val){
			var value=event.value;
		}else{
			var value=event.source.val();
			this.comp("addActivityData").setValue("bigCatalogName",null);
			this.comp("addActivityData").setValue("bigCatalogId",null);		
			this.comp("addActivityData").setValue("smallCatalogId",null);
			this.comp("addActivityData").setValue("smallCatalogName",null);
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
		if(event.val){
			var value=event.value;
			var data = {
			"parentId":value,
			"typeCatalog" : "S"
			};
		}else{
			var value=event.source.value;
			this.comp("addActivityData").setValue("smallTypeName",null);
			this.comp("addActivityData").setValue("smallCatalogId",null);
			this.comp("addActivityData").setValue("smallCatalogName",null);
			
			//选择大类型时将颜色和名称带过去存到活动表里面
			var typeColor;
			var row = this.comp("bigTypeNameData").find([ "rowId" ], [ value ]);
			if (row.length > 0) {
				typeColor = row[0].val("typeColor");
			}
			var typeName;
			var row = this.comp("bigTypeNameData").find([ "rowId" ], [ value ]);
			if (row.length > 0) {
				typeName = row[0].val("typeName");
			}
			this.comp("addActivityData").setValue("displayColor",typeColor);
			this.comp("addActivityData").setValue("bigCatalogName",typeName);
			var data = {
			"parentId":value,
			"typeCatalog" : "S"
			};
		}
		var smallTypeNameData = this.comp('smallTypeNameData');
		
		$.SimpleEngineeSyn("/jrsm/actActivityType/queryByAdd", data, smallTypeNameData, true);
	};
	
	//小类型，根据大类型（父类），来展示
//	Model.prototype.select4Change = function(event){
//		//选择小类型时将名称带过去存到活动表里面
//		var value=event.source.value;
//		var typeName;
//		var row = this.comp("smallTypeNameData").find([ "rowId" ], [ value ]);
//		if (row.length > 0) {
//			typeName = row[0].val("typeName");
//		}
//		this.comp("addActivityData").setValue("smallCatalogName",typeName);
//	};
	
	Model.prototype.checkboxGroup3Change = function(event){
	//选中复选框提交，将复选框的名称set进去，存到数据库里,单个
		var value=event.source.val();
		var catalogName="";
		var codes=value.split(" ");		
		var chargerCodeiD = this.comp("addActivityData").getValue("chargerCodeiD");
		for(var item in codes) {
			var row = this.comp("queryItemOneData").find([ "catalogCode" ], [ codes[item] ]);
			if (row.length > 0) {
				event.html =row[0].val("catalogName");
			}
		}
		if(chargerCodeiD){
			if(!value){
				this.comp("addActivityData").setValue("chargerName1","");
				this.comp("addActivityData").setValue("chargerCodeiD",-1);
			}else{
				this.comp("addActivityData").setValue("chargerName1",row[0].val("catalogName"));
				this.comp("addActivityData").setValue("chargerCodeiD",100);
			}
		}else{
			if(!value){
				this.comp("addActivityData").setValue("chargerName1","");
				this.comp("addActivityData").setValue("chargerCodeiD","");
			}else{
				this.comp("addActivityData").setValue("chargerName1",row[0].val("catalogName"));
			}
		}	
		
	};
	Model.prototype.checkboxGroup2Change = function(event){
		//选中复选框提交，将复选框的名称set进去，存到数据库里
		if(event.aa){
			var value=event.aa;
		}else{
			var value=event.source.val();
		}
		
		
		var catalogName="";
		var codes=value.split(" ");
		var sourceItems=this.sourceItems==null?" ":this.sourceItems;
		this.comp("addItemCatalogData").clear();
		var hasArray=new Array();
		for(var item in codes) {
				var row = this.comp("queryItemCatalogsData").find([ "catalogCode" ], [ codes[item] ]);
				if (row.length > 0) {
					catalogName= row[0].val("catalogName");
				}
				
				var billId="";
				if(sourceItems.indexOf(codes[item]+" ")!=-1)
				{
					billId=this.comp("addActivityData").val("rowId");
					hasArray.push(codes[item]);
				}
				
				this.comp("addItemCatalogData").newData({
					"defaultValues" : [{
						itemCatalogCode : codes[item],
						itemCatalogName: catalogName,
						billId: billId
					}]
				});
			}
		var sourceItemsArray=sourceItems.split(" ");
		for(var item in sourceItemsArray) {//原先的数据   hasArray已选的数据
			var sourceItem=sourceItemsArray[item];
			if(sourceItem=="")
			{
				continue;
			}
			var index=array.indexOf(hasArray,sourceItem);
			if(index==-1)
			{
				var catalogName="";
				var row = this.comp("queryItemCatalogsData").find([ "catalogCode" ], [ sourceItem ]);
				if (row.length > 0) {
					catalogName= row[0].val("catalogName");
				}
				
				this.comp("addItemCatalogData").newData({
					"defaultValues" : [{
						itemCatalogCode : sourceItemsArray[item],
						itemCatalogName: catalogName,
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