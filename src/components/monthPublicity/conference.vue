<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <!-- tab1 操作 审批 弹窗 -->
    <aty-modal :mask-closable="false" class="rl_pop_box" ref="modalWidiow5" width="650px" closable="" title="审批">
      <div class="pop_main_box fd-sp-modal">
        <aty-row class="fd-sp-row">
          <aty-col span='4' class="fd-sp-col1">审批意见</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-radio-group :data-list="tab1PopSpyjList" v-model="spData.spyj"></aty-radio-group>
          </aty-col>
        </aty-row>
        <aty-row class="fd-sp-row">
          <aty-col span='4' class="fd-sp-col1">备注</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-textarea v-model="spData.spbz" placeholder="请输入" :autosize="{minRows:2,maxRows:20}"  :maxlength="100"></aty-textarea>
          </aty-col>
        </aty-row>
        <aty-row class="fd-sp-row" v-if="spData.spyj!='2'&&!overXybspr">
          <aty-col span='4' class="fd-sp-col1">下一步审批人</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-select transfer class="npl_seleted" v-model="spData.spr" :data="xybsprList" clearable></aty-select>
          </aty-col>
        </aty-row>
        <div class="drw_save_butn">
          <aty-button class="search_option_butn1" v-if="!yhzsp" type="primary" @click="plSubmit">
            <span>确定</span>
          </aty-button>
          <aty-button class="search_option_butn1" v-if="yhzsp" type="primary" @click="dgSubmit">
            <span>确定</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <!-- 批量退回 弹窗 -->
    <aty-modal :mask-closable="false" class="rl_pop_box" ref="modalWidiow7" width="650px" closable="" title="批量退回">
      <div class="pop_title"></div>
      <div class="pop_main_box fd-sp-modal">
        <aty-row class="fd-sp-row">
          <aty-col span='4' class="fd-sp-col1">审批意见</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-text>退回</aty-text>
          </aty-col>
        </aty-row>
        <aty-row class="fd-sp-row">
          <aty-col span='4' class="fd-sp-col1">备注</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-textarea v-model="spData.spbz" placeholder="请输入" :autosize="{minRows:2,maxRows:20}" :maxlength="100"></aty-textarea>
          </aty-col>
        </aty-row>
        <div class="drw_save_butn">
          <aty-button class="search_option_butn1" type="primary" @click="plSubmit2">
            <span>确定</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-ygs-box">
      <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <div class="fd-scroll-box">
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" name="scroll" :show="false"> -->
          <process ref="process" :sftz="sftz"></process>
          <div class="btn-links">
            <aty-button class="dr_edit_b1" type="primary" @click="clickBatchConference()" v-if="level == 1&&right.plpy">
              <span>批量评议</span>
            </aty-button>
          </div>
          <keep-alive>
            <div v-show="level == 1" class="tabs_main_box">
              <!-- table區域 start -->
                <aty-table @selection-change="selectionChange1" :pageable-data="tableData" :exp-all="false" :exp-current-page="false">
                  <aty-table-column :selectable="selectableCheck1" type="selection" width="45"></aty-table-column>
                  <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
                  <aty-table-column prop="corpName" label="监狱"></aty-table-column>
                  <aty-table-column prop="deptName" label="监区"></aty-table-column>
                  <aty-table-column prop="khrs" label="考核人数"></aty-table-column>
                  <aty-table-column prop="bkhrs" label="不考核人数"></aty-table-column>
                  <aty-table-column prop="pyzt" :formatter="spztf" label="评议状态"></aty-table-column>
                  <aty-table-column prop="pyjd" label="评议阶段"></aty-table-column>
                  <aty-table-column label="操作" :showOverflowTooltip="false">
                    <template slot-scope="scope">
                      <i>
                        <img v-if="right.pysp&&(scope.row.sfwcypbsp == null||scope.row.sfwcypbsp=='')"
                             @click="pyYpb(scope.row)" title="评议月评表" class="table_butn"
                             src="../../assets/images/icon-ypb2.png">
                        <img v-if="right.pysp&&scope.row.pyzt == '100'" @click="clickConference(scope)"
                             title="评议月汇总表" class="table_butn" src="../../assets/images/icon-yhz2.png">
                        <img v-if="scope.row.sfwcypbsp == '1'" @click="ckYpb(scope)" title="查看月评表"
                             class="table_butn" src="../../assets/images/icon-ypb1.png">
                        <img @click="ckYhzb(scope)" title="查看月汇总表" class="table_butn"
                             src="../../assets/images/icon-yhz1.png">
                      </i>
                    </template>
                  </aty-table-column>
                </aty-table>
                <!-- 分页 start -->
                <aty-row class="fd-category" v-show="false">
                  <aty-row>
                    <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true" :show-elevator="true" @change="changePage" :limit-opts="limitOpts" ref="dbPage" @page-size-change="pageSizeChange"></aty-pagination>
                  </aty-row>
                </aty-row>
            </div>
          </keep-alive>
          <div v-if="level == 2" class="level2-box">
            <aty-button class="dr_edit_b1" type="primary" @click="clickBack()">
              <span>返回</span>
            </aty-button>
              <h2 class="table-title">{{tableTitle}}</h2>
              <div class="fd-gzf-search">
                <aty-form inline :label-width="120" class="fd-gzf-form">
                  <aty-form-item label="罪犯编号" class="fd-gzf-item">
                    <aty-input v-model="zfbh" clearable></aty-input>
                  </aty-form-item>
                  <aty-form-item label="罪犯姓名" class="fd-gzf-item">
                    <aty-input v-model="zfxm" clearable></aty-input>
                  </aty-form-item>
                  <aty-form-item label="小组" class="fd-gzf-item">
                    <aty-input v-model="szxz" clearable></aty-input>
                  </aty-form-item>
                  <aty-form-item label="评议状态" class="fd-gzf-item">
                    <aty-select transfer  v-model="zt" :data="getSpzt" clearable></aty-select>
                  </aty-form-item>
                  <aty-form-item class="fd-gzf-btn">
                    <aty-button @click="clickSearch" class="search_option_butn1" type="primary">
                      <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
                    </aty-button>
                  </aty-form-item>
                </aty-form>
              </div>
              <div class="btn-links mgbt10">
                <aty-button type="primary" v-if="right.pysp&&jb == 1 && ypylc.pyzt != '102'" @click="clickAllPass" class="dr_edit_b1">全部通过</aty-button>
                <aty-button type="primary" v-if="right.pysp&&jb == 1" @click="clickBatchRejection" class="dr_edit_b1">批量退回</aty-button>
              </div>
              <aty-table @selection-change="selectionChange2" :pageable-data="tableData2" :exp-all="false"
                         :exp-current-page="false" style="width:100%;" class="fd-py-table">
                  <aty-table-column v-if="jb == 1" :selectable="selectableCheck2"  type="selection"  class-name="pyw0"></aty-table-column>
                  <aty-table-column type="index" label="序号"  :showOverflowTooltip="false" class-name="pyw0"></aty-table-column>
                  <aty-table-column prop="bh" v-if="false" label="编号"></aty-table-column>
                  <aty-table-column prop="szxz" label="小组" class-name="pyw1">
                  </aty-table-column>
                  <aty-table-column prop="zfbh" label="罪犯编号"  class-name="pyw2">
                  </aty-table-column>
                  <aty-table-column prop="zfxm" label="罪犯姓名"  class-name="pyw3">
                    <!--<template slot-scope="props" >-->
                      <!--<a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
                    <!--</template>-->
                  </aty-table-column>
                  <aty-table-column prop="byhjdf" label="本月合计">
                    <aty-table-column  label="基础分">
                      <aty-table-column prop="byjcfJygz" label="教育改造"  class-name="pyw4"></aty-table-column>
                      <aty-table-column prop="byjcfLdgz" label="劳动改造"  class-name="pyw4"></aty-table-column>
                    </aty-table-column>
                    <aty-table-column  label="加分">
                      <aty-table-column prop="byjfJygz" label="教育改造"  class-name="pyw4"></aty-table-column>
                      <aty-table-column prop="byjfLdgz" label="劳动改造"  class-name="pyw4"></aty-table-column>
                    </aty-table-column>
                    <aty-table-column  label="扣分">
                      <aty-table-column prop="bykfJygz" label="教育改造"  class-name="pyw4"></aty-table-column>
                      <aty-table-column prop="bykfLdgz" label="劳动改造"  class-name="pyw4"></aty-table-column>
                      <aty-table-column prop="ycxzgkf" label="一次性最高扣分"  class-name="pyw5"></aty-table-column>
                    </aty-table-column>
                    <aty-table-column prop="byzxjf" label="专项加分"  class-name="pyw4"></aty-table-column>
                    <aty-table-column label="合计实得分">
                      <aty-table-column prop="byhjdfJygz" label="教育改造"  class-name="pyw4"></aty-table-column>
                      <aty-table-column prop="byhjdfLdgz" label="劳动改造"  class-name="pyw4"></aty-table-column>
                    </aty-table-column>
                  </aty-table-column>
                  <aty-table-column  label="本考核期得分">
                    <aty-table-column prop="bkhqdfJygz" label="教育改造"  class-name="pyw4"></aty-table-column>
                    <aty-table-column prop="bkhqdfLdgz" label="劳动改造"  class-name="pyw4"></aty-table-column>
                    <aty-table-column prop="bkhqdfLj" label="累计"  class-name="pyw4"></aty-table-column>
                  </aty-table-column>
                  <aty-table-column prop="sqyf" label="上期余分" class-name="pyw4"></aty-table-column>
                  <aty-table-column prop="zt" label="评议状态"  :formatter="spztf" class-name="pyw6"></aty-table-column>
                  <aty-table-column  label="操作" class-name="pyw7">
                    <template slot-scope="scope">
                      <i>
                        <img @click="goView(scope.row)" title="查看月评表" class="table_butn" src="../../assets/images/w-png20.png">
                      </i>
                    </template>
                  </aty-table-column>
              </aty-table>
          </div>
        </div>
      </happy-scroll>
    </div>
  </div>
