define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var messagehelper = require("$UI/jrsm/js/message");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var global = require("$UI/portal/base/global");
	var dataHelper = require("$UI/jrsm/js/datahelper");	
	var jrsmCom =	require("$UI/jrsm/js/jrsm.util");
	require("$UI/system/components/bootstrap/dropdown/dropdown");
	require("$UI/jrsm/module/lib/utils");

	var Model = function() {
		this.callParent();
	};
	var pageNo = 1;
	var _sum;
	var _this;
	var _rowId;
	var _cMxDate;
	
	Model.prototype.dataClear = function(event) {
		this.comp("keymanNamedData").clear();
		this.comp("actActualKeymenData").clear();
	};
	
//	Model.prototype.resetBtnClick = function(event) {
//		this.comp("actActualKeymenData").clear();
//		this.comp("storeNameData").clear();
//		this.comp("bdItemCatalogCopyData").clear();
//		this.comp("storeNameData").newData();
//		this.comp("actActualItemstudyData").clear();
//		this.comp("actActualVocData").clear();
//		this.comp("actActualStoreData").clear();
//		this.comp("actActualGuiderData").clear();
//		this.comp("keymanNamedData").clear();
//		this.comp("keymanNamedData").newData();
//		this.comp("actActualData").clear();
//		this.comp("actActualData").newData();
//		this.comp("bdItemCatalogData").clear();
//		this.comp("bdMakerData").clear();
//		this.comp("bdMakerData").newData();
//		this.comp("actActualActivityData").clear();
//		this.comp("actActivityData").clear();
//		this.comp("actActivityData").newData();
//	
//	};
	//参数接受事件
	Model.prototype.modelParamsReceive = function(event) {
//		this.resetBtnClick();
		this.comp("grid1").on("onCellRender", this.grid1CellRender, this);
		this.comp("grid1").on("onRowClick", this.grid1itemRowClick, this);
		this.comp("grid2").on("onCellRender", this.grid2CellRender, this);
    	this.comp("grid2").on("onRowClick", this.grid2itemRowClick, this);	
    	this.comp("grid3").on("onCellRender", this.grid3CellRender, this);
    	this.comp("grid3").on("onRowClick", this.grid3itemRowClick, this);
    	this.comp("grid111_5").on("onCellRender", this.grid3CellRender, this);
    	this.comp("grid111_5").on("onRowClick", this.grid3itemRowClick, this);
    	this.comp("grid4").on("onCellRender", this.grid4CellRender, this);
    	this.comp("grid4").on("onRowClick", this.grid4itemRowClick, this);    	
    	this.comp("grid5").on("onCellRender", this.grid5CellRender, this);
    	this.comp("grid5").on("onRowClick", this.grid5itemRowClick, this);
    	this.comp("grid6").on("onCellRender", this.grid6CellRender, this);
    	this.comp("grid6").on("onRowClick", this.grid6itemRowClick, this);
    	//父页面传入的参数rowId
		_rowId = event.data.data.rowId;
		console.log(event.data);
		//父页面传入的时间
		var _cMxDate = event.data.data.cMxDate;
//		console.log(_cMxDate)
		this.storeQuery();
		this.bdItemCatalogQuery();
		this.bdItemGcatalog();
		var addData=this.comp("actActualData");	
	  	console.log(_rowId);
		//rowId有值为编辑
		if(_rowId){		
			console.log(_rowId);
			this.comp("input2_5").val(event.data.data.cMxDate);
			var data ={
				rowId:_rowId
			};
			//查询回显
			this.actActualKeymenQuery(data);//关键人查询
			this.actActualItemstudyQuery(data);
			this.actActualVocQuery(data);
			this.actActualStoreQuery(data);
			this.actActualGuiderQuery(data);
    	    global.ajax({		    
				url:"/jrsm/actActual/query",
				data:{rowId:_rowId},
				success: function(Data){
				console.log(Data.data);
//------------------------------------编辑回显
					if(Data.data[0].actionType == "W2") {
						_this.comp("radio4112_9").set({"checked":true});
						_this.radio41_5Change();
						if ($('div').hasClass('jrsm-tab-window')) {
							$.resizeScrollByObj($('.jrsm-tab-window'));
						}
						if(Data.data[0].exceptFlag == 1) {
							flag2 = true;
							_this.comp("checkbox1411_4").set({"disabled":false});
							_this.comp("checkbox1511_4").set({"disabled":false});
							$(_this.getElementByXid("col1211_16")).css("display","none");
							$(_this.getElementByXid("row411_16")).css("display","none");
							_this.comp("actActualActivityData").clear();
							_this.comp("storeNameData").clear();
							_this.comp("actActualData").setValue("storeCode","");
							_this.comp("actActualData").setValue("storeName","");
							$('.select2_5').empty();
							_this.comp("actActivityData").clear();
						}
					}
					if(Data.data.length > 0){	
						_this.comp("iDatetimePicker1_1").val(jrsmCom.dateToTime(Data.data[0].inDate));
						_this.comp("iDatetimePicker2_3").val(jrsmCom.dateToTime(Data.data[0].outDate));
						if(Data.data[0].planDate){
							_this.comp("input3_5").val(jrsmCom.TimeToData(Data.data[0].planDate));	
						}
						addData.newData({
							"index":0,
							"defaultValues" : [ {
								rowId:Data.data[0].rowId,
								storeCode:Data.data[0].storeCode,
								actionDate:Data.data[0].actionDate,
								planDate:Data.data[0].planDate,
								actionPlanId:Data.data[0].actionPlanId,							
								storeName:Data.data[0].storeName,
								enlargeCnt:Data.data[0].enlargeCnt,
								storeHelpFlag:Data.data[0].storeHelpFlag,
								showPosition:Data.data[0].showPosition,
								actionType:Data.data[0].actionType,
								exceptFlag:Data.data[0].exceptFlag,
								studyMeeting:Data.data[0].studyMeeting,
								mst:Data.data[0].mst,
							} ]
						});	
						var rows = _this.comp('storeNameData').find(['storeCode'],[Data.data[0].storeCode]);
						if( rows.length === 0 ){							
							_this.comp('storeNameData').newData({
								"index":0,
								"defaultValues" : [ {
									storeCode:Data.data[0].storeCode,
									storeName:Data.data[0].storeName
								} ]
							});	
							_this.comp("select2_5").val(Data.data[0].storeCode);							
						}				
					}
					_this.comp("iDyGrid1_2").query();//快速查询组件调用查新方法
				},errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
    	    });
    	    var data1 = {
				storeCode:addData.getValue("storeCode")
		    };
			_this.actActualQueryXinZeng(data1);//查出所有施策及其状态
			this.actActualActivityQuery(data);//施策查询
	    	if ($('div').hasClass('jrsm-tab-window')) {//重置滚动条
	    		$.resizeScrollByObj($('.jrsm-tab-window'));
	    	}
		}else{	//新增
			_sum = 0;
			_cMxDate = event.data.data.cPlanDateY;
			this.comp("input2_5").val(_cMxDate);//个人日历传入的时间
			addData.newData({
				"index":0,
				"defaultValues" : [ {
					actionType:"W1"
				} ]
			});
			 this.comp("iDatetimePicker1_1").val("00:00");
			 this.comp("iDatetimePicker2_3").val("00:00");			
		}
		$.resizeScrollByObj($('.jrsm-tab-window'));
	};

	Model.prototype.dyGridRowClick = function(event){
		var rowId=event.rowID;
		if(rowId){
			var index=event.domEvent.target.cellIndex;
			if(!index){
				return false;
			}
			var cols=event.source.$domNode.jqGrid('getGridParam', 'colModel');
			var itemValue=cols[index].name;
			var rows=this.comp("bdItemCatalogCopyData").find(["keymanId","catalogCode"],[rowId,itemValue],true);
			if(rows.length >0){
				cols[index].editable=true;
				$(event.domEvent.target).css("background-color","#FFF");
			}else{
				cols[index].editable=false;
			}
		}
			
	};

		//关键人添加按钮
	var kymmanSum;
	Model.prototype.button1_5Click = function(event){
		var data = this.comp("actActualKeymenData");	
		data.newData({
			"defaultValues":
			 [
               {"id":kymmanSum}
             ]
		});
		console.log(data);
	};

	Model.prototype.grid1CellRender = function(event) {
	//因为他的rowID是id
		var dataKeman = this.comp("actActualKeymenData").datas.latestValue;
		console.log(dataKeman);
		for(var i =0;i<dataKeman.length;i++){
			var val =dataKeman[i].row.planFlag.value.latestValue;
			var gridCheck = this.comp("grid1").$domNode;
			var gridCheckBox1 =gridCheck.find('tr.jqgrow:eq('+i+')').find('td:eq(1)').find('a');
			if(val == "N"){
				gridCheckBox1.css('color',"red !important");
				gridCheckBox1.attr('disabled',true);
			}
		}	
		if (event.colName == 'action') {
			var editBtn = "<a href='#' class='mdm-grid-cell-a deleteBtn' title='" + messagehelper.get("msgDial.delete") + "'>" + messagehelper.get("msgDial.delete")
					+ " </a>";
			event.html = editBtn ;
		}
	};
	
		//施策grid行点击事件
	var gridRowId;
	Model.prototype.grid2RowClick = function(event){
		gridRowId = event.rowID;
	};

	//grid2列表按钮添加
	Model.prototype.grid2CellRender = function(event) {	
		if (event.colName == 'action') {
			var editBtn = "<a href='#' class='mdm-grid-cell-a deleteBtn' title='" + messagehelper.get("msgDial.delete") + "'>" + messagehelper.get("msgDial.delete")
					+ " </a>";
			event.html = editBtn ;
		}
	};
	//grid3列表按钮添加
	Model.prototype.grid3CellRender = function(event) {		
		this.gridCellRender(event);
	};
	//grid4列表按钮添加
	Model.prototype.grid4CellRender = function(event) {		
//			this.gridCellRender(event);
			if (event.colName == 'action') {
				var editBtn = "<a href='#' class='mdm-grid-cell-a deleteBtn' title='" + messagehelper.get("msgDial.delete") + "'>" + messagehelper.get("msgDial.delete")
					+ " </a>";
				
				var updataBtn =	"<a href='#' class='mdm-grid-cell-a updataBtn' title='" + messagehelper.get("act.evtMaster.IUpdateBtn") + "'>" + messagehelper.get("act.evtMaster.IUpdateBtn")
					+ " </a>";
				event.html = editBtn +" "+ updataBtn ;
			}
			this.grid4portraitCellRender(event);
	};
	//grid5列表按钮添加
	Model.prototype.grid5CellRender = function(event) {		
		this.gridCellRender(event);
	};
	//grid6列表按钮添加
	Model.prototype.grid6CellRender = function(event) {		
		this.gridCellRender(event);
	};
	
	
	//grid列表按钮添加
	Model.prototype.gridCellRender = function(event) {
			if (event.colName == 'action') {
				var editBtn = "<a href='#' class='mdm-grid-cell-a deleteBtn' title='" + messagehelper.get("msgDial.delete") + "'>" + messagehelper.get("msgDial.delete")
						+ " </a>";
				event.html = editBtn ;
			}
		    if(event.colName == "itemCatalogCode"){	  	
				var row1 = this.comp("bdItemCatalogData").find([ "catalogCode" ], [ event.colVal ]);
				if (row1.length > 0) {
					event.html = row1[0].val("catalogName");
				}
			}
			if(event.colName == "makerCode"){
				var row2 = this.comp("bdMakerData").find([ "makerCode" ], [ event.colVal ]);
				if (row2.length > 0) {
					event.html = row2[0].val("makerName");
				}
			}
		if(event.colName == "keymenCodes"){
			event.html = this.headDataRefresh(event.colVal);
		}
	};
	
	//改变多选框显示的值（星期）商品说明会??
	Model.prototype.headDataRefresh = function(dataObj){
		var me=this;
		var updateType = "";
		if (dataObj) {
			var updateTypeS = dataObj.split(",");
			for (var i = 0; i < updateTypeS.length; i++) {
				var updateTypeRow = me.comp("keymanNamedData").find([ "rowId" ], [ updateTypeS[i] ]);
				if (updateTypeRow.length > 0) {
					updateType += updateTypeRow[0].val("keymanName") + ",";
				}
			}
			me.comp("gridSelect41_1").set({ label : updateType.slice(0, -1)}); 
		}
		return updateType.slice(0, -1);
	};
	
	//grid列表图像按钮添加
	Model.prototype.grid4portraitCellRender = function(event) {
		var showPhoto;
		if(this.comp("actActualVocData").getValue("picRefId") && this.comp("actActualVocData").getValue("picRefId")!= -1 ){
			showPhoto = messagehelper.get("act.plan.I0002");
		}else{
			showPhoto = messagehelper.get("act.plan.I0003");
		}
		if (event.colName == 'portrait') {
		var editBtn = "<a href='#' class='mdm-grid-cell-a selectBtn' title='" + showPhoto + "'>" + showPhoto
					+ " </a>";
			event.html = editBtn ;
		}
	};
	
