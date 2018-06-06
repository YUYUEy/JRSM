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
    <div component="$UI/system/components/justep/model/model" onLoad="modelLoad" onParamsReceive="modelParamsReceive" style="height:auto;top:363px;left:712px;" xid="model" xui:parent="window" xui:update-mode="insert" >
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="itemCatalogsData" >
<column label="" name="rowId" type="String" xid="xid212111111111111_1" />
<column label="" name="catalogCode" type="String" xid="xid18" />
<column label="" name="catalogName" type="String" xid="xid19" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="lookupValueld" xid="bigCatalogData" >
<column label="下拉类型ID" name="lookupValueld" type="String" xid="xid11111_1" />
<column label="下拉选值" name="code" type="String" xid="xid2111111_1" />
<column label="下拉选择名称" name="name" type="String" xid="xid3111111_1" />
</div>
<div autoLoad="false" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="queryData" >
<column label="" name="rowId" type="String" xid="column51111111_4" />
<column label="" name="itemCatalogs" type="String" xid="column71111111_4" />
<column name="bigCatalogId" type="String" xid="xid1_4" />
<column label="" name="bigCatalogName" type="String" xid="column91111111_4" />
<column name="smallCatalogId" type="String" xid="xid2_4" />
<column label="" name="smallCatalogName" type="String" xid="column61111111_4" />
<data xid="default1111111_4" >
























[]</data>
<column label="" name="startDate" type="Date" xid="column41111111_4" />
<column name="endDate" type="Date" xid="xid311111_4" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="lookupValueld" xid="smallCatalogData" >
<column label="下拉类型ID" name="lookupValueld" type="String" xid="column111_1" />
<column label="下拉选值" name="code" type="String" xid="column311_1" />
<column label="下拉选择名称" name="name" type="String" xid="column211_1" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="bigTypeNameData" >
<column name="rowId" type="String" xid="xid1" />
<column name="typeName" type="String" xid="xid2" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="smallTypeNameData" >
<column name="rowId" type="String" xid="xid3" />
<column name="typeName" type="String" xid="xid4" />
</div>
<div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="rowId" xid="listData" >
<column name="rowId" type="String" xid="xid1111121111111111_2" />
<column label="i18n{operation}" name="operation" type="String" xid="xid211121111111111_2" />
<column label="i18n{itemCatalogs}" name="itemCatalogName" type="String" xid="xid31121111111111_2" />
<column label="i18n{period}" name="period" type="String" xid="xid621111111111_2" />
<column label="i18n{bigCatalogName}" name="bigCatalogName" type="String" xid="xid4121111111111_2" />
<column label="i18n{smallCatalogName}" name="smallCatalogName" type="String" xid="xid5121111111111_2" />
</div>
</div>
    <span component="$UI/system/components/justep/windowDialog/windowDialog" height="500px" onClose="addLookUpListClose" resizable="false" showTitle="true" src="$UI/jrsm/module/act/actActivityBatch_add.w" status="normal" style="top:415px;left:101px;" title="i18n{editList}" width="600px" xid="actActivityBatchView" xui:parent="window" xui:update-mode="insert" />
    <div xid="div1_1" xui:parent="window" xui:update-mode="insert" >
<div class="x-row" component="$UI/system/components/justep/row/row" style="padding-top:10px;padding-bottom:10px;" xid="row3" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col1_8" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit3_1" >
<label class="x-label" xid="label3_1" >
<![CDATA[i18n{itemCatalogs}]]>
</label>
<div class="x-edit" xid="div4_1" >
<div bind_refData="$model.queryData.ref(&quot;itemCatalogs&quot;)" class="x-quickSearch" component="$UI/system/components/jrsm/iQuickSearch/iQuickSearch" config="goodsItemCatalog" displayAttr="catalogName" queryWhen="delay" style="margin-left:4px;" valueAttr="catalogCode" xid="iQuickSearch1111_1" />
</div>
</div>
</div>
<div class="x-col" xid="col2_8" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit11_6" >
<label class="x-label" title="i18n{itemCalalogCode}" xid="label11_6" >
<![CDATA[i18n{bigCatalogName}]]>
</label>
<select bind-options="bigTypeNameData" bind-optionsLabel="typeName" bind-optionsValue="rowId" bind-ref="$model.queryData.ref(&quot;bigCatalogId&quot;)" class="form-control x-edit" component="$UI/system/components/justep/select/select" onChange="querySmallTypeName" xid="bigCatalogName" />
</div>
</div>
<div class="x-col" xid="col3_8" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit4_8" >
<label class="x-label" title="i18n{showFlag}" xid="label4_8" >
<![CDATA[i18n{smallCatalogName}]]>
</label>
<select bind-options="smallTypeNameData" bind-optionsLabel="typeName" bind-optionsValue="rowId" bind-ref="$model.queryData.ref(&quot;smallCatalogId&quot;)" class="form-control x-edit" component="$UI/system/components/justep/select/select" xid="smallCatalogName" />
</div>
</div>
<div class="x-col x-col-33" xid="col1_6" >
<div class="x-label-edit x-label30" component="$UI/system/components/justep/labelEdit/labelEdit" xid="labelEdit2_1" >
<label class="x-label" xid="label2_1" >
<![CDATA[i18n{period}]]>
</label>
<div class="x-edit" xid="div3_1" >
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row1_1" >
<div class="x-col" xid="col1_1" >
<input bind-ref="$model.queryData.ref(&quot;startDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" id="startDate" onChange="startTimeChange" xid="startDate" />
</div>
<div class="x-col x-col-fixed x-col-center text-center" style="width:12px;" xid="col2_1" >
<span xid="span2_1" >
<![CDATA[~]]>
</span>
</div>
<div class="x-col" xid="col3_1" >
<input bind-ref="$model.queryData.ref(&quot;endDate&quot;)" class="form-control" component="$UI/system/components/justep/input/input" id="endDate" onChange="endTimeChange" style="margin-right:56px;" xid="endDate" />
</div>
</div>
</div>
</div>
</div>
<div class="x-col x-col-fixed" style="width:width:90px;" xid="col4_8" xui:parent="window" xui:update-mode="insert" >
<a class="btn btn-info btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="icon-ios7-undo" label="重置" onClick="resetClickClick" xid="resetClick" >
<i class="icon-ios7-undo" style="position:relative;top:0px;left:0px;" xid="i2_8" />
<span xid="span2_8" >


























































