</template>
<script>
import confirmbox from "../confirmBox/confirmBox.vue";
import loading from "../base/loading";
import process from "../monthPublicity/components/process.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: function() {
    return {
      sftz:true,
      isLoading: false,
      showConfirm: false,
      tableData: [],
      tableData2: [],
      zfxm: "",
      zfbh: "",
      szxz: "",
      zt: "",
      corp: "",
      dept: "",
      total: 10,
      limit: 5,
      offset: 1,
      limitOpts: [5, 10, 15, 20],
      level: 1,
      jb: 1,
      popData: [],
      loadData: [],
      tab1PopSpyjList: [
        {
          code: "1",
          name: "通过"
        },
        {
          code: "2",
          name: "退回"
        }
      ],
      tab1PopSpyj: "",
      spr: "",
      tab1PopBz: "",
      xybsprList: [],
      overXybspr:false,
      url:_zfxxDetail.url,
      dbSelection1: [],
      dbSelection2: [],
      spData: {
        bh: "",
        zfxm: "",
        spyj: "",
        spbz: "",
        spr: "",
        taskid: ""
      },
      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "评议",
          href: "/monthPublicity/conference"
        }
      ],
      store: [],
      searchArea: {
        nowDate: null,
        corpId: "",
        deptId: ""
      },
      db_count: 30,
      right: {
        plpy: false,
        pysp: false
      },
      yhzsp:false,
      ypylc: {},
      yhzparams:[]
    };
  },
  inject: ["reload"],
  computed: {
    ...mapGetters([
      "khny",
      "deptObj",
      "corpObj",
      "hasReject",
      "processState",
      "clickOver"
    ]),
    getSpzt() {
      var _this = this;
      var list = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))[
        "30111014"
      ];
      var params = [];
      params.push(list[2]);
      params.push(list[4]);
      params.push(list[5]);
      return params;
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
        _this.searchArea.nowDate == "" ? month1 : new Date(_this.searchArea.nowDate).getMonth() < 9
            ? "0" + (new Date(_this.searchArea.nowDate).getMonth() + 1)
            : new Date(_this.searchArea.nowDate).getMonth() + 1;
      var str = year + "年" + month + "月";
      return str + "罪犯月考核汇总表";
    }
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
      updateReject: "UPDATE_REJECT",
      updateOver: "UPDATE_OVER"
    }),
    // 查看按钮
    goView(row) {
      let _this = this;
      var ztbh = row.zfbh.replace(/(\s*$)/g, "");
      var ywlb = "ygs";
      var ywbh = row.bh;
      var zfxxBh = row.zfxxBh;
      var wsmc = "";
      _this.isLoading = true
      _this.postRequest("/api/v1/ygs/buildYpyWs/"+zfxxBh+"/"+_this.searchArea.nowDate).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          wsmc = resp.data;
          window.open(_writ.base_path+"/view/" + ztbh + "/" + ywlb + "/" + ywbh + "/" + wsmc);
        } else {
          Artery.message.error({
            content: resp.data,
            duration:3
          });
        }
      });
    },
    ckYhzb(scope) {
      let _this = this;
      var ztbh = scope.row.corp;
      var ywlb = "ygs";
      var ywbh = scope.row.bh;
      var wsmc = " ";
      var params = {
        corp: scope.row.corp, // 监狱，string类型，必须
        dept: scope.row.dept // 监区，string类型
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0068, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          wsmc = "月汇总_" + resp.data.corp + "_" + resp.data.dept;
          window.open(_writ.base_path+"/view/" + ztbh + "/" + ywlb + "/" + ywbh + "/" + wsmc);
        }
      });
    },
    /**
     * @name 可选项设置
     * @param {any} item
     * @param {any} index
     * @description
     */
    selectableCheck1(item, index) {
      if (item.selectable == undefined) {
        item.selectable = true;
      }
      if (item.selectable) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @name 可选项设置
     * @param {any} item
     * @param {any} index
     * @description
     */
    selectableCheck2(item, index) {
      if (item.selectable == undefined) {
        item.selectable = true;
      }
      if (item.selectable) {
        return true;
      } else {
        return false;
      }
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.right.plpy = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.py.plpy",
        rightList
      );
      _this.right.pysp = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.py.pysp",
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
      _this.queryYpyBoolen();
      _this.queryYpy();
      _this.updateOver(false);
    },
    //审批状态转义
    spztf: function(row, column) {
      var key = _sigleCode.rjzSpzt + row;
      var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      return row != undefined ? (value != undefined ? value.name : "") : "";
    },
    queryYpyBoolen() {
      var _this = this;
      var usrInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if (usrInfo.deptType > 2) {
        var dept = _this.deptObj.deptId;
      }
      var params = {
        khny: _this.khny, // 考核年月，date类型，必须
        corp: _this.corpObj.corpId, // 监狱，string类型，必须
        dept: dept
      };
      _this.isLoading = true;
      _this.getRequest(_this.apis.api0124, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.isPy = resp.data.Boolean;
          if (!_this.isPy) {
            var _this = this;
            _this.level = 1;
            _this.zfbh = "";
            _this.zfxm = "";
            _this.szxz = "";
            _this.zt = "";
          }
        }
      });
    },
    queryYpy() {
      var _this = this;
      var usrInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if(_this.deptObj.deptId == ""){
        _this.deptObj.deptId = null;
      }
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: usrInfo.corpId, // 监狱，string类型，必须
        dept: _this.deptObj.deptId
      };
      _this.isLoading = true;
      _this.getRequest(_this.apis.api0121, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.tableData = resp.data.ArrayList;
          if (resp.data.ArrayList && _this.tableData.length > 0) {
            for (var i = 0; i < _this.tableData.length; i++) {
              if (_this.tableData[i].pyzt == "102") {
                _this.$set(_this.tableData[i], "selectable", false);
              }
            }
          }
        }
      });
    },
    pyYpb(row) {
      var _this = this;
      _this.level = 2;
      _this.jb = 1;
      _this.ypylc = row;
      _this.corp = row.corp;
      _this.dept = row.dept;
      var params = {
        corp: row.corp,
        dept: row.dept,
        khny: _this.searchArea.nowDate,
        sffy: "0"
      };
      _this.dbSelection = [],
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0061, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          var tableData2 = resp.data;
          _this.chooseDisable(tableData2);
          _this.tableData2 = tableData2;
        }
      });
    },
    /**
     * @description 设置是否可以选择
     */
    chooseDisable(tableData2) {
      for (var i = 0, len = tableData2.length; i < len; i++) {
        if (tableData2[i].zt == "102") {
          this.$set(tableData2[i], "selectable", false);
          this.ypylc.pyzt = "102";
        }
      }
    },
    ckYpb(scope) {
      var _this = this;
      _this.level = 2;
      _this.jb = 2;
      _this.ypylc = scope.row;
      _this.corp = scope.row.corp;
      _this.dept = scope.row.dept;
      var params = {
        corp: scope.row.corp,
        dept: scope.row.dept,
        khny: _this.searchArea.nowDate,
        sffy: "0"
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0061, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.tableData2 = resp.data;
        }
      });
    },
    /**
     * 点击表格1change事件
     * @param {string} bh 编号
     */
    selectionChange1(selection) {
      this.dbSelection1 = selection;
    },
    /**
     * 点击表格2change事件
     * @param {string} bh 编号
     */
    selectionChange2(selection) {
      this.dbSelection2 = selection;
    },
    /**
     * 点击表格换页操作
     * @param {string} bh 编号
     */
    changePage() {
    },
    /**
     * 点击表格跳页操作
     * @param {string} bh 编号
     */
    pageSizeChange() {
    },
    emptySpModal() {
      this.spData.spyj = "";
      this.spData.spbz = "";
      this.spData.spr = "";
    },
    //月汇总表审批
    dgSubmit() {
      var _this = this;
      //批量审批提交接口
      var spList = [];
      if (_this.spData.spyj == "") {
        Artery.message.info({
          content:"请选择审批意见",
          duration:3
        });
        return;
      }
      if (_this.spData.spbz.length > 200) {
        Artery.message.info({
          content:"请输入200字符以内",
          duration:3
        });
        return;
      }
      if (!_this.overXybspr) {
        if (_this.spData.spyj == "1" && _this.spData.spr == "") {
          Artery.message.info({
            content:"下一步审批人不能为空",
            duration:3
          });
          return;
        }
      }
      for (var i = 0; i < _this.yhzparams.length; i++) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.yhzparams[i].corp, // 监狱，string类型，必须
          dept: _this.yhzparams[i].dept,
          bh: _this.yhzparams[i].bh,
          taskId: _this.yhzparams[i].taskid,
          spyj: _this.spData.spyj,
          spr: _this.spData.spr,
          bz: _this.spData.spbz
        };
        spList.push(params);
      }
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0122, spList).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.$refs.modalWidiow5.close();
          Artery.message.success("审批成功！");
          _this.spData.spbz == "";
          _this.getLc();
          _this.queryYpy();
        }
      });
    },
    //批量评议提交
    plSubmit() {
      var _this = this;
      //批量审批提交接口
      var spList = [];

      if (_this.spData.spyj == "") {
        Artery.message.info({
           content:"请选择审批意见",
           duration:3
        });
        return;
      }
      if (_this.spData.spbz.length > 200) {
        Artery.message.info({
            content:"请输入200字符以内",
            duration:3
        });
        return;
      }
      if (!_this.overXybspr) {
        if (_this.spData.spyj == "1" && _this.spData.spr == "") {
          Artery.message.info({
            content:"下一步审批人不能为空",
            duration:3
          });
          return;
        }
      }
      for (var i = 0; i < _this.dbSelection1.length; i++) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.dbSelection1[i].corp, // 监狱，string类型，必须
          dept: _this.dbSelection1[i].dept,
          bh: _this.dbSelection1[i].bh,
          taskId: _this.dbSelection1[i].taskid,
          spyj: _this.spData.spyj,
          spr: _this.spData.spr,
          bz: _this.spData.spbz
        };
        spList.push(params);
      }
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0122, spList).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.$refs.modalWidiow5.close();
          Artery.message.success("审批成功！");
          _this.spData.spbz == "";
          _this.getLc();
          _this.queryYpy();
        }
      });
    },
    getLc() {
      var _this = this;
      var params = {
        corp: _this.corpObj.corpId, // 所属监狱id。String类型 必须
        dept: _this.deptObj.deptId, // 所属监区id。String类型 必须
        khny: _this.khny // 月公示年月。String类型 必须
      };

      _this.isLoading = true;
      _this.postRequest(_this.apis.api0011, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (resp.data) {
            _this.updateProcessState(resp.data); // 是否完成月初审。
            _this.reload();
          }
        }
      });
    },
    //批量评议提交
    plSubmit2() {
      var _this = this;
      if (_this.dbSelection2.length == 0) {
        Artery.message.info({
           content:"请选择需要批量退回的数据",
           duration:3
        });
        return;
      }
      var spList = [];
      for (var i = 0; i < _this.dbSelection2.length; i++) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          C_CreateCorpID: _this.dbSelection2[i].c_CreateCorpID, // 监狱，string类型，必须
          C_CreateDeptID: _this.dbSelection2[i].c_CreateDeptID,
          bh: _this.dbSelection2[i].bh,
          ypylcbh: _this.ypylc.bh,
          taskId: _this.ypylc.taskid,
          spyj: "2",
          spr: _this.spData.spr,
          bz: _this.spData.spbz,
          zt: "102"
        };
        spList.push(params);
      }
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0123, spList).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          Artery.message.info("退回成功");
          _this.spData.spbz = "";
          _this.$refs.modalWidiow7.close();
          _this.clickSearch();
          _this.processState.pysfth = "1";
          var thParams = {
            C_CreateCorpID: _this.corpObj.corpId, // 所属监狱id。String类型 必须
            C_CreateDeptID: _this.deptObj.deptId, // 所属监区id。String类型 必须
            khny: _this.khny // 月公示年月。String类型 必须
          };
          var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
          if(_this.deptObj.deptId == null||_this.deptObj.deptId==''){
            thParams.C_CreateDeptID = curUserInfo.deptId;
          }
          _this.postRequest(_this.apis.api0012, thParams).then(resp => {
            _this.isLoading = false;
            if (resp && resp.status == 200) {
              if (resp.data.length > 0) {
                //是否展示退回按钮
                _this.processState.sfzsthan = "1";
              } else {
                _this.processState.sfzsthan = "2";
              }
              _this.updateProcessState(_this.processState);
            }
          });
        }
      });
    },
    /**
     * 点击批量评议
     * @param {string} bh 编号
     */
    clickBatchConference() {
      var _this = this;
      if (_this.dbSelection1.length==0) {
        Artery.message.info({
            content:"请选择需要批量审批的数据",
            duration:3
        });
        return;
      }
      var list = _this.dbSelection1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].pyzt != "100") {
          Artery.message.info({
             content:"不是待审批状态无法批量审批！",
             duration:3
          });
          return;
        }
      }
      var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var taskParams = {
        curTaskId: _this.dbSelection1[0].taskid,
        spAuthority: "jy.imp.jfkh.splc.ygssp.",
        corpId: userInfo.corpId
      };
      _this.isLoading = true;
      _this.getRequest("/api/v1/system/isOverSp/"+_this.dbSelection1[0].taskid).then(resp => {
        _this.xybsprList = [];
        if(resp.data){
          _this.overXybspr = resp.data;
          this.isLoading = false;
        }else{
          _this.getRequest(_this.apis.com0008, taskParams).then(resp => {
            _this.isLoading = false;
            if (resp && resp.status == 200) {
              _this.xybsprList = resp.data;
            }
          });
        }
      });
      //清空审批弹窗
      this.spData = {
        spyj: "",
        spbz: "",
        spr: ""
      };
      this.$refs.modalWidiow5.open();
    },
    /**
     * 点击评议
     * @param {string} bh 编号
     */
    clickConference(item) {
      var _this = this;
      if (item.row.sfwcypbsp == null || item.row.sfwcypbsp == undefined || item.row.sfwcypbsp == "") {
        Artery.message.info({
           content:"未完成月评表审批，不能进行月汇总表审批！",
           duration:3
        });
        return;
      }
      _this.yhzparams = [];
      _this.yhzparams.push(item.row);
      _this.yhzsp = true;
      var list = [];
      list.push(item.row)
      for (var i = 0; i < list.length; i++) {
        if (list[i].pyzt != "100") {
          Artery.message.info({
             content:"不是待审批状态无法批量审批！",
             duration:3
          });
          return;
        }
      }
      var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var taskParams = {
        curTaskId: item.row.taskid,
        spAuthority: "jy.imp.jfkh.splc.ygssp.",
        corpId: userInfo.corpId
      };
      _this.isLoading = true;
      _this.getRequest("/api/v1/system/isOverSp/"+item.row.taskid).then(resp => {
        _this.xybsprList = [];
        if (resp.data) {
          _this.overXybspr = resp.data;
          this.isLoading = false;
        } else {
          _this.getRequest(_this.apis.com0008, taskParams).then(resp => {
            _this.isLoading = false;
            if (resp && resp.status == 200) {
              _this.xybsprList = resp.data;
            }
          });
        }
      });
      this.$refs.modalWidiow5.open();
    },
    /**
     * 点击全部通过
     * @param {string} bh 编号
     */
    clickAllPass() {
      var _this = this;
      var spList = [];
      for (var i = 0; i < _this.tableData2.length; i++) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          C_CreateCorpID: _this.tableData2[i].c_CreateCorpID, // 监狱，string类型，必须
          C_CreateDeptID: _this.tableData2[i].c_CreateDeptID,
          bh: _this.tableData2[i].bh,
          taskId: _this.tableData2[i].taskid,
          spyj: _this.spData.spyj,
          spr: _this.spData.spr,
          bz: _this.spData.spbz,
          zt: "103"
        };
        spList.push(params);
      }
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0123, spList).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.spData.spbz = "";
          Artery.message.info("审批成功");
          _this.level = 1;
          _this.queryYpy();
          _this.reload();
        }
      });
    },
    /**
     * 点击批量退回
     * @param {string} bh 编号
     */
    clickBatchRejection() {
      var _this = this;
      if (_this.dbSelection2.length == 0) {
        Artery.message.info({
            content:"请选择需要批量审批的数据",
            duration:3
        });
        return;
      }
      var list = _this.dbSelection2;
      for (var i = 0; i < list.length; i++) {
        if (list[i].zt == "102") {
          Artery.message.info({
            content:"退回状态无法继续批量退回！",
            duration:3
          });
          return;
        }
      }
      this.$refs.modalWidiow7.open();
    },
    /**
     * 点击查询操作
     * @param {string} bh 编号
     */
    clickSearch() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.ypylc.corp, // 监狱，string类型，必须
        dept: _this.ypylc.dept,
        zt: _this.zt,
        szxz: _this.szxz,
        zfbh: _this.zfbh,
        zfxm: _this.zfxm
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0061, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.tableData2 = resp.data;
          _this.chooseDisable(_this.tableData2);
        }
      });
    },
    /**
     * 点击返回操作
     * @param {string} bh 编号
     */
    clickBack() {
      var _this = this;
      _this.level = 1;
      _this.zfbh = "";
      _this.zfxm = "";
      _this.szxz = "";
      _this.zt = "";
      _this.reload();
    },
    /**
     * 查看月评表
     * @param {string} bh 编号
     */
    clickViewMonthTable() {
    }
  },
  watch: {
    khny(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.nowDate = _this.khny;
        _this.initData();
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.deptId = _this.deptObj.deptId;
        _this.queryYpy();
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.corpId = _this.corpObj.corpId;
      }
    }
  },
  mounted() {
    this.sftz = this.$route.query.sftz;
    var _this = this
    setTimeout(function() {
      _this.initData();
    }, 1000);
  },
  created() {
    var _this = this;
    var params = {
      corp: _this.corpObj.corpId,
      dept: _this.deptObj.deptId,
      khny: _this.khny // 月公示年月。String类型 必须
    };
    _this.postRequest(_this.apis.api0011, params).then(resp => {
      if (resp && resp.status == 200) {
        if(resp.data.hasOwnProperty("sfcd") && resp.data.sfcd != "1" && resp.data.sfwcpy !="1") {
          Artery.message.info(
            {
              content: "考核名单或考核分数有更新，为保证数据正确，请重新进行月公示的步骤！",
              duration: 3
            });
        }
      }
    });
  }
};
</script>
<style scoped>
.level2-box {
  height: 100%;
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
.aty-form-item {
  margin-bottom: 0px;
}
.tabs_main_box {
  margin-top: 10px;
}
</style>
