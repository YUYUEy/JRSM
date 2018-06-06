define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var datepicker2 = require("$UI/jrsm/js/calendar/main2");
	var global = require("$UI/portal/base/global");
	var messagehelper = require("$UI/jrsm/js/message");
	var Common=require("$UI/jrsm/js/jrsm.common");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var dataHelper = require("$UI/jrsm/js/datahelper");	
	require("$UI/jrsm/module/lib/utils");
	require("css!$UI/jrsm/css/iconfont").load();
	require("css!$UI/jrsm/css/iconfont2").load();
	
	var Model = function(){
		this.callParent();
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
	var disX;
	var disY;
	var year='';
	var month='';
	var showShopArr = [];
	var firstDay;
	var lastDay;
	var editID;
	var eventArr = [];
	var _this2;
	var userCode;
	var userArr = [];
	var showUserArr = [];
	var newUserArr = [];
	var page = 1;
	var pageSize = 10;
	var page_count =1;
	var queryFlag = 0;
	var userStoreList = [];
	//
	function initMonth() {
		year = mGetDate(year, month).split('-')[0];
		month = mGetDate(year, month).split('-')[1];
		$("#start_month").val( mGetDate(year, month) );
		$("#end_month").val( mGetDate(year, month -0+2) );
		$("#wrap").html(datepicker2.buildUi(year, month,showShopArr));
		$(".the_shopman").css({"border":"none","border-left":"1px solid #ddd"}).eq(showShopArr.length -1).css("border-bottom","1px solid #ddd");
		newUserArr.forEach(function(val){	//渲染対象者
			$(".the_shopman").eq( showUserArr.indexOf(val) ).css("border-top","1px solid #ddd");
			$(".the_shopman").eq(Math.floor( (showUserArr.indexOf(val) + showUserArr.lastIndexOf(val))/2 )).find("span").html(val).attr("title",val);
		});
		showThreeMonth();
		var end_date =  mGetDate(year, month -0+3);
		var end_date1 =  new Date(new Date(end_date).setDate(0));
		lastDay = mGetDate(year, month -0+2) +"-"+ end_date1.getDate();
		$.resizeScrollByObj($('.jrsm-tab-window'));
	}
	function mGetDate(year, month){
		var yyy = new Date(year, month-1).getFullYear();
		var mmm = new Date(year, month-1).getMonth() +1 ;
		mmm = mmm <10 ?'0'+mmm :mmm;
		return yyy +'-'+mmm;
	}
	//输出格式化时间
	function format(date){
		var rightMonth = (date.getMonth() +1) <10 ?'0'+(date.getMonth() +1) : (date.getMonth() +1);
		var rightDate = date.getDate() <10 ?'0'+date.getDate() :date.getDate();
		var ret = date.getFullYear() +'-'+ rightMonth +'-'+ rightDate;
		return ret;
	}
	function getWeek(year, month){
		var weekCount;
		var firstWeekday = new Date(year, month -1, 1).getDay();////获取一个月的一号是周几？
		var dayCount  = new Date(year, month, 0).getDate();//总天数
		if(firstWeekday ===0) firstWeekday =7;
		if(firstWeekday ===1){
			weekCount = Math.ceil(dayCount/7);
		}else{
			var lastDays = dayCount -(8- firstWeekday);
			weekCount = Math.ceil(lastDays/7);
		}
		return weekCount;			
	}
	//6种状态
	var statusObj =[
	      "<i class='icon iconfont icon-triangle-copy' style='color:#00c;'></i>", "<i class='icon iconfont icon-triangle-copy' style='color:#f0f;'></i>",
	      "<i class='icon iconfont icon-yuanxing' style='color:#00c;'></i>", "<i class='icon iconfont icon-yuanxing' style='color:#f0f;'></i>",
	      "<i class='icon iconfont icon-xingxing' style='color:#00c;'></i>", "<i class='icon iconfont icon-xingxing' style='color:#f0f;'></i>"
	];
	
	function showThreeMonth(){
		var weekArr = [];
		var weekLength = 0;
		$(".threeMonth span").each(function(i){
			$(this).html(mGetDate(year, month -0 +i));
			var aaa = mGetDate(year, month -0 +i).split('-')[0];
			var bbb = mGetDate(year, month -0 +i).split('-')[1];
			var ccc= getWeek(aaa, bbb);
			weekLength += ccc;
			for(var j=0; j< ccc; j++){
				weekArr.push(j+1);
			}
			if(ccc ==5){
				$(this).parent().attr("colspan","35");
			}
		});
		if(weekLength - $(".fourteen span").length ==1){
			$(".fourteen").append( $('<th colspan="7"><span></span>w</th>') );
			$(".shopEvent").append( $('<td colspan="7"></td>') );
		}else if( $(".fourteen span").length - weekLength ==1){
			$(".fourteen").find(".lastW").remove();
			$(".shopEvent").find(".lastW").remove();
		}
		$(".fourteen span").each(function(i){
			$(this).html(weekArr[i]);
		});
		$(".bor").width( 70 * weekLength -1 ).height(showShopArr.length * 30 -1);
		firstDay = format(new Date(monthData[0].year, monthData[0].month - 1, $("#mainTd td")[1].dataset.date));
		//渲染事件到页面上
		var heightArr =[];
		var topArr = [];
		eventArr.forEach(function(val){
			if(((firstDay<= val.startTime)&&(val.startTime<= GetDateStr(monthData.length))) || ((firstDay<= val.endTime)&&(val.endTime<= GetDateStr(monthData.length)))){
				var initLeft = parseInt((Date.parse( val.startTime )- Date.parse(firstDay))/(1000* 3600* 24)) *10 +'px';	//初始位置
				var initTop = getPosition( val.storeCode, val.chargerCode, val.startTime, val.endTime, heightArr,topArr );
				var initWidth = parseInt((Date.parse( val.endTime )- Date.parse( val.startTime ))/(1000* 3600* 24)) *10 +'px';	//初始宽度
				var iii;
				["A1", "A2", "B1", "B2", "C1", "C2"].forEach(function(value, index){
					if(val.actiivityStatus ==value) iii = $(statusObj[index]);
				});
				if(initTop && initLeft){
					var p = $("<p class='showEvent' data-allinfo='"+ JSON.stringify(val) +"'><span class='showEventSpan' title='"+ val.smallCatalogName + ':' + val.str+"'>"+ val.smallCatalogName + ':' + val.str +"</span><a class='to_copy'><i class='icon iconfont icon-copy-o'></i></a><a class='to_del'>-</a></p>").appendTo($(".bor"));
					if(iii !="undefined") p.prepend(iii).css("padding-left","15px");
					p.css({"top": initTop, "left": initLeft,'width': initWidth, "background": val.background.colorRgb(), "border-color": val.background,"color":"#000" }).find("a").css("background",val.background );
				}
			}
		});
		$(".showEdit").fadeOut();
	}
	//
	String.prototype.colorRgb = function(){		//16进制颜色转换rgba
	    var sColor = this.toLowerCase();
	    //十六进制颜色值的正则表达式
	    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	    // 如果是16进制颜色
	    if (sColor && reg.test(sColor)) {
	        if (sColor.length === 4) {
	            var sColorNew = "#";
	            for (var i=1; i<4; i+=1) {
	                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
	            }
	            sColor = sColorNew;
	        }
	        //处理六位的颜色值
	        var sColorChange = [];
	        for (var i=1; i<7; i+=2) {
	            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
	        }
	        return "rgba(" + sColorChange.join(",") + ",0.25)";
	    }
	    return sColor;
	};
	//
	function getPosition( storeCode, chargerCode, xxx, yyy, heightArr,topArr ){
		var sum = 0;
		disY = undefined;
		var count =0;
		$(".context .shopEvent").each(function(){
			var eachTop = $(this).get(0).offsetTop - 60; // 每个tr相对context的高度；
			var userStore =  $(this).find(".supplyHead").get(0).dataset.userstore.split(","); 
			if((userStore[0] == storeCode) && (userStore[2] == chargerCode)){
				disY = eachTop +5;
				var _this = $(this);
				heightArr.forEach(function(val){
					if((storeCode ==val.shopCode) && (chargerCode == val.createdCode)) count++;	//****
					if( disY ==val.initTop ){
						if( (val.startTime <=xxx && xxx <=val.endTime) || (val.startTime <=yyy && yyy <=val.endTime) || (val.startTime >=xxx && yyy >=val.endTime) ){
							_this.height(_this.height() + 25);	//自增25px
							disY += 25;
							topArr.push(disY-eachTop);
						}
					}
				});
				heightArr.forEach(function(val){		//第二次遍历heightArr
					if( disY ==val.initTop ){
						if( (val.startTime <=xxx && xxx <=val.endTime) || (val.startTime <=yyy && yyy <=val.endTime) || (val.startTime >=xxx && yyy >=val.endTime) ){
							_this.height(_this.height() + 25);	//自增25px
							disY += 25;
							topArr.push(disY-eachTop);
						}
					}
				});
				if( $(this).height() >= (count *25 +30) ) $(this).height(count *25 +30);
				if( $(this).height() >= ( Math.max.apply(null, topArr) +25) ) $(this).height( Math.max.apply(null, topArr) +25);
			}
			sum += $(this).height();
		});
		$(".bor").height( sum -1);
		heightArr.push({
			"initTop": disY,
			"startTime": xxx,
			"endTime": yyy,
			"shopCode": storeCode,
			"createdCode": chargerCode
		});
		return disY;
	}
	function GetDateStr(AddDayCount) { 		//获取N天以后的日期    
	   var dd = new Date(firstDay);  
	   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
	   var y = dd.getFullYear();     
	   var m = (dd.getMonth()+1)<10? "0"+(dd.getMonth()+1) :(dd.getMonth()+1);//获取当前月份的日期，不足10补0    
	   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0    
	   return y+"-"+m+"-"+d;     
	}
	
	Model.prototype.addEvent=function(){
		var profile= global.getProfile();
		var userInfo_id =(profile.__userName);		//获取userCode
		var _this = this;
		var allInfo;
		$(this.getRootNode()).on("click",function(e){
			if((e.target.className=="bor cjE7VJb")){		//点击空白处增加活动事件
				var userStore;
				$(".context .shopEvent").each(function(){
					var eachTop2 = $(this).get(0).offsetTop - 60; // 每个tr相对context的高度；
					var thisTop =  $(this).get(0).offsetHeight;
					if(eachTop2 <=e.offsetY && e.offsetY < (eachTop2 +thisTop)){
						userStore = $(this).find(".supplyHead").get(0).dataset.userstore.split(",");
					}
				});
				//把页面上的施策计划进行分类，将点击店铺的施策计划带到施策计划新增页面，进行比较
				var newData2 = {};
				var postArr = [];
				eventArr.forEach(function(val){
					if(!newData2[val.storeCode]) newData2[val.storeCode] = [];
					newData2[val.storeCode].push(val);
				});
				for(var item in newData2){
					if( userStore[0] ===item) postArr =newData2[item];
				}
				if(userStore[2] !=userInfo_id ){
					dialoghelper.info(messagehelper.get("msgDial.activity.I004"));
					return;
				}
				_this.comp("activityAddView").open({
					data : {operator : "add"},
					title :	"施策计划录入（新增）",
					params:{
						postArr: postArr,
						shopId: userStore[0],
						shopName: userStore[1],
						userId: userStore[2],
						userName: userStore[3],
						the_start_time: GetDateStr( Math.ceil(e.offsetX /10) )
					}
				});
			}else if((e.target.className =="showEventSpan cjE7VJb") ){//跳转编辑
				allInfo = JSON.parse(e.target.parentNode.dataset.allinfo);
				console.log(allInfo);
				if(allInfo.chargerCode !=userInfo_id ){
					dialoghelper.info(messagehelper.get("msgDial.activity.I004"));
					return;
				}
				var editStatus = (allInfo.actiivityStatus) ?(allInfo.actiivityStatus) : '1';
				if(editStatus.substr(0,1) =="A" || editStatus.substr(0,1) =="B" || editStatus.substr(0,1)=="C"){
					dialoghelper.info(messagehelper.get("msgDial.activity.I005"));
					return;
				}
				editID = allInfo.code;
				var shop_id = allInfo.storeCode;
				//把页面上的施策计划进行分类，将点击店铺的施策计划带到施策计划新增页面，进行比较
				var newData2 = {};
				var postArr = [];
				eventArr.forEach(function(val){
					if(!newData2[val.storeCode]) newData2[val.storeCode] = [];
					newData2[val.storeCode].push(val);
				});
				for(var item2 in newData2){
					if( shop_id ===item2) postArr =newData2[item2];
				}
				console.log(postArr);
				_this.comp("activityAddView").open({data : {operator : "add"},title :"施策计划录入（修改）",params:{
					 postArr: postArr,
					 rowId:editID,
				 }});
				$(".showEdit").fadeOut();	//隐藏复写小窗口
			}else if((e.target.className =="icon iconfont icon-copy-o cjE7VJb") ){	//弹出复写窗口
				allInfo = JSON.parse(e.target.parentNode.parentNode.dataset.allinfo);
				if(allInfo.chargerCode !=userInfo_id ){
					dialoghelper.info(messagehelper.get("msgDial.activity.I004"));
					return;
				}
				editID = allInfo.code;
				disX = parseInt(e.target.parentNode.parentNode.style.left);
				disY = parseInt(e.target.parentNode.parentNode.style.top);
				var spanWidth =parseInt(e.target.parentNode.parentNode.style.width);
				var showLeft =( disX + spanWidth) <= 600 ?( disX + spanWidth -2) : (disX -300);
				var showTop = disY -60;
				showEdit(showLeft, showTop, allInfo);
			}else if((e.target.className =="to_del cjE7VJb") ){//删除
				allInfo = JSON.parse(e.target.parentNode.dataset.allinfo);
				editID = allInfo.code;
				var editStatus = (allInfo.actiivityStatus) ?(allInfo.actiivityStatus) : '1';
				console.log(allInfo);
				if(allInfo.chargerCode !=userInfo_id ){
					dialoghelper.info(messagehelper.get("msgDial.activity.I004"));
					return;
				}
				if( (allInfo.dataFrom =="BATCH")&&(allInfo.eventType =="促销活动")){
					dialoghelper.info(messagehelper.get("msgDial.activity.I003"));
				}else if(editStatus.substr(0,1) =="A" || editStatus.substr(0,1) =="B" || editStatus.substr(0,1)=="C"){
					dialoghelper.info(messagehelper.get("msgDial.activity.I001"));
				}else{
					dialoghelper.confirmMsg(messagehelper.get("msgDial.submitDelete"),_this2.deleteRow,null,null,"actActivity",editID);
				}
			}else if(e.target.className =="icon iconfont icon-xinzeng cjE7VJb"){	//关闭复写窗口
				$(".showEdit").fadeOut();
			}else if(e.target.className =="copySave cjE7VJb"){//复写,点击确定
				var sourceInfo = allInfo.actiivityStatus +';'+ allInfo.startTime +';'+ allInfo.endTime +';'+ allInfo.eventType +';'+ allInfo.str.toString(); 
				if($("#toShop").val().split(",")[0] === allInfo.storeCode ){
					dialoghelper.info(messagehelper.get("msgDial.activity.I002"));
					$(".showEdit").fadeOut();	//隐藏复写小窗口
				}else{
					var flag3 =0;
					eventArr.forEach(function(val){
						if( ($("#toShop").val().split(",")[0] ===val.storeCode)&&($("#toShop").val().split(",")[2] ===val.chargerCode) ){
							var compareInfo = val.actiivityStatus +';'+ val.startTime +';'+ val.endTime +';'+ val.eventType +';'+ val.str.toString(); 
							if( compareInfo ===sourceInfo){
								dialoghelper.info(messagehelper.get("msgDial.activity.I002"));
								flag3 +=1;
								$(".showEdit").fadeOut();	//隐藏复写小窗口
							}
						}
					});
					if(!flag3){	//目标店铺没有相同的施策
						global.ajax({
							url:"/jrsm/actActivity/copy",
							data:{
								"rowId": allInfo.code,
								"chargerCode": allInfo.chargerCode,
								"storeCode": allInfo.storeCode,
								"storeCodeCopy": $("#toShop").val().split(",")[0],
								"storeNameCopy": $("#toShop").val().split(",")[1],
								"chargerCodeCopy": $("#toShop").val().split(",")[2],
								"chargerNameCopy": $("#toShop").val().split(",")[3]
							},
							async:false,
							success: function(Data){
								_this.queryActivity();
							},
							errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
								throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
							}
						});
						initMonth();
					}
				}
			}else if(e.target.className =="bigTypeName cjE7VJb"){	//增加施策类型
				var bigTypeArr = e.target.dataset.info.split(",");
				_this.comp("activityTypeView").open({
					title :	"施策类型 : " + bigTypeArr[1],
					params:{
						bigTypeArr: bigTypeArr
					}
				});
			}
		});
	};
	//显示复写小窗口
	function showEdit(showLeft, showTop, allInfo){
		$(".showEdit").fadeIn();
		$(".showEdit").css({"left":showLeft +'px', "top": showTop +'px'});
		$(".showEdit .the_title").html( allInfo.chargerName +','+ allInfo.whichShop +','+ allInfo.eventType );
		$(".showEdit .the_time").html( allInfo.startTime + ' ~ ' + allInfo.endTime );
		$(".showEdit .the_event").html(allInfo.str.toString() );
	}
	
	Model.prototype.button21Click = function(event){	//打开一括登录子页面
		var me = this;
        var url="$UI/jrsm/module/act/actActivityBatch.w";
		var title=messagehelper.get("msgDial.activityBatch");
			var options = {
				title : title, // 非必须 -- 页签名称
				url : url,
				close : true
			// 是否允许关闭
			};
		me.getParent().newTab(event, options);
	};
	
	var flee = true;	//检索条件隐藏切换
	Model.prototype.button1Click = function(event){
		if(flee){
			$("#hide_show").height("30px");
			$("#hide_config").get(0).className="linear linear-database cjE7VJb" ;
		}else{
			$("#hide_show").height("110px");
			$("#hide_config").get(0).className="linear linear-diamond cjE7VJb" ;
			$.setNiceScrollByObj($('.jrsm-tab-window'));	//页面加滚动条
		}
		flee =!flee;
	};
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
	
	//页面初始化
	//入参：  用户编码、主体、当前页号、每页显示店铺数
	//出参：  对象者、店铺 + 活动
	Model.prototype.modelLoad = function(event) {
		_this2 = this;
		year = new Date().getFullYear(); 
		month = new Date().getMonth() +1;
		this.queryBigType();	//查询施策类型
		this.queryActivity();	//查询店铺和活动计划信息
		this.queryShop();	//查询店铺列表
		this.addEvent();		//添加点击事件
		$.loadSelectValues(this.comp("queryActivityTypeData"),"act_activity_type",false);//加载下拉框施策
		$.loadSelectValues(this.comp("queryEventTypeData"),"act_event_type",false);//加载量版·地域区分
		
	};
	//查询施策类型
	Model.prototype.queryBigType = function(event){
		var data = {};
		var arr1 = [];
		global.ajax({
			url:"/jrsm/actActivityType/queryByAdd",
			async : false,
			data:data,
			success: function(Data){
				(Data.data).forEach(function(val){
					if(val.typeCatalog =="D"){
						arr1 = [val.rowId, val.typeName, val.typeColor];
						if(val.processFlag =="N"){
							var li = $("<li><button disabled='disabled' class='bigTypeName' data-info='"+ arr1 +"'>"+ val.typeName +"+</button></li>").appendTo( $("#selectGroup") );
							li.find("button").css({"background": val.typeColor.colorRgb(), "color": val.typeColor});
						}else{
							var li2 = $("<li><button class='bigTypeName' data-info='"+ arr1 +"'>"+ val.typeName +"+</button></li>").appendTo( $("#selectGroup2") );
							li2.find("button").css({"background": val.typeColor.colorRgb(), "color": val.typeColor});
						}
					}
				});
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};

	Model.prototype.queryActivity = function(){
		var temp= this.comp("queryActivityData");
		var positionId = (global.getProfile()).__positionId;     //当前用户职位
		console.log(positionId);
		if((positionId ==='CHG') || (positionId ==='XGPM') || (positionId ==='IRER1')){
			$("#selectGroup li button").each(function(){
				$(this).attr('disabled',false);	//角色为营业担当时按钮可用
			});
		}else if(positionId ==='MD'){
			$("#ykdl").attr('disabled',false);	//角色为M推时、一括登录按钮可用
		}else if(positionId ==='GPM'){
			$("#copy_shops").attr('disabled',true);	//角色为GPM时、复写登录不可用
		}
		var userInfo_id =(global.getProfile()).__userName;		//获取userCode
		var data = {
				__pagesize: pageSize,
				__page: page,
				queryDateFrom: mGetDate(year, month-1)+'-01',
				queryDateTo: mGetDate(year, month-0+4)+'-01'
			};
		if((positionId ==='CHG') || (positionId ==='IRER') || (positionId ==='RER')){
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
			url: "/jrsm/actActivity/getActivityListByUser",
			success: function(data){
				if (data.__statusCode=='S'){
					var userStore_data = data.data.userStoreList;
					var activity_data = data.data.activityList;
					page_count = Math.ceil((data.__pagecount)/pageSize);
					$("#showPageCount").html(page_count);
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
					showShopArr = userStoreList;
					showUserArr = userArr;
					newUserArr = unique(showUserArr);	//去除重复
					//活动计划部分
					eventArr = [];
					activity_data.forEach(function(val){
						var str = [], strCode = [];
						for(var m=0; m<(val.bdApplyItemcatalogs).length; m++ ){
							str.push( (val.bdApplyItemcatalogs)[m].itemCatalogName );
							strCode.push( (val.bdApplyItemcatalogs)[m].itemCatalogCode );
						}
						if((val.startDate) && (val.endDate) && (val.displayColor) && (val.rowId)){
							eventArr.push({
								"startTime":  (val.startDate).split(" ")[0],
								"endTime":  (val.endDate).split(" ")[0],
								"whichShop": val.storeName,
								"eventType": val.bigCatalogName,
								"smallCatalogName": val.smallCatalogName,
								"str": str,
								"strCode": strCode,
								"background": val.displayColor,
								"code": val.rowId,
								"storeCode": val.storeCode,
								"chargerCode": val.chargerCode,
								"chargerName": val.chargerName,
								"dataFrom": val.dataFrom,
								"actiivityStatus": val.actiivityStatus
							});
						}
					});
					console.log(eventArr);
					initMonth();
					temp.clear();
					temp.loadData(activity_data);
					temp.refreshData();
					if(flee) {
						$.setNiceScrollByObj($('.jrsm-tab-window'));	//页面加滚动条
					}
				}else{
					dialoghelper.exception(data);
				}
			},
			error: function () {
				alert('请求失败');
			},
		});
	};
	//查询并挂载复写元和复写先的店铺
	Model.prototype.queryShop = function(){
		var queryBdStoreData=this.comp("queryBdStoreData");
		var positionId = (global.getProfile()).__positionId;     //当前用户职位
		console.log(positionId);
		var userInfo_id =(global.getProfile()).__userName;		//获取userCode
		var data = {};
		if((positionId ==='CHG') || (positionId ==='IRER') || (positionId ==='RER')){
			data.userCode = userInfo_id;
		}else{
			return;
		}
		global.ajax({
			async :false,
			data: data,
			type:'POST',
			url: "/jrsm/actActivity/getStoreListByUser",
			success: function(data){
				if (data.__statusCode=='S'){
					if(positionId !=='GPM'){
						queryBdStoreData.clear();
						queryBdStoreData.loadData(data.data);
						queryBdStoreData.refreshData();
					}
				}else{
					dialoghelper.exception(data);
				}
			},
			error: function () {
				alert('请求失败');
			},
		});
	};
	
	//印刷
	Model.prototype.button23Click = function(event){
		$("#wrap").show().siblings().hide();
		$("#wrap .showEvent").css({"border": "1px solid #000","color": "#000"});
		window.print();
		window.history.back();
	};
//
	Model.prototype.button6Click = function(event){		//page--上一页
		page--;
		if(page <1) {
			page =1;
		}else{
			if(queryFlag){
				this.button12Click('123');
			}else{
				this.queryActivity();
			}
		}
		$("#showPage").html(page);
	};
	Model.prototype.button7Click = function(event){		//page++下一页
		console.log(this);
		page++;
		if(page >page_count) {
			page =page_count;
		}else{
			if(queryFlag){
				this.button12Click('123');
			}else{
				this.queryActivity();
			}
		}
		$("#showPage").html(page);
	};
	
	Model.prototype.modelUnLoad = function(event){		//页面关闭时清空数组
		eventArr = [];
	};
	Model.prototype.button4Click = function(event){		//month++下个月
		month++;
		if(queryFlag){
			this.button12Click();
		}else{
			this.queryActivity();
		}
	};
	Model.prototype.button3Click = function(event){		//month--上个月
		month--;
		if(queryFlag){
			this.button12Click();
		}else{
			this.queryActivity();
		}
	};
	//执行删除
	Model.prototype.deleteRow =  function (event) {
		global.ajax({    
			url:"/jrsm/"+event.className+"/delete",
			data:{rowId:event.rowId},
			success: function(Data){
				_this2.queryActivity();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	
	//点击复写登录
	Model.prototype.copyAll = function(event){
		var the_startDate = firstDay+" 00:00:00";
		var the_endDate = lastDay+" 23:59:59";
		var _this = this;
		var endCopy = this.comp("copyAlldata").val("toStoreCode");
		console.log();		
		if( !($("#start_copy").val()) || !endCopy){		//复写元和复写先店铺不能为空
			dialoghelper.info(messagehelper.get("msgDial.activity.I006"));
			return;
		}
		if( (endCopy.split(",")).indexOf($("#start_copy").val()) !==-1){	//复写元和复写先店铺不能重复
			dialoghelper.info(messagehelper.get("msgDial.activity.I007"));
			return;
		}

		global.ajax({
			url:"/jrsm/actActivity/copyAll",
			data:{"startDate": the_startDate,"endDate": the_endDate,"storeCode" : JSON.stringify({"fromStoreCode":$("#start_copy").val(),"toStoreCode":endCopy})},
			async:false,
			success: function(Data){
				_this.queryActivity();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
		initMonth();
	};
	//点击按钮切换日别活动和出退勤日历画面
	Model.prototype.button2Click = function(event){
		$("[pagekey='m674']",this._parentModel._parentModel._rootNode).trigger("click");
	};
	Model.prototype.button5Click = function(event){
		$("[pagekey='m677']",this._parentModel._parentModel._rootNode).trigger("click");
	};
	
	Model.prototype.iQuickSearch2BeforeQuery = function(event){
		event.source.setExtendQueryData({orgType:"UNIT",parentId:'',orgNodeType:"L1"});

	};
	
	Model.prototype.iQuickSearch3BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("unit1CodeId");
		event.source.setExtendQueryData({orgType:"UNIT",parentId:parentId,orgNodeType:"L2"});
	};
	
	Model.prototype.iQuickSearch4BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("unit2CodeId");
		event.source.setExtendQueryData({orgType:"UNIT",parentId:parentId,orgNodeType:"L3"});
	};
	
	Model.prototype.iQuickSearch2ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit1CodeId",event.row.rowId);
		console.log(event.row.rowId);
		console.log(this.comp("queryBdOrgData").getValue("unit1CodeId"));
		console.log(this.comp("queryBdOrgData").getValue("unit1Code"));
	};
	
	Model.prototype.iQuickSearch3ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit2CodeId",event.row.rowId);
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
	
	Model.prototype.iQuickSearch3DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("unit2CodeId",null);
		this.comp("queryBdOrgData").setValue("unit3CodeId",null);
		this.comp("queryBdOrgData").setValue("unit2Code",null);
		this.comp("queryBdOrgData").setValue("unit3Code",null);
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	Model.prototype.iQuickSearch21BeforeQuery = function(event){
		event.source.setExtendQueryData({orgType:"AREA",parentId:'',orgNodeType:"L1"});
		
	};
	
	Model.prototype.iQuickSearch21ChooseAfter = function(event){
		this.comp("queryBdOrgData").setValue("area1CodeId",event.row.rowId);
	};
	
	Model.prototype.iQuickSearch21DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("area1CodeId",null);
		this.comp("queryBdOrgData").setValue("area2CodeId",null);
		this.comp("queryBdOrgData").setValue("area3CodeId",null);
		this.comp("queryBdOrgData").setValue("area1Code",null);
		this.comp("queryBdOrgData").setValue("area2Code",null);
		this.comp("queryBdOrgData").setValue("area3Code",null);
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
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
	
	Model.prototype.iQuickSearch23BeforeQuery = function(event){
		var parentId=this.comp("queryBdOrgData").val("area2CodeId");
		event.source.setExtendQueryData({orgType:"AREA",parentId:parentId,orgNodeType:"L3"});
	};
	
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
	
	Model.prototype.iQuickSearch32BeforeQuery = function(event){		
		var storeCode=this.comp("queryBdOrgData").val("storeCode");
		if(!storeCode){
			storeCode="";
		}
		event.source.setExtendQueryData({storeCode:storeCode});
	};
	
	Model.prototype.button12Click = function(event){	//根据检索条件查询
		queryFlag =1;
		userCode=this.comp("queryUserDate").val("userCode");
		var queryBdOrgData=this.comp("queryBdOrgData");
//		var storeCode=this.comp("queryBdOrgData").val("storeCode");
//		var data =queryBdOrgData.toJson(true);
		var data =  dataHelper.getFirstRowToJson(queryBdOrgData);
		data.userCode = userCode;
//		data.storeCode = storeCode;
		data.__pagesize = pageSize;
		if(event !=='123'){	//判断是否切换页数，如果不是切换页数就给page赋值为1
			page =1;
			$("#showPage").html(page);
		}
		data.__page = page;
		data.queryDateFrom= mGetDate(year, month-1)+'-01';
		data.queryDateTo= mGetDate(year, month-0+4)+'-01';
	
		global.ajax({	    
			url: "/jrsm/actActivity/getActivityListByFilter",
			data: data,
			success: function(resultData){
				if (resultData.__statusCode=='S'){
					var userStore_data = resultData.data.userStoreList;
					var activity_data = resultData.data.activityList;
					page_count = Math.ceil((resultData.__pagecount)/pageSize);
					$("#showPageCount").html(page_count);
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
					console.log(userArr);
					console.log(userStoreList);
					//
					showShopArr = userStoreList;
					showUserArr = userArr;
					newUserArr = unique(showUserArr);	//去除重复
					//活动计划部分
					eventArr = [];
					activity_data.forEach(function(val){
						var str = [], strCode = [];
						for(var m=0; m<(val.bdApplyItemcatalogs).length; m++ ){
							str.push( (val.bdApplyItemcatalogs)[m].itemCatalogName );
							strCode.push( (val.bdApplyItemcatalogs)[m].itemCatalogCode );
						}
						if((val.startDate) && (val.endDate) && (val.displayColor) && (val.rowId)){
							eventArr.push({
								"startTime":  (val.startDate).split(" ")[0],
								"endTime":  (val.endDate).split(" ")[0],
								"whichShop": val.storeName,
								"eventType": val.bigCatalogName,
								"smallCatalogName": val.smallCatalogName,
								"str": str,
								"strCode": strCode,
								"background": val.displayColor,
								"code": val.rowId,
								"storeCode": val.storeCode,
								"chargerCode": val.chargerCode,
								"chargerName": val.chargerName,
								"dataFrom": val.dataFrom,
								"actiivityStatus": val.actiivityStatus
							});
						}
					});
					initMonth();
					//
					if(flee) {
						$.setNiceScrollByObj($('.jrsm-tab-window'));	//页面加滚动条
					}
				}else{
					dialoghelper.exception(resultData);
				}
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	
	Model.prototype.iQuickSearch13DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};
	
	Model.prototype.iQuickSearch23DeleteAfter = function(event){
		this.comp("queryBdOrgData").setValue("storeCode",null);
	};

	Model.prototype.button8Click = function(event){	//reset
		this.comp("queryBdOrgData").clear();
		this.comp("queryBdOrgData").newData();
		this.comp("queryStoreData").clear();
		this.comp("queryStoreData").newData();
		this.comp("queryUserDate").clear();
		this.comp("queryUserDate").newData();
	};
	
	Model.prototype.iDatetimePicker1Okfun = function(event){	//切换对象年月
		year = event.value.split('-')[0];
		month = event.value.split('-')[1];
		this.queryActivity();	//查询活动信息
	};
	
	Model.prototype.iDatetimePicker2Okfun = function(event){	//切换对象年月
		year = event.value.split('-')[0];
		month = event.value.split('-')[1] -2;
		this.queryActivity();	//查询活动信息
	};
	
	Model.prototype.modelParamsReceive = function(event){
		this.comp("copyAlldata").clear();
		this.comp("copyAlldata").newData();
		this.comp("addActivityTypeData").clear();
		this.comp("addActivityTypeData").newData();
		this.comp("queryBdOrgData").clear();
		this.comp("queryBdOrgData").newData();
		this.comp("queryStoreData").clear();
		this.comp("queryStoreData").newData();
		this.comp("queryUserDate").clear();
		this.comp("queryUserDate").newData();
	};
	
	Model.prototype.gridSelect1ShowOption = function(event){	//设置复写先下拉框的菜单向上展开
		var grid_top = parseInt( $(".x-gridSelect-option").get(0).style.top );
		var his_height = parseInt( $(".x-gridSelect-option")[0].clientHeight);
		setTimeout(function(){
			$(".x-gridSelect-option").css("top", (grid_top - his_height-30) +'px');
		}, 10);
	};
	
	return Model;
});



