define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var dataHelper = require("$UI/jrsm/js/datahelper");
	var global = require("$UI/portal/base/global");
	
	var serverTime = global.getServiceTime();
	var Model = function(){
		this.callParent();
	};

	Model.prototype.modelLoad = function(event){
		$(this.getElementByXid("input1")).val(serverTime);		//默认系统日期
		$.loadSelectValues(this.comp("catalogData"), "bd_item_catalog");//担当商品
		$.loadSelectValues(this.comp("actSaleKeypoint"), "act_sale_keypoint");//购买决定因素
		$.loadSelectValues(this.comp("actVocTarget"), "act_voc_target");//发言者
		this.bdVocLookupDataQuery();	//voc类型
		this.bdItemDataQuery();		//店铺
		this.comp("attachmentData").clear();
		this.comp("attachmentData").newData({
			defaultValues:
               [
               {rowId: 3}
               ]
			
		});
		this.comp("attachmentEx1").query();
	};
	//select下拉查询VOC分类名
	Model.prototype.bdVocLookupDataQuery = function(event){		
		var queryData = this.comp('bdVocLookupData');
		var data ={};	
		$.SimpleEngineeSyn("/jrsm/bdVocLookup/query",data, queryData );

	};
	//select下拉店铺
	Model.prototype.bdItemDataQuery = function(event){		
		var queryData2 = this.comp('bdSalesStoreData');
		var data2 ={};
		$.SimpleEngineeSyn("/jrsm/bdSalesStore/queryStore",data2, queryData2 );
	};
	//输出格式化时间
	function format(date){
		var rightMonth = (date.getMonth() +1) <10 ?'0'+(date.getMonth() +1) : (date.getMonth() +1);
		var rightDate = date.getDate() <10 ?'0'+date.getDate() :date.getDate();
		var ret = date.getFullYear() +'-'+ rightMonth +'-'+ rightDate;
		return ret;
	}
   //voc数据录入保存
    Model.prototype.resetBtnClick = function(event) {
		this.comp("vocdata").clear();
		this.comp("vocdata").refreshData();
		linesNo = 0;
		lineId = 0;
	};
	Model.prototype.button2Click = function(event){
	 var me = this;
	 var vocdata = this.comp('vocdata');
	 var data =dataHelper.getHeadListDataToJson(vocdata);
	 global.ajax({
			url : "/jrsm/actTopvoc/insert",
			data : data,
			success : function(Data) {
				alert('保存成功。');
				me.resetBtnClick();
				me.close();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState + " - " + textStatus);
			}
		});	
	};
	
	return Model;
});