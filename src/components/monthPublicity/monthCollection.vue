<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
  <!-- 选择下一步审批人 弹窗 -->
    <aty-modal title="呈报" :mask-closable="false" class="rl_pop_box xybsp-modal" ref="modalWidiow3" width="650px" closable="">
      <div class="pop_main_box">
        <aty-row class="fd-sp-row" v-if="xybsprList.length != 0">
          <aty-col span='4' class="fd-sp-col1">下一步审批人</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-select transfer class="npl_seleted" v-model="spr" :data="xybsprList"></aty-select>
          </aty-col>
        </aty-row>
        <div class="drw_save_butn">
          <aty-button @click="jqPlspSubmit()" class="search_option_butn1" type="primary">
            <span>提交</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <!-- 选择下一步审批人 弹窗 -->
     <!-- 选择下一步审批人 弹窗 -->
    <aty-modal title="填写备注" :mask-closable="false" class="rl_pop_box" ref="windowBz" width="650px" closable="">
      <div class="pop_main_box">
        <aty-row class="fd-sp-row">
            <aty-textarea v-model="bz" :maxlength=100 placeholder="请输入（100字符内）" :autosize="{minRows:2,maxRows:20}"></aty-textarea>
        </aty-row>
        <div class="drw_save_butn">
          <aty-button @click="writeBzSumbmit()" class="search_option_butn1" type="primary">
            <span>提交</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <!-- 选择下一步审批人 弹窗 -->
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-ygs-box">
      <happy-scroll resize  color="rgba(112,177,243,1)" size="5" >
        <div class="fd-scroll-box">
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzTab0Scroll" name="rjzTab0Scroll" :show="false"> -->
        <aty-panel class="content-panel">
        <process :sftz="sftz"></process>
        <div class="btn-links">
          <aty-button class="dr_edit_b1" type="primary" @click="clickSubmit"
                      v-if="(processState.sfwcyhz == '2'&&right.cb&&cbxs==2)||(processState.pysfth == '1'&&right.cb)">
            <span>呈报</span>
          </aty-button>
          <aty-button class="dr_edit_b1" type="primary" @click="clickCreateMonthTable"
                      v-if="right.scypb&&processState.sfwcyhz!='1'&&(cbxs==1||cbxs==2)||(processState.pysfth == '1'&&right.cb)">
            <span>生成月评表</span>
          </aty-button>
          <aty-button v-if="false" class="dr_edit_b1" type="primary" @click="clickExportMonthTable">
            <span>导出月评表</span>
          </aty-button>
          <aty-button v-if="false" class="dr_edit_b1" type="primary" @click="clickExportMonthSumTable">
            <span>导出月汇总表</span>
          </aty-button>
        </div>
        <h2 class="table-title">{{tableTitle}}</h2>
        <div class="fd-ycs-search">
          <aty-form inline :label-width="120"  class="fd-ycs-form">
            <aty-form-item label="罪犯姓名" class="fd-ycs-item">
              <aty-input v-model="zfxm" clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="罪犯编号" class="fd-ycs-item">
              <aty-input v-model="zfbh" clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="小组" class="fd-ycs-item">
              <aty-input v-model="szxz" clearable></aty-input>
            </aty-form-item>
            <aty-form-item class="fd-ycs-item" :label-width="15">
              <aty-button @click="getYgsYhzListData()" class="search_option_butn1" type="primary">
                <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
              </aty-button>
            </aty-form-item>
          </aty-form>
        </div>
        <div class="tabs_main_box">
          <!-- table區域 start -->
          <aty-table @selection-change="selectionChange2" :pageable-data="tableData"  :exp-all="false" :exp-current-page="false" class="fd-yhz-table">
            <aty-table-column type="index" label="序号"  :showOverflowTooltip="false"  class-name="yhzw0">
            </aty-table-column>
            <aty-table-column prop="bh" v-if="false" label="编号">
            </aty-table-column>
            <aty-table-column prop="szxz" label="小组"  class-name="yhzw1">
            </aty-table-column>
            <aty-table-column prop="zfbh" label="罪犯编号"  class-name="yhzw2">
            </aty-table-column>
            <aty-table-column prop="zfxm" label="罪犯姓名"  class-name="yhzw3">
              <!--<template slot-scope="props" >-->
                <!--<a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
              <!--</template>-->
            </aty-table-column>
            <aty-table-column prop="sfscypb" v-if="false" label="是否生成月评表" width="200" class-name="yhzw2">
            </aty-table-column>
            <aty-table-column prop="byhjdf" label="本月合计">
              <aty-table-column  label="基础分">
                <aty-table-column prop="byjcfJygz" label="教育改造"  class-name="yhzw4"></aty-table-column>
                <aty-table-column prop="byjcfLdgz" label="劳动改造"  class-name="yhzw4"></aty-table-column>
              </aty-table-column>
              <aty-table-column  label="加分">
                <aty-table-column prop="byjfJygz" label="教育改造"  class-name="yhzw4"></aty-table-column>
                <aty-table-column prop="byjfLdgz" label="劳动改造"  class-name="yhzw4"></aty-table-column>
              </aty-table-column>
              <aty-table-column  label="扣分">
                <aty-table-column prop="bykfJygz" label="教育改造"  class-name="yhzw4"></aty-table-column>
                <aty-table-column prop="bykfLdgz" label="劳动改造"  class-name="yhzw4"></aty-table-column>
                <aty-table-column prop="ycxzgkf" label="一次性最高扣分"  class-name="yhzw5"></aty-table-column>
              </aty-table-column>
              <aty-table-column prop="byzxjf" label="专项加分"  class-name="yhzw4"></aty-table-column>
              <aty-table-column  label="合计实得分">
                <aty-table-column prop="byhjdfJygz"  label="教育改造"  class-name="yhzw4"></aty-table-column>
                <aty-table-column prop="byhjdfLdgz"  label="劳动改造"  class-name="yhzw4"></aty-table-column>
              </aty-table-column>
            </aty-table-column>
            <aty-table-column  label="本考核期得分">
              <aty-table-column prop="bkhqdfJygz" label="教育改造"  class-name="yhzw4"></aty-table-column>
              <aty-table-column prop="bkhqdfLdgz"  label="劳动改造"  class-name="yhzw4"></aty-table-column>
              <aty-table-column prop="bkhqdfLj"  label="累计"  class-name="yhzw4"></aty-table-column>
            </aty-table-column>
            <aty-table-column prop="sqyf"  label="上期余分"  class-name="yhzw4"></aty-table-column>
            <aty-table-column  label="操作" class-name="yhzw6">
              <template slot-scope="scope">
                <i>
                  <img v-if="right.bcbz&&processState.sfwcyhz!='1'||(processState.sfwcyhz=='1'&&processState.pysfth=='1')"
                       @click="writeBz(scope.row.bh)" title="补充备注" class="table_butn" src="../../assets/images/w-png22.png">
                  <img @click="goView(scope.row)" v-if="scope.row.sfscypb=='1'" title="查看月评表" class="table_butn"
                       src="../../assets/images/w-png20.png">
                  <img v-if="false" title="导出" class="table_butn" src="../../assets/images/w-png23.png">
                </i>
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
        </aty-panel>
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
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data: function() {
    return {
      sftz:true,
      xybsprList: [], // 下一步审批人列表
      spr: "", // 下一步审批人
      cbxs: 1,
      isLoading: false,
      showConfirm: false,
      tableData: [],
      task: [],
      bz: "", // 备注
      bh: "",
      zfbh: "",
      zfxm: "",
      szxz: "",
      tableData2: [],
      url:_zfxxDetail.url,
      total: 3,
      limit: 2,
      offset: 1,
      limitOpts: [5, 10, 15, 20],
      popData: [],
      loadData: [],
      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "月汇总/罪犯月考核",
          href: "/monthPublicity/monthCollection"
        }
      ],
      searchArea: {
        nowDate: "",
        corpId: "",
        deptId: "",
        zfxm: "",
        zfbh: "",
        szxz: "",
        gz: ""
      },
      db_count: 30,
      right: {
        cb: false,
        scypb: false,
        bcbz: false
      }
    };
  },
  mounted() {
    this.sftz = this.$route.query.sftz;
    var _this = this;
    setTimeout(function() {
      _this.initData();
      // TODO 时序问题 需要等头部加载完成后在进行初始化
    }, 1000);
  },
  components: {
    confirmbox,
    loading,
    process
  },
  methods: {
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.right.cb = _this.checkLinkShow("jy.imp.jfkh.ygs.yhz.cb", rightList);
      _this.right.scypb = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.yhz.scypb",
        rightList
      );
      _this.right.bcbz = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.yhz.bcbz",
        rightList
      );
    },
    initData(param) {
      var _this = this;
      _this.searchArea.nowDate = _this.khny;
      _this.searchArea.corpId = _this.corpObj.corpId;
      _this.searchArea.deptId = _this.deptObj.deptId;
      _this.getCurUser();
      _this.getYgsYhzListData();
    },
    spztf: function(prop) {
      return prop == undefined ? prop : 0;
    },
    /**
     * 补充备注提交
     * @description 补充备注提交
     * @param {string} param 父组件值
     */
    writeBzSumbmit() {},
    /**
     * 点击补充备注
     * @description 点击补充备注
     * @param {string} param 父组件值
     */
    writeBz() {
      var _this = this;
      _this.$refs.windowBz.open();
    },
    /**
     * 查询月公示汇总表接口
     * @description 查询月公示汇总表
     * @param {string} bh 编号
     */
    getYgsYhzListData() {
      var _this = this;
      var params = {
        corp: _this.searchArea.corpId, // 监狱,String类型 必须
        dept: _this.searchArea.deptId, // 监区,String类型
        khny: _this.searchArea.nowDate, // 考核月份,String类型
        zfxm: _this.zfxm, // 罪犯姓名,String类型
        zfbh: _this.zfbh, // 罪犯编号,String类型
        szxz: _this.szxz, // 小组,String类型
        sffy: "0" //是否分页
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0061, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (params.sffy == "1") {
            this.tableData = resp.data.list;
            this.total = resp.data.total;
          } else {
            this.tableData = resp.data;
            for (var i = 0; i < _this.tableData.length; i++) {
              if (_this.tableData[i].sfscypb == "1") {
                _this.cbxs = 2;
              } else {
                _this.cbxs = 1;
                break;
              }
            }
          }
        } else {
        }
      });
    },
    /**
     * 补充备注提交
     * @description 补充备注提交
     * @param {string} param 父组件值
     */
    writeBzSumbmit() {
      var _this = this;
      _this.$refs.windowBz.open();
      let aa = _this.bh;
      var params = {
        bh: _this.bh,
        bz: _this.bz
      };
      _this.isLoading = true;
      _this.getRequest(_this.apis.api0066, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          Artery.message.success("成功！");
          _this.$refs.windowBz.close();
        } else {
          Artery.message.info({
              content:"备注添加异常！",
              duration:3
          });
        }
      });
    },
    /**
     * 点击补充备注
     * @description 点击补充备注
     * @param {string} param 父组件值
     */
    writeBz(bh) {
      var _this = this;
      _this.$refs.windowBz.open();
      this.bh = bh;
      var param = {
        bh
      };
      _this.isLoading = true;
      _this.getRequest(_this.apis.api0065, param).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.bz = resp.data.bz;
        } else {
          Artery.message.info({
             content:"备注获取异常！",
              duration:3
          });
        }
      });
    },

    /**
     * 呈报，获取下一步审批人
     * @param {string} bh 编号
     */
    clickSubmit() {
      let _this = this;
      var bhs = _this.tableData;
      _this.$refs.modalWidiow3.open();
      var params = {
        corp: _this.searchArea.corpId, // 监狱,String类型 必须
        dept: _this.searchArea.deptId, // 监区,String类型
        khny: _this.searchArea.nowDate // 考核月份,String类型
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0062, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.task = resp.data;
          var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
          var taskParams = {
            curTaskId: _this.task[0].id,
            spAuthority: "jy.imp.jfkh.splc.ygssp.",
            corpId: userInfo.corpId
          };
          _this.isLoading = true;
          _this.getRequest(_this.apis.com0008, taskParams).then(resp => {
            _this.isLoading = false;
            if (resp && resp.status == 200) {
              if (resp.data.length == 0) {
                Artery.message.info({
                    content:"下一步审批人为空！",
                    duration:3
                });
              } else {
                _this.xybsprList = resp.data;
              }
            } else {
              Artery.message.info({
                  content:"下一步审批人获取失败！",
                  duration:3
              });
            }
          });
        } else {
          Artery.message.info({
             content:"审批流开启失败！",
             duration:3
          });
        }
      });
    },

    /**
     * 选择下一步审批人
     * @description 选择下一步审批人
     * @param {string} param 父组件值
     */
    jqPlspSubmit() {
      let _this = this;
      var params = [];
      if (_this.spr == "" && _this.xybsprList.length != 0) {
        Artery.message.info({
           content:"请选择下一步审批人",
           duration:3
        });
        return;
      }
      if (_this.tijiaoStatus) {
        Artery.message.info({
           content:"请不要重复提交",
           duration:3
        });
        return;
      }

      var params1 = [];
      for (var i = 0; i < _this.task.length; i++) {
        var YpySpVo = {
          bh: _this.task[i].id,
          spr: _this.spr
        };
        params1.push(YpySpVo);
      }
      var params2 = [];
      for (var i = 0; i < _this.tableData.length; i++) {
        params2.push(_this.tableData[i].bh);
      }
      var params = {
        YpySpVo: params1,
        bhs: params2
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0063, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.processState.pysfth = "2";
          Artery.message.success("提交成功！");
          _this.$refs.modalWidiow3.close();
          _this.$router.push({
            path: "/monthPublicity/conference"
          });
        } else {
          Artery.message.error({
              content:"提交异常！",
              duration:3
          });
        }
      });
    },
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
        }else {
          Artery.message.error({
            content: resp.data,
            duration:3
          });
        }
      });
    },
    /**
     * 查看月评表接口
     * @description 查询月公示汇总表
     * @param {string} bh 编号
     */
    getYpbListData() {
      var _this = this;
      var params = {
        bh: "sa987jbhz8uasd798as989888" // 月评编号,String类型 必须
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0027, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          var backData = {
            bh: resp.data.bh
          };
        } else {
        }
      });
    },
    /**
     * 点击表格换页操作
     * @param {string} bh 编号
     */
    changePage(paegNum) {
      this.getYgsYhzListData();
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
     * 获取子组件时间
     * @param {string} bh 编号
     */
    getDate(date) {
      var _this = this;
      _this.nowDate = date;
    },
    /**
     * 生成月评表
     * @param {string} bh 编号
     */
    clickCreateMonthTable() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月,String类型 必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId // 监区，string类型
      };
      Artery.message.success({
          content:"文书正在后台努力生成中，您可以正常进行其他业务操作，3分钟之后刷新此页面查看文书",
          duration:3
      }
      );
      _this.isLoading = true;
      _this.getRequest(_this.apis.api0064, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.cbxs = 2;
        }
      });
    },
    /**
     * 导出月评表
     * @param {string} bh 编号
     */
    clickExportMonthTable() {
    },
    /**
     * 导出月汇总表
     * @param {string} bh 编号
     */
    clickExportMonthSumTable() {
    },
  },
  watch: {
    khny(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.nowDate = _this.khny;
        _this.getYgsYhzListData();
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.deptId = _this.deptObj.deptId;
        _this.getYgsYhzListData();
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (curVal !== oldVal) {
        _this.searchArea.corpId = _this.corpObj.corpId;
        _this.getYgsYhzListData();
      }
    }
  },
  computed: {
    ...mapGetters(["khny", "deptObj", "corpObj", "hasReject", "processState"]),
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
.fd-yhz-table {
  width: 100%;
  margin-top: 20px;
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
  margin-bottom: 10px;
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
.content-panel {
  min-width: 1830px;
}
.content-panel:after {
  content: "";
  display: block;
  clear: both;
}
</style>
