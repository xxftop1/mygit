<template>
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
      <div class="main_box">
        <aty-row class="search_panel">
          <aty-button class="fd-btn-green  fl fd-btn-link" @click="goAddRecordList()">
            <i><img src="../../assets/images/menu.png"></i>
            <span>
            复查复核列表
          </span>
          </aty-button>
        </aty-row>
        <aty-form ref="fcForm" :data="fcForm" class="fcForm" v-if="editPage != 'edit'">
          <aty-row class="fd-bj-panel fd-fc-panel">
            <aty-col span="6" class="search_option_marginb">
              <p class="search_option_text"><i>*</i>事件发生日期：</p>
              <aty-date-picker type="month" v-model="fcForm.startDate" class="dr_date_pick" clearable required
                               :rules="rules.required" :editable="false" :show-message="false"></aty-date-picker>
            </aty-col>
            <aty-col span="6" class="search_option_marginb">
              <p class="search_option_text"><i>*</i>罪犯姓名/编号：</p>
              <aty-input v-model="fcForm.zfbh" class="search_option_input" clearable required :rules="rules.required"
                         :show-message="false"></aty-input>
            </aty-col>
            <aty-col span="6" class="search_option_marginb">
              <p class="search_option_text">复查项：</p>
              <aty-select v-model="fcForm.fcx" class="search_option_input" :data="fcxList" @change="fcxchagne" clearable :show-message="false"></aty-select>
            </aty-col>
            <aty-col span="6" class="search_option_marginb" v-if="khxmShow">
              <p class="search_option_text">考核项目：</p>
              <aty-select v-model="fcForm.khxm" class="search_option_input" :data="khxmList" clearable :show-message="false"></aty-select>
            </aty-col>
          </aty-row>
          <div class="fd-btns-query fd-btn-box" v-if="editPage != 'edit'">
            <aty-button class="search_option_butn1" type="primary" @click="queryDataList()">
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
          </div>
        </aty-form>
        <aty-panel class="fd-sypanel">
          <table class="fd-sytable">
            <tr>
              <td>
                <label>主要事由</label>
              </td>
              <td colspan="7">
                <aty-text v-text="sj.zysy"></aty-text>
              </td>
            </tr>
            <tr>
              <td>
                <label>发生时间</label>
              </td>
              <td>
                <aty-text v-text="sj.fsrq"></aty-text>
              </td>
              <td>
                <label>类型</label>
              </td>
              <td>
                <aty-text v-text="sj.khlx"></aty-text>
              </td>
              <td>
                <label>考核项目</label>
              </td>
              <td>
                <aty-text v-text="sj.khxm"></aty-text>
              </td>
              <td>
                <label>原处理意见</label>
              </td>
              <td>
                <aty-text v-text="sj.clyj"></aty-text>
              </td>
            </tr>
          </table>
        </aty-panel>
        <aty-row class="fd-form-fc fd-sqsj">
          <aty-col span="6">
            <aty-form-item label="申请时间" :label-width="100" class="required">
              <aty-date-picker v-model="sqsj" class="cc_date_pick" type="date" clearable :editable="false" ref="sqsj"
                               :show-message="false"></aty-date-picker>
            </aty-form-item>
          </aty-col>
        </aty-row>
        <aty-textarea class="cc_textarea" label="申请理由" :max="500" v-model="sqly" :label-width="100" required
                      :autosize="{minRows:4,maxRows:20}"  :maxlength="500" ref="sqly" :show-message="false"
                      placeholder="请输入"></aty-textarea>
        <aty-row class="fd-upload">
          <aty-upload class="upload"
                      :multiple="true" label="相关附件："
                      :label-width="100" prop="label"
                      :min="20" action="#"
                      :before-upload="handleUpload"
                      :show-message="true" accept=".doc,.docx,.pdf,.jpg,.jpeg,.bmp,.png,.xls,.xlsx"
                      :show-upload-list="true" @on-exceeded-size="exceededSizeEvent">
            <aty-button type="ghost" class="fd-btn-green fd-btn-upload">
              <i><img src="../../assets/images/upload.png"></i>
              上传
            </aty-button>
          </aty-upload>
          <template>
            <aty-progress :stroke-width="5" v-if="barVisiable != false" :percent="precent" prop="#"
                          class="fd-fc-progress"></aty-progress>
            <ul class="fileList">
              <li v-for="(item,index) in bjFiles" :key="index">
                <aty-text :text="item.name"></aty-text>
                <aty-text @click="openAttachModal(index)">
                  <aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon>
                </aty-text>
              </li>
            </ul>
          </template>
          <!--编辑按钮原先的附件-->
          <aty-panel class="delFile ylfiles" v-for="(item,index) in ylfiles" :key="index" v-if="editPage == 'edit'">
            <aty-text v-text="item.entityName"></aty-text>
            <aty-text @click="openDeleteModal(item.bh,index)">
              <aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon>
            </aty-text>
          </aty-panel>
        </aty-row>
        <aty-panel class="btm-btns">
          <aty-button text="保存" class="fd-btn-blue fd-save-clause" @click="saveButn">
            <i>
              <img src="../../assets/images/save.png">
            </i>
            <span>保存</span>
          </aty-button>
          <aty-button text="保存" class="fd-btn-blue fd-save-clause" @click="saveUpButn">
            <span>保存并呈报</span>
          </aty-button>
        </aty-panel>
      </div>
    <!-- </aty-scroll> -->
    </happy-scroll>
    <aty-modal ref="modalWidiow5" width="1200px" closable :footer-hide="true" title="查询" :mask-closable="false">
      <div v-if="khxmShow">
        <aty-table :pageable-data="rs1" v-if="khxmShow" :exp-all="false" :exp-current-page="false">
          <aty-table-column width="50" label="序号" type="index" :showOverflowTooltip="false"></aty-table-column>
          <aty-table-column prop="zfxm" label="罪犯姓名" width="143"></aty-table-column>
          <aty-table-column prop="zfbh" label="罪犯编号" width="139"></aty-table-column>
          <aty-table-column prop="khlx" label="复查项" :formatter="fcxzh" width="139"></aty-table-column>
          <aty-table-column prop="khxm" label="考核项目" :formatter="khxzh" width="139"></aty-table-column>
          <aty-table-column prop="zysy" label="主要事由" width="139"></aty-table-column>
          <aty-table-column prop="fsrq" label="发生时间" width="139"></aty-table-column>
          <aty-table-column prop="clyj" label="原处理意见" width="139"></aty-table-column>
          <aty-table-column prop="click" label="操作" :showOverflowTooltip="false" width="139">
            <template slot-scope="props">
              <span class="mmd_span" @click="checkedMian(props)">选择</span>
            </template>
          </aty-table-column>
        </aty-table>
      </div>
      <div v-else>
        <aty-table :pageable-data="rs2" width="100%" :exp-all="false"  :exp-current-page="false">
          <aty-table-column prop="date" width="50" label="序号" type="index"></aty-table-column>
          <aty-table-column prop="address" label="复查项" :formatter="fcxzh"></aty-table-column>
          <aty-table-column prop="address" label="奖励月份"></aty-table-column>
          <aty-table-column prop="address" label="奖励类型" :formatter="jllxzh"></aty-table-column>
          <aty-table-column prop="click" label="操作">
            <template slot-scope="props">
              <span class="mmd_span" @click="checkedMian(props)">选择</span>
            </template>
          </aty-table-column>
        </aty-table>
      </div>
      <!-- 批量提交 弹窗 -->
      <aty-modal title="提交" footer-hide closable="" ref="pltjWindow" width="500" :mask-closable="false">
        <aty-select v-model="spr" :data="xybspr" label="下一步审批人"></aty-select>
        <aty-button class="search_option_butn1" type="primary" @click="submit">
          <span>确定</span>
        </aty-button>
      </aty-modal>
      <!-- 批量提交 弹窗 -->
      <aty-modal title="删除附件" class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach" closable width="400"
                 @on-ok="deleteUploadFile" :mask-closable="false">
        <aty-text text="确定要删除此附件？"></aty-text>
      </aty-modal>
      <aty-modal title="删除附件" class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach1" closable width="400"
                 @on-ok="delFile" :mask-closable="false">
        <aty-text text="确定要删除此附件？"></aty-text>
      </aty-modal>
    </aty-modal>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script>
  import loading from '../base/loading'
  export default {
    components: {
      loading:loading
    },
    data: function () {
      return {
        breadcrumbdata: [
          {
            name: '复查复核',
            href: "/reviewCheckList"
          },
          {
            name: '新增复查',
            href: '/reviewCheck/checkCreate'
          }
        ],
        isLoading:false,
        barVisiable: false, //进度条
        precent: 0,
        loadingStatus: false, //按钮上传状态
        sj: {
          zysy: "",
          fsrq: "",
          khlx: "",
          khxm: "",
          clyj: "",
          khlxCode:"",
          khxmCode:''
        },
        select1: [],
        fcForm: {
          // 复查事件范围 开始 - 结束
          startDate: '',
          // endDate: '',
          // 罪犯编号/姓名
          zfbh: '',
          // 复查项
          fcx: '',
          // 考核项目
          khxm: '',
        },
        zysy: "",
        fsrq: "",
        clyj: "",
        fcxList: [
          {
            code: '4',
            name: '加分'
          },
          {
            code: '3',
            name: '扣分'
          },
          {
            code: '5',
            name: '单项处罚'
          },
          {
            code: '6',
            name: '专项加分'
          },
          {
            code: '2',
            name: '训诫'
          },
          {
            code: '7',
            name: '奖励'
          },
          {
            code: '9',
            name: '暂外违规'
          },
        ],
        // 申请时间
        sqsj: new Date(),
        // 申请理由
        sqly: '',
        //附件列表
        bjFiles: [],
        ylfiles: [], //预览附件
        rs1: [],
        rs2: [],
        khxmShow: true,
        editPage: "",
        bh: '',
        //审批人
        spr: "",
        //审批人假数据
        xybspr: [],
        rules: {
          required: [
            {
              required: true,
              message: '该项为必填'
            }
          ]
        },
        zfxxbh: '',
        store: null,
        attachIndex: '',
        deleteFile: {
          index: '',
          bh: ''
        },
        curTask: '',
        tqBh: '',
        /*日记载编号*/
        rjzBh:''
      };
    },
    watch:{
      sqly:function(val,oldVal){
        // this.$refs.scroll.update()
      }
    },
    methods: {
      openAttachModal(index) {
        this.$refs.attach.open()
        this.attachIndex = index
      },
      openDeleteModal(bh,index) {
        this.$refs.attach1.open()
        this.deleteFile.index = index
        this.deleteFile.bh = bh
      },
      exceededSizeEvent() {
        Artery.message.info({
            content:"上传文件不能超过200M",
            duration:3
        });
      },
      // 跳转列表页
      goAddRecordList() {
        this.$router.push({path: '/reviewCheckList'});
      },
      //复查项转换
      fcxzh: function (row, column) {
        var key = "30111001-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      //考核项目转换
      khxzh: function (row, column) {
        var key = "30111002-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      //奖励类型转换
      jllxzh: function (row, column) {
        var key = "30111005-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      //单项处罚转换
      dxcfzh: function (row, column) {
        var key = "30111004-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      },
      fcxchagne() {
        if (this.fcForm.fcx === '7') {
          this.khxmShow = false
        } else {
          this.khxmShow = true
        }
      },
      checkedMian(props) {
        //弹框内选择事件
        let index = props.$index;
        this.sj = this.rs1[index];
        this.sj .khlxCode = this.rs1[index].khlx;
        this.sj.khxmCode=this.rs1[index].khxm;
        this.sj.khlx = this.fcxzh(this.sj.khlx, "");
        this.sj.khxm = this.khxzh(this.sj.khxm, "");
        this.zfxxbh = this.rs1[index].zfxxbh;
        this.rjzBh =  this.rs1[index].rjzbh;
        this.$refs.modalWidiow5.close();
      },
      handleUpload: function (f) {
        var _this = this;
        this.bjFiles.push(f);
        // this.$refs.scroll.update()
        return false;
      },
      endDateChange(value, name) {
        this.fcForm.endDate = this.camputeDate(value);
      },
      startDateChange(value, name) {
        this.fcForm.startDate = this.camputeDate(value);
        this.createMonthList();
      },
      //  重置
      reSet() {
        this.fcForm.startDate = '';
        this.fcForm.endDate = '';
        this.fcForm.zfbh = '';
        this.fcForm.fcx = '';
        this.fcForm.khxm = '';
      },
      // 查询
      queryDataList() {
        this.rs1 = [];
        this.rs2 = [];
        this.$refs.fcForm.validate(function (valid) {
          if (!valid) {
            return
          }
        })
        if (this.fcForm.startDate == '') {
          Artery.message.info({
            content:"请选择复查日期",
            duration:3
          });
          return;
        }
        if (this.fcForm.zfbh == '') {
          Artery.message.info({
            content:"罪犯姓名/编号不能为空",
            duration:3
          });
          return;
        }
        var params = {
          fckssj: this.fcForm.startDate,
          // fcjssj: this.fcForm.endDate,
          zfbh: this.fcForm.zfbh,
          fcx: this.fcForm.fcx,
          khxm: this.fcForm.khxm,
        }
        this.rs1 = [];
        this.rs2 = [];
        this.getRequest("/api/v1/fcfh/getZfRjzInfo/getZfRjzParams", params).then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.hasOwnProperty('ArrayList') && resp.data.ArrayList != "" && resp.data.ArrayList.length >= 1) {
              this.rs1 = [];
              this.rs2 = [];
              if (this.fcForm.fcx == 7) {
                for (var i = 0; i < resp.data.ArrayList.length; i++) {
                  resp.data.ArrayList[i].fsrq = resp.data.ArrayList[i].fsrq.substr(0, 10);
                  this.rs2.push(resp.data.ArrayList[i])
                }
              } else {
                for (var i = 0; i < resp.data.ArrayList.length; i++) {
                  resp.data.ArrayList[i].fsrq = resp.data.ArrayList[i].fsrq.substr(0, 10);
                  var data = resp.data.ArrayList[i];
                  if (data.khlx === '3') {
                    data.clyj = "扣" + data.yjfs + "分";
                  } else if (data.khlx === '4') {
                    data.clyj = "加" + data.yjfs + "分";
                  } else if (data.khlx === '6') {
                    data.clyj = "加" + data.yjfs + "分";
                  } else if (data.khlx === '2') {
                    data.clyj = "训诫";
                  } else if (data.khlx === '5') {
                    data.clyj = this.dxcfzh(data.clyj,null);
                  } else if (data.khlx === '9') {
                    data.clyj = this.fcxzh(data.khlx,null);
                    data.clyj = "扣" + data.yjfs + "分";
                  }
                  this.rs1.push(data)
                }
              }
            }
            this.$refs.modalWidiow5.open();
          }
        })
      },
      // 保存
      saveButn() {
        // 保存校验
        if (this.sj.zysy == '' && this.sj.fsrq == '' && this.sj.khlx == '' && this.sj.khxm == '' && this.sj.clyj == '') {
          Artery.message.info({
             content:"请先进行查询并选择一个复查项目",
             duration:3
          });
          return;
        }
        if (this.sqsj == '') {
          Artery.message.info({
              content:"申请时间不能为空",
              duration:3
          });
          this.$refs.sqsj.blur()
          return;
        }
        if (this.sqly == '') {
          Artery.message.info({
              content:"申请理由不能为空",
              duration:3
          });
          this.$refs.sqly.blur()
          return;
        }
        let formData = new FormData();
        if (this.editPage == "edit") {
          let editParams = {
            fcfh: {
              sqsj: this.sqsj,
              sqly: this.sqly,
              bh: this.bh,
              zt: this.store.fcfh.zt
            }
          };
          formData.append("fc", JSON.stringify(editParams));
        } else {
          let params = {
            fcfh: {
              sqsj: this.sqsj,
              sqly: this.sqly,
              fcx: this.sj.khlxCode,
              zfxxBh: this.zfxxbh,
              fcrq:this.fcForm.startDate,
              rjzBh:this.rjzBh,
              lx: "1"
            },
            fcmx: {
              lx: this.sj.khlxCode,
              khxm: this.sj.khxmCode,
              yclyj: this.sj.clyj,
              fssj: this.sj.fsrq,
              zysy: this.sj.zysy
            }
          };
          formData.append("fc", JSON.stringify(params));
        }
        //开始文件上传
        for (let i = 0; i <= this.bjFiles.length; i++) {
          formData.append("files", this.bjFiles[i]);
        }
        this.isLoading=true
        if (this.tqBh == "") {
          this.uploadFileRequest("/api/v1/fcfh/saveFc", formData).then(resp => {
            if (resp && resp.status == 200) {
              this.isLoading=false
              Artery.message.info("保存成功");
              //保存后跳转到待办页面
              this.$router.push({path: "/reviewCheckList"});
            } else {
              setTimeout(function(){
                this.isLoading=false
              },6000)
              Artery.message.error({
                  content:"保存失败",
                  duration:3
              });
            }
          });
        } else {
          this.isLoading=false
          Artery.message.info("保存成功");
          //保存后跳转到待办页面
          this.$router.push({path: "/reviewCheckList"});
        }
      },
      // 保存并呈报
      saveUpButn() {
        // 保存校验
        if (this.sj.zysy == '' && this.sj.fsrq == '' && this.sj.khlx == '' && this.sj.khxm == '' && this.sj.clyj == '') {
          Artery.message.info({
               content:"请先进行查询并选择一个复查项目",
               duration:3
          });
          return;
        }
        if (this.sqsj == '') {
          Artery.message.info({
              content:"申请时间不能为空",
              duration:3
          });
          this.$refs.sqsj.blur()
          return;
        }
        if (this.sqly == '') {
          Artery.message.info({
              content:"申请理由不能为空",
              duration:3
          });
          this.$refs.sqly.blur()
          return;
        }
        let formData = new FormData();
        var yspr = "";
        if (this.spr != '' && this.spr != null) {
          yspr = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userId;
        }
        if (this.editPage == "edit") {
          let editParams = {
            fcfh: {
              sqsj: this.sqsj,
              sqly: this.sqly,
              bh: this.bh,
              dqspr: this.spr,
              // yspr: yspr,
              zt: this.store.fcfh.zt,
              taskId: this.store.fcfh.taskid,
              lx: "1"
            }
          };
          formData.append("fc", JSON.stringify(editParams));
        } else {
          let params = {
            fcfh: {
              sqsj: this.sqsj,
              sqly: this.sqly,
              fcx: this.sj.khlxCode,
              zfxxBh: this.zfxxbh,
              fcrq:this.fcForm.startDate,
              dqspr: this.spr,
              rjzBh:this.rjzBh,
              lx: "1"
            },
            fcmx: {
              lx: this.sj.khlxCode,
              khxm: this.sj.khxmCode,
              yclyj: this.sj.clyj,
              fssj: this.sj.fsrq,
              zysy: this.sj.zysy
            }
          };
          formData.append("fc", JSON.stringify(params));
        }
        for (let i = 0; i <= this.bjFiles.length; i++) {
          formData.append("files", this.bjFiles[i]);
        }
        //编辑的参数
        var xybSprParams = {
          curTaskId: "",
          spAuthority: "jy.imp.jfkh.splc.fcfhsp.",
          corpId: JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).corpId
        };
        var tjParam = {
          bh: this.tqBh,
          lx: "1"
        }

        let _this = this;
        this.isLoading=true;
        try {
          //第一次保存并呈报、编辑保存并呈报
          if (_this.tqBh == "") {
            _this.uploadFileRequest("/api/v1/fcfh/saveFc", formData).then(resp => {
              if (resp && resp.status == 200) {
                _this.tqBh = resp.data;
                tjParam.bh = _this.tqBh;
                //编辑保存并呈报不用在开启流程
                let tjstatus = false;
                try {
                  if (_this.store.fcfh.taskid  && _this.store.fcfh.taskid !=undefined && _this.store.fcfh.taskid !="") {
                    tjstatus = true;
                  }
                }catch (e) {

                }
                if (tjstatus) {
                  xybSprParams.curTaskId = _this.store.fcfh.taskid;
                  _this.xybSpr(xybSprParams);
                } else {
                  //获取下一步审批人,先开启提请流程，返回taskId
                  _this.getRequest("/api/v1/fcfh/fjqMjTj/", tjParam).then(resp => {
                    if (resp && resp.status == 200) {
                      if (resp.data.id) {
                        _this.curTask = resp.data;
                        xybSprParams.curTaskId = _this.curTask.id;
                        _this.xybSpr(xybSprParams);
                      }
                    }
                  });
                }
              }
            });
          } else {
            //多次点击保存并呈报
            _this.xybSpr(xybSprParams);
          }
        } catch (e) {
          setTimeout(function(){
            _this.isLoading=false
          },6000)
          Artery.message.error({
              content:"保存并呈报失败",
              duration:3
          });
        }
      },
      //获取下一步审批人
      xybSpr(xybSprParams) {
        let _this = this;
        if (xybSprParams.curTaskId == "") {
          _this.getRequest("/api/v1/fcfh/getFcfhTaskByBh/" + _this.tqBh).then(resp => {
            if (resp && resp.status == 200) {
              if (resp.data != undefined && resp.data != "") {
                xybSprParams.curTaskId = resp.data
                _this.getRequest("/api/v1/system/getTaskNextSprs/", xybSprParams).then(resp => {
                  if (resp && resp.status == 200) {
                    _this.xybspr = [];
                    _this.xybspr = resp.data;
                    _this.isLoading=false;
                    _this.$refs.pltjWindow.open();
                  }
                });
              }
            }
          });
        } else {
          _this.getRequest("/api/v1/system/getTaskNextSprs/", xybSprParams).then(resp => {
            if (resp && resp.status == 200) {
              _this.xybspr = [];
              _this.xybspr = resp.data;
              _this.isLoading=false;
              _this.$refs.pltjWindow.open();
            }
          });
        }
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
        let formData = new FormData();
        let _this = this;
        //更新业务表的审批相关信息
        var yspr = "";
        if (this.spr != '' && this.spr != null) {
          yspr = JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userId;
        }
        //退回编辑保存并呈报
        if (this.editPage == "edit" && this.store.fcfh.taskid != undefined) {
          if (this.store.fcfh.zt ==='102') {
            let tuParams = {
              fcfh:{
                bh: this.bh,
                dqspr: this.spr,
                yspr: yspr,
                zt: this.store.fcfh.zt,
                taskId: this.store.fcfh.taskid,
                lx: "1"
              }
            };
            formData.append("fcfh", JSON.stringify(tuParams));
          } else {
            //编辑的保存并呈报
            let params = {
              fcfh: {
                bh: _this.tqBh,
                dqspr: _this.spr,
                yspr: yspr,
                lx: "1"
              },
              task: {
                id:this.store.fcfh.taskid,
                taskDefinitionKey:this.store.fcfh.spjdkey,
              }
            };
            formData.append("fcfh", JSON.stringify(params));
          }
        } else {
          let params = {
            fcfh: {
              bh: _this.tqBh,
              dqspr: _this.spr,
              yspr: yspr,
              lx: "1"
            },
            task: _this.curTask
          };
          formData.append("fcfh", JSON.stringify(params));
        }
        this.isLoading=true
        _this.postRequest("/api/v1/fcfh/cbFcfh", formData).then(resp => {
          if (resp && resp.status == 200) {
            this.isLoading=false
            Artery.message.info("保存并呈报成功");
            _this.$refs.pltjWindow.close();
            //保存后跳转到待办页面
            _this.$router.push({path: "/reviewCheckList"});
          } else {
            setTimeout(function(){
              _this.isLoading=false
            },6000)
            Artery.message.error({
                content:"保存并呈报失败",
                duration:3
            });
          }
        });
      },
      /**
       * 删除文件
       */
      delFile: function () {
        this.deleteRequest("/api/v1/system/deleteFile/" + this.deleteFile.bh).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("删除成功");
            this.ylfiles.splice(this.deleteFile.index, 1);
            this.$refs.attach1.close()
            this.$nextTick(function(){
              // this.$refs.scroll.update()
            })
          }
        });
      },
      /**
       * 删除上传文件
       */
      deleteUploadFile: function () {
        this.bjFiles.splice(this.attachIndex, 1);
        this.$refs.attach.close()
        // this.$refs.scroll.update()
      },
      //考核类型转换
      khlxZh: function (row, column) {
        var key = "30111001-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name : "") : "";
      }
    },
    computed: {
      //考核项目
      khxmList() {
        return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111002"];
      },
    },
    mounted() {
      // this.$refs.scroll.update()
    },
    created() {
      //编辑页面
      this.store = JSON.parse(localStorage.getItem("checkEditData"))
      if (this.store) {
        this.editPage = this.store.edit;
      }
      if (this.editPage && this.editPage == "edit") {
        this.breadcrumbdata[1].name="复查编辑"
        this.bh = this.store.fcfh.bh;
        for (var i = 0; i < this.store.files.length; i++) {
          this.ylfiles.push(this.store.files[i])
        }
        this.sj.zysy = this.store.fcfh.zysy;
        this.sj.fsrq = this.store.fcfh.fsrq;
        this.sj.khlx = this.store.fcfh.fcx;
        if (this.sj.khlx != '' && this.sj.khlx != null) {
          this.sj.khlx = this.khlxZh(this.sj.khlx, '');
        }
        this.sj.khxm = this.store.fcfh.khxm;
        if (this.sj.khxm != '' && this.sj.khxm != null) {
          this.sj.khxm = this.khxzh(this.sj.khxm, "");
        }
        this.sj.clyj = this.store.fcfh.yclyj;
        this.sqsj = this.store.fcfh.sqsj;
        this.sqly = this.store.fcfh.sqly;
      }
    }
  };
