define(function(require) {
	var messagehelper = require("$UI/jrsm/js/message");
	var global = require("$UI/portal/base/global");

	$.extend({
		/* 批量处理lov通用方法返回data */
		bulkLOV : function(url, data, bind) {
			$.each(data, function(k, v) {
				$.each(bind, function(_k, _v) {
					if (v.type === _k) {
						global.ajax({
							url : url,
							data : v,
							async : false,
							success : function(data) {
								_v.clear();
								var dataModel = {};
								dataModel.rows = data.data;
								_v.loadData(dataModel, true);
								_v.refreshData();
							}
						});
					}
				});
			});
		},
	});
	return {
		getFirstRowToJson : function(modelData) {
			var result = {};
			var firstRow = modelData.getFirstRow();
			if (firstRow !== null) {
				var columns = modelData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = modelData.getValue(columns[i], firstRow);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");				
				result = JSON.parse(queryStr);
			}
			// console.log(JSON.stringify(queryCriteria));

			return result;
		},
		getFirstRowToJsonStr : function(modelData) {
			var result = {};
			var firstRow = modelData.getFirstRow();
			if (firstRow !== null) {
				var columns = modelData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = modelData.getValue(columns[i], firstRow);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");				
				result = queryStr;
			}
			return result;
		},
		getRowToJson : function(modelData, row) {
			debugger
			var result = {};
			if (row !== null) {
				var columns = modelData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					console.log(modelData)
					console.log(columns[i]);
					console.log(row);
					debugger
					var v = modelData.getValue(columns[i], 1);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				result = JSON.parse(queryStr);
			}
			// console.log(JSON.stringify(queryCriteria));

			return result;
		},
		getRowToJsonStr : function(modelData, row) {
			var result = {};
			if (row !== null) {
				var columns = modelData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = modelData.getValue(columns[i], row);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				result = queryStr;
			}
			// console.log(JSON.stringify(queryCriteria));

			return result;
		},getSelectRowsToJson : function(modelGrid,modelData) {
			var result = new Array();
			var columns = modelData.getColumnIDs().split(",");
			var rowDatas = modelGrid.getCheckedRows();
			for (var i = 0; i < rowDatas.length; i++) {
				var map = {};
				var row = rowDatas[i];
				var queryStr = "{";
				for (var j = 0; j < columns.length; j++) {
					var v = modelData.getValue(columns[j], row);
					queryStr += '"' + columns[j] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) === ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				map = JSON.parse(queryStr);
				result.push(map);
			}

			return result;
		},
		getRowsToJson : function(modelData) {
			var result = new Array();
			var columns = modelData.getColumnIDs().split(",");
			var rowDatas = modelData.datas.get();
			for (var i = 0; i < rowDatas.length; i++) {
				var map = {};
				var row = rowDatas[i];
				var queryStr = "{";
				for (var j = 0; j < columns.length; j++) {
					var v = modelData.getValue(columns[j], row);
					queryStr += '"' + columns[j] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) === ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				map = JSON.parse(queryStr);
				result.push(map);
			}

			return result;
		},
		
		getRowToJsonStr : function(modelData, row) {
			var result = {};
			if (row !== null) {
				var columns = modelData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = modelData.getValue(columns[i], row);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				result = queryStr;
			}
			// console.log(JSON.stringify(queryCriteria));

			return result;
		},
		
		//add by Jesse 2017.11.27
		//一次性将头，行DATA转换为json对象
		getHeadLieDataToJson : function(headData,lineData,lineName){
			var result = {};
			var firstRow = headData.getFirstRow();
			if (firstRow !== null) {
				var columns = headData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = headData.getValue(columns[i], firstRow);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v)  + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;				
				var lineResult = new Array();
				var lineResultStr="[";
				var columns = lineData.getColumnIDs().split(",");
				var rowDatas = lineData.datas.get();
				for (var i = 0; i < rowDatas.length; i++) {
					//var map = {};
					var row = rowDatas[i];
					var str = "{";
					for (var j = 0; j < columns.length; j++) {
						var v = lineData.getValue(columns[j], row);
						str += '"' + columns[j] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
					}
					str = (str.slice(str.length - 1) === ',') ? str.slice(0, -1) : str;
					str += "}";
					// console.log(str);									
					lineResultStr=lineResultStr+str;
					if(i<(rowDatas.length-1)){
						lineResultStr=lineResultStr+',';
					}					
				}				
				lineResultStr=lineResultStr+"]";				
				queryStr=queryStr+',"'+lineName+'":'+lineResultStr+"}";		
				//console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");				
				result = JSON.parse(queryStr);
			}
			// console.log(JSON.stringify(queryCriteria));

			return result;
		
		},
		
		//一次性将头，动态多个data转换为json对象，最大10个
		getHeadListDataToJson : function(headData,
				lineData1,lineName1,
				lineData2,lineName2,
				lineData3,lineName3,
				lineData4,lineName4,
				lineData5,lineName5,
				lineData6,lineName6,
				lineData7,lineName7,
				lineData8,lineName8,
				lineData9,lineName9,
				lineData10,lineName10				
				){
			var result = {};
			var firstRow = headData.getFirstRow();
			if (firstRow !== null) {
				var columns = headData.getColumnIDs().split(",");
				var queryStr = "{";
				for (var i = 0; i < columns.length; i++) {
					var v = headData.getValue(columns[i], firstRow);
					queryStr += '"' + columns[i] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
				}
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;				
				var lineResult = new Array();
				//判断非空
				if (notNull(lineData1) && notNull( lineName1)){
					queryStr=queryStr+','+getToArray(lineData1,lineName1);
				}
				
				if (notNull(lineData2) && notNull( lineName2)){
					queryStr=queryStr+','+getToArray(lineData2,lineName2);					
				}
				
				if (notNull(lineData3) && notNull( lineName3)){
					queryStr=queryStr+','+getToArray(lineData3,lineName3);					
				}
				
				if (notNull(lineData4) && notNull( lineName4)){
					queryStr=queryStr+','+getToArray(lineData4,lineName4);					
				}
				
				if (notNull(lineData5) && notNull( lineName5)){
					queryStr=queryStr+','+getToArray(lineData5,lineName5);					
				}
				
				if (notNull(lineData6) && notNull( lineName6)){
					queryStr=queryStr+','+getToArray(lineData6,lineName6);					
				}
				
				if (notNull(lineData7) && notNull( lineName7)){
					queryStr=queryStr+','+getToArray(lineData7,lineName7);					
				}
				
				if (notNull(lineData8) && notNull( lineName8)){
					queryStr=queryStr+','+getToArray(lineData8,lineName8);					
				}
				
				if (notNull(lineData9) && notNull( lineName9)){
					queryStr=queryStr+','+getToArray(lineData9,lineName9);					
				}
				
				if (notNull(lineData10) && notNull( lineName10)){
					queryStr=queryStr+','+getToArray(lineData10,lineName10);					
				}
				
				queryStr=queryStr+"}";	
			//console.log(queryStr);
				//queryStr=queryStr+',"'+lineName+'":'+lineResultStr+"}";								
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");				
				result = JSON.parse(queryStr);
			}
			// console.log(JSON.stringify(queryCriteria));

			return result;
		
		},
	
		getRowsIdToList : function(modelData) {
			var result = new Array();
			var columns = modelData.getColumnIDs().split(",");
			var rowDatas = modelData.datas.get();
			for (var i = 0; i < rowDatas.length; i++) {
				var map = {};
				var row = rowDatas[i];
				var queryStr = "{";
				for (var j = 0; j < columns.length; j++) {
					var v = modelData.getValue(columns[j], row);
					if (columns[j] === 'rowId') {
						v = encodeURIComponent(v);
						result.push(v === undefined || v === null || v === "null" ? '' : v);
					}
				}
			}
			return result;
		},
		getListToIdJson : function(rowIdList, idCol) {
			var result = [];
			if (rowIdList !== "") {
				var rowIdDatas = rowIdList.split(",");
				for (var i = 0; i < rowIdDatas.length; i++) {
					var map = {};
					var queryStr = "{";
					queryStr += '"' + idCol + '":"' + (rowIdDatas[i] === undefined || rowIdDatas[i] === null || rowIdDatas[i] === "null" ? '' : rowIdDatas[i]) + '"}';
					// 解决换行符影响
					queryStr = queryStr.replace("\n", "\\n");
					queryStr = queryStr.replace("\r", "\\r");
					map = JSON.parse(queryStr);
					result.push(map);
				}
			}
			return result;
		},
		getSiebelJson : function(modelData, langfields, userName, integrationId, ignorefields) {
			var result = [];
			modelData.each(function(param) {
				var firstRow = param.row;
				// var firstRow = modelData.getFirstRow();
				// if (firstRow != null) {
				var fieldObj = {};
				var columns = modelData.getColumnIDs().split(",");
				var fieldStr = "{";
				fieldStr += '"IntegrationId":"' + integrationId + '",';
				for (var i = 0; i < columns.length; i++) {
					if ($.inArray(columns[i], langfields) == -1 && $.inArray(columns[i], ignorefields) == -1) {
						var v = modelData.getValue(columns[i], firstRow);
						if(modelData.defCols[columns[i]].type == 'Date') { 
							if (v !== "" && v !== undefined && v !== null) {
								v = justep.Date.toString(v, "MM/DD/YYYY"); 
							}
						}
						fieldStr += '"' + columns[i] + '":"' + ((v === undefined || v === null || v === "null") ? '' : v) + '",';
					}
				}
				fieldStr += '"SysCreatedBy":"' + userName + '",';
				fieldStr += '"SysLastUpdatedBy":"' + userName + '"';
				fieldStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				fieldStr = fieldStr.replace("\n", "\\n");
				fieldStr = fieldStr.replace("\r", "\\r");
				fieldObj = JSON.parse(fieldStr);
				result.push(fieldObj);
				if (langfields.length > 0) {
					var langFieldStr = "{";
					langFieldStr += '"IntegrationId":"' + integrationId + '",';
					langFieldStr += '"Language":"' + messagehelper.get('siebel.langcode') + '",';
					for (var i = 0; i < langfields.length; i++) {
						var v = modelData.getValue(langfields[i], firstRow);
						if (langfields[i] == 'LangId') {
							langFieldStr += '"Id":"' + ((v === undefined || v === null || v === "null") ? '' : v) + '",';
						} else {
							langFieldStr += '"' + langfields[i] + '":"' + ((v === undefined || v === null || v === "null") ? '' : v) + '",';
						}
					}
					langFieldStr += '"SysCreatedBy":"' + userName + '",';
					langFieldStr += '"SysLastUpdatedBy":"' + userName + '"';
					langFieldStr += "}";
					langFieldStr = langFieldStr.replace("\n", "\\n");
					langFieldStr = langFieldStr.replace("\r", "\\r");
					var langFieldObj = JSON.parse(langFieldStr);
					result.push(langFieldObj);
				}
				// }
			});
			// console.log(JSON.stringify(queryCriteria));

			return result;
		},
		// For Company Segment only to deal with the org unit
		getCompanySegSiebelJson : function(modelData, orgUnits, userName, integrationId, ignorefields) {
			var result = [];
			modelData.each(function(param) {
				var firstRow = param.row;
				// var firstRow = modelData.getFirstRow();
				// if (firstRow != null) {
				var fieldObj = {};
				var columns = modelData.getColumnIDs().split(",");
				var fieldStr = "{";
				fieldStr += '"IntegrationId":"' + integrationId + '",';
				for (var i = 0; i < columns.length; i++) {
					if ($.inArray(columns[i], orgUnits) == -1 && $.inArray(columns[i], ignorefields) == -1) {
						var v = modelData.getValue(columns[i], firstRow);
						fieldStr += '"' + columns[i] + '":"' + ((v === undefined || v === null || v === "null") ? '' : v) + '",';
					}
				}
				fieldStr += '"SysCreatedBy":"' + userName + '",';
				fieldStr += '"SysLastUpdatedBy":"' + userName + '"';
				fieldStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				fieldStr = fieldStr.replace("\n", "\\n");
				fieldStr = fieldStr.replace("\r", "\\r");
				fieldObj = JSON.parse(fieldStr);
				fieldObj.rows = [];
				if (orgUnits.length > 0) {
					var count = 1;
					for (var i = 0; i < orgUnits.length; i++) {
						if (orgUnits[i] == 'OrganizationCode') {
							var orgUnitRowIds = modelData.getValue("OrgUnitRowIds", firstRow);
							var orgUnitCode = modelData.getValue(orgUnits[i], firstRow);
							if (orgUnitCode !== "" && orgUnitCode !== undefined && orgUnitCode !== "null") {
								var orgUnitRowIdDatas = orgUnitRowIds.split(",");
								var orgUnitCodeDatas = orgUnitCode.split(",");
								for (var i = 0; i < orgUnitCodeDatas.length; i++) {
									var langFieldStr = "{";
									var type = "ApplyUnit";
									langFieldStr += '"IntegrationId":"' + integrationId + '",';
									langFieldStr += '"Type":"' + type + '",';
									langFieldStr += '"Id":"'
											+ ((orgUnitRowIdDatas[i] === undefined || orgUnitRowIdDatas[i] === '' || orgUnitRowIdDatas[i] === null || orgUnitRowIdDatas[i] === "null") ? count++
													: orgUnitRowIdDatas[i]) + '",';
									langFieldStr += '"OrganizationId":"' + orgUnitCodeDatas[i] + '",';
									langFieldStr += '"SysCreatedBy":"' + userName + '",';
									langFieldStr += '"SysLastUpdatedBy":"' + userName + '"';
									langFieldStr += "}";
									langFieldStr = langFieldStr.replace("\n", "\\n");
									langFieldStr = langFieldStr.replace("\r", "\\r");
									var langFieldObj = JSON.parse(langFieldStr);
									fieldObj.rows.push(langFieldObj);
								}
							}
						}
					}
				}
				result.push(fieldObj);
				// }
			});
			// console.log(JSON.stringify(queryCriteria));
			return result;
		},
		getSBUSegSiebelJson : function(applyLineDataModel,applyLineChildDataModel, userName, integrationId) {
			var result = [];
			applyLineDataModel.each(function(param) {
				var currentRow = param.row;
				var fieldObj = {};
				var columns = applyLineDataModel.getColumnIDs().split(",");
				var fieldStr = "{";
				fieldStr += '"IntegrationId":"' + integrationId + '",';
				for (var i = 0; i < columns.length; i++) {
						var v = applyLineDataModel.getValue(columns[i], currentRow);
						fieldStr += '"' + columns[i] + '":"' + ((v === undefined || v === null || v === "null") ? '' : v) + '",';
				}
				fieldStr += '"SysCreatedBy":"' + userName + '",';
				fieldStr += '"SysLastUpdatedBy":"' + userName + '"';
				fieldStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				fieldStr = fieldStr.replace("\n", "\\n");
				fieldStr = fieldStr.replace("\r", "\\r");
				fieldObj = JSON.parse(fieldStr);
				fieldObj.childs = [];
				
				var childCount = applyLineChildDataModel.count();
				if (childCount > 0) {  //是否有关联的子数据			
					applyLineChildDataModel.each(function(param) {
						var currentChildRow = param.row;
						if(currentChildRow.val('ParentRowId') == currentRow.val('Id')){
							var fieldChildObj = {};
							var columns = applyLineChildDataModel.getColumnIDs().split(",");
							var fieldChildStr = "{";
							fieldChildStr += '"IntegrationId":"' + integrationId + '",';
							for (var i = 0; i < columns.length; i++) {				
									var v = applyLineChildDataModel.getValue(columns[i], currentChildRow);
									if(columns[i] != "ParentRowId"){
										fieldChildStr += '"' + columns[i] + '":"' + ((v === undefined || v === null || v === "null") ? '' : v) + '",';	
									}
							}
							fieldChildStr += '"SysCreatedBy":"' + userName + '",';
							fieldChildStr += '"SysLastUpdatedBy":"' + userName + '"';
							fieldChildStr += "}";
							// console.log(queryStr);
							// 解决换行符影响
							fieldChildStr = fieldChildStr.replace("\n", "\\n");
							fieldChildStr = fieldChildStr.replace("\r", "\\r");
							fieldChildObj = JSON.parse(fieldChildStr);
							fieldObj.childs.push(fieldChildObj);
							
						}						
					});
					// ===========
				}
				
				result.push(fieldObj);
				// }
			});
			// console.log(JSON.stringify(queryCriteria));
			return result;
		},
		
		/**
		 * 更新data相应列的值
		 * @data 待搜索的data对象
		 * @data 待更新data对象		
		 * @updateFields 要更新的列
		 * @return 
		 */
		updateDataField: function(data, updateData, updateFields) {			
			var searchData, row, updateRow;
			
			for (var i=0, len=updateFields.length; i<len; i++) {
				updateRow = updateFields[i]; 
				searchData = updateRow.data ? updateRow.data:data;				
				row = searchData.find(updateRow.fields, updateRow.values, true);		// 返回第一条数据  
				
				if (row.length > 0) {
					updateData.setValue(updateRow.toField, row[0].val(updateRow.fromField));								
				}
			}					
		}
	};
	//判断非空
	function notNull(string){		
		return "" !=string  && null !=string ? true : false ;
	};
	//data转换成Array
	function getToArray(lineData,lineName){
		var lineStr;
		var lineResultStr="[";
		var columns = lineData.getColumnIDs().split(",");
		var rowDatas = lineData.datas.get();
		for (var i = 0; i < rowDatas.length; i++) {
			//var map = {};
			var row = rowDatas[i];
			var str = "{";
			for (var j = 0; j < columns.length; j++) {
				var v = lineData.getValue(columns[j], row);
				str += '"' + columns[j] + '":"' + (v === undefined || v === null || v === "null" ? '' : v) + '",';
			}
			str = (str.slice(str.length - 1) === ',') ? str.slice(0, -1) : str;
			str += "}";
			// console.log(str);									
			lineResultStr=lineResultStr+str;
			if(i<(rowDatas.length-1)){
				lineResultStr=lineResultStr+',';
			}					
		}				
		lineResultStr=lineResultStr+"]";	
		lineStr = '"'+lineName+'":'+lineResultStr;
		return lineStr;
	};
	
});