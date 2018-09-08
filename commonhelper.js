define(function(require) {
	return {
		isEmail:function(emailStr){
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			return reg.test(emailStr);// 正则表达式匹配
		}
	};
});