<?xml version="1.0" encoding="UTF-8"?>

<div style=" overflow:auto!important;" xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:466px;left:582px;" onLoad="modelLoad"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actActivityGuideData2" idColumn="entityId"><column name="entityId" type="String" xid="xid8"></column>
  <column name="itemCalalogCode" type="String" xid="xid9"></column>
  <column name="itemCalalogName" type="String" xid="xid10"></column>
  <column name="rowId" type="String" xid="xid11"></column>
  <column name="showFlag" type="String" xid="xid12"></column>
  <column name="showKeypointFlag" type="String" xid="xid13"></column>
  <column name="typeCode" type="String" xid="xid14"></column>
  <column name="typeName" type="String" xid="xid15"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actActivityGuideData3" idColumn="eventId"><column label="促销活动ID" name="eventId" type="String" xid="xid16"></column>
  <column label="计划" name="planValue" type="String" xid="xid17"></column>
  <column label="实际" name="actualValue" type="String" xid="xid18"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actActivityGuideData4" idColumn="eventId"><column label="促销活动ID" name="eventId" type="String" xid="xid19"></column>
  <column label="反省点与改善策略" name="improvePoint" type="String" xid="xid20"></column>
  <column label="成功关键点" name="successPoint" type="String" xid="xid21"></column>
  <column label="贡献度" name="degreeValue" type="String" xid="xid22"></column>
  <column label="客户反应" name="custReaction" type="String" xid="xid23"></column>
  <column label="客户关注度" name="custFocusValue" type="String" xid="xid24"></column>
  <column label="他社动向" name="otherUnitTrend" type="String" xid="xid25"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actActivityGuideData" idColumn="createdBy"><column label="实绩录入者" name="createdBy" type="String" xid="xid30"></column>
  <column label="促销活动名" name="eventName" type="String" xid="xid26"></column>
  <column label="开始日期" name="eventStartDate" type="Date" xid="xid27"></column>
  <column label="结束日期" name="eventEndDate" type="Date" xid="xid28"></column>
  <column label="东芝店铺级别" name="toshibaStoreType" type="String" xid="xid29"></column>
  <column name="rowId" type="String" xid="xid31"></column></div></div> 
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="margin-top:5px;">
   <div class="x-col x-col-20" xid="col1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label1" style="text-align:right;"><![CDATA[当前时间]]></label>
   <input id="year_month" component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" disabled="true"></input></div></div>
   <div class="x-col x-col-10" xid="col2"><p id="show_w" xid="p1" style="margin-top:7px;margin-right:5px;"><![CDATA[5w]]></p></div>
   <div class="x-col" xid="col3"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-left" label="上周" xid="button1" icon="icon-ios7-arrow-back" bind-click="button1Click">
   <i xid="i1" class="icon-ios7-arrow-back"></i>
   <span xid="span1">上周</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-info btn-icon-right pull-left" label="下周" xid="button2" icon="icon-ios7-arrow-forward" bind-click="button2Click">
   <i xid="i2" class="icon-ios7-arrow-forward"></i>
   <span xid="span2">下周</span></a></div>
  <div class="x-col" xid="col4"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2" style="margin-top:10px;">
   <div class="x-col" xid="col5"><h4 xid="h41"><![CDATA[1.4.4	【TOP】促销活动结果画面]]></h4></div>
   <div class="x-col" xid="col7"></div></div>
   <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" class="x-grid-title-center" xid="grid7" data="actActivityGuideData" height="auto">
   <columns xid="columns7"><column width="100" name="createdBy" xid="column31"></column>
  <column width="100" name="eventName" xid="column32"></column>
  <column width="100" name="eventStartDate" xid="column33"></column>
  <column width="100" name="eventEndDate" xid="column34"></column>
  <column width="100" name="toshibaStoreType" xid="column35"></column></columns></div>
  <!-- <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="margin-top:10px;">
   <div class="x-col" xid="col8"><h4 xid="h42"><![CDATA[1.4.5	【TOP】VOC活动结果画面]]></h4></div>
   <div class="x-col" xid="col10"></div></div>
  <div id="the_grid2" component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" xid="grid2" data="actActivityGuideData2" height="auto">
   <columns xid="columns2"><column width="100" name="entityId" xid="column8"></column>
  <column width="100" name="itemCalalogCode" xid="column9"></column>
  <column width="100" name="itemCalalogName" xid="column10"></column>
  <column width="100" name="rowId" xid="column11"></column>
  <column width="100" name="showFlag" xid="column12"></column>
  <column width="100" name="showKeypointFlag" xid="column13"></column>
  <column width="100" name="typeCode" xid="column14"></column>
  <column width="100" name="typeName" xid="column15"></column></columns></div> -->
   
  <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" xid="grid4" data="actActivityGuideData3" class="x-grid-title-center" height="auto">
   <columns xid="columns4"><column width="100" name="eventId" xid="column16"></column>
  <column width="100" name="planValue" xid="column17"></column>
  <column width="100" name="actualValue" xid="column18"></column></columns></div>
  <div component="$UI/system/components/justep/grid/grid" hiddenCaptionbar="true" altRows="true" class="x-grid-title-center" xid="grid5" data="actActivityGuideData4" height="auto">
   <columns xid="columns5"><column width="100" name="eventId" xid="column19"></column>
  <column width="100" name="improvePoint" xid="column20"></column>
  <column width="100" name="successPoint" xid="column21"></column>
  <column width="100" name="degreeValue" xid="column22"></column>
  <column width="100" name="custReaction" xid="column23"></column>
  <column width="100" name="custFocusValue" xid="column24"></column>
  <column width="100" name="otherUnitTrend" xid="column25"></column></columns></div>
  </div>