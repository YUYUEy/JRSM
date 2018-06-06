<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:365px;left:587px;" onLoad="modelLoad" onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryStoreNameData" idColumn="rowId"><column name="rowId" type="String" xid="xid1"></column>
  <column name="storeCode" type="String" xid="xid24"></column>
  <column name="storeName" type="String" xid="xid2"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bigTypeNameData" idColumn="rowId">
   <column name="rowId" type="String" xid="column1"></column>
  <column name="typeName" type="String" xid="column2"></column>
  <column name="typeColor" type="String" xid="xid16"></column>
  <column name="bigCatalogName" type="String" xid="xid21"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="smallTypeNameData" idColumn="rowId">
   <column name="rowId" type="String" xid="xid3"></column>
   <column name="typeName" type="String" xid="xid4"></column></div>
  
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryItemCatalogsData" idColumn="rowId">
   <column name="rowId" type="String" xid="xid11"></column><column name="catalogName" type="String" xid="xid12"></column><column name="catalogCode" type="String" xid="xid12"></column></div><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addActivityData" idColumn="rowId">
   <column name="rowId" type="String" xid="xid5"></column>
  <column name="bdItemCatalogs" type="String" xid="xid6"></column>
  <column name="startDate" type="Date" xid="xid7"></column>
  <column name="storeName" type="String" xid="xid7"></column>
  <column name="endDate" type="Date" xid="xid8"></column>
  <column name="bigCatalogId" type="String" xid="xid9"></column>
  <column name="bigCatalogName" type="String" xid="xid9"></column>
  <column name="storeName" type="String" xid="xid6"></column>
  <column name="bigCatalogId" type="String" xid="xid9"></column>
  <column name="smallCatalogId" type="String" xid="xid10"></column>
  <column name="smallCatalogId" type="String" xid="xid10"></column>
  <column name="smallCatalogName" type="String" xid="xid10"></column>
  <column name="displayColor" type="String" xid="xid15"></column>
  <column name="bdItemCatalogNames" type="String" xid="xid22"></column>
  <column name="activityType" type="String" xid="xid17"></column>
  <rule xid="rule1">
   <col name="storeName" xid="ruleCol1">
    <required xid="required1">
     <expr xid="default4"></expr></required> 
    <readonly xid="readonly1">
     <expr xid="default8">true</expr></readonly> </col> 
   <col name="startDate" xid="ruleCol2">
    <required xid="required2">
     <message xid="default5"></message>
     <expr xid="default6"></expr></required> </col> 
   <col name="endDate" xid="ruleCol3">
    <required xid="required3">
     <expr xid="default7"></expr></required> </col> 
   <col name="bigCatalogName" xid="ruleCol4">
    <required xid="required4">
     <expr xid="default9"></expr></required> </col> </rule>
  <column name="storeCode" type="String" xid="xid23"></column>
  <column label="chargerCode" name="chargerCode" type="String" xid="xid26"></column>
  <column label="chargerName" name="chargerName" type="String" xid="xid27"></column>
  <column label="chargerCode1" name="chargerCode1" type="String" xid="xid28"></column>
  <column label="chargerName1" name="chargerName1" type="String" xid="xid29"></column>
  <column label="chargerCodeiD" name="chargerCodeiD" type="String" xid="xid30"></column>
  <column label="dataFrom" name="dataFrom" type="String" xid="xid31"></column></div>
  
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addItemCatalogData" idColumn="itemCatalogCode"><column name="billId" type="String" xid="xid18"></column>
  <column name="itemCatalogCode" type="String" xid="xid19"></column>
  <column name="itemCatalogName" type="String" xid="xid20"></column>
  </div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryActivityTypeData" idColumn="code"><column label="code" name="code" type="String" xid="xid13"></column>
  <column label="name" name="name" type="String" xid="xid14"></column>
  <column name="userRole" type="String" xid="xid25"></column>
  <rule xid="rule2">
   <col name="userRole" xid="ruleCol5">
    <constraint xid="constraint1">
     <expr xid="default1">$row.val(&quot;userRole&quot;) == 'A'</expr></constraint> </col> </rule>
  <master xid="default2" data="queryStoreNameData"></master></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryItemOneData" idColumn="rowId">
   <column name="rowId" type="String" xid="column4"></column>
   <column name="catalogName" type="String" xid="column3"></column>
   <column name="catalogCode" type="String" xid="column3"></column></div></div> 
