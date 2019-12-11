define(function(require) {

	var justep = require('$UI/system/lib/justep');
	var config = require("./config");
	var message = require("./message");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");	
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/jrsm/js/scrollSettings");
	
	var pageTimer = null;
	var pageTimerTimes = 20;
	var clock = function(cb) {		
	    if(document.getElementsByClassName('x-default-overlay-open').length > 0){	//未加载完  	
	        
	    	pageTimerTimes--;
	    	if (pageTimerTimes <= 0) {	    
	    		if (cb && typeof (cb) == 'function') {
	    			cb(); // 回调
	    		} 
	    		dialoghelper.hideMask();	// 隐藏加载层
		    	pageTimer = window.clearInterval(pageTimer);
		    	pageTimerTimes = 20;
	    	}
	    }else{ //加载完成
	    	if (cb && typeof (cb) == 'function') {
    			cb();	// 回调
    		}
	    	dialoghelper.hideMask();	// 隐藏加载层
	    	pageTimer = window.clearInterval(pageTimer);	        
	    }
	};
	
	var global = {
		config : config,
		message : message,
		currentLang : message.currentLang,
		toUrl : function(path) {
			return config.rootUrl + (path.indexOf('/') > -1 ? '' : '/') + path;
		},
		getToken : function() {
			// return localStorage.getItem(config.tokenName);
			return sessionStorage.getItem(config.tokenName);
		},
		setToken : function(token) {
			// localStorage.setItem(config.tokenName,token);
			sessionStorage.setItem(config.tokenName, token);
		},
		removeToken : function() {
			// localStorage.removeItem(config.tokenName);
			sessionStorage.removeItem(config.tokenName);
			sessionStorage.removeItem('mdm.profile');	
		},
		// 更新profile
		updateProfile: function(item) {
			var profile = sessionStorage.getItem('mdm.profile');
			
			profile = profile ? JSON.parse(profile):{};
			
			if (profile && Object.prototype.toString.call(item) == '[object Object]') {
				$.extend(profile, item);
				sessionStorage.setItem('mdm.profile', JSON.stringify(profile));
			}			
		}, 
		setProfile : function(profile) {
			sessionStorage.setItem('mdm.profile', JSON.stringify(profile));
			if (! profile.__orgId) {
				dialoghelper.error(messagehelper.get('base.bdUser.E0001'));
			}
			
			/*if (profile.__orgId) {	// 在UAT环境调用接口: /common/comm/updateProfile 更新语言时偶会出现 返回的__orgId值为null的情况，原因未明
				sessionStorage.setItem('mdm.profile', JSON.stringify(profile));
			} else {				
				global.removeToken();
				global.getProfile();
			}*/				
		},
		getProfile : function() {
//			debugger
			var profile = sessionStorage.getItem('mdm.profile');
			
			profile = profile ? JSON.parse(profile):{};
			
			if (! (profile && profile.__language) ) {		
				var lang = global.currentLang();
				var params = {
					__application: config.application,
					language: lang.split('_')[0]					
				}
				// 非单点登录
				if (! config.enableSSO) {
					if (localStorage.username && localStorage.password) {
						params.userCode = localStorage.username,	// 登录账号
						params.password = localStorage.password	// 密码
					} else {
						window.location.reload();	// ? 跳转到登录页面
					}					
				}					
				
				global.ajax({
					url: '/jrsm/bdUser/jsmatLogin',
					async : false,
					data : params,
					success : function(resultData) {
						profile = resultData.data;
						if (resultData.__statusCode == 'S') {
							if (profile && Object.prototype.toString.call(profile) == '[object Object]') {
								global.setToken(resultData.data.__token);
								global.setProfile(profile);	
							} else {
								dialoghelper.error('Error in set profile');
							}												
						} 
					}
				});
			}
			
			return profile;
		},
		// 直接获取某个session
		getProfileItem: function(name){	
			var profile = sessionStorage.getItem('mdm.profile');
			if (profile) {
				return JSON.parse(profile)[name];
			}
		},
		ajax : function(opt) {
			/*
			 * opt字段说明： url : 必须，相对路径（不需要包含应用根路径） async : 可选，true|false，默认true
			 * data : 可选，JSON beforeSend : 可选，function success ： 必须，function
			 */
			opt.data = opt.data || {};
			if (!config.enableSSO && global.getToken()) {
				opt.data.profile = {};
				opt.data.profile.__token = global.getToken();
				//opt.data.profile = JSON.parse(sessionStorage.getItem('mdm.profile'));
			}
			
			// 带上主体
			if (! opt.data.entityId && sessionStorage.getItem('mdm.profile')) {
				var profile = JSON.parse(sessionStorage.getItem('mdm.profile'));				
				profile && profile.__orgId && (opt.data.entityId = profile.__orgId);	// 主体
			}			
			
			$.ajax({
				url : global.toUrl(opt.url),
				async : opt.async === false ? false : true,
				type : 'POST',
				dataType : 'json',
				contentType : "application/json",
				data : JSON.stringify(opt.data),
				beforeSend : opt.beforeSend || function() {
					if (opt.showLoading === true) dialoghelper.showMask();
				},
				success : function(resultData) {					
					if (resultData.__statusCode === 'I' || resultData.__statusCode === 'L') {
						console.log('clear token[' + config.tokenName + '=' + global.getToken() + ']...');
//						global.removeToken();
						
						// 此处只删除 token 信息，不删除 profile 信息
						sessionStorage.removeItem(config.tokenName);	
						
						console.log('refresh window to force browser redirect to login interface.');
						var times = sessionStorage.getItem('retryTimes');
						if (times === undefined || times === null)
							times = 3;
						sessionStorage.setItem('retryTimes', --times);
						
//						if (times > 0)
//							location.reload();
						
						/**
						 * reload 条件: 具体判断值未清楚，times上面是 >0 ？
						 * @author tim
						 */
						if (times < 0) {
							sessionStorage.removeItem('retryTimes');
							location.reload();							
						}
					} else if(resultData.__statusCode == 'E') {	// 异常处理	
						// 独立异常处理
						if (opt.exception && typeof opt.exception == 'function') {
							opt.exception(resultData);
							return;
						}
						
						// 统一异常处理
						if (Object.prototype.toString.call(resultData.__errorMessage) == "[object String]") {
							dialoghelper.exception(resultData);
							return;
						}
						
						var msg = JSON.parse(resultData.__errorMessage) || {};
						
						if (  msg.errorCode == 'base.bdUser.E0001' ) {	// 单点登录异常
							global.ajax({
								url : '/common/comm/config',
								data : {},
								async : false,
								success : function(resultData) {									
									alert(messagehelper.get('base.bdUser.E0001'));
									if (resultData.ssoLogoutUrl) 
										window.location.href = resultData.ssoLogoutUrl;	// 单点登录退出链接地址						
								}
							});	
							return;
						} else {
							dialoghelper.exception(resultData);
						}
					} else {
						opt.success(resultData);										
					}						
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
//					console.log(XMLHttpRequest.status);
//					console.log(XMLHttpRequest.readyState);
//					console.log(errorThrown);
//					throw justep.Error.create('Call Restful[' + opt.url + '] failure!');
					dialoghelper.error('Call Restful[' + opt.url + '] failure!');
				},
				complete : opt.complete || function() {
					if (opt.showLoading === true) dialoghelper.hideMask();
				}
			});
		},
		/** 解析Wex5数据组件的行，调用示例：rowData(this.comp("xid").getFirstRow()) */
		rowData : function(row) {
			var data = {};
			$.each(row.row, function(name, value) {
				data[name] = row.val(name);
			});
			return data;
		},
		/** 解析Wex5数据组件的所有行,调用示例：allData(this.comp("xid")) */
		allData : function(data) {
			var rows = [];
			data.each(function(param) {
				var row = {};
				$.each(param.row.row, function(name, value) {
					row[name] = param.row.val(name);
				});
				rows.push(row);
			});
			return rows;
		},
		isEmpty : function(s) {
			return s === undefined || s === null || s === '';
		},
		hint : function(msgCode, option) {
			justep.Util.hint(message.get(msgCode), option || {});
		},
		info : function(msgCode) {
			justep.Util.hint(message.get(msgCode), {
				type : 'info'
			});
		},
		success : function(msgCode) {
			justep.Util.hint(message.get(msgCode), {
				type : 'success'
			});
		},
		warning : function(msgCode) {
			justep.Util.hint(message.get(msgCode), {
				type : 'warning'
			});
		},
		error : function(msgCode) {
			justep.Util.hint(message.get(msgCode), {
				type : 'danger'
			});
		},
		noDataFound : function() {
			justep.Util.hint(message.get('base.noDataFound'), {
				type : 'warning'
			});
		},
		saveSuccessfully : function() {
			justep.Util.hint(message.get('base.saveSuccessfully'), {
				type : 'success'
			});
		},
		saveFailure : function() {
			justep.Util.hint(message.get('base.saveFailure'), {
				type : 'danger'
			});
		},
		// 显示页面加载效果，并自动关闭
		pageLoadingClock: function() {
			dialoghelper.showMask();
			pageTimer = setInterval(clock, 500);			
		},
		// 根据加载进度条回调处理
		doClock: function(cb) {
			pageTimer = setInterval(function(){
				clock(cb);
			}, 500);			
		},
		/**
		 * 监听 data 数据变化，点击关闭页面时提示数据改变
		 * @param data 	要监听的数据 data
		 * @param model 页面的 Model 实例
		 * @param tabLevel 页面所在的页签深度,默认值为2,目前有 0（windowDialog）、1、2
		 */
		dataListener: function(data, model, tabLevel) {
			if (typeof data == "string") {
				data = data.split(',');
			}
			for(var i=0, len=data.length; i<len; i++) {
				model.comp(data[i]).on('onDataChange', function(event){		
//					debugger
					// 根据页面加载信息条判断页面是否已加载完成,页面加载完成后的数据改变才会触发
					if(document.getElementsByClassName('x-default-overlay-open').length == 0) {
						if (event.type != 'refresh' && event.type != 'new' && event.source.isChanged()) {
							var storeId, rootNode, curTab, listens = [];
														if (tabLevel === 0) {	// windowDialog
								rootNode = model.getRootNode();
								storeId = $(rootNode).attr('id');	// 页面标识
								
								// 弹层按钮绑定事件 
								$(rootNode).closest('.x-dialog').find('>.x-dialog-title>.close')
									.unbind('click')
									.bind('click', function(){
										global.winDialogClose(model, storeId);
									});
								
							} else {
								rootNode = tabLevel == 1 ? model.getRootNode():model.getParent().getRootNode();
								curTab = $("[xid='myTab'] > .nav-tabs > li.active", rootNode);
								
								// 页面标识
								if ( curTab.length > 0 ) {
									storeId = curTab.attr('id');	
								} else {
									storeId = window.location.hash;
								}
							}
							
							listens = sessionStorage.__listens ? JSON.parse(sessionStorage.__listens):[];
								
							if ( listens.indexOf(storeId) === -1 ) {
								listens.push(storeId);
							}						
							sessionStorage.__listens = JSON.stringify(listens);
						}	
					} 					
				});
			}	
		},
		
		/**
		 * 关闭windowDialog前的提示
		 * @param model 页面的 Model 实例
		 * @param storeId windowDialog 在页面上生成的id值
		 */
		winDialogClose: function(model, storeId) {
			var listens = sessionStorage.__listens ? JSON.parse(sessionStorage.__listens):[];
			var listensIndex = listens.indexOf(storeId);						
			
			if (listensIndex !== -1) {	// 关闭前提示
				dialoghelper.confirmMsg(global.message.get('base.closeTabTips'), function(){
					listens.splice(listensIndex, 1);									
					sessionStorage.__listens = JSON.stringify(listens);
					model.close();
				});
			} else { // 直接关闭					
				model.close();
			}	
		},
		
		/**
		 * 重置data的更新状态
		 * @param model 页面的 Model 实例
		 * @param tabLevel 页面所在的页签深度,默认值为2,目前有 0（windowDialog）、1、2
		 */
		resetDataListener: function(model, tabLevel){
			var rootNode,
				listens = sessionStorage.__listens ? JSON.parse(sessionStorage.__listens):[],				
				listensIndex = -1,
				subTab = $("[xid='myTab'] > .nav-tabs > li.active", $(".content-wrapper>section>.x-contents>.active"));			
			
			if (tabLevel === 0) {	// windowDialog
				rootNode = model.getRootNode();
				var wid = $(rootNode).attr('id');	// 页面标识
				listensIndex = listens.indexOf(wid);
			} else {
				if (subTab.length > 0) { // 二级 tab 	
					var tabId = subTab.attr('id');
					listensIndex = listens.indexOf(tabId);				
				} else { // 一级 tab 
					listensIndex = listens.indexOf(window.location.hash);
				}				
			}	
			
			// 从 sessionStorage 删除对应的状态数据
			if ( listensIndex !== -1 ) {
				listens.splice(listensIndex, 1);
				sessionStorage.__listens = JSON.stringify(listens);
			}
		},
		
		// 设置页面滚动窗口高度
		setNiceScroll: function() {
			var scrollHeight = $(window).height() - $('.main-header').height() - 10 - 10;	// 滚动容器高度=页面视窗高度-头部高度-paddingTop-滚动容器paddingBottom
			var scrollContainer = $(".window.nice-scroll").not(":hidden");	// 内容滚动容器
			
			if (scrollContainer.hasClass("tabs-page")) {	
				scrollHeight -= 36; 	// 二级标签页，减去页签的高度
			}
			
			scrollContainer.height(scrollHeight);	
			$.setNiceScrollByObj(scrollContainer);
			return scrollContainer;
		},
		
		// 设置页面inner滚动窗口高度
		setInnerNiceScroll: function() {
			var scrollContainer = $(".inner-scroll-wrap").not(":hidden");	// 内容滚动容器
			var otherHeight = scrollContainer.attr('other-height') || 0;
			
//			debugger
			// 滚动容器高度=页面视窗高度-头部高度-inner-search-wrap的调度-paddingTop- 其他	
			var scrollHeight = $(window).height() - $('.main-header').height() - $('.inner-search-wrap', scrollContainer.closest('.window')).height() - 10 - otherHeight;	 
			
			if (scrollContainer.hasClass("tabs-page")) {	
				scrollHeight -= 36; 	// 二级标签页，减去页签的高度
			}
			scrollContainer.height(scrollHeight);
			$.setNiceScrollByObj(scrollContainer);
			return scrollContainer;
		},		
		
		/*
		 * 获取数据库当前时间接口
		 * 返回：日期字符串（yyyy-MM-dd）
		 */
		getServiceTime: function() {
			var time;
			global.ajax({
				url : '/jrsm/bdParamList/getCurrentDate',
				async : false,
				data : {},
				success : function(resultData) {
					time = resultData.data;
				}
			});
			return time || '';
		},
		getDate: function() {
			var time;
			global.ajax({
				url : '/jrsm/bdParamList/getDate',
				async : false,
				data : {},
				success : function(resultData) {
					time = resultData.data;
				}
			});
			return time || '';
		},getLocalTime: function() {
			return justep.Date.toString(new Date(),'yyyyMMdd_hhmm');
		},
		// 设置window全局变量
		setWindowGlobal: function(key, value) {
			if (! window.__GLOBAL)	
				window.__GLOBAL = {};
			
			window.__GLOBAL[key] = value;
		},
		// 获取window全局变量
		getWindowGlobal: function(key) {
			if (! window.__GLOBAL)	
				window.__GLOBAL = {};
			return window.__GLOBAL[key];
		},
		// 判断当前url地址是否带有语言
		isLanguageByUrl: function() {
			return (/language=(zh_CN|en_US|ja_JP)/).test(window.location.search);
		}
	};	
	
	return global;
});