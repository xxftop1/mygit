<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
    <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
      <div class="main_box">
        <div class="tabs_main_box">
          <div class="fd-filter-panel fd-bj-pabel no-bg">
            <aty-row class="search_option_box fd-bj-row">
              <aty-col v-if="isJyj() && treeData.length" span="6" class="search_option_marginb">
                <p class="search_option_text">监狱：</p>
                <template >
                  <aty-select-tree class="nomal_tree search_option_input" name="valueobject1" :data="treeData"
                                   v-model="jy" clearable>
                  </aty-select-tree>
                </template>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">监区：</p>
                <aty-select-tree class="nomal_tree search_option_input" name="valueobject2" ref="selectTree1"
                                 :data="treeData2" v-model="jq" clearable>
                </aty-select-tree>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">小组：</p>
                <aty-input class="search_option_input" v-model="xz" clearable></aty-input>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">罪犯编号：</p>
                <aty-input class="search_option_input" v-model="zfbh" clearable></aty-input>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">罪犯姓名：</p>
                <aty-input class="search_option_input" v-model="zfxm" clearable></aty-input>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">经办民警：</p>
                <aty-input class="search_option_input" v-model="jbmj" clearable></aty-input>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">开始时间：</p>
                <aty-date-picker clearable  v-model="kssj" class="dr_date_pick" type="date"></aty-date-picker>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">至：</p>
                <aty-date-picker clearable  v-model="jssj" class="dr_date_pick" type="date"></aty-date-picker>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb fd-week-btns">
                <aty-button @click="queryDataList(1,limit)" class="search_option_butn1" type="primary">
                  <i>
                    <img src="../../assets/images/w-png17.png">
                  </i>
                  <span>查询</span>
                </aty-button>
                <aty-button class="search_option_butn2 fd-btn-export mg11" type="default" @click="exportZpy">
                  <i>
                    <img src="../../assets/images/export.png">
                  </i>
                  <span>导出</span>
                </aty-button>
              </aty-col>
            </aty-row>
          </div>
          <aty-table :pageable-data="tableData" style="width: 100%; " class="fd-table-jail" :exp-all="false"
                     :exp-current-page="false">
            <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
            <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名" width="130">
              <!--<template slot-scope="props" >-->
                <!--<a :title="props.row.jfkhZfxx.xm"  v-text="props.row.jfkhZfxx.xm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
              <!--</template>-->
            </aty-table-column>
            <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号" width="130"></aty-table-column>
            <aty-table-column prop="jfkhZfxx.dept" label="监区" width="250"></aty-table-column>
            <aty-table-column prop="jfkhZfxx.szxz" label="小组" width="80"></aty-table-column>
            <aty-table-column prop="fsrq" label="发生日期"></aty-table-column>
            <aty-table-column prop="khxm" label="考核项目" :formatter="khxmf" width="80"></aty-table-column>
            <aty-table-column prop="qxjcfx" label="分项" :formatter="fxf"  width="250"></aty-table-column>
            <aty-table-column prop="khyj" label="考核依据"></aty-table-column>
            <aty-table-column prop="qj" label="情节" :formatter="qjf" width="50"></aty-table-column>
            <aty-table-column prop="zysy" label="主要事由"></aty-table-column>
            <aty-table-column prop="yjfs" label="分数"  width="50"></aty-table-column>
            <aty-table-column prop="zt" label="审批状态" :formatter="spztf"></aty-table-column>
          </aty-table>
          <!-- 分页 start -->
          <aty-row class="fd-category">
            <aty-row>
              <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                              :show-elevator="true" @change="changePage" ref="zpyPage"></aty-pagination>
            </aty-row>
          </aty-row>
        </div>
      </div>
    <!-- </aty-scroll> -->
    </happy-scroll>
  </div>
  <!-- 内容部分end -->
</template>

