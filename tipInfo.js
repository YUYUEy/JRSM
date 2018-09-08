/*** Copyright 2013 Teun Duynstee Licensed under the Apache License, Version 2.0 ***/
firstBy=function(){function n(n){return n}function t(n){return"string"==typeof n?n.toLowerCase():n}function r(r,e){if(e="number"==typeof e?{direction:e}:e||{},"function"!=typeof r){var i=r;r=function(n){return n[i]?n[i]:""}}if(1===r.length){var u=r,o=e.ignoreCase?t:n;r=function(n,t){return o(u(n))<o(u(t))?-1:o(u(n))>o(u(t))?1:0}}return-1===e.direction?function(n,t){return-r(n,t)}:r}function e(n,t){var i="function"==typeof this?this:!1,u=r(n,t),o=i?function(n,t){return i(n,t)||u(n,t)}:u;return o.thenBy=e,o}return e}();
 

jQuery.fn.extend({
	everyTime: function(interval, label, fn, times, belay) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times, belay);
		});
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn);
		});
	},getStrLength:function(str){
		 
		 var len = 0; 
		 if(typeof(str)=="string"){
		  len=str.trim().replace('\n','').replace(/[^\x00-\xff]/g,"aa").length;
	     }
		    return len;
	 }, trimFiexd:function (str)
     {
         var result;
         result = str.replace(/(^\s+)|(\s+$)/g,""); 
         result = result.replace(/\s/g,"");
         
         return result;
}
});

jQuery.fn.centershow=function(w,h,top,l){ 
    if(w){
 	   $(this).css('width',parseInt(w?w:$(this).width()));
 	  }
 	if(h){
 	   $(this).css('height',parseInt(h?h:$(this).height()));
 	 }
							var left = ($(window).width() - $(this).width()) / 2 + $(window).scrollLeft();
							if(!top){ 
								if($(window).height()>=$(this).height()){
								   top= ($(window).height() - $(this).height()) / 2 + $(window).scrollTop();
							   }
                         }
					    $(this).css("margin-left",left).css("margin-top",top);
                       if(l){
                       	$(this).css("margin-left",l);
                       }
};
$.extend({
	vformat :function( source, params ) {
		if ( arguments.length === 1 ) {
			return function() {
				var args = $.makeArray( arguments );
				args.unshift( source );
				return $.vformat.apply( this, args );
			};
		}
		if ( arguments.length > 2 && params.constructor !== Array  ) {
			params = $.makeArray( arguments ).slice( 1 );
		}
		if ( params.constructor !== Array ) {
			params = [ params ];
		}
		$.each( params, function( i, n ) {
			source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
				return n;
			});
		});
		return source;
	} 
	
});
 


