<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap">
      <div class="main_name"><aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
      <div class="main_box fd-day-record">
        <aty-modal :mask-closable="false" title="审批流程" footer-hide closable="" ref="splcWindow" width="650" class="window-splc">
          <aty-panel>
            <aty-row class='fd-liucheng-title'>
              <aty-col span='12' class="fd-time">
                <aty-text>时间节点</aty-text>
              </aty-col>
              <aty-col span='12' class='fd-lc'>
                <aty-text>审批进展</aty-text>
              </aty-col>
            </aty-row>
          </aty-panel>
          <aty-row v-for="(item,index) in splcData" :key="index" class="fd-liucheng-item">
            <aty-col span='8' class="fd-time">
              <aty-text v-text="timeFormat(item.updateTime)" class="fd-time-title"></aty-text>
            </aty-col>
            <aty-col span='16' class='fd-lc' :class="{on:index == 0}">
              <aty-text v-text="'【'+item.clr+'】'+(item.clyj != undefined && item.clyj != ''?item.clyj:item.dqbzmc)"
                        class="fd-lc-title"></aty-text>
               <aty-text class="fd-bz" v-text="(item.bz != undefined && item.bz != ''?'备注:'+item.bz:'')"></aty-text>
            </aty-col>
          </aty-row>
        </aty-modal>
        <aty-modal :mask-closable="false" title="合议记录" footer-hide closable="" ref="hyjlWindow" width="670">
          <aty-panel class="pop_main_box fd-sp-modal">
            <aty-row class="fd-sp-row">
              <aty-col span="5" class="fd-sp-col1">合议时间：</aty-col>
              <aty-col class="fd-sp-col2" span="7">
                <aty-text v-text="dateFormat"></aty-text>
              </aty-col>
              <aty-col span="5" class="fd-sp-col1">地点：</aty-col>
              <aty-col class="fd-sp-col2" span="7">
                <aty-text v-text="formItem.hydd"></aty-text>
              </aty-col>
            </aty-row>
            <aty-row class="fd-sp-row">
              <aty-col span="5" class="fd-sp-col1">主持人：</aty-col>
              <aty-col class="fd-sp-col2" span="7">
                <aty-text v-text="formItem.zccMc"></aty-text>
              </aty-col>
              <aty-col span="5" class="fd-sp-col1">记录人：</aty-col>
              <aty-col class="fd-sp-col2" span="7">
                <aty-text v-text="formItem.jlrMc"></aty-text>
              </aty-col>
            </aty-row>
            <aty-row class="fd-sp-row">
              <aty-col span="5" class="fd-sp-col1">备注：</aty-col>
              <aty-col class="fd-sp-col2" span="19">
                <aty-text v-text="formItem.bz"></aty-text>
              </aty-col>
            </aty-row>
            <aty-row class="fd-sp-row">
              <aty-col span="5" class="fd-sp-col1">{{formItem.czJfkhXzmjLx}}：</aty-col>
              <aty-col class="fd-sp-col2" span="19">
                <aty-text v-text="formItem.jfkhxzmjMc"></aty-text>
              </aty-col>
            </aty-row>
            <aty-row class="fd-sp-row">
              <aty-col span="5" class="fd-sp-col1">参加人员：</aty-col>
              <aty-col class="fd-sp-col2" span="19">
                <aty-text v-text="formItem.cjryMc"></aty-text>
              </aty-col>
            </aty-row>
            <aty-row v-if="formItem.qxryList != null && formItem.qxryList.length != 0" class="fd-sp-row">
              <aty-col span="5">
                <aty-text :text="'缺席人员：'" class="hy-fond-size"></aty-text>
              </aty-col>
              <aty-col span="19">
                <aty-table :pageable-data="formItem.qxryList" height="150" border>
                  <aty-table-column v-if="false" prop="qxry" width="70px" label="缺席人员"></aty-table-column>
                  <aty-table-column prop="qxryXm" width="190px" label="姓名"></aty-table-column>
                  <aty-table-column prop="qxyy" label="缺席原因"></aty-table-column>
                </aty-table>
              </aty-col>
            </aty-row>
            <aty-row class="fd-sp-row">
              <aty-col span="5" class="fd-sp-col1">合议记录：</aty-col>
              <aty-col class="fd-sp-col2" span="18">
                <aty-button class="fd-btn-blue fd-save-clause" text="导出" @click="viewExportHy()"></aty-button>
              </aty-col>
            </aty-row>
            <aty-row class="fd-upload" v-if="hyFiles.length > 0">
              <aty-col span="19" class="fd-files">
                <span class="fd-attach">相关附件：</span>
                <template>
                  <ul class="fileList">
                    <li v-for="(item,index) in hyFiles" :key="index">
                      <aty-link :text="item.entityName" :href="item.url" target="_self" class="a_color"></aty-link>
                    </li>
                  </ul>
                </template>
              </aty-col>
            </aty-row>
          </aty-panel>
        </aty-modal>
        <aty-region-layout :border=false>
          <aty-region-north class="fd-top" :height="40" :border=false>
            <aty-button class="search_option_butn1" type="primary" @click="dayRecord">
              <i><img src="../../assets/images/menu.png"></i>
              <span>日记载列表</span>
            </aty-button>
          </aty-region-north>
          <!-- 左侧筛选start -->
          <aty-region-west :width="365" :border=false>
            <aty-scroll :speed="53" class="aty-scroll-1" ref="filterScroll" :show="false">
            <aty-panel class='gray_panel'>
                <aty-panel class="fd-data-item">
                  <aty-panel class="search_list_level1" v-if="item.zfbh !== ''&&item.from == ''"
                             v-for="(item,index) in waitChoosePersonLevel1" :key="index">
                    <aty-row>
                      <aty-col span="2">
                        <aty-icon type="android-person" size="20"></aty-icon>
                      </aty-col>
                      <aty-col span="10">
                        <aty-text :class="item.zt == '102' ? 'fd-back-status':''" text="text" v-text="item.zfbh"
                                  @click="zfbhClick(item,index)">
                        </aty-text>
                      </aty-col>
                      <aty-col span="8">
                        <aty-text :title="item.zfxm" class="fd-zfxm" text="text" v-text="item.zfxm"
                                  @click="zfbhClick(item,index)">
                        </aty-text>
                      </aty-col>
                      <aty-col span="4">
                        <aty-icon v-if="item.zt != undefined && item.zt != '0'" class="icon-liucheng" size="30"
                                  @click="viewSplc(item)" title="查看审批日志"></aty-icon>
                        <aty-icon v-if="item.zt == '103'" class="icon-wenshu"
                                  size="30" @click="viewSpws(item)" title="查看文书"></aty-icon>
                      </aty-col>
                    </aty-row>
                    <aty-panel class="search_list_level2">
                      <aty-row v-if="waitChoosePerson[index*5+1] != undefined && waitChoosePerson[index*5+1].zfbh !== ''">
                        <aty-col span="2">
                          <aty-icon class="tree-icon" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="2">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text :class="waitChoosePerson[index*5+1].zt == '102' ? 'fd-back-status':''" text="text"
                                    v-text="waitChoosePerson[index*5+1].zfbh"
                                    @click="zfbhClick(waitChoosePerson[index*5+1],index*5+1)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text :title="waitChoosePerson[index*5+1].zfxm" class="fd-zfxm" text="text"
                                    v-text="waitChoosePerson[index*5+1].zfxm"
                                    @click="zfbhClick(waitChoosePerson[index*5+1],index*5+1)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="4">
                          <aty-icon class="icon-liucheng" size="30" v-if="waitChoosePerson[index*5+1].zt != undefined &&
                          waitChoosePerson[index*5+1].zt != '0' && waitChoosePerson[index*5+1].khlx != '10' &&
                          waitChoosePerson[index*5+1].khlx != '11'"
                                    @click="viewSplc(waitChoosePerson[index*5+1],index*5+1)" title="查看审批日志"></aty-icon>
                          <aty-icon  v-if="waitChoosePerson[index*5+1].zt == '103' &&
                          waitChoosePerson[index*5+1].khlx != '10' && waitChoosePerson[index*5+1].khlx != '11'"
                                     class="icon-wenshu" size="30" @click="viewSpws(waitChoosePerson[index*5+1],index*5+1)"
                                     title="查看文书"></aty-icon>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChoosePerson[index*5+2] != undefined && waitChoosePerson[index*5+2].zfbh !== ''">
                        <aty-col span="2">
                          <aty-icon class="tree-icon" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="2">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text :class="waitChoosePerson[index*5+2].zt == '102' ? 'fd-back-status':''"
                                    text="text" v-text="waitChoosePerson[index*5+2].zfbh"
                                    @click="zfbhClick(waitChoosePerson[index*5+2],index*5+2)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text :title="waitChoosePerson[index*5+2].zfxm" class="fd-zfxm" text="text"
                                    v-text="waitChoosePerson[index*5+2].zfxm"
                                    @click="zfbhClick(waitChoosePerson[index*5+2],index*5+2)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="4">
                          <aty-icon class="icon-liucheng" size="30" v-if="waitChoosePerson[index*5+2].zt != undefined &&
                          waitChoosePerson[index*5+2].zt != '0' && waitChoosePerson[index*5+2].khlx != '10' &&
                          waitChoosePerson[index*5+2].khlx != '11'"
                                    @click="viewSplc(waitChoosePerson[index*5+2],index*5+2)" title="查看审批日志">
                          </aty-icon>
                          <aty-icon  v-if="waitChoosePerson[index*5+2].zt == '103' &&
                          waitChoosePerson[index*5+2].khlx != '10' && waitChoosePerson[index*5+2].khlx != '11'"
                                     class="icon-wenshu" size="30" @click="viewSpws(waitChoosePerson[index*5+2],index*5+2)"
                                     title="查看文书"></aty-icon>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChoosePerson[index*5+3] != undefined && waitChoosePerson[index*5+3].zfbh !== ''">
                        <aty-col span="2">
                          <aty-icon class="tree-icon" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="2">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text :class="waitChoosePerson[index*5+3].zt == '102' ? 'fd-back-status':''"
                                    text="text" v-text="waitChoosePerson[index*5+3].zfbh"
                                    @click="zfbhClick(waitChoosePerson[index*5+3],index*5+3)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text class="fd-zfxm" :title="waitChoosePerson[index*5+3].zfxm" text="text"
                                    v-text="waitChoosePerson[index*5+3].zfxm"
                                    @click="zfbhClick(waitChoosePerson[index*5+3],index*5+3)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="4">
                          <aty-icon class="icon-liucheng" size="30" v-if="waitChoosePerson[index*5+3].zt != undefined &&
                          waitChoosePerson[index*5+3].zt != '0' && waitChoosePerson[index*5+3].khlx != '10' &&
                          waitChoosePerson[index*5+3].khlx != '11'"
                                    @click="viewSplc(waitChoosePerson[index*5+3],index*5+3)" title="查看审批日志">
                          </aty-icon>
                          <aty-icon  v-if="waitChoosePerson[index*5+3].zt == '103' &&
                          waitChoosePerson[index*5+3].khlx != '10' && waitChoosePerson[index*5+3].khlx != '11'"
                                     class="icon-wenshu" size="30" @click="viewSpws(waitChoosePerson[index*5+3],index*5+3)"
                                     title="查看文书"></aty-icon>
                        </aty-col>
                      </aty-row>
                      <aty-row v-if="waitChoosePerson[index*5+4] != undefined && waitChoosePerson[index*5+4].zfbh !== ''">
                        <aty-col span="2">
                          <aty-icon class="tree-icon" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="2">
                          <aty-icon type="android-person" size="20"></aty-icon>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text :class="waitChoosePerson[index*5+4].zt == '102' ? 'fd-back-status':''"
                                    text="text" v-text="waitChoosePerson[index*5+4].zfbh"
                                    @click="zfbhClick(waitChoosePerson[index*5+4],index*5+4)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="8">
                          <aty-text class="fd-zfxm" :title="waitChoosePerson[index*5+4].zfxm" text="text"
                                    v-text="waitChoosePerson[index*5+4].zfxm"
                                    @click="zfbhClick(waitChoosePerson[index*5+4],index*5+4)">
                          </aty-text>
                        </aty-col>
                        <aty-col span="4">
                          <aty-icon class="icon-liucheng" size="30" v-if="waitChoosePerson[index*5+4].zt != undefined &&
                          waitChoosePerson[index*5+4].zt != '0' && waitChoosePerson[index*5+4].khlx != '10' &&
                          waitChoosePerson[index*5+4].khlx != '11'"
                                    @click="viewSplc(waitChoosePerson[index*5+4],index*5+4)" title="查看审批日志">
                          </aty-icon>
                          <aty-icon  v-if="waitChoosePerson[index*5+4].zt == '103' &&
                          waitChoosePerson[index*5+4].khlx != '10' && waitChoosePerson[index*5+4].khlx != '11'"
                                     class="icon-wenshu" size="30" @click="viewSpws(waitChoosePerson[index*5+4],index*5+4)"
                                     title="查看文书">
                          </aty-icon>
                        </aty-col>
                      </aty-row>
                    </aty-panel>
                  </aty-panel>
                </aty-panel>
            </aty-panel>
            </aty-scroll>
          </aty-region-west>
          <!-- 左侧筛选end -->
          <aty-region-center :border=false>
            <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5">
              <div class="fd-scroll-box">
                <div class="fd-title fd-hyjl-title" level="2">
                  <div class="fd-title-item1">
                        <span>事件录入
                        </span>
                  </div>
                  <div class="fd-title-item2">
                        <span class="item" @click="changeEventStatus"
                              :class="{collapse : status.eventWriteStatus}">
                          {{status.eventWriteStatus ? "收起":"展开"}}
                        </span>
                  </div>
                  <aty-text class="fd-hyjl-link" @click="getHyjlbh">
                    合议记录
                  </aty-text>
                </div>
                <aty-panel class="fd-sjlr-panel" v-show="status.eventWriteStatus">
                  <table>
                    <tr>
                      <td class="label">
                        <label>发生日期</label>
                      </td>
                      <td width='50%'>
                        <aty-text v-text="fsrqFormat"></aty-text>
                      </td>
                      <td class="label">
                        <label>发生地点</label>
                      </td>
                      <td width='50%'>
                        <aty-text v-text="rjzFormData.fsdd"></aty-text>
                      </td>
                    </tr>
                    <tr>
                      <td class="label">
                        <label>事件描述</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="rjzFormData.sjmc"></aty-text>
                      </td>
                    </tr>
                  </table>
                </aty-panel>
                <div class="fd-title" level="2">
                  <div class="fd-title-item1 fd-bjzf-item1">
                        <span :title="realChoosePersonName.join('、')">编辑罪犯：
                          <font v-if='index<4&&item!=null' v-for="(item,index) in realChoosePersonName" :key='index'
                                v-text="(index>3?'':(index==0?'':'、')+item)"></font>
                          <font v-text="realChoosePersonName.length>4?'...':''"></font>
                        </span>
                  </div>
                  <div class="fd-title-item2 fd-bjzf-item2">
                    <span class="item" @click="showBjzfEvent"
                          :class="{collapse : showBjzf}">{{showBjzf ? "收起":"展开"}}</span>
                  </div>
                </div>
                <aty-panel class="gray_panel2" v-show="showBjzf">
                  <table>
                    <tr>
                      <td class="label">
                        <label>类型</label>
                      </td>
                      <td width='50%'>
                        <aty-text v-text="lxSelectDataShow"></aty-text>
                      </td>
                      <td class="label">
                        <label>考核部分</label>
                      </td>
                      <td width='50%'>
                        <aty-text v-text="khxmSelectDataShow"></aty-text>
                      </td>
                    </tr>
                    <tr>
                      <td class="label">
                        <label>主要事由</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="rjzFormData.zysy"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.qj!=undefined && rjzFormData.qj!=''">
                      <td class="label">
                        <label>情节</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="qjSelectDataShow"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="khyjText!=undefined && khyjText!=''">
                      <td class="label">
                        <label>考核依据</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="khyjText"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.khlx=='5'">
                      <td class="label">
                        <label>处理意见</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="clyjSelectDataShow"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.yjfs != undefined && rjzFormData.yjfs != ''">
                      <td class="label">
                        <label>分数</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="rjzFormData.yjfs"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'">
                      <td class="label">
                        <label>禁闭期限</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="jbqx"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.khlx==5&&rjzFormData.clyj==3">
                      <td class="label">
                        <label>禁闭时长</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="rjzFormData.jbts"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.khlx=='5'">
                      <td class="label">
                        <label>违反监狱法</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="wfjyflxSelectDataShow"></aty-text>
                      </td>
                    </tr>
                    <tr v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'">
                      <td class="label">
                        <label>健康状况</label>
                      </td>
                      <td colspan="3">
                        <aty-text v-text="rjzFormData.jkzk"></aty-text>
                      </td>
                    </tr>
                  </table>
                  <aty-row class="fd-upload" v-show="showBjzf && rjzFormData.files.length > 0">
                    <aty-col span="19" class="fd-files">
                      <span class="fd-attach">相关附件：</span>
                      <template>
                        <ul class="fileList">
                          <li v-for="(item,index) in rjzFormData.files" :key="index">
                            <aty-link :text="item.entityShowname" @click="downLoadFile(item.bh)" target="_self"
                                      class="a_color"></aty-link>
                          </li>
                        </ul>
                      </template>
                    </aty-col>
                  </aty-row>
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
export default {
    data: function() {
        return {
            breadcrumbdata: [
                {
                    name: '日记载'
                },
                {
                    name: '日记载列表',
                    href: '/dayRecord'
                },
                {
                    name: '日记载详情',
                    href: ''
                }
            ],
            isChrome: false, // 是否是chrome浏览器
            isSafari: false, // 是否是safari浏览器
            // 合议表单
            formItem: {
                hysj: "", // 合议时间
                hydd: "", // 合议地点
                zccMc: "",// 主持人名称
                jlrMc: "",// 记录人名称
                计分考核民警:"全体民警",
                jfkhxzmjMc:"",
                cjryMc: "", // 参加人员名称
                jfkh: "" // 计分考核
            },
            formateData: {
                //临时模板
                bh: "", //日记载主键
                hyjlBh: "", //合议记录编号
                hyzt: "", //合议状态
                zfxxbh: "", //罪犯信息主键x
                zfbh: "", //罪犯编号
                zfxm: "", //罪犯姓名
                szxz: "", //小组
                gz: "", //工种
                from: "", //监督人
                to: [] //被监督人
            },
            splcData: [],

            khxmSelectDataShow: [],
            lxSelectDataShow: [],
            qjSelectDataShow: [],
            clyjSelectDataShow: [],
            wfjyflxSelectDataShow: [],
            status: {
                eventWriteStatus: true, //事件录入展开收起状态
                secendShow: false //连坐罪犯控制显示
            },
            khyjText: "",
            //罪犯列表
            waitChoosePerson: [],
            //右侧日记载表单信息
            rjzFormData: {
                //日记载表单
                //字段
                hyjlBh:"",//合议记录编号
                zfxxBh: "", //罪犯信息编号
                fsrq: "", //发生日期
                fsdd: "", //发生地点
                sjmc: "", //事件描述
                khlx: "", //考核类型
                khxm: "", //考核部分
                zysy: "", //主要事由
                qj: "", //情节
                khyj: "", //考核依据
                clyj: "", //处理意见
                yjfs: "", //建议分数
                jbts: "", //禁闭时长
                jbksrq: "", //禁闭开始日期
                jbjsrq: "", //禁闭结束日期
                wfjyflx: "", //违反监狱法类型
                jkzk: "", //健康状况
                qxjcfx: "", //取消基础分项
                files: [], //预览附件，
            },
            //合议附件
            hyFiles: [],
            showBjzf:true
        };
    },
    computed: {
        dateFormat: function() {
            var date = this.formItem.hysj;
            if (date == "" || date == undefined) {
                return;
            }
            var date2 = date.replace(/-/g, "/").substr(0, 10);
            var date3 = new Date(date2);

            var year = date3.getFullYear()
            var month = date3.getMonth() + 1 < 10 ? ('0' + (date3.getMonth() + 1)) : (date3.getMonth() + 1)
            var day = date3.getDate() < 10 ? ('0' + date3.getDate()) : date3.getDate()

            var newDateT = year + "-" + month + "-" + day;
            return newDateT;
        },
        jbts: function() {
            var returnData;
            if (
                ((this.rjzFormData.jbksrq == undefined ||
                    this.rjzFormData.jbksrq == "") &&
                    this.rjzFormData.jbjsrq == undefined) ||
                this.rjzFormData.jbjsrq == ""
            ) {
                returnData = "";
            } else {
                returnData =
                    (new Date(this.rjzFormData.jbjsrq) -
                        new Date(this.rjzFormData.jbksrq)) /
                    86400000+1;
            }
            return returnData;
        },
        jbqx:function(){
          var _this = this
          var returnArr = '';
          if(_this.rjzFormData.jbksrq != undefined && _this.rjzFormData.jbjsrq != undefined) {
            returnArr = _this.formatDate(_this.rjzFormData.jbksrq.replace(/-/g, "/").substr(0, 10))+' - '
            +_this.formatDate(_this.rjzFormData.jbjsrq.replace(/-/g, "/").substr(0, 10))
          }
          return returnArr;
        },
        fsrqFormat: function() {
          var _this = this
          var newDateT = this.rjzFormData.fsrq;
          if(newDateT != undefined) {
            newDateT = newDateT.replace(/-/g, "/").substr(0, 10);
          }
          var newDate = new Date(newDateT);

          var year = newDate.getFullYear()
          var month = newDate.getMonth() + 1 < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1)
          var day = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate()

          var newDateT = year + "-" + month + "-" + day;
          return newDateT
        },
        /**
         *
         */
        realChoosePersonName: function() {
            var returnArr = [];
            for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
                if (
                    this.waitChoosePerson[i].zfbh != "" &&
                    this.waitChoosePerson[i].checked
                ) {
                    returnArr.push(this.waitChoosePerson[i].zfxm);
                }
            }
            return returnArr;
        },
        /**
         *
         */
        realChoosePerson: function() {
            var returnArr = [];
            for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
                if (
                    this.waitChoosePerson[i].zfbh != "" &&
                    this.waitChoosePerson[i].checked
                ) {
                    returnArr.push(this.waitChoosePerson[i]);
                }
            }
            return returnArr;
        },
        /**
         *
         */
        waitChoosePersonLevel1: function() {
            var returnArr = [];
            for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
                if (this.waitChoosePerson[i].from == "") {
                    returnArr.push(this.waitChoosePerson[i]);
                }
            }
            return returnArr;
        }
    },

    methods: {
       /**
     * 收缩显示编辑罪犯模块
     */
      showBjzfEvent(){
         this.showBjzf=!this.showBjzf
         this.$nextTick(function(){
           this.$refs.scroll.update()
         })
      },
            /**
       * @name 工具：格式化日期
       * @param {any} comeTime
       * @description
       */
      formatDate(comeTime) {
        var newDate = comeTime;
        //解决IE的转换问题
        if(newDate == undefined || newDate == '' || newDate == null) {
          return '';
        }
        if("string" == typeof(newDate)){
          if(newDate.length > 10) {
            newDate = newDate.substr(0,10);
          }
          if(newDate.indexOf("-") > -1) {
            newDate = new Date(newDate.replace(/-/g, "/"));
          } else {
            newDate = new Date(newDate);
          }
        }
        var year = newDate.getFullYear()
        var month = newDate.getMonth() + 1 < 10 ? ('0' + (newDate.getMonth() + 1)) : (newDate.getMonth() + 1)
        var day = newDate.getDate() < 10 ? ('0' + newDate.getDate()) : newDate.getDate()

        var newDateT = year + "-" + month + "-" + day;
        return newDateT;
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
         timeFormat: function(time) {
            if (time == "" || time == undefined) {
                return;
            }
            var date2 = time.split(".")[0].replace("-", "/");
            var date3 = new Date(date2);

            var seperator1 = "-";

            var month = date3.getMonth() + 1;
            var strDate = date3.getDate();
            var hour = date3.getHours();
            var minute = date3.getMinutes();
            var seconds = date3.getSeconds();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (hour >= 0 && hour <= 9) {
                hour = "0" + hour;
            }
            if (minute >= 0 && minute <= 9) {
                minute = "0" + minute;
            }
            if (seconds >= 0 && seconds <= 9) {
              seconds = "0" + seconds;
            }
            var currentdate =
                date3.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hour + ':' +minute+ ':' +seconds;
            return currentdate;
        },
        // 格式化时间
        downLoadFile: function(bh) {
            var _this = this;
            var sUrl = "/jfkh/api/v1/system/downloadFileByEntityBh/" + bh;
            if (/(iP)/g.test(navigator.userAgent)) {
                alert(
                    "Your device does not support files downloading. Please try again in desktop browser."
                );
                return false;
            }

            if (_this.isChrome || _this.isSafari) {
                //Creating new link node.
                var link = document.createElement("a");
                link.href = sUrl;

                if (link.download !== undefined) {
                    var fileName = sUrl.substring(
                        sUrl.lastIndexOf("/") + 1,
                        sUrl.length
                    );
                    link.download = fileName;
                }

                if (document.createEvent) {
                    var e = document.createEvent("MouseEvents");
                    e.initEvent("click", true, true);
                    link.dispatchEvent(e);
                    return true;
                }
            }

            // Force file download (whether supported by server).
            if (sUrl.indexOf("?") === -1) {
                sUrl += "?download";
            }

            window.open(sUrl, "_self");
            return true;
        },
        //查看审批流程
        viewSplc(item) {
            let _this = this;
            var params = {
                ywBh: item.bh
            };
            _this
                .postRequest("/api/v1/sp/selectSprzList", params)
                .then(resp => {
                    if (resp && resp.status == 200) {
                        _this.splcData = resp.data.ArrayList;
                        _this.$refs.splcWindow.open();
                    }
                });
        },
        //查看文书
        viewSpws(item) {
            let _this = this;
            var ywbh = item.bh;
            var ztbh = item.zfbh.trim();
            var ywlb = "rjz";
            var zt = item.zt;
            if (zt == "103") {
                if (item.hasOwnProperty("wsmc") &&item.wsmc != undefined &&item.wsmc != null &&item.wsmc != "") {
                    var wsmc = item.wsmc;
                    let url =_writ.base_path+"/view/" +ztbh +"/" +ywlb +"/" +ywbh +"/" +wsmc;
                    window.open(url);
                } else {
                    _this.getRequest("/api/v1/rjz/viewRjzSpws/" + ywbh).then(resp => {
                            if (resp &&resp.status == 200) {
                              _this.getRequest("/api/v1/rjz/getWsmcBybh/" + ywbh +"/" + ztbh).then(resp => {
                                if(resp &&resp.status == 200) {
                                  wsmc = resp.data;
                                  let url = _writ.base_path+"/view/" +ztbh +"/" +ywlb +"/" +ywbh +"/" +wsmc;
                                  window.open(url);
                                } else {
                                  Artery.message.info("暂无文书！");
                                }
                              });
                            } else {
                                Artery.message.info("生成文书失败，请重试或联系管理人员！");
                            }
                        });
                }
            } else {
                Artery.message.info("待审批结束方可查看！");
            }
        },
        editPersonToList() {
            var _this = this;
            var newWaitChoosePerson = [];

            var formateData = JSON.parse(JSON.stringify(_this.formateData));

            var arryLen = _this.waitChoosePersonLevel1.length;

            for (var i = 0; i < arryLen; i++) {
                var level2Count = _this.waitChoosePersonLevel1[i].to.length;
                var zfbh = _this.waitChoosePersonLevel1[i].zfbh;

                newWaitChoosePerson.push(_this.waitChoosePersonLevel1[i]);

                for (var j = 0; j < _this.waitChoosePerson.length; j++) {
                    if (_this.waitChoosePerson[j].from == zfbh) {
                        newWaitChoosePerson.push(_this.waitChoosePerson[j]);
                    }
                }
                formateData.from = zfbh;
                while (level2Count < 4) {
                    newWaitChoosePerson.push(formateData);
                    level2Count++;
                }
            }
            // _this.waitChoosePerson = newWaitChoosePerson

            for (var k = 0; k < newWaitChoosePerson.length; k++) {
                _this.$set(_this.waitChoosePerson, k, newWaitChoosePerson[k]);
            }
        },
        // 获取重新排序后，当前操作的项目index
        getIndexFromEdit: function(bh) {
            var _this = this;
            for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
                if (_this.waitChoosePerson[i].bh == bh) {
                    return i;
                }
            }
        },
         // 获取重新排序后，当前操作的项目index
        getObjFromEdit: function(bh) {
            var _this = this;
            for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
                if (_this.waitChoosePerson[i].bh == bh) {
                    return  _this.waitChoosePerson[i]
                }
            }
        },
        getKhyjData: function(params) {
            var _this = this;
            if(params == undefined || params == "" || params == null) {
              _this.khyjText = "";
              return;
            }
            if (params == undefined) {
                return;
            } else {
                params = params.replace(/\//g,"-");
                this.getRequest("/api/v1/tkwh/getTkByTkbh/" + params)
                    .then(resp => {
                        if (resp.status == 200) {
                            var _resData = resp.data;
                            if (
                                _resData.tkbh != undefined &&
                                _resData.tknr != undefined
                            ) {
                                _this.khyjText =
                                    _resData.tkbh + "-" + _resData.tknr;
                            }
                        }
                    })
                    .catch(function(error) {
                        Artery.message.error("网络异常，请重试！");
                    });
            }
        },
        getHyjlbh: function() {
            var _this = this;
            _this.hyFiles = [];
            var hyjlBh = _this.rjzFormData.hyjlBh;
            if(_this.rjzFormData.hyjlBh==undefined || _this.rjzFormData.hyjlBh=='' || _this.rjzFormData.khlx == '2'
              || _this.rjzFormData.khlx == '9') {
                Artery.message.info("没有合议记录");
                return;
            }
            this.getRequest("/api/v1/hy/getHyByBh/" + hyjlBh)
                .then(resp => {
                    if (resp && resp.status == 200) {
                        if(resp.data == "" || resp.data == null) {
                          Artery.message.info("没有合议记录");
                          return;
                        }
                        _this.formItem = resp.data;
                        _this.formItem.hysj = resp.data.hysj;
                        _this.formItem.hydd = resp.data.hydd;
                        if(_this.formItem.fileList && _this.formItem.fileList != null && _this.formItem.fileList.length > 0){
                            for (var i=0;i< _this.formItem.fileList.length;i++){
                                let fileVo = _this.formItem.fileList[i];
                                fileVo.url = "/jfkh/api/v1/system/downloadFileByEntityBh/" + _this.formItem.fileList[i].bh;
                                _this.hyFiles.push(_this.formItem.fileList[i]);
                            }
                        } else {
                            _this.hyFiles = [];
                        }
                        this.$refs.hyjlWindow.open();
                    } else {
                        Artery.message.error("查询合议记录出错,请重试！");
                    }
                })
                .catch(function(error) {
                    Artery.message.error("网络异常，请重试！");
                });
        },
        splcShow: function() {
            this.$refs.qxjcfWindow.open();
        },
        /**
         * 事件录入展开收起效果
         */
        changeEventStatus: function() {
            this.status.eventWriteStatus = !this.status.eventWriteStatus;
            this.$refs.scroll.update()
        },
        setData: function() {
            let _this = this;

            if (typeof _this.$route.query.zfListMap != "string") {
                localStorage.setItem(
                    "dayRecordDetail",
                    JSON.stringify(_this.$route.query)
                );
            }
            var zfList = JSON.parse(localStorage.getItem("dayRecordDetail"))
                .zfListMap.zfRjzList;
            var rjzBhList = JSON.parse(localStorage.getItem("dayRecordDetail"))
                .zfListMap.rjzBhList;
            if (zfList && rjzBhList) {
                _this.waitChoosePerson = zfList;
                for (var i = 0; i < _this.waitChoosePerson.length; i++) {
                    //回填 罪犯列表信息
                    _this.$set(_this.waitChoosePerson[i], "selectable", false);
                    _this.$set(_this.waitChoosePerson[i], "checked", false);
                    if (
                        _this.waitChoosePerson[i].from != undefined &&
                        _this.waitChoosePerson[i].from != null
                    ) {
                        _this.$set(
                            _this.waitChoosePerson[i],
                            "from",
                            _this.waitChoosePerson[i].from
                        );
                        _this.$set(_this.waitChoosePerson[i], "to", []);
                    } else if (
                        _this.waitChoosePerson[i].to != undefined &&
                        _this.waitChoosePerson[i].to != null
                    ) {
                        _this.$set(
                            _this.waitChoosePerson[i],
                            "to",
                            _this.waitChoosePerson[i].to
                        );
                        _this.$set(_this.waitChoosePerson[i], "from", "");
                    } else {
                        _this.$set(_this.waitChoosePerson[i], "from", "");
                        _this.$set(_this.waitChoosePerson[i], "to", []);
                    }
                }
                var obj = {
                    bh: rjzBhList[0]
                };
                _this.relationRebuid()
                _this.editPersonToList();
                var index = _this.getIndexFromEdit(rjzBhList[0]);
                //点击显示罪犯日记载的详细信息
                _this.zfbhClick(_this.getObjFromEdit(rjzBhList[0]), index);
            }
            _this.$nextTick(function(){
                _this.$refs.filterScroll.update()
            })
        },
        relationRebuid(){
        var _this = this
        var wp = _this.waitChoosePerson
        var len=wp.length
        // 如果有zBh，说明是连坐罪犯，通过主编号，找到主罪犯，将当前对象的bh赋给查到的主罪犯的to
        for(var i=0;i<len;i++){
          if(wp[i].zBh!=''){
            var zfbh = wp[i].zfbh
            for(var j=0;j<len;j++){
              if(wp[j].bh == wp[i].zBh){
                wp[j].to.push(zfbh)
              }
            }
          }
        }
        // 如果有cBh，说明是主罪犯，通过遍历cBh，找到从罪犯，将从罪犯的from赋为当前对象的bh
        for(var k=0;k<len;k++){
          if(wp[k].cBh.length!=0){
            var zfbh2 = wp[k].zfbh
            for(var l = 0,len2=wp[k].cBh.length;l<len2;l++){
              var theCbh = wp[k].cBh[l]
              for(var m = 0;m<len;m++){
                if(wp[m].bh==theCbh){
                  wp[m].from = zfbh2
                }
              }
            }
          }
        }
      },
        /**
         * 点击罪犯编号
         */
        zfbhClick: function(item, index) {
            //点击罪犯编号，如果已经保存，右侧展示数据，没保存过，展示空
            let _this = this;
            if (item.bh && item.bh != null && item.bh != "") {
                _this
                    .getRequest("/api/v1/rjz/getRjzByBh/" + item.bh)
                    .then(resp => {
                        if (resp && resp.status == 200) {
                            // 这里为临时处理，因为会报undefined
                            _this.rjzFormData = {};
                            _this.rjzFormData = resp.data;
                            _this.parseCode();
                            _this.$set(_this.rjzFormData, "uploadFiles", []);
                            //如果单选的话，除自己外所有勾选设置成false
                            if (index != undefined) {
                                for (
                                    var i = 0;
                                    i < _this.waitChoosePerson.length;
                                    i++
                                ) {
                                    if (item.zfbh ===  _this.waitChoosePerson[i].zfbh) {
                                        _this.waitChoosePerson[
                                            i
                                        ].checked = true;
                                    } else {
                                        _this.waitChoosePerson[
                                            i
                                        ].checked = false;
                                    }
                                }
                            }
                            _this.getKhyjData(_this.rjzFormData.khyj);
                        }
                    });
            }
        },
        parseCode() {
          var _this = this;
          var codeTypeList = JSON.parse(localStorage.getItem(_jfkh.normalCodeList));
          // 违反监狱法-下拉数据
          var wfjyflx = codeTypeList["30111016-"+_this.rjzFormData.wfjyflx];
          _this.wfjyflxSelectDataShow = (wfjyflx == undefined?"":wfjyflx.name);
          // 处理意见-下拉数据
          var clyj = codeTypeList["30111004-"+_this.rjzFormData.clyj];
          _this.clyjSelectDataShow = (clyj == undefined?"":clyj.name);
          // 考核类型
          var khlx = codeTypeList["30111001-"+_this.rjzFormData.khlx];
          _this.lxSelectDataShow = (khlx == undefined?"":khlx.name);
          // 考核部分
          var khxm = codeTypeList["30111002-"+_this.rjzFormData.khxm];
          _this.khxmSelectDataShow = (khxm == undefined?"":khxm.name);
          // 情节-下拉数据
          var qj = codeTypeList["30111003-"+_this.rjzFormData.qj];
          _this.qjSelectDataShow = (qj == undefined?"":qj.name);
        },
        //导出合议记录
        viewExportHy: function(){
            var _this = this;
            var hyjlBh = this.rjzFormData.hyjlBh;
            var params = {
                bh: hyjlBh
            }
             _this.postRequest("/api/v1/hy/viewExportHy/",params).then(resp => {
                if (resp && resp.status == 200) {
                    _this.exportHyWs(resp.data.bh, resp.data.wsmc);
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
        let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));
        window.location.href = "/writ/api/v1/writ/hyws/hy/" + hyjlbh + "/" + wsmc + "/word";
      },

    },
    created() {
        let _this = this;
        _this.setData();
        _this.isChrome =
            navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        _this.isSafari =
            navigator.userAgent.toLowerCase().indexOf("safari") > -1;
    },
    mounted(){
        this.$nextTick(function(){
            this.$refs.filterScroll.update()
        })
    }
};
</script>

