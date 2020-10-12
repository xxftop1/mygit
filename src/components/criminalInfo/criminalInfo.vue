<template>

  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name">罪犯信息维护</div>
     <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
      <div class="main_box">
        <div class="tabs_main_box">
          <aty-row class="search_option_box mg-20">
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">罪犯姓名:</p>
              <aty-input v-model="xm" class="search_option_input" clearable></aty-input>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">罪犯编号:</p>
              <aty-input v-model="zfbh" class="search_option_input" clearable></aty-input>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb search_option_textr">
              <aty-button @click="queryDataList(1,limit)" class="search_option_butn1" type="primary">
                <i>
                  <img src="../../assets/images/w-png17.png">
                </i>
                <span>查询</span>
              </aty-button>
              <aty-button @click="goReset(1,limit)" class="search_option_butn2" type="default">
                <i>
                  <img src="../../assets/images/w-png18.png">
                </i>
                <span>重置</span>
              </aty-button>
            </aty-col>
          </aty-row>
          <aty-row class="search_option_box mgt0 mg-20">
            <aty-col  span="4" style="margin-bottom: 0px;" class="search_option_marginb search_option_textr">
              <aty-upload  class="npl_upload fl" :action="exportZfxx()" :before-upload="handleUpload">
                <aty-button class="fd-btn-import" type="primary">
                  <span>导入</span>
                </aty-button>
              </aty-upload>
              <aty-button class="fd-btn-load fl mal15" type="primary" @click="downloadYb">
                <span>样表下载</span>
              </aty-button>
            </aty-col>
          </aty-row>
          <!-- table區域 start -->
          <aty-table
            :pageable-data="tableData"
            style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
            <aty-table-column
              type="index"
              label="序号"
              width="50"  :showOverflowTooltip="false">
            </aty-table-column>
            <aty-table-column
              prop="xm"
              label="罪犯姓名">
            </aty-table-column>
            <aty-table-column
              prop="zfbh"
              label="罪犯编号"
            >
            </aty-table-column>
            <aty-table-column
              prop="zt"
              label="状态"
              width="80" :formatter="zfkhzt">
            </aty-table-column>
            <aty-table-column
              prop="gz"
              label="工种"
              width="150">
            </aty-table-column>
            <aty-table-column
              prop="ldxz"
              label="劳动小组"
              width="150">
            </aty-table-column>
            <aty-table-column
              prop="ywldnl"
              label="有无劳动能力"
              width="140" :formatter="ywlddl">
            </aty-table-column>
            <aty-table-column
              prop="ywldde"
              label="有无劳动定额"
              width="140" :formatter="ywlddl">
            </aty-table-column>
            <aty-table-column
              prop="sfgjjsgw"
              label="是否关键技术岗位"
              width="150" :formatter="sf">
            </aty-table-column>
            <aty-table-column
              label="操作"
              width="100"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <i>
                  <img @click="goEdit(scope)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png">
                  <img @click="goDlete(scope)" v-if="false" title="删除" class="table_butn" src="../../assets/images/w-png23.png">
                </i>
              </template>
            </aty-table-column>
          </aty-table>
          <!--<div class="fd-loading" v-show="loading">-->
          <!--数据加载中...-->
          <!--</div>-->
          <!-- table區域 end -->
          <!-- 分页 start -->
          <aty-row class="fd-category">
            <aty-row>
              <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                              :show-elevator="true" @change="changePage" ref="zfxxPage"></aty-pagination>
            </aty-row>
          </aty-row>
          <!-- 分页 end -->
        </div>
      </div>
     </happy-scroll>
    <!-- </aty-scroll> -->
    <!-- 编辑 弹窗 -->
    <aty-modal class="rl_pop_box" ref="modalWidiow1" width="650px" closable="" :mask-closable="false">
      <div class="pop_title">罪犯信息维护({{criminalName}},{{criminalNum}})</div>
      <div class="pop_main_box">
        <aty-form  :label-width="120" ref="form">
          <aty-row>
            <aty-col :span="12">
              <aty-select label="状态" class="ci_pop_width aty-form-item-required" v-model="zt" :data="ztList" @change="ztChange"></aty-select>
            </aty-col>
            <aty-col :span="12">
              <aty-date-picker class="ci_pop_width aty-form-item-required" label ="生效日期" type="date" name="ztSxrq" v-model="ztSxrq"></aty-date-picker>
            </aty-col>
          </aty-row>
          <aty-row>
            <aty-col :span="12">
              <aty-input label="工种" :max="20" v-model="gz"></aty-input>
            </aty-col>
            <aty-col :span="12">
              <aty-input label="劳动小组" :max="5" v-model="ldxz"></aty-input>
            </aty-col>
          </aty-row>
          <aty-row>
            <aty-col class="ci_text_left" :span="12">
              <aty-radio-group  label="有无劳动能力" name="ywldnl" v-model="ywldnl" :data-list="ywRadioGroup" @change="ywldnlChange"></aty-radio-group>
            </aty-col>
            <aty-col :span="12">
              <aty-date-picker class="ci_pop_width aty-form-item-required" label ="生效日期" type="date" name="ywldnlSxrq" v-model="ywldnlSxrq" @change="ywldsxrqChange"></aty-date-picker>
            </aty-col>
          </aty-row>
          <aty-row v-if="ywlddeShow">
            <aty-col class="ci_text_left" :span="12">
              <aty-radio-group label="有无劳动定额" name="ywldde" v-model="ywldde" :data-list="ywRadioGroup" @change="ywlddeChange"></aty-radio-group>
            </aty-col>
            <aty-col :span="12">
              <aty-date-picker class="ci_pop_width aty-form-item-required" label ="生效日期" type="date" name="ywlddeSxrq" v-model="ywlddeSxrq"></aty-date-picker>
            </aty-col>
          </aty-row>
          <aty-row v-if="jsgwShow">
            <aty-col class="ci_text_left" :span="12">
              <aty-radio-group label="是否关键技术岗位" name="sfgjjsgw" v-model="sfgjjsgw" :data-list="sfRadioGroup" @change="jsgwChange"></aty-radio-group>
            </aty-col>
            <aty-col :span="12">
              <aty-date-picker class="ci_pop_width aty-form-item-required" label ="生效日期" type="month" name="sfgjjsgwSxrq" v-model="sfgjjsgwSxrq"></aty-date-picker>
            </aty-col>
          </aty-row>
        </aty-form>
        <div class="drw_save_butn">
          <aty-button @click="saveButn()" class="search_option_butn1" type="primary">
            <i>
              <img src="../../assets/images/save.png">
            </i>
            <span>保存</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <!-- 编辑 弹窗 -->
    <!-- 导入数据 确认弹窗 -->
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="butnClick"></confirmbox>
    <!-- loading -->
    <loading :isLoading="isLoading"></loading>
  </div>
  <!-- 内容部分end -->
