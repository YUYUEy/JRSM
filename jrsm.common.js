/**
 * @author xiaosheng1@midea.com.cn
 * @version 1.00.00
 */
define(function(require) {
	require("css!$UI/jrsm/css/mdm.listedit.less").load();
	require("$UI/jrsm/module/lib/utils");
	require("$UI/jrsm/js/page");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var dataHelper = require("$UI/jrsm/js/datahelper");	
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/jrsm/js/teninedialog");
	var JrsmCommon = function JrsmCommon(wex5) {
		this.weX5 = wex5;
		this.initFunc();
		this.initLayout();
		this.dataHelper=dataHelper;
		this.dialoghelper=dialoghelper;
		this.messagehelper=messagehelper;
	};
	
	JrsmCommon.prototype.initFunc=function()
	{
	}
	
	JrsmCommon.prototype.initLayout=function()
	{
		if ($('div').hasClass('jrsm-tab-window')) {
			var h = $(window).height();
			$(".jrsm-tab-window").css('height', h - 105);
		}
		
		if ($('div').hasClass('jrsm-tab-window')) {
			$('.x-contents ').css({
				"overflow" : "hidden"
			});
			$.setNiceScrollByObj($('.jrsm-tab-window'));
			$.setNiceScrollByObj($('.x-grid-bdiv'));
			$(".x-grid-bdiv").on("scroll", function(event) {
				$.resizeScrollByObj($('.jrsm-tab-window'));
				$.resizeScrollByObj($('.x-grid-bdiv'));
			})
		}
		
		
		if ($('div').hasClass('jrsm-tab-window')) {
			$.resizeScrollByObj($('.jrsm-tab-window'))
			$.resizeScrollByObj($('.x-grid-bdiv'))
			$(".x-grid-bdiv").on("scroll", function(event) {
				$.resizeScrollByObj($('.jrsm-tab-window'))
				$.resizeScrollByObj($('.x-grid-bdiv'))
			})
		}
	}
	
	return JrsmCommon;
});