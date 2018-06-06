define(function(require) {
	var $ = require("jquery");
	var messagehelper = require("$UI/jrsm/js/message");
	var global = require("$UI/portal/base/global");
	var justep = require("$UI/system/lib/justep");
	var jrsmCom =	require("$UI/jrsm/js/jrsm.util");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/system/components/bootstrap/dropdown/dropdown");
	require("$UI/jrsm/module/lib/utils");
	
	var me;
	var stateIte;
	var Model = function() {
		this.callParent();
		if ($('div').hasClass('jrsm-tab-window')) {
			var h = $(window).height();
			$(".jrsm-tab-window").css('height', h - 100);
		}
		$(window).resize(function() {
			if ($('div').hasClass('jrsm-tab-window')) {
				var h = $(window).height();
				$(".jrsm-tab-window").css('height', h - 99);
			}
		});
	};
	var _this;
	
	//按钮生成绑定
	Model.prototype.modelParamsReceive = function(event) {
//	    给grid动态添加按钮
		this.comp("grid1").on("onCellRender", this.grid1CellRender, this);
		this.comp("grid2").on("onCellRender", this.grid2CellRender, this);
		stateIte = this.getContext().getRequestParameter('state');
		this.comp("grid1").on("onRowClick", this.grid1itemRowClick, this);
		this.comp("grid2").on("onRowClick", this.grid2itemRowClick, this);

	};
	
	//grid1列表按钮添加
	Model.prototype.grid1CellRender = function(event) {
		if(stateIte == "N"){
			var delCor = "#999999 !important";
		}
		if (event.colName == 'work') {
			var editBtn = "<a href='#' class='mdm-grid-cell-a selectBtn1' title='" + messagehelper.get("act.plan.I0001") + "'>" + messagehelper.get("act.plan.I0001")
					+ " </a>";
			event.html = editBtn ;

		}
		if (event.colName == 'operation') {
			var deleteBtn = "<a href='#' class='mdm-grid-cell-a disabledBtn1' style='color:"+ delCor +"' title='" + messagehelper.get("msgDial.delete") + "'>"
					+ messagehelper.get("msgDial.delete") + "</a>";

			event.html = deleteBtn;

		}
	};
	//grid2列表按钮添加
	Model.prototype.grid2CellRender = function(event) {	
		if(stateIte == "N"){
			var delCor = "#999999 !important";
		}
		if (event.colName == 'work') {
			var editBtn = "<a href='#' class='mdm-grid-cell-a selectBtn2' title='" + messagehelper.get("act.plan.I0001") + "'>" + messagehelper.get("act.plan.I0001")
					+ " </a>";
			event.html = editBtn;

		}
		if (event.colName == 'operation') {
			var deleteBtn = "<a href='#' class='mdm-grid-cell-a disabledBtn2' style='color:"+ delCor +"' title='" + messagehelper.get("msgDial.delete") + "'>"
					+ messagehelper.get("msgDial.delete") + "</a>";

			event.html = deleteBtn;

		}
	};

	
	//绑定点击按钮，删除和编辑
	Model.prototype.grid1itemRowClick = function(event) {
	
		var planDialog = this.comp("planDialog");		
		//查询明细		
			var data = {
					event:event,
					LookUpDialog:planDialog
			};
			this.itemRowClick(data);
	
	};
		//绑定点击按钮，删除和编辑
	Model.prototype.grid2itemRowClick = function(event) {
		
		var planDialog = this.comp("actualDialog");		
		//查询明细		
			var data = {
					event:event,
					LookUpDialog:planDialog
			};
			this.itemRowClick(data);

	};
	
	Model.prototype.saveOrupdate = function(event,rowId,url,title) {				

			var options = {
				title : title, // 非必须 -- 页签名称
				url : url,
				close : true
			// 是否允许关闭
			};
//			debugger
		this.getParent().newTab(event, options);
	};
	
	//绑定点击按钮，删除和编辑
	Model.prototype.itemRowClick = function(event) {
		me = this;
		console.log(event);
		var rowId = event.event.rowID;//获取行ID
		var act = event.event.storeName;
		var createdBy = this.getContext().getRequestParameter('createdBy');
		console.log(createdBy)
		var cMxDate = this.getContext().getRequestParameter('cPlanDateM');
		var storeCodes = [];
		var rowIDs = []
		var datas=this.comp('planData').allDatas.latestValue;
		console.log(datas);
		datas.forEach(function(val){
			storeCodes.push(val.row.storeCode.value.latestValue);
			rowIDs.push(val.row.rowId.value.latestValue);
		});
		console.log(storeCodes);
		
		var Enable  = "yes";
		var domButton = $(event.event.domEvent.target);// 获取点击的元素
		if (domButton.hasClass("selectBtn1")) {	//跳转计划页面			
			me.comp("windowDialog1_5").open({"data":{"rowId":rowId,"cPlanDateK":cMxDate,"storeArr":storeCodes,"storeArrId":rowIDs,"state":stateIte,"createdBy":createdBy,"Enable":Enable},title:messagehelper.get("act.fullcalendar.actPlan1")});
		}
		if (domButton.hasClass("selectBtn2")) { //跳转实际页面
			me.comp("windowDialog2_5").open({"data":{"rowId":rowId,"cMxDate":cMxDate,"Enable":Enable},title:messagehelper.get("act.fullcalendar.actActua2")});
		}	
		
		//删除
		if (domButton.hasClass("disabledBtn1")) {// 判断是否包含某个样式	
			if(stateIte == "Y"){
				dialoghelper.confirmMsg(messagehelper.get("msgDial.submitDelete"),_this.deleteRow,null,null,"actPlan",rowId);
			}
		}
		
		//删除
		if (domButton.hasClass("disabledBtn2")) {// 判断是否包含某个样式
			if(stateIte == "Y"){
				dialoghelper.confirmMsg(messagehelper.get("msgDial.submitDelete"),_this.deleteRow,null,null,"actActual",rowId);
			}					
		}
	};
	//执行删除
	Model.prototype.deleteRow =  function (event) {
		 global.ajax({		    
				url:"/jrsm/"+event.className+"/delete",
				data:{rowId:event.rowId},
				success: function(Data){
//					console.log(Data.__pagecount);
					if(100==Data.__pagecount){
						dialoghelper.info(messagehelper.get("act.actPlanItem.I0001"));
					}else{			
						_this.grid1Query();
						_this.grid2Query();
					}
					
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			})
	}
	//页面显示
	Model.prototype.queryClick = function(event) {
		var  addData= event.addData;
		global.ajax({		    
				url:event.url,
				data:event.data,
				success: function(Data){
					console.log(Data);
					addData.clear();
					for(var i=0;Data.data.length>i;i++){
					 if(Data.data[i]){	
						if(event.url =="/jrsm/actPlan/queryByStore"){
							var workStartDate =jrsmCom.dateToTime(Data.data[i].workStartDate);
							var workEndDate = jrsmCom.dateToTime(Data.data[i].workEndDate);
							
							
						  } else {							 
							var workStartDate =jrsmCom.dateToTime(Data.data[i].inDate);
								  var workEndDate = jrsmCom.dateToTime(Data.data[i].outDate);					
							 }
						 		
					  }			
					      var workDate = workStartDate +" ~"+ workEndDate;						
						  addData.newData({
							  "defaultValues" : [ {
								  rowId: Data.data[i].rowId,
								  storeName: Data.data[i].storeName,
								  storeCode: Data.data[i].storeCode,
								  workDate:workDate				
							  } ]
						 });		
					 }					
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
	};

	//页面初始化
	Model.prototype.modelLoad = function(event){
		var me = this;
		_this = this;
		me.grid1Query();
		me.grid2Query();
		if ($('div').hasClass('jrsm-tab-window')) {
			$('.x-contents ').css({
				"overflow" : "hidden"
			});
			$.setNiceScrollByObj($('.jrsm-tab-window'));
		}
	};
		//grid1查询
	Model.prototype.grid1Query = function(event){
		var timeId = this.getContext().getRequestParameter('cPlanDateM');
		var createdBy = this.getContext().getRequestParameter('createdBy');
		console.log(createdBy)
		var url = "/jrsm/actPlan/queryByStore";
		var planData  = this.comp('planData');
		var grid1 ={ 
				url:url,
				data:{"planDate":timeId,createdBy:createdBy},
				addData:planData
		}
		this.queryClick(grid1);

	};
	//grid2查询
	Model.prototype.grid2Query = function(event){
		var timeId = this.getContext().getRequestParameter('cPlanDateM');
		var createdBy = this.getContext().getRequestParameter('createdBy');
		console.log(createdBy)
		console.log(timeId);
		var url = "/jrsm/actActual/queryByTime";
		var actualData  = this.comp('actualData');
		var grid2 ={ 
				url:url,
				data:{"actionDate":timeId,createdBy:createdBy},
				addData:actualData
		}
		this.queryClick(grid2);

	};
	//关闭弹窗后操作
	Model.prototype.planDialogClose = function(event){
		var me = this;
		me.grid1Query();
	};

	Model.prototype.actualDialogClose = function(event){
		var me = this;
		me.grid2Query();
	};

	return Model;
});