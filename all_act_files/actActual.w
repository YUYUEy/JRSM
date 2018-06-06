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
  class="mdm-list-window mdm-small-popup-window my-segmemt-window window mdm-inner-window jrsm-tab-window" >

  <div xid="modelBase" xui:update-mode="delete"/>
  <div xid="exportWd" xui:update-mode="delete"/>
    <div component="$UI/system/components/justep/model/model" onLoad="modelLoad" onParamsReceive="modelParamsReceive" style="height:auto;top:20px;left:589px;" xid="model" xui:parent="window" xui:update-mode="insert" >
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" isTree="false" xid="actActualKeymenData" >
<column label="id" name="id" type="Integer" xid="xid421111_2" />
<column label="rowId" name="rowId" type="Integer" xid="xid11121111111111111_2" />
<master xid="default1111111111111111_2" />
<treeOption xid="default2111111111111111_2" />
<column label="i18n{action}" name="action" type="String" xid="xid22_2" />
<column label="i18n{keymanName}" name="keymanName" type="String" xid="xid21121111111111111_2" />
<column label="i18n{planFlag}" name="planFlag" type="Boolean" xid="xid31121111111111111_2" />
<column label="i18n{proposalFlag}" name="proposalFlag" type="Boolean" xid="xid41121111111111111_2" />
<column label="i18n{enlargeFlag}" name="enlargeFlag" type="Boolean" xid="xid121111111111111_2" />
<rule xid="rule11111111111_2" >
<col name="planFlag" xid="ruleCol11111111111_2" >
<readonly xid="readonly11111111111_2" >
<expr xid="default11111111111_2" />
</readonly>
</col>
</rule>
<column label="i18n{reportFlag}" name="reportFlag" type="Boolean" xid="xid221111111111111_2" />
<column label="i18n{msgExchangFlag}" name="msgExchangFlag" type="String" xid="xid321111111111111_2" />
<column label="i18n{enlargeCnt}" name="enlargeCnt" type="String" xid="xid421111111111111_2" />
<column label="actionActualId" name="actionActualId" type="String" xid="xid4121_2" />
<column label="keymanId" name="keymanId" type="String" xid="xid413_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" onDataChange="actActualItemstudyDataDataChange" xid="actActualItemstudyData" >
<column label="id" name="id" type="String" xid="xid31211111111_3" />
<column label="ID" name="rowId" type="Integer" xid="xid1121111111111111_3" />
<column label="i18n{itemCatalogCode}" name="itemCatalogCode" type="String" xid="xid1212111111111111_3" />
<column label="i18n{keymenNames}" name="keymenNames" type="String" xid="xid1311111111111111_3" />
<column label="卖场担当者" name="storeChargerCnt" type="Integer" xid="xid1411111111111111_3" />
<column label="担当者外" name="exceptChargerCnt" type="Integer" xid="xid1511111111111111_3" />
<column label="参与实施的人数合计" name="actionTotalKeymenCnt" type="Integer" xid="xid1611111111111111_3" />
<column label="i18n{times}" name="times" type="String" xid="xid1711111111111111_3" />
<column label="i18n{implementationRate}" name="implementationRate" type="String" xid="xid1811111111111111_3" />
<column label="i18n{action}" name="action" type="String" xid="xid1911111111111111_3" />
<column label="i18n{keymenNames}" name="keymenCodes" type="String" xid="xid211311111_3" />
<column label="activityId" name="activityId" type="Integer" xid="xid22111111_3" />
<column label="卖场担当者总人数" name="totalChargerCnt" type="String" xid="xid71111_3" />
<column label="关键人总数" name="totalKeymenCnt" type="String" xid="xid81111_3" />
<column label="参与实施关键人数" name="actionKeymenCnt" type="String" xid="xid91111_3" />
<column label="actionActualId" name="actionActualId" type="String" xid="xid3111_3" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="actActualVocData" >
<column label="id" name="id" type="String" xid="xid4111111_1" />
<column label="ID" name="rowId" type="Integer" xid="xid1111111111111111_1" />
<column label="i18n{action}" name="action" type="String" xid="xid911111111111_1" />
<column label="i18n{itemCatalogCode}" name="itemCatalogCode" type="String" xid="xid2111111111111111_1" />
<column label="i18n{vocType}" name="vocType" type="String" xid="xid3111111111111111_1" />
<column label="i18n{vocContent}" name="vocContent" type="String" xid="xid4111111111111111_1" />
<column label="i18n{portrait}" name="portrait" type="String" xid="xid5111111111111111_1" />
<column label="i18n{saleKeypoint}" name="saleKeypoint" type="String" xid="xid6111111111111111_1" />
<column label="i18n{itemCode}" name="itemCode" type="String" xid="xid7111111111111111_1" />
<column label="i18n{shortAnswer}" name="shortAnswer" type="String" xid="xid8111111111111111_1" />
<column label="actionActualId" name="actionActualId" type="Integer" xid="xid32111_1" />
<column label="picRefId" name="picRefId" type="String" xid="xid1_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="actActualStoreData" >
<column label="id" name="id" type="String" xid="xid51111_2" />
<column label="ID" name="rowId" type="Integer" xid="xid11111111_2" />
<column label="i18n{itemCatalogCode}" name="itemCatalogCode" type="String" xid="xid21111111_2" />
<column label="i18n{showStatus}" name="showStatus" type="String" xid="xid31111111_2" />
<column label="i18n{remove}" name="remove" type="String" xid="xid4111111_2" />
<column label="i18n{action}" name="action" type="String" xid="xid121111_2" />
<column label="actionActualId" name="actionActualId" type="Integer" xid="xid411_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="actActualGuiderData" >
<column name="id" type="String" xid="xid611111_2" />
<column label="ID" name="rowId" type="Integer" xid="xid51111111_2" />
<column label="i18n{itemCatalogCode}" name="itemCatalogCode" type="String" xid="xid61111111_2" />
<column label="i18n{makerCode}" name="makerCode" type="String" xid="xid71111111_2" />
<column label="i18n{residentCnt}" name="residentCnt" type="Integer" xid="xid81121111_2" />
<column label="i18n{weekendCnt}" name="weekendCnt" type="Integer" xid="xid91121111_2" />
<column label="i18n{action}" name="action" type="String" xid="xid101111111_2" />
<column label="actionActualId" name="actionActualId" type="Integer" xid="xid1_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="keymanNamedData" >
<column label="id" name="id" type="String" xid="xid111_3" />
<column label="ID" name="rowId" type="String" xid="xid11121_3" />
<column label="i18n{keymanName}" name="keymanName" type="String" xid="xid21121_3" />
<column label="totalKeymenCnt" name="totalKeymenCnt" type="Integer" xid="xid61_3" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="actActualData" >
<column name="id" type="String" xid="xid71111112111_3" />
<column label="rowId" name="rowId" type="Integer" xid="xid1111111111111111111111111_3" />
<column label="i18n{actionDate}" name="actionDate" type="String" xid="xid2111111111111111111111111_3" />
<column label="i18n{planDate}" name="planDate" type="String" xid="xid3111111111111111111111111_3" />
<column label="i18n{actionPlanId}" name="actionPlanId" type="Integer" xid="xid4111111111111111111111111_3" />
<column label="i18n{inDate}" name="inDate" type="String" xid="xid5111111111111111111111111_3" />
<column label="i18n{outDate}" name="outDate" type="String" xid="xid6111111111111111111111111_3" />
<column label="i18n{storeName}" name="storeName" type="String" xid="xid711111111111111111111111_3" />
<column label="i18n{storeCode}" name="storeCode" type="String" xid="xid821111111111111111111111_3" />
<column label="i18n{enlargeCnt}" name="enlargeCnt" type="String" xid="xid921111111111111111111111_3" />
<column label="i18n{storeHelpFlag}" name="storeHelpFlag" type="String" xid="xid1211111111111111111111111_3" />
<column label="i18n{showPosition}" name="showPosition" type="String" xid="xid1311111111111111111111111_3" />
<column label="i18n{actionType}" name="actionType" type="String" xid="xid12111111_3" />
<column label="i18n{studyExceptFlag}" name="exceptFlag" type="String" xid="xid511_3" />
<column label="i18n{studyMeeting}" name="studyMeeting" type="String" xid="xid611_3" />
<column label="i18n{mst}" name="mst" type="String" xid="xid721_3" />
<column label="i18n{processFlag}" name="processFlag" type="String" xid="xid21_3" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="bdItemCatalogData" >
<column label="ID" name="rowId" type="Integer" xid="xid11111_1" />
<column label="i18n{catalogName}" name="catalogName" type="String" xid="xid21111_1" />
<column label="i18n{catalogCode}" name="catalogCode" type="String" xid="xid1212_1" />
<column label="gcatalogCode" name="gcatalogCode" type="String" xid="xid13_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="makerCode" xid="bdMakerData" >
<column label="i18n{makerCode}" name="makerCode" type="String" xid="xid32111111_2" />
<column label="makerName" name="makerName" type="String" xid="xid311121_2" />
<column label="gcatalogCode" name="gcatalogCode" type="String" xid="xid6_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="actActualActivityData" >
<column name="id" type="Integer" xid="xid1311111111_3" />
<column label="id" name="rowId" type="Integer" xid="xid111111111111_3" />
<column label="i18n{action}" name="action" type="String" xid="xid211111111111_3" />
<column label="i18n{bigCatalogName}" name="bigCatalogName" type="String" xid="xid311111111111_3" />
<column label="i18n{samllCatalogName}" name="samllCatalogName" type="String" xid="xid411211111111_3" />
<column label="i18n{proposalFlag}" name="proposalFlag" type="Boolean" xid="xid511211111111_3" />
<column label="i18n{purposeFlag}" name="purposeFlag" type="Boolean" xid="xid611211111111_3" />
<column label="i18n{implementFlag}" name="implementFlag" type="Boolean" xid="xid711211111111_3" />
<column label="i18n{implementPlanDate}" name="implementPlanDate" type="Date" xid="xid812111111111_3" />
<column label="bigCatalogId" name="bigCatalogId" type="Integer" xid="xid21211111_3" />
<column label="samllCatalogId" name="samllCatalogId" type="Integer" xid="xid31111111_3" />
<column label="actionActualId" name="actionActualId" type="Integer" xid="xid4121111_3" />
<column label="activityId" name="activityId" type="String" xid="xid211_3" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="actActivityData" >
<column name="rowId" type="Integer" xid="xid911111_2" />
<column label="i18n{bigCatalogName}" name="bigCatalogName" type="String" xid="xid1011111_2" />
<column label="i18n{smallCatalogName}" name="smallCatalogName" type="String" xid="xid1221111_2" />
<column label="i18n{implementActualId}" name="implementActualId" type="String" xid="xid231_2" />
<column label="i18n{proposalActualId}" name="proposalActualId" type="String" xid="xid311_2" />
<column label="i18n{purposeActualId}" name="purposeActualId" type="String" xid="xid412_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="bdItemGcatalogData" >
<column label="rowId" name="rowId" type="String" xid="xid11_1" />
<column label="itemGcatalogCode" name="itemGcatalogCode" type="String" xid="xid21_1" />
<column label="itemGcatalogName" name="itemGcatalogName" type="String" xid="xid31_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="storeNameData" >
<column label="rowId" name="rowId" type="Integer" xid="xid1_3" />
<column label="storeCode" name="storeCode" type="String" xid="xid2_3" />
<column label="storeName" name="storeName" type="String" xid="xid3_3" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="bdItemCatalogCopyData" >
<column label="ID" name="rowId" type="Integer" xid="column411_3" />
<column label="i18n{catalogName}" name="catalogName" type="String" xid="column111_3" />
<column label="i18n{catalogCode}" name="catalogCode" type="String" xid="column211_3" />
<column label="gcatalogCode" name="gcatalogCode" type="String" xid="column311_3" />
<column label="keymanId" name="keymanId" type="String" xid="xid4_3" />
</div>
</div>
    <div component="$UI/system/components/justep/model/model" style="position:absolute;;left:57.0px;top:402.0px" xid="model1_1" xui:parent="window" xui:update-mode="insert" />
    <div class="maxMain" style="width:100%;" xid="div1_13" xui:parent="window" xui:update-mode="insert" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;height:40px;" xid="row1011_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col321_16" >
