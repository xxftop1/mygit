<template>
  <div class="main_area fd-home-wrap">
    <div class="main_name"><aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
    <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false">
      <div class="main_box">
        <aty-row class="search_panel">
          <aty-button class="fd-btn-green  fl fd-btn-link" @click="goAddRecordList()">
            <i><img src="../../assets/images/menu.png"></i>
            <span>
            补记列表
          </span>
          </aty-button>
        </aty-row>
        <aty-row class="fd-criminal-info" ref="bjInfo">
          <aty-col span="8">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">罪犯姓名</aty-col>
              <aty-col span="16">{{personInfo.zfxm}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">罪犯编号</aty-col>
              <aty-col span="16">{{personInfo.zfbh}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">中止考核日期</aty-col>
              <aty-col span="16">{{personInfo.zzkhrq}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">开始考核日期</aty-col>
              <aty-col span="16">{{personInfo.kskhrq}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">补记原因</aty-col>
              <aty-col span="16">{{personInfo.bjyy}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8" v-if="isSftqShow">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">看守所</aty-col>
              <aty-col span="16">{{personInfo.sftq}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8" v-if="isSfyzShow">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">是否有罪</aty-col>
              <aty-col span="16">{{personInfo.sfyz}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8" v-if="isSfjxShow">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">是否加刑</aty-col>
              <aty-col span="16">{{personInfo.sfjx}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8" v-if="isSftbgShow">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">是否坦白过</aty-col>
              <aty-col span="16">{{personInfo.sftbg}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8" v-if="detailType ==2">
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label">处理意见</aty-col>
              <aty-col span="16">{{personInfo.clyj}}</aty-col>
            </aty-row>
          </aty-col>
          <aty-col span="8"  class="no-border" v-for="n in spare" :key=n>
            <aty-row class="fd-criminal-item">
              <aty-col span="8" class="fd-criminal-label"></aty-col>
              <aty-col span="16"></aty-col>
            </aty-row>
          </aty-col>
        </aty-row>
        <aty-table
          class="es_table"
          :pageable-data="tableData"
          style="width: 100%; margin-top: 20px;" v-if="detailType ==1" :exp-all="false"  :exp-current-page="false">
          <aty-table-column
            prop="bjny"
            label="年月"
            width="120px">
          </aty-table-column>
          <aty-table-column label="基础分" prop="jcfArry">
            <aty-table-column  label="教育" :showOverflowTooltip="false">
              <template slot-scope="scope" >
                <aty-text :text="scope.row.jcfArry[0]"  :title="scope.row.jcfArry[0]"></aty-text>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" :showOverflowTooltip="false">
              <template slot-scope="scope" >
                <aty-text :text="scope.row.jcfArry[1]" :title="scope.row.jcfArry[1]"></aty-text>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="加分">
            <aty-table-column label="教育" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.jfArry[0]" :title="scope.row.jfArry[0]"></aty-text>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.jfArry[1]" :title="scope.row.jfArry[1]"></aty-text>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="扣分">
            <aty-table-column  label="教育" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.kfArry[0]" :title="scope.row.kfArry[0]"></aty-text>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.kfArry[1]" :title="scope.row.kfArry[1]"></aty-text>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="单项处罚">
            <aty-table-column  label="教育" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.dxcfArry[0]" :title="scope.row.dxcfArry[0]"></aty-text>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.dxcfArry[1]" :title="scope.row.dxcfArry[1]"></aty-text>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="专项加分">
            <aty-table-column  label="教育" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.zxjfArry[0]" :title="scope.row.zxjfArry[0]"></aty-text>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <aty-text :text="scope.row.zxjfArry[1]" :title="scope.row.zxjfArry[1]"></aty-text>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column
            prop="hj"
            label="合计">
          </aty-table-column>
          <aty-table-column
            prop="bz"
            label="备注">
          </aty-table-column>
          <aty-table-column
            label="操作"
            width="120">
            <template slot-scope="scope" :showOverflowTooltip="false">
              <a @click="ckws(scope)" title="查看罪犯月评表" class="view" style="right:50px"></a>
            </template>
          </aty-table-column>
        </aty-table>
        <aty-row class="fd-score-list" v-if="detailType == 3 && scoreList.length > 0">
          <template v-for="(item,index) in scoreList">
            <aty-col span="4" :key="index" class="fd-score-item" v-if="index < (scoreList.length-1)">
              <h3>{{item.bjny}}<a title="查看罪犯月评表" class="view" @click="viewMonthScoreTable(item.bh)"></a></h3>
              <p class="score-box">分数：<span class="score">{{item.fs}}</span>分</p>
            </aty-col>
            <aty-col span="4" :key="index" class="fd-score-item" v-else-if="(item.fs || item.fs == 0)">
              <h3>{{item.bjny}}<a title="查看罪犯月评表" class="view" @click="viewMonthScoreTable(item.bh)"></a></h3>
              <p class="score-box">分数：<span class="score">{{item.fs}}</span>分</p>
            </aty-col>
            <div :key="index" v-else></div>
          </template>
        </aty-row>
        <aty-row class="fd-upload" v-if="fjfiles.length > 0">
          <aty-col span="24" class="fd-files">
            <span class="fd-attach" v-model="fjfiles">相关附件：</span>
            <template>
              <ul class="fileList">
                <li v-for="(item,index) in fjfiles" :key="index"><aty-link :text="item.entityName" :href="item.url" target="_parent" class="a_color" @click="downLoadFile(item.bh)"></aty-link></li>
              </ul>
            </template>
          </aty-col>
        </aty-row>
      </div>
    </aty-scroll>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        breadcrumbdata: [{
            name: '补记',
            href: "/record/addRecordList"
          },
          {
            name: '补记列表',
            href: '/record/addRecordList'
          },
          {
            name: '补记详情',
            href: ''
          }
        ],
        personInfo:null,
        detailType:'',
        scoreList:[],
        tableData:[],
        fjfiles:[],
        isSftqShow:false,
        isSfyzShow:false,
        isSfjxShow:false,
        isSftbgShow:false,
        spare:'',
        store:null
      }
    },
    methods:{
      //是否项目转换
      sfZh: function (row, column) {
        var key = "-1-"+row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      radioZh:function(value){
        return value === "1" ? "是":"否";
      },
      //查看文书
      ckws:function(scope){
        let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));
        var bh = scope.row.bh;
        var ztbh = this.store.data.bj.zfbh;
        var ywlb = "ygs";
        var ywbh = bh;
        var wsmc = "月公示-"+bh;
        window.open(_writ.base_path+"/view/"+ztbh+"/"+ywlb+"/"+ywbh+"/"+wsmc);
      },
      // 跳转补记列表页
      goAddRecordList() {
        this.$router.push({path: '/record/addRecordList'});
      },

      viewMonthScoreTable(bh){
        let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));
        var ztbh = this.store.data.bj.zfbh;
        var ywlb = "ygs";
        var ywbh = bh;
        var wsmc = "月公示-"+bh;
        window.open(_writ.base_path+"/view/"+ztbh+"/"+ywlb+"/"+ywbh+"/"+wsmc);
      }
    },
    computed:{
    },
    created() {

      this.store=JSON.parse(localStorage.getItem("recordDetailData"))
      this.personInfo=this.store.data.bj;
      this.detailType=this.store.type;
      if(this.detailType == 1){
        this.tableData = []
        this.tableData = this.store.data.bjmx;
      }
      if(this.detailType == 3){
        this.scoreList = []
        this.scoreList = this.store.data.bjmx;
      }
      if(this.detailType == 2){
        this.personInfo.clyj = "取消已有奖励和考核积分";
      }
      var bjyy = this.personInfo.bjyy;
      if(bjyy == '1') {
        this.personInfo.bjyy = "社会医院住院";
      }else if(bjyy == '2') {
        this.personInfo.bjyy = "解回再审";
      }else if(bjyy == '3') {
        this.personInfo.bjyy = "立案侦查";
      }else if (bjyy == '4') {
        this.personInfo.bjyy = "隔离审查";
      } else {
        this.personInfo.bjyy = "身份不明罪犯考核";
      }
      var sftq = this.personInfo.sftq;
      var sfyz = this.personInfo.sfyz;
      var sfjx = this.personInfo.sfjx;
      var sftbg = this.personInfo.sftbg;
      if (sftq !='') {
        this.personInfo.sftq=this.radioZh(this.personInfo.sftq)
        // this.personInfo.sftq = this.sfZh(this.personInfo.sftq,"");
        this.isSftqShow=true
      }
      if (sfyz !='') {
        this.personInfo.sfyz=this.radioZh(this.personInfo.sfyz)
        // this.personInfo.sfyz = this.sfZh(this.personInfo.sfyz,"");
        this.isSfyzShow=true
      }
      if (sfjx !='') {
        this.personInfo.sfjx=this.radioZh(this.personInfo.sfjx)
        // this.personInfo.sfjx = this.sfZh(this.personInfo.sfjx,"");
        this.isSfjxShow=true
      }
      if (sftbg !='') {
        this.personInfo.sftbg=this.radioZh(this.personInfo.sftbg)
        // this.personInfo.sftbg = this.sfZh(this.personInfo.sftbg,"")
        this.isSftbgShow=true
      }
      for (var i=0;i< this.store.data.files.length;i++){
        let fileVo = this.store.data.files[i];
        fileVo.url = _server.serverName+"/api/v1/system/downloadFileByEntityBh/" + this.store.data.files[i].bh;
        this.fjfiles.push(fileVo);
      }
    },
    mounted() {

      var len=this.$refs.bjInfo.$children.length;
      if(len %3!=0){
        this.spare=3-(len %3)
      }
      this.$refs.scroll.update()
    }
  }
</script>

<style scoped>
  /* .fd-upload .fd-files ul.fileList{
    left:104px;
  } */
  .fd-home-wrap{
    height:100%;
  }
  .fd-home-wrap .main_box{
    min-height:calc(100% - 80px);
  }
  .fd-score-list{
    margin:20px -10px;
  }
  .fd-score-list.aty-row{
    text-align:left;
  }
  .fd-score-list.aty-row h3{
    line-height:40px;
    border-bottom:1px solid #e7eef5;
    padding:0 13px;
  }
  .score{
    color:#f16868;
  }
  .score-box{
    text-align:center;
    padding:20px 0;
  }
  a.view{
    width:20px;
    height:14px;
    display:block;
    position:absolute;
    right:15px;
    top:12px;
    background:url("../../assets/images/view.png") no-repeat center;
  }
  .fd-score-list  .score{
    font-size:30px;
    color:#ff7272;
    font-weight:bold;
  }
  .fd-score-list .aty-col{
    height:115px;
    margin:0 10px;
    background:#f5f8fb;
    border:1px solid #e7eef5;
  }
  .fd-score-list .aty-col .aty-form-item{
    margin:20px 0;
    padding:0 13px;
  }
  .fd-upload{
    text-align:left;
  }
  .fd-btn-upload.aty-btn{
    padding: 6px 40px;
  }
  .fd-criminal-info.aty-row,
  .fd-criminal-item.aty-row{
    margin:0;
  }
  .fd-criminal-info .aty-col{
    height:44px;
    line-height:44px;
    text-align:center;
    color:#6d6d6d;
    /* border:1px solid #d1d6da; */
  }
  .fd-criminal-info{
    border-top:1px solid #d1d6da;
    border-right:1px solid #d1d6da;
  }
  .fd-criminal-item{
    border-bottom:1px solid #d1d6da;
  }
  .fd-criminal-info .aty-col.fd-criminal-label,
  .fd-criminal-label{
    font-weight:bold;
    font-size:14px;
    border-left:1px solid #d1d6da;
    border-right:1px solid #d1d6da;
    color:#333333;
  }
  .fd-criminal-info  .no-border .aty-col.fd-criminal-label{
    border:none;
  }
  .fd-attach{
    color:#333333;
    font-weight:bold;
  }
  .a_color{
    color:#0099ff !important;
  }
  .fd-score-list .aty-col.fd-score-item{
    margin-bottom:10px;
  }
</style>