jQuery.extend({
	formatDate:function(pattern,date){
		 //如果不设置，默认为当前时间
			if(!date) date = new Date();
			if(!pattern) pattern = "yyyy-MM-dd hh:mm:ss.S";
			if(typeof(date) ==="string"){
				 if(date=="")  date = new Date();
				  else  date = new Date(date.replace(/-/g,"/"));
			}	
			/*补00*/
			var toFixedWidth = function(value){
				 var result = 100+value;
				 return result.toString().substring(1);
			};
			
			
			/*配置*/
			var options = {
					regeExp:/(yyyy|M+|d+|h+|m+|s+|ee+|ws?|p|S)/g,
					months: ['January','February','March','April','May',
					         'June','July', 'August','September',
							  'October','November','December'],
					weeks: ['Sunday','Monday','Tuesday',
					        'Wednesday','Thursday','Friday',
								'Saturday']
			};
			
			/*时间切换*/
			var swithHours = function(hours){
				return hours<12?"AM":"PM";
			};
			
			/*配置值*/
			var pattrnValue = {
					"yyyy":date.getFullYear(),                      //年份
					"MM":toFixedWidth(date.getMonth()+1),           //月份
					"dd":toFixedWidth(date.getDate()),              //日期
					"hh":toFixedWidth(date.getHours()),             //小时
					"mm":toFixedWidth(date.getMinutes()),           //分钟
					"ss":toFixedWidth(date.getSeconds()),           //秒
					"ee":options.months[date.getMonth()],           //月份名称
					"ws":options.weeks[date.getDay()],              //星期名称
					"M":date.getMonth()+1,
			        "d":date.getDate(),
			        "h":date.getHours(),
			        "m":date.getMinutes(),
			        "s":date.getSeconds(),
			        "p":swithHours(date.getHours()),
			        "S" : (((date.getMilliseconds()%100000)*100)+"").substring(0,3)
			};
			//(date.getMilliseconds()%100000).toFixed(3)
			return pattern.replace(options.regeExp,function(){
			var value=	pattrnValue[arguments[0]];  
				   return  value;
			});					   
		   
		   
	   },isNull:function (keys){
		   var	flag=true;  
             flag=keys.replace(/(^s*)|(s*$)/g, "").length<1;  
        return flag;
},		
	timer: {
		guid: 1,
		global: {},
		regex: /^([0-9]+)\s*(.*s)?$/,
		powers: {
			// Yeah this is major overkill...
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseInt(result[1], 10);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times, belay) {
			var counter = 0;
			
			if (jQuery.isFunction(label)) {
				if (!times) 
					times = fn;
				fn = label;
				label = interval;
			}
			
			interval = jQuery.timer.timeParse(interval);

			if (typeof interval != 'number' || isNaN(interval) || interval <= 0)
				return;

			if (times && times.constructor != Number) {
				belay = !!times;
				times = 0;
			}
			
			times = times || 0;
			belay = belay || false;
			
			if (!element.$timers) 
				element.$timers = {};
			
			if (!element.$timers[label])
				element.$timers[label] = {};
			
			fn.$timerID = fn.$timerID || this.guid++;
			
			var handler = function() {
				if (belay && this.inProgress) 
					return;
				this.inProgress = true;
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
				this.inProgress = false;
			};
			
			handler.$timerID = fn.$timerID;
			
			if (!element.$timers[label][fn.$timerID]) 
				element.$timers[label][fn.$timerID] = window.setInterval(handler,interval);
			
			if ( !this.global[label] )
				this.global[label] = [];
			this.global[label].push( element );
			
		},
		remove: function(element, label, fn) {
			var timers = element.$timers, ret;
			
			if ( timers ) {
				
				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.$timerID ) {
							window.clearInterval(timers[label][fn.$timerID]);
							delete timers[label][fn.$timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}
					
					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}
				
				for ( ret in timers ) break;
				if ( !ret ) 
					element.$timers = null;
			}
		}
	}
});

if (/msie/.test(navigator.userAgent.toLowerCase()))
	jQuery(window).one("unload", function() {
		var global = jQuery.timer.global;
		for ( var label in global ) {
			var els = global[label], i = els.length;
			while ( --i )
				jQuery.timer.remove(els[i], label);
		}
	});

String.prototype.trim = function() {
	  var str = this,
	  str = str.replace(/^\s\s*/, ''),
	  ws = /\s/,
	  i = str.length;
	  while (ws.test(str.charAt(--i)));
	  return str.slice(0, i + 1);
	};
	
	 