<div component="$UI/system/components/justep/contents/contents" class="x-contents x-full" active="0" xid="contents1">
   <div class="x-contents-content" xid="content1">
    <div class="mainContext" style="padding-right:50px;margin-left:-200px;">
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" style="height:40px;">
   <div class="x-col x-col-80" xid="col2"></div>
   <div class="x-col" xid="col6"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row9">
   <div class="x-col" xid="col9"></div>
   <div class="x-col" xid="col11"><a id="login_save" component="$UI/system/components/justep/button/button" class="btn btn-info pull-right center-block" label="i18n{login}" xid="button1" onClick="insertClick" style="width:60px;margin-top:5px;">
   <i xid="i1"></i>
   <span xid="span2">i18n{login}</span></a></div></div></div></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:40px;">
  
   <div class="x-col" xid="col1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" style="text-align:right;" xid="store"><![CDATA[i18n{store}]]></label>
   <div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect3" style="width:405px;border-radius:3px;margin-left:5px;" bind-ref='$model.addActivityData.ref("storeCode")' bind-labelRef='$model.addActivityData.ref("storeName")' disabled="true">
   <option xid="option3" data="queryStoreNameData" value="storeCode" label="storeName"></option></div></div>
  </div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2" style="height:40px;">
   <div class="x-col x-col-33" xid="col4"></div>
   <div class="x-col" xid="col5"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label2" style="text-align:right;width:65px;padding-right:3px;"><![CDATA[i18n{period}]]></label>
   <input id="startTime" component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="startTimeChange" bind-ref='$model.addActivityData.ref("startDate")'></input></div></div>
   <div class="x-col" xid="col16">
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <span xid="span1" style="text-align:center;width:53px;"><![CDATA[~]]></span>
   <input id="endTime" component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="endTimeChange" bind-ref='$model.addActivityData.ref("endDate")'></input></div></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="height:40px;">
   <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label1" style="text-align:right;padding-right:3px;"><![CDATA[i18n{managementProcess}]]></label>
   <select id="activityType" component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select2" bind-options="queryActivityTypeData" bind-optionsValue="code" bind-optionsLabel="name" bind-ref='$model.addActivityData.ref("activityType")' style="width:398px;" onChange="queryBigCatalog"></select></div>
  </div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="height:40px;">
   <div class="x-col" xid="col10"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label5" style="text-align:right;"><![CDATA[i18n{bigCatalogName}]]></label>
   <div id="bigCatalog" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect1" style="width:405px;border-radius:3px;margin-left:5px;" bind-ref='$model.addActivityData.ref("bigCatalogId")' bind-labelRef='$model.addActivityData.ref("bigCatalogName")' onUpdateValue="select3Change">
   <option xid="option1" data="bigTypeNameData" value="rowId" label="typeName"></option></div></div>
  </div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5" style="height:40px;">
   <div class="x-col" xid="col13"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label" xid="label6" style="text-align:right;"><![CDATA[i18n{smallCatalogName}]]></label>
   <div id="smallCatalog" class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect2" style="width:405px;border-radius:3px;margin-left:5px;" bind-ref='$model.addActivityData.ref("smallCatalogId")' bind-labelRef='$model.addActivityData.ref("smallCatalogName")'>
   <option xid="option2" data="smallTypeNameData" value="rowId" label="typeName"></option></div></div>
  </div>
   </div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row12">
   <div class="x-col" xid="col20">
    <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit10" style="margin-left:105px;line-height:20px;">
     <label class="x-label" xid="label7" style="text-align:right;width:199px;">i18n{itemCatalogs}</label>
     <span id="checkbox_group1" component="$UI/system/components/justep/select/checkboxGroup" class="x-checkboxs x-edit" xid="checkboxGroup3" style="margin-left:10px;" bind-ref='$model.addActivityData.ref("chargerCode1")' bind-itemset="queryItemOneData" bind-itemsetValue='ref("catalogCode")' bind-itemsetLabel='ref("catalogName")' onChange="checkboxGroup3Change">
      </span> </div> </div> </div><div component="$UI/system/components/bootstrap/row/row" class="row" xid="row6">
   <div class="col" xid="col14">
   <div id="checkbox_group2" component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit8" style="margin-left:310px;line-height:18px;">
   <!-- <label class="x-label" xid="label7" style="text-align:right;width:199px;"><![CDATA[i18n{itemCatalogs}]]></label> -->
   <span component="$UI/system/components/justep/select/checkboxGroup" class="x-checkboxs x-edit" xid="checkboxGroup2" bind-itemset="queryItemCatalogsData" bind-itemsetValue='ref("catalogCode")' bind-itemsetLabel='ref("catalogName")' bind-ref='$model.addActivityData.ref("bdItemCatalogs")' onChange="checkboxGroup2Change"></span></div></div></div>
  </div>
   </div></div>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" onReceive="windowReceiver1Receive"></span></div>