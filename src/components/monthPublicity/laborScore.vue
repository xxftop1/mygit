<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-ldgzf-box fd-ygs-box " :class="scrollheight?'':'fd-box-pr'">
      <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzTab0Scroll" name="rjzTab0Scroll" :show="false"> -->
          <div class="fd-scroll-box" :class="scrollheight  ? 'fd-pr-10':''">
          <process :sftz="sftz"></process>
          <div class="btn-links">
            <aty-button class="dr_edit_b1" type="primary" @click="changeView(1)">
              <span>劳动分（有劳动定额）</span>
            </aty-button>
            <aty-button class="dr_edit_b1" type="primary" @click="changeView(2)">
              <span>劳动分（无劳动定额）</span>
            </aty-button>
            <aty-button class="dr_edit_b1" type="primary" @click="changeView(3)">
              <span>劳动改造分汇总</span>
            </aty-button>
          </div>
          <h2 class="table-title">{{tableTitle}}</h2>
          <div class="search-area fd-gzf-search" :class="{ldgzf:view==3}">
            <aty-form inline :label-width="120" class="fd-gzf-form">
              <aty-form-item label="罪犯姓名" class="fd-gzf-item">
                <aty-input v-model="searchArea.zfxm" clearable></aty-input>
              </aty-form-item>
              <aty-form-item label="罪犯编号" class="fd-gzf-item">
                <aty-input v-model="searchArea.zfbh" clearable></aty-input>
              </aty-form-item>
              <aty-form-item label="小组" class="fd-gzf-item">
                <aty-input v-model="searchArea.ldxz" clearable></aty-input>
              </aty-form-item>
              <aty-form-item v-if="view==3" label="有无劳动定额" class="fd-gzf-item">
                <aty-select  transfer v-model="searchArea.ywldde" :data="ywlddeList" clearable></aty-select>
              </aty-form-item>
              <aty-form-item label="工种" class="fd-gzf-item">
                <aty-input v-model="searchArea.gz" clearable></aty-input>
              </aty-form-item>
              <aty-form-item class="fd-gzf-btn">
                <aty-button @click="changeSearch(view)" class="search_option_butn1" type="primary">
                  <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
                </aty-button>
              </aty-form-item>
            </aty-form>
          </div>
          <div class="btn-links mgbt10">
            <aty-button v-if="fybButton" type="primary" @click="clickLaborScoreExport" class="dr_edit_b1">劳动分样表下载</aty-button>
            <aty-upload ref="uploadFile" action="//jsonplaceholder.typicode.com/posts/" class="fd-ldf-import"
                        :before-upload="handleUpload"  v-if="ldfdrButton" >
              <aty-button v-if="ldButton" type="primary" class="dr_edit_b1">
                劳动分导入
              </aty-button>
            </aty-upload>
            <aty-button v-if="(view==2||view==3)&&false" type="primary" @click="clickPrint" class="dr_edit_b1">打 印</aty-button>
            <aty-button v-if="view==2&&right.ldgzfck" type="primary" @click="clickExport" class="dr_edit_b1">导 出</aty-button>
            <aty-button v-if="view==3&&right.ldgzfck" type="primary" @click="clickExportYhz" class="dr_edit_b1">导 出</aty-button>
            <aty-button v-if="buttonShow" type="primary" @click="clickCreateTable" class="dr_edit_b1">完成劳动改造分汇总</aty-button>
          </div>
          <div v-if="view==1" class="tabs_main_box">
            <!-- table區域 start -->
            <aty-table @selection-change="selectionChange1" :pageable-data="tableData" :exp-all="false" :exp-current-page="false" key="table1" @sort-change="sortdata1()" @load-data="loadSortData1">
              <aty-table-column type="selection" width="45">
              </aty-table-column>
              <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
              </aty-table-column>
              <aty-table-column prop="bh" v-if="false" label="编号">
              </aty-table-column>
              <aty-table-column prop="zfbh" label="罪犯编号" sortable="custom">
              </aty-table-column>
              <aty-table-column prop="zfxm" label="罪犯姓名">
              </aty-table-column>
              <aty-table-column prop="corp" label="监狱">
              </aty-table-column>
              <aty-table-column prop="dept" label="监区">
              </aty-table-column>
              <aty-table-column prop="ldxz" label="小组">
              </aty-table-column>
              <aty-table-column prop="gz" label="工种">
              </aty-table-column>
              <aty-table-column prop="jif" label="计分">
                <template slot-scope="scope">
                  <div>
                    <aty-text class="search_option_input_drw" v-text="scope.row.jif"></aty-text>
                  </div>
                </template>
              </aty-table-column>
              <aty-table-column prop="jiaf" label="加分">
                <template slot-scope="scope">
                  <div>
                    <aty-text class="search_option_input_drw" v-text="scope.row.jiaf"></aty-text>
                  </div>
                </template>
              </aty-table-column>
              <aty-table-column prop="hj" label="合计">
                <template slot-scope="scope">
                  <div>
                    <aty-input :disabled="right.ldgzfck&&!right.ldgzfbj||(processState.sfwcpy=='1'&&right.ldgzfbj)"
                               class="search_option_input_drw" v-model="scope.row.hj"
                               @change="getScore(scope.row,scope.row.bh)" @keyup="filterNumber1(scope.row)"></aty-input>
                  </div>
                </template>
              </aty-table-column>
            </aty-table>
            <!-- table區域 end -->
            <!-- 分页 start -->
            <aty-row class="fd-category" v-show="false">
              <aty-row>
                <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true" :show-elevator="true" @change="changePage" :limit-opts="limitOpts" ref="dbPage" @page-size-change="pageSizeChange"></aty-pagination>
              </aty-row>
            </aty-row>
            <!-- 分页 end -->
          </div>
          <div v-if="view==2" class="tabs_main_box">
            <!-- table區域 start -->
            <aty-table @selection-change="selectionChange2" :pageable-data="tableData2" :exp-all="false" :exp-current-page="false" key="table2" @sort-change="sortdata2()" @load-data="loadSortData2" class="fd-ld-table">
              <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
              </aty-table-column>
              <aty-table-column prop="bh" v-if="false" label="编号">
              </aty-table-column>
              <aty-table-column prop="zfbh" label="罪犯编号" sortable="custom">
              </aty-table-column>
              <aty-table-column prop="zfxm" label="罪犯姓名">
              </aty-table-column>
              <aty-table-column prop="corp" label="监狱">
              </aty-table-column>
              <aty-table-column prop="dept" label="监区">
              </aty-table-column>
              <aty-table-column prop="ldxz" label="小组">
              </aty-table-column>
              <aty-table-column prop="gz" label="工种">
              </aty-table-column>
              <aty-table-column prop="sfgjjsgw" label="是否关键技术岗位" width="120">
              </aty-table-column>
              <aty-table-column prop="qqhj" label="缺勤合计" width="70">
              </aty-table-column>
              <aty-table-column prop="ybhj" label="一般合计" >
              </aty-table-column>
              <aty-table-column prop="lhhj" label="良好合计" width="70">
              </aty-table-column>
              <aty-table-column prop="yxhj" label="优秀合计" >
              </aty-table-column>
              <aty-table-column prop="tchj" label="突出合计" width="70">
              </aty-table-column>
              <aty-table-column prop="bxhz" label="表现汇总" >
                <template slot-scope="scope">
                  <div>
                    <aty-text class="search_option_input_drw" v-text="bxhzText[scope.row.bxhz]"></aty-text>
                  </div>
                </template>
              </aty-table-column>
              <aty-table-column prop="jif" label="计分" width="60">
                <template slot-scope="scope">
                  <div>
                    <aty-text class="search_option_input_drw" v-text="scope.row.jif"></aty-text>
                  </div>
                </template>
              </aty-table-column>
              <aty-table-column prop="jiaf" label="加分" width="60">
                <template slot-scope="scope">
                  <div>
                    <aty-text class="search_option_input_drw" v-text="scope.row.jiaf"></aty-text>
                  </div>
                </template>
              </aty-table-column>
              <aty-table-column prop="hj" label="合计"  width="60">
                <template slot-scope="scope">
                  <div>
                    <aty-input :disabled="right.ldgzfck&&!right.ldgzfbj||(processState.sfwcpy=='1'&&right.ldgzfbj)"
                               class="search_option_input_drw" v-model="scope.row.hj" @change="getScore2(scope.row)"
                               @keyup="filterNumber(scope.row)"></aty-input>
                  </div>
                </template>
              </aty-table-column>

            </aty-table>
            <!-- table區域 end -->
            <!-- 分页 start -->
            <aty-row class="fd-category" v-show="false">
              <aty-row>
                <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true" :show-elevator="true" @change="changePage" :limit-opts="limitOpts" ref="dbPage" @page-size-change="pageSizeChange"></aty-pagination>
              </aty-row>
            </aty-row>
            <!-- 分页 end -->
          </div>
          <div v-if="view==3" class="tabs_main_box">
            <!-- table區域 start -->
            <aty-table @selection-change="selectionChange3" :pageable-data="tableData3" :exp-all="false" :exp-current-page="false"  key="table3" @sort-change="sortdata3()"  @load-data="loadSortData3">
              <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
              </aty-table-column>
              <aty-table-column prop="bh" v-if="false" label="编号">
              </aty-table-column>
              <aty-table-column prop="zfxxBh" v-if="false" label="罪犯编号">
              </aty-table-column>
              <aty-table-column prop="zfbh" label="罪犯编号" sortable="custom">
              </aty-table-column>
              <aty-table-column prop="zfxm" label="罪犯姓名">
              </aty-table-column>
              <aty-table-column prop="corp" label="监狱">
              </aty-table-column>
              <aty-table-column prop="dept" label="监区">
              </aty-table-column>
              <aty-table-column prop="ldxz" label="小组">
              </aty-table-column>
              <aty-table-column prop="gz" label="工种">
              </aty-table-column>
              <aty-table-column prop="ywldde" label="有无劳动定额" title="有无劳动定额">
              </aty-table-column>
              <aty-table-column prop="jif" label="计分" width="60">
              </aty-table-column>
              <aty-table-column prop="jiaf" label="加分" width="60">
              </aty-table-column>
              <aty-table-column prop="kf" label="扣分" width="60">
              </aty-table-column>
              <aty-table-column prop="khny" v-if="false" label="考核月份">
              </aty-table-column>
              <aty-table-column prop="tkjf" label="3-9/1/33加分">
              </aty-table-column>
              <aty-table-column prop="zxjf" label="专项加分">
              </aty-table-column>
              <aty-table-column prop="dxcf" label="单项处罚">
              </aty-table-column>
              <aty-table-column prop="hj" label="合计">
              </aty-table-column>
            </aty-table>
            <!-- table區域 end -->
            <!-- 分页 start -->
            <aty-row class="fd-category" v-show="false">
              <aty-row>
                <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true" :show-elevator="true" @change="changePage" :limit-opts="limitOpts" ref="dbPage" @page-size-change="pageSizeChange"></aty-pagination>
              </aty-row>
            </aty-row>
            <!-- 分页 end -->
          </div>
          </div>
        <!-- </aty-scroll> -->
      </happy-scroll>
    </div>
  </div>
