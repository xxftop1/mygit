<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <div class="main_name">复查复核</div>
    <div class="main_box main-tabs fd-fcfh-page">
      <aty-tabs type="card" @tabclick="tabClick">
        <!-- tabs1開始 -->
        <aty-tabpane v-show="dblbShow">
          <div slot="label">
            <span class="tabs_icon1 tabs_topb"></span>
            <span class="tabs_topt">待办({{db_total}})</span>
          </div>
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <!-- <aty-scroll :speed="53" class="aty-scroll-2" ref="tabScroll0" name="tabScroll0" :show="false"> -->
            <div class="tabs_main_box">
              <aty-row class="search_option_box">
                <aty-col span="6" class="search_option_marginb" v-if="false">
                  <p class="search_option_text">监狱:</p>
                  <template v-if="treeData.length">
                    <aty-select-tree  class="nomal_tree search_option_input" clearable:jyClear name="valueobject" :data="treeData" v-model="treeValue" @change="getJq"></aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">监区:</p>
                  <template v-if="treeData2.length">
                    <aty-select-tree  class="nomal_tree search_option_input" clearable name="valueobject2" :data="treeData2" v-model="treeValue2"></aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯编号:</p>
                  <aty-input v-model="zfbh" clearable class="search_option_input"></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯姓名:</p>
                  <aty-input v-model="zfxm" clearable class="search_option_input"></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">类别:</p>
                  <aty-select v-model="khlx" class="search_option_input" :data="lxDataList" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">状态:</p>
                  <aty-select v-model="zt" class="search_option_input" :data="ztDataList" clearable></aty-select>
                </aty-col>
                <aty-col span="18" class="search_option_marginb search_option_textr">
                  <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,db_limit,0)">
                    <i>
                      <img src="../../assets/images/w-png17.png">
                    </i>
                    <span>查询</span>
                  </aty-button>
                  <aty-button class="search_option_butn2" type="default" @click="reSet()">
                    <i>
                      <img src="../../assets/images/w-png18.png">
                    </i>
                    <span>重置</span>
                  </aty-button>
                </aty-col>
              </aty-row>
              <div class="dr_edit_butn" v-show="xzdbShow">
                <aty-button class="dr_edit_b1" type="primary" @click="addCheck">
                  <i>+</i>
                  <span>新增复查</span>
                </aty-button>
              </div>
              <!-- table區域 start -->
              <aty-table @selection-change="selectChange1" :pageable-data="tableData" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="index" label="序号">
                </aty-table-column>
                <aty-table-column prop="jy" label="监狱">
                </aty-table-column>
                <aty-table-column prop="jq" label="监区">
                </aty-table-column>
                <aty-table-column prop="zfxm" label="罪犯姓名" width="160">
                  <!--<template slot-scope="props" >
                    <a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxbh"  target="_blank"></a>
                  </template>-->
                </aty-table-column>
                <aty-table-column prop="zfbh" label="罪犯编号" width="160">
                </aty-table-column>
                <aty-table-column prop="lx" label="类别" width="160" :formatter="lbZh">
                </aty-table-column>
                <aty-table-column prop="fcfhrq" label="申请复查/复核时间" width="160">
                </aty-table-column>
                <aty-table-column prop="zt" label="状态" width="160" :formatter="ztZh">
                </aty-table-column>
                <aty-table-column label="操作" :showOverflowTooltip="false">
                  <template slot-scope="scope">
                    <i>
                      <img  v-show ="scope.row.zt == '0' || scope.row.zt == '102'" @click="singleSubmit(scope.row)"
                            title="提交" class="table_butn" src="../../assets/images/w-png19.png">
                      <img  v-show ="scope.row.zt== '102' || scope.row.zt == '100'" @click="goDetails(scope.row)"
                            title="查看详情" class="table_butn" src="../../assets/images/w-png20.png">
                      <img  v-show ="scope.row.zt == '100'" @click="goApproval(scope)" title="审批" class="table_butn"
                            src="../../assets/images/w-png21.png">
                      <img  v-show ="scope.row.zt == '0' || scope.row.zt == '102'" @click="goEdit(scope.row)"
                            title="编辑" class="table_butn" src="../../assets/images/w-png22.png">
                      <img  v-show ="scope.row.zt == '0'" @click="goDelete(scope)" title="删除" class="table_butn"
                            src="../../assets/images/w-png23.png">
                      <img  v-show ="scope.row.lx == '1' && scope.row.zt == '102'" @click="goQxfc(scope)"
                            title="取消复查" class="table_butn" src="../../assets/images/w-png23.png">
                    </i>
                  </template>
                </aty-table-column>
              </aty-table>
              <!-- table區域 end -->
              <!-- 分页 start -->
              <aty-row class="fd-category">
                <aty-row>
                  <aty-pagination :total="total" :offset="offset" :limit="db_limit" :show-total="true"
                                  :show-sizer="true" :show-elevator="true" @change="changePage" ref="dbPage"></aty-pagination>
                </aty-row>
              </aty-row>
              <!-- 分页 end -->
            </div>
          <!-- </aty-scroll> -->
          </happy-scroll>
        </aty-tabpane>
        <!-- tabs1結束 -->

        <!-- tabs2開始 -->
        <aty-tabpane v-show="dblbShow">
          <div slot="label">
            <span class="tabs_icon2 tabs_topb"></span>
            <span class="tabs_topt">在办({{zb_total}})</span>
          </div>
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <!-- <aty-scroll :speed="53" class="aty-scroll-2" ref="tabScroll1" name="tabScroll1" :show="false"> -->
            <div class="tabs_main_box">
              <aty-row class="search_option_box">
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">监区:</p>
                  <template v-if="treeData2.length">
                    <aty-select-tree  class="nomal_tree search_option_input" name="valueobject2" :data="treeData2"
                                      v-model="zb_treeValue2" clearable></aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯编号:</p>
                  <aty-input v-model="zb_zfbh" class="search_option_input" clearable></aty-input>
                </aty-col>
                 <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯姓名:</p>
                  <aty-input v-model="zb_zfxm" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">类别:</p>
                  <aty-select v-model="zb_khlx" class="search_option_input" :data="lxDataList" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">审批环节:</p>
                  <aty-select v-model="sphj" class="search_option_input" :data="spDataList" clearable></aty-select>
                </aty-col>
                <aty-col span="18" class="search_option_marginb search_option_textr">
                  <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,zb_limit,1)">
                    <i>
                      <img src="../../assets/images/w-png17.png">
                    </i>
                    <span>查询</span>
                  </aty-button>
                  <aty-button class="search_option_butn2" type="default" @click="reSet()">
                    <i>
                      <img src="../../assets/images/w-png18.png">
                    </i>
                    <span>重置</span>
                  </aty-button>
                </aty-col>
              </aty-row>
              <div class="dr_edit_butn" v-show="xzdbShow">
                <aty-button class="dr_edit_b1" type="primary" @click="addCheck">
                  <i>+</i>
                  <span>新增复查</span>
                </aty-button>
              </div>
              <!-- table區域 start -->
              <aty-table @selection-change="selectChange2" :pageable-data="tableData2" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="index" label="序号" :showOverflowTooltip="false">
                </aty-table-column>
                <aty-table-column prop="jy" label="监狱">
                </aty-table-column>
                <aty-table-column prop="jq" label="监区">
                </aty-table-column>
                <aty-table-column prop="zfxm" label="罪犯姓名">
                  <!--<template slot-scope="props" >
                    <a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxbh"  target="_blank"></a>
                  </template>-->
                </aty-table-column>
                <aty-table-column prop="zfbh" label="罪犯编号">
                </aty-table-column>
                <aty-table-column prop="lx" label="类别" :formatter="lbZh">
                </aty-table-column>
                <aty-table-column prop="fcfhrq" label="申请复查/复核时间">
                </aty-table-column>
                <aty-table-column prop="dqspjd" label="审批环节">
                </aty-table-column>
                <aty-table-column label="操作" :showOverflowTooltip="false">
                  <template slot-scope="scope">
                    <i>
                      <img  @click="goDetails(scope.row)" title="查看详情" class="table_butn" src="../../assets/images/w-png20.png">
                    </i>
                  </template>
                </aty-table-column>
              </aty-table>
              <!-- table區域 end -->
              <!-- 分页 start -->
              <aty-row class="fd-category">
                <aty-row>
                  <aty-pagination :total="total" :offset="offset" :limit="zb_limit" :show-total="true"
                                  :show-sizer="true" :show-elevator="true" @change="changeZbPage" ref="zbPage"></aty-pagination>
                </aty-row>
              </aty-row>
              <!-- 分页 end -->
            </div>
          <!-- </aty-scroll> -->
          </happy-scroll>
        </aty-tabpane>
        <!-- tabs2結束 -->

        <!-- tabs3開始 -->
        <aty-tabpane>
          <div slot="label">
            <span class="tabs_icon3 tabs_topb"></span>
            <span class="tabs_topt">已办</span>
          </div>
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <!-- <aty-scroll :speed="53" class="aty-scroll-2" ref="tabScroll2" name="tabScroll2" :show="false"> -->
            <div class="tabs_main_box">
              <aty-row class="search_option_box">
                <aty-col v-if="isJyj() && ybJyList.length" span="6" class="search_option_marginb">
                  <p class="search_option_text">监狱:</p>
                  <template>
                    <aty-select-tree class="nomal_tree search_option_input" name="valueobject" :data="ybJyList"
                                     v-model="ybJyValue" clearable:jyClear>
                    </aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">监区:</p>
                  <aty-select-tree class="nomal_tree search_option_input" name="valueobject2" ref="selectTree1"
                                   :data="ybJqList" v-model="ybJqValue" clearable>
                  </aty-select-tree>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯编号:</p>
                  <aty-input v-model="yb_zfbh" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯姓名:</p>
                  <aty-input v-model="yb_zfxm" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">类别:</p>
                  <aty-select v-model="yb_khlx" class="search_option_input" :data="lxDataList" clearable></aty-select>
                </aty-col>
                <aty-col span="12" class="search_option_marginb search_option_textr">
                  <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,yb_limit,2)">
                    <i>
                      <img src="../../assets/images/w-png17.png">
                    </i>
                    <span>查询</span>
                  </aty-button>
                  <aty-button class="search_option_butn2" type="default" @click="reSet()">
                    <i>
                      <img src="../../assets/images/w-png18.png">
                    </i>
                    <span>重置</span>
                  </aty-button>
                </aty-col>
              </aty-row>
              <div class="dr_edit_butn" v-show="xzdbShow">
                <aty-button class="dr_edit_b1" type="primary" @click="addCheck">
                  <i>+</i>
                  <span>新增复查</span>
                </aty-button>
              </div>
              <!-- table區域 start -->
              <aty-table @selection-change="selectChange3" :pageable-data="tableData3" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="index" label="序号">
                </aty-table-column>
                <aty-table-column prop="jy" label="监狱">
                </aty-table-column>
                <aty-table-column prop="jq" label="监区">
                </aty-table-column>
                <aty-table-column prop="zfxm" label="罪犯姓名">
                 <!-- <template slot-scope="props" >
                    <a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxbh"  target="_blank"></a>
                  </template>-->
                </aty-table-column>
                <aty-table-column prop="zfbh" label="罪犯编号">
                </aty-table-column>
                <aty-table-column prop="lx" label="类别" :formatter="lbZh">
                </aty-table-column>
                <aty-table-column prop="fcfhrq" label="申请复查/复核时间">
                </aty-table-column>
                <aty-table-column prop="zt" label="复查/复核结果" :formatter="ztZh">
                </aty-table-column>
                <aty-table-column label="操作" :showOverflowTooltip="false">
                  <template slot-scope="scope">
                    <i>
                      <img v-show="(scope.row.lx === '1' && xzfhShow && !scope.row.fcbh && scope.row.zt !='104')"
                           @click="creatReview(scope.row)" title="复核" class="table_butn" src="../../assets/images/fh.png">
                      <img  @click="goDetails(scope.row)" title="查看详情" class="table_butn" src="../../assets/images/w-png20.png">
                    </i>
                  </template>
                </aty-table-column>
              </aty-table>
              <!-- table區域 end -->
              <!-- 分页 start -->
              <aty-row class="fd-category">
                <aty-row>
                  <aty-pagination :total="total" :offset="offset" :limit="yb_limit" :show-total="true"
                                  :show-sizer="true" :show-elevator="true" @change="changeYbPage" ref="ybPage"></aty-pagination>
                </aty-row>
              </aty-row>
              <!-- 分页 end -->
            </div>
          <!-- </aty-scroll> -->
          </happy-scroll>
        </aty-tabpane>
        <!-- tabs3結束 -->
      </aty-tabs>
    </div>

    <!-- 提交 弹窗 -->
    <aty-modal title="提交" footer-hide closable="" ref="pltjWindow" width="500" :mask-closable="false" class="xybsp-modal">
      <aty-select v-model="spr" :data="xybspr" label="下一步审批人" clearable></aty-select>
      <aty-button class="search_option_butn1" type="primary" @click.native="submit">
        <span>提交</span>
      </aty-button>
    </aty-modal>
    <!-- 批量提交 弹窗 -->
    <!--删除弹窗-->
    <aty-modal  title="删除复查复核" class="fd-bj-modal" ok-text="确定" cancel-text="取消" closable ref="deleteRecord" width="400" @on-ok="deleteRecord" @on-cancel="cancelDelete" :mask-closable="false">
      <aty-text text="确定要删除这条内容吗？"></aty-text>
    </aty-modal>
    <!--取消复查弹窗-->
    <aty-modal  title="取消复查" class="fd-bj-modal" ok-text="确定" cancel-text="取消" closable ref="qxFc" width="400" @on-ok="qxFc" @on-cancel="cancelQxfc" :mask-closable="false">
      <aty-text text="确定要取消这条复查内容吗？"></aty-text>
    </aty-modal>
    <!--取消复查弹窗-->
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
        //罪犯编号
        zfbh: "",
        //经办民警
        jbmj: "",
        //罪犯姓名
        zfxm: "",
        khlx: "",
        //考核项目
        khxm: "",
        //主要事由
        zysy: "",
        //状态
        zt: "",
        //监区
        prisonArea: "",
        //审批环节
        sphj: "",
        zb_zfbh:"",
        zb_zfxm:"",
        zb_khlx:"",
        yb_zfxm:"",
        yb_khlx:"",
        yb_zfbh:"",
        // zb_
        offset: 0,
        db_limit:10,
        zb_limit:10,
        yb_limit:10,
        limit: 10,
        //待办的分页信息
        total: 0,
        //在办的分页信息
        zb_total: '0',
        //已办的分页信息
        yb_total: '0',
        db_total:'0',
        jqdataList:[],
        yb_jyDataList:[],
        yb_jqdataList:[],
        zb_jyDataList:[],
        zb_jqdataList:[],
        lxDataList:[
          {
            code: '1',
            name: '复查'
          },
          {
            code: '2',
            name: '复核'
          }
        ],
        spDataLiat:[

        ],
        //待办查询条件-状态
        ztDataList:[
          {
            code: '0',
            name: '保存'
          },
          {
            code: '100',
            name: '待审批'
          },
          {
            code: '102',
            name: '退回'
          }
        ],

        //审批人
        spr:"",
        //审批人假数据
        xybspr:[],
        // table数据
        tableData: [],
        // 选中的table数据
        selectTableData1: [],
        selectTableData2: [],
        selectTableData3: [],
        // tab2 table数据
        tableData2: [],
        // tab3 table数据
        tableData3: [],
        bh:'',
        spDataList:[],
        treeData: [],
        treeData2: [],
        treeValue:'',
        valueobject:{},
        treeValue2:null,
        valueobject2:{},
        xzdbShow:true,
        dblbShow: false,
        // yblbShow: false,
        // zblbShow:false,//已办页签权限跟这菜单权限走
        spShow:false,
        xzfhShow:false,
        offget: 1,
        curUserInfo: {},
        sczt:'',
        scfcx:'',
        lxCode:'',
        //退回查询提请参数
        thTjParams:'',
        //退回任务id
        thTaskId:'',
        //当前任务id
        curTask:'',
        //已办监狱
        ybJyList:[],
        //已办监狱的value
        ybJyValue:null,
        //已办监区的value
        ybJqValue:null,
        //在办监区的值
        zb_treeValue2:null,
        isLoading:false,
        qsjy:false,
        tjTask:'',
        jyClear:false,
        url:_zfxxDetail.url,
        prisonAreaFlag:1,//判断是分监区还是监区审批
      };
    },
    created() {
      this.getCurUserInfo();
      let cxzt = "0";
      this.initData(1, this.db_limit, cxzt);
      this.getJqDataList();
    },
    mounted() {},
    computed: {
      /**
       * @name 已办监区数据
       * @description
       */
      ybJqList() {
        var deptType = this.curUserInfo.deptType;
        var corpId = this.ybJyValue;
        if(corpId == undefined || corpId == "") {
          corpId = this.curUserInfo.corpId;
        }
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        this.getRequest("/api/v1/system/getJq/" + corpId + "/" + deptType + "/" +　isSelectFgyzf).then(resp=> {
          if (resp && resp.status == 200) {
            this.$refs.selectTree1.update(resp.data.ArrayList)
          }
        })
      }
    },
    methods: {
      //复查项转换
      lbZh: function (row, column) {
        var key = "30111006-"+row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      ztZh: function (row, column) {
        var key = "30111014-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        if(row === "103") {
          value.name = "更正";
        }
        if(row === "101") {
          value.name = "驳回";
        }
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      getCurUserInfo() {
        let _this = this;
        _this.curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        let rightList = _this.curUserInfo.userRightList;
        _this.xzdbShow = _this.checkLinkShow("jy.imp.jfkh.fcfh.xzfc", rightList);
        _this.dblbShow = _this.checkLinkShow("jy.imp.jfkh.fcfh.sp", rightList) || _this.checkLinkShow("jy.imp.jfkh.fcfh.xzfc", rightList) || _this.checkLinkShow("jy.imp.jfkh.fcfh.xzfh", rightList) ;
        _this.spShow = _this.checkLinkShow("jy.imp.jfkh.fcfh.sp", rightList);
        //分监区民警新增复核
        _this.xzfhShow = _this.checkLinkShow("jy.imp.jfkh.fcfh.xzfh", rightList);
        _this.jyClear = this.getDeptType();
      },
      //查询已办监狱下拉列表
      jyDataList(){
        this.getRequest("/api/v1/system/getJy").then(resp=> {
          if (resp && resp.status == 200) {
            this.ybJyList =[];
            this.ybJyList = resp.data.ArrayList;
          }
        });
      },
      //获取待办、在办监区下拉列表
      getJqDataList(){
        var deptType = this.curUserInfo.deptType;
        var corpId = this.curUserInfo.corpId;
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        this.getRequest("/api/v1/system/getJq/"+corpId+"/"+deptType+"/"+isSelectFgyzf).then(resp => {
          if (resp && resp.status == 200) {
            this.treeData2 =[];
            this.treeData2 = resp.data.ArrayList;
          }
        });
      },
      // tab点击事件
      tabClick(tab,event){
        if(tab == 0){
          this.db_limit =10
          this.$refs.dbPage.currentPageSize=10
          this.initData(1, this.db_limit, tab);
        }
        if(tab == 1){
          this.zb_limit =10
          this.$refs.zbPage.currentPageSize=10
          this.initData(1, this.zb_limit, tab);
          this.getJqDataList();
          this.sphjDataStorage();
        }
        if(tab == 2){
          this.yb_limit =10
          this.$refs.ybPage.currentPageSize=10
          this.initData(1, this.yb_limit, tab);
          this.jyDataList();
        }
      },
      //获取在办个数
      getZbCount() {
        var params ={
          cxzt: "1",
        }
        this.getRequest("/api/v1/fcfh/getZbCount",params).then(resp => {
          if (resp && resp.status == 200) {
            //获取在办个数
            this.zb_total = resp.data;
          }
        });
      },
      //根据单位级别获取审批环节数据
      sphjDataStorage(){
        this.getRequest("/api/v1/system/sphjData/fcfh").then(resp => {
          if (resp && resp.status == 200) {
            let storageData=resp.data;

            this.spDataList=[];
            for(let i=0,size=storageData.length;i<size; i++){
              let obj={};
              obj.code=storageData[i].taskDefinitionKey;
              obj.name=storageData[i].name;
              this.spDataList.push(obj);
            }
          } else {
            console.error("获取审批操作出错！");
          }
        });
      },
      //获取待办个数
      getDbCount() {
        var params ={
          cxzt: "0",
        }
        this.getRequest("/api/v1/fcfh/getDbCount",params).then(resp => {
          if (resp && resp.status == 200) {
            //获取在办个数
            this.db_total = resp.data;
          }
        });
      },
      //取消复查
      cancelQxfc(){
        this.$refs.qxFc.close()
      },
      //取消删除
      cancelDelete(){
        this.$refs.deleteRecord.close()
      },
      deleteRecord(){
        this.tableData.splice(this.selectRowIndex,1);
        let _this = this;
        var pageSize = this.limit;
        var bh = _this.bh;
        var zt = _this.sczt;
        var lx = _this.scfcx;
        this.deleteRequest("/api/v1/fcfh/deleteFcfh/" + bh+"/"+zt+"/"+lx).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("删除成功");
            _this.queryDataList(this.$refs.dbPage.currentPage, this.$refs.dbPage.currentPageSize, pageSize,0);
          }else{
            Artery.message.error({
               content:"删除失败",
               duration:3
            });
          }
        });
        this.$refs.deleteRecord.close()
      },
      qxFc(){
        this.tableData.splice(this.selectRowIndex,1);
        let _this = this;
        var pageNum = this.offset;
        var pageSize = this.limit;
        var bh = _this.bh;
        var zt = _this.sczt;
        var thTaskId = _this.thTaskId;
        this.deleteRequest("/api/v1/fcfh/deleteFcfh/" + bh+"/"+zt+"/"+thTaskId).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("取消复查成功");
            _this.queryDataList(pageNum, pageSize,0);
          }else{
            Artery.message.error({
               content:"取消复查失败",
               duration:3
            });
          }
        });
        this.$refs.qxFc.close()
      },
      //取消复查
      goQxfc (scope) {
        this.$refs.qxFc.open();
        this.selectRowIndex=scope.$index
        this.bh = scope.row.bh;
        this.sczt=scope.row.zt;
        // this.scfcx=scope.row.lx;
        this.thTaskId = scope.row.taskid
      },
      //删除按钮打开弹窗
      goDelete(scope) {
        this.$refs.deleteRecord.open();
        this.selectRowIndex=scope.$index
        this.bh = scope.row.bh;
        this.sczt=scope.row.zt;
        this.scfcx=scope.row.lx
      },
      //审批按钮
      goApproval(item) {
        // 判断是 复查审批 还是 复核审批
        let _this = this;
        if(item.row.lx == '1') {
          // let prisonAreaFlag;
          _this.getRequest("/api/v1/fcfh/getFcDetail/" + item.row.bh).then(resp => {
            if (resp && resp.status == 200) {
              _this.getRequest("/api/v1/system/isOverSp/"+ item.row.taskid).then(resp1 => {
                if (resp1 && resp1.status == 200) {
                  if (resp1.data) {
                    _this.prisonAreaFlag = 2;
                  }
                  if(localStorage.getItem("checkApprovalData")){
                    localStorage.removeItem("checkApprovalData")
                  }
                  localStorage.setItem("checkApprovalData", JSON.stringify({fhfhMap: resp.data.HashMap.files, fcfh: item.row,prisonAreaFlag:_this.prisonAreaFlag}));
                  _this.$router.push({ path: "/reviewCheck/checkApproval"});
                }
              });
            }
          });
        } else {
          _this.getRequest("/api/v1/fcfh/getFhDetail/"+ item.row.bh).then(resp => {
            if (resp && resp.status == 200) {
              if(localStorage.getItem("reviewApprovalData")){
                localStorage.removeItem("reviewApprovalData")
              }
              localStorage.setItem("reviewApprovalData", JSON.stringify({fhfhMap:resp.data.HashMap.files,fcfh:item.row}));
              _this.$router.push({ path: "/reviewCheck/reviewApproval"});
            }
          });
        }
      },
      //编辑按钮
      goEdit(row) {
        // 判断是复查还是复核
        var _this = this;
        var files=[];
        //查询详情
        _this.getRequest("/api/v1/fcfh/getFcDetail/"+ row.bh).then(resp => {
          if (resp && resp.status == 200) {
            files.push(resp.data.HashMap.files);
            if (row.lx == "1") {
              if(localStorage.getItem("checkEditData")){
                localStorage.removeItem("checkEditData")
              }
              localStorage.setItem("checkEditData", JSON.stringify({edit: 'edit', files: resp.data.HashMap.files, sqxq: resp.data.HashMap.spxq, fcfh: row}));
              this.$router.push({path: "/reviewCheck/checkCreate"})
            } else if (row.lx === "2") {
              if(localStorage.getItem("reviewEditData")){
                localStorage.removeItem("reviewEditData")
              }
              localStorage.setItem("reviewEditData", JSON.stringify({edit: 'edit', files: resp.data.HashMap.files, sqxq: resp.data.HashMap.spxq, fcfh: row}));
              this.$router.push({path: "/reviewCheck/reviewCreate"})
            }
          }
        })
      },
      // 跳转查看详情
      goDetails(row) {
        let _this = this;
        if (row.lx == '1'){
          _this.getRequest("/api/v1/fcfh/getFcDetail/"+ row.bh).then(resp => {
            if (resp && resp.status == 200) {
              if(localStorage.getItem("fcfhDetailData")){
                localStorage.removeItem("fcfhDetailData")
              }
              localStorage.setItem("fcfhDetailData", JSON.stringify({fhfhMap:resp.data.HashMap.files,fcfh:row,fhxq:false,spxq:resp.data.HashMap.spxq}));
              _this.$router.push({path: "/reviewCheck/reviewCheckDetail"});
            }
          });
        } else {
          _this.getRequest("/api/v1/fcfh/getFhDetail/"+ row.bh).then(resp => {
            if (resp && resp.status == 200) {
              if(localStorage.getItem("fcfhDetailData")){
                localStorage.removeItem("fcfhDetailData")
              }
              localStorage.setItem("fcfhDetailData", JSON.stringify({fhfhMap:resp.data.HashMap.files,fcfh:row,fhxq:true,spxq:resp.data.HashMap.spxq}));
              _this.$router.push({path: "/reviewCheck/reviewCheckDetail"});
            }
          });
        }
      },
      //列表提交按钮
      singleSubmit(row){
        this.isLoading = true;
        let _this = this;
        _this.bh = row.bh;
        _this.lxCode = row.lx;
        var xybSprParams = {
          curTaskId:"",
          spAuthority:"jy.imp.jfkh.splc.fcfhsp.",
          corpId:_this.curUserInfo.corpId
        };
        //查询当前数据的任务id
        let tjstatus = false;
        _this.getRequest("/api/v1/fcfh/getFcfhTaskByBh/"+row.bh).then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data !=undefined && resp.data !="") {
              row.taskid = resp.data;
              tjstatus = true;
            }
          }
          if (!tjstatus) {
            var tjParam ={
              bh:row.bh,
              lx:row.lx
            }
            //获取下一步审批人,先开启提请流程，返回taskId
            _this.getRequest("/api/v1/fcfh/fjqMjTj/",tjParam).then(resp => {
              if (resp && resp.status == 200) {
                if (resp.data.id) {
                  _this.curTask = resp.data;
                  xybSprParams.curTaskId = _this.curTask.id;
                  _this.getRequest("/api/v1/system/getTaskNextSprs/",xybSprParams).then(resp => {
                    if (resp && resp.status == 200) {
                      _this.xybspr=[];
                      _this.xybspr = resp.data;
                      _this.isLoading = false;
                      _this.$refs.pltjWindow.open();
                    }
                  });
                }
              }
            });
          } else {
            //退回参数
            if (row.zt =='102') {
              _this.thTjParams = {
                bh:row.bh,
                taskId:row.taskid,
                dqspr:_this.spr,
                zt:row.zt,
                yspr:row.yspr+";"+_this.spr,
                lx:row.lx
              };
            }
            //一条数据多次提交的任务参数
            _this.tjTask= {
              id:row.taskid,
              taskDefinitionKey:row.spjdkey,
            };
            xybSprParams.curTaskId = row.taskid;
            _this.getRequest("/api/v1/system/getTaskNextSprs/",xybSprParams).then(resp => {
              if (resp && resp.status == 200) {
                _this.xybspr=[];
                _this.xybspr = resp.data;
                _this.isLoading = false;
                _this.$refs.pltjWindow.open();
              }
            });
          }
        });
      },
      //提交
      submit() {
        if (this.spr =="") {
          Artery.message.info({
             content:"下一步审批人不能为空",
             duration:3
          });
          return;
        }
        this.isLoading=true;
        let _this = this;
        //退回重新提请
        var params = _this.thTjParams;
        if (params.zt === "102") {
          params.dqspr = _this.spr;
          params.yspr = params.yspr+";"+ _this.spr;
          _this.postRequest("/api/v1/fcfh/thAndTjFcfh/",params).then(resp => {
            if (resp && resp.status == 200) {
              _this.isLoading=false;
              _this.$refs.pltjWindow.close();
              _this.queryDataList(this.$refs.dbPage.currentPage, this.$refs.dbPage.currentPageSize, 0);
            }
          });
        } else {
          //解决一条数据多次提交的问题
          if (_this.curTask =="") {
            _this.curTask = _this.tjTask;
          }
          var spvo ={
            bh: _this.bh,
            spr:_this.spr,
            fcx:_this.lxCode,
            fqr:JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userId,
            curTask: _this.curTask
          }
          _this.postRequest("/api/v1/fcfh/cbDbFcfh/",spvo).then(resp => {
            if(resp && resp.status == 200) {
              _this.isLoading=false;
              _this.$refs.pltjWindow.close();
              _this.queryDataList(this.$refs.dbPage.currentPage, this.$refs.dbPage.currentPageSize,0);
            }
          });
        }
      },
      //待办换页
      changePage(pageSize) {
        this.db_limit=this.$refs.dbPage.currentPageSize;
        this.db_offset=this.$refs.dbPage.currentPage;
        this.queryDataList(this.db_offset, this.db_offset,0)
      },
      //在办换页
      changeZbPage(pageSize) {
        this.zb_limit=this.$refs.zbPage.currentPageSize;
        this.zb_offset=this.$refs.zbPage.currentPage;
        this.queryDataList(this.zb_limit, this.zb_offset,1)
      },
      //已办换页
      changeYbPage(pageSize) {
        this.yb_limit=this.$refs.ybPage.currentPageSize;
        this.yb_offset=this.$refs.ybPage.currentPage;
        this.queryDataList(this.yb_offset, this.yb_limit,2)
      },
      //初始化查询方法
      initData(pageNum, pageSize, tab) {
        this.offset=(pageNum-1)*pageSize;
        this.queryDataList(pageNum, pageSize, tab);
        // this.getDbCount();
        // this.getZbCount();
      },
      //条件查询方法
      queryDataList(pageNum, pageSize,tab) {
        this.offset=(pageNum-1)*pageSize;
        let cxzt = ""; //获取 待办，在办，已办状态
        let _this = this;
        let params = {};
        if (tab == 0) {
          params={
            cxzt: "0",
            zfxm: _this.zfxm,
            zfbh: _this.zfbh,
            zt: _this.zt,
            deptList:_this.treeValue2,
            lx:_this.khlx,
          }
        } else if (tab ==1) {
          params={
            cxzt: "1",
            zfxm: _this.zb_zfxm,
            zfbh: _this.zb_zfbh,
            sphj: _this.sphj,
            deptList:_this.zb_treeValue2,
            lx:_this.zb_khlx,
          }
        } else {
          params={
            cxzt: "2",
            zfxm: _this.yb_zfxm,
            zfbh: _this.yb_zfbh,
            corpId:_this.ybJyValue,
            deptList:_this.ybJqValue,
            lx:_this.yb_khlx
          }
        }
        this.getRequest("/api/v1/fcfh/getFcfhList/" + pageNum + "/" + pageSize, params).then(resp => {
          if (resp && resp.status == 200) {
            let list = resp.data.PageInfo.list;
            if (list == undefined || list == null) {
              return;
            }
            _this.total = resp.data.PageInfo.total;
            if(tab == 0) {
              _this.db_total = resp.data.PageInfo.total;
              _this.tableData =[];
              _this.tableData = list;
              // _this.$nextTick(function(){
              //   _this.$refs.tabScroll0.update()
              // })
            }else if(tab == 1) {
              _this.zb_total = resp.data.PageInfo.total;
              _this.tableData2 = list;
              // _this.$nextTick(function(){
              //   _this.$refs.tabScroll1.update(0,0)
              // })
            }else if(tab == 2) {
              _this.tableData3 = list;
              // _this.$nextTick(function(){
              //   _this.$refs.tabScroll2.update(0,0)
              // })
            }
            this.getDbCount();
            this.getZbCount();
          }
        });
      },
      addCheck() {
        if(localStorage.getItem("checkEditData")){
          localStorage.removeItem("checkEditData")
        }
        this.$router.push({ path: "/reviewCheck/checkCreate" });
      },
      reSet() {
        this.zfbh = "";
        this.zfxm = "";
        this.treeValue2 = null;
        this.zt = "";
        this.khlx = "";
        this.sphj = "";
        this.zb_zfxm = "";
        this.zb_treeValue2 = null;
        this.zb_khlx = "";
        this.zb_zfbh = "";
        this.yb_zfxm = "";
        this.yb_zfbh = "";
        this.ybJyValue = null;
        this.ybJqValue = null;
        this.yb_khlx = "";
      },
      // 新建复核
      creatReview(row) {
        var fcfh = row;
        if(localStorage.getItem("xzFhData")){
          localStorage.removeItem("xzFhData")
        }
        localStorage.setItem("xzFhData", JSON.stringify({fcfh:fcfh}));
        this.$router.push({path: '/reviewCheck/reviewCreate'});
      },
      //选中的数据
      selectChange1(selectedRows) {
        this.selectTableData1 = selectedRows;
      },
      selectChange2(selectedRows) {
        this.selectTableData2 = selectedRows;
      },
      selectChange3(selectedRows) {
        this.selectTableData3 = selectedRows;
      }
    }
  };