</template>

<script>
  import confirmbox from '../confirmBox/confirmBox.vue'
  import loading from '../base/loading'
  export default {
    data: function() {
      return {
        ldxz:"",//劳动小组
        // table数据
        tableData: [],
        offset: 1,
        // 罪犯姓名
        xm: "",
        // 罪犯编号
        zfbh: "",
        limit: 10,
        total: 0,
        offget: 1,
        treeValue: "",
        valueobject: {},
        treeValue2: "",
        valueobject2: {},
        // 弹窗
        criminalName: "",
        criminalNum: "",
        ztSxrq: new Date(),
        zt: "",
        gz: "",
        ywldnl: "",
        ywldnlSxrq: new Date(),
        ywldde: "",
        ywlddeSxrq: new Date(),
        sfgjjsgw: "2",
        sfgjjsgwSxrq: new Date(),
        ztList: [
        ],
        //有无单选
        ywRadioGroup: [
          {
            code: "2",
            codeType: "radioGroup",
            name: "无"
          },
          {
            code: "1",
            codeType: "radioGroup",
            name: "有"
          }
        ],
        //是否单选
        sfRadioGroup: [
          {
            code: "2",
            codeType: "radioGroup",
            name: "否"
          },
          {
            code: "1",
            codeType: "radioGroup",
            name: "是"
          }
        ],
        // 是否必填
        ztDateMust: false,
        jsgwDateMust: false,

        ywlddeDateMust: false,
        ywldnlDateMust: false,
        // 有无劳动定额是否展示
        ywlddeShow: false,
        // 是否关键技术岗位是否展示
        jsgwShow: false,
        curUserInfo: {},
        options1: {
          disabledDate: function(date) {
            return date && date.valueOf() <= Date.now();
          }
        },
        // 弹出确认框 是否显示
        showConfirm: false,
        // 弹出确认框 文字
        confirmtext: "系统会以本次导入的罪犯数据为准，请认真核对数据，以免造成错误",
        upFile: "",
        isLoading: false,
      };
    },
    components: {
      confirmbox:confirmbox,
      loading:loading
    },
    created() {
      this.getCurUserInfo();
      this.initData(1, this.limit);
      this.getZfkhzt();
    },
    watch:{
      tableData:function(){
        // this.$nextTick(function(){
        //   this.$refs.scroll.update()
        // })
      }
    },
    mounted() {},
    methods: {
      getCurUserInfo() {
        this.curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      },
      getZfkhzt() {
        var codeType =  JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList));
        if(codeType != null){
            var code = _sigleCode.zfkhztCodeType;
            this.ztList = codeType[code];
        }
      },
      //换页
      changePage(pageSize) {
        let _this = this;
        _this.limit=this.$refs.zfxxPage.currentPageSize;
        _this.offset=this.$refs.zfxxPage.currentPage;
        this.queryDataList(_this.offset,_this.limit);
      },
      //初始化查询方法
      initData(pageNum, pageSize) {
        this.queryDataList(pageNum, pageSize);
      },
      //条件查询方法
      queryDataList(pageNum, pageSize) {
        this.offset = (pageNum - 1) * pageSize;
        // 调取查询接口
        var params = {
          xm: this.xm,
          zfbh: this.zfbh,
          dept: this.curUserInfo.deptId
        };
        this.postRequest(
          "/api/v1/zfxxwh/queryZfxx/" + pageNum + "/" + pageSize,
          params
        ).then(resp => {
          if (resp && resp.status == 200) {
            this.tableData = resp.data.list;
            this.total = resp.data.total;
          }
        });
      },
      // 格式化时间
      dateFormat(date, type) {
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = "";
        if (type === "yyyy-MM") {
          currentdate = date.getFullYear() + seperator1 + month;
        } else {
          currentdate =
            date.getFullYear() + seperator1 + month + seperator1 + strDate;
        }
        return currentdate;
      },
      //判断当前对象是否为Date类型
      checkIsDateType(obj) {
        if (obj && obj instanceof Date) {
          return true;
        }
        return false;
      },
      // 编辑跳转到编辑页面
      goEdit(item) {
        // var row = item.row;
        // this.$router.push({path: '/editCriminalInfo',query:{edit:'edit',row:row}});
        this.bh = item.row.bh;
        this.criminalName = item.row.xm;
        this.criminalNum = item.row.zfbh;
        this.zt = item.row.zt;
        this.gz = item.row.gz== undefined?"":item.row.gz;
        this.ywldnl = item.row.ywldnl== undefined?"":item.row.ywldnl;
        this.ldxz = item.row.ldxz == undefined?"":item.row.ldxz;
        if (this.ywldnl == "1") {
          this.ywlddeShow = true;
        }else{
          this.ywlddeShow = false;
        }
        this.ywldde = item.row.ywldde== undefined?"":item.row.ywldde;
        if (this.ywldde == "2") {
          this.jsgwShow = true;
          this.sfgjjsgw = true;
        }else{
          this.jsgwShow = false;
          this.sfgjjsgw = false;
        }
        this.sfgjjsgw = item.row.sfgjjsgw== undefined?"":item.row.sfgjjsgw;
        this.ztSxrq = item.row.ztSxrq;
        this.ywldnlSxrq = item.row.ywldnlSxrq;
        this.ywlddeSxrq = item.row.ywlddeSxrq;
        this.sfgjjsgwSxrq = item.row.sfgjjsgwSxrq;
        this.$refs.modalWidiow1.open();
      },
      // 删除按钮
      goDlete(item) {
        let _this = this;
        var bh = item.row.bh;
        var pageNum = this.offset;
        var pageSize = this.limit;
        this.deleteRequest("/api/v1/jkftzd/jkfDelete/" + bh).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("删除成功");
            this.queryDataList(pageNum, this.limit);
          } else {
            Artery.message.error({
              content:'删除失败',
              duration:3
            });
          }
        });
      },
      // 查询按钮
      goReset(pageNum, pageSize) {
        let _this = this;
        if (this.xm == "" && this.zfbh == "") {
          return;
        }
        this.xm = "";
        this.zfbh = "";
        this.queryDataList(pageNum, pageSize);
      },
      //保存按钮
      saveButn() {
        let _this = this;
        // 保存前校验
        if (_this.zt == "" || _this.zt == null) {
          Artery.message.error({
            content:'状态不能为空',
            duration:3
          });
          return;
        }
        if(_this.zt != null && _this.zt != "") {
          _this.ztDateMust = true;
        } else {
          _this.ztDateMust = false;
        }
        if (_this.ztDateMust && (_this.ztSxrq == "" || _this.ztSxrq == null)) {
          Artery.message.error({
             content:'状态生效日期不能为空',
             duration:3
          });
          return;
        }
        //判断生效日期前必须先判断有无劳动能力是否有值
        if (_this.ywldnlDateMust && (_this.ywldnlSxrq == "" || _this.ywldnlSxrq == null)) {
            Artery.message.error({
              content:'有无劳动能力生效日期不能为空',
              duration:3
            });
          return;
        }
        if (_this.ywlddeDateMust && (_this.ywlddeSxrq == "" || _this.ywlddeSxrq == null)) {
          Artery.message.error({
              content:'有无劳动定额生效日期不能为空',
              duration:3
          });
          return;
        }
        if (_this.jsgwDateMust && (_this.sfgjjsgwSxrq == "" || _this.sfgjjsgwSxrq == null)) {
          Artery.message.error({
              content:'是否关键技术岗位生效日期不能为空',
              duration:3
          });
          return;
        }
        if (_this.gz && _this.gz != "" && _this.gz.length > 20) {
          Artery.message.error({
              content:'工种不能超过20个字',
              duration:3
          });
          return;
        }
        if (_this.ldxz && _this.ldxz != "" && _this.ldxz.length > 5) {
          Artery.message.error({
              content:'劳动小组值是五位非负数',
              duration:3
          });
          return;
        }
        var ztSxrqStr = _this.ztSxrq;
        if (_this.checkIsDateType(_this.ztSxrq)) {
          ztSxrqStr = _this.dateFormat(_this.ztSxrq);
        }
        var ywldnlSxrqStr = _this.ywldnlSxrq;
        if (_this.checkIsDateType(_this.ywldnlSxrq)) {
          ywldnlSxrqStr = _this.dateFormat(_this.ywldnlSxrq);
        }
        var ywlddeSxrqStr = _this.ywlddeSxrq;
        if (_this.checkIsDateType(_this.ywlddeSxrq)) {
          ywlddeSxrqStr = _this.dateFormat(_this.ywlddeSxrq);
        }
        var sfgjjsgwSxrqStr = _this.sfgjjsgwSxrq;
        if (_this.checkIsDateType(_this.sfgjjsgwSxrq)) {
          sfgjjsgwSxrqStr = _this.dateFormat(_this.sfgjjsgwSxrq, "yyyy-MM");
        }
        var params = {
          bh: _this.bh,
          zt: _this.zt,
          gz: _this.gz,
          ldxz: _this.ldxz,
          ywldnl: _this.ywldnl,
          ywldde: _this.ywldde,
          sfgjjsgw: _this.sfgjjsgw,
          ztSxrqStr: ztSxrqStr,
          ywldnlSxrqStr: ywldnlSxrqStr,
          ywlddeSxrqStr: ywlddeSxrqStr,
          sfgjjsgwSxrqStr: _this.sfgjjsgwSxrq
        };
        _this.putRequest("/api/v1/zfxxwh/updateZfxx/", params).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("保存成功");
            _this.$refs.modalWidiow1.close();
            _this.queryDataList(_this.offget, _this.limit);
          } else {
            Artery.message.error({
                content:'保存失败',
                duration:3
            });
          }
        });
      },
      // 状态改变
      ztChange(value) {
        if (value !="" && value !=null) {
          this.ztDateMust = true;
        } else {
          this.ztDateMust = false;
        }
      },
      //有无劳动生效日期改变
      ywldsxrqChange (value) {
        if (value != "" && value != null) {
          if (this.ywldnl =="" || this.ywldnl ==null) {
            Artery.message.info({
              content:'请先选择有无劳动能力',
              duration:3
            });
            this.ywldnlSxrq ="";
          }
        }
      },
      // 有无劳动能力改变
      ywldnlChange() {
        if (this.ywldnl !="" && this.ywldnl !=null) {
          this.ywldnlDateMust = true;
        }
        if (this.ywldnl == "1") {
          this.ywlddeShow = true;
          if(this.ywldde == "" || this.ywldde == null) {
            this.ywldde = "1";
          }
          this.jsgwShow = true;
        } else if (this.ywldnl == "2") {
          this.ywldde = "";
          this.sfgjjsgw = "";
          this.ywlddeShow = false;
          this.jsgwShow = false;
          this.ywlddeDateMust =false;
          this.jsgwDateMust = false;

        }
      },
      // 有无劳动定额改变
      ywlddeChange() {
        if (this.ywldde !="" && this.ywldde !=null) {
          this.ywlddeDateMust = true;
        }
        if (this.ywldde == "2") {
          this.jsgwShow = true;
          this.sfgjjsgw = "1";
        } else if (this.ywldde == "1") {
          this.sfgjjsgw = "";
          this.jsgwShow = false;
          this.jsgwDateMust = false;
        }
      },
      // 技术岗位改变
      jsgwChange() {
        if (this.sfgjjsgw !="" && this.sfgjjsgw !=null) {
          this.jsgwDateMust = true;
        }
      },

      //考核项目转义
      zfkhzt: function(row, column) {
        var key = _sigleCode.ZFKHZT + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
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
      //是否关键技术岗位
      sf: function(row, column) {
        try {
          if (row == 2) {
            return "否";
          } else if (row == 1) {
            return "是";
          }
        } catch (e) {
          return "";
        }
      },
      //导入罪犯信息
      exportZfxx() {
        return "/jfkh/api/v1/zfxxwh/exportZfxx";
      },
      //样表下载
      downloadYb() {
        window.location.href = "/jfkh/api/v1/zfxxwh/downLoadUrl"
      },
      // 关闭确认提示框
      butnClick(item) {
        this.isLoading = true;
        let _this = this;
        if(item){
          // 确认按钮
          this.showConfirm = false;
          // 调取后台上传文件接口
          let formData = new FormData();
          formData.append("file", this.upFile);
          this.postRequest("/api/v1/zfxxwh/exportZfxx",formData).then(resp => {
            if (resp && resp.status == 200) {
              Artery.message.success("导入成功");
              this.isLoading = false;
              this.queryDataList(1,_this.limit);
            } else if(resp && resp.status == 202) {
              Artery.notice.warning({
                title: '导入数据警告!',
                desc: resp.data,
                duration: 0
              });
              this.isLoading = false;
              this.queryDataList(1,_this.limit);
            }
          });
        }else{
          // 取消按钮
          this.showConfirm = false;
          this.isLoading = false;
        }
      },
      handleUpload(item) {
        this.showConfirm = true;
        this.upFile = item;
        return false;
      }
    }
  };
