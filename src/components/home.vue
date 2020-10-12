<template>
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name">
      <aty-breadcrumb :data="breadcrumbdata" can-click separator=">" @click="queryData"></aty-breadcrumb>
    </div>
     <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" v-if="level < 6">
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" v-if="level < 6" :show="false"> -->
    <div class="main_box" >
      <!-- table區域 start -->
      <aty-table
        :pageable-data="tableData0"
        style="width: 100%; " class="fd-table-jail" :exp-all="false"  :exp-current-page="false">
        <aty-table-column
          prop="mc"
          label="单位"
          width="180" >
          <template slot-scope="props" >
            <a :title="props.row.mc" v-text="props.row.mc"  @click="goNewPage(props)"></a>
          </template>
        </aty-table-column>
        <aty-table-column
          prop="zcrs"
          label="在册人数"
          width="130">
        </aty-table-column>
        <aty-table-column
          prop="zyrs"
          label="在押人数"
          width="130">
        </aty-table-column>
        <aty-table-column
          prop="khrs"
          label="考核人数"
          width="100">
        </aty-table-column>
        <aty-table-column
          prop="bkhrs"
          label="不考核人数"
        >
        </aty-table-column>
        <aty-table-column
          prop="wldnlrs"
          label="无劳动能力人数">
        </aty-table-column>
        <aty-table-column
          prop="zxjfrc"
          label="专项加分人次">
        </aty-table-column>
        <aty-table-column
          prop="dxcfrc"
          label="单项处罚人次"
        >
        </aty-table-column>
        <aty-table-column
          prop="sybyrs"
          label="上月表扬人数"
        >
        </aty-table-column>
        <aty-table-column
          prop="sywzjlrs"
          label="上月物质奖励人数"
        >
        </aty-table-column>
      </aty-table>
      <!--各分监区人员列表 -->
    </div>
    <!-- </aty-scroll> -->
     </happy-scroll>
     <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" v-if="level==6">
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll1" v-if="level==6" :show="false"> -->
    <div class="main_box">
      <aty-row class="search_option_box fd-art-row">
        <aty-col  span="6" class="search_option_marginb">
          <p class="search_option_text">小组：</p>
          <aty-input class="search_option_input" v-model="szxz" clearable></aty-input>
        </aty-col>
        <aty-col  span="6" class="search_option_marginb">
          <p class="search_option_text">罪犯编号：</p>
          <aty-input class="search_option_input" v-model="zfbh" clearable></aty-input>
        </aty-col>
        <aty-col  span="6" class="search_option_marginb">
          <p class="search_option_text">罪犯姓名：</p>
          <aty-input class="search_option_input" v-model="xm" clearable></aty-input>
        </aty-col>
        <aty-col  span="6" class="search_option_marginb">
          <p class="search_option_text">是否考核：</p>
          <aty-select class="search_option_input" v-model="sfkh" :data="dataList" clearable></aty-select>
        </aty-col>
      </aty-row>
      <aty-row class="search_option_box fd-art-row">
        <aty-col  span="6" class="search_option_marginb">
          <p class="search_option_text">现刑期止日：</p>
          <aty-date-picker class="dr_date_pick" type="date" v-model="kssj" clearable></aty-date-picker>
        </aty-col>
        <aty-col  span="6" class="search_option_marginb">
          <p class="search_option_text">至：</p>
          <aty-date-picker class="dr_date_pick" type="date" v-model="jssj" clearable></aty-date-picker>
        </aty-col>
        <aty-col  span="12" class="search_option_marginb fd-search-btn">
          <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,limit)">
            <i>
              <img src="../assets/images/w-png17.png">
            </i>
            <span>查询</span>
          </aty-button>
        </aty-col>
      </aty-row>
      <aty-table
        ref="table_all"
        :pageable-data="personInfoData"
        style="width: 100%; margin-top:20px;" class="fd-table-jail"  :exp-all="false"  :exp-current-page="false">
        <aty-table-column
          prop="szxz"
          label="小组"
          width="80"  :showOverflowTooltip="false">
          <template slot-scope="props" >
            <aty-link :text="props.row.szxz" class="no-link"></aty-link>
          </template>
        </aty-table-column>
        <aty-table-column
          prop="xm"
          label="罪犯姓名"
          width="100">
          <!--<template slot-scope="props" >-->
            <!--<a :title="props.row.xm"  v-text="props.row.xm" :href = "url+ props.row.zfxxbh"  target="_blank"></a>-->
          <!--</template>-->
        </aty-table-column>
        <aty-table-column
          prop="zfbh"
          label="罪犯编号"
          width="150">
        </aty-table-column>
        <aty-table-column
          prop="zczt"
          label="在册状态"
          width="100">
        </aty-table-column>
        <aty-table-column
          prop="sfkh"
          label="是否考核"
          width="80">
        </aty-table-column>
        <aty-table-column
          prop="zm"
          label="罪名"
          width="100">
        </aty-table-column>
        <aty-table-column
          prop="xq"
          label="现刑期" width="100">
        </aty-table-column>
        <aty-table-column
          prop="xxqqr"
          label="现刑期起日">
        </aty-table-column>
        <aty-table-column
          prop="xxqzr"
          label="现刑期止日">
        </aty-table-column>
        <aty-table-column
          prop="scjxrq"
          label="上次减刑日期"  width="100">
        </aty-table-column>
        <aty-table-column
          prop="xbygs"
          label="现表扬个数">
        </aty-table-column>
        <aty-table-column
          prop="xwzjlgs"
          label="现物质奖励个数"
          width="130">
        </aty-table-column>
        <aty-table-column
          prop="xkhjf"
          label="现考核积分">
        </aty-table-column>
      </aty-table>

      <!-- 分页 start -->
      <aty-row class="fd-category">
        <aty-row>
          <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                          :show-elevator="true" @change="changePage" ref="syPage"></aty-pagination>
        </aty-row>
      </aty-row>
    </div>
    <!-- </aty-scroll> -->
     </happy-scroll>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script>
  import loading from './base/loading'
  export default {
    components: {
      loading:loading
    },
    data: function() {
      return {
        level:0,
        limit:10,
        total:0,
        offset: 1,
        xm:'',
        szxz:'',
        zt:'',
        sfkh:'',
        zm:'',
        zfbh:'',
        kssj:'',
        jssj:'',
        sfgyzf:true,
        jybh:'',
        id:'',
        jb:0,
        url:_zfxxDetail.url,
        breadcrumbdata: [],
        dataList:[
          {
            code:'1',
            name: '是'
          },
          {
            code:'2',
            name: '否'
          }
        ],
        // table数据
        tableData0: [

        ],
        personInfoData:[
        ],
        isLoading:false
      }
    },
    methods:{
      //换页
      changePage(pageSize) {
        let _this = this;
        _this.limit=this.$refs.syPage.currentPageSize;
        _this.offset=this.$refs.syPage.currentPage;
        _this.queryDataList(_this.offset,_this.limit);
      },
      clickShowNext(props) {
        let temp={
          name:props.row.mc,
          href:"/",
          jb:props.row.jb,
          jybh:props.row.jybh
        }
        if(props.row.jybh != null){
          this.breadcrumbdata.push(temp);
        }
      },
      goNewPage(item) {
        if(!item.row.hasOwnProperty('jybh') || item.row.jybh == "") {
          return;
        }
        if(item.row.sfgyzf){
          item.row.jb = 6;
        }
        let temp={
          name:item.row.mc,
          href:"/",
          jb:item.row.jb,
          jybh:item.row.jybh
        }
        if(item.row.jybh != null){
          this.breadcrumbdata.push(temp);
        }
        //如果编号为空不跳转
        if(item.row.jybh == null){
          return ;
        }
        var row = item.row;
        if(row.jb < 6){
          this.isLoading=true
          this.getRequest("/api/v1/sy/select/"+ row.jybh+"/"+ row.jb).then(resp=>{
            if (resp && resp.status == 200) {
              this.tableData0 = resp.data.ArrayList;
              this.isLoading=false
              // this.$nextTick(function(){
              //    this.$refs.scroll.update()
              // })
            }
          });
        }else {
          this.level = row.jb;
          var params ={
            bh:row.jybh,
            xm:this.xm,
            szxz:this.szxz,
            zt:this.zt,
            sfkh:this.sfkh,
            zm:this.zm,
            zfbh:this.zfbh,
            kssj:this.kssj,
            jssj:this.jssj
          }
          this.isLoading=true
          this.postRequest("/api/v1/sy/get/1/"+this.limit,params).then(resp=>{
            if (resp && resp.status == 200) {
              for(var i=0;i < resp.data.PageInfo.list.length;i++){
                if(resp.data.PageInfo.list[i].xxqqr != null) {
                  resp.data.PageInfo.list[i].xxqqr = resp.data.PageInfo.list[i].xxqqr.substr(0, 10);

                }
                if(resp.data.PageInfo.list[i].xxqzr != null) {
                  resp.data.PageInfo.list[i].xxqzr = resp.data.PageInfo.list[i].xxqzr.substr(0, 10);
                }
                if(resp.data.PageInfo.list[i].scjxrq != null) {
                  resp.data.PageInfo.list[i].scjxrq = resp.data.PageInfo.list[i].scjxrq.substr(0, 10);
                }
              }
              this.personInfoData = resp.data.PageInfo.list;
              this.isLoading=false
              // this.$nextTick(function(){
              //   this.$refs.scroll1.update()
              // })
              this.total = resp.data.PageInfo.total;
            }
            this.jybh = row.jybh;
          });
        }
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
      queryDataList(pageNum, pageSize){
       this.offset=(pageNum-1)*pageSize;
        var params ={
          bh:this.jybh,
          xm:this.xm,
          szxz:this.szxz,
          zt:this.zt,
          sfkh:this.sfkh,
          zm:this.zm,
          zfbh:this.zfbh,
          kssj:this.kssj,
          jssj:this.jssj
        }
        this.postRequest("/api/v1/sy/get/"+pageNum+"/"+pageSize,params).then(resp=>{
          if (resp && resp.status == 200) {
            for(var i=0;i < resp.data.PageInfo.list.length;i++){
              if(resp.data.PageInfo.list[i].xxqqr != null) {
                resp.data.PageInfo.list[i].xxqqr = resp.data.PageInfo.list[i].xxqqr.substr(0, 10);

              }
              if(resp.data.PageInfo.list[i].xxqzr != null) {
                resp.data.PageInfo.list[i].xxqzr = resp.data.PageInfo.list[i].xxqzr.substr(0, 10);
              }
              if(resp.data.PageInfo.list[i].scjxrq != null) {
                resp.data.PageInfo.list[i].scjxrq = resp.data.PageInfo.list[i].scjxrq.substr(0, 10);
              }
            }
            this.personInfoData = resp.data.PageInfo.list;
            // this.$nextTick(function(){
            //   this.$refs.scroll1.update()
            // })
            this.total = resp.data.PageInfo.total;
          }
        });
      },
      queryData(item,event){
        if (item.sfgyzf){
          return;
        }
        this.level = item.jb;
        this.isLoading=true
        this.getRequest("/api/v1/sy/select/"+ item.jybh+"/"+ item.jb).then(resp=>{
          if (resp && resp.status == 200) {
            this.tableData0 = resp.data.ArrayList;
            this.isLoading=false
            // this.$nextTick(function(){
            //      this.$refs.scroll.update()
            // })
          }
        });
        for(var i=this.breadcrumbdata.length-1;i<this.breadcrumbdata.length;i--){
          if(i<0){
            return;
          }
          if(item.jb < this.breadcrumbdata[i].jb){
            this.breadcrumbdata.splice(i,1);
          }
        }
      },
      initData(id,jb,name,sfgyzf){
        if (sfgyzf){
          this.level = 6;
        }else {
          this.level = jb;
        }
        //jb 为特殊设定字段，方便首页查询 jb:3(监狱局级别 对应处室)；jb:4(监狱级别 对应科室)；
        // jb:5(监区级别对应监区/分监狱)；jb:6(分监区级别)；
        if(id != ''){
          if(jb < 6 && sfgyzf != true){
            this.isLoading=true
            this.getRequest("/api/v1/sy/select/"+id+"/"+jb).then(resp=> {
              if (resp && resp.status == 200) {
                this.tableData0 = resp.data.ArrayList;
                // this.$nextTick(function(){
                //   this.$refs.scroll.update()
                // })
              }
              this.isLoading=false
            });
          }else{
            var params ={
              bh:id
            }
            this.postRequest("/api/v1/sy/get/1/"+this.limit,params).then(resp=>{
              if (resp && resp.status == 200) {
                for(var i=0;i < resp.data.PageInfo.list.length;i++){
                  if(resp.data.PageInfo.list[i].xxqqr != null) {
                    resp.data.PageInfo.list[i].xxqqr = resp.data.PageInfo.list[i].xxqqr.substr(0, 10);

                  }
                  if(resp.data.PageInfo.list[i].xxqzr != null) {
                    resp.data.PageInfo.list[i].xxqzr = resp.data.PageInfo.list[i].xxqzr.substr(0, 10);
                  }
                  if(resp.data.PageInfo.list[i].scjxrq != null) {
                    resp.data.PageInfo.list[i].scjxrq = resp.data.PageInfo.list[i].scjxrq.substr(0, 10);
                  }
                }
                this.personInfoData = resp.data.PageInfo.list;
                // this.$nextTick(function(){
                //   this.$refs.scroll1.update()
                // })
                this.total = resp.data.PageInfo.total;
              }
              this.jybh = id;
            });
          }
          let temp={
            name:name,
            href: {name: "home"},
            jb:jb,
            jybh:id,
            sfgyzf:sfgyzf
          }
          this.breadcrumbdata.push(temp);
        }
      }

    },
    created(){
      this.getRequest("/api/v1/system/getCurUserInfo").then(resp => {
        if (resp && resp.status == 200) {
          //如果deptType<3可以确定为单位，否则为部门
          if(resp.data.deptType<3){
            //如果科室pid不为空则可以确定是分监狱的科室
            if(resp.data.pDeptType == '5') {
              this.initData(resp.data.pDeptId, parseInt(resp.data.deptType) + 3, resp.data.deptName, resp.data.sfgyzf);
            }else{
              this.initData(resp.data.corpId, parseInt(resp.data.deptType) + 2, resp.data.corpName, resp.data.sfgyzf);
            }
          }else{
            //分监狱与监区级别相同特殊对待
            if(resp.data.deptType == '5'){
              this.initData(resp.data.deptId,parseInt(resp.data.deptType),resp.data.deptName, resp.data.sfgyzf);
            }else if(resp.data.deptType == '31'){
              this.initData(resp.data.deptId, 5, resp.data.deptName, resp.data.sfgyzf);
            }else{
              this.initData(resp.data.deptId, parseInt(resp.data.deptType)+2 , resp.data.deptName, resp.data.sfgyzf);
            }
          }
        }
      });
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .fd-home-wrap{
    height:calc(100% - 108px);
  }
  .fd-home-wrap .main_box{
    min-height:calc(100% - 80px);
  }
  .search_option_box .search_option_text{
    display: inline-block;
    width: 115px;
    text-align: right;
  }
  .aty-breadcrumb  a{
    color: #ffffff !important;
  }
  .search_option_input,
  .search_option_box .aty-date-picker{
    width: calc(100% - 120px);
  }
  .fd-art-row.aty-row{
    margin:10px 0;
  }
  .fd-search-btn{
    text-align:right;
  }
  .cell a.no-link{
    color:#657180;
    cursor:default;
  }
</style>
