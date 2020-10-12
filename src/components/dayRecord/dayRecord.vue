<template>

  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <loading :isLoading="isLoading"></loading>
    <!-- 删除 确认弹窗 -->
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="delRjzListItem"></confirmbox>
    <confirmbox v-if="showConfirm2" :confirmtext="confirmtext2" @butnClick="confirmCancelRjz"></confirmbox>
    <div class="main_name"><aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
    <div class="main_box fd-day-record">
      <aty-modal :mask-closable="false" ok-text="确定" cancel-text="取消" closable ref="delPopWindow" width="500">
        <aty-text text="这是内容"></aty-text>
      </aty-modal>
      <aty-tabs type="card" @tabclick="tabClick">
        <!-- tabs1開始 -->
        <aty-tabpane v-if="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.sp') || checkButtonShow('jy.imp.jfkh.rjz.xz')">
          <div slot="label">
            <span class="tabs_icon1 tabs_topb"></span>
            <span class="tabs_topt">待办({{db_count}})</span>
          </div>
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzTab0Scroll" name="rjzTab0Scroll" :show="false"> -->
            <div class="tabs_main_box">
              <aty-row class="search_option_box">
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">发生日期:</p>
                  <aty-date-picker v-model="fssjq" class="dr_date_pick" type="date" clearable
                                   :value="monthFirstDate"></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">至</p>
                  <aty-date-picker v-model="fssjz" class="dr_date_pick" type="date" clearable
                                   :value="nowDate"></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯编号:</p>
                  <aty-input v-model="zfbh" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">罪犯姓名:</p>
                  <aty-input v-model="zfxm" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">经办日期:</p>
                  <aty-date-picker v-model="jbrqq" class="dr_date_pick" type="date" clearable></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">至</p>
                  <aty-date-picker v-model="jbrqz" class="dr_date_pick" type="date" clearable></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">监区:</p>
                  <template v-if="jqDataList.length">
                    <aty-select-tree  v-model="dept" class="search_option_input" :data="jqDataList" clearable></aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">小组:</p>
                  <aty-input v-model="szxz" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">类型:</p>
                  <aty-select transfer v-model="khlx" class="search_option_input" :data="lxData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">考核依据:</p>
                  <aty-input v-model="khyj" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">考核部分:</p>
                  <aty-select transfer v-model="khxm" class="search_option_input" :data="khxmData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">状态:</p>
                  <aty-select transfer v-model="zt" class="search_option_input" :data="dbztData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">主要事由:</p>
                  <aty-input v-model="zysy" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="18" class="search_option_marginb search_option_textr" >
                  <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,limit,0)">
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
              <div class="dr_edit_butn">
                <aty-button v-show="checkButtonShow('jy.imp.jfkh.rjz.xz')" class="dr_edit_b1" type="primary" @click="addDayRecord">
                  <i>+</i>
                  <span>新增日记载</span>
                </aty-button>
                <aty-button v-show="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.abtj')" class="dr_edit_b1" type="primary"
                            @click="manySubmit">
                  <img src="../../assets/images/w-png15.png">
                  <span>全部提交</span>
                </aty-button>
                <aty-button v-if="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.plsp')" class="dr_edit_b1" type="primary"
                            @click="manyCheck">
                  <i>
                    <img src="../../assets/images/w-png16.png">
                  </i>
                  <span>批量审批</span>
                </aty-button>
              </div>
              <!-- table區域 start -->
              <aty-table @selection-change="selectChange1" :pageable-data="tableData" style="width: 100%; margin-top: 20px;" :exp-all="false"
                         :exp-current-page="false">
                <aty-table-column type="selection" width="45"  v-if="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.plsp')"></aty-table-column>
                <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
                <aty-table-column prop="bh" v-if="false" label="编号"></aty-table-column>
                <aty-table-column prop="hyjlBh" v-if="false" label="合议记录编号"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号" width="130"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名" width="130">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.jfkhZfxx.xm"  v-text="props.row.jfkhZfxx.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.zyjq" label="监区"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.szxz" label="小组" width="60"></aty-table-column>
                <aty-table-column prop="fsrq" label="发生时间" :formatter="df" width="130"></aty-table-column>
                <aty-table-column prop="khxm" label="考核部分" :formatter="khxmf" width="60"></aty-table-column>
                <aty-table-column prop="khlx" label="类型" :formatter="khlxf" width="100"></aty-table-column>
                <aty-table-column prop="khyj" label="考核依据" width="100"></aty-table-column>
                <aty-table-column prop="yjfs" label="加扣分分数" width="140"></aty-table-column>
                <aty-table-column prop="zysy" label="主要事由"></aty-table-column>
                <aty-table-column prop="zt" label="状态" :formatter="spztf" width="100"></aty-table-column>
                <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
                  <template slot-scope="scope">
                    <i>
                      <img @click="goView(scope.row.bh,scope.row.hyjlBh)" title="查看" class="table_butn" src="../../assets/images/w-png20.png">
                      <img v-if="scope.row.zt=='100'" v-show="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.sp')" @click="tab1CzSp(scope)" title="审批" class="table_butn" src="../../assets/images/w-png21.png">
                      <img v-if="scope.row.zt=='0'||scope.row.zt=='102'" @click="goUpdate(scope.row)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png">
                      <img v-if="scope.row.zt=='0'" @click="goDelete(scope.row.bh)" title="删除" class="table_butn" src="../../assets/images/w-png23.png">
                      <img v-if="scope.row.zt=='102'" @click="cancelRjz(scope.row.bh)" title="取消日记载" class="table_butn" src="../../assets/images/cancel.png">
                    </i>
                  </template>
                </aty-table-column>
              </aty-table>
              <!-- table區域 end -->
              <!-- 分页 start -->
              <aty-row class="fd-category">
                <aty-row>
                  <aty-pagination :total="total" :offset="offset" :limit="limit" :show-total="true" :show-sizer="true"
                                  :show-elevator="true" @change="changePage" :limit-opts="limitOpts" ref="dbPage"
                                  @page-size-change="pageSizeChange">
                  </aty-pagination>
                </aty-row>
              </aty-row>
            </div>
          <!-- </aty-scroll> -->
          </happy-scroll>
        </aty-tabpane>

        <!-- tabs2開始 -->
        <aty-tabpane v-if="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.sp') || checkButtonShow('jy.imp.jfkh.rjz.xz')">
          <div slot="label">
            <span class="tabs_icon2 tabs_topb"></span>
            <span class="tabs_topt">在办({{zb_count}})</span>
          </div>
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzTab1Scroll" name="rjzTab1Scroll" :show="false"> -->
            <div class="tabs_main_box">
              <aty-row class="search_option_box">
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">发生日期:</p>
                  <aty-date-picker v-model="zb_fssjq" class="dr_date_pick" type="date" clearable
                                   :value="monthFirstDate"></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">至</p>
                  <aty-date-picker v-model="zb_fssjz" class="dr_date_pick" type="date" clearable
                                   :value="nowDate"></aty-date-picker>
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
                  <p class="search_option_text">经办日期:</p>
                  <aty-date-picker v-model="zb_jbrqq" class="dr_date_pick" type="date" clearable></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">至</p>
                  <aty-date-picker v-model="zb_jbrqz" class="dr_date_pick" type="date" clearable></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">经办民警:</p>
                  <aty-input v-model="zb_jbmj" class="search_option_input"  clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">监区:</p>
                  <template v-if="jqDataList.length">
                    <aty-select-tree  v-model="zb_dept" class="search_option_input" :data="jqDataList" clearable></aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">小组:</p>
                  <aty-input v-model="zb_szxz" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">类型:</p>
                  <aty-select transfer v-model="zb_khlx" class="search_option_input" :data="lxData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">考核依据:</p>
                  <aty-input v-model="zb_khyj" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">考核部分:</p>
                  <aty-select transfer v-model="zb_khxm" class="search_option_input" :data="khxmData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">审批环节:</p>
                  <aty-select transfer v-model="zb_sphj" class="search_option_input" :data="sphjData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">主要事由:</p>
                  <aty-input v-model="zb_zysy" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="12" class="search_option_marginb search_option_textr">
                  <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,zb_limit,1)">
                    <i>
                      <img src="../../assets/images/w-png17.png">
                    </i>
                    <span>查询</span>
                  </aty-button>
                  <aty-button class="search_option_butn2" type="default" @click="reSet1()">
                    <i>
                      <img src="../../assets/images/w-png18.png">
                    </i>
                    <span>重置</span>
                  </aty-button>
                </aty-col>
              </aty-row>
              <div class="dr_edit_butn">
                <aty-button v-show="checkButtonShow('jy.imp.jfkh.rjz.xz')" class="dr_edit_b1" type="primary" @click="addDayRecord">
                  <i>+</i>
                  <span>新增日记载</span>
                </aty-button>
              </div>
              <!-- table區域 start -->
              <aty-table @selection-change="selectChange2" :pageable-data="tableData2" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
                <aty-table-column prop="bh" v-if="false" label="编号"></aty-table-column>
                <aty-table-column prop="hyjlBh" v-if="false" label="合议记录编号"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号" width="130"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名" width="130">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.jfkhZfxx.xm"  v-text="props.row.jfkhZfxx.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.zyjq" label="监区"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.szxz" label="小组" width="60"></aty-table-column>
                <aty-table-column prop="fsrq" label="发生时间" :formatter="df" width="130"></aty-table-column>
                <aty-table-column prop="khxm" label="考核部分" :formatter="khxmf"></aty-table-column>
                <aty-table-column prop="khlx" label="类型" :formatter="khlxf" width="100"></aty-table-column>
                <aty-table-column prop="khyj" label="考核依据" width="100"></aty-table-column>
                <aty-table-column prop="yjfs" label="加扣分分数" width="140"></aty-table-column>
                <aty-table-column prop="dqspjd" label="审批环节"></aty-table-column>
                <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
                  <template slot-scope="scope">
                    <i>
                      <img @click="goView(scope.row.bh,scope.row.hyjlBh)" title="查看" class="table_butn" src="../../assets/images/w-png20.png">
                      <img v-show="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.schyjl')" title="上传合议记录" @click="showMeetingList(scope.row)" class="table_butn" src="../../assets/images/w-png19.png">
                    </i>
                  </template>
                </aty-table-column>
              </aty-table>
              <!-- 分页 start -->
              <aty-row class="fd-category">
                <aty-row>
                  <aty-pagination :total="zb_total" :offset="zb_offset" :limit="zb_limit" :show-total="true"
                                  :show-sizer="true" :show-elevator="true" @change="changeZbPage"
                                  :limit-opts="limitOpts" ref="zbPage" @page-size-change="pageSizeChange">
                  </aty-pagination>
                </aty-row>
              </aty-row>
            </div>
          <!-- </aty-scroll> -->
          </happy-scroll>
        </aty-tabpane>

        <!-- tabs3開始 -->
        <aty-tabpane v-if="true">
          <div slot="label">
            <span class="tabs_icon3 tabs_topb"></span>
            <span class="tabs_topt">已办</span>
          </div>
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
          <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzTab2Scroll" name="rjzTab2Scroll" :show="false"> -->
            <div class="tabs_main_box tabs_main_height">
              <aty-row class="search_option_box">
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">发生日期:</p>
                  <aty-date-picker v-model="yb_fssjq" class="dr_date_pick" type="date" clearable
                                   :value="monthFirstDate"></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">至</p>
                  <aty-date-picker v-model="yb_fssjz" class="dr_date_pick" type="date" clearable
                                   :value="nowDate"></aty-date-picker>
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
                  <p class="search_option_text">经办日期:</p>
                  <aty-date-picker v-model="yb_jbrqq" class="dr_date_pick" type="date" clearable></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">至</p>
                  <aty-date-picker v-model="yb_jbrqz" class="dr_date_pick" type="date" clearable></aty-date-picker>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">经办民警:</p>
                  <aty-input v-model="yb_jbmj" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">小组:</p>
                  <aty-input v-model="yb_szxz" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">类型:</p>
                  <aty-select transfer v-model="yb_khlx" class="search_option_input" :data="lxData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">考核部分:</p>
                  <aty-select transfer v-model="yb_khxm" class="search_option_input" :data="khxmData" clearable></aty-select>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">考核依据:</p>
                  <aty-input v-model="yb_khyj" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">状态:</p>
                  <aty-select transfer v-model="yb_zt" class="search_option_input" :data="ybztData" clearable></aty-select>
                </aty-col>
                <aty-col v-if="isJyj() && jyDataList.length"  span="6" class="search_option_marginb">
                  <p class="search_option_text">监狱:</p>
                  <template>
                    <aty-select-tree   class="nomal_tree search_option_input fd-jq" name="valueobject2" :data="jyDataList"
                                     v-model="yb_corp" clearable placement ="top">
                    </aty-select-tree>
                  </template>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">监区:</p>
                  <aty-select-tree  v-model="yb_dept" class="search_option_input fd-jq" ref="selectTree1"
                                    :data="ybJqDataList" clearable placement ="top">
                  </aty-select-tree>
                </aty-col>
                <aty-col span="6" class="search_option_marginb">
                  <p class="search_option_text">主要事由:</p>
                  <aty-input v-model="yb_zysy" class="search_option_input" clearable></aty-input>
                </aty-col>
                <aty-col span="6" class="search_option_marginb search_option_textr">
                  <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,yb_limit,2)">
                    <i>
                      <img src="../../assets/images/w-png17.png">
                    </i>
                    <span>查询</span>
                  </aty-button>
                  <aty-button class="search_option_butn2" type="default" @click="reSet2()">
                    <i>
                      <img src="../../assets/images/w-png18.png">
                    </i>
                    <span>重置</span>
                  </aty-button>
                </aty-col>
              </aty-row>
              <div class="dr_edit_butn">
                <aty-button v-show="checkButtonShow('jy.imp.jfkh.rjz.xz')" class="dr_edit_b1" type="primary" @click="addDayRecord">
                  <i>+</i>
                  <span>新增日记载</span>
                </aty-button>
                <aty-button v-show="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.jfkhgsb')" class="dr_edit_b1" type="primary"
                            @click="showJfkhList">
                  <span>计分考核公示表</span>
                </aty-button>
              </div>

              <!-- table區域 start -->
              <aty-table @selection-change="selectChange3" :pageable-data="tableData3"
                         style="width: 100%; height:100%;margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
                <aty-table-column prop="bh" v-if="false" label="编号"></aty-table-column>
                <aty-table-column prop="hyjlBh" v-if="false" label="合议记录编号"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号" width="130"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名" width="130">
                  <!--<template slot-scope="props" >-->
                    <!--<a :title="props.row.jfkhZfxx.xm"  v-text="props.row.jfkhZfxx.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                  <!--</template>-->
                </aty-table-column>
                <aty-table-column prop="jfkhZfxx.zyjq" label="监区"></aty-table-column>
                <aty-table-column prop="jfkhZfxx.szxz" label="小组" width="60"></aty-table-column>
                <aty-table-column prop="fsrq" label="发生时间" :formatter="df" width="130"></aty-table-column>
                <aty-table-column prop="khxm" label="考核部分" :formatter="khxmf"></aty-table-column>
                <aty-table-column prop="khlx" label="类型" :formatter="khlxf" width="100"></aty-table-column>
                <aty-table-column prop="khyj" label="考核依据" width="100"></aty-table-column>
                <aty-table-column prop="yjfs" label="加扣分分数" width="140"></aty-table-column>
                <aty-table-column prop="zysy" label="主要事由"></aty-table-column>
                <aty-table-column prop="zt" label="状态" :formatter="spztf" width="100"></aty-table-column>
                <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
                  <template slot-scope="scope">
                    <i>
                      <img @click="goView(scope.row.bh,scope.row.hyjlBh)" title="查看" class="table_butn" src="../../assets/images/w-png20.png">
                      <img v-show="checkButtonShow('jy.imp.jfkh.rjz.rjzlb.schyjl')" title="上传合议记录" @click="showMeetingList(scope.row)" class="table_butn" src="../../assets/images/w-png19.png">
                    </i>
                  </template>
                </aty-table-column>
              </aty-table>
              <!-- 分页 start -->
              <aty-row class="fd-category">
                <aty-row>
                  <aty-pagination :total="yb_total" :offset="yb_offset" :limit="yb_limit" :show-total="true"
                                  :show-sizer="true" :show-elevator="true" @change="changeYbPage"
                                  :limit-opts="limitOpts" ref="ybPage" @page-size-change="pageSizeChange">
                  </aty-pagination>
                </aty-row>
              </aty-row>
            </div>
          <!-- </aty-scroll> -->
          </happy-scroll>
        </aty-tabpane>
      </aty-tabs>
    </div>
    <!-- 计分考核公示表 弹窗 -->
    <aty-modal :mask-closable="false" class="rl_pop_box" ref="modalWidiow1" width="1000px" height="500px" closable="">
      <div v-if="!isHistoryFlag" class="pop_title">计分考核公示表</div>
      <div v-if="isHistoryFlag" class="pop_title">历史公示表</div>
      <div class="pop_main_box">
        <div class="dr_edit_butn">
          <aty-button v-if="isHistoryFlag" class="dr_edit_b1" type="primary" @click="goBackList">
            <span>现公示表</span>
          </aty-button>
          <aty-button v-if="!isHistoryFlag" class="dr_edit_b1" type="primary" @click="showHistoryList">
            <span>历史公示表</span>
          </aty-button>
          <aty-button v-if="!isHistoryFlag" class="dr_edit_b1" type="primary" @click="dayinButn">
            <span>导出</span>
          </aty-button>
        </div>
        <aty-table :pageable-data="popTableData" height="450" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
          <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
          </aty-table-column>
          <aty-table-column type="bh" label="编号" v-if="false">
          </aty-table-column>
          <aty-table-column prop="jfkhZfxx.xm" label="罪犯姓名" width="100">
          </aty-table-column>
          <aty-table-column prop="jfkhZfxx.zfbh" label="罪犯编号" width="140">
          </aty-table-column>
          <aty-table-column prop="fsrq" label="发生日期" :formatter="df" width="120"></aty-table-column>
          <aty-table-column prop="zysy" label="事由">
          </aty-table-column>
          <aty-table-column prop="mjyj" label="民警意见" width="100">
          </aty-table-column>
          <aty-table-column v-if="isHistoryFlag" prop="gsrq" label="导出时间" :formatter="df" width="100">
          </aty-table-column>
          <aty-table-column v-if="isHistoryFlag" label="操作" width="140" :showOverflowTooltip="false">
            <template slot-scope="scope">
              <i>
                <img title="取消公示" class="table_butn" src="../../assets/images/w-png23.png" @click="cancelGsRjz(scope.row.bh)">
              </i>
            </template>
          </aty-table-column>
        </aty-table>
      </div>
    </aty-modal>

    <!-- 上传合议记录 弹窗 -->
    <aty-modal :mask-closable="false" class="rl_pop_box" ref="modalWidiow2" width="650px" closable="">
      <div class="pop_title">上传合议记录</div>
      <div class="pop_main_box">
        <div class="dr_edit_butn">
          <aty-row>
            <aty-col span='6'><aty-upload class="leftbtn" :max-size = 5000
                                          :max = 5
                                          :min = 0
                                          :multiple="true" action="//jsonplaceholder.typicode.com/posts/"
                                          :before-upload="handleUpload">
              <aty-button type="ghost" class="fd-btn-green fd-btn-upload">
                选择文件
              </aty-button>
            </aty-upload></aty-col>
            <aty-col span='18'>
              <aty-panel class="leftbtn"  v-if="uploadfiles != null && uploadfiles.length > 0">
                <aty-button :loading="loadingStatus" @click="uploadBtn" class="fd-btn-green fd-btn-upload">
                  点击上传
                </aty-button>
              </aty-panel>
            </aty-col>
          </aty-row>
          <aty-row v-if="uploadfiles != null && uploadfiles.length > 0">
            <aty-panel v-for="(item,index) in uploadfiles" :key="item.lastModified">
              <aty-text v-text="item.name"></aty-text>
              <aty-text @click="deleteFile(uploadfiles,index)" class="delete-icon">
                <aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon>
              </aty-text>
            </aty-panel>
          </aty-row>
        </div>
        <aty-table :pageable-data="popTableData2" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
          <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
          </aty-table-column>
          <aty-table-column prop="entityShowname" label="名称">
          </aty-table-column>
          <aty-table-column label="操作" width="140" :showOverflowTooltip="false">
            <template slot-scope="scope">
              <i>
                <img title="删除" class="table_butn" src="../../assets/images/w-png23.png" @click="delHyjl(scope.row)">
              </i>
            </template>
          </aty-table-column>
        </aty-table>
      </div>
    </aty-modal>

    <!-- 批量审批 弹窗 -->
    <aty-modal :mask-closable="false" class="rl_pop_box" ref="modalWidiow4" width="800px" closable="">
      <div class="pop_title">批量审批</div>
      <div class="pop_main_box">
        <aty-select label="审批意见" transfer class="npl_seleted" v-model="spyj" :data="spyjList"
                    @change="sfzsSPR(spyj,hasSpr)"></aty-select>
        <aty-table :pageable-data="popTableData3" style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
          <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
          </aty-table-column>
          <aty-table-column prop="zfxm" label="罪犯姓名" width="110">
          </aty-table-column>
          <aty-table-column label="备注">
            <template slot-scope="scope">
              <div><input class="npl_table_input" v-model="scope.row.bz"></div>
            </template>
          </aty-table-column>
          <aty-table-column v-if='spyj==1' label="下一步审批人" width="140">
            <template slot-scope="scope">
              <aty-select v-if="!scope.row.isOverSp"  transfer class="npl_seleted" v-model="scope.row.spr"
                          clearable :data="scope.row.sprlb" @change="changeAtOnce(scope.row.spr)">
              </aty-select>
            </template>
          </aty-table-column>
        </aty-table>
        <div class="drw_save_butn">
          <aty-button @click="saveButnJq()" :disabled="tjDisable" class="search_option_butn1" type="primary">
            <i>
              <img src="../../assets/images/save.png">
            </i>
            <span>提交</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <!-- tab1 操作 审批 弹窗 -->
    <aty-modal :mask-closable="false" class="rl_pop_box" ref="modalWidiow5" width="650px" closable="">
      <div class="pop_title">审批</div>
      <div class="pop_main_box fd-sp-modal">
        <aty-row class="fd-sp-row">
          <aty-col span='4' class="fd-sp-col1">罪犯姓名</aty-col>
          <aty-col span='20' class="fd-sp-col2">{{tab1PopZfxmName}}</aty-col>
        </aty-row>
        <aty-row class="fd-sp-row">
          <aty-col span='4' class="fd-sp-col1">审批意见</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-radio-group :data-list="tab1PopSpyjList" v-model="tab1PopSpyj" @change="sfzsSPR(tab1PopSpyj,hasSpr)"></aty-radio-group>
          </aty-col>
        </aty-row>
        <aty-row class="fd-sp-row">
          <aty-col span='4' :class="tab1PopSpyj=='1'?'fd-sp-col1':'fd-sp-col1 fd-sp-required'">备注</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-textarea v-model="tab1PopBz" placeholder="请输入" :autosize="{minRows:2,maxRows:20}"></aty-textarea>
          </aty-col>
        </aty-row>
        <aty-row class="fd-sp-row" v-if="hasSpr && tab1PopSpyj=='1'">
          <aty-col span='4' :class="tab1PopSpyj=='1'?'fd-sp-col1 fd-sp-required':'fd-sp-col1'">下一步审批人</aty-col>
          <aty-col span='20' class="fd-sp-col2">
            <aty-select transfer class="npl_seleted" v-model="spr" :data="xybsprList"></aty-select>
          </aty-col>
        </aty-row>
        <div class="drw_save_butn">
          <aty-button @click="tab1SpPopSubmit" :disabled="tjDisable" class="search_option_butn1" type="primary">
            <span>提交</span>
          </aty-button>
        </div>
      </div>
    </aty-modal>
    <!-- 全部提交 弹窗 -->
    <aty-modal :mask-closable="false" title="提交" footer-hide closable="" ref="pltjWindow" width="500" class="xybsp-modal">
      <aty-select transfer v-model="tjSpr" :data="xybspr" label="下一步审批人"></aty-select>
      <aty-button class="search_option_butn1" type="primary" @click="submit">
        <span>提交</span>
      </aty-button>
    </aty-modal>
  </div>
