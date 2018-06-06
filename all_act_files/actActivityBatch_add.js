define(function(require){
	var $ = require("jquery");
	var global = require("$UI/portal/base/global");
	var dataHelper = require("$UI/jrsm/js/datahelper");
	var justep = require("$UI/system/lib/justep");
	var messagehelper = require("$UI/jrsm/js/message");
	var CheckBoxGroup=require("$UI/system/components/justep/select/checkboxGroup");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var jrsmCom =	require("$UI/jrsm/js/jrsm.util");
	require("$UI/jrsm/module/lib/utils");
	var array = require("$UI/system/lib/base/array");
	
	
	var Model = function(){
		this.callParent();
	};
	var readonlyFlag = false;
	var addActivityBatchData;
	var initEndDate;
	var serverTime = global.getServiceTime();
	//初始化页面
	Model.prototype.modelLoad = function(event){
		addActivityBatchData = this.comp("addActivityBatchData");
		addActivityBatchData.clear();
		$.loadSelectValues(this.comp("toshibaStoreTypeData"),"act_cust_type");
		this.queryBigType();//获取类型
		this.queryitemCatalogs();//获取商品	
	};

	//查询类型D  过程管理分类N
	Model.prototype.queryBigType = function(event){
		var bigTypeNameData = this.comp('bigTypeNameData');
		var data = {
			"typeCatalog" : "D",
			"processFlag" : "N"
		};
		$.SimpleEngineeSyn("/jrsm/actActivityType/query", data, bigTypeNameData, true);
	};
	//查询商品S
	Model.prototype.queryitemCatalogs = function(event){
		var queryItemCatalogsData = this.comp('queryItemCatalogsData');
		var data2 = {};
		$.SimpleEngineeSyn("/jrsm/bdItemCatalog/selectListAll",data2,queryItemCatalogsData,true);
	};
	//级联，点击大类型时，将子类型加载出来
	Model.prototype.querySmallType = function(event){
		var value = event.source.value;
		var smallTypeNameData = this.comp('smallTypeNameData');
		addActivityBatchData.setValue("smallCatalogName",null);
		addActivityBatchData.setValue("smallCatalogId",null);
		var data = {
			"parentId":value,
			"typeCatalog" : "S",
			"activeFlag" : "Y"
		};
		//将名称带过去存到数据库里
		var row = this.comp("bigTypeNameData").find([ "rowId" ], [ value ]);
		if (row.length > 0) {
			addActivityBatchData.setValue("displayColor", row[0].val("typeColor"));
			addActivityBatchData.setValue("bigCatalogName", row[0].val("typeName"));
		}
		$.SimpleEngineeSyn("/jrsm/actActivityType/queryByBatch", data, smallTypeNameData, true);
	};
	//将选中的类型名称存到数据库里
	Model.prototype.addSmallTypeName = function(event){
		var value=event.source.value;
		var row = this.comp("smallTypeNameData").find([ "rowId" ], [ value ]);
		if (row.length > 0) {
			addActivityBatchData.setValue("smallCatalogName", row[0].val("typeName"));
		}
		
	};
	Model.prototype.button7Click = function(event){
		this.close();
	};
	//输出格式化时间
	function format(date){
		var rightMonth = (date.getMonth() +1) <10 ?'0'+(date.getMonth() +1) : (date.getMonth() +1);
		var rightDate = date.getDate() <10 ?'0'+date.getDate() :date.getDate();
		var ret = date.getFullYear() +'-'+ rightMonth +'-'+ rightDate;
		return ret;
	}
	
	Model.prototype.modelParamsReceive = function(event){
		var rowId = this.getContext().getRequestParameter('rowId');
		readonlyFlag = this.getContext().getRequestParameter('rowId') ?true :false;
		var addBdApplyStoreData = this.comp("addBdApplyStoreData");
		var showData = this.comp("showData");
		this.comp("grid111").on("onCellRender", this.grid1CellRender, this);
		this.comp("grid111").on("onRowClick", this.itemRowClick, this);
		var _this=this;
		//判断rowId是否有值，有则编辑
		if(rowId){
			global.ajax({
				url:"/jrsm/actActivityBatch/query",
				data:{rowId:rowId},
				success: function(Data){
					_this.comp("input3").val(jrsmCom.TimeToData(Data.data[0].startDate));
					_this.comp("input4").val(jrsmCom.TimeToData(Data.data[0].endDate));
					addActivityBatchData.clear();
					addActivityBatchData.loadData(Data.data);
					initEndDate = Data.data[0].endDate.split(" ")[0];
					addActivityBatchData.refreshData();
					for(var i=0 ;i<(Data.data[0].bdApplyStores).length; i++){
						if(!(Data.data[0].bdApplyStores[i]).storeCode){
							Data.data[0].bdApplyStores.splice(i, 1);
						}
					}
					addBdApplyStoreData.clear();
					addBdApplyStoreData.loadData(Data.data[0].bdApplyStores);
					addBdApplyStoreData.refreshData();
					
					var rows = _this.comp('data1').find(['id'],[Data.data[0].storeSelectType]);
					_this.comp('data1').to(rows[0]);
					var codes ="";
					var item = Data.data[0].bdApplyItemcatalogs;
					for(var index in item){
						codes += item[index].itemCatalogCode+" ";
					}
					_this.sourceItems = codes;//保存原有的商品code用来区分新增或编辑
					codes = codes.substring(0,codes.length-1);
					_this.comp("itemCatalogsClickCheckboxGroup2").val(codes);
					if(codes){
						var data2 = {
								abc: codes
							};
						_this.itemCatalogsClick(data2);
					}
					showData.clear();
					showData.newData();
					showData.setValue("storeCount", (Data.data[0].bdApplyStores).length);
					//修改模式下，禁用按钮
					$("#checkbox_grp1 input").attr("disabled","true");
					$(_this.getElementByXid("input3")).attr("disabled","true");
					$(_this.getElementByXid("gridSelect1")).find("input").attr("disabled","true");
					$(_this.getElementByXid("gridSelect2")).find("input").attr("disabled","true");
					$(_this.getElementByXid("gridSelect3")).attr("disabled","true");
					_this.comp("radioPC111").set("disabled", true);
					_this.comp("radioPC211").set("disabled", true);
					_this.comp("radioPC311").set("disabled", true);
					_this.comp("radioPC411").set("disabled", true);
					_this.comp("button111").set("disabled", true);
					_this.comp("button1").set("disabled", true);
					_this.comp("button211").set("disabled", true);
					_this.comp("button311").set("disabled", true);
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
		} else{		//新增
			addActivityBatchData.newData({
				"defaultValues" : [{
					itemCatalogs:"",
					startDate:"",
					dataFrom:"BATCH",
					endDate:"",
					bigCatalogId:"",
					smallCatalogId:"",
					toshibaStoreType:"",
					bdApplyStores:""
				}]
			});
			showData.clear();
			showData.newData();
			_this.comp("input3").val(serverTime);	//默认开始时间
			_this.comp("input4").val(serverTime);	//默认结束时间
		}
		setTimeout(function(){
			$("#checkbox_grp1").find("label").eq(1).css("margin-right","2000px");
		},800);
//		if ($('div').hasClass('jrsm-tab-window')) {
//			$('.x-contents ').css({
//				"overflow" : "hidden"
//			});
//			$.setNiceScrollByObj($('.jrsm-tab-window'));	//页面加滚动条
//		}
//		$.resizeScrollByObj($('.jrsm-tab-window'));
	};
	//增加（登録）保存按钮
	Model.prototype.insertClick = function(event){
		var me = this;
		var url;
		addActivityBatchData.setValue("storeSelectType",this.comp("data1").getValue("radio"));
		var chargerCode1= addActivityBatchData.getValue("chargerCode1");
		var chargerName1= addActivityBatchData.getValue("chargerName1");
		var chargerNameId= addActivityBatchData.getValue("chargerCodeiD");
		if(chargerCode1){
			this.comp("addItemCatalogData").newData({
				"defaultValues" : [{
					itemCatalogCode : chargerCode1,
					itemCatalogName: chargerName1,
					billId: chargerNameId
				}]
			});
		}
		var data1 = this.comp("input4").val();	//结束时间
		var data3 = this.comp("input3").val();	//开始时间
		data1 =data1+" 08:00:00";
		data3 =data3+" 09:00:00";
		addActivityBatchData.setValue("endDate",data1);
		addActivityBatchData.setValue("startDate",data3);
			
		var addItemCatalogData = this.comp("addItemCatalogData");//商品
		var addBdApplyStoreData = this.comp("addBdApplyStoreData");//店铺
		
		var changeData = addBdApplyStoreData.toJson({"onlyChanged":false,"format":"simple"});
		var head=dataHelper.getHeadListDataToJson(addActivityBatchData,addItemCatalogData,"bdApplyItemcatalogs");
		head.bdApplyStores = changeData.rows;
//		if( this.delArray){
//			head.bdApplyStores = changeData.rows.concat(this.delArray);
//		}
		var itemCatalogs = addActivityBatchData.val("itemCatalogs");
		
		data1 = jrsmCom.TimeToData(data1);
		addActivityBatchData.setValue("endDate",data1);
		data3 = jrsmCom.TimeToData(data3);
		addActivityBatchData.setValue("startDate",data3);
		//
		if(!head.rowId){
			if(head.bdItemCatalogs ===""){
				dialoghelper.error(messagehelper.get("act.activity_add.I007"));
				return;
			}
		}
		if(!data1){	//结束时间不能为空
			dialoghelper.error(messagehelper.get("act.activity_add.I002"));
			return;
		}
		if(!data3){	//开始时间不能为空
			dialoghelper.error(messagehelper.get("act.activity_add.I001"));
			return;
		}
		if( data3 < format(new Date(serverTime)) ){		//开始日期不能小于当前日期
			dialoghelper.error(messagehelper.get("act.activity_add.I010"));
			return;
		}
		if(data1 < data3 ){								//期间的结束日期要大于开始日期。
			dialoghelper.error(messagehelper.get("act.activity_add.I003"));
			return;
		}
		if(head.rowId &&(data1 < initEndDate )){		//结束日期不能小于初始结束日期
			dialoghelper.error(messagehelper.get("act.activity_add.I013"));
			return;
		}
		if(head.bigCatalogName ===""){
			dialoghelper.error(messagehelper.get("act.activity_add.I005"));
			return;
		}
		if(head.smallCatalogId ==="null"){
			dialoghelper.error(messagehelper.get("act.activity_add.I006"));
			return;
		}
		if(!changeData.rows[0]){
			dialoghelper.error(messagehelper.get("act.activity_add.I009"));
			return;
		}
		if(head.rowId){
			url = "/jrsm/actActivityBatch/update";
		}else{
			url = "/jrsm/actActivityBatch/insertByStatus";
		}
		global.ajax({	    
			url:url,
			data:head,
			success: function(Data){
				if (Data.__statusCode=='S'){
					me.resetBtnClick();
					me.owner.send(head,itemCatalogs);
					me.getParent().closeTab();//关闭当前Tab
					//调用一括预览页面
					parent.activeMainTab();
					//判断actActivityBacth页面是否为空
					if(parent.lastParent){			//调用actActivityBacth里的queryClick()方法
						parent.lastParent.queryClick();
					}
				}else{
					dialoghelper.exception(Data);
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	


	Model.prototype.resetBtnClick = function(event){
		addActivityBatchData.clear();
		addActivityBatchData.refreshData();
	};
	
	//添加删除按钮
	Model.prototype.grid1CellRender = function(event) {
		if (event.colName == 'operation') {
			if(readonlyFlag){
				event.html = "<a href='#' editable='false' style='color:#ccc !important'  class='mdm-grid-cell-a' title='" + messagehelper.get("msgDial.delete") + "'>"+ messagehelper.get("msgDial.delete") + "</a>";
			}else{
				event.html = "<a href='#' class='mdm-grid-cell-a deleteBtn' title='" + messagehelper.get("msgDial.delete") + "'>"+ messagehelper.get("msgDial.delete") + "</a>";
			}
		}
	};
	Model.prototype.itemRowClick = function(event) {
		var row = event.row;
		var domButton = $(event.domEvent.target);// 获取点击的元素
		var lookupData = this.comp("addBdApplyStoreData");
		var rowId;
		this.delArray=[];
		if (domButton.hasClass("deleteBtn")) {// 判断是否包含某个样式
			rowId = row.row.rowId.value.latestValue;// 获取rowId 
			lookupData.confirmDelete = false;
			lookupData.directDeleteMode = true;
			lookupData.deleteData(row);
			if(rowId>0)	this.delArray.push({"rowId":rowId,"billId":"-1"});
		}
		var storeCount = this.comp("showData").getValue("storeCount");
		storeCount--;
		if(storeCount <= 0){
			this.comp("showData").clear();
			return;
		}
		this.comp("showData").setValue("storeCount", storeCount);
	};
	function replaceEmpty(arr){
		for(var i=0; i<arr.length; i++){
			if(!arr[i] || arr[i] ===" "){
				arr.splice(i,1);
			}
		}
		return arr;
	}
	//点击商品事件（勾选）
	Model.prototype.itemCatalogsClick = function(event){
		//选中复选框提交，将复选框的名称set进去，存到数据库里
		var value;
		if(event.abc){
			 value = event.abc;
		}else{
			 value = event.source.val();
		}
		var catalogName ="";
		var codes = value.split(" ");
		var sourceItems = this.sourceItems===null ?" " :this.sourceItems;
		this.comp("addItemCatalogData").clear();
		var hasArray =[];
		for(var item in codes) {
			var row = this.comp("queryItemCatalogsData").find([ "catalogCode" ], [ codes[item] ]);
			if (row.length > 0) {
				catalogName= row[0].val("catalogName");
			}
			var billId="";
			if(sourceItems){
				if(sourceItems.indexOf(codes[item]+" ")!=-1){
					billId= addActivityBatchData.val("rowId");
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
		sourceItemsArray = replaceEmpty(sourceItemsArray);
		for(var item2 in sourceItemsArray) {//原先的数据   hasArray已选的数据
			var sourceItem = sourceItemsArray[item2];
			if(sourceItem ===""){
				continue;
			}
			var index=array.indexOf(hasArray,sourceItem);
			if(index ==-1){
				var catalogName2="";
				var row2 = this.comp("queryItemCatalogsData").find([ "catalogCode" ], [ sourceItem ]);
				if (row2.length > 0) {
					catalogName2= row2[0].val("catalogName");
				}
				this.comp("addItemCatalogData").newData({
					"defaultValues" : [{
						itemCatalogCode : sourceItemsArray[item2],
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
	
	//导入
	Model.prototype.button311Click = function(event){
		var addBdApplyStoreData = this.comp("addBdApplyStoreData");
		var showData = this.comp("showData");
		this.comp("importWd").open({
			data : {
				url : "/jrsm/actActivityBatch/actActivityBatchImportStore",
				accept : ".xls,.xlsx"
			},
		});
		this.comp("importWd").on('onReceive', function(rowData) {
			addBdApplyStoreData.clear();
			addBdApplyStoreData.loadData(rowData.data);
			addBdApplyStoreData.refreshData();
			showData.clear();
			showData.newData();
			showData.setValue("storeCount", rowData.data.length );
		}, this);
		
	};
	
	//选中东芝店铺级别
	Model.prototype.radioPC111Change = function(event){
		this.comp("gridSelect3").set({"disabled" : false});
		this.comp("addBdApplyStoreData").clear();
		this.comp("showData").clear();
		this.comp("gridSelect3").val("");
	};
	
	Model.prototype.radioPC211Change = function(event){
		this.comp("gridSelect3").set({"disabled" : true});
		this.comp("addBdApplyStoreData").clear();
		this.comp("showData").clear();
		this.comp("gridSelect3").val("");
	};
	
	Model.prototype.radioPC311Change = function(event){
		this.comp("gridSelect3").set({"disabled" : true});
		this.comp("addBdApplyStoreData").clear();
		this.comp("showData").clear();
		this.comp("gridSelect3").val("");
	};
	
	Model.prototype.radioPC411Change = function(event){
		this.comp("gridSelect3").set({"disabled" : true});
		this.comp("addBdApplyStoreData").clear();
		this.comp("showData").clear();
		this.comp("gridSelect3").val("");
	};
	
	Model.prototype.button1Click = function(event){
		var big = 111;
		this.comp("shoplistExport").open({
			params:{
				bigTypeArr: big
			}
		});
	};
	
	
	//第一个登录（企业店铺级别）
	Model.prototype.button111Click = function(event){
		var addBdApplyStoreData = this.comp("addBdApplyStoreData");
		var showData = this.comp("showData");
		this.comp("importShopLevel").open({
			data : {},
		});
		this.comp("importShopLevel").on('onReceive', function(rowData) {
			addBdApplyStoreData.clear();
			addBdApplyStoreData.loadData(rowData.data);
			addBdApplyStoreData.refreshData();
			showData.clear();
			showData.newData();
			showData.setValue("storeCount", rowData.data.length );
		}, this);
	};
	
	
	//第二个登录（企业·地区）
	Model.prototype.button211Click = function(event){
		var addBdApplyStoreData = this.comp("addBdApplyStoreData");
		var showData = this.comp("showData");
		this.comp("importShopArea").open({
			data : {},
		});
		this.comp("importShopArea").on('onReceive', function(rowData) {
			addBdApplyStoreData.clear();
			addBdApplyStoreData.loadData(rowData.data);
			console.log(rowData.data);
			addBdApplyStoreData.refreshData();
			showData.clear();
			showData.newData();
			showData.setValue("storeCount", rowData.data.length );
		}, this);
	};
	
	Model.prototype.gridSelect3Change = function(event){
		var temp = this.comp("addBdApplyStoreData");
		var showData = this.comp("showData");
		var entityId= global.getProfile().__orgId;		 //当前用户登录主体
		var data = {
			useFlag: 'NOW',
			toshibaType:  this.comp("gridSelect3").val(),
			entityId: entityId
		};
		global.ajax({
			url:"/jrsm/bdStoreExt/query",
			async : false,
			data:data,
			success: function(data){
				if (data.__statusCode=='S'){
					console.log(data.data);
					temp.clear();
					temp.loadData(data.data);
					temp.refreshData();
					showData.clear();
					showData.newData();
					showData.setValue("storeCount", data.data.length);
				}else{
					dialoghelper.exception(data);
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};

	
	return Model;
});