</script>
<style scoped>
  .tabs_main_box .search_option_marginb:nth-child(5n){
    clear:both;
  }
  .fd-home-wrap .aty-tabs-content{
    height:calc(100% - 54px);
  }
  .fd-home-wrap .aty-tabs{
    /* overflow-x:hidden;
    overflow-y: auto;
    min-height:500px; */
    height:100%;
  }
  .tabs_icon1 {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: url(../../assets/images/w-png8.png) no-repeat;
  }

  .tabs_icon2 {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: url(../../assets/images/w-png10.png) no-repeat;
  }

  .tabs_icon3 {
    display: inline-block;
    width: 16px;
    height: 18px;
    background: url(../../assets/images/w-png12.png) no-repeat;
  }

  .aty-tabs-nav .aty-tabs-tab-active .tabs_icon1 {
    background: url(../../assets/images/w-png7.png) no-repeat;
  }

  .aty-tabs-nav .aty-tabs-tab-active .tabs_icon2 {
    background: url(../../assets/images/w-png9.png) no-repeat;
  }

  .aty-tabs-nav .aty-tabs-tab-active .tabs_icon3 {
    background: url(../../assets/images/w-png11.png) no-repeat;
  }

  .search_option_box .aty-input {
    height: 34px;
  }
  .search_option_box .search_option_text {
    display: inline-block;
    width: 21%;
    text-align: right;
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
    text-align: right;
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
  .npl_table_input {
    width: 100%;
    height: 30px;
    border: 1px solid #dddee1;
    border-radius: 3px;
    color: #333;
  }
</style>
