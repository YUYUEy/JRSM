define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var global = require("$UI/portal/base/global");
	var messagehelper = require("./message");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var me;
	var pageConfigData = null;
	var sceneId = null;
	var params;
	var initPage = function() {
		sceneId = params.scene;
		var configDialog = '<div xid="div2" id="indiDialog" style="width:100px;height:50px;position:absolute;display:none">'
				+ '<div style="width:100px;border:1px solid gray;background-color:white;"> ' + '<label xid="label5" style="display:block;text-align:center">' + messagehelper.get('individual.set')
				+ '</label> ' + '<input type="checkbox" id="hide">' + messagehelper.get('individual.hide') + '</input>  ' + '<input type="checkbox" id="readonly">'
				+ messagehelper.get('individual.read') + '</input></div>' + '<div style="width:100px;margin-top:-3px;">\\/</div></div>';

		params.pagepanel.append(configDialog);
		// params.saveBtn.on("click", saveClick);

		for (var i = 0; i < params.element1List.length; i++) {
			params.model.getElementByXid(params.element1List[i]).onclick = configClick;
			// 初始化控件背景色
			var configItem = getConfig(params.element1List[i], 1, '');
			if (configItem) {
				if (configItem.ishide == 1) {
					params.model.getElementByXid(params.element1List[i]).style.backgroundColor = "blue";
				} else if (configItem.isreadonly == 1) {
					params.model.getElementByXid(params.element1List[i]).style.backgroundColor = "gray";
				}
			}
		}

		for (var i = 0; i < params.element2List.length; i++) {
			var gridComp = me.comp(params.element2List[i]);
			var gridID = me.getIDByXID(params.element2List[i]);
			var columnStr = me.comp(gridComp.data).getColumnIDs();
			var columns = columnStr.split(',');
			for (var j = 0; j < columns.length; j++) {
				var headerTh = document.getElementById(gridID + "_" + columns[j]);
				if (headerTh) {
					// 初始化Header背景色，
					// 设置th背景色被遮挡，需要设置最后一个子元素div，子元素为dom对象需要转jquery对象才可以使用css方法
					var configItem = getConfig(columns[j], 2, params.element2List[i]);
					if (configItem) {
						if (configItem.ishide == 1) {
							$(headerTh.lastChild).css("background-color", "blue");
						} else if (configItem.isreadonly == 1) {
							$(headerTh.lastChild).css("background-color", "gray");
						}
					}
					// 冻结列设置隐藏需要使用内部div来触发设置，而且此方案会出现grid样式问题
					$(headerTh.lastChild).click(columnHeaderDivClick);
					// headerTh.onclick = columnHeaderClick;
				}

			}
		}

		if (params.element1List.length > 0 || params.element2List.length > 0) {
			// 隐藏设置
			$("#hide").click(function(event) {
				if (currElement) {
					// 元素类型1
					var xidStr = currElement.attr("xid");
					var checked = $(this).is(':checked');
					if (checked) {
						currElement.css("background-color", "blue");
					} else {
						var configItem = getConfig(xidStr, 1, '');
						if (configItem && configItem.isreadonly == 1) {
							currElement.css("background-color", "gray");
						} else {
							currElement.css("background-color", "yellow");
						}
					}
					setHideConfig(xidStr, checked, 1, "");
				} else if (currColumn) {
					// 元素类型2
					var id = currColumn.attr("id");
					var xidList = id.split('_');
					var checked = $(this).is(':checked');
					if (checked) {
						// currColumn.css("background-color", "blue");
						// 设置th背景色被遮挡，需要设置最后一个子元素div，子元素为dom对象需要转jquery对象才可以使用css方法
						$(currColumn[0].lastChild).css("background-color", "blue");
					} else {
						var configItem = getConfig(xidList[2], 2, xidList[1]);
						if (configItem && configItem.isreadonly == 1) {
							$(currColumn[0].lastChild).css("background-color", "gray");
							// currColumn.css("background-color", "gray");
						} else {
							$(currColumn[0].lastChild).css("background-color", "yellow");
							// currColumn.css("background-color", "yellow");
						}
					}
					setHideConfig(xidList[2], checked, 2, xidList[1]);
				}
				event.stopPropagation();
			});

			// 只读设置，隐藏优先于只读
			$("#readonly").click(function(event) {
				if (currElement) {
					// 元素类型1
					var xidStr = currElement.attr("xid");
					var configItem = getConfig(xidStr, 1, '');
					if (configItem) {
						if (configItem.ishide == 1)
							return false;
					}
					var checked = $(this).is(':checked');
					if (checked) {
						currElement.css("background-color", "gray");
					} else {
						currElement.css("background-color", "yellow");
					}
					setReadConfig(xidStr, checked, 1, "");
				} else if (currColumn) {
					// 元素类型2
					var id = currColumn.attr("id");
					var xidList = id.split('_');
					var configItem = getConfig(xidList[2], 2, xidList[1]);
					if (configItem) {
						if (configItem.ishide == 1)
							return false;
					}
					var checked = $(this).is(':checked');
					if (checked) {
						// 设置th背景色被遮挡，需要设置最后一个子元素div，子元素为dom对象需要转jquery对象才可以使用css方法
						$(currColumn[0].lastChild).css("background-color", "gray");
					} else {
						$(currColumn[0].lastChild).css("background-color", "yellow");
					}
					setReadConfig(xidList[2], checked, 2, xidList[1]);
				}
				event.stopPropagation();
			});
		}
	};

	var currElement; // jquery对象
	var configClick = function(event) {
		if (currElement) {
			currElement.removeClass("selectEelement");
		}
		$(this).addClass("selectEelement");
		currElement = $(this);
		if (currColumn) {
			removeDomClass(currColumn[0], "selectEelement");
			currColumn = null;
		}

		showSet($(this));
		// 阻止事件冒泡
		// event.preventDefault();
		event.stopPropagation();
		// return false;
	};

	var currColumn; // dom对象
	var columnHeaderClick = function(event) {
		if (currColumn) {
			removeDomClass(currColumn[0], "selectEelement");
			// currColumn.css('border', 'none');
		}
		addDomClass($(this)[0], "selectEelement");
		currColumn = $(this);
		if (currElement) {
			currElement.removeClass("selectEelement");
			currElement = null;
		}
		columnHeadershowSet($(this));
		// 阻止事件冒泡
		// event.preventDefault();
		event.stopPropagation();
		// return false;
	};

	var columnHeaderDivClick = function(event) {
		if (currColumn) {
			removeDomClass(currColumn[0], "selectEelement");
			// currColumn.css('border', 'none');
		}
		addDomClass($(this).parent()[0], "selectEelement");
		currColumn = $(this).parent();
		if (currElement) {
			currElement.removeClass("selectEelement");
			currElement = null;
		}
		columnHeadershowSet($(this).parent());
		// 阻止事件冒泡
		// event.preventDefault();
		event.stopPropagation();
		// return false;
	};

	var showSet = function(event) {
		var xidStr = event.attr("xid");
		var configItem = getConfig(xidStr, 1, '');
		if (configItem) {
			$("#hide").prop("checked", configItem.ishide == 1 ? true : false);
			$("#readonly").prop("checked", configItem.isreadonly == 1 ? true : false);
		} else {
			$("#hide").prop("checked", false);
			$("#readonly").prop("checked", false);
		}
		$("#indiDialog").css({
			"top" : (event.position().top - 50) + "px",
			"left" : event.position().left + "px"
		}).show();
	};

	var columnHeadershowSet = function(event) {
		var id = event.attr("id");
		var xidList = id.split('_');
		var configItem = getConfig(xidList[2], 2, xidList[1]);
		if (configItem) {
			$("#hide").prop("checked", configItem.ishide == 1 ? true : false);
			$("#readonly").prop("checked", configItem.isreadonly == 1 ? true : false);
		} else {
			$("#hide").prop("checked", false);
			$("#readonly").prop("checked", false);
		}
		// 获取父容器的高度位置
		var gridDom = document.getElementById('gbox_' + xidList[0] + '_' + xidList[1]);
		var topPX = 80;
		if (gridDom && gridDom.parentNode) {
			topPX = $(gridDom.parentNode).position().top - 50;
		}
		$("#indiDialog").css({
			"top" : topPX + "px",
			"left" : $(event[0]).position().left + "px"
		}).show();
	};

	var hideSet = function() {
		$("#indiDialog").hide();
	};

	var setHideConfig = function(xid, ishide, elementtype, elementxid) {
		var isexisted = false;
		for (var i = 0; i < pageConfigData.length; i++) {
			if (pageConfigData[i].xid == xid) {
				pageConfigData[i].ishide = ishide ? 1 : 0;
				isexisted = true;
			}
		}
		if (!isexisted) {
			var pageConfig = {};
			pageConfig.sceneId = params.scene;
			pageConfig.xid = xid;
			pageConfig.elementtype = elementtype;
			pageConfig.elementxid = elementxid;
			pageConfig.ishide = ishide ? 1 : 0;
			pageConfig.isreadonly = 0;
			pageConfigData.push(pageConfig);
		}
	};

	var setReadConfig = function(xid, isread, elementtype, elementxid) {
		var isexisted = false;
		for (var i = 0; i < pageConfigData.length; i++) {
			if (pageConfigData[i].xid == xid) {
				pageConfigData[i].isreadonly = isread ? 1 : 0;
				isexisted = true;
			}
		}
		if (!isexisted) {
			var pageConfig = {};
			pageConfig.sceneId = params.scene;
			pageConfig.xid = xid;
			pageConfig.elementtype = elementtype;
			pageConfig.elementxid = elementxid;
			pageConfig.ishide = 0;
			pageConfig.isreadonly = isread ? 1 : 0;
			pageConfigData.push(pageConfig);
		}
	};

	var getConfig = function(xid, type, gridxid) {
		var result = null;
		if (pageConfigData) {
			for (var i = 0; i < pageConfigData.length; i++) {
				if (pageConfigData[i].xid == xid && pageConfigData[i].elementtype == type) {
					if (type == 1) {
						result = pageConfigData[i];
						break;
					} else if (type == 2 && pageConfigData[i].elementxid == gridxid) {
						result = pageConfigData[i];
						break;
					}
				}
			}
		}
		return result;
	};

	/**
	 * 保存按钮点击操作
	 */
	var saveClick = function() {
		if (pageConfigData && pageConfigData.length > 0) {
			var saveData = {};
			saveData.sceneId = params.scene;
			saveData.configList = pageConfigData;
			if (params.model.showMask) {
				params.model.showMask();
			}

			global.ajax({
				url : '/mdm/sysSceneconfig/saveConfig',
				async : true,
				data : saveData,
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						dialoghelper.success(messagehelper.get('individual.savesuccess'));
					} else if (resultData) {
						dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
					} else {
						dialoghelper.error(messagehelper.get('service.wrongdata'));
					}
				},
				complete : function() {
					if (params.model.hideMask) {
						params.model.hideMask();
					}

				}
			});
		}
	};

	// dom对象class操作
	var hasDomClass = function(obj, cls) {
		if (obj && obj.className) {
			return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		} else {
			return false;
		}
	};

	var addDomClass = function(obj, cls) {
		if (!hasDomClass(obj, cls))
			obj.className += " " + cls;
	};

	var removeDomClass = function(obj, cls) {
		if (hasDomClass(obj, cls)) {
			var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			obj.className = obj.className.replace(reg, ' ');
		}
	};

	var toggleDomClass = function(obj, cls) {
		if (hasDomClass(obj, cls)) {
			removeDomClass(obj, cls);
		} else {
			addDomClass(obj, cls);
		}
	};

	return {
		applyConfig : function(pageName, model) {
			me = model;
			var param = {};
			param.ispage = 1;
			param.name = pageName;
			if (model.showMask) {
				model.showMask();
			}

			global.ajax({
				url : '/mdm/sysSceneconfig/getPageDefaultConfig',
				async : true,
				data : param,
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						if (resultData.data) {
							var pageConfig = resultData.data;
							for (var i = 0; i < pageConfig.length; i++) {
								// 隐藏控件方式
								if (pageConfig[i].ishide == 1) {
									if (pageConfig[i].elementtype == 1) {
										me.getElementByXid(pageConfig[i].xid).style.display = 'none';
									} else if (pageConfig[i].elementtype == 2) {
										me.comp(pageConfig[i].elementxid).hideCol(pageConfig[i].xid);
									}
								} else if (pageConfig[i].isreadonly == 1 && pageConfig[i].elementtype == 1) {
									// 只读控件方式
									var element = me.getElementByXid(pageConfig[i].xid);
									if (element.tagName == "SELECT") {
										// 下拉框没有readonly属性
										// 此种方法在form提交时，disabled的控件是不提交值的
										element.disabled = true;
									} else {
										element.readOnly = true;
									}
								}
							}
						}
					} else if (resultData) {
						dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
					} else {
						dialoghelper.error(messagehelper.get('service.wrongdata'));
					}
				},
				complete : function() {
					if (model.hideMask) {
						model.hideMask();
					}

				}
			});
		},

		initConfig : function(options) {
			var defaults = {
				// 各种属性、参数
				scene : '', // 必须--页面场景
				model : {}, // 必须 -- 数据模型
				pagepanel : {}, // 必须-- Window的jquery对象
				saveBtn : {}, // 必须 -- 保存按钮的jquery对象
				element1List : [], // 元素类型为：div/row/col/label/input/button等等的xid集合
				element2List : [], // 元素类型为：grid的xid集合,用于控制列的显示而不是grid本身，grid请控制外围容器
			};
			params = $.extend(defaults, options);
			me = params.model;

			var param = {};
			param.sceneId = params.scene;
			if (params.model.showMask) {
				params.model.showMask();
			}
			global.ajax({
				url : '/mdm/sysSceneconfig/query',
				async : true,
				data : param,
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						pageConfigData = resultData.data;
						initPage();
					} else if (resultData) {
						dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
					} else {
						dialoghelper.error(messagehelper.get('service.wrongdata'));
					}
				},
				complete : function() {
					if (params.model.hideMask) {
						params.model.hideMask();
					}
				}
			});
		},

		saveConfig : saveClick,
		// 获取页面当前状态,返回true表示个性化配置，供内部调用
		isIndividual : function(windowId) {
			var result = ($("#" + windowId + "individualtag").val() === 'true');
			return result;
		}
	};
});