define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	var messagehelper = require("$UI/jrsm/js/message");
	var dataHelper = require("$UI/jrsm/js/datahelper");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var messagehelper = require("$UI/jrsm/js/message");
	var Common=require("$UI/jrsm/js/jrsm.common");
	require("$UI/system/components/bootstrap/dropdown/dropdown");
	require("$UI/jrsm/module/lib/utils");
	
	var bigTypeArr;
	
	var Model = function(){
		this.callParent();
	};

	Model.prototype.button1Click = function(event){		//close
		this.close();
		$("#showTable").html('<tr><th>操作</th><th class="the_type">Name</th></tr>');
	};
	//
	
	Model.prototype.modelLoad = function(event){
		this.comp("ActivityTypeGrid").on("onCellRender", this.grid1CellRender, this);
		this.comp("ActivityTypeGrid").on("onRowClick", this.itemRowClick, this);
		this.addEventListener();
	};
	Model.prototype.addEventListener = function(event){
		$(this.getRootNode()).on("click",function(e){		//delete
			if(e.target.className =="btn btn-info cnAnmqy"){
				var trObj =(e.target.parentNode.parentNode);
				trObj.parentNode.removeChild(trObj);
			}
		})
	};
	Model.prototype.modelParamsReceive = function(event){
		
		var addActivityTypeData=this.comp("addActivityTypeData");
		var dataCopy=this.comp("dataCopy");
		dataCopy.clear();
		addActivityTypeData.clear();
		bigTypeArr = this.params.bigTypeArr;//点击activity四半期+号获取到的属性
		var rowId =  bigTypeArr[0];//rowId
		var _this=this;
			global.ajax({
				url:"/jrsm/actActivityType/queryLatsetRecords",
				data:{"parentId":rowId},
				success: function(Data){
					_this.comp("addActivityTypeData").clear();
					_this.comp("addActivityTypeData").loadData(Data.data);
					_this.comp("addActivityTypeData").refreshData();
					_this.comp("dataCopy").clear();
					_this.comp("dataCopy").loadData(Data.data);
					_this.comp("dataCopy").refreshData();
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
	};

	//点击确定
	Model.prototype.insertActivityType = function(event){
		var me = this;
		var url;
		var addActivityTypeData=this.comp("addActivityTypeData");
		var dataCopy=this.comp("dataCopy");
		var codes=addActivityTypeData.allDatas.latestValue;
		 for(var item in codes){
			var typeName = codes[item].row.typeName.value.latestValue;
			if(!typeName){
				dialoghelper.error(messagehelper.get("act.activity_type.I001"));
				return;
			}
		 }
		 
		//var changeRow = addActivityTypeData.toJson({"onlyChanged":true,"format":"simple"});
		//拼接数组
		//addActivityTypeData = changeRow.rows.concat(delArray);
		var data1 =dataHelper.getHeadListDataToJson(
			addActivityTypeData,
			addActivityTypeData,"actActivityType",
			dataCopy,"activityType"
		)
		console.log(data1)
			global.ajax({
				url:"/jrsm/actActivityType/insertOrUpdate",
				data:data1,
				//data:changeRow.rows,
				async:false,
				success: function(Data){
					me.close();
					//addActivityTypeData.loadData();
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
	};

	
	//＋
	var codeId=0;
	Model.prototype.addActivityTypepe = function(event){
		codeId--;
		var rowId =  bigTypeArr[0];//rowId赋值
		this.comp("addActivityTypeData").newData({
			"defaultValues" : [{
					rowId : codeId,
					typeName : "",
					typeShortName : "",
					typeCatalog : "S",
					parentId : rowId,
					userCode : "1",
					userName : ""
				}]
		});
	};
	//渲染删除按钮及其它
	//var planFlag1=1;
	Model.prototype.grid1CellRender = function(event) {
		 //userCode为空，就是公共的，不显示删除
		if(event.row.val("userCode") == "" || event.row.val("userCode") == null){
			
		}else{
			//当parentId不为空，并且被activity引用了，显示删除，变灰色，不能删
			if(event.row.val("userCount") > 0){
				if (event.colName == 'operation') {
					var deleteBtn =  "<a href='#' class='mdm-grid-cell-a deleteBtn1'editable='false' style='color:#ccc !important' title='" + messagehelper.get("msgDial.delete") + "'>"
					+ messagehelper.get("msgDial.delete") + "</a>";
					event.html = deleteBtn;
				}
			//当parentId不为空，但是没有被activity引用了，显示删除，可以删
			}else{
				if (event.colName == 'operation') {
					var deleteBtn =  "<a href='#' class='mdm-grid-cell-a deleteBtn' title='" + messagehelper.get("msgDial.delete") + "'>"
					+ messagehelper.get("msgDial.delete") + "</a>";
					event.html = deleteBtn;
				}
			}
		}
	};
	var delArray=[];
	Model.prototype.itemRowClick = function(event) {
		var row = event.row;
		var domButton = $(event.domEvent.target);// 获取点击的元素
		var lookupData = this.comp("addActivityTypeData");
		var rowId;
		
		if (domButton.hasClass("deleteBtn")) {// 判断是否包含某个样式
			rowId = row.row.rowId.value.latestValue;// 获取rowId 
			lookupData.confirmDelete = false;
			lookupData.directDeleteMode = true;
			lookupData.deleteData(row);
			if(rowId>0)
				delArray.push({"rowId":rowId,"userCode":"-1"});
		}
	};

	return Model;
});