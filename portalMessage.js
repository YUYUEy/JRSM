define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var Bind = justep.Bind;
	var Expr = justep.Express;
	var validate = require("$UI/jrsm/js/validate/validate");
	require("$UI/jrsm/js/tipInfo");

	var defualtParams = {
		languageCode : 'ENU'
	};

	var methods = {
		requestMessageByParams : function(params) {
			// $.extend(params, defualtParams);
//			var messagesData = null;
//			sendAjax.mdpAjax({
//				url : "/portal/findErrorMsgByParams.ac",
//				data : {
//					jsonData : JSON.stringify(params)
//				},
//				async : false,
//				success : function(data) {
//					messagesData = data;
//				}
//			});
//			return messagesData;
		},
		// matchParams : function(str) {
		// Exp: $[QUOTE_001]{'【Customer Model】','【Requested Qty】'}
		// return str.match(/\$\[\w+\](\{[\w\【\】\[\]\"\'\,]*\})*/g);
		// },
		matchCode : function(str) {
			// Exp: {1}
			return str.match(/\{[\w]+\}/g);
		},
		format : function(msg, args) {
			var result = msg;
			if (arguments.length == 2) {
				if (typeof (args) == "object") {
					if ($.isArray(args)) {
						for (var i = 0; i < args.length; i++) {
							if (args[i] !== undefined && args[i] !== null) {
								result = result.replace('{' + i + '}', args[i]);
							}
						}
					} else {
						for ( var key in args) {
							if (args[key] !== undefined) {
								var reg = new RegExp("({" + key + "})", "g");
								result = result.replace(reg, args[key]);
							}
						}
					}
				}
			}
			return result;
		}
	};
	$.extend({
		/**
		 * ajax请求获取所有报错信息
		 * 
		 * @param pageModel
		 * @return Arrary
		 */
		requestAllMessage : function(pageModel) {
			pageModel.PORTAL_ERROR_MESSAGE_DATA = methods.requestMessageByParams(null);
			return pageModel.PORTAL_ERROR_MESSAGE_DATA;
		},
		/**
		 * ajax请求获取指定模块报错信息
		 * 
		 * @param type
		 *            模块类型
		 * @param language
		 *            语言（默认ENU）
		 * @return Arrary
		 */
		requestMessageByType : function(pageModel, type, language) {
			var params = {
				businessType : type,
				languageCode : language
			};
			pageModel.PORTAL_ERROR_MESSAGE_DATA = methods.requestMessageByParams(params);
			return pageModel.PORTAL_ERROR_MESSAGE_DATA;
		},
		/**
		 * ajax请求获取编码对应报错信息
		 * 
		 * @param pageModel
		 * @param code
		 *            编码
		 * @param language
		 *            语言（默认ENU）
		 * @return string
		 */
		requestMessageByCode : function(pageModel, code, language) {
			var params = {
				businessCode : code,
				languageCode : language
			};
			var result = methods.requestMessageByParams(params);
			var returnMsg = '';
			if (!validate.isNull(result)) {
				$.each(result, function(i, obj) {
					returnMsg += obj.message;
				});
			}
			return returnMsg;
		},
		/**
		 * 通过编码获取报错信息方法
		 * 
		 * @param pageModel
		 * @param code
		 *            编码
		 * @param language
		 *            语言（默认ENU）
		 * @param paramObj
		 *            额外常量
		 * @return string
		 */
		getMessageByCode : function(pageModel, code, language, paramObj) {
			var messageData = pageModel.PORTAL_ERROR_MESSAGE_DATA;
			var returnMsg = '';
			if (messageData === undefined) {
				returnMsg = $.requestMessageByCode(pageModel, code, language);
			} else {
				if (validate.isNull(language)) {
					language = defualtParams.languageCode;
				}
				$.each(messageData, function(i, obj) {
					if (obj.businessCode == code && obj.languageCode == language) {
						returnMsg += obj.message;
					}
				});
			}
			if (typeof (paramObj) == "object") {
				returnMsg = methods.format(returnMsg, paramObj);
			}
			return returnMsg;
		},
		/**
		 * 把字符串中的{编码}批量替换成对应的报错信息
		 * 
		 * @param pageModel
		 * @param msgCode
		 *            {编码}
		 * @param language
		 *            语言（默认ENU）
		 * @return
		 */
		replaceCodeByMessage : function(pageModel, msgCode, language) {
			var _msg = '';
			if (validate.isNull(msgCode)) {
				return _msg;
			} else {
				var codeArray = methods.matchCode(msgCode);
				if (codeArray === null) {
					return msgCode;
				} else {
					_msg = msgCode;
				}
				if ($.isArray(codeArray) && codeArray.length > 0) {
					$.each(codeArray, function(i, code) {
						// 处理Code
						var _code = code.substring(code.indexOf('{') + 1, code.indexOf('}'));
						var msg = $.getMessageByCode(pageModel, _code, language);
						_msg = _msg.replace(code, msg);
					});
				}
				return _msg;
			}
		},
		/**
		 * 把Data中的{编码}替换成报错信息
		 * 
		 * @param pageModel
		 * @param language
		 *            语言（默认ENU）
		 * @param isDialog
		 *            是否Dialog弹出框
		 */
		replaceDataMessage : function(pageModel, language, isDialog) {
			$.each(pageModel, function(i, n) {
				if (n != null && typeof (n) == "object" && n.idColumn != null && n.defCols != null) {
					$.each(n.defCols, function(j, col) {
						if (col.rules && col.rules.latestValue) {
							$.each(col.rules.latestValue, function(m, val) {
								if (val.message) {
									var _pageModel = pageModel;
									if (isDialog === true) {
										_pageModel = pageModel.getParent();
									}
									val.message = $.replaceCodeByMessage(_pageModel, val.message, language);
								}
							});
						}
					});
				}
			});
		},
		/**
		 * 初始化对应模块中Data的报错信息
		 * 
		 * @param pageModel
		 * @param type
		 *            模块类型
		 * @param language
		 *            语言（默认ENU）
		 */
		initPoratlMessage : function(pageModel, type, language) {
			$.requestMessageByType(pageModel, type, language);
			$.replaceDataMessage(pageModel, language, false);
		},
		/**
		 * 获取Data的约束信息（客制化）
		 * 
		 * @param data
		 *            data对象（this.comp("lineItemData")）
		 * @param force
		 *            强制判断约束，忽略数据修改状态
		 */
		getDataInvalidInfo : function(options) {
			var opt = $.extend({
				data : null,
				force : false
			}, options);
			if (opt.data == null) {
				return null;
			}
			var t = [];
			return opt.data.eachAllByPeek(function(n) {
				var r = n.row, i = r.row.userdata.recordState;
				opt.force && r.row.userdata.isModified.set(!0);
				if (opt.force || 'new' == i || 'edit' == i)
					for ( var s in n.data.defCols) {
						var o = r.ref(s);
						if (o && Bind.isObservable(o.error)) {
							var u = o.error.get();
							if (u) {
								// 如果rules里存在required校验，先报required的错
								if (o.rules.latestValue.length > 1) {
									var rulesArray = o.rules.latestValue;
									for (var int = 0; int < rulesArray.length; int++) {
										var ruleElement = rulesArray[int];
										if (ruleElement.rule === "required") {
											var exprParams = Bind.validation.utils.isEmptyVal(ruleElement.params) ? true : ruleElement.params;
											var exprResult = Bind.validation.rules["required"].validator(o.ctx.$val, exprParams, o.ctx);
											if (!exprResult && ruleElement.hasOwnProperty("message") && !Bind.validation.utils.isEmptyVal(ruleElement.message)) {
												u = ruleElement.message;
											}
										}
									}
								}
								t.push(u);
							}
						}
					}
			}, this), t.join("\n");
		},
		/**
		 * 获取Grid里Data的约束信息并对错误单元格进行颜色渲染（客制化）
		 * 
		 * @param grid
		 *            grid对象（this.comp("lineItemGrid")）
		 * @param force
		 *            强制判断约束，忽略数据修改状态
		 * @param formatMsg
		 *            根据需求格式化报错信息
		 */
		getGridInvalidInfo : function(options) {
			var opt = $.extend({
				grid : null,
				force : false,
				formatMsg : function(msg, row, isFirst) {
					return msg;
				}
			}, options);
			if (opt.grid == null) {
				return null;
			}
			var data = opt.grid.getData();
			var result = new Map();

			// opt.grid.refresh();
			data.eachAllByPeek(function(n) {
				var r = n.row, i = r.row.userdata.recordState;
				opt.force && r.row.userdata.isModified.set(!0);
				if (opt.force || 'new' == i || 'edit' == i) {
					for ( var s in n.data.defCols) {
						var o = r.ref(s);
						if (o && Bind.isObservable(o.error)) {
							// 获取报错信息
							var u = o.error.get();
							if (u) {
								// 如果rules里存在required校验，先报required的错
								if (o.rules.latestValue.length > 1) {
									var rulesArray = o.rules.latestValue;
									for (var int = 0; int < rulesArray.length; int++) {
										var ruleElement = rulesArray[int];
										if (ruleElement.rule === "required") {
											var exprParams = Bind.validation.utils.isEmptyVal(ruleElement.params) ? true : ruleElement.params;
											var exprResult = Bind.validation.rules["required"].validator(o.ctx.$val, exprParams, o.ctx);
											if (!exprResult && ruleElement.hasOwnProperty("message") && !Bind.validation.utils.isEmptyVal(ruleElement.message)) {
												u = ruleElement.message;
											}
										}
									}
								}
								var msg = u;// 记录报错信息
								$.gridCellErrorStyleRender(opt.grid, r.getID(), s); // 渲染错误的单元格

								if (result.has(u)) {
									if ($.isFunction(opt.formatMsg)) {
										msg = opt.formatMsg.call(this, result.get(u), r, false);
									}
									result.put(u, msg);
								} else {
									if ($.isFunction(opt.formatMsg)) {
										msg = opt.formatMsg.call(this, u, r, true);
									}
									result.put(u, msg);
								}
							} else {
								$.gridCleanCellRender(opt.grid, r.getID(), s); // 清除单元格样式
							}
						}
					}
				}
			}, this);
			if ($.isFunction(options.formatMsg)) {
				result.each(function(key, val) {
					result.put(key, val + '.');
				});
			}
			return result.dataToArray().join('\n');
		}
	});
});