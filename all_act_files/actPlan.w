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
  class="mdm-list-window jrsm-tab-windowA mdm-small-popup-window window mdm-popup-edit-window-modified-title mdm-inner-window" >

  <div xid="modelBase" xui:update-mode="delete"/>
    <div component="$UI/system/components/justep/model/model" onActive="modelActive" onLoad="modelLoad" onParamsReceive="modelParamsReceive" style="height:auto;top:372px;left:776px;" xid="model" xui:parent="window" xui:update-mode="insert" >
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="actPlanData" >
<column label="i18n{rowId}" name="rowId" type="String" xid="xid11111111111111111111111_6" />
<column label="i18n{planDate}" name="planDate" type="String" xid="xid521111111_6" />
<column label="i18n{workStartDate}" name="workStartDate" type="String" xid="xid31111111111111111111111_6" />
<column label="i18n{workEndDate}" name="workEndDate" type="String" xid="xid41111111111111111111111_6" />
<column label="i18n{restdayFlag}" name="restdayFlag" type="Boolean" xid="xid51111111111111111111111_6" />
<column label="i18n{storeName}" name="storeName" type="String" xid="xid61111111111111111111111_6" />
<column label="i18n{otherSchedule}" name="otherSchedule" type="String" xid="xid71111111111111111111111_6" />
<column label="i18n{studyMeeting}" name="studyMeeting" type="Boolean" xid="xid221111111111111111_6" />
<column label="i18n{mst}" name="mst" type="Boolean" xid="xid321111111111111111_6" />
<column label="i18n{catalogName}" name="catalogName" type="String" xid="xid311111_6" />
<column label="i18n{exceptFlag}" name="exceptFlag" type="String" xid="xid51111_6" />
<column isCalculate="false" label="i18n{storeCode}" name="storeCode" type="String" xid="xid21_6" />
<column label="i18n{studyExceptFlag}" name="studyExceptFlag" type="String" xid="xid1_6" />
<column label="i18n{processFlag}" name="processFlag" type="String" xid="xid2_6" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="storeNameData" >
<column name="rowId" type="String" xid="xid5211_2" />
<column label="i18n{storeName}" name="storeName" type="String" xid="xid6111_2" />
<column label="i18n{storeCode}" name="storeCode" type="String" xid="xid11_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="actActivityData" >
<column name="rowId" type="String" xid="xid111111_3" />
<column label="i18n{smallCatalogName}" name="smallCatalogName" type="String" xid="xid211111_3" />
<column label="i18n{bigCatalogName}" name="bigCatalogName" type="String" xid="xid111_3" />
<column label="i18n{bigCatalogId}" name="bigCatalogId" type="String" xid="xid1_3" />
<column label="i18n{smallCatalogId}" name="smallCatalogId" type="String" xid="xid2_3" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="keymanData" >
<column name="id" type="String" xid="xid12_2" />
<column name="rowId" type="String" xid="xid11111111111111_2" />
<column label="i18n{keymanName}" name="keymanName" type="String" xid="xid21111111111111_2" />
<column label="i18n{actionPlanId}" name="actionPlanId" type="String" xid="xid32111111111111_2" />
<column label="i18n{planFlag}" name="planFlag" type="String" xid="xid41111111111111_2" />
<column label="i18n{operation}" name="operation" type="String" xid="xid61111111111111_2" />
<column label="i18n{keymanCode}" name="keymanCode" type="String" xid="xid2_2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" onDataChange="planActivityDataDataChange" xid="planActivityData" >
<column name="id" type="String" xid="xid1111_3" />
<column label="i18n{smallCatalogName}" name="smallCatalogName" type="String" xid="xid4111111_3" />
<column label="activityId" name="rowId" type="String" xid="xid1211111_3" />
<column label="i18n{activityId}" name="activityId" type="String" xid="xid2111111_3" />
<column label="i18n{bigCatalogName}" name="bigCatalogName" type="String" xid="xid3111111_3" />
<column label="i18n{proposalFlag}" name="proposalFlag" type="Boolean" xid="xid5121111_3" />
<column label="i18n{purposeFlag}" name="purposeFlag" type="Boolean" xid="xid6111111_3" />
<column label="i18n{implementFlag}" name="implementFlag" type="Boolean" xid="xid7111111_3" />
<column label="i18n{operation}" name="operation" type="String" xid="xid8111111_3" />
<column label="i18n{actionPlanId}" name="actionPlanId" type="String" xid="xid9111111_3" />
<rule xid="rule1111111_3" >
<col name="proposalFlag" xid="ruleCol1111111_3" >
<readonly xid="readonly1111111_3" >
<expr xid="default1111111_3" />
</readonly>
</col>
</rule>
<column label="i18n{bigCatalogId}" name="bigCatalogId" type="String" xid="xid3_3" />
<column label="i18n{smallCatalogId}" name="smallCatalogId" type="String" xid="xid4_3" />
</div>
</div>
    <div class="actPlan" style="padding-right:20px;padding-left:20px;" xid="div1_35" xui:parent="window" xui:update-mode="insert" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="margin-top:10px;" xid="row8" >
