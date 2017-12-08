(function(){
	var datepicker = window.datepicker;
	datepicker.buildUi = function(year,month){
		window.monthData = datepicker.getMonthData(year,month);
		 if(monthData[91].showDate <10){
		 	monthData.splice(91,7)
		 }
		 if(monthData[84].showDate <10){
		 	monthData.splice(84,7)
		 }

		if(!year || !month){
			var today = new Date();
			year = today.getFullYear();
			month = today.getMonth() + 1;
		}
		var html = 	'<div class="tab">'+
						'<table>'+
								'<thead>'+
									'<tr class="threeMonth">'+
										'<th class="supplyHead" rowspan="2" id="shop_list">店舗'+
										'<ul id="shop_man"><li>営業氏名</li><li>東芝 太郎</li></ul>'+
										'</th>'+
										'<th colspan="28" id="prevMonth"><span></span></th>'+
										'<th colspan="28" id="thisMonth"><span></span></th>'+
										'<th colspan="28" id="nextMonth"><span></span></th>'+
									'</tr>'+
									'<tr class="fourteen">'+
//										'<th class="supplyHead"></th>'+
										'<th colspan="7" class="firstW"><span></span>w<div class="bor"></div>'+
		'<div class="showEdit"><a class="toClose"><i class="icon iconfont icon-xinzeng"></i></a><ul class="the_info"><li class="the_title">111</li><li class="the_time">111</li><li class="the_event">222</li></ul>'+
		'<div class="editAndDel"><button class="toDel">删除</button><button class="toEdit">编辑</button></div></div>'+
										'</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7"><span></span>w</th>'+
										'<th colspan="7" class="lastW"><span></span>w</th>'+
									'</tr>'+
								'</thead>'+
								'<tbody class="context">' ;
								
									for(var i=0; i<5; i++){
										html +=	'<tr class="shopEvent"><td class="supplyHead">'+ String.fromCharCode(65+i) +'店</td>';
											for(var j=0; j<12; j++){
												html += '<td colspan="7"></td>';
											}
										html +='<td colspan="7" class="lastW"></td></tr>';
									};
									
								html += '<tr id="mainTd"><td class="supplyHead"></td>';
								for(var i=0; i < monthData.length; i++){
									var date = monthData[i];
									html += '<td data-date="'+ date.date +'"></td>';
//									html += '<td></td>';
								};
								html += '</tr>';
							html +='</tbody>'+							
						'</table>'+
					'</div>';
		return html;
	}


})()