<span bind-click="radio41_7Click" checked="true" checkedValue="W1" class="x-radio" component="$UI/system/components/justep/button/radio" label="i18n{actionTypeM1}" name="sss" onChange="radio4_5Change" uncheckedValue="0" xid="radio4111_9" />
</div>
<div class="x-col" xid="col631_16" >
<span bind-click="radio412_7Click" checked="false" checkedValue="1" class="x-radio" component="$UI/system/components/justep/button/radio" label="i18n{actionTypeM2}" name="sss" onChange="radio41_5Change" uncheckedValue="0" xid="radio4112_9" />
</div>
<div class="x-col" xid="col1_7" />
<div class="x-col" xid="col2_7" />
<div class="x-col" xid="col3_7" >
<a class="btn btn-default pull-right" component="$UI/system/components/justep/button/button" label="i18n{save}" onClick="button1_4Click" style="width:60px;" xid="button111_16" >
<i xid="i121_16" />
<span xid="span131_16" >

i18n{save}</span>
</a>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="height:45px;" xid="row011_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col5_8" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1_2" >
<label class="x-label" xid="label1_2" >
<![CDATA[i18n{planDate}]]>
</label>
<div class="x-edit" xid="div1_2" >
<input class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" onOkfun="input3_5Okfun" xid="input3_5" />
</div>
</div>
</div>
<div class="x-col" xid="col6_8" />
<div class="x-col" xid="col7_8" />
<div class="x-col" xid="col8_8" >
<input bind-ref="$model.actActualData.ref(&quot;inDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" style="display:none;" xid="input121_16" />
<input bind-ref="$model.actActualData.ref(&quot;outDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" style="display:none;" xid="input211_16" />
</div>
<div class="x-col" xid="col4_4" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="height:45px;" xid="row111_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col221_16" >
<div class="x-label-edit" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4_5" >
<label class="x-label" xid="label4_5" >
<![CDATA[i18n{actionDate}]]>
</label>
<input class="form-control x-edit" component="$UI/system/components/justep/input/input" disabled="true" xid="input2_5" />
</div>
</div>
<div class="x-col" xid="col1211_16" >
<div class="x-label-edit" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit3_5" >
<label class="x-label" xid="label3_5" >
<![CDATA[i18n{storeName}]]>
</label>
<select bind-options="storeNameData" bind-optionsLabel="storeName" bind-optionsValue="storeCode" bind-ref="$model.actActualData.ref(&quot;storeCode&quot;)" class="form-control x-edit" component="$UI/system/components/justep/select/select" onChange="select2_5Change" xid="select2_5" />
</div>
</div>
<div class="x-col" xid="col411_16" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1_3" >
<label class="x-label" xid="label1_3" >
<![CDATA[i18n{inDate}]]>
</label>
<div class="x-edit" xid="div1_3" >
<input class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" format="hh:mm" onOkfun="iDatetimePicker1_1Okfun" xid="iDatetimePicker1_1" />
</div>
</div>
</div>
<div class="x-col" xid="col911_16" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4_3" >
<label class="x-label" xid="label4_3" >
<![CDATA[i18n{outDate}]]>
</label>
<div class="x-edit" xid="div4_3" >
<input class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" format="hh:mm" onOkfun="iDatetimePicker2_3Okfun" xid="iDatetimePicker2_3" />
</div>
</div>
</div>
<div class="x-col" xid="col3_4" />
</div>
<div class="div221_4" style="width:100%;display:none;height:100%;" xid="div221_4" >
<span bind-ref="$model.actActualData.ref(&quot;exceptFlag&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm x-checkboxmq" component="$UI/system/components/justep/button/checkbox" label="i18n{studyexcept}" onChange="checkbox1311_4Change" style="margin-left:10px;" uncheckedValue="0" xid="checkbox1311_4" />
<div class="x-row" component="$UI/system/components/justep/row/row" style="margin-top:10px;text-align:center;border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;width:100%;height:60px;" xid="row121_4" >
<div class="x-col" style="padding-top:18px;" xid="col131_4" >
<span bind-ref="$model.actActualData.ref(&quot;studyMeeting&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm" component="$UI/system/components/justep/button/checkbox" disabled="true" label="i18n{studyMeeting}" uncheckedValue="0" xid="checkbox1411_4" />
</div>
<div class="x-col" style="padding-top:18px;" xid="col331_4" >
<span bind-ref="$model.actActualData.ref(&quot;mst&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm" component="$UI/system/components/justep/button/checkbox" disabled="true" label="i18n{mst}" uncheckedValue="0" xid="checkbox1511_4" />
</div>
<div class="x-col" xid="col1_4" />
<div class="x-col" xid="col2_4" />
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="display:none;" xid="row1_1" >
<div class="x-col" xid="col1_1" >
<span bind-ref="$model.actActualData.ref(&quot;processFlag&quot;)" class="x-checkbox x-checkbox-sm" component="$UI/system/components/justep/button/checkbox" label="i18n{processFag}" onChange="checkbox1611_4Change" style="margin-top:10px;margin-left:10px;" xid="checkbox1611_4" />
</div>
<div class="x-col" xid="col2_1" />
<div class="x-col" xid="col3_1" />
</div>
<div class="x-row row311_16" component="$UI/system/components/justep/row/row" xid="row311_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col711_16" >
<span class="mdm-grid-title" style="font-weight:800;font-size:13px;line-height:22px;" xid="span2111_16" >
<![CDATA[

i18n{actActualKeymen}]]>
</span>
<a class="btn btn-default btn-only-icon" component="$UI/system/components/justep/button/button" icon="icon-android-add" onClick="button1_5Click" xid="button1_5" >
<i class="icon-android-add" xid="i1_5" />
<span xid="span1_5" />
</a>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row1111_16" >
<div class="x-col" xid="col1121_16" >
<div style="height:178px;" xid="div1_4" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actActualKeymenData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid1" >
<columns xid="columns1" >
<column align="center" name="action" width="70" xid="column15_2" />
<column disableEditorDisplay="false" editable="true" editor="component" name="keymanName" width="200" xid="column16_2" >
<editor xid="editor1_2" >
<div bind_refData="$model.actActualKeymenData.ref(&quot;keymanName&quot;)" class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" config="keymen" displayAttr="keymenName" onChooseAfter="iQuickSearch1_1ChooseAfter" queryWhen="delay" valueAttr="rowId" xid="iQuickSearch1_1" />
</editor>
</column>
<column align="center" editable="true" editor="checkbox" name="planFlag" width="70" xid="column17_2" />
<column align="center" editable="true" editor="checkbox" name="proposalFlag" width="70" xid="column18_2" />
<column align="center" editable="true" editor="checkbox" name="enlargeFlag" width="70" xid="column19_2" />
<column align="center" editable="true" editor="checkbox" name="reportFlag" width="70" xid="column20_2" />
<column align="center" editable="true" editor="checkbox" name="msgExchangFlag" width="70" xid="column21_2" />
</columns>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;" xid="row2_14" >
<div class="x-col" xid="col5_14" >
<span class="mdm-grid-title" style="font-weight:800;font-size:13px;line-height:22px;" xid="span11_14" >
<![CDATA[

i18n{actActualwedfgh1}]]>
</span>
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="button" xid="button1_2" >
<i class="icon-android-add" xid="i1_2" />
<span xid="span5_2" />
</a>
<div bind-ref="$model.actActualData.ref(&quot;storeCode&quot;)" class="x-iDyGrid" component="$UI/system/components/jrsm/iDyGrid/iDyGrid" dataRef="$model.actActualData.ref(&quot;rowId&quot;)" dyKey="dy_goodskeyman" onAfterRender="iDyGrid1_2AfterRender" style="margin-top:4px;" xid="iDyGrid1_2" />
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row1_14" >
<div class="x-col" xid="col2_14" />
</div>
</div>
</div>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row411_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col1021_16" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;" xid="row5111_16" >
<div class="x-col span11_4" style="display:none;" xid="col5_5" >
<span class="mdm-grid-title " style="font-weight:800;font-size:14px;line-height:22px;font-family:PingFangSC-Regular;" xid="span11_4" >
<![CDATA[i18n{actionPlanActivity1}]]>
</span>
</div>
<div class="x-col span3111_16" xid="col11111_16" >
<span class="mdm-grid-title " style="font-weight:800;font-size:13px;line-height:22px;" xid="span3111_16" >

