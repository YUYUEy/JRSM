<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:535px;left:551px;height:auto;" onLoad="modelLoad"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data1" idColumn="fld"><column name="fld" type="String" xid="xid1"></column>
  <column name="fAttach" type="String" xid="xid2"></column>
  <data xid="default1">[{&quot;fld&quot;:&quot;a&quot;,&quot;fAttach&quot;:&quot;&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="attachmentData" idColumn="rowId">
   <column label="id" name="rowId" type="String" xid="xid6"></column>
  <column label="attament" name="attament" type="String" xid="xid7"></column>
  <data xid="default2">[{&quot;id&quot;:&quot;a&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="catalogData" idColumn="code"><column name="code" type="String" xid="xid3"></column>
  <column name="name" type="String" xid="xid4"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bdVocLookupData" idColumn="rowId">
   <column label="rowId" name="rowId" type="String" xid="column1"></column>
   <column label="VOC分类名" name="lookupName" type="String" xid="column2"></column>
   <column label="VOC分类说明" name="lookupDesc" type="String" xid="xid5"></column>
   <column label="是否显示销售决定因素" name="showKeypointFlag" type="Boolean" xid="column3"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bdSalesStoreData" idColumn="storeCode"><column name="storeCode" type="String" xid="xid8"></column>
  <column name="storeName" type="String" xid="xid9"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actSaleKeypoint" idColumn="code"><column name="code" type="String" xid="xid12"></column>
  <column name="name" type="String" xid="xid13"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actVocTarget" idColumn="code"><column name="code" type="String" xid="xid14"></column>
  <column name="name" type="String" xid="xid15"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="vocdata" idColumn="rowId"><column label="i18n{rowId}" name="rowId" type="String" xid="xid10"></column>
  <column label="i18n{storeCode}" name="storeCode" type="String" xid="xid11"></column>
  <column label="i18n{storeName}" name="storeName" type="String" xid="xid16"></column>
  <column label="i18n{itemCatalogCode}" name="itemCatalogCode" type="String" xid="xid17"></column>
  <column label="i18n{vocType}" name="vocType" type="String" xid="xid18"></column>
  <column label="i18n{vocContent}" name="vocContent" type="String" xid="xid19"></column>
  <column label="i18n{saleKeypoint}" name="saleKeypoint" type="String" xid="xid20"></column>
  <column label="i18n{itemCode}" name="itemCode" type="String" xid="xid21"></column>
  <column label="i18n{vocObject}" name="vocObject" type="String" xid="xid22"></column>
  <column label="i18n{actionDate}" name="actionDate" type="Date" xid="xid23"></column>
  <data xid="default3">[{}]</data></div></div> 
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row10" style="height:40px;margin-top:5px;">
   <div class="x-col" xid="col3"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-right" label="i18n{login}" xid="button2" bind-click="button2Click">
   <i xid="i2"></i>
   <span xid="span2">i18n{login}</span></a></div>
   <div class="x-col x-col-10" xid="col9"></div></div>
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:40px;">
   <div class="x-col" xid="col1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label1" style="text-align:right;width:100px;"><![CDATA[i18n{loginDay}]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" dataType="Date" bind-ref='$model.vocdata.ref("actionDate")'></input></div></div>
   <div class="x-col x-col-10" xid="col2"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row2" style="height:55px;">
   <div class="x-col" xid="col4"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label2" style="text-align:right;width:100px;"><![CDATA[i18n{shop}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select2" bind-options="bdSalesStoreData" bind-optionsValue="storeName" bind-optionsLabel="storeName" bind-ref='$model.vocdata.ref("storeName")'></select></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row12">
   <div class="x-col x-col-20" xid="col12"></div>
   <div class="x-col" xid="col18"><p xid="p2"><![CDATA[『該当店舗がある場合は文頭に対象店舗名を必ず記載してください。』]]></p></div>
   </div></div>
   <div class="x-col x-col-10" xid="col5"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="height:40px;">
   <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label3" style="text-align:right;width:100px;"><![CDATA[i18n{commodity}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select3" bind-options="catalogData" bind-optionsValue="code" bind-optionsLabel="name" bind-ref='$model.vocdata.ref("itemCatalogCode")'></select></div></div>
   <div class="x-col x-col-10" xid="col8"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="height:40px;">
   <div class="x-col" xid="col10"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label4" style="text-align:right;width:100px;"><![CDATA[i18n{vocType}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select4" bind-options="bdVocLookupData" bind-optionsValue="lookupName" bind-optionsLabel="lookupName" bind-ref='$model.vocdata.ref("vocType")'></select></div></div>
   <div class="x-col x-col-10" xid="col11"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   <div class="x-col" xid="col13"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label5" style="text-align:right;width:100px;padding-bottom:65px;"><![CDATA[i18n{vocInput}]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="textarea2" style="height:80px;" bind-ref='$model.vocdata.ref("vocContent")'></textarea></div></div>
   <div class="x-col x-col-10" xid="col14"></div>
   </div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row11" style="margin-top:10px;">
   <div class="x-col x-col-20" xid="col15"><p xid="p1" style="text-align:right;"><![CDATA[i18n{uploadPic}]]></p></div>
   <div class="x-col" xid="col17"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row6" style="margin:5px 10px 20px 10px;height:50px;">
   <div class="x-col" xid="col16"><div component="$UI/system/components/jrsm/attachmentEx/attachmentEx" xid="attachmentEx1" bind-ref='$model.data1.ref("fld")' bindTable="t_act_actual" bindField='$model.attachmentData.ref("rowId")'>
   <div class="x-attachment" xid="div1">
    <div class="x-attachment-content x-card-border" xid="div2">
     <div class="x-doc-process" xid="div3">
      <div class="progress-bar x-doc-process-bar" role="progressbar" style="width:0%;" xid="progressBar1"></div></div> 
     <div data-bind="foreach:$attachmentItems" xid="div4">
      <div class="x-attachment-cell" xid="div5">
       <div class="x-attachment-item x-item-other" data-bind="click:$model.previewOrRemoveItem.bind($model),style:{backgroundImage:($model.previewPicture.bind($model,$object))()}" xid="div6">
        <a data-bind="visible:$model.$state.get() == 'remove'" class="x-remove-barget" xid="a1"></a></div> </div> </div> 
     <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload'" xid="div7">
      <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload'" xid="div8"></div></div> 
     <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0" xid="div9">
      <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove')" xid="div10"></div></div> 
     <div style="clear:both;" xid="div11"></div>
     <div style="display:none" xid="div12">
      <a href="#" class="x-attachment-lightbox" data-toggle="lightbox" xid="a2"></a></div> </div> </div> </div>
  </div>
   <div class="x-col x-col-10" xid="col6"></div>
  </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row7" style="height:40px;">
   <div class="x-col" xid="col20"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label" xid="label6" style="text-align:right;width:100px;"><![CDATA[i18n{buyFactor}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select5" bind-options="actSaleKeypoint" bind-optionsValue="code" bind-optionsLabel="name" bind-ref='$model.vocdata.ref("saleKeypoint")'></select></div></div>
   <div class="x-col x-col-10" xid="col22"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" style="height:40px;">
   <div class="x-col" xid="col23"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit7">
   <label class="x-label" xid="label7" style="text-align:right;width:100px;"><![CDATA[i18n{machineType}]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input2" bind-ref='$model.vocdata.ref("itemCode")'></input></div></div>
   <div class="x-col x-col-10" xid="col25"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row9" style="height:40px;">
   <div class="x-col" xid="col26"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit8">
   <label class="x-label" xid="label8" style="text-align:right;width:100px;"><![CDATA[i18n{speaker}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select7" bind-options="actVocTarget" bind-optionsValue="code" bind-optionsLabel="name" bind-ref='$model.vocdata.ref("vocObject")'></select></div></div>
   <div class="x-col x-col-10" xid="col28"></div></div>
  </div>