<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap education-score">
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-day-record fd-jygzf-box fd-ygs-box">
       <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
        <div class="fd-scroll-box" :class="scrollheight  ? 'fd-pr-10':''">
      <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzTab0Scroll" name="rjzTab0Scroll" :show="false"> -->
        <process :sftz="sftz"></process>
        <div class="btn-links">
          <aty-button class="dr_edit_b1" type="primary" @click="changeView(true)">
            <span>教育基础分</span>
          </aty-button>
          <aty-button class="dr_edit_b1" type="primary" @click="changeView(false)">
            <span>教育改造分汇总</span>
          </aty-button>
        </div>
        <h2 class="table-title">{{tableTitle}}</h2>
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
            <aty-form-item label="有无劳动能力" class="fd-gzf-item">
              <aty-select  transfer v-model="searchArea.ywldnl" :data="ywldnlList" clearable></aty-select>
            </aty-form-item>
            <aty-form-item class="fd-gzf-btn">
              <aty-button @click="changeSearch(view)" class="search_option_butn1" type="primary">
                <i><img src="../../assets/images/w-png17.png"></i><span>查询</span>
              </aty-button>
            </aty-form-item>
          </aty-form>
        </div>
        <div class="btn-links mgbt10">
          <aty-button v-if="false&&right.jygzfck" type="primary" @click="clickPrint" class="dr_edit_b1">打 印</aty-button>
          <aty-button type="primary" @click="clickExport" v-if="right.jygzfck" class="dr_edit_b1">导 出</aty-button>
          <aty-button type="primary" v-if="buttonShow" @click="clickCreate" class="dr_edit_b1">完成教育改造分汇总</aty-button>
        </div>
          <!-- table區域 start -->
          <aty-table v-if="view" @selection-change="selectionChange1" :row-class-name="rowClassName" :pageable-data="tableData" :exp-all="false" :exp-current-page="false" key="table1" class="fd-jygz-table">
            <!-- <aty-table-column type="selection" width="45">
            </aty-table-column> -->
            <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="bh" v-if="false" label="编号" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="zfBh" label="罪犯编号" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="zfxm" label="罪犯姓名" class-name="lh">
              <!--<template slot-scope="props" >-->
                <!--<a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
              <!--</template>-->
            </aty-table-column>
            <aty-table-column prop="corpName" label="监狱" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="deptName" label="监区" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="ywldnl" label="有无劳动能力" :formatter="ywlddl" title="有无劳动能力" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="szxz" label="小组" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="bz" label="备注" class-name="lh">
            </aty-table-column>
            <aty-table-column prop="rzhz" label="认罪悔罪">
              <template slot-scope="scope" v-if="jyjcfSeleteList.length">
                <select :disabled="readOnlyData" class="npl_seleted fd-khyj-select" v-model="scope.row.rzhz"
                        @change="changeItem(scope,'rzhz')">
                  <option v-for="option in jyjcfSeleteList" v-bind:value="option.code">
                    {{ option.name }}
                  </option>
                </select>
                  <!--<aty-select :disabled="readOnlyData" transfer class="npl_seleted fd-khyj-select"
                  v-model="scope.row.rzhz" :data="jyjcfSeleteList" @change="changeItem(scope,'rzhz')"></aty-select>-->
              </template>
            </aty-table-column>
            <aty-table-column prop="zgsj" label="遵规守纪">
              <template slot-scope="scope" v-if="jyjcfSeleteList.length">
                <select :disabled="readOnlyData" class="npl_seleted fd-khyj-select" v-model="scope.row.zgsj"
                        @change="changeItem(scope,'zgsj')">
                  <option v-for="option in jyjcfSeleteList" v-bind:value="option.code">
                    {{ option.name }}
                  </option>
                </select>
                  <!--<aty-select :disabled="readOnlyData" transfer class="npl_seleted fd-khyj-select"
                  v-model="scope.row.zgsj" :data="jyjcfSeleteList" @change="changeItem(scope,'zgsj')"></aty-select>-->
              </template>
            </aty-table-column>
            <aty-table-column prop="shws" label="生活卫生">
              <template slot-scope="scope" v-if="jyjcfSeleteList.length">
                <select :disabled="readOnlyData" class="npl_seleted fd-khyj-select" v-model="scope.row.shws"
                        @change="changeItem(scope,'shws')">
                  <option v-for="option in jyjcfSeleteList" v-bind:value="option.code">
                    {{ option.name }}
                  </option>
                </select>
                  <!--<aty-select :disabled="readOnlyData" transfer class="npl_seleted fd-khyj-select"
                  v-model="scope.row.shws" :data="jyjcfSeleteList" @change="changeItem(scope,'shws')"></aty-select>-->
              </template>
            </aty-table-column>
            <aty-table-column prop="jsjy" label="接受教育">
              <template slot-scope="scope" v-if="jyjcfSeleteList.length">
                <select :disabled="readOnlyData" class="npl_seleted fd-khyj-select" v-model="scope.row.jsjy"
                        @change="changeItem(scope,'jsjy')">
                  <option v-for="option in jyjcfSeleteList" v-bind:value="option.code">
                    {{ option.name }}
                  </option>
                </select>
                  <!--<aty-select :disabled="readOnlyData" transfer class="npl_seleted fd-khyj-select"
                  v-model="scope.row.jsjy" :data="jyjcfSeleteList" @change="changeItem(scope,'jsjy')" ></aty-select>-->
              </template>
            </aty-table-column>
            <aty-table-column prop="ldtd" label="劳动态度">
              <template slot-scope="scope" v-if="jyjcfSeleteList.length">
                <select :disabled="readOnlyData" class="npl_seleted fd-khyj-select" v-model="scope.row.ldtd"
                        @change="changeItem(scope,'ldtd')">
                  <option v-for="option in jyjcfSeleteList" v-bind:value="option.code">
                    {{ option.name }}
                  </option>
                </select>
                  <!--<aty-select :disabled="readOnlyData" transfer class="npl_seleted fd-khyj-select"
                  v-model="scope.row.ldtd" :data="jyjcfSeleteList" @change="changeItem(scope,'ldtd')"></aty-select>-->
              </template>
            </aty-table-column>
            <aty-table-column prop="lhwwj" label="联号无违纪">
              <template slot-scope="scope" v-if="jyjcfSeleteList.length">
                <select :disabled="readOnlyData" class="npl_seleted fd-khyj-select" v-model="scope.row.lhwwj"
                        @change="changeItem(scope,'lhwwj')">
                  <option v-for="option in jyjcfSeleteList" v-bind:value="option.code">
                    {{ option.name }}
                  </option>
                </select>
                  <!--<aty-select :disabled="readOnlyData" transfer class="npl_seleted fd-khyj-select"
                  v-model="scope.row.lhwwj" :data="jyjcfSeleteList" @change="changeItem(scope,'lhwwj')"></aty-select>-->
              </template>
            </aty-table-column>
            <aty-table-column prop="byjcf" label="本月基础分" class-name="lh">
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

          <!-- table區域 start -->
          <aty-table v-if="!view" @selection-change="selectionChange2" :pageable-data="tableData2" :exp-all="false" :exp-current-page="false" key="table2">
            <!-- <aty-table-column type="selection" width="45">
            </aty-table-column> -->
            <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
            </aty-table-column>
            <aty-table-column prop="bh" v-if="false" label="编号">
            </aty-table-column>
            <aty-table-column prop="hyjlBh" v-if="false" label="合议记录编号">
            </aty-table-column>
            <aty-table-column prop="zfBh" label="罪犯编号">
            </aty-table-column>
            <aty-table-column prop="zfxm" label="罪犯姓名">
              <!--<template slot-scope="props" >-->
                <!--<a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>-->
              <!--</template>-->
            </aty-table-column>
            <aty-table-column prop="corpName" label="监狱">
            </aty-table-column>
            <aty-table-column prop="deptName" label="监区">
            </aty-table-column>
            <aty-table-column prop="ywldnl" label="有无劳动能力" :formatter="ywlddl">
            </aty-table-column>
            <aty-table-column prop="szxz" label="小组">
            </aty-table-column>
            <aty-table-column prop="byjcf" label="基础分">
            </aty-table-column>
            <aty-table-column prop="jf" label="加分">
            </aty-table-column>
            <aty-table-column prop="kf" label="扣分">
            </aty-table-column>
            <aty-table-column prop="zxjf" label="专项加分">
            </aty-table-column>
            <aty-table-column prop="dxcf" label="单项处罚">
            </aty-table-column>
            <aty-table-column prop="hj" label="教育计分汇总">
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
      scrollheight:false,
      sftz:true,
      isLoading: false,
      showConfirm: false,
      tableData: [],
      tableData2: [],
      total: 10,
      limit: 200,
      offset: 1,
      limitOpts: [5, 10, 15, 20],

      breadcrumbdata: [
        {
          name: "月公示",
          href: ""
        },
        {
          name: "教育改造分",
          href: "/monthPublicity/educationScore"
        }
      ],
      // 教育基础分下拉列表
      jyjcfSeleteList: [],
      url:_zfxxDetail.url,
      searchArea: {
        nowDate: "",
        corpId: "",
        deptId: "",
        zfxm: "",
        zfbh: "",
        szxz: "",
        ywldnl: ""
      },
      right: {
        jygzfck: false, // 教育改造分查看
        jygzfbj: false // 教育改造分备注
      },
      view: true
    };
  },
  components: {
    confirmbox,
    loading,
    process
  },
  methods: {
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
     * 清除查询条件
     * @description 清除查询条件
     * @param {string} param 父组件值
     */
    clearSearch() {
      var _this = this;
      _this.searchArea.zfxm = "";
      _this.searchArea.zfbh = "";
      _this.searchArea.szxz = "";
      _this.searchArea.ywldnl = "";
    },
    /**
     * 获取父组件值
     * @description 考核名单列表接口
     * @param {string} param 父组件值
     */
    rowClassName: function(rowItem) {
      if (rowItem.row.bz == "训诫") {
        return "xunjie";
      }
      return "";
    },
    /**
     * 获取父组件值
     * @description 考核名单列表接口
     * @param {string} param 父组件值
     */
    initData(param) {
      var _this = this;
      _this.searchArea.nowDate = _this.khny;
      _this.searchArea.corpId = _this.corpObj.corpId;
      _this.searchArea.deptId = _this.deptObj.deptId;
      _this.getCurUser();
      _this.clickLoadEducationBaseScore();
    },
    //有无劳动能力,有无劳动定额
    ywlddl: function(row, column) {
      try {
        if (row == 2) {
          return "无";
        } else if (row == 1) {
          return "有";
        }
      } catch (e) {
        return "";
      }
    },
    /**
     * 计算本月基础分
     * @description 计算本月基础分
     * @param {string} item 当前行信息
     */
    caculateByjcf(item) {
      var obj = {};
      var score = 0;
      obj.jsjy = item.row.jsjy;
      obj.rzhz = item.row.rzhz;
      obj.ldtd = item.row.ldtd;
      obj.shws = item.row.shws;
      obj.zgsj = item.row.zgsj;
      obj.lhwwj = item.row.lhwwj;

      if (obj.jsjy == 0) {
        score += 0;
      } else {
        if (item.row.ywldnl != "2") {
          score += 6 + 3 * obj.jsjy;
        } else {
          score += 8 + 4 * obj.jsjy;
        }
      }

      if (obj.rzhz == 0) {
        score += 0;
      } else {
        if (item.row.ywldnl != "2") {
          score += 4 + 2 * obj.rzhz;
        } else {
          score += 8 + 4 * obj.rzhz;
        }
      }

      if (obj.ldtd == 0) {
        score += 0;
      } else {
        if (item.row.ywldnl != "2") {
          score += 4 + 2 * obj.ldtd;
        }
      }

      if (obj.shws == 0) {
        score += 0;
      } else {
        if (item.row.ywldnl != "2") {
          score += 4 + 2 * obj.shws;
        } else {
          score += 8 + 4 * obj.shws;
        }
      }

      if (obj.zgsj == 0) {
        score += 0;
      } else {
        if (item.row.ywldnl != "2") {
          score += 4 + 2 * obj.zgsj;
        } else {
          score += 8 + 4 * obj.zgsj;
        }
      }

      if (obj.lhwwj == 0) {
        score += 0;
      } else {
        if (item.row.ywldnl != "2") {
          score += 4 + 2 * obj.lhwwj;
        } else {
          score += 8 + 4 * obj.lhwwj;
        }
      }
      item.row.byjcf = score;
      return score;
    },
    /**
     * 改变下拉值
     * @param
     */
    changeItem(item,type) {
      var _this = this;
      var oldByjcf = item.row.byjcf;
      var score = _this.caculateByjcf(item);
      var params = {
        bh: item.row.bh,
        byjcf: score, // 本月基础分
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId // 监区，string类型
      };
      switch (type) {
        case "rzhz": {
          _this.$set(params,"rzhz",item.row.rzhz);
          break;
        }
        case "zgsj": {
          _this.$set(params,"zgsj",item.row.zgsj);
          break;
        }
        case "shws": {
          _this.$set(params,"shws",item.row.shws);
          break;
        }
        case "jsjy": {
          _this.$set(params,"jsjy",item.row.jsjy);
          break;
        }
        case "ldtd": {
          _this.$set(params,"ldtd",item.row.ldtd);
          break;
        }
        case "lhwwj": {
          _this.$set(params,"lhwwj",item.row.lhwwj);
          break;
        }
      }
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0041, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (!resp.data.JfkhJyjcf.sfcgbl) {
            item.row.rzhz = resp.data.JfkhJyjcf.rzhz;
            item.row.zgsj = resp.data.JfkhJyjcf.zgsj;
            item.row.shws = resp.data.JfkhJyjcf.shws;
            item.row.jsjy = resp.data.JfkhJyjcf.jsjy;
            item.row.ldtd = resp.data.JfkhJyjcf.ldtd;
            item.row.lhwwj = resp.data.JfkhJyjcf.lhwwj;
            item.row.byjcf = oldByjcf;
            Artery.message.info({
                content:"超过本项比例上限，请修改后重试",
                duration:3
            });
          }
        }
      });
    },
    /**
     * 改变可视区
     * @param {string} bh 编号
     */
    changeView(flag) {
      var _this = this;
      _this.view = flag;
      _this.clearSearch();
      if (flag) {
        _this.clickLoadEducationBaseScore();
      } else {
        _this.clickLoadEducationChangeScore();
      }
    },
    /**
     * 改变可视区
     * @param {string} bh 编号
     */
    changeSearch(flag) {
      var _this = this;
      _this.view = flag;
      if (flag) {
        _this.clickLoadEducationBaseScore();
      } else {
        _this.clickLoadEducationChangeScore();
      }
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
     * 点击加载教育基础分
     * @param {string} bh 编号
     */
    clickLoadEducationBaseScore() {
      var _this = this;
      _this.tableData=[];
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
        zfBh: _this.searchArea.zfbh, // 罪犯编号,string类型
        szxz: _this.searchArea.szxz, // 小组,string类型
        ywldnl: _this.searchArea.ywldnl, // 有无劳动能力,string类型
        pageNum: _this.offset,
        pageSize: _this.limit
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0042, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.tableData = resp.data.Page;
          this.$nextTick(function(){
               _this.getheight()
            })
        } else {
        }
      });
    },
    /**
     * 点击加载教育改造分汇总
     * @param {string} bh 编号
     */
    clickLoadEducationChangeScore() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        zfxm: _this.searchArea.zfxm, // 罪犯姓名，string类型
        zfbh: _this.searchArea.zfbh, // 罪犯编号,string类型
        szxz: _this.searchArea.szxz, // 小组,string类型
        ywldnl: _this.searchArea.ywldnl, // 有无劳动能力,string类型
        pageNum: _this.offset,
        pageSize: _this.limit
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0043, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          _this.tableData2 = resp.data.ArrayList;
          this.$nextTick(function(){
               _this.getheight()
            })
        } else {
        }
      });
    },
    /**
     * 点击打印操作
     * @param {string} bh 编号
     */
    clickPrint() {
    },
    /**
     * 点击导出操作
     * @param {string} bh 编号
     */
    clickExport() {
      var _this = this;
      if (_this.view) {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId // 监区，string类型
        };
        let url =
          _server.serverName+
          _this.apis.api0046 +
          "?khny=" +
          params.khny +
          "&corp=" +
          params.corp +
          "&dept=" +
          params.dept;
        window.location.href = url;
      } else {
        var params = {
          khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
          corp: _this.searchArea.corpId, // 监狱，string类型，必须
          dept: _this.searchArea.deptId // 监区，string类型
        };
        let url =
          _server.serverName +
          _this.apis.api0047 +
          "?khny=" +
          params.khny +
          "&corp=" +
          params.corp +
          "&dept=" +
          params.dept +
          "&zfxm=" +
          this.searchArea.zfxm +
          "&zfbh=" +
          this.searchArea.zfbh +
          "&szxz=" +
          this.searchArea.szxz +
          "&ywldnl=" +
          this.searchArea.ywldnl;
        //let url = "/hcf"+_this.apis.api0031+"?khny="+params.khny+"&corp="+params.corp+"&dept="+params.dept+"&zfxm="+params.zfxm+"&zfbh="+params.zfbh+"&szxz="+params.szxz+"&gz="+params.gz;
        window.location.href = url;
      }
    },
    /**
     * 点击生成月评表操作
     * @param {string} bh 编号
     */
    clickCreate() {
      var _this = this;
      var params = {
        khny: _this.searchArea.nowDate, // 考核年月，date类型，必须
        corp: _this.searchArea.corpId, // 监狱，string类型，必须
        dept: _this.searchArea.deptId, // 监区，string类型
        sfzzjyjcf: "1"
      };
      _this.isLoading = true;
      _this.postRequest(_this.apis.api0045, params).then(resp => {
        _this.isLoading = false;
        if (resp && resp.status == 200) {
          if (!resp.data.Boolean) {
            Artery.message.info({
                content:"未完成劳动改造分汇总，完成后才可进行月初审",
                duration:3
            });
          } else {
            Artery.message.success("月初审表生成成功");
            _this.$router.push({ path: "/monthPublicity/monthFirstInstance" });
          }
        }
      });
    },
    /**
     * 点击查询操作
     * @param {string} bh 编号
     */
    clickSearch() {
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = localStorage.getItem(_jfkh.curUserInfo);
      let rightList = JSON.parse(curUserInfo).userRightList;
      _this.right.jygzfck = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.jygzf.ck",
        rightList
      );
      _this.right.jygzfbj = _this.checkLinkShow(
        "jy.imp.jfkh.ygs.jygzf.bj",
        rightList
      );
    }
  },
  computed: {
    ...mapGetters(["khny", "deptObj", "corpObj", "hasReject", "processState"]),
    buttonShow() {
      var _this = this;
      if (_this.right.jygzfbj) {
        if (!_this.view) {
          if (_this.processState.sfwcyhz == "1") {
            if (_this.processState.pysfth == "1") {
              return true
            }else{
              return false
            }
          } else if (_this.processState.sfwcyhz == "2") {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    },
    readOnlyData() {
      var _this = this;
      if (_this.right.jygzfbj) {
        // 有编辑权限
        if (_this.processState.sfwcyhz == "2") {
          // 未完成月汇总
          return false;
        } else if (_this.processState.sfwcyhz == "1") {
          // 已完成月汇总
          if (_this.processState.pysfth == "1") {
            // 退回
            return false;
          } else {
            // 没退回
            return true;
          }
        } else {
          return true;
        }
      } else {
        // 无编辑权限
        return true;
      }
    },
    ywldnlList() {
      // 取消基础分
      var _this = this;
      var list = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))[
        "30100001"
      ];
      for (var i = 0, len = list.length; i < len; i++) {
        if (list[i].name == "是") {
          list[i].name = "有";
        }
        if (list[i].name == "否") {
          list[i].name = "无";
        }
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
      if (_this.view) {
        return str + "教育基础分";
      } else {
        return str + "教育改造分汇总";
      }
    }
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
    khny(curVal, oldVal) {
      var _this = this;
      if (oldVal == "") {
        return;
      }
      if (curVal !== oldVal) {
        _this.searchArea.nowDate = _this.khny;
        if (_this.view) {
          _this.clickLoadEducationBaseScore();
        } else {
          _this.clickLoadEducationChangeScore();
        }
      }
    },
    deptObj(curVal, oldVal) {
      var _this = this;
      if (oldVal == "") {
        return;
      }
      if (curVal !== oldVal) {
        _this.searchArea.deptId = _this.deptObj.deptId;
        if (_this.view) {
          _this.clickLoadEducationBaseScore();
        } else {
          _this.clickLoadEducationChangeScore();
        }
      }
    },
    corpObj(curVal, oldVal) {
      var _this = this;
      if (oldVal == "") {
        return;
      }
      if (curVal !== oldVal) {
        _this.searchArea.corpId = _this.corpObj.corpId;
        if (_this.view) {
          _this.clickLoadEducationBaseScore();
        } else {
          _this.clickLoadEducationChangeScore();
        }
      }
    }
  },
  created() {
    this.sftz = this.$route.query.sftz;
    var _this = this;
    for (var i = 0; i < 4; i++) {
      var key = _sigleCode.jyjcf + i.toString();
      var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      var params = {
        code: i.toString(),
        name: value.name
      };
      _this.jyjcfSeleteList.push(params);
    }
  },
  mounted() {
    var _this = this;
    setTimeout(function() {
      _this.initData();
      // TODO 时序问题 需要等头部加载完成后在进行初始化
    }, 1000);
  }
};
</script>
<style scoped>
.fd-jygzf-box .fd-gzf-inner {
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
  margin-bottom: 10px;
}
.npl_seleted{
  min-height: 30px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dddee1;
  width: 100%;
  color: #657180;
  font-size: 12px;
}
</style>
