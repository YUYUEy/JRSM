define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	require("css!$UI/jrsm/css/iconfont").load();
	var Common=require("$UI/jrsm/js/jrsm.common");	//加上common才会有滚动条
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var dataHelper = require("$UI/jrsm/js/datahelper");	
	
	var Model = function(){
		this.callParent();
		//
		if ($('div').hasClass('jrsm-tab-window')) {
			var h = $(window).height();
			$(".jrsm-tab-window").css('height', h - 110);
		}
		$(window).resize(function() {
			if ($('div').hasClass('jrsm-tab-window')) {
				var h = $(window).height();
				$(".jrsm-tab-window").css('height', h - 64 - 45 - 2);
			}
		});
	};
	//
	var year='';
	var month='';
	var showShopArr = [];
	var eventArr = [];
	var userArr = [];
	var newUserArr = [];
	var showUserArr = [];
	var userCode;
	var page = 1;
	var pageSize = 5;
	var page_count =1;
	var queryFlag = 0;
	var iconClass = [
						"icon iconfont icon-triangle-copy",
						"icon iconfont icon-yuanxing",
						"icon iconfont icon-xingxing"
					];

	function sort2(eventArr){
		for (var k=0; k<eventArr.length-1; k++) { //根据开始时间来升序排序
			for (var m=0; m<eventArr.length-1-k; m++) {
				if ( (eventArr[m].theTime) > (eventArr[m+1].theTime) ) {
					var tmp =  eventArr[m] ;
					eventArr[m]= eventArr[m+1];
					eventArr[m+1]= tmp;
				}
			}
		}
	}
	//数组去重
	function unique(arr){
		var newArr = [arr[0]];
		for(var i=1;i<arr.length;i++){
			if(newArr.indexOf(arr[i]) == -1){
				newArr.push(arr[i]);
			}
		}
		return newArr;
	}
	Model.prototype.initMonth=function(){
		year = mGetDate(year, month).split('-')[0];
		month = mGetDate(year, month).split('-')[1];
		$("#targetMonth").val( mGetDate(year, month) );
  		var monthLength = ( new Date(year, month, 0).getDate());
  		//table渲染页面
		var html = '<thead><tr class="theHead"><td class="shop_man">对象者</td><td class="theCorner">店舗</td>';
						for(var k=1; k<monthLength+ 1; k++){
							html += '<td>'+ k +'日</td>';
						}
			html += '</tr></thead><tbody>';
				for(var i =0; i< showShopArr.length; i++){
					html +=	'<tr><td class="the_shopman2"><span></span></td>';
					html +=	'<td class="theShop" data-createdId="'+ showShopArr[i].createdBy +'" data-createdName="'+ showShopArr[i].createdByName +'" data-id="'+ showShopArr[i].storeId +'"><span title="'+showShopArr[i].storeName+'">'+ showShopArr[i].storeName +'</span></td>';
					for(var m=1; m < monthLength+ 1; m++){
						html += '<td></td>';
					}
					html +='</tr>';
				}
			html += '</tbody>';
		$("#calendar").html(html);
		var firstDay =  format(new Date(year, month-1, 1));
		var lastDay =  format(new Date(year, month, 0));
		//
		var _this=this;
		eventArr.forEach(function(val){
			var rowLine = _this.getPosition( val.storeCode, val.chargerCode);
			if((firstDay <=val.theTime) && (val.theTime <=lastDay) && (rowLine !==undefined)){
				var index = val.theTime.split('-')[2];
				var spanInfo = [val.eventType+' - '+ val.smallCatalogName, val.str];
				var eventIcon = $("<i><span class='the_info' >"+ spanInfo +"</span><span class='the_title' >"+ (val.eventType).split("")[0] +"</span></i>").appendTo( $("tbody tr").eq(rowLine).find("td").eq(index -0+1) );
				['A', 'B', 'C'].forEach(function(value, index){
					if( val.status.split("")[0] ==value ){
						eventIcon.addClass( iconClass[index] );
					}
				});
				if( val.status.split("")[0] =="A" ) eventIcon.css({"font-size": "40px", "vertical-align": "-5px"}).find(".the_title").css({"left": "14px","top": "7px"});
				if( val.status.split("")[0] =="C" ) eventIcon.css("font-size", "25px").find(".the_title").css({"left": "6px","top": "2px"});
				if(val.status.split("")[1] ==1) {
					eventIcon.css("color", "#f0f").find(".the_info").css("background", "#f0f");
				}else{
					eventIcon.css("color", "#00c").find(".the_info").css("background", "#00c");
				}
			}
		});
		$(".content").css("min-height",(showShopArr.length +1) *30 +'px');
		newUserArr.forEach(function(val){	//渲染対象者
			$(".the_shopman2").eq(showUserArr.indexOf(val)).css("border-top","1px solid #ddd");
			$(".the_shopman2").eq(Math.floor( (showUserArr.indexOf(val) + showUserArr.lastIndexOf(val))/2 )).find("span").html(val).attr("title",val);
		});
		//
		if ($('div').hasClass('jrsm-tab-window')) {
			$('.x-contents ').css({
				"overflow" : "hidden"
			});
			$.setNiceScrollByObj($('.jrsm-tab-window'));
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
	};
	//
	function mGetDate(year, month){
		var yyy = new Date(year, month-1).getFullYear();
		var mmm = new Date(year, month-1).getMonth() +1 ;
		mmm = mmm <10 ?'0'+mmm :mmm;
		return yyy +'-'+mmm;
	}
	function format(date){	//输出格式化时间
		var rightMonth = (date.getMonth() +1) <10 ?'0'+(date.getMonth() +1) : (date.getMonth() +1);
		var rightDate = date.getDate() <10 ?'0'+date.getDate() :date.getDate();
		var ret = date.getFullYear() +'-'+ rightMonth +'-'+ rightDate;
		return ret;
	}
	//
	Model.prototype.getPosition=function(storeCode, chargerCode){
		var rowLine;
		$("tbody tr").each(function(i){
			if($(this).find(".theShop").length >0){
				if(($(this).find(".theShop").get(0).dataset.id == storeCode) && ($(this).find(".theShop").get(0).dataset.createdid == chargerCode)){
					rowLine = i;
				}
			}
		});
		return rowLine;
	};
	//
	Model.prototype.button1Click = function(event){ 	//month--
		month--;
		if(queryFlag){
			this.button12Click();
		}else{
			this.queryActActualBdUser();
		}
	};

	Model.prototype.button2Click = function(event){		//month++
		month++;
		if(queryFlag){
			this.button12Click();
		}else{
			this.queryActActualBdUser();
		}
	};

	Model.prototype.button3Click = function(event){		//page--
		page--;
		if(page <1) {
			page =1;
		}else{
			if(queryFlag){
				this.button12Click('111');
			}else{
				this.queryActActualBdUser();
			}
		}
		$("#showPage2").html(page);
		
	};

	Model.prototype.button4Click = function(event){		//page++
		page++;
		if(page >page_count){
			 page =page_count;
		}else{
			if(queryFlag){
				this.button12Click('111');
			}else{
				this.queryActActualBdUser();
			}
		}
		$("#showPage2").html(page);
		
	};
	
	//页面初始化
	Model.prototype.modelLoad = function(event){
		year = new Date().getFullYear(); 
		month = new Date().getMonth() +1;
		this.queryActActualBdUser();		//查询对象者和活动信息
		this.comp("queryBdOrgData").clear();
		this.comp("queryBdOrgData").newData();
		this.comp("queryBdStoreData").clear();
		this.comp("queryBdStoreData").newData();
		this.comp("queryUserDate").clear();
		this.comp("queryUserDate").newData();
	};

	Model.prototype.modelActive = function(event){
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'));
		}
	};
	var userStoreList = [];
	//查询对象者信息
	Model.prototype.queryActActualBdUser = function(event){
		var me = this;
		var userInfo_id =(global.getProfile()).__userName;		//获取userCode
		var positionId = (global.getProfile()).__positionId;     //当前用户职位
		console.log(positionId);
		var firstDay =  format(new Date(year, month-1, 1));
		var lastDay =  format(new Date(year, month, 0));
		console.log(firstDay+ '~;~'+ lastDay);
		var data = {
				__pagesize: pageSize,
				__page: page,
				activityStatusDateFrom: firstDay,
				activityStatusDateTo: lastDay
			};
		if((positionId ==='CHG')  || (positionId ==='IRER') || (positionId ==='RER')){
			data.userCode = userInfo_id;
		}else if((positionId ==='GPM')|| (positionId ==='XGPM')){
			data.parUserCode = userInfo_id;	
		}else{
			return;
		}
		global.ajax({
			async :false,
			data: data,
			type:'POST',
			url: "/jrsm/actActivity/getActProgressListByUser",
			success: function(data){
				if (data.__statusCode=='S'){
					console.log(data);
					var userStore_data = data.data.userStoreList;
					var activity_data = data.data.activityList;
					page_count = Math.ceil((data.__pagecount)/pageSize);
					$("#showPageCount2").html(page_count);
					//查询对象者信息部分
					userArr = [];
					userStoreList = [];
					userStore_data.forEach(function(val){
						userStoreList.push({
							"storeId": val.storeCode,
							"storeName": val.storeName,
							"createdBy": val.chargerCode,
							"createdByName": val.chargerName,
						});
						userArr.push(val.chargerName);
					});
					//
					console.log(userStoreList);
					showShopArr = userStoreList;
					showUserArr = userArr;
					newUserArr = unique(showUserArr);	//去除重复
					////查询活动信息
					eventArr = [];
					activity_data.forEach(function(val){
						if(val.actiivityStatus){	//必须要有活动状态，
							var str = [],strCode = [];
							for(var m=0; m<(val.bdApplyItemcatalogs).length; m++ ){
								str.push( (val.bdApplyItemcatalogs)[m].itemCatalogName );
								strCode.push( (val.bdApplyItemcatalogs)[m].itemCatalogCode );
							}
							eventArr.push({
								"theTime": val.endDate.split(' ')[0],
								"whichShop": val.storeName,
								"storeCode": val.storeCode,
								"chargerCode": val.chargerCode,
								"chargerName": val.chargerName,
								"eventType": val.bigCatalogName,
								"smallCatalogName": val.smallCatalogName,
								"status": val.actiivityStatus,
								"str": str,
								"strCode": strCode
							});
						}
					});
					sort2(eventArr);
					console.log(eventArr);
					me.initMonth();
				}else{
					dialoghelper.exception(data);
				}
			},
			error: function () {
				alert('请求失败');
			},
		});
		
	};
	//
	var flee = true;	//检索条件隐藏切换
	Model.prototype.button6Click = function(event){
		if(flee){
			$(".the_condition").height("30px");
			$(this.getElementByXid("i6")).get(0).className="linear linear-database cry26Fz";
		}else{
			$(".the_condition").height("110px");
			$(this.getElementByXid("i6")).get(0).className="linear linear-diamond cry26Fz";
		}
		flee =!flee;
	};

	Model.prototype.modelUnLoad = function(event){
		eventArr = [];
	};
	
	//点击查询
	Model.prototype.button12Click = function(event){
		queryFlag =1;
		var _this = this;
		userCode=this.comp("queryUserDate").val("userCode");
		var queryBdOrgData=this.comp("queryBdOrgData");
//		var data =queryBdOrgData.toJson(true);
		var data =  dataHelper.getFirstRowToJson(queryBdOrgData);
		data.userCode = userCode;
		data.__pagesize = pageSize;
		if(event !=='111') {
			page =1;
			$("#showPage2").html(page);
		}
		data.__page = page;
		
		var firstDay =  format(new Date(year, month-1, 1));
		var lastDay =  format(new Date(year, month, 0));
		console.log(firstDay+ '~;~'+ lastDay);
		data.activityStatusDateFrom= firstDay;
		data.activityStatusDateTo= lastDay;
		console.log(event);
		global.ajax({	    
			url: "/jrsm/actActivity/getActProgressListByFilter",
			data: data,
			success: function(data){
				if (data.__statusCode=='S'){
					var userStore_data = data.data.userStoreList;
					var activity_data = data.data.activityList;
					page_count = Math.ceil((data.__pagecount)/pageSize);
					$("#showPageCount2").html(page_count);
					//查询对象者信息部分
					userArr = [];
					userStoreList = [];
					userStore_data.forEach(function(val){
						userStoreList.push({
							"storeId": val.storeCode,
							"storeName": val.storeName,
							"createdBy": val.chargerCode,
							"createdByName": val.chargerName,
						});
						userArr.push(val.chargerName);
					});
					//
					console.log(userStoreList);
					showShopArr = userStoreList;
					showUserArr = userArr;
					newUserArr = unique(showUserArr);	//去除重复
					////查询活动信息
					eventArr = [];
					activity_data.forEach(function(val){
						if(val.actiivityStatus){	//必须要有活动状态，
							var str = [],strCode = [];
							for(var m=0; m<(val.bdApplyItemcatalogs).length; m++ ){
								str.push( (val.bdApplyItemcatalogs)[m].itemCatalogName );
								strCode.push( (val.bdApplyItemcatalogs)[m].itemCatalogCode );
							}
							eventArr.push({
								"theTime": val.endDate.split(' ')[0],
								"whichShop": val.storeName,
								"storeCode": val.storeCode,
								"chargerCode": val.chargerCode,
								"chargerName": val.chargerName,
								"eventType": val.bigCatalogName,
								"smallCatalogName": val.smallCatalogName,
								"status": val.actiivityStatus,
								"str": str,
								"strCode": strCode
							});
						}
					});
					sort2(eventArr);
					console.log(eventArr);
					_this.initMonth();
				}else{
					dialoghelper.exception(data);
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	
	//企业部
	Model.prototype.iQuickSearch2BeforeQuery = function(event){
		event.source.setExtendQueryData({orgType:"UNIT",parentId:'',orgNodeType:"L1"});
	};
	Model.prototype.iQuickSearch2ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit1CodeId",event.row.rowId);
	};
	Model.prototype.iQuickSearch2DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit1CodeId",null);
		this.comp("queryBdOrgData").setValue("unit2CodeId",null);
		this.comp("queryBdOrgData").setValue("unit3CodeId",null);
		this.comp("queryBdOrgData").setValue("unit1Code",null);
		this.comp("queryBdOrgData").setValue("unit2Code",null);
		this.comp("queryBdOrgData").setValue("unit3Code",null);
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	
	//业态
	Model.prototype.iQuickSearch3BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("unit1CodeId");
		event.source.setExtendQueryData({orgType:"UNIT",parentId:parentId,orgNodeType:"L2"});
	};
	Model.prototype.iQuickSearch3ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit2CodeId",event.row.rowId);
	};
	Model.prototype.iQuickSearch3DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit2CodeId",null);
		this.comp("queryBdOrgData").setValue("unit3CodeId",null);
		this.comp("queryBdOrgData").setValue("unit2Code",null);
		this.comp("queryBdOrgData").setValue("unit3Code",null);
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	
	//地区
	Model.prototype.iQuickSearch4BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("unit2CodeId");
		event.source.setExtendQueryData({orgType:"UNIT",parentId:parentId,orgNodeType:"L3"});
	};
	
	
	//支社
	Model.prototype.iQuickSearch1BeforeQuery = function(event){
		event.source.setExtendQueryData({orgType:"AREA",parentId:'',orgNodeType:"L1"});
	};
	Model.prototype.iQuickSearch1ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("area1CodeId",event.row.rowId);
	};
	Model.prototype.iQuickSearch1DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("area1CodeId",null);
		this.comp("queryBdOrgData").setValue("area2CodeId",null);
		this.comp("queryBdOrgData").setValue("area3CodeId",null);
		this.comp("queryBdOrgData").setValue("area1Code",null);
		this.comp("queryBdOrgData").setValue("area2Code",null);
		this.comp("queryBdOrgData").setValue("area3Code",null);
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	
	//2段部
	Model.prototype.iQuickSearch22BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("area1CodeId");
		event.source.setExtendQueryData({orgType:"AREA",parentId:parentId,orgNodeType:"L2"});
	};
	Model.prototype.iQuickSearch22ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("area2CodeId",event.row.rowId);
	};
	Model.prototype.iQuickSearch22DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("area2CodeId",null);
		this.comp("queryBdOrgData").setValue("area3CodeId",null);
		this.comp("queryBdOrgData").setValue("area2Code",null);
		this.comp("queryBdOrgData").setValue("area3Code",null);
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	
	//2.5段部
	Model.prototype.iQuickSearch23BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("area2CodeId");
		event.source.setExtendQueryData({orgType:"AREA",parentId:parentId,orgNodeType:"L3"});
	};
	Model.prototype.iQuickSearch23DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	
	//店铺
	Model.prototype.iQuickSearch31BeforeQuery = function(event){
		var unit11Code=this.comp("queryBdOrgData").val("unit1Code");
		if(!unit11Code){
			unit11Code="";
		}
		var unit12Code=this.comp("queryBdOrgData").val("unit2Code");
		if(!unit12Code){
			unit12Code="";
		}
		var unit13Code=this.comp("queryBdOrgData").val("unit3Code");
		if(!unit13Code){
			unit13Code="";
		}
		var area11Code=this.comp("queryBdOrgData").val("area1Code");
		if(!area11Code){
			area11Code="";
		}
		var area12Code=this.comp("queryBdOrgData").val("area2Code");
		if(!area12Code){
			area12Code="";
		}
		var area13Code=this.comp("queryBdOrgData").val("area3Code");
		if(!area13Code){
			area13Code="";
		}
		event.source.setExtendQueryData({unit1Code:unit11Code,unit2Code:unit12Code,unit3Code:unit13Code,area1Code:area11Code,area2Code:area12Code,area3Code:area13Code});
	};
	Model.prototype.iQuickSearch33DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("storeCode",null);	
	};
	
	Model.prototype.iQuickSearch4DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("storeCode",null);	
	};
	
	//对象者
	Model.prototype.iQuickSearch5BeforeQuery = function(event){
		var storeCode=this.comp("queryBdOrgData").val("storeCode");
		if(!storeCode){
			storeCode="";
		}
		event.source.setExtendQueryData({storeCode:storeCode});
	};
	
	
	Model.prototype.button5Click = function(event){		//reset
		this.comp("queryBdOrgData").clear();
		this.comp("queryBdOrgData").newData();
		this.comp("queryBdStoreData").clear();
		this.comp("queryBdStoreData").newData();
		this.comp("queryUserDate").clear();
		this.comp("queryUserDate").newData();
	};
	
	Model.prototype.iDatetimePicker1Okfun = function(event){
		year = event.value.split('-')[0];
		month = event.value.split('-')[1];
//		this.initMonth();
		this.queryActActualBdUser();		//查询对象者和活动信息
	};
	
	return Model;
});