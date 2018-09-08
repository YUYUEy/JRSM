define(function(require) {
	var global = require("$UI/portal/base/global");
	var config = require("$UI/portal/base/config");
	/**
	 * 使用说明
	 * 1、在需要控制权限的按钮上添加属性“iapps-btn”（固定，不能修改），
	 * 值为后端配置的resourceCode;
	 * 例：<button xid="test" iapps-btn="Button1"/>
	 * 
	 * 2、在页面load的调用$.getResources(menuCode);
	 * menuCode为后端配置的页面的code，对应common_operation.code
	 * 例：Model.prototype.modelLoad = function(event) {
	 *		$.resources("四半期");
	 * 	}
	 * 
	 * 3、参数menuCode为非必要，如果有值，但查询对应页面的按钮；
	 * 如果为NULL，则查询项目所有按钮；可根据项目需求自定。
	 * 例：登录的时候查询项目的有按钮、缓存，页面调用$.setResourcesRole(resourceData),
	 * 这里的resourceData可以从缓存的所有按钮中取对应页面数据即可。
	 * 
	 */
	(function($) {
		//入口
		$.resources = function(menuCode) {
			var resourceData = $.getResources(menuCode);//取值
			if(resourceData){
				$.setResourcesRole(resourceData);//授权
			}
		};
		
		//获取页面所有资源方法
		$.getResources = function(menuCode) {
			debugger;
			var resourceData;
			if(!menuCode){
				menuCode = null;
			}
			var url = "/common/menu/resourcelist.ajax";
			var param = {
				application:config.application,//工程名称 例：JRSM
				code:menuCode//菜单页面CODE,对应common_operation.code值
			};
			global.ajax({
				url:url,
				data:param,
				async:false,
				success: function(data){
					resourceData = data.data;
				},
				errorEx : function(XMLHttpRequest, textStatus, errorThrown) {
					throw justep.Error.create("Processing error, error code：" + XMLHttpRequest.readyState+" - "+textStatus);
				}
			});
			return resourceData;
		};

		//设置页面资源权限
		$.setResourcesRole = function(resourceData) {
			$("[iapps-btn]").each(function(){
				var thisObj = $(this);
				var resourCode = thisObj.attr("iapps-btn");
				for(var i=0;i<resourceData.length;i++){
					var theResourceCode = resourceData[i].resourceCode;
					var theDisplay = resourceData[i].displayed;
					var theDisable = resourceData[i].disabled;
					var theGrantFlag = resourceData[i].grantFlag;
					if(theResourceCode == resourCode){
						debugger
						if(theDisplay == "Y"&&theGrantFlag == "Y"){//无权限的隐藏，有权限的显示
							thisObj.css("display","block");
						}else{
							thisObj.css("display","none");
						}
						if(theDisable == "Y" || theGrantFlag == "N"){
							thisObj.attr("disabled","true");
						}
					}
				}
			});
		};

	})(jQuery);

})
