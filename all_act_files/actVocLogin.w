<?xml version="1.0" encoding="UTF-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" xid="window" class="window" component="$UI/system/components/justep/window/window" design="device:pc">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:247px;left:595px;" onLoad="modelLoad" onParamsReceive="modelParamsReceive" onunLoad="modelUnLoad"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data1" idColumn="fld"><column name="fld" type="String" xid="xid1"></column>
  <column name="fAttach" type="String" xid="xid2"></column>
  <data xid="default1">[{&quot;fld&quot;:&quot;a&quot;,&quot;fAttach&quot;:&quot;&quot;}]</data></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="showAllData" idColumn="rowId"><column label="rowId" name="rowId" type="String" xid="xid16"></column>
  <column label="commodity" name="commodity" type="String" xid="xid17"></column>
  <column label="type" name="type" type="String" xid="xid18"></column>
  <column label="content" name="content" type="String" xid="xid19"></column>
  <column label="portrait" name="portrait" type="String" xid="xid20"></column>
  <column label="Factor" name="Factor" type="String" xid="xid21"></column>
  <column label="machine" name="machine" type="String" xid="xid22"></column>
  <column label="spokesperson" name="spokesperson" type="String" xid="xid23"></column></div><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="attachmentData" idColumn="rowId">
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
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bdItemData" idColumn="rowId"><column name="rowId" type="String" xid="xid8"></column>
  <column name="itemCode" type="String" xid="xid9"></column>
  <column name="itemName" type="String" xid="xid10"></column>
  <column name="janCode" type="String" xid="xid11"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actSaleKeypoint" idColumn="code"><column name="code" type="String" xid="xid12"></column>
  <column name="name" type="String" xid="xid13"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="actVocTarget" idColumn="code"><column name="code" type="String" xid="xid14"></column>
  <column name="name" type="String" xid="xid15"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="bdSalesStoreData" idColumn="storeCode">
   <column name="storeCode" type="String" xid="column4"></column>
   <column name="storeName" type="String" xid="column5"></column></div>
  <div autoLoad="true" component="$UI/system/components/justep/data/data" idColumn="id" xid="actActualVocData">
   <column label="id" name="id" type="String" xid="xid4111111"></column>
  <column label="ID" name="rowId" type="Integer" xid="xid1111111111111111"></column>
  <column label="i18n{action}" name="action" type="String" xid="xid911111111111"></column>
  <column label="i18n{itemCatalogCode}" name="itemCatalogCode" type="String" xid="xid2111111111111111"></column>
  <column label="i18n{vocType}" name="vocType" type="String" xid="xid3111111111111111"></column>
  <column label="i18n{vocContent}" name="vocContent" type="String" xid="xid4111111111111111"></column>
  <column label="i18n{portrait}" name="portrait" type="String" xid="xid5111111111111111"></column>
  <column label="i18n{saleKeypoint}" name="saleKeypoint" type="String" xid="xid6111111111111111"></column>
  <column label="i18n{itemCode}" name="itemCode" type="String" xid="xid7111111111111111"></column>
  <column label="i18n{shortAnswer}" name="shortAnswer" type="String" xid="xid8111111111111111"></column>
  <column label="actionActualId" name="actionActualId" type="Integer" xid="xid32111"></column>
  <column label="whether" name="whether" type="String" xid="xid24"></column>
  <column label="picRefId" name="picRefId" type="String" xid="xid25"></column></div></div> 
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row10" style="height:30px;">
   <div class="x-col" xid="col3"><a component="$UI/system/components/justep/button/button" class="btn btn-info pull-right" label="i18n{login}" xid="button2" onClick="button2Click">
   <i xid="i2"></i>
   <span xid="span2">i18n{login}</span></a></div>
   <div class="x-col x-col-10" xid="col9"></div></div>
   <div component="$UI/system/components/justep/row/row" class="x-row" xid="row1" style="height:40px;">
   <div class="x-col" xid="col1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit1">
   <label class="x-label" xid="label1" style="text-align:right;width:100px;"><![CDATA[i18n{shop}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select1" bind-options="bdSalesStoreData" bind-optionsValue="storeName" bind-optionsLabel="storeName"></select></div></div>
   <div class="x-col x-col-10" xid="col4"></div></div>
<div component="$UI/system/components/justep/row/row" class="x-row" xid="row3" style="height:40px;">
   <div class="x-col" xid="col7"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label3" style="text-align:right;width:100px;"><![CDATA[i18n{commodity}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select3" bind-options="catalogData" bind-optionsValue="name" bind-optionsLabel="name" bind-ref='$model.actActualVocData.ref("itemCatalogCode")'></select></div></div>
   <div class="x-col x-col-10" xid="col8"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row4" style="height:40px;">
   <div class="x-col" xid="col10"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label4" style="text-align:right;width:100px;"><![CDATA[i18n{vocType}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select4" bind-options="bdVocLookupData" bind-optionsValue="lookupName" bind-optionsLabel="lookupName" bind-ref='$model.actActualVocData.ref("vocType")' onChange="select4Change"></select></div></div>
   <div class="x-col x-col-10" xid="col11"></div>
   </div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row5">
   <div class="x-col" xid="col13"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label5" style="text-align:right;width:100px;padding-bottom:65px;"><![CDATA[i18n{vocInput}]]></label>
   <textarea component="$UI/system/components/justep/textarea/textarea" class="form-control x-edit" xid="textarea2" style="height:80px;background-color:#E9E9E9;" bind-ref='$model.actActualVocData.ref("vocContent")' bind-focus="textarea2Focus"></textarea></div></div>
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
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select5" bind-options="actSaleKeypoint" bind-optionsValue="name" bind-optionsLabel="name" bind-ref='$model.actActualVocData.ref("saleKeypoint")' bind-labelRef='$model.actActualVocData.ref("saleKeypoint")'></select></div></div>
   <div class="x-col x-col-10" xid="col22"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row8" style="height:40px;">
   <div class="x-col" xid="col23"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label2" style="text-align:right;width:100px;"><![CDATA[i18n{machineType}]]></label>
   <input component="$UI/system/components/justep/input/input" class="form-control x-edit" xid="input1" bind-ref='$model.actActualVocData.ref("itemCode")'></input></div></div>
   <div class="x-col x-col-10" xid="col25"></div></div>
  <div component="$UI/system/components/justep/row/row" class="x-row" xid="row9" style="height:40px;">
   <div class="x-col" xid="col26"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit8">
   <label class="x-label" xid="label8" style="text-align:right;width:100px;"><![CDATA[i18n{speaker}]]></label>
   <select component="$UI/system/components/justep/select/select" class="form-control x-edit" xid="select7" bind-options="actVocTarget" bind-optionsValue="name" bind-optionsLabel="name" bind-ref='$model.actActualVocData.ref("shortAnswer")'></select></div></div>
   <div class="x-col x-col-10" xid="col28"></div></div>
  </div>