</script>
<style scoped>
  .fd-sqsj {
    margin-bottom: 15px;
  }

  .fd-form-fc .required .sty-form-item-required {
    width: 100%;
    left: 0;
  }

  .fd-fc-progress {
    margin-left: 100px;
  }

  .fd-btns-query {
    padding-right: 10px;
    width: 200px;
    text-align: center;
  }

  .fd-btn-box {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    /*bottom:25px;*/
    height: 32px;
    top: 62px;
  }

  .fd-btn-box .aty-btn {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .fd-btn-box .aty-btn i,
  .fd-btn-box .aty-btn span {
    position: relative;
    top: -2px;
  }

  .fd-btn-box .search_option_butn2 {
    border: 1px solid #188aff;
    color: #188aff;
  }

  .fcForm {
    height: 120px;
    position: relative;
  }

  .fd-fc-panel {
    height: 104px;
    margin-top: 0;
    margin-bottom: 15px;
  }
  .fd-fc-panel .search_option_text {
    display: inline-block;
    width: 120px;
    text-align: right;
    height: 100%;
    position: absolute;
    top: 0;
    left: 20px;
    /* left: 32px; */
  }

  .fd-fc-panel .search_option_text i {
    color: red;
  }

  .fd-fc-panel .aty-form-item-content,
  .fd-fc-panel .aty-date-picker {
    width: 100%;
  }

  .fd-fc-panel .dr_date_pick,
  .fd-fc-panel .search_option_input,
  .fd-fc-panel .search_option_input {
    width: calc(100% - 152px);
    position: absolute;
    top: 0;
    left: 140px;
    right: 0;
  }

  .fd-fc-panel.aty-row .aty-col {
    position: relative;
    height: 32px;
    line-height: 32px;
    /* padding: 0px 32px; */
    margin: 10px 0px;
  }

  .fd-form-fc {
    padding-top: 5px;
  }

  .btm-btns {
    text-align: center;
  }

  .fd-sypanel {
    background-color: #f5f8fb;
    border: 1px solid #e7eef5;
    padding: 20px;
  }

  .fd-sytable {
    width: 100%;
  }

  .fd-sytable td {
    border: 1px solid #d1d6da;
    background-color: #fff;
    height: 45px;
    line-height: 45px;
    text-align: center;
    width: 12.5%;
  }

  .fd-sytable td label {
    color: #333333;
    font-weight: bolder;
  }

  .required .search_option_text:before {
    content: "*";
    color: red;
    padding-right: 5px;
  }

  input.es_table_input {
    width: 80%;
    margin: auto;
    text-align: center;
  }

  input.es_table_input.bz-input {
    text-align: left;
  }

  .punish {
    float: left;
    padding-left: 126px;
  }

  /* .search_option_box .search_option_text {
      display: inline-block;
      width: 126px;
      text-align: right;
      height: 100%;
      position: absolute;
      top: 0;
      left: 32px;
  } */
  /* .search_option_input,
  .required .aty-form-item-required,
  .search_option_box .aty-date-picker {
      width: calc(100% - 190px);
      position: absolute;
      top: 0;
      left: 158px;
      right: 0;
  } */
  .fd-search-btn {
    text-align: right;
  }

  .fd-bj-row.aty-row .aty-col-span-6 {
    /* padding-right:65px; */
    padding: 0 32px;
    position: relative;
    height: 32px;
    line-height: 32px;
    margin: 10px 0;
  }

  .fd-bj-row.aty-row .aty-col-span-24 {
    /* padding-right:65px; */
    padding: 0 32px;
    position: relative;
    height: 32px;
    line-height: 32px;
    margin: 10px 0;
  }

  .fd-bj-row.aty-row .aty-radio-group {
    float: left;
    padding-left: 136px;
  }

  .fd-bj-row.aty-row .aty-radio-wrapper {
    margin-right: 42px;
  }

  .search_panel .aty-btn img {
    margin-right: 5px;
    margin-top: -2px;
  }

  .score-row {
    line-height: 20px;
    padding-left: 90px;
    text-align: left;
  }

  .fd-score-list {
    margin: 0 -10px 20px;
  }

  .fd-score-list.aty-row {
    text-align: left;
  }

  .fd-score-list.aty-row h3 {
    line-height: 40px;
    border-bottom: 1px solid #e7eef5;
    padding: 0 20px;
  }

  .score {
    color: #f16868;
  }

  .fd-score-list .aty-col {
    /* height:115px;
      background:#f5f8fb;
      border:1px solid #e7eef5; */
    padding: 0 10px 10px;
  }

  .fd-score-list .score-inner {
    height: 115px;
    background: #f5f8fb;
    border: 1px solid #e7eef5;
  }

  .fd-score-list .aty-col .aty-form-item {
    margin: 20px 0;
    padding: 0 20px;
    height: 35px;
    line-height: 35px;
  }

  .fd-upload {
    text-align: left;
  }

  .fd-score-list .score-input {
    position: relative;
  }

  .search_option_box .aty-input {
    height: 34px;
  }

  .search_option_box .search_option_text {
    display: inline-block;
    /* width: 21%; */
    text-align: left;
  }

  .search_option_box .aty-date-picker {
    width: 65%;
  }

  .search_option_input {
    width: 65%;
  }

  .search_option_marginb {
    margin-bottom: 21px;
    padding-left: 20px;
    height: 32px;
  }

  .cc_date_pick {
    text-align: left;
  }

  .cxtj {
  }

  .cxtj > div {
    float: left;
    display: flex;
    height: 40px;
    line-height: 32px;
    width: auto;
  }

  .cxtj .zhi p {
    width: 20px;
  }

  .cxtj div p i {
    color: #ff0000;
  }

  .cxtj > div > p {
    margin: 0 10px;
    width: 100px;
    text-align: right;
  }

  .cxtj > div > p + div {
  }

  .cxcz {
    width: 100%;
    display: flex;
  }

  .cxcz > div {
    width: 200px;
    margin: 20px auto;
  }

  .titleab {
    width: 100%;
    text-align: center;
    background: #0099ff;
    color: #fff;
    line-height: 32px;
  }

  div.jiange {
    width: 100%;
    height: 50px;
  }

  .mmd_span {
    cursor: pointer;
    color: #0c79eb;
  }

  .ylfiles {
    color: #0099ff;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    padding-left: 100px;
    margin-top: -10px;
  }

  .fileList {
    padding: 10px 0 10px 100px;
  }

  .upload {
    margin-bottom: 0px !important;
  }
</style>
