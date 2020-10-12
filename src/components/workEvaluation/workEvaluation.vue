<template>
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name">
      <aty-breadcrumb :data="breadcrumbdata" can-click separator=">" @click="queryData"></aty-breadcrumb>
    </div>
    <!-- table區域 start -->
    <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
      <div class="fd-scroll-box">
      <div class="main_box" >
        <div class="buttonsGroup">
          <aty-button type="primary" text="导出" class="export" @click="exportGZPJ()"></aty-button>
        </div>
        <aty-row class="search_option_box fd-gzpj-row">
          <div class="workArea">
            <div class="selectionMonth">
              <span>月份</span>
              <aty-date-picker :clearable="false" type="month" @change="queryDataByRq"  v-model="OnDate" :value="OnDate"  :options="options3"
                              style="width: 216px"></aty-date-picker>
            </div>
          </div>
        </aty-row>
        <div class="fd-table-box" v-if="level < 6">
          <aty-table
            :pageable-data="tableData0"
            style="width: 100%; " class="fd-table-jail"  @sort-change="sortdata()" @load-data="loadSortData"  :exp-all="false"
            :exp-current-page="false">
            <aty-table-column
              prop="mc"
              label="单位" sortable="custom" :showOverflowTooltip="false">
              <template slot-scope="props" >
                <a :title="props.row.mc"  v-text="props.row.mc" @click="goNewPage(props)"></a>
              </template>
            </aty-table-column>
            <aty-table-column
              prop="jf"
              label="加分" sortable="custom">
            </aty-table-column>
            <aty-table-column
              prop="kf"
              label="扣分" sortable="custom">
            </aty-table-column>
            <aty-table-column
              prop="hj"
              label="合计" sortable="custom">
            </aty-table-column>
          </aty-table>
        </div>
        <!--各分监区人员列表 -->


        <!-- 最后一个表 -->
        <div class="fd-table-box" v-if="level==6">
          <aty-table
            :pageable-data="personInfoData"
            style="width: 100%; " class="fd-table-jail" :exp-all="false"  :exp-current-page="false">
            <aty-table-column
              prop="xm"
              label="项目"
              width="150" :showOverflowTooltip="false">
              <template slot-scope="props" >
                <aty-link :text="props.row.xm" class="no-link" :title="props.row.xm"></aty-link>
              </template>
            </aty-table-column>
            <aty-table-column
              prop="links"
              label="环节"
              width="150">
            </aty-table-column>
            <aty-table-column
              prop="fsrq"
              label="发生/规定日期"
              width="200">
            </aty-table-column>
            <aty-table-column
              prop="jkfsy"
              label="加扣分事由">
            </aty-table-column>
            <aty-table-column
              prop="czrq"
              label="操作日期"
              width="200">
            </aty-table-column>
            <aty-table-column
              prop="jf"
              label="加分"
              width="200">
            </aty-table-column>
            <aty-table-column
              prop="kf"
              label="扣分"
              width="200">
            </aty-table-column>

          </aty-table>
        </div>
      </div>
      </div>
    <!-- </aty-scroll> -->
    </happy-scroll>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script>
  import loading from '../base/loading'
  export default {
    components: {
      loading:loading
    },
    data: function() {
      return {
        hjMc:"合计",
        level: 0,
        limit: 10,
        total: 0,
        offset: 1,
        xm: "",
        dwBh: "",
        dwJb: 0,
        OnDate: "",
        breadcrumbdata: [],
        options3: {
          disabledDate: function(date) {
            return date && date.valueOf() > Date.now() - 86400000;
          }
        },
        dataList: [
          {
            code: "op1",
            codeType: "op1",
            name: "选项1"
          },
          {
            code: "op2",
            codeType: "op2",
            name: "选项2"
          },
          {
            code: "op3",
            codeType: "op3",
            name: "选项3"
          }
        ],
        dataList: [
          {
            code: "1",
            name: "是"
          },
          {
            code: "0",
            name: "否"
          }
        ],
        // table数据
        tableData0: [],
        personInfoData: [],
        isLoading:false
      };
    },
    methods: {
      //   排序
      sortdata() {},
      loadSortData(queryInfo){
        if(queryInfo.sortList == null){
          return;
        }
        var params={
          bh:this.dwBh,
          rq:this.OnDate,
          jb:this.dwJb,
          xm:queryInfo.sortList[0].column,
          sx:queryInfo.sortList[0].dir
        }
        let _this=this;
        _this.isLoading=true
        _this.getRequest("/api/v1/gzpj/getNum", params).then(resp=> {
          _this.isLoading=false;
          _this.$nextTick(function () {
            _this.$refs.scroll.update()
          });
          if (resp && resp.status == 200 && resp.data.hasOwnProperty('HashMap')) {
            _this.tableData0 = resp.data.HashMap.jfkhGjgzpjList;
          }
        });
      },
      //设置下拉菜单默认时间
      setDate() {
        var myDate = new Date();
        //获取当前年月，设置时间下拉框默认选项
        let month = myDate.getMonth()+1;
        let year = myDate.getFullYear();
        if (month < 10) {
          this.OnDate = year + "-" + "0" + (month);
        } else {
          this.OnDate = year + "-" + (month);
        }
      },
      queryDataByRq(){
        var params={
          bh:this.dwBh,
          rq:this.OnDate,
          jb:this.dwJb,
        }
        if (this.level < 6){
          this.isLoading=true
          this.getRequest(
            "/api/v1/gzpj/getNum", params
          ).then(resp => {
            this.isLoading=false;
            this.$nextTick(function () {
              this.$refs.scroll.update()
            });
            if (resp && resp.status == 200 && resp.data.hasOwnProperty('HashMap')) {
              this.tableData0 = resp.data.HashMap.jfkhGjgzpjList;
            }
          });
        }else{
          this.getRequest(
            "/api/v1/gzpj/getList/" + this.dwBh + "/" + this.OnDate
          ).then(resp => {
            if (resp && resp.status == 200) {
              for (var i = 0; i < resp.data.ArrayList.length; i++) {
                //处理时间
                if(resp.data.ArrayList[i].fsrq != null){
                  resp.data.ArrayList[i].fsrq = resp.data.ArrayList[i].fsrq.substr(0,10);
                }
                if(resp.data.ArrayList[i].czrq != null){
                  resp.data.ArrayList[i].czrq = resp.data.ArrayList[i].czrq.substr(0,10);
                }
              }
              this.personInfoData = resp.data.ArrayList;
              this.$nextTick(function () {
                this.$refs.scroll.update()
              })
            }
          });
        }
      },
      // 打印表格事件
      PrintingForm(event) {
        console.log(event);
      },
      exportGZPJ(event) {
        let url =
          "/jfkh/api/v1/gzpj/exportGzpj/" +
          this.dwBh +
          "/" +
          this.OnDate +
          "/" +
          this.dwJb;
        window.location.href = url;
      },
      goNewPage(item) {
        //拼接面包屑
        let temp = {
          name: item.row.mc,
          href: "/workEvaluation",
          jb: item.row.jb,
          bh: item.row.bh
        };
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        //如果不是本单位不跳转
        if(userInfo.deptType != 1) {
          if (userInfo.deptType == '2') {
            if (userInfo.pDeptType == '5'&&userInfo.pDeptId != item.row.bh){
              return
            }else if(userInfo.corpId != item.row.bh&&Number(userInfo.deptType)+2==item.row.jb) {
              return
            }
          }
          if ((userInfo.deptType == '3'&&userInfo.deptId != item.row.bh&&userInfo.pDeptId != item.row.bh)) {
            return;
          }
          if ((userInfo.deptType == '31'&&userInfo.pDeptId != item.row.bh)) {
            return;
          }
          if ((userInfo.deptType == '4'||userInfo.deptType == '5')&&userInfo.deptId != item.row.bh) {
            return;
          }
        }
        if(item.row.bh != null){
          this.breadcrumbdata.push(temp);
        }
        //如果编号为空不跳转
        if(item.row.bh == null){
          return ;
        }
        var row = item.row;
        this.dwJb = item.row.jb;
        this.dwBh = item.row.bh;
        var params={
          bh:item.row.bh,
          rq:this.OnDate,
          jb:item.row.jb,
        }
        if (item.row.gyzf){
          row.jb = 6;
        }
        if (row.jb < 6) {
          this.isLoading=true
          this.getRequest(
            "/api/v1/gzpj/getNum", params
          ).then(resp => {
            this.isLoading=false;
            this.$nextTick(function () {
              this.$refs.scroll.update()
            })
            if (resp && resp.status == 200 && resp.data.hasOwnProperty('HashMap')) {
              this.tableData0 = resp.data.HashMap.jfkhGjgzpjList;
            }
          });
        } else {
          this.level = row.jb;
          this.isLoading=true
          this.getRequest(
            "/api/v1/gzpj/getList/" + row.bh + "/" + this.OnDate
          ).then(resp => {
            if (resp && resp.status == 200) {
              this.isLoading=false
              this.$nextTick(function () {
                this.$refs.scroll.update()
              })
              if(!resp.data.hasOwnProperty("ArrayList")) {
                return;
              }
              for (var i = 0; i < resp.data.ArrayList.length; i++) {
                //处理时间
                if(resp.data.ArrayList[i].fsrq != null){
                  resp.data.ArrayList[i].fsrq = resp.data.ArrayList[i].fsrq.substr(0,10);
                }
                if(resp.data.ArrayList[i].czrq != null){
                  resp.data.ArrayList[i].czrq = resp.data.ArrayList[i].czrq.substr(0,10);
                }
              }
              this.personInfoData = resp.data.ArrayList;
            }
          });
        }
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
        var currentdate =
          date.getFullYear() + seperator1 + month + seperator1 + strDate;
        return currentdate;
      },
      // 格式化时间
      dateFormatToMonth(date) {
        var seperator1 = "-";
        var month = date.getMonth()+1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        var currentdate =
          date.getFullYear() + seperator1 + month;
        return currentdate;
      },
      currentQuery(){
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        if(userInfo.deptType == '1') {
          this.dwBh = userInfo.corpId;
          this.dwJb = 10;//监狱局
        }
        if(userInfo.deptType=='2') {
          if (userInfo.pDeptType == '5' ){
            this.dwBh = userInfo.pDeptId;
            this.dwJb = 12;//分监狱
          }else{
            this.dwBh = userInfo.corpId;
            this.dwJb = 11;//监狱
          }
        }
        if(userInfo.deptType=='3' || userInfo.deptType=='5'){
            this.dwBh = userInfo.deptId;
            this.dwJb = 12;//监区
        }
        if(userInfo.deptType=='4'){
          this.dwBh = userInfo.deptId;
          this.dwJb = 13;//分监区
        }
        var params={
          bh:this.dwBh,
          rq:this.OnDate,
          jb:this.dwJb,
        }
        this.isLoading=true
        this.getRequest(
          "/api/v1/gzpj/getNum",params
        ).then(resp => {
          this.isLoading=false;
          if (resp && resp.status == 200 && resp.data.hasOwnProperty('HashMap')) {
            this.tableData0 = resp.data.HashMap.jfkhGjgzpjList;
            if(resp.data.HashMap.sjName==null){
              resp.data.HashMap.sjName = '浙江省监狱局'
            }
            if(this.tableData0.length > 0){
              let temp = {
                name: resp.data.HashMap.sjName,
                href: { name: "workEvaluation" },
                jb: resp.data.HashMap.sjjb,
                bh: resp.data.HashMap.sjbh
              };
              this.breadcrumbdata.push(temp);
            }
          }
        });
      },
      queryData(item, event) {
        this.dwJb = item.jb;
        this.dwBh = item.bh;
        this.level = item.jb;
        //如果编号为空不跳转
        if(item.bh == null){
          return ;
        }
        var params={
          bh:item.bh,
          rq:this.OnDate,
          jb:item.jb,
          xm:"",
          sx:""
        }
        this.isLoading=true
        this.getRequest(
          "/api/v1/gzpj/getNum",params
        ).then(resp => {
          if (resp && resp.status == 200) {
            this.tableData0 = resp.data.HashMap.jfkhGjgzpjList;
            this.isLoading=false
          }
        });
        for (
          var i = this.breadcrumbdata.length - 1;
          i < this.breadcrumbdata.length;
          i--
        ) {
          if (i < 0) {
            return;
          }
          if (item.jb < this.breadcrumbdata[i].jb) {
            this.breadcrumbdata.splice(i, 1);
          }
        }
      }
    },
    created() {
      this.level = 3;
      this.setDate();
      this.currentQuery();
    },
    mounted() {
    },
    watch:{
      tableData0:function(val,oldVal){
        this.$nextTick(function () {
          this.$refs.scroll.update()
        })
      },
      personInfoData:function(val,oldVal){
        this.$nextTick(function () {
          this.$refs.scroll.update()
        })
      }
    }
  };
</script>





<style scoped>
  .fd-gzpj-row{
    margin-top:0;
  }
  .fd-home-wrap {
    height: calc(100% - 108px);
  }
  .fd-home-wrap .main_box {
    height: calc(100% - 80px);
  }
  .search_option_box .search_option_text {
    display: inline-block;
    width: 21%;
    text-align: center;
  }
  .aty-breadcrumb a {
    color: #ffffff !important;
  }
  .search_option_input,
  .search_option_box .aty-date-picker {
    width: 77%;
  }
  .fd-art-row.aty-row {
    margin: 10px 0;
  }
  .fd-search-btn {
    text-align: right;
  }
  .cell a.no-link {
    color: #657180;
    cursor: default;
  }

  .buttonsGroup{
    margin-bottom:20px;
    text-align:right;
  }
  .buttonsGroup button {
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding-top: 0px;
    padding-bottom: 0px;
    background-color: #188aff;
    border-color: #188aff;
    margin-right:10px;
    font-size:14px;
  }
</style>
