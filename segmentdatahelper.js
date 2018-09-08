define(function(require) {
	var global = require("$UI/portal/base/global");
	var datahelper = require("$UI/jrsm/js/datahelper");
	var justep = require("$UI/system/lib/justep");

	var simpleFormDate = function(date) {
		if (date !== "" && date !== undefined && date !== null) {
			// var dateString = justep.Date.toString(date, "MM/DD/YYYY");
			return justep.Date.toString(date, "MM/DD/YYYY");
		} else {
			return "";
		}

	};
	
	return {

		covertViewDataToSiebleData : function(data1, mapper, changeFlag, addFlag) {
			// data1 : the data which you need to covert to Sieble format,
			// mapper: datamap.js which define the map from view data and sieble
			// data
			// changeFlag: the flag to identify if a line is updated or not. if
			// not updated, just skip and not save to Sieble.
			// addFlag: the flag to indicate if the lines are all new add to
			// sieble, if it is, then replace the rowId with simple increasing
			// number
			// from count.
			var result = new Array();
			// var fieldMap = JSON.parse(mapper);
			var fieldMap = mapper;
			var count = 1;
			var columns = data1.getColumnIDs().split(",");
			data1.each(function(index) {
				var row = index.row;
				var map = {};
				if (changeFlag) {
					if (data1.getValue(changeFlag, row) !== "1") {
						return true;
					}
				}
				var queryStr = "{";
				$.each(columns, function(i, item) {
					if (fieldMap[item] !== null && fieldMap[item] !== "" && fieldMap[item] !== undefined) {
						var value = data1.getValue(item, row);
						if (data1.defCols[columns[i]].type == 'Date' /*fieldMap[item] === "ValidTo" || fieldMap[item] === "ValidFrom" || fieldMap[item] === "ApplyDate" || fieldMap[item] === "SuggestValidTo"
							|| fieldMap[item] === "PValidTo" || fieldMap[item] === "PValidFrom" || fieldMap[item] === "PApplyDate" || fieldMap[item] === "PSuggestValidTo"*/) {
							var dateString = simpleFormDate(value);
							queryStr += '"' + fieldMap[item] + '":"' + (dateString === undefined ? '' : dateString) + '",';
						} else if (fieldMap[item] === "Id") {
							if (addFlag) {
								queryStr += '"' + fieldMap[item] + '":"' + count++ + '",';
							} else {
								queryStr += '"' + fieldMap[item] + '":"' + ((value === undefined || value === "" || value === null) ? count++ : value) + '",';
							}
						} else {
							queryStr += '"' + fieldMap[item] + '":"' + (value === undefined ? '' : value) + '",';
						}
					}
				});
				queryStr = (queryStr.slice(queryStr.length - 1) == ',') ? queryStr.slice(0, -1) : queryStr;
				queryStr += "}";
				// console.log(queryStr);
				// 解决换行符影响
				queryStr = queryStr.replace("\n", "\\n");
				queryStr = queryStr.replace("\r", "\\r");
				console.log("queryStr: " + queryStr);
				map = JSON.parse(queryStr);
				result.push(map);
			});
			console.log("siebel data result:" + result);
			return result;
		},

		getSegmentApplySiebelData : function(applyHeadDataModel, applyLineDataModel, userName, integrationId) {
			var result = {};
			var applyHeadDataArray = datahelper.getSiebelJson(applyHeadDataModel, [], userName, integrationId);
			var applyLineDataArray = datahelper.getSiebelJson(applyLineDataModel, [], userName, integrationId);
			var MideaApplyLine = [];
			$.each(applyLineDataArray, function(i, item) {
				MideaApplyLine.push(item);
			});
			applyHeadDataArray[0].ListOfMideaApplyLine = {};
			applyHeadDataArray[0].ListOfMideaApplyLine.MideaApplyLine = MideaApplyLine;
			var MideaApplyHead = [];
			MideaApplyHead.push(applyHeadDataArray[0]);
			result.ListOfMideaApply = {};
			result.ListOfMideaApply.MideaApplyHead = MideaApplyHead;
			return result;

		},

		getCompSegmentApplySiebelData : function(applyHeadDataModel, applyLineDataModel, userName, integrationId) {
			var result = {};
			var applyHeadDataArray = datahelper.getSiebelJson(applyHeadDataModel, [], userName, integrationId);
			var applyLineDataArray = datahelper.getCompanySegSiebelJson(applyLineDataModel, [ "OrganizationCode" ], userName, integrationId);
			var MideaApplyLine = [];
			$.each(applyLineDataArray, function(i, item) {
				var rows = item.rows;
				var MideaEntityOrganization = [];
				$.each(rows, function(i, orgItem) {
					MideaEntityOrganization.push(orgItem);
				});
				item.ListOfMideaEntityOrganization = {};
				item.ListOfMideaEntityOrganization.MideaEntityOrganization = MideaEntityOrganization;
				delete item.rows;
				delete item.OrgUnitRowIds;
				MideaApplyLine.push(item);
			});
			applyHeadDataArray[0].ListOfMideaApplyLine = {};
			applyHeadDataArray[0].ListOfMideaApplyLine.MideaApplyLine = MideaApplyLine;
			var MideaApplyHead = [];
			MideaApplyHead.push(applyHeadDataArray[0]);
			result.ListOfMideaApply = {};
			result.ListOfMideaApply.MideaApplyHead = MideaApplyHead;
			return result;

		},
		getSBUSegmentApplySiebelData : function(applyHeadDataModel, applyLineDataModel,applyLineChildDataModel, userName, integrationId){
			var result = {};
			var applyHeadDataArray = datahelper.getSiebelJson(applyHeadDataModel, [], userName, integrationId);
			var applyLineDataArray = datahelper.getSBUSegSiebelJson(applyLineDataModel,applyLineChildDataModel, userName, integrationId);
			var MideaApplyLine = [];
			$.each(applyLineDataArray, function(i, item) {
				var childs = item.childs;
				var MideaApplyLineChild = [];
				$.each(childs, function(i, child) {
					MideaApplyLineChild.push(child);
				});
				item.ListOfMideaApplyLineChild = {};
				item.ListOfMideaApplyLineChild.MideaApplyLineChild = MideaApplyLineChild;
				delete item.childs;
//				delete item.OrgUnitRowIds;
				MideaApplyLine.push(item);
			});
			applyHeadDataArray[0].ListOfMideaApplyLine = {};
			applyHeadDataArray[0].ListOfMideaApplyLine.MideaApplyLine = MideaApplyLine;
			var MideaApplyHead = [];
			MideaApplyHead.push(applyHeadDataArray[0]);
			result.ListOfMideaApply = {};
			result.ListOfMideaApply.MideaApplyHead = MideaApplyHead;
			return result;
		},
		getEntityStringForSegment : function(constant, dataMode, col, fn) {
			var param = {
				constant : constant,
				codeIndex : 4
			};
			var result;
			global.ajax({
				url : "/mdm/ptSegmentV/getEntity",
				data : param,
				async : false,
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						result = resultData.data;
						if (dataMode && col) {
							dataMode.setValue(col, result, dataMode.getCurrentRow());
						}
						if (typeof (fn) === "function") {
							fn.call(this, null);
						}
					}
				}
			});
		},

		getCodeStringForSegment : function(constant, codeIndex, dataMode, col, fn) {
			var param = {
				constant : constant,
				codeIndex : codeIndex
			};
			var result;
			global.ajax({
				url : "/mdm/ptSegmentV/getSegmentCode",
				data : param,
				async : false,
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						result = resultData.data;
						if (dataMode && col) {
							dataMode.setValue(col, result, dataMode.getCurrentRow());
						}
						if (typeof (fn) === "function") {
							fn.call(this, null);
						}
					}
				}
			});

		},

		getCodesForSegment : function(paramList, codeIndex, dataMode, col, fn) {
			// var param = {constant:constant};
			var result;
			var queryData = {
				constantParam : paramList,
				codeIndex : codeIndex
			};
			global.ajax({
				url : "/mdm/ptSegmentV/getSegmentCodes",
				data : queryData,
				async : false,
				success : function(resultData) {
					if (resultData && resultData.__statusCode == 'S') {
						result = resultData.data;
						if (result.length > 0) {
							$.each(result, function(index, element) {
								var rowId = element.rowId;
								var code = element.code;
								for (var i = 0; i < col.length; i++) {
									dataMode.setValue(col[i], code, dataMode.getRowByID(rowId));
								}
							});
						}

						if (typeof (fn) === "function") {
							fn.call(this, null);
						}
					}
				}
			});
		},

		getAccountSiebelJson : function(headData, lineData, userName, integrationId) {

			var result = {};
			var headDataSiebelJson = datahelper.getSiebelJson(headData, [], userName, integrationId);
			var lineDataSiebelJson = datahelper.getSiebelJson(lineData, [], userName, integrationId);
			var MideaAccountSubject = [];
			$.each(lineDataSiebelJson, function(i, item) {
				MideaAccountSubject.push(item);
			});

			headDataSiebelJson[0].ListOfMideaAccountSubject = {};
			headDataSiebelJson[0].ListOfMideaAccountSubject.MideaAccountSubject = MideaAccountSubject;
			var MideaAccountSet = [];
			MideaAccountSet.push(headDataSiebelJson[0]);
			result.ListOfMideaAccountSet = {};
			result.ListOfMideaAccountSet.MideaAccountSet = MideaAccountSet;
			
			return result;
		},
		checkCostcenterExist : function(orgCode, code) {
			var resultFlag = false;
			if (orgCode !== "" && orgCode !== undefined && code !== "" && code !== undefined) {
				var queryData = {
					orgCode : orgCode,
					accountUnitCode : code
				};
				global.ajax({
					url : "/mdm/ptSegmentV/checkCostcenterSegExist",
					data : queryData,
					async : false,// 只能同步
					success : function(resultData) {
						if (resultData.__statusCode == 'S') {
							resultFlag = resultData.data;
						}
					}
				});
			}
			return resultFlag;
		},
		
		fromatDateFromString : function(str) {
			if (str !== "" && str !== undefined && str !== null) {
				// var dateString = justep.Date.toString(date, "MM/DD/YYYY");
				return new Date(str);
			} else {
				return str;
			}
		},
		
		/**Generate the string like "1,2,3,4" to a value string from a map which retrieved from DB. 
		   Then insert the result into targetCol in the data.
		 */
		populateAccountUnitTypeValue : function(modelData, sourceCol, targetCol, jsonArray) {
			if(modelData) {
				if(modelData.count() > 0) {
					modelData.each(function(param){
						var result = "";
						var perRow = param.row;
						var sourceValue = perRow.val(sourceCol);
						if(sourceValue !== "" && sourceValue !== undefined && sourceValue !== null) {
							var sourceValueArray = sourceValue.split(",");
							for(var i = 0; i < sourceValueArray.length; i++) {
								var matchFlag = false;
								for(var j = 0; j < jsonArray.length; j++) {
									if(sourceValueArray[i] === jsonArray[j].code) {
										matchFlag = true;
										result += jsonArray[j].value + ",";
										break;
									}
									if(j === jsonArray.length -1) {
										if(!matchFlag){
											result += sourceValueArray[i] + ",";
										}
									}
								}
							}
							result = (result.slice(result.length - 1) === ',') ? result.slice(0, -1) : result;
						}
						modelData.setValue(targetCol, result, perRow);
					});
				}
			}
		},
	};

});