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
  class="mdm-list-window mdm-small-popup-window my-segmemt-window window mdm-popup-edit-window-modified-title mdm-inner-window jrsm-tab-window" >

  <div xid="exportWd" xui:update-mode="delete"/>
    <div component="$UI/system/components/justep/model/model" onLoad="modelLoad" onParamsReceive="modelParamsReceive" style="height:auto;top:121px;left:186px;" xid="model" xui:parent="window" xui:update-mode="insert" >
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="lookupValueld" xid="showFlagData" >
<column label="下拉选择ID" name="lookupValueld" type="String" xid="xid212111111111_7" />
<column label="下拉选值" name="code" type="String" xid="xid18" />
<column label="下拉类型" name="name" type="String" xid="xid19" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="actualData" >
<column label="rowId" name="rowId" type="String" xid="xid311111111111_7" />
<column label="i18n{storeName}" name="storeName" type="String" xid="xid411111111111_7" />
<column label="i18n{work}" name="work" type="String" xid="xid511111111111_7" />
<column label="i18n{workDate}" name="workDate" type="String" xid="xid61111111111_7" />
<column label="i18n{operation}" name="operation" type="String" xid="xid111_7" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" isTree="false" xid="planData" >
<column label="rowId" name="rowId" type="String" xid="xid111111_3" />
<column label="i18n{storeName}" name="storeName" type="String" xid="xid211111_3" />
<column label="i18n{work}" name="work" type="String" xid="xid311111_3" />
<column label="i18n{workDate}" name="workDate" type="String" xid="xid411111_3" />
<master xid="default11111_3" />
<treeOption xid="default21111_3" />
<column label="i18n{operation}" name="operation" type="String" xid="xid2111_3" />
<column label="i18n{storeCode}" name="storeCode" type="String" xid="xid1_3" />
</div>
</div>
    <div class="div1_5" xid="div1_5" xui:parent="window" xui:update-mode="insert" >
<div class="x-row mdm-function-bar" component="$UI/system/components/justep/row/row" xid="row4" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col30" >
<span class="mdm-grid-title" xid="span100" >












i18n{plan}</span>
</div>
<div class="x-col" xid="col18" >
<span class="mdm-grid-title" xid="span11_7" >
<![CDATA[i18n{actual}]]>
</span>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row1_7" >
<div class="x-col" xid="col1_7" >
<div altRows="true" cascade="false" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="planData" directEdit="true" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="auto" hiddenCaptionbar="true" multiselect="false" serverSort="true" showRowNumber="true" useFooter="false" useVirtualRoot="false" width="90%" xid="grid1" >
<columns xid="columns1" >
<column align="center" name="operation" width="60px" xid="column111111_7" />
<column name="storeName" width="220px" xid="column111111_7" />
<column align="center" name="work" width="110px" xid="column211111_7" />
<column align="center" name="workDate" width="110px" xid="column221111_7" />
</columns>
</div>
</div>
<div class="x-col" xid="col2_7" >
<div altRows="true" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="actualData" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="auto" hiddenCaptionbar="true" multiselect="false" showRowNumber="true" width="90%" xid="grid2" >
<columns xid="columns111111_7" >
<column align="center" name="operation" width="60%" xid="column21112_7" />
<column name="storeName" width="220%" xid="column411111_7" />
<column align="center" name="work" width="110%" xid="column511111_7" />
<column align="center" name="workDate" width="110%" xid="column611111_7" />
</columns>
</div>
</div>
</div>
</div>
    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="true" height="650px" showTitle="true" src="$UI/jrsm/module/act/actPlan.w" status="normal" width="1300px" xid="windowDialog1_5" xui:parent="window" xui:update-mode="insert" />
    <span component="$UI/system/components/justep/windowDialog/windowDialog" forceRefreshOnOpen="true" height="650px" showTitle="true" src="$UI/jrsm/module/act/actActual.w" status="normal" width="1300px" xid="windowDialog2_5" xui:parent="window" xui:update-mode="insert" />
   <div xid="modelBase" style="position:absolute;height:auto;top:283px;left:324px;"  xui:update-mode="merge"/>

</div>