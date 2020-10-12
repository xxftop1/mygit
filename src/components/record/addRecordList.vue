<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name"><aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
    <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
    <div class="main_box">
      <aty-row class="search_panel xzbj-btn" v-show="xzShow">
        <aty-button class="fd-btn-green  fl fd-btn-link" @click="goAddRecord()">
          + 新增补记
        </aty-button>
      </aty-row>
      <div class="tabs_main_box">
        <div class="fd-filter-panel fd-bj-pabel no-bg">
          <aty-row class="search_option_box fd-bj-row">
            <aty-col v-if="isJyj() && treeData.length" span="6" class="search_option_marginb">
              <p class="search_option_text">监狱：</p>
              <template>
                <aty-select-tree class="nomal_tree search_option_input" name="valueobject1" :data="treeData"
                                 v-model="treeValue" clearable>
                </aty-select-tree>
              </template>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">监区：</p>
              <aty-select-tree class="nomal_tree search_option_input" name="valueobject2" ref="selectTree1"
                               :data="treeData2" v-model="treeValue2" clearable>
              </aty-select-tree>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">罪犯编号：</p>
              <aty-input class="search_option_input" v-model="zfbh" clearable></aty-input>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">罪犯姓名：</p>
              <aty-input class="search_option_input" v-model="zfxm" clearable></aty-input>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">补记原因：</p>
              <aty-select class="search_option_input" v-model="bjyy" :data="bjyyCodeList" clearable ></aty-select>
            </aty-col>
          </aty-row>
          <aty-row class="search_option_box fd-bj-row">
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">补记时间：</p>
              <aty-date-picker clearable  :editable="false"  class="dr_date_pick" type="date" v-model="bjsj" :transfer="true"></aty-date-picker>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">至：</p>
              <aty-date-picker clearable :editable="false" class="dr_date_pick" type="date" v-model="bjjssj" :transfer="true"></aty-date-picker>
            </aty-col>
            <aty-col  span="6" class="search_option_marginb search_option_textr fd-btns">
              <aty-button @click="queryDataList(1,limit)" class="search_option_butn1" type="primary">
                <i>
                  <img src="../../assets/images/w-png17.png">
                </i>
                <span>查询</span>
              </aty-button>
              <aty-button class="search_option_butn2 mg11" type="default" @click="reSet()">
                <i>
                  <img src="../../assets/images/w-png18.png">
                </i>
                <span>重置</span>
              </aty-button>
            </aty-col>
          </aty-row>
        </div>
        <aty-table
          :pageable-data="tableData"
          style="width: 100%; " class="fd-table-jail"  :exp-all="false"  :exp-current-page="false">
          <aty-table-column
            type="index"
            label="序号"
            width="50"
            prop="id" :showOverflowTooltip="false">
          </aty-table-column>
          <aty-table-column
            prop="jy"
            label="监狱"
            width="150" >
          </aty-table-column>
          <aty-table-column
            prop="jq"
            label="监区"
            width="150">
          </aty-table-column>
          <aty-table-column
            prop="zfxm"
            label="罪犯姓名"
            width="130">
          <!--  <template slot-scope="props" >
              <a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxbh"  target="_blank"></a>
            </template>-->
          </aty-table-column>
          <aty-table-column
            prop="zfbh"
            label="罪犯编号"
            width="130">
          </aty-table-column>
          <aty-table-column
            prop="bjyy"
            label="补记原因"
            :formatter="bjyyZh">
          </aty-table-column>
          <aty-table-column
            prop="zzkhrq"
            label="中止考核日期">
          </aty-table-column>
          <aty-table-column
            prop="kskhrq"
            label="开始考核日期">
          </aty-table-column>
          <aty-table-column
            prop="bjsj"
            label="补记时间"
          >
          </aty-table-column>
          <aty-table-column
            prop="bjmj"
            label="补记民警"
          >
          </aty-table-column>
          <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
            <template slot-scope="props">
              <i>
                <img title="查看" class="table_butn" src="../../assets/images/w-png20.png" @click="viewRecordDetail(props.row)">
                <!--<img title="编辑" class="table_butn" src="../../assets/images/w-png22.png" >-->
                <img v-if="isShowDel(props.row)" title="删除" class="table_butn" src="../../assets/images/w-png23.png" @click="deleteRecordDialog(props)">
              </i>
            </template>
          </aty-table-column>
        </aty-table>
        <!-- table區域 end -->
        <!-- 分页 start -->
        <aty-row class="fd-category">
          <aty-row>
            <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                            :show-elevator="true" @change="changePage"  ref="bjPage"></aty-pagination>
          </aty-row>
        </aty-row>
        <!-- 分页 end -->
        <aty-modal title="删除补记"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" closable ref="deleteRecord" width="400" @on-ok="deleteRecord" @on-cancel="cancelDelete" :mask-closable="false">
          <aty-text text="确定要删除这条补记内容吗？"></aty-text>
        </aty-modal>
      </div>
    </div>
    <!-- </aty-scroll> -->
    </happy-scroll>
    <loading :isLoading="isLoading"></loading>
  </div>
  <!-- 内容部分end -->
