define(function(require) {
	var $ = require("jquery");
	var global = require("$UI/portal/base/global");
	var messagehelper = require("$UI/jrsm/js/message");
	var justep = require("$UI/system/lib/justep");
	var datahelper = require("$UI/jrsm/js/datahelper");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var Common=require("$UI/jrsm/js/jrsm.common");
	require("$UI/system/components/bootstrap/dropdown/dropdown");
	require("$UI/jrsm/module/lib/utils");

	var pageSize = 10;
	var pageNo = 1;
	var _this2;
	
	var Model = function() {
		this.callParent();
	};
	 
	//页面初始化
	Model.prototype.modelLoad = function(event){
		_this2 = this;
		this.comp("grid1").on("onCellRender", this.grid1CellRender, this);
		this.comp("grid1").on("onRowClick", this.itemRowClick, this);
		this.comp("resetClick").on("onClick",this.resetClick, this);
	};
	
	// 重置按钮点击操作
	Model.prototype.resetClick = function(event) {
		this.comp("queryData").clear();
		this.comp("queryData").newData();
	};
	//文件导出
	Model.prototype.exportExcelBtnClick = function(event) {

	};
	//按钮生成绑定
	Model.prototype.modelParamsReceive = function(event) {
		this.comp("queryData").clear();
		this.comp("queryData").newData();
//		this.queryitemCatalogs();
		this.queryBigType();
	};
	
	//点击添加+
	Model.prototype.addActActivityBatchClick = function(event){
		var url="$UI/jrsm/module/act/actActivityBatch_add.w";
		var title=messagehelper.get("msgDial.activityBatch_add");
		var options = {
			title : title, // 非必须 -- 页签名称
			url : url,
			close : true,
			lastParent:this//将页面赋给lastParent
		};
		this.getParent().newTab(event, options);
	};
	
	
	//查询商品S
	Model.prototype.queryitemCatalogs = function(event){
		var queryItemCatalogsData = this.comp('itemCatalogsData');
		var data = {};
		$.SimpleEngineeSyn("/jrsm/bdItemCatalog/query",data,queryItemCatalogsData,true);
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
	
	//高级查询
	Model.prototype.selectClick = function(event){
		pageNo = 1;
		this.queryClick();
	};
	
	//列表按钮添加
	Model.prototype.grid1CellRender = function(event) {
		if (event.colName == 'operation') {
			var editBtn = "<a href='#' class='mdm-grid-cell-a ediedtBtn' title='" + messagehelper.get("msgDial.edit") + "'>" + messagehelper.get("msgDial.edit") + " </a>";
			var deleteBtn = "<a href='#' class='mdm-grid-cell-a disabledBtn' title='" + messagehelper.get("msgDial.delete") + "'>"+ messagehelper.get("msgDial.delete") + "</a>";
			event.html = editBtn + deleteBtn;
		}else if (event.colName == 'lookupCode') {
			event.html = "<a href='#' class='mdm-grid-cell-a compCodeNumber'>" + event.colVal + "</a>";
		}else if (event.colName == 'itemCatalogName') {
			var arrayItem = event.row.row.bdApplyItemcatalogs;
			var sss='';
			$.each(arrayItem,function(i,j){
				sss += arrayItem[i].itemCatalogName + ',';
			});
			sss = sss.substring(0, sss.length - 1);
			event.html = sss;
		}else if (event.colName == 'period') {
			var this_period =(event.row.row.period.value.latestValue);
			event.html = this_period.split("~").join(" ~ ");
		}

	};
	//绑定点击按钮，删除和编辑
	Model.prototype.itemRowClick = function(event) {
		var row = event.row;//获取当前行
		var domButton = $(event.domEvent.target);// 获取点击的元素
		var rowId = row.row.rowId.value.latestValue;//获取行ID
		//删除
		if (domButton.hasClass("disabledBtn")) {// 判断是否包含某个样式
			dialoghelper.confirmMsg(messagehelper.get("msgDial.submitDelete"),_this2.deleteRow,null,null,"actActivityBatch",rowId);			
		}
		//編輯
		if (domButton.hasClass("ediedtBtn")) {		
			var url="$UI/jrsm/module/act/actActivityBatch_add.w?rowId=" + rowId;
			var title=messagehelper.get("msgDial.activityBatch_update");
			var options = {
				title : title, // 非必须 -- 页签名称
				url : url,
				close : true,// 是否允许关闭
				lastParent:this//将页面赋给lastParent
			};
			this.getParent().newTab(event,options);
		}
	};
	
	//执行删除
	Model.prototype.deleteRow =  function (event) {
		 global.ajax({		    
			url:"/jrsm/"+event.className+"/delete",
			data:{rowId:event.rowId},
			success: function(Data){
				_this2.queryClick();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	
	//关闭弹窗后操作
	Model.prototype.addLookUpListClose = function(event){
		this.queryClick();
	};
	
	Model.prototype.resetClickClick = function(event){
		var queryData=this.comp("queryData");
		queryData.clear();
		queryData.newData();
	};
	
	//以下分页
	Model.prototype.queryClick = function(event) {
	    var queryData = this.comp("queryData");
	    var queryCriteria = queryData.toJson(true);
		var listData = this.comp('listData');
		if (!queryData.isValid()) {
			return;
		}
		var data = $.paraFormat(JSON.stringify(queryCriteria), pageSize, pageNo);
		$.QeuryData("/jrsm/actActivityBatch/queryByStatus", data, listData, pageNo);
		if(!listData.getCurrentRowID()){
			dialoghelper.info(messagehelper.get("msgDial.activityBatch_info"));
		}
	};
	Model.prototype.pgIndexClick = function(event) {
		if ("<" == event.target.innerText || "<Previous" == event.target.innerText) {
			pageNo--;
		} else if (">" == event.target.innerText || ">Next" == event.target.innerText) {
			pageNo++;			
		} else {
			pageNo = event.target.innerText;
		}
		this.queryClick(event);
	};
	Model.prototype.pgLmtSlctChange = function(event) {
		if (pageSize != event.value) {
			pageNo = 1;
			pageSize = event.value;
			this.queryClick(event);
		}
	};	
		
	//级联，选择大类型，根据大类型来显示小类型
	Model.prototype.querySmallTypeName = function(event){
		var value=event.source.val();
		var smallTypeNameData = this.comp('smallTypeNameData');
		var data = {
			"parentId":value,
			"typeCatalog" : "S"
		};
		$.SimpleEngineeSyn("/jrsm/actActivityType/queryByBatch", data, smallTypeNameData, true);
	};
	//判断开始时间不能大于结束时间
	Model.prototype.startTimeChange = function(event){
		var queryData = this.comp("queryData");
		var startDate=event.value;
		var endDate=queryData.getValue("endDate");
		if(startDate > (endDate+"") &&startDate!=='' &&endDate!==''){
			queryData.setValue("startDate",null);
			dialoghelper.info(messagehelper.get("act.actual.I0004"));
		}
	};
	//判断结束时间不能小于开始时间
	Model.prototype.endTimeChange = function(event){
		var queryData = this.comp("queryData");
		var startDate=queryData.getValue("startDate");
		var endDate=event.value;
		if(endDate < (startDate+"") &&startDate !=='' &&endDate!==''){
			queryData.setValue("endDate",null);
			dialoghelper.info(messagehelper.get("act.actual.I0004"));
		}
	};
	return Model;
});