<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap fd-index-wrap">
        <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
        <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
        <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
        <div class="main_box">
          <div class="tabs_main_box">
            <aty-row class="search_option_box">
              <aty-col span="6" class="search_option_marginb">
                <p class="search_option_text">监区:</p>
                <aty-select-tree class="nomal_tree search_option_input" name="valueobject" ref="selectTree1"
                                 :data="treeData" v-model="treeValue" clearable>
                </aty-select-tree>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">发生日期:</p>
                <aty-date-picker :editable='false' v-model="startDate" @change="getStartDate" class="dr_date_pick" type="date" clearable></aty-date-picker>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">至:</p>
                <aty-date-picker :editable='false'  v-model="endDate" @change="getEndDate" class="dr_date_pick" type="date" clearable></aty-date-picker>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">罪犯编号:</p>
                <aty-input v-model="zfmc" class="search_option_input" clearable></aty-input>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">罪犯姓名:</p>
                <aty-input v-model="xm" class="search_option_input" clearable></aty-input>
              </aty-col>
              <aty-col  span="6" class="search_option_marginb">
                <p class="search_option_text">下发日期:</p>
                <aty-date-picker :editable='false' v-model="xfrq" @change="getXfrq" class="dr_date_pick" type="date" clearable></aty-date-picker>
              </aty-col>
                <aty-col span="12" class="search_option_marginb search_option_textr">
                    <aty-button @click="queryDataList(1,limit)" class="search_option_butn1" type="primary">
                        <i>
                            <img src="../../assets/images/w-png17.png">
                        </i>
                        <span>查询</span>
                    </aty-button>
                    <aty-button @click="goReset()" class="search_option_butn2" type="default">
                        <i>
                            <img src="../../assets/images/w-png18.png">
                        </i>
                        <span>重置</span>
                    </aty-button>
                </aty-col>
            </aty-row>
            <div class="dr_edit_butn">
                <aty-button v-show="PointList" class="dr_edit_b1" type="primary" @click="goAddPage()">
                  + 新增加扣分通知单
                </aty-button>
                <aty-button v-show="PointList" class="dr_edit_b1" type="primary" @click="batchPublish()">
                  批量下发
                </aty-button>
            </div>
            <!-- table區域 start -->
            <aty-table
                :pageable-data="tableData"
                style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false" @selection-change="selectChange">
                <aty-table-column type="selection" width="45" :showOverflowTooltip="false" :selectable="selectableCheck">
                </aty-table-column>
                <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
                <aty-table-column prop="jqmc" label="监区" width="250"></aty-table-column>
                <aty-table-column prop="zfmc" label="罪犯编号" width="130">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.xm"  v-text="props.row.xm" :href = "url+ props.row.zfxxbh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="xm" label="罪犯姓名" width="130"></aty-table-column>
                <aty-table-column prop="fsrq" label="发生日期" width="130"></aty-table-column>
                <aty-table-column prop="zyss" label="主要事实"></aty-table-column>
                <aty-table-column prop="fz" label="分值" width="40"></aty-table-column>
                <aty-table-column prop="xfrq" label="下发日期" width="140"></aty-table-column>
                <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
                    <template slot-scope="scope">
                        <i>
                            <img @click="goRecall(scope)" v-if="scope.row.zt == 1" title="撤回" class="table_butn"
                                 src="../../assets/images/back.png">
                            <img @click="goGive(scope)" v-if="scope.row.sfsy == 0 && scope.row.zt == 0" title="下发"
                                 class="table_butn" src="../../assets/images/xf.png">
                            <img @click="goNewPage(scope)" v-if="(scope.row.sfsy == 0 && scope.row.zt == 0) ||
                                 (scope.row.sfsy == 0 && scope.row.zt == 2)" title="编辑" class="table_butn"
                                 src="../../assets/images/w-png22.png">
                            <img @click="deleteDialog(scope)" v-if="(scope.row.sfsy == 0 && scope.row.zt == 0) ||
                                (scope.row.sfsy == 0 && scope.row.zt == 2)" title="删除" class="table_butn"
                                 src="../../assets/images/w-png23.png">
                        </i>
                    </template>
                </aty-table-column>
            </aty-table>
            <!-- table區域 end -->
            <!-- 分页 start -->
            <aty-row class="fd-category">
              <aty-row>
                <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                                :show-elevator="true" @change="changePage" ref="changePage"></aty-pagination>
              </aty-row>
            </aty-row>
            <aty-modal title="删除加扣分通知单"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" closable ref="deleteJkftzd" width="400" @on-ok="deleteJkftzd" @on-cancel="cancelDelete" :mask-closable="false">
              <aty-text text="确定要删除这条加扣分通知单吗？"></aty-text>
            </aty-modal>
            <!-- 分页 end -->
          </div>
        </div>
        <!-- </aty-scroll> -->
        </happy-scroll>
    </div>
    <!-- 内容部分end -->
</template>

