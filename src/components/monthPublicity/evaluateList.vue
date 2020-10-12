<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap evaluateList">
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="clickEvaluation"></confirmbox>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-ygs-box">
      <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
        <div class="fd-scroll-box">
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" name="scroll" :show="false"> -->
        <process :sftz="sftz"></process>
        <h2 class="table-title">确定考核名单</h2>
        <div class="search-area fd-gzf-search">
          <aty-form inline :label-width="120"  class="fd-gzf-form">
            <aty-form-item label="罪犯姓名" class="fd-gzf-item">
              <aty-input v-model="searchArea.zfxm" clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="罪犯编号" class="fd-gzf-item">
              <aty-input v-model="searchArea.zfbh" clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="小组" class="fd-gzf-item">
              <aty-input v-model="searchArea.szxz" clearable></aty-input>
            </aty-form-item>
            <aty-form-item class="fd-gzf-item fd-gzf-btn">
              <aty-button @click="changeSearch(view)" class="search_option_butn1" type="primary">
                <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
              </aty-button>
              <aty-button class="fd-save-next" v-if="qdhkmdbj&&processState.sfwcyhz!='1'||(processState.sfwcyhz=='1'&&
                processState.pysfth=='1')" type='primary' @click="clickSaveNext">
                保存并进入下一步
              </aty-button>
            </aty-form-item>
          </aty-form>
        </div>
        <aty-tabs class="listTab" type="card" @tabclick="tabClick">
          <aty-tabpane>
            <div slot="label">
              <span class="tabs_topt">考核名单({{kh_count}})</span>
            </div>
            <div></div>
            <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="khmdScroll" name="khmdScroll" :show="false"> -->
              <div class="tabs_main_box" v-if="view==0">
                <!-- table區域 start -->
                <aty-table :pageable-data="tableData" :exp-all="false" :exp-current-page="false" @sort-change="sortData"
                           @load-data="loadSortData">
                  <aty-table-column type="index" label="序号" :showOverflowTooltip="false">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="bh" label="编号"></aty-table-column>
                  <aty-table-column v-if="false" prop="zfxxbh" label="罪犯信息编号"></aty-table-column>
                  <aty-table-column v-if="false" prop="khny" label="考核年月">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="sfkh" label="是否考核">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="corp" label="所属监狱">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="dept" label="所属监区">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="sfqdkhmd" label="是否确定考核名单">
                  </aty-table-column>
                  <aty-table-column prop="zfxm" label="罪犯姓名">
                  </aty-table-column>
                  <aty-table-column prop="zfbh" label="罪犯编号">
                  </aty-table-column>
                  <aty-table-column prop="szxz" label="小组" sortable="custom">
                  </aty-table-column>
                  <aty-table-column prop="tsqkms" label="状态" :formatter="tsqkmsf" >
                  </aty-table-column>
                  <aty-table-column label="操作" :showOverflowTooltip="false" v-if="qdhkmdbj&&processState.sfwcyhz!='1'||(processState.sfwcyhz=='1'&&processState.pysfth=='1')">
                    <template slot-scope="scope">
                      <i>
                        <span @click="updateEvaluateListData(scope.row.bh,scope.row.sfkh)" class="table_operation">不考核</span>
                      </i>
                    </template>
                  </aty-table-column>
                </aty-table>
                <!-- table區域 end -->
                <!-- 分页 start -->
                <aty-row class="fd-category" v-show="false">
                  <aty-row>
                    <aty-pagination :total="total" :offset="offset" :limit="limit" :limit-opts="limitOpts"
                                    :show-total="true" :show-sizer="true" :show-elevator="true" ref="dbPage"></aty-pagination>
                  </aty-row>
                </aty-row>
                <!-- 分页 end -->
              </div>
            <!-- </aty-scroll> -->
          </aty-tabpane>
          <aty-tabpane>
            <div slot="label">
              <span class="tabs_topt">不考核名单({{bkh_count}})</span>
            </div>
            <div></div>
              <div class="tabs_main_box" v-if="view==1">
                <!-- table區域 start -->
                <aty-table :pageable-data="tableData2" :exp-all="false" :exp-current-page="false"  @sort-change="sortData"
                           @load-data="loadSortData">
                  <aty-table-column type="index" label="序号" :showOverflowTooltip="false">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="bh" label="编号"></aty-table-column>
                  <aty-table-column v-if="false" prop="zfxxbh" label="罪犯信息编号"></aty-table-column>
                  <aty-table-column v-if="false" prop="khny" label="考核年月">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="sfkh" label="是否考核">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="corp" label="所属监狱">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="dept" label="所属监区">
                  </aty-table-column>
                  <aty-table-column v-if="false" prop="sfqdkhmd" label="是否确定考核名单">
                  </aty-table-column>
                  <aty-table-column prop="zfxm" label="罪犯姓名">
                  </aty-table-column>
                  <aty-table-column prop="zfbh" label="罪犯编号">
                  </aty-table-column>
                  <aty-table-column prop="szxz" label="小组" sortable="custom">
                  </aty-table-column>
                  <aty-table-column prop="tsqkms" label="状态" :formatter="tsqkmsf">
                  </aty-table-column>
                  <aty-table-column label="操作" :showOverflowTooltip="false" v-if="qdhkmdbj&&processState.sfwcyhz!='1'||(processState.sfwcyhz=='1'&&processState.pysfth=='1')">
                    <template slot-scope="scope">
                      <i>
                        <span @click="updateEvaluateListData(scope.row.bh,scope.row.sfkh)" class="table_operation">考核</span>
                      </i>
                    </template>
                  </aty-table-column>
                </aty-table>
                <!-- table區域 end -->
                <!-- 分页 start -->
                <aty-row class="fd-category" v-show="false">
                  <aty-row>
                    <aty-pagination :total="total" :limit="limit" :limit-opts="limitOpts" :offset="offset"
                                    :show-total="true" :show-sizer="true" :show-elevator="true" ref="dbPage"></aty-pagination>
                  </aty-row>
                </aty-row>
                <!-- 分页 end -->
              </div>
            <!-- </aty-scroll> -->
          </aty-tabpane>
        </aty-tabs>
        </div>
      </happy-scroll>
      <!-- </aty-scroll> -->
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
      szxzSort: "asc",
      sftz:true,
      view:0,
      isLoading: false,
      showConfirm: false,
      confirmtext: "",
      currentTab: 0,
      kh_count: 0,
      bkh_count: 0,
      url:_zfxxDetail.url,
      searchArea: {
        nowDate: null,
        corpId: "",
        deptId: "",
        zfxm: "",
        zfbh: "",
        szxz: ""
      },
      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "确定考核名单",
          href: "/monthPublicity/evaluateList"
        }
      ],
      tsqkmsSelectDataShow: {
        "1": "正常",
        "2": "未完成入监教育",
        "3": "立案侦查",
        "4": "隔离审查",
        "5": "解回再审",
        "6": "社会医院住院",
        "7": "暂予监外执行",
        "8": "假释"
      },
      tableData: [],
      tableData2: [],
      tsqkms: "",
      total: 10,
      limit: 5,
      offset: 1,
      limitOpts: [5, 10, 15, 20],
      db_count: 30,
      qdhkmdbj: false
    };
  },
  computed: {
    ...mapGetters(["khny", "deptObj", "corpObj", "processState"])
  },
  components: {
    confirmbox,
    loading,
    process
  },
  methods: {
    ...mapMutations({
      updateKhny: "UPDATE_KHNY",
      updateDept: "UPDATE_DEPT",
      updateCorp: "UPDATE_CORP",
      updateProcessState: "UPDATE_PROCESSSTATE",
      updateReject: "UPDATE_REJECT"
    }),
    /**
     * 排序
     */
    loadSortData(queryInfo) {
      if(!queryInfo.hasOwnProperty("sortList") || queryInfo.sortList == null || queryInfo.sortList.length == 0) {
        return;
      }
      var _this = this;
      for(var i=0;i < queryInfo.sortList.length;i++) {
        if(queryInfo.sortList[i].column == "szxz") {
          _this.szxzSort = queryInfo.sortList[i].dir;
        }
      }
      var item = queryInfo.sortList[0];
      var flag = _this.currentTab + 1;
      var sort = item.dir;
      _this.getKhmdList(flag,sort);
    },
    /**
     * 小组 排序
     */
    sortData(object) {
    },
    /**
     * 查询
     */
    changeSearch(view) {
      var _this = this;
      _this.loadEvaluationData(view);
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.qdhkmdbj = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.qdkhmd.bj",
        rightList
      );
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
      _this.queryCount([1, 2]);
      _this.loadEvaluateListData(0);
    },
    /**
     * 考核名单列表接口
     * @description 考核名单列表接口
     * @param {string} tab tab序号
     */
    loadEvaluateListData(tab) {
      var _this = this;
      var flag = tab + 1;
      _this.currentTab = tab;
      var sort = _this.szxzSort;
      _this.getKhmdList(flag,sort);
    },
    getKhmdList(flag,sort) {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate,
        corp: _this.searchArea.corpId,
        dept: _this.searchArea.deptId, // 登陆人所在监区id。String类型 必须
        zfbh: _this.searchArea.zfbh,
        zfxm: _this.searchArea.zfxm,
        szxz: _this.searchArea.szxz,
        sfkh: flag,
        sort:sort
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0025, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          var backData = resp.data;
          if (flag == 1) {
            _this.tableData = backData;
          } else {
            _this.tableData2 = backData;
          }
        }
      });
    },
    /**
     * 更新考核名单接口
     * @description 更新考核名单接口
     * @param {string} bh 编号
     */
    updateEvaluateListData(bh, sfkh) {
      var _this = this;
      sfkh = sfkh == "1" ? "2" : "1";
      var before = sfkh == "1" ? "2" : "1";
      var params = {
        sfkh: sfkh, // 是否考核。Boolean类型
        bh: bh, // 确定考核名单编号。String类型
        khny: _this.searchArea.nowDate//考核年月
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0024, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          var backData = {
            zfxxBh: resp.data.zfxxBh, // 更新的罪犯信息编号。String类型 必须
            sfgxcg: resp.data.sfgxcg // 是否更新成功。Boolean类型 必须
          };
          _this.queryCount([1, 2]); // 更新tab页签数值
          _this.loadEvaluateListData(before - 1); // 请求当前页签列表
        } else {
        }
      });
    },
    /**
     * 根据是否考核查询数量
     * @param cxsfkh 查询是否考核  1：考核 2：不考核
     */
    queryCount(cxsfkh) {
      let _this = this;
      var params = {
        corp: _this.searchArea.corpId, // 监狱,String类型 必须
        dept: _this.searchArea.deptId, // 监区,String类型
        khny: _this.searchArea.nowDate, // 考核月份,String类型
        sfkhs: cxsfkh
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0026, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.kh_count = resp.data[0];
          _this.bkh_count = resp.data[1];
        }
      });
    },
    /**
     * 点击切换页签
     * @param {string} bh 编号
     */
    tabClick(param) {
      var _this = this;
      _this.searchArea.zfbh = "";
      _this.searchArea.zfxm = "";
      _this.searchArea.szxz = "";
      _this.view = param;
      _this.loadEvaluationData(param);
    },
    /**
     * 加载考核名单
     * @param {number} param tab编号
     */
    loadEvaluationData(param) {
      var _this = this;
      _this.loadEvaluateListData(param);
    },
    /**
     * 点击保存并进入下一步
     * @param bh
     */
    clickSaveNext(bh) {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate,
        corp: _this.searchArea.corpId, // 下一步审批人 非必须
        dept: _this.searchArea.deptId
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0023, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.$router.push({ path: "/monthPublicity/educationScore" });
        } else {
        }
      });
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0044, params).then(resp => {
        _this.isLoading = false;
      });
      //劳动分
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0040, params).then(resp => {
        _this.isLoading = false;
      });
    },
    //状态转义
    tsqkmsf: function(row, column) {
      var key = "30111018-" + row;
      var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      return row != undefined ? (value != undefined ? value.name : "") : "";
    }
  },
  watch: {
    khny(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal && oldVal != "") {
        _this.searchArea.nowDate = _this.khny;
        _this.queryCount([1, 2]);
        _this.loadEvaluateListData(_this.currentTab);
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal && oldVal != "") {
        _this.searchArea.corpId = _this.corpObj.corpId;
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal && oldVal != "") {
        _this.searchArea.deptId = _this.deptObj.deptId;
        _this.queryCount([1, 2]);
        _this.loadEvaluateListData(_this.currentTab);
      }
    }
  },
  created() {
    this.sftz = this.$route.query.sftz;
  },
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.initData();
    }, 1000);
  }
};
</script>
<style scoped>
.fd-ygs-box .aty-scroll {
  height: 100%;
}
.fd-map-breadcrumb {
  overflow: hidden;
}
.fd-map-breadcrumb .fd-left-part {
  float: left;
  background: url(../../assets/images/left-part-bg.png) no-repeat;
  width: 288px;
  height: 134px;
  padding-top: 20px;
}
.fd-map-breadcrumb .fd-right-part {
  float: left;
  height: 134px;
  width: 1360px;
  position: relative;
  margin-left: 50px;
}
.fd-map-breadcrumb .fd-right-part .step {
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 30px;
  background-color: #b4c1d5;
  padding: 0 10px;
  margin-right: 10px;
  min-width: 130px;
}
.fd-map-breadcrumb .fd-right-part > .step {
  position: absolute;
  top: 50%;
  margin-top: -15px;
}
.fd-map-breadcrumb .fd-right-part .step1 {
  left: 0px;
}
.fd-map-breadcrumb .fd-right-part .step2 {
  left: 180px;
  top: 20%;
  margin-top: -15px;
}
.fd-map-breadcrumb .fd-right-part .step3 {
  left: 180px;
  top: 80%;
  margin-top: -15px;
}
.fd-map-breadcrumb .fd-right-part .step4 {
  left: 360px;
}
.fd-map-breadcrumb .fd-right-part .step5 {
  left: 540px;
}
.fd-map-breadcrumb .fd-right-part .step6 {
  left: 720px;
}
.fd-map-breadcrumb .fd-right-part .step7 {
  left: 900px;
}
.fd-map-breadcrumb .fd-right-part .step.move {
  background-color: #09c9ff;
}
.arrow {
  position: absolute;
  width: 38px;
}
.a1 {
  background: url(../../assets/images/arrow10.png) no-repeat;
  left: 136px;
  height: 86px;
  top: 50%;
  margin-top: -43px;
}
.a1.up {
  background: url(../../assets/images/arrow11.png) no-repeat;
}
.a1.down {
  background: url(../../assets/images/arrow12.png) no-repeat;
}
.a2 {
  background: url(../../assets/images/arrow20.png) no-repeat;
  left: 315px;
  height: 86px;
  top: 50%;
  margin-top: -43px;
}
.a2.up {
  background: url(../../assets/images/arrow21.png) no-repeat;
}
.a2.down {
  background: url(../../assets/images/arrow22.png) no-repeat;
}
.a3 {
  background: url(../../assets/images/arrow30.png) no-repeat;
  left: 497px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
}
.a3.active {
  background: url(../../assets/images/arrow31.png) no-repeat;
}
.a4 {
  background: url(../../assets/images/arrow30.png) no-repeat;
  left: 680px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
}
.a4.active {
  background: url(../../assets/images/arrow31.png) no-repeat;
}
.a5 {
  background: url(../../assets/images/arrow30.png) no-repeat;
  left: 857px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
}
.a5.active {
  background: url(../../assets/images/arrow31.png) no-repeat;
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
.aty-tabs-nav .aty-tabs-tab-active .tabs_icon1 {
  background: url(../../assets/images/w-png7.png) no-repeat;
}

.aty-tabs-nav .aty-tabs-tab-active .tabs_icon2 {
  background: url(../../assets/images/w-png9.png) no-repeat;
}
.dr_date_pick {
  margin: 10px auto;
  display: block;
  width: 215px;
}
.nomal_tree {
  margin: 10px auto;
  display: block;
  width: 215px;
}
.listTab {
  margin-top: 20px;
}
.fd-save-next {
  margin-left: 10px;
}
.main_box {
  position: relative;
}
.fd-home-wrap.evaluateList .aty-tabs {
  height: calc(100% - 185px);
}
.table-title {
  text-align: center;
  padding: 10px 20px;
}
  .table_operation {
    cursor: pointer;
    color: #0B75E8;
  }
</style>