i18n{actionPlanActivity}</span>
</div>
<div class="x-col" xid="col531_16" >
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="button" onClick="button2Click" xid="button4111_16" >
<i class="icon-android-add" xid="i4111_16" />
<span xid="span4111_16" />
</a>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row2111_16" >
<div class="x-col" xid="col41111_16" >
<div style="height:178px;" xid="div2_4" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actActualActivityData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" onCellRender="grid2CellRender" onRowClick="grid2RowClick" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid2" >
<columns xid="columns211111_16" >
<column align="center" name="action" width="50%" xid="column121_16" />
<column align="left" disableEditorDisplay="false" editable="true" editor="component" name="samllCatalogName" width="200%" xid="column221_16" >
<editor xid="editor111_16" >
<div bind-ref="ref('samllCatalogName')" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" onUpdateValue="gridSelect111_16UpdateValue" xid="gridSelect111_16" >
<option data="actActivityData" value="smallCatalogName" xid="option111_16" />
</div>
</editor>
</column>
<column align="center" editable="true" editor="checkbox" name="proposalFlag" width="50" xid="column321_16" />
<column align="center" editable="true" editor="checkbox" name="purposeFlag" width="50" xid="column421_16" />
<column align="center" editable="true" editor="checkbox" name="implementFlag" width="50" xid="column521_16" />
<column align="center" editable="true" editor="input" name="implementPlanDate" width="100" xid="column621_16" />
</columns>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row511_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col1311_16" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;" xid="row4211_16" >
<div class="x-col" xid="col8211_16" >
<span class="mdm-grid-title span4121_16" style="float:left;font-weight:800;font-size:14px;line-height:22px;font-family:PingFangSC-Regular;" xid="span4121_16" >
<![CDATA[

i18n{actActualItemstudy}]]>
</span>
<span class="mdm-grid-title span21_4" style="font-weight:800;font-size:14px;line-height:22px;font-family:PingFangSC-Regular;display:none;float:left;" xid="span21_4" >
<![CDATA[i18n{actActualItemstudy1}]]>
</span>
<span style="margin:4px 0px 0px 6px;float:left;" xid="span4_2" >
<![CDATA[i18n{vocinput2}]]>
</span>
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="i18n{LatestState}" onClick="button3Click" xid="button3" >
<i class="icon-android-add" xid="i6211_16" />
<span xid="span6211_16" >

