<?xml version="1.0" encoding="UTF-8"?>

<div id="the_window" xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window jrsm-tab-window mdm-popup-edit-window-modified-title mdm-inner-window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" onLoad="modelLoad" style="height:auto;top:409px;left:778px;" onunLoad="modelUnLoad" onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryActivityData" idColumn="rowId"><column name="rowId" type="String" xid="xid1"></column>
  <column name="startDate" type="Date" xid="xid2"></column>
  <column name="endDate" type="Date" xid="xid3"></column>
  <column name="storeName" type="String" xid="xid4"></column>
  <column name="bigCatalogName" type="String" xid="xid5"></column>
  <column name="displayColor" type="String" xid="xid7"></column>
  <column name="actiivityStatus" type="String" xid="xid9"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bigTypeNameData" idColumn="rowId">
   <column name="rowId" type="String" xid="column7"></column>
  <column name="typeName" type="String" xid="column8"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryActivityStatusData" idColumn="rowId"><column name="rowId" type="String" xid="xid6"></column>
  <column label="statusName" name="statusCode" type="String" xid="xid8"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryBdStoreData" idColumn="storeCode">
   <column name="rowId" type="String" xid="column1"></column>
  <column name="storeName" type="String" xid="column2"></column>
  <column name="storeCode" type="String" xid="xid10"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="copyAlldata" idColumn="fromStoreCode"><column label="fromStoreCode" name="fromStoreCode" type="String" xid="xid11"></column>
  <column label="toStoreCode" name="toStoreCode" type="String" xid="xid12"></column>
  <column label="toStoreName" name="toStoreName" type="String" xid="xid15"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryActivityTypeData" idColumn="code"><column label="code" name="code" type="String" xid="xid13"></column>
  <column label="name" name="name" type="String" xid="xid14"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addActivityTypeData" idColumn="rowId"><column name="rowId" type="String" xid="xid16"></column>
  <column name="bigCatalogId" type="String" xid="xid20"></column>
  <column name="bigCatalogName" type="String" xid="xid17"></column>
  <column name="smallCatalogId" type="String" xid="xid21"></column>
  <column name="smallCatalogName" type="String" xid="xid18"></column>
  <column name="displayColor" type="String" xid="xid19"></column>
  <column name="activityType" type="String" xid="xid22"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryBdUserData" idColumn="rowId"><column name="rowId" type="String" xid="xid31"></column>
  <column name="userCode" type="String" xid="xid32"></column>
  <column name="userName" type="String" xid="xid33"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryEventTypeData" idColumn="code"><column name="code" type="String" xid="xid34"></column>
  <column name="name" type="String" xid="xid35"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryStoreData" idColumn="rwoId"><column label="rwoId" name="rwoId" type="String" xid="xid26"></column>
  <column label="storeCode" name="storeCode" type="String" xid="xid36"></column>
  <column label="storeName" name="storeName" type="String" xid="xid37"></column>
  <column label="userCode" name="userCode" type="String" xid="xid41"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryUserDate" idColumn="rowId"><column label="rowId" name="rowId" type="String" xid="xid38"></column>
  <column label="userCode" name="userCode" type="String" xid="xid39"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryBdOrgData" idColumn="rowId"><column name="rowId" type="String" xid="xid48"></column>
  <column name="unit1Code" type="String" xid="xid49"></column>
  <column name="unit2Code" type="String" xid="xid50"></column>
  <column name="unit3Code" type="String" xid="xid51"></column>
  <column name="area1Code" type="String" xid="xid52"></column>
  <column name="area2Code" type="String" xid="xid53"></column>
  <column name="area3Code" type="String" xid="xid54"></column>
  <column name="unit1CodeId" type="String" xid="xid55"></column>
  <column name="unit2CodeId" type="String" xid="xid56"></column>
  <column name="unit3CodeId" type="String" xid="xid57"></column>
  <column name="area1CodeId" type="String" xid="xid58"></column>
  <column name="area2CodeId" type="String" xid="xid59"></column>
  <column name="area3CodeId" type="String" xid="xid60"></column>
  <column name="storeCode" type="String" xid="xid61"></column></div></div>
  
  
  <div id="row4" component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="padding:15px 0px 8px 0px;width:1200px;">
   <div class="x-col x-col-33" xid="col14"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row12">
   <div class="x-col x-col-50" xid="col3"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label1" style="text-align:center;width:100px;"><![CDATA[i18n{month}]]></label>
   <input id="start_month" class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" xid="iDatetimePicker1" format="YYYY-MM" style="height:26px;" onOkfun="iDatetimePicker1Okfun" readonly="true"></input></div>
  </div>
   <div class="x-col" xid="col9"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   
   <span xid="span8" style="text-align:center;width:20px;"><![CDATA[~]]></span><input id="end_month" class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" xid="iDatetimePicker2" format="YYYY-MM" style="height:26px;" onOkfun="iDatetimePicker2Okfun" readonly="true"></input></div>
  </div>
  <div class="x-col x-col-10" xid="col2"></div></div></div>
   <div class="x-col x-col-50" xid="col16"><a id="prev" component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-left pull-left" label="i18n{lastMonth}" xid="button3" bind-click="button3Click" icon="icon-ios7-arrow-back" style="width:70px;">
   <i xid="i3" class="icon-ios7-arrow-back"></i>
   <span xid="span3">i18n{lastMonth}</span></a>
  <a id="next" component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-right pull-left" label="i18n{nextMonth}" xid="button4" bind-click="button4Click" style="margin-right:30px;width:70px;" icon="icon-ios7-arrow-forward">
   <i xid="i4" class="icon-ios7-arrow-forward"></i>
   <span xid="span4">i18n{nextMonth}</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" xid="button2" bind-click="button2Click" label="i18n{workCalendar}">
   <i xid="i2"></i>
   <span xid="span9">i18n{workCalendar}</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" xid="button5" style="margin-right:30px" bind-click="button5Click" label="i18n{activityProgress}">
   <i xid="i5"></i>
   <span xid="span10">i18n{activityProgress}</span></a></div>
  <div class="x-col" xid="col17">
  </div>
  </div><div xid="div9" style="border-bottom:1px solid #E8E8E8;overflow:hidden;height:110px;width:1150px;" id="hide_show"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" style="height:30px;">
   <div class="x-col" xid="col27"><span xid="span7" style="margin-top:5px;margin-left:15px;float:left;"><![CDATA[i18n{searchCondition}]]></span><a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon" label="隠す" xid="button1" icon="linear linear-database" bind-click="button1Click" style="margin-left:10px;float:left;height:20px;line-height:16px;margin-top:5px;">
   <i id="hide_config" xid="i1" class="linear linear-database"></i>
   <span xid="span1">隠す</span></a></div>
   <div class="x-col" xid="col28"></div>
   <div class="x-col" xid="col29"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="margin-bottom:10px;">
   <div class="x-col" xid="col4"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label4" style="text-align:right;padding-right:5px;"><![CDATA[i18n{enterprise}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch11" bind_refData='$model.queryBdOrgData.ref("unit1Code")' onBeforeQuery="iQuickSearch2BeforeQuery" config="org_area" displayAttr="orgName" valueAttr="orgCode" onChooseAfter="iQuickSearch2ChooseAfter" onDeleteAfter="iQuickSearch2DeleteAfter"></div></div>
  </div>
  <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label2" style="text-align:right;padding-right:5px;"><![CDATA[i18n{commercial}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch12" bind_refData='$model.queryBdOrgData.ref("unit2Code")' config="org_area" displayAttr="orgName" valueAttr="orgCode" onBeforeQuery="iQuickSearch3BeforeQuery" onChooseAfter="iQuickSearch3ChooseAfter" onDeleteAfter="iQuickSearch3DeleteAfter"></div></div></div><div class="x-col" xid="col6"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label3" style="text-align:right;padding-right:5px;"><![CDATA[i18n{area}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch13" bind_refData='$model.queryBdOrgData.ref("unit3Code")' config="org_area" displayAttr="orgName" valueAttr="orgCode" onBeforeQuery="iQuickSearch4BeforeQuery" onDeleteAfter="iQuickSearch13DeleteAfter"></div></div></div><div class="x-col" xid="col5"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit8">
   <label class="x-label" xid="label6" style="text-align:right;padding-right:5px;"><![CDATA[i18n{branch}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch21" bind_refData='$model.queryBdOrgData.ref("area1Code")' onBeforeQuery="iQuickSearch21BeforeQuery" config="org_area" displayAttr="orgName" valueAttr="orgCode" onChooseAfter="iQuickSearch21ChooseAfter" onDeleteAfter="iQuickSearch21DeleteAfter"></div></div></div>
  <div class="x-col x-col-10" xid="col24"></div></div>
   <div component="$UI/system/components/justep/row/row" class="x-row">
   <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label2" style="text-align:right;padding-right:5px;"><![CDATA[i18n{part1}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch22" bind_refData='$model.queryBdOrgData.ref("area2Code")' config="org_area" displayAttr="orgName" valueAttr="orgCode" onBeforeQuery="iQuickSearch22BeforeQuery" onChooseAfter="iQuickSearch22ChooseAfter" onDeleteAfter="iQuickSearch22DeleteAfter"></div></div></div><div class="x-col" xid="col6"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label3" style="text-align:right;padding-right:5px;"><![CDATA[i18n{part2}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch23" bind_refData='$model.queryBdOrgData.ref("area3Code")' config="org_area" displayAttr="orgName" valueAttr="orgCode" onBeforeQuery="iQuickSearch23BeforeQuery" onDeleteAfter="iQuickSearch23DeleteAfter"></div></div></div><div class="x-col" xid="col13"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label" xid="label5" style="text-align:right;padding-right:5px;"><![CDATA[i18n{shop}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch31" bind_refData='$model.queryBdOrgData.ref("storeCode")' config="bd_store" displayAttr="storeName" valueAttr="storeCode" onBeforeQuery="iQuickSearch31BeforeQuery" onDeleteAfter="iQuickSearch33DeleteAfter"></div></div></div>
  <div class="x-col" xid="col15"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit9">
   <label class="x-label" xid="label9" style="text-align:right;padding-right:5px;"><![CDATA[i18n{object}]]></label>
   <div class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" xid="iQuickSearch32" onBeforeQuery="iQuickSearch32BeforeQuery" bind_refData='$model.queryUserDate.ref("userCode")' config="bd_user" valueAttr="userCode" displayAttr="userName" lazyLoad="true"></div></div>
  </div>
  <div class="x-col x-col-10" xid="col23">
  <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon pull-right" label="button" xid="button8" icon="icon-ios7-undo" onClick="button8Click" style="margin-right:5px">
   <i xid="i8" class="icon-ios7-undo" style="position:relative;top:0px;left:0px;"></i>
   <span xid="span11"></span></a><a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon pull-right" label="检索" xid="button12" icon="linear linear-magnifier" onClick="button12Click">
   <i xid="i12" class="linear linear-magnifier"></i>
   <span xid="span20">检索</span></a></div></div>
   
   </div><div id="row10" component="$UI/system/components/justep/row/row" class="x-row" xid="row10" style="line-height:30px;height:40px;width:1200px;">
   <div class="x-col" xid="col8">
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2"><ul id="status_type" style="width:410px;">
			<li class="the_triangle">i18n{proposal}<i class="icon iconfont icon-triangle-copy" style="color:#5370ff;"></i><i class="icon iconfont icon-triangle-copy" style="color:#e04df2;"></i></li>
  			<li>i18n{consensus}<i class="icon iconfont icon-yuanxing" style="color:#5370ff;"></i><i class="icon iconfont icon-yuanxing" style="color:#e04df2;"></i></li>
  			<li>i18n{action}<i class="icon iconfont icon-xingxing" style="color:#5370ff;font-size:14px;"></i><i class="icon iconfont icon-xingxing" style="color:#e04df2;font-size:14px;"></i></li>
  			<li style="margin-left:20px;">※<span style="color:#5370ff;">i18n{blue}</span>i18n{isPlan}<span style="color:#e04df2;">i18n{pink}</span>i18n{isActual}</li>
  		</ul><ul id="selectGroup">

  			<li class="small_title">i18n{plan}</li>
  		</ul><ul id="selectGroup2">
  			<li class="small_title">i18n{progress}</li>
  			
  		</ul></div></div></div><div xid="wrap" class="wraper_four" id="wrap">
   
   </div><div id="row13" component="$UI/system/components/justep/row/row" class="x-row" xid="row13" style="margin-top:10px;margin-bottom:10px;width:1200px;">
   <div class="x-col x-col-20" xid="col62"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row14">
   <div class="x-col" xid="col12"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{prevPage}" xid="button6" bind-click="button6Click">
   <i xid="i6"></i>
   <span xid="span2">i18n{prevPage}</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{nextPage}" xid="button7" bind-click="button7Click">
   <i xid="i7"></i>
   <span xid="span5">i18n{nextPage}</span></a></div>
   <div class="x-col x-col-33" xid="col1"><p style="margin-top:5px;margin-left:-10px;"><span id="showPage">1</span>i18n{showPage}<span id="showPageCount">?</span>i18n{page}</p></div></div></div>
   <div class="x-col" xid="col11"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row9">
   <div class="x-col x-col-25" xid="col18" style="margin-top:-2px;"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit7">
   <label class="x-label" xid="label7" style="text-align:right;padding-right:5px;"><![CDATA[i18n{copySource}]]></label>
   <select id="start_copy" component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select8" bind-ref='$model.copyAlldata.ref("fromStoreCode")' bind-options="queryBdStoreData" bind-optionsValue="storeCode" bind-optionsLabel="storeName" style="width:180px;" optionsAutoLoad="true"></select></div></div>
   <div class="x-col x-col-10" xid="col19" style="text-align:right;padding-right:10px;margin-top:-2px;"><span xid="span15" style="margin-top:7px;display:block;"><![CDATA[i18n{copyTarget}]]></span></div>
   <div class="x-col x-col-20" xid="col20" style="margin-top:-2px;margin-right:-25px;"><div id="select_more" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect1" multiselect="true" bind-ref='$model.copyAlldata.ref("toStoreCode")' inputFilterable="false" bind-labelRef='$model.copyAlldata.ref("toStoreName")' style="width:165px;" autoOptionWidth="false" onShowOption="gridSelect1ShowOption">
   <option id="end_copy" xid="option1" data="queryBdStoreData" label="storeName" value="storeCode" multiselectWidth="20" multiboxonly="false"></option></div></div>
  <div class="x-col x-col-10" xid="col22" style="margin-top:-2px;"><span xid="span6" style="margin-top:7px;display:block;"><![CDATA[(i18n{copyMore})]]></span></div>
  <div class="x-col" xid="col10"><a id="copy_shops" component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{copyLogin}" xid="button20" onClick="copyAll" style="width:80px;">
   <i xid="i20"></i>
   <span xid="span31">i18n{copyLogin}</span></a>
  <a id="ykdl" component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{allLogin}" xid="button21" bind-click="button21Click" style="width:80px;" disabled="true">
   <i xid="i21"></i>
   <span xid="span32">i18n{allLogin}</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="i18n{print}" xid="button23" bind-click="button23Click" style="width:80px;">
   <i xid="i23"></i>
   <span xid="span34">i18n{print}</span></a></div></div></div>
  </div>

  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="actActivityView" style="top:624px;left:590px;" src="$UI/jrsm/module/act/actActivityBatch.w" status="normal" width="80%" height="60%" showTitle="true" title="1111"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="activityAddView" style="top:664px;left:593px;" src="$UI/jrsm/module/act/actActivity_add.w" status="normal" width="600px" height="500px" showTitle="true"></span>
  
   
   <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="activityTypeView" style="left:628px;top:642px;" showTitle="true" status="normal" width="600px" height="500px" src="$UI/jrsm/module/act/actActivity_type.w"></span>
  </div>