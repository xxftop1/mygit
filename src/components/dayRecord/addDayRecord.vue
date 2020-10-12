<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <!-- 删除 确认弹窗 -->
    <loading :isLoading="isLoading"></loading>
    <confirmbox v-if="showConfirm" :confirmtext="confirmtext" @butnClick="confirmDelAllCriminal"></confirmbox>
    <confirmbox v-if="showConfirm2" :confirmtext="confirmtext2" @butnClick="confirmDelPrimaryCriminal"></confirmbox>
    <confirmbox v-if="showConfirm3" :confirmtext="confirmtext2" @butnClick="confirmDelSecondaryCriminal"></confirmbox>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box  fd-day-record">
      <!-- 弹出窗口start -->
      <!-- 取消基础分start -->
      <aty-modal :mask-closable="false" title="取消基础分" footer-hide closable="" ref="qxjcfWindow" width="500" class="fd-qxjcf-modal">
        <aty-checkbox-group name="qxjcf" :data-list="qxjcfSelectData" v-model="rjzFormData.qxjcfSelectedData"></aty-checkbox-group>
        <aty-button class="search_option_butn1 fd-btn-qxjcf" type="primary" @click="confirmQxjcf()">
          <span>确定</span>
        </aty-button>
      </aty-modal>
      <!-- 提交弹框start -->
      <aty-modal :mask-closable="false" title="提交" footer-hide closable="" ref="xybsprWindow" width="500" class="xybsp-modal">
        <aty-select transfer v-model="spr" :data="xybsprSelectData" label="下一步审批人"></aty-select>
        <aty-button class="search_option_butn1" type="primary" @click="confirmTijiao()">
          <span>提交</span>
        </aty-button>
      </aty-modal>
      <!-- 一级罪犯选择列表start -->
      <aty-modal :mask-closable="false" title="选择罪犯" footer-hide closable="" ref="editWidiow1" width="800" class="fd-xzzf-modal">
        <aty-button class="search_option_butn1 fd-select-btn" type="primary" :loading="xzIsDisable" @click="addCriminalToList(1)">
          <span>选择</span>
        </aty-button>
        <aty-table @selection-change="selectChange" :data="popData" ref="list1Table" :pageable-data="popData"
                   @load-data="loadData" height="400" :exp-all="false" :exp-current-page="false">
          <aty-table-column :selectable="selectableCheck" type="selection" @change="checkClick(1)" :showOverflowTooltip="false"></aty-table-column>
          <aty-table-column prop="zfxm" label="罪犯姓名" filter-type="string"></aty-table-column>
          <aty-table-column prop="zfbh" label="罪犯编号" filter-type="string"></aty-table-column>
          <aty-table-column prop="szxz" label="监舍小组" filter-type="string"></aty-table-column>
          <aty-table-column prop="gz" label="工种" filter-type="string"></aty-table-column>
        </aty-table>
      </aty-modal>
      <!-- 加扣分通知单start -->
      <aty-modal :mask-closable="false" title="选择罪犯" footer-hide closable="" ref="editWidiow2" width="850">
        <aty-button class="search_option_butn1 fd-select-btn" type="primary" :loading="xzIsDisable" @click="addCriminalToList(2)">
            <span>选择</span>
        </aty-button>
        <aty-text :text="'注：同一罪犯仅能选择一次'" class="z-fond-size"/>
        <aty-table @selection-change="selectChange" :data="popData" ref="list3Table" :pageable-data="popData" height="400" :exp-all="false" :exp-current-page="false">
          <aty-table-column :selectable="selectableCheck" type="selection" @change="checkClick(3)" :showOverflowTooltip="false"></aty-table-column>
          <aty-table-column prop="zfmc" label="罪犯姓名"></aty-table-column>
          <aty-table-column prop="zfbh" label="罪犯编号" width="100px"></aty-table-column>
          <aty-table-column prop="fsrq" :formatter="rowDateFormat" label="发生日期" width="100px"></aty-table-column>
          <aty-table-column prop="zyss" label="主要事实"></aty-table-column>
          <aty-table-column prop="bhTk" label="考核依据"></aty-table-column>
          <aty-table-column prop="fz" label="分值" width="50px"></aty-table-column>
          <aty-table-column prop="dwmc" label="下发单位"></aty-table-column>
          <aty-table-column prop="xfrmc" label="下发人"></aty-table-column>
          <aty-table-column prop="createTime" :formatter="rowDateFormat" label="下发日期" width="100px"></aty-table-column>
        </aty-table>
      </aty-modal>
      <!-- 二级罪犯选择列表start  -->
      <aty-modal :mask-closable="false" title="选择罪犯" footer-hide closable="" ref="editWidiow3" width="800">
        <aty-button class="search_option_butn1 fd-select-btn" type="primary" :loading="xzIsDisable" @click="addCriminalToList(3)">
          <span>选择</span>
        </aty-button>
        <aty-table class='table3-for-single' @selection-change="selectChange2" highlight-current-row="" :data="popData"
                   ref="list2Table" :pageable-data="popData" @load-data="loadData" height="400" :exp-all="false"
                   :exp-current-page="false">
          <aty-table-column :selectable="selectableCheck" type="selection" :showOverflowTooltip="false"></aty-table-column>
          <aty-table-column prop="zfxm" label="罪犯姓名" filter-type="string"></aty-table-column>
          <aty-table-column prop="zfbh" label="罪犯编号" filter-type="string"></aty-table-column>
          <aty-table-column prop="szxz" label="监舍小组" filter-type="string"></aty-table-column>
          <aty-table-column prop="gz" label="工种" filter-type="string"></aty-table-column>
        </aty-table>
      </aty-modal>
      <!-- 合议记录start -->
      <aty-modal :mask-closable="false" class="rl_pop_box" closable="" ref="heyiWindow" width="650">
        <div class="pop_title">合议</div>
        <div class="pop_main_box">
          <aty-form :label-width="110" :data="heyiFormData" ref="form">
            <aty-row>
              <aty-col span="12">
                <aty-form-item label="合议时间">
                  <aty-date-picker v-model="heyiFormData.hysj" format="yyyy-MM-dd" :options="options1" show-time=""></aty-date-picker>
                </aty-form-item>
              </aty-col>
              <aty-col span="12">
                <aty-input label="地点" v-model="heyiFormData.hydd" clearable></aty-input>
              </aty-col>
            </aty-row>
            <aty-row>
              <aty-col span="12">
                <aty-select transfer  class="aty-form-item-required" label="主持人" :data="zcrList"
                            v-model="heyiFormData.zcc" clearable></aty-select>
              </aty-col>
              <aty-col span="12">
                <aty-select transfer  class="aty-form-item-required" label="记录人" :data="jlrList"
                            v-model="heyiFormData.jlr" clearable></aty-select>
              </aty-col>
            </aty-row>
            <aty-textarea label="备注" v-model="heyiFormData.bz"></aty-textarea>
            <aty-select transfer  class="aty-form-item-required more_select_delete" :label="hyJfkhmjLabel"
                        @change="showQxry" :data="jfkhmjList" multiple v-model="heyiFormData.jfkhxzmj" clearable></aty-select>
            <aty-select transfer  class="aty-form-item-required more_select_delete" label="参加人员" :data="cjryList"
                        @change="showQxry" multiple v-model="heyiFormData.cjry" clearable></aty-select>
            <aty-row v-if="isShowQxry">
              <aty-col span="4">
                <aty-text :text="'缺席人员'" class="hy-fond-size"></aty-text>
              </aty-col>
              <aty-col span="20">
                <aty-table :pageable-data="heyiFormData.qxTableData" height="150" border>
                  <aty-table-column v-if="false" prop="qxry" width="70px" label="缺席人员"></aty-table-column>
                  <aty-table-column prop="qxryXm" width="190px" label="姓名"></aty-table-column>
                  <aty-table-column prop="qxyy" label="缺席原因">
                    <template slot-scope="scope">
                      <input class="hy_table_input"  v-model="scope.row.qxyy"/>
                    </template>
                  </aty-table-column>
                </aty-table>
              </aty-col>
            </aty-row>
            <aty-row class="fd-btns-hy">
              <aty-col span="20">
                <aty-text :text="'注：本系统生成的合议记录仅是一个草稿，如行文不通请导出后进行修改'" class="z-fond-size"/>
              </aty-col>
            </aty-row>
            <aty-form-item class="fd-btns-hy">
              <aty-button class="fd-btn-blue fd-save-clause hy-button" text="保存并导出" @click="saveExport()"></aty-button>
            </aty-form-item>
          </aty-form>
        </div>
      </aty-modal>
      <!-- 弹出窗口end -->
      <aty-region-layout :border=false>
        <aty-region-north class="fd-top" :height="40" :border=false>
          <aty-button class="search_option_butn1" type="primary" @click="dayRecord">
            <i><img src="../../assets/images/menu.png"></i>
            <span>日记载列表</span>
          </aty-button>
        </aty-region-north>
        <!-- 左侧筛选start -->
        <aty-region-west :width="365" :border=false class="fd-rzj-filter">
          <aty-panel class='gray_panel'>
            <aty-input v-model="zfbhOrXm" placeholder="罪犯编号/姓名" class="fd-rjz-search">
              <aty-button slot="append" text="" icon="ios-search" @click="modalPage1(1)"></aty-button>
            </aty-input>
            <aty-row class='search_area'>
              <aty-col span="5" class="opera_row">
                <aty-checkbox ref='allC' v-model="checkAll" class="checkbox_all" size="large" label="全选" name="全选"
                              checkbox-label="全选" @change='chooseAll' :disabled="checkAllDisable">
                </aty-checkbox>
              </aty-col>
              <aty-col span="14" class="opera_row add_or_reduce_score">
                <aty-button class="" type="primary" text="加扣分通知单" @click="modalPage1(2)"></aty-button>
              </aty-col>
              <aty-col span="5" class="opera_row">
                <img v-if="clearAllShow" @click="clearListAll" title="删除" class="table_butn" src="../../assets/images/w-png23.png">
              </aty-col>
            </aty-row>
            <aty-divider margin-top="15px" margin-bottom="5px"></aty-divider>
            <aty-panel class="fd-rjz-person">
              <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
                <aty-panel class="fd-data-item">
                  <aty-panel class="search_list_level1" v-if="item.zfbh !== ''&&item.from == ''"
                             v-for="(item,index) in waitChoosePrimaryCriminals" :key="index">
                    <aty-row>
                      <aty-col span="2">
                        <aty-checkbox :disabled="!item.selectable" :checked='item.checked' checkbox-label=' '
                                      @change="checkChoosePerson(item,index*5)">
                        </aty-checkbox>
                      </aty-col>
                      <aty-col span="2" class="lianhao-person">
                        <aty-icon type="android-person" size="20"></aty-icon>
                      </aty-col>
                      <aty-col span="8">
                        <aty-text text="text" v-text="item.zfbh" @click="zfbhClick(item,index*5)"></aty-text>
                      </aty-col>
                      <aty-col span="8">
                        <aty-text class="fd-zfxm" text="text" :title="item.zfxm" v-text="item.zfxm"
                                  @click="zfbhClick(item,index*5)">
                        </aty-text>
                      </aty-col>
                      <aty-col span="2" class="toggle-icon">
                        <aty-icon v-if="item.lianhao"
                                  :class="item.toggle?'aty-icon-android-arrow-dropup':'aty-icon-android-arrow-dropdown'"
                                  size="30" @click="toggle(item)" >
                        </aty-icon>
                      </aty-col>
                      <aty-col span='2' class="delete-icon">
                        <img v-if="deleteShow(true,index,item)" title="删除"
                             class="table_butn" src="../../assets/images/w-png23.png"
                             @click='delPrimaryCriminal(item,index)'>
                      </aty-col>
                    </aty-row>
                    <aty-panel class="search_list_level2" v-if="item.lianhao" v-show="item.toggle">
                      <aty-row v-if="waitChooseCriminals[index*5+1].zfbh === ''">
                        <aty-col class="lianhao-search" :span="24">
                          <aty-input v-model="waitChooseCriminals[index*5+1].inputValue" :key="index*5+1" placeholder="添加联号罪犯">
                            <aty-button slot="append" text="" icon="ios-search"
                                        @click="modalPage1(3,waitChooseCriminals[index*5+1],index*5+1,waitChooseCriminals[index*5])">
                            </aty-button>
                          </aty-input>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+1] != undefined && waitChooseCriminals[index*5+1].zfbh !== ''">
                        <aty-col span="2" class="lianhao-person">
                           <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="2">
                          <aty-checkbox :disabled="!waitChooseCriminals[index*5+1].selectable"
                                        :checked='waitChooseCriminals[index*5+1].checked' checkbox-label=' '
                                        @change="checkChoosePerson(waitChooseCriminals[index*5+1],index*5+1)">
                          </aty-checkbox>
                        </aty-col>
                        <aty-col span="10">
                          <aty-text text="text" v-text="waitChooseCriminals[index*5+1].zfbh"
                                    @click="zfbhClick(waitChooseCriminals[index*5+1],index*5+1)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text class="fd-zfxm" text="text" :title="waitChooseCriminals[index*5+1].zfxm"
                                    v-text="waitChooseCriminals[index*5+1].zfxm"
                                    @click="zfbhClick(waitChooseCriminals[index*5+1],index*5+1)">
                          </aty-text>
                        </aty-col>
                        <aty-col span='2'>
                          <img title="删除" v-if="deleteShow(false,index*5+1)" class="table_butn" src="../../assets/images/w-png23.png"
                               @click='delSecondaryCriminal(index*5+1)'>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+2] != undefined && waitChooseCriminals[index*5+2].zfbh === ''">
                        <aty-col class="lianhao-search" :span="24">
                          <aty-input v-model="waitChooseCriminals[index*5+2].inputValue"  :key="index*5+2" placeholder="添加联号罪犯">
                            <aty-button slot="append" text="" icon="ios-search"
                                        @click="modalPage1(3,waitChooseCriminals[index*5+2],index*5+2,waitChooseCriminals[index*5])">
                            </aty-button>
                          </aty-input>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+2] != undefined && waitChooseCriminals[index*5+2].zfbh !== ''">
                        <aty-col span="2" class="lianhao-person">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                          <aty-col span="2">
                          <aty-checkbox :disabled="!waitChooseCriminals[index*5+2].selectable"
                                        :checked='waitChooseCriminals[index*5+2].checked' checkbox-label=' '
                                        @change="checkChoosePerson(waitChooseCriminals[index*5+2],index*5+2)">
                          </aty-checkbox>
                        </aty-col>
                        <aty-col span="10">
                          <aty-text text="text" v-text="waitChooseCriminals[index*5+2].zfbh"
                                    @click="zfbhClick(waitChooseCriminals[index*5+2],index*5+2)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text class="fd-zfxm" text="text" :title="waitChooseCriminals[index*5+2].zfxm"
                                    v-text="waitChooseCriminals[index*5+2].zfxm"
                                    @click="zfbhClick(waitChooseCriminals[index*5+2],index*5+2)">
                          </aty-text>
                        </aty-col>
                        <aty-col span='2'>
                          <img title="删除" v-if="deleteShow(false,index*5+2)" class="table_butn"
                               src="../../assets/images/w-png23.png" @click='delSecondaryCriminal(index*5+2)'>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+3] != undefined && waitChooseCriminals[index*5+3].zfbh === ''">
                        <aty-col class="lianhao-search" :span="24">
                          <aty-input v-model="waitChooseCriminals[index*5+3].inputValue" :key="index*5+3" placeholder="添加联号罪犯">
                            <aty-button slot="append" text="" icon="ios-search" @click="modalPage1(3,waitChooseCriminals[index*5+3],index*5+3,waitChooseCriminals[index*5])"></aty-button>
                          </aty-input>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+3] != undefined && waitChooseCriminals[index*5+3].zfbh !== ''">
                        <aty-col span="2" class="lianhao-person">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="2">
                          <aty-checkbox :disabled="!waitChooseCriminals[index*5+3].selectable"
                                        :checked='waitChooseCriminals[index*5+3].checked' checkbox-label=' '
                                        @change="checkChoosePerson(waitChooseCriminals[index*5+3],index*5+3)">
                          </aty-checkbox>
                        </aty-col>
                        <aty-col span="10">
                          <aty-text text="text" v-text="waitChooseCriminals[index*5+3].zfbh"
                                    @click="zfbhClick(waitChooseCriminals[index*5+3],index*5+3)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text class="fd-zfxm" text="text" :title="waitChooseCriminals[index*5+3].zfxm"
                                    v-text="waitChooseCriminals[index*5+3].zfxm"
                                    @click="zfbhClick(waitChooseCriminals[index*5+3],index*5+3)">
                          </aty-text>
                        </aty-col>
                        <aty-col span='2'>
                          <img title="删除" v-if="deleteShow(false,index*5+3)" class="table_butn"
                               src="../../assets/images/w-png23.png" @click='delSecondaryCriminal(index*5+3)'>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+4] != undefined && waitChooseCriminals[index*5+4].zfbh === ''"
                               class="last">
                        <aty-col class="lianhao-search" :span="24">
                          <aty-input v-model="waitChooseCriminals[index*5+4].inputValue" :key="index*5+4" placeholder="添加联号罪犯">
                            <aty-button slot="append" text="" icon="ios-search"
                                        @click="modalPage1(3,waitChooseCriminals[index*5+4],index*5+4,waitChooseCriminals[index*5])">
                            </aty-button>
                          </aty-input>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChooseCriminals[index*5+4] != undefined && waitChooseCriminals[index*5+4].zfbh !== ''"
                               class="last">
                        <aty-col span="2">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                         <aty-col span="2">
                          <aty-checkbox :disabled="!waitChooseCriminals[index*5+4].selectable"
                                        :checked='waitChooseCriminals[index*5+4].checked' checkbox-label=' '
                                        @change="checkChoosePerson(waitChooseCriminals[index*5+4],index*5+4)">
                          </aty-checkbox>
                        </aty-col>
                        <aty-col span="10">
                          <aty-text text="text" v-text="waitChooseCriminals[index*5+4].zfbh"
                                    @click="zfbhClick(waitChooseCriminals[index*5+4],index*5+4)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text class="fd-zfxm" text="text" :title="waitChooseCriminals[index*5+4].zfxm"
                                    v-text="waitChooseCriminals[index*5+4].zfxm"
                                    @click="zfbhClick(waitChooseCriminals[index*5+4],index*5+4)">
                          </aty-text>
                        </aty-col>
                        <aty-col span='2'>
                          <img title="删除" v-if="deleteShow(false,index*5+4)" class="table_butn"
                               src="../../assets/images/w-png23.png" @click='delSecondaryCriminal(index*5+4)'>
                        </aty-col>
                      </aty-row>
                    </aty-panel>
                  </aty-panel>
                </aty-panel>
              </happy-scroll>
            </aty-panel>
          </aty-panel>
        </aty-region-west>
        <!-- 左侧筛选end -->
        <aty-region-center :border="false">
          <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
            <div class="fd-new">
            <div class="fd-title">
              <div class="fd-title-item1">
                <span>事件录入</span>
              </div>
              <div class="fd-title-item2">
                <span class="item" @click="changeEventStatus"
                      :class="{collapse : status.eventWriteStatus}">{{status.eventWriteStatus ? "收起":"展开"}}
                </span>
              </div>
            </div>
            <aty-panel class="gray_panel2" v-show="status.eventWriteStatus">
              <aty-form :label-width="100" ref="form1">
                <aty-row>
                  <aty-col>
                    <aty-form-item label="发生日期" class="aty-form-item-required">
                      <aty-date-picker v-if="editStatus!='view'" v-model="rjzFormData.fsrq" format="yyyy-MM-dd"
                                       :value="nowDate" :disabled="!editFlag"
                                       :editable='false' show-time="" :options="fsrqOption" type="date" clearable>
                      </aty-date-picker>
                      <aty-text v-text="fsrqFormat" v-if="editStatus=='view'"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item label="发生地点">
                      <aty-input v-if="editStatus!='view'" :disabled="!editFlag"
                                 v-model="rjzFormData.fsdd">
                      </aty-input>
                      <aty-text v-text="rjzFormData.fsdd" v-if="editStatus=='view'"></aty-text>
                    </aty-form-item>
                  </aty-col>
                </aty-row>
                <aty-form-item label="事件描述">
                  <aty-textarea v-if="editStatus!='view'" :disabled="!editFlag"
                                v-model="rjzFormData.sjmc" placeholder="请输入..." :autosize="{minRows:4,maxRows:8}">
                  </aty-textarea>
                  <aty-text v-text="rjzFormData.sjmc" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
              </aty-form>
            </aty-panel>
            <div class="fd-title">
              <div class="fd-title-item1 fd-bjzf-item1">
                <span :title="realChooseCriminalsName.join('、')">编辑罪犯：
                  <font v-if='index<4&&item!=null' v-for="(item,index) in realChooseCriminalsName" :key='index'
                        v-text="(index>3?'':(index==0?'':'、')+item)"></font>
                  <font v-text="realChooseCriminalsName.length>4?'...':''"></font>
                </span>
              </div>
              <div class="fd-title-item2 fd-bjzf-item2">
                   <span class="item" @click="showBjzfEvent" :class="{collapse : showBjzf}">{{showBjzf ? "收起":"展开"}}</span>
              </div>
            </div>
            <aty-panel class="gray_panel2" v-show="showBjzf">
              <aty-form :label-width="100" ref="form2" class="rzj-form">
                <aty-row>
                  <aty-col>
                    <aty-radio-group v-model="rjzFormData.khlx" name="type"
                                     :data-list="khlxSelectData" label="类型" class="aty-form-item-required">
                    </aty-radio-group>
                  </aty-col>
                  <aty-col>
                    <aty-radio-group v-model="rjzFormData.khxm" name="type"
                                     :data="khxmData" :data-list="khxmSelectData" label="考核部分"
                                     class="aty-form-item-required fd-khxm-radio">
                    </aty-radio-group>
                  </aty-col>
                </aty-row>
                <aty-form-item label="主要事由" class="aty-form-item-required ">
                  <aty-input :disabled="!editFlag" v-if="editStatus!='view'" v-model="rjzFormData.zysy"
                             placeholder="请填写主要事由" :clearable="editFlag"
                             @change="editStatus != 'edit' ? isSaved = false:isSaved = true">
                  </aty-input>
                  <aty-text v-text="rjzFormData.zysy" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx != '' && rjzFormData.khlx!='1' && rjzFormData.khlx!='9' &&
                    rjzFormData.khlx!='10' && rjzFormData.khlx!='11'"
                               label="情节" class="aty-form-item-required ">
                  <aty-select :disabled="!editFlag" transfer v-if="editStatus!='view'" v-model="rjzFormData.qj"
                              :data="newQjSelectData" clearable @change="qjChange">
                  </aty-select>
                  <aty-text v-text="qjSelectDataShow[rjzFormData.qj]" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx!='10'" label="考核依据"
                               :class="rjzFormData.khlx=='1'?'':'aty-form-item-required'">
                  <aty-auto-complete :disabled="!editFlag" transfer :value="rjzFormData.khyj" ref="khyjRef"
                                     v-if="editStatus!='view'" v-model="rjzFormData.khyj" @change="khyjChange"
                                     :simple="false" placeholder="" remote :remote-method="khyjMethod"
                                     :clearable="editFlag" :limit=1000>
                  </aty-auto-complete>
                  <aty-text v-text="rjzFormData.khyj" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx=='5'" label="处理意见" class="aty-form-item-required ">
                  <aty-select :disabled="!editFlag" transfer v-if="editStatus!='view'" v-model="rjzFormData.clyj"
                              :data="clyjSelectData" clearable></aty-select>
                  <aty-text v-if="editStatus=='view'" v-text="rjzFormData.clyj"></aty-text>
                </aty-form-item>
                <aty-row>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.khlx!='2' && rjzFormData.khlx!='10' && rjzFormData.khlx!='11'"
                                   label="建议分数" :class="rjzFormData.khlx=='1'?'':'aty-form-item-required'">
                      <aty-input :disabled="yjfsDisabled" v-if="editStatus!='view'" v-model="rjzFormData.yjfs"
                                 placeholder="请填写建议分数"
                                 :clearable="!editFlag || (rjzFormData.khlx != '3' && rjzFormData.khlx != '5' &&
                                 rjzFormData.khlx != '6')" @change="editStatus != 'edit' ? isSaved = false:isSaved = true">
                      </aty-input>
                      <aty-text v-if="editStatus=='view'" v-text="rjzFormData.yjfs"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.khlx!='2'&&rjzFormData.khlx!='1'&& rjzFormData.jyfsfw!=''&&
                    rjzFormData.jyfsfw!=null && rjzFormData.khyj!=''"
                                   label="范围：">
                      <aty-text :disabled="!editFlag" v-text="rjzFormData.jyfsfw"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.fzjldw!=0 && rjzFormData.khyj!='' &&
                    rjzFormData.fzjldw!=undefined && rjzFormData.khlx != '6' && rjzFormData.khlx != '1'" label="计量单位：">
                      <aty-text :disabled="!editFlag" v-text="rjzFormData.fzjldw"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'" label="禁闭期限"
                                   class="aty-form-item-required ">
                      <aty-date-picker :disabled="!editFlag"  @change="jbqxChange"
                                        v-if="editStatus!='view'" v-model="rjzFormData.jbqx" type="daterange"
                                        format="yyyy-MM-dd" placeholder="选择日期和时间" clearable>
                      </aty-date-picker>
                      <aty-text v-if="editStatus=='view'" v-text="rjzFormData.jbqx"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col v-if="rjzFormData.khlx==5&&rjzFormData.clyj==3&&editStatus!='view'">
                    <aty-form-item label="禁闭时长" class="aty-form-item-required ">
                      <aty-text :disabled="!editFlag" placeholder="请填写禁闭时长" v-text="jbsc" class="fd-jbsc"></aty-text>
                    </aty-form-item>
                  </aty-col>
                </aty-row>
                <aty-form-item v-if="rjzFormData.khlx=='5'" label="违反监狱法" class="aty-form-item-required ">
                  <aty-select :disabled="!editFlag" transfer v-if="editStatus!='view'" v-model="rjzFormData.wfjyflx"
                              :data="wfjyfSelectData" clearable
                              @change="editStatus != 'edit' ? isSaved = false:isSaved = true"></aty-select>
                  <aty-text v-if="editStatus=='view'" v-text="rjzFormData.wfjyflx"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'" label="健康状况" class="aty-form-item-required ">
                  <aty-input :disabled="!editFlag" v-if="editStatus!='view'" v-model="rjzFormData.jkzk"
                             placeholder="请填写健康状况" :clearable="editFlag" @change="editStatus != 'edit' ? isSaved = false:isSaved = true">
                  </aty-input>
                  <aty-text v-if="editStatus=='view'" v-text="rjzFormData.jkzk"></aty-text>
                </aty-form-item>
                <aty-upload v-if="editFlag" :max-size=5 :rules='rules.uploadFiles' :max=5 :min=0
                            accept=".doc,.docx,.pdf,.jpg,.jpeg,.bmp,.png,.zip,.rar" :multiple="true"
                            action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
                  <aty-button type="primary" class="fd-btn-upload">
                    上传文件
                    <i><img src="../../assets/images/upload.png"></i>
                  </aty-button>
                </aty-upload>
                <aty-modal title="删除附件" class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach" closable
                           width="400" @on-ok="deleteUploadFile" :mask-closable="false">
                  <aty-text text="确定要删除此文件？"></aty-text>
                </aty-modal>
                <aty-modal title="删除附件" class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach1" closable
                           width="400" @on-ok="delFile" :mask-closable="false">
                  <aty-text text="确定要删除此文件？"></aty-text>
                </aty-modal>
                <aty-form-item class="fd-files-list">
                  <aty-panel class="delFile" v-for="(item,index) in rjzFormData.files" :key="index">
                    <aty-text v-text="item.entityName"></aty-text>
                    <aty-text @click="openDeleteModal(index,item.bh)">
                      <aty-icon class="delete-icon" v-if="editFlag" type="android-close" size="16" style="color: #f00;
                      margin-left:10px;"></aty-icon>
                    </aty-text>
                  </aty-panel>
                  <aty-panel class="delFile" v-if="editStatus!='view'" v-for="(item,index) in rjzFormData.uploadfiles"
                             :key="item.lastModified">
                    <aty-text v-text="item.name"></aty-text>
                    <aty-text @click="openAttachModal(index)">
                      <aty-icon class="delete-icon" v-if="editFlag" type="android-close" size="16" style="color: #f00;
                      margin-left:10px;"></aty-icon>
                    </aty-text>
                  </aty-panel>
                </aty-form-item>
              </aty-form>
            </aty-panel>
            <aty-panel class="btm-btns" v-if="showBjzf">
              <aty-button v-if="heyiShow" size="large" type="success" icon="chatbubbles" @click="clickHeyi">合议</aty-button>
              <aty-button v-if="spztButtonShow" size="large" type="success" @click="clickSave">
                <i>
                  <img src="../../assets/images/save.png">
                </i>
                <span>保存</span>
              </aty-button>
              <aty-button v-if="isShowTj && spztButtonShow" size="large" type="success" @click="clickTijiao">
                <i>
                  <img src="../../assets/images/icon_submit.png">
                </i>
                <span>提交</span>
              </aty-button>
              <aty-button v-if="spztButtonShow" size="large" type="ghost" @click="clearRjzData" class="fd-empty-btn">
                <i>
                  <img src="../../assets/images/icon_clear.png">
                </i>
                <span>清空</span>
              </aty-button>
            </aty-panel>
             </div>
          </happy-scroll>
        </aty-region-center>
      </aty-region-layout>
    </div>
  </div>
  <!-- 内容部分end -->