重置</span>
</a>
<a class="btn btn-info btn-only-icon pull-right" component="$UI/system/components/justep/button/button" icon="linear linear-book" label="查询" onClick="queryClick" xid="button1_8" >
<i class="linear linear-book" xid="i1_8" />
<span xid="span1_8" >
















































































































查询</span>
</a>
</div>
</div>
<div class="x-row mdm-function-bar" component="$UI/system/components/justep/row/row" xid="row4" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col30" >
<span class="mdm-grid-title" style="line-height:35px;margin-left:10px;" xid="span100" >
<![CDATA[i18n{search}]]>
</span>
</div>
<div class="x-col" xid="col18" >
<a class="btn btn-default btn-only-icon" component="$UI/system/components/justep/button/button" icon="icon-android-add" label="i18n{addCompanySegBtn}" onClick="addActActivityBatchClick" style="margin-top:5px;" xid="addActActivityBatch" >
<i class="icon-android-add" xid="i11_13" />
<span xid="span11_13" >
<![CDATA[i18n{addCompanySegBtn}]]>
</span>
</a>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row7" xui:parent="window" xui:update-mode="insert" >
<div class="x-col mdm15Row-grid-container" xid="col6" >
<div altRows="true" class="x-grid-title-center" component="$UI/system/components/justep/grid/grid" data="listData" directEdit="true" headerMenu="hideColumn,setColumn,groupColumn,saveLayout" height="100%" hiddenCaptionbar="true" multiselect="false" showRowNumber="true" width="100%" xid="grid1" >
<columns xid="columns1" >
<column align="center" name="operation" width="100" xid="column4_4" />
<column name="itemCatalogName" width="200" xid="column5_4" />
<column align="center" name="period" width="200" xid="column6_4" />
<column name="bigCatalogName" width="150" xid="column7_4" />
<column name="smallCatalogName" width="300" xid="column8_4" />
</columns>
</div>
</div>
</div>
<div class="x-row" component="$UI/system/components/justep/row/row" xid="row11_3" xui:parent="window" xui:update-mode="insert" >
<div class="x-col" xid="col41_3" >
<div class="x-pagerbar container-fluid" component="$UI/system/components/justep/pagerBar/pagerBar" data="listData" xid="pagerBar1" >
<div class="row" xid="div411_3" >
<div class="col-sm-3" xid="div311_3" >
<div class="x-pagerbar-length" xid="div211_3" >
<label class="x-pagerlimitselect" component="$UI/system/components/justep/pagerLimitSelect/pagerLimitSelect" defaultValue="10" xid="pagerLimitSelect1" >
<span xid="span311_3" >














































显示</span>
<select class="form-control input-sm" component="$UI/system/components/justep/select/select" onChange="pgLmtSlctChange" xid="select4" >
<option value="10" xid="default2" >














































10</option>
<option value="20" xid="default3" >














































20</option>
<option value="50" xid="default4" >








50</option>
<option value="100" xid="default5" >














































100</option>
</select>
<span xid="span111_3" >









































条</span>
</label>
</div>
</div>
<div class="col-sm-3" xid="div111_3" >
<div class="x-pagerbar-info" xid="div6" >

























当前显示0条，共0条</div>
</div>
<div class="col-sm-6" xid="div7" >
<div class="x-pagerbar-pagination" xid="div8" >
<ul bind-click="pgIndexClick" class="pagination" component="$UI/system/components/bootstrap/pagination/pagination" data="msgListData" xid="pgIndex" >
<li class="prev" xid="li1" >
<a href="#" xid="a1" >
<span aria-hidden="true" xid="span111_3" >














































«</span>
<span class="sr-only" xid="span211_3" >














































Previous</span>
</a>
</li>
<li class="next" xid="li2" >
<a href="#" xid="a2" >
<span aria-hidden="true" xid="span8" >














































»</span>
<span class="sr-only" xid="span9" >














































Next</span>
</a>
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
   <div xid="modelBase" style="position:absolute;height:auto;top:367px;left:539px;"  xui:update-mode="merge"/>
<xu:modifications>
  <xu:remove select="//*[@xid='modelBase']/@onParamsReceive"/>
</xu:modifications>

</div>