<div class="x-col" style="text-align:right;" xid="col22" />
<div class="x-col" xid="col71_35" >
<a class="btn btn-default pull-right" component="$UI/system/components/justep/button/button" label="i18n{login}" onClick="button1_4Click" style="width:60px;" xid="button11_35" >
<i xid="i11_35" />
<span xid="span11_35" >
<![CDATA[

i18n{login}]]>
</span>
</a>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="text-align:center;height:30px;" xid="row2" >
<div class="x-col" xid="col4" >
<span checked="true" checkedValue="1" class="x-radio pull-left" component="$UI/system/components/justep/button/radio" label="i18n{workModeM1}" name="sss" onChange="radio31_35Change" style="font-size:13px;font-weight:bold;" uncheckedValue="0" xid="radio31_35" />
</div>
<div class="x-col" xid="col5" >
<span class="x-radio pull-left" component="$UI/system/components/justep/button/radio" label="i18n{workModeM2}" name="sss" onChange="radio411_35Change" style="font-size:13px;font-weight:bold;" xid="radio411_35" />
</div>
<div class="x-col" xid="col6" >
<span class="x-radio pull-left" component="$UI/system/components/justep/button/radio" label="i18n{restdayFlag}" name="sss" onChange="radio51_35Change" style="font-size:13px;font-weight:bold;" xid="radio51_35" />
</div>
<div class="x-col" xid="col81_35" />
<div class="x-col" xid="col11_35" />
<div class="x-col" xid="col21_35" />
</div>
<div class="div31_35" style="height:100%;" xid="div31_35" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:8px;height:35px;" xid="row11_35" >
<div class="x-col" xid="col12_35" >
<h4 style="font-size:13px;font-weight:bold;" xid="h411_35" >































































i18n{workMode}</h4>
</div>
<div class="x-col" xid="col22_35" />
<div class="x-col" xid="col31_35" />
<div class="x-col" xid="col1911_35" >
<input bind-ref="$model.actPlanData.ref(&quot;workStartDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" style="display:none;" xid="input1_11" />
</div>
<div class="x-col" xid="col2011_35" >
<input bind-ref="$model.actPlanData.ref(&quot;workEndDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" style="display:none;" xid="input2_11" />
</div>
<div class="x-col" xid="col211_35" />
<div class="x-col" xid="col221_35" />
<div class="x-col" xid="col231_35" />
</div>
<div xid="div21_35" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="height:38px;" xid="row3" >
<div class="x-col" xid="col7" >
<div class="x-label-edit" component="$UI/system/components/justep/labelEdit/labelEdit" style="padding-left:0px;" xid="labelEdit31_35" >
<label class="x-label" xid="label31_35" >
<![CDATA[i18n{planDate}]]>
</label>
<input class="form-control x-edit" component="$UI/system/components/justep/input/input" dataType="String" readonly="true" xid="input31_35" />
</div>
</div>
<div class="x-col" xid="col151_35" >
<div xid="div5_8" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" style="padding-left:0px;" xid="labelEdit111_1" >
<label class="x-label" xid="label211_1" >
<![CDATA[i18n{storeName}]]>
</label>
<select bind-options="storeNameData" bind-optionsLabel="storeName" bind-optionsValue="storeCode" bind-ref="$model.actPlanData.ref(&quot;storeCode&quot;)" class="form-control x-edit selectS" component="$UI/system/components/justep/select/select" onChange="select11_35Change" xid="select11_35" />
</div>
</div>
</div>
<div class="x-col" style="padding-left:20px;" xid="col32_35" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit2_1" >
<label class="x-label" xid="label3_1" >
<![CDATA[i18n{workStartDate}]]>
</label>
<div class="x-edit" xid="div2_1" >
<input class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" format="hh:mm" onOkfun="iDatetimePicker4_1Okfun" xid="iDatetimePicker4_1" />
</div>
</div>
</div>
<div class="x-col " xid="col51_35" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit1_1" >
<label class="x-label" xid="label2_1" >
<![CDATA[i18n{workEndDate}]]>
</label>
<div class="x-edit" xid="div1_1" >
<input class="form-control date x-iDatetimePicker" component="$UI/system/components/jrsm/iDatetimePicker/iDatetimePicker" format="hh:mm" onOkfun="iDatetimePicker3_1Okfun" xid="iDatetimePicker3_1" />
</div>
</div>
</div>
<div class="x-col" xid="col1_1" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:8px;padding-right:0px;padding-bottom:0px;height:30px;" xid="row5" >
<div class="x-col" xid="col13" >
<span bind-ref="$model.actPlanData.ref(&quot;exceptFlag&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm x-checkboxyy" component="$UI/system/components/justep/button/checkbox" label="i18n{exceptFlag}" onChange="checkbox121_35Change" uncheckedValue="0" xid="checkbox121_35" />
<span bind-ref="$model.actPlanData.ref(&quot;studyExceptFlag&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm x-checkboxmq" component="$UI/system/components/justep/button/checkbox" label="i18n{studyExceptFlag}" onChange="checkbox131_35Change" style="display:none;" uncheckedValue="0" xid="checkbox131_35" />
</div>
<div class="x-col x-col-20" xid="col15" />
<div class="x-col" xid="col41_35" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="text-align:center;border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;height:58px;width:100%;margin-top:5px;display:none;" xid="row12_35" >
<div class="x-col" style="padding-top:18px;" xid="col13_35" >
<span bind-ref="$model.actPlanData.ref(&quot;studyMeeting&quot;)" checked="false" checkedValue="1" class="x-checkbox x-checkbox-sm" component="$UI/system/components/justep/button/checkbox" disabled="true" label="i18n{studyMeeting}" uncheckedValue="0" xid="checkbox141_35" />
</div>
<div class="x-col" style="padding-top:18px;" xid="col33_35" >
<span bind-ref="$model.actPlanData.ref(&quot;mst&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm" component="$UI/system/components/justep/button/checkbox" disabled="true" label="i18n{mst}" uncheckedValue="0" xid="checkbox151_35" />
</div>
<div class="x-col" xid="col1_6" />
<div class="x-col" xid="col2_6" />
<div class="x-col" xid="col3_6" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="display:none;" xid="row1_6" >
<div class="x-col" xid="col4_6" >
<span bind-ref="$model.actPlanData.ref(&quot;processFlag&quot;)" checkedValue="1" class="x-checkbox x-checkbox-sm" component="$UI/system/components/justep/button/checkbox" label="i18n{processFlag}" onChange="checkbox161_35Change" style="margin-top:10px;" uncheckedValue="0" xid="checkbox161_35" />
</div>
<div class="x-col" xid="col5_6" />
<div class="x-col" xid="col6_6" />
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" style="width:667px;" xid="row7" >
<div class="x-col" xid="col19" >
<span class="mdm-grid-title" style="font-weight:bold;font-size:13px;line-height:22px;font-family:PingFangSC-Regular;" xid="span31112_18" >
<![CDATA[i18n{actActualKeymen}]]>
</span>
</div>
<div class="x-col" xid="col20" />
<div class="x-col x-col-20" xid="col21" />
<div class="x-col" xid="col14_35" />
<div class="x-col" xid="col23_35" />
</div>
<div style="height:178px;" xid="div1_8" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="keymanData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid1" >
<columns xid="columns1" >
<column editable="false" name="keymanName" width="200" xid="column1_4" />
<column align="center" editable="true" editor="checkbox" name="planFlag" width="50" xid="column2_4" />
</columns>
</div>
</div>
<div style="height:210px;width:100%;" xid="div2_8" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="height:31px;width:100%;" xid="row9" >
<div class="x-col" style="padding-top:9px;" xid="col2" >
<span class="mdm-grid-title" style="font-weight:bold;font-size:13px;line-height:22px;font-family:PingFangSC-Regular;" xid="span31111_18" >




































































































