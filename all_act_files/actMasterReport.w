<div 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.w3.org/1999/xhtml" 
  component="$UI/system/components/justep/window/window" 
  xid="window" 
  extends="$UI/jrsm/module/base/listbase.w" 
  __id="id_1" 
  design="device:pc" 
  sysParam="false" 
  class="mdm-list-window window mdm-inner-window" >

    <div component="$UI/system/components/justep/model/model" onLoad="model1_5Load" onParamsReceive="model1_5ParamsReceive" style="height:auto;top:131px;left:347px;" xid="model1_5" xui:parent="window" xui:update-mode="insert" >
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="masterData" >
<column name="rowId" type="String" xid="xid8_1" />
<column label="i18n{eventName}" name="eventName" type="String" xid="xid9_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="code" xid="eventTypeData" >
<column name="code" type="String" xid="xid1_1" />
<column name="name" type="String" xid="xid2_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="code" xid="itemGcatalogCodeData" >
<column name="code" type="String" xid="xid3_1" />
<column name="name" type="String" xid="xid4_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="queryMasterData" >
<column name="rowId" type="String" xid="xid511_4" />
<column name="eventStartDate" type="Date" xid="xid611_4" />
<column name="eventEndDate" type="Date" xid="xid711_4" />
<column name="storeSelectType" type="String" xid="xid811_4" />
<column name="itemCodes" type="String" xid="xid911_4" />
<column name="eventName" type="String" xid="xid1011_4" />
<column name="createdBy" type="String" xid="xid1111_4" />
<column name="itemCatalogCodesNames" type="String" xid="xid51_4" />
<column name="storeSelectTypeName" type="String" xid="xid1_4" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="orgCode" xid="unitOrgData" >
<column name="orgCode" type="String" xid="xid12_1" />
<column name="orgName" type="String" xid="xid13_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="orgCode" xid="areaOrgData" >
<column name="orgCode" type="String" xid="xid14_1" />
<column name="orgName" type="String" xid="xid15_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="orgCode" xid="areaL3Data" >
<column name="orgCode" type="String" xid="xid6_1" />
<column name="orgName" type="String" xid="xid7_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="orgCode" xid="unitL3Data" >
<column name="orgCode" type="String" xid="column11_1" />
<column name="orgName" type="String" xid="column21_1" />
</div>
<div autoLoad="false" component="$UI/system/components/justep/data/data" confirmDelete="false" confirmRefresh="false" idColumn="dataKey" xid="main" >
<column label="列名" name="dataKey" type="String" xid="column1_1" />
<column label="类型" name="type" type="String" xid="column2_1" />
<column label="显示名" name="title" type="String" xid="column4_1" />
<column label="列宽" name="width" type="String" xid="column5_1" />
<column label="选中" name="ch" type="String" xid="column6_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" confirmDelete="false" confirmRefresh="false" idColumn="rowId" xid="mainData" >
<column label="i18n{startDate}" name="eventStartDate" type="String" xid="xid11111_1" />
<column label="i18n{endDate}" name="eventEndDate" type="String" xid="xid21111_1" />
<column label="i18n{theMaster}" name="theMaster" type="String" xid="xid31111_1" />
<column label="i18n{mainBusiness}" name="mainBusiness" type="String" xid="xid41111_1" />
<column label="i18n{recordOperator}" name="recordOperator" type="String" xid="xid51111_1" />
<column label="i18n{itemCatalogCodes}" name="itemCatalogCodes" type="String" xid="xid61111_1" />
<column label="i18n{toshibaHelper}" name="toshibaHelper" type="String" xid="xid71111_1" />
<column label="i18n{storeName}" name="storeName" type="String" xid="xid81111_1" />
<column label="i18n{toshiba}" name="toshiba" type="String" xid="xid1211_1" />
<column label="i18n{businessUnit}" name="businessUnit" type="String" xid="xid2211_1" />
<column label="i18n{district}" name="district" type="String" xid="xid3211_1" />
<column label="i18n{branch}" name="branch" type="String" xid="xid421_1" />
<column label="i18n{2.5Paragraph}" name="2.5Paragraph" type="String" xid="xid521_1" />
<column label="i18n{planning}" name="planning" type="String" xid="xid621_1" />
<column label="i18n{results}" name="results" type="String" xid="xid721_1" />
<column label="i18n{achievement}" name="achievement" type="String" xid="xid821_1" />
<column label="i18n{contribution}" name="contribution" type="String" xid="xid911_1" />
<column label="i18n{successPoint}" name="successPoint" type="String" xid="xid1011_1" />
<column label="i18n{reflections}" name="reflections" type="String" xid="xid1121_1" />
<column label="i18n{yourInterest}" name="yourInterest" type="String" xid="xid1311_1" />
<column label="i18n{trendsCompanies}" name="trendsCompanies" type="String" xid="xid1411_1" />
<column label="i18n{customerResponse}" name="customerResponse" type="String" xid="xid1511_1" />
<column label="i18n{attachedImages}" name="attachedImages" type="String" xid="xid1611_1" />
<column name="rowId" type="String" xid="xid10_1" />
<column label="i18n{eventName}" name="eventName" type="String" xid="xid11_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" xid="sortData" />
</div>
    <div class="mdm-query-container" xid="div311_5" xui:parent="window" xui:update-mode="insert" >
