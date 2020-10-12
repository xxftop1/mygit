<template>
    <!-- 内容部分start -->
    <div class="main_area  fd-home-wrap">
      <div class="main_name">历史数据</div>
        <div class="main_box fd-lssj-box">
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
              <aty-col span="6" class="search_option_marginb search_option_textr">
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
            <div class="dr_edit_butn">
              <aty-button @click="downList()" class="dr_edit_b1 fd-btn-load" type="primary">
                下载样表
              </aty-button>
              <aty-upload v-show="checkButtonShow('jy.imp.jfkh.lssjdr')" class="npl_upload" :action="uploadUrl()"
                          :before-upload="handleUpload">
                <aty-button class="fd-btn-import" type="primary">
                  导入历史数据
                </aty-button>
              </aty-upload>
              <aty-text v-show="checkButtonShow('jy.imp.jfkh.lssjdr')" class="info">
                <aty-icon type="information-circled" size="26" color="#fc552e"></aty-icon>
                注：不在本监区（分监区）的罪犯不支持导入
              </aty-text>
            </div>
            <div class="fd-lssj-scroll">
              <aty-scroll :speed="53" class="aty-scroll-3" ref="scroll" :show="true"  @scrolltolower="scrolltolower">
              <!-- table區域 start -->
              <aty-table
                :pageable-data="tableData"
                style="width: 100%;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column
                  prop="xm"
                  label="姓名"
                  width="100">
                </aty-table-column>
                <aty-table-column
                  prop="zfbh"
                  label="罪犯编号">
                </aty-table-column>
                <aty-table-column
                  prop="jlzqksnf"
                  label="奖励周期开始年份"  width="140">
                </aty-table-column>
                <aty-table-column
                  prop="jlzqksyf"
                  label="奖励周期开始月份" width="140">
                </aty-table-column>
                <aty-table-column
                  prop="jygzf"
                  label="教育改造分">
                </aty-table-column>
                <aty-table-column
                  prop="ldgzf"
                  label="劳动改造分"
                  width="140">
                </aty-table-column>
                <aty-table-column
                  prop="ljf"
                  label="总分">
                </aty-table-column>
                <aty-table-column
                  prop="ljkf"
                  label="总扣分">
                </aty-table-column>
                <aty-table-column
                  prop="dczgkf"
                  label="单次最高扣分"
                   width="100"
                  >
                </aty-table-column>
                <aty-table-column
                  prop="xbygs"
                  label="现表扬个数"
                  width="120">
                </aty-table-column>
                <aty-table-column
                  prop="xwzjlgs"
                  label="现物质奖励个数"
                  width="130">
                </aty-table-column>
                <aty-table-column
                  prop="yf"
                  label="余分"
                  width="90">
                </aty-table-column>
              </aty-table>
              <!-- table區域 end -->
              <div class="fd-loading" v-show="loading">
                  数据加载中...
              </div>
              <!-- 分页 start -->
              <aty-row class="fd-category"  v-show="false">
              <aty-row>
                  <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                                  :show-elevator="true" @change="changePage" ref="lssjPage"></aty-pagination>
              </aty-row>
              </aty-row>
              <!-- 分页 end -->
              </aty-scroll>
            </div>
          </div>
        </div>
        <!-- 内容部分end -->
        <!-- 导入历史数据 确认弹窗 -->
        <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="butnClick"></confirmbox>
        <!-- loading -->
        <loading :isLoading="isLoading"></loading>
    </div>
</template>