i18n{LatestState}</span>
</a>
</div>
</div>
<div class="x-row row31111_16" component="$UI/system/components/justep/row/row" xid="row31111_16" >
<div class="x-col " xid="col71111_16" >
<div style="height:178px;width:100%;" xid="div6_4" >
<div altRows="true" component="$UI/system/components/justep/grid/grid" data="actActualItemstudyData" height="100%" hiddenCaptionbar="true" onCellRender="grid3CellRender" showRowNumber="true" width="100%" xid="grid3" >
<columns xid="columns11_1" >
<column data="bdItemCatalogData" name="action" onUpdateValue="gridSelect6111_16UpdateValue" width="50" xid="column231_1" />
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="itemCatalogCode" width="100" xid="column171_1" >
<editor xid="editor31_1" >
<div bind-ref="ref('itemCatalogCode')" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" onUpdateValue="gridSelect5111_16UpdateValue" xid="gridSelect31_1" >
<option data="bdItemCatalogData" label="catalogName" value="catalogCode" xid="option31_1" />
</div>
</editor>
</column>
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="keymenCodes" width="100" xid="column241_1" >
<editor xid="editor41_1" >
<div bind-labelRef="ref(&quot;keymenNames&quot;)" bind-ref="ref(&quot;keymenCodes&quot;)" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" multiselect="true" onShowOption="gridSelect41_1ShowOption" onUpdateValue="gridSelect6111_16UpdateValue" xid="gridSelect41_1" >
<option data="keymanNamedData" label="keymanName" multiboxonly="false" value="rowId" xid="option41_1" />
</div>
</editor>
</column>
<column editable="true" editor="input" name="storeChargerCnt" width="100" xid="column181_1" />
<column editable="true" editor="input" name="exceptChargerCnt" width="100" xid="column191_1" />
<column name="actionTotalKeymenCnt" width="100" xid="column201_1" />
<column editable="true" editor="input" name="times" width="100" xid="column211_1" />
<column name="implementationRate" width="100" xid="column221_1" />
</columns>
</div>
</div>
</div>
</div>
<div class="x-row row1_5" component="$UI/system/components/justep/row/row" style="display:none;" xid="row1_5" >
<div class="x-col " xid="col41_5" >
<div style="height:178px;width:100%;" xid="div2_2" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actActualItemstudyData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid111_5" >
<columns xid="columns111_5" >
<column name="action" width="100" xid="column111_5" />
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="itemCatalogCode" width="100" xid="column811_5" >
<editor xid="editor211_5" >
<div bind-ref="ref(&quot;itemCatalogCode&quot;)" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect111_5" >
<option data="bdItemCatalogData" label="catalogName" value="catalogCode" xid="option111_5" />
</div>
</editor>
</column>
<column editable="true" editor="input" name="times" width="100" xid="column91_5" />
</columns>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row611_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col1611_16" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;" xid="row1211_16" >
<div class="x-col" xid="col1_2" >
<span class="mdm-grid-title span5111_16" style="font-weight:800;font-size:13px;line-height:22px;float:left;" xid="span5111_16" >

