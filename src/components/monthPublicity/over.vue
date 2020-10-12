<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-ygs-box">
      <happy-scroll resize  color="rgba(112,177,243,1)" size="5" >
        <div class="fd-scroll-box">
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" name="scroll" :show="false"> -->
      <process :sftz="sftz"></process>
      <keep-alive>
        <div v-show="level == 1"  class="tabs_main_box">
          <!-- table區域 start -->
          <aty-table  @selection-change="selectionChange1" :pageable-data="tableData" :exp-all="false" :exp-current-page="false">
            <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
            <aty-table-column prop="corpName" label="监狱"></aty-table-column>
            <aty-table-column prop="deptName" label="监区"></aty-table-column>
            <aty-table-column prop="khrs" label="考核人数"></aty-table-column>
            <aty-table-column prop="bkhrs" label="不考核人数"></aty-table-column>
            <aty-table-column prop="wcpysj" label="评议完成日期" :formatter="df('YYYY-MM-DD')"></aty-table-column>
            <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <i>
                  <img v-if="right.ck" @click="getYhzListData(scope.row.corp,scope.row.dept,scope.row.bh)" title="查看月评表"
                       class="table_butn" src="../../assets/images/icon-ypb1.png">
                  <img @click="ckYhzb(scope)" title="查看月汇总表" class="table_butn" src="../../assets/images/icon-yhz1.png">
                </i>
              </template>
            </aty-table-column>
          </aty-table>
          <!-- 分页 start -->
          <aty-row class="fd-category" v-show="false">
            <aty-row>
              <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true" :show-elevator="true" @change="changePage"  ref="dbPage" @page-size-change="pageSizeChange"></aty-pagination>
            </aty-row>
          </aty-row>
        </div>
       </keep-alive>
        <div v-if="level == 2" class="tabs_main_box">
          <aty-button class="dr_edit_b1" type="primary" @click="clickBack()" v-if="level == 2">
            <span>返回</span>
          </aty-button>
          <h2 class="table-title">{{tableTitle}}</h2>
          <div class="search-area fd-gzf-search">
            <aty-form inline :label-width="120" class="fd-gzf-form" >
              <aty-form-item label="罪犯编号" class="fd-gzf-item">
                <aty-input v-model="zfbh" clearable></aty-input>
              </aty-form-item>
              <aty-form-item label="罪犯姓名" class="fd-gzf-item">
                <aty-input v-model="zfxm" clearable></aty-input>
              </aty-form-item>
              <aty-form-item label="小组" class="fd-gzf-item">
                <aty-input v-model="szxz" clearable></aty-input>
              </aty-form-item>
              <aty-form-item class="fd-gzf-item">
                <aty-button @click="getYhzListData()" class="search_option_butn1" type="primary">
                  <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
                </aty-button>
              </aty-form-item>
            </aty-form>
          </div>
          <div class="right-btns">
            <aty-button type="primary" @click="dcYhz()" >导出月汇总表</aty-button>
            <aty-button type="primary" @click="exportYpbListData()">导出罪犯月评表</aty-button>
          </div>
          <!-- table區域 start -->
          <aty-table  @selection-change="selectionChange1" :pageable-data="tableData2" style="width: 100%; margin-top: 20px;" :exp-all="false" :exp-current-page="false" class="fd-wc-table">
            <aty-table-column type="index" label="序号"  :showOverflowTooltip="false" class-name="wcw0"></aty-table-column>
            <aty-table-column prop="szxz" label="小组"  class-name="wcw1"></aty-table-column>
            <aty-table-column prop="zfbh" label="罪犯编号"  class-name="wcw2"></aty-table-column>
            <aty-table-column prop="zfxm" label="姓名"  class-name="wcw3">
              <!--<template slot-scope="props" >-->
                <!--<a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
              <!--</template>-->
            </aty-table-column>
            <aty-table-column prop="byhjdf" label="本月合计" >
              <aty-table-column  label="基础分">
                <aty-table-column prop="byjcfJygz" label="教育改造" class-name="wcw4"></aty-table-column>
                <aty-table-column prop="byjcfLdgz" label="劳动改造"  class-name="wcw4"></aty-table-column>
              </aty-table-column>
              <aty-table-column  label="加分">
                <aty-table-column prop="byjfJygz" label="教育改造"  class-name="wcw4"></aty-table-column>
                <aty-table-column prop="byjfLdgz" label="劳动改造"  class-name="wcw4"></aty-table-column>
              </aty-table-column>
              <aty-table-column  label="扣分">
                <aty-table-column prop="bykfJygz" label="教育改造"  class-name="wcw4"></aty-table-column>
                <aty-table-column prop="bykfLdgz" label="劳动改造"  class-name="wcw4"></aty-table-column>
                <aty-table-column prop="ycxzgkf" label="一次性最高扣分"  class-name="wcw5"></aty-table-column>
              </aty-table-column>
              <aty-table-column prop="byzxjf" label="专项加分"  class-name="wcw4"></aty-table-column>
              <aty-table-column  label="合计实得分">
                <aty-table-column prop="byhjdfJygz" label="教育改造"  class-name="wcw4"></aty-table-column>
                <aty-table-column prop="byhjdfLdgz" label="劳动改造"  class-name="wcw4"></aty-table-column>
              </aty-table-column>
            </aty-table-column>
            <aty-table-column  label="本考核期得分">
              <aty-table-column prop="bkhqdfJygz" label="教育改造"  class-name="wcw4"></aty-table-column>
              <aty-table-column prop="bkhqdfLdgz" label="劳动改造"  class-name="wcw4"></aty-table-column>
              <aty-table-column prop="bkhqdfLj" label="累计"  class-name="wcw4"></aty-table-column>
            </aty-table-column>
            <aty-table-column prop="sqyf" label="上期余分"  class-name="wcw4"></aty-table-column>
            <aty-table-column prop="wcpysj" label="评议完成日期"  class-name="wcw6" :formatter="df('YYYY-MM-DD')"></aty-table-column>
            <aty-table-column label="操作"  :showOverflowTooltip="false" class-name="wcw7">
              <template slot-scope="scope">
                <i>
                  <img @click="goView(scope.row)" title="查看月评表"
                       class="table_butn" src="../../assets/images/w-png20.png">
                  <aty-upload  action="//jsonplaceholder.typicode.com/posts/"  accept=".pdf,.jpg,.jpeg,.bmp,.png" :multiple="true"
                               :before-upload="handleUpload" ref="upload">

                    <img  title="上传罪犯签字月评表" @click="bdypyBh(scope.row.bh,scope.row.zfbh)"
                          accept=".pdf,.jpg,.jpeg,.bmp,.png" class="table_butn" src="../../assets/images/w-png19.png" >

                  </aty-upload>
                </i>
              </template>
            </aty-table-column>
          </aty-table>
        </div>
      <!-- </aty-scroll> -->
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
import { khny } from "../../store/getters";
export default {
  data: function() {
    return {
      sftz:true,
      isLoading: false,
      showConfirm: false,
      tableData: [],
      tableData2: [],
      isShow: false,
      zfbh: "",
      zfxx: "",
      szxz: "",
      corp: "",
      dept: "",
      yb_dept: "",
      yb_corp: "",
      zfxm: "",
      total: 10,
      limit: 10,
      offset: 1,
      level: 1,
      popData: [],
      url:_zfxxDetail.url,
      loadData: [],
      tab1PopSpyjList: [],
      tab1PopSpyj: "",
      spr: "",
      corpBh: "",
      tab1PopBz: "",
      ybybh: "",
      //已办监区列表
      ybJqDataList: [],
      //已办监狱列表
      jyDataList: [],
      xybsprList: [],
      searchArea: {
        nowDate: null,
        corpId: "",
        deptId: ""
      },
      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "完成",
          href: "/monthPublicity/over"
        }
      ],
      db_count: 30,
      right: {
        ck: false,
        sczfqzypb: false
      },
      isOver: false
    };
  },
  computed: {
    ...mapGetters([
      "khny",
      "deptObj",
      "corpObj",
      "hasReject",
      "processState",
      "clickOver"
    ]),
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
      return str + "罪犯月考核汇总表";
    }
  },

  components: {
    confirmbox,
    loading,
    process
  },
  watch: {
    tableData(curVal, oldVal) {
      // this.$nextTick(function() {
      //   this.$refs.scroll.update();
      // });
    },
    tableData2(curVal, oldVal) {
      // this.$nextTick(function() {
      //   this.$refs.scroll.update();
      // });
    },
    khny(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.nowDate = _this.khny;
        // 数据不同时要重新请求列表
        _this.level = 1;
        _this.getPyListData();
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.deptId = _this.deptObj.deptId;
        // 数据不同时要重新请求列表
        _this.getPyListData();
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.corpId = _this.corpObj.corpId;
      }
    }
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
    //获取已办监狱下拉列表
    getJyDataList() {
      var _this = this;
      _this.isLoading = true
      _this.getRequest(_this.apis.com0001).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          this.jyDataList = resp.data.ArrayList;
        }
      });
    },
    //获取已办监区下拉列表
    getYbJq(treeNodeData, name, event) {
      var _this = this;
      _this.yb_dept = "";
      if (treeNodeData.id == null) {
        return;
      }
      var deptType = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).deptType;
      var corpId = treeNodeData.id;
      //是否可选择非关押罪犯部门 true：不可选 false:可选
      var isSelectFgyzf = false;
      _this.isLoading = true
      _this
        .getRequest(
          _this.apis.com0002 + "/" + corpId + "/" + deptType + "/" + isSelectFgyzf
        )
        .then(resp => {
          _this.isLoading = false
          if (resp && resp.status == 200) {
            _this.ybJqDataList = resp.data.ArrayList;
            _this.$refs.jqTree3.update(_this.ybJqDataList);
          }
        });
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.right.ck = _this.checkLinkShow("jy.imp.jfkh.ygs.wc.ck", rightList);
      _this.right.sczfqzypb = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.wc.sczfqzypb",
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
      _this.getPyListData();
      // _this.getJyDataList();
      // _this.queryOverBoolen();
      _this.updateOver(true);
    },
    queryOverBoolen() {
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
      _this.isLoading = true
      _this.getRequest(_this.apis.api0124, params).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          _this.isOver = resp.data.Boolean;
          if (!_this.isOver) {
            Artery.message.info("没有完成的数据");
          }
        }
      });
    },
    getYhzListData(corp, dept, bh) {
      var _this = this;
      if (dept != null && dept != '') {
        _this.corp = corp;
        _this.dept = dept;
        _this.corpBh = bh;
      }
      _this.level = 2;
      var params = {
        corp: _this.corp, // 监狱,String类型 必须
        dept: _this.dept, // 监区,String类型
        khny: _this.searchArea.nowDate, // 考核月份,String类型
        szxz: _this.szxz,
        zfxm: _this.zfxm,
        zfbh: _this.zfbh
      };
      _this.isLoading = true
      _this.postRequest(_this.apis.api0061, params).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          _this.tableData2 = resp.data;
        } else {
        }
      });
    },
    /**
     * 获取评议列表接口
     * @description 根据监狱ID,监区ID,年份来进行 查找 分监狱,分监区,在册数量,在押数量,评议完成日期。
     * @param {string} bh 编号
     */
    getPyListData(corp, dept) {
      var _this = this;
      var usrInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if(_this.searchArea.deptId == null){
        _this.searchArea.deptId = usrInfo.deptId
      }
      if (dept != null && dept != "") {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: corp, // 监狱，string类型，必须
          dept: dept
        };
      } else {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId
        };
      }
      _this.isLoading = true
      _this.getRequest(_this.apis.api0073, params).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          _this.tableData = resp.data.ArrayList;
          if(_this.tableData != undefined && _this.tableData.length>0){
            _this.isOver = true
          }else{
            _this.isOver = false
            Artery.message.info("没有完成的数据");
          }
        }
      });
    },
    /**
     * 上传罪犯签字月评表
     */
    bdypyBh(bh, zfbh) {
      this.ybybh = bh;
    },
    /**
     * 查看月评表接口
     * @description 查询月公示汇总表。
     * @param {string} bh 编号
     */
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
        }else {
          Artery.message.error({
            content: resp.data,
            duration:3
          });
        }
      });
    },
    dcYhz() {
      let _this = this;
      var ztbh = _this.corp;
      var ywlb = "ygs";
      var ywbh = _this.corpBh;
      var wsmc = " ";
      var params = {
        corp: _this.corp, // 监狱，string类型，必须
        dept: _this.dept // 监区，string类型
      };
      _this.isLoading = true
      _this.postRequest(_this.apis.api0068, params).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          wsmc = "月汇总_" + resp.data.corp + "_" + resp.data.dept;
          // wsmc = "月汇总_" + resp.data.dept;
          window.open(
              "/writ/api/v1/writ/" +
              ztbh +
              "/" +
              ywlb +
              "/" +
              ywbh +
              "/" +
              wsmc +
              "/word"
          );
        }
      });
    },
    ckYhzb(scope) {
      let _this = this;
      let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));

      var ztbh = scope.row.corp;
      var ywlb = "ygs";
      var ywbh = scope.row.bh;
      var wsmc = " ";
      var params = {
        corp: scope.row.corp, // 监狱，string类型，必须
        dept: scope.row.dept // 监区，string类型
      };
      _this.isLoading = true
      _this.postRequest(_this.apis.api0068, params).then(resp => {
        _this.isLoading = false
        if (resp && resp.status == 200) {
          wsmc = "月汇总_" + resp.data.corp + "_" + resp.data.dept;
          _this.postRequest("/api/v1/ygs/buildYhzWs/"+scope.row.corp+"/"+scope.row.dept+"/"+_this.searchArea.nowDate).then(resp => {
            if (resp && resp.status == 200) {
              window.open(_writ.base_path+"/view/" + ztbh + "/" + ywlb + "/" + ywbh + "/" + wsmc);
            }
          });
        }
      });
    },

    getYpbListData() {
      var _this = this;
      var params = {
        bh: "sa987jbhz8uasd798as989888" // 月评编号,String类型 必须
      };
      _this.isLoading = true
        _this.isLoading = false
      _this.postRequest(_this.apis.api0022, params).then(resp => {
        if (resp && resp.status == 200) {
          var backData = {
            bh: resp.data.bh, // 月评议主键
            zfxxbh: resp.data.zfxxbh, // 罪犯信息编号
            zfxm: resp.data.zfxm, // 罪犯姓名
            byjcfJygz: resp.data.byjcfJygz, // 本月教育改造基础分
            byjcfLdgz: resp.data.byjcfLdgz, // 本月劳动改造基础分
            byjfJygz: resp.data.byjfJygz, // 本月教育改造加分
            byjfLdgz: resp.data.byjfLdgz, // 本月劳动改造加分
            bykfJygz: resp.data.bykfJygz, // 本月教育改造扣分
            bykfLdgz: resp.data.bykfLdgz, // 本月劳动改造扣分
            ycxzgkf: resp.data.ycxzgkf, // 一次性最高扣分
            byzxjf: resp.data.byzxjf, // 本月专项加分
            byhjdfJygz: resp.data.byhjdfJygz, // 教育改造本考核期得分
            byhjdfLdgz: resp.data.byhjdfLdgz, // 劳动改造本月合计得分
            bkhqdfJygz: resp.data.bkhqdfJygz, // 教育改造本考核期得分
            bkhqdfLdgz: resp.data.bkhqdfLdgz, // 劳动改造本考核期得分
            sqyf: resp.data.sqyf, // 上期余分
            bz: resp.data.bz // 备注
          };
        } else {
        }
      });
    },
    /**
     * 导出罪犯月评表接口
     * @description 导出罪犯月评表接口
     * @param {string} bh 编号
     */
    exportYpbListData() {
      var _this = this;
      var params = {
        corp: _this.corp, // 监狱，string类型，必须
        dept: _this.dept, //监区，String类型
        khny: _this.searchArea.nowDate// 监区，string类型
      };
      let url =
        _server.serverName +
        _this.apis.api0069 +
        "?corp=" +
        params.corp +
        "&dept=" +
        params.dept +
        "&khny=" +
        params.khny
      //let url = "/hcf"+_this.apis.api0031+"?khny="+params.khny+"&corp="+params.corp+"&dept="+params.dept+"&zfxm="+params.zfxm+"&zfbh="+params.zfbh+"&szxz="+params.szxz+"&gz="+params.gz;
      window.location.href = url;
    },
    /**
     * 上传罪犯签字月评表接口
     * @description 上传罪犯签字月评表接口
     * @param {string} bh 编号
     */
    //手动上传
    handleUpload: function(file) {
      this.uploadYpbListData(file);
      return false;
    },
    uploadYpbListData(file, bh) {
      var _this = this;
      this.loadingStatus = true;
      let total = this.$refs.upload.$refs.input.files.length;
      let formData = new FormData();
      formData.append("files", file);
      formData.append("bh", this.ybybh);
      _this.isLoading = true
        _this.isLoading = false
      this.uploadFileRequest(_this.apis.api0071, formData).then(resp => {
        if (resp && resp.status == 200) {
          if (_this.uploadIndex == total) {
          }
          Artery.message.info("上传成功!");
          _this.uploadfiles = [];
          _this.loadingStatus = false;
          _this.next = true;
        } else {
          Artery.message.error("上传失败！");
          this.loadingStatus = false;
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
    },
    /**
     * 点击表格跳页操作
     * @param {string} bh 编号
     */
    pageSizeChange() {
    },
    /**
     * 点击表格2change事件
     * @param {string} bh 编号
     */
    selectionChange2() {
    },
    /**
     * 点击表格2change事件
     * @param {string} bh 编号
     */
    selectionChange3() {
    },
    /**
     * 点击打印罪犯月评表
     * @param {string} bh 编号
     */
    clickPrintMonthTable() {
    },
    /**
     * 点击打印月汇总表
     * @param {string} bh 编号
     */
    clickPrintMonthSumTable() {
    },
    /**
     * 点击查询操作
     * @param {string} bh 编号
     */
    clickSearch(corp, dept) {
      this.getPyListData(corp, dept);
    },
    /**
     * 点击返回操作
     * @param {string} bh 编号
     */
    clickBack() {
      var _this = this;
      _this.level = 1;
      // this.$nextTick(function() {
      //   this.$refs.scroll.update();
      // });
    },
    /**
     * 查看月评表
     * @param {string} bh 编号
     */
    clickViewMonthTable() {
    },
    /**
     * 查看月汇总表
     * @param {string} bh 编号
     */
    clickViewMonthSumTable() {
    },
    /**
     * 上传罪犯签字月评表
     * @param {string} bh 编号
     */
    clickUploadSignedMonthTable() {
    }
  },
  mounted() {
    this.sftz = this.$route.query.sftz;
    var _this = this
    setTimeout(function() {
      _this.initData();
      // TODO 时序问题 需要等头部加载完成后在进行初始化
    }, 1000);
  }
};
</script>
<style>
.over-search .fd-gzf-form .fd-gzf-item > .aty-form-item-content {
  width: calc(100% - 80px);
}
.fd-search-btn .aty-form-item-content {
  margin-left: 20px !important;
}
</style>
<style scoped>
.over-search {
  padding-top: 10px;
}
.fd-search-btn {
  margin-top: 10px;
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
  margin-bottom: 20px;
}
.tabs_main_box {
  margin-top: 10px;
}
.right-btns {
  margin-bottom: 10px;
}
</style>
