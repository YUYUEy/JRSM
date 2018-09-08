define(function(require) {
	var messagehelper = require("$UI/jrsm/js/message");
	var initData = [ {
		"id" : 1,
		"theadName" : messagehelper.get("theadName2"),
	}, {
		"id" : 2,
		"theadName" : messagehelper.get("theadName3"),
	}, {
		"id" : 3,
		"theadName" : messagehelper.get("theadName4"),
	}];

	return initData;
});
