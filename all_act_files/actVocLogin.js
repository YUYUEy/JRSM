define(function(require){
	var $ = require("jquery");
//	var justep = require("$UI/system/lib/justep");
	var datahelper = require("$UI/jrsm/js/datahelper");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var messagehelper = require("$UI/jrsm/js/message");
	
	
	
	var Model = function(){
		this.callParent();
	};
	var flag2;
	Model.prototype.modelLoad = function(event){
		
	};
	
	var whether;//接收父页面传入的修改状态
	var OnlyId;//储存图像ID的变量
	Model.prototype.modelParamsReceive = function(event){//页面接收参数
		flag2=this.params.flag;
		if(!flag2){
			$(this.getElementByXid("row1")).css("display","none");
		}
		var showVocData = this.comp("actActualVocData");
		var countVoc = this.params.count;//设置Id项
		var addState = this.params.addState;//接收父页面传入的新增状态
		if(addState){
			OnlyId = this.getIdRom();
			this.comp("actActualVocData").newData();
			showVocData.setValue("id",countVoc);
		}
		
		$.loadSelectValues(this.comp("catalogData"), "bd_item_catalog");//担当商品
		$.loadSelectValues(this.comp("actSaleKeypoint"), "act_sale_keypoint");//购买决定因素
		$.loadSelectValues(this.comp("actVocTarget"), "act_voc_target");//发言者
		this.bdVocLookupDataQuery();	//voc类型
		this.bdItemDataQuery();	
		
		
		var modifyDate =this.params.modifyDate;//父页面传入的数据
		console.log(modifyDate);
		
		debugger
		if(modifyDate){//修改模式传入的data 
				var data = modifyDate.row;
				showVocData.newData({
					"defaultValues" : [ {
						id:data.id.value.latestValue,
						rowId: data.rowId,
						itemCatalogCode: data.itemCatalogCode.value.latestValue,
						vocType: data.vocType.value.latestValue,	
						vocContent: data.vocContent.value.latestValue,	
						portrait: data.portrait.value.latestValue,
						saleKeypoint: data.saleKeypoint.value.latestValue,	
						itemCode: data.itemCode.value.latestValue,
						shortAnswer: data.shortAnswer.value.latestValue,
						picRefId:data.picRefId.value.latestValue
					} ]
				});
				OnlyId = data.picRefId.value.latestValue;
//				this.comp("actActualVocData").setValue("picRefId",OnlyId);
		}
		
		whether = this.params.whether;//修改状态
			
		console.log(OnlyId);
			//
		this.comp("attachmentData").clear();
		this.comp("attachmentData").newData({
			defaultValues:
               [
               {rowId:OnlyId}
               ]
			
		});
		this.comp("attachmentEx1").query();
		
		showVocData.setValue("whether",whether);
		showVocData.setValue("picRefId",OnlyId);
		
		var queryPic = this.params.queryPic;//接收是否为查询图片状态
		if(queryPic){
			this.comp("button2").set({"disabled":true});
			this.comp("select1").set({"disabled":true});
			this.comp("select3").set({"disabled":true});
			this.comp("select4").set({"disabled":true});
			this.comp("textarea2").set({"disabled":true});
			this.comp("select5").set({"disabled":true});
			this.comp("input1").set({"disabled":true});
			this.comp("select7").set({"disabled":true});
		}	
	};
	
	
	//生成唯一的Id
	Model.prototype.getIdRom = function(event){
		debugger
		return String(Date.now()).substr(5);
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

	
// 登录按钮
	Model.prototype.button2Click = function(event){
		var pictrl = this.comp("attachmentEx1").$attachmentItems.latestValue;//获取储存图片的集合
		var photoYorN;
		if(pictrl == false){
			photoYorN = "N";
			this.comp("actActualVocData").setValue("picRefId","-1");
		}else {
			photoYorN = "Y";
		}
		console.log(photoYorN);
		this.comp("actActualVocData").setValue("portrait",photoYorN);
		debugger
//		if(this.comp("select1").val() == null ){
//			dialoghelper.error(messagehelper.get("act.actual.voc1"));
//			return;
//		}else
		 if(this.comp("select3").val()=== null){
			dialoghelper.error(messagehelper.get("act.actual.voc2"));
			return;
		}else if(this.comp("select4").val() === null) {
			dialoghelper.error(messagehelper.get("act.actual.voc3"));
			return;
		}else if(this.comp("select7").val() === null) {
			dialoghelper.error(messagehelper.get("act.actual.voc4"));
			return;
		}
		this.close();
//		this.owner.send(datahelper.getRowsToJson(this.comp("actActualVocData")));//往父页面传参
		this.owner.send({"rowData":this.comp("actActualVocData").getCurrentRow(), 'json':this.comp("actActualVocData").toJson(), "jsonData":datahelper.getRowsToJson(this.comp("actActualVocData"))});//往父页面传参
	};
// voc类型值改变事件
	Model.prototype.select4Change = function(event){
//		var input2 = this.comp("textarea2");
		var bdItemCatalogData=this.comp("bdVocLookupData");
		var row1 = bdItemCatalogData.find(["lookupName"], [event.value], true);
		this.comp("textarea2").val(row1[0].row.lookupDesc.value.latestValue);
		console.log(row1[0].row.lookupDesc.value.latestValue);
	};

	Model.prototype.textarea2Focus = function(event){
		this.comp("textarea2").setCSS({"background":"#ffffff"});
	};


	Model.prototype.modelUnLoad = function(event){
		flag2='';
	};

	return Model;
});