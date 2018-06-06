<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:463px;left:559px;height:auto;" onLoad="modelLoad" onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actActivityExportData" idColumn="rowId"><column name="rowId" type="String" xid="xid1"></column>
  <column label="startDate" name="startDate" type="Date" xid="xid4"></column>
  <column name="bigCatalogName" type="String" xid="xid2"></column>
  <column name="smallCatalogName" type="String" xid="xid5"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="storeData" idColumn="storeCode"><column label="storeCode" name="storeCode" type="String" xid="xid3"></column>
  <column label="storeName" name="storeName" type="String" xid="xid6"></column>
  <column label="startDate" name="startDate" type="String" xid="xid7"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="queryData" idColumn="rowId"><column label="rowId" name="rowId" type="String" xid="xid8"></column></div></div> 
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row2">
   <div class="x-col" xid="col4" style="padding-left:15px;padding-top:10px;"><div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" xid="grid1" data="actActivityExportData" class="x-grid-title-center" height="420" width="540">
   <columns xid="columns1">
   <column align="center" label="i18n{testStore}" name="export" width="100" xid="column10"></column>
   <column name="startDate" width="100" xid="column1" label="i18n{loginDate}"></column>
   <column label="i18n{bigCatalogName}" name="bigCatalogName" width="150" xid="column12"></column>
   <column label="i18n{smallCatalogName}" name="smallCatalogName" width="150" xid="column13"></column></columns></div>
  </div>
   <div class="x-col" xid="col1" style="display:none;"><div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" class="x-grid-no-bordered" xid="grid2" data="storeData" showRowNumber="true">
   <columns xid="columns2">
   <column width="100" name="storeCode" xid="column4"></column>
  <column width="100" name="storeName" xid="column5"></column></columns></div></div></div>
  <span component="$UI/system/components/justep/windowDialog/windowDialog" xid="windowExport" src="$UI/jrsm/module/export/exportConfig.w"></span></div>