</script>
<style scoped>
  .search_option_box .aty-input {
    height: 34px;
  }
  .search_option_box .search_option_text {
    display: inline-block;
    width: 21%;
    text-align: center;
  }
  .search_option_box .aty-date-picker {
    width: 77%;
  }
  .search_option_input {
    width: 77%;
  }
  .search_option_marginb {
    margin-bottom: 21px;
    padding-left: 20px;
  }
  .search_option_butn_text {
    float: left;
    margin-left: 7px;
  }
  .search_option_butn1 {
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding-top: 0px;
    padding-bottom: 0px;
    background-color: #188aff;
    border-color: #188aff;
    font-size: 14px;
  }
  .search_option_butn1 img {
    margin-top: -3px;
  }
  .search_option_butn2 {
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding-top: 0px;
    padding-bottom: 0px;
    background-color: #f9fafc;
    border-color: #188aff;
    margin-left: 11px;
    color: #188aff;
    font-size: 14px;
  }
  .search_option_butn2 img {
    margin-top: -3px;
  }
  .search_option_textr {
    text-align: left;
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

  .table_butn {
    margin: 0 4px;
    cursor: pointer;
  }
  /* 弹出框样式 */
  .pop_title {
    width: 100%;
    height: 55px;
    background-color: #188aff;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    font-size: 16px;
    color: #fff;
    line-height: 55px;
    text-indent: 15px;
  }
  .pop_main_box {
    padding: 20px 20px;
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .drw_save_butn {
    text-align: center;
    margin-top: 10px;
  }
  .aty-form-item-required .aty-form-item-label:before {
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #f60;
}
</style>