i18n{vocinput}</span>
<span class="mdm-grid-title span11_5" style="font-weight:800;font-size:14px;line-height:22px;font-family:PingFangSC-Regular;display:none;float:left;" xid="span11_5" >
<![CDATA[i18n{vocinput1}]]>
</span>
<span style="float:left;margin:2px 0px 0px 6px;" xid="span3_2" >
<![CDATA[i18n{notes}]]>
</span>
<span style="margin:2px 0px 0px 2px;float:left;" xid="span1_2" >
<![CDATA[i18n{customerDetails}]]>
</span>
<span style="margin:2px 0px 0px 2px;float:left;" xid="span2_2" >
<![CDATA[i18n{situation}]]>
</span>
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="button" onClick="button4Click" xid="button4" >
<i class="icon-android-add" xid="i111_16" />
<span xid="span121_16" />
</a>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row2211_16" />
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row3111_16" />
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row4311_16" />
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row5211_16" >
<div class="x-col" xid="col13211_16" >
<div style="height:178px;" xid="div3_4" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actActualVocData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid4" >
<columns xid="columns1111_16" >
<column align="center" name="action" width="80" xid="column1_5" />
<column name="itemCatalogCode" width="100" xid="column2_5" />
<column name="vocType" width="100" xid="column3_5" />
<column name="vocContent" width="100" xid="column4_5" />
<column align="center" name="portrait" width="100" xid="column5_5" />
<column name="saleKeypoint" width="100" xid="column6_5" />
<column name="itemCode" width="100" xid="column7_5" />
<column name="shortAnswer" width="100" xid="column8_5" />
</columns>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="x-row row711_16" component="$UI/system/components/justep/row/row" xid="row711_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col1921_16" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;" xid="row1121_16" >
<span class="mdm-grid-title" style="font-weight:800;font-size:13px;line-height:22px;display:none;" xid="span21_3" >