<script>
  import confirmbox from '../confirmBox/confirmBox.vue'
  import loading from '../base/loading'
  export default {
    data: function () {
      return {
        xm:"",
        zfbh:"",
        //历史数据导入按钮权限默认展示
        lssjdrShow:false,
        // table数据
        tableData: [],
        // 弹出确认框 是否显示
        showConfirm: false,
        // 弹出确认框 文字
        confirmtext: "系统会以本次导入的罪犯数据为准，请认真核对数据，以免造成错误",
        upFile: "",
        isLoading: false,
        total:0,
        offset:0,
        limit:20,
        loading:false
      };
    },
    components: {
      confirmbox:confirmbox,
      loading:loading
    },
    created() {
      this.lssjdrShow = this.checkButtonShow("jy.imp.jfkh.rjz.lssjdr");
      this.queryDataList(1,this.limit);
    },
    mounted() {
    },
    watch:{
      tableData:function(){
        this.$nextTick(function(){
          this.$refs.scroll.update()
        })
      }
    },
    methods: {
      // 查询按钮
      goReset(pageNum, pageSize) {
        let _this = this;
        if (_this.xm == "" && _this.zfbh == "") {
          return;
        }
        _this.xm = "";
        _this.zfbh = "";
        _this.queryDataList(pageNum, pageSize);
      },
      scrolltolower(top, left, scrollbar){
        var _this = this;
        if (_this.loading) {
          return false;
        }
        _this.loading = true;
        scrollbar.update(top + 60, left)
        if(_this.$refs.lssjPage.currentPage!==_this.$refs.lssjPage.allPages){
          _this.$refs.lssjPage.currentPage++
          var pageNum = _this.$refs.lssjPage.currentPage
          var pageSize = _this.$refs.lssjPage.currentPageSize
          _this.postRequest(
            "/api/v1/lssjdr/getPageLssjList/"+ pageNum + "/" + pageSize
          ).then(resp => {
            if (resp && resp.status == 200) {
              _this.tableData = _this.tableData.concat(resp.data.list)
              _this.loading = false
            }
          });
        }else{
          _this.loading = false;
          return
        }
    },
    //换页
    changePage() {
      let _this = this;
      _this.limit=this.$refs.lssjPage.currentPageSize;
      _this.offset=this.$refs.lssjPage.currentPage;
      _this.queryDataList(_this.offset, _this.limit)
    },
      //条件查询方法
      queryDataList(pageNum,pageSize) {
        let _this = this;
        _this.isLoading=true;
        var param = {
          xm:_this.xm,
          zfbh:_this.zfbh
        }
        _this.postRequest("/api/v1/lssjdr/getPageLssjList/" + pageNum + "/" + pageSize,param)
          .then(resp => {
          if (resp && resp.status == 200) {
            _this.tableData = resp.data.list;
            _this.total = resp.data.total;
          }else{
            Artery.message.info({
              content:"加载历史数据出错！",
              duration:3
            });
          }
            _this.isLoading=false;
        });
      },
      // 下载样表
      downList() {
        window.location.href = "/jfkh/api/v1/lssjdr/downloadFile"
      },
      // 文件导入
      uploadUrl() {
        return "/jfkh/api/v1/lssjdr/incLssj";
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
          this.postRequest("/api/v1/lssjdr/incLssj",formData).then(resp => {
            if (resp && resp.status == 200) {
              Artery.message.success({
                content: "导入成功,共导入" + resp.data.count + "条数据",
                duration: 3
              });
              if(resp.data.hasOwnProperty("msg") && resp.data.msg != null && resp.data.msg != "") {
                Artery.notice.warning({
                  title: '导入数据警告!',
                  desc: resp.data.msg,
                  duration: 0
                });
              }
            } else if(resp && resp.status == 202) {
              Artery.notice.warning({
                title: '导入数据警告!',
                desc: resp.data,
                duration: 0
              });
            }
            this.queryDataList(1,_this.limit);
            this.isLoading = false;
          });
        }else{
          // 取消按钮
          this.showConfirm = false;
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
  .info{
    color:#fc552e;
  }
  .info *{
    vertical-align: middle;
  }
  .fd-lssj-scroll .aty-scroll,
  .tabs_main_box{
    height:100%;
  }
  .fd-lssj-scroll{
    height:calc(100% - 46px);
  }
  .search_option_box .aty-input {
    height: 34px;
  }
  .search_option_box .search_option_text {
    display: inline-block;
    width: 21%;
    text-align: center;
  }
  .search_option_input {
    width: 77%;
  }
  .search_option_marginb {
    margin-bottom: 21px;
    padding-left: 20px;
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

  .npl_upload {
    display: inline-block;
    margin-right: 5px;
  }
  .npl_upload button {
    height: 30px;
    line-height: 17px;
    font-size: 14px;
    background-color: #00ccbb;
    border-color: #00ccbb;
  }
  .tabs_main_box>.dr_edit_butn{
    padding-bottom:20px;
  }
</style>

