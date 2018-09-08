define(['require', 'jquery'], function (require, $) {
    var objQueryUtil = {};

    /**
     * 生成查询控件的Dom节点
     * function genHtmlDom(objQueryContainer,options)
     * @param {Object} objQueryContainer 查询控件容器
     * @param {JSON} options 自定义的控件样式
     * @return {Object} 查询控件容器
     */
    objQueryUtil.genHtmlDom = function (objQueryContainer,options) {

        /*  <div class="input-group crm-search" >
         <div class="input-group-addon" >
         <span class="glyphicon glyphicon-search" aria-hidden="true" />
         </div>
         <input type="text" class="form-control" placeholder="Search..." />
         </div>*/
        var defaultParam = {
            inputGroupDomClass : 'jrsm-search',
            searchLabelClass : 'jrsm-search-label',
            inputClass : 'jrsm-search-input'
        };
        options = $.extend(defaultParam,options);

        $(objQueryContainer).append();
        //1. 生成inputGroup的Dom节点
        var inputGroupDom = $(' <div class="input-group mdm-search" />');
        inputGroupDom.addClass(options.inputGroupDomClass);
        //2. 生成查询标签的Dom节点
        var searchLabelDom = $('<div class="input-group-addon" > <span class="glyphicon glyphicon-search" /></div>');
        searchLabelDom.addClass(options.searchLabelClass);
        //3. 生成查询输入框的Dom节点
        var searchInputDom = $('<input type="text" class="form-control" placeholder="Search..." />');
        searchInputDom.addClass(options.inputClass);
        //4. 构造查询控件
        inputGroupDom.append(searchLabelDom).append(searchInputDom);
        //5. 将查询控件插入容器中
        objQueryContainer.append(inputGroupDom);
        //6. 增加左边间隙
        objQueryContainer.css({'padding-left':'3px'});
       return objQueryContainer;
    };





    /**
     * 在searchDom元素上根据arrCols在grid上查询数据
     * function enableSearch(arrCols,grid,searchDom);
     * @param {Array} arrCols 需要查询的列的集合（类型为字符串）
     * @param {Object} grid 该变量存放的是wex5的grid控件的对象
     * @param {Object} searchDom 在该DOM元素上应用查询功能
     * @param {Function} callback 可选 控件刷新后，回调函数
     */
    objQueryUtil.enableSearch = function(arrCols,grid,searchDom,callback) {
        //1.如果没有arrCols参数时，将arrCols设置为grid的列模型
        if(arguments.length == 2 || arrCols == null) {
            var colModel = grid.$domNode.data("config").colModel;
            //rowId的正则表达式
            var regExp = /row[.]*id/i;
            arrCols = $.map(colModel,function(col) {
                if(regExp.test(col.name)) {
                    return null;
                }
                return col.name;
            });
        }
        //2.为searchDom中的input元素添加change事件
        var domInput = $(searchDom).find('input:first');
        $(domInput).on('input',function() {
            // 1. 获取input中的值
            var val = $(this).val().trim() + "";
            // 2. 如果input中没有值或为空字符串
            if (val == "") {
                grid.setFilter("");
                grid.refresh();
                return;
            }
            // 3. 设置过滤器
            //过滤器格式： /\(/i.test($row.val("destinationEnuName")) || /\(/i.test($row.val("forwarderName")) || /\(/i.test($row.val("carrierName"))
            //特殊字符的正则表达式
            var regExpSpecial = /([\\\^\$\*\+\?\{\}\[\]\.\(\)\|])/g;
            //在特殊字符前面加上\进行转义
            val = val.replace(regExpSpecial,'\\$1');
            var pattern = new RegExp(val,'i').toString();
            var filter = $.map(arrCols, function(colName) {
                var filterSlice = pattern+'.test($row.val("' + colName + '")==(null||undefined)?"":$row.val("' + colName + '"))';
                return filterSlice;
            }).join(" || ");
            grid.setFilter(filter);
            grid.refresh();
            //4. 调用回调函数
            if(typeof callback != 'undefined' && callback instanceof Function) {
            	callback();
            }
        });
    };
    
    
    /**
     * 获取查询所有列的filter
     */
    objQueryUtil.getSearchAllFilterStr = function(arrCols,grid,searchDom) {
        //1.如果没有arrCols参数时，将arrCols设置为grid的列模型
        if(arguments.length == 2 || arrCols == null) {
            var colModel = grid.$domNode.data("config").colModel;
            //rowId的正则表达式
            var regExp = /row[.]*id/i;
            arrCols = $.map(colModel,function(col) {
                if(regExp.test(col.name)) {
                    return null;
                }
                return col.name;
            });
        }
        //2.为searchDom中的input元素添加change事件
        var domInput = $(searchDom).find('input:first');
            // 1. 获取input中的值
            var val = domInput.val().trim() + "";
            // 2. 如果input中没有值或为空字符串
            if (val == "") {
                return;
            }
            // 3. 设置过滤器
            //过滤器格式： /\(/i.test($row.val("destinationEnuName")) || /\(/i.test($row.val("forwarderName")) || /\(/i.test($row.val("carrierName"))
            //特殊字符的正则表达式
            var regExpSpecial = /([\\\^\$\*\+\?\{\}\[\]\.\(\)\|])/g;
            //在特殊字符前面加上\进行转义
            val = val.replace(regExpSpecial,'\\$1');
            var pattern = new RegExp(val,'i').toString();
            var filter = $.map(arrCols, function(colName) {
                var filterSlice = pattern+'.test($row.val("' + colName + '")==(null||undefined)?"":$row.val("' + colName + '"))';
                return filterSlice;
            }).join(" || ");
        return "("+filter+")";
    };
    
    
    /**
     * 多个查询框
     */
    objQueryUtil.moreSearchs = function(objQueryContainers,grid,arrCols) {
    		var me = this;
    	objQueryContainers = $.map(objQueryContainers,function(objQueryContainer){
    			return me.genHtmlDom(objQueryContainer);
    		});
    	this.moreSearchDoms(arrCols,grid,objQueryContainers);
    };
    
    objQueryUtil.moreSearchDoms = function(arrCols,grid,searchDoms) {
        //1.如果没有arrCols参数时，将arrCols设置为grid的列模型
        if(arguments.length == 2 || arrCols == null) {
            var colModel = grid.$domNode.data("config").colModel;
            //rowId的正则表达式
            var regExp = /row[.]*id/i;
            arrCols = $.map(colModel,function(col) {
                if(regExp.test(col.name)) {
                    return null;
                }
                return col.name;
            });
        }
        //2.为searchDom中的input元素添加change事件
        $.map(searchDoms,function(searchDom){
        	var domInput = $(searchDom).find('input:first');
        	
            $(domInput).on('input',function() {
                // 1. 获取input中的值
            	var filterCn =$.map(searchDoms,function(searchCn){
		        		 var inputCn = $(searchCn).find('input:first');
		        		 var valCn = inputCn.val().trim()+"";
		        		 if (valCn == "") {
		                     return;
		                 }
		        		 var regExpSpecial = /([\\\^\$\*\+\?\{\}\[\]\.\(\)\|])/g;
		                 //在特殊字符前面加上\进行转义
		        		 valCn = valCn.replace(regExpSpecial,'\\$1');
		                 var patternCn = new RegExp(valCn,'i').toString();
		                 var searchCnName = searchCn.selector;
	                	 if(searchCnName.indexOf("searchAll")!=-1){
	                		 //全部字段查询
	                		var allstrfilter = objQueryUtil.getSearchAllFilterStr(null,grid,searchCn);
	                		return allstrfilter;
	                	 }
		                 var filterMap=  $.map(arrCols,function(colCn){
		                	 if(searchCnName.indexOf(colCn)!=-1){
		                		 var filterSliceCn = patternCn+'.test($row.val("' + colCn + '")==(null||undefined)?"":$row.val("' + colCn + '"))';
		                         return filterSliceCn;
		                	 }
		                  });
		                 return filterMap;
	        	 }).join(" && ");
                 grid.setFilter(filterCn);
                 grid.refresh();
                 //4. 调用回调函数
//                 if(typeof callback != 'undefined' && callback instanceof Function) {
//                 	callback();
//                 }
        });
        
           
        });
    };
    
    
    
    
    
    
    /**
     * 在页面生成客户端查询控件
     * function applySearch(objQueryContainer,grid,arrCols,options);
     * @param {Object} objQueryContainer 查询控件容器
     * @param {Object} grid 该变量存放的是wex5的grid控件的对象
     * @param {Array} arrCols 可选 需要查询的列的集合（类型为字符串）
     * @param {JSON} options 可选 自定义的控件样式
     * @param {Function} callback 可选 控件刷新后，回调函数
     */
    objQueryUtil.applySearch = function(objQueryContainer,grid,arrCols,options,callback){
        //1.参数自适应
    	if(arguments.length==4) {
    		if(arguments[2] instanceof Array){
    			if(arguments[3] instanceof Function) {
    				callback = arguments[3];
    				options = null;
    			} else {
    				callback = null;
    				options = arguments[3];
    			}
    		}else {
    			options = arguments[2];
    			callback = arguments[3];
    			arrCols = null;
    		}
    	} else if(arguments.length==3) {
        	if((arguments[2] instanceof Function)) {
            	callback = arguments[2];
            	arrCols = null;
            	options = null;
            } else if(!(arguments[2] instanceof Array)) {
                options = arguments[2];
                callback = null;
            	arrCols = null;
            }
        }else if(arguments.length == 2) {
            arrCols = null;
            options = null;
            callback = null;
        } 
        objQueryContainer = this.genHtmlDom(objQueryContainer,options);
        this.enableSearch(arrCols,grid,objQueryContainer,callback);
    };
    return objQueryUtil;
});