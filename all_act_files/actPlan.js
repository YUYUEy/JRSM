define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	var dataHelper = require("$UI/jrsm/js/datahelper");
	var messagehelper = require("$UI/jrsm/js/message");
	var jrsmCom = require("$UI/jrsm/js/jrsm.util");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	require("$UI/system/components/bootstrap/dropdown/dropdown");
	require("$UI/jrsm/module/lib/utils");
	
	var pageNo = 1;
	var _cMxDate;
	var _this;
	var _me;
	var storeArr;
	var storeArrId;
	var stateP;
	var rowId;
	var Enable;
	var sum;
	var filter;//出勤切换过滤条件
	
	var Model = function(){
		this.callParent();
		if ($('div').hasClass('jrsm-tab-windowA')) {
			var h = $(window).height();
			$(".jrsm-tab-windowA").css('height', h - 90);
		}
		$(window).resize(function() {
			if ($('div').hasClass('jrsm-tab-windowA')) {
				var h = $(window).height();
				$(".jrsm-tab-windowA").css('height', h - 89);
			}
		});
		
	};
	
//	页面加载
	Model.prototype.modelLoad = function(event){
		if ($('div').hasClass('jrsm-tab-windowA')) {
			$('.x-contents ').css({
				"overflow" : "hidden"
			});
			$.setNiceScrollByObj($('.jrsm-tab-windowA'));
		}
		 _me = this;
		 _this = this;
		
		this.comp('iDatetimePicker4_1').val("00:00");
		this.comp('iDatetimePicker3_1').val("00:00");
	};
	var storeOldCode;
