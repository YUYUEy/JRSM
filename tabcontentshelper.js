define(function(require) {
	var justep = require("$UI/system/lib/justep");
	var messagehelper = require("$UI/jrsm/js/message");
	var dialoghelper = require("$UI/jrsm/js/dialoghelper");
	var global = require("$UI/portal/base/global");
	require("$UI/jrsm/js/scrollSettings");
	var utils = require("$UI/system/components/justep/common/utils");
	var tabsMaxNum = 5;

	var closeTabs = function(parentDOM, id, contentsComp) {
		// 如果关闭的是当前激活的TAB，激活他的前一个TAB
		if ($("li[role=presentation].active", parentDOM).attr('id') == "tab_" + id) {
			var currTab = $("#tab_" + id, parentDOM);
			if (currTab.prev() && currTab.prev().length > 0) {
				$(currTab.prev().children("a").get(0)).tab('show');
			} else if (currTab.next() && currTab.next().length > 0) {
				$(currTab.next().children("a").get(0)).tab('show');
			} else {
				// 没有兄弟节点可取，关闭窗口在More里面则取顶层最后一个，关闭窗口在More外面则取More里面第一个
				var activeTab;
				if ($("li[role=presentation].active", parentDOM).parent().attr('role') == "menu") {
					activeTab = $("li.dropdown", parentDOM).prev();
				} else if ($('ul[role=menu]', parentDOM).length > 0) {
					activeTab = $('ul[role=menu]', parentDOM).children().first();
				}
				if (activeTab && activeTab.length > 0) {
					$(activeTab.children("a").get(0)).tab('show');
				}
			}
		}

		// 关闭TAB
		$("#tab_" + id, parentDOM).remove();
		var index = contentsComp.getIndexByXid(id);
		contentsComp.remove(index, -1);

		// 刷新tab的位置
		// 计算窗口数(num为More之外的Tab数量)
		var num = $("li[role=presentation]", parentDOM).length; // num包含了More页签的计数
		var moreMenu = 0;
		if ($('ul[role=menu]', parentDOM).length > 0) {
			moreMenu = $('ul[role=menu]', parentDOM).children().length;
		}
		if (moreMenu > 0 && num - 1 - moreMenu < tabsMaxNum) {
			var $tablist = $('ul[role=tablist]', parentDOM);
			$($('ul[role=menu]', parentDOM).children()[0]).insertAfter($tablist.children()[tabsMaxNum - 2]); // 插入在倒数第二的位置，More前面
		}

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
			var defaults = {
				// 各种属性、参数
				contentsComp : {}, // 必须 -- contents控件的wex5对象
				parentDOM : {}, // 必须--tab控件的父元素jquery对象，用于区分页面不同的Tab控件
				title : '', // 必须 -- 页签名称
				url : '', // 必须 -- 需要跳转的页面路径
				close : false,
				show : function(e) {
				},
				shown : function(e) {
				}
			// 是否允许关闭
			};
			var params = $.extend(defaults, options);
debugger
			if (!params.parentDOM)
				return null;

			var turl;
			var flag = false;
			$("li[role=presentation]").each(function(index) {
				turl = $(this).children().attr('url');
				
				var curUrl=params.url;
				if(options.noparam)
				{
					
					turl=turl.substring(0,turl.indexOf("?"));
					curUrl=params.url.substring(0,params.url.indexOf("?"));
				}
				
				if (turl == curUrl) {
					flag = true;
					var id = $($(this)[0]).attr("id");
					var contentId;
					if (id) {
						contentId = id.split("_")[1];
					}
					$('#' + id, params.parentDOM).tab('show');
					params.contentsComp.to(contentId);
					if(options.noparam)
					{
						
						utils.loadContent(params.contentsComp, justep.UUID.createUUID(), require.toUrl(options.url));
					}
				}
				
				
			});
			if (flag) {
				return;
			}

			var $tablist = $('ul[role=tablist]', params.parentDOM);
			// 计算窗口数(num为More之外的Tab数量)
			var num = $("li[role=presentation]", params.parentDOM).length;
			if ($('ul[role=menu]', params.parentDOM).length > 0) {
				num = num - $('ul[role=menu]', params.parentDOM).children().length;
			}
			var uuid = justep.UUID.createUUID();
			var title = '<li role="presentation" id="tab_' + uuid + '"><a href="#tabcontet" url="' + params.url + '" content="' + uuid + '" role="tab" data-toggle="tab" style="cursor:pointer">'
					+ params.title;
			if (params.close) {
				title += ' <i class="icon-close-round" tabclose="' + uuid + '"></i>';
			}
			title += '</a></li>';

			// 加入TABS
			if (num && num >= tabsMaxNum) {
				var lastTab = $tablist.children()[tabsMaxNum - 1]; // 获取外围最后一个Tab
				$(title).insertAfter($tablist.children()[tabsMaxNum - 2]);// 添加新增Tab到最后
				var moreNode = $("li.dropdown", params.parentDOM);
				if (moreNode.length > 0) {
					// 存在More
					$tablist = $('ul[role=menu]', params.parentDOM);
				} else {
					// 不存在More
					var moreMenu = '<li class="dropdown"><a href="#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown">' + messagehelper.get('tabs.more') + '<b class="caret"></b></a>'
							+ '<ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1"></ul></li>';
					$(moreMenu).appendTo($tablist);
					$tablist = $('ul[role=menu]', params.parentDOM);
				}
				$(lastTab).appendTo($tablist); // 获取外围最后一个Tab到More菜单中,添加到最后
			} else {
				if (num === 0) {
					$(title).appendTo($tablist);
				} else {
					$(title).insertAfter($tablist.children()[num - 1]);
				}
			}
			
			utils.loadContent(params.contentsComp, uuid, require.toUrl(params.url));

			$('a[data-toggle="tab"]', params.parentDOM).on('show.bs.tab', function(e) {
				params.show(e);
			});
			$('a[data-toggle="tab"]', params.parentDOM).on('shown.bs.tab', function(e) {
				var contentID = $(e.target).attr('content');
				params.contentsComp.to(contentID);
				if ($(e.target).parent().parent().attr('role') === "menu") {
					// 激活More的Tab需要放到外围
					var curTab = $(e.target).parent(); // 当前激活Tab的li元素
					var $tablist = $('ul[role=tablist]', params.parentDOM);
					var lastTab = $tablist.children()[tabsMaxNum - 1]; // 获取外围最后一个Tab
					curTab.insertAfter($tablist.children()[tabsMaxNum - 2]);// 添加激活Tab到最后
					$(".dropdown", params.parentDOM).removeClass('active');
					$(".dropdown", params.parentDOM).removeClass('open');
					$tablist = $('ul[role=menu]', params.parentDOM);
					$(lastTab).appendTo($tablist); // 获取外围最后一个Tab到More菜单中,添加到最后
				}
				// 刷新tabcontent滚动条
				var $tabcontent = $('div.tab-content', params.parentDOM);
				$.resizeScrollByObj($tabcontent);
				params.shown(e);
			});

			$('a[href="#tab' + uuid + '"]', params.parentDOM).tab('show');
			params.contentsComp.to(uuid);

			// 关闭已激活TAB
			var currTab = $("li[role='presentation'].active", params.parentDOM);
			if (currTab.length > 0) {
				$("li[role='presentation'].active", params.parentDOM).removeClass('active');
			}

			// More下拉需要同时激活和打开，新Tab不加到More中
			// if (num && num >= tabsMaxNum) {
			// $(".dropdown", params.parentDOM).addClass('active');
			// $(".dropdown", params.parentDOM).addClass('open');
			// }

			// 激活TAB
			$("#tab_" + uuid, params.parentDOM).addClass('active');
			
			options.pageTabId="#tab_" + uuid;
//			options.pageTabId="#tab_" + uuid;
			var $tabcontent = $('div.tab-content', params.parentDOM);
			$.setNiceScrollByObj($tabcontent);
			$.resizeScrollByObj($tabcontent);

			return uuid;
		},
		closeTabs : function(parentDOM, id, contentsComp) {
			closeTabs(parentDOM, id, contentsComp);
		},
		removeActive : function(parentDOM, contentsComp) {
			var currTab = $("li[role=presentation].active", parentDOM);
			if (currTab && currTab.length > 0) {
				var contentid = currTab.attr('id').split('_')[1];
				closeTabs(parentDOM, contentid, contentsComp);
			}
		},
		addCloseListener : function(parentDOM, contentsComp) {
			$(".nav-tabs", parentDOM).on("click", "[tabclose]", function(e) {
				var id = $(this).attr("tabclose"),
					storeId = $(this).closest('li').attr('id'),
					listens = sessionStorage.__listens ? JSON.parse(sessionStorage.__listens):[],
					listensIndex = listens.indexOf(storeId);				
				
				if (listensIndex !== -1) {	// 关闭前提示
					dialoghelper.confirmMsg(global.message.get('base.closeTabTips'), function(){
						listens.splice(listensIndex, 1);
						sessionStorage.__listens = JSON.stringify(listens);
						closeTabs(parentDOM, id, contentsComp);
					});
				} else { // 直接关闭
					closeTabs(parentDOM, id, contentsComp);
				}	
			});
		}
	};
});