</template>
<script>
import confirmbox from "../confirmBox/confirmBox.vue";
import loading from "../base/loading";
import process from "../monthPublicity/components/process.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: function() {
    return {
      scrollheight:false,
      sftz:true,
      isLoading: false,
      showConfirm: false,
      bh: "",
      tableData: [],
      tableData2: [],
      tableData3: [],
      bxhzText: {
        "1": "突出",
        "2": "优秀",
        "3": "良好",
        "4": "一般",
        "5": "缺勤"
      },
      total: 10000,
      url:_zfxxDetail.url,
      limit: 10000,
      offset: 1,
      limitOpts: [5, 10, 15, 20],
      ldjcfSeleteList: [
        {
          code: "1",
          name: "突出"
        },
        {
          code: "2",
          name: "优秀"
        },
        {
          code: "3",
          name: "良好"
        },
        {
          code: "4",
          name: "一般"
        },
        {
          code: "5",
          name: "缺勤"
        }
      ],
      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "劳动改造分",
          href: "/monthPublicity/laborScore"
        }
      ],
      daoru: [],
      nowDate: "",
      view: 1,
      db_count: 30,
      searchArea: {
        nowDate: "",
        corpId: "",
        deptId: "",
        zfxm: "",
        zfbh: "",
        ldxz: "",
        ywldde: "",
        gz: ""
      },
      view: 1,
      right: {
        ldgzfck: false,
        ldgzfbj: false
      },
    };
  },
  components: {
    confirmbox,
    loading,
    process
  },
  mounted() {
    this.sftz = this.$route.query.sftz;
    let _this = this;
    setTimeout(function() {
      _this.initData();
    }, 1000);
  },
  methods: {
    //   排序
    sortdata2() {},
    loadSortData2(queryInfo2) {
      if (queryInfo2.sortList == null) {
        return;
      }
      this.clickNotLaborScore(queryInfo2);
    },
    sortdata1() {},
    loadSortData1(queryInfo1) {
      if (queryInfo1.sortList == null) {
        return;
      }
      this.clickLaborScore(queryInfo1);
    },
    sortdata3() {},
    loadSortData3(queryInfo3) {
      if (queryInfo3.sortList == null) {
        return;
      }
      this.clickLaborScoreSum(queryInfo3);
    },

    /**
     * 清除查询条件
     * @description 清除查询条件
     * @param {string} param 父组件值
     */
    clearSearch() {
      var _this = this;
      _this.searchArea.zfxm = "";
      _this.searchArea.zfbh = "";
      _this.searchArea.ldxz = "";
      _this.searchArea.ywldde = "";
      _this.searchArea.gz = "";
    },
    /**
     * 必须输入数字
     * @description 必须输入数字
     * @param {string} param 父组件值
     */
    filterNumber(row) {
      var value = row.hj;
      row.hj = value.toString().replace(/[^0-9]/gi, "");
    },
    filterNumber1(row) {
      var value = row.hj;
      row.hj = value.toString().replace(/[^0-9]/gi, "");
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.right.ldgzfck = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ldgzf.ck",
        rightList
      );
      _this.right.ldgzfbj = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ldgzf.bj",
        rightList
      );
    },
    changeBxhz(row) {
      if (row) {
      } else if (row) {
      }
    },
    handleUpload(file) {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate,
        corp: _this.corpObj.corpId,
        dept: _this.deptObj.deptId
      };
      var formData = new FormData();
      formData.append("file", file);
      formData.append("params", JSON.stringify(params));
      _this.isLoading = true;
      _this.uploadFileRequest(_this.apis.api0034, formData).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (JSON.stringify(resp.data) == "{}") {
            Artery.message.success("更新成功");
            _this.clickLaborScore();
          } else {
            for (var i = 0, len = resp.data.length; i < len; i++) {
              Artery.message.info({
                content:
                  resp.data[i].yy +
                  "(" +
                  resp.data[i].zfbh +
                  "," +
                  resp.data[i].zfxm +
                  ")",
                duration: 5
              });
            }
          }
        }
      });
    },
    /**
     * 初始化数据
     * @description 初始化数据
     * @param {string} param 父组件值
     */
    initData() {
      var _this = this;
      _this.searchArea.nowDate = _this.khny;
      _this.searchArea.corpId = _this.corpObj.corpId;
      _this.searchArea.deptId = _this.deptObj.deptId;
      _this.getCurUser();
      _this.changeView(1);
    },
    getScore(row, bh) {
      var _this = this;
      var hj = parseInt(row.hj);
      if (typeof hj != "number") {
        Artery.message.info("请输入数字！");
        return;
      } else {
        if (hj > 35 && hj <= 50) {
          row.jif = "" + 35;
          row.jiaf = "" + (hj - row.jif);
          /**

             * 计算分数
             * @param {string} row 当前行信息
             */
        } else if (hj <= 35 && hj >= 0) {
          row.jif = "" + hj;
          row.jiaf = "" + 0;
        } else if (hj < 0 || hj > 50) {
          row.hj = "";
          row.jif = "";
          row.jiaf = "";
          Artery.message.info("请输入合理数值！");
          return;
        }
      }
      var params = {
        jif: row.jif,
        jiaf: row.jiaf,
        hj: row.hj,
        bh: row.bh,
        khny: _this.searchArea.nowDate//考核年月
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0038, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          Artery.message.success("更新成功");
        }
      });
    },
    getScore2(row) {
      var _this = this;
      var hj = parseInt(row.hj);
      var gw = row.sfgjjsgw === "是" ? "1" : "2"; // 是否是关键技术岗位
      var topCount = gw == "1" ? 50 : 45;
      var bxhz = "";
      if (typeof hj != "number") {
        Artery.message.info("请输入数字！");
        return;
      } else {
        if (hj > 35 && hj <= topCount) {
          row.jif = "" + 35;
          row.jiaf = "" + (hj - row.jif);
          /**
           * 计算分数
           * @param {string} row2当前行信息
           */
        } else if (hj <= 35 && hj >= 0) {
          row.jif = "" + hj;
          row.jiaf = "" + 0;
        } else if (hj < 0 || hj > topCount) {
          row.hj = "";
          row.jif = "";
          row.jiaf = "";
          Artery.message.info("请输入合理数值！");
          return;
        }
        // 表现汇总突出的，合计36-50
        // 表现汇总优秀的，合计31-35
        // 表现汇总良好的，合计21-30
        // 表现汇总一般的，合计5-20
        // 表现汇总缺勤的，合计0-4
        if (hj > 35 && hj <= topCount) {
          row.bxhz = "1";
          bxhz = "1";
        }
        if (hj > 30 && hj <= 35) {
          row.bxhz = "2";
          bxhz = "2";
        }
        if (hj > 20 && hj <= 30) {
          row.bxhz = "3";
          bxhz = "3";
        }
        if (hj >= 5 && hj <= 20) {
          row.bxhz = "4";
          bxhz = "4";
        }
        if (hj >= 0 && hj <= 4) {
          row.bxhz = "5";
          bxhz = "5";
        }
      }
      var params = {
        jif: row.jif,
        jiaf: row.jiaf,
        hj: row.hj,
        bh: row.bh,
        bxhz: bxhz,
        khny: _this.searchArea.nowDate//考核年月
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0038, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          Artery.message.success("更新成功");
          this.clickNotLaborScore();
        }
      });
    },
    /**
     * 劳动分导入
     * @param {string} bh 编号
     */
    clickImportTable() {
      var _this = this;
      if (item) {
        // 确认按钮
        this.showConfirm = false;
        // 调取后台上传文件接口
        let formData = new FormData();
        formData.append("file", this.upFile);
        _this.isLoading = true;
        _this.postRequest(_this.apis.api0014, params).then(resp => {
          _this.isLoading = false;
          if (resp && resp.status == 200) {
            Artery.message.success("导入成功");
            this.isLoading = false;
            this.queryDataList();
            _this.tableData = resp.data;
          } else if (resp && resp.status == 202) {
            Artery.notice.warning({
              title: "导入数据警告!",
              desc: resp.data,
              duration: 0
            });
          }
        });
      } else {
        // 取消按钮
        this.showConfirm = false;
      }
    },
    /**
     * 打 印
     * @param {string} bh 编号
     */
    clickPrint() {
    },
    /**
     * 导出劳动汇总列表
     * @param {string} bh 编号
     */
    clickExportYhz() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
        zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
        ldxz: _this.searchArea.ldxz, // 小组,string类型
        gz: _this.searchArea.gz, // 工种,string类型
        ywldde: _this.searchArea.ywldde
      };
      let url = _server.serverName + _this.apis.api0032 + "?khny=" + params.khny + "&corp=" + params.corp +
        "&dept=" + params.dept + "&zfxm=" + params.zfxm + "&zfbh=" + params.zfbh + "&ldxz=" + params.ldxz + "&gz=" +
        params.gz + "&ywldde=" + params.ywldde;
      window.location.href = url;
    },

    /**
     * 无劳动定额 列表导出
     * @param {string} bh 编号
     */
    sortdata() {},
    clickExport(queryInfo) {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
        zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
        ldxz: _this.searchArea.ldxz, // 小组,string类型
        gz: _this.searchArea.gz // 工种,string类型
      };
      let url =_server.serverName + _this.apis.api0033 + "?khny=" + params.khny + "&corp=" + params.corp + "&dept=" +
        params.dept + "&zfxm=" + params.zfxm + "&zfbh=" + params.zfbh + "&ldxz=" + params.ldxz + "&gz=" + params.gz;
      window.location.href = url;
    },
    /**
     * 生成月初审表
     * @param {string} bh 编号
     */
    clickCreateTable() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        sfwcldjcfsp: "1"
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0045, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (!resp.data.Boolean) {
            Artery.message.info("未完成教育改造分汇总，完成后才可进行月初审");
          } else {
            Artery.message.info("月初审表生成成功");
            _this.$router.push({ path: "/monthPublicity/monthFirstInstance" });
          }
        }
      });
    },
    /**
     * 点击表格1change事件
     * @param {string} bh 编号
     */
    selectionChange1() {
    },
    /**
     * 点击表格换页操作
     * @param {string} bh 编号
     */
    changePage() {
      this.clickNotLaborScore();
      this.clickLaborScore();
      this.clickLaborScoreSum();
    },
    /**
     * 点击表格跳页操作
     * @param {string} bh 编号
     */
    pageSizeChange() {
      this.clickNotLaborScore();
      this.clickLaborScore();
      this.clickLaborScoreSum();
    },
    /**
     * 点击表格2change事件
     * @param {string} bh 编号
     */
    selectionChange2() {
    },
    /**
     * 点击表格3change事件
     * @param {string} bh 编号
     */
    selectionChange3() {
    },
    /**
     * 获取子组件时间
     * @param {string} bh 编号
     */
    getDate(date) {
      var _this = this;
      _this.nowDate = date;
    },
    getheight(){
       var _height = document.getElementsByClassName("happy-scroll-content")[0].clientHeight ;
        var _mainheight = document.getElementsByClassName("fd-scroll-box")[0].clientHeight ;
        if(_height < _mainheight){
            this.scrollheight = true
        }else{
            this.scrollheight = false
        }
    },

    /**
     * 改变可视区
     * @param {string} bh 编号
     */
    changeView(flag) {
      var _this = this;
      _this.oldView = _this.view;
      _this.view = flag;
      _this.clearSearch();
      if (flag == 1) {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        _this.clickLaborScore();
      } else if (flag == 2) {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        _this.clickNotLaborScore();
      } else if (flag == 3) {
          _this.wldTs();
      }
    },
    /**
     *
     * 无劳动定额提示
     * */
    wldTs() {
      //tableData2 赋值
      var _this = this;
      // _this.tableData2 = [];
      if (_this.processState.sfzzjyjcf == "") {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        return;
      }
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
        zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
        ldxz: _this.searchArea.ldxz, // 小组,string类型
        gz: _this.searchArea.gz, // 工种,string类型
        pageNum: _this.offset,
        pageSize: _this.limit
      };
       _this.view = 2;
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0036, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (resp.data == null || resp.data == "" || resp.data == undefined || resp.data.length == 0) {
            _this.clickLaborScoreSum();
            return;
          }
          for (var i = 0; i < resp.data.length; i++) {
            if (resp.data[i].hj == null) {
              Artery.message.info({
                content: "劳动分（无劳动定额）没有完成，请完成后再查看",
                duration: 3
              });
              _this.view = _this.oldView;
              return;
            }
          }
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickLaborScoreSum();
        }
      });
    },
    changeSearch(flag) {
      var _this = this;
      _this.view = flag;
      if (flag == 1) {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        _this.clickLaborScore();
      } else if (flag == 2) {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        _this.clickNotLaborScore();
      } else if (flag == 3) {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        _this.clickLaborScoreSum();
      }
    },
    /**
     * 点击劳动分（有劳动定额）
     * @param {string} bh 编号
     */
    clickLaborScore(queryInfo1) {
      var _this = this;
      if (_this.processState.sfzzjyjcf == "") {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        return;
      }
      if (queryInfo1 == null) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId, // 监区，string类型
          zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
          zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
          ldxz: _this.searchArea.ldxz, // 小组,string类型
          gz: _this.searchArea.gz, // 工种,string类型
          pageNum: _this.offset,
          pageSize: _this.limit
        };
      } else {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId, // 监区，string类型
          zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
          zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
          ldxz: _this.searchArea.ldxz, // 小组,string类型
          gz: _this.searchArea.gz, // 工种,string类型
          xm: queryInfo1.sortList[0].column,
          sx: queryInfo1.sortList[0].dir,
          pageNum: _this.offset,
          pageSize: _this.limit
        };
      }
      _this.view = 1;
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0037, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          resp.data.forEach(function(item, index) {
            var hj = parseInt(item.hj);
            if (typeof hj != "number") {
              Artery.message.info("请输入数字！");
            } else {
              if (hj > 35 && hj <= 50) {
                item.jif = "" + 35;
                item.jiaf = "" + (hj - item.jif);
              } else if (hj <= 35 && hj >= 0) {
                item.jif = "" + hj;
                item.jiaf = "" + 0;
              } else if (hj < 0 || hj > 50) {
                item.hj = "";
                item.jif = "";
                item.jiaf = "";
                Artery.message.info("请输入合理数值！");
              }
            }
          });
          _this.tableData = resp.data;
           this.$nextTick(function(){
               _this.getheight()
            })
        } else {
        }
      });
    },
    /**
     * 点击劳动分（无劳动定额）
     * @param {string} bh 编号
     */
    clickNotLaborScore(queryInfo2) {
      var _this = this;
      if (_this.processState.sfzzjyjcf == "") {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        return;
      }
      if (queryInfo2 == null) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId, // 监区，string类型
          zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
          zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
          ldxz: _this.searchArea.ldxz, // 小组,string类型
          gz: _this.searchArea.gz, // 工种,string类型
          pageNum: _this.offset,
          pageSize: _this.limit
        };
      } else {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId, // 监区，string类型
          zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
          zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
          ldxz: _this.searchArea.ldxz, // 小组,string类型
          gz: _this.searchArea.gz, // 工种,string类型
          xm: queryInfo2.sortList[0].column,
          sx: queryInfo2.sortList[0].dir,
          pageNum: _this.offset,
          pageSize: _this.limit
        };
      }

      _this.view = 2;
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0036, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          resp.data.forEach(function(item, index) {
            var hj = parseInt(item.hj);
            if (typeof hj != "number") {
              Artery.message.info("请输入数字！");
            } else {
              if (hj > 35 && hj <= 50) {
                item.jif = "" + 35;
                item.jiaf = "" + (hj - item.jif);
              } else if (hj <= 35 && hj >= 0) {
                item.jif = "" + hj;
                item.jiaf = "" + 0;
              } else if (hj < 0 || hj > 50) {
                item.hj = "";
                item.jif = "";
                item.jiaf = "";
                Artery.message.info("请输入合理数值！");
              }
              // 表现汇总突出的，合计36-50
              // 表现汇总优秀的，合计31-35
              // 表现汇总良好的，合计21-30
              // 表现汇总一般的，合计5-20
              // 表现汇总缺勤的，合计0-4

              if (hj > 35 && hj <= 50) {
                item.bxhz = "1";
              }
              if (hj > 30 && hj <= 35) {
                item.bxhz = "2";
              }
              if (hj > 20 && hj <= 30) {
                item.bxhz = "3";
              }
              if (hj > 5 && hj <= 20) {
                item.bxhz = "4";
              }
              if (hj >= 0 && hj <= 4) {
                item.bxhz = "5";
              }
            }
          });
          _this.tableData2 = resp.data;
           this.$nextTick(function(){
               _this.getheight()
            })
        } else {
        }
      });
    },

    /**
     * 点击劳动分汇总
     * @param {string} bh 编号
     */
    clickLaborScoreSum(queryInfo3) {
      var _this = this;
      if (_this.processState.sfzzjyjcf == "") {
        _this.tableData = [];
        _this.tableData2 = [];
        _this.tableData3 = [];
        return;
      }
      if (!queryInfo3) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId, // 监区，string类型
          zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
          zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
          ldxz: _this.searchArea.ldxz, // 小组,string类型
          gz: _this.searchArea.gz, // 工种,string类型
          ywldde: _this.searchArea.ywldde, // 有无劳动定额,string类型
          pageNum: _this.offset,
          pageSize: _this.limit
        };
      } else {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId, // 监区，string类型
          zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
          zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
          ldxz: _this.searchArea.ldxz, // 小组,string类型
          gz: _this.searchArea.gz, // 工种,string类型
          ywldde: _this.searchArea.ywldde, // 有无劳动定额,string类型
          xm: queryInfo3.sortList[0].column,
          sx: queryInfo3.sortList[0].dir,
          pageNum: _this.offset,
          pageSize: _this.limit
        };
      }
      _this.view = 3;
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0035, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.tableData3 = resp.data;
           this.$nextTick(function(){
               _this.getheight()
            })
        }
      });
    },
    /**
     * 点击劳动分样表下载
     * @param {string} bh 编号
     */
    clickLaborScoreExport() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
        zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
        ldxz: _this.searchArea.ldxz, // 小组,string类型
        gz: _this.searchArea.gz // 工种,string类型
      };
      let url = _server.serverName + _this.apis.api0031 + "?khny=" + params.khny + "&corp=" + params.corp + "&dept=" +
        params.dept + "&zfxm=" + params.zfxm + "&zfbh=" + params.zfbh + "&ldxz=" + params.ldxz + "&gz=" + params.gz;
      window.location.href = url;
    },
    ...mapMutations({
      updateKhny: "UPDATE_KHNY",
      updateDept: "UPDATE_DEPT",
      updateCorp: "UPDATE_CORP",
      updateProcessState: "UPDATE_PROCESSSTATE",
      updateReject: "UPDATE_REJECT"
    })
  },
  watch: {
    tableData() {
      // this.$nextTick(function() {
      //   this.$refs.rjzTab0Scroll.update();
      // });
    },
    tableData2() {
      // this.$nextTick(function() {
      //   this.$refs.rjzTab0Scroll.update();
      // });
    },
    tableData3() {
      // this.$nextTick(function() {
      //   this.$refs.rjzTab0Scroll.update();
      // });
    },
    khny(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal && oldVal != "") {
        _this.searchArea.nowDate = _this.khny;
        if (_this.view == 1) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickLaborScore();
        } else if (_this.view == 2) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickNotLaborScore();
        } else if (_this.view == 3) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickLaborScoreSum();
        }
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.deptId = _this.deptObj.deptId;
        if (_this.view == 1) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickLaborScore();
        } else if (_this.view == 2) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickNotLaborScore();
        } else if (_this.view == 3) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
          _this.clickLaborScoreSum();
        }
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.corpId = _this.corpObj.corpId;
        if (_this.view == 1) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
        } else if (_this.view == 2) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
        } else if (_this.view == 3) {
          _this.tableData = [];
          _this.tableData2 = [];
          _this.tableData3 = [];
        }
      }
    }
  },
  computed: {
    ...mapGetters(["khny", "deptObj", "corpObj", "hasReject", "processState"]),
    ldfdrButton(){
      var _this = this;
       if (_this.right.ldgzfbj) {
         if (_this.view == 1) {
          if (_this.processState.sfwcyhz == "1") {
            if (_this.processState.pysfth == "1") {
              return true;
            } else {
              return false;
            }
          } else if (_this.processState.sfwcyhz == "2") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    fybButton() {
      var _this = this;
      if (_this.right.ldgzfck) {
        if (_this.view == 1) {
          if (_this.processState.sfwcyhz == "1") {
            if (_this.processState.pysfth == "1") {
              return true;
            } else {
              return false;
            }
          } else if (_this.processState.sfwcyhz == "2") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    ldButton() {
      var _this = this;
      if (_this.right.ldgzfbj) {
        if (_this.view == 1) {
          if (_this.processState.sfwcyhz == "1") {
            if (_this.processState.pysfth == "1") {
              return true;
            } else {
              return false;
            }
          } else if (_this.processState.sfwcyhz == "2") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    buttonShow() {
      var _this = this;
      if (_this.right.ldgzfbj) {
        if (_this.view == 3) {
          if (_this.processState.sfwcyhz == "1") {
            if (_this.processState.pysfth == "1") {
              return true;
            } else {
              return false;
            }
          } else if (_this.processState.sfwcyhz == "2") {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    ywlddeList() {
      // 取消基础分
      var _this = this;
      var list = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))[
        "30100001"
      ];
      for (var i = 0, len = list.length; i < len; i++) {
        _this.$set(list[i], "codeType", "Group");
      }
      return list;
    },
    tableTitle: function() {
      var _this = this;
      var newDate = "";
      if (_this.searchArea.nowDate == "") {
        newDate = new Date();
      } else {
        newDate = new Date(_this.searchArea.nowDate);
      }
      var year1 = new Date(newDate).getFullYear();
      var month1 =
        new Date(newDate).getMonth() < 10
          ? "0" + new Date(newDate).getMonth()
          : new Date(newDate).getMonth();
      var year =
        _this.searchArea.nowDate == ""
          ? year1
          : new Date(_this.searchArea.nowDate).getFullYear();
      var month =
        _this.searchArea.nowDate == ""
          ? month1
          : new Date(_this.searchArea.nowDate).getMonth() < 10
            ? "0" + (new Date(_this.searchArea.nowDate).getMonth() + 1)
            : new Date(_this.searchArea.nowDate).getMonth() + 1;
      var str = year + "年" + month + "月";
      if (_this.view == 1) {
        return str + "有劳动定额劳动分";
      } else if (_this.view == 2) {
        return str + "无劳动定额劳动分";
      } else if (_this.view == 3) {
        return str + "劳动改造分汇总";
      }
    }
  }
};
</script>
<style scoped>
.ldgzf.fd-gzf-search {
  padding-right: 0;
}
.ldgzf .fd-gzf-btn {
  top: 61px;
}
.fd-ldgzf-box .fd-gzf-inner {
  height: calc(100% - 322px);
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
.btn-links {
  margin-top: 20px;
}
.table-title {
  text-align: center;
  padding: 10px 20px;
}
.right-btns {
  text-align: right;
}
.aty-form-item {
  margin-bottom: 0px;
}
.search-area {
  /* margin-bottom: 10px; */
}
.fd-slide-container {
  width: 100%;
  height: 32px;
  margin-bottom: 15px;
  display: flex;
  display: -webkit-flex;
  margin-top: 15px;
}
.fd-slide-container .fd-slide-tip {
  height: 32px;
  background: url(../../assets/images/top_tip.png) no-repeat;
  background-size: 100% 100%;
  color: #fff;
  text-align: center;
  line-height: 28px;
  padding-left: 15px;
  margin-right: 30px;
  position: relative;
}
.fd-slide-container .fd-slide-tip:after {
  display: block;
  content: "";
  width: 22px;
  height: 32px;
  background: url(../../assets/images/top_tip_arrow.png) no-repeat;
  position: absolute;
  top: 0;
  right: -22px;
}
.fd-slide-container .fd-slide-bar {
  flex: 1;
  -webkit-flex: 1;
  height: 25px;
  position: relative;
  top: 3px;
  background: linear-gradient(to right, #edf2fd, #e8f5fe);
  background: -o-linear-gradient(to right, #edf2fd, #e8f5fe);
  background: -ms-linear-gradient(to right, #edf2fd, #e8f5fe);
  background: -moz-linear-gradient(to right, #edf2fd, #e8f5fe);
  background: -webkit-linear-gradient(to right, #edf2fd, #e8f5fe);
  border-radius: 0 20px 20px 0;
}
.fd-slide-container .fd-slide-bar:after {
  display: block;
  content: "";
  border-top: solid 25px #edf2fd;
  border-left: solid 19px transparent;
  position: absolute;
  top: 0;
  left: -19px;
}
</style>