<script>
  export default {
    data(){
      return{
        breadcrumbdata: [{
          name: '周评议',
          href: "/weekDiscussion"
        }
        ],
        jy:'',
        jq:'',
        xz:'',
        zfbh:'',
        zfxm:'',
        jbmj:'',
        kssj:'',
        jssj:'',
        limit:10,
        total:0,
        offset: 1,
        offget: 1,
        url:_zfxxDetail.url,
        tableData:[],
        valueobject:{},
        valueobject2:{},
        treeData: [],
      }
    },
    created(){
      this.getRequest("/api/v1/system/getJy").then(resp=>{
        if (resp && resp.status == 200) {
          if(resp.data.hasOwnProperty("ArrayList")) {
            this.treeData = resp.data.ArrayList;
          }
        }
      });
      this.getWeek();
      this.initData(1, this.limit);
    },
    computed: {
      /**
       * @name 监区数据
       * @description
       */
      treeData2() {
        var useInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var deptType = useInfo.deptType;
        var corpId = this.jy;
        if(corpId == undefined || corpId == "") {
          corpId = useInfo.corpId;
        }
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        this.getRequest("/api/v1/system/getJq/" + corpId + "/" + deptType + "/" + isSelectFgyzf).then(resp=> {
          if (resp && resp.status == 200) {
            if(resp.data.hasOwnProperty("ArrayList")) {
              this.$refs.selectTree1.update(resp.data.ArrayList);
            }
          }
        });
      }
    },
    methods:{
      getWeek(){
        var now = new Date();
        var nowTime = now.getTime() ;
        var day = now.getDay();
        var oneDayLong = 24*60*60*1000 ;
        var MondayTime = nowTime - (day-1)*oneDayLong  ;
        var SundayTime =  nowTime + (7-day)*oneDayLong ;
        var kssjDate = new Date(MondayTime);
        this.kssj = this.dateFormat(kssjDate);
        var jssjDate = new Date(SundayTime);
        this.jssj = this.dateFormat(jssjDate);
      },

      //审批状态转义
      spztf: function (row, column) {
        var key = _sigleCode.rjzSpzt + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //情节转义
      qjf: function (row, column) {
        var key = _sigleCode.qj + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //考核项目转义
      khxmf: function (row, column) {
        var key = _sigleCode.khxm + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //分项转义
      fxf: function (row, column) {
        var qjArr = row.split(";");
        var qj = row;
        if(row == undefined) {
          return "";
        }
        for(var i = 0;i < qjArr.length-1;i++) {
          if(qjArr[i] == undefined || qjArr[i] == "" || qjArr[i] == null) {
            continue
          }
          var key = _sigleCode.qxjyfx + qjArr[i];
          var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key].name;
          qj = qj.replace(qjArr[i],value);
        }
        if(qjArr.length == 1) {
          if (qj == ""){
            return
          }
          var key = _sigleCode.qxjyfx + qj;
          qj = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key].name;
        }
        return qj;
      },
      //换页
      changePage(pageSize) {
        let _this = this;
        _this.limit=this.$refs.zpyPage.currentPageSize;
        _this.offset=this.$refs.zpyPage.currentPage;
        _this.queryDataList(_this.offset,_this.limit);
      },
      print(){
        let print = document.getElementById('print');
        let newContent =print.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
        window.location.reload();
        document.body.innerHTML = oldContent;
        return false;
      },
      initData(pageNum, pageSize){
        this.queryDataList(pageNum, pageSize);
      },
      //条件查询方法
      queryDataList(pageNum, pageSize) {
        this.offset=(pageNum-1)*pageSize;
        let _this = this;
        let kssj = '';
        let jssj = '';
        if(this.kssj != '' && this.checkIsDateType(this.kssj)) {
          kssj = this.dateFormat(this.kssj);
        } else {
          kssj = this.kssj;
        }
        if(this.jssj != '' && this.checkIsDateType(this.jssj)) {
          jssj = this.dateFormat(this.jssj)
        } else {
          jssj = this.jssj;
        }
        // 调取查询接口
        var params = {
          jbmj: this.jbmj,
          corp: this.jy,
          dept: this.jq,
          zfxm: this.zfxm,
          zfbh:this.zfbh,
          szxz: this.xz,
          fssjq: kssj,
          fssjz: jssj,
          pageNum:pageNum,
          pageSize:pageSize
        }
        _this.postRequest(
          "/api/v1/zpy/getZpyList/" ,params
        ).then(resp => {
          if (resp && resp.status == 200) {
            for (var i=0;i < resp.data.list.length;i++){
              resp.data.list[i].fsrq = resp.data.list[i].fsrq.substr(0,10);
            }
            _this.tableData = resp.data.list;
            _this.$nextTick(function(){
              _this.$refs.scroll.update()
            })
            _this.total = resp.data.total;
          }
        });
      },
      exportZpy(){
        let jbmj = '';
        let corp = '';
        let dept = '';
        let zfxm = '';
        let zfbh = '';
        let szxz = '';
        let kssj = '';
        let jssj = '';
        if(this.jbmj != '') {
          jbmj = this.jbmj;
        }
        if(this.corp != '') {
          corp = this.jy;
        }
        if(this.dept != '') {
          dept = this.jq;
        }
        if(this.zfxm != '') {
          zfxm = this.zfxm;
        }
        if(this.zfbh != '') {
          zfbh = this.zfbh;
        }
        if(this.xz != '') {
          szxz = this.xz;
        }
        if(this.kssj == '') {
          Artery.message.info({
            content:"请选择开始时间",
            duration:3
          })
          return;
        }
        if(this.kssj != '' && this.checkIsDateType(this.kssj)) {
          kssj = this.dateFormat(this.kssj);
        }else{
          kssj = this.kssj;
        }
        if(this.jssj == '') {
          Artery.message.info({
            content:"请选择结束时间",
            duration:3
          })
          return;
        }
        if(this.jssj != '' && this.checkIsDateType(this.kssj)) {
          jssj = this.dateFormat(this.jssj)
        }else{
          jssj = this.jssj;
        }
        let url = _server.serverName+"/api/v1/zpy/exportZpy?jbmj="+jbmj+"&corp="+corp+"&dept="+dept+"&zfxm="+zfxm+"&zfbh="+zfbh+
          "&szxz="+szxz+"&kssj="+kssj+"&jssj="+jssj;
        window.location.href = url;
      },
      // 格式化时间
      dateFormat(date) {
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      //判断当前对象是否为Date类型
      checkIsDateType(obj) {
        if (obj && obj instanceof Date) {
          return true;
        }
        return false;
      },
    }
  }
</script>

<style scoped>
  .selectWeek {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
  }
  .selectWeek span {
    margin-right: 10px;
  }
  .fd-week-btns .aty-btn {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .fd-btn-export {
    border: 1px solid #5cadff;
    background-color: #f9fafc;
    color: #188aff;
  }
  .search_option_input,
  .search_option_box .aty-date-picker {
    width: calc(100% - 126px);
    position: absolute;
    top: 0;
    left: 116px;
    right: 0;
  }
  .fd-bj-pabel .search_option_box .search_option_text {
    width: 100px;
  }
  .fd-bj-pabel .fd-bj-row.aty-row .aty-col {
    padding: 0 16px;
  }
  .search_option_box .search_option_text {
    display: inline-block;
    width: 126px;
    text-align: right;
    height: 100%;
    position: absolute;
    top: 0;
    left: 16px;
  }
  .fd-bj-row.aty-row {
    margin: 0 0 19px;
  }
  .fd-filter-panel {
    padding: 20px 0 0;
  }
  .fd-bj-pabel .fd-bj-row.aty-row .aty-col.fd-week-btns {
    text-align: right;
  }
  .search_option_marginb {
    margin-bottom: 15px;
  }
</style>
