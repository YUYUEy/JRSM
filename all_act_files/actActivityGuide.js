define(function(require){
	var $ = require("jquery");
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	
	var Model = function(){
		this.callParent();
	};
	var year,month;
	
	function getWeek(str){
		var weekCount;
		var yyy = new Date(str).getFullYear();
		var mmm = new Date(str).getMonth() +1;
		var ddd = new Date(str).getDate();
		var firstWeekday = new Date(yyy, mmm -1, 1).getDay();////获取一个月的一号是周几？
		if(firstWeekday ==1){
			weekCount = Math.ceil(ddd/7);
		}else{
			weekCount = Math.ceil((ddd -firstWeekday)/7);
		}
		if(weekCount =='-0'){ 
			mmm--;
			weekCount = getWeek2(yyy, mmm);
		}
		return (mmm+'月;'+weekCount+"周");
//		return weekCount;
	}
	function getWeek2(year, month){
		var weekCount2;
		var firstWeekday2 = new Date(year, month -1, 1).getDay();
		var dayCount  = new Date(year, month, 0).getDate();//总天数
		if(firstWeekday2 ===0) firstWeekday2 =7;
		if(firstWeekday2 ==1){
			weekCount2 = Math.ceil(dayCount/7);
		}else{
			var lastDays = dayCount -(8- firstWeekday2);
			weekCount2 = Math.ceil(lastDays/7);
		}
		return weekCount2;			
	}
	//
	function GetDateStr(AddDayCount) { 		//获取N天以后的日期    
	   var dd = new Date( $("#year_month").val() );  
	   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期    
	   var y = dd.getFullYear();     
	   var m = (dd.getMonth()+1)<10? "0"+(dd.getMonth()+1) :(dd.getMonth()+1);//获取当前月份的日期，不足10补0    
	   var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0 
	   return y+"-"+m+"-"+d;     
	}

	Model.prototype.button1Click = function(event){		//week--
		$("#year_month").val(GetDateStr(-7));
		$("#show_w").html( getWeek( $("#year_month").val() ) );
//		 getWeek( $("#year_month").val() );
	};
	
	Model.prototype.button2Click = function(event){		//week++
		$("#year_month").val(GetDateStr(7));
		$("#show_w").html( getWeek( $("#year_month").val() ) );
//		getWeek( $("#year_month").val() );
	};
	
	Model.prototype.modelLoad = function(event){
		year = new Date().getFullYear(); 
		month = (new Date().getMonth() +1)< 10? '0'+(new Date().getMonth() +1) :(new Date().getMonth() +1);
		var day = (new Date().getDate())< 10? '0'+(new Date().getDate()) :(new Date().getDate());
		$("#year_month").val(year+'-'+ month+'-'+ day );
		$("#show_w").html( getWeek( $("#year_month").val() ) );
		this.queryClick();
//		this.queryClick2();
		this.queryClick3();
		this.queryClick4();
//		this.queryClick5();
	};
	//
	Model.prototype.queryClick = function(event){	//【促销活动施策主表】的促销活动名,开始日期,结束日期,东芝店铺级别
		var qryData = this.comp("actActivityGuideData");
		global.ajax({
			url:"/jrsm/evtMaster/query",
			success: function(data){
//				console.log(data);
				qryData.clear();
				qryData.loadData(data.data);
				qryData.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	Model.prototype.queryClick2 = function(event){
		var qryData2 = this.comp("actActivityGuideData2");
		global.ajax({
			url:"/jrsm/bdVocType/query",
			success: function(data){
//				console.log(data);
				qryData2.clear();
				qryData2.loadData(data.data);
				qryData2.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	Model.prototype.queryClick3 = function(event){		//【机种计划与实际表】的计划数、实际数、达成率=实际数/计划数
		var qryData3 = this.comp("actActivityGuideData3");
		global.ajax({
			url:"/jrsm/evtEventItem/query",
			success: function(data){
//				console.log(data);
				qryData3.clear();
				qryData3.loadData(data.data);
				qryData3.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	Model.prototype.queryClick4 = function(event){		//【效果报告】的贡献度、成功点、反身点、客户关心、他社动向、客户反映
		var qryData4 = this.comp("actActivityGuideData4");
		global.ajax({
			url:"/jrsm/evtEventReport/query",
			success: function(data){
//				console.log(data);
				qryData4.clear();
				qryData4.loadData(data.data);
				qryData4.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	Model.prototype.queryClick5 = function(event){		//
//		var qryData5 = this.comp("actActivityGuideData5");
		global.ajax({
			url:"/jrsm/evtMaster/query",
			success: function(data){
				console.log(data);
//				qryData5.clear();
//				qryData5.loadData(data.data);
//				qryData5.refreshData();
			},
			errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
				throw justep.Error.create("处理出错，错误代码：" + XMLHttpRequest.readyState+" - "+textStatus);
			}
		});
	};
	

	return Model;
});