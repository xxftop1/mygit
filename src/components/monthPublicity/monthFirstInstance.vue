<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <loading :isLoading="isLoading"></loading>
    <confirmbox class="topClass" v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <!-- 一级罪犯选择列表start -->
    <aty-modal  :mask-closable="false" title="查看已签字月初审表" footer-hide closable="" ref="editWidiow1" width="800" class="fd-xzzf-modal">
      <aty-table @selection-change="selectionChange2" :data="popData" ref="list1Table" :pageable-data="popData" @load-data="loadData" height="400" :exp-all="false" :exp-current-page="false">
        <aty-table-column type="index" label="序号" width="50px"></aty-table-column>
        <aty-table-column prop="entityShowname" label="名称"></aty-table-column>
        <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
          <template slot-scope="scope">
            <i>
              <img  @click="downFiles(scope.row.bh)" title="下载" class="table_butn" src="../../assets/images/xf.png">
              <img  @click="goDeleteBybh(scope)"  v-if="deleteShow" title="删除" class="table_butn" src="../../assets/images/w-png23.png">
            </i>
          </template>
        </aty-table-column>
      </aty-table>
    </aty-modal>
    <!-- 一级罪犯选择列表end -->
    <!-- 一级罪犯选择列表start -->
    <aty-modal :mask-closable="false" title="查看详情" footer-hide closable="" ref="editWidiow2" width="800" class="fd-xzzf-modal">
      <aty-table @selection-change="selectionChange3" :data="popData2" ref="list2Table" :pageable-data="popData2" @load-data="loadData2" height="400" :exp-all="false" :exp-current-page="false">
        <aty-table-column type="index" label="序号"></aty-table-column>
        <aty-table-column prop="fsrq" label="发生时间" :formatter="dateFormat"></aty-table-column>
        <aty-table-column prop="fsdd" label="发生地点"></aty-table-column>
        <aty-table-column prop="zysy" label="主要事由"></aty-table-column>
        <aty-table-column prop="khyj" label="考核依据"></aty-table-column>
        <aty-table-column prop="yjfs" label="加扣分分值" :formatter="intFormat"></aty-table-column>
      </aty-table>
    </aty-modal>
    <!-- 一级罪犯选择列表end -->
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-ygs-box">
      <happy-scroll resize  color="rgba(112,177,243,1)" size="5" >
          <div class="fd-scroll-box">
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="ycsScroll" name="ycsScroll" :show="false"> -->
        <aty-panel class="content-panel">
        <process :sftz="sftz"></process>
        <div class="btn-links">
          <aty-row>
            <aty-col>
              <aty-button class="dr_edit_b1" type="primary" @click="exportZfkhcsbListData()" v-if="right.dczfykhcsb">
                <span>导出罪犯月考核初审表</span>
              </aty-button>
            </aty-col>
            <aty-col>
              <aty-upload v-if="right.scyqzcsb&&processState.sfwcyhz!='1'||(processState.sfwcyhz=='1'&&processState.pysfth=='1')" :action="apis.api0053"  accept=".pdf,.jpg,.jpeg,.bmp,.png"
                          :multiple="true"  :before-upload="handleUpload" ref="upload">
                <aty-button type="primary" class="dr_edit_b1">
                  <span>上传已签字初审表</span>
                </aty-button>
              </aty-upload>
            </aty-col>
            <aty-col>
              <aty-button class="dr_edit_b1" type="primary" @click="showFiles">
                <span>查看已签字初审表</span>
              </aty-button>
            </aty-col>
            <aty-col v-if="nextStep">
              <aty-button class="dr_edit_b1" type="primary" @click="nextClick">
                <span>下一步</span>
              </aty-button>
            </aty-col>
          </aty-row>
        </div>
        <h2 class="table-title">{{tableTitle}}</h2>
        <div class="search-area fd-ycs-search">
          <aty-form inline :label-width="120" class="fd-ycs-form">
            <aty-form-item label="罪犯姓名" class="fd-ycs-item">
              <aty-input v-model="searchArea.zfxm" clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="罪犯编号" class="fd-ycs-item">
              <aty-input v-model="searchArea.zfbh"  clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="小组" class="fd-ycs-item">
              <aty-input v-model="searchArea.szxz" clearable></aty-input>
            </aty-form-item>
            <aty-form-item label="工种" class="fd-ycs-item">
              <aty-input v-model="searchArea.gz" clearable></aty-input>
            </aty-form-item>
            <aty-form-item class="fd-ycs-btn">
              <aty-button @click="clickSearch()" class="search_option_butn1" type="primary">
                <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
              </aty-button>
            </aty-form-item>
          </aty-form>
        </div>
          <div class="tabs_main_box fd-ycs-table">
            <!-- table區域 start -->
            <aty-table class="crazy-table" @selection-change="selectionChange1" :pageable-data="tableData" :exp-all="false" :exp-current-page="false" @row-click="rowClick">
              <aty-table-column type="index" label="序号" width="40" :showOverflowTooltip="false">
              </aty-table-column>
              <aty-table-column prop="bh" v-if="false" label="编号">
              </aty-table-column>
              <aty-table-column label="基本情况">
                <aty-table-column prop="zfxm" label="姓名" width="120">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="szxz" label="组别" width="40"></aty-table-column>
                <aty-table-column prop="gz" label="工种" width="65" class-name="gz"></aty-table-column>
              </aty-table-column>
              <aty-table-column label="基础分">
                <aty-table-column label="教育改造">
                  <aty-table-column prop="jcfRzhzqk" label="认罪悔罪情况" :formatter="zy" width="50"></aty-table-column>
                  <aty-table-column prop="jcfZsjgjlqk" label="遵守监规纪律情况" :formatter="zy" width="50"></aty-table-column>
                  <aty-table-column prop="jcfLhwwgwjqk" label="联号无违规违纪情况" :formatter="zy" width="50"></aty-table-column>
                  <aty-table-column prop="jcfShwsqk" label="生活卫生情况" :formatter="zy" width="50"></aty-table-column>
                  <aty-table-column prop="jcfJsjyqk" label="接受教育情况" :formatter="zy" width="50"></aty-table-column>
                  <aty-table-column prop="jcfLdtdqk" label="劳动态度情况" :formatter="zy" width="50"></aty-table-column>
                </aty-table-column>
                <aty-table-column label="劳动改造">
                  <aty-table-column prop="jcfWcldrwqk" label="完成劳动任务情况" :formatter="zy" width="50"></aty-table-column>
                </aty-table-column>
              </aty-table-column>
              <aty-table-column label="加分">
                <aty-table-column label="教育改造">
                  <aty-table-column prop="jygzjfArry[0]" label=""   width="40"></aty-table-column>
                  <aty-table-column prop="jygzjfArry[1]" label=""  width="40"></aty-table-column>
                  <aty-table-column prop="jygzjfArry[2]" label=""  width="40"></aty-table-column>
                  <aty-table-column prop="jygzjfArry[3]" label=""  width="40"></aty-table-column>
                  <aty-table-column prop="jygzjfArry[4]" label=""  width="40"></aty-table-column>
                </aty-table-column>
                <aty-table-column label="劳动改造">
                  <aty-table-column prop="ldgzjfArry[0]"  :formatter="zy" label="有劳动定额罪犯超额完成或在关键技术岗位的无劳动定额罪犯表现突出的" width="100"></aty-table-column>
                  <aty-table-column prop="ldgzjfArry[1]"  :formatter="zy" label="非关键技术岗位的无劳动定额罪犯劳动表现突出的" width="80"></aty-table-column>
                  <aty-table-column prop="ldgzjfArry[2]"  label="" width="40"></aty-table-column>
                  <aty-table-column prop="ldgzjfArry[3]"  label="" width="40"></aty-table-column>
                </aty-table-column>
              </aty-table-column>
              <aty-table-column label="扣分">
                <aty-table-column label="教育改造">
                  <aty-table-column prop="jygzkfArry[0]"  label="" width="40"></aty-table-column>
                  <aty-table-column prop="jygzkfArry[1]"  label="" width="40"></aty-table-column>
                  <aty-table-column prop="jygzkfArry[2]"  label="" width="40"></aty-table-column>
                </aty-table-column>
                <aty-table-column label="劳动改造">
                  <aty-table-column prop="ldgzkfArry[0]"  label="" width="40"></aty-table-column>
                  <aty-table-column prop="ldgzkfArry[1]"  label="" width="40"></aty-table-column>
                  <aty-table-column prop="ldgzkfArry[2]"  label="" width="40"></aty-table-column>
                </aty-table-column>
              </aty-table-column>
              <aty-table-column prop="zxjf" label="专项加分" :formatter="zy" width="50"></aty-table-column>
              <aty-table-column label="本月考核得分">
                <aty-table-column label="基础分">
                  <aty-table-column prop="byjcfJygz" label="教育改造" :formatter="zy" width="50"></aty-table-column>
                  <aty-table-column prop="byjcfLdgz" label="劳动改造" :formatter="zy" width="50"></aty-table-column>
                </aty-table-column>
                <aty-table-column label="加分">
                  <aty-table-column prop="byjfJygz" label="教育改造" :formatter="zy" width="40"></aty-table-column>
                  <aty-table-column prop="byjfLdgz" label="劳动改造" :formatter="zy" width="40"></aty-table-column>
                </aty-table-column>
                <aty-table-column label="扣分">
                  <aty-table-column prop="bykfJygz" label="教育改造" :formatter="zy" width="40"></aty-table-column>
                  <aty-table-column prop="bykfLdgz" label="劳动改造" :formatter="zy"  width="40"></aty-table-column>
                  <aty-table-column prop="ycxzgkf" label="一次性最高扣分" :formatter="zy" width="40"></aty-table-column>
                </aty-table-column>
                <aty-table-column prop="zxjf" label="专项加分" :formatter="zy" width="50"></aty-table-column>
                <aty-table-column prop="byhjdf" label="合计得分" :formatter="zy" width="40"></aty-table-column>
              </aty-table-column>
              <aty-table-column prop="bz" label="备注" width="80"></aty-table-column>
            </aty-table>
            <!-- 分页 start -->
            <aty-row class="fd-category" v-show="false">
              <aty-row>
                <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true" :show-elevator="true" @change="changePage" :limit-opts="limitOpts" ref="dbPage" @page-size-change="pageSizeChange"></aty-pagination>
              </aty-row>
            </aty-row>
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
      files: "",
      confirmtext: "确认删除么?",
      delItem: "",
      isLoading: false,
      showConfirm: false,
      tableData: [],
      tableData2: [],
      total: 10,
      limit: 5,
      offset: 1,
      next: false,
      limitOpts: [5, 10, 15, 20],
      popData: [],
      url:_zfxxDetail.url,
      popData2: [],
      loadData: [],
      loadData2: [],
      sfwcycs: "",
      pysfth: "",
      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "月初审",
          href: "/monthPublicity/monthFirstInstance"
        }
      ],
      treeData2:[],
      searchArea: {
        nowDate: "",
        corpId: "",
        deptId: "",
        zfxm: "",
        zfbh: "",
        szxz: "",
        gz: ""
      },
      db_count: 40,
      uploadfiles: [],
      loadingStatus: false,
      uploadIndex: "",
      right: {
        dczfykhcsb: false,
        scyqzcsb: false,
        jryhz: false
      },
      scrollFun: Function
    };
  },
  components: {
    confirmbox,
    loading,
    process
  },
  methods: {
    /**
     * 月初审表格上的scroll组件
     */
    tableScrollReady(scrollBar) {
      this.$refs.ycsTableScroll.scroll = function() {
        return;
      };
    },
    zy: function(row, column) {
      if (row == null) {
        return 0;
      } else {
        return row;
      }
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.right.dczfykhcsb = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ycs.dczfykhcsb",
        rightList
      );
      _this.right.scyqzcsb = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ycs.scyqzcsb",
        rightList
      );
      _this.right.jryhz = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.ycs.jryhz",
        rightList
      );
    },
    dateFormat(param) {
      return param.substring(0, 10);
    },
    intFormat(param) {
      return parseInt(param);
    },
    //下载上传的附件
    downFiles: function(row) {
      this.downFileBybh(row);
    },

    // 删除上传的附件
    goDeleteBybh: function(scope) {
      // this.delYcsFileData(scope);
      this.delItem = scope;
      this.showConfirm = true;
    },

    // 删除已签字月初审文件dom
    delYcsFileDom: function(index) {
      this.popData.splice(index, 1);
    },

    // 删除月初审已签字文录后台数据
    delYcsFileData: function(scope) {
      var _this = this;
      if (scope.row.bh == null) {
        Artery.message.info("删除失败,请稍后重试！");
        return;
      }
      _this.isLoading = true;
      _this.isLoading = false;
      this.deleteRequest(_this.apis.com0009 + scope.row.bh).then(resp => {
        if (resp && resp.status == 200) {
          _this.delYcsFileDom(scope.$index);
          Artery.message.success("删除文件成功！");
        }
      });
    },

    downFileBybh: function(row) {
      var _this = this;
      let url = _server.serverName + _this.apis.api0055 + "/" + row + "";
      window.location.href = url;
    },
    getUploadList() {
      var _this = this;
      let formData = new FormData();
      formData.append("corp", _this.searchArea.corpId);
      formData.append("dept", _this.searchArea.deptId);
      formData.append("khny", _this.searchArea.nowDate);
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0054, formData).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.popData = resp.data;
          _this.loadData = resp.data;
        } else {
        }
      });
    },
    /**
     * 获取到已上传的文件信息
     */
    showFiles() {
      var _this = this;
      let formData = new FormData();
      formData.append("corp", _this.searchArea.corpId);
      formData.append("dept", _this.searchArea.deptId);
      formData.append("khny", _this.searchArea.nowDate); // 考核年月,String类型 必须);

      _this.isLoading = true;
      _this.postRequest(_this.apis.api0054, formData).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.popData = resp.data;
          _this.loadData = resp.data;
          _this.$refs.editWidiow1.open();
        } else {
        }
      });
    },

    getLc() {
      var _this = this;
      var params = {
        corp: _this.searchArea.corpId, // 所属监狱id。String类型 必须
        dept: _this.searchArea.deptId, // 所属监区id。String类型 必须
        khny: _this.searchArea.nowDate // 月公示年月。String类型 必须
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0011, params).then(resp => {
        if (resp && resp.status == 200) {
          _this.isLoading = false;
          if (resp.data) {
            _this.sfwcycs = resp.data.sfwcycs; // 是否完成月初审。
            _this.pysfth = resp.data.pysfth;
          }
        }
      });
    },

    /**
     * 请求当前bh日记载
     * @description 请求当前bh日记载
     * @param {string} param 父组件值
     */
    showRecordDetail(bh) {
      var _this = this;
      let formData = new FormData();
      formData.append("bh", bh);
      formData.append("corp", _this.searchArea.corpId);
      formData.append("dept", _this.searchArea.deptId);
      formData.append("khny", _this.searchArea.nowDate); // 考核年月,String类型 必须);
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0057, formData).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.popData2 = resp.data;
          _this.loadData2 = resp.data;
          _this.$refs.editWidiow2.open();
        } else {
        }
      });
    },
    /**
     * 月初审表行点击事件
     * @description 月初审表行点击事件
     * @param {string} param 父组件值
     */
    rowClick(row, event, column) {
      var _this = this;
      _this.showRecordDetail(row.bh);
    },
    /**
     * 考核名单列表接口
     * @description 考核名单列表接口
     * @param {string} param 父组件值
     */
    initData(param) {
      var _this = this;
      _this.searchArea.nowDate = _this.khny;
      _this.searchArea.corpId = _this.corpObj.corpId;
      _this.searchArea.deptId = _this.deptObj.deptId;
      _this.loadJqXx(_this.searchArea.corpId);
      _this.getCurUser();
      _this.getUploadList();
      _this.getYcskhListData(1, this.limit);
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
          }
        });
    },
    /**
     * 获取罪犯月考核列表接口(以及根据罪犯条件进行查询)
     * @description 获取罪犯月考核列表接口(以及根据罪犯条件进行查询)
     * @param {string} bh 编号
     */
    getYcskhListData(pageNum, pageSize) {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月,String类型 必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名,String类型 非必须
        zfbh: _this.searchArea.zfbh, // 罪犯信息编号,String类型 非必须
        szxz: _this.searchArea.szxz, // 小组,String类型 非必须
        gz: _this.searchArea.gz // 工种,String类型 非必须
      };
      _this.isLoading = true;
      _this
        .postRequest(_this.apis.api0051 + pageNum + "/" + 200, params)
        .then(resp => {
          _this.isLoading = false;
          if (resp && resp.status == 200) {
            var tableData = resp.data.list;
            _this.total = resp.data.total;
            tableData.forEach(function(item, index) {
              //解决空数组问题
              item.jygzjfArry =
                item.jygzjfArry == undefined
                  ? ["", "", "", "", ""]
                  : item.jygzjfArry;
              item.ldgzjfArry =
                item.ldgzjfArry == undefined
                  ? ["", "", "", ""]
                  : item.ldgzjfArry;
              item.jygzkfArry =
                item.jygzkfArry == undefined ? ["", "", ""] : item.jygzkfArry;
              item.ldgzkfArry =
                item.ldgzkfArry == undefined ? ["", "", ""] : item.ldgzkfArry;
            });
            _this.tableData = tableData;
          } else {
          }
        });
    },
    /**
     * 导出罪犯考核初审表接口
     * @description 导出罪犯考核初审表接口
     * @param {string} bh 编号
     */
    exportZfkhcsbListData(event) {
      var _this = this;
      let zfxm = _this.searchArea.zfxm;
      let gz = _this.searchArea.szxz;
      let szxz = _this.searchArea.gz;
      let khny = _this.searchArea.nowDate; // 考核年月,String类型 必须
      let corp = _this.searchArea.corpId; // 监狱，string类型，必须
      let dept = _this.searchArea.deptId; // 监区，string类型
      if (_this.searchArea.zfxm != "") {
        zfxm = _this.searchArea.zfxm;
      }
      if (_this.searchArea.gz != "") {
        gz = _this.searchArea.gz;
      }
      if (_this.searchArea.szxz != "") {
        szxz = _this.searchArea.szxz;
      }
      if (_this.searchArea.nowDate != "") {
        khny = _this.searchArea.nowDate;
      }
      if (_this.searchArea.corpId != "") {
        corp = _this.searchArea.corpId;
      }
      if (_this.searchArea.deptId != "") {
        dept = _this.searchArea.deptId;
      }
      let url =
        _server.serverName +
        _this.apis.api0052 +
        "?zfxm=" +
        zfxm +
        "&gz=" +
        gz +
        "&szxz=" +
        szxz +
        "&khny=" +
        khny +
        "&corp=" +
        corp +
        "&dept=" +
        dept +
        "";
      window.location.href = url;
    },

    //手动上传
    handleUpload: function(file) {
      this.uploadYqzcsbData(file);
      this.uploadIndex = 0;
      return false;
    },
    /**
     * 上传已签字初审表接口
     * @description 上传已签字初审表接口
     * @param {string} bh 编号
     */
    uploadYqzcsbData(file) {
      var _this = this;
      this.loadingStatus = true;
      let total = this.$refs.upload.$refs.input.files.length;
      let formData = new FormData();
      formData.append("files", file);
      formData.append("corp", _this.searchArea.corpId);
      formData.append("dept", _this.searchArea.deptId);
      formData.append("khny", _this.searchArea.nowDate); // 考核年月,String类型 必须);
      _this.isLoading = true;
      this.uploadFileRequest(_this.apis.api0053, formData).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.uploadIndex++;
          if (_this.uploadIndex == total) {
            Artery.message.info("上传成功!");
            _this.popData.push({});
          }

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
    changePage(pageSize) {
      this.limit = this.$refs.dbPage.currentPageSize;
      this.offset = this.$refs.dbPage.currentPage;
      this.getYcskhListData(
        this.$refs.dbPage.currentPage,
        this.$refs.dbPage.currentPageSize
      );
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
     * 确认删除
     * @param {string} bh 编号
     */
    delRjzListItem(flag) {
      if (flag) {
        this.delYcsFileData(this.delItem);
        this.showConfirm = false;
      } else {
        this.showConfirm = false;
      }
    },
    /**
     * 点击查询操作
     * @param {string} bh 编号
     */
    clickSearch() {
      var _this = this;
      this.getYcskhListData(
        _this.$refs.dbPage.currentPage,
        _this.$refs.dbPage.currentPageSize
      );
    },
    nextClick() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月,String类型 必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId // 监区，string类型
      };

      _this.isLoading = true;
      _this.getRequest(_this.apis.api0058, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.$router.push({
            path: "/monthPublicity/monthCollection"
          });
        }
      });
    }
  },
  watch: {
    khny(curVal, oldVal) {
      var _this = this;
      if (oldVal == "") {
        return;
      }
      if (curVal !== oldVal) {
        _this.searchArea.nowDate = _this.khny;
        _this.getYcskhListData(1, _this.limit);
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (oldVal == "") {
        return;
      }
      if (curVal !== oldVal) {
        _this.searchArea.deptId = _this.deptObj.deptId;
        _this.getYcskhListData(1, _this.limit);
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (oldVal == "") {
        return;
      }
      if (curVal !== oldVal) {
        _this.searchArea.corpId = _this.corpObj.corpId;
        _this.getYcskhListData(1, _this.limit);
      }
    }
  },
  computed: {
    ...mapGetters(["khny", "deptObj", "corpObj", "hasReject", "processState"]),
    nextStep() {
      var _this = this;
      if (_this.right.scyqzcsb) {
        if (_this.popData.length > 0) {
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
    deleteShow() {
      var _this = this;
      //2是没完成月初审   1是完成月初审   2是评议没退回  1是评议已退回
      if (
        (_this.processState.sfwcycs === "2" &&
          _this.processState.pysfth === "1") ||
        _this.processState.sfwcycs === "2" ||
        (_this.processState.sfwcycs === "1" &&
          _this.processState.pysfth === "1")
      ) {
        return true;
      } else {
        return false;
      }
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
      var jy = "";
      if(_this.treeData2!=null&&_this.treeData2.length>0&&_this.searchArea.deptId != ""){
        if(this.treeData2[0].children != null && this.treeData2[0].children.length > 0) {
          for (var i = 0; i < this.treeData2.length; i++) {
            for (var j = 0; j < this.treeData2[i].children.length; j++) {
              if (_this.searchArea.deptId == this.treeData2[i].children[j].id) {
                jy = this.treeData2[i].name + this.treeData2[i].children[j].name;
              }
            }
          }
        }else {
          for (var i = 0; i < this.treeData2.length; i++) {
            if (_this.searchArea.deptId == this.treeData2[i].id) {
              jy = this.treeData2[i].name;
            }
          }
        }
      }
      return str + jy + "罪犯" + "月考核初审表";
    }
  },
  created() {
    var _this = this;
    _this.sftz = _this.$route.query.sftz;
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
  },
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.initData();
    }, 1000);
  }
};
</script>
<style>
.fd-ycs-table .aty-table .gz .cell.aty-tooltip {
  white-space: normal;
}
.fd-ycs-table .aty-table .gz .cell {
  text-overflow: clip;
}
</style>
<style scoped>
.topClass {
  position: relative;
  z-index: 99999999;
}
.fd-ycs-table {
  width: 1838px;
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
.content-panel {
  min-width: 1830px;
}
.content-panel:after {
  content: "";
  display: block;
  clear: both;
}
</style>