i18n{actActualGuider}</span>
<div class="x-col" xid="col1131_16" >
<span class="mdm-grid-title" style="font-weight:800;font-size:13px;line-height:22px;" xid="span6111_16" >
<![CDATA[
















i18n{actActualStore}]]>
</span>
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="button" onClick="button3_2Click" xid="button3_2" >
<i class="icon-android-add" xid="i3_2" />
<span xid="span8_2" />
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="i18n{LatestState}" onClick="button5Click" xid="button5" >
<i xid="i1111_16" />
<span xid="span1121_16" >

i18n{LatestState}</span>
</a>

</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row2121_16" >
<div class="x-col" xid="col4111_16" >
<div style="height:178px;" xid="div4_4" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actActualStoreData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid5" >
<columns xid="columns21111111_16" >
<column align="center" name="action" width="50" xid="column9111_16" />
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="itemCatalogCode" width="200" xid="column6111_16" >
<editor xid="editor5111_16" >
<div bind-ref="ref('itemCatalogCode')" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect4111_16" >
<option data="bdItemCatalogData" label="catalogName" value="catalogCode" xid="option4111_16" />
</div>
</editor>
</column>
<column align="center" editable="true" editor="checkbox" name="showStatus" width="100" xid="column1021_16" />
</columns>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="x-row row811_16" component="$UI/system/components/justep/row/row" xid="row811_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col2221_16" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;" xid="row3121_16" >
<div class="x-col" xid="col5111_16" >
<span class="mdm-grid-title" style="font-weight:800;font-size:13px;line-height:22px;" xid="span7111_16" >
<![CDATA[















i18n{actActualGuider}]]>
</span>
<span xid="span6_2" >
<![CDATA[i18n{actActualGuider1}]]>
</span>
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="button" onClick="button2_2Click" xid="button2_2" >
<i class="icon-android-add" xid="i2_2" />
<span xid="span7_2" />
</a>
<a class="btn btn-default" component="$UI/system/components/justep/button/button" label="i18n{LatestState}" onClick="button6Click" xid="button6" >
<i xid="i2111_16" />
<span xid="span2121_16" >

