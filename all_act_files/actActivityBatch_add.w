<?xml version="1.0" encoding="UTF-8"?>

<div style="border:1px solid #ccc;min-width:1100px;" xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window jrsm-tab-window mdm-popup-edit-window-modified-title" component="$UI/system/components/justep/window/window" design="device:pc" xmlns:xui="http://www.justep.com/xui" >  
  <div component="$UI/system/components/justep/model/model" style="position:absolute;height:auto;top:519px;left:512px;" xid="modelBase" xui:update-mode="merge"></div><div component="$UI/system/components/justep/model/model" xid="model" style="width:170px;top:332px;left:786px;height:auto;" onLoad="modelLoad" onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bigTypeNameData" idColumn="rowId"><column name="rowId" type="String" xid="xid1"></column>
  <column name="typeName" type="String" xid="xid2"></column>
  <column name="typeColor" type="String" xid="xid23"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="smallTypeNameData" idColumn="rowId"><column name="rowId" type="String" xid="xid3"></column>
  <column name="typeName" type="String" xid="xid4"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="toshibaStoreTypeData" idColumn="lookupValueld"><column name="lookupValueld" type="String" xid="xid13"></column>
  <column name="code" type="String" xid="xid14"></column>
  <column name="name" type="String" xid="xid15"></column></div>
  
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addBdApplyStoreData" idColumn="storeCode"><column name="rowId" type="String" xid="xid16"></column>
  <column label="i18n{storeCode}" name="storeCode" type="String" xid="xid17"></column>
  <column label="i18n{storeName}" name="storeName" type="String" xid="xid18"></column>
  <column label="i18n{operation}" name="operation" type="String" xid="xid19"></column>
  <column name="billId" type="String" xid="xid11"></column>
  <rule xid="rule1">
   <readonly xid="readonly1">
    <expr xid="default2"></expr></readonly> </rule></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addActivityBatchData" idColumn="rowId"><column name="rowId" type="String" xid="xid5"></column>
  <column name="bdItemCatalogs" type="String" xid="xid6"></column>
  <column name="startDate" type="String" xid="xid7"></column>
  <column name="endDate" type="String" xid="xid8"></column>
  <column name="bigCatalogName" type="String" xid="xid9"></column>
  <column name="bigCatalogId" type="String" xid="xid9"></column>
  <column name="smallCatalogId" type="String" xid="xid10"></column>
  <column name="smallCatalogName" type="String" xid="xid10"></column>
  <column label="storeSelectType" name="storeSelectType" type="String" xid="xid12"></column>
  <column name="bdApplyStores" type="String" xid="xid12"></column>
  <column name="toshibaStoreType" type="String" xid="xid25"></column>
  <column label="chargerCodeiD" name="chargerCodeiD" type="String" xid="xid32"></column>
  <column label="chargerName1" name="chargerName1" type="String" xid="xid33"></column>
  <column label="chargerCode1" name="chargerCode1" type="String" xid="xid34"></column>
  <column name="dataFrom" type="String" xid="xid24"></column>
  <column name="displayColor" type="String" xid="xid35"></column></div><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addItemCatalogData" idColumn="itemCatalogCode"><column name="billId" type="String" xid="xid20"></column>
  <column name="itemCatalogCode" type="String" xid="xid21"></column>
  <column name="itemCatalogName" type="String" xid="xid22"></column></div>
  
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="showData" idColumn="storeCount"><column name="storeCount" type="String" xid="xid29"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data1" idColumn="id"><column name="id" type="String" xid="xid31"></column>
  <column name="radio" type="String" xid="xid30"></column>
  <data xid="default1">[{&quot;id&quot;:&quot;T1&quot;,&quot;radio&quot;:&quot;T1&quot;},{&quot;id&quot;:&quot;T2&quot;,&quot;radio&quot;:&quot;T2&quot;},{&quot;id&quot;:&quot;T3&quot;,&quot;radio&quot;:&quot;T3&quot;},{&quot;id&quot;:&quot;T4&quot;,&quot;radio&quot;:&quot;T4&quot;}]</data></div><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryItemCatalogsData" idColumn="rowId"><column name="rowId" type="String" xid="xid26"></column>
  <column name="catalogCode" type="String" xid="xid27"></column>
  <column name="catalogName" type="String" xid="xid28"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryItemOneData" idColumn="rowId">
   <column name="rowId" type="String" xid="column3"></column>
   <column name="catalogCode" type="String" xid="column1"></column>
   <column name="catalogName" type="String" xid="column2"></column></div></div> 
  <!-- <div xid="div1" style="width:600px;hieght:600px;margin:0 auto;border:1px solid #999"> -->
 	<!--  -->
   <div component="$UI/system/components/bootstrap/row/row" class="row" xid="row3" style="height:40px;">
   <div class="col col-xs-4" xid="col8"></div>
   <div class="col col-xs-4" xid="col9"></div>
   <div class="col col-xs-4" xid="col10"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-right" label="i18n{login}" xid="button2" onClick="insertClick">
   <i xid="i2"></i>
   <span xid="span2">i18n{login}</span></a></div></div>
  <div component="$UI/system/components/bootstrap/row/row" class="row" xid="row6">
   <div class="col" xid="col14" style="margin-bottom:15px;">
    <div id="checkbox_grp1" component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
     <!-- <label class="x-label" xid="label1" style="text-align:right;width:92px;"><![CDATA[i18n{itemCatalogs}]]></label> -->
     <label class="x-label" xid="label2" style="text-align:right;width:92px;margin-bottom:20px;margin-right:10px;"><![CDATA[i18n{itemCatalogs}]]></label><span component="$UI/system/components/justep/select/checkboxGroup" class="x-checkboxs x-edit" xid="itemCatalogsClickCheckboxGroup2" bind-itemset="queryItemCatalogsData" bind-ref='$model.addActivityBatchData.ref("bdItemCatalogs")' bind-itemsetValue='ref("catalogCode")' bind-itemsetLabel='ref("catalogName")' onChange="itemCatalogsClick"></span></div> </div> </div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row10" style="height:50px;">
   <div class="x-col" xid="col25"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit7">
   <label class="x-label" xid="label7" style="text-align:right;width:91px;"><![CDATA[i18n{period}]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input3" style="margin-left:8px;" dataType="Date"></input></div>
  </div>
   <div class="x-col" xid="col26"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit8">
   
   <span xid="span1" style="text-align:center;width:43px;"><![CDATA[~]]></span><input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input4" style="margin-right:50px;width:91px;" dataType="Date"></input></div>
  </div><div class="x-col" xid="col27"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit9">
   <label class="x-label" xid="label9" style="text-align:right;width:75px;"><![CDATA[i18n{bigCatalogName}]]></label>
   <div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect1" onUpdateValue="querySmallType" bind-ref='$model.addActivityBatchData.ref("bigCatalogId")' bind-labelRef='$model.addActivityBatchData.ref("bigCatalogName")' style="margin-left:4px;width:200px;">
   <option xid="option1" data="bigTypeNameData" value="rowId" label="typeName"></option></div></div>
  </div><div class="x-col" xid="col28"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit10">
   <label class="x-label" xid="label10" style="text-align:right;width:65px;"><![CDATA[i18n{smallCatalogName}]]></label>
   <div class="x-gridSelect" component="$UI/system/components/justep/gridSelect/gridSelect" xid="gridSelect2" bind-ref='$model.addActivityBatchData.ref("smallCatalogId")' bind-labelRef='$model.addActivityBatchData.ref("smallCatalogName")' onUpdateValue="addSmallTypeName" style="margin-left:4px;width:200px;">
   <option xid="option2" data="smallTypeNameData" value="rowId" label="typeName"></option></div></div>
  </div>
  
  <div class="x-col x-col-10" xid="col3"></div></div>
   <div class="x-row" component="$UI/system/components/justep/row/row" xid="row221" style="margin-bottom:10px;">
   <div class="x-col x-col-33" xid="col16">
  
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit13">
   <label class="x-label" xid="label14" style="text-align:right;width:111px;"><![CDATA[i18n{showShoplist}]]></label>
   <div class="x-edit" xid="div2">
  <div component="$UI/system/components/justep/output/output" class="x-output pull-left x-edit" xid="output6" bind-ref='$model.showData.ref("storeCount")' style="margin-top:2px;"></div></div></div></div>
  <div class="x-col x-col-10" xid="col11"></div>
  <div class="x-col" xid="col12"></div></div><div component="$UI/system/components/justep/row/row" class="x-row" xid="row14">
   
   
  <div class="x-col x-col-10" xid="col1"></div>
  <div class="x-col x-col-33" xid="col231111">
   <div class="x-row" component="$UI/system/components/justep/row/row" xid="row211">
    <div class="x-col " xid="col411">
     <div class="radio" component="$UI/system/components/justep/button/radioPC" label="i18n{toshibaStoreRating}" name="ToshibaStoreLevel" xid="radioPC111" checked="false" value="T1" bind-ref='$model.data1.ref("radio")' checkedValue="T1" bind-disable="$model.data1.ref(&quot;radio&quot;)  != 'T1'" onChange="radioPC111Change"></div></div> 
    <div class="x-col" xid="col511">
     <select style="border-radius:3px;height:28px;width:200px;" component="$UI/system/components/justep/select/select" class="form-control pull-right" xid="gridSelect3" bind-ref='$model.addActivityBatchData.ref("toshibaStoreType")' bind-options="toshibaStoreTypeData" bind-optionsValue="code" bind-optionsLabel="name" bind-labelRef='$model.addActivityBatchData.ref("toshibaStoreTypeName")' onChange="gridSelect3Change"></select></div> 
    </div> 
   <div class="x-row" component="$UI/system/components/justep/row/row" xid="row311" style="margin-top:5px">
    <div class="x-col " xid="col711">
     <div class="radio" component="$UI/system/components/justep/button/radioPC" label="i18n{goodAtStoreRating}" name="ToshibaStoreLevel" style="margin-right: -10px;" xid="radioPC211" value="T2" bind-ref='$model.data1.ref("radio")' checkedValue="T2" onChange="radioPC211Change"></div></div> 
    <div class="x-col x-col-67" xid="col811">
     <a class="btn btn-info pull-right" component="$UI/system/components/justep/button/button" label="i18n{select}" xid="button111" bind-disable="$model.data1.val(&quot;radio&quot;)  != 'T2'" onClick="button111Click">
      <i xid="i111"></i>
      <span xid="span111">i18n{select}</span></a> 
  <a component="$UI/system/components/justep/button/button" class="btn btn-info" label="i18n{storeListExtraction}" xid="button1" bind-disable="$model.data1.val(&quot;radio&quot;)  != 'T2'" onClick="button1Click" style="margin-right:10px;">
   <i xid="i3"></i>
   <span xid="span7">i18n{storeListExtraction}</span></a></div> 
    </div> 
   <div class="x-row" component="$UI/system/components/justep/row/row" xid="row411" style="margin-top:5px">
    <div class="x-col " xid="col1011">
     <div class="radio" component="$UI/system/components/justep/button/radioPC" label="i18n{theCompanyIsAnArea}" name="ToshibaStoreLevel" style="" xid="radioPC311" value="T3" bind-ref='$model.data1.ref("radio")' checkedValue="T3" onChange="radioPC311Change"></div></div> 
    <div class="x-col " xid="col1111">
     <a class="btn btn-info pull-right clearfix" component="$UI/system/components/justep/button/button" label="i18n{select}"  xid="button211" bind-disable="$model.data1.val(&quot;radio&quot;)  != 'T3'" onClick="button211Click">
      <i xid="i211"></i>
      <span xid="span211">i18n{select}</span></a> </div> 
    </div> 
   <div class="x-row" component="$UI/system/components/justep/row/row" xid="row511" style="margin-top:5px">
    <div class="x-col " xid="col1311">
     <div class="radio" component="$UI/system/components/justep/button/radioPC" label="i18n{storeExtraction}" name="ToshibaStoreLevel" style="margin-right: -10px;" xid="radioPC411" value="T4" bind-ref='$model.data1.ref("radio")' checkedValue="T4" onChange="radioPC411Change"></div></div> 
    <div class="x-col " xid="col1411">
     <a class="btn btn-info pull-right" component="$UI/system/components/justep/button/button" label="i18n{takeIn}"  xid="button311" onClick="button311Click" bind-disable="$model.data1.val(&quot;radio&quot;)  != 'T4'">
      <i xid="i311"></i>
      <span xid="span311">i18n{takeIn}</span></a> </div> 
    </div> 
   </div>
   <div class="x-col" xid="col6"></div>
  <div class="x-col x-col-50" xid="col22">
   <div altRows="true" caption="Export Setting" class="x-grid-title-left" component="$UI/system/components/justep/grid/grid" height="100%" hiddenCaptionbar="true"  showRowNumber="true" width="470" xid="grid111" data="addBdApplyStoreData" directEdit="true">
    <columns xid="columns111">
     <column width="70" name="operation" xid="column6" align="center" editable="false"></column><column width="130" name="storeCode" xid="column4" editable="false"></column>
  <column width="200" name="storeName" xid="column5" editable="false"></column>
  </columns> </div> </div>
  </div>
   <!--  -->
   <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="actActivityBatch_addView" style="top:373px;left:13px;" src="$UI/jrsm/module/act/actActivityBatch.w"></span>
<!--   </div> -->
  <span component="$UI/system/components/justep/windowDialog/windowDialog" style="top:374px;left:83px;" xid="GoodAtStoreRating_View" src="$UI/jrsm/module/act/actActivityBatch_add_GoodAtStoreRating.w"></span>
  <span component="$UI/system/components/justep/windowReceiver/windowReceiver" xid="windowReceiver1" onReceive="windowReceiver1Receive"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="importWd" src="$UI/jrsm/module/export/activityBatchFile.w" title="i18n{storeExtraction}" width="700px" height="550px" resizable="true" status="normal" showTitle="true" forceRefreshOnOpen="true"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="shoplistExport" style="top:407px;left:19px;" status="normal" width="600px" height="550px" showTitle="true" title="i18n{shoplist_export}" src="$UI/jrsm/module/act/actActivityBatchExport.w"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="importShopLevel" title="i18n{goodAtStoreRating}" src="$UI/jrsm/module/act/shopSelect2.w" showTitle="true" status="normal" forceRefreshOnOpen="true" resizable="true" width="1200px" height="600px"></span>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="importShopArea" title="i18n{theCompanyIsAnArea}" src="$UI/jrsm/module/act/shopSelect3.w" showTitle="true" status="normal" forceRefreshOnOpen="true" resizable="true" width="1100px" height="570px"></span></div>