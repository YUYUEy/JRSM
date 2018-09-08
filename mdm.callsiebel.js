define(function(require) {
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var global = require("$UI/portal/base/global");
	var clientquery = require('$UI/jrsm/js/clientquery');
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/jrsm/js/jrsm.query");
	(function($) {
		$.callsiebel = $.callsiebel || {};
		$.extend($.callsiebel, {

			/*******************************************************************
			 * 查询 data
			 * 
			 * @param ListData
			 *            数据源
			 * @param Jsonurl
			 *            访问json路径
			 * @param dataParam
			 *            参数
			 * @param model
			 ******************************************************************/
			queryParamsClick : function(ListData, Jsonurl, dataParam, model, callBack) {
				var dataQuerylist;
				if(ListData){
					model.comp(ListData).clear();
					dataQuerylist = model.comp(ListData);
				}
				global.ajax({
					url : Jsonurl,
					data : dataParam,
					dataType : "jsonp",
					async : true,
					beforeSend:function(){model.showMask();},
					success : function(resultData) {
						if (resultData && resultData.__statusCode == 'S') {
							if (typeof (callBack) === "function") {
								callBack.call(this, resultData);
							} else {
								var dataModel = {};
								dataModel.rows = resultData.data;
								dataQuerylist.clear();
								dataQuerylist.loadData(dataModel, true);
								dataQuerylist.refreshData();
							}
						}else{
                            if(resultData.__errorMessage){
								dialoghelper.confirmMsg(resultData.__errorMessage, null, null, "ok");
							}else if (typeof (callBack) === "function") {
								callBack.call(this, resultData);
							}
						}
					},
					complete : function() {model.hideMask();}
				});
			},
			
			/*******************************************************************
			 * 查询 下拉  data
			 * 
			 * @param dataParam
			 *            参数
			 * @param model
			 * 这里有一条规则：lov name值转为约定的数据源name值  
			 * eg:MIDEA_MDM_LAYER-->layerDate
			 *    MIDEA_MDM_HEAD_QUERY-->headQueryData                                              
			 ******************************************************************/
			queryLovDataClick : function(dataParam, model) {
				global.ajax({
					url : "/mdm/ptLovListV/queryByTypes",
					data : dataParam,
					async : false,
					beforeSend:function(){model.showMask();},
					success : function(resultData) {
						if (resultData && resultData.__statusCode == 'S') {
							if (resultData.data) {
							    var lovNames = dataParam.type;
							    //将lov的值转为数组
							    var lovData,length,lovAttr,data,dataColumn,dataColumnStr,dataModel = {};
							    if(lovNames){
							        lovAttr = lovNames.split(",");
							        length = lovAttr.length;
							        for(var i = 0 ;i < length;i++){
							           //将lov name值转为约定的数据源name值  eg:MIDEA_MDM_LAYER--layerDate
							           data = lovAttr[i].toLowerCase().replace("midea_mdm_","");
							           if(data && data){
							               dataColumn = data.split("_");
							               //转为约定格式   MIDEA_MDM_HEAD_QUERY-headQueryData
							               for(var j =0;j<dataColumn.length;j++){
							                  //将>1长度后面的字符串第一个字母大写
							                  if(j === 0 ){
							                      dataColumnStr = dataColumn[j];
							                  }else{
							                      dataColumnStr += dataColumn[j].substring(0, 1).toUpperCase() + dataColumn[j].substring(1);
							                  }
							               }
							               dataModel.rows = resultData.data[lovAttr[i]];
							               lovData = model.comp(dataColumnStr + "Data");
							               lovData.clear();
							               lovData.loadData(dataModel, true);
							           }
							        }
							    }
							} else if (resultData) {
								dialoghelper.error(messagehelper.get('service.error') + resultData.__errorMessag);
							} else {
								dialoghelper.error(messagehelper.get('service.wrongdata'));
							}
						}
					},
					complete : function() {model.hideMask();}
				});
			},

			/*******************************************************************
			 * 判断选中行 是否选中
			 * 
			 * @param selectXid
			 * @param flag
			 *            条件名称 true/false
			 * @param model
			 ******************************************************************/
			isSelectClick : function(selectId, model) {
				var flag = false;
				var length = selectId.length;
				if (length > 0) {
					flag = true;
				} else {
					$(model).tipInfo({
						title : "System Prompt",
						"msg" : "Please at least select a row.",
						tip : "tip"
					});
				}
				return flag;
			},

			/*******************************************************************
			 * 判断是否选中 编辑用法
			 * 
			 * @param listData
			 *            数据源
			 * @param flag
			 *            条件名称 true/false
			 * @param model
			 ******************************************************************/
			isEditSelectClick : function(listData, model) {
				var flag = false;
				var dataQuerylist = model.comp(listData).getCurrentRow();
				if (dataQuerylist) {
					flag = true;
				} else {
					$(model).tipInfo({
						title : "System Prompt",
						"msg" : "No record is selected !",
						tip : "tip"
					});
				}
				return flag;
			},

			/*******************************************************************
			 * 获取行数据
			 * 
			 * @param ListData
			 * @param model
			 ******************************************************************/
			findSelectRowDataClick : function(ListData, model) {
				var selectedRow = model.comp(ListData).getCurrentRow();
				return selectedRow;
			},

			/*******************************************************************
			 * 判断字符串是否为空
			 * 
			 * @param str
			 *            字符串
			 ******************************************************************/
			isNullClick : function(str) {
				var flag = false;
				if (undefined !== str && null !== str && '' !== str) {
					flag = true;
				}
				return flag;
			},

			/*******************************************************************
			 * 日期格式
			 * 
			 * @param str
			 *            日期字符串
			 ******************************************************************/
			dateFormatClick : function(str) {
				var strDate = '';
				if (undefined !== str && null !== str) {
					var date = [ 3 ];
					date = str.toString().split('-');
					strDate = date[1] + '/' + date[2] + '/' + date[0];
				}
				return strDate;
			},

			/*******************************************************************
			 * 金额保留4位小数
			 * 
			 * @param strm
			 *            字符串
			 ******************************************************************/
			moneyFormatClick : function(strm) {
				var strMoney = null;
				// 先将金额变量格式化 保留4位小数 支持四舍五入
				strm = Math.round(strm * 10000) / 10000;
				var str = [ 2 ];
				str = strm.toString().split('.');
				if (undefined !== str[1]) {
					var xsd = str[1];
					while (xsd.length < 4) {
						xsd += '0';
					}
					strMoney = str[0].toString() + '.' + xsd.toString();
				} else {
					strMoney = strm.toString() + '.0000';
				}
				return strMoney;
			},

			/*******************************************************************
			 * 查询input激活
			 * 
			 * @param containerGrid
			 *            input-- xidgrid
			 * @param listDataGrid
			 *            数据源 grid
			 * @param model
			 ******************************************************************/
			clientqueryClick : function(containerGrid, listDataGrid, model) {
				var queryContainer = $('#' + model.getIDByXID(containerGrid));
				var grid = model.comp(listDataGrid);
				clientquery.applySearch(queryContainer, grid);
			},

			/*******************************************************************
			 * 获取抛错信息
			 * 
			 * @param errorType
			 *            错误类型
			 * @param errorCode
			 *            错误code
			 * @param language
			 * @param model
			 ******************************************************************/
			findErrorMessageClick : function(model, errorType, errorCode, language) {
				if (errorType) {
					$(model).tipInfo({
						title : "System Prompt",
						"msg" : $.replaceCodeByMessage(model, errorCode, language),
						tip : errorType
					});
				}
			},

			/**
			 * 将源数据控件中的当前行数据迁移到目标数据对象中
			 * 
			 * <pre>
			 * function copyRow (sourceDataComp, destDataComp)
			 * </pre>
			 * 
			 * @param {Object}
			 *            sourceDataComp 源数据控件
			 * @param {Object}
			 *            destDataComp 目标数据控件
			 */
			copyRow : function(sourceDataComp, destDataComp) {
				var sourceCurrentRow = sourceDataComp.getCurrentRow(true);
				if (sourceCurrentRow === undefined || typeof (sourceCurrentRow) === undefined) {
					return;
				}
				var rowData = sourceCurrentRow.row;
				var removeData = {}
				$.each(rowData, function(i, n) {
					removeData[i] = sourceDataComp.val(i, sourceCurrentRow);
				});
				destDataComp.add(removeData);
				destDataComp.isValid(true);
				// 刷新数据源
				destDataComp.refreshData();
			},
			
			/**
			 * 将源数据控件中的当前行数据迁移到目标数据对象中
			 * 拷贝行数据
			 * <pre>
			 * function copyRow (sourceDataComp, destDataComp)
			 * </pre>
			 * 
			 * @param {Object}
			 *            sourceDataComp 源数据控件
			 * @param {Object}
			 *            destDataComp 目标数据控件
			 */
			copyDataRow : function(sourceDataComp, destDataComp) {
				var rowData = sourceDataComp.row;
				var removeData = {}
				$.each(rowData, function(i, n) {
					removeData[i] = sourceDataComp.val(i);
				});
				destDataComp.add(removeData);
				destDataComp.isValid(true);
				// 刷新数据源
				destDataComp.refreshData();
			},
			
			/**
			 * 将源数据控件中的当前行数据迁移到目标数据对象中
			 * 当data源的字段为空时  不进行copy  这里主要针对于会计科目编辑 特殊要求
			 * <pre>
			 * function copyRow (sourceDataComp, destDataComp)
			 * </pre>
			 * 
			 * @param {Object}
			 *            sourceDataComp 源数据控件
			 * @param {Object}
			 *            destDataComp 目标数据控件
			 */
			copyHasDataRow : function(sourceDataComp, destDataComp) {
				var sourceCurrentRow = sourceDataComp.getCurrentRow(true);
				if (sourceCurrentRow === undefined || typeof (sourceCurrentRow) === undefined) {
					return;
				}
				var rowData = sourceCurrentRow.row;
				var val;
				$.each(rowData, function(i, n) {
					val = sourceDataComp.val(i, sourceCurrentRow);
					if(val){
						destDataComp.setValue(i,sourceDataComp.val(i, sourceCurrentRow));
					}
				});
				//destDataComp.add(removeData);
				destDataComp.isValid(true);
				// 刷新数据源
				destDataComp.refreshData();
			},
			
			/**
			 * 将源数据控件中的当前行数据迁移到目标数据对象中
			 * 会计科目编辑 变更前/变更后  变更前字段前面加p 特殊性copy
			 * <pre>
			 * function copyRow (sourceDataComp, destDataComp)
			 * </pre>
			 * 
			 * @param {Object}
			 *            sourceDataComp 源数据控件
			 * @param {Object}
			 *            destDataComp 目标数据控件
			 */
			copyColumnPDataRow : function(sourceDataComp, destDataComp) {
				var sourceCurrentRow = sourceDataComp.getCurrentRow(true);
				if (sourceCurrentRow === undefined || typeof (sourceCurrentRow) === undefined) {
					return;
				}
				var rowData = sourceCurrentRow.row;
				var removeData = {}
				$.each(rowData, function(i, n) {
					removeData['p'+i] = sourceDataComp.val(i, sourceCurrentRow);
				});
				destDataComp.add(removeData);
				destDataComp.isValid(true);
			},

			/**
			 * 数据源copy
			 * 
			 * <pre>
			 * function copyDataALL (sourceDataComp, destDataComp)
			 * </pre>
			 * 
			 * @param {Object}
			 *            sourceDataComp 源数据控件
			 * @param {Object}
			 *            destDataComp 目标数据控件
			 */
			copyDataALL : function(sourceDataComp, destDataComp) {
				var row;
				// 为避免重复 存在rowId相同的 数据源 则不copy
				// 父级元素存在的数据源
				var errorData;
				var rowId;
				sourceDataComp.each(function(p) {
					// copy之前做判断 当父级元素存在时 不进行copy
					rowId = p.row.val("rowId") ? p.row.val("rowId") : p.row.row.rowId;
					errorData = destDataComp.find([ "rowId" ], [ rowId ]);
					if (errorData.length < 1) {
						row = destDataComp.add();
						row.assign(p.row);
					}
				}); // 刷新数据源
				destDataComp.refreshData();
			},

			/**
			 * 只是移除数据源中的row 非物理性删除
			 * 
			 * @param {Object}
			 *            ListData 源数据控件
			 * @param {Object}
			 *            model 当前对象
			 * @param flag
			 *            是否删除父页面数据源
			 */
			deleteRow : function(ListData, model, flag) {
				var selectedData = !flag ? model.comp(ListData) : model.getParent().comp(ListData);
				if (selectedData) {
					var row = selectedData.getCurrentRow(true);
					selectedData.deleteData(row);
				}
			},

			/**
			 * 个性化设置
			 * 
			 * @param  grids grid对象数组
			 * @param    model 当前对象
			 */
			configClick : function(grids, model) {
				var individuationhelper = model.getIndividuation();
				var xids = [];
				var xid;
				$("*").find(".config").each(function(i, v) {
					xid = $(v).attr("xid");
					if (xid) {
						xids.push(xid);
					}
				});
				var sceneId = $.queryParamVal("sceneId", model);
				var optionConfig = {
					scene : sceneId,// (Fixed)
					model : model,// (Fixed)
					pagepanel : model.comp("window").$domNode,// (Custom)
					element1List : xids,
					element2List : grids, // (Custom)
				};
				individuationhelper.initConfig(optionConfig);// (Fixed)
			},
			
			/**
			 * 设置当前页面 select 的请选择 提示  多语言
			 * */
			initSelectOptionsCaptionLang : function(event){
				var id,option,text;
				$("*").find("select").each(function(i, v) {
					id = $(v).attr("id");
					if(id){
						option = $("#"+id+ " option");
						if(option && option.length > 0){
							text = $(option[0]).text();
							if(text && text == "i18n"){
								$(option[0]).text(messagehelper.get('select.options.caption'));
							}
						}
						
					}
				});
				
			}

		});
	})(jQuery);
});
