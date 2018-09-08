define(function(require) {

	var enUS = require("../module/message/message_en_US");
	var zhCN = require("../module/message/message_zh_CN");
	var jaJP = require("../module/message/message_ja_JP");

	var config = require("$UI/portal/base/config");
	var currentLanguage = function() {
		var search = window.top.location.search; // URL 参数，例如?language=en_US
		if (search) {
			search = search.substring(1);
			search = search.split("&");
			for (var i = 0; i < search.length; i++) {
				if (search[i].indexOf(config.langParamName + "=") === 0) {
					var value = search[i].split("=")[1];
					return value;
				}
			}
		}
		var language = navigator.language || "en_US";
		return language.replace('-', '_');
	};
	return {
		currentLang : currentLanguage,
		get : function(code) {
			var lang = currentLanguage();
			if (lang === 'zh_CN') {
				return zhCN[code];
			} else if (lang === 'en_US') {
				return enUS[code];
			} else if (lang === 'ja_JP')
				return jaJP[code];
		}
	};
});