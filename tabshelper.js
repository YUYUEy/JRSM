define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var messagehelper = require("$UI/jrsm/js/message");
	require("$UI/jrsm/js/scrollSettings");

	var closeTabs = function(parentDOM, id) {
		// 如果关闭的是当前激活的TAB，激活他的前一个TAB
		if ($("li[role=presentation].active", parentDOM).attr('id') == "tab_" + id) {
			var currTab = $("#tab_" + id, parentDOM);
			var currContent = $("#tab" + id, parentDOM);
			if (currTab.prev() && currContent.prev() && currTab.prev().length > 0 && currContent.prev().length > 0) {
				// currTab.prev().addClass('active');
				// currContent.prev().addClass('active');
				$(currTab.prev().children("a").get(0)).tab('show');
			} else if (currTab.next() && currContent.next() && currTab.next().length > 0 && currContent.next().length > 0) {
				// currTab.next().addClass('active');
				// currContent.next().addClass('active');
				$(currTab.next().children("a").get(0)).tab('show');
			} else {
				// 没有兄弟节点可取，关闭窗口在More里面则取顶层最后一个，关闭窗口在More外面则取More里面第一个
				var activeTab;
				if ($("li[role=presentation].active", parentDOM).parent().attr('role') == "menu") {
					activeTab = $("li.dropdown", parentDOM).prev();
				} else if ($('ul[role=menu]', parentDOM).length > 0) {
					activeTab = $('ul[role=menu]', parentDOM).children().first();
					// $(".dropdown", parentDOM).addClass('active');
				}
				if (activeTab && activeTab.length > 0) {
					// activeTab.addClass('active');
					// var contentid = activeTab.attr('id').split('_')[1];
					// $("#tab" + contentid, parentDOM).addClass('active');
					$(activeTab.children("a").get(0)).tab('show');
				}
			}
		}
		// 关闭TAB
		$("#tab_" + id, parentDOM).remove();
		$("#tab" + id, parentDOM).remove();

		// More下面没有子时候删除
		var moreNode = $("li.dropdown", parentDOM);
		if (moreNode.length > 0) {
			var $tablist = $('ul[role=menu]', parentDOM);
			if ($tablist.children().length === 0) {
				$("li.dropdown", parentDOM).remove();
			}
		}
	};

	return {
		insertTab : function(options) {
			var tabsMaxNum = 5;
			var defaults = {
				// 各种属性、参数
				parentDOM : {}, // 必须--tab控件的父元素jquery对象，用于区分页面不同的Tab控件
				title : '', // 非必须 -- 页签名称
				content : '', // 非必须-- 需要显示的HTML内容，如果不设置，取url跳转
				url : '', // 非必须 -- 需要跳转的页面路径
				close : false,
				show : function(e) {
				},
				shown : function(e) {
				}
			// 是否允许关闭
			};
			var params = $.extend(defaults, options);

			if (!params.parentDOM)
				return null;
			var $tablist = $('ul[role=tablist]', params.parentDOM);
			var $tabcontent = $('div.tab-content', params.parentDOM);
			// 计算窗口数
			var num = $("li[role=presentation]", params.parentDOM).length;
			if ($('ul[role=menu]', params.parentDOM).length > 0) {
				num = num - $('ul[role=menu]', params.parentDOM).children().length;
			}
			var uuid = justep.UUID.createUUID();
			var title = '<li role="presentation" id="tab_' + uuid + '"><a href="#tab' + uuid + '" content="tabContent' + uuid + '" role="tab" data-toggle="tab" style="cursor:pointer">' + params.title;
			if (params.close) {
				title += ' <i class="icon-close-round" tabclose="' + uuid + '"></i>';
			}
			title += '</a></li>';
			var content = '';
			if (params.content && params.content.length > 0) {
				content = '<div role="tabpanel" class="tab-pane" id="tab' + uuid + '" xid="tabContent' + uuid + '">' + params.content + '</div>';
			} else {// 没有内容，使用IFRAME打开链接
				var lang = messagehelper.currentLang();
				if (params.url.indexOf('?') >= 0) {
					params.url += ("&language=" + lang);
				} else {
					params.url += ("?language=" + lang);
				}
				content = '<div role="tabpanel" class="tab-pane" id="tab' + uuid + '" style="height:100%"><iframe src="' + require.toUrl(params.url)
						+ '" width="100%" height="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>';
			}
			// 加入TABS
			if (num && num >= tabsMaxNum) {
				var moreNode = $("li.dropdown", params.parentDOM);
				if (moreNode.length > 0) {
					$tablist = $('ul[role=menu]', params.parentDOM);
					$(title).appendTo($tablist);
				} else {
					var moreMenu = '<li class="dropdown"><a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown">' + messagehelper.get('tabs.more') + '<b class="caret"></b></a>'
							+ '<ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">' + title + '</ul></li>';
					$(moreMenu).appendTo($tablist);
				}
				$(content).appendTo($tabcontent);
			} else {
				if (num === 0) {
					$(title).appendTo($tablist);
					$(content).appendTo($tabcontent);
				} else {
					$(title).insertAfter($tablist.children()[num - 1]);
					$(content).insertAfter($tabcontent.children()[num - 1]);
				}
			}

			$('a[data-toggle="tab"]', params.parentDOM).on('show.bs.tab', function(e) {
				params.show(e);
			});
			$('a[data-toggle="tab"]', params.parentDOM).on('shown.bs.tab', function(e) {
				var $tabcontent = $('div.tab-content', params.parentDOM);
				$.resizeScrollByObj($tabcontent);
				params.shown(e);
			});

			$('a[href="#tab' + uuid + '"]', params.parentDOM).tab('show');

			// 激活TAB
			var currTab = $("li.active", params.parentDOM);
			if (currTab.length > 0) {
				$("li.active", params.parentDOM).removeClass('active');
				$("div.active", params.parentDOM).removeClass('active');
			}
			// More下拉需要同时激活和打开
			if (num && num >= tabsMaxNum) {
				$(".dropdown", params.parentDOM).addClass('active');
				$(".dropdown", params.parentDOM).addClass('open');
			}
			$("#tab_" + uuid, params.parentDOM).addClass('active');
			$("#tab" + uuid, params.parentDOM).addClass("active");

			$.setNiceScrollByObj($tabcontent);
			$.resizeScrollByObj($tabcontent);

		},
		closeTabs : function(parentDOM, id) {
			closeTabs(parentDOM, id);
		},
		removeActive : function(parentDOM) {
			var currTab = $("li[role=presentation].active", parentDOM);
			if (currTab && currTab.length > 0) {
				var contentid = currTab.attr('id').split('_')[1];
				closeTabs(parentDOM, contentid);
			}
		},
		addCloseListener : function(parentDOM) {
			$(".nav-tabs", parentDOM).on("click", "[tabclose]", function(e) {
				var id = $(this).attr("tabclose");
				closeTabs(parentDOM, id);
			});
		}
	};
});