//	grid1删除按钮事件
	Model.prototype.grid1itemRowClick = function(event) {
		var data = {
				event:event,
				name:"actActualKeymenData",
				lookupData:_this.comp("actActualKeymenData"),
		};
		this.itemRowClick(data);
	};

	//删除行grid2施策
	Model.prototype.grid2itemRowClick = function(event) {
			var data = {
					event:event,
					name:"actActualActivity",
					lookupData:_this.comp("actActualActivityData")
			};
			this.itemRowClick(data);
	};
	//删除行grid3学习会
	Model.prototype.grid3itemRowClick = function(event) {
		var lookupData = this.comp("actActualItemstudyData");		
		var data = {
				event:event,
				name:"actActualItemstudy",
				lookupData:lookupData
		};
		this.itemRowClick(data);
	};
	//删除行grid4报告
	Model.prototype.grid4itemRowClick = function(event) {
		var lookupData = this.comp("actActualVocData");		
		var data = {
				event:event,
				name:"actActualVoc",
				lookupData:lookupData
		};
		this.itemRowClick(data);
	};
	//删除行grid5现场维持
	Model.prototype.grid5itemRowClick = function(event) {
		var lookupData = this.comp("actActualStoreData");		
		var data = {
				event:event,
				name:"actActualStore",
				lookupData:lookupData
		};
		this.itemRowClick(data);
	};
	//删除行grid6调查
	Model.prototype.grid6itemRowClick = function(event) {
		var lookupData = this.comp("actActualGuiderData");		
		var data = {
				event:event,
				name:"actActualGuider",
				lookupData:lookupData
		};
		this.itemRowClick(data);
	};
	
	//编辑时删除行
	Model.prototype.deleteRow =  function (event) {
		var data ={
				rowId :_rowId
		};
		 global.ajax({		    
			url:"/jrsm/"+event.className+"/delete",
			data:{rowId:event.rowId},
			success: function(Data){
				if("actActualActivity"==event.className){
					_this.actActualActivityQuery(data);
				}else if("actActualItemstudy"==event.className){
					_this.actActualItemstudyQuery(data);
				}else if("actActualVoc"==event.className){
					_this.actActualVocQuery(data);
				}else if("actActualStore"==event.className){
					_this.actActualStoreQuery(data);
				}else if("actActualGuider"==event.className){
					_this.actActualGuiderQuery(data);
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	
	//删除行执行
		Model.prototype.itemRowClick = function(event) {	
			var row = event.event.row;
			var domButton = $(event.event.domEvent.target);// 获取点击的元素
			var lookupData =event.lookupData ;
			var whether = "Y";//是否为修改状态
			var queryPic = "query";//是否为图片查询状态
			if (domButton.hasClass("deleteBtn")) {// 判断是否包含某个样式
					lookupData.confirmDelete = false;
					lookupData.directDeleteMode = true;
					lookupData.deleteData(row);
			}
			if (domButton.hasClass("updataBtn")) {// 判断是否包含某个样式      VOC修改
				this.comp("windowDialog1_4").open({params:{"flag": flag2,"modifyDate":row,"whether":whether}});
			}	
			if(domButton.hasClass("selectBtn")){
				this.comp("windowDialog1_4").open({params:{"flag": flag2,"modifyDate":row,"queryPic":queryPic}});
			}
	};
		
	//查询后台数据
	Model.prototype.queryClick = function(event){
		var data = {
			actionActualId:event.rowId,
			actionPlanId:event.actionPlanId,
			storeCode:event.storeCode,
			itemCatalogCode:event.itemCatalogCode,
			makerCode:event.makerCode
		};		
		$.SimpleEngineeSyn(event.url,data, event.queryData, true, pageNo,null,null,false);
	};
	//页面初始化
	Model.prototype.modelLoad = function(event){
		if ($('div').hasClass('jrsm-tab-window')) {
			$('.x-contents ').css({
				"overflow" : "hidden"
			});
			$.setNiceScrollByObj($('.jrsm-tab-window'));
		}
		_this =this;	
    	 _rowId = this.getContext().getRequestParameter('rowId');
    	// console.log(_rowId);
    	 _cMxDate = this.getContext().getRequestParameter('cMxDate');
		
	};

	//grid1查询,关键人新增和查询
	Model.prototype.actActualKeymenQuery= function(event){
		var workTime = this.comp("input3_5").val();
		console.log(event.rowId);
		if(event.rowId){
			var dataAll = {
				actionActualId:event.rowId,
				storeCode:event.storeCode,
				planDate:workTime
			};
			global.ajax({		    
				url:"/jrsm/actActualKeymen/query",
				data:dataAll,
				success: function(Data){
				console.log(Data.data);
					if(Data.data.length>0){
						kymmanSum = Data.data.length;
						for(var i=0; i< Data.data.length; i++){
							_this.comp('actActualKeymenData').newData({
								"defaultValues" : [ {
									id:i,
									rowId: Data.data[i].rowId,	
									keymanName: Data.data[i].keymanName,
									keymanId: Data.data[i].keymanId,	
									planFlag: Data.data[i].planFlag,
									proposalFlag: Data.data[i].proposalFlag,	
									enlargeFlag: Data.data[i].enlargeFlag,
									reportFlag: Data.data[i].reportFlag,
									msgExchangFlag: Data.data[i].msgExchangFlag,
									enlargeCnt: Data.data[i].enlargeCnt,
									actionActualId:Data.data[i].actionActualId		
								} ]
							});	
						}
					}
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
		}else {
			var allData = {
				planDate:workTime,
				storeCode:event.storeCode
			};
			var data = {
				storeCode:event.storeCode,
			};
//			this.actActualActivityQuery(data); // 下拉店铺查询施策 
			this.actActualQueryXinZeng(data);
			global.ajax({		    
				url:"/jrsm/actActual/getKeymanList",
				data:allData,
				success: function(Data){
					console.log(typeof Data.data);
					console.log(Data.data);
					if (Data.__statusCode=='S'){
						if(Data.data.length>0){	
							kymmanSum = Data.data.length;
							for(var i=0; i< Data.data.length; i++){
								_this.comp('actActualKeymenData').newData({
									"defaultValues" : [ {
										id:i,
//										rowId: Data.data[i].rowId ,	
										keymanName: Data.data[i].keymanName,
										keymanId: Data.data[i].keymanId,	
										planFlag: Data.data[i].planFlag,
										proposalFlag: Data.data[i].proposalFlag,	
										enlargeFlag: Data.data[i].enlargeFlag,
										reportFlag: Data.data[i].reportFlag,
										msgExchangFlag: Data.data[i].msgExchangFlag,
										enlargeCnt: Data.data[i].enlargeCnt,
										actionActualId:Data.data[i].actionActualId		
									} ]
								});	
							}
						}
					}else{
						dialoghelper.exception(Data);
					}
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
		}		
	};
	
	//点击新增按钮查询关键人
	Model.prototype.actPlanKeymen= function(event){
			global.ajax({		    
				url:"/jrsm/actPlanKeymen/query",
				data:{"actionPlanId":event.actionPlanId},
				success: function(Data){
					if(Data.data.length>0){
						for(var i=0; i< Data.data.length; i++){
							_this.comp('actActualKeymenData').newData({
								"index":0,
								"defaultValues" : [ {
									id:i,
									keymanCode: Data.data[i].keymanCode,	
									keymanName: Data.data[i].keymanName		
								} ]
							});	
						}
					}
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
	
	};
	Model.prototype.bdItemCatalogCopy= function(event){
		global.ajax({		    
			url:"/jrsm/bdItemCatalog/queryByPlan",
			data:{"rowId":event.actionPlanId},
			success: function(Data){
				_this.comp('bdItemCatalogCopyData').clear();
				_this.comp('bdItemCatalogCopyData').loadData(Data.data);
				_this.comp('bdItemCatalogCopyData').refreshData();
				console.log(Data.data);
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	
	};
		//grid2查询施策查询
	Model.prototype.actActualActivityQuery = function(event){
		if(event.rowId){
			console.log(event.rowId+"施策查询回显");
		    global.ajax({		    
				url:"/jrsm/actActualActivity/query",
				data:{"actionActualId":event.rowId,},
				success: function(Data){
				console.log(Data.data);
					_sum = Data.data.length;
					if(Data.data.length>0){
						var activityIdArr = [];
						for(var i =0 ;i < Data.data.length ;i++){
							activityIdArr.unshift(Data.data[i].activityId);
							_this.comp('actActualActivityData').newData({
								"defaultValues" : [ {
									id:i,
									rowId: Data.data[i].rowId,
									bigCatalogName: Data.data[i].bigCatalogName,
									samllCatalogName: Data.data[i].samllCatalogName,	
									proposalFlag: Data.data[i].proposalFlag,	
									purposeFlag: Data.data[i].purposeFlag,
									implementFlag: Data.data[i].implementFlag,	
									implementPlanDate: Data.data[i].implementPlanDate,
									bigCatalogId: Data.data[i].bigCatalogId,	
									samllCatalogId: Data.data[i].samllCatalogId,
									activityId: Data.data[i].activityId,
									actionActualId:Data.data[i].actionActualId
								} ]
							});	
							var samllQuery = Data.data[i].activityId;
							var queryData = _this.comp("actActivityData");						
							console.log(queryData);
							var gridCheck = _this.comp("grid2").$domNode;
							var gridCheckBox1 = gridCheck.find('tr.jqgrow:eq('+i+')').find('td:eq(3)').find('input');
							var gridCheckBox2 = gridCheck.find('tr.jqgrow:eq('+i+')').find('td:eq(4)').find('input');
							var gridCheckBox3 = gridCheck.find('tr.jqgrow:eq('+i+')').find('td:eq(5)').find('input');
								for(var g =0;g < queryData.datas.latestValue.length ; g ++){
									var queryId = queryData.datas.latestValue[g];
									var implementActualId = queryId.row.implementActualId.value.latestValue;
									var proposalActualId = queryId.row.proposalActualId.value.latestValue;
									var purposeActualId = queryId.row.purposeActualId.value.latestValue;
									var samllCode = queryId.row.rowId.value.latestValue;
									if(samllQuery && samllCode != samllQuery){
										gridCheckBox1.attr('disabled',true);
										gridCheckBox2.attr('disabled',true);
										gridCheckBox3.attr('disabled',true);
									}
									if(samllCode == samllQuery ){
										if(proposalActualId && proposalActualId != _rowId){ 
											gridCheckBox1.attr('disabled',true);
										}else {
											gridCheckBox1.attr('disabled',false);
										}
										if(purposeActualId && purposeActualId != _rowId){	 
												gridCheckBox2.attr('disabled',true);
										}else{
											 gridCheckBox2.attr('disabled',false);
										}
										if(implementActualId && implementActualId != _rowId){
											gridCheckBox3.attr('disabled',true);
										}else{
											gridCheckBox3.attr('disabled',false);
										}
										break;								 
									}
								}
						}			
					}
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});			
		}	
	};
	
	
	Model.prototype.actActualQueryXinZeng = function(event){
		var url = "/jrsm/actActivity/queryActual";
		var queryData = _this.comp("actActivityData");
		var grid1 = {
			url:url,
			storeCode:event.storeCode,
			queryData:queryData
		};
		this.queryClick(grid1);
		var samllQuery = this.comp("actActualActivityData").getValue("activityId");
		console.log(queryData.datas.latestValue);
		for(var i = 0; i< queryData.datas.latestValue.length;i++){
			 var queryId = queryData.datas.latestValue[i];
			 var implementActualId = queryId.row.implementActualId.value.latestValue;
			 var proposalActualId = queryId.row.proposalActualId.value.latestValue;
			 var purposeActualId = queryId.row.purposeActualId.value.latestValue;
			 var samllCode = queryId.row.rowId.value.latestValue;
			 var gridCheck = this.comp("grid2").$domNode;
			 gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td');
			 var gridCheckBox1 = gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td:eq(3)').find('input');
			 var gridCheckBox2 = gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td:eq(4)').find('input');
			 var gridCheckBox3 = gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td:eq(5)').find('input');
			 if(samllQuery && samllCode != samllQuery){
				 gridCheckBox1.attr('disabled',true);
				 gridCheckBox2.attr('disabled',true);
				 gridCheckBox3.attr('disabled',true);
			 }
			 
			 if(samllCode == samllQuery ){
				 if(proposalActualId && proposalActualId != _rowId){ 
					 gridCheckBox1.attr('disabled',true);
				 }else {
					 gridCheckBox1.attr('disabled',false);
				 }
				 if(purposeActualId && purposeActualId != _rowId){	 
					 gridCheckBox2.attr('disabled',true);
				 }else{
					 gridCheckBox2.attr('disabled',false);
				 }
				 if(implementActualId && implementActualId != _rowId){
					 gridCheckBox3.attr('disabled',true);
				 }else{
					 gridCheckBox3.attr('disabled',false);
				 }
				 break;
			 }	 
		}
	};
		
		//grid3查询
	Model.prototype.actActualItemstudyQuery = function(event){		
		global.ajax({		    
			url:"/jrsm/actActualItemstudy/query",
			data:{"actionActualId":event.rowId,},
			success: function(Data){
				if(Data.data.length>0){	
					for(var i=0; i< Data.data.length; i++){
						_this.comp('actActualItemstudyData').newData({
							"index":0,
							"defaultValues" : [ {
								id:i,
								rowId: Data.data[i].rowId,
								itemCatalogCode: Data.data[i].itemCatalogCode,
								keymenNames: Data.data[i].keymenNames,	
								storeChargerCnt: Data.data[i].storeChargerCnt,	
								exceptChargerCnt: Data.data[i].exceptChargerCnt,
								actionTotalKeymenCnt: Data.data[i].actionTotalKeymenCnt,	
								times: Data.data[i].times,
								implementationRate: Data.data[i].implementationRate,	
								keymenCodes: Data.data[i].keymenCodes,
								actionActualId:Data.data[i].actionActualId,
								totalKeymenCnt:Data.data[i].totalKeymenCnt,
								totalChargerCnt:Data.data[i].totalChargerCnt,
								actionKeymenCnt:Data.data[i].actionKeymenCnt	
							} ]
						});	
					}
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});

	};
		//grid4查询
	Model.prototype.actActualVocQuery = function(event){
		global.ajax({		    
			url:"/jrsm/actActualVoc/query",
			data:{"actionActualId":event.rowId,},
			success: function(Data){
			console.log(Data.data);
				if(Data.data.length>0){
					for(var i=0; i< Data.data.length; i++){
						_this.comp('actActualVocData').newData({
							"index":0,
							"defaultValues" : [ {
								id:i,
								rowId: Data.data[i].rowId,
								itemCatalogCode: Data.data[i].itemCatalogCode,
								vocType: Data.data[i].vocType,	
								vocContent: Data.data[i].vocContent,	
								portrait: Data.data[i].portrait,
								saleKeypoint: Data.data[i].saleKeypoint,	
								itemCode: Data.data[i].itemCode,
								shortAnswer: Data.data[i].shortAnswer,	
								actionActualId:Data.data[i].actionActualId,
								picRefId:Data.data[i].picRefId	
							} ]
						});	
					}
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});

	};
		//grid5查询
	Model.prototype.actActualStoreQuery = function(event){
		global.ajax({		    
			url:"/jrsm/actActualStore/query",
			data:{"actionActualId":event.rowId,},
			success: function(Data){
				if(Data.data.length>0){
					for(var i=0; i< Data.data.length; i++){
					_this.comp('actActualStoreData').newData({
							"index":0,
							"defaultValues" : [ {
								id:i,
								rowId: Data.data[i].rowId,
								itemCatalogCode: Data.data[i].itemCatalogCode,
								showStatus: Data.data[i].showStatus,	
								actionActualId:Data.data[i].actionActualId		
							} ]
						});	
					}
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
		//grid6查询
	Model.prototype.actActualGuiderQuery = function(event){
		global.ajax({		    
			url:"/jrsm/actActualGuider/query",
			data:{"actionActualId":event.rowId,},
			success: function(Data){
				if(Data.data.length>0){
					for(var i=0; i< Data.data.length; i++){
						_this.comp('actActualGuiderData').newData({
							"index":0,
							"defaultValues" : [ {
								id:i,
								rowId: Data.data[i].rowId,
								itemCatalogCode: Data.data[i].itemCatalogCode,
								makerCode: Data.data[i].makerCode,	
								residentCnt: Data.data[i].residentCnt,
								weekendCnt: Data.data[i].weekendCnt,
								actionActualId:Data.data[i].actionActualId		
							} ]
						});	
					}
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};	
		//select下拉查询店铺
	Model.prototype.storeQuery = function(event){
		var grid1 ={ 
			url:"/jrsm/bdSalesStore/queryStore",
			queryData:_this.comp('storeNameData')
		};
		this.queryClick(grid1);
	};
	//选择店铺事件，同时执行查询关键人和四半期中的施策，商品说明会的关键人
	Model.prototype.select2_5Change = function(event){
		_rowId = "";
		this.comp(" b");
		var store = this.comp("storeNameData").getCurrentRow();
		var storeName = store.row.storeName.value.latestValue;
		this.comp("actActualData").setValue("storeName",storeName);
		var data = {
			storeCode:this.comp("select2_5").val()
		};	
		this.dataClear();
		this.actActualKeymenQuery(data);
		this.comp("iDyGrid1_2").query();
	};
	
		//select下拉查询商品
	Model.prototype.bdItemCatalogQuery = function(event){
		var grid1 ={ 
			url:"/jrsm/bdItemCatalog/query",
			queryData: this.comp('bdItemCatalogData')
		};
		this.queryClick(grid1);
	};
		//select下拉查询商品分类
	Model.prototype.bdItemGcatalog = function(event){
		var grid1 ={ 
			url:"/jrsm/bdItemGcatalog/query",
			queryData: this.comp('bdItemGcatalogData')
		};
		this.queryClick(grid1);
	};
	
	//下拉查询关键人。说明会
	Model.prototype.gridSelect5111_16UpdateValue = function(event){
		this.comp("actActualItemstudyData").setValue("keymenCodes","");
		this.comp("actActualItemstudyData").setValue("keymenNames","");
		var actActualItemstudyData=this.comp("actActualItemstudyData");	
		this.comp("gridSelect41_1").set({"label" : "",});
		 var addData=this.comp("keymanNamedData");	
		 var storeCode=this.comp("actActualData").getValue("storeCode");
		 var row = this.comp("bdItemCatalogData").getCurrentRow();
		 var gcatalogCode;
		 gcatalogCode = row.row.gcatalogCode.value.latestValue;			
		 global.ajax({		    
			url:"/jrsm/kymKeyman/queryByActual",
			data:{"storeName":gcatalogCode,"storeCode":storeCode},
			success: function(Data){
				addData.clear();
				addData.loadData(Data.data);
				addData.refreshData();
				if(Data.data.length>0){
					var totalKeymenCnt=Data.data[0].totalKeymenCnt;
					var implementationRate="0"+"/"+totalKeymenCnt;
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	Model.prototype.gridSelect6111_16UpdateValue = function(event){
		 this.comp("keymanNamedData").refreshData();
		var row=this.comp("keymanNamedData").getCurrentRow();
		if(row){
			if(row.row.rowId){
			this.comp("actActualItemstudyData").setValue("keymenCodes",row.row.rowId.value.latestValue );
			this.comp("actActualItemstudyData").setValue("keymenNames",row.row.keymanName.value.latestValue );
//				this.comp("actActualItemstudyData").setValue("totalKeymenCnt",row.row.totalKeymenCnt.value.latestValue );
			}
		}	
	};
	//grid6选择商品后查询厂家
	Model.prototype.gridSelect4_9UpdateValue = function(event){
	
		var  bdMakerData=this.comp("bdMakerData");
		var catalogCode = this.comp("bdItemCatalogData").getValue("catalogCode");
		global.ajax({		    
			url:"/jrsm/bdMaker/queryByActual",
			data:{"makerCode":catalogCode},
			success: function(Data){
				for(var i =0;i<Data.data.length;i++){						
					
					bdMakerData.newData({
					"defaultValues" : [ {
							makerCode:Data.data[i].makerCode,
							makerName:Data.data[i].makerName ,
							gcatalogCode:catalogCode
						}]
					});
				}
				//bdMakerData.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	
	//添加第4条施策
	Model.prototype.button2Click = function(event){
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
		var data =this.comp('actActualActivityData');
		this.button(data);
		this.newChange();
	};
	//添加第5条学习会
	Model.prototype.button3Click = function(event){
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
		var data =this.comp('actActualItemstudyData');
		this.button(data);
		this.newChange();
	};
	
	//添加第6条报告
	var flag2; 
	Model.prototype.button4Click = function(event){
		var addState = "XZ";//新增标识
		var count = this.comp("actActualVocData").count();//获取grid的lenth传入voc作为ID;
		this.comp("windowDialog1_4").open({params:{"flag": flag2,"count":count,"addState":addState}});
		this.newChange();
	};

	//添加空行,渲染选项
	Model.prototype.button = function(event){
		event.newData({
			//"index":0,
			 "defaultValues":
			 [
               {"id":_sum}
               ]		
			}		
		);
		_sum ++;
	};
	
	//grid2,选择查询回显，选择施策实施回显状态
	//
	Model.prototype.gridSelect111_16UpdateValue = function(event){
		this.comp("actActualActivityData").setValue("proposalFlag","");
		this.comp("actActualActivityData").setValue("purposeFlag","");
		this.comp("actActualActivityData").setValue("implementFlag","");
//		console.log(queryData.datas.latestValue);
		var actActivityData=this.comp("actActivityData");
		var actActualActivityData=this.comp("actActualActivityData");	
		var row1 = actActivityData.getCurrentRow();
		actActualActivityData.setValue("activityId",row1.row.rowId.value.latestValue);
		actActualActivityData.setValue("bigCatalogName",row1.row.bigCatalogName.value.latestValue);
		actActualActivityData.setValue("bigCatalogId",row1.row.bigCatalogId);
		actActualActivityData.setValue("samllCatalogId",row1.row.smallCatalogId);
		actActualActivityData.setValue("proposalFlag",row1.row.proposalFlag);
		actActualActivityData.setValue("purposeFlag",row1.row.purposeFlag);
		actActualActivityData.setValue("implementFlag",row1.row.implementFlag);	
//		var row = actActualActivityData.getCurrentRow();
		console.log(gridRowId);
//		var smallCatalogName = actActualActivityData.getValue("samllCatalogName", row);
			//限制施策是否可以编辑
			var queryData = this.comp("actActivityData");
			var samllQuery = this.comp("actActualActivityData").getValue("activityId");
			for(var i = 0; i < queryData.datas.latestValue.length;i++){
				var queryId = queryData.datas.latestValue[i];
				var queryDataId = queryId.row.rowId.value.latestValue;
				var implementActualId = queryId.row.implementActualId.value.latestValue;
				var proposalActualId = queryId.row.proposalActualId.value.latestValue;
				var purposeActualId = queryId.row.purposeActualId.value.latestValue;
				var gridCheck = this.comp("grid2").$domNode;
				gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td');
				var gridCheckBox1 =gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td:eq(3)').find('input');
				var gridCheckBox2 =gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td:eq(4)').find('input');
				var gridCheckBox3 =gridCheck.find('tr.jqgrow:eq('+gridRowId+')').find('td:eq(5)').find('input');
				if(queryDataId == samllQuery){
					//提案限制编辑
					if(proposalActualId && proposalActualId != _rowId){
						gridCheckBox1.attr('disabled',true);
					}else{
						gridCheckBox1.attr('disabled',false);
					}
					//合意限制编辑
					if(purposeActualId && purposeActualId != _rowId){
						gridCheckBox2.attr('disabled',true);
					}else{
						gridCheckBox2.attr('disabled',false);
					}
					//实施限制编辑
					if(implementActualId && implementActualId != _rowId){
						gridCheckBox3.attr('disabled',true);
					}else{
						gridCheckBox3.attr('disabled',false);
					}
//					this.comp("grid2").refresh();
				}
			}
	};
	
	//执行保存
	Model.prototype.button1_4Click = function(event){
		var _me=this;
		var indata = this.comp("iDatetimePicker1_1");
		var  outData=this.comp("iDatetimePicker2_3");
		var indata1 = this.comp("input121_16");
		var  outData1=this.comp("input211_16");

//		限制店铺不能为空	
		var store = this.comp("select2_5").val();
		var actActualData1 = this.comp("actActualData").getValue("exceptFlag");
		if(store === null && actActualData1 != 1){
			dialoghelper.error(messagehelper.get('act.plan.store'));
			return;
		}
//		限制时间不能为空且开始时间不能大于结束时间
		if(this.comp("iDatetimePicker1_1").val() > this.comp("iDatetimePicker2_3").val()){
			dialoghelper.error(messagehelper.get('act.fullcalendar.fullcalendarTime'));
			return;
		}
		
		if(!indata.val()){
			dialoghelper.info(messagehelper.get("act.actual.I0006"));
			return;
		}
		indata1.val(jrsmCom.strToDate(indata.val()));	
		outData1.val(jrsmCom.strToDate(outData.val()));
		
//		
		var data3 = this.comp("input2_5").val();
		this.comp("actActualData").setValue("actionDate",data3);
		var data1 = this.comp("input3_5").val();
		this.comp("actActualData").setValue("planDate",data1);	
		var actionType=this.comp("actActualData").getValue("actionType");
		if("W2"==actionType){
			this.comp("actActualKeymenData").clear();
		}
		var  actActualData=this.comp("actActualData");
		var  actActualActivityData=this.comp("actActualActivityData");
		var  actActualKeymenData=this.comp("actActualKeymenData");
		var  actActualItemstudyData=this.comp("actActualItemstudyData");
		var  actActualVocData=this.comp("actActualVocData");
		var  actActualStoreData=this.comp("actActualStoreData");
		var  actActualGuiderData=this.comp("actActualGuiderData");
	
		var data =dataHelper.getHeadListDataToJson(
		   actActualData,
		   actActualActivityData,"actActualActivity",
		   actActualKeymenData,"actActualKeymen",
		   actActualItemstudyData,"actActualItemstudy",
		   actActualVocData,"actActualVoc",
		   actActualStoreData,"actActualStore",
		   actActualGuiderData,"actActualGuider"
		);	
//			indata.val("00:00");	
			console.log(data);
		var data2 = this.comp("input2_5").val();
		this.comp("actActualData").setValue("actionDate",data2);
		var data12 = this.comp("input3_5").val();
		this.comp("actActualData").setValue("planDate",data12);	
		//点击登录按钮保存数据
		global.ajax({		    
			url:"/jrsm/actActual/save",
			data:data,
			async:true,
			success: function(Data){				   			
				console.log(Data.__pagecount);//返回实绩Id
				_me.close();
				_me.getParent().initMonth();
				_me.comp("iDyGrid1_2").save();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
			
	};
	//---------------------------------店铺内活动选择
	Model.prototype.radio412_7Click = function(event){
		 this.comp("actActualData").setValue("actionType","W2");
	};
	//-------------------------------店铺外活动选择
	Model.prototype.radio41_7Click = function(event){
		 this.comp("actActualData").setValue("actionType","W1");
	};
	
	//--------------------------入店时间改变事件	
	Model.prototype.outDateChange = function(event){
		var  inData=this.comp("iDatetimePicker1_1").val();
		var  outData=this.comp("iDatetimePicker2_3").val();
		
		if(inData > outData){
			dialoghelper.info(messagehelper.get("act.actual.I0004"));
			return;
		}
	};
	//--------------------------------刷新滚动条	
	Model.prototype.newChange = function(event){
		var obj = $(".segment-tab-content").children().children().children().children().children();
		var h = $(window).height() - 64 - 40 - 2;
		if(obj.attr("style").indexOf("overflow") != -1){
			obj.removeAttr("style");
			obj.css({"height":h,"outline":"none"});
		}else{
			obj.css({"overflow":"hidden"});
		}
	};
	//---------------------------页面调整//切换到出勤（临店,社内业务等）
	Model.prototype.radio4_5Change = function(event){	
		$(".row311_16").css("display","block");
		$(".div221_4").css("display","none");
		$(".span11_4").css("display","none");
		$(".span3111_16").css("display","block");
		$(".span4121_16").css("display","block");
		$(".span21_4").css("display","none");
		$(".row1_5").css("display","none");
		$(".row31111_16").css("display","block");
		$(".span5111_16").css("display","block");
		$(".span11_5").css("display","none");
		$(".row711_16").css("display","block");
		$(".row811_16").css("display","block");
		$(".row911_16").css("display","block");
		$(".span4121_16").css("display","");
		this.comp("actActualData").setValue("exceptFlag","");
		this.comp("actActualData").setValue("studyMeeting","");
		this.comp("actActualData").setValue("mst","");
		this.comp("actActualData").setValue("processFlag","");
		this.comp("checkbox1411_4").set({"disabled":true});
		this.comp("checkbox1511_4").set({"disabled":true});
		$(this.getElementByXid("col1211_16")).css("display","block");
		this.bdItemGcatalog();
		this.comp("actActualItemstudyData").clear();
		this.comp("actActualKeymenData").clear();
		this.comp("actActualVocData").clear();
		this.comp("actActualStoreData").clear();
		this.comp("actActualGuiderData").clear();
		this.comp("keymanNamedData").clear();
		this.comp("bdItemCatalogData").clear();
		this.comp("bdMakerData").clear();
		this.comp("actActualActivityData").clear();
		this.comp("actActivityData").clear();
//		重置滚动条
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
	};
	//------------------------------------页面调整//切换到出勤（MST,生活展等）
	Model.prototype.radio41_5Change = function(event){		
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
		$(".row311_16").css("display","none");
		$(".div221_4").css("display","block");
		$(".span11_4").css("display","block");
		$(".span3111_16").css("display","none");
		$(".span4121_16").css("display","none");
		$(".span21_4").css("display","");
		$(".row1_5").css("display","block");
		$(".row31111_16").css("display","none");
		$(".span5111_16").css("display","none");
		$(".span11_5").css("display","block");
		$(".row711_16").css("display","none");
		$(".row811_16").css("display","none");
		$(".row911_16").css("display","none");
		$(".span4121_16").css("display","none");
		$(this.getElementByXid("row1_1")).css("display","block");
		this.comp("actActualItemstudyData").clear();
		this.comp("actActualKeymenData").clear();
		this.comp("actActualVocData").clear();
		this.comp("actActualStoreData").clear();
		this.comp("actActualGuiderData").clear();
		this.comp("keymanNamedData").clear();
		this.comp("bdItemCatalogData").clear();
		this.comp("bdMakerData").clear();
		this.comp("actActualActivityData").clear();
		this.comp("actActivityData").clear();
		this.comp("actActualData").setValue("storeHelpFlag","");
		$('.select1211_5').empty();
		this.comp("actActualData").setValue("showPosition","");
	};
	
	//=======================交叉表查询
	Model.prototype.button1_1Click = function(event){
		this.comp("iDyGrid1_2").query();
	};
	
	
//---------------------------------店铺外学习会勾选--------------------------------
	Model.prototype.checkbox1311_4Change = function(event){
		if(event.checked === true) {
			flag2 = true;
			this.comp("checkbox1411_4").set({"disabled":false});
			this.comp("checkbox1511_4").set({"disabled":false});
			$(this.getElementByXid("checkbox1411_4")).attr("disabled", false);
			$(this.getElementByXid("checkbox1511_4")).attr("disabled", false);
			$(this.getElementByXid("col1211_16")).css("display","none");
			$(this.getElementByXid("row411_16")).css("display","none");
			this.comp("actActualActivityData").clear();
			this.comp("storeNameData").clear();
			this.comp("actActualData").setValue("storeCode","");
			this.comp("actActualData").setValue("storeName","");
			$('.select2_5').empty();
			this.comp("actActivityData").clear();
		}else {
			flag2 =false;
			this.comp("checkbox1411_4").set({"disabled":true});
			this.comp("checkbox1511_4").set({"disabled":true});
			$(this.getElementByXid("col1211_16")).css("display","block");
			$(this.getElementByXid("row411_16")).css("display","block");
			this.storeQuery();
			this.comp("actActualData").setValue("studyMeeting","");
			this.comp("actActualData").setValue("mst","");
		}
	};
//---------------------------------过程管理------------------------------//
	Model.prototype.checkbox1611_4Change = function(event){		//过程管理勾选
		if(event.checked === true){
			$(this.getElementByXid("div221_4")).css("display","none");
			$(this.getElementByXid("col1211_16")).css("display","block");
			$(this.getElementByXid("row411_16")).css("display","block");
			this.comp("actActualData").setValue("exceptFlag","");
			this.comp("actActualData").setValue("studyMeeting","");
			this.comp("actActualData").setValue("mst","");
			this.comp("checkbox1411_4").set({"disabled":true});
			this.comp("checkbox1511_4").set({"disabled":true});
			this.storeQuery();
		}else{
			$(this.getElementByXid("div221_4")).css("display","block");		
			this.comp("actActualData").setValue("studyExceptFlag","");
			
		}
	};
	//----------------------------------------开始时间的确定回调-----------------------------
	Model.prototype.iDatetimePicker1_3Okfun = function(event){
		console.log(event.value);
	};

	Model.prototype.windowDialog1_4Received = function(event){
		var actActualVocData=this.comp('actActualVocData');
		if(event.data.rowData.val("whether")){//如果为修改模式带回的数据
			var row=actActualVocData.getRowByID(event.data.rowData.val("id"));
			actActualVocData.remove(row);
			actActualVocData.newData({ defaultValues:
	            [event.data.jsonData[0]]
			});
			var row2=actActualVocData.getRowByID(event.data.rowData.val("id"));
			actActualVocData.to(row2);
			this.comp("grid4").refresh();
		}else{
			actActualVocData.newData({ defaultValues:
//	            [event.data.jsonData[0]]
				event.data.json.rows
			});
		}
	};
	
	
	Model.prototype.saveClick = function(event){
		this.comp("iDyGrid1_2").save();
	};
	
//	--------------------------------------------开始时间的确定回调
	Model.prototype.iDatetimePicker1_1Okfun = function(event){
		if(this.comp("iDatetimePicker2_3").val() !== "00:00" && this.comp("iDatetimePicker2_3").val() !== "" && event.value > this.comp("iDatetimePicker2_3").val() ) {
			dialoghelper.error(messagehelper.get('act.fullcalendar.fullcalendarTime'));
			this.comp("iDatetimePicker2_3").clear();
			this.comp("iDatetimePicker1_1").clear();
		}
	}; 
	
//	结束时间的确定回调
	Model.prototype.iDatetimePicker2_3Okfun = function(event){
		if(event.value < this.comp("iDatetimePicker1_1").val()){
			dialoghelper.error(messagehelper.get('act.fullcalendar.fullcalendarTime'));
			this.comp("iDatetimePicker2_3").clear();
			this.comp("iDatetimePicker1_1").clear();
		}
	};
		
	
	Model.prototype.iDyGrid1_2AfterRender = function(event){
	
	};
	
	Model.prototype.dyXgridCellRender = function(event){
			var itemValue=event.colName;
			var rowId = event.rowID;
			var rows=this.comp("bdItemCatalogCopyData").find(["keymanId","catalogCode"],[rowId,itemValue],true);
			if(rows.length>0){
				event.html="<div class='normalTd'>"+event.html+"</div>";
//				this.comp('dyXgrid').setCell(event.rowID, itemValue, {backgroundColor:'#FFF'});
			
			}
	};
	Model.prototype.actActualItemstudyDataDataChange = function(event){
		var actionKeymenCnt=0;   //参与实施关键人数
		var storeChargerCnt=0;   //卖场担当者
		var exceptChargerCnt=0;   //担当者外
		var totalKeymenCnt=0;   //关键人总数
		var actionTotalKeymenCnt=0;   //参与实施的人数合计
		var implementationRate=0;   //实施比例
		
		if(event.col=="keymenCodes" || event.col =="storeChargerCnt" || event.col =="exceptChargerCnt"){
			if(event.row.row.totalKeymenCnt){
				if(event.row.row.totalKeymenCnt.value.latestValue){
					actionKeymenCnt=event.row.row.totalKeymenCnt.value.latestValue;
				}
				actionKeymenCnt=parseInt(totalKeymenCnt);
			}
			if(event.row.row.storeChargerCnt){
				if(event.row.row.storeChargerCnt.value.latestValue){
					storeChargerCnt=event.row.row.storeChargerCnt.value.latestValue;
				}
				storeChargerCnt=parseInt(storeChargerCnt);
			}
			if(event.row.row.exceptChargerCnt){
				if(event.row.row.exceptChargerCnt.value.latestValue){
					exceptChargerCnt=event.row.row.exceptChargerCnt.value.latestValue;
				}
				exceptChargerCnt=parseInt(exceptChargerCnt);
			}
			totalKeymenCnt=this.comp("actActualItemstudyData").getValue("totalKeymenCnt");
			if(!totalKeymenCnt){
				totalKeymenCnt=0;
			}
			totalKeymenCnt=parseInt(totalKeymenCnt);
			actionTotalKeymenCnt=actionKeymenCnt+storeChargerCnt+exceptChargerCnt;
			totalKeymenCnt=totalKeymenCnt+storeChargerCnt+exceptChargerCnt;
			implementationRate=actionTotalKeymenCnt+"/"+totalKeymenCnt;
//			this.comp("actActualItemstudyData").setValue("actionTotalKeymenCnt",actionTotalKeymenCnt);
//			this.comp("actActualItemstudyData").setValue("implementationRate",implementationRate);
		}
	};
	
	Model.prototype.input3_5Okfun = function(event){//---------活动计划时间值改变事件
		console.log(this.comp("select2_5").val());
		if(this.comp("select2_5").val()){
			this.dataClear();
			var data1 = {
				storeCode:this.comp("select2_5").val()
			};
			this.actActualKeymenQuery(data1);
		}
	};

	Model.prototype.gridSelect41_1ShowOption = function(event){

	};

	Model.prototype.iQuickSearch1_1ChooseAfter = function(event){
		var userName=event.val("keymanName");
		var row=this.comp("actActualKeymenData").getCurrentRow();
		row.row.keymanName.value.latestValue=userName;
		this.comp("grid1").refresh();
	};

	Model.prototype.button5Click = function(event){
		this.comp("windowDialog1_2").open();
	};	
	Model.prototype.button6Click = function(event){
		this.comp("windowDialog1_2").open();
	};
	//添加第7条现场维持
	Model.prototype.button3_2Click = function(event){			//5.卖场维持展示+按钮
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
		var data =this.comp('actActualStoreData');
		this.button(data);
		this.newChange();
	};
	//添加第8条调查
	Model.prototype.button2_2Click = function(event){			//6.他社ヘルパー調査+按钮
		
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
		var data =this.comp('actActualGuiderData');
		this.button(data);
		this.newChange();
	};
	
	
	
	
	return Model;
});