i18n{actionPlanActivity}</span>
</div>
<div class="x-col" style="text-align:right;padding-top:5px;" xid="col11" >
<a class="btn btn-default btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="button" onClick="button3Click" xid="button3" >
<i class="icon-android-add" xid="i3" />
<span xid="span1" />
</a>
</div>
</div>
<div style="width:100%;height:178px;" xid="div1_2" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="planActivityData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="100%" xid="grid4" >
<columns xid="columns111111_20" >
<column align="center" name="operation" width="50%" xid="column51_20" />
<column disableEditorDisplay="false" editable="true" editor="component" multiRowEditor="false" name="smallCatalogName" width="200%" xid="column11_20" >
<editor xid="editor11_20" >
<div bind-ref="ref('smallCatalogName')" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" onUpdateValue="gridSelect11_20UpdateValue" xid="gridSelect11_20" >
<option data="actActivityData" value="smallCatalogName" xid="option11_20" />
</div>
</editor>
</column>
<column align="center" editable="true" editor="checkbox" name="proposalFlag" width="50%" xid="column21_20" />
<column align="center" editable="true" editor="checkbox" name="purposeFlag" width="50%" xid="column31_20" />
<column align="center" editable="true" editor="checkbox" name="implementFlag" width="50%" xid="column41_20" />
</columns>
</div>
</div>
</div>
<div class="x-label-edit x-label-top x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" style="padding:0px 0px 0px 0px;margin:10px 0px 0px 0px;width:100%;" xid="labelEdit8" >
<label class="mdm-grid-title" style="font-weight:bold;font-size:13px;line-height:22px;font-family:PingFangSC-Regular;" xid="label8" >














































































































i18n{otherSchedule}</label>
<textarea bind-ref="$model.actPlanData.ref(&quot;otherSchedule&quot;)" class="form-control x-edit" component="$UI/system/components/justep/textarea/textarea" style="height:110px;width:100%;margin:0px 0px 20px 0px;" xid="textarea1" />
</div>
</div>
</div>
<div class="div41_35" style="height:71px;text-align:center;border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;display:none;" xid="div41_35" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="height:52px;" xid="row21_35" >
<div class="x-col" xid="col42_35" >
<h4 style="margin-top:25px;" xid="h412_35" >
<![CDATA[i18n{restdayFlag}]]>
</h4>
</div>
</div>
</div>
</div>

</div>