</template>

<script>
  import loading from '../base/loading'
  export default {
    components: {
      loading:loading
    },
    data: function() {
      return {
        breadcrumbdata: [{
            name: '补记',
            href: "/record/addRecordList"
          },
          {
            name: '补记列表',
            href: '/record/addRecordList'
          }
        ],
        isLoading:false,
        // table数据
        jy:'',
        jq:'',
        bjyy:'',
        zfxm:'',
        zfbh:'',
        bjsj:'',
        bjjssj:'',
        bjmj:'',
        selectRowIndex:'',
        offset:0,
        limit:10,
        total:0,
        bjbh:'',
        tableData: [],
        //监狱
        treeData: [],
        //监区
        treeValue:'',
        valueobject:{},
        treeValue2:'',
        valueobject2:{},
        xzShow:true,
        curUserInfo: {},
        scShow:false,
        userName:'',
        url:_zfxxDetail.url,
      };
    },
    created() {
      this.getCurUserInfo();
      this.initData(1, this.limit);
    },
    mounted() {
    },
    computed: {
      /**
       * @name 监区数据
       * @description
       */
      treeData2() {
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var deptType = userInfo.deptType;
        var corpId = this.treeValue;
        if(corpId == undefined || corpId == "") {
          corpId = userInfo.corpId;
        }
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        this.getRequest("/api/v1/system/getJq/" + corpId + "/" + deptType + "/" +　isSelectFgyzf).then(resp=> {
          if (resp && resp.status == 200) {
            var list = resp.data.ArrayList;
            this.$refs.selectTree1.update(list);
          }
        });
      },
      bjyyCodeList() {
        return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))[_sigleCode.bjyy];
      },
    },
    methods: {
      /**
       * @description 是否展示删除按钮
       */
      isShowDel(row) {
        let _this = this;
        if(_this.curUserInfo.sfgyzf) {
          return true;
        } else {
          return false;
        }
      },
      bjyyZh:function (row, column) {
        var key = "30111015-"+row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      getCurUserInfo() {
        let _this = this;
        _this.curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        let rightList = _this.curUserInfo.userRightList;
        _this.xzShow = this.checkLinkShow("jy.imp.jfkh.bj.xzbj", rightList);
        _this.userName = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userName;
      },
      // 跳转新增补记
      goAddRecord() {
        this.$router.push({path: '/record/addRecord'});
      },
      //查询监狱下拉列表
      jyDataList() {
        this.getRequest("/api/v1/system/getJy").then(resp=> {
          if (resp && resp.status == 200) {
            this.treeData =[];
            this.treeData = resp.data.ArrayList;
          }
        });
      },
      //初始化查询方法
      initData(pageNum, pageSize) {
        this.queryDataList(pageNum, pageSize);
        this.jyDataList();
      },
      //换页
      changePage(pageSize) {
        let _this = this;
        _this.limit=this.$refs.bjPage.currentPageSize;
        _this.offset=this.$refs.bjPage.currentPage;
        _this.queryDataList(_this.offset,_this.limit);
      },
      //条件查询方法
      queryDataList(pageNum, pageSize) {
        // 调取查询接口
        this.offset=(pageNum-1)*pageSize;
        var params = {
          bjsj: this.bjsj,
          bjjssj: this.bjjssj,
          corpId: this.treeValue,
          deptId: this.treeValue2,
          bjyy: this.bjyy,
          zfbh: this.zfbh,
          zfxm: this.zfxm
        }
        //调接口
        this.getRequest("/api/v1/bj/getBjList/" + pageNum + "/" + pageSize ,params).then(resp => {
          if (resp && resp.status == 200) {
            for (var i=0;i < resp.data.PageInfo.list.length;i++){
              if (resp.data.PageInfo.list[i].zzkhrq) {
                resp.data.PageInfo.list[i].zzkhrq = resp.data.PageInfo.list[i].zzkhrq.substr(0,10);
              }
              if (resp.data.PageInfo.list[i].kskhrq) {
                resp.data.PageInfo.list[i].kskhrq = resp.data.PageInfo.list[i].kskhrq.substr(0,10);
              }
            }
            this.tableData = resp.data.PageInfo.list;
            // this.$nextTick(function(){
            //   this.$refs.scroll.update()
            // })
            this.total = resp.data.PageInfo.total;
          }
        });
      },
      //重置
      reSet() {
        this.bjsj="";
        this.bjjssj="",
        this.treeValue="",
        this.treeValue2="",
        this.bjyy="",
        this.zfbh= "",
        this.zfxm=""
      },
      /**
       * 查看补记详情
       * params :type
       * 1:解回再审特情
       * 2:解回再审非特情 有罪、加刑、未坦白     立案侦查 有罪加刑未坦白的   身份不明罪犯未坦白
       * 3:除上面两种情况的其他情况
       */
      viewRecordDetail (row){
        let type=null
        if(row.bjyy === "2" && row.sftq === '1'){
          type = 1
        }else if((row.bjyy==="2" && row.sftq === '2' && row.sfyz==='1' && row.sfjx === '1' && row.sftbg === '2')
          || (row.bjyy==="3" && row.sfyz==='1' && row.sfjx === '1' && row.sftbg === '2')
          || (row.bjyy==="4" && row.sfyz==='1' && row.sfjx === '1' && row.sftbg === '2')
          || (row.bjyy==="5")){
          type = 2
        }else{
          type = 3
        }
        //调查看详情页面
        this.getRequest("/api/v1/bj/getBjById/" + row.id).then(resp=> {
          if (resp && resp.status == 200) {
            var data = resp.data;
            resp.data.bj.zzkhrq =  resp.data.bj.zzkhrq.substr(0,10);
            resp.data.bj.kskhrq = resp.data.bj.kskhrq.substr(0,10);
            if(localStorage.getItem("recordDetailData")){
              localStorage.removeItem("recordDetailData")
            }
            localStorage.setItem("recordDetailData", JSON.stringify({data:data,type:type}));
            this.$router.push({name:'addRecordDetail'})
          }
        })
      },
      //点击删除弹窗
      deleteRecordDialog (props){
        this.$refs.deleteRecord.open()
        this.selectRowIndex=props.$index
        this.bjbh = props.row.id
      },
      //取消删除
      cancelDelete(){
        this.$refs.deleteRecord.close()
      },
      //删除补记内容
      deleteRecord(){
        this.tableData.splice(this.selectRowIndex,1);
        var bjbh = this.bjbh;
        this.deleteRequest("/api/v1/bj/deleteBj/" + bjbh).then(resp=> {
          if (resp && resp.status == 200) {
            Artery.message.info("删除成功");
             this.queryDataList(this.$refs.bjPage.currentPage,this.$refs.bjPage.currentPageSize);
          }else{
            Artery.message.error({
                content:"删除失败",
                duration:3
            });
          }
        })
        this.$refs.deleteRecord.close()
      }
    }
  };
