<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap fd-gkhz-wrap fd-index-wrap">
      <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"  @click="queryData"></aty-breadcrumb></div>
      <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
      <div class="main_box">
        <aty-row class="search_option_box fd-gkhz-row">
          <div class="workArea">
            <div class="selectionMonth">
              <aty-col>
                <span>考核时间：</span>
              </aty-col>
              <aty-col>
                <aty-date-picker clearable type="month" @change="queryDataByRq"  v-model="OnDate" :value="OnDate"
                                 :options="options" v-if="!isFjq" ></aty-date-picker>
                <aty-date-picker clearable type="year" @change="queryDataByRq"  v-model="OnDate" :value="OnDate"
                                 :options="options1" v-else></aty-date-picker>
              </aty-col>
            </div>
          </div>
        </aty-row>
        <div class="tabs_main_box">
          <!-- table區域 start -->
          <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" name="scroll" :show="false">
          <aty-table
            class="npl_table fd-summary-table"
            :pageable-data="tableData"
            style="width: 100%;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column prop="dw" label="单位" class-name="w0" :showOverflowTooltip="false" v-if="!isFjq">
                    <template slot-scope="props" >
                        <a :title="props.row.dw"  v-text="props.row.dw" @click="getNewData(props)"></a>
                    </template>
                </aty-table-column>
                <aty-table-column prop="yf" label="月份" class-name="w0" :showOverflowTooltip="false" v-if="isFjq">
                    <template slot-scope="props" >
                        <a :title="props.row.dw"  v-text="props.row.dw" ></a>
                    </template>
                </aty-table-column>
                <aty-table-column prop="zczrs" label="在册总人数" class-name="w1">
                      <template slot-scope="scope" >
                        <aty-text :text="scope.row.zczrs + ''"  :title="scope.row.zczrs+''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="sjkhrs" label="实际考核人数" class-name="w1">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.sjkhrs + ''"  :title="scope.row.sjkhrs+''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="wkhrs" label="未考核人数" class-name="w1">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.wkhrs + ''"  :title="scope.row.wkhrs+''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="wldnlrs" label="无劳动能力人数" class-name="w2">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.wldnlrs + ''"  :title="scope.row.wldnlrs+''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column label="60分以下">
                    <aty-table-column  label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.rC1 + ''"  :title="scope.row.rC1+''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.bFB1 + ''" :title="scope.row.bFB1+''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
                <aty-table-column label="60-79分">
                    <aty-table-column  label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.rC2 + ''"  :title="scope.row.rC2+''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope" >
                        <aty-text :text="scope.row.bFB2 + ''" :title="scope.row.bFB2+''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
                <aty-table-column label="80-99分">
                    <aty-table-column label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.rC3 + ''" :title="scope.row.rC3+''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.bFB3 + ''" :title="scope.row.bFB3+''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
                <aty-table-column label="100-119分">
                    <aty-table-column  label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.rC4 + ''" :title="scope.row.rC4+''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.bFB4 + ''" :title="scope.row.bFB4+''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
                <aty-table-column label="120分以上">
                    <aty-table-column  label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.rC5 + ''" :title="scope.row.rC5 +''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.bFB5 +''" :title="scope.row.bFB5 +''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
                <aty-table-column prop="pjdf" label="平均得分" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.pjdf+ ''" :title="scope.row.pjdf+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="zgdf" label="最高得分" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.zgdf+ ''" :title="scope.row.zgdf+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column label="训诫">
                    <aty-table-column  label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.xjrc + ''" :title="scope.row.xjrc + ''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.xjbfb + ''" :title="scope.row.xjbfb + ''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
                <aty-table-column prop="yCXKFRC1" label="一次性扣5-15分人次" class-name="w3">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.yCXKFRC1+ ''" :title="scope.row.yCXKFRC1+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="yCXKFRC2" label="一次性扣20-30分人次"  class-name="w3">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.yCXKFRC2+ ''" :title="scope.row.yCXKFRC2+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="yljkfrc" label="月累计扣30分以上人次"  class-name="w3">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.yljkfrc+ ''" :title="scope.row.yljkfrc+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="jingg" label="警告" class-name="w1">
                   <template slot-scope="scope">
                        <aty-text :text="scope.row.jingg+ ''" :title="scope.row.jingg+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="jig" label="记过" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.jig+ ''" :title="scope.row.jig+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column prop="jb" label="禁闭" class-name="w1">
                   <template slot-scope="scope">
                        <aty-text :text="scope.row.jb+ ''" :title="scope.row.jb+ ''"></aty-text>
                    </template>
                </aty-table-column>
                <aty-table-column label="扣分人次/百分比">
                    <aty-table-column  label="人次" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.kfrc+ ''" :title="scope.row.kfrc+ ''"></aty-text>
                    </template>
                    </aty-table-column>
                    <aty-table-column  label="百分比" :showOverflowTooltip="false" class-name="w1">
                    <template slot-scope="scope">
                        <aty-text :text="scope.row.kfbfb+ ''" :title="scope.row.kfbfb+ ''"></aty-text>
                    </template>
                    </aty-table-column>
                </aty-table-column>
            </aty-table>
          </aty-scroll>
          <!-- table區域 end -->
        </div>
      </div>
      <!-- </aty-scroll> -->
      </happy-scroll>
    </div>
    <!-- 内容部分end -->
