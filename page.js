define(function(require) {
	var remote = require("$UI/portal/base/global");
	var messagehelper = require("./message");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	require("$UI/jrsm/js/scrollSettings");
	/**
	 * 描述：分页控制 案例： //分页传参 var options = { model : this, gridXid :
	 * 'quoteListGrid', queryData : this.comp("queryData"), gridData :
	 * this.comp("quoteData"), queryBtn : this.comp("query").$domNode,
	 * pageHtmlContainer : $('#'+this.getIDByXID('div2'))， url :
	 * '/qtList/query.ac' };
	 * 
	 * //分页处理 $.pageFuck(options);
	 * 
	 * 
	 */
	(function($) {
		$.genPageBar = function(options) {

			var defaults = {
				// 各种属性、参数
				model : {},// 必须 -- 数据模型
				gridXid : '',// 必须 -- grid控件的Xid
				queryData : {},// 必须 -- 查询条件绑定的 data控件的wex5对象
				gridData : {},// 必须 -- grid件绑定的 data控件的wex5对象
				queryBtn : {},// 必须 -- 查询按钮的jquery对象
				pageHtmlContainer : {},// 必须 -- 分页工具栏div的jquery对象
				url : '',// 必须 -- 后端请求的路径
				data : {},// 自定义数据
				remote : remote,
				pageSizeId : '',
				pageInfoId : '',
				pageNextPrev : '',
				language : 'CN',
				pageInfo : {
					pageSize : 10,
					pageNo : 1,
					isFirst : true,
					isLast : false
				},
				autoQuery : true, // 是否自动查询
				staticShow : false, // 静态展示，用于去除服务端请求，只保留界面效果供个性化
				validate : function(e) { // 查询条件必填校验方法
					return true;
				},
				afterQueryFn : function() {
					console.log("no aferQueryFn");
				},
				afterQueryFnParams : []
			};
			var options = $.extend(defaults, options);

			var init = function() {
				options.pageSizeId = options.model.getIDByXID(options.gridXid + 'PageSize');
				options.pageInfoId = options.model.getIDByXID(options.gridXid + 'PageInfo');
				options.pageNextPrev = options.model.getIDByXID(options.gridXid + 'NextPrev');
				options.pageCountId = options.model.getIDByXID(options.gridXid + 'pageCount');
			};

			/**
			 * 添加分页工具栏事件
			 */
			var doPage = function() {
				// 获取分页大小
				$("#" + options.pageSizeId + " ul:first").on("click", setPageSize);

				// 获取总记录数
				$("#" + options.pageInfoId + " a:first").on("click", getTotalRecord);

				// 上一页，下一页
				$("#" + options.pageNextPrev + " a").on("click", page);

				// 查询按钮
				if (!options.staticShow) {
					options.queryBtn.on("click", queryClick);
					if(options.refreshBtn)//强制刷新按钮
						options.refreshBtn.$domNode.on("click", continueQuery);
				}
			};
			/**
			 * 插入分页工具栏html信息
			 * <a href="javascript:void(0)" >？</a> 
			 */
			var generateHtml = function() {
				var pageHtml = '<div style="height:30px;line-height:30px" class="row"> ' + ' <div class="col col-xs-3 "> ' + ' <span>' + messagehelper.get('page.show') + '</span>  '
						+ ' <div class="dropup" style="background:#ffffff;display:inline-block;"' + '  id="' + options.pageSizeId + '"> '
						+ '  <button class="btn btn-default dropdown-toggle" type="button" style="background:#ffffff;color:black;float:none;margin-bottom:4px;"' + '    data-toggle="dropdown">'
						+ options.pageInfo.pageSize + '    <span class="caret"/> ' + '   </button>  ' + '   <ul class="dropdown-menu" style="min-width:0"> ' + '    <li> ' + '      <a href="#">'
						+ options.pageInfo.pageSize + '</a> ' + '    </li>  ' + '    <li> ' + '     <a href="#">' + (options.pageInfo.pageSize * 2) + '</a> ' + '    </li>  ' + '   <li> '
						+ '      <a href="#">' + options.pageInfo.pageSize * 3 + '</a> ' + '    </li>  ' + '    <li> ' + '       <a href="#">' + options.pageInfo.pageSize * 4 + '</a> '
						+ '     </li> ' + '   </ul> ' + '   </div>  ' + '   <span>' + messagehelper.get('page.entries') + '</span> ' + '   </div>  '
						+ '   <div class="col col-xs-6" style="text-align:center" id="' + options.pageInfoId + '"> ' + '     <span>' + messagehelper.get('page.showing') + '</span>'
						+ '    <span></span>  ' +messagehelper.get('page.entries')+ ',    <span>' + messagehelper.get('page.of') + '</span>' + '<span id="'+options.pageCountId+'"></span><span>'
						+ messagehelper.get('page.entries') + '</span>' + '  </div>  ' + '   <div class="col col-xs-3" style="direction:rtl;padding-right:10px;" id="' + options.pageNextPrev + '"> '
						+ '      <a data-pageDesc="next" href="javascript:void(0)"><span class="glyphicon glyphicon glyphicon-forward" style="color:#049BE2"/> </a>　'
						+ '      <a data-pageDesc="prev" href="javascript:void(0)" ><span class="glyphicon glyphicon-backward" style="color:#ccc" /> </a>' + '   </div> ' + '  </div> '

				options.pageHtmlContainer.html($(pageHtml));
			};

			/**
			 * 设置获取分页大小
			 * 
			 * @param {Object}
			 *            event 事件对象
			 */
			var setPageSize = function(event) {
				var li = event.target;
				var newPageSize = $(li).text()

				$("#" + options.pageSizeId + " button:first").html(newPageSize + '<span class="caret"/>');
				if (options.pageInfo.pageSize != newPageSize) {
					options.pageInfo.pageNo = 1;
					options.pageInfo.pageSize = newPageSize;
					query();
					// 将isFirst设置成true
					options.pageInfo.isFirst = true;
					$("#" + options.pageNextPrev + " a:eq(1) span").css("color", '#ccc');
				}
			};

			/**
			 * 获取当前查询条件下总共多少条记录
			 * 
			 * @param {Object}
			 *            event 事件对象
			 */
			var getTotalRecord = function(event) {
				// 查询条件必填校验,默认为TRUE
				var validateResult = options.validate(options.queryData);
				if (!validateResult) {
					return; // 如果校验不通过，阻止查询
				}

				if (!options.staticShow) {
					if (options.model.showMask) {
						options.model.showMask();
					}
					remote.ajax({
						url : options.url,
						async : true,
						data : getQueryCriteria(),
						success : function(resultData) {
							if (resultData && resultData.__statusCode == 'S') {
								$("#" + options.pageInfoId + " a:first").html(resultData.__pagecount);
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						},
						complete : function() {
							if (options.model.hideMask) {
								options.model.hideMask();
							}
						}
					});
				}
			};

			var getQueryCriteria = function() {
				var firstRow = options.queryData.getFirstRow();
				var columns = options.queryData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = options.queryData.getValue(columns[i], firstRow);
					queryStr += '"' + columns[i] + '":"' + (v == undefined ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				var queryCriteria = JSON.parse(queryStr);
				if(options.mulParam)
				{
					queryCriteria={"params":JSON.stringify({"query":queryStr,"extendQuery":options.data})};
				}
				queryCriteria.__page = options.pageInfo.pageNo;
				queryCriteria.__pagesize = options.pageInfo.pageSize;
				// console.log(JSON.stringify(queryCriteria));
				if (options.customQueryParam) {
					queryCriteria = $.extend(queryCriteria, options.customQueryParam);
				}
				return queryCriteria;
			}

			/**
			 * 分页（prev，next）数据查询
			 * 
			 * @param {Object}
			 *            event 事件对象
			 */
			var currentClickBtn="";
			
			var page = function(event) {
				if ($(this).data('pagedesc') == 'next') {
					currentClickBtn="next";
					// 1.如果不是最后一页不处理
					if (!(options.pageInfo.isLast)) {
						options.pageInfo.isFirst = false;
						// 2.下一页
						options.pageInfo.pageNo++;
						// 2.1.后端查询数据
						query();
					}
				} else {
					currentClickBtn="prev";
					// 1.如果不是第一页
					if (!options.pageInfo.isFirst) {
						options.pageInfo.isLast = false;
						if (options.pageInfo.pageNo === 2) {
							options.pageInfo.isFirst = true;
						} else {
							options.pageInfo.isFirst = false;
						}
						// 2.上一页
						options.pageInfo.pageNo--;
						// 2.1.后端查询数据
						query();
					}
				}
				// 切换next分页控件样式
				$("#" + options.pageNextPrev + " a:eq(1) span").css({
					"color" : function(index, value) {
						return options.pageInfo.isFirst ? '#ccc' : '#049BE2';
					}
				});
				// 切换prev分页控件样式
				$("#" + options.pageNextPrev + " a:eq(0) span").css({
					"color" : function() {
						return options.pageInfo.isLast ? '#ccc' : '#049BE2';
					}
				});
			};

			/**
			 * 查询数据方法
			 */
			var query = function() {
				// 查询条件必填校验,默认为TRUE
				var validateResult = options.validate(options.queryData);
				if (!validateResult) {
					return; // 如果校验不通过，阻止查询
				}
				// var queryCriteria = options.queryData.toJson();
				// var queryCriteria1 = options.queryData.getFirstRow();
				// queryCriteria.__page=options.pageInfo.pageNo;
				// queryCriteria.__pagesize=options.pageInfo.pageSize;
				// console.log('JSON.stringify(queryCriteria)');
				// console.log(JSON.stringify(queryCriteria.rows[0]));
				// console.log(queryCriteria1.row);
				// console.log('url');
				// console.log(options.url);
				// console.log('pageSize');
				// console.log(options.pageInfo.pageSize);
				// console.log('pageNo');
				// console.log(options.pageInfo.pageNo);
				
				if(options.confirmSave)
				{
					var gridData=options.gridData;
					var changeDatas=gridData.toJson({"onlyChanged":true,"format":"simple"}).rows;
					if(changeDatas.length>0)
					{
						dialoghelper.confirmMsg(messagehelper.get('oper.nosave'),continueQuery,cancelQuery);
						return false;
					}	
				}
				
				if (!options.staticShow) {
					/*if (options.model.showMask) {
						options.model.showMask();
					}*/
					$.request({
						url : options.url,
						async : true,
						data : getQueryCriteria(),
						success : function(resultData) {
							if (resultData && resultData.__statusCode == 'S') {
								if (resultData.data) {
									var len = resultData.data.length;
									var pageNo = options.pageInfo.pageNo;
									var count = resultData.__pagecount || 0;
									
									$("#" + options.pageCountId).html(count);
									
									// 判断当前页是否是最后一页
									if (resultData.data.length == 0 && options.pageInfo.pageNo > 1) {
										options.pageInfo.pageNo--;
									}
									if (resultData.data.length < options.pageInfo.pageSize) {
										options.pageInfo.isLast = true;
										$("#" + options.pageNextPrev + " a:eq(0) span").css("color", '#ccc');
										if (0 === resultData.data.length && options.pageInfo.isFirst !== true) {
											return;
										}
									} else if (len === 10 && len * pageNo >= count) {
										options.pageInfo.isLast = true;
										$("#" + options.pageNextPrev + " a:eq(0) span").css("color", '#ccc');
									} else {
										options.pageInfo.isLast = false;
										$("#" + options.pageNextPrev + " a:eq(0) span").css("color", '#049BE2');
									}
									options.gridData.clear();
									var dataModel = {};
									dataModel.rows = resultData.data;
									options.gridData.loadData(dataModel, true);
									options.gridData.refreshData();
									options.gridData.loadPageData(options.pageInfo.pageNo);

									// 刷新grid视口显示数据的范围（21 to 40）
									$("#" + options.pageInfoId + " span:eq(1)").html(
											((options.pageInfo.pageNo - 1) * options.pageInfo.pageSize + 1) + " " + messagehelper.get('page.to') + " " + options.pageInfo.pageNo
													* options.pageInfo.pageSize);
								}
								if (typeof (options.afterQueryFn) === "function") {
									options.afterQueryFn.call(this, options.afterQueryFnParams);
								}
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						}/*,
						complete : function() {
							if (options.model.hideMask) {
								options.model.hideMask();
							}
							if (!options.staticShow) {
								$.resizeScrollByXid(options.model, options.gridXid);
							}
						}*/
					});
				}
			};
			
			var cancelQuery =function()//恢复页数显示
			{
				
				var current=(currentClickBtn=="next"?"prev":"next");

				if (current == 'next') {
					currentClickBtn="next";
					// 1.如果不是最后一页不处理
					if (!(options.pageInfo.isLast)) {
						options.pageInfo.isFirst = false;
						// 2.下一页
						options.pageInfo.pageNo++;
					}
				} else {
					currentClickBtn="prev";
					// 1.如果不是第一页
					if (!options.pageInfo.isFirst) {
						options.pageInfo.isLast = false;
						if (options.pageInfo.pageNo === 2) {
							options.pageInfo.isFirst = true;
						} else {
							options.pageInfo.isFirst = false;
						}
						// 2.上一页
						options.pageInfo.pageNo--;
					}
				}
				// 切换next分页控件样式
				$("#" + options.pageNextPrev + " a:eq(1) span").css({
					"color" : function(index, value) {
						return options.pageInfo.isFirst ? '#ccc' : '#049BE2';
					}
				});
				// 切换prev分页控件样式
				$("#" + options.pageNextPrev + " a:eq(0) span").css({
					"color" : function() {
						return options.pageInfo.isLast ? '#ccc' : '#049BE2';
					}
				});
			
			}
			
			
			var continueQuery = function() {
				
				if (!options.staticShow) {
					/*if (options.model.showMask) {
						options.model.showMask();
					}*/
					$.request({
						url : options.url,
						async : true,
						data : getQueryCriteria(),
						success : function(resultData) {
							if (resultData && resultData.__statusCode == 'S') {
								if (resultData.data) {
									var len = resultData.data.length;
									var pageNo = options.pageInfo.pageNo;
									var count = resultData.__pagecount;
									// 判断当前页是否是最后一页
									if (resultData.data.length == 0 && options.pageInfo.pageNo > 1) {
										options.pageInfo.pageNo--;
									}
									if (resultData.data.length < options.pageInfo.pageSize) {
										options.pageInfo.isLast = true;
										$("#" + options.pageNextPrev + " a:eq(0) span").css("color", '#ccc');
										if (0 === resultData.data.length && options.pageInfo.isFirst !== true) {
											return;
										}
									} else if (len === 10 && len * pageNo >= count) {
										options.pageInfo.isLast = true;
										$("#" + options.pageNextPrev + " a:eq(0) span").css("color", '#ccc');
									} else {
										options.pageInfo.isLast = false;
										$("#" + options.pageNextPrev + " a:eq(0) span").css("color", '#049BE2');
									}
									options.gridData.clear();
									var dataModel = {};
									dataModel.rows = resultData.data;
									options.gridData.loadData(dataModel, true);
									options.gridData.refreshData();
									options.gridData.loadPageData(options.pageInfo.pageNo);

									// 刷新grid视口显示数据的范围（21 to 40）
									$("#" + options.pageInfoId + " span:eq(1)").html(
											((options.pageInfo.pageNo - 1) * options.pageInfo.pageSize + 1) + " " + messagehelper.get('page.to') + " " + options.pageInfo.pageNo
													* options.pageInfo.pageSize);
								}
								if (typeof (options.afterQueryFn) === "function") {
									options.afterQueryFn.call(this, options.afterQueryFnParams);
								}
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						}/*,
						complete : function() {
							if (options.model.hideMask) {
								options.model.hideMask();
							}
							if (!options.staticShow) {
								$.resizeScrollByXid(options.model, options.gridXid);
							}
						}*/
					});
				}
			};

			/**
			 * 查询按钮点击操作
			 */
			var queryClick = function(event) {
				options.pageInfo.pageNo = 1;
				options.pageInfo.isFirst = true;
				// 将总页数设置为？
				$("#" + options.pageInfoId + " a:first").html('?');
				query();
			};

			// 业务逻辑调用代码
			(function() {

				init();
				generateHtml();
				doPage();
				if (!options.staticShow) {
					$.setNiceScrollByGrids(options.model, options.gridXid);
				}
				if (options.queryData.count() == 0) {
					options.queryData.clear();
					options.queryData.newData();
				}
				if (options.autoQuery) {
					query();
				}

			})();
		};

		$.queryByEnterClick = function(elementXid, model) {
			var _this = model;
			$(_this.getElementByXid(elementXid)).on('keyup', function(event) {
				if (event.keyCode == 13) {
					$("#" + _this.getIDByXID("query") + "").click();
					$("#" + _this.getIDByXID(elementXid) + "").blur();
				}
			});
		};

		/** 输入框和弹窗按钮事件行为绑定 */
		$.genInputSearchGroupEvent = function(options) {
			var defaults = {
				// 各种属性、参数
				model : {}, // 必须 -- 数据模型
				bindData : {}, // 必须 -- 绑定的data，用于清空绑定的字段
				openWD : {}, // 必须 -- 打开的window dialog
				bindFieldName : '', // 必须， 绑定的字段名
				domButton : {}, // 必须，search button元素
				domInput : {}, // 必须，input元素
				param : {}, // 非必须， 弹窗要传入的参数
			};
			var options = $.extend(defaults, options);

			options.domButton.on("click", "", options.model, function() {
				if (options.domButton.find("i").hasClass("icon-ios7-search")) {
					options.openWD.open(options.param);
				} else if (options.domButton.find("i").hasClass("icon-close-round")) {
					options.bindData.setValue(options.bindFieldName, "", options.bindData.getCurrentRow());
					options.domButton.find("i").addClass("icon-ios7-search").removeClass("icon-close-round");
				}
			});

			options.domInput.on("blur", "", options.model, function() {
				var bindingFieldValue = options.bindData.getValue(options.bindFieldName, options.bindData.getCurrentRow());
				if (bindingFieldValue !== "" && bindingFieldValue !== undefined && bindingFieldValue !== null) {
					options.domButton.find("i").addClass("icon-close-round").removeClass("icon-ios7-search");
				} else {
					options.domButton.find("i").addClass("icon-ios7-search").removeClass("icon-close-round");
				}
			})
		};

		/** 省市县级联行为事件 */
		$.cascadingRegionGroupEvent = function(options) {
			var defaults = {
				// 各种属性、参数
				model : {}, // 必须 -- 数据模型
				bindStateData : {}, // 必须 -- 省绑定的数据容器
				bindCityData : {}, // 必须 -- 市绑定的数据容器
				bindDistrictData : {}, // 必须 -- 县绑定的数据容器
				bindStateField : "addrState", // 如果data里面的省字段不是addrState，此为必须
				bindCityField : "addrCity", // 如果data里面的市字段不是addrState，此为必须
				bindDistrictField : "addrDistrict", // 如果data里面的县字段不是addrState，此为必须
				dataMain : {}, // 必须 -- 绑定的data
				domStateSelect : {}, // 必须，省下拉框元素
				domCitySelect : {}, // 必须，市下拉框元素
				domDistrictSelect : {}, // 必须，县下拉框元素
			};
			var options = $.extend(defaults, options);
			var queryStateUrl = "/mdm/ptMdmRegionV/queryState";
			var queryCityUrl = "/mdm/ptMdmRegionV/queryCityOnState";
			var queryDistrictUrl = "/mdm/ptMdmRegionV/queryDistrictOnCity";
			//var queryZipCodeUrl = "/mdm/ptMdmRegionV/queryZipCodeOnDistrict";

			var _this = options.model;
			remote.ajax({
				url : queryStateUrl,
				async : true,
				data : {},
				beforeSend : function() {
					if (_this.showMask) {
						_this.showMask();
					}
				},
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						var dataModel = {};
						dataModel.rows = resultData.data;
						options.bindStateData.clear();
						options.bindStateData.loadData(dataModel, true);
						options.bindStateData.refreshData();
					} else if (resultData) {
						dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
					} else {
						dialoghelper.error(messagehelper.get('service.wrongdata'));
					}
				},
				complete : function() {
					if (_this.hideMask) {
						_this.hideMask();
					}
				}
			});

			options.domStateSelect.on("change", "", _this, function() {
				// 改变省的值时，重置市和县的值
				options.dataMain.setValue(options.bindCityField, "", options.dataMain.getCurrentRow());
				options.dataMain.setValue(options.bindDistrictField, "", options.dataMain.getCurrentRow());
				var stateValue = options.dataMain.getValue(options.bindStateField, options.dataMain.getCurrentRow());
				if (stateValue !== "" && stateValue !== undefined && stateValue !== null) {
					var queryCityCriteria = {
						state : stateValue
					};
					remote.ajax({
						url : queryCityUrl,
						async : true,
						data : queryCityCriteria,
						beforeSend : function() {
							if (_this.showMask) {
								_this.showMask();
							}
						},
						success : function(resultData) {
							if (resultData && resultData.__statusCode == 'S') {
								var dataModel = {};
								dataModel.rows = resultData.data;
								options.bindCityData.clear();
								options.bindCityData.loadData(dataModel, true);
								options.bindCityData.refreshData();
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						},
						complete : function() {
							if (_this.hideMask) {
								_this.hideMask();
							}
						}
					});
				}
			});

			options.domCitySelect.on("change", "", _this, function() {
				// 改变市的值时，重置县的值
				options.dataMain.setValue(options.bindDistrictField, "", options.dataMain.getCurrentRow());
				var stateValue = options.dataMain.getValue(options.bindStateField, options.dataMain.getCurrentRow());
				var cityValue = options.dataMain.getValue(options.bindCityField, options.dataMain.getCurrentRow());
				if (stateValue !== "" && stateValue !== undefined && stateValue !== null && cityValue !== "" && cityValue !== undefined && cityValue !== null) {
					var queryDistrictCriteria = {
						state : stateValue,
						city : cityValue
					};
					remote.ajax({
						url : queryDistrictUrl,
						async : true,
						data : queryDistrictCriteria,
						beforeSend : function() {
							if (_this.showMask) {
								_this.showMask();
							}
						},
						success : function(resultData) {
							if (resultData && resultData.__statusCode == 'S') {
								var dataModel = {};
								dataModel.rows = resultData.data;
								options.bindDistrictData.clear();
								options.bindDistrictData.loadData(dataModel, true);
								options.bindDistrictData.refreshData();
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						},
						complete : function() {
							if (_this.hideMask) {
								_this.hideMask();
							}
						}
					});
				}
			});

			/*options.domDistrictSelect.on("change", "", _this, function() {
				var stateValue = options.dataMain.getValue(options.bindStateField, options.dataMain.getCurrentRow());
				var cityValue = options.dataMain.getValue(options.bindCityField, options.dataMain.getCurrentRow());
				var districtValue = options.dataMain.getValue(options.bindDistrictField, options.dataMain.getCurrentRow());
				if (stateValue !== "" && stateValue !== undefined && stateValue !== null && cityValue !== "" && cityValue !== undefined && cityValue !== null && districtValue !== ""
						&& districtValue !== undefined && districtValue !== null) {
					var queryZipCodeCriteria = {
						state : stateValue,
						city : cityValue,
						district : districtValue,
					};
					remote.ajax({
						url : queryZipCodeUrl,
						async : true,
						data : queryZipCodeCriteria,
						beforeSend : function() {
							if (_this.showMask) {
								_this.showMask();
							}
						},
						success : function(resultData) {
							if (resultData && resultData.__statusCode == 'S') {
								var dataModel = {};
								dataModel.rows = resultData.data;
								options.bindDistrictData.clear();
								options.bindDistrictData.loadData(dataModel, true);
								options.bindDistrictData.refreshData();
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						},
						complete : function() {
							if (_this.hideMask) {
								_this.hideMask();
							}
						}
					});
				}
			});*/
		};

	})(jQuery);

})