<div class="mdm-query-container" xid="div411_5" xui:parent="window" xui:update-mode="insert" >
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row311_5" >
<div class="x-col" xid="col1111_5" />
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row111_5" >
<div class="x-col" xid="col311_5" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1_2" >
<label class="x-label" xid="label1_2" >
<![CDATA[i18n{selectionTime}]]>
</label>
<div class="x-edit" xid="div15_2" >
<input bind-ref="$model.queryMasterData.ref(&quot;eventStartDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" xid="input1_2" />
</div>
</div>
</div>
<div class="x-col" xid="col411_5" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit411_5" >
<span style="width:103px;text-align:center;" xid="span11_5" >




































~</span>
<input bind-ref="$model.queryMasterData.ref(&quot;eventEndDate&quot;)" class="form-control x-edit" component="$UI/system/components/justep/input/input" style="width:46px;" xid="input211_5" />
</div>
</div>
<div class="x-col " xid="col14" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1_6" >
<label class="x-label" xid="label1_6" >
<![CDATA[i18n{storeSelectType}]]>
</label>
<div class="x-edit" xid="div3_6" >
<div bind-labelRef="$model.queryMasterData.ref(&quot;storeSelectTypeName&quot;)" bind-ref="$model.queryMasterData.ref(&quot;storeSelectType&quot;)" class="x-gridSelect" clearButton="false" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect1_4" >
<option data="eventTypeData" label="name" value="code" xid="option1_4" />
</div>
</div>
</div>
</div>
<div class="x-col" xid="col51_5" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit2_6" >
<label class="x-label" xid="label2_6" >
<![CDATA[i18n{itemCatalogCodes}]]>
</label>
<div class="x-edit" xid="div4_6" >
<div bind-labelRef="$model.queryMasterData.ref(&quot;itemCatalogCodesNames&quot;)" bind-ref="$model.queryMasterData.ref(&quot;itemCodes&quot;)" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" multiselect="true" xid="gridSelect1_1" >
<option data="itemGcatalogCodeData" label="name" value="code" xid="option1_1" />
</div>
</div>
</div>
</div>
<div class="x-col x-col-10" xid="col17" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row21_5" >
<div class="x-col" xid="col61_5" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit3_6" >
<label class="x-label" xid="label3_6" >
<![CDATA[i18n{eventName}]]>
</label>
<div class="x-edit" xid="div5_6" >
<input bind-ref="$model.queryMasterData.ref(&quot;eventName&quot;)" class="form-control" component="$UI/system/components/justep/input/input" xid="input1_6" />
</div>
</div>
</div>
<div class="x-col" xid="col71_5" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4_6" >
<label class="x-label" xid="label4_6" >
<![CDATA[i18n{eventCreatedBy}]]>
</label>
<div class="x-edit" xid="div6_6" >
<div bind_refData="$model.queryMasterData.ref(&quot;createdBy&quot;)" class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" config="user" displayAttr="userName" ifNeedVpd="true" valueAttr="userCode" xid="iQuickSearch1_3" />
</div>
</div>
</div>
<div class="x-col" xid="col81_5" />
<div class="x-col" xid="col91_5" >
</div>
<div class="x-col x-col-10" xid="col101_5" >
<a class="btn btn-default btn-only-icon" component="$UI/system/components/justep/button/button" icon="icon-ios7-undo" label="i18n{reset}" onClick="resetClick" title="reset" xid="reset" >
<i class="icon-ios7-undo" xid="i5" />
<span xid="span6" >




































i18n{reset}</span>
</a>
<a class="btn btn-default btn-only-icon" component="$UI/system/components/justep/button/button" icon="glyphicon glyphicon-search" label="i18n{query}" onClick="queryClick" title="query" xid="query" >
<i class="glyphicon glyphicon-search" xid="i1" />
<span xid="span1" >




































i18n{query}</span>
</a>
</div>
</div>
</div>
    <div xid="div2_6" xui:parent="window" xui:update-mode="insert" >
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row1_6" >
<div class="x-col" xid="col1_6" />
<div class="x-col" xid="col2_6" >
</div>
<div class="x-col" xid="col3_6" >
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row2_6" >
<div class="x-col" xid="col4_6" >
<div xid="div13_1" >
<div class="x-row mdm-function-bar" component="$UI/system/components/justep/row/row" xid="row4" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col30" >
<span class="mdm-grid-title" xid="span100" >
<![CDATA[i18n{queryMasters}]]>
</span>
</div>
<div class="x-col" xid="col18" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="i18n{verificationExport}" onClick="button1_1Click" xid="button1_1" >
<i xid="i1_1" />
<span xid="span1_1" >










