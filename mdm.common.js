jQuery.fn.extend({
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
});

jQuery.extend({
	/**
	 * event grid单元格渲染事件对象 renderColName 需要渲染成链接的列的名称
	 * 
	 * 案例：
	 */
	renderGirdColumn : function(event, param) {
		debugger;
		var columns = param.column;
		var directActions = param.directAction;
		for (var index in columns) {
			if(columns[index] && directActions[index]){
				event.html = "<a href='#' class='mdm-grid-cell-a "+directActions[index]+" '>" + columns[index] + "</a>";
			}
		}
	}
});
