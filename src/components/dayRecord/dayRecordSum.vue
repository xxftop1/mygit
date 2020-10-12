<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap fd-index-wrap">
        <div class="main_name"><aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
        <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
        <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
        <div class="main_box">
            <aty-row class="search_option_box mg-20">
                <aty-col span="6" class="search_option_marginb">
                    <p class="search_option_text">记载日期:</p>
                    <aty-date-picker v-model="lrrq" class="dr_date_pick" type="date" :editable='false' clearable>
                    </aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                    <p class="search_option_text_long">罪犯姓名/编号:</p>
                    <aty-input v-model="zfbhhxm" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb search_option_textr">
                    <aty-button class="search_option_butn1" type="primary" @click="queryDataList">
                        <i>
                            <img src="../../assets/images/w-png17.png">
                        </i>
                        <span>查询</span>
                    </aty-button>
                    <aty-button class="search_option_butn2" type="default" @click="exportRjz">
                        <i>
                            <img src="../../assets/images/export.png">
                        </i>
                        <span>导出</span>
                    </aty-button>
                </aty-col>
            </aty-row>
            <aty-table :pageable-data="tableData" style="width: 100%;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="selection" width="45">
                </aty-table-column>
                <aty-table-column type="index" label="序号" width="50">
                </aty-table-column>
                <aty-table-column v-if="false" prop="bh" label="编号">
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.jfkhZfxx.xm"  v-text="props.row.jfkhZfxx.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号">
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.dept" label="监区" width="100">
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.szxz" label="小组" width="60">
                </aty-table-column>
                <aty-table-column prop="fsrq" label="发生日期" :formatter="df" width="130">
                </aty-table-column>
                <aty-table-column prop="khxm" label="考核部分" :formatter="khxmf" width="80">
                </aty-table-column>
                <aty-table-column prop="qxjcfx" label="分项" :formatter="fxf" >
                </aty-table-column>
                <aty-table-column prop="khyj" label="条款项" >
                </aty-table-column>
                <aty-table-column prop="qj" label="情节" :formatter="qjf"  width="80">
                </aty-table-column>
                <aty-table-column prop="zysy" label="主要事由" >
                </aty-table-column>
                <aty-table-column prop="yjfs" label="分数" width="100">
                </aty-table-column>
                <aty-table-column prop="zt" label="审批状态" :formatter="spztf" width="100">
                </aty-table-column>
            </aty-table>
            <!-- table區域 end -->
        </div>
        <!-- </aty-scroll> -->
        </happy-scroll>
        <!-- 打印预览弹窗 -->
        <aty-modal :mask-closable="false" class="drs_dayin_pop" ref="modalWidiow1" width="95%" closable="">
          <div class="pop_title">打印预览</div>
          <div class="pop_main_box">
            <aty-table
                id="dayinTable"
                :pageable-data="tableData"
                style="width: 100%;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="index" label="序号" width="50">
                </aty-table-column>
                <aty-table-column v-if="false" prop="bh" label="编号">
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名" width="130">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.jfkhZfxx.xm"  v-text="props.row.jfkhZfxx.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号" width="130">
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.dept" label="监区" width="60">
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.szxz" label="小组" width="60">
                </aty-table-column>
                <aty-table-column prop="fsrq" label="发生日期" :formatter="df" width="130">
                </aty-table-column>
                <aty-table-column prop="khxm" label="考核部分" :formatter="khxmf">
                </aty-table-column>
                <aty-table-column prop="qxjcfx" label="分项" :formatter="fxf" width="100">
                </aty-table-column>
                <aty-table-column prop="khyj" label="条款项" >
                </aty-table-column>
                <aty-table-column prop="qj" label="情节" :formatter="qjf">
                </aty-table-column>
                <aty-table-column prop="zysy" label="主要事由" width="100">
                </aty-table-column>
                <aty-table-column prop="yjfs" label="分数" width="100">
                </aty-table-column>
                <aty-table-column prop="zt" label="审批状态" :formatter="spztf" width="100">
                </aty-table-column>
            </aty-table>
          </div>
          <!--<div @click="popPrintButn" class="dayin_butn">打印</div>-->
        </aty-modal>
        <loading :isLoading="isLoading"></loading>
    </div>
    <!-- 内容部分end -->