</template>

<script>
export default {
  data() {
    return {
      breadcrumbdata: [],
      jgBh: "",
      dwJb: 0,
      dept: "",
      OnDate: "",
      userInfo: null,
      options: {
        disabledDate: function(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      options1: {
        disabledDate: function(date) {
          return date && date.getFullYear() > new Date().getFullYear();
        }
      },
      isFjq: false,
      tableData: [],
      tempData1: []
    };
  },
  methods: {
    setYear() {
      var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth();
      if(month == 0) {
        year = parseInt(year) - 1;
      }
      this.OnDate = year.toString();
    },
    currentQuery() {
      var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      //设置时间
      if (curUserInfo.deptType == "1") {//监狱局(处室)
        this.jgBh = curUserInfo.corpId;
        this.dwJb = 10;
        this.OnDate = this.formatLastMonth(new Date());
      }
      if (curUserInfo.deptType == "2" && curUserInfo.pDeptType == "5") {
        //分监狱下科室，可查看本分监狱下所有数据
        this.jgBh = curUserInfo.pDeptId;
        this.dwJb = 12;
        this.OnDate = this.formatLastMonth(new Date());
      }else {
        //正常监狱(科室)
        this.jgBh = curUserInfo.corpId;
        this.dwJb = 11;
        this.OnDate = this.formatLastMonth(new Date());
      }
      if ((curUserInfo.deptType == "3" || curUserInfo.deptType == "5") && !curUserInfo.sfgyzf) {//不关押罪犯的监区/分监狱
        this.jgBh = curUserInfo.deptId;
        this.dwJb = 12;
        this.OnDate = this.formatLastMonth(new Date());
      }
      if (curUserInfo.deptType == "31" && !curUserInfo.sfgyzf) {//监区部，可查看本监区下所有数据
        this.jgBh = curUserInfo.pDeptId;
        this.dwJb = 12;
        this.OnDate = this.formatLastMonth(new Date());
      }
      if (curUserInfo.sfgyzf) { // 关押罪犯
        this.jgBh = curUserInfo.deptId;
        this.dwJb = 13;
        this.isFjq = true;
        this.setYear();
      }
      var params = {
        jgBh: this.jgBh,
        khny: this.OnDate,
        level: this.dwJb
      };
      this.isLoading = true;
      let temp = {
        name: curUserInfo.deptName, //当前部门名称
        href: { name: "summary" },
        level: this.dwJb,
        jgBh: this.jgBh
      };
      this.breadcrumbdata.push(temp);
      this.getDataRequest(params);
      this.tableData = this.tempData1;
    },
    /**
     * 修改日期时获取数据
     */
    queryDataByRq() {
      var params = {};
      if (this.dwJb == "13") {
        params = {
          jgBh: this.jgBh,
          year: this.OnDate,
          level: this.dwJb
        };
      } else {
        params = {
          jgBh: this.jgBh,
          khny: this.OnDate,
          level: this.dwJb
        };
      }
      this.getDataRequest(params);
    },
    /**
     * 修改日期时获取数据
     */
    queryDataByYear() {
      var params = {};
      if (this.dwJb == "13") {
        params = {
          jgBh: this.jgBh,
          year: this.OnDate,
          level: this.dwJb
        };
      } else {
        params = {
          jgBh: this.jgBh,
          khny: this.OnDate,
          level: this.dwJb
        };
      }
      this.getDataRequest(params);
    },
    /**
     * 点击面包屑请求数据
     */
    queryData(item, event) {
      //如果编号为空不跳转
      if (item.jgBh == null) {
        return;
      }
      if (this.jgBh != item.jgBh) {
        if(this.isFjq){
          this.OnDate = this.formatLastMonth(new Date());
        }
        this.isFjq = false;
      }
      this.dwJb = item.level;
      this.jgBh = item.jgBh;
      var params = {
        jgBh: item.jgBh,
        khny: this.OnDate,
        level: item.level,
        xm: "",
        sx: ""
      };
      this.isLoading = true;
      this.getDataRequest(params);
      for (
        var i = this.breadcrumbdata.length - 1;
        i < this.breadcrumbdata.length;
        i--
      ) {
        if (i < 0) {
          return;
        }
        if (item.level < this.breadcrumbdata[i].level) {
          this.breadcrumbdata.splice(i, 1);
        }
      }
    },
    /**
     * 点击下钻，获取下钻页面新数据
     */
    getNewData(item) {
      //拼接面包屑
      let temp = {
        name: item.row.dw,
        href: "/summary",
        level: item.row.level,
        jgBh: item.row.jgBh
      };
      //如果不是本单位不跳转
      if (this.userInfo.corpId != item.row.bh && this.userInfo.deptType != 1) {
        if (
          this.userInfo.deptId != item.row.bh &&
          Number(this.userInfo.deptType) + Number(2) == item.row.jb
        ) {
          return;
        }
      }
      if (item.row.jgBh != null) {
        this.breadcrumbdata.push(temp);
      }
      //如果编号为空不跳转
      if (item.row.jgBh == null) {
        return;
      }
      var row = item.row;
      this.dwJb = item.row.level;
      this.jgBh = item.row.jgBh;
      if (this.OnDate instanceof Date) {
        this.OnDate = this.formatLastMonth(new Date());
      }
      var params = {
        jgBh: item.row.jgBh,
        khny: this.OnDate,
        level: item.row.level
      };
      if (item.row.sfgyzf) {
        //分监区级别的时候左侧第一列显示年月,时间选择变为选择年
        this.isFjq = true;
        this.setYear();
      }
      this.isLoading = true;
      this.getDataRequest(params);
    },
    getDataRequest(p) {
      var params = "";
      if (p == null) {
        params = {};
      } else {
        params = p;
      }
      let _this = this;
      _this.isLoading = true;
      this.postRequest(_this.apis.api0091, params).then(resp => {
        if (resp && resp.status == 200) {
          _this.tableData = resp.data == ""?[]:resp.data;
          _this.$nextTick(function() {
            _this.$refs.scroll.update();
          });
        }
        _this.isLoading = false;
      });
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
    this.currentQuery();
  },
  mounted() {
  }
};
</script>
<style scoped>
.fd-gkhz-row {
  margin: 0;
}
</style>


