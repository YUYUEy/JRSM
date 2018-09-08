/**
 *  通用js
 */
jQuery.extend({
    
	/***************************************************************************
	 * 设置 是否只读
	 * 
	 * @param selectXid
	 * @param flag
	 *            条件名称 true/false
	 * @param model
	 **************************************************************************/
	isReadOnlyClick : function(selectXid, flag, model) {
		model.comp(selectXid).set({
			'disabled' : flag
		});
	},
	
	/***************************************************************************
	 * 设置 是否隐藏
	 * 
	 * @param selectXid
	 * @param flag
	 * @param model
	 **************************************************************************/
	isHiddenClick : function(selectXid, flag, model) {
		$("#" + model.getIDByXID(selectXid)).css("display",flag? "none" : "");
	}, 

	/***************************************************************************
	 * 初始化选中事件
	 * 
	 * @param selectXid
	 * @param flag
	 *            条件名称 true/false
	 * @param model
	 **************************************************************************/
	initCheckedClick : function(selectXid, flag, model) {
		model.comp(selectXid).set({
			'checked' : flag
		});
	},

	/***************************************************************************
	 * 弹出框
	 * 
	 * @param selectXid
	 * @param dataParams
	 * @param titleName
	 * @param model
	 **************************************************************************/
	popupClick : function(selectXid, dataParams, titleName, model) {
		//由于要做多语言设置   js无法直接获取 所以要在w中设置
		//从w中获取 title
		//根据约定判断是否做 i18n
		if("i18n" == titleName){
			var dataConfig = $($("#" + model.getIDByXID(selectXid))[0]).attr("data-config");
			if(dataConfig){
				titleName = JSON.parse(dataConfig).title || titleName;
			}
		}
		model.comp(selectXid).open({
			data : dataParams,
			'title' : titleName
		});
	},

	/***************************************************************************
	 * 数据源初始化
	 * 
	 * @param ListData
	 * @param flag
	 *            是否初始化 数据源
	 * @param model
	 **************************************************************************/
	initDateClick : function(ListData, flag, model) {
		var data = model.comp(ListData);
		data.clear();
		if (flag) {
			data.newData();
		}
	},

	/***************************************************************************
	 * 赋予初始值
	 * 
	 * @param ListData
	 * @param flag
	 *            是否初始化 数据源
	 * @param model
	 **************************************************************************/
	initAssignmentClick : function(ListData, colunmName, value, model) {
		model.comp(ListData).setValue(colunmName, value);
	},

	/***************************************************************************
	 * 数据导出 import
	 * 
	 * @param ListData
	 *            数据源
	 * @param queryData
	 *            条件源
	 * @param url
	 * @param dataGrid
	 *            gird
	 * @param model
	 **************************************************************************/
	importClick : function(ListData, queryData, url, dataGrid, model) {
		var dataParams = {
			operator : ".xls",
			dataCols : model.comp(ListData).defCols,
			dataQuery : model.comp(queryData).toJson(),
			url : url,
			gridCols : model.comp(dataGrid)

		};
		$.popupClick('exportWd', dataParams, '', model);
	},

	/***************************************************************************
	 * 鼠标enter查询事件
	 * 
	 * @param ListData
	 * @param flag
	 *            是否初始化 数据源
	 * @param model
	 **************************************************************************/
	queryDataByEnterClick : function(event, model) {
		if (event.keyCode == 13) {
			model.getElementByXid("query").click();
			var inputId = event.target.id;
			if(inputId){
				$("#" + inputId).blur();
			}
		}
	},


	/***************************************************************************
	 * 行选中 逻辑控制
	 * 
	 * @param listData
	 *            数据源
	 * @param dataParams
	 *            参数
	 * @param columnName
	 *            行条件字段名
	 * @param termName
	 *            条件名称
	 * @param isEqu
	 *            数据源 列数据 是否对 等于某一值做逻辑处理
	 * @param model
	 **************************************************************************/
	rowSelectClick : function(listData, dataParams, columnName, termName, isEqu, model) {
		var queryData = model.comp(listData).getCurrentRow();
		var columnValue = queryData.val(columnName);// 获取行数据
		var flag = false;// 逻辑
		if (isEqu) {
			if (termName === columnValue) {
				flag = true;
			}
		} else {
			if (termName !== columnValue) {
				flag = true;
			}
		}
		var jsonData = eval(dataParams);
		var length = jsonData.length;
		for (var i = 0; i < length; i++) {
			$.isReadOnlyClick(jsonData[i].xid, flag, model);
		}
	},
	
	/***************************************************************************
	 * 获取参数值
	 * 
	 * @param colunmVal  获取字段
	 * @param model
	 *            当前对象
	 * @param model
	 **************************************************************************/
	queryParamVal : function(colunmVal, model) {
		var paramVal;
		var context = model.getContext();
		if(context){
			paramVal = context.getRequestParameter(colunmVal);
		}
		return paramVal;
	},
	
	/***************************************************************************
	 * jQuery 特殊字符转义
	 * @param str  需要转义的字符
	 **************************************************************************/
	charEscapes : function(str) {
		var regExpSpecial = /([\\\^\$\*\+\?\{\}\[\]\.\(\)\|\@])/g;
		str = str.replace(regExpSpecial,'\\$1');
		return str;
	},
	
	/**
	 * 在当前按钮上绑定划入划出事件
	 * 
	 * slideDivId 划入划出div的id
	 * 
	 * 案例： // 添加划入划出事件
	 * this.comp("moreSlide").$domNode.bindSlideBtn(this.getIDByXID("quoteListHideDiv"));
	 */
	bindSlideBtn : function(slideDivId) {
		var slideDiv = $("#" + slideDivId);
		this.on("click", {
			"slideDiv" : slideDiv
		}, function(event) {
			event.data.slideDiv.slideToggle();
			var $i = $(this).find("i:first");
			$i.toggleClass("glyphicon-chevron-down");
			$i.toggleClass("glyphicon-chevron-up");
		});
	},
	
	/**
	 * 本来是共性js  但是由于某些原因导致  copy数据源的时候 字符串值为undefined
	 * 所以个性化处理
	 * 将数据源 转换为字符串值
	 * */
	getFirstRowToJson : function(modelData) {
		var result = {};
		var firstRow = modelData.getFirstRow();
		if (firstRow !== null) {
			var columns = modelData.getColumnIDs().split(",");
			var queryStr = "{";
			for (var i = 0; i < columns.length; i++) {
				var v = modelData.getValue(columns[i], firstRow);
				if(v){
					queryStr += '"' + columns[i] + '":"' + v + '",';
				}
			}
			queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
			queryStr += "}";
			// console.log(queryStr);
			// 解决换行符影响
			queryStr = queryStr.replace("\n", "\\n");
			queryStr = queryStr.replace("\r", "\\r");
			result = JSON.parse(queryStr);
		}
		return result;
	},
	
	/**
	 * event grid单元格渲染事件对象 renderColName 需要渲染成链接的列的名称
	 * var params = [ {
				column : eventColName,
				directAction : 'edit'
			} ];
	 * 案例：
	 */
	renderGirdColumn : function(event, param) {
		event.html = "<a href='#' class='mdm-grid-cell-a "+param.directAction+" '>" + param.column + "</a>";
	},


});