</script>
<style scoped>
  .xzbj-btn{
    margin-bottom:0;
  }
  .fd-bj-pabel.fd-filter-panel{
    padding-top:20px !important;
  }
  .fd-btns .aty-btn{
    font-size:14px;
    height:32px;
    line-height:32px;
    padding-top:0;
    padding-bottom:0;
  }
  .fd-btns .search_option_butn2{
    color: #188aff;
    border-color:#188aff;
  }
  .fd-btns .aty-btn i,
  .fd-btns .aty-btn span{
    vertical-align: middle;
    position:relative;
    top:-2px;
  }
  .required .search_option_text:before{
    content:'*';
    color:red;
    padding-right:5px;
  }
  .fd-home-wrap{
    height:100%;
  }
  .fd-home-wrap .main_box{
    min-height:calc(100% - 80px);
    /* height:calc(100% - 80px); */
    min-height:500px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .aty-scroll {
     max-height:100%;
  }
  .dr_edit_b1{
    height: 30px;
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    background-color: #00ccbb;
    border-color: #00ccbb;
    margin-right: 12px;
  }
  .dr_edit_b1:hover{
    background-color: #0fdbca;
    border-color: #0fdbca;
  }
  .table_butn{
    margin: 0 4px;
    cursor: pointer;
  }
  .npl_table_input{
    width: 100%;
    height: 30px;
    border: 1px solid #dddee1;
    border-radius: 3px;
    color: #333;
  }
  .npl_botm_butn{
    margin-top: 20px;
    margin-right: 5px;
  }
  .search_option_input,
  .search_option_box .aty-date-picker{
    width:calc(100% - 116px);
    position:absolute;
    top:0;
    left:116px;
    right:0;
  }
  .fd-bj-pabel .search_option_box .search_option_text{
    width:100px;
  }
  .fd-bj-pabel  .fd-bj-row.aty-row .aty-col{
    padding:0 16px;
  }
  .fd-bj-pabel  .fd-bj-row.aty-row .fd-btns.aty-col{
    padding-right:0;
  }
  .search_option_box .search_option_text{
    display: inline-block;
    width: 116px;
    text-align: right;
    height:100%;
    position:absolute;
    top:0;
    left:16px;
  }
  .fd-btn-query{
    text-align:left;
  }
  .fd-btn-query .aty-btn{
    margin-left:125px;
  }
  .fd-bj-row.aty-row{
    margin:0 0 19px;
  }
  .fd-filter-panel{
    padding:20px 0 0;
  }
  .search_option_marginb {
    margin-bottom: 15px;
  }
</style>

