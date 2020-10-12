<template>
  <div class="main_area fd-home-wrap">
    <div class="main_name">
      <aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false">
      <div class="main_box">
        <aty-row class="search_panel">
          <aty-button class="fd-btn-green  fl fd-btn-link" @click="goAddRecordList()">
            <i><img src="../../assets/images/menu.png"></i>
            <span>
            复查复核列表
          </span>
          </aty-button>
        </aty-row>
        <aty-panel class="fd-sypanel">
          <table class="fd-sytable">
            <tr>
              <td>
                <label>罪犯姓名</label>
              </td>
              <td>
                <aty-text v-text="zysy.zfxm"></aty-text>
              </td>
              <td>
                <label>罪犯编号</label>
              </td>
              <td>
                <aty-text v-text="zysy.zfbh"></aty-text>
              </td>
              <td>
                <label>主要事由</label>
              </td>
              <td colspan="3">
                <aty-text v-text="zysy.zysy1"></aty-text>
              </td>
            </tr>
            <tr>
              <td>
                <label>发生时间</label>
              </td>
              <td>
                <aty-text v-text="zysy.fsrq"></aty-text>
              </td>
              <td>
                <label>类型</label>
              </td>
              <td>
                <aty-text v-text="zysy.khlx"></aty-text>
              </td>
              <td>
                <label>考核项目</label>
              </td>
              <td>
                <aty-text v-text="zysy.khxm"></aty-text>
              </td>
              <td>
                <label>原处理意见</label>
              </td>
              <td>
                <aty-text v-text="zysy.clyj"></aty-text>
              </td>
            </tr>
          </table>
        </aty-panel>
        <aty-panel v-if="fcxq">
          <div class="fd-title fd-fcfh-title">
            <div class="fd-title-item1" >复查</div>
            <div class="fd-title-item2"><span class="item" @click="changeEventStatus" :class="{collapse : eventWriteStatus}">{{eventWriteStatus ? "收起":"展开"}}</span></div>
          </div>
          <aty-panel class="gray_panel2">
            <table class="fd-fucha-box" v-show="eventWriteStatus">
              <tr>
                <td>
                  <label>申请时间</label>
                </td>
                <td v-text="sqsj"></td>
              </tr>
              <tr>
                <td>
                  <label>申请理由</label>
                </td>
                <td v-text="sqly"></td>
              </tr>
              <tr>
                <td>
                  <label>复查情况</label>
                </td>
                <td v-text="fcqk"></td>
              </tr>
            </table>
            <aty-row class="fd-upload" v-if="files.length > 0">
              <aty-col span="24" class="fd-files">
                <span class="fd-attach" v-model="files">相关附件：</span>
                <template>
                  <ul class="fileList">
                    <li v-for="(item,index) in files" :key="index"><aty-link :text="item.entityName" :href="item.url" target="_parent" class="a_color" @click="downLoadFile(item.bh)"></aty-link></li>
                  </ul>
                </template>
              </aty-col>
            </aty-row>
            <aty-table :pageable-data="tableData" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
              <aty-table-column prop="dtclsj" label="时间" :formatter="df">
              </aty-table-column>
              <aty-table-column prop="bzmc" label="审批流程">
              </aty-table-column>
              <aty-table-column prop="clr" label="经办人">
              </aty-table-column>
              <aty-table-column prop="spzt" label="意见" :showOverflowTooltip="false">
                <template slot-scope="scope">
                  <div  v-text="scope.row.spzt"  :title="scope.row.clyj"></div>
                </template>
              </aty-table-column>
            </aty-table>
            <div class="fcspList" v-if="shbShow">
              <span class="fd-sp-label">复查审批表：</span>
              <a @click="ckws">查看</a>
            </div>
            <div class="fcspList" v-if="gzspListShow">
              <span class="fd-sp-label">更正审批表：</span>
              <a  @click="ckgzws">查看</a>
            </div>
          </aty-panel>
        </aty-panel>

        <aty-panel v-if="fhxq">
          <div class="fd-title fd-fcfh-title">
            <div class="fd-title-item1" >复核</div>
            <div class="fd-title-item2"><span class="item" @click="changeEventStatus" :class="{collapse : eventWriteStatus}">{{eventWriteStatus ? "收起":"展开"}}</span></div>
          </div>
          <aty-panel class="gray_panel2">
            <table class="fd-fucha-box" v-show="eventWriteStatus">
              <tr>
                <td>
                  <label>复查情况及更正意见</label>
                </td>
                <td v-text="fcqk"></td>
              </tr>
              <tr>
                <td>
                  <label>申请理由</label>
                </td>
                <td v-text="sqly"></td>
              </tr>
            </table>
            <aty-row class="fd-upload" v-if="files.length > 0">
              <aty-col span="24" class="fd-files">
                <span class="fd-attach" v-model="files">相关附件：</span>
                <template>
                  <ul class="fileList">
                    <li v-for="(item,index) in files" :key="index">
                      <aty-link :text="item.entityName" :href="item.url" target="_parent" class="a_color" @click="downLoadFile(item.bh)"></aty-link>
                    </li>
                  </ul>
                </template>
              </aty-col>
            </aty-row>
            <aty-table :pageable-data="tableData" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
              <aty-table-column prop="dtclsj" label="时间" :formatter="df">
              </aty-table-column>
              <aty-table-column prop="bzmc" label="审批流程">
              </aty-table-column>
              <aty-table-column prop="clr" label="经办人">
              </aty-table-column>
              <aty-table-column prop="spzt" label="意见" :formatter="spztzh" :showOverflowTooltip="false">
                <template slot-scope="scope">
                  <div  v-text="scope.row.spzt"  :title="scope.row.clyj"></div>
                </template>
              </aty-table-column>
            </aty-table>
            <div class="fcspList" v-if="shbShow">
              <span class="fd-sp-label">复核审批表：</span>
              <a @click="ckws">查看</a>
            </div>
            <div class="fcspList" v-if="gzspListShow">
              <span class="fd-sp-label">更正审批表：</span>
              <a @click="ckgzws">查看</a>
            </div>
          </aty-panel>
        </aty-panel>
      </div>
    </aty-scroll>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        breadcrumbdata:[
          {
            name:'复查复核',
            href:"/reviewCheckList"
          },
          {
            name:'复查复核详情',
            href:''
          }
        ],
        tableData: [
          {
            dtClsj:'',
            bzmc:'',
            clr:'',
            clyj:'',
            spzt:''
          }
        ],
        sqsj: "",
        sqly: "",
        fcqk: "",
        flag: true,
        zysy: {
          zfxm: "",
          zfbh: "",
          zysy1: "",
          fsrq: "",
          khlx: "",
          khxm: "",
          clyj: ""
        },
        files: [],
        gzspListShow: false,
        shbShow:false,
        fhxq:false,
        fcxq: true,
        eventWriteStatus:true,
        store:null
      };
    },
    methods: {
      //查看文书
      ckws:function(){
        let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));
        var bh = this.store.fcfh.bh;
        var zfbh = this.store.fcfh.zfbh;
        var ztbh = zfbh;
        var ywlb = "fcfh";
        var ywbh = bh;
        var wsmc = "复查复核-"+bh;
        window.open(_writ.base_path+"/view/"+ztbh+"/"+ywlb+"/"+ywbh+"/"+wsmc);
      },
      //查看更正审批表
      ckgzws:function() {
        let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));
        var bh = this.store.fcfh.bh;
        var zfbh = this.store.fcfh.zfbh;
        var ztbh = zfbh;
        var ywlb = "fcfh";
        var ywbh = bh;
        var wsmc = "复查复核更正-"+bh;
        window.open(_writ.base_path+"/view/"+ztbh+"/"+ywlb+"/"+ywbh+"/"+wsmc);
      },
      //日期转义
      df: function (row, column) {
        return row != undefined ? row.substr(0,row.length-4) :  "";
      },
      // 跳转列表页
      goAddRecordList() {
        this.$router.push({path:'/reviewCheckList'});
      },
      changeEventStatus: function() {
        this.eventWriteStatus=!this.eventWriteStatus
        this.$refs.scroll.update()
      },
      endDateChange(value, name) {
        this.endDate = this.camputeDate(value);
      },
      startDateChange(value, name) {
        this.startDate = this.camputeDate(value);
        this.createMonthList();
      },
      //考核项目转换
      khxzh: function (row, column) {
        var key = "30111002-"+row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //审批状态转换
      spztzh:function (row, column) {
        var key = "30111014-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        if(row === "103") {
          value.name = "更正";
        } else if (row === "101") {
          value.name = "驳回";
        }
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //处理意见转换
      clyjZh:function (row, column) {
        var key = "30111008-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //考核类型转换
      khlxZh:function (row, column) {
        var key = "30111001-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      }
    },
    computed: {},
    mounted() {
      this.$refs.scroll.update()
    },
    created() {
      var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var qsjy = JSON.parse(localStorage.getItem("qsjy"));
      // 根据上个页面传来的参数 判断 是否展示更正审批表
      this.store=JSON.parse(localStorage.getItem("fcfhDetailData"))
      if (this.store.fhxq) {
        this.fhxq = this.store.fhxq;
        this.fcxq = false;
        //复核详情
        this.breadcrumbdata[1].name="复核详情"
      } else{
        this.fhxq = false;
        this.fcxq = true;
        this.breadcrumbdata[1].name="复查详情"
      }
      if (this.store.fcfh.gzspb) {
        this.gzspListShow = true;
      }
      if (this.store.fcfh.shb){
        this.shbShow = true;
      }
      this.zysy.zysy1 = this.store.fcfh.zysy;
      this.zysy.fsrq = this.store.fcfh.fsrq;
      this.zysy.khlx = this.store.fcfh.fcx;
      if (this.zysy.khlx !='' && this.zysy.khlx != null) {
        this.zysy.khlx = this.khlxZh(this.zysy.khlx,'');
      }
      this.zysy.clyj = this.store.fcfh.yclyj;
      this.zysy.zfxm = this.store.fcfh.zfxm;
      this.zysy.khxm = this.store.fcfh.khxm;
      if (this.zysy.khxm !='' && this.zysy.khxm !=null) {
        this.zysy.khxm = this.khxzh(this.zysy.khxm,"");
      }
      this.zysy.zfbh = this.store.fcfh.zfbh;
      this.sqsj = this.store.fcfh.sqsj;
      if (this.sqsj !='' && this.sqsj !=null) {
        this.sqsj = this.sqsj.substr(0,10);
      }
      this.sqly = this.store.fcfh.sqly;
      this.fcqk = this.store.fcfh.fcqk;
      for (var i=0;i< this.store.fhfhMap.length;i++){
        let fileVo = this.store.fhfhMap[i];
        fileVo.url = _server.serverName+"/api/v1/system/downloadFileByEntityBh/" + this.store.fhfhMap[i].bh;
        this.files.push(this.store.fhfhMap[i]);
      }
      this.tableData =  this.store.spxq;
      for (var i=0; i<this.tableData.length;i++){
        if(this.tableData[i].spzt !='' && this.tableData[i].spzt !=null) {
          //审批状态转换 分监区审批是通过、退回 其他情况是更正 驳回
          this.tableData[i].spzt = this.spztzh(this.tableData[i].spzt,"");
          if (this.tableData[i].bzmc !='' && (this.tableData[i].bzmc ==="分监区审批" || this.tableData[i].bzmc ==="管教股/干事审批") && this.tableData[i].spzt ==="更正") {
            this.tableData[i].spzt = "通过";
          }
          //三级乔司监区审批转换
          if (qsjy === userInfo.corpId &&  (this.tableData[i].bzmc ==="监区审批" || this.tableData[i].bzmc ==="管教科审批")  && this.tableData[i].spzt ==="更正") {
            this.tableData[i].spzt = "通过";
          }
          if (this.store.fcfh.clyj !='' && this.store.fcfh.clyj != null) {
            //更正意见转换
            var clyj = this.clyjZh(this.store.fcfh.jyclyj);
            //加分、扣分、专项加分有建议分数
            var yjfs = this.store.fcfh.jyfs;
            this.tableData[i].spzt = this.spztzh(this.tableData[i].spzt,"")+":"+clyj+yjfs;
          }
        }
      }
    }
  };
</script>

<style scoped>
  .fd-fcfh-title{
    margin:20px 0;
  }
  table.fd-fucha-box {
    width: 100%;
  }
  table.fd-fucha-box td {
    border: 1px solid #d1d6da;
    text-align: center;
    height: 45px;
    /* line-height: 45px; */
    padding:10px;
  }
  table.fd-fucha-box td label {
    color: #333333;
    font-weight: bolder;
  }

  table.fd-fucha-box td:first-child {
    width: 20%;
  }
  .title1 {
    background: url(../../assets/images/bg-title1.png) no-repeat;
    height: 40px;
    margin: 0;
  }
  .title1 span {
    float: left;
    width: 14%;
    color: #fff;
    padding-left: 20px;
    font-size: 18px;
    line-height: 35px;
  }
  .title1 div {
    float: left;
    background-color: #d1ebff;
    height: 35px;
    width: 86%;
    border-radius: 0 10px 10px 0;
  }
  .title1 .aty-icon {
    margin-left: 10px;
    cursor: pointer;
  }
  .title2 {
    background: url(../../assets/images/bg-title2.png) no-repeat;
    height: 40px;
    margin: 0;
  }
  .title2 span {
    float: left;
    width: 39%;
    color: #fff;
    padding-left: 20px;
    font-size: 18px;
    line-height: 35px;
  }
  .title2 div {
    float: left;
    background-color: #d1ebff;
    height: 35px;
    width: 61%;
    border-radius: 0 10px 10px 0;
  }
  .fd-form-fc {
    padding-top: 40px;
  }
  .btm-btns {
    text-align: center;
  }
  .fd-sypanel {
    background-color: #f5f8fb;
    border: 1px solid #e7eef5;
    padding: 20px;
  }
  .fd-sytable {
    width: 100%;
  }
  .fd-sytable td {
    border: 1px solid #d1d6da;
    background-color: #fff;
    height: 45px;
    line-height: 45px;
    text-align: center;
    width: 12.5%;
  }
  .fd-sytable td label {
    color: #333333;
    font-weight: bolder;
  }
  .required .search_option_text:before {
    content: "*";
    color: red;
    padding-right: 5px;
  }
  input.es_table_input {
    width: 80%;
    margin: auto;
    text-align: center;
  }
  input.es_table_input.bz-input {
    text-align: left;
  }
  .punish {
    float: left;
    padding-left: 126px;
  }
  .search_option_box .search_option_text {
    display: inline-block;
    width: 126px;
    text-align: right;
    height: 100%;
    position: absolute;
    top: 0;
    left: 32px;
  }
  .search_option_input,
  .required .aty-form-item-required,
  .search_option_box .aty-date-picker {
    width: calc(100% - 190px);
    position: absolute;
    top: 0;
    left: 158px;
    right: 0;
  }
  .fd-search-btn {
    text-align: right;
  }
  .fd-bj-row.aty-row .aty-col-span-6 {
    /* padding-right:65px; */
    padding: 0 32px;
    position: relative;
    height: 32px;
    line-height: 32px;
    margin: 10px 0;
  }
  .fd-bj-row.aty-row .aty-col-span-24 {
    /* padding-right:65px; */
    padding: 0 32px;
    position: relative;
    height: 32px;
    line-height: 32px;
    margin: 10px 0;
  }
  .fd-bj-row.aty-row .aty-radio-group {
    float: left;
    padding-left: 136px;
  }
  .fd-bj-row.aty-row .aty-radio-wrapper {
    margin-right: 42px;
  }
  .search_panel .aty-btn img {
    margin-right: 5px;
    margin-top: -2px;
  }
  .score-row {
    line-height: 20px;
    padding-left: 90px;
    text-align: left;
  }
  .fd-score-list {
    margin: 0 -10px 20px;
  }
  .fd-score-list.aty-row {
    text-align: left;
  }
  .fd-score-list.aty-row h3 {
    line-height: 40px;
    border-bottom: 1px solid #e7eef5;
    padding: 0 20px;
  }
  .score {
    color: #f16868;
  }
  .fd-score-list .aty-col {
    /* height:115px;
    background:#f5f8fb;
    border:1px solid #e7eef5; */
    padding: 0 10px 10px;
  }
  .fd-score-list .score-inner {
    height: 115px;
    background: #f5f8fb;
    border: 1px solid #e7eef5;
  }
  .fd-score-list .aty-col .aty-form-item {
    margin: 20px 0;
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
  }
  .fd-upload {
    text-align: left;
  }
  .fd-score-list .score-input {
    position: relative;
  }
  .fd-attach{
    color:#333333;
    font-weight:bold;
  }
  .a_color{
    color:#0099ff !important;
  }
  .fcspList{
    font-size: 14px;
    color: #333;
    margin: 10px 0;
  }
  .fcspList a{
    color: #188aff;
    margin-left: 4px;
  }
  .fileList{
    position: static !important;
    float: left;
    margin-left: 10px;
  }
  .fileList li{
    line-height: 34px;
    /* margin-bottom: 5px; */
  }
  .fd-attach{
    float: left;
  }
</style>
