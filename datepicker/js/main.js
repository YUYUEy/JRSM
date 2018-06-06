(function(){
	var datepicker = window.datepicker;
	datepicker.buildUi = function(year,month){
		var monthData = datepicker.getMonthData(year,month);
		// console.log(monthData[22])
		
		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
	
		var html = 	'<div class="tab">'+
						'<table>'+
								'<thead>'+
									'<tr>'+										
										'<th>一</th>'+
										'<th>二</th>'+
										'<th>三</th>'+
										'<th>四</th>'+
										'<th>五</th>'+
										'<th>六</th>'+
										'<th>日</th>'+
									'</tr>'+
								'</thead>'+
								'<tbody class="context">';
								for(var i=0; i < monthData.length; i++){
									var date = monthData[i];
									date.showDate = date.showDate <10 ?'0'+date.showDate :date.showDate;

									if(i%7 === 0){
										html += '<tr>';
									}
html += '<td><p class="showDate">'+ date.showDate +'</p><ul><li id="planRow"><span class="plan">計画</span></li><li id="doneRow"><span class="done">实绩</span></li></ul></td>';
									if(i%7 === 6){
										html += '</tr>'
									}

								};
								
							html +=	'</tbody>'+							
						'</table>'+
					'</div>';
		return html;
	}

	// datepicker.init = function($dom){
	// 	$dom.innerHTML = datepicker.buildUi(2015,11);
		
	// }


})()