</template>

<script>
  import confirmbox from '../confirmBox/confirmBox.vue'
  import loading from '../base/loading'
  export default {
    data: function() {
      return {
        tjDisable:false,//审批的提交按钮是否不可用
        cancelRjzBh:'',//取消日记载编号
        db_count:0,//待办数量
        zb_count:0,//在办数量
        isLoading:false,
        hasSpr:true,//是否有审批人，默认是
        showConfirm:false,
        showConfirm2:false,
        confirmtext: "确认删除此条日记载么？",
        confirmtext2: "确认取消此条日记载么？",
        delBh:'',
        breadcrumbdata: [
          {
            name: '日记载'
          },
          {
            name: '日记载列表',
            href: '/dayRecord'
          }
        ],
        spyj: "1",
        // tab1 审核 弹窗 审批意见list
        tab1PopSpyjList: [
          {
            code: "1",
            name: "通过"
          },
          {
            code: "2",
            name: "退回"
          }
        ],
        //罪犯信息url
        zfxxUrl:_zfxxDetail.url,
        tab1PopSpyj: "1",
        sfzs:true,
        // 审批 弹窗 罪犯信息
        tab1PopZfxm: "",
        // 审批 弹窗 罪犯姓名
        tab1PopZfxmName: "",
        // 审批 弹窗 备注
        tab1PopBz: "",
        //发生时间起
        fssjq: null,
        //待办监区
        dept: null,
        //发生时间止
        fssjz: null,
        //罪犯编号
        zfbh: "",
        //罪犯姓名
        zfxm: "",
        //经办日期起
        jbrqq: null,
        //经办日期止
        jbrqz: null,
        //所在小组
        szxz: "",
        //考核类型
        khlx: "",
        //考核依据
        khyj: "",
        //考核部分
        khxm: "",
        //主要事由
        zysy: "",
        //状态
        zt: "",
        //发生时间起
        zb_fssjq: null,
        //发生时间止
        zb_fssjz: null,
        //罪犯编号
        zb_zfbh: "",
        //罪犯姓名
        zb_zfxm: "",
        //经办民警
        zb_jbmj: "",
        //经办日期起
        zb_jbrqq: null,
        //经办民警
        zb_jbrqz: "",
        //经办日期止
        zb_jbrqz: null,
        //所在监区
        zb_dept: "",
        //所在小组
        zb_szxz: "",
        //考核类型
        zb_khlx: "",
        //考核依据
        zb_khyj: "",
        //考核部分
        zb_khxm: "",
        //主要事由
        zb_zysy: "",
        //审批环节
        zb_sphj: "",
        //发生时间起
        yb_fssjq: null,
        //发生时间止
        yb_fssjz: null,
        //罪犯编号
        yb_zfbh: "",
        //罪犯姓名
        yb_zfxm: "",
        //经办民警
        yb_jbmj: "",
        //经办日期起
        yb_jbrqq: null,
        //经办民警
        yb_jbrqz: "",
        //经办日期止
        yb_jbrqz: null,
        //所在监狱
        yb_corp: "",
        //所在监区
        yb_dept: "",
        //所在小组
        yb_szxz: "",
        //考核类型
        yb_khlx: "",
        //考核依据
        yb_khyj: "",
        //考核部分
        yb_khxm: "",
        //主要事由
        yb_zysy: "",
        //状态
        yb_zt: "",
        //待办的分页信息
        offset: 1,
        limit: 5,
        total: 0,
        limitOpts:[5,10,20,50,100,200],
        //在办的分页信息
        zb_offset: 1,
        zb_limit: 5,
        zb_total: 0,
        //已办的分页信息
        yb_offset: 1,
        yb_limit: 5,
        yb_total: 0,
        // 所在小组下拉筛选数据
        dataList: [
          {
            code: "op1",
            codeType: "op1",
            name: "选项1"
          },
          {
            code: "op2",
            codeType: "op2",
            name: "选项2"
          },
          {
            code: "op3",
            codeType: "op3",
            name: "选项3"
          }
        ],
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
        // 计分考核公示表 弹窗 table数据
        popTableData: [
        ],
        // 上传合议记录 弹窗 table数据
        popTableData2: [],
        // 监狱批量审批 弹窗 table数据
        popTableData3: [],
        // 判断是否是历史公示表 标识
        isHistoryFlag: false,
        // 审批意见 下拉列表数据
        spyjList: [
          {
            code: "1",
            name: "通过"
          },
          {
            code: "2",
            name: "退回"
          }
        ],
        // 下一级审批人 下拉列表数据
        xybsprList: [],
        // 弹窗 审批意见 数据
        popSpyjList: [
          {
            code: "1",
            name: "通过"
          },
          {
            code: "2",
            name: "退回"
          }
        ],
        //提交时的审批人
        tjSpr: "",
        spr:"",//审批时的审批人
        popSpyj: "1",
        // 批量提交时 所选人 数组
        batchSubmitArr: [],
        //全部提交弹框的审批人
        xybspr: [],
        uploadfiles: [],
        loadingStatus: false,
        hyBh:"",
        zfxxBh:"",
        // 待办、在办监区列表
        jqDataList:[],
        userInfo:{},
        //已办监狱列表
        jyDataList: [],
        sphjData:[]
      };
    },
    components: {
      confirmbox,
      loading
    },
    created() {
      let _this = this;
      _this.dbDateInit();
      _this.zbDateInit();
      _this.ybDateInit();
      var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      this.userInfo = userInfo;
      let cxzt = 0
      if(_this.checkButtonShow('jy.imp.jfkh.rjz.rjzlb.sp') || _this.checkButtonShow('jy.imp.jfkh.rjz.xz')){
        cxzt = 0;
      }else{
        cxzt = 2;
      }
      _this.initData(1, this.limit, cxzt);
      _this.tabClick(cxzt)
      _this.getJqDataList();
      _this.sphjDataStorage();
    },
    mounted() {
    },
    watch:{
    },
    computed: {
      /**
       * @name 已办监区数据
       * @description
       */
      ybJqDataList() {
        this.yb_dept="";
        var deptType = this.userInfo.deptType;
        var corpId = this.yb_corp;
        if(corpId == undefined || corpId == "") {
          corpId = this.userInfo.corpId;
        }
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        this.getRequest("/api/v1/system/getJq/" + corpId + "/" + deptType + "/" +　isSelectFgyzf).then(resp=> {
          if (resp && resp.status == 200) {
            var list = resp.data.ArrayList;
            this.$refs.selectTree1.update(list);
          }
        })
      },
      /**
       * @name 本月第一天的时间
       * @description
       */
      monthFirstDate: function() {
        var now = new Date()
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
        var day = '01';
        return year + "-" + month + "-" + day;
      },
      /**
       * @name 当前时间
       * @description
       */
      nowDate: function() {
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
        var day = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate();
        return year + "-" + month + "-" + day;
      },
      lxData() {
        return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111001"];
      },
      khxmData() {
        return [
          { code: "1", name: "教育" },
          { code: "2", name: "劳动" }
        ];
        // return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111002"];
      },
      dbztData() {
        return [
          { code: "0", name: "保存" },
          { code: "102", name: "退回" },
          { code: "100", name: "待审批" }
        ];
      },
      ybztData() {
        return [
          { code: "103", name: "审批通过" },
          { code: "101", name: "审批不通过" },
        ];
      },
      ztData() {
        return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111014"];
      }
    },
    methods: {
      /**
       * 删除附件
       */
      deleteFile(uploadfiles,index) {
        uploadfiles.splice(index, 1);
      },
      dateToStr(now) {
        var year = now.getFullYear();
        var month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1);
        var day = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate();
        return year + "-" + month + "-" + day;
      },
      /**
       * @description 待办列表发生日期初始化
       */
      changeAtOnce(spr){
        let _this = this;
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var sfgyzf = userInfo.sfgyzf;
        var deptType = userInfo.deptType;
        var pDeptType = userInfo.pDeptType;
        var spdj = userInfo.spdj;
        //三级监狱的分监区提请或者乔司监狱的监区提请，才联动选择下一步审批人
        var together = (spdj == "3" && sfgyzf && deptType == "4") || (spdj == "3" && sfgyzf && deptType == "3" && pDeptType == "5");
        if(together) {
          for (var i=0;i<_this.popTableData3.length;i++) {
            _this.popTableData3[i].spr = spr;
          }
        }
      },
      /**
       * @description 待办列表发生日期初始化
       */
      dbDateInit() {
        let _this = this;
        // _this.fssjq = _this.monthFirstDate;
        _this.fssjq = _this.monthFirstDate;
        _this.fssjz = _this.nowDate;
      },
      /**
       * @description 在办列表发生日期初始化
       */
      zbDateInit() {
        let _this = this;
        _this.zb_fssjq = _this.monthFirstDate;
        _this.zb_fssjz = _this.nowDate;
      },
      /**
       * @description 已办列表发生日期初始化
       */
      ybDateInit() {
        let _this = this;
        _this.yb_fssjq = _this.monthFirstDate;
        _this.yb_fssjz = _this.nowDate;
      },
      //获取已办监狱下拉列表
      getJyDataList(){
        this.getRequest("/api/v1/system/getJy").then(resp=>{
          if (resp && resp.status == 200) {
            this.jyDataList = resp.data.ArrayList;
          }
        });
      },
      //获取待办、在办监区下拉列表
      getJqDataList(){
        var _this = this
        var deptType = this.userInfo.deptType;
        var corpId = this.userInfo.corpId;
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        _this.getRequest("/api/v1/system/getJq/"+corpId+"/"+deptType+"/"+isSelectFgyzf).then(resp => {
          if (resp && resp.status == 200) {
            _this.jqDataList = resp.data.ArrayList == undefined?[]:resp.data.ArrayList;
          }
        });
      },
      delRjzListItem(flag) {
        var _this = this
        if(flag){
          _this.deleteRequest("/api/v1/rjz/deleteRjz/" + _this.delBh).then(resp => {
            if (resp && resp.status == 200) {
              Artery.message.success("删除成功！");
              _this.queryDataList(this.$refs.dbPage.currentPage,this.$refs.dbPage.currentPageSize, 0);
              //重新查询一次数量
              _this.queryCount(0);
            }
          });
        }else{

        }
        _this.delBh = ''
        _this.showConfirm = false
      },
      delPop: function() {
        this.$refs.delPopWindow.open();
      },
      // 获取合议记录列表
      getHyjlList: function(row) {
        var _this = this;
        var params = {
          zfxxBh: _this.zfxxBh,
          ywlb: "JFKH_HY",
          ywid: _this.hyBh
        };
        _this.getRequest("/api/v1/entity/", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.popTableData2 = resp.data;
          }
        });
      },
      /**
       * 动态显示或隐藏下一步审批人
       * @param sz 意见，"1":通过；"2":"退回"
       * @param hasSpr 是否存在审批人
       */
      sfzsSPR(sz,hasSpr){
        if(hasSpr) {
          if(sz == "1"){
            this.sfzs = true;
          }else{
            this.spr = [];
            this.sfzs = false;
          }
        } else {
          this.spr = [];
          this.sfzs = false;
        }
      },
      //手动上传
      handleUpload: function(file) {
        this.uploadfiles.push(file);
        return false;
      },
      //上传按钮
      uploadBtn: function() {
        var _this = this;
        this.loadingStatus = true;
        let formData = new FormData();
        for (let i = 0; i <= this.uploadfiles.length; i++) {
          formData.append("files", this.uploadfiles[i]);
        }
        formData.append("hyBh", _this.hyBh);
        formData.append("zfxxBh", _this.zfxxBh);
        this.uploadFileRequest("/api/v1/hy/uploadFile", formData).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("上传成功！");
            _this.uploadfiles = [];
            _this.loadingStatus = false;
            _this.getHyjlList();
          } else {
            Artery.message.error({
                content:'上传失败！',
                duration:3
            });
            this.loadingStatus = false;
          }
        });
      },
      // 删除合议
      delHyjl: function(row) {
        this.delHyjlData(row);
      },
      // 删除合议记录dom
      delHyjlDom: function(row) {
        this.popTableData2.splice(row.index, 1);
      },
      // 删除合议记录后台数据
      delHyjlData: function(row, index) {
        if(row.bh == null){
          Artery.message.info({
              content:'删除失败,请稍后重试！',
              duration:3
          });
          return;
        }
        this.deleteRequest("/api/v1/entity-file/" + row.bh).then(resp => {
          if (resp && resp.status == 204) {
            this.delHyjlDom(row);
            Artery.message.success("删除文件成功！");
          }
        });
      },
      changeSpyj: function(param1) {
        if (param1 == "2") {
          for (var i = 0, len = this.popTableData3.length; i < len; i++) {
            this.popTableData3[i].spr = "";
          }
        }
      },
      //审批状态转义
      spztf: function(row, column) {
        var key = _sigleCode.rjzSpzt + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      //考核类型转义
      khlxf: function(row, column) {
        var key = _sigleCode.khlx + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      //考核部分转义
      khxmf: function(row, column) {
        var key = _sigleCode.khxm + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      //日期转义
      df: function(row, column) {
        return row != undefined ? row.substr(0, 10) : "";
      },
      // tab点击事件
      tabClick(tab, event) {
        if(tab == 0){
          this.limit =5
          this.initData(1, this.limit, tab);
        }
        if(tab == 1){
          this.zb_limit =5
          this.initData(1, this.zb_limit, tab);
          this.sphjDataStorage();
        }
        if(tab == 2){
          this.yb_limit =5
          this.initData(1, this.yb_limit, tab);
          this.getJyDataList();
        }
      },
      pageSizeChange(pageSize){

        //  this.offset= this.$refs.dbPage.currentPageSize
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
      },
      // 查看按钮
      goView(bh, hyjlBh) {
        let _this = this;
        _this.getRequest("/api/v1/rjz/getRjzZfListByBh/" + bh).then(resp => {
          if (resp && resp.status == 200) {
            var zfListMap = resp.data;
            _this.$router.push({
              path: "/dayRecord/dayRecordDetail",
              query: {
                editStatus: "view",
                zfListMap: zfListMap,
                hyjlBh: hyjlBh
              }
            });
          }
        });
      },
      // 编辑按钮
      goUpdate(row) {
        var bh = row.bh
        var zt = row.zt
        let _this = this;
        if(zt != '102'){
          _this.getRequest("/api/v1/rjz/getRjzZfListByBh/" + bh).then(resp => {
            if (resp && resp.status == 200) {
              var zfListMap = resp.data;
              _this.$router.push({
                path: "/dayRecord/addDayRecord",
                query: { editStatus: "edit", zfListMap: zfListMap }
              });
            }
          });
        }else{
          var zfListMap={
            zfRjzList:[],
            rjzBhList:[]
          }
              zfListMap.zfRjzList= [{
                bh:row.jfkhZfxx.bh,
                zfbh:row.jfkhZfxx.zfbh,
                zfxm:row.jfkhZfxx.xm,
                zfxxBh:row.zfxxBh
              }];
              zfListMap.rjzBhList= [
                row.jfkhZfxx.bh
              ]
              _this.$router.push({
                path: "/dayRecord/rejectDayRecord",
                query: { editStatus: "edit", zfListMap: zfListMap }
              });
        }
      },
      //删除
      goDelete(bh) {
        let _this = this;
        _this.showConfirm = true
        _this.delBh = bh
      },
      //待办换页
      changePage(pageSize) {
        this.limit=this.$refs.dbPage.currentPageSize
        this.offset=this.$refs.dbPage.currentPage
        this.queryDataList(this.$refs.dbPage.currentPage, this.$refs.dbPage.currentPageSize,0)
      },
      //在办换页
      changeZbPage(pageSize) {
        this.zb_limit=this.$refs.zbPage.currentPageSize
        this.zb_offset=this.$refs.zbPage.currentPage
        this.queryDataList(this.$refs.zbPage.currentPage, this.$refs.zbPage.currentPageSize,1)
      },
      //已办换页
      changeYbPage(pageSize) {
        this.yb_limit=this.$refs.ybPage.currentPageSize
        this.yb_offset=this.$refs.ybPage.currentPage
        this.queryDataList(this.$refs.ybPage.currentPage, this.$refs.ybPage.currentPageSize,2)
      },
      //初始化查询方法
      initData(pageNum, pageSize, tab) {
        let _this = this;
        _this.queryCount(0);
        _this.queryCount(1);
        _this.queryDataList(pageNum, pageSize, tab);
      },
      /**
       * 根据状态查询数量
       * @param cxzt 查询状态 0：待办 1：在办 2：已办
       */
      queryCount(cxzt) {
        let _this = this;
        _this.getRequest("/api/v1/rjz/getRjzCountByZt/"+ cxzt).then(resp => {
          if (resp && resp.status == 200) {
            if(cxzt == 0) {
              _this.db_count = resp.data;
            }
            if(cxzt == 1) {
              _this.zb_count = resp.data;
            }
          }
        });
      },
      //条件查询方法
      queryDataList(pageNum, pageSize, tab) {
        let _this = this;
        let params = {};
        if (tab == 0) {
          this.offset = (pageNum - 1) * pageSize; //重置当前页
          var fssjq = _this.fssjq == "" ? null : _this.fssjq;
          var fssjz = _this.fssjz == "" ? null : _this.fssjz;
          if(fssjq != null && typeof(fssjq) =="object" ) {
            fssjq = _this.dateToStr(fssjq);
          }
          if(fssjz != null && typeof(fssjz) =="object" ) {
            fssjz = _this.dateToStr(fssjz);
          }
          params = {
            cxzt: "0",
            fssjq: fssjq,
            fssjz: fssjz,
            zfbh: _this.zfbh,
            zfxm: _this.zfxm,
            jbrqq: _this.jbrqq == "" ? null : _this.jbrqq,
            jbrqz: _this.jbrqz == "" ? null : _this.jbrqz,
            szxz: _this.szxz,
            khlx: _this.khlx,
            khyj: _this.khyj,
            khxm: _this.khxm,
            zysy: _this.zysy,
            zt: _this.zt,
            dept: _this.dept
          };
        } else if (tab == 1) {
          this.zb_offset = (pageNum - 1) * pageSize; //重置当前页
          var zb_fssjq = _this.zb_fssjq == "" ? null : _this.zb_fssjq;
          var zb_fssjz = _this.zb_fssjz == "" ? null : _this.zb_fssjz;
          if(zb_fssjq != null && typeof(zb_fssjq) =="object" ) {
            zb_fssjq = _this.dateToStr(zb_fssjq);
          }
          if(zb_fssjz != null && typeof(zb_fssjz) =="object" ) {
            zb_fssjz = _this.dateToStr(zb_fssjz);
          }
          params = {
            cxzt: "1",
            fssjq: zb_fssjq,
            fssjz: zb_fssjz,
            zfbh: _this.zb_zfbh,
            jbmj: _this.zb_jbmj,
            zfxm: _this.zb_zfxm,
            jbrqq: _this.zb_jbrqq == "" ? null : _this.zb_jbrqq,
            jbrqz: _this.zb_jbrqz == "" ? null : _this.zb_jbrqz,
            szxz: _this.zb_szxz,
            khlx: _this.zb_khlx,
            khyj: _this.zb_khyj,
            khxm: _this.zb_khxm,
            zysy: _this.zb_zysy,
            dqspjdId: _this.zb_sphj,
            dept: _this.zb_dept
          };
        } else if (tab == 2) {
          this.yb_offset = (pageNum - 1) * pageSize; //重置当前页
          var yb_fssjq = _this.yb_fssjq == "" ? null : _this.yb_fssjq;
          var yb_fssjz = _this.yb_fssjz == "" ? null : _this.yb_fssjz;
          if(yb_fssjq != null && typeof(yb_fssjq) =="object" ) {
            yb_fssjq = _this.dateToStr(yb_fssjq);
          }
          if(yb_fssjz != null && typeof(yb_fssjz) =="object" ) {
            yb_fssjz = _this.dateToStr(yb_fssjz);
          }
          params = {
            cxzt: "2",
            fssjq: yb_fssjq,
            fssjz: yb_fssjz,
            zfbh: _this.yb_zfbh,
            jbmj: _this.yb_jbmj,
            zfxm: _this.yb_zfxm,
            jbrqq: _this.yb_jbrqq == "" ? null : _this.yb_jbrqq,
            jbrqz: _this.yb_jbrqz == "" ? null : _this.yb_jbrqz,
            szxz: _this.yb_szxz,
            khlx: _this.yb_khlx,
            khyj: _this.yb_khyj,
            khxm: _this.yb_khxm,
            zysy: _this.yb_zysy,
            zt: _this.yb_zt,
            dept: _this.yb_dept,
            corp: _this.yb_corp
          };
        }
        this.postRequest(
          "/api/v1/rjz/getRjzList/" + pageNum + "/" + pageSize,
          params
        ).then(resp => {
          if (resp && resp.status == 200) {
            let list = resp.data.list;
            if (list == undefined || list == null) {
              return;
            }
            if (tab == 0) {
              _this.total = resp.data.total;
              _this.tableData = list;
            } else if (tab == 1) {
              _this.zb_total = resp.data.total;
              _this.tableData2 = list;
            } else if (tab == 2) {
              _this.tableData3 = list;
              _this.yb_total = resp.data.total;
            }
          }
        });
      },
      addDayRecord() {
        this.$router.push({ path: "/dayRecord/addDayRecord" });
      },
      // tab1重置按钮
      reSet() {
        let _this = this;
        _this.dbDateInit();
        _this.zfbh = "";
        _this.zfxm = "";
        _this.jbrqq = "";
        _this.jbrqz = "";
        _this.dept = "";
        _this.szxz = "";
        _this.khlx = "";
        _this.khxm = "";
        _this.zysy = "";
        _this.zt = "";
        _this.khyj = "";
      },
      reSet1() {
        let _this = this;
        _this.zbDateInit();
        _this.zb_zfbh = "";
        _this.zb_zfxm = "";
        _this.zb_jbmj = "";
        _this.zb_jbrqq = "";
        _this.zb_jbrqz = "";
        _this.zb_dept = "";
        _this.zb_szxz = "";
        _this.zb_khlx = "";
        _this.zb_khxm = "";
        _this.zb_sphj = "";
        _this.zb_khlx = "";
        _this.zb_zysy = "";
        _this.zb_khyj = "";
      },
      reSet2() {
        let _this = this;
        _this.ybDateInit();
        _this.yb_zfbh = "";
        _this.yb_zfxm = "";
        _this.yb_jbmj = "";
        _this.yb_jbrqq = "";
        _this.yb_jbrqz = "";
        _this.yb_corp = "";
        _this.yb_dept = "";
        _this.yb_khxm = "";
        _this.yb_szxz = "";
        _this.yb_khlx = "";
        _this.yb_khxm = "";
        _this.yb_zt = "";
        _this.yb_zysy = "";
        _this.yb_khyj = "";
      },
      // 打开计分考核公示表
      showJfkhList() {
        let _this = this;
        _this.isHistoryFlag = false;
        let params = {
          bz: false
        };
        _this.getRequest("/api/v1/rjz/getJfkhgsbList/", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.popTableData = resp.data;
          }
        });
        _this.$refs.modalWidiow1.open();
      },
      // 查看历史公示表
      showHistoryList() {
        let _this = this;
        let params = {
          bz: true
        };
        _this.getRequest("/api/v1/rjz/getJfkhgsbList/", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.isHistoryFlag = true;
            _this.popTableData = resp.data;
          }
        });
      },
      //现公示表
      goBackList() {
        this.showJfkhList();
      },
      // 计分考核公示表 导出
      dayinButn() {
        let _this = this;
        if (_this.popTableData.length <= 0) {
          Artery.message.info({
             content:'没有可以导出的数据！',
             duration:3
          });
          return;
        }
        let params = {
          bz: false
        };
        window.location.href ="/jfkh/api/v1/rjz/printJfkhgsbList?bz=" + params.bz;
        setTimeout(function (){
          _this.showHistoryList();
        }, 1000);
      },
      //取消公示
      cancelGsRjz(bh) {
        let _this = this;
        _this.putRequest("/api/v1/rjz/cancelGsRjz/" + bh).then(resp => {
          if (resp && resp.status == 200) {
            _this.showHistoryList();
          }
        });
      },
      cancelRjz(bh){
        var _this = this
        _this.showConfirm2 = true
        _this.cancelRjzBh = bh
      },
      //取消日记载
      confirmCancelRjz(flag) {
        let _this = this;
        if(flag){
          _this.isLoading = true
          _this.putRequest("/api/v1/rjz/cancelRjz/"+_this.cancelRjzBh).then(resp => {
            if (resp && resp.status == 200) {
              _this.isLoading = false
              _this.queryDataList( _this.offset, _this.limit,0);
              _this.showConfirm2 = false
              _this.cancelRjzBh = ''
              //重新查询一次数量
              _this.queryCount(0);
            }else{
              _this.showConfirm2 = false
              _this.cancelRjzBh = ''
              setTimeout(() => {
                _this.isLoading = false
              },6000)
            }
          });
        }else{
          _this.showConfirm2 = false
          _this.cancelRjzBh = ''
        }
      },
      // 上传合议记录
      showMeetingList(row) {
        this.hyBh = row.hyjlBh;
        this.zfxxBh = row.jfkhZfxx.bh;
        this.getHyjlList(row);
        this.$refs.modalWidiow2.open();
      },
      // 批量提交 按钮
      manySubmit() {
        let _this = this;
        // 做个弹框，是否要全部提交
        _this.isLoading = true
        _this.getRequest("/api/v1/rjz/getHyRjzCount").then(resp => {
          if (resp && resp.status == 201) {
            _this.isLoading = false
            Artery.message.info(resp.data);
            return;
          }else if(resp && resp.status == 200) {
            _this.isLoading = false
            var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
            var taskParams = {
              curTaskId: resp.data,
              spAuthority: "jy.imp.jfkh.splc.rjzsp.",
              corpId:userInfo.corpId
            }
            _this.isLoading = true
            _this.getRequest("/api/v1/system/getTaskNextSprs", taskParams).then(resp => {
              if (resp && resp.status == 200) {
                _this.isLoading = false
                _this.xybspr = resp.data;
              }else{
                setTimeout(function(){
                  _this.isLoading = false
                },6000)
              }
            });
            _this.tjSpr = "";
            _this.$refs.pltjWindow.open();
          }else{
            setTimeout(function(){
              _this.isLoading = false
            },6000)
          }
        });
      },
      // 批量提交 按钮
      manySubmit1() {
        let _this = this;
        if (_this.selectTableData1.length == 0) {
          Artery.message.info({
             content:'请选择需要批量提交的数据',
             duration:3
          });
          return;
        }
        _this.batchSubmitArr = [];
        for (var i = 0; i < _this.selectTableData1.length; i++) {
          if (_this.selectTableData1[i].khlx == "1") {
            Artery.message.warning({
                content:'记事本不能提交！',
                duration:3
            });
            return;
          }
          if (
            _this.selectTableData1[i].zt != "0" &&
            _this.selectTableData1[i].zt != "102"
          ) {
            Artery.message.warning({
                content:'此状态不能提交！',
                duration:3
            });
            return;
          }
          var hyjlBh = _this.selectTableData1[i].hyjlBh;
          if (hyjlBh == undefined || hyjlBh == null || hyjlBh == "") {
            Artery.message.info({
                content:'请先合议后再提交！',
                duration:3
            });
            return;
          }
          var obj = {
            bh: _this.selectTableData1[i].bh
          };
          _this.batchSubmitArr.push(obj);
        }
        _this.$refs.pltjWindow.open();
      },
      //列表提交按钮
      singleSubmit(row) {
        let _this = this;
        if (row.zt != "0" && row.zt != "102") {
          Artery.message.info({
               content:'此状态无法提交！',
               duration:3
          });
          return;
        }
        if (!row.hasOwnProperty("hyjlBh")) {
          Artery.message.info({
              content:'请先合议后再提交！',
              duration:3
          });
          return;
        }
        var hyjlBh = row.hyjlBh;
        if (hyjlBh == undefined || hyjlBh == null || hyjlBh == "") {
          Artery.message.info({
             content:'请先合议后再提交！',
             duration:3
          });
          return;
        }
        var obj = {
          bh: row.bh
        };
        _this.batchSubmitArr = [];
        _this.batchSubmitArr.push(obj);
        _this.$refs.pltjWindow.open();
      },
      //提交
      submit() {
        let _this = this;
        if (_this.tjSpr == "") {
          Artery.message.info({
            content: "请选择下一步审批人",
            duration: 3
          });
          return;
        }
        _this.isLoading = true
        _this
          .postRequest("/api/v1/rjz/allSubmitRjz/" + _this.tjSpr)
          .then(resp => {
            if (resp && resp.status == 200) {
              _this.isLoading = false
              _this.queryDataList(1, _this.limit, 0);
              _this.$refs.pltjWindow.close();
              Artery.message.success("提交成功！");
            } else {
              setTimeout(function(){
                _this.isLoading = false
              },6000)
              Artery.message.error({
                  content:'提交失败！',
                  duration:3
              });
            }
          });
      },
      // 批量审批 按钮
      manyCheck() {
        let _this = this;
        if (_this.selectTableData1.length == 0) {
          Artery.message.info({
              content:'请选择需要批量审批的数据',
              duration:3
          });
          return;
        }
        //待审批状态才可以审批
        var list = _this.selectTableData1;
        for (var i = 0; i < list.length; i++) {
          if (list[i].zt!='100') {
            Artery.message.info({
                 content:'不是待审批状态无法审批！',
                 duration:3
            });
            return;
          }
        }
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        _this.popTableData3 = [];
        var spAuthority = "jy.imp.jfkh.splc.rjzsp.";
        var params = [];
        for (let i = 0; i < _this.selectTableData1.length; i++) {
          var taskId = _this.selectTableData1[i].taskId;
          var bh = _this.selectTableData1[i].bh;
          var taskParam = {
            ywBh:bh,
            curTaskId: taskId,
            authorityWord: spAuthority,
            corpId: userInfo.corpId
          }
          params.push(taskParam);
        }
        var param = JSON.stringify(params);
        var obj = {
          param: param
        }
        _this.getRequest("/api/v1/system/getPatchTaskNextSprs", obj).then(resp => {
          if (resp && resp.status == 200) {
            if( resp.data.length > 0) {
              var respdata = resp.data;
              for (let i = 0; i < _this.selectTableData1.length; i++) {
                var bh = _this.selectTableData1[i].bh;
                var taskId = _this.selectTableData1[i].taskId;
                var sprlb = respdata[i][bh] == undefined?[]:respdata[i][bh];
                var isOverSp = respdata[i][taskId] == undefined?[]:respdata[i][taskId];
                var ob = {
                  bh: bh,
                  zfbh: _this.selectTableData1[i].jfkhZfxx.zfbh,
                  zfxm: _this.selectTableData1[i].jfkhZfxx.xm,
                  taskId: taskId,
                  spyj: "",
                  zt: _this.selectTableData1[i].zt,
                  khlx: _this.selectTableData1[i].khlx,
                  yjfs: _this.selectTableData1[i].yjfs,
                  bz: "",
                  spr: "",
                  sprlb: sprlb,
                  isOverSp: isOverSp,
                  yspr: _this.selectTableData1[i].yspr,
                  khyj: _this.selectTableData1[i].khyj,
                  clyj: _this.selectTableData1[i].clyj
                };
                _this.popTableData3.push(ob);
              }
              _this.spyj = "1";
            }else {
              _this.sfzsSPR("2",_this.hasSpr);
            }
          }
        });
        _this.tjDisable = false;
        _this.$refs.modalWidiow4.open();
      },
      // 批量审批 监区 提交按钮
      saveButnJq() {
        let _this = this;
        // 校验审批意见和下一步审批人 不能为空
        for (var i = 0; i < _this.popTableData3.length; i++) {
          _this.popTableData3[i].spyj = _this.spyj;
          if (_this.popTableData3[i].spyj == "") {
            Artery.message.info({
               content:'审批意见不能为空',
               duration:3
            });
            return;
          }
          if (
            _this.popTableData3[i].spyj == "1" &&
            _this.popTableData3[i].spr == "" && !_this.popTableData3[i].isOverSp
          ) {
            Artery.message.info({
               content:'下一步审批人不能为空',
               duration:3
            });
            return;
          }
          if (_this.popTableData3[i].spyj == "2" && _this.popTableData3[i].bz.trim() == "") {
            Artery.message.info({
              content:'审批退回请填写备注！',
              duration:3
            });
            return;
          }
        }
        // 保存提交表单
        var params = _this.popTableData3;
        _this.isLoading = true;
        _this.tjDisable = true;
        _this.postRequest("/api/v1/rjz/approvalRjz", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.$refs.modalWidiow4.close();
            Artery.message.success("审批成功！");
            _this.queryDataList(1, _this.limit, 0);
            for (var i = 0; i < _this.popTableData3.length; i++) {
              _this.popTableData3[i].spr = ""
            }
            //重新查询一次数量
            _this.queryCount(0);
            _this.queryCount(1);
            _this.isLoading = false
          } else {
            setTimeout(function(){
              _this.isLoading=false
            },6000)
            Artery.message.error({
                 content:'审批失败！',
                 duration:3
            });
          }
        });
      },
      /**
      * tab1 操作 审批
      */
      tab1CzSp(item) {
        let _this = this;
        _this.hasSpr = true;
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var taskParams = {
          curTaskId: item.row.taskId,
          spAuthority: "jy.imp.jfkh.splc.rjzsp.",
          corpId:userInfo.corpId
        }
        _this.getRequest("/api/v1/system/isOverSp/"+item.row.taskId).then(resp => {
          if (resp && resp.status == 200) {
            if(!resp.data) {
              _this.getRequest("/api/v1/system/getTaskNextSprs", taskParams).then(resp => {
                if (resp && resp.status == 200) {
                  if(resp.data.length > 0) {
                    _this.hasSpr = true;
                    _this.xybsprList = resp.data;
                  }
                }
              });
            } else {
              _this.hasSpr = false;
              _this.xybsprList = [];
            }
          }
        });
        _this.tab1PopZfxm = item.row;
        _this.tab1PopZfxmName = item.row.jfkhZfxx.xm;
        _this.tab1PopSpyj = "1";
        _this.tab1PopBz = "";
        _this.spr = "";
        _this.tjDisable = false;
        _this.$refs.modalWidiow5.open();
      },
      // tab1 操作 审批 提交按钮
      tab1SpPopSubmit() {
        let _this = this;
        if (_this.tab1PopSpyj == '1' && _this.spr == "" && _this.hasSpr) {
          Artery.message.info({
             content:'下一步审批人不能为空',
             duration:3
          });
          return;
        }
        if (_this.tab1PopSpyj == '2' && _this.tab1PopBz.trim() == "") {
          Artery.message.info({
            content:'审批退回请填写备注！',
            duration:3
          });
          return;
        }
        var params = [
          {
            bh: _this.tab1PopZfxm.bh,
            zfbh: _this.tab1PopZfxm.jfkhZfxx.zfbh,
            zfxm: _this.tab1PopZfxm.jfkhZfxx.xm,
            taskId: _this.tab1PopZfxm.taskId,
            spyj: _this.tab1PopSpyj,
            spr: _this.spr,
            yspr: _this.tab1PopZfxm.yspr,
            khlx: _this.tab1PopZfxm.khlx,
            zt: _this.tab1PopZfxm.zt,
            yjfs: _this.tab1PopZfxm.yjfs,
            khyj: _this.tab1PopZfxm.khyj,
            bz:_this.tab1PopBz,
            clyj: _this.tab1PopZfxm.clyj
          }
        ];
        _this.isLoading = true;
        _this.tjDisable = true;
        _this.postRequest("/api/v1/rjz/approvalRjz", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.$refs.modalWidiow5.close();
            _this.queryDataList(1, _this.limit, 0);
            Artery.message.success("审批成功！");
            _this.spr = ''
            //重新查询一次数量
            _this.queryCount(0);
            _this.queryCount(1);
            _this.isLoading = false
          } else {
            setTimeout(function(){
              _this.isLoading = false
            },6000)
            Artery.message.error({
                content:'审批失败！',
                duration:3
            });
          }
        });
      },
      //根据单位级别获取审批环节数据
      sphjDataStorage(){
        this.getRequest("/api/v1/system/sphjData/rjz").then(resp => {
          if (resp && resp.status == 200) {
            let storageData=resp.data;
            this.sphjData=[];
            for(let i=0,size=storageData.length;i<size; i++){
              let obj={};
              obj.code=storageData[i].taskDefinitionKey;
              obj.name=storageData[i].name;
              this.sphjData.push(obj);
            }
          } else {
            console.error("获取审批操作出错！");
          }
        });
      }
    }
  };
</script>
<style scoped>
  .main_box .aty-tabs{
    overflow:hidden;
    /* overflow-x:hidden;
    overflow-y: auto; */
    /* min-height:500px; */
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
  .search_option_box {
    margin-bottom: 15px;
  }
  .search_option_input {
    width: 77%;
  }

  .search_option_marginb {
    margin-bottom: 15px;
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
    margin-left: 13px;
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
    overflow: hidden;
  }
  .pop_main_box .dr_jy_li {
    overflow: hidden;
    font-size: 14px;
    margin-top: 10px;
  }
  .pop_main_box .dr_jy_li p {
    float: left;
    width: 65px;
    text-align: right;
  }
  .pop_main_box .dr_jy_li span {
    float: left;
    margin-left: 15px;
  }
  .pop_main_box .dr_jy_li span textarea {
    width: 465px;
    height: 200px;
    border: 1px solid #dddee1;
    border-radius: 4px;
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
  .leftbtn{
    float: left;
  }
  .fd-sp-required:before {
    content: "*";
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #f60;
  }
  delete-icon {
    cursor: pointer;
  }
</style>
