define(function(require){
	var $ = require("jquery");
	var global = require("$UI/portal/base/global");
	var justep = require("$UI/system/lib/justep");
	var messagehelper = require("$UI/jrsm/js/message");
	
	var Model = function(){
		this.callParent();
	};
	var _this;
	Model.prototype.grid1CellRender = function(event){
	    if (event.colName == 'export') {
			var deleteBtn =  "<a href='#' class='mdm-grid-cell-a deleteBtn' title='"+ messagehelper.get("msgDial.export") +"'>"+ messagehelper.get("msgDial.export") +"</a>";
			event.html = deleteBtn;
		}
		
	};
	Model.prototype.queryClick = function(event){
		var qryData = this.comp("actActivityExportData");
		global.ajax({
			url:"/jrsm/actActivityBatch/queryByStore",
			success: function(data){
				console.log(data);
				qryData.clear();
				qryData.loadData(data.data);
				qryData.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	Model.prototype.itemRowClick = function(event){
		var row = event.row;//获取当前行
		var domButton = $(event.domEvent.target);// 获取点击的元素
		//删除
		if (domButton.hasClass("deleteBtn")) {// 判断是否包含某个样式
			this.comp("queryData").clear();
			this.comp("queryData").newData({  
				defaultValues:
               [
               {rowId:row.row.rowId.value.latestValue}]
			});
			var aa = this.comp("queryData").getValue("rowId");
			console.log(aa);
			var smallType = row.row.smallCatalogName.value.latestValue;
			if(row.row.startDate.value){
				var submitDate = (row.row.startDate.value.latestValue).split(" ")[0];
				var formatSubmitDate = submitDate.split("-").join("");
				var sendMsg = prompt("请输入文件名词", ('storelist_' + smallType+ '_' + formatSubmitDate) );
				console.log(('storelist_' + smallType+ '_' + formatSubmitDate));
			}else{
				var sendMsg = prompt("请输入文件名词", ('storelist_' + smallType) );
			}
			this.exportButtonClick(sendMsg);
			
		}
	};
	Model.prototype.exportButtonClick = function(event){
		this.comp("windowExport").open({
			data : {
				operator : ".xls",
				dataCols : this.comp("storeData").defCols,
				dataQuery : {rowId:this.comp("queryData").getValue("rowId")},
				url : "/jrsm/actActivity/exportqueryStore",
				gridCols : this.comp("grid2"),
				ExcelTitle:event
			},
			"title" : event
		});
	};
	
	Model.prototype.modelLoad = function(event){
		_this =this;
		this.queryClick();
	};

	Model.prototype.modelParamsReceive = function(event){
		this.comp("grid1").on("onCellRender", this.grid1CellRender, this);
		this.comp("grid1").on("onRowClick", this.itemRowClick, this);
	};

	return Model;
});