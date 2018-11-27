(function(){
	var validate ={
		
		/**
		 * 计算两个日期的相差天数
		 * 
		 * <pre>
		 * 参数 
		 * 		sDate1 较大的日期(必填) yyyy-MM-dd 
		 * 		sDate2 较小的日期(必填) yyyy-MM-dd 
		 * 		setAbs 是否取绝对值
		 * 返回 日期相差天数
		 * </pre>
		 */
		dateDiff : function(sDate1, sDate2, setAbs) {
			var aDate, oDate1, oDate2, iDays;
			if (typeof sDate1 == "string") {
				aDate = sDate1.split("-");
				oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);// 转换为12-18-2002格式
			} else {
				oDate1 = sDate1;
			}
			if (typeof sDate2 == "string") {
				aDate = sDate2.split("-");
				oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
			} else {
				oDate2 = sDate2;
			}
			if (setAbs == null || setAbs == '') {
				setAbs = false;
			}
			if (setAbs) {
				iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
			} else {
				iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
			}
			return iDays
		},
		isLeapYear : function(date) {
			var y = date instanceof Date?date.getFullYear():date;
			return (0 === y % 4 && ((y % 100 !== 0) || (y % 400 === 0)));
		},
		maxDay : function(year, month) {
			if (month==1||month==3||month==5||month==7||month==8||month==10||month==12) {
				return 31;
			} else if (month==4||month==6||month==9||month==11) {
				return 30;
			} else if (this.isLeapYear(year)) {		//闰年二月29天---平年28天
				return 29;
			} else {
				return 28;
			}
		},
	}
	
	// window.dateDDD =dateDDD;
	window.validate =validate;
})()
