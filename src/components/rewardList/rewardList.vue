<template>
<!-- 内容部分start -->
        <div class="main_area fd-home-wrap">
            <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
            <div class="main_box main-tabs fd-jl-page">
                <aty-tabs type="card" @tabclick="tabClick">
                    <!-- tabs1開始 -->
                    <aty-tabpane>
                        <div slot="label">
                            <span class="tabs_icon1 tabs_topb"></span>
                            <span class="tabs_topt">待办({{dbcount}})</span>
                        </div>
                        <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
                        <!-- <aty-scroll :speed="53" class="aty-scroll-2" ref="tabScroll0" name="tabScroll0" :show="false"> -->
                            <div class="tabs_main_box">
                                <aty-row class="search_option_box">
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">监区：</p>
                                        <aty-select-tree class="nomal_tree search_option_input" name="jqTree1"
                                                         ref="jqTree1" :data="jqTreeData" v-model="dbData.jq"
                                                         clearable>
                                        </aty-select-tree>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">罪犯编号：</p>
                                        <aty-input v-model="dbData.zfbh" class="search_option_input" clearable></aty-input>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">罪犯姓名：</p>
                                        <aty-input v-model="dbData.zfxm" class="search_option_input" clearable></aty-input>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">奖励类别：</p>
                                        <aty-select class="search_option_input" v-model="dbData.jllb"
                                                    :data="jllbDataList" clearable>
                                        </aty-select>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">状态：</p>
                                        <aty-select class="search_option_input" v-model="dbData.spzt"
                                                    :data="dbSpztDataList" clearable>
                                        </aty-select>
                                    </aty-col>
                                    <aty-col  span="18" class="search_option_marginb search_option_textr">
                                        <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,db_limit,0)">
                                            <i>
                                                <img src="../../assets/images/w-png17.png">
                                            </i>
                                            <span>查询</span>
                                        </aty-button>
                                        <aty-button class="search_option_butn2" type="default" @click="reSet(0)">
                                            <i>
                                                <img src="../../assets/images/w-png18.png">
                                            </i>
                                            <span>重置</span>
                                        </aty-button>
                                    </aty-col>
                                </aty-row>
                                <div class="dr_edit_butn">
                                    <router-link :to="{path:'/newReward'}">
                                        <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.xzjl')" class="dr_edit_b1" type="primary">
                                            <i>+</i>
                                            <span>新增奖励</span>
                                        </aty-button>
                                    </router-link>
                                    <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.plsp')" @click="openSpModal(2)" class="dr_edit_b1" type="primary">
                                        <i>
                                            <img src="../../assets/images/w-png16.png">
                                        </i>
                                        <span>批量审批</span>
                                    </aty-button>
                                </div>
                                <!-- table區域 start -->
                                <aty-table
                                    :pageable-data="tableData"
                                    @selection-change="dbSelectChange"
                                    style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                                    <aty-table-column
                                        type="selection"
                                        width="45" :showOverflowTooltip="false">
                                    </aty-table-column>
                                    <aty-table-column
                                        type="index"
                                        label="序号" :showOverflowTooltip="false">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="xm"
                                        label="罪犯姓名">
                                      <!--<template slot-scope="props" >-->
                                        <!--<a :title="props.row.xm"  v-text="props.row.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                                      <!--</template>-->
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="zfBh"
                                        label="罪犯编号">
                                    </aty-table-column>
                                  <aty-table-column v-if="false"
                                    prop="spr"
                                    label="罪犯编号">
                                  </aty-table-column>
                                    <aty-table-column
                                        prop="corp"
                                        label="监狱">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="dept"
                                        label="监区">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="ksrq"
                                        label="考核开始时间">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jzrq"
                                        label="考核结束时间">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jllb"
                                        label="奖励类别" :formatter="jllbf">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="spzt"
                                        label="状态"  :formatter="spztf">
                                    </aty-table-column>
                                    <aty-table-column
                                        label="操作"  width="150" :showOverflowTooltip="false">
                                        <template slot-scope="scope">
                                            <i>
                                            <img v-if="scope.row.spzt=='102'" @click="rewardSubmit(scope.row)" title="提交" class="table_butn" src="../../assets/images/w-png19.png">
                                            <img v-if="scope.row.spzt=='100'" v-show="checkButtonShow('jy.imp.jfkh.jl.sp')" @click="openSpModal(1,scope.row)" title="审批" class="table_butn" src="../../assets/images/w-png21.png">
                                            <img @click="viewDetail(scope.row,0)" title="查看详情" class="table_butn" src="../../assets/images/w-png20.png">
                                            <img v-if="scope.row.spzt=='102'" v-show="checkButtonShow('jy.imp.jfkh.jl.qxtq')" @click="cancelSubmit(scope.row)" title="取消提交" class="table_butn" src="../../assets/images/cancel.png">
                                            </i>
                                        </template>
                                    </aty-table-column>
                                </aty-table>
                                <!-- 分页 start -->
                                <aty-row class="fd-category">
                                  <aty-row>
                                    <aty-pagination :total="db_total" :offset="db_offset" :limit="db_limit"
                                                    :show-total="true" :show-sizer="true" :show-elevator="true"
                                                    @change="dbChangePage" :limit-opts="limitOpts" ref="dbPage"
                                                    @page-size-change="pageSizeChange">
                                    </aty-pagination>
                                  </aty-row>
                                </aty-row>
                            </div>
                        </happy-scroll>
                    </aty-tabpane>
                    <!-- tabs1結束 -->

                    <!-- tabs2開始 -->
                    <aty-tabpane>
                        <div slot="label">
                            <span class="tabs_icon2 tabs_topb"></span>
                            <span class="tabs_topt">在办({{zbcount}})</span>
                        </div>
                        <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
                        <!-- <aty-scroll :speed="53" class="aty-scroll-2" ref="tabScroll1" name="tabScroll1" :show="false"> -->
                            <div class="tabs_main_box">
                                <aty-row class="search_option_box">
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">监区：</p>
                                        <aty-select-tree class="nomal_tree search_option_input" name="jqTree2"
                                                         ref="jqTree2" :data="jqTreeData" v-model="zbData.jq" clearable>
                                        </aty-select-tree>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">罪犯编号：</p>
                                        <aty-input v-model="zbData.zfbh" class="search_option_input" clearable></aty-input>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">罪犯姓名：</p>
                                        <aty-input v-model="zbData.zfxm" class="search_option_input" clearable></aty-input>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">奖励类别：</p>
                                        <aty-select class="search_option_input" v-model="zbData.jllb" :data="jllbDataList" clearable></aty-select>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">审批环节：</p>
                                        <aty-select class="search_option_input" v-model="zbData.sphj" :data="sphjDataList" clearable></aty-select>
                                    </aty-col>
                                    <aty-col  span="18" class="search_option_marginb search_option_textr">
                                        <aty-button class="search_option_butn1" type="primary" @click="queryDataList(1,zb_limit,1)">
                                            <i>
                                                <img src="../../assets/images/w-png17.png">
                                            </i>
                                            <span>查询</span>
                                        </aty-button>
                                        <aty-button class="search_option_butn2" type="default" @click="reSet(1)">
                                            <i>
                                                <img src="../../assets/images/w-png18.png">
                                            </i>
                                            <span>重置</span>
                                        </aty-button>
                                    </aty-col>
                                </aty-row>
                                <div class="dr_edit_butn">
                                    <router-link :to="{path:'/newReward'}">
                                        <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.xzjl')" class="dr_edit_b1" type="primary">
                                            <i>+</i>
                                            <span>新增奖励</span>
                                        </aty-button>
                                    </router-link>
                                </div>
                                <!-- table區域 start -->
                                <aty-table
                                    :pageable-data="tableData2"
                                    style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                                     <!-- <aty-table-column
                                        type="selection"
                                        width="45" :showOverflowTooltip="false">
                                    </aty-table-column> -->
                                    <aty-table-column
                                        type="index"
                                        label="序号" :showOverflowTooltip="false">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="xm"
                                        label="罪犯姓名">
                                      <!--<template slot-scope="props" >-->
                                        <!--<a :title="props.row.xm"  v-text="props.row.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                                      <!--</template>-->
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="zfBh"
                                        label="罪犯编号">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="corp"
                                        label="监狱">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="dept"
                                        label="监区">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="ksrq"
                                        label="考核开始时间">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jzrq"
                                        label="考核结束时间">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jllb"
                                        label="奖励类别" :formatter="jllbf">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="dqspjd"
                                        label="审批环节">
                                    </aty-table-column>
                                    <aty-table-column
                                        label="操作"  width="140" :showOverflowTooltip="false">
                                        <template slot-scope="scope">
                                            <i>
                                            <img @click="viewDetail(scope.row,1)" title="查看详情" class="table_butn" src="../../assets/images/w-png20.png">
                                            </i>
                                        </template>
                                    </aty-table-column>
                                </aty-table>
                                <!-- table區域 end -->
                                <!-- 分页 start -->
                                <aty-row class="fd-category">
                                <aty-row>
                                    <aty-pagination :total="zb_total" :offset="zb_offset" :limit="zb_limit"
                                                    :show-total="true" :show-sizer="true" :show-elevator="true"
                                                    @change="zbChangePage" ref="zbPage">
                                    </aty-pagination>
                                </aty-row>
                                </aty-row>
                            </div>
                        </happy-scroll>
                    </aty-tabpane>
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
                                    <aty-col v-if="isJyj()" span="6" class="search_option_marginb">
                                        <p class="search_option_text">监狱：</p>
                                        <aty-select-tree class="nomal_tree search_option_input" name="jyTree3"
                                                         ref="jyTree3" :data="jyTreeData" v-model="ybData.jy"
                                                         clearable>
                                        </aty-select-tree>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">监区：</p>
                                        <aty-select-tree class="nomal_tree search_option_input" name="jqTree3"
                                                         ref="jqTree3" :data="ybJqTreeData" v-model="ybData.jq"
                                                         clearable>
                                        </aty-select-tree>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">罪犯编号：</p>
                                        <aty-input v-model="ybData.zfbh" class="search_option_input" clearable></aty-input>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">罪犯姓名：</p>
                                        <aty-input v-model="ybData.zfxm" class="search_option_input" clearable></aty-input>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">奖励类别：</p>
                                        <aty-select class="search_option_input" v-model="ybData.jllb" :data="jllbDataList" clearable></aty-select>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">状态：</p>
                                        <aty-select class="search_option_input" v-model="ybData.zt" :data="ybSpztDataList" clearable></aty-select>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb">
                                        <p class="search_option_text">兑现情况：</p>
                                        <aty-select class="search_option_input" v-model="ybData.dxqk" :data="dxqkDataList" clearable></aty-select>
                                    </aty-col>
                                    <aty-col  span="6" class="search_option_marginb search_option_textr">
                                        <aty-button class="search_option_butn1" type="primary"  @click="queryDataList(1,yb_limit,2)">
                                            <i>
                                                <img src="../../assets/images/w-png17.png">
                                            </i>
                                            <span>查询</span>
                                        </aty-button>
                                        <aty-button class="search_option_butn2" type="default" @click="reSet(2)">
                                            <i>
                                                <img src="../../assets/images/w-png18.png">
                                            </i>
                                            <span>重置</span>
                                        </aty-button>
                                    </aty-col>
                                </aty-row>
                                <div class="dr_edit_butn">
                                    <router-link :to="{path:'/newReward'}">
                                        <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.xzjl')" class="dr_edit_b1" type="primary">
                                            <i>+</i>
                                            <span>新增奖励</span>
                                        </aty-button>
                                    </router-link>
                                    <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.schyjl')" class="dr_edit_b1"
                                                type="primary" @click="hyjlUploadEvent(1,10,'')">
                                        <!-- <i>+</i> -->
                                        <span>上传合议记录</span>
                                    </aty-button>
                                    <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.jlgsb')" class="dr_edit_b1"
                                                type="primary" @click="showJlgsbModal">
                                        <!-- <i>+</i> -->
                                        <span>奖励公示表</span>
                                    </aty-button>
                                </div>
                                <!-- table區域 start -->
                                <aty-table
                                    :pageable-data="tableData3"
                                    @selection-change="ybSelectChange"
                                    style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false">
                                    <aty-table-column
                                        type="index"
                                        label="序号" :showOverflowTooltip="false">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="xm"
                                        label="罪犯姓名">
                                      <!--<template slot-scope="props" >-->
                                        <!--<a :title="props.row.xm"  v-text="props.row.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                                      <!--</template>-->
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="zfBh"
                                        label="罪犯编号"
                                        width="140">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="corp"
                                        label="监狱">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="dept"
                                        label="监区" width="140">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="ksrq"
                                        label="考核开始时间">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jzrq"
                                        label="考核结束时间">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jllb"
                                        label="奖励类别"
                                        width="140" :formatter="jllbf">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="spzt"
                                        label="状态"
                                        width="80" :formatter="spztf">
                                    </aty-table-column>
                                    <aty-table-column
                                        prop="jlsyqk"
                                        label="兑现情况"
                                        width="140" :formatter="dxqkf">
                                    </aty-table-column>
                                    <aty-table-column
                                        label="操作"  width="140" :showOverflowTooltip="false">
                                        <template slot-scope="scope">
                                            <i>
                                            <img @click="viewDetail(scope.row,2)" title="查看详情" class="table_butn" src="../../assets/images/w-png20.png">
                                            <img v-if="checkButShow(scope.row)" v-show="checkButtonShow('jy.imp.jfkh.jl.dxjl')" @click="useReward(scope.row)" title="使用奖励" class="table_butn" src="../../assets/images/w-png19.png">
                                            </i>
                                        </template>
                                    </aty-table-column>
                                </aty-table>
                                <!-- table區域 end -->
                                <!-- 分页 start -->
                                <aty-row class="fd-category">
                                <aty-row>
                                    <aty-pagination :total="yb_total" :offset="yb_offset" :limit="yb_limit"
                                                    :show-total="true" :show-sizer="true" :show-elevator="true"
                                                    @change="ybChangePage" ref="ybPage">
                                    </aty-pagination>
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
            <!-- pop tab1 弹窗 -->
            <aty-modal class="rl_pop_box jl-Modal" ref="useReward" width="500px" closable=""  :mask-closable="false">
              <div class="pop_title">兑现奖励</div>
              <div class="pop_main_box fd-syjl-pop">
                 <aty-form :data="syjlData" ref="form" :label-width="100">
                    <aty-input label="物质奖励：" v-model="syjlData.wzjl" clearable  :show-message="false"></aty-input>
                    <aty-date-picker clearable  v-model="syjlData.hqsj" class="dr_date_pick" type="date" :editable='false' label="换取时间："  :show-message="false"></aty-date-picker>
                    <aty-select v-model="syjlData.jbmj" :data="syjlData.jbmjData" label="经办民警：" clearable  :show-message="false"></aty-select>
                 </aty-form>
                 <aty-button class="search_option_butn1 btn-center" type="primary" @click="saveReward">
                    <i>
                        <img src="../../assets/images/save.png">
                    </i>
                     <span>保存</span>
                 </aty-button>
              </div>
            </aty-modal>
            <!-- 上传合议记录 弹窗 -->
            <aty-modal :mask-closable="false" class="rl_pop_box fd-jl-modal fd-schyjl-modal jl-Modal" ref="hyjlUpload"
                       width="800px" closable="">
                <div class="pop_title">上传合议记录</div>
                <div class="pop_main_box">
                    <div class="hyjl-scroll" :style="{height:hyjlHeight}">
                      <aty-scroll :speed="53" class="aty-scroll-2" ref="hyjlScroll" name="hyjlScroll"  >
                        <aty-upload :max-size=5  :max=5 :min=0
                                    accept=".doc,.docx,.pdf,.jpg,.jpeg,.bmp,.png,.zip,.rar"
                                    :multiple="true" :action="getActionUrl()"
                                    :before-upload="handleUpload"  ref="upload"  :file-list="fileList" v-show="false">
                            <aty-button type="primary" class="fd-btn-upload">
                                上传文件
                                <i><img src="../../assets/images/upload.png"></i>
                            </aty-button>
                        </aty-upload>
                        <aty-table :pageable-data="hyjlTableData" style="width: 100%;" :exp-all="false"  :exp-current-page="false" class="fd-hyjl-table">
                            <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false">
                            </aty-table-column>
                            <aty-table-column prop="jzrq" label="考核截止月份" width="140">
                            </aty-table-column>
                            <aty-table-column prop="xm" label="罪犯名单">
                            </aty-table-column>
                            <aty-table-column label="操作" width="200" :showOverflowTooltip="false">
                                <template slot-scope="scope">
                                    <!-- <aty-text class="link" @click="handleUpload">上传合议记录</aty-text> -->
                                    <aty-text class="link" @click="triggerUpload(scope.row)">上传合议记录</aty-text>
                                    <aty-text class="link" @click="viewHyjl(scope.row.jlpc)"  v-if="scope.row.file.length >0" >查看</aty-text>
                                </template>
                            </aty-table-column>
                        </aty-table>
                        <!-- 分页 start -->
                        <aty-row class="fd-category">
                            <aty-row>
                                <aty-pagination :total="hyjl_total" :offset="hyjl_offset" :limit="hyjl_limit"
                                                :show-total="true"  :show-elevator="true" @change="hyjlChangePage"
                                                ref="hyjlPage">
                                </aty-pagination>
                            </aty-row>
                        </aty-row>
                        <!-- 分页 end -->
                        <aty-row class="fd-upload fd-hyjl-upload" v-if="hyjlFiles.length > 0">
                            <aty-col span="24" class="fd-files">
                                <template>
                                <ul class="fileList">
                                    <li v-for="(item,index) in hyjlFiles" :key="index">
                                        <aty-link :text="item.name" :href="item.url" target="_parent" class="a_color" @click="downLoadFile(item.bh)"></aty-link>
                                        <aty-text @click="openDeleteModal(index,item.bh)"><aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon></aty-text>
                                    </li>
                                </ul>
                                </template>
                            </aty-col>
                        </aty-row>
                      </aty-scroll>
                    </div>
                </div>
            </aty-modal>
            <!-- 上传合议记录 弹窗 -->
            <!-- 审批 弹窗 -->
            <aty-modal :mask-closable="false" class="rl_pop_box jl-Modal" ref="spModal" width="650px" closable="">
                <div class="pop_title">{{spType === 1 ? "审批" :"批量审批"}}</div>
                <div class="pop_main_box fd-sp-modal">
                    <aty-row class="fd-sp-row" v-if="spType === 1">
                    <aty-col span='4' class="fd-sp-col1">罪犯姓名：</aty-col>
                    <aty-col span='20' class="fd-sp-col2">{{spData.zfxm}}</aty-col>
                    </aty-row>
                    <aty-row class="fd-sp-row">
                    <aty-col span='4' class="fd-sp-col1">审批意见：</aty-col>
                    <aty-col span='20' class="fd-sp-col2">
                        <aty-radio-group :data-list="spyjList" v-model="spData.spyj"  @change="spyjChange"></aty-radio-group>
                    </aty-col>
                    </aty-row>
                    <aty-row class="fd-sp-row" v-if="!xybsprflag&&spData.spyj=='1'">
                    <aty-col span='4' class="fd-sp-col1">下一步审批人：</aty-col>
                    <aty-col span='20' class="fd-sp-col2">
                        <aty-select  class="npl_seleted" v-model="spData.spr" :data="xybsprList" clearable></aty-select>
                    </aty-col>
                    </aty-row>
                    <div class="drw_save_butn">
                    <aty-button @click="spSubmit" class="search_option_butn1" type="primary">
                        <span>提交</span>
                    </aty-button>
                    </div>
                </div>
            </aty-modal>
            <!-- 计分考核公示表 弹窗 -->
            <aty-modal :mask-closable="false" class="rl_pop_box fd-jlgsb-modal jl-Modal"  width="1000px" height="500px"
                       closable="" ref="jlgsbModal" title="奖励公示表">
                <div class="pop_main_box">
                    <div class="flgsb-opt">
                        <div class="date-box">
                            <aty-date-picker label="截止月份" :label-width="70" clearable type="month"
                                             @change="jzyfChange"   v-model="jzyf"   :options="options" style="width: 286px">
                            </aty-date-picker>
                        </div>
                        <aty-button  class="dr_edit_b1 fd-exportjlgsb" type="primary" @click="exportEvent">
                            <span>导出</span>
                        </aty-button>
                    </div>
                    <aty-table :pageable-data="jlgsbData" height="450" style="width: 100%;" :exp-all="false"  :exp-current-page="false" >
                    <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
                    <aty-table-column prop="xm" label="罪犯姓名">
                      <!--<template slot-scope="props" >-->
                        <!--<a :title="props.row.xm"  v-text="props.row.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>-->
                      <!--</template>-->
                    </aty-table-column>
                    <aty-table-column prop="zfBh" label="罪犯编号"  width="110"></aty-table-column>
                    <aty-table-column prop="ksrq" label="开始月份" ></aty-table-column>
                    <aty-table-column prop="jzrq" label="截止月份" ></aty-table-column>
                    <aty-table-column prop="sqyf" label="上期余分"></aty-table-column>
                    <aty-table-column prop="bqjygzf" label="本期教育改造" width="110"></aty-table-column>
                    <aty-table-column prop="bqldgzf" label="本期劳动改造" width="110"></aty-table-column>
                    <aty-table-column prop="ljjf" label="累计积分" ></aty-table-column>
                    <aty-table-column prop="jllb" label="奖励类别" :formatter = "jllbf"></aty-table-column>
                    </aty-table>
                </div>
            </aty-modal>
             <!-- 退回提交 弹窗 -->
            <aty-modal title="提交" footer-hide closable="" ref="tjSpModal" width="500" :mask-closable="false" class="xybsp-modal">
                <aty-select v-model="spr" :data="xybsprList" label="下一步审批人" clearable></aty-select>
                <aty-button class="search_option_butn1" type="primary" @click.native="tjSubmit">
                    <span>提交</span>
                </aty-button>
            </aty-modal>
            <aty-modal  title="取消提交" class="fd-bj-modal" ok-text="确定" cancel-text="取消" closable ref="qxTj" width="400" @on-ok="qxTjEvent"  :mask-closable="false">
                <aty-text text="确定要取消提交吗？"></aty-text>
            </aty-modal>
            <aty-modal title="删除附件"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach" closable  width="400" @on-ok="deleteUploadFile"  :mask-closable="false">
               <aty-text text="确定要删除此附件？"></aty-text>
            </aty-modal>
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
      limitOpts:[10,20,30,40],
      breadcrumbdata: [
        {
          name: "奖励",
          href: "/rewardList"
        },
        {
          name: "奖励列表",
          href: "/rewardList"
        }
      ],
      options: {
        disabledDate: function(date) {
          return date && date.valueOf() > Date.now() - 86400000;
        }
      },
      curUserInfo: {},
      //合议记录翻页相关
      hyjl_offset: 0,
      hyjl_total: 0,
      hyjl_limit: 10,
      //待办翻页相关
      db_offset: 0,
      db_total: 0,
      db_limit: 10,
      //在办翻页相关
      zb_offset: 0,
      zb_total: 0,
      zb_limit: 10,
      //已办翻页相关
      yb_offset: 0,
      yb_total: 0,
      yb_limit: 10,
      dbSelection: [],
      //监狱
      jyTreeData: [],
      //监区
      jqTreeData: [],
      dbData: {
        jy: "",
        jq: "",
        zfbh: "",
        zfxm: "",
        jllb: "",
        jbmj: "",
        spzt: ""
      },
      zbData: {
        jy: "",
        jq: "",
        zfbh: "",
        zfxm: "",
        jllb: "",
        jbmj: "",
        sphj: ""
      },
      ybData: {
        jy: "",
        jq: "",
        zfbh: "",
        zfxm: "",
        jllb: "",
        jbmj: "",
        spzt: "",
        dxqk: ""
      },
      // 奖励类别下拉筛选数据
      jllbDataList: [
        {
          code: "1",
          name: "表扬"
        },
        {
          code: "2",
          name: "物质奖励"
        }
      ],
      //待办查询条件-状态
      dbSpztDataList: [
        {
          code: "100",
          name: "待审批"
        },
        {
          code: "102",
          name: "退回"
        }
      ],
      //已办查询条件-状态
      ybSpztDataList: [
        { code: "103", name: "通过" },
        { code: "104", name: "取消提交" }
      ],
      sphjDataList: [],
      dxqkDataList: [
        { code: "--", name: "--" },
        { code: "1", name: "待兑现" },
        { code: "2", name: "计发" },
        { code: "3", name: "兑现减刑假释" },
        { code: "4", name: "取消奖励" }

      ],
      // table数据
      // table数据
      tableData: [],
      // tab2 table数据
      tableData2: [],
      tableData3: [],
      //使用奖励弹窗数据
      syjlData: {
        jbmjData:[]
      },
      zfxxUrl:_zfxxDetail.url,
      uploadfiles: [],
      loadingStatus: false,
      hyjlFiles: [],
      selectIndex: "",
      hyjlTableData: [],
      shanchubh:'',
      //奖励公示表数据
      jlgsbData: [],
      spType: "",
      spData: {
        bh: "",
        zfxm: "",
        spyj: "",
        spr: "",
        taskid: "",
        zfxxBh:"",
        zfBh:"",
        yspr:"",
        jllb:"",
        createTime:null
      },
      xybsprList: [],
      xybsprflag:false,
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
      //提交审批审批list
      tjsplist:{
        bh: "",
        zfxm: "",
        spr: "",
        taskid: "",
        zfxxBh:"",
        zfBh:"",
        spyj:"",
        yspr:"",
        createTime:"",
        jllb:"",
        spzt:""
      },
      //提交审批审批人
      spr: "",
      jzyf: "",
      //待办列表
      jlBh: "",
      zfBh:"",
      jlpc: "",
      fileList: [],
      dbcount:0,
      zbcount:0,
      uploadIndex:'',
      isLoading:false,
      //附件主键
      entityFileBh:''
    };
  },
  created() {
    this.curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
    this.getJqDataList();
    this.initData(1, this.db_limit, 0);
    this.getDbcount();
    this.getZbcount();
    this.manyCheckFlag = "jq";
  },
  watch:{
    hyjlTableData(curVal,oldVal){
      this.$nextTick(function(){
         this.$refs.hyjlScroll.update(0,0)
      })
    },
    hyjlFiles(curVal,oldVal){
      this.$nextTick(function(){
         this.$refs.hyjlScroll.update(0,0)
      })
    }
  },
  computed:{
      hyjlHeight(){
         if(138 + parseInt(this.hyjlFiles.length) *31 + parseInt(this.hyjlTableData.length) *41 > 600){
            return 600 +"px"
         }
      },
      /**
       * @name 已办监区数据
       * @description
       */
      ybJqTreeData() {
        var deptType = this.curUserInfo.deptType;
        var corpId = this.ybData.jy;
        if(corpId == undefined || corpId == "") {
          corpId = this.curUserInfo.corpId
        }
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = false;
        this.getRequest("/api/v1/system/getJq/" + corpId + "/" + deptType + "/" + isSelectFgyzf).then(resp => {
          if (resp && resp.status == 200) {
            var list = resp.data.ArrayList;
            if(list && list != ''){
              this.$refs.jqTree3.update(list);
            }
          }
        });
      }
  },
  mounted() {},
  methods: {
    pageSizeChange(pageSize) {

    },
    getActionUrl() {
      return "/api/v1//jl/uploadHy/" + this.jlpc;
    },
    setDate() {
      var myDate = new Date();
      //获取当前年月，设置时间下拉框默认选项
      let month = myDate.getMonth();
      let year = myDate.getFullYear();
      if (month < 10) {
        this.jzyf = year + "-" + "0" + month;
      } else {
        this.jzyf = year + "-" + month;
      }
    },
    //初始化查询方法
    initData(pageNum, pageSize, tab) {
      this.offset = (pageNum - 1) * pageSize;
      this.queryDataList(pageNum, pageSize, tab);
    },
    //查询监狱下拉列表
    getJyDataList() {
      this.getRequest("/api/v1/system/getJy").then(resp => {
        if (resp && resp.status == 200) {
          if(resp.data.ArrayList && resp.data.ArrayList!=''){
              this.jyTreeData = [];
              this.jyTreeData = resp.data.ArrayList;
              if(this.$refs.hasOwnProperty("jyTree3")) {
                this.$refs.jyTree3.update(this.jyTreeData);
              }
          }else{
              this.jyTreeData = [];
          }
        }
      });
    },
    getJq(treeNodeData, name, event) {},
    //获取监区下拉列表
    getJqDataList() {
      var _this = this;
      var deptType = _this.curUserInfo.deptType;
      var corpId = _this.curUserInfo.corpId;
      //是否可选择非关押罪犯部门 true：不可选 false:可选
      var isSelectFgyzf = false;
      _this.getRequest(
        "/api/v1/system/getJq/" + corpId + "/" + deptType + "/" + isSelectFgyzf
      ).then(resp => {
        if (resp && resp.status == 200) {
          if(resp.data.hasOwnProperty('ArrayList') && resp.data.ArrayList!=''){
            _this.jqTreeData = resp.data.ArrayList;
            _this.$refs.jqTree1.update(_this.jqTreeData);
            _this.$refs.jqTree2.update(_this.jqTreeData);
          }else{
            _this.jqTreeData = [];
          }
        }
      });
    },
    //查看罪犯详细信息
    goZfxx(item){
      let bh = item.row.zfxxBh;
      let url = "http://172.25.16.102:8080/zfda/?" + bh;
      window.open(url);
    },
    // tab点击事件
    tabClick(tab, event) {
      if (tab == 0) {
        this.db_limit = 10;
        this.$refs.dbPage.currentPage = 1;
        this.$refs.dbPage.currentPageSize = 10;
        this.initData(1, this.db_limit, tab);
      }
      if (tab == 1) {
        this.zb_limit = 10;
        this.$refs.zbPage.currentPage = 1;
        this.$refs.zbPage.currentPageSize = 10;
        this.initData(1, this.zb_limit, tab);
        this.sphjDataStorage();
      }
      if (tab == 2) {
        this.getJyDataList();
        this.yb_limit = 10;
        this.$refs.ybPage.currentPage = 1;
        this.$refs.ybPage.currentPageSize = 10;
        this.initData(1, this.yb_limit, tab);
      }
    },
    //根据单位级别获取审批环节数据
    sphjDataStorage() {
      this.getRequest("/api/v1/system/sphjData/jl").then(resp => {
        if (resp && resp.status == 200) {
          let storageData = resp.data;
          this.sphjDataList = [];
          for (let i = 0, size = storageData.length; i < size; i++) {
            let obj = {};
            obj.code = storageData[i].taskDefinitionKey;
            obj.name = storageData[i].name;
            this.sphjDataList.push(obj);
          }
        } else {
          console.error("获取审批操作出错！");
        }
      });
    },
    //获取待办个数
    getDbcount() {
      let _this = this;
      _this.getRequest("/api/v1/jl/getJlDbCount").then(resp => {
        if (resp && resp.status == 200) {
          this.dbcount = resp.data;
        }
      });
    },
    //获取在办个数
    getZbcount(){
      let _this = this;
      _this.getRequest("/api/v1/jl/getJlZbCount").then(resp => {
        if (resp && resp.status == 200) {
          this.zbcount = resp.data;
        }
      });
    },
    showJlgsbModal() {
      this.$refs.jlgsbModal.open();
      this.setDate();
      //初始化奖励公示表
      let jzyf = this.getYearMonth();
      this.jzyfChange(jzyf);
    },
    /**
     * 拼接年月(当年年月)
     */
    getYearMonth() {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      let jzyf = year + seperator1 + month;
      return jzyf;
    },

    /**
     * 奖励公示表取消公示
     */
    cancelGs() {},
    /**
     * 奖励公示表日期选择
     */
    jzyfChange(jzyf) {
      let _this = this;
      if(jzyf == ""){
        setDate();
        jzyf = _this.jzyf;
      }
      this.jlgsbData = [];
      //调用奖励公示表接口
      this.getRequest("/api/v1/jl/getJlGsList/" + jzyf + "/").then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data == undefined || resp.data == null ||resp.data =='') {
            return;
          }else {
            this.jlgsbData = resp.data;
          }
        }
      });
    },
    /**
     * 奖励公示表导出
     */
    exportEvent() {
      let seperator1 = "-";
      var cbny = "";
      if(typeof(this.jzyf) != "string") {
        let year = this.jzyf.getFullYear();
        let month = this.jzyf.getMonth()+1;
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        cbny = year + seperator1 + month;
      } else {
        cbny = this.jzyf;
      }
      //导出操作，操作完成回调中将状态置为true
      let url = _server.serverName+"/api/v1/jl/exportJlGs?cbny=" + cbny;
      window.location.href = url;
    },
    emptyUseReward() {
      this.syjlData.wzjl = "";
      this.syjlData.hqsj = null;
      this.syjlData.jbmj = "";
      this.syjlData.jllb = "";
    },
    /**
     * 使用奖励
     */
    useReward (item){
      this.emptyUseReward()
      this.$refs.useReward.open()
      var _this = this;
      _this.syjlData.bh = item.bh;
      _this.syjlData.jllb = item.jllb;
      _this.syjlData.zfxxBh = item.zfxxBh;
      _this.getRequest("/api/v1/system/getUser").then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data) {
            let userList = resp.data;
            _this.syjlData.jbmjData = userList;
          }
        }
      });
    },
    /**
     * 判断使用奖励按钮是否显示
     */
    checkButShow(row) {
      let jlsyqkTemp = row.jlsyqk;
      if(jlsyqkTemp === "1" || jlsyqkTemp === undefined || jlsyqkTemp === '' || jlsyqkTemp === null) {
        return true;
      }
      return false;
    },
    /**
     * 使用奖励保存事件
     */
    saveReward() {
      if (this.syjlData.wzjl === "" || this.syjlData.wzjl === null) {
        Artery.message.info({
          content:"物质奖励金额为必填",
          duration:3
        });
        return;
      }
      if (this.syjlData.hqsj === "" || this.syjlData.hqsj === null) {
        Artery.message.info({
          content:"换取时间为必填",
          duration:3
        });
        return;
      }
      if (this.syjlData.jbmj === "" || this.syjlData.jbmj === null) {
        Artery.message.info({
          content:"经办民警为必填",
          duration:3
        });
        return;
      }
      let _this = this;
      //保存请求
      let params = {
        bh: _this.syjlData.bh,
        dxjlrq: this.syjlData.hqsj,
        dxjlmj: this.syjlData.jbmj,
        dxwzjl: this.syjlData.wzjl,
        jllb: this.syjlData.jllb,
        zfxxBh: this.syjlData.zfxxBh
      };
      _this.postRequest("/api/v1/jl/dxJl", params).then(resp => {
        if (resp && resp.status == 200) {
          Artery.message.info("保存成功");
          this.$refs.useReward.close();
          this.emptyUseReward();
          this.initData(1, this.db_limit, 2);
        } else {
          Artery.message.error({
             content:"保存失败",
             duration:3
          });
        }
      });
    },
    /**
     *待办列表选择事件
     */
    dbSelectChange(selection) {
      if(selection != null) {
        for(var i = 0; i < selection.length; i++) {
          selection[i].zfxm = selection[i].xm;
        }
      }
      this.dbSelection = selection;
    },
    ybSelectChange(selection) {},
    triggerUpload(item) {
      let _this = this;
      _this.jlpc = item.jlpc;
      //触发隐藏的upload组件
      this.$refs.upload.handleClick();
      this.uploadIndex = 0;
      this.hyjlFiles =  [];
    },
    /**
     * 合议记录上传事件
     */
    handleUpload: function(file) {
      let _this = this;
      let total = this.$refs.upload.$refs.input.files.length
      var formData = new FormData();
      formData.append("files", file);
      formData.append("jlpc", this.jlpc);
      _this.uploadFileRequest("/api/v1/jl/uploadHy", formData).then(resp => {
        if (resp && resp.status == 200) {
          debugger
            this.hyjlFiles.push(file);
            _this.uploadIndex ++
            if(_this.uploadIndex == total){
              Artery.message.info("上传成功!");
              this.hyjlUploadEvent(1,10,'refresh');
              this.viewHyjl(this.jlpc);
            }
        }
      });
    },
    //根据奖励批次查询合议记录附件
    viewHyjl(jlpc) {
      let _this = this;
      //请求合议附件
      _this.getRequest("/api/v1/jl/getJlHys/" + jlpc).then(resp => {
        if (resp && resp.status == 200) {
          if(resp.data && resp.data!=''){
              this.hyjlFiles = resp.data;
              if (this.hyjlFiles.length == 0) {
                Artery.message.info({
                    content:"无合议记录,请上传!",
                    duration:3
                });
                this.$nextTick(function(){
                  this.$refs.hyjlScroll.update()
                })
              }
          }
        }
      });
    },
    /**
     * 加载合议记录数据事件
     */
    loadHyjlData(pageNum,pageSize){
      debugger
      var _this = this;
      _this
        .getRequest("/api/v1/jl/getJlHyPc/" + pageNum + "/" + pageSize)
        .then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.PageInfo.list == undefined || resp.data.PageInfo.list == null || resp.data.PageInfo.list == '') {
              return;
            }
            _this.hyjlTableData = resp.data.PageInfo.list;
          }
        });
    },
    /**
     * 上传合议记录按钮点击事件
     */
    hyjlUploadEvent(pageNum, pageSize,type) {
      var _this = this;
      this.$refs.hyjlPage.currentPage  = 1;
      _this
        .getRequest("/api/v1/jl/getJlHyPc/" + pageNum + "/" + pageSize)
        .then(resp => {
          if (resp && resp.status == 200) {
            debugger
            if (resp.data.PageInfo.list == undefined || resp.data.PageInfo.list == null || resp.data.PageInfo.list == '') {
              return;
            }
            debugger
            var hyjlTableData = resp.data.PageInfo.list;
            _this.hyjl_total = resp.data.PageInfo.total;
            _this.hyjlTableData = hyjlTableData;
            if (_this.hyjlTableData.length > 0) {
              _this.$refs.hyjlUpload.open();
              _this.$nextTick(function(){
                this.refs.hyjlScroll.update()
              })
            }
          }
        });
    },
    /**
     * 删除附件确认
     */
    openDeleteModal(index,bh) {
      if(bh == ''){
        return ;
      }
      this.shanchubh = bh;
      this.entityFileBh = bh;
      this.selectIndex = index;
      this.$refs.attach.open();
    },
    deleteUploadFile() {
      let bh = this.shanchubh;
      this.hyjlFiles.splice(this.selectIndex, 1);
      this.deleteRequest("/api/v1/entity-file/" + bh).then(resp => {
          if (resp && resp.status == 204) {
            debugger
            Artery.message.success("删除文件成功！");
            this.hyjlUploadEvent(1,10,'refresh');
          }
      });
      this.$refs.attach.close();
    },
    hyjlChangePage() {
      //翻页时清除附件列表
      this.hyjlFiles = [];
      this.limit = this.$refs.hyjlPage.currentPageSize;
      this.offset=this.$refs.changePage.currentPage;
      this.loadHyjlData(this.offset, this.limit)
    },
    uploadBtn() {
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
              content:"上传失败！",
              duration:3
          });
          this.loadingStatus = false;
        }
      });
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
          _this.hyjlTableData = resp.data;
        }
      });
    },
    /**
     * 提交事件
     */
    rewardSubmit(item) {
      this.spr = "";
      let _this = this;
      this.$refs.tjSpModal.open();
      this.tjsplist.bh = item.bh;
      this.tjsplist.taskid =item.taskid;
      this.tjsplist.zfxm = item.xm;
      this.tjsplist.zfBh = item.zfBh;
      this.tjsplist.yspr = item.yspr;
      this.tjsplist.createTime = item.createTime;
      this.tjsplist.jllb = item.jllb;
      this.tjsplist.spzt = item.spzt;
      var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var taskParams = {
        curTaskId: item.taskid,
        spAuthority: "jy.imp.jfkh.splc.jlsp.",
        corpId: userInfo.corpId
      };
      _this.getRequest("/api/v1/system/getTaskNextSprs", taskParams)
        .then(resp => {
          if (resp && resp.status == 200) {
            if(resp.data && resp.data!=''){
              _this.xybsprList = resp.data;
            }
          }
        });
    },
    /**
     * 取消提交事件
     */
    cancelSubmit(item) {
      this.$refs.qxTj.open();
      this.jlBh = item.bh;
      this.zfxxBh = item.zfxxBh;
    },
    qxTjEvent() {
      let _this = this;
      var params={
        bh:this.jlBh,
        zfxxBh:this.zfxxBh
      }
      _this.postRequest("/api/v1/jl/cancel",params).then(resp => {
        this.$refs.qxTj.close();
        if (resp && resp.status == 200) {
          Artery.message.success("取消提交成功！");
          this.initData(1, this.db_limit, 0);
          this.getDbcount();
          this.getZbcount();
        } else {
          Artery.message.error({
              content:"取消失败",
              duration:3
          });
        }
      });
    },
    /**
     * 查看奖励详情
     */
    viewDetail(item, tab) {
      let query = null;
      //待办 在办 已办传给详情数据
      if (localStorage.getItem("jlData")) {
        localStorage.removeItem("jlData");
      }
      if (tab === 0) {
        query = {
          bh: item.bh,
          zfxm: item.xm,
          zfbh: item.zfBh,
          spzt: item.spzt
        };
      } else if (tab === 1) {
        query = { bh: item.bh, zfxm: item.xm, zfbh: item.zfBh };
      } else {
        query = {
          bh: item.bh,
          zfxm: item.xm,
          zfbh: item.zfBh,
          spzt: item.spzt,
          dxqk: item.dxqk
        };
      }
      localStorage.setItem("jlData", JSON.stringify(query));
      this.$router.push({ path: "/rewardDetails" });
    },
    spyjChange() {
      this.spData.spr = "";
    },
    tjSubmit() {
      let _this = this;
      if (this.spr == "") {
        Artery.message.info({
            content:"下一步审批人不能为空",
            duration:3
        });
        return;
      }
      var params = [
        {
          bh: _this.tjsplist.bh,
          zfxm:_this.tjsplist.zfxm ,
          taskid: _this.tjsplist.taskid,
          spr:_this.spr,
          zfbh:_this.tjsplist.zfBh,
          jbmjyj:"1",
          yspr:_this.tjsplist.yspr,
          createTime: _this.tjsplist.createTime,
          spzt:_this.tjsplist.spzt,
          jllb:_this.tjsplist.jllb
        }
      ];
      //调用奖励审批接口
      _this.postRequest("/api/v1/jl/approvalJl", params).then(resp => {
        if (resp && resp.status == 200) {
          Artery.message.success("审批成功！");
          this.$refs.tjSpModal.close();
          this.initData(1, this.db_limit, 0);
          this.getDbcount();
          this.getZbcount();
        }
      });
    },
    // 审批提交按钮
    spSubmit() {
      let _this = this;
      if (_this.spData.spyj == "") {
        Artery.message.info({
           content:"审批意见不能为空",
           duration:3
        });
        return;
      }
      if (
        _this.spData.spr == "" &&
        _this.spData.spyj === "1" &&
        !this.xybsprflag
      ) {
        Artery.message.info({
           content:"下一步审批人不能为空",
           duration:3
        });
        return;
      }

      if (_this.spType === 1) {
        var params = [
          {
            bh: _this.spData.bh,
            zfxm: _this.spData.zfxm,
            taskid: _this.spData.taskid,
            jbmjyj: _this.spData.spyj,
            spr: _this.spData.spr,
            yspr:_this.spData.yspr,
            zfBh:_this.spData.zfBh,
            zfxxBh:_this.spData.zfxxBh,
            jllb: _this.spData.jllb,
            createTime: _this.spData.createTime
          }
        ];
        //调用奖励审批接口
        _this.isLoading=true
        _this.postRequest("/api/v1/jl/approvalJl", params).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.success("审批成功！");
            this.initData(1, this.db_limit, 0);
            this.getDbcount();
            this.getZbcount();
            this.$refs.spModal.close();
            _this.isLoading=false
          }else{
            Artery.message.error({
               content:"审批异常,请联系管理员!",
               duration:3
            });
            _this.isLoading=false
          }
        });
      } else {
        //批量审批提交接口
        var params = _this.dbSelection;
        for(var i =0;i<params.length;i++){
          params[i].jbmjyj = _this.spData.spyj;
          params[i].spr =  _this.spData.spr;
        }
         _this.isLoading=true
        _this.postRequest("/api/v1/jl/approvalJl", params).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.success("审批成功！");
            this.$refs.spModal.close();
	          this.initData(1, this.db_limit, 0);
            this.getDbcount();
            this.getZbcount();
            _this.isLoading=false
          }else{
            Artery.message.error({
               content:"审批异常,请重试!",
               duration:3
            });
            _this.isLoading=false
          }
        });
      }
    },
    /**
     * 打开审批弹窗
     */
    openSpModal(type, item) {
      let _this = this;
      // let type = arguments[0]
      this.spData={
         zfxm:'',
         spyj:'',
         spr:''
      }
      if (type === 1) {
        //单个审批
        this.spType = 1;
        this.spData.zfxm = item.xm;
        this.spData.bh = item.bh;
        this.spData.taskid = item.taskid;
        this.spData.zfBh = item.zfBh;
        this.spData.zfxxBh = item.zfxxBh;
        this.spData.yspr = item.yspr;
        this.spData.createTime = item.createTime;
        this.spData.jllb = item.jllb;
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var taskParams = {
          curTaskId: item.taskid,
          spAuthority: "jy.imp.jfkh.splc.jlsp.",
          corpId: userInfo.corpId
        };
        _this.getRequest("/api/v1/system/isOverSp/"+ item.taskid).then(resp => {
          if (resp && resp.status == 200) {
            this.xybsprflag = resp.data;
          }
        });

        _this
          .getRequest("/api/v1/system/getTaskNextSprs", taskParams)
          .then(resp => {
            if (resp && resp.status == 200) {
              _this.xybsprList = resp.data;
            }
          });
      } else {
        //批量审批
        this.spType = 2;
        if (_this.dbSelection.length == 0) {
          Artery.message.info({
              content:"请选择需要批量审批的数据",
              duration:3
          });
          return;
        }
        var list = _this.dbSelection;
        for (var i = 0; i < list.length; i++) {
          if (list[i].spzt != "100") {
            Artery.message.info({
              content:"不是待审批状态无法批量审批！",
              duration:3
            });
            return;
          }
        }
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var taskParams = {
          curTaskId: _this.dbSelection[0].taskid,
          spAuthority: "jy.imp.jfkh.splc.jlsp.",
          corpId: userInfo.corpId
        };
        _this.getRequest("/api/v1/system/isOverSp/"+_this.dbSelection[0].taskid).then(resp => {
          if (resp && resp.status == 200) {
            this.xybsprflag = resp.data;
          }
        });
        _this
          .getRequest("/api/v1/system/getTaskNextSprs", taskParams)
          .then(resp => {
            if (resp && resp.status == 200) {
              _this.xybsprList = resp.data;
            }
          });
      }
      this.$refs.spModal.open();
    },
    /**
     * 待办翻页事件
     */
    dbChangePage(pageSize) {
      this.db_limit=this.$refs.dbPage.currentPageSize;
      this.db_offset=this.$refs.dbPage.currentPage;
      this.queryDataList(this.db_offset, this.db_limit, 0);
    },
    /**
     * 在办翻页事件
     */
    zbChangePage() {
      this.zb_limit=this.$refs.zbPage.currentPageSize;
      this.zb_offset=this.$refs.zbPage.currentPage;
      this.queryDataList(this.zb_offset, this.zb_limit, 1);
    },
    /**
     * 已办翻页事件
     */
    ybChangePage() {
      this.yb_limit=this.$refs.ybPage.currentPageSize;
      this.yb_offset=this.$refs.ybPage.currentPage;
      this.queryDataList(this.yb_offset, this.yb_limit, 2);
    },
    reSet(tab) {
      if (tab === 0) {
        this.dbData = {
          jy: "",
          jq: "",
          zfbh: "",
          zfxm: "",
          jllb: "",
          jbmj: "",
          spzt: ""
        };
      }
      if (tab === 1) {
        this.zbData = {
          jy: "",
          jq: "",
          zfbh: "",
          zfxm: "",
          jllb: "",
          jbmj: "",
          sphj: ""
        };
      }
      if (tab === 2) {
        this.ybData = {
          jy: "",
          jq: "",
          zfbh: "",
          zfxm: "",
          jllb: "",
          jbmj: "",
          spzt: "",
          dxqk: ""
        };
      }
    },
    /**
     * 条件查询方法
     */
    queryDataList(pageNum, pageSize, tab) {
      let _this = this;
      let params = {};
      if (tab == 0) {
        _this.db_offset = (pageNum - 1) * pageSize; //重置当前页
        params = {
          dept: _this.dbData.jq,
          zfbh: _this.dbData.zfbh,
          zfxm: _this.dbData.zfxm,
          jllb: _this.dbData.jllb,
          jbmj: _this.dbData.jbmj,
          spzt: _this.dbData.spzt,
          lblx: "0" //列表类型
        };
      } else if (tab == 1) {
        _this.zb_offset = (pageNum - 1) * pageSize; //重置当前页
        params = {
          dept: _this.zbData.jq,
          zfbh: _this.zbData.zfbh,
          zfxm: _this.zbData.zfxm,
          jllb: _this.zbData.jllb,
          jbmj: _this.zbData.jbmj,
          dqspjdkey: _this.zbData.sphj,
          lblx: "1" //列表类型
        };
      } else {
        _this.yb_offset = (pageNum - 1) * pageSize; //重置当前页
        params = {
          zfbh: _this.ybData.zfbh,
          zfxm: _this.ybData.zfxm,
          jllb: _this.ybData.jllb,
          jbmj: _this.ybData.jbmj,
          spzt: _this.ybData.zt,
          jlsyqk: _this.ybData.dxqk,
          corp: _this.ybData.jy,
          dept: _this.ybData.jq,
          lblx: "2" //列表类型
        };
      }
      this.postRequest("/api/v1/jl/getJlList/" + pageNum + "/" + pageSize,params).then(resp => {
        if (resp && resp.status == 200) {
          let list = resp.data.PageInfo.list;
          _this.total = resp.data.PageInfo.total;
          if (tab == 0) {
            _this.db_total = resp.data.PageInfo.total;
            _this.tableData = list;
          } else if (tab == 1) {
            _this.zb_total = resp.data.PageInfo.total;
            _this.tableData2 = list;
          } else if (tab == 2) {
            _this.yb_total = resp.data.PageInfo.total;
            _this.tableData3 = list;
          }
        }
      });
    },
    //审批状态转义
    spztf: function(row, column) {
      if (row === "100") {
        return "待审批";
      }
      if (row === "102") {
        return "退回";
      }
      if (row === "103") {
        return "通过";
      }
      if (row === "104") {
        return "取消提交";
      }
    },
    //兑现情况
    dxqkf:function(row, column) {
      // var key = _sigleCode.rjzSpzt + row;
      // var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
      // return row != undefined ? (value != undefined ? value.name : "") : "";
      if (row === "1" || row === undefined || row === '' || row === null) {
        return "待兑现";
      }
      if (row === "2") {
        return "计发";
      }
      if (row === "3") {
        return "兑现减刑假释";
      }
      if (row === "4") {
        return "取消奖励";
      }
      if (row === "--") {
        return "--";
      }
    },
    //奖励类别转义
    jllbf: function(row, column) {
      if (row === "1") {
        return "表扬";
      }
      if (row === "2") {
        return "物质奖励";
      }
    }
  }
};
</script>
<style>
.hyjl-scroll{
    height:100%;
}
.hyjl-scroll .aty-scroll{
    height:100%;
}
.fd-schyjl-modal  .pop_main_box{
    max-height:650px;
    position:relative;
}
.fd-hyjl-table{
    padding-right:5px;
}
.fd-syjl-pop .aty-date-picker {
  /* min-width:216px; */
  width: 100%;
}
.fd-syjl-pop .aty-form-item {
  margin-bottom: 21px;
}
.fd-syjl-pop .aty-form-item-label {
  padding: 10px 0 10px 0;
}
.fd-syjl-pop .aty-form-item-label:before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: #f60;
}
</style>
<style scoped>
.fd-category{
  padding-right:5px;
}
.tabs_main_box .search_option_marginb:nth-child(5n) {
  clear: both;
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
  width: 100px;
  text-align: right;
  line-height: 32px;
}
.search_option_box .aty-date-picker {
  width: calc(100% - 120px);
}
.search_option_input {
  width: calc(100% - 120px);
  height: 32px;
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
  height: 51px;
  background-color: #188aff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  font-size: 16px;
  color: #fff;
  line-height: 51px;
  text-indent: 15px;
}
.pop_main_box {
  padding: 20px 20px;
  background-color: #fff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.fd-sp-col1,
.fd-sp-modal .fd-sp-col1 {
  padding-right: 0;
}
.date-box {
  float: left;
}
.date-box .aty-form-item-label {
  font-size: 14px;
}
.fd-exportjlgsb {
  float: right;
}
.flgsb-opt {
  overflow: hidden;
}
.fd-hyjl-upload {
  text-align: left;
  margin-right:5px;
}
.fd-hyjl-upload ul.fileList {
  width: 100%;
}
.fd-hyjl-upload ul.fileList li span {
  vertical-align: middle;
}
.fd-hyjl-upload .fd-files {
  background-color: #f5f8fb;
  border: 1px solid #e7eef5;
  padding: 10px;
}
</style>

