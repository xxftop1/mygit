<template>
  <div class="fd-map-breadcrumb">
    <!-- 一级罪犯选择列表start -->
    <aty-modal :mask-closable="false" title="退回原因" footer-hide closable="" ref="editWidiow1" width="800" class="fd-xzzf-modal">
      <aty-table :data="rejectDataList" ref="list1Table" :pageable-data="rejectDataList" @load-data="rejectDataList" height="400" :exp-all="false" :exp-current-page="false">
        <aty-table-column prop="bh" label="编号" v-if="false"></aty-table-column>
        <aty-table-column prop="zfxm" label="罪犯姓名"></aty-table-column>
        <aty-table-column prop="zfbh" label="罪犯编号"></aty-table-column>
        <aty-table-column prop="thyy" label="退回原因" width="160" :showOverflowTooltip="false"></aty-table-column>
      </aty-table>
    </aty-modal>
    <!-- 一级罪犯选择列表end -->
    <div class="fd-left-part">
      <aty-date-picker transfer :options="options1" class="dr_date_pick" @change="dateChange" v-model="khnyVal" type="month"
                       clearable :editable="false" format="yyyy-MM"></aty-date-picker>
      <aty-row>
        <aty-col span='12'>
          <aty-select-tree  :disabled="sfgyzf" class="nomal_tree search_option_input visble" ref="selectTree1"
                           name="valueobject1"  :data="treeData" transfer v-model="corpObj.corpId" @change="getJyXx">
          </aty-select-tree>
        </aty-col>
        <aty-col span='12'>
          <aty-select-tree  :disabled="sfgyzf" class="nomal_tree search_option_input dept-tree visble" ref="selectTree2"
                           name="valueobject2" transfer  :data="treeData2" v-model="deptObj.deptId" @change="getJqXx"
                           clearable></aty-select-tree>
        </aty-col>
      </aty-row>
    </div>
    <div class="fd-right-part">
      <a class="step step1" :class="isOpenQdkhmd?'move':''" @click="routerPaths(1)">
        确定考核名单
      </a>
      <a class="arrow a1" :class="isOpenJygzf?'move':''"></a>
      <a class="step step2" :class="isOpenJygzf?'move':''" @click="routerPaths(2)">
        教育改造分
      </a>
      <a class="step step3" :class="isOpenJygzf?'move':''" @click="routerPaths(3)">
        劳动改造分
      </a>
      <a class="arrow a2" :class="isOpenYcs?'move':''"></a>
      <a class="step step4" :class="isOpenYcs?'move':''" @click="routerPaths(4)">
        月初审
      </a>
      <a class="arrow a3" :class="isOpenYhz?'move':''"></a>
      <a class="step step5" :class="isOpenYhz?'move':''" @click="routerPaths(5)">
        月汇总/罪犯月考核
      </a>
      <a class="arrow a4" :class="isOpenPy?'move':''"></a>
      <a class="step step6" :class="isOpenPy?'move':''" @click="routerPaths(6)">
        评议
      </a>
      <a class="arrow a5" :class="isOpenWc?'move':''"></a>
      <a class="step step7 disabled" :class="isOpenWc?'move':''" @click="routerPaths(7)">
        完成
      </a>
      <a class="fd-reject" v-if="processState != undefined && processState.pysfth=='1'&&processState.sfzsthan=='1'"
         @click="viewRejectDataList"></a>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "process",
  props : ['sftz'],
  data() {
    return {
      initLoad: true,
      isLoading: false,
      showConfirm: false,
      routerPath: {
        qdkhmd: "/monthPublicity/evaluateList",
        jygzf: "/monthPublicity/educationScore",
        ldgzf: "/monthPublicity/laborScore",
        ycs: "/monthPublicity/monthFirstInstance",
        yhz: "/monthPublicity/monthCollection",
        py: "/monthPublicity/conference",
        wc: "/monthPublicity/over"
      },
      khnyVal: "",
      total: 10,
      limit: 5,
      offset: 1,
      limitOpts: [5, 10, 15, 20],
      popData: [],
      loadData: [],
      treeData: [],
      valueobject1: {},
      valueobject2: {},
      treeData2: [],
      rejectDataList: [],
      options1: {
        disabledDate: function(date) {
          var newDate = new Date();
          var flag =
            date.getMonth() > newDate.getMonth() - 1 &&
            date.getFullYear() >= newDate.getFullYear();
          return flag;
        }
      },
      process: {
        // 进度标志
        bh: "",
        sfqdkhmd: "", // 是否确定考核名单。Boolean类型 必须
        sfzzjyjcf: "", // 是否制作教育基础分。Boolean类型 必须
        sfwcldjcfsp: "", // 是否完成劳动基础分审批。Boolean类型 必须
        sfwcycs: "", // 是否完成月初审。Boolean类型 必须
        sfwcyhz: "", // 是否完成月汇总。Boolean类型 必须
        sfwcpy: "", // 是否完成评议。Boolean类型 必须
        pysfth: "" // 评议是否退回。Boolean类型 必须
      },
      right: {
        qdkhmd: false,
        jygzf: false,
        ldgzf: false,
        ycs: false,
        yhz: false,
        py: false,
        wc: false
      },
      isPy: false,
      sfgyzf: false,
      oldDeptId: "",
      sfzsthan: "2"
    };
  },
  computed: {
    hasReject: {
      get() {
        return this.$store.state.hasReject;
      },
      set(hasReject) {
        this.updateReject(hasReject);
      }
    },
    processState: {
      get() {
        return this.$store.state.processState;
      },
      set(process) {
        this.updateProcessState(process);
      }
    },
    khny: {
      get() {
        return this.$store.state.khny;
      },
      set(khnyVal) {
        this.updateKhny(khnyVal);
      }
    },
    deptObj: {
      get() {
        return this.$store.getters.deptObj;
      },
      set(deptObj) {
        this.updateDept(deptObj);
      }
    },
    corpObj: {
      get() {
        return this.$store.getters.corpObj;
      },
      set(corpObj) {
        this.updateCorp(corpObj);
      }
    },
    ...mapGetters(["clickOver"]),
    /**
     * 是否有退回名单
     */
    hasRejectList() {
      var _this = this;
      var flag = false;
      if (_this.rejectDataList.length > 0) {
        flag = true;
      }
      return flag;
    },
    /**
     * 确定考核名单
     */
    isOpenQdkhmd() {
      var _this = this;
      // 非关押 选择分监区 流程开启 灯亮
      // 关押 流程开启 灯亮
      if (_this.process.sfqdkhmd != "") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 教育改造分
     */
    isOpenJygzf() {
      // 分监区进来 有关押罪犯权限 有权限 有流程且流程到了 灯亮
      // 监区及以上 无关押罪犯权限 有权限 不选择分监区 评议和完成灯亮 其他灯不亮
      // 监区及以上 无关押罪犯权限 有权限 选择分监区 流程到了 灯亮 评议和完成亮灯跟流程走
      var _this = this;
      if (_this.right.jygzf && _this.process.sfqdkhmd == "1") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 劳动改造分
     */
    isOpenLdgzf() {
      // 分监区进来 有关押罪犯权限 有权限 有流程且流程到了 灯亮
      // 监区及以上 无关押罪犯权限 有权限 不选择分监区 评议和完成灯亮 其他灯不亮
      // 监区及以上 无关押罪犯权限 有权限 选择分监区 流程到了 灯亮 评议和完成亮灯跟流程走
      var _this = this;
      if (_this.right.ldgzf && _this.process.sfqdkhmd == "1") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 月初审
     */
    isOpenYcs() {
      // 分监区进来 有关押罪犯权限 有权限 有流程且流程到了 灯亮
      // 监区及以上 无关押罪犯权限 有权限 不选择分监区 评议和完成灯亮 其他灯不亮
      // 监区及以上 无关押罪犯权限 有权限 选择分监区 流程到了 灯亮 评议和完成亮灯跟流程走
      var _this = this;
      if (
        _this.right.ycs &&
        _this.process.sfzzjyjcf == "1" &&
        _this.process.sfwcldjcfsp == "1"
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 月汇总/罪犯月考核
     */
    isOpenYhz() {
      // 分监区进来 有关押罪犯权限 有权限 有流程且流程到了 灯亮
      // 监区及以上 无关押罪犯权限 有权限 不选择分监区 评议和完成灯亮 其他灯不亮
      // 监区及以上 无关押罪犯权限 有权限 选择分监区 流程到了 灯亮 评议和完成亮灯跟流程走
      var _this = this;
      if (_this.right.yhz && _this.process.sfwcycs == "1") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 评议
     */
    isOpenPy() {
      // 分监区进来 有关押罪犯权限 有权限 有流程且流程到了 灯亮
      // 监区及以上 无关押罪犯权限 有权限 不选择分监区 评议和完成灯亮 其他灯不亮
      // 监区及以上 无关押罪犯权限 有权限 选择分监区 流程到了 灯亮 评议和完成亮灯跟流程走
      // 监狱局
      var _this = this;
      var usrInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if (
        (_this.right.py && _this.process.sfwcyhz == "1") ||
        (_this.right.py && !_this.sfgyzf && _this.process.sfwcyhz == "1") ||
        (_this.right.py && !_this.sfgyzf && _this.process.sfwcyhz == "") ||
        (usrInfo.deptType == "1" && _this.process.sfwcyhz == "1")
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 完成
     */
    isOpenWc() {
      // 分监区进来 有关押罪犯权限 有权限 有流程且流程到了 灯亮
      // 监区及以上 无关押罪犯权限 有权限 不选择分监区 评议和完成灯亮 其他灯不亮
      // 监区及以上 无关押罪犯权限 有权限 选择分监区 流程到了 灯亮 评议和完成亮灯跟流程走
      // 监狱局
      var _this = this;
      var usrInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if (
        (_this.right.wc && _this.process.sfwcpy == "1") ||
        (_this.right.wc && !_this.sfgyzf && _this.process.sfwcpy == "1") ||
        (_this.right.wc && !_this.sfgyzf && _this.process.sfwcpy == "") ||
        (usrInfo.deptType == "1" && _this.process.sfwcyhz == "1")
      ) {
        return true;
      } else {
        return false;
      }
    }
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
     * 月公示跳转控制
     */
    monthPublicity() {
      var _this = this;
      var params = {
        corp: _this.corpObj.corpId,
        dept: _this.deptObj.deptId,
        khny: _this.khny // 月公示年月。String类型 必须
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0011, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          var path = "";
          var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
          if (
            curUserInfo.sfgyzf ||
            (!curUserInfo.sfgyzf && _this.process.sfqdkhmd != "")
          ) {
            if (resp.data.sfqdkhmd == "2" && _this.right.qdkhmd) {
              path = _this.routerPath.qdkhmd;
            }
            if (
              resp.data.sfqdkhmd == "1" &&
              resp.data.sfzzjyjcf == "2" &&
              _this.right.jygzf
            ) {
              path = _this.routerPath.jygzf;
            }
            if (
              resp.data.sfqdkhmd == "1" &&
              resp.data.sfwcldjcfsp == "2" &&
              _this.right.ldgzf
            ) {
              path = _this.routerPath.ldgzf;
            }
            if (
              resp.data.sfwcldjcfsp == "1" &&
              resp.data.sfwcycs == "2" &&
              _this.right.ycs
            ) {
              path = _this.routerPath.ycs;
            }
            if (
              resp.data.sfwcycs == "1" &&
              resp.data.sfwcyhz == "2" &&
              _this.right.yhz
            ) {
              path = _this.routerPath.yhz;
            }
            if (
              resp.data.sfwcyhz == "1" &&
              resp.data.sfwcpy == "2" &&
              _this.right.py
            ) {
              path = _this.routerPath.py;
            }
            if (resp.data.sfwcpy == "1" && _this.right.wc) {
              path = _this.routerPath.wc;
            }
          } else {
            if (_this.right.wc && _this.clickOver) {
              path = _this.routerPath.wc;
            }
            if (_this.right.py && !_this.clickOver) {
              path = _this.routerPath.py;
            }
          }
          _this.$router.push({ path: path });
        } else {
        }
      });
    },
    queryYpy() {
      var _this = this;

      if (_this.$route.path == "/monthPublicity/conference") {
        return;
      }
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
        }
      });
    },
    // ...mapActions(['updateYgsLc']),
    /**
     * 初始化数据
     * @param {string} bh 编号
     */
    initData() {
      let _this = this;
      _this.oldDeptId = _this.deptObj.deptId;
      let userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if (_this.corpObj.corpId == "") {
        _this.corpObj.corpId = userInfo.corpId;
      }
      if (_this.deptObj.deptId == "" && userInfo.deptType <= 2) {
        _this.deptObj.deptId = null;
      }else{
        if(userInfo.deptType > 2&&_this.deptObj.deptId == ""){
          _this.deptObj.deptId = userInfo.deptId;
        }
      }

      _this.sfgyzf = userInfo.sfgyzf;
      _this.getCurUserRight(userInfo);

      if (!_this.khny) {
        _this.khny = this.formatLastMonth(new Date);
        _this.khnyVal = this.formatLastMonth(new Date);
      } else {
        _this.khnyVal = _this.khny;
      }
      _this.queryYpy();
      _this.loadJyXx();
      _this.loadJqXx(_this.corpObj.corpId);
    },
    getCurUserRight(userInfo) {
      var _this = this;
      let rightList = userInfo.userRightList;
      _this.right.qdkhmd = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.qdkhmd",
        rightList
      );
      _this.right.jygzf = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.jygzf",
        rightList
      );
      _this.right.ldgzf = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.ldgzf",
        rightList
      );
      _this.right.ycs = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.ycs",
        rightList
      );
      _this.right.yhz = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.yhz",
        rightList
      );
      _this.right.py = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.py",
        rightList
      );
      _this.right.wc = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ygslc.wc",
        rightList
      );
    },
    loadJyXx() {
      var _this = this;
      _this.isLoading = true;
      _this.getRequest(_this.apis.com0001).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.treeData = resp.data.ArrayList;
          _this.$refs.selectTree1.update(_this.treeData);
        }
      });
    },
    /**
     * 改变监狱信息
     * @param {string} bh 编号
     */
    getJyXx(treeNodeData, name, event) {
      var _this = this;
      _this.sfzsthan = "2";
      _this.corpObj.corpId = treeNodeData.id;
      _this.corpObj.corpName = treeNodeData.name;
      _this.loadJqXx(_this.corpObj.corpId);
    },
    /**
     * 获取监区信息
     * @param {string} bh 编号
     */
    loadJqXx(corpId) {
      var _this = this;
      var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var deptType = userInfo.deptType;
      var corpId = corpId;
      //是否可选择非关押罪犯部门 true：不可选 false:可选
      var isSelectFgyzf = false;
      _this.isLoading = true;
      _this
        .getRequest(
          _this.apis.com0002 +
            "/" +
            corpId +
            "/" +
            deptType +
            "/" +
            isSelectFgyzf
        )
        .then(resp => {
          _this.isLoading = false;
          if (resp && resp.status == 200) {
            _this.treeData2 = [];
            for (let index in resp.data.ArrayList) {
              _this.$set(_this.treeData2, index, resp.data.ArrayList[index]);
            }
            _this.$refs.selectTree2.update(_this.treeData2);
            _this.loadMonthShow();
          }
        });
    },
    /**
     * 改变监区信息
     * @param {string} bh 编号
     */
    getJqXx(treeNodeData, name, event) {
      var _this = this;
      _this.deptObj.deptId = treeNodeData.id;
      _this.deptObj.deptName = treeNodeData.name;
      _this.updateDept(_this.deptObj);
      _this.sfzsthan = "2";
      // 跳转
      if (_this.deptObj.deptId != _this.oldDeptId) {
        _this.loadMonthShow();
        _this.monthPublicity();
      }
    },
    routerJump(right, path, process, num) {
      var _this = this;
      if (right) {
        if (num != 4) {
          // 非分监区 未选择监区 找不到流程 评议以前模块 并且评议未完成
          if (!_this.sfgyzf && process == "" && num < 6) {
            Artery.message.info("请先选择到关押罪犯监区再进行查看");
          }

          // 非分监区 未选择监区 找不到流程 评议模块
          if (!_this.sfgyzf && process == "" && num == 6) {
            _this.$router.push({
              path: path
            });
          }
          // 非分监区 未选择监区 找不到流程 完成模块
          if (!_this.sfgyzf && process == "" && num == 7) {
            _this.$router.push({
              path: path
            });
          }
          // 非分监区 找到流程
          if (!_this.sfgyzf && process == "1") {
            _this.$router.push({
              path: path
            });
          }
          // 分监区 找到流程
          if (_this.sfgyzf && (process == "1" || num == 1)) {
            _this.$router.push({
              path: path,
              query: {sftz: false}
            });
          }
          // 分监区 未找到流程
          if (_this.sfgyzf && process == "") {
            Artery.message.info("流程未开启");
          }
        } else {
          // 非分监区 未选择监区 找不到流程
          if (!_this.sfgyzf && process[0] == "" && process[1] == "") {
            Artery.message.info("请先选择到分监区再进行查看");
          }
          // 非分监区 找到流程
          if (!_this.sfgyzf && process[0] == "1" && process[1] == "1") {
            _this.$router.push({
              path: path
            });
          }
          // 分监区 找到流程
          if (_this.sfgyzf && process[0] == "1" && process[1] == "1") {
            _this.$router.push({
              path: path
            });
          }
          // 分监区 未找到流程
          if (_this.sfgyzf && process[0] == "" && process[1] == "") {
            Artery.message.info("流程未开启");
          }
        }
      } else {
        Artery.message.info("无权限");
      }
    },
    /**
     * 路由跳转
     * @param {string} bh 编号
     */
    routerPaths(num) {
      var _this = this;
      switch (num) {
        case 1: {
          _this.routerJump(
            _this.right.qdkhmd,
            _this.routerPath.qdkhmd,
            _this.process.sfqdkhmd,
            1
          );
          break;
        }
        case 2: {
          _this.routerJump(
            _this.right.jygzf,
            _this.routerPath.jygzf,
            _this.process.sfqdkhmd,
            2
          );
          break;
        }
        case 3: {
          _this.routerJump(
            _this.right.ldgzf,
            _this.routerPath.ldgzf,
            _this.process.sfqdkhmd,
            3
          );
          break;
        }
        case 4: {
          _this.routerJump(
            _this.right.ycs,
            _this.routerPath.ycs,
            [_this.process.sfzzjyjcf, _this.process.sfwcldjcfsp],
            4
          );
          break;
        }
        case 5: {
          _this.routerJump(
            _this.right.yhz,
            _this.routerPath.yhz,
            _this.process.sfwcycs,
            5
          );
          break;
        }
        case 6: {
          _this.routerJump(
            _this.right.py,
            _this.routerPath.py,
            _this.process.sfwcyhz,
            6
          );
          break;
        }
        case 7: {
          _this.routerJump(
            _this.right.wc,
            _this.routerPath.wc,
            _this.process.sfwcpy,
            7
          );
          break;
        }
      }
    },
    /**
     * 查询月评议全部退回名单接口
     * @description 查询月评议批量退回的罪犯名单
     * @param {string} bh 编号
     */
    loadAllRejectData() {
      var _this = this;
      var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var params = {
        C_CreateCorpID: _this.corpObj.corpId, // 所属监狱id。String类型 必须
        C_CreateDeptID: _this.deptObj.deptId, // 所属监区id。String类型 必须
        khny: _this.khny // 月公示年月。String类型 必须
      };
      if(_this.deptObj.deptId == null||_this.deptObj.deptId==''){
        params.C_CreateDeptID = curUserInfo.deptId;
      }
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0012, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.rejectDataList = resp.data;
        }
        if (_this.rejectDataList.length > 0) {
          //是否展示退回按钮
          _this.processState.sfzsthan = "1";
        } else {
          _this.processState.sfzsthan = "2";
        }
        _this.updateProcessState(_this.processState);
      });
    },
    /**
     * 查看月评议全部退回名单
     * @description 查询月评议批量退回的罪犯名单
     * @param {string} bh 编号
     */
    viewRejectDataList() {
      var _this = this;
      _this.$refs.editWidiow1.open();
      _this.loadAllRejectData();
    },
    /**
     * 日期控件值改变
     * @param {string} bh 编号
     */
    dateChange() {
      var _this = this;
      _this.sfzsthan = "2";
      _this.updateKhny(_this.khnyVal);
      _this.loadMonthShow();
    },
    /**
     * 根据部门或单位id获取该部门的月公示
     * @param {string} bh 编号
     */
    loadMonthShow() {
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
          if (resp.data.bh) {
            _this.process.sfqdkhmd = resp.data.sfqdkhmd; // 是否确定考核名单。Boolean类型 必须
            _this.process.sfzzjyjcf = resp.data.sfzzjyjcf; // 是否制作教育基础分。Boolean类型 必须
            _this.process.sfwcldjcfsp = resp.data.sfwcldjcfsp; // 是否完成劳动基础分审批。Boolean类型 必须
            _this.process.sfwcycs = resp.data.sfwcycs; // 是否完成月初审。Boolean类型 必须
            _this.process.sfwcyhz = resp.data.sfwcyhz; // 是否完成月汇总。Boolean类型 必须
            _this.process.sfwcpy = resp.data.sfwcpy; // 是否完成评议。Boolean类型 必须
            _this.process.pysfth = resp.data.pysfth; // 评议是否退回。Boolean类型 必须
            _this.process.bh = resp.data.bh;
            _this.updateProcessState(_this.process);
            _this.loadAllRejectData();
          } else {
            // 清空流程
            _this.process.sfqdkhmd = ""; // 是否确定考核名单。Boolean类型 必须
            _this.process.sfzzjyjcf = ""; // 是否制作教育基础分。Boolean类型 必须
            _this.process.sfwcldjcfsp = ""; // 是否完成劳动基础分审批。Boolean类型 必须
            _this.process.sfwcycs = ""; // 是否完成月初审。Boolean类型 必须
            _this.process.sfwcyhz = ""; // 是否完成月汇总。Boolean类型 必须
            _this.process.sfwcpy = ""; // 是否完成评议。Boolean类型 必须
            _this.process.pysfth = ""; // 评议是否退回。Boolean类型 必须
            _this.process.bh = "";
            _this.updateProcessState(_this.process);
            // 清空数据
          }
          var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
          var path = "";
          if(_this.sftz) {
            if (curUserInfo.sfgyzf) {
              if (resp.data.sfqdkhmd == "2" && _this.right.qdkhmd) {
                path = "/monthPublicity/evaluateList";
              }
              if (
                resp.data.sfqdkhmd == "1" &&
                resp.data.sfzzjyjcf == "2" &&
                _this.right.jygzf
              ) {
                path = "/monthPublicity/educationScore";
              }
              if (
                resp.data.sfzzjyjcf == "1" &&
                resp.data.sfwcldjcfsp == "2" &&
                _this.right.ldgzf
              ) {
                path = "/monthPublicity/laborScore";
              }
              if (
                resp.data.sfwcldjcfsp == "1" &&
                resp.data.sfwcycs == "2" &&
                _this.right.ycs
              ) {
                path = "/monthPublicity/monthFirstInstance";
              }
              if (
                resp.data.sfwcycs == "1" &&
                resp.data.sfwcyhz == "2" &&
                _this.right.yhz
              ) {
                path = "/monthPublicity/monthCollection";
              }
              if (
                resp.data.sfwcyhz == "1" &&
                resp.data.sfwcpy == "2" &&
                _this.right.py
              ) {
                path = "/monthPublicity/conference";
              }
              if (resp.data.sfwcpy == "1" && _this.right.wc) {
                path = "/monthPublicity/over";
              }
            } else {
              if (_this.right.wc) {
                path = "/monthPublicity/over";
              }
              if (_this.right.py) {
                path = "/monthPublicity/conference";
              }
            }
            _this.$router.push({path: path});
          }
        } else {
          Artery.message.info("未获取到流程数据");
        }
      });
    },
  },
  created() {
    var _this = this;
  },
  mounted() {
    var _this = this;
    _this.initData();
  }
};
</script>
<style scoped>
.fd-map-breadcrumb {
  overflow: hidden;
}
.fd-map-breadcrumb .fd-left-part {
  float: left;
  background: url(../../../assets/images/left-part-bg.png) no-repeat;
  width: 288px;
  height: 134px;
  padding-top: 20px;
}
.fd-map-breadcrumb .fd-right-part {
  float: left;
  height: 134px;
  width: 983px;
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
  left: 167px;
  top: 20%;
  margin-top: -15px;
}
.fd-map-breadcrumb .fd-right-part .step3 {
  left: 167px;
  top: 80%;
  margin-top: -15px;
}
.fd-map-breadcrumb .fd-right-part .step4 {
  left: 333px;
}
.fd-map-breadcrumb .fd-right-part .step5 {
  left: 500px;
}
.fd-map-breadcrumb .fd-right-part .step6 {
  left: 673px;
}
.fd-map-breadcrumb .fd-right-part .step7 {
  left: 840px;
}
.fd-map-breadcrumb .fd-right-part .step.move {
  background-color: #09c9ff;
}
.arrow {
  position: absolute;
  width: 38px;
}
.a1 {
  background: url(../../../assets/images/arrow10.png) no-repeat;
  left: 130px;
  height: 92px;
  top: 50%;
  margin-top: -46px;
}
.a1.up {
  background: url(../../../assets/images/arrow11.png) no-repeat;
}
.a1.down {
  background: url(../../../assets/images/arrow12.png) no-repeat;
}
.a1.move {
  background: url(../../../assets/images/arrow13.png) no-repeat;
}
.a2 {
  background: url(../../../assets/images/arrow20.png) no-repeat;
  left: 296px;
  height: 92px;
  top: 50%;
  margin-top: -46px;
}
.a2.up {
  background: url(../../../assets/images/arrow21.png) no-repeat;
}
.a2.down {
  background: url(../../../assets/images/arrow22.png) no-repeat;
}
.a2.move {
  background: url(../../../assets/images/arrow23.png) no-repeat;
}
.a3 {
  background: url(../../../assets/images/arrow30.png) no-repeat;
  left: 463px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
}
.a3.move {
  background: url(../../../assets/images/arrow31.png) no-repeat;
}
.a4 {
  background: url(../../../assets/images/arrow30.png) no-repeat;
  left: 636px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
}
.a4.move {
  background: url(../../../assets/images/arrow31.png) no-repeat;
}
.a5 {
  background: url(../../../assets/images/arrow30.png) no-repeat;
  left: 803px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
}
.a5.move {
  background: url(../../../assets/images/arrow31.png) no-repeat;
}
.dr_date_pick {
  margin: 10px auto;
  display: block;
  width: 215px;
}
.nomal_tree {
  margin: 10px auto;
  display: block;
  width: 130px;
}
.fd-reject {
  width: 26px;
  height: 26px;
  display: block;
  position: absolute;
  left: 620px;
  top: 35px;
  background: url(../../../assets/images/icon-reject.png) no-repeat;
}
</style>
