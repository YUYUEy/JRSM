

define(function(require) {
	(function($){
		$.fn.teninedialog = function(options){
			var defaults = {
				title:'System Prompt',
	            content:'Confirm to delete this record ?',
				showCloseButton:false,//显示关闭按钮
				otherButtons:["OK","Cancel"],//其他按钮文本，样式默认,["确定","取消"]
				otherButtonStyles:['btn-teninedialog','btn-teninedialog'],//其他按钮的样式，['btn-primary','btn-primary'],bootstrap按钮样式
				bootstrapModalOption:{},//默认的bootstrap模态对话框参数
				dialogShow:function(){},//对话框即将显示事件
				dialogShown:function(){},//对话框已经显示事件
				dialogHide:function(){},//对话框即将关闭
				dialogHidden:function(){},//对话框已经关闭事件
				//clickButton:function(sender,modal,index){}//选中按钮的序号，排除关闭按钮。sender:按钮jquery对象，model:对话框jquery对象,index:按钮的顺序,otherButtons的数组下标
				clickButton:function(result){}
			}
			var options = $.extend(defaults, options);
			var modalID='';
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
				return 't_'+vYear+vMon+vDay+h+m+se+sse;
			}		
	
			$.fn.extend({
				closeDialog:function(modal){
					var modalObj=modal;
					modalObj.remove();
				}			
			});
			return this.each(function(){
				var obj=$(this);
				modalID=getModalID();
				
				var tmpHtml='<div id="{ID}" class="modal fade modal-ms" style="z-index: 99999;" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-teninedialogcontent" id={contentID} ><div class="modal-teninedialogheader">'+
							'<button type="button" class="close" id="{closeID}" data-dismiss="modal" aria-hidden="true">&times</button>'+
							'<h4 id="myModalLabel" style="color:inherit" >{title}</h4></div><div class="modal-teninedialogbodyline"></div><div class="modal-teninedialogbody"><p>{body}</p></div><div class="modal-teninedialogfooter">{button}</div></div></div>';
				var buttonHtml='<button class="btn btn-teninedialog" data-dismiss="modal" aria-hidden="true">Close</button>';

				
	            if (!options.showCloseButton&&options.otherButtons.length>0) {buttonHtml='';};
	            //生成按钮
	            var btnClass='cls-'+modalID;
	            for(var i=0;i<options.otherButtons.length;i++){
	            	buttonHtml+='<button buttonIndex="'+i+'" class="'+btnClass+' btn '+options.otherButtonStyles[i]+'">'+options.otherButtons[i]+'</button>';
	            }
	            var contID='cont'+modalID;
	            var closeID = 'close'+modalID;
	            //替换模板标记
	            tmpHtml=tmpHtml.replace(/{ID}/g,modalID).replace(/{title}/g,options.title).replace(/{body}/g,options.content).replace(/{button}/g,buttonHtml).replace(/{contentID}/g, contID).replace(/{closeID}/g, closeID);
	            
	            
	            
	            obj.append(tmpHtml);
	
	            var modalObj=$('#'+modalID);   
	            modalObj.modal({backdrop: 'static', keyboard: false});
	            var contentObj=$('#cont'+modalID);
	            
	            var contentPosition=function(){ 
	        	    var w =$(window).width(); 
					var h =$(window).height();
					
					var ml = w/2-contentObj.width()/2;
					var mt = h/2-140;
					contentObj.css({
						top:mt,
						left:ml
					});
	            }
	            contentPosition();
				$(window).resize(function(){
					contentPosition();
				})
				
	            //绑定按钮事件,不包括关闭按钮
	            $('.'+btnClass).click(function(){
	            	var index=$(this).attr('buttonIndex');
	            	var result=false;
	            	if(index==0){
	            		result=true;
	            	}
	            	options.clickButton(result);
	            	$(this).closeDialog(modalObj);
	            });
				$('#'+closeID).click(
					function(){
						options.clickButton(false);
						$(this).closeDialog(modalObj);
					});
	            //绑定本身的事件
				modalObj.on('show', function () {
				  options.dialogShow();
				}); 
				modalObj.on('shown', function () {			  		  
				  	options.dialogShown();
				});
				modalObj.on('hide', function () {
				  options.dialogHide();
				}); 
				modalObj.on('hidden', function () {
				  options.dialogHidden();
				  modalObj.remove();
				});
				modalObj.modal(options.bootstrapModalOption);							           
			});
	
		};
		$.extend({ 
		    teninedialog: function(options) {
		    	$("body").teninedialog(options);
		    } 
		});
	
	})(jQuery);
});

