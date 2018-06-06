<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window jrsm-tab-window mdm-popup-edit-window-modified-title mdm-inner-window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" onActive="modelActive" style="top:402px;left:510px;height:auto;width:202px;" onunLoad="modelUnLoad"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryActActualActivityData" idColumn="rowId"><column name="rowId" type="String" xid="xid1"></column>
  <column name="endDate" type="Date" xid="xid2"></column>
  <column name="storeCode" type="String" xid="xid3"></column>
  <column name="storeName" type="String" xid="xid4"></column>
  <column name="bigCatalogShortName" type="String" xid="xid5"></column>
  <column name="displayColor" type="String" xid="xid6"></column>
  <column name="progStatus" type="String" xid="xid7"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryBdStoreData" idColumn="rowId">
   <column name="rowId" type="String" xid="column1"></column>
   <column name="storeName" type="String" xid="column2"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryEventTypeData" idColumn="code">
   <column name="code" type="String" xid="xid34"></column>
   <column name="name" type="String" xid="xid35"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryBdOrgData" idColumn="rowId">
   <column label="rowId" name="rowId" type="String" xid="xid23"></column>
   <column label="unit1Code" name="unit1Code" type="String" xid="xid29"></column>
   <column label="unit2Code" name="unit2Code" type="String" xid="xid25"></column>
   <column label="unit3Code" name="unit3Code" type="String" xid="xid30"></column>
   <column label="area1Code" name="area1Code" type="String" xid="xid27"></column>
   <column label="area2Code" name="area2Code" type="String" xid="xid28"></column>
   <column label="area3Code" name="area3Code" type="String" xid="xid24"></column>
   <column label="unit1CodeId" name="unit1CodeId" type="String" xid="xid40"></column>
   <column label="unit2CodeId" name="unit2CodeId" type="String" xid="xid42"></column>
   <column label="unit3CodeId" name="unit3CodeId" type="String" xid="xid43"></column>
   <column label="area1CodeId" name="area1CodeId" type="String" xid="xid44"></column>
   <column label="area2CodeId" name="area2CodeId" type="String" xid="xid45"></column>
   <column label="area3CodeId" name="area3CodeId" type="String" xid="xid46"></column>
   <column label="storeCode" name="storeCode" type="String" xid="xid47"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryUserDate" idColumn="rowId">
   <column label="rowId" name="rowId" type="String" xid="xid38"></column>
   <column label="userCode" name="userCode" type="String" xid="xid39"></column></div></div> 
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row5" style="padding:8px 0px 8px 0px;width:1200px;">
   <div class="x-col" xid="col13"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1" style="float:left;width:200px;">
   <label class="x-label" xid="label1" style="padding-right:5px;"><![CDATA[i18n{month}]]></label>
   <input id="targetMonth" class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" xid="iDatetimePicker1" format="YYYY-MM" onOkfun="iDatetimePicker1Okfun" style="height:26px;width:130px;"></input></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-left pull-left" label="i18n{lastMonth}" xid="button1" bind-click="button1Click" icon="icon-ios7-arrow-back" style="margin-left:20px;width:70px;">
   <i xid="i1" class="icon-ios7-arrow-back"></i>
   <span xid="span1">i18n{lastMonth}</span></a><a component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-right pull-left" label="i18n{nextMonth}" xid="button2" bind-click="button2Click" icon="icon-ios7-arrow-forward" style="width:70px;">
   <i xid="i2" class="icon-ios7-arrow-forward"></i>
   <span xid="span2">i18n{nextMonth}</span></a></div>
   </div>
  <div xid="div3" style="overflow:hidden;height:110px;border-bottom:1px solid #eee;width:1150px;" class="the_condition"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row13" style="height:30px;">
   <div class="x-col" xid="col31"><span xid="span12" style="margin-top:5px;margin-left:15px;float:left;"><![CDATA[i18n{searchCondition}]]></span><a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon" label="button" xid="button6" icon="linear linear-diamond" bind-click="button6Click" style="margin-left:10px;float:left;height:20px;line-height:16px;margin-top:5px;">
   <i xid="i6" class="linear linear-diamond"></i>
   <span xid="span13"></span></a></div>
   <div class="x-col" xid="col32"></div>
   <div class="x-col" xid="col33"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="margin-bottom:10px;">
   <div class="x-col" xid="col4"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label4" style="text-align:right;padding-right:5px;"><![CDATA[i18n{enterprise}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch2" config="org_area" displayAttr="orgName" valueAttr="orgCode" style="left:4px;width:200px;" girdColumnWidth="150" onBeforeQuery="iQuickSearch2BeforeQuery" onChooseAfter="iQuickSearch2ChooseAfter" onDeleteAfter="iQuickSearch2DeleteAfter" bind_refData='$model.queryBdOrgData.ref("unit1Code")'></div></div>
  </div>
  <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label2" style="text-align:right;padding-right:5px;"><![CDATA[i18n{commercial}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch3" config="org_area" displayAttr="orgName" valueAttr="orgCode" style="left:4px;width:200px;" onBeforeQuery="iQuickSearch3BeforeQuery" onChooseAfter="iQuickSearch3ChooseAfter" onDeleteAfter="iQuickSearch3DeleteAfter" bind_refData='$model.queryBdOrgData.ref("unit2Code")'></div></div></div><div class="x-col" xid="col6"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label3" style="text-align:right;padding-right:5px;"><![CDATA[i18n{area}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch4" config="org_area" displayAttr="orgName" valueAttr="orgCode" style="left:4px;width:200px;" onBeforeQuery="iQuickSearch4BeforeQuery" bind_refData='$model.queryBdOrgData.ref("unit3Code")' onDeleteAfter="iQuickSearch4DeleteAfter"></div></div></div><div class="x-col" xid="col5"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label6" style="text-align:right;padding-right:5px;"><![CDATA[i18n{branch}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch1" config="org_area" displayAttr="orgName" valueAttr="orgCode" style="left:4px;width:200px;" onBeforeQuery="iQuickSearch1BeforeQuery" onChooseAfter="iQuickSearch1ChooseAfter" onDeleteAfter="iQuickSearch1DeleteAfter" bind_refData='$model.queryBdOrgData.ref("area1Code")'></div></div></div>
  <div class="x-col x-col-10" xid="col10"></div></div>
   
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label2" style="text-align:right;padding-right:5px;"><![CDATA[i18n{part1}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch3" config="org_area" displayAttr="orgName" valueAttr="orgCode" style="left:4px;width:200px;" onBeforeQuery="iQuickSearch22BeforeQuery" onChooseAfter="iQuickSearch22ChooseAfter" onDeleteAfter="iQuickSearch22DeleteAfter" bind_refData='$model.queryBdOrgData.ref("area2Code")'></div></div></div><div class="x-col" xid="col6"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label3" style="text-align:right;padding-right:5px;"><![CDATA[i18n{part2}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch4" config="org_area" displayAttr="orgName" valueAttr="orgCode" style="left:4px;width:200px;" onBeforeQuery="iQuickSearch23BeforeQuery" onDeleteAfter="iQuickSearch23DeleteAfter" bind_refData='$model.queryBdOrgData.ref("area3Code")'></div></div></div><div class="x-col" xid="col5"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label" xid="label5" style="text-align:right;padding-right:5px;"><![CDATA[i18n{shop}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch31" bind_refData='$model.queryBdOrgData.ref("storeCode")' config="bd_store" displayAttr="storeName" valueAttr="storeCode" onBeforeQuery="iQuickSearch31BeforeQuery" onDeleteAfter="iQuickSearch33DeleteAfter" style="left:4px;width:200px;"></div></div>
  </div>
  <div class="x-col" xid="col3"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit9">
   <label class="x-label" xid="label9" style="text-align:right;padding-right:5px;"><![CDATA[i18n{object}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch5" style="left:4px;width:200px;" onBeforeQuery="iQuickSearch5BeforeQuery" bind_refData='$model.queryUserDate.ref("userCode")' config="bd_user" lazyLoad="true" displayAttr="userCode" valueAttr="userCode"></div></div></div>
  <div class="x-col x-col-10" xid="col9">
  <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon pull-right" label="button" xid="button5" icon="icon-ios7-undo" style="margin-right:5px" onClick="button5Click">
   <i xid="i5" class="icon-ios7-undo" style="position:relative;top:0px;left:0px;"></i>
   <span xid="span5"></span></a><a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon pull-right" label="检索" xid="button12" icon="linear linear-magnifier" onClick="button12Click">
   <i xid="i12" class="linear linear-magnifier"></i>
   <span xid="span20">检索</span></a></div></div>
	</div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:40px;line-height:30px;width:1200px;">
   <div class="x-col" xid="col6">
   		<ul id="the_status">
   			<li class="the_triangle">提案<i class="icon iconfont icon-triangle-copy" style="color:#00c;"></i><i class="icon iconfont icon-triangle-copy" style="color:#f0f;"></i></li>
  			<li>合意<i class="icon iconfont icon-yuanxing" style="color:#00c;"></i><i class="icon iconfont icon-yuanxing" style="color:#f0f;"></i></li>
  			<li>实施<i class="icon iconfont icon-xingxing" style="color:#00c;font-size:14px;"></i><i class="icon iconfont icon-xingxing" style="color:#f0f;font-size:14px;"></i></li>
  			<li style="margin-left:20px;">※<span style="color:#00c;">青色</span>は予定、<span style="color:#f0f;">ピンク</span>は実績</li>
   		</ul>
   </div></div>
  <div xid="div1" class="content">
  		<table border="1" cellspacing="0" cellpadding="0" id="calendar">
			<!--<tr><td>Header</td></tr>
			<tr><td>Data</td></tr>-->
		</table>
  </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7" style="width:1000px;">
   <div class="x-col x-col-25" xid="col8" style="min-width:220px;text-align:center;"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col2"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{prevPage}" xid="button3" bind-click="button3Click">
   <i xid="i3"></i>
   <span xid="span3">i18n{prevPage}</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{nextPage}" xid="button4" bind-click="button4Click">
   <i xid="i4"></i>
   <span xid="span4">i18n{nextPage}</span></a></div>
   <div class="x-col x-col-33" xid="col4"><p style="margin-top:5px;margin-left:-20px;" xid="p1">第<span id="showPage2" xid="span9">1</span>页，共<span id="showPageCount2" xid="span10"><![CDATA[?]]></span>页
   </p></div></div></div>
   <div class="x-col" xid="col11"></div>
   </div>
  </div>