i18n{verificationExport}</span>
</a>
</div>
</div>
<div style="height:300px;border:1px solid rgba(232, 232, 232, 1); border-top:none; overflow-y:scroll;" xid="div14_2" >
<div class="x-list " component="$UI/system/components/justep/list/list" data="masterData" limit="10" xid="orgList" >
<div class="x-list-template row" xid="listTemplateDiv1_1" >
<div class="col-xs-3 col-sm-3" xid="div11_1" >
<div class="thumbnail" xid="div12_1" >
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row3" >
<div class="x-col x-col-fixed x-col-center" style="width:30px;" xid="col11" >
<div bind-value="ref(&quot;rowId&quot;)" class="checkbox" component="$UI/system/components/justep/button/checkboxPC" name="checkboxRowId" xid="checkboxPC3" />
</div>
<div class="x-col x-col-center center-block" xid="col10" >
<span bind-text="ref('eventName')" xid="span3" />
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="height:13px;" xid="row4_1" >
<div class="x-col" xid="col16_1" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row1_1" >
<div class="x-col" xid="col1_1" >
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row112_6" >
<div class="x-col" xid="col312_6" />
<div class="x-col" xid="col111_6" >
<div class="radio" component="$UI/system/components/justep/button/radioPC" label="i18n{enterprise}" name="rad" onChange="enterpriseRadioPCChange" xid="enterpriseRadioPC" />
</div>
<div class="x-col" xid="col211_6" >
<div class="radio" component="$UI/system/components/justep/button/radioPC" label="i18n{area}" name="rad" onChange="areaRadioPCChange" xid="areaRadioPC" />
</div>
</div>
</div>
<div class="x-col" xid="col3_1" >
<div class="areaClass" xid="div6_1" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4_1" >
<label class="x-label" xid="label4_1" >
<![CDATA[i18n{branch}]]>
</label>
<div class="x-edit" xid="div4_1" >
<div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect2_4" >
<option data="areaOrgData" label="orgName" value="orgCode" xid="option2_4" />
</div>
</div>
</div>
</div>
<div class="enterprise" xid="div8_1" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit2_1" >
<label class="x-label" xid="label2_1" >
<![CDATA[i18n{businessUnit}]]>
</label>
<div class="x-edit" xid="div2_1" >
<div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect5_4" >
<option data="unitOrgData" label="orgName" value="orgCode" xid="option5_4" />
</div>
</div>
</div>
</div>
</div>
<div class="x-col" xid="col12_1" >
<div class="areaClass" xid="div7_1" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit5_1" >
<label class="x-label" xid="label5_1" >
<![CDATA[i18n{2.5Paragraph}]]>
</label>
<div class="x-edit" xid="div5_1" >
<div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect3_4" >
<option data="areaL3Data" label="orgName" value="orgCode" xid="option3_4" />
</div>
</div>
</div>
</div>
<div class="enterprise" xid="div9_1" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit3_1" >
<label class="x-label" xid="label3_1" >
<![CDATA[i18n{district}]]>
</label>
<div class="x-edit" xid="div3_1" >
<div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect4_4" >
<option data="unitL3Data" label="orgName" value="orgCode" xid="option4_4" />
</div>
</div>
</div>
</div>
</div>
<div class="x-col" xid="col2_1" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1_1" >
<label class="x-label" xid="label1_1" >
<![CDATA[i18n{exclusion}]]>
</label>
<div class="x-edit" xid="div1_1" >
<div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect6_4" >
<option data="sortData" xid="option6_4" />
</div>
</div>
</div>
</div>
<div class="x-col x-col-10" xid="col13_1" >
<div altRows="true" class="x-grid-no-bordered" component="$UI/system/components/justep/grid/grid" data="masterData" height="0" hiddenCaptionbar="true" width="0" xid="grid1_2" >
<columns xid="columns1_2" >
<column name="eventName" width="100" xid="column1_2" />
</columns>
</div>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row2_1" >
<div class="x-col" xid="col4_1" >
</div>
<div class="x-col" xid="col5_1" />
<div class="x-col" xid="col6_1" />
<div class="x-col" xid="col10_1" />
<div class="x-col x-col-10" xid="col11_1" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row3_1" >
<div class="x-col" xid="col7_1" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="i18n{verificationReport}" xid="button2_1" >
<i xid="i2_1" />
<span xid="span2_1" >


































i18n{verificationReport}</span>
</a>
</div>
<div class="x-col" xid="col8_1" >
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="i18n{enterpriseRanking}" xid="button3_1" >
<i xid="i3_1" />
<span xid="span3_1" >


































i18n{enterpriseRanking}</span>
</a>
</div>
<div class="x-col" xid="col9_1" />
</div>
<div xid="div10_1" >
<form action="post" method="" style="display:none" xid="form1_2" >
<input name="token" type="text" value="" xid="inptToken" />
<input name="headInfos" type="text" value="" xid="exportInfoIpt" />
<input name="fileName" type="text" value="" xid="fileNameIpt" />
<input name="queryCriteria" type="text" value="" xid="queryCriteriaIpt" />
</form>
</div>
</div>
   <span xid="exportWd" height="125" src="$UI/jrsm/module/base/kymKeymanIn_export.w" width="450"  xui:update-mode="merge"/>

</div>