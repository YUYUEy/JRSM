define(function(require) {
	var messagehelper = require("$UI/jrsm/js/message");
	var justep = require("$UI/system/lib/justep");
	var Myjustep = require("$UI/jrsm/js/MyMessage/My.justep");
	var loadingImg = require.toUrl("$model/UI2/jrsm/module/lib/ajax-loader.gif");
	
	require("css!$UI/jrsm/css/icomoon/style").load();
	
	
	// 统一提示框的标题和按钮，同时支持多语言
	return {
		showInfo : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Info"),
				"message" : msg,
				"type" : "OK",
				callback : callback
			});
		},
		showPrompt : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Prompt"),
				"message" : msg,
				"type" : "Prompt",
				callback : callback
			});
		},
		showWarn : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Warn"),
				"message" : msg,
				"type" : "OK",
				callback : callback
			});
		},
		showError : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Error"),
				"message" : msg,
				"type" : "OK",
				callback : callback
			});
		},
		confirm : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Confirm"),
				"message" : msg,
				"type" : "OKCancel",
				callback : callback
			});
		},
		question : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Question"),
				"message" : msg,
				"type" : "YesNo",
				callback : callback
			});
		},
		questionCancel : function(msgDiag, msg, callback) {
			msgDiag.show({
				"title" : messagehelper.get("msgDial.Question"),
				"message" : msg,
				"type" : "YesNoCancel",
				callback : callback
			});
		},
		hint : function(msg, option) {
			Myjustep.Util.hint(msg, option || {});
		},
		info : function(msg) {
			Myjustep.Util.hint(msg, {
				type : 'info'
			});
		},
		success : function(msg) {
			Myjustep.Util.hint(msg, {
				type : 'success'
			});
		},
		warning : function(msg) {
			Myjustep.Util.hint(msg, {
				type : 'warning'
			});
		},
		error : function(msg) {
			Myjustep.Util.hint(msg, {
				type : 'danger'
			});
		},
		confirmMsg : function(msg, onOk, onCancel, type,className,rowId) {
			var options = {
				text: msg, type: 'confirm:'+type, onOk:onOk || null, onCancel: onCancel || null, className:className, rowId:rowId	
			}
			Myjustep.Util.hint(options);
		},
		exception: function(result) {
			if (result.__statusCode == 'S') return;	// 成功返回
			
			var errorMsg = 'An error happened, please contact admin!',
				msg;
			
			if (result.__statusCode == 'L') {
				Myjustep.Util.hint('token失效，请重新登录', {
					'type' : 'error',
					'delay': 0
				});
			} else if(result.__statusCode == 'E') {	 
				try {
					msg = JSON.parse(result.__errorMessage) || {};
					if (msg.errorCode == 'CMU-101') {	// 显示后台例外异常信息
						Myjustep.Util.hint({
							type: 'error',
							text: 'errorCode: '+ msg.errorCode,
							info: msg.errorMsg,
							delay: 0							
						});
					} else {	// 根据errorCode获取对应语言信息
						errorMsg = messagehelper.get(msg.errorCode) || msg.errorMsg || errorMsg;
						Myjustep.Util.hint({
							type: 'error',
							text: errorMsg, 
							delay: 0
						});
					}
				} catch (e) {
					errorMsg = result.__errorMessage || errorMsg;
					Myjustep.Util.hint({
						type: 'error',
						text: errorMsg, 
						delay: 0
					});
				}				
			} else {
				Myjustep.Util.hint({
					type: 'error',
					text: errorMsg, 
					delay: 0
				});
			}				
		},
		showmodal:function(msgContent,msgType,disappearFlag,info){
			if(msgType=='Succeed'){
				Myjustep.Util.hint(msgContent, {
					type : 'success',
					delay:disappearFlag,
					info:info
				});
			}else if(msgType=='Remind'){
				Myjustep.Util.hint(msgContent, {
					type : 'info',
					delay:disappearFlag,
					info:info
				});
			}else if(msgType=='Warning'){
				Myjustep.Util.hint(msgContent, {
					type : 'warning',
					delay:disappearFlag,
					info:info
				});
			}else if(msgType=='Error'){
				Myjustep.Util.hint(msgContent, {
					type : 'error',
					delay:disappearFlag,
					info:info
				});
			}
		},
		showMask : function() {
			var me = this;
			var el = $("#overlay-loading");
			var height = $(window).height() + $(window).scrollTop();
			var width = $(window).width() + $(window).scrollLeft();
			
			if (el.length > 0) {
				el.css({'width':width+'px', height:height+'px', lineHeight:height+'px'}).show();
				return;
			}			
			
			// messagehelper.get('msgDial.loading')
			var html = '<div id="overlay-loading" style="overflow:hidden;background:#000;filter:alpha(opacity=50);opacity: 0.5;position:absolute;top:0px;left:0px;z-index:10000;text-align:center;line-height:'+height+'px;height:'+height+'px;width:'+width+'px">'
				+ '<img src="'+ loadingImg +'" /></div>';
			$(html).appendTo('body')
				.find('img')
				.click(function(){
					me.hideMask();
				});
//			$("#overlay").height(document.body.scrollHeight);
//			$("#overlay").width(document.body.scrollWidth);
			// fadeTo第一个参数为速度，第二个为透明度
			el.fadeTo(200, 0.5);
			// 解决窗口缩小时放大后不全屏遮罩的问题
			// 简单来说，就是窗口重置的问题
			$(window).resize(function() {				
				var h = $(window).height() + $(window).scrollTop();
				var w = $(window).width() + $(window).scrollLeft();
				$("#overlay-loading").css({'width':w+'px', height:h+'px', lineHeight:h+'px'})
			});
		},
		hideMask : function() {
			var el = $(document.querySelectorAll("#overlay-loading"));
			el.fadeOut(200);
//			el.remove();
		}
	};
});