<script>
export default {
  data: function() {
    return {
      breadcrumbdata:[
        {
            name:'加扣分通知单',
            href:"/addPointList"
        }
      ],
      // table数据
      tableData: [],
      offset: 1,
      PointList:true,
      // 开始日期
      startDate: '',
      // 结束日期
      endDate: '',
      // 罪犯姓名
      zfmc: '',
      xm:'',
      //下发日期
      xfrq:'',
      limit:10,
      total:0,
      // 监区
      jqmc: '',
      jkftzdbh:'',
      url:_zfxxDetail.url,
      selectRowIndex:'',
      offget: 1,
      dataList: [
          {
              code:'op1',
              name: '选项1'
          },
          {
              code:'op2',
              name: '选项2'
          },
          {
              code:'op3',
              name: '选项3'
          }
      ],
      treeValue:'',
      valueobject:{},
      treeValue2:'',
      valueobject2:{},
      treeData2: [],
      userInfo:{},
      //选中的数据
      selectTableData: []
    };
  },
  created() {
    this.initData(1, this.limit);
    this.PointList = this.checkButtonShow("jy.imp.jfkh.jkftzd.xz");
  },
  computed: {
    /**
     * @name 监区数据
     * @description
     */
    treeData() {
      var useInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var deptType = useInfo.deptType;
      var corpId = this.treeValue2;
      if(corpId == undefined || corpId == "") {
        corpId = useInfo.corpId;
      }
      //是否可选择非关押罪犯部门 true：不可选 false:可选
      var isSelectFgyzf = false;
      this.getRequest("/api/v1/system/getJq/" + corpId + "/" + deptType + "/" + isSelectFgyzf).then(resp=> {
        if (resp && resp.status == 200) {
          if(resp.data.hasOwnProperty("ArrayList")) {
            this.$refs.selectTree1.update(resp.data.ArrayList);
          }
        }
      });
    }
  },
  methods: {
    //换页
    changePage(pageSize) {
      let _this = this;
      _this.limit=this.$refs.changePage.currentPageSize;
      _this.offset=this.$refs.changePage.currentPage;
      this.queryDataList(_this.offset,_this.limit);
    },
    //初始化查询方法
    initData(pageNum, pageSize) {
      this.queryDataList(pageNum, pageSize);
      this.getRequest("/api/v1/system/getJy").then(resp=>{
        if (resp && resp.status == 200) {
          this.treeData2 = resp.data.ArrayList;
        }
      });
    },
    //条件查询方法
    queryDataList(pageNum, pageSize) {
      if(this.startDate > this.endDate){
        Artery.message.info({
          content:'开始时间不能小于结束时间',
          duration: 3
        });
        return;
      }
       this.offset=(pageNum-1)*pageSize;
      // 调取查询接口
      var params = {
        kssj: this.startDate,
        jssj: this.endDate,
        jymc: this.treeValue2,
        zfmc: this.zfmc,
        xm: this.xm,
        jqmc: this.treeValue,
        xfrq: this.xfrq
      }
      this.postRequest(
        "/api/v1/jkftzd/jkftzdListGet/" + pageNum + "/" + pageSize ,params
      ).then(resp => {
        if (resp && resp.status == 200) {
          for (var i=0;i < resp.data.PageInfo.list.length;i++){
            resp.data.PageInfo.list[i].fsrq = resp.data.PageInfo.list[i].fsrq.substr(0,10);
            if(resp.data.PageInfo.list[i].xfrq && resp.data.PageInfo.list[i].xfrq != null){
                resp.data.PageInfo.list[i].xfrq = resp.data.PageInfo.list[i].xfrq.substr(0,10);
            }
          }
          if(resp.data.PageInfo.hasOwnProperty("list")) {
            this.tableData = resp.data.PageInfo.list;
          }
           this.total = resp.data.PageInfo.total;
          //  this.$nextTick(function(){
          //    this.$refs.scroll.update()
          //  })
        }
      });
    },
    // 格式化时间
    dateFormat(date) {
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    // 编辑跳转到新增页面
    goNewPage(item) {
      item.row.editFlag = true;
      var row = item.row;
      if(localStorage.getItem("addPointData")){
        localStorage.removeItem("addPointData")
      }
      localStorage.setItem("addPointData", JSON.stringify({edit:'edit',row:row}));
      this.$router.push({path: '/newPointList'});
      // this.$router.push({path: '/newPointList',query:{edit:'edit',row:row}});
    },
    goAddPage() {
      if(localStorage.getItem("addPointData")){
        localStorage.removeItem("addPointData")
      }
      this.$router.push({path: '/newPointList'});
    },
    // 撤回按钮
    goRecall(item) {
      var bh = item.row.bh
      var pageNum = this.offget;
      var pageSize = this.limit;
      this.putRequest("/api/v1/jkftzd/jkfRetract/" + bh).then(resp =>{
        if (resp && resp.status == 200){
          if (resp.data.Integer == 2){
            Artery.message.info({
              content:"此条加扣分通知单已被使用，无法撤回",
              duration:3
            });
            return;
          }else {
            Artery.message.info({
              content:"撤回成功",
              duration:3
            });
            this.queryDataList(pageNum, pageSize);
          }
        }
      });

    },
    // 下发按钮
    goGive(item) {
      var bh = item.row.bh;
      var pageNum = this.offget;
      var pageSize = this.limit;
      this.putRequest("/api/v1/jkftzd/jkfPublish/" + bh).then(resp =>{
        if (resp && resp.status == 200){
          Artery.message.info({
             content:"下发成功",
             duration:1.5
          });
          this.queryDataList(pageNum, pageSize);
        }
      });
    },
    //点击删除弹窗
    deleteDialog (props){
      this.$refs.deleteJkftzd.open()
      this.selectRowIndex=props.$index
      this.jkftzdbh = props.row.bh
    },
    //取消删除
    cancelDelete(){
      this.$refs.deleteJkftzd.close()
    },
    //删除加扣分通知单内容
    deleteJkftzd(){
      this.tableData.splice(this.selectRowIndex,1);
      var bh = this.jkftzdbh;
      var pageNum = this.offget;
      var pageSize = this.limit;
      this.deleteRequest("/api/v1/jkftzd/jkfDelete/"+bh).then(resp=> {
        if (resp && resp.status == 200) {
          Artery.message.info({
             content:"删除成功",
             duration:1.5
          });
          this.queryDataList(pageNum, pageSize);
        }else{
          Artery.message.info({
            content:"删除失败",
            duration:1.5
          });
        }
      })
      this.$refs.deleteJkftzd.close()
    },
    // 查询按钮
    goSearch() {
    },
    // 重置按钮
    goReset() {
      this.startDate = '';
      this.endDate = '';
      this.treeValue = '';
      this.zfmc = '';
      this.treeValue2 = '';
      this.xfrq = '';
    },
    // 获取开始日期
    getStartDate(date) {
      this.startDate = date;
    },
    // 获取结束日期
    getEndDate(date) {
      this.endDate = date;
    },
    // 获取下发日期
    getXfrq(date) {
      this.xfrq = date;
    },
    //选中的数据
    selectChange(selectedRows) {
      this.selectTableData = selectedRows;
    },
    //判断复选框是否可选，仅当状态为保存时可下发
    selectableCheck(row){
      if(row.zt && row.zt == '0'){
        return true;
      } else {
        return false;
      }
    },
    //批量下发
    batchPublish(){
      let _this = this;
      var pageNum = this.offget;
      var pageSize = this.limit;
      if(_this.selectTableData == null || _this.selectTableData.length <= 0){
          Artery.message.info({
            content:"请先选择要下发的数据！",
            duration:3
          });
          return;
      }
      var bhStrs = '';
      for(var i = 0;i<_this.selectTableData.length;i++){
        if(_this.selectTableData[i].bh != ''){
          bhStrs = bhStrs + _this.selectTableData[i].bh + ",";
        }
      }
      if(bhStrs != ''){
        this.putRequest("/api/v1/jkftzd/jkfPublishList/" + bhStrs).then(resp => {
            if (resp && resp.status == 200) {
              Artery.message.info({
                content:"下发成功",
                duration:1.5
              });
              this.queryDataList(pageNum, pageSize);
            } else {
              Artery.message.info({
                content:"下发失败",
                duration:1.5
              });
            }
        });
      }

    }
  }
};
</script>
<style scoped>
.fd-home-wrap {
  height: calc(100% - 108px);
}
.fd-home-wrap .main_box {
  min-height: calc(100% - 80px);
}
.search_option_box .aty-input{
    height: 34px;
}
.search_option_box .search_option_text{
    display: inline-block;
    width: 21%;
    text-align: right;
}
.search_option_box .aty-date-picker{
    width: 77%;
}
.search_option_input{
    width: 77%;
}
.search_option_marginb{
    margin-bottom: 21px;
    padding-left: 20px;
}
/* .search_option_butn1 i{
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/w-jpg3.png) no-repeat;
    float: left;
}
.search_option_butn2 i{
    display: block;
    width: 21px;
    height: 15px;
    background: url(../../assets/images/w-jpg4.png) no-repeat;
    float: left;
    margin-top: 1px;
} */
.search_option_butn_text{
    float: left;
    margin-left: 7px;
}
.search_option_butn1{
    width: 86px;
    height: 32px;
    line-height: 32px;
    padding-top: 0px;
    padding-bottom: 0px;
    background-color: #188aff;
    border-color: #188aff;
    font-size: 14px;
}
.search_option_butn1 img{
    margin-top: -3px;
}
.search_option_butn2{
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
.search_option_butn2 img{
    margin-top: -3px;
}
.search_option_textr{
    text-align: right;
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
.dr_edit_b1 img{
    margin-top: -3px;
}

.table_butn{
    margin: 0 4px;
    cursor: pointer;
}
</style>