</template>
<script>
import loading from '../base/loading'
export default {
    components: {
      loading:loading
    },
    data: function() {
        return {
            breadcrumbdata:[
                {
                name:'日记载'
                },
                {
                name:'日记载汇总',
                href:'/dayRecord/dayRecordSum'
                }
            ],
            //罪犯信息url
            zfxxUrl:_zfxxDetail.url,
            //记载日期
            lrrq:'',
            //罪犯编号/姓名
            zfbhhxm:"",
            // table数据
            tableData: [],
            isLoading:false
        };
    },
  created() {
    this.lrrq = this.nowDate;
    this.queryDataList();
  },
  watch:{
    tableData:function(val,oldVal){
    //   this.$refs.scroll.update()
    }
  },
  computed: {
    /**
     * @name 当前时间
     * @description
     */
    nowDate: function() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
      var day = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate();
      return year + "-" + month + "-" + day;
    },
  },
  methods:{
    //审批状态转义
    spztf: function (row, column) {
      var key = _sigleCode.rjzSpzt + row;
      var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      return row != undefined ? (value != undefined ? value.name :"") : "";
    },
    //日期转义
    df: function (row, column) {
      return row != undefined ? row.substr(0,10) :  "";
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
      return qj;
    },
    //情节转义
    qjf: function (row, column) {
      var key = _sigleCode.qj + row;
      var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      return row != undefined ? (value != undefined ? value.name :"") : "";
    },
    //考核部分转义
    khxmf: function (row, column) {
      var key = _sigleCode.khxm + row;
      var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      return row != undefined ? (value != undefined ? value.name :"") : "";
    },
    //条件查询方法
    queryDataList() {
      let _this = this;
      let params = {
        lrrq: _this.lrrq == '' ? '' : _this.lrrq,
        zfbhhxm: _this.zfbhhxm,
      };
      this.isLoading=true
      this.getRequest("/api/v1/rjz/getRjzHzListByParams", params).then(resp => {
        if (resp && resp.status == 200) {
          let list = resp.data;
          this.tableData = list;
          this.isLoading=false
          if (list == undefined || list == null) {
            return;
          }
        }
      });
    },
    //导出日记载汇总
    exportRjz() {
      let param1 = '';
      let param2 = '';
      if(this.lrrq != '') {
        param1 = this.lrrq;
      }
      debugger
      if(this.zfbhhxm != '') {
        param2 = this.zfbhhxm;
      }
      let url = _server.serverName+"/api/v1/rjz/exportRjzhz?lrrq="+param1+"&zfbhhxm="+param2;
      window.location.href = url;
    },
  }
};
</script>

<style media="print" scoped>
.row_text_left {
    text-align: left;
}
.tabs_icon1 {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: url(../../assets/images/w-png8.png) no-repeat;
}
.tabs_icon2 {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: url(../../assets/images/w-png10.png) no-repeat;
}
.tabs_icon3 {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: url(../../assets/images/w-png12.png) no-repeat;
}
.aty-tabs-nav .aty-tabs-tab-active .tabs_icon1 {
    background: url(../../assets/images/w-png7.png) no-repeat;
}
.aty-tabs-nav .aty-tabs-tab-active .tabs_icon2 {
    background: url(../../assets/images/w-png9.png) no-repeat;
}
.aty-tabs-nav .aty-tabs-tab-active .tabs_icon3 {
    background: url(../../assets/images/w-png11.png) no-repeat;
}
.search_option_box .aty-input {
    height: 34px;
}
.search_option_box .search_option_text {
    display: inline-block;
    width: 21%;
    text-align: center;
}
.search_option_box .search_option_text_long {
    display: inline-block;
    text-align: center;
    /* width: 26%; */
}
.search_option_box .search_option_text_long + .search_option_input {
    width: 60%;
}
.search_option_box .aty-date-picker {
    width: 77%;
}
.search_option_input {
    width: 77%;
}
.search_option_marginb {
    margin-bottom: 21px;
    padding-left: 20px;
}
/* .search_option_butn1 i{
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/w-jpg3.png) no-repeat;
    float: left;
}
.search_option_butn2 i{
    display: block;
    width: 21px;
    height: 15px;
    background: url(../../assets/images/w-jpg4.png) no-repeat;
    float: left;
    margin-top: 1px;
} */
.search_option_butn_text {
    float: left;
    margin-left: 7px;
}
.search_option_butn1 {
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding-top: 0px;
    padding-bottom: 0px;
    background-color: #188aff;
    border-color: #188aff;
    font-size: 14px;
}
.search_option_butn1 img {
    margin-top: -3px;
}
.search_option_butn2 {
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding-top: 0px;
    padding-bottom: 0px;
    background-color: #f9fafc;
    border-color: #188aff;
    margin-left: 11px;
    color: #188aff;
    font-size: 14px;
}
.search_option_butn2 img {
    margin-top: -3px;
}
.search_option_textr {
    text-align: left;
}

.dr_edit_b1 {
    height: 30px;
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    background-color: #00ccbb;
    border-color: #00ccbb;
    margin-right: 12px;
}
.dr_edit_b1:hover {
    background-color: #0fdbca;
    border-color: #0fdbca;
}
.dr_edit_b1 img {
    margin-top: -3px;
}

.table_butn {
    margin: 0 4px;
    cursor: pointer;
}
/* 弹出框样式 */
.pop_title{
  width: 100%;
  height: 55px;
  background-color: #188aff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 16px;
  color: #fff;
  line-height: 55px;
  text-indent: 15px;
}
.pop_main_box{
  padding: 20px 20px;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.dayin_butn{
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  background-color: #188aff;
  border-radius: 3px;
  margin: 0 auto;
  padding-bottom: 30px;
  font-size: 14px;
  cursor: pointer;
}
</style>

