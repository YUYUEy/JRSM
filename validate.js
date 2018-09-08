/**
 * 
 * <pre>
 * 用于前端数据校验。
 * </pre>
 * 
 * @author
 * @partner.midea.com.cn
 * @version 1.00.00
 * 
 * <pre>
 * 修改记录
 *    修改后版本:     修改人：   修改日期:     修改内容: 
 * </pre>
 */
define(function(require) {
	var $ = require("jquery");
	require("$UI/jrsm/js/tipInfo");

	return {
		/**
		 * 计算两个日期的相差天数
		 * 
		 * <pre>
		 * 参数 
		 * 		sDate1 较大的日期(必填) yyyy-MM-dd 
		 * 		sDate2 较小的日期(必填) yyyy-MM-dd 
		 * 		setAbs 是否取绝对值
		 * 返回 日期相差天数
		 * </pre>
		 */
		dateDiff : function(sDate1, sDate2, setAbs) {
			var aDate, oDate1, oDate2, iDays;
			if (typeof sDate1 == "string") {
				aDate = sDate1.split("-");
				oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);// 转换为12-18-2002格式
			} else {
				oDate1 = sDate1;
			}
			if (typeof sDate2 == "string") {
				aDate = sDate2.split("-");
				oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
			} else {
				oDate2 = sDate2;
			}
			if (setAbs == null || setAbs == '') {
				setAbs = false;
			}
			if (setAbs) {
				iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);
			} else {
				iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
			}
			return iDays
		},

		/**
		 * 判断值是否为空
		 * 
		 * <pre>
		 * 参数
		 * val(必填)值
		 * 		name 名称
		 * 		msg 提示信息
		 * 返回 true为空 false不为空
		 * </pre>
		 */
		isNull : function(val, name, msg) {
			if (val === '' || val == undefined || val == null) {
				if (name == '' || name == undefined || name == null) {
					return true;
				} else {
					if (msg == '' || msg == undefined || msg == null) {
						$(this).tipInfo({
							title : "Tip",
							"msg" : name + " is required!",
							tip : "tip"
						});
					} else {
						$(this).tipInfo({
							title : "Tip",
							"msg" : msg,
							tip : "tip"
						});
					}
					return true;
				}
			} else {
				return false;
			}
		},

		/**
		 * 判断是否为Work Phone
		 * 
		 * <pre>
		 * 参数
		 * 		val值(必填)
		 * 返回 true/false
		 * </pre>
		 */
		isWorkPhone : function(val) {
			// 判断是否为空
			if (val == '' || val == undefined || val == null) {
				$(this).tipInfo({
					title : "Tip",
					"msg" : "【Work Phone】 is required!",
					tip : "tip"
				});
				return false;
			} else {
				// 判断是否符合Work Phone规则
				var reg = /^(\+)?(\d||\s||\(||\))+(\-)?(\d)+$/;
				if (reg.test(val)) {
					return true;
				} else {
					$(this).tipInfo({
						title : "Tip",
						"msg" : "【Work Phone】 Number can only accept numeric symbol and special symbol '+ - ( )'!",
						tip : "tip"
					});
					return false;
				}
			}
		},

		/**
		 * 判断是否为Cell Phone
		 * 
		 * <pre>
		 * 参数
		 * 		val值(必填)
		 * 返回 true/false
		 * </pre>
		 */
		isCellPhone : function(val) {
			// 判断是否为空
			if (val == '' || val == undefined || val == null) {
				$(this).tipInfo({
					title : "Tip",
					"msg" : "Cell Phone is required!",
					tip : "tip"
				});
				return false;
			} else {
				// 判断是否符合Cell Phone规则
				var reg = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/;
				if (reg.test(val)) {
					return true;
				} else {
					$(this).tipInfo({
						title : "Tip",
						"msg" : "Please enter the correct cell phone!",
						tip : "tip"
					});
					return false;
				}
			}
		},

		/**
		 * 判断是否为Email
		 * 
		 * <pre>
		 * 参数
		 * 		val Email值(必填)
		 * 返回 true/false
		 * </pre>
		 */
		isEmail : function(val) {
			// 判断是否为空
			if (val == '' || val == undefined || val == null) {
				$(this).tipInfo({
					title : "Tip",
					"msg" : "【Email】 is required!",
					tip : "tip"
				});
				return false;
			} else {
				// 判断是否符合Email规则
				var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
				if (reg.test(val)) {
					return true;
				} else {
					$(this).tipInfo({
						title : "Tip",
						"msg" : "【Email】 address should contain '@' mark.",
						tip : "tip"
					});
					return false;
				}
			}
		},
		/**
		 * 判断是否为正整数
		 * 
		 * <pre>
		 * 参数
		 * 		val 值(必填)
		 * 		showMsg 是否显示提示信息，默认false
		 * 返回 true/false
		 * </pre>
		 */
		isPositiveInteger : function(val, showMsg) {
			// 判断是否为空
			var _showMsg = false;
			if (!this.isNull(showMsg)) {
				_showMsg = showMsg;
			}
			// 判断是否符合整数规则
			var reg = /^[1-9]\d*$/;
			if (reg.test(val)) {
				return true;
			} else {
				if (showMsg) {
					$(this).tipInfo({
						title : "Tip",
						"msg" : "Please enter a positive integer",
						tip : "tip"
					});
				}
				return false;
			}
		}
	}
});