/*tipInfo begin*/
(function($){ 
	
	
	
jQuery.fn.extend({ 
tipInfo: function(opts){
	 console.log("tipInfo:"+JSON.stringify(opts));
  var msg='';
  if(!(typeof(opts)=='object'&&opts.hasOwnProperty("tip")&&opts.hasOwnProperty("msg"))){ 
  		  msg=opts;
	     opts={msg:msg}; 
  	  
  } 
  console.log("tipInfoa:"+JSON.stringify(opts));
  $("#maskOfProgressImage,#progressImgage").hide(); 
  var styleTip=function(h,conf){
	     var reg = new RegExp("^[0-9]*$");
	     h=parseInt(h);
	     h= !reg.test(h)?84:parseInt(h);
	     if(h<=84){
	    	 h=84;
	    	 if(conf){
	    		h+=32; 
	    	 }
	     }
	    
	     
	  var styleTip="transition:border linear .2s,box-shadow linear .5s;" +
	  		"-moz-transition:border linear .2s,-moz-box-shadow linear .5s;" +
	  		"-webkit-transition:border linear .2s,-webkit-box-shadow linear .5s;" +
	  		"outline:none;border-color:rgba(93,149,242,.75);" +
	  		"box-shadow:0 0 8px rgba(93,149,242,.105);" +
	  		"-moz-box-shadow:0 0 8px rgba(93,149,242,.5);" +
	  		"-webkit-box-shadow:0 0 8px rgba(93,149,242,3); " +
	  		"height:'"+h+"';"+  
		    "-moz-border-radius: 6px 6px 0 0; "+     /* Gecko browsers */
		    "-webkit-border-radius: 6px 6px 0 0;"+   /* Webkit browsers */
		    "border-radius:6px 6px 0 0;";           /* W3C syntax */
	 
	  		
	  return styleTip;
	  };
	  var styleBtn=function(color){
	  var styleBtn="margin: 0 10px 0 0px;"+
		  "color: #ffffff;"+
		  "background: "+color+";"+
		  "border:none;"+ 
		  "float: right; "+
		  "height:24px;"+
		  "line-height:24px;"+
		  "padding:0px 6px; "+ 
		  "-moz-border-radius: 4px 4px 4px 4px; "+     /* Gecko browsers */
		    "-webkit-border-radius: 4px 4px 4px 4px;"+   /* Webkit browsers */
		    "border-radius:4px 4px 4px 4px;";           /* W3C syntax */ 
	return styleBtn;
		  
  };
  var styleTop=function(w,c){	 
	   var styleTop='  font:normal normal normal 16pt/40px "Microsoft YaHei",Consolas; 	text-align:center;	background-color:\"'+c+'\";  width:"'+w+'"; height:40px;';
	   styleTop+=		   
	    "-moz-border-radius: 6px 6px 0 0;  "+     /* Gecko browsers */
	    "-webkit-border-radius: 6px 6px 0 0; "+   /* Webkit browsers */
	    "border-radius:6px 6px 0 0;";          /* W3C syntax */ 
	   return styleTop;
   };
  var styleTitle=function(w,c){
	   var styleTitle='font:normal normal normal 16pt/40px "Microsoft YaHei",Consolas; 	text-align:center;	  height:40px;width:"'+w+'"; background-color:"'+c+'"; float:left;';
	     return styleTitle;
  } ;
  var styleClose=function(){
	   var styleClose='font:normal normal normal 16pt/40px "Microsoft YaHei",Consolas; 	text-align:center;	cursor:pointer; 	text-align:center; height:40px; width:40px; float:right; color:#ffffff';
	   
	   return styleClose;
  };
   var styleBottom=function(w){
	   var styleBottom='background:#ffffff;padding:2px 0; margin:0px 0px;  font:normal normal normal 14pt/40px "Consolas"; 	text-align:center;	 width:"'+w+'px"; height:30px;';
	    return styleBottom;
   };
   var styleContent=function(w,h){	    
	     var reg = new RegExp("^[0-9]*$");
	     h=parseInt(h);
	     h= !reg.test(h)?84:parseInt(h); 
	     w=parseInt(w);
	     w= !reg.test(w)?474:parseInt(w);
	     if(w<=474){
	    	     w=464;
	    	 if(h>=360){
	    		 w=454;
	    	 }
	     }
	     ///*border-top: 1px solid #eee; word-break: keep-all;word-wrap: break-word; */
	   var styleContent='text-align:center; margin:10px 30px;word-break: keep-all;word-wrap:break-word; overflow: auto; color:#666666;	font:normal normal normal 14px/22px "Microsoft YaHei",Consolas; 	text-align:center;	 width:'+w+'px;	text-align:left; height:'+h+'px; min-height:22px';
	   
	   return styleContent;
   };
   $('#tip_show_msg_wap').remove(); 
   $(".maskOfProgressImage,.progressImgage").remove(); 
	opts = jQuery.extend({
	  	           btn:true,
	  	           width:486,
	  	           height:84,
	  	           st:10,
	  	           dt:3000,
	  	           tip:"tip",
	  	           okText:"确认",
	  	           noText:"取消",
	  	           confirm:false,
	  	           msg:msg,
	  	           htmlFlag:false,
	  	           fixedLength:0,
	  	           fixedHeight:0,
	  	           ht:10,close:function(){},'ok':function(){return true;},'no':function(){return true;},'title':'提示信息'
	             }, opts || {});
				 $('.tip,#tip_show_msg_bg').remove(); 
				  	
				 var getStrLength=function(str){
					 
					 var len = 0; 
					 if(typeof(str)=="string"){
					  len=str.trim().replace('\n','').replace(/[^\x00-\xff]/g,"aa").length;
				     }
					    return len;
				 }
				 
				 var length=0;
				 if(typeof(opts)=='object'&& opts.hasOwnProperty("msg")){ 
					   //opts.msg=opts.msg.trim().replace(/[\r\n]/g,"");//去空格
					 var  str = "could not open a session in 4 attempts";
					 if(!typeof(opts.msg)=='string'){
						 opts.msg=opts.msg.toString();
					 }
					 var msg = opts.msg.toLowerCase();
    				if(msg.indexOf(str)>-1){
    					opts.msg="Siebel service restarting! Please try again after recovery.";
    				}
    				str="response was of unexpected text/html contentType";
    				
    				if(msg.indexOf(str)>-1){
    					opts.msg="WebService  service restarting! Please try again after recovery.";
    				}
    				  str="handler processing failed";
      				if(msg.indexOf(str)>-1){
    					opts.msg="WebService  is error ! Please try again after recovery.";
    				}    				  
					 if((typeof(opts.msg)=='string')){ 
					   length=getStrLength(opts.msg); 
						 if(opts.hasOwnProperty("fixedLength")){
							 length=length-opts.fixedLength;
						 }
					 }
				 }
				
				 var line=length%52;
				 if(line>0){
					 line=parseInt(length/46)+1;
				 }else{
					 line=parseInt(length/46);
				 }

				 if (opts.htmlFlag) {
					msg = msg.replace(/\n/g, "<br/>");
					msg = msg.replace(/\r/g, "<br/>");
					msg = msg.replace(/\r\n/g, "<br/>");
					var _msgArr = msg.split('<br/>');
					if (_msgArr.length > 0) {
						line = 0; // 重新算行数
					}
					var _len = 0;
					var _line = 0;
					for (var i = 0; i < _msgArr.length; i++) {
						_len = getStrLength(_msgArr[i]);
						_line = _len % 58;
						line += parseInt(_len / 58);
						if (_line > 0) {
							line += 1;
						}
					}
				 }
				 
				 opts.height=(line*22)+60; 
				
				 opts.title=getStrLength(opts.title)>32?opts.title.substring(0,14)+"...":opts.title;

				 if(opts.height>=400){
					 opts.height=400;
				 }
			     if(opts.height<=84){
			    	 opts.height=84;
			     }
			   
			     if(opts.fixedHeight){
			    	 opts.height=opts.fixedHeight;
			     }
		
		       var titleColorObj= {};
		       titleColorObj.success='#5cb85c';
		       titleColorObj.tip='#f0ad4e';
		       titleColorObj.error='#d9534f';
		       var  titleColor=titleColorObj.error;
		        if(opts.tip=='tip'||opts.tip=='success'||opts.tip=='error'){ 
		        	titleColor=titleColorObj[opts.tip];
		        }
			 	msg=opts.msg?opts.msg:'undefind option or msg is empty';			 	
			 	var tipId="tip_show_msg_wap"; 
				var tip= $('<div />').addClass('tip_msg_zzy').attr("id",tipId);
				var tipHeight=opts.height;
				  if(opts.confirm){
					  tipHeight= tipHeight+32;
				  }
				$(tip).attr("style",styleTip(tipHeight,opts.confirm));
				$(tip).css({"z-index":999,position: 'relative',color:"#0000000", background:'#ffffff',width:opts.width+40,height:tipHeight});  
				
				var tipTop=$('<div class="tip_msg_zzy tipTop" />').attr("title",opts.title); 
				var tipTitle=$('<div class="tip_msg_zzy tipTitle" />').html(opts.title);
				  $(tipTitle).attr("style",styleTitle(opts.width-50)).css({"color":"#ffffff"}).css({"margin-left":"10px"});
				  
				  $(tipTop).attr("style",styleTop(opts.width,titleColor)).css({backgroundColor:titleColor});
				  var tipClose=$('<div class="tip_msg_zzy tipClose"  />').text("x");
				  $(tipClose).attr("style",styleClose());
				  $(tipTop).append(tipTitle).append(tipClose);
				 var tipContent=$('<div class="tip_msg_zzy tipContent" />');//.attr("title",msg);
				 var debug=false;
				 var htmlFlag=opts.htmlFlag;
				 if(window.hasOwnProperty("wdebug")){
					 debug=window.wdebug;
				 }
				 if(debug||htmlFlag){
					 msg= msg.replace(/\n/g,"<br/>");
					 msg= msg.replace(/\r/g,"<br/>");
					 msg= msg.replace(/\r\n/g,"<br/>");
					 $(tipContent).html(msg); 
				 }else{
					 $(tipContent).text(msg); 
				 }
				  var contentHeight=opts.height-60;
				     
				 $(tipContent).attr("style",styleContent(opts.width-40,contentHeight));//.css({"margin":"10px",border:" 1px solid #abcdef; color:#000000"});
			 	var tipBottom=$('<div class="tip_msg_zzy tipBottom" />');
				 $(tipBottom).attr("style",styleBottom(opts.width));
				 $(tipClose).click(function(){ 
						if(opts.close&&typeof(opts.close)=='function'){ 
					       opts.close.call(this, opts);
				         }
						$('#'+tipId+',#tip_show_msg_bg').remove();
						$('#'+tipId+',#tip_show_msg_bg').stopTime("closef");
						
				 }).mouseover(function(){
					 $(this).css({color:'red'});
					 
				 }).mouseout(function(){
					 $(this).css({color:'#ffffff'});
					 
				 });
				
           
            var btnok=$('<a  class="btn btn-default btn-m4-tip" label="'+opts.okText+'" xid="tip_btn_ok"><i xid="i_tip_btn_ok"></i><span xid="spantip_btn_ok">'+opts.okText+'</span></a>');
            var btnno=$('<a  class="btn btn-default btn-m4-tip" label="'+opts.noText+'" xid="tip_btn_no"><i xid="i_tip_btn_no"></i><span xid="spantip_btn_no">'+opts.noText+'</span></a>');
            $(btnok).attr("style",styleBtn(titleColor));
            $(btnno).attr("style",styleBtn(titleColor));
           
            $(btnok).bind('click',function(){	
            	  var result=false;
					if(opts.ok&&typeof(opts.ok)=='function'){ 
						result= opts.ok.call(this, opts); 
							if(result){
								$('#'+tipId+',#tip_show_msg_bg').remove();	
								$('#'+tipId+',#tip_show_msg_bg').stopTime("closef");
							}		 
					}
				});
			$(btnno).bind('click',function(){	
				var result=false;
					if(opts.no&&typeof(opts.no)=='function'){ 
						result= opts.no.call(this, opts);
						 console.log("tipinfo_no");
							if(result){
								$('#'+tipId+',#tip_show_msg_bg').remove();	
								$('#'+tipId+',#tip_show_msg_bg').stopTime("closef");
							}		 
					}
				});			
			
				 var topmsg= $(tip).append($(tipTop))
			 	                   .append($(tipContent));
				 
				 if(opts.confirm){
					 $(tipBottom).append(btnno).append(btnok);
					 $(tip).append($(tipBottom));
					 
				 } 
				                    
				
				               	
	   if(!$('#tip_show_msg_bg')[0]){ 
	        $('<div id="tip_show_msg_bg" />').appendTo(document.body);
	     }
	   var w,h;											 
		w =$(window).width(); 
		h =$(window).height();
	    $("#tip_show_msg_bg").css({"min-width":600,	position:'absolute',top:0,left:0,"z-index":99999999,"-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)",filter:"alpha(opacity=20)",opacity: ".2"}).css({height:h+$(document).scrollTop(),width:w});  
	    if($('#tip_show_msg_bg')[0]){ 
	       $(topmsg).appendTo(document.body).show();  
	    }
 var boxResize=function(){ 
		 	 
		 		if($('#'+tipId)[0]){
		 			var w,h;											 
					w =$(window).width(); 
					h =$(window).height();
				    var mw=$('#'+tipId).width();
					var mh=$('#'+tipId).height(); 
					var  mt = h/2-(mh/2)+$(document).scrollTop();
					var  ml = w/2-(mw/2)+$(document).scrollLeft()+8;  
		 	       $('#'+tipId).css({"z-index":99999999,position: 'absolute',background:'#ffffff',top:mt,left:ml,width:mw,height:mh});
		 	      //console.log("w:"+w+" h:"+h+"mw:"+mw+" mh:"+mh+"mt:"+mt+"ml:"+ml);
		 		}
		 		if($('#tip_show_msg_bg')[0]){ 					 
					  w =$(window).width(); 
					   h =$(window).height();
		 	  	  $('#tip_show_msg_bg').css({height:h+$(document).scrollTop(),width:w,background:'#666666',"-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)",filter:"alpha(opacity=80)",opacity: ".8"});
		 	  }
	 	};
      
          
				 if(!opts.btn){
				  // $('#'+tipId+',#tip_show_msg_bg').delay(opts.dt).hide(); 
					 var time=parseInt(opts.dt/1000);
					 $('#'+tipId+',#tip_show_msg_bg').oneTime(time+'s',"closef", function() {
						 $('#'+tipId+',#tip_show_msg_bg').remove();
			           });
				}
		    	boxResize();
		 		
		 	$(window).scroll(function(){
               boxResize();  
               
		    }).resize(function(){
			    boxResize();
			});
		 	
				
		//end  
		 	 
	}
	
	 }); 
})(jQuery); 
//  window.alert=function(msg){
//	     if(!(msg instanceof String)){
//	    	 msg=JSON.stringify(msg);
//	     }
//	  $(this).tipInfo(msg); 
//  };
 

/*tipInfo end*/