</template>

<script>
import confirmbox from "../confirmBox/confirmBox.vue";
import loading from "../base/loading";
export default {
  data: function() {
    return {
      noSaveCriminals:[],//未保存的罪犯
      zczfFlag:false,//未保存的主罪犯和联号罪犯都有标志
      khlxChangeAble: true,//考核类型的change事件是否生效
      khxmChangeAble: true,//考核部分的change事件是否生效
      clyjChangeAble: true,//处理意见的change事件是否生效
      ryMap:{},//合议人员的编码与姓名对应关系
      isShowQxry:false,//是否展示缺席人员
      khyjStatus: true, //考核依据校验状态 true校验
      addStatus: true, //保存后是true,修改后是false
      editFlag: true, //是否可以编辑状态  true:可以更改
      editStatus: "new", // 页面状态（"":新增;"edit":编辑;"view":查询）
      isLoading: false, // 蒙版遮罩
      xzIsDisable:false,//选择罪犯按钮的disable控制
      attachIndex: "", //
      isHeyi: false, // 是否合议
      isSaved: true, // 是否保存
      showConfirm: false, // 弹出框控制
      showConfirm2: false, // 弹出框控制
      showConfirm3: false, // 弹出框控制
      confirmtext: "确认删除所有罪犯么？", // 弹出框内容
      confirmtext2: "确认删除此罪犯么？", // 弹出框内容
      delBh: "", // 删除编号
      primaryCriminal: {
        // 主罪犯项目
        item: "",
        index: ""
      },
      currentPoint: {
        // 当前节点数据
        currentIndex: 0,
        relationNode: {},
        currentNode: {}
      },
      secondaryCriminalDelIndex: "", // 从罪犯删除索引
      deleteFile: {
        // 删除文件
        index: "",
        bh: ""
      },
      breadcrumbdata: [
        {
          // 面包屑
          name: "日记载"
        },
        {
          name: "日记载登记",
          href: "/dayRecord/addDayRecord"
        }
      ],
      bcBh: "", // 保存时生成的编号

      checkAll: false, //全选状态
      status: {
        eventWriteStatus: true, //事件录入展开收起状态
        secendShow: false, //连坐罪犯控制显示
        clear: false, //是否清空
        sfhy: "" //是否合议，1代表合议，0代表未合议
      },
      fsrqOption: {
        // 发生日期限制条件
        disabledDate: function(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      formateData: {
        bh: "", //日记载主键
        hyjlBh: "", //合议记录编号
        hyzt: "", //合议状态
        zfxxbh: "", //罪犯信息主键x
        zfbh: "", //罪犯编号
        zfxm: "", //罪犯姓名
        szxz: "", //小组
        gz: "", //工种
        zBh: "", //主罪犯编号
        from: "", //监督人
        cBh: [], //从罪犯编号
        to: [], //被监督人
        khlx: "", //考核类型
        lianhao: false, //连号展示开关
        selectable: false,
        checked: false
      },
      rjzFormData: {
        // 右侧日记载表单信息
        zfxxBh: "", // 罪犯信息编号
        fsrq: "", // 发生日期
        fsdd: "", // 发生地点
        sjmc: "", // 事件描述
        khlx: "", // 考核类型
        khxm: "", // 考核部分
        zysy: "", // 主要事由
        qj: "", // 情节
        khyj: "", // 考核依据
        khyjOld: "", // 考核依据old
        clyj: "", // 处理意见
        yjfs: "", // 建议分数
        jyfsfw: "", // 建议的分数
        jbts: "", // 禁闭时长
        jbqx: [], // 禁闭期限
        jbksrq: "", // 禁闭开始日期
        jbjsrq: "", // 禁闭结束日期
        wfjyflx: "", // 违反监狱法类型
        jkzk: "", // 健康状况
        qxjyjcfx: "", // 取消基础分项
        qxjcfSelectedData: [], // 取消基础分下拉数据
        uploadfiles: [], // 上传附件
        files: [], // 预览附件
        fzjldw: 0 //分值计量单位
      },
      heyiFormData: {
        // 合议表单
        hysj: new Date(),
        hydd: "",
        zcc: "",
        jlr: "",
        jfkhxzmj: [],
        cjry: [],
        bhList: [],
        jfkhMjCzlx: '',
        bz:"",
        qxTableData: []
      },
      qxjcfSelectData: [], // 取消基础分
      options1: {
        // 选择时间范围限制
        disabledDate: function(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      zfbhOrXm: "", // 罪犯查询条件字段
      tempData: [], // 查询罪犯中间列表
      popData: [], // 罪犯中间列表
      waitChooseCriminals: [], // 所有罪犯列表
      choosePerson: [], // 勾选的罪犯
      requestData1: [],
      requestData2: [],
      requestData3: [],
      rules: {
        uploadFiles: [
          {
            validator: function(rule, value, callback, source, options) {
              if (value.length > 50) {
                callback(new Error("字数不超过50个字"));
              }
              callback();
            },
            required: true
          }
        ],
      },
      qjSelectData: [], // 情节-下拉数据
      qjSelectDataShow: {
        // 情节-下拉显示数据
        "1": "轻微",
        "2": "较轻",
        "3": "一般",
        "4": "严重",
        "5": "突出",
        "6": "特别严重",
        "7": "特别突出"
      },
      wfjyfSelectData: [], // 违反监狱法-下拉数据
      clyjSelectData: [], // 处理意见-下拉数据
      khlxSelectData: [], //考核类型-下拉数据
      khxmSelectData: [], // 考核部分-下拉数据

      xybsprSelectData: [], // 下一步审批人-下拉数据
      /******合议下拉列表数据******/
      zcrList: [], // 主持人-下拉数据
      jlrList: [], // 记录人-下拉数据
      jfkhmjList: [], // 计分考核民警-下拉数据
      cjryList: [], // 参加人员-下拉数据
      spr: "", //下一步审批人
      showBjzf: true,
      hyJfkhmjLabel: '全体民警'
    };
  },
  components: {
    // 组件
    confirmbox, // 确认弹窗组件
    loading // 加载中组件
  },
  methods: {
    /**
     * @name 情节的改变事件
     */
    qjChange(value) {
      var _this = this;
      if(_this.rjzFormData.khlx != "9" && (value == null || value == "")) {
        _this.rjzFormData.yjfs = "";
        return;
      }
      _this.editStatus != 'edit' ? _this.isSaved = false : _this.isSaved = true;
      var flag = _this.rjzFormData.khlx != "3" && _this.rjzFormData.khlx != "5" && _this.rjzFormData.khlx != "6";
      var flag2 = _this.rjzFormData.khyj == null || _this.rjzFormData.khyj == "";
      if (flag) {
        return;
      }
      if(flag2 && _this.rjzFormData.qj == "") {
        return;
      }
      var yjfsfw = _this.rjzFormData.jyfsfw;
      if (yjfsfw != null) {
        var sep = ",";
        if (yjfsfw.indexOf(sep) != -1) {
          var fwArr = yjfsfw.split(sep);
          _this.rjzFormData.yjfs = fwArr[parseInt(value) - 2];
        } else {
          _this.rjzFormData.yjfs = yjfsfw;
        }
      }
    },
    /**
     * @name 是否显示缺席人员
     */
    showQxry() {
      var _this = this;
      var jfkhmjList = _this.heyiFormData.jfkhxzmj;
      var cjryList = _this.heyiFormData.cjry;
      var list = [];
      if(jfkhmjList != null && jfkhmjList != "" && jfkhmjList.length > 0) {
        jfkhmjList.forEach(function(item){list[item]=item;});
      }
      if(cjryList != null && cjryList != "" && cjryList.length > 0) {
        cjryList.forEach(function(item){delete list[item];});
      }
      list = Object.keys(list);
      var qxTableData = _this.heyiFormData.qxTableData;
      qxTableData.splice(0,qxTableData.length);
      if(list.length == 0) {
        _this.isShowQxry = false;
      } else {
        _this.isShowQxry = true;
        list.forEach(function(item){
          var obj = {
            qxry:item,
            qxryXm:_this.ryMap[item],
            qxyy:""
          }
          qxTableData.push(obj);
        });
      }
    },
    /**
     * @name 获取所有已保存的建议分数绝对值最高分的罪犯
     * @return 日记载对象
     */
    getMaxYjfs() {
      var _this = this;
      var zfs = _this.savedCriminals;
      var rjzVo = null;
      var yjfs = 0;
      zfs.forEach(function(item, index) {
        if (item.yjfs != null) {
          var fs = Math.abs(item.yjfs);
          if (fs >= yjfs) {
            yjfs = fs;
            rjzVo = item;
          }
        }
      });
      return rjzVo;
    },
    /**
     * @name 禁闭期限不能超过15天的校验
     * @param {Object} value 当前值
     * @param {Object} name 名字
     * @param {number} index 索引
     * @param {Object} event 事件
     */
    jbqxChange(value,name,index,event) {
      var _this = this;
      _this.editStatus != 'edit' ? _this.isSaved = false:_this.isSaved = true;
      if(value[0] != "" && value[1] != "") {
        var dayNum = (new Date(value[1]) - new Date(value[0])) / 86400000;
        if(dayNum > 14) {
          _this.rjzFormData.jbqx = [];
          Artery.message.info("禁闭时长不能超过15天！");
        }
      }
    },
    // 方法
    /**
     * 滚动时触发document对象的click事件解决下拉问题
     */
    scrollEvent(_top, _left, scrollBar) {
      if (scrollBar.$el != undefined) {
        this.$root.$el.click();
      }
    },
    /**
     * 收缩显示编辑罪犯模块
     */
    showBjzfEvent() {
      this.showBjzf = !this.showBjzf;
      // this.$nextTick(function() {
      //   this.$refs.scroll1.update();
      // });
    },
    /**
     * @name 删除按钮是否显示
     * @param {boolean} flag 是否是主罪犯 true:主罪犯
     * @param {number} index 索引
     * @param {Object} item 实体
     */
    deleteShow(flag, index, item) {
      var _this = this;
      if (flag) {
        var lhzf1 = _this.waitChooseCriminals[index * 5 + 1];
        var lhzf2 = _this.waitChooseCriminals[index * 5 + 2];
        var lhzf3 = _this.waitChooseCriminals[index * 5 + 3];
        var lhzf4 = _this.waitChooseCriminals[index * 5 + 4];
        if (item.hasOwnProperty("zt") && parseInt(item.zt) >= 100) {
          return false;
        }
        if (lhzf1.hasOwnProperty("zt") && parseInt(lhzf1.zt) >= 100) {
          return false;
        }
        if (lhzf2.hasOwnProperty("zt") && parseInt(lhzf2.zt) >= 100) {
          return false;
        }
        if (lhzf3.hasOwnProperty("zt") && parseInt(lhzf3.zt) >= 100) {
          return false;
        }
        if (lhzf4.hasOwnProperty("zt") && parseInt(lhzf4.zt) >= 100) {
          return false;
        }
        return true;
      } else {
        var lhzf = _this.waitChooseCriminals[index];
        if (lhzf.hasOwnProperty("zt") && parseInt(lhzf.zt) >= 100) {
          return false;
        } else {
          return true;
        }
      }
    },
    /**
     * @name 考核类型disabled
     * @param {boolean} value true:隐藏
     */
    khlxDisabled(value) {
      var _this = this;
      var data = _this.khlxSelectData;
      data.forEach(function(item, index) {
        _this.$set(data[index], "disabled", value);
      });
    },
    /**
     * @name 主罪犯和联号罪犯都有的情况考核类型disabled
     * @param {boolean} value true:隐藏
     */
    zfKhlxDisabled() {
      var _this = this;
      _this.rjzFormData.khlx = "";
      var data = _this.khlxSelectData;
      data.forEach(function(item, index) {
        if(item.code == "3" || item.code == "4" || item.code == "5"  || item.code == "6") {
          _this.$set(data[index], "disabled", false);
        } else {
          _this.$set(data[index], "disabled", true);
        }
      });
    },
    /**
     * @name 主罪犯考核类型disabled
     * @param {boolean} value true:隐藏
     */
    zzfKhlxDisabled(value) {
      var _this = this;
      _this.rjzFormData.khlx = "";
      var data = _this.khlxSelectData;
      data.forEach(function(item, index) {
        if(item.code == "10" || item.code == "11") {
          _this.$set(data[index], "disabled", value);
        } else {
          _this.$set(data[index], "disabled", !value);
        }
      });
    },
    /**
     * @name 联号罪犯考核类型disabled
     * @param {boolean} value true:隐藏
     */
    lhzfKhlxDisabled(value) {
      var _this = this;
      _this.rjzFormData.khlx = "";
      var data = _this.khlxSelectData;
      data.forEach(function(item, index) {
        if(item.code == "1" || item.code == "2" ||item.code == "9") {
          _this.$set(data[index], "disabled", value);
        } else if(item.code == "10" || item.code == "11"){
          _this.$set(data[index], "disabled", !value);
        }
      });
    },
    /**
     * @name 打开附件弹窗
     * @param {any} index 索引值
     */
    openAttachModal(index) {
      this.$refs.attach.open();
      this.attachIndex = index;
    },
    /**
     * @name 打开删除弹窗
     * @param {any} index 索引值
     * @param {any} bh 删除文件编号
     */
    openDeleteModal(index, bh) {
      this.$refs.attach1.open();
      this.deleteFile.index = index;
      this.deleteFile.bh = bh;
    },
    /**
     * @name 删除所有人员
     * @param {any} flag 标志位:确认or取消
     */
    confirmDelAllCriminal: function(flag) {
      var _this = this;
      if (flag) {
        if (_this.waitChooseCriminals.length != 0) {
          // 删除后台数据
          if (_this.savedCriminals.length != 0) {
            _this.delAllCriminalsForServer();
          }
          // 清空前台数据
          _this.clearList(); // 清空左侧数据
          _this.clearFormData(); // 清空右侧数据

          _this.rjzFormData.sjmc = ""; // 事件描述清空
          _this.rjzFormData.fsdd = ""; // 发生地点清空
          _this.rjzFormData.fsrq = ""; // 发生日期清空
          _this.editStatus = "new"; // 当前页面状态重置为-新增状态
        }
      }
      _this.showConfirm = false; // 恢复弹窗状态
    },
    /**
     * @name 删除主罪犯
     * @param {Boolen} flag 标志位 确定or取消
     */
    confirmDelPrimaryCriminal: function(flag) {
      var _this = this;
      if (flag) {
        var item = _this.primaryCriminal.item;
        var index = _this.primaryCriminal.index;

        // 后台数据删除
        _this.delCriminalFromServer(item.bh); // 日记载编号存在就删除数据库中的日记载

        // 前台数据删除
        for (var i = 0; i < 5; i++) {
          // 删除主罪犯，同时删除连坐罪犯
          _this.waitChooseCriminals.splice(index * 5, 1); // 删除后后面的下标会往前上，所以当前删除下标不变
        }
        // 清空待删除数据
        _this.primaryCriminal = {};
      }
      _this.showConfirm2 = false; // 恢复弹窗状态
    },
    /**
     * @name 删除连坐罪犯
     * @param {any} flag 标志位 确定or取消
     */
    confirmDelSecondaryCriminal: function(flag) {
      var _this = this;
      var index = _this.secondaryCriminalDelIndex;
      if (flag) {
        var from = _this.waitChooseCriminals[index].from; // 当前删除连坐罪犯的主罪犯编号
        var bh = _this.waitChooseCriminals[index].bh; // 当前删除连坐罪犯的日记载编号
        var zfbh = _this.waitChooseCriminals[index].zfbh; // 当前删除连坐罪犯的罪犯编号

        _this.delCriminalFromServer(bh); // 删除后台数据

        // 前台数据替换
        // 替换为初始化数据
        var formateDT = JSON.parse(JSON.stringify(_this.formateData)); // 待替换的初始化数据
        formateDT.from = from;
        _this.waitChooseCriminals.splice(index, 1, formateDT);

        //在罪犯to属性不为空的里面找编号是上面二级罪犯from对应的罪犯
        for (var i = 0, len = _this.waitChooseCriminals.length; i < len; i++) {
          if (
            _this.waitChooseCriminals[i].to != [] &&
            _this.waitChooseCriminals[i].zfbh == from
          ) {
            for (
              var j = 0, len = _this.waitChooseCriminals[i].to.length;
              j < len;
              j++
            ) {
              if (_this.waitChooseCriminals[i].to[j] == zfbh) {
                _this.waitChooseCriminals[i].to.splice(j, 1);
                break;
              }
            }
          }
        }
      }
      _this.showConfirm3 = false; // 恢复弹窗状态
    },
    /**
     * @name 格式化时间
     * @param {any} row
     * @param {any} column
     */
    rowDateFormat: function(row, column) {
      return row != undefined ? row.substr(0, 10) : "";
    },
    /**
     * @name 建议分数处理
     */
    yjfsValidator: function() {
      let _this = this;
      var khlx = _this.rjzFormData.khlx; // 考核类型
      if(khlx == "2" || khlx == "1" || khlx == "10" || khlx == "11") {
        return true;
      }
      var advise = _this.rjzFormData.jyfsfw; // 返回的建议分数
      var yjfs = _this.rjzFormData.yjfs; // 填写的建议分数
      yjfs = parseFloat(yjfs);
      var fzjldw = _this.rjzFormData.fzjldw; // 分值计量单位
      var flag = false; // 返回值
      if (khlx == "6" && yjfs == advise) {
        flag = true;
      }
      if (khlx != "6") {
        if (advise.indexOf(",") > -1) {
          var arr = advise.split(",");
          for (var i = 0; i < arr.length; i++) {
            if (yjfs == arr[i]) {
              flag = true;
              return flag;
            }
          }
        } else if (advise.indexOf("-") > -1) {
          var arr = advise.split("-");
          var min = parseInt(arr[0]);
          var max = parseInt(arr[1]);
          if (fzjldw > 0) {
            var n = (max - min) / fzjldw;
            if (n > 0) {
              for (var i = 0; i <= n; i++) {
                if (min + fzjldw * i == yjfs) {
                  flag = true;
                  break;
                }
              }
            } else if (trueYjfs == min) {
              flag = true;
            }
          } else if (fzjldw == 0) {
            if (yjfs >= min && yjfs <= max) {
              flag = true;
            }
          }
        } else if (
          (advise.indexOf(",") == -1 || advise.indexOf("-") == -1) &&
          advise != ""
        ) {
          if (yjfs == advise) {
            flag = true;
          }
        } else if (yjfs != "") {
          flag = true;
        } else {
          flag = false;
        }
      }
      return flag;
    },
    /**
     * @name 处理意见触发方法
     */
    clyjChange() {
      var _this = this;
      if (_this.rjzFormData.clyj == 1) {
        _this.rjzFormData.jyfsfw = "300";
      } else if (_this.rjzFormData.clyj == 2) {
        _this.rjzFormData.jyfsfw = "600";
      } else if (_this.rjzFormData.clyj == 3) {
        _this.rjzFormData.jyfsfw = "900";
      }
      _this.qjChange(_this.rjzFormData.qj);
      _this.editStatus != "edit"
        ? (_this.isSaved = false)
        : (_this.isSaved = true); // 只要是做了修改，就将保存状态设置成false，需要重新保存
    },
    /**
     * @name 考核依据改变事件
     * @param {any} value
     */
    khyjChange: function(value) {
      let _this = this;
      var khlx = _this.rjzFormData.khlx;
      //分值计量单位
      _this.rjzFormData.fzjldw = value.fzjldw;
      // 加分
      if (khlx == 4) {
        _this.rjzFormData.jyfsfw = value.jffz;
      }
      // 扣分
      if (khlx == 3 || khlx == 9) {
        _this.rjzFormData.jyfsfw = value.kffz;
      }
      //专项加分
      if (khlx == 6) {
        _this.rjzFormData.jyfsfw = value.zxjffz;
      }
      _this.qjChange(_this.rjzFormData.qj);
      //  取消教育基础分是手动
      var val = value.qxjyjcfx;
      if (val != undefined && val != "" && val.indexOf("8") > -1) {
        if (_this.rjzFormData.qxjcfSelectedData == undefined || _this.rjzFormData.qxjcfSelectedData.length == 0) {
          var arr = ["3", "7"];
          var valArr = val.split(";");
          for (var i = 0; i < valArr.length; i++) {
            if (valArr[i] != "8" && valArr[i] != "") {
              arr.push(valArr[i]);
            }
          }
          _this.rjzFormData.qxjcfSelectedData = arr;
        }
        _this.$refs.qxjcfWindow.open();
      }
      _this.editStatus != "edit"
        ? (_this.isSaved = false)
        : (_this.isSaved = true); // 只要是做了修改，就将保存状态设置成false，需要重新保存
    },
    /**
     * @name 取消基础分确认
     */
    confirmQxjcf() {
      let _this = this;
      var qxjyjcfxData = _this.rjzFormData.qxjcfSelectedData;
      _this.rjzFormData.qxjyjcfx = "";
      if (qxjyjcfxData != undefined && qxjyjcfxData.length > 0) {
        for (var i = 0; i < qxjyjcfxData.length; i++) {
          if (i == qxjyjcfxData.length - 1) {
            _this.rjzFormData.qxjyjcfx += qxjyjcfxData[i];
          } else {
            _this.rjzFormData.qxjyjcfx += qxjyjcfxData[i] + ";";
          }
        }
      }
      _this.$refs.qxjcfWindow.close();
    },
    /**
     * @name 动态查询条款
     * @param {any} query
     * @param {any} callback
     */
    khyjMethod: function(query, callback) {
      let _this = this;
      _this.$refs.khyjRef.setCurrentData([]);
      var khlx = _this.rjzFormData.khlx;
      var khxm = _this.rjzFormData.khxm;
      if (
        (khlx == undefined || khlx == null || khlx == "") &&
        _this.khyjStatus
      ) {
        Artery.message.info({
          content: "请选择类型！",
          duration: 3
        });
        return;
      }
      if (
        (khxm == undefined || khxm == null || khxm == "") &&
        _this.khyjStatus
      ) {
        Artery.message.info({
          content: "请选择考核部分！",
          duration: 3
        });
        return;
      }
      _this.khyjStatus = true;
      var khyjData = [];
      var params = {
        key: query,
        tkdymk: khlx == "11"?"3":khlx,//不计分==扣分
        khxm: khxm
      };

      if (khlx == "1") {
        // 记事本类型无限制
        params.tkdymk = "";
      }
      _this.postRequest("/api/v1/tkwh/getTkListByParam", params).then(resp => {
          var resData = resp.data;
          if (resData == null || resData == undefined) {
            return;
          }
          for (var i = 0; i < resData.length; i++) {
            var fzjldw = 0;
            if (
              resData[i].hasOwnProperty("fzjldw") &&
              resData[i].fzjldw != null
            ) {
              fzjldw = resData[i].fzjldw;
            }
            khyjData.push({
              id: resData[i].tkbh,
              name: resData[i].tkbh + "-" + resData[i].tknr,
              khlx: resData[i].tkdymk,
              qxjyjcfx: resData[i].qxjyjcfx,
              jffz: resData[i].jffz,
              kffz: resData[i].kffz,
              zxjffz: resData[i].zxjffz,
              fzjldw: fzjldw
            });
          }
          callback(khyjData);
        })
        .catch(function(error) {
          Artery.message.error({
            content: "网络异常，请重试！",
            duration: 3
          });
        });
    },
    /**
     * @name 展开收起
     * @param {any} item
     */
    toggle: function(item) {
      item.toggle = !item.toggle;
      // this.$refs.rjzPersonScroll.update();
    },
    /**
     * @name 点击罪犯编号
     * @param {any} item
     * @param {any} index
     */
    zfbhClick: function(item, index) {
      let _this = this;
      //置空，为了解决watch监听不到变化的问题
      _this.rjzFormData.khlx = "";
      _this.rjzFormData.khxm = "";
      _this.rjzFormData.clyj = "";
      if (item.bh && item.bh != null && item.bh != "") {
        // 点击罪犯编号，如果已经保存，右侧展示数据，没保存过，展示空
        _this.getRequest("/api/v1/rjz/getRjzByBh/" + item.bh).then(resp => {
          if (resp && resp.status == 200) {
            _this.rjzFormData = {}; // 这里为临时处理，因为会报undefined
            _this.rjzFormData = resp.data;
            if(_this.rjzFormData.khlx != "1") {
              _this.khlxDisabled(true);
            } else {
              _this.khlxDisabled(false);
            }
            _this.addStatus = false;
            var khlx = _this.rjzFormData.khlx;
            var zt = _this.rjzFormData.zt;
            if (zt != "0") {
              _this.editFlag = false;
            } else {
              _this.editFlag = true;
            }
            _this.$set(_this.rjzFormData, "jbqx", []);
            _this.$set(_this.rjzFormData, "uploadfiles", []);
            _this.$set(_this.rjzFormData, "khyjOld", resp.data.khyj);
            var qxjcfx = resp.data.qxjcfx;
            if(qxjcfx != undefined && qxjcfx != "" && qxjcfx != null) {
              var qxjcfArr = qxjcfx.split(";");
              _this.$set(_this.rjzFormData, "qxjcfSelectedData", qxjcfArr);
            }
            _this.rjzFormData.jbqx.push(
              resp.data.jbksrq == undefined
                ? ""
                : resp.data.jbksrq.replace(/-/g, "/").substr(0, 10)
            );
            _this.rjzFormData.jbqx.push(
              resp.data.jbjsrq == undefined
                ? ""
                : resp.data.jbjsrq.replace(/-/g, "/").substr(0, 10)
            );

            _this.getKhlxAndKhxm(_this.rjzFormData.khyj, 1);
            if (khlx == "5" || khlx == "6") {
              // 如果是单项处罚的话
              _this.clyjChange();
            }
          }
          _this.khlxChangeAble = false;
          _this.khxmChangeAble = false;
          _this.clyjChangeAble = false;
          if(khlx == "1") {
            _this.khlxDisabledChange(item);
            _this.$set(_this.rjzFormData,"khlx","1");
          }
        });
      } else if (item.jkftzdBs != undefined) {
        // 加扣分通知单
        _this.editFlag = true;
        _this.khlxDisabled(false);
        _this.rjzFormData.zysy = item.zyss;
        _this.rjzFormData.yjfs = item.yjfs;
        _this.rjzFormData.khyj = item.khyj;
        _this.getKhlxAndKhxm(_this.rjzFormData.khyj, 2);
        _this.khlxChangeAble = false;
        _this.khxmChangeAble = false;
        _this.clyjChangeAble = false;
        _this.rjzFormData.qxjcfSelectedData = [];
        _this.khlxDisabledChange(item);
      } else {
        //普通新增
        _this.editFlag = true;
        if (!_this.addStatus) {
          _this.clearFormData();
          _this.addStatus = true;
        }
        _this.khlxDisabled(false);
        _this.rjzFormData.files = [];
        _this.rjzFormData.qxjcfSelectedData = [];
        _this.khlxDisabledChange(item);
      }
      if (index != undefined) {
        _this.setCurrentCheckedCriminal(index);
      }
    },
    /**
     * @description 动态置灰考核类型
     */
    khlxDisabledChange(item) {
      var _this = this;
      var zFlag = false;//主罪犯标志
      var cFlag = false;//从罪犯标志
      for(var i=0;i<_this.realChooseCriminals.length;i++) {
        if(_this.realChooseCriminals[i].hasOwnProperty("bh") && _this.realChooseCriminals[i].bh != "") {
          continue;
        }
        if(_this.realChooseCriminals[i].hasOwnProperty("zBh") && _this.realChooseCriminals[i].zBh != "") {
          cFlag = true;
        } else {
          zFlag = true;
        }
      }
      if(item.hasOwnProperty("zBh") && item.zBh != "") {
        cFlag = true;
      } else {
        zFlag = true;
      }
      var zcFlag = zFlag && cFlag;
      if(_this.zczfFlag && zcFlag) {
        _this.zfKhlxDisabled();
      } else if(cFlag) {
        _this.lhzfKhlxDisabled(true);
      } else if(zFlag){
        _this.zzfKhlxDisabled(true);
      }
    },
    /**
     * @name 根据索引设置当前选中罪犯
     * @param {any} index
     */
    setCurrentCheckedCriminal: function(index) {
      var _this = this;
      var data = _this.waitChooseCriminals;
      for (var i = 0; i < data.length; i++) {
        if (data[index].hasOwnProperty("bh") && data[index].bh != "") {
          if (i == index) {
            data[i].checked = true;
          } else {
            data[i].checked = false;
          }
        } else {
          if (i == index) {
            data[i].checked = true;
          } else if (data[i].hasOwnProperty("bh") && data[i].bh != "") {
            data[i].checked = false;
          }
        }
      }
    },
    /**
     * @name 根据考核依据获取考核类型和考核部分
     * @param {any} khyj
     * @param {any} type
     */
    getKhlxAndKhxm: function(khyj, type) {
      var _this = this;
      if (khyj == "") {
        return;
      }
      var tkbh = khyj;
      khyj = khyj.replace(/\//g, "-");
      _this.getRequest("/api/v1/tkwh/getTkByTkbh/" + khyj).then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data.tknr != undefined) {
            // 条款内容
            _this.rjzFormData.khyj =
              tkbh + "-" + resp.data.tknr; // 考核依据
          } else {
            _this.rjzFormData.khyj = _this.rjzFormData.khyj; // 考核依据
          }
          if (type == 2) {
            _this.rjzFormData.khlx = resp.data.tkdymk.split(";")[0]; // 条款对应模块
          }
          var khlx = _this.rjzFormData.khlx;
          if (khlx == 4) {
            _this.rjzFormData.jyfsfw = resp.data.jffz; // 加分
          }
          if (khlx == 3 || khlx == 9) {
            _this.rjzFormData.jyfsfw = resp.data.kffz; // 扣分
          }
          if (khlx == 6) {
            _this.rjzFormData.jyfsfw = resp.data.zxjffz; // 专项加分
          }
          _this.rjzFormData.khxm = resp.data.khxm; // 考核部分
          _this.rjzFormData.fzjldw = resp.data.fzjldw; // 分值计量单位
        }
      });
    },
    /**
     * @name 手动上传
     * @param {any} file
     */
    handleUpload: function(file) {
      this.rjzFormData.uploadfiles.push(file);
      // this.$refs.scroll1.update();
      return false;
    },
    /**
     * @name 删除文件
     */
    delFile: function() {
      var _this = this;
      _this
        .deleteRequest("/api/v1/rjz/deleteFile/" + _this.deleteFile.bh)
        .then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.success("删除文件成功！");
            _this.rjzFormData.files.splice(_this.deleteFile.index, 1);
          } else {
            Artery.message.error({
              content: "删除文件失败！请联系管理人员！",
              duration: 3
            });
          }
          this.$refs.attach1.close();
        });
    },
    /**
     * @name 删除文件Dom节点
     * @param {any} index
     */
    deleteFileDom: function(index) {
      this.rjzFormData.files.splice(index, 1);
    },
    /**
     * @name 删除上传文件
     */
    deleteUploadFile: function() {
      this.rjzFormData.uploadfiles.splice(this.attachIndex, 1);
      this.$refs.attach.close();
    },
    /**
     * @name 校验存在联号罪犯的罪犯下，需要填写两名联号罪犯
     */
    atLeast2() {
      let _this = this;
      for (var i = 0; i < _this.savedCriminals.length; i++) {
        if (
          _this.savedCriminals[i] == undefined ||
          _this.savedCriminals[i] == null
        ) {
          return true;
        }
        if (
          _this.savedCriminalsBh[i] == undefined ||
          _this.savedCriminalsBh[i] == "" ||
          _this.savedCriminalsBh[i] == null
        ) {
          continue;
        }
        if (
          _this.savedCriminals[i].from == undefined ||
          _this.savedCriminals[i].from == "" ||
          _this.savedCriminals[i].from == null
        ) {
          if (
            _this.savedCriminals[i].lianhao &&
            _this.savedCriminals[i].to.length < 2
          ) {
            return false;
          }
        }
      }
      return true;
    },
    /**
     * @name 合议
     */
    clickHeyi() {
      let _this = this;
      if (!_this.isSaved || _this.hasSelectableCriminal) {
        Artery.message.info({
          content: "全部保存后才能合议！",
          duration: 3
        });
        return;
      }
      if (_this.waitChooseCriminals.length == 0) {
        Artery.message.info({
          content: "合议至少要有一个人！",
          duration: 3
        });
        return;
      }
      if (!_this.atLeast2()) {
        // 校验存在联号罪犯的罪犯下，需要填写两名联号罪犯，否则不能合议
        Artery.message.info({
          content: "存在联号罪犯的罪犯至少需要保存两名联号罪犯才能合议！",
          duration: 3
        });
        return;
      }
      _this.$refs.heyiWindow.open();
      _this.getHeyiPerson();
    },
    /**
     * @name 获取合议人员列表
     */
    getHeyiPerson() {
      var _this = this;
      let rjzVo = _this.getMaxYjfs();
      if (rjzVo != null) {
        if(rjzVo.khlx == '4' || (rjzVo.khlx == '3' && rjzVo.yjfs <= 15)){
          _this.getJfkhXzmjs();
        } else {
          _this.getQtmjs();
        }
      } else {
        _this.getQtmjs();
      }
    },
    /**
     * @name 获取计分考核小组民警
     */
    getJfkhXzmjs() {
      var _this = this;
      _this.getRequest("/api/v1/hy/getJfkhXzmjs").then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data && resp.data != null) {
            let userList = resp.data;
            _this.pieceHyry(userList);
            //计分考核民警操作类型，用于后台判断是插入还是更新
            _this.heyiFormData.jfkhMjCzlx = "update";
          }else{
            _this.heyiFormData.jfkhMjCzlx = "insert";
            _this.getQtmjs('xzmj');
          }
        }
        _this.hyJfkhmjLabel = '计分考核民警';
      });
    },
    /**
     * @name 获取本部门全体民警
     */
    getQtmjs(dataType) {
      var _this = this;
      _this.getRequest("/api/v1/system/getUser").then(resp => {
        if (resp && resp.status == 200) {
          let selectedUserList = [];
          let cjry = [];
          if (resp.data&& resp.data !=undefined && resp.data != null && resp.data.length > 0) {
            _this.zcrList = resp.data;
            _this.jlrList = resp.data;
            _this.jfkhmjList = resp.data;
            _this.cjryList = resp.data;
            for (var i = 0; i < resp.data.length; i++) {
              var code = resp.data[i].code;
              selectedUserList.push(code);
              cjry.push(code);
              _this.ryMap[code] = resp.data[i].name;
            }
          }
          //计分考核民警
          _this.heyiFormData.jfkhxzmj = selectedUserList;
          //参加人员
          _this.heyiFormData.cjry = cjry;
          _this.showQxry();
        }
      });
      _this.hyJfkhmjLabel = '全体民警';
      if(!dataType){
        _this.heyiFormData.jfkhMjCzlx = '';
      }
    },
    /**
     * @name 拼装合议的人员信息
     * @param 查询出的人员列表
     */
    pieceHyry(userList) {
      var _this = this;
      _this.getRequest("/api/v1/system/getUser").then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data&& resp.data !=undefined && resp.data != null && resp.data.length > 0) {
            _this.zcrList = resp.data;
            _this.jlrList = resp.data;
            _this.jfkhmjList = resp.data;
            _this.cjryList = resp.data;
            for (var i = 0; i < resp.data.length; i++) {
              _this.ryMap[resp.data[i].code] = resp.data[i].name;
            }
          }
        }
      });
      let selectedUserList = [];
      let cjry = [];
      for (var i = 0; i < userList.length; i++) {
        var code = userList[i].code;
        selectedUserList.push(code);
        cjry.push(code);
      }
      //计分考核民警
      _this.heyiFormData.jfkhxzmj = selectedUserList;
      //参加人员
      _this.heyiFormData.cjry = cjry;
      _this.showQxry();
    },
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      var noValite = this.rjzFormData.khlx == "1" || this.rjzFormData.khlx == "2" || this.rjzFormData.khlx == "10" ||
        this.rjzFormData.khlx == "11";
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else if ((val == undefined || val == "" || val == null)  && noValite) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @name 保存日记载
     */
    clickSave() {
      let _this = this;
      var yjfs = _this.rjzFormData.yjfs; // 填写的建议分数
      if (!_this.isNumber(yjfs)) {
        Artery.message.error({
          content: "请正确填写建议分数!",
          duration: 3
        });
        return false;
      }
      let dataList = _this.realChooseCriminals;
      let zfList = []; // 罪犯对象列表
      for (var i = 0; i < dataList.length; i++) {
        var zfxxbh = dataList[i].zfxxbh;
        var obj = {
          zfxxBh: zfxxbh,
          fromBh: dataList[i].zBh,
          zfxxBhs: dataList[i].cBh
        };
        zfList.push(obj);
      }
      let params = {
        bh: _this.realChooseCriminals[0].hasOwnProperty("bh")?_this.realChooseCriminals[0].bh:null,//日记载编号
        khlx: _this.rjzFormData.khlx, //考核类型
        khyj: _this.rjzFormData.khyj.split("-")[0], // 考核依据
        yjfs: _this.rjzFormData.yjfs, // 建议分数
        zfList: zfList, // 罪犯列表
        fsrq:_this.rjzFormData.fsrq,//发生日期
      };
      _this.postRequest("/api/v1/rjz/isOverYjfs", params).then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data.flag) {
            Artery.notice.warning({
              title: "当月建议分数超限!",
              desc: resp.data.msg,
              duration: 5
            });
          } else {
            let dataList = _this.realChooseCriminals;
            //选择罪犯的校验
            if (dataList == undefined || dataList.length == 0) {
              Artery.message.info({
                content: "请选择罪犯!",
                duration: 3
              });
              return;
            }
            var files = _this.rjzFormData.uploadfiles;
            for (var i = 0; i < files.length; i++) {
              if (files[i].size == 0) {
                Artery.message.info("存在空文件，请重新上传文件！");
                return;
              }
            }
            let isTrue = _this.validateForm();
            if (!isTrue) {
              return;
            }
            if(_this.allSavedCriminalsBh != null && _this.allSavedCriminalsBh.length > 0) {
              var rjzList = [];
              for(var i=0;i<_this.allSavedCriminalsBh.length;i++) {
                var rjzObj = {
                  bh:_this.allSavedCriminalsBh[i],
                  fsrq:_this.rjzFormData.fsrq,
                  fsdd:_this.rjzFormData.fsdd,
                  sjmc:_this.rjzFormData.sjmc
                }
                rjzList.push(rjzObj);
              }
              _this.postRequest("/api/v1/rjz/updateSjlr", rjzList).then(resp => {
                if (resp && resp.status == 200) {
                  if(resp.data != null && resp.data.length > 0) {
                    for (var i = 0; i < resp.data.length; i++) {
                      Artery.notice.warning({
                        title: "当月建议分数超限!",
                        desc: resp.data[i],
                        duration: 5
                      });
                    }
                  } else {
                    _this.saveRjz();
                  }
                } else {
                  Artery.message.error("保存失败,请联系管理人员！");
                }
              });
            } else {
              _this.saveRjz();
            }
            _this.khlxDisabled(false);
            _this.khyjStatus = false;
          }
        }
      });
    },
    /**
     * @name 保存日记载的判断
     */
    saveRjz() {
      var _this = this;
      let dataList = _this.realChooseCriminals;
      _this.isHeyi = false; // 只要保存就要重新合议
      _this.isSaved = true; // 只要保存,保存状态就要设置为true
      if (dataList.length == 1 &&dataList[0].bh && dataList[0] != "" && dataList[0] != null) {
        // 选择的是一个，并且有日记载编号进入编辑
        _this.updateRjz();
      } else {
        _this.addRjz();
      }
      _this.editStatus = "edit";
    },
    /**
     * @name 更新日记载编号
     * @param {any} bh 编号
     */
    updateRjzBh(bh) {
      var _this = this;
      // 通过编号查找对应的日记载
      for (var i = 0, len = _this.waitChooseCriminals.length; i < len; i++) {
        if (_this.waitChooseCriminals[i].bh == bh) {
          // 找到自己
          var zfbh = _this.waitChooseCriminals[i].zfbh;
          var from = _this.waitChooseCriminals[i].from;
          var to = _this.waitChooseCriminals[i].to;
          // 判断当前日记载是主罪犯还是从罪犯
          if (from == "") {
            // 如果是主罪犯，那么查找它对应的所有从罪犯，将它的从罪犯中的ZBh，更新为bh
            for (var j = 0, len2 = to.length; j < len2; j++) {
              var zfbh2 = to[j];
              for (
                var k = 0, len3 = _this.waitChooseCriminals.length;
                k < len;
                k++
              ) {
                if (_this.waitChooseCriminals[k].zfbh == zfbh2) {
                  // 找到自己
                  _this.waitChooseCriminals[k].zBh = bh;
                }
              }
            }
          } else {
            // 如果是从罪犯，那么查找它对应的主罪犯，并将主罪犯CBh中的关于自己的信息，更新为bh（需要单签从罪犯的zfbh）
            for (
              var l = 0, len4 = _this.waitChooseCriminals.length;
              l < len;
              l++
            ) {
              if (_this.waitChooseCriminals[l].zfbh == from) {
                // 找到自己
                var to2 = _this.waitChooseCriminals[l].to;
                for (var m = 0, len5 = to2.length; m < len5; m++) {
                  var zfbh3 = to2[m];
                  if (zfbh3 == zfbh) {
                    _this.$set(_this.waitChooseCriminals[l].cBh, m, bh);
                  }
                }
              }
            }
          }
        }
      }
    },
    /**
     * @name 日记载是否修改
     */
    isRjzChanged(rjzObj) {
      var _this = this;
      _this
        .postRequest("/api/v1/rjz/checkValueNoChange", formData)
        .then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false;
          }
        });
    },
    /**
     * @name 新增日记载
     */
    addRjz() {
      let _this = this;
      let dataList = _this.realChooseCriminals;
      let zfList = []; // 罪犯对象列表
      let zfxxbhList = []; // 加扣分通知单罪犯信息主键列表
      for (var i = 0; i < dataList.length; i++) {
        var zfxxbh = dataList[i].zfxxbh;
        var obj = {
          zfxxBh: zfxxbh,
          fromBh: dataList[i].zBh,
          zfxxBhs: dataList[i].cBh
        };
        zfList.push(obj);
        if (dataList[i].jkftzdBs && dataList[i].jkftzdBs == 1) {
          // 有加扣分通知单标志，添加
          zfxxbhList.push(zfxxbh);
        }
      }
      let params = {
        fsrq: new Date(
          _this
            .formatDate(_this.rjzFormData.fsrq)
            .replace(/-/g, "/")
            .substr(0, 10)
        ), // 发生日期
        fsdd: _this.rjzFormData.fsdd, // 发生地点
        sjmc: _this.rjzFormData.sjmc, // 事件名称
        khlx: _this.rjzFormData.khlx, // 考核类型
        khxm: _this.rjzFormData.khxm, // 考核部分
        zysy: _this.rjzFormData.zysy, // 主要事由
        qj: _this.rjzFormData.qj, // 情节
        khyj: _this.rjzFormData.khyj.split("-")[0], // 考核依据
        clyj: _this.rjzFormData.clyj, // 处理意见
        yjfs: _this.rjzFormData.yjfs, // 建议分数
        jbts: _this.jbsc, // 禁闭时长
        jbksrq:
          _this.rjzFormData.jbqx[0] == undefined
            ? ""
            : new Date(
                _this
                  .formatDate(_this.rjzFormData.jbqx[0])
                  .replace(/-/g, "/")
                  .substr(0, 10)
              ), // 禁闭开始日期
        jbjsrq:
          _this.rjzFormData.jbqx[1] == undefined
            ? ""
            : new Date(
                _this
                  .formatDate(_this.rjzFormData.jbqx[1])
                  .replace(/-/g, "/")
                  .substr(0, 10)
              ), // 禁闭结束日期
        jkzk: _this.rjzFormData.jkzk, // 健康状况
        wfjyflx: _this.rjzFormData.wfjyflx, // 违反监狱法类型
        qxjyjcfx: _this.rjzFormData.qxjyjcfx, // 取消建议基础分
        zfList: zfList // 罪犯列表
      };
      var formData = new FormData();
      var files = _this.rjzFormData.uploadfiles;
      if (files != undefined && files.length > 0) {
        for (var i = 0; i < _this.rjzFormData.uploadfiles.length; i++) {
          formData.append("files", _this.rjzFormData.uploadfiles[i]);
        }
      }
      formData.append("rjz", JSON.stringify(params));
      formData.append("bcBh", _this.bcBh);
      _this.isLoading = true;
      _this.uploadFileRequest("/api/v1/rjz/addRjz", formData).then(resp => {
        if (resp && resp.status == 200) {
          _this.isLoading = false;
          Artery.message.success("保存成功！");
          var bhMap = resp.data;
          for (var i = 0; i < dataList.length; i++) {
            var zfxxbh = dataList[i].zfxxbh;
            var bh = bhMap[zfxxbh]; // 返回值
            dataList[i].bh = bh;
            dataList[i].checked = false;
            _this.$set(dataList[i], "selectable", false);
            _this.$set(dataList[i], "khlx", _this.rjzFormData.khlx);
            _this.$set(dataList[i], "yjfs", _this.rjzFormData.yjfs);
            _this.showLh(dataList[i], true); // 如果是扣分，和单项处罚，展示联号框
            _this.updateRjzBh(bh); // 保存后生成日记载编号更新
          }
          for(var i = 0; i < _this.waitChooseCriminals.length; i++) {
            var zt = bhMap[_this.waitChooseCriminals[i].bh];
            if(zt != undefined && zt != "" && zt != null) {
              _this.$set(_this.waitChooseCriminals[i],"zt",zt);
            }
          }
          _this.bcBh = bhMap.bcBh;
          if (zfxxbhList != null && zfxxbhList.length > 0) {
            // 更新日记载通知单
            _this.isLoading = true;
            _this
              .postRequest("/api/v1/jkftzd/rjzUpdate", _this.scorePersonBh)
              .then(resp => {
                if (resp && resp.status == 200) {
                  _this.isLoading = false;
                } else {
                  _this.isLoading = false;
                }
              });
          }
          _this.chooseAll(false);
          _this.addStatus = true;
          _this.clearFormData();
        } else {
          _this.isLoading = false;
          Artery.message.error({
            content: "保存日记载失败，请联系管理人员!",
            duration: 3
          });
        }
      });
    },
    /**
     * @name 更新日记载
     */
    updateRjz() {
      let _this = this;
      let dataList = _this.realChooseCriminals;
      var rjzList = _this.savedCriminals; // 保存过的罪犯日记载编号
      var rjzBhList = [];
      if(rjzList != undefined && rjzList.length > 0) {
        for(var i=0;i<rjzList.length;i++) {
          if(rjzList[i].khlx != "2" && rjzList[i].khlx != "9") {
            rjzBhList.push(rjzList[i]);
          }
        }
      }
      let zfList = []; // 罪犯列表
      for (var i = 0; i < dataList.length; i++) {
        var zfxxbh = dataList[i].zfxxbh;
        var obj = {
          zfxxBh: zfxxbh,
          fromBh: dataList[i].zBh,
          zfxxBhs: dataList[i].cBh
        };
        zfList.push(obj);
      }
      let params = {
        bh: dataList[0].bh, // 日记载编号
        hyjlBh: dataList[0].hyjlBh, // 合议记录编号
        fsrq: new Date(
          _this
            .formatDate(_this.rjzFormData.fsrq)
            .replace(/-/g, "/")
            .substr(0, 10)
        ), // 发生日期
        fsdd: _this.rjzFormData.fsdd, // 发生地点
        sjmc: _this.rjzFormData.sjmc, // 事件名称
        khlx: _this.rjzFormData.khlx, // 考核类型
        khxm: _this.rjzFormData.khxm, // 考核部分
        zysy: _this.rjzFormData.zysy, // 主要事由
        qj: _this.rjzFormData.qj, // 情节
        khyj: _this.rjzFormData.khyj.split("-")[0], // 考核依据
        clyj: _this.rjzFormData.clyj, // 处理意见
        yjfs: _this.rjzFormData.yjfs, // 意见分数
        jbts: _this.jbsc, // 禁闭时长
        jbksrq:_this.rjzFormData.jbqx[0]  == undefined? ""
            : new Date(_this.formatDate(_this.rjzFormData.jbqx[0]).replace(/-/g, "/").substr(0, 10)), // 禁闭开始时间
        jbjsrq:
          _this.rjzFormData.jbqx[1] == undefined? ""
            : new Date(_this.formatDate(_this.rjzFormData.jbqx[1]).replace(/-/g, "/").substr(0, 10)), // 禁闭结束时间
        jkzk: _this.rjzFormData.jkzk, // 健康状况
        wfjyflx: _this.rjzFormData.wfjyflx, // 违反监狱法类型
        qxjyjcfx: _this.rjzFormData.qxjyjcfx, // 取消建议基础分
        zfList: zfList, // 罪犯列表
        rjzBhList: rjzBhList // 日记载编号列表
      };
      var formData = new FormData();
      var files = _this.rjzFormData.uploadfiles;
      if (files != undefined && files.length > 0) {
        for (var i = 0; i < _this.rjzFormData.uploadfiles.length; i++) {
          formData.append("files", _this.rjzFormData.uploadfiles[i]);
        }
      }
      formData.append("rjz", JSON.stringify(params));
      _this.isLoading = true;
      _this.uploadFileRequest("/api/v1/rjz/updateRjz", formData).then(resp => {
        if (resp && resp.status == 200) {
          _this.isLoading = false;
          if (resp.data.msg != undefined) {
            Artery.message.success(resp.data.msg);
            return;
          }
          Artery.message.success("更新成功！");
          var bh = resp.data.bh;
          var khlxChange = resp.data.khlxChange; // 判断是否变更了考核类型
          for (var i = 0;i<_this.realChooseCriminals.length;i++) {
            if(_this.realChooseCriminals[i].bh == bh) {
              _this.realChooseCriminals[i].khlx = _this.rjzFormData.khlx;
              _this.realChooseCriminals[i].yjfs = _this.rjzFormData.yjfs;
            }
          }
          for (var i = 0, len = _this.waitChooseCriminals.length;i < len;i++) {
            var from = _this.waitChooseCriminals[i].zfbh;
            var to = _this.waitChooseCriminals[i].to;
            if (_this.waitChooseCriminals[i].bh != bh) {
              continue;
            }
            _this.waitChooseCriminals[i].yjfs = _this.rjzFormData.yjfs;
            if (_this.waitChooseCriminals[i].from == "" && khlxChange) {
              // 如果from == '' 说明是一级节点
              _this.showLh(_this.waitChooseCriminals[i], true);
            }
            _this.$set(_this.waitChooseCriminals[i],"khlx",_this.rjzFormData.khlx);
            if (_this.waitChooseCriminals[i].from == "" && khlxChange) {
              if(to != undefined && to != null) {
                for (var j = 0, len2 = to.length; j < len2; j++) {
                  _this.delCriminalFromServer(to[i]); // 删除连坐
                }
              }
              //在罪犯to属性不为空的里面找编号是上面二级罪犯from对应的罪犯
              for (var k = 0, len3 = _this.waitChooseCriminals.length;k < len3;k++) {
                if (_this.waitChooseCriminals[k].to != []) {
                  if (_this.waitChooseCriminals[k].zfbh == from) {
                    _this.waitChooseCriminals[k].to = [];
                    var data = JSON.parse(JSON.stringify(_this.formateData));
                    data.from = from;
                    for (var j = 1, len4 = 5; j < len4; j++) {
                      _this.$set(_this.waitChooseCriminals, k + j, data);
                    }
                  }
                }
              }
            }
          }
          _this.resetHeyiProp(); // 将罪犯日记载列表变为未合议的状态
          _this.chooseAll(false);
          _this.addStatus = false;
        } else {
          _this.isLoading = false;
          Artery.message.error({
            content: "更新日记载失败，请联系管理人员！",
            duration: 3
          });
        }
      });
    },
    /**
     * @name 恢复未合议状态
     */
    resetHeyiProp() {
      var _this = this;
      for (var i = 0; i < _this.waitChooseCriminals.length; i++) {
        _this.waitChooseCriminals[i].hyjlBh = "";
        _this.waitChooseCriminals[i].sfhy = "0";
      }
    },
    /**
     * @name 展示联号框
     * @param {any} data
     * @description 如果是训诫，扣分，和单项处罚，展示联号框
     */
    showLh(data, isAdd) {
      let _this = this;
      let flag;
      if (isAdd) {
        flag = _this.rjzFormData.khlx == 3 || _this.rjzFormData.khlx == 5;
      } else {
        flag =
          data.khlx != undefined &&
          data.khlx != null &&
          (data.khlx == 3 || data.khlx == 5);
      }
      if (flag) {
        _this.$set(data, "lianhao", true);
        _this.$set(data, "toggle", true);
      } else {
        _this.$set(data, "lianhao", false);
        _this.$set(data, "toggle", false);
      }
    },
    /**
     * @name 动态查询罪犯
     * @param {any} queryInfo
     * @description
     */
    loadData: function(queryInfo) {
      if (queryInfo.tableId != undefined) {
        return;
      }
      var _this = this;
      var list = queryInfo.filterList;
      var zfbh = "";
      var xm = "";
      var szxz = "";
      var gz = "";
      var dept = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).deptId;
      if (list != undefined && list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          if (list[i].column == "zfbh") {
            zfbh = list[i].value;
          }
          if (list[i].column == "zfxm") {
            xm = list[i].value;
          }
          if (list[i].column == "szxz") {
            szxz = list[i].value;
          }
          if (list[i].column == "gz") {
            gz = list[i].value;
          }
        }
      }
      var params = {
        zfbh: zfbh,
        xm: xm,
        szxz: szxz,
        gz: gz,
        dept: dept
      };
      _this.postRequest("/api/v1/system/getZfxx", params).then(resp => {
        let resplist = resp.data;
        var returnDataList = [];
        if (resplist != undefined) {
          var item = null;
          for (var i = 0; i < resplist.length; i++) {
            // 将数据绑定上属性
            _this.pieceZf(resplist, i);
            returnDataList.push(resplist[i]);
          }
          resplist = null;
          _this.requestData1 = returnDataList;
          _this.popData = JSON.parse(JSON.stringify(_this.requestData1));
          for (
            var i = 0, len = _this.waitChooseCriminals.length;
            i < len;
            i++
          ) {
            for (var j = 0, len2 = _this.popData.length; j < len2; j++) {
              if (_this.waitChooseCriminals[i].zfbh == _this.popData[j].zfbh) {
                _this.popData[j].selectable = false;
              }
            }
          }
        } else {
          _this.popData = [];
        }
      });
      // }
    },
    /**
     * @name 确认提交
     * @description
     */
    confirmTijiao() {
      let _this = this;
      if (_this.spr == "") {
        Artery.message.info({
          content: "请选择下一步审批人",
          duration: 3
        });
        return;
      }
      if (
        !_this.isHeyi &&
        _this.heyiPerson.length != _this.realCriminals.length &&
        !_this.isAllXjPerson()
      ) {
        Artery.message.info({
          content: "请合议后再提交",
          duration: 3
        });
        return;
      }
      var params = [];
      for (var i = 0; i < _this.savedCriminals.length; i++) {
        var obj = {
          bh: _this.savedCriminalsBh[i],
          spr: _this.spr
        };
        params.push(obj);
      }
      _this.isLoading = true;
      _this.postRequest("/api/v1/rjz/submitRjz", params).then(resp => {
        if (resp && resp.status == 200) {
          _this.isLoading = false;
          _this.chooseAll(false);
          Artery.message.success("提交成功！");
          _this.$refs.xybsprWindow.close();
          _this.khyjStatus = false;
          _this.clearList();
          _this.clearFormData();
          _this.clearHyFormData();
          _this.bcBh = ""; // 保存编号
          _this.rjzFormData.hyjlBh = ""; // 合议记录编号清空
          _this.rjzFormData.sjmc = ""; // 事件名称
          _this.rjzFormData.fsdd = ""; // 发生地点
          _this.rjzFormData.fsrq = _this.nowDate; // 发生日期
          _this.allChecked = false; // 全选清除
          _this.editStatus = "new"; // 状态更改为新增
          _this.spr = ""; // 审批人清空
        } else {
          setTimeout(function() {
            _this.isLoading = false;
          }, 6000);
          Artery.message.success(resp.data);
        }
      });
    },
    /**
     * @name 清空所有人操作
     * @description
     */
    clearListAll() {
      var _this = this;
      if (_this.waitChooseCriminals.length != 0) {
        _this.showConfirm = true;
      }
    },
    /**
     * @name 清空
     * @description
     */
    clearRjzData() {
      var _this = this;
      var editFlag = _this.realChooseCriminals.length == 1 && _this.realChooseCriminals[0].hasOwnProperty("bh")
        && _this.realChooseCriminals[0].bh != "";
      if(!editFlag) {
        _this.rjzFormData.khlx = ""; //考核类型
        _this.rjzFormData.khxm = ""; //考核部分
      }
      _this.rjzFormData.zfxxBh = ""; //罪犯信息编号
      _this.rjzFormData.zysy = ""; //主要事由
      _this.rjzFormData.qj = ""; //情节
      _this.rjzFormData.khyj = ""; //考核依据
      _this.rjzFormData.clyj = ""; //处理意见
      _this.rjzFormData.qxjyjcfx = ""; //取消基础分项
      _this.$refs.khyjRef != undefined?_this.$refs.khyjRef.setCurrentData([]):null; //考核依据列表
      _this.clearJbData();
    },
    /**
     * @name 清空右侧表单
     * @description
     */
    clearFormData() {
      var _this = this;
      _this.rjzFormData.khlx = ""; //考核类型
      _this.rjzFormData.khxm = ""; //考核部分
      _this.clearCommons();
    },
    /**
     * @name 清空的公共方法
     * @description
     */
    clearCommons() {
      var _this = this;
      _this.rjzFormData.zfxxBh = ""; //罪犯信息编号
      _this.rjzFormData.zysy = ""; //主要事由
      _this.rjzFormData.qj = ""; //情节
      _this.rjzFormData.khyj = ""; //考核依据
      _this.rjzFormData.clyj = ""; //处理意见
      _this.rjzFormData.uploadfiles = []; //上传的附件
      _this.rjzFormData.files = []; //显示的附件
      _this.rjzFormData.qxjyjcfx = ""; //取消基础分项
      _this.$refs.khyjRef != undefined?_this.$refs.khyjRef.setCurrentData([]):null; //考核依据列表
      _this.clearJbData();
    },
    /**
     * @name 处理意见切换时的清空
     * @description
     */
    clearJbData() {
      var _this = this;
      _this.rjzFormData.yjfs = ""; //建议分数
      _this.rjzFormData.wfjyflx = "", //违反监狱法类型
      _this.rjzFormData.jbts = ""; //禁闭时长
      _this.rjzFormData.jbqx = []; //禁闭期限
      _this.rjzFormData.jbksrq = ""; //禁闭开始日期
      _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
      _this.rjzFormData.jkzk = ""; //健康状况
    },
    /**
     * @name 清空合议表单
     * @description
     */
    clearHyFormData() {
      var _this = this;
      _this.heyiFormData.hysj = new Date();
      _this.heyiFormData.hydd = "";
      _this.heyiFormData.zcc = "";
      _this.heyiFormData.jlr = "";
      _this.$set(_this.heyiFormData.jfkhxzmj,[]);
      _this.$set(_this.heyiFormData.cjry,[]);
      _this.heyiFormData.bhList = [];
      _this.heyiFormData.bz = "";
    },
    /**
     * @name 保存并导出
     * @description
     */
    saveExport() {
      let _this = this;
      if (!_this.heyiValidate(_this.heyiFormData)) {
        return;
      }
      let mjStrs = "";
      for (let i = 0; i < _this.heyiFormData.jfkhxzmj.length; i++) {
        // 处理计分考核小组民警值
        if (_this.heyiFormData.jfkhxzmj[i] != "") {
          mjStrs += _this.heyiFormData.jfkhxzmj[i] + ";";
        }
      }
      let cjryStrs = "";
      for (let i = 0; i < _this.heyiFormData.cjry.length; i++) {
        // 处理参加人员值
        if (_this.heyiFormData.cjry[i] != "") {
          cjryStrs += _this.heyiFormData.cjry[i] + ";";
        }
      }
      for (var i = 0; i < _this.waitChooseCriminals.length; i++) {
        if (
          _this.waitChooseCriminals[i].bh != "" && _this.waitChooseCriminals[i].khlx != "1" &&
          _this.waitChooseCriminals[i].khlx != "2" && _this.waitChooseCriminals[i].khlx != "9"
        ) {
          // 合议排除记事本，训诫和暂外违规的罪犯
          _this.heyiFormData.bhList.push(_this.waitChooseCriminals[i].bh);
        }
      }
      let params = {
        bh: "",
        hysj: _this.heyiFormData.hysj,
        hydd: _this.heyiFormData.hydd,
        zcc: _this.heyiFormData.zcc,
        jlr: _this.heyiFormData.jlr,
        jfkhxzmj: mjStrs,
        cjry: cjryStrs,
        bhList: _this.heyiFormData.bhList,
        czJfkhXzmjLx: _this.heyiFormData.jfkhMjCzlx,
        bz: _this.heyiFormData.bz,
        qxryList:_this.heyiFormData.qxTableData
      };

      if (_this.heyiFormData.bhList.length == 0) {
        Artery.message.info({
          content: "全部都是训诫不需要合议！",
          duration: 3
        });
        return;
      }

      _this.isLoading = true;
      _this.postRequest("/api/v1/hy/exportHy", params).then(resp => {
        if (resp && resp.status == 200) {
          _this.isLoading = false;
          _this.isHeyi = true; // 合议成功修改状态
          Artery.message.info("导出成功！");
          var zfList = _this.waitChooseCriminals;
          for (var i = 0; i < zfList.length; i++) {
            _this.$set(zfList[i], "hyjlBh", resp.data.bh);
            _this.$set(zfList[i], "sfhy", resp.data.sfhy);
          }
          _this.exportHyWs(resp.data.bh, resp.data.wsmc);
          _this.$refs.heyiWindow.close();
        } else {
          setTimeout(function() {
            _this.isLoading = false;
          }, 6000);
          Artery.message.error({
            content: "导出失败！",
            duration: 3
          });
        }
      });
    },
    /**
     * @name 导出文书
     * @param {any} hyjlbh
     * @param {any} wsmc
     * @description
     */
    exportHyWs(hyjlbh, wsmc) {
      window.location.href =
         "/writ/api/v1/writ/hyws/hy/" + hyjlbh + "/" + wsmc + "/word";
      // window.location.href =
      //    "http://172.25.16.97:6789/api/v1/writ/hyws/hy/" + hyjlbh + "/" + wsmc + "/word";
    },
    /**
     * @name 手动校验合议必填项
     * @param {any} heyiFormData
     * @description
     */
    heyiValidate(heyiFormData) {
      if (heyiFormData.hysj == "") {
        Artery.message.error({
          content: "合议时间不能为空",
          duration: 3
        });
        return false;
      }
      if (heyiFormData.zcc == "") {
        Artery.message.error({
          content: "主持人不能为空",
          duration: 3
        });
        return false;
      }
      if (heyiFormData.jlr == "") {
        Artery.message.error({
          content: "记录人不能为空",
          duration: 3
        });
        return false;
      }
      if (heyiFormData.jfkhxzmj == "") {
        Artery.message.error({
          content: "计分考核民警不能为空",
          duration: 3
        });
        return false;
      }
      if (heyiFormData.cjry == "") {
        Artery.message.error({
          content: "参加人员不能为空",
          duration: 3
        });
        return false;
      }
      return true;
    },
    /**
     * @name 将列表中的数据存入临时数组
     * @param {any} selectedRows
     * @description
     */
    selectChange(selectedRows) {
      var temp = [];
      var l = selectedRows.length;
      for(var i = 0; i < l; i++) {
        for(var j = i + 1; j < l; j++){
          if (selectedRows[i].zfbh === selectedRows[j].zfbh){
            i++;
            j = i;
          }
        }
        temp.push(selectedRows[i]);
      }
      selectedRows = temp;
      this.tempData = selectedRows;
    },
    /**
     * @name 将列表中的数据存入临时数组
     * @param {any} selectedRows
     * @description
     */
    selectChange2(selectedRows) {
      this.$refs.list2Table.store.states.selection = [selectedRows.pop()];
      this.tempData = this.$refs.list2Table.store.states.selection;
    },
    /**
     * @name 可选项设置
     * @param {any} item
     * @param {any} index
     * @description
     */
    selectableCheck(item, index) {
      if (item.selectable == undefined) {
        item.selectable = true;
      }
      if (item.selectable) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * @name 添加罪犯到列表
     * @param {any} params
     * @param {any} parent
     * @description
     */
    addCriminalToList(params, parent) {
      var _this = this;
      var columnLen = _this.$refs.list1Table.store.states.columns;
      var columnLen2 = _this.$refs.list2Table.store.states.columns;
      for (var i = 0, len = columnLen.length; i < len; i++) {
        // 清空过滤项
        columnLen[i].filterValue = "";
      }
      for (var j = 0, len2 = columnLen2.length; j < len2; j++) {
        // 清空过滤项
        columnLen[j].filterValue = "";
      }

      var formateData = JSON.parse(JSON.stringify(_this.formateData));
      _this.editStatus != "edit"
        ? (_this.isSaved = false)
        : (_this.isSaved = true);
      switch (params) {
        case 1: {
          // 添加主罪犯
          var arryLen = _this.waitChooseCriminals.length;
          for (var i = 0, len = _this.tempData.length; i < len; i++) {
            _this.$set(_this.tempData[i], "toggle", false);
            _this.createCriminalCouple(i, arryLen, formateData);
            _this.rjzFormData.uploadfiles = [];
            _this.rjzFormData.files = [];
          }
          _this.$refs.editWidiow1.close();
          break;
        }
        case 2: {
          //加扣分通知单
          var arryLen = _this.waitChooseCriminals.length;
          for (var i = 0, len = _this.tempData.length; i < len; i++) {
            _this.$set(_this.tempData[i], "disabled", true);
            _this.$set(_this.tempData[i], "khyj", _this.tempData[i].bhTk);
            _this.$set(_this.tempData[i], "yjfs", _this.tempData[i].fz);
            _this.createCriminalCouple(i, arryLen, formateData);
            _this.rjzFormData.uploadfiles = [];
            _this.rjzFormData.files = [];
          }
          _this.$refs.editWidiow2.close();
          break;
        }
        case 3: {
          // 添加从罪犯
          _this.tempData[0].from = JSON.parse(
            JSON.stringify(this.currentPoint.relationNode)
          ).zfbh;
          _this.tempData[0].zBh = JSON.parse(
            JSON.stringify(this.currentPoint.relationNode)
          ).bh;
          _this.currentPoint.relationNode.to.push(this.tempData[0].zfbh);
          _this.waitChooseCriminals.splice(
            this.currentPoint.currentIndex,
            1,
            JSON.parse(JSON.stringify(this.tempData[0]))
          );
          _this.rjzFormData.uploadfiles = [];
          _this.rjzFormData.files = [];
          _this.$refs.editWidiow3.close();
          break;
        }
      }
      _this.xzIsDisable = true;
    },
    /**
     * @name 创建罪犯组
     * @description
     */
    createCriminalCouple(i, arryLen, formateData) {
      var _this = this;
      _this.tempData[i].zt = ""; //此zt与日记载的审批状态重名
      _this.$set(
        _this.waitChooseCriminals,
        i * 5 + arryLen,
        JSON.parse(JSON.stringify(_this.tempData[i]))
      );
      formateData.from = JSON.parse(JSON.stringify(_this.tempData[i])).zfbh;
      for (var j = 1; j < 5; j++) {
        _this.$set(
          _this.waitChooseCriminals,
          i * 5 + j + arryLen,
          JSON.parse(JSON.stringify(formateData))
        );
      }
    },
    /**
     * @name 重构数据格式
     * @description
     */
    rebuidCriminalList() {
      var _this = this;
      var newWaitChooseCriminals = [];
      var formateData = JSON.parse(JSON.stringify(_this.formateData));
      var arryLen = _this.waitChoosePrimaryCriminals.length;
      for (var i = 0; i < arryLen; i++) {
        var level2Count = _this.waitChoosePrimaryCriminals[i].to.length;
        var zfbh = _this.waitChoosePrimaryCriminals[i].zfbh;
        newWaitChooseCriminals.push(_this.waitChoosePrimaryCriminals[i]);
        for (var j = 0; j < _this.waitChooseCriminals.length; j++) {
          if (_this.waitChooseCriminals[j].from == zfbh) {
            newWaitChooseCriminals.push(_this.waitChooseCriminals[j]);
          }
        }
        formateData.from = zfbh;
        while (level2Count < 4) {
          newWaitChooseCriminals.push(JSON.parse(JSON.stringify(formateData)));
          level2Count++;
        }
      }
      for (var k = 0; k < newWaitChooseCriminals.length; k++) {
        _this.$set(_this.waitChooseCriminals, k, newWaitChooseCriminals[k]);
      }
    },
    /**
     * @name 罪犯关联关系重建
     * @description
     */
    criminalsRelationRebuid() {
      var _this = this;
      var waitChooseCriminals = _this.waitChooseCriminals;
      var len = waitChooseCriminals.length;
      // 如果有zBh，说明是连坐罪犯，通过主编号，找到主罪犯，将当前对象的bh赋给查到的主罪犯的to
      for (var i = 0; i < len; i++) {
        if (waitChooseCriminals[i].zBh != "") {
          var zfbh = waitChooseCriminals[i].zfbh;
          for (var j = 0; j < len; j++) {
            if (waitChooseCriminals[j].bh == waitChooseCriminals[i].zBh) {
              waitChooseCriminals[j].to.push(zfbh);
            }
          }
        }
      }
      // 如果有cBh，说明是主罪犯，通过遍历cBh，找到从罪犯，将从罪犯的from赋为当前对象的bh
      for (var k = 0; k < len; k++) {
        if (waitChooseCriminals[k].cBh.length != 0) {
          var zfbh2 = waitChooseCriminals[k].zfbh;
          for (
            var l = 0, len2 = waitChooseCriminals[k].cBh.length;
            l < len2;
            l++
          ) {
            var theCbh = waitChooseCriminals[k].cBh[l];
            for (var m = 0; m < len; m++) {
              if (waitChooseCriminals[m].bh == theCbh) {
                waitChooseCriminals[m].from = zfbh2;
              }
            }
          }
        }
      }
    },
    /**
     * @name 全选
     * @param {any} checked
     * @description
     */
    chooseAll(checked) {
      var _this = this;
      _this.rjzFormData.qxjcfSelectedData = [];
      if (!_this.addStatus) {
        _this.clearFormData();
        _this.addStatus = true;
        _this.khlxDisabled(false);
      }
      if (!checked) {
        _this.checkAll = false;
        _this.$refs.allC._data.currentChecked = false;
        _this.waitChooseCriminals.forEach(function(v, k) {
          v["checked"] = false;
        });
        _this.khlxDisabled(false);
      } else {
        _this.checkAll = true;
        _this.$refs.allC._data.currentChecked = true;
        _this.waitChooseCriminals.forEach(function(v, k) {
          if (v["selectable"]) {
            v["checked"] = true;
          } else {
            v["checked"] = false;
          }
        });
        _this.noSaveKhlxDisabled();
      }
    },
    /**
     * @description 勾选的罪犯考核类型动态置灰
     */
    choosedKhlxDisabled(item) {
      var _this = this;
      var zFlag = false;//主罪犯标志
      var cFlag = false;//从罪犯标志
      var chooseCriminals = _this.realChooseCriminals;
      if(chooseCriminals.length > 0) {
        for(var i=0;i<chooseCriminals.length;i++) {
          if(chooseCriminals[i].zfxxbh == item.zfxxbh) {
            chooseCriminals.splice(i,1);
            i--;
            continue;
          }
          if(chooseCriminals[i].hasOwnProperty("zBh") && chooseCriminals[i].zBh != "") {
            cFlag = true;
          } else {
            zFlag = true;
          }
        }
        var zcFlag = zFlag && cFlag;
        if(_this.zczfFlag && zcFlag) {
          _this.zfKhlxDisabled();
        } else if(cFlag) {
          _this.lhzfKhlxDisabled(true);
        } else if(zFlag) {
          _this.zzfKhlxDisabled(true);
        } else {
          _this.khlxDisabled(false);
        }
      }
    },
    /**
     * @description 未保存的罪犯考核类型动态置灰
     */
    noSaveKhlxDisabled() {
      var _this = this;
      var zFlag = false;//主罪犯标志
      var cFlag = false;//从罪犯标志
      if(_this.noSaveCriminals.length > 0) {
        _this.noSaveCriminals.forEach(function (item) {
          if(item.hasOwnProperty("zBh") && item.zBh != "") {
            cFlag = true;
          } else {
            zFlag = true;
          }
        });
        var zcFlag = zFlag && cFlag;
        if(_this.zczfFlag && zcFlag) {
          _this.zfKhlxDisabled();
        } else if(cFlag) {
          _this.lhzfKhlxDisabled(true);
        } else if(zFlag) {
          _this.zzfKhlxDisabled(true);
        }
      }
    },
    /**
     * @name 删除日记载
     * @param {any} bh
     * @description
     */
    delCriminalFromServer: function(bh) {
      if (bh != undefined && bh != "") {
        this.deleteRequest("/api/v1/rjz/deleteRjz/" + bh).then(resp => {
          if (resp && resp.status == 200) {
          } else {
            Artery.message.error({
              content: "删除失败！请联系管理人员！",
              duration: 3
            });
          }
        });
      }
    },
    /**
     * @name 删除一级罪犯
     * @param {any} item
     * @param {any} index
     * @description
     */
    delPrimaryCriminal: function(item, index) {
      var _this = this;
      _this.showConfirm2 = true;
      _this.primaryCriminal = {
        item,
        index
      };
    },
    /**
     * @name 删除连坐罪犯
     * @param {any} index
     * @description
     */
    delSecondaryCriminal(index) {
      var _this = this;
      _this.showConfirm3 = true;
      _this.secondaryCriminalDelIndex = index;
    },
    /**
     * @name 清空列表
     * @description
     */
    clearList() {
      var _this = this;
      this.status.clear = true;
      this.waitChooseCriminals = [];
    },
    /**
     * @name 清空后台操作
     * @description
     */
    delAllCriminalsForServer() {
      var _this = this;
      _this
        .postRequest("/api/v1/rjz/batchDeleteRjz/", this.savedCriminalsBh)
        .then(resp => {
          // 请求后台批量删除
          if (resp && resp.status == 200) {
            Artery.message.info({
              content: "清空成功！",
              duration: 1.5
            });
          } else {
            Artery.message.info({
              content: "清空失败！",
              duration: 3
            });
          }
        });
    },
    /**
     * @name 勾选人员
     * @param {any} item
     * @param {any} index
     * @description
     */
    checkChoosePerson(item, index) {
      var _this = this;
      if (item.checked) {
        _this.choosedKhlxDisabled(item);
        item.checked = !item.checked;
        _this.checkAll = false;
        return;
      }
      item.checked = !item.checked;
      _this.$set(_this.choosePerson, index, item);
      //如果勾选的话，禁选的勾选设置成false
      for (var i = 0, len = _this.waitChooseCriminals.length; i < len; i++) {
        if (_this.waitChooseCriminals[i].selectable == false) {
          _this.waitChooseCriminals[i].checked = false;
        }
      }
      if (!item.hasOwnProperty("bh") || item.bh != "") {
        _this.khlxDisabled(false);
      }
      _this.zfbhClick(item, index);
    },
    /**
     * @name 事件录入展开收起效果
     * @description
     */
    changeEventStatus() {
      this.status.eventWriteStatus = !this.status.eventWriteStatus;
      // this.$refs.scroll1.update();
    },
    /**
     * @name 回到日记载列表
     * @description
     */
    dayRecord() {
      this.$router.push({
        path: "/dayRecord"
      });
    },
    /**
     * @name 合议：校验是否存在未合议的
     * @description
     */
    verifySfHy() {
      let _this = this;
      //判断是否合议
      for (var i = 0; i < _this.savedCriminals.length; i++) {
        if (
          _this.savedCriminals[i].hyjlBh == undefined ||
          _this.savedCriminals[i].hyjlBh == "" ||
          _this.savedCriminals[i].hyjlBh == null
        ) {
          return true;
        }
      }
      return false;
    },
    /**
     * @name 提交：弹出选择审批人弹窗
     * @description
     */
    clickTijiao() {
      let _this = this;
      var zfList = _this.waitChooseCriminals;
      if (
        !_this.isHeyi &&
        _this.heyiPerson.length != _this.realCriminals.length &&
        !_this.isAllXjPerson()
      ) {
        Artery.message.info({
          content: "请合议后再提交",
          duration: 3
        });
        return;
      }
      if (zfList == null || zfList.length == 0) {
        Artery.message.info({
          content: "当前无罪犯，请先添加罪犯！",
          duration: 3
        });
        return;
      }
      if (_this.hasSelectableCriminal) {
        Artery.message.info({
          content: "存在未保存日记载！",
          duration: 3
        });
        return;
      }
      if (!_this.atLeast2()) {
        Artery.message.info({
          content: "存在联号罪犯的罪犯至少需要保存两名联号罪犯才能提交！",
          duration: 3
        });
        return;
      }
      if (_this.verifySfHy()) {
        if (_this.khlx2Person.length == _this.savedCriminals.length) {
        } else {
          Artery.message.info({
            content: "存在未合议的罪犯日记载，重新合议后才能提交！",
            duration: 3
          });
          return;
        }
      }
      var params = [];
      for (var i = 0; i < zfList.length; i++) {
        if(!zfList[i].hasOwnProperty("bh") || zfList[i].bh == "" || zfList[i].khlx == "10" || zfList[i].khlx == "11") {
          continue;
        }
        var obj = {
          bh: zfList[i].bh
        };
        params.push(obj);
      }
      _this.isLoading = true;
      _this.postRequest("/api/v1/rjz/beforeSubmitRjz", params).then(resp => {
        if (resp && resp.status == 200) {
          _this.isLoading = false;
          var taskId = resp.data;
          var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
          var taskParams = {
            curTaskId: taskId,
            spAuthority: "jy.imp.jfkh.splc.rjzsp.",
            corpId: userInfo.corpId
          };
          _this
            .getRequest("/api/v1/system/getTaskNextSprs", taskParams)
            .then(resp => {
              if (resp && resp.status == 200) {
                _this.xybsprSelectData = resp.data;
              } else {
                setTimeout(function() {
                  _this.isLoading = false;
                }, 6000);
              }
            });
          _this.$refs.xybsprWindow.open();
        } else {
          setTimeout(function() {
            _this.isLoading = false;
          }, 6000);
          Artery.message.success(resp.data);
        }
      });
    },
    /**
     * @name 数据加载：弹出窗口
     * @description
     */
    modalPage1: function(type, param1, param2, param3, param4) {
      let _this = this;
      if (type == 2) {
        // 查询加扣分通知单
        _this.getRequest("/api/v1/jkftzd/rjzGet").then(resp => {
          if (resp && resp.status == 200) {
            // 将数据绑定上属性
            let resplist = resp.data.ArrayList;
            if (resplist) {
              for (var i = 0; i < resplist.length; i++) {
                _this.$set(resplist[i], "tzdBh", resplist[i].bh);
                _this.$delete(resplist[i], "bh");
                _this.$set(resplist[i], "selectable", true);
                _this.$set(resplist[i], "checked", false);
                _this.$set(resplist[i], "from", "");
                _this.$set(resplist[i], "to", []);
                _this.$set(resplist[i], "zBh", "");
                _this.$set(resplist[i], "cBh", []);
                _this.$set(resplist[i], "jkftzdBs", 1);
              }
            }
            _this.switchMethod(resplist, type, param1, param2, param3, param4);
          } else {
            Artery.message.error({
              content: "查询失败！请重试或联系管理人员！",
              duration: 3
            });
          }
        });
      } else {
        let zfbhOrXm = _this.zfbhOrXm == "" ? null : _this.zfbhOrXm;
        var dept = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).deptId;
        let params = {
          zfbhOrXm: zfbhOrXm,
          dept: dept
        };
        if (type == 3) {
          params = {
            zfbhOrXm: param1.inputValue,
            dept: dept
          };
        }
        //查询罪犯信息
        _this.postRequest("/api/v1/system/getZfxx", params).then(resp => {
          if (resp && resp.status == 200) {
            // 将数据绑定上属性
            // resp.data.length = 30
            let resplist = resp.data;
            if (resplist != undefined) {
              for (var i = 0; i < resplist.length; i++) {
                _this.pieceZf(resplist, i);
              }
            }
            _this.switchMethod(resplist, type, param1, param2, param3, param4);
          } else {
            Artery.message.error({
              content: "查询失败！请重试或联系管理人员！",
              duration: 3
            });
          }
        });
      }
    },
    /**
     * @name 拼装罪犯信息
     * @param {Array} resplist this对象
     * @param {any} i 索引值
     * @description
     */
    pieceZf(resplist,i) {
      var _this = this;
      _this.$set(resplist[i], "zfxxbh", resplist[i].bh);
      _this.$delete(resplist[i], "bh");
      _this.$set(resplist[i], "zfxm", resplist[i].xm);
      _this.$set(resplist[i], "selectable", true);
      _this.$set(resplist[i], "checked", false);
      _this.$set(resplist[i], "from", "");
      _this.$set(resplist[i], "to", []);
      _this.$set(resplist[i], "zBh", "");
      _this.$set(resplist[i], "cBh", []);
    },
    /**
     * @name 工具：格式化日期
     * @param {any} comeTime
     * @description
     */
    formatDate(comeTime) {
      //解决IE的转换问题
      if (comeTime == undefined || comeTime == "" || comeTime == null) {
        return "";
      }
      var newDate = comeTime;
      if ("string" == typeof newDate) {
        if (newDate.length > 10) {
          newDate = newDate.substr(0, 10);
        }
        if (newDate.indexOf("-") > -1) {
          newDate = new Date(newDate.replace(/-/g, "/"));
        } else {
          newDate = new Date(newDate);
        }
      }
      var newDateT =
        newDate.getFullYear() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getDate();
      return newDateT;
    },
    /**
     * @name 查询的方式
     * @param {any} zfList
     * @description
     */
    switchMethod(zfList, type, param1, param2, param3, param4) {
      let _this = this;
      _this.xzIsDisable = false;
      switch (type) {
        case 1: {
          if (zfList && zfList != null) {
            _this.requestData1 = zfList;
          }
          this.$refs.editWidiow1.open();
          _this.popData = JSON.parse(JSON.stringify(_this.requestData1));
          for (
            var i = 0, len = _this.waitChooseCriminals.length;
            i < len;
            i++
          ) {
            for (var j = 0, len2 = _this.popData.length; j < len2; j++) {
              if (_this.waitChooseCriminals[i].zfbh == _this.popData[j].zfbh) {
                _this.popData[j].selectable = false;
              }
            }
          }
          break;
        }
        case 2: {
          if (zfList && zfList != null) {
            _this.requestData2 = zfList;
          }
          this.popData = JSON.parse(JSON.stringify(this.requestData2));
          for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
            for (var j = 0, len2 = this.popData.length; j < len2; j++) {
              if (this.waitChooseCriminals[i].zfbh == this.popData[j].zfbh) {
                this.popData[j].selectable = false;
              }
            }
          }
          this.currentPoint.currentIndex = param2;
          this.currentPoint.currentNode = param1;
          this.currentPoint.relationNode = param3;
          this.$refs.editWidiow2.open();
          break;
        }
        case 3: {
          if (zfList && zfList != null) {
            _this.requestData3 = zfList;
          }
          this.currentPoint.currentIndex = param2;
          this.currentPoint.currentNode = param1;
          this.currentPoint.relationNode = param3;
          this.popData = JSON.parse(JSON.stringify(this.requestData3));
          for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
            for (var j = 0, len2 = this.popData.length; j < len2; j++) {
              if (this.waitChooseCriminals[i].zfbh == this.popData[j].zfbh) {
                this.popData[j].selectable = false;
              }
            }
          }
          this.$refs.editWidiow3.open();

          break;
        }
      }
    },
    /**
     * @name 点击多选改变状态
     * @param {any} item
     * @description
     */
    checkClick: function(item) {
      item.checked = !item.checked;
    },
    /**
     * @name 表单提交前校验
     * @description
     */
    validateForm: function() {
      var _this = this;
      // 发生日期 必填
      if (_this.rjzFormData.fsrq == "") {
        Artery.message.error({
          content: "请选择发生日期",
          duration: 3
        });
        return false;
      }
      // 发生地点 字数不超过50个字 非必填
      if (_this.rjzFormData.fsdd.length > 200) {
        Artery.message.error({
          content: "发生地点字数不能超过50个字！",
          duration: 3
        });
        return false;
      }
      // 事件描述 字数不超过3000个字 非必填
      if (_this.rjzFormData.sjmc.length > 3000) {
        Artery.message.error({
          content: "事件描述字数不能超过3000个字！",
          duration: 3
        });
        return false;
      }
      // 类型 必填
      if (_this.rjzFormData.khlx == "") {
        Artery.message.error({
          content: "请选择类型",
          duration: 3
        });
        return false;
      }
      // 考核部分 必填
      if (_this.rjzFormData.khxm == "") {
        Artery.message.error({
          content: "请选择考核部分",
          duration: 3
        });
        return false;
      }
      // 主要事由 字数不超过23个字 必填
      if (_this.rjzFormData.zysy == "") {
        Artery.message.error({
          content: "主要事由必填！",
          duration: 3
        });
        return false;
      }
      if (_this.rjzFormData.zysy.length > 23) {
        Artery.message.error({
          content: "主要事由字数不能超过23个字！",
          duration: 3
        });
        return false;
      }
      // 考核类型为记事本、暂外违规、免责、不计分时，不校验情节
      if (_this.rjzFormData.khlx != "1" && _this.rjzFormData.khlx != "9" && _this.rjzFormData.khlx != "10"  &&
        _this.rjzFormData.khlx != "11") {
        // 情节 必填
        if (_this.rjzFormData.qj == "") {
          Artery.message.error({
            content: "请选择情节",
            duration: 3
          });
          return false;
        }
      }
      // 考核依据 必填
      var khyj = _this.rjzFormData.khyj;
      //记事本，免责，不校验
      if (khyj == "" && _this.rjzFormData.khlx != "1" && _this.rjzFormData.khlx != "10") {
        Artery.message.error({
          content: "请选择考核依据",
          duration: 3
        });
        return false;
      }
      //考核依据的校验
      var khyjRef = _this.$refs.khyjRef;
      if(khyjRef != undefined) {
        var khyjList = khyjRef.currentData;
        var khyjFlag = false;
        for (var i = 0; i < khyjList.length; i++) {
          if (khyj == khyjList[i].name.replace(/<em>/, "").replace(/<\/em>/, "")) {
            khyjFlag = true;
            break;
          }
        }
        if (!khyjFlag && khyj != "") {
          Artery.message.error({
            content: "请正确选择考核依据！",
            duration: 3
          });
          return false;
        }
      }
      // 考核类型为单项处罚不校验处理意见
      if (_this.rjzFormData.khlx == "5") {
        // 处理意见 必填
        if (_this.rjzFormData.clyj == "") {
          Artery.message.error({
            content: "请选择处理意见",
            duration: 3
          });
          return false;
        }
      }
      // 建议分数 必填且为数字；考核类型为记事本，训诫不校验建议分数范围
      if (_this.isNumber(this.rjzFormData.yjfs)) {
        if(!_this.yjfsValidator()) {
          Artery.message.error({
            content: "请正确填写建议分数!",
            duration: 3
          });
          return false;
        }
      }else {
        Artery.message.error({
          content: "请正确填写建议分数!",
          duration: 3
        });
        return false;
      }
      // 考核类型为单项处罚以及处理意见为禁闭时校验
      if (_this.rjzFormData.khlx == "5") {
        // 违反监狱法 必填
        if (_this.rjzFormData.wfjyflx == "") {
          Artery.message.error({
            content: "请选择违反监狱法",
            duration: 3
          });
          return false;
        }
        if (_this.rjzFormData.clyj == "3") {
          // 禁闭期限 必填
          var jbqx = _this.rjzFormData.jbqx;
          if (
            jbqx.length == 0 ||
            jbqx == [] ||
            (jbqx[0] == "" && jbqx[1] == "")
          ) {
            Artery.message.error({
              content: "请选择禁闭期限",
              duration: 3
            });
            return false;
          }
          // 健康状况 必填 字数不超过50个字
          if (_this.rjzFormData.jkzk == "") {
            Artery.message.info({
              content: "请选择健康状况",
              duration: 3
            });
            return false;
          } else if (_this.rjzFormData.jkzk.length > 50) {
            Artery.message.info({
              content: "健康状况不能超过50个字",
              duration: 3
            });
            return false;
          }
        }
      }
      return true;
    },
    /**
     * @name 点击切换类型
     * @description
     */
    khlxChange: function(param1) {
      var _this = this;
      _this.rjzFormData.fzjldw = 0;
      _this.editStatus != "edit"
        ? (_this.isSaved = false)
        : (_this.isSaved = true);
      _this.rjzFormData.jyfsfw = "";
      _this.rjzFormData.khyj = ""; // 考核依据
      _this.$refs.khyjRef != undefined?_this.$refs.khyjRef.setCurrentData([]):null; //考核依据列表
      _this.rjzFormData.qj = ""; //情节
      _this.rjzFormData.wfjyflx = ""; //违反监狱法
      switch (param1) {
        //类型为"记事本"
        case "1": {
          //必填项仅有类型、发生时间、主要事由
          _this.rjzFormData.jbts = ""; //禁闭时长
          _this.rjzFormData.jbqx = []; //禁闭期限
          _this.rjzFormData.jbksrq = ""; //禁闭开始日期
          _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
          _this.rjzFormData.yjfs = ""; // 建议分数
          break;
        }
        //类型为"训诫"
        case "2": {
          //考核依据、建议分数不显示
          _this.rjzFormData.yjfs = ""; //建议分数
          _this.rjzFormData.jbts = ""; //禁闭时长
          _this.rjzFormData.jbqx = []; //禁闭期限
          _this.rjzFormData.jbksrq = ""; //禁闭开始日期
          _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
          //情节-轻微
          break;
        }
        //类型为"扣分"
        case "3": {
          //情节为较轻、一般、严重
          _this.rjzFormData.jbts = ""; //禁闭时长
          _this.rjzFormData.jbqx = []; //禁闭期限
          _this.rjzFormData.jbksrq = ""; //禁闭开始日期
          _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
          _this.rjzFormData.yjfs = ""; // 建议分数
          break;
        }
        //类型为"加分"
        case "4": {
          _this.rjzFormData.clyj = ""; //处理意见
          _this.rjzFormData.jbts = ""; //禁闭时长
          _this.rjzFormData.jbqx = []; //禁闭期限
          _this.rjzFormData.jbksrq = ""; //禁闭开始日期
          _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
          _this.rjzFormData.yjfs = ""; // 建议分数
          break;
        }
        //类型为"单项处罚"
        case "5": {
          _this.rjzFormData.yjfs = ""; // 建议分数
          break;
        }
        //类型为"专项加分"
        case "6": {
          _this.rjzFormData.jyfsfw = "100";
          _this.rjzFormData.yjfs = ""; // 建议分数
          //情节为特别突出
          break;
        }
        //类型为"赞外违规"
        case "9": {
          _this.rjzFormData.jbts = ""; //禁闭时长
          _this.rjzFormData.jbqx = []; //禁闭期限
          _this.rjzFormData.jbksrq = ""; //禁闭开始日期
          _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
          _this.rjzFormData.yjfs = "600"; // 建议分数
          _this.rjzFormData.khxm = "1";
          break;
        }
        //类型为"免责"
        case "10": {
          _this.rjzFormData.khxm = "1";
          break;
        }
      }

    },
    /**
     * @name 点击切换切换考核部分
     * @description
     */
    khxmChange: function() {
      var _this = this;
      _this.editStatus != "edit"
        ? (_this.isSaved = false)
        : (_this.isSaved = true);
      if (_this.rjzFormData.khyjOld != "") {
        _this.rjzFormData.khyj = _this.rjzFormData.khyjOld;
      } else {
        _this.rjzFormData.khyj = ""; //违反监狱法
      }
      _this.rjzFormData.qj = ""; //情节
      _this.rjzFormData.wfjyflx = ""; //违反监狱法
      _this.rjzFormData.jbts = ""; //禁闭时长
      _this.rjzFormData.jbqx = []; //禁闭期限
      _this.rjzFormData.jbksrq = ""; //禁闭开始日期
      _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
      _this.rjzFormData.khyj = ""; // 考核依据
      _this.$refs.khyjRef != undefined?_this.$refs.khyjRef.setCurrentData([]):null; //考核依据列表
      _this.rjzFormData.yjfs = ""; // 建议分数
    },
    /**
     * @name 获取列表右侧信息
     * @description
     */
    getRightList: function(str) {
      var _this = this;
      let params = str;
      _this.getRequest("/api/v1/rjz/getRjzByBh/" + params).then(resp => {
        // 查询罪犯信息
        if (resp && resp.status == 200) {
          // 将数据绑定上属性
          _this.rjzFormData = resp.data;
        }
      });
    },
    /**
     * @name 获取重新排序后，当前操作的项目index
     * @description
     */
    getIndexFromEdit: function(bh) {
      var _this = this;
      for (var i = 0, len = _this.waitChooseCriminals.length; i < len; i++) {
        if (_this.waitChooseCriminals[i].bh == bh) {
          return i;
        }
      }
    },
    /**
     * @name 填充数据
     * @description
     */
    setData: function() {
      let _this = this;
      if (
        typeof _this.$route.query.zfListMap != "string" &&
        _this.$route.query.editStatus != "new"
      ) {
        localStorage.setItem(
          "dayRecordEdit",
          JSON.stringify(_this.$route.query)
        );
      }
      if (_this.$route.query.editStatus != undefined) {
        _this.editStatus = _this.$route.query.editStatus;
      }
      if (_this.editStatus == "edit" || _this.editStatus == "view") {
        var zfList = JSON.parse(localStorage.getItem("dayRecordEdit")).zfListMap
          .zfRjzList;
        var rjzBhList = JSON.parse(localStorage.getItem("dayRecordEdit"))
          .zfListMap.rjzBhList;
        if (
          zfList != undefined &&
          zfList.length > 0 &&
          rjzBhList != undefined &&
          rjzBhList.length > 0
        ) {
          _this.bcBh = zfList[0].bcBh; //为了保证同一组保存的数据，再添加新数据也同一个保存编号
          _this.waitChooseCriminals = zfList;
          for (var i = 0; i < _this.waitChooseCriminals.length; i++) {
            //回填 罪犯列表信息
            _this.$set(_this.waitChooseCriminals[i], "selectable", false);
            _this.$set(_this.waitChooseCriminals[i], "checked", false);
            _this.showLh(_this.waitChooseCriminals[i], false);
            if (
              _this.waitChooseCriminals[i].from != undefined &&
              _this.waitChooseCriminals[i].from != null
            ) {
              _this.$set(
                _this.waitChooseCriminals[i],
                "from",
                _this.waitChooseCriminals[i].from
              );
              _this.$set(_this.waitChooseCriminals[i], "to", []);
            } else if (
              _this.waitChooseCriminals[i].to != undefined &&
              _this.waitChooseCriminals[i].to != null
            ) {
              _this.$set(
                _this.waitChooseCriminals[i],
                "to",
                _this.waitChooseCriminals[i].to
              );
              _this.$set(_this.waitChooseCriminals[i], "from", "");
            } else {
              _this.$set(_this.waitChooseCriminals[i], "from", "");
              _this.$set(_this.waitChooseCriminals[i], "to", []);
            }
          }
          var obj = {
            bh: rjzBhList[0]
          };
          _this.criminalsRelationRebuid(); // 重构罪犯关系
          _this.rebuidCriminalList(); // 重构数据格式
          var getIndex = _this.getIndexFromEdit(rjzBhList[0]); // 获取重构后的数据格式对应的当前项索引
          _this.zfbhClick(obj, getIndex); // 点击显示罪犯日记载的详细信息
        }
        if (_this.editStatus == "view") {
          _this.disabledSelect();
        }
      }
      _this.isSaved = true;
    },
    /**
     * @name 设置可选
     * @description
     */
    enabledSelect: function() {
      this.khlxSelectData.forEach(function(item, index) {
        item["disabled"] = false;
      });
      this.khxmSelectData.forEach(function(item, index) {
        item["disabled"] = false;
      });
    },
    /**
     * @name 设置不可选
     * @description
     */
    disabledSelect: function() {
      this.khlxSelectData.forEach(function(item, index) {
        item["disabled"] = true;
      });
      this.khxmSelectData.forEach(function(item, index) {
        item["disabled"] = true;
      });
    },
    /**
     * @name 判断是否所有罪犯都是训诫或暂外执行类型
     * @description
     */
    isAllXjPerson() {
      var _this = this;
      if (_this.khlx2Person.length == _this.savedCriminals.length) {
        return true;
      } else {
        return false;
      }
    }
  },
  computed: {
    yjfsDisabled() {
      var _this = this;
      if (_this.editFlag && _this.rjzFormData.khlx == "3" && _this.rjzFormData.khyj.indexOf("50/1/31") != -1) {
        return false;
      } else if (!_this.editFlag || _this.rjzFormData.khlx == '3' || _this.rjzFormData.khlx == '5'
        || _this.rjzFormData.khlx == '6') {
        return true;
      }
    },
    jfkhxzmj() {
      return this.heyiFormData.jfkhxzmj;
    },
    /**
     * @name 全选是否disable
     */
    checkAllDisable() {
      var flag = true;
      var item = this.realCriminals;
      for(var i=0;i< item.length;i++) {
        if(item[i].selectable) {
          flag = false;
        }
      }
      return flag;
    },
    /**
     * @name 处理意见
     */
    clyj() {
      return this.rjzFormData.clyj;
    },
    /**
     * @name 考核类型
     */
    khlx() {
      return this.rjzFormData.khlx;
    },
    /**
     * @name 考核部分
     */
    khxm() {
      return this.rjzFormData.khxm;
    },
    /**
     * @name 根据审批状态展示按钮
     * @description
     */
    spztButtonShow() {
      var _this = this;
      var data = _this.realChooseCriminals;
      var flag = true;
      if (data.length > 0) {
        data.forEach(function(item, index) {
          if (item.hasOwnProperty("zt") && parseInt(item.zt) >= 100) {
            flag = false;
          }
        });
      }
      return flag;
    },
    /**
     * @name 根据类型动态展示合议
     * @description
     */
    heyiShow() {
      var _this = this;
      var data = _this.filterwaitChooseCriminals;
      if(data.length == 0) {
        return true;
      }
      for(var i=0;i<data.length;i++) {
        if(data[i].hasOwnProperty("zt") && parseInt(data[i].zt) >= 100) {
          data.splice(i,1);
          i--;
        }
      }
      if(data.length == 0) {
        isShow = true;
      } else {
        var noJsb = true;
        var isShow = false;
        //有记事本则不展示合议按钮，只有训诫和暂外违规不展示合议按钮
        data.forEach(function(item, index) {
          if(item.khlx != undefined && item.khlx != "") {
            if (item.khlx == "1") {
              noJsb = false;
            } else if(item.khlx != "2" && item.khlx != "9") {
              isShow = true;
            }
          }
        });
      }
      if(!noJsb) {
        isShow = false;
      }
      return isShow;
    },
    /**
     * @name 动态展示全部删除按钮
     * @description
     */
    clearAllShow() {
      var _this = this;
      var isShow = true;
      var data = _this.filterwaitChooseCriminals;
      data.forEach(function(item, index) {
        if (parseInt(item.zt) >= 100) {
          isShow = false;
        }
      });
      return isShow;
    },
    /**
     * @name 动态改变考核类型
     * @description
     */
    khlxData() {
      var _this = this;
      var data = _this.khlxSelectData;
      data.forEach(function(item, index) {
        _this.$set(data[index], "disabled", !_this.editFlag);
      });
      return data;
    },
    /**
     * @name 动态改变考核部分
     * @description
     */
    khxmData() {
      var _this = this;
      var data = _this.khxmSelectData;
      data.forEach(function(item, index) {
        if (_this.rjzFormData.khlx == "9" || _this.rjzFormData.khlx == "10") {
          _this.$set(data[index], "disabled", true);
        } else {
          _this.$set(data[index], "disabled", !_this.editFlag);
        }
      });
      return data;
    },
    /**
     * @name 情节下拉数据
     * @description
     */
    newQjSelectData: function() {
      var qjSelectData = this.qjSelectData;
      var khlx = this.rjzFormData.khlx;
      if (khlx == 2) {
        qjSelectData = [
          {
            code: "1",
            codeType: "qingwei",
            name: "轻微"
          }
        ];
      } else if (khlx == 3) {
        qjSelectData = [
          {
            code: "2",
            codeType: "jiaoqing",
            name: "较轻"
          },
          {
            code: "3",
            codeType: "yiban",
            name: "一般"
          },
          {
            code: "4",
            codeType: "yanzhong",
            name: "严重"
          }
        ];
      } else if (khlx == 4) {
        qjSelectData = [
          {
            code: "5",
            codeType: "tuchu",
            name: "突出"
          }
        ];
      } else if (khlx == 5) {
        qjSelectData = [
          {
            code: "6",
            codeType: "tbyz",
            name: "特别严重"
          }
        ];
      } else if (khlx == 6) {
        qjSelectData = [
          {
            code: "7",
            codeType: "tbtc",
            name: "特别突出"
          }
        ];
      }
      return qjSelectData;
    },
    /**
     * @name 全选
     * @description
     */
    allChecked: {
      get: function() {
        var allCheck = false;
        var waitChooseCriminals = this.waitChooseCriminals.slice(0);
        var allCheckIndex = 0;
        var allcheckLen = waitChooseCriminals.length;
        for (var i = 0; i < waitChooseCriminals.length; i++) {
          if (
            !(
              waitChooseCriminals[i] == "" ||
              typeof waitChooseCriminals[i] == "undefined" ||
              waitChooseCriminals[i] == null
            )
          ) {
            if (waitChooseCriminals[i].checked == false) {
              allCheck = false;
              break;
            } else {
              allCheckIndex++;
            }
          }
        }
        if (allCheckIndex == allcheckLen) {
          allCheck = true;
        }
        if (allcheckLen == 0) {
          allCheck = false;
        }
        return allCheck;
      },
      set: function(flag) {
        return flag;
      }
    },
    /**
     * @name 判断是否展示提交
     * @description
     */
    isShowTj() {
      var _this = this;
      var data = _this.filterwaitChooseCriminals;
      var isShow = true;
      if(data.length == 0) {
        isShow = true;
      } else {
        data.forEach(function(item, index) {
          if (item.khlx != undefined && item.khlx == "1") {
            isShow = false;
          }
        });
      }
      return isShow;
    },
    /**
     * @name 是否还有可选罪犯
     * @description
     */
    hasSelectableCriminal: function() {
      var _this = this;
      for (var i = 0, len = _this.waitChooseCriminals.length; i < len; i++) {
        if (_this.waitChooseCriminals[i].selectable == true) {
          return true;
        }
      }
      return false;
    },
    /**
     * @name 过滤后展示的罪犯
     * @description
     */
    filterwaitChooseCriminals: function() {
      var _this = this;
      var waitChooseCriminals = _this.waitChooseCriminals.slice(0);
      for (var i = 0; i < waitChooseCriminals.length; i++) {
        if (waitChooseCriminals[i].zfbh == "") {
          waitChooseCriminals.splice(i, 1);
          i--;
        }
      }
      var flag = false;
      _this.noSaveCriminals = [];
      for (var i = 0, len = waitChooseCriminals.length; i < len; i++) {
        if (!waitChooseCriminals[i].hasOwnProperty("bh") || waitChooseCriminals[i].bh == "") {
          _this.noSaveCriminals.push(waitChooseCriminals[i]);
          if(waitChooseCriminals[i].hasOwnProperty("zBh") && waitChooseCriminals[i].zBh != "") {
            flag = true;
          }
        }
      }
      _this.zczfFlag = flag;
      return waitChooseCriminals;
    },
    /**
     * @name 训诫或暂外违规人员
     * @description
     */
    khlx2Person: function() {
      var returnArr = [];
      for (var i = 0, len = this.savedCriminals.length; i < len; i++) {
        if (
          this.savedCriminals[i].khlx == "2" ||
          this.savedCriminals[i].khlx == "9"
        ) {
          returnArr.push(this.savedCriminals[i]);
        }
      }
      return returnArr;
    },
    /**
     * @name 添加到列表的罪犯
     * @description
     */
    realCriminals: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (this.waitChooseCriminals[i].zfbh != "") {
          returnArr.push(this.waitChooseCriminals[i]);
        }
      }
      return returnArr;
    },
    /**
     * @name 勾选的罪犯
     * @description
     */
    realChooseCriminals: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (
          this.waitChooseCriminals[i].zfbh != "" &&
          this.waitChooseCriminals[i].checked
        ) {
          returnArr.push(this.waitChooseCriminals[i]);
        }
      }
      return returnArr;
    },
    /**
     * @name 勾选的罪犯的名称
     * @description
     */
    realChooseCriminalsName: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (
          this.waitChooseCriminals[i].zfbh != "" &&
          this.waitChooseCriminals[i].checked
        ) {
          returnArr.push(this.waitChooseCriminals[i].zfxm);
        }
      }
      return returnArr;
    },
    /**
     * @name 保存过且未提交的罪犯
     * @description
     */
    savedCriminals: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        var data = this.waitChooseCriminals[i];
        if (data.bh != undefined && data.bh != "") {
          if (!data.hasOwnProperty("zt") || data.zt == "" || data.zt == null || parseInt(data.zt) < 100) {
            returnArr.push(data);
          }
        }
      }
      return returnArr;
    },
    /**
     * @name 保存过且未提交的罪犯的编号
     * @description
     */
    savedCriminalsBh: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        var data = this.waitChooseCriminals[i];
        if (data.bh != undefined && data.bh != "") {
          if (!data.hasOwnProperty("zt") || data.zt == "" || data.zt == null || parseInt(data.zt) < 100) {
            returnArr.push(data.bh);
          }
        }
      }
      return returnArr;
    },
    /**
     * @name 所有保存过的罪犯的编号
     * @description
     */
    allSavedCriminalsBh: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        var data = this.waitChooseCriminals[i];
        if (data.bh != undefined && data.bh != "") {
            returnArr.push(data.bh);
        }
      }
      return returnArr;
    },
    /**
     * @name 从加扣分通知单添加的罪犯
     * @description
     */
    scorePerson: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (
          this.waitChooseCriminals[i].jkftzdBs != undefined &&
          this.waitChooseCriminals[i].jkftzdBs != ""
        ) {
          returnArr.push(this.waitChooseCriminals[i]);
        }
      }
      return returnArr;
    },
    /**
     * @name 从加扣分通知单添加的罪犯的编号
     * @description
     */
    scorePersonBh: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (
          this.waitChooseCriminals[i].jkftzdBs != undefined &&
          this.waitChooseCriminals[i].jkftzdBs != ""
        ) {
          returnArr.push(this.waitChooseCriminals[i].tzdBh);
        }
      }
      return returnArr;
    },
    /**
     * @name 已经合议的罪犯
     * @description
     */
    heyiPerson: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (
          this.waitChooseCriminals[i].hyjlBh != undefined &&
          this.waitChooseCriminals[i].hyjlBh != ""
        ) {
          returnArr.push(this.waitChooseCriminals[i]);
        }
      }
      return returnArr;
    },
    /**
     * @name 仅主罪犯
     * @description
     */
    waitChoosePrimaryCriminals: function() {
      var returnArr = [];
      for (var i = 0, len = this.waitChooseCriminals.length; i < len; i++) {
        if (this.waitChooseCriminals[i].from == "") {
          returnArr.push(this.waitChooseCriminals[i]);
        }
      }
      return returnArr;
    },
    /**
     * @name 当前时间
     * @description
     */
    nowDate: function() {
      var now = new Date();
      var year = now.getFullYear();
      var month =
        now.getMonth() + 1 < 10
          ? "0" + (now.getMonth() + 1)
          : now.getMonth() + 1;
      var day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
      return year + "-" + month + "-" + day;
    },
    /**
     * @name 发生日期格式化
     * @description
     */
    fsrqFormat: function() {
      var newDate = this.rjzFormData.fsrq;
      if ("string" == typeof newDate) {
        if (newDate.indexOf("-") > -1) {
          newDate = new Date(newDate.replace(/-/g, "/"));
        } else {
          newDate = new Date(newDate);
        }
      }
      return (
        newDate.getFullYear() +
        "-" +
        (newDate.getMonth() + 1) +
        "-" +
        newDate.getDate()
      );
    },
    /**
     * @name 禁闭时间
     * @description
     */
    jbsc: function() {
      var returnData;
      if (this.rjzFormData.jbqx == undefined) {
        this.rjzFormData.jbqx = [];
      }
      if (
        ((this.rjzFormData.jbqx[0] == undefined ||
          this.rjzFormData.jbqx[0] == "") &&
          this.rjzFormData.jbqx[1] == undefined) ||
        this.rjzFormData.jbqx[1] == ""
      ) {
        returnData = "";
      } else {
        returnData =
          (new Date(this.rjzFormData.jbqx[1]) -
            new Date(this.rjzFormData.jbqx[0])) /
            86400000 +
          1;
      }
      return returnData;
    }
  },
  created() {
    let _this = this;
    _this.setData();
    if (_this.rjzFormData.fsrq == "") {
      _this.rjzFormData.fsrq = _this.nowDate;
    }
    _this.isSaved = true; //能查询出就是已经保存过了
  },
  mounted() {
    var _this = this;
    // _this.$refs.scroll1.update();
    // 取消基础分
    var qxjcfSelectData = JSON.parse(
      localStorage.getItem(_jfkh.normalCodeTypeList)
    )["30111011"];
    qxjcfSelectData.splice(6, 1);
    _this.qxjcfSelectData = qxjcfSelectData;
    // 违反监狱法-下拉数据
    _this.wfjyfSelectData = JSON.parse(
      localStorage.getItem(_jfkh.normalCodeTypeList)
    )["30111016"];
    // 处理意见-下拉数据
    _this.clyjSelectData = JSON.parse(
      localStorage.getItem(_jfkh.normalCodeTypeList)
    )["30111004"];
    // 考核类型-下拉数据
    _this.khlxSelectData = JSON.parse(
      localStorage.getItem(_jfkh.normalCodeTypeList)
    )["30111001"];
    // 考核部分-下拉数据
    _this.khxmSelectData = JSON.parse(
      localStorage.getItem(_jfkh.normalCodeTypeList)
    )["30111002"];
  },
  watch: {
    jfkhxzmj(newValue, oldValue) {
      var _this = this;
      var cjry = _this.heyiFormData.cjry;
      var union = newValue.concat(cjry).uniquelize();
      var minus = [];
      union.forEach(function(o){
        if(!newValue.contains(o)) {
          minus.push(o);
        }
      });
      if(minus.length == 0) {
        return;
      }
      for(var i=0;i<_this.heyiFormData.cjry.length;i++) {
        if(minus.contains(_this.heyiFormData.cjry[i])) {
          _this.heyiFormData.cjry.splice(i,1);
          i--;
        }
      }
    },
    clyj(newValue, oldValue) {
      var _this = this;
      if(oldValue != "" && _this.clyjChangeAble) {
        _this.clearJbData();
      }
      _this.clyjChange();
      _this.clyjChangeAble = true;
    },
    khlx(newValue, oldValue) {
      var _this = this;
      if((oldValue != "" && _this.khlxChangeAble) || (oldValue == "" && (newValue == "9") || newValue == "10")) {
        _this.khlxChange(newValue);
      }
      _this.khlxChangeAble = true;
    },
    khxm(newValue, oldValue) {
      var _this = this;
      if(oldValue != "" && _this.khxmChangeAble) {
        _this.khxmChange();
      }
      _this.khxmChangeAble = true;
    },
  }
};
</script>
<style>
.fd-rjz-person,
.fd-rjz-person .aty-scroll {
  background: transparent;
}
.rzj-form .aty-form-item-label {
  color: #333;
  font-weight: bold;
}
</style>
<style scoped>
.table_butn {
  cursor: pointer;
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
.search_list_level1 .aty-col {
  height: 30px;
  line-height: 30px;
  text-align: left;
  color: #8697a7;
}
.search_list_level1 .aty-text {
  cursor: pointer;
}
.search_list_level2 {
  /* padding-left: 20px; */
  text-align: left;
  padding-left: 45px;
}
.search_list_level2.active {
  display: block;
}
.search_list_level2 .aty-col {
  text-align: left;
  height: 30px;
  line-height: 30px;
  color: #6b6b6c;
  font-size: 12px;
}
.add_or_reduce_score {
  text-align: center;
}
.gray_panel {
  background-color: #f6f8fb;
  padding: 15px;
  height: 100%;
  /* height: 580px;
          overflow: hidden; */
}
.gray_panel2 {
  background-color: #f6f8fb;
  padding: 15px;
  overflow: hidden;
  border: 1px solid #e7eef5;
  margin-top: 20px;
  margin-bottom: 20px;
}
.checkbox_all {
  float: left;
}
.opera_row {
  height: 32px;
  line-height: 32px;
}
.aty-scroll {
  background-color: transparent;
}
.aty-btn-primary {
  color: #fff;
  background-color: #00ccbb;
  border-color: #00ccbb;
}
.aty-row {
  margin: 0;
}
.search_area {
  margin-top: 15px;
}
.aty-region-center .aty-scroll-1 {
  height: 100%;
  border: none;
}
.fd-day-record e.aty-region-center {
  overflow: hidden;
}
.title1 {
  background: url(../../assets/images/bg-title1.png) no-repeat;
  height: 40px;
  margin: 0;
}
.title1 span {
  float: left;
  width: 14%;
  color: #fff;
  padding-left: 20px;
  font-size: 18px;
  line-height: 35px;
}
.title1 div {
  float: left;
  background-color: #d1ebff;
  height: 35px;
  width: 86%;
  border-radius: 0 10px 10px 0;
}
.title1 .aty-icon {
  margin-left: 10px;
  cursor: pointer;
}
.title2 {
  background: url(../../assets/images/bg-title2.png) no-repeat;
  height: 40px;
  margin: 0;
}
.title2 span {
  float: left;
  width: 39%;
  color: #fff;
  padding-left: 20px;
  font-size: 18px;
  line-height: 35px;
}
.title2 div {
  float: left;
  background-color: #d1ebff;
  height: 35px;
  width: 61%;
  border-radius: 0 10px 10px 0;
}
.aty-region-west {
  padding-right: 20px;
}
.btm-btns {
  text-align: center;
}
.aty-btn-success {
  background-color: #188aff;
  border: 1px solid #188aff;
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
.fd-jbsc {
  height: 32px;
  line-height: 32px;
}
.fd-zfxm {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  word-break: break-word;
  white-space: nowrap;
  display: block;
}
.aty-btn-primary:hover {
  background-color: #0fdbca;
  border-color: #0fdbca;
}
.search_list_level2 .aty-col.lianhao-person {
  text-align: center;
}
.search_list_level2 .aty-col.lianhao-person .aty-icon {
  vertical-align: middle;
}
.search_list_level2 .last {
  position: relative;
}
.search_list_level2 .last:before {
  width: 20px;
  height: 30px;
  position: absolute;
  top: 0;
  left: -20px;
  background: #f6f8fb url(../../assets/images/rjz-line-last.png) no-repeat 5px 0;
}
.search_list_level1 .aty-col.toggle-icon {
  text-align: center;
  cursor: pointer;
}
.search_list_level1 .aty-col.delete-icon .table_butn {
  margin-left: 8px;
}
  .fd-files-list .delete-icon {
    cursor: pointer;
  }
  .hy-button {
    margin-right:15px;
  }
  .fd-data-item {
    width: 98%;
  }
</style>