<style scoped>
.search_list_level1 .aty-text{
  cursor: pointer;
}
.icon-liucheng {
    width: 20px;
    height: 20px;
    background: url(../../assets/images/icon-liucheng.png) center no-repeat;
    cursor: pointer;
}
.icon-wenshu {
    width: 20px;
    height: 20px;
    background: url(../../assets/images/icon-wenshu.png) center no-repeat;
    cursor: pointer;
}
.aty-region-center {
    padding-left: 20px;
}
.fd-sjlr-panel {
    padding: 20px 0;
}
.aty-text.fd-hyjl-link {
    float: right;
    width: auto;
    height:28px;
    line-height:28px;
    padding:0 12px;
    margin:1px 0;
    color: #fff;
    font-weight: normal;
    background:#2a9dff;
    border-radius:3px;
    cursor:pointer;
}
table {
    background-color: #fff;
    width: 100%;
}
table td {
    height: 50px;
    border: 1px solid #d1d6da;
    text-align: center;
}
.label {
    width: 100px;
}
label {
    display: block;
    font-weight: bolder;
    width: 100px;
    text-align: center;
}
.aty-region-west .aty-scroll{
    background-color: #f6f8fb;
}
.gray_panel {
    background-color: #f6f8fb;
    padding: 15px;
    /* height: 580px;
    overflow: hidden; */
}
.aty-scroll
.gray_panel2 {
    background-color: #f6f8fb;
    padding: 15px;
    overflow: hidden;
    border: 1px solid #e7eef5;
    margin-top: 20px;
    margin-bottom: 20px;
}
.title1 {
    background: url(../../assets/images/bg-title1.png) no-repeat;
    height: 40px;
    margin: 0;
    overflow: hidden;
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
.fd-back-status {
    color: red;
}
.tree-icon {
    /* background: url(../../assets/images/icon-tree.png) no-repeat; */
    /* background-position: center; */
    width: 20px;
    height: 20px;
    position:relative;
}
.tree-icon:before{
    content: url(../../assets/images/icon-tree.png);
    display:block;
    width:20px;
    height:41px;
    position:absolute;
    top:-21px;
    left:2px;
}
.fd-data-item .aty-col{
    position:relative;
}
.fd-data-item .aty-panel .aty-row{
   margin-top:0;
   padding-top:15px;
}
.window-splc .aty-panel{
    margin-bottom:35px;
}
.fd-liucheng-item {
    text-align: center;
    font-size: 16px;
    /* height:44px; */
    margin:0;
    /* padding:10px 0; */
    display:table;
    width:100%;

}
.fd-liucheng-item .aty-col{
    display:table-cell;
    font-size:14px;
}
.fd-liucheng-item .aty-col span{
    padding:10px 0;
    font-weight:normal;
}
.fd-liucheng-item .aty-col span.fd-bz{
    padding:5px 0 30px;
}
.fd-liucheng-item .aty-col span.fd-time-title{
    font-size:16px;
}
.fd-liucheng-item .fd-time {
    text-align:right;
    padding-right:10px;
}
.fd-liucheng-item .aty-col span.fd-lc-title{
   font-weight:bold;
}
.fd-liucheng-item .fd-lc {
    text-align:left;
    padding-left:72px;
    position:relative;
    font-weight:bold;
    font-size:16px;
}
.fd-liucheng-item .fd-lc:before{
    content:url(../../assets/images/step.png);
    width:48px;
    height:48px;
    position:absolute;
    top:0;
    left:20px;
    display:block;
    z-index:2;
}
.fd-liucheng-item .fd-lc.on:before{
    content:url(../../assets/images/step-on.png);
    left:10px;
    top:-12px;
}
.fd-liucheng-item .fd-lc:after{
    content:'';
    width:1px;
    height:100%;
    background:#e0e4e7;
    position:absolute;
    top:0;
    left:35px;
    display:block;
    z-index:1;
}
.fd-bz{
    font-size:12px;
    display:block;
}
.fd-liucheng-title {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin: 0px;
    padding: 0px;
    background-color: #f1f5f8;
    border-bottom: 1px solid #188aff;
    text-align: center;
}
  .fd-zfxm {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 90px;
    word-break: break-word;
    white-space: nowrap;
    display: block;
  }
  .fd-upload {
    text-align: left;
  }
  .fileList{
    position: static !important;
    float: left;
    margin-left: 10px;
  }
   .fd-attach{
    float: left;
  }
  .a_color{
    color:#0099ff !important;
  }
  .file {
    cursor: pointer;
    color:#0c79eb;
  }
</style>
