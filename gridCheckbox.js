define(function(require) {
	(function($){
		
		$.gridCheckbox1 = {
				defaults:{
					grid:{},
					top:'',
					left:'',
					column:[],
					clickBox:function(result){}
				},
				
				addCheckBox1 : function(options){
					options = $.extend(this.defaults,options);
					//生成一个惟一的ID
					function getModalID(){
						var d = new Date();
						var vYear = d.getFullYear();
						var vMon = d.getMonth()+1;
						var vDay = d.getDate();
						var h = d.getHours();
						var m = d.getMinutes();
						var se = d.getSeconds();
						var sse=d.getMilliseconds();
						return 'checkBox_'+vYear+vMon+vDay+h+m+se+sse+'l';
					}
					var checkBox = '<input id="{ID}" class="chk_2" type="checkbox"></input><label for="{ID}" style = "position: absolute;top: '+options.top+';left: '+options.left+';"></label>';
					var checkBoxId = getModalID();
					checkBox = checkBox.replace(/{ID}/g,checkBoxId);
					var $th = options.grid.parents('.x-grid-widget').find('.x-grid-hbox').find('th');
					$.each($th,function(i,n){
						var title="";
						if($(n).find('div').length!==0){
							title=$(n).find('div')[0].innerText;
						}
						$.each(options.column,function(key,value){
							if(title==value){
								$(n).append(checkBox);
							}
						});
						
					});
					$('#'+checkBoxId).change(function(){
						 var  result =$('#'+checkBoxId).prop( "checked" );
						 options.clickBox(result);
					});
					
					
				}
				
		};
		
		
	})(jQuery);
});