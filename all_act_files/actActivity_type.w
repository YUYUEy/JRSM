<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window jrsm-tab-window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:424px;left:524px;" onLoad="modelLoad" onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="addActivityTypeData" idColumn="rowId"><column label="" name="rowId" type="String" xid="xid1"></column>
  <column label="i18n{operation}" name="operation" type="String" xid="xid8"></column>
  <column label="i18n{typeName}" name="typeName" type="String" xid="xid2"></column>
  <column label="" name="typeShortName" type="String" xid="xid3"></column>
  <column name="typeCatalog" type="String" xid="xid4"></column>
  <column name="parentId" type="String" xid="xid5"></column>
  <column name="userCode" type="String" xid="xid6"></column>
  <column name="userName" type="String" xid="xid7"></column>
  <column name="userCount" type="String" xid="xid9"></column>
  <rule xid="rule1">
   <col name="typeName" xid="ruleCol1">
    <readonly xid="readonly1">
     <expr xid="default1">$row.val(&quot;userCode&quot;)==&quot;&quot;  ||  $row.val(&quot;userCount&quot;) &gt; 0</expr></readonly> </col> </rule></div>
  <div autoLoad="false" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="queryData">
   <column label="" name="rowId" type="String" xid="column51111111"></column>
   <column label="" name="itemCatalogs" type="String" xid="column71111111"></column>
   <column label="" name="bigCatalogName" type="String" xid="column91111111"></column>
   <column label="" name="smallCatalogName" type="String" xid="column61111111"></column>
   <column label="" name="startDate" type="Date" xid="column41111111"></column>
   <column name="endDate" type="Date" xid="xid311111"></column>
   <data xid="default1111111">[]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="dataCopy" idColumn="rowId">
   <column label="" name="rowId" type="String" xid="column3"></column>
   <column label="操作" name="operation" type="String" xid="column10"></column>
   <column label="内容" name="typeName" type="String" xid="column4"></column>
   <column label="" name="typeShortName" type="String" xid="column5"></column>
   <column name="typeCatalog" type="String" xid="column6"></column>
   <column name="parentId" type="String" xid="column7"></column>
   <column name="userCode" type="String" xid="column8"></column>
   <column name="userName" type="String" xid="column9"></column>
   <column name="userCount" type="String" xid="column11"></column>
   <rule xid="rule2">
    <col name="typeName" xid="ruleCol2">
     <readonly xid="readonly2">
      <expr xid="default2">$row.val(&quot;userCode&quot;)==&quot;&quot;  ||  $row.val(&quot;userCount&quot;) &gt; 0</expr></readonly> </col> </rule> </div></div> 
<div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel1">
   <div class="x-panel-content" xid="content1" style="width:500px;margin-left:60px;"><div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="margin-top:10px;margin-bottom:10px;width:450px;">
   <div class="x-col" xid="col1"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-right" label="i18n{login}" xid="button2" style="margin-left:2px;" onClick="insertActivityType">
   <i xid="i2"></i>
   <span xid="span2">i18n{login}</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-only-icon pull-right" label="button" xid="button3" icon="linear linear-bus" style="width:54px;" onClick="addActivityTypepe">
   <i xid="i3" class="linear linear-bus"></i>
   <span xid="span3"></span></a></div>
  </div>
  
  <div id="activity_type" component="$UI/system/components/justep/row/row" class="x-row" xid="row1">
   <div class="x-col" xid="col2" style="width:450px;"><div  component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" class="x-grid-title-center" xid="ActivityTypeGrid"  data="addActivityTypeData" multiselectWidth="20" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" showRowNumber="true" height="auto" width="450">
   <columns xid="columns1"><column width="50" name="operation" xid="column1"></column>
  <column width="360" name="typeName" xid="column2" editor="input" editable="true"></column></columns></div></div>
   </div></div>
   </div></div>