i18n{LatestState}</span>
</a>

</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row4111_16" >
<div class="x-col" xid="col8111_16" >
<div style="height:178px;" xid="div5_4" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actActualGuiderData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid6" >
<columns xid="columns3111_16" >
<column align="center" name="action" width="50" xid="column3611_16" />
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="itemCatalogCode" width="200" xid="column3211_16" >
<editor xid="editor711_16" >
<div bind-ref="ref('itemCatalogCode')" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" onUpdateValue="gridSelect4_9UpdateValue" xid="gridSelect411_16" >
<option data="bdItemCatalogData" label="catalogName" value="catalogCode" xid="option411_16" />
</div>
</editor>
</column>
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="makerCode" width="100" xid="column3811_16" >
<editor xid="editor1111_16" >
<div bind-ref="ref('makerCode')" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect711_16" >
<option autoLoad="false" data="bdMakerData" filter=" $row.val(&quot;gcatalogCode&quot;)  ==  $model.bdItemCatalogData.val(&quot;gcatalogCode&quot;)" label="makerName" value="makerCode" xid="option711_16" />
</div>
</editor>
</column>
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="residentCnt" width="100" xid="column3411_16" >
<editor xid="editor1_1" >
<select bind-optionsCaption="请选择" bind-ref="ref(&quot;residentCnt&quot;)" class="form-control x-edit-focusin" component="$UI/system/components/justep/select/select" xid="select1_1" >
<option value="0.5" >

