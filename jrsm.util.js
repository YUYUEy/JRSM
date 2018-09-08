define(function(require) {
/**
	 *   @author guangning.pang@midea.com.cn
	 *   dateToTime: 时间格式2017-12-06 14:34:57转出14:36
	 *   strToTime:任意字符串转换时间类型的14:36输出，方便给后台保存
	 *   strToDate:任意字符串转换时间类型的2017-01-01 14:36：00输出，方便给后台保存
	 *   TimeToData:时间格式2017-12-06 14:34:57转出2017-12-06
	 */
	return {
		 dateToTime : function(date) {  
			return  date.substring(11, 16);  
		},
		TimeToData : function(date) {  
			return  date.substring(0, 10);  
		},
		
		strToTime : function (data) {  
			var length = data.length;
			var time ;
			if(length >=5){
				time =data;	
			} else if (length==4){
				time =data+"0";	
			} else if (length==3){
				time =data+"00";
			} else if (length==2){
				time =data+"000";
			} else if (length==1){
				time =data+"0000";
			}
			
			var HH = time.substring(0, 2); 
			var aa = time.substring(2, 3); 
			
			if(aa==":"){
				var mm = time.substring(3, 5); 
			}else{
				 aa =":"
				var mm = time.substring(2, 4); 
			}
				
			 time = HH+aa+mm;
			return time;  
		},		
		strToDate:function(data){
			 var time = this.strToTime(data);
			// console.log("0000-00-00 "+time+":00");		
			 return "2017-01-01 "+time+":00"; 
		}
		
		
	};
});