//	页面参数接收
	Model.prototype.modelParamsReceive = function(event){
		var me = this;
		Enable = event.data.data.Enable;
		if ($('div').hasClass('jrsm-tab-windowA')) {
			$('.x-contents ').css({
				"overflow" : "hidden"
			});
			$.setNiceScrollByObj($('.jrsm-tab-windowA'));
		}
		this.comp("grid4").on("onCellRender", this.grid1CellRender, this);
//		this.comp("grid4").on("onRowClick", this.itemRowClick, this);
		//new 一个
		this.comp("actPlanData").newData({
			"defaultValues" : [ {
			  	rowId: '',
			  	planDate: '',
			  	workStartDate: '',
			  	workEndDate: '',	
			  	restdayFlag:'W1',									
			}]
		});
//		计划日期赋值
		rowId = event.data.data.rowId;//获取父页面传入的rowId
		stateP = event.data.data.state;//控制页面是否为查询模式的参数
		var createdBy = event.data.data.createdBy;
		if(rowId){
			var dataJ = {
				rowId:rowId,
				createdBy:createdBy
			};
			this.storeQuery(event);//店铺查询
			this.actPlan(dataJ);//查询回显
			var restDayFlag = this.comp("actPlanData").val("restdayFlag");
			storeOldCode = this.comp("actPlanData").getValue("storeCode");		//获取初始化店铺
			var ExceptFlag = this.comp("actPlanData").getValue("exceptFlag");		//获取初始化店铺
			console.log(storeOldCode);
			_cMxDate = event.data.data.cPlanDateK;//传入的时间
			this.comp("input31_35").val(_cMxDate);//赋值计划日期
			if(ExceptFlag!=1 ){//当店铺外活动没有勾上的时候
				this.storeEditQuery(dataJ);//关键人查询
			}
			this.actPlanActivity(dataJ);	//施策查询
			var storeCode =this.comp("select11_35").val();//获取店铺的编码
			var indata1=this.comp("actPlanData").val("workStartDate");//获取查询回显的开始时间
			console.log(indata1);
			var outData1=this.comp("actPlanData").val("workEndDate");//获取查询回显的结束时间
			var data1 = {//店铺编码作为查询条件
				storeCode:storeCode
			};
			this.catalogQuery(data1);
//			开始时间和终了时间的格式转换
			var ss =jrsmCom.dateToTime(indata1);
			var ss1 =jrsmCom.dateToTime(outData1);
			this.comp("iDatetimePicker4_1").val(ss);
			this.comp("iDatetimePicker3_1").val(ss1);
//--------------不是本人登录的情况下为查询模式,不可编辑
			console.log(stateP);
			if(stateP === "N"){
				var cols2=me.comp("grid1").$domNode.jqGrid('getGridParam', 'colModel');
				console.log(cols2);
				cols2[2].editable=false;
				var cols4=me.comp("grid4").$domNode.jqGrid('getGridParam', 'colModel');
				console.log(cols4);
				cols4[1].editable=false;
				cols4[2].editable=false;
				cols4[3].editable=false;
				cols4[4].editable=false;
				cols4[5].editable=false;
				this.comp("button3").set({"disabled":true});
				this.comp("radio31_35").set({"disabled":true});
				this.comp("radio411_35").set({"disabled":true});
				this.comp("radio51_35").set({"disabled":true});
				this.comp("iDatetimePicker4_1").set({"disabled":true});
				this.comp("iDatetimePicker3_1").set({"disabled":true});
				this.comp("select11_35").set({"disabled":true});
				this.comp("button11_35").set({"disabled":true});
				this.comp("checkbox141_35").set({"disabled":true});
				this.comp("checkbox151_35").set({"disabled":true});
				this.comp("textarea1").set({"disabled":true});
				this.comp("checkbox121_35").set({"disabled":true});
				this.comp("checkbox131_35").set({"disabled":true});
				this.comp("checkbox141_35").set({"disabled":true});
				this.comp("checkbox151_35").set({"disabled":true});
				this.comp("checkbox161_35").set({"disabled":true});				
			}else {
//				this.comp("grid4").on("onCellRender", this.grid1CellRender, this);
				this.comp("grid4").on("onRowClick", this.itemRowClick, this);
			}
		//   判断出勤方式为休日
			if(restDayFlag == "Y"){
				this.comp("radio51_35").set({"checked":true});
				this.radio51_35Change();//查询回显调用休日框的值改变时间
		//   判断出勤方式为生活展		
			}else if(restDayFlag == "W2"){
				this.comp("radio411_35").set({"checked":true});
				var studyExceptFlag = this.comp("actPlanData").getValue("studyExceptFlag");
				var processFlag = this.comp("actPlanData").getValue("processFlag");
				console.log(studyExceptFlag);
//			该计划为店铺外学会时显示的样式
				if(studyExceptFlag == 1){
					this.comp("checkbox141_35").set("disabled",false);
					this.comp("checkbox151_35").set("disabled",false);
					$(this.getElementByXid("div2_8")).css("display","none");
					$(this.getElementByXid("col151_35")).css("display","none");
					$(this.getElementByXid("div1_8")).css("display","none");
					$(this.getElementByXid("row7")).css("display","none");
					this.comp("keymanData").clear();
				}
//				过程管理限制
				if(processFlag == 1){
					$(this.getElementByXid("row12_35")).css("display","none");
					$(this.getElementByXid("row5")).css("display","none");
				}else{
					$(this.getElementByXid("row12_35")).css("display","");	
				}
				$(".div22_35").css("display","block");
				$(".x-checkboxyy").css("display","none");
				$(this.getElementByXid("row7")).css("display","none");
				$(".x-checkboxmq").css("display","block");
				$(".div31_35").css("display","block");
				$(".div41_35").css("display","none");
				$(this.getElementByXid("row1_6")).css("display","");
				if ($('div').hasClass('jrsm-tab-windowA')) {
					$.resizeScrollByObj($('.jrsm-tab-windowA'));
				} 
				storeArr = event.data.data.storeArr;
				storeArrId = event.data.data.storeArrId;
			}else if(restDayFlag == "W1"){
				var exceptFlag = this.comp("actPlanData").getValue("exceptFlag");//店铺活动以外字段
				if(exceptFlag == 1 ){
					$(this.getElementByXid("col151_35")).css("display","none");
					$(this.getElementByXid("div4_8")).css("display","none");
					$(this.getElementByXid("div3_8")).css("display","none");
					$(this.getElementByXid("row7")).css("display","none");
					$(this.getElementByXid("div1_8")).css("display","none");
					$(this.getElementByXid("div2_8")).css("display","none");
					this.comp("storeNameData").clear();
					this.comp("actPlanData").setValue("storeCode","");
					this.comp("actPlanData").setValue("storeName","");
				}
				storeArr = event.data.data.storeArr;
				storeArrId = event.data.data.storeArrId;
			}
		}else {
			this.storeQuery(event);
			//在没有传递rowId的情况显示的计划时间
			_cMxDate = event.data.data.cPlanDateY;
			storeArr = event.data.data.storeArr;
			storeArrId = event.data.data.storeArrId;
			this.comp("input31_35").val(_cMxDate);		
			this.comp("grid4").on("onRowClick", this.itemRowClick, this);
			sum = 0;
		}
	
	};
	
	//回显，
	Model.prototype.actPlan = function(event){
		var actPlanData  = this.comp('actPlanData');
		console.log(event);
		global.ajax({		    
			url:"/jrsm/actPlan/query",
			data:event,
			async : false,
			success: function(Data){
				console.log(Data.data);
				actPlanData.clear();
				if(Data.data.length>0){
					actPlanData.newData({
						"index":0,
						"defaultValues" : [ {
						rowId: Data.data[0].rowId,
						planDate: Data.data[0].planDate,
						workStartDate:Data.data[0].workStartDate,
						workEndDate:Data.data[0].workEndDate,
						restdayFlag:Data.data[0].restdayFlag,							
						storeName:Data.data[0].storeName,
						otherSchedule:Data.data[0].otherSchedule,
						studyMeeting:Data.data[0].studyMeeting,
						mst:Data.data[0].mst,
						catalogName:Data.data[0].catalogName,
						exceptFlag:Data.data[0].exceptFlag,
						storeCode:Data.data[0].storeCode,
						studyExceptFlag:Data.data[0].studyExceptFlag,
						processFlag:Data.data[0].processFlag
						} ]
					});	
					var rows = _this.comp('storeNameData').find(['storeCode'],[Data.data[0].storeCode]);
					console.log( rows);
					if(rows.length ===0){							
						_this.comp('storeNameData').newData({
							"index":0,
							"defaultValues" : [ {
//								rowId: Data.data[0].rowId,
								storeCode:Data.data[0].storeCode,
								storeName:Data.data[0].storeName
							} ]
						});	
						_this.comp("select11_35").val(Data.data[0].storeCode);
						
						console.log( _this.comp('storeNameData'));							
					}
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	// 下拉查询店铺
	Model.prototype.storeQuery = function(event){
		var _this = this;
		global.ajax({
			url : "/jrsm/bdSalesStore/queryStore",
			async : false,
			success : function(resultData) {
				console.log(resultData);
				_this.comp('storeNameData').clear();
				_this.comp('storeNameData').loadData(resultData.data);
				_this.comp('storeNameData').refreshData();
			}
		});	
	};
	
	//	新增查询关键人，如果在此增加条件作为关键人条件，
//	则需要在actPlanKeymen的queryPlanEdit实现方法中去添加条件作为关键人查询
	Model.prototype.kymKeymanQuery = function(event){
		var keymanData  = this.comp('keymanData');

		global.ajax({
			url : "/jrsm/kymKeyman/queryPlan",
			async : false,
			data: {
					storeCode: event.storeCode,
					storeOldCode: event.storeOldCode,
					actionPlanId: event.actionPlanId
			},
			success : function(Data) {
				console.log(Data.data);
				if(Data.data.length > 0){
					for(var i =0;i<Data.data.length;i++){
						keymanData.newData({
							"defaultValues" : [ {
								id:i,
								keymanCode: Data.data[i].rowId,
								keymanName:Data.data[i].keymanName
							} ]
						});
					}	
				}		
			}
		});	
	};
	
	//	编辑查询关键人
	Model.prototype.storeEditQuery = function(event){
		var _this = this;
		debugger
		var storeCode = this.comp("actPlanData").getValue("storeCode");
		var keymanData = this.comp("keymanData");
		if(event.rowId){
			global.ajax({
				url:"/jrsm/actPlanKeymen/queryPlanEdit",
				data:{
					"actionPlanId":event.rowId, 
					"storeCode": storeCode,
					"storeOldCode": storeCode,	//初始化的店铺
				},
				success:function(data){
					console.log(data.data);
					for(var i = 0;i<data.data.length; i++){
						_this.comp("keymanData").newData({
							"defaultValues" : [ {
								id:i,
								rowId: data.data[i].rowId,
								entityId: data.data[i].entityId,
								keymanName: data.data[i].keymanName,	
								keymanCode:data.data[i].keymanCode,
								actionPlanId: data.data[i].actionPlanId	,
								planFlag:data.data[i].planFlag	
							} ]
						});
					}
					
				}
			});
		}
	};
	//施策查询
	Model.prototype.actPlanActivity = function (event) {
		var _this = this;
		var planActivityData = this.comp('planActivityData');
		global.ajax({
			url:"/jrsm/actPlanActivity/query",
			data:{"actionPlanId":event.rowId},
			success:function(data){
				sum = data.data.length-1;
				for(var i = data.data.length-1;i >=0; i--){
					_this.comp('planActivityData').newData({
						"index":0,
						"defaultValues" : [ {
						id:i,
						rowId: data.data[i].rowId,
						actionPlanId: data.data[i].actionPlanId,
						activityId: data.data[i].activityId,	
						bigCatalogName: data.data[i].bigCatalogName,	
						entityId: data.data[i].entityId,
						implementFlag: data.data[i].implementFlag,	
						proposalFlag: data.data[i].proposalFlag,
						purposeFlag: data.data[i].purposeFlag,	
						smallCatalogName: data.data[i].smallCatalogName,							
						} ]
					});
				}
			}
		});
	};
	var getInfo = [];
	var getRowInfo = [];
	//下拉查询施策类型
	Model.prototype.catalogQuery = function (event) {
		console.log(filter);
		var url = "/jrsm/actActivity/queryPlan";
		var catalogData = this.comp("actActivityData");
		var grild2 = {
				url:url,
				storeCode:event.storeCode,
				queryData:catalogData,
				creationDate:_cMxDate,
				activityType:filter
		};
		this.queryClick(grild2);
		getInfo =(grild2.queryData.datas).latestValue;
		console.log(getInfo);
		getInfo.forEach(function(val){
			console.log(val.row);
			getRowInfo.push({
				
			});
		});
		console.log(rowId);
	};

	//查询后台数据
	Model.prototype.queryClick = function(event){
		_this = event.queryData;
		console.log(event.creationDate)
		global.ajax({
			url : event.url,
			async : false,
			data : {
				"actionPlanId":event.actionPlanId,
				"activityId":event.activityId,
				"storeCode":event.storeCode,
				"creationDate":event.creationDate,
				"activityType":event.activityType
			},
			success : function(resultData){
				if (resultData.__statusCode == 'S') {
					_this.clear();
					_this.loadData(resultData.data);
					_this.refreshData();
					_this.setTotal(resultData.__pagecount);
					_this.loadPageData(pageNo);
				}
			},
			error : function(status) {
				var msg='An error happened, please contact admin!';
				var options = {"type":"danger", "delay":8000, "style":"width:350px;font-size:16px;color:#F01130;", "position":"middle"};
				justep.Util.hint(msg, options);
			}
		});
	};
	
	//店铺选择.同时执行查询关键人和四半期中的施策
	Model.prototype.select11_35Change = function(event){
		this.comp("planActivityData").clear();
		this.comp("keymanData").clear();
		var storeCode = event.value;		
		var store=this.comp("storeNameData").find(['storeCode'], [storeCode], true);	
		var storeName = store[0].row.storeName.value.latestValue;
		this.comp("actPlanData").setValue("storeName",storeName);		
		var data = {
			storeCode:storeCode
		};
		var data1 ={
				storeCode: storeCode,		//下拉勾选的店铺
				storeOldCode: storeOldCode,	//初始化的店铺
				rowId: rowId
		};
		var data2 = {
			rowId: rowId
		};
		console.log(data1);
		if(rowId){
			this.storeEditQuery(data1);
		}else{
			this.kymKeymanQuery(data1);
		}
		this.catalogQuery(data);
		if ($('div').hasClass('jrsm-tab-windowA')) {
			$.resizeScrollByObj($('.jrsm-tab-windowA'));
		} 
		if(storeCode === storeOldCode && rowId !=null){
			this.actPlanActivity(data2);	//施策查询
		}
	};
	//施策,选择查询回显
	Model.prototype.gridSelect11_20UpdateValue = function(event){
//		var _this2 = this;
		var planActivityData=this.comp("planActivityData");
		var _row = planActivityData.getCurrentRow();
		var actActivity = this.comp("actActivityData");
		var activityId = actActivity.getCurrentRowID();
		var row1 = actActivity.getCurrentRow();
		console.log(row1);
		planActivityData.setValue("activityId",row1.row.rowId.value.latestValue, _row);
		planActivityData.setValue("bigCatalogName",row1.row.bigCatalogName.value.latestValue, _row);
		planActivityData.setValue("smallCatalogName",row1.row.smallCatalogName.value.latestValue, _row);
		planActivityData.setValue("bigCatalogId",row1.row.bigCatalogId.value.latestValue, _row);
		planActivityData.setValue("smallCatalogId",row1.row.smallCatalogId.value.latestValue, _row);
		
		global.ajax({		    
			url:"/jrsm/actPlanActivity/queryById",
			data:{"activityId":activityId},
			success: function(resultData){
				_row.val("proposalFlag","1");
				return;
					
				if(resultData.data.length>0){
//					_planActivityData.setValue("rowId",data.data[0].rowId, _row)
					_row.val("proposalFlag",resultData.data[0].proposalFlag);
					_row.val("purposeFlag",resultData.data[0].purposeFlag);
					_row.val("implementFlag",resultData.data[0].implementFlag);
					console.log(row1);
//					_this2.comp("column21_20").set({"editable":false});
				}else{
					_row.val("proposalFlag","");
					_row.val("purposeFlag", "");
					_row.val("implementFlag", "");
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});					
	};
	
	Model.prototype.itemRowClick = function(event) {
		var row = event.row;
		var domButton = $(event.domEvent.target);// 获取点击的元素
		var lookupData = this.comp("planActivityData");
		if (domButton.hasClass("disabledBtn")) {// 判断是否包含某个样式
			 lookupData.confirmDelete = false;
			 lookupData.directDeleteMode = true;
			 lookupData.deleteData(row);
		}
	};
	
	Model.prototype.grid1CellRender = function(event) {
		if (event.colName == 'operation') {
			if(stateP == "N"){
				var delcor = "#999999 !important";
			}
			var deleteBtn = "<a href='#' id='delbtn' class='mdm-grid-cell-a disabledBtn' style='color:"+ delcor +"' title='" + messagehelper.get("msgDial.delete") + "'>" + messagehelper.get("msgDial.delete")
					+ " </a>";
			event.html = deleteBtn ;
		}
	};
	//点击按钮新增grid表格
	Model.prototype.button3Click = function(event){
		sum ++;
		this.comp('planActivityData').newData({
			 "defaultValues":
			 [
               {id:sum},
               ]		
			}		
		);
		if ($('div').hasClass('jrsm-tab-windowA')) {
			$.resizeScrollByObj($('.jrsm-tab-windowA'));
		}
	};
	
	//出勤(临店,社内活动)
	Model.prototype.radio31_35Change = function(event){
		filter = null;
		var restDay = this.comp("actPlanData").ref("restdayFlag");
		restDay.latestValue = "W1";
		this.comp("actPlanData").setValue("storeCode","");
		this.comp("actPlanData").setValue("storeName","");
		$('.selectS').empty();
		this.storeQuery();//查询店铺
		this.comp("planActivityData").clear();//清空计划施策
		$(this.getElementByXid("row12_35")).css("display","none");
		$(".x-checkboxyy").css("display","block");
		$(".x-checkboxmq").css("display","none");
		$(".div31_35").css("display","block");
		$(".div41_35").css("display","none");
		$(this.getElementByXid("row7")).css("display","block");
		$(this.getElementByXid("div1_8")).css("display","block");
		this.comp("actPlanData").setValue("otherSchedule","");//清空文本框
		this.comp("actPlanData").setValue("studyExceptFlag","");
		this.comp("checkbox141_35").set("disabled",true);
		this.comp("checkbox151_35").set("disabled",true);
		this.comp("checkbox141_35").set("checked",false);
		this.comp("checkbox151_35").set("checked",false);
		$(this.getElementByXid("checkbox161_35")).css("display","block");
		$(this.getElementByXid("div2_8")).css("display","block");
		$(this.getElementByXid("col151_35")).css("display","");
		this.comp("actPlanData").setValue("processFlag","");
		$(this.getElementByXid("row5")).css("display","");
		$(this.getElementByXid("row1_6")).css("display","none");
		this.comp("iDatetimePicker4_1").clear();//清空开始时间
		this.comp("iDatetimePicker3_1").clear();//清空结束时间
		this.comp("iDatetimePicker4_1").val("00:00");//重新赋值
		this.comp("iDatetimePicker3_1").val("00:00");//重新赋值
	};
	
	//	出勤(MST,生活展)
	Model.prototype.radio411_35Change = function(event){
		filter = "B";
		var restDay = this.comp("actPlanData").ref("restdayFlag");
		restDay.latestValue = "W2";
		this.comp("actPlanData").setValue("storeCode","");//切换出勤方式时清空店铺
		this.comp("actPlanData").setValue("storeName","");//清空店铺
		$('.selectS').empty();//清空店铺
		this.storeQuery();//查询店铺
		this.comp("planActivityData").clear();
		this.comp("keymanData").clear();	
		$(".x-checkboxyy").css("display","none");
		$(this.getElementByXid("row7")).css("display","none");
		$(this.getElementByXid("div1_8")).css("display","none");
		$(".x-checkboxmq").css("display","block");
		$(".div31_35").css("display","block");
		$(".div41_35").css("display","none");	
		this.comp("actPlanData").setValue("otherSchedule","");//清空文本框
		this.comp("actPlanData").setValue("exceptFlag","");
		$(this.getElementByXid("col151_35")).css("display","");
		$(this.getElementByXid("div4_8")).css("display","");
		$(this.getElementByXid("div3_8")).css("display","");
		$(this.getElementByXid("row7")).css("display","");
		$(this.getElementByXid("div1_8")).css("display","");
		$(this.getElementByXid("div2_8")).css("display","");
		$(this.getElementByXid("row1_6")).css("display","");
		$(this.getElementByXid("row12_35")).css("display","");
		if ($('div').hasClass('jrsm-tab-windowA')) {//重置滚动条
			$.resizeScrollByObj($('.jrsm-tab-windowA'));
		} 	
		this.comp("iDatetimePicker4_1").clear();//清空开始时间
		this.comp("iDatetimePicker3_1").clear();//清空结束时间
		this.comp("iDatetimePicker4_1").val("00:00");//重新赋值
		this.comp("iDatetimePicker3_1").val("00:00");//重新赋值
		this.comp("actPlanData").setValue("mst","");
		this.comp("actPlanData").setValue("studyMeeting","");
	};
	
	//	休日
	Model.prototype.radio51_35Change = function(event){
		var restDay = this.comp("actPlanData").ref("restdayFlag");
		 restDay.latestValue = "Y";
		this.comp("storeNameData").clear();//清空店铺
		this.comp("actActivityData").clear();//清空施策
		this.comp("keymanData").clear();//清空关键人
		this.comp("planActivityData").clear();
		$(".div41_35").css("display","block");
		$(".div31_35").css("display","none");
		this.comp("iDatetimePicker4_1").clear();//清空开始时间
		this.comp("iDatetimePicker3_1").clear();//清空结束时间
		this.comp("iDatetimePicker4_1").val("00:00");//重新赋值
		this.comp("iDatetimePicker3_1").val("00:00");//重新赋值
		this.comp("actPlanData").setValue("otherSchedule","");//清空文本框
	};
	
	//店铺外的学习会
	Model.prototype.checkbox131_35Change = function(event){
		if(event.checked === true){
			this.comp("storeNameData").clear();
			this.comp("keymanData").clear();
			this.comp("planActivityData").clear();
			this.comp("actPlanData").setValue("storeCode","");
			this.comp("actPlanData").setValue("storeName","");
			$('.selectS').empty();
			this.comp("checkbox141_35").set("disabled",false);
			$(this.getElementByXid("checkbox141_35")).attr("disabled", false);		//checkbox兼容IE11
			$(this.getElementByXid("checkbox151_35")).attr("disabled", false);
			this.comp("checkbox151_35").set("disabled",false);
			$(this.getElementByXid("div2_8")).css("display","none");
			$(this.getElementByXid("col151_35")).css("display","none");
			$(this.getElementByXid("div1_8")).css("display","none");
			$(this.getElementByXid("row7")).css("display","none");
		}else{
			this.storeQuery();
			this.comp("checkbox141_35").set("disabled",true);
			this.comp("checkbox151_35").set("disabled",true);
			this.comp("checkbox141_35").set("checked",false);
			this.comp("checkbox151_35").set("checked",false);
			this.comp("actPlanData").setValue("studyMeeting","");
			this.comp("actPlanData").setValue("mst","");
			$(this.getElementByXid("div2_8")).css("display","");
			$(this.getElementByXid("col151_35")).css("display","");
			$(this.getElementByXid("div1_8")).css("display","");
			$(this.getElementByXid("row7")).css("display","");
		}
	};		
	//店铺活动以外多选框
	Model.prototype.checkbox121_35Change = function(event){
		if(event.checked === true){
			this.comp("storeNameData").clear();
			this.comp("keymanData").clear();
			this.comp("planActivityData").clear();
			var storeCode = this.comp("actPlanData").setValue("storeCode","");
			this.comp("actPlanData").setValue("storeName","");
			$('.selectS').empty();
			console.log(storeCode);
			$(this.getElementByXid("col151_35")).css("display","none");
			$(this.getElementByXid("div4_8")).css("display","none");
			$(this.getElementByXid("div3_8")).css("display","none");
			$(this.getElementByXid("row7")).css("display","none");
			$(this.getElementByXid("div1_8")).css("display","none");
			$(this.getElementByXid("div2_8")).css("display","none");
		}else{
			this.storeQuery();
			$(this.getElementByXid("col151_35")).css("display","block");
			$(this.getElementByXid("div4_8")).css("display","block");
			$(this.getElementByXid("div3_8")).css("display","block");
			$(this.getElementByXid("row7")).css("display","block");
			$(this.getElementByXid("div1_8")).css("display","block");
			$(this.getElementByXid("div2_8")).css("display","block");
			this.comp("keymanData").clear();
		}
	};
	
//   过程管理值改变事件
	Model.prototype.checkbox161_35Change = function(event){
		if(event.checked === true){
			$(this.getElementByXid("row12_35")).css("display","none");
			$(this.getElementByXid("row5")).css("display","none");
			this.comp("actPlanData").setValue("studyExceptFlag","");
			$(this.getElementByXid("div2_8")).css("display","block");
			$(this.getElementByXid("col151_35")).css("display","");
			$(this.getElementByXid("div1_8")).css("display","block");
			$(this.getElementByXid("row7")).css("display","block");
			this.storeQuery();
		}else {
			$(this.getElementByXid("row12_35")).css("display","");
			$(this.getElementByXid("row5")).css("display","");
			this.comp("checkbox141_35").set("disabled",true);
			this.comp("checkbox151_35").set("disabled",true);
			this.comp("actPlanData").setValue("studyMeeting","");
			this.comp("actPlanData").setValue("mst","");
		}
	}; 
//--------------------------------------------------------保存操作-------------------------------------------------//
	Model.prototype.button1_4Click = function(event){
		var me = this;
		//限制店铺不能为空
		var restdayFlag = this.comp("actPlanData").getValue("restdayFlag");
		console.log(restdayFlag);
		//限制结束时间不能大于开始时间
		if(this.comp("iDatetimePicker4_1").val() > this.comp("iDatetimePicker3_1").val()){
			dialoghelper.error(messagehelper.get('act.fullcalendar.fullcalendarTime'));
			return;
		}
		var indata = this.comp("iDatetimePicker4_1");
		var outData=this.comp("iDatetimePicker3_1");
		var indata1 = this.comp("input1_11");
		var outData1=this.comp("input2_11");
//		当出勤方式不为休日限制店铺不能为空
		if(restdayFlag == "Y"){
		   indata1.val(_cMxDate+" 09:00:00");	
		   outData1.val(_cMxDate+" 18:00:00");
		}else{
		   indata1.val(_cMxDate+" "+indata.val()+":00");	
		   outData1.val(_cMxDate+" "+outData.val()+":00");
		   var exeFlag = this.comp("actPlanData").getValue("exceptFlag");
		   var studyExceptFlag = this.comp("actPlanData").getValue("studyExceptFlag");
		   if((exeFlag != 1) && (studyExceptFlag != 1) && (this.comp("select11_35").val() === null)){
				dialoghelper.error(messagehelper.get('act.plan.store'));
				return;
		   }
		}
//		当该天有计划或者实绩时 限制变更休日
		debugger
		if((restdayFlag == "Y") && (storeArrId != false)){
			dialoghelper.error(messagehelper.get('act.plan.holiday'));
			return;
		}
		var planDate = _cMxDate;
		this.comp('actPlanData').setValue("planDate",planDate);
		var addData = this.comp('actPlanData');
		var keymanData = this.comp('keymanData');
		var planActivityData = this.comp('planActivityData');
		var lastValues = planActivityData.datas.latestValue;
		console.log(lastValues);
		for(var i=0;i<lastValues.length;i++){
			var smallCatalog = lastValues[i].row.activityId.value.latestValue;//施策
			var proposalFlag = lastValues[i].row.proposalFlag.value.latestValue;//提案
			var purposeFlag = lastValues[i].row.purposeFlag.value.latestValue;
			var implementFlag = lastValues[i].row.implementFlag.value.latestValue;
			if(!smallCatalog){
				dialoghelper.error(messagehelper.get('act.plan.Shice1'));//施策不能为空
				return;
			}
			if ((!proposalFlag) && (!purposeFlag) && (!implementFlag)){
				dialoghelper.error(messagehelper.get('act.plan.Shice2'));//施策没有选上计划
				return;
			}
			//添加多条施策计划时 , 限制施策不能为空
			for(var j=i+1;j<lastValues.length;j++){
				var smallCatalogD = lastValues[j].row.activityId.value.latestValue;
				if(!smallCatalogD){
					dialoghelper.error(messagehelper.get('act.plan.Shice1'));//施策不能为空
					return;
				}
				if(smallCatalog == smallCatalogD){
					dialoghelper.error(messagehelper.get('act.plan.Shice3'));//同一条施策不能多次使用
				}
			}
			for(var m=0;m<lastValues.length;m++){
				var smallCatalog2 = lastValues[m].row.activityId.value.latestValue;//施策
				var proposalFlag2 = lastValues[m].row.proposalFlag.value.latestValue;//提案
				var purposeFlag2 = lastValues[m].row.purposeFlag.value.latestValue;
				var implementFlag2 = lastValues[m].row.implementFlag.value.latestValue;
				if(smallCatalog2 === null){
						dialoghelper.error(messagehelper.get('act.plan.Shice1'));//施策不能为空
						return;
				}
				if (proposalFlag2 === null && purposeFlag2 === null && implementFlag2 === null){
					dialoghelper.error(messagehelper.get('act.plan.Shice2'));//施策没有选上计划
					return;
				}
				for(var k=m+1;k<lastValues.length;k++){
					var smallCatalogD2 = lastValues[k].row.activityId.value.latestValue;
					if(smallCatalogD2 === null){
						dialoghelper.error(messagehelper.get('act.plan.Shice1'));//施策不能为空
						return;
					}
					if(smallCatalog2 == smallCatalogD2){
						dialoghelper.error(messagehelper.get('act.plan.Shice3'));//同一条施策不能多次使用
						return;
					}	
				}
			}
		}
		var data =dataHelper.getHeadListDataToJson(
				addData,
				keymanData,"actPlanKeymen",
				planActivityData,"actPlanActivity"
		);
		console.log(data);
		global.ajax({
			url:"/jrsm/actPlan/save",
			async:false,
			data:data,
			success:function(data){
				dialoghelper.info(messagehelper.get('request.save.success'));
				me.close();
				if(!Enable){
					me.getParent().initMonth();
				}
			}
		});		
	};
	
	//刷新滚动条	
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
	
//开始时间值改变事件
	Model.prototype.iDatetimePicker4_1Okfun = function(event){
		console.log(event.value);
		var endTime = this.comp("iDatetimePicker3_1").val();
		if(endTime !== "00:00" && endTime !== "" && event.value > endTime ) {
			dialoghelper.error(messagehelper.get('act.fullcalendar.fullcalendarTime'));
//			this.comp("iDatetimePicker3_1").clear();
//			this.comp("iDatetimePicker4_1").clear();
		}
		console.log(this.comp("select11_35").val());
	}; 
//	结束时间值改变事件
	Model.prototype.iDatetimePicker3_1Okfun = function(event){
		var startTime = this.comp("iDatetimePicker4_1").val();
		console.log(startTime > event.value);
		if(event.value < startTime){
			dialoghelper.error(messagehelper.get('act.fullcalendar.fullcalendarTime'));
//			this.comp("iDatetimePicker3_1").clear();
//			this.comp("iDatetimePicker4_1").clear();
		}
	};
	
	
	Model.prototype.modelActive = function(event){

	}; 
	
	Model.prototype.planActivityDataDataChange = function(event){
		if (event.col != 'smallCatalogName')  return;
		var planActivityData=this.comp("planActivityData");
		var _row = planActivityData.getCurrentRow();
		
		if (! _row) return;
		var cols2=this.comp("grid4").$domNode.jqGrid('getGridParam', 'colModel');
		console.log( cols2);
		
//		cols2[5].editable=false;
		
		var actActivity = this.comp("actActivityData");
		var activityId = actActivity.getCurrentRowID();
		console.log(activityId);
		var row1 = actActivity.getCurrentRow();
		planActivityData.setValue("activityId",row1.row.rowId.value.latestValue, _row);
		planActivityData.setValue("bigCatalogName",row1.row.bigCatalogName.value.latestValue, _row);
		planActivityData.setValue("smallCatalogName",row1.row.smallCatalogName.value.latestValue, _row);
		planActivityData.setValue("bigCatalogId",row1.row.bigCatalogId, _row);
		planActivityData.setValue("smallCatalogId",row1.row.smallCatalogId, _row);
		
		global.ajax({		    
			url:"/jrsm/actPlanActivity/queryById",
			data:{"activityId":activityId},
			success: function(resultData){
//				activityId == 1620 ? _row.val("proposalFlag","1"):_row.val("proposalFlag","");
//				return;
				
				if(resultData.data.length>0){
					_row.val("proposalFlag",resultData.data[0].proposalFlag);
					_row.val("purposeFlag",resultData.data[0].purposeFlag);
					_row.val("implementFlag",resultData.data[0].implementFlag);
					console.log(row1);
				}else{
					_row.val("proposalFlag","");
					_row.val("purposeFlag", "");
					_row.val("implementFlag", "");
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});					
	
	}; 
	
	Model.prototype.grid4CellRender = function(event){
		if (event.colName == 'proposalFlag') {
			if (event.colVal) {
				var _html = $('<div />').append(event.html);
				_html.find('input[checked]').attr("disabled", "disabled");
				event.html = _html.html();
			}
		}else if (event.colName == 'purposeFlag') {
			if (event.colVal) {
				var _html2 = $('<div />').append(event.html);
				_html2.find('input[checked]').attr("disabled", "disabled");
				event.html = _html2.html();
			}
		}else if (event.colName == 'implementFlag') {
			if (event.colVal) {
				var _html3 = $('<div />').append(event.html);
				_html3.find('input[checked]').attr("disabled", "disabled");
				event.html = _html3.html();
			}
		}	
	}; 
	
	return Model;
});
