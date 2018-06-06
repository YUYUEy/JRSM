(function(){
	var datepicker = {};
	datepicker.getMonthData = function(year,month){
		var ret = [];
		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		var firstDay = new Date(year,month - 1, 1);
		var firstDayWeekday = firstDay.getDay();
		var monthFirstday = firstDay.getDate();	//
		if(firstDayWeekday === 0) firstDayWeekday = 7;
		var lastDayOfLastMonth = new Date(year,month - 1, 0);
		var lastDateOfLastMonth = lastDayOfLastMonth.getDate();
		
		var lastDayOfLastMonth2 = new Date(year,month, 0);
		var lastDateOfLastMonth2 = lastDayOfLastMonth2.getDate();
		var lastDayOfLastMonth3 = new Date(year,month-0 + 1, 0);
		var lastDateOfLastMonth3 = lastDayOfLastMonth3.getDate();
		var lastDay2 = new Date(year, month-0 +1, 0);
		var lastDate2 = lastDay2.getDate();
		var lastDay3 = new Date(year, month-0 +2, 0);
		var lastDate3 = lastDay3.getDate();

		var prevDay = firstDayWeekday - 1;
		var lastDay = new Date(year, month, 0);
		var lastDate = lastDay.getDate();
		
//		console.log(lastDate+';'+lastDate2 +';'+ lastDate3)
		var xxx;
		if(monthFirstday ==firstDayWeekday){
			xxx =1
		}else{
			xxx =8
		}

		for(var i=0; i<7*14; i++){
			var date = i+xxx -prevDay;
			var showDate = date;
			var thisMonth = month;
			if(date <= 0){
				showDate = lastDateOfLastMonth + date;
				thisMonth = month - 1;
			}else if (date > lastDate && date<= (lastDate +lastDate2)) {
				showDate = showDate - lastDate;
				thisMonth = month -0 + 1;
			}else if ( date> (lastDate +lastDate2) && date <= (lastDate +lastDate2 + lastDate3)) {
				showDate = showDate - (lastDate +lastDate2);
				thisMonth = month -0 + 2;
			}else if ( date> (lastDate +lastDate2 + lastDate3)) {
				showDate = showDate - (lastDate +lastDate2 +lastDate3);
				thisMonth = month -0 + 3;
			}
			if(thisMonth <=0) {
				thisMonth += 12;
				year--;
			};
			if(thisMonth >= 13) {
				thisMonth -= 12;
				year++;
			};

			ret.push({
				year: year,
				date: date,
				month: thisMonth,
				showDate: showDate
			})

		}
//		console.log(ret)
		return ret;
		
	}


	window.datepicker = datepicker;
})()