o.5</option>
<option value="1" >

1</option>
<option value="1.5" >

1.5</option>
<option value="2" >

2</option>
<option value="2.5" >

2.5</option>
<option value="3" >

3</option>
<option value="3.5" >

3.5</option>
<option value="4" >

4</option>
<option value="4.5" >

4.5</option>
<option value="5" >

5</option>
<option value="5.5" >

5.5</option>
<option value="6" >

6</option>
</select>
</editor>
</column>
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="weekendCnt" width="100" xid="column1221_16" >
<editor xid="editor2_1" >
<select bind-optionsCaption="请选择" bind-ref="ref(&quot;weekendCnt&quot;)" class="form-control x-edit-focusin" component="$UI/system/components/justep/select/select" xid="select2_1" >
<option value="0.5" >

o.5</option>
<option value="1" >

1</option>
<option value="1.5" >

1</option>
<option value="1.5" >

1.5</option>
<option value="2" >

1.5</option>
<option value="2" >

2</option>
<option value="2.5" >

2.5</option>
<option value="3" >

3</option>
<option value="3.5" >

3.5</option>
<option value="4" >

4</option>
<option value="5" >

5</option>
<option value="5.5" >

5.5</option>
<option value="6" >

6</option>
<option value="6.5" >

6.5</option>
<option value="7" >

7</option>
</select>
</editor>
</column>
</columns>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="x-row row911_16" component="$UI/system/components/justep/row/row" xid="row911_16" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" style="padding-top:5px;" xid="col811_16" >
<span class="pull-left mdm-grid-title" style="font-weight:800;font-size:13px;line-height:22px;margin-top:3px;" xid="span81111_5" >

i18n{storeHead}</span>
<span bind-ref="$model.actActualData.ref(&quot;storeHelpFlag&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm pull-left" component="$UI/system/components/justep/button/checkbox" label="i18n{shopPu}" style="margin:5px 0px 0px 50px;" uncheckedValue="0" xid="checkbox2111_5" />
<div class="x-label-edit pull-left" component="$UI/system/components/justep/labelEdit/labelEdit" style="width:315px;" xid="labelEdit1111_5" >
<label class="x-label" title="i18n{horn}" xid="label1111_5" >

i18n{horn}</label>
<select bind-options="bdItemGcatalogData" bind-optionsLabel="itemGcatalogName" bind-optionsValue="itemGcatalogCode" bind-ref="$model.actActualData.ref(&quot;showPosition&quot;)" class="form-control x-edit select1211_5" component="$UI/system/components/justep/select/select" xid="select1211_5" />
</div>
</div>
</div>
<div style="height:30px;width:100%;" xid="div11_5" />
</div>
    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="true" height="500px" onReceived="windowDialog1_4Received" resizable="true" showTitle="true" src="$UI/jrsm/module/act/actVocLogin.w" status="normal" title="i18n{vocLogin}" width="600px" xid="windowDialog1_4" xui:parent="window" xui:update-mode="insert" />
    <span component="$UI/system/components/justep/windowDialog/windowDialog" height="500px" showTitle="true" src="$UI/jrsm/module/act/storeStatus1.w" status="normal" title="123456" width="600px" xid="windowDialog1_2" xui:parent="window" xui:update-mode="insert" />

</div>