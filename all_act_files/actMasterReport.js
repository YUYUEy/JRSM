define(function(require) {
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var messagehelper = require("$UI/jrsm/js/message");
	var datahelper = require("$UI/jrsm/js/datahelper");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var global = require("$UI/portal/base/global");
	var Common = require("$UI/jrsm/js/jrsm.common");
	var config = require("$UI/portal/base/config");
	require("$UI/jrsm/js/jquery.form");
	require("$UI/jrsm/module/lib/utils");
	var me;
	var Model = function() {
		this.callParent();
	};

	Model.prototype.areaRadioPCChange = function(event) {
		$(".enterprise").css("display", "none");
		$(".areaClass").css("display", "block");
	};

	Model.prototype.enterpriseRadioPCChange = function(event) {
		$(".areaClass").css("display", "none");
		$(".enterprise").css("display", "block");
	};

	Model.prototype.model1_5Load = function(event) {
		me = this;
		
		/*var time = global.getServiceTime();
		console.log(time);*/
		$.loadSelectValues(me.comp("eventTypeData"), "act_event_type");//量贩，地域
		$.loadSelectValues(me.comp("itemGcatalogCodeData"), "bd_item_catalog");// 担当商品
		
		
	};
	
	
	
	
	
	
	
	Model.prototype.model1_5ParamsReceive = function(event) {
		this.comp("enterpriseRadioPC").set({
			"checked" : true
		});
		this.enterpriseRadioPCChange();
		me.comp("queryMasterData").clear();
		me.comp("queryMasterData").newData();
		var areaOption = {orgType:"AREA",orgNodeType:"L1"};
		var areaOrgData=me.comp("areaOrgData");
		me.queryOrgByOption("/jrsm/bdOrg/queryOrgByNode",areaOption,areaOrgData);
		
		var unitOption = {orgType:"UNIT",orgNodeType:"L1"};
		var unitOrgData=me.comp("unitOrgData");
		me.queryOrgByOption("/jrsm/bdOrg/queryOrgByNode",unitOption,unitOrgData);
		
		
		var areaL3Option = {orgType:"AREA",orgNodeType:"L3"};
		var areaL3Data=me.comp("areaL3Data");
		me.queryOrgByOption("/jrsm/bdOrg/queryOrgByNode",areaL3Option,areaL3Data);
		
		var unitL3Option = {orgType:"UNIT",orgNodeType:"L3"};
		var unitL3Data=me.comp("unitL3Data");
		me.queryOrgByOption("/jrsm/bdOrg/queryOrgByNode",unitL3Option,unitL3Data);
		
		
	};
	
	Model.prototype.queryOrgByOption = function(url,option,data) {
		global.ajax({		    
				url:url,
				data:option,
				success: function(resultData){
					data.clear();
					data.loadData(resultData.data);
					data.refreshData();
				}
		});
	};

	Model.prototype.queryClick = function(event){
		//itemCatalogList
		var queryMasterData=me.comp("queryMasterData");
		
		var masterData=me.comp("masterData");
		var itemCodes = queryMasterData.getValue("itemCodes");
		var itemCatalogList;
		var jsonStr = datahelper.getFirstRowToJson(queryMasterData);
		if(itemCodes){
			itemCatalogList=itemCodes.split(",");
			jsonStr.itemCatalogList = itemCatalogList;
		}
		
		global.ajax({		    
			url:"/jrsm/evtMaster/query",
			data:jsonStr,
			success: function(resultData){
				masterData.clear();
				masterData.loadData(resultData.data);
				masterData.refreshData();
			}
	});
	};

	Model.prototype.button1_1Click = function(event){
		
		var obj = document.getElementsByName("checkboxRowId");
		 allRows = [];
		 for (var i = 0; i < obj.length; i++) {
			var array_element = obj[i];
			if(array_element.checked){
				 allRows.push(array_element.value);
			}
		}
		

		if(allRows && allRows.length > 0){
			this.comp("exportWd").open({
			data : {
			operator : ".xlsx",
			paramRowIds : allRows,
			dataCols : this.comp("masterData").defCols,
			dataQuery :this.comp("masterData").toJson(),
			url : "/jrsm/evtMaster/exportMasterByOrg2",
			gridCols : this.comp("grid1_2")
			},
			"title" : messagehelper.get("base.evtMaster.repostExport")
		});
		}else{
			dialoghelper.warning( messagehelper.get("act.actMaster.E0020")); 
			return;
		}
		
		
	};
	
	Model.prototype.resetClick = function(event){
		var queryMasterData=me.comp("queryMasterData");
		queryMasterData.clear();
		queryMasterData.newData();
	};
	
	return Model;
});