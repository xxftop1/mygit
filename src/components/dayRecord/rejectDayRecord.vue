<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <!-- 删除 确认弹窗 -->
    <loading :isLoading="isLoading"></loading>
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box  fd-day-record">
      <!-- 弹出窗口start -->
      <!-- 取消基础分start -->
      <aty-modal :mask-closable="false" title="取消基础分" footer-hide closable="" ref="qxjcfWindow" width="500" class="fd-qxjcf-modal">
        <aty-checkbox-group name="qxjcf" :data-list="qxjcfSelectData" v-model="rjzFormData.qxjcfSelectedArry"></aty-checkbox-group>
        <aty-button class="search_option_butn1 fd-btn-qxjcf" type="primary" @click="qxjcfConfirm()">
          <span>确定</span>
        </aty-button>
      </aty-modal>
      <!-- 取消基础分end -->
      <!-- 提交弹框start -->
      <aty-modal :mask-closable="false" title="提交" footer-hide closable="" ref="xybsprWindow" width="500" class="xybsp-modal">
        <aty-select transfer v-model="spr" :data="xybsprSelectData" label="下一步审批人"></aty-select>
        <aty-button class="search_option_butn1" type="primary" @click="confirmTijiao()">
          <span>提交</span>
        </aty-button>
      </aty-modal>
      <!-- 提交弹框end -->
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
            <aty-panel class="fd-rjz-person">
              <aty-scroll :speed="53" class="aty-scroll-1" ref="rjzPersonScroll" :show="false">
                <aty-panel class="fd-data-item">
                  <aty-panel class="search_list_level1" v-if="item.zfbh !== ''&&item.from == ''"
                             v-for="(item,index) in waitChoosePerson" :key="index">
                    <aty-row>
                      <aty-col span="2">
                        <aty-icon type="android-person" size="20"></aty-icon>
                      </aty-col>
                      <aty-col span="8">
                        <aty-text text="text" v-text="item.zfbh"></aty-text>
                      </aty-col>
                      <aty-col span="8">
                        <aty-text class="fd-zfxm" text="text" :title="item.zfxm" v-text="item.zfxm"></aty-text>
                      </aty-col>
                    </aty-row>
                  </aty-panel>
                </aty-panel>
              </aty-scroll>
            </aty-panel>
          </aty-panel>
        </aty-region-west>
        <!-- 左侧筛选end -->
        <aty-region-center :border="false">
          <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll1" :show="false">
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
                                       :value="nowDate" :disabled="editStatus=='edit'?true:false" :editable='false'
                                       show-time="" :options="fsrqOption" type="date" clearable></aty-date-picker>
                      <aty-text v-text="fsrqFormat" v-if="editStatus=='view'"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item label="发生地点">
                      <aty-input v-if="editStatus!='view'" :disabled="editStatus=='edit'?true:false"
                                 v-model="rjzFormData.fsdd"></aty-input>
                      <aty-text v-text="rjzFormData.fsdd" v-if="editStatus=='view'"></aty-text>
                    </aty-form-item>
                  </aty-col>
                </aty-row>
                <aty-form-item label="事件描述">
                  <aty-textarea v-if="editStatus!='view'" :disabled="editStatus=='edit'?true:false"
                                v-model="rjzFormData.sjmc" placeholder="" :autosize="{minRows:4,maxRows:8}"></aty-textarea>
                  <aty-text v-text="rjzFormData.sjmc" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
              </aty-form>
            </aty-panel>
            <div class="fd-title">
              <div class="fd-title-item1 fd-bjzf-item1">
                <span :title="realChoosePersonName.join('、')">编辑罪犯：
                        <font v-if='index<4&&item!=null' v-for="(item,index) in realChoosePersonName" :key='index'
                              v-text="(index>3?'':(index==0?'':'、')+item)"></font>
                        <font v-text="realChoosePersonName.length>4?'...':''"></font>
                      </span>
              </div>
              <div class="fd-title-item2 fd-bjzf-item2"></div>
            </div>
            <aty-panel class="gray_panel2">
              <aty-form :label-width="100" ref="form2">
                <aty-row>
                  <aty-col>
                    <aty-radio-group v-model="rjzFormData.khlx" :disabled="true" name="type"
                                     :data-list="khlxSelectData" label="类型" class="aty-form-item-required">
                    </aty-radio-group>
                  </aty-col>
                  <aty-col>
                    <aty-radio-group v-model="rjzFormData.khxm" :disabled="true" name="type"
                                     :data-list="khxmSelectData" label="考核部分" class="aty-form-item-required fd-khxm-radio">
                    </aty-radio-group>
                  </aty-col>
                </aty-row>
                <aty-form-item label="主要事由" class="aty-form-item-required ">
                  <aty-input v-if="editStatus!='view'" v-model="rjzFormData.zysy" placeholder="请填写主要事由"
                             clearable @change="isSaved=false"></aty-input>
                  <aty-text v-text="rjzFormData.zysy" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx != '' && rjzFormData.khlx!='1' && rjzFormData.khlx!='9'"
                               label="情节" class="aty-form-item-required ">
                  <aty-select transfer v-if="editStatus!='view'" v-model="rjzFormData.qj" :data="newQjSelectData"
                              :clearable="rjzFormData.khlx != '3'"  @change="isSaved=false" :disabled="rjzFormData.khlx == '3'"></aty-select>
                  <aty-text v-text="qjSelectDataShow[rjzFormData.qj]" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
                <aty-form-item label="考核依据" :class="rjzFormData.khlx=='1'?'':'aty-form-item-required'">
                  <aty-auto-complete readonly disabled transfer :value="rjzFormData.khyj" ref="khyjRef"
                                     v-if="editStatus!='view'" v-model="rjzFormData.khyj" @change="khyjChange"
                                     :simple="false" placeholder="" remote :remote-method="khyjMethod" :limit=5>
                  </aty-auto-complete>
                  <aty-text v-text="rjzFormData.khyj" v-if="editStatus=='view'"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx=='5'" label="处理意见" class="aty-form-item-required ">
                  <aty-select readonly disabled transfer v-if="editStatus!='view'" v-model="rjzFormData.clyj"
                              :data="clyjSelectData" clearable @change="clyjChange"></aty-select>
                  <aty-text v-if="editStatus=='view'" v-text="rjzFormData.clyj"></aty-text>
                </aty-form-item>
                <aty-row>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.khlx!='2'" label="建议分数" :class="rjzFormData.khlx=='1'?'':'aty-form-item-required'">
                      <aty-input readonly disabled v-if="editStatus!='view'" v-model="rjzFormData.yjfs"
                                 placeholder="请填写建议分数" @change="isSaved=false"></aty-input>
                      <aty-text v-if="editStatus=='view'" v-text="rjzFormData.yjfs"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.khlx!='2'&&rjzFormData.khlx!='1'&& rjzFormData.jyfsfw!=''&&
                    rjzFormData.khyj!=''" label="范围：">
                      <aty-text v-text="rjzFormData.jyfsfw"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col>
                    <aty-form-item v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'" label="禁闭期限" class="aty-form-item-required ">
                      <aty-date-picker  @change="isSaved=false" v-if="editStatus!='view'" v-model="rjzFormData.jbqx"
                                        type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期和时间" clearable>
                      </aty-date-picker>
                      <aty-text v-if="editStatus=='view'" v-text="rjzFormData.jbqx"></aty-text>
                    </aty-form-item>
                  </aty-col>
                  <aty-col v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'&&editStatus!='view'">
                    <aty-form-item label="禁闭时长" class="aty-form-item-required ">
                      <aty-text placeholder="请填写禁闭时长" v-text="jbsc" class="fd-jbsc"></aty-text>
                    </aty-form-item>
                  </aty-col>
                </aty-row>
                <aty-form-item v-if="rjzFormData.khlx=='5'" label="违反监狱法" class="aty-form-item-required ">
                  <aty-select transfer v-if="editStatus!='view'" v-model="rjzFormData.wfjyflx" :data="wfjyfSelectData"
                              clearable  @change="isSaved=false"></aty-select>
                  <aty-text v-if="editStatus=='view'" v-text="rjzFormData.wfjyflx"></aty-text>
                </aty-form-item>
                <aty-form-item v-if="rjzFormData.khlx=='5'&&rjzFormData.clyj=='3'" label="健康状况" class="aty-form-item-required ">
                  <aty-input v-if="editStatus!='view'" v-model="rjzFormData.jkzk" placeholder="请填写健康状况"
                             clearable @change="isSaved=false"></aty-input>
                  <aty-text v-if="editStatus=='view'" v-text="rjzFormData.jkzk"></aty-text>
                </aty-form-item>
                <aty-upload :max-size=5 :rules='rules.uploadFiles' :max=5 :min=0 accept=".doc,.docx,.pdf,.jpg,.jpeg,.bmp,.png,.zip,.rar"
                            :multiple="true" action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
                  <aty-button type="primary" class=" fd-btn-upload">
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
                <aty-form-item>
                  <aty-panel class="delFile" v-for="(item,index) in rjzFormData.files" :key="index">
                    <aty-text v-text="item.entityName"></aty-text>
                    <aty-text  @click="openDeleteModal(index,item.bh)"><aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon></aty-text>
                  </aty-panel>
                  <aty-panel class="delFile" v-if="editStatus!='view'" v-for="(item,index) in rjzFormData.uploadfiles"
                             :key="item.lastModified">
                    <aty-text v-text="item.name"></aty-text>
                    <aty-text  @click="openAttachModal(index)"><aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon></aty-text>
                  </aty-panel>
                </aty-form-item>
              </aty-form>
            </aty-panel>
            <aty-panel class="btm-btns">
              <aty-button v-if="!tijiaoStatus" size="large" type="success" icon="ios-folder" @click="saveRjz">保存
              </aty-button>
              <aty-button v-if="rjzFormData.khlx!='1'&&!isJsb" size="large" type="success" icon="ios-paper" @click="tijiao">提交
              </aty-button>
            </aty-panel>
            </aty-scroll>
          </aty-region-center>
        </aty-region-layout>
      </div>
    </div>
    <!-- 内容部分end -->
</template>

<script>
  import confirmbox from '../confirmBox/confirmBox.vue'
  import loading from '../base/loading'
  export default {
    data: function() {
      return {
        editStatus: "new", //页面状态（"":新增;"edit":编辑;"view":查询）
        isLoading: false, // 蒙版遮罩
        attachIndex: '', //
        deleteFile: {
          index: '',
          bh: ''
        },
        readProp: false, // 查看状态
        tijiaoStatus: false, // 提交状态
        isHeyi: false, // 是否合议
        isSaved:false, // 是否保存
        showConfirm: false, // 弹出框控制
        showConfirm2: false, // 弹出框控制
        showConfirm3: false, // 弹出框控制
        confirmtext: "确认删除所有罪犯么？", // 弹出框内容
        confirmtext2: "确认删除此罪犯么？", // 弹出框内容
        delBh: '', // 删除编号
        delItemS: { //
          item: '',
          index: ''
        },
        level2DelIndex: '',
        breadcrumbdata: [{
            name: '日记载'
          },
          {
            name: '日记载登记',
            href: ''
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
        fsrqOption: { // 发生日期限制条件
          disabledDate: function(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        formateData: { // 初始化右侧模板
          bh: "", //日记载主键
          hyjlBh: "", //合议记录编号
          hyzt: "", //合议状态
          zfxxBh: "", //罪犯信息主键x
          zfbh: "", //罪犯编号
          zfxm: "", //罪犯姓名
          szxz: "", //小组
          gz: "", //工种
          zBh: "", //主罪犯编号
          from: "", //监督人
          cBh: [], //从罪犯编号
          to: [], //被监督人
          khlx: '', //考核类型
          lianhao: false, //连号展示开关
          selectable: false,
          checked: false
        },
        currentPoint: { // 当前节点数据
          currentIndex: 0,
          relationNode: {},
          currentNode: {}
        },
        rjzFormData: { // 右侧日记载表单信息
          zfxxBh: "", // 罪犯信息编号
          fsrq: "", // 发生日期
          fsdd: "", // 发生地点
          sjmc: "", // 事件描述
          khlx: "3", // 考核类型
          khxm: "1", // 考核部分
          zysy: "", // 主要事由
          qj: "", // 情节
          khyj: "", // 考核依据
          khyjOld: '', // 考核依据old
          clyj: "", // 处理意见
          yjfs: "", // 建议分数
          jyfsfw: "", // 建议的分数范围
          jbts: "", // 禁闭时长
          jbqx: [], // 禁闭期限
          jbksrq: "", // 禁闭开始日期
          jbjsrq: "", // 禁闭结束日期
          wfjyflx: "", // 违反监狱法类型
          jkzk: "", // 健康状况
          qxjcfx: "", // 取消基础分项
          qxjcfSelectedArry: [], // 取消基础分下拉数据
          uploadfiles: [], // 上传附件
          files: [], // 预览附件
          fzjldw:0//分值计量单位
        },
        qxjcfSelectData: [ // 取消基础分
          {
            code: "1",
            codeType: "type",
            name: "认罪服法"
          },
          {
            code: "2",
            codeType: "type",
            name: "遵规守纪"
          },
          {
            code: "6",
            codeType: "type",
            name: "联号无违规"
          },
          {
            code: "3",
            codeType: "type",
            name: "生活卫生"
          },
          {
            code: "4",
            codeType: "type",
            name: "教育改造"
          },
          {
            code: "5",
            codeType: "type",
            name: "劳动态度"
          }
        ],
        options1: { // 选择时间范围限制
          disabledDate: function(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        zfbhOrXm: "", // 罪犯查询条件字段
        tempData: [], // 查询罪犯中间列表
        popData: [], // 罪犯中间列表
        waitChoosePerson: [], // 所有罪犯列表
        choosePerson: [], // 勾选的罪犯
        requestData1: [],
        requestData2: [],
        requestData3: [],
        rules: { // 规则
          yjfs: [{
            validator: this.yjfsValidator,
            required: true
          }],
          uploadFiles: [{
            validator: function(rule, value, callback, source, options) {
              if (value.length > 50) {
                callback(new Error("字数不超过50个字"));
              }
              callback();
            },
            required: true
          }],
          address: [{
            validator: function(rule, value, callback, source, options) {
              if (value.length > 50) {
                callback(new Error("字数不超过50个字"));
              }
              callback();
            },
            required: false
          }],
          detail: [{
            validator: function(rule, value, callback, source, options) {
              if (value.length > 200) {
                callback(new Error("字数不超过200个字"));
              }
              callback();
            },
            required: false
          }],
          shiyou: [{
            validator: function(rule, value, callback, source, options) {
              if (value.length > 23) {
                callback(new Error("字数不超过23个字"));
              }
              callback();
            },
            required: true
          }],
          health: [{
            validator: function(rule, value, callback, source, options) {
              if (value.length > 50) {
                callback(new Error("字数不超过50个字"));
              }
              callback();
            },
            required: false
          }],
          unrequire: [{
            required: false,
            validator: function(rule, value, callback, source, options) {
              callback();
            }
          }],
          require: [{
            validator: function(rule, value, callback, source, options) {
              if (value === "") {
                callback(new Error("必填不能为空"));
              }
              callback();
            },
            required: true
          }],
          desc: [{
              required: true,
              message: "请输入描述信息"
            },
            {
              type: "string",
              min: 20,
              message: "描述信息不得少于20个字符"
            }
          ]
        },
        qjSelectData: [], // 情节-下拉数据
        qjSelectDataShow: { // 情节-下拉显示数据
          "1": "轻微",
          "2": "较轻",
          "3": "一般",
          "4": "严重",
          "5": "突出",
          "6": "特别严重",
          "7": "特别突出"
        },
        xybsprSelectData: [], // 下一步审批人-下拉数据
        wfjyfSelectData: [ // 违反监狱法-下拉数据

        ],
        clyjSelectData: [ // 处理意见-下拉数据

        ],
        khlxSelectData: [ //考核类型-下拉数据

        ],
        khxmSelectData: [ // 考核部分-下拉数据

        ],
        /******合议下拉列表数据******/
        zcrList: [], // 主持人-下拉数据
        jlrList: [], // 记录人-下拉数据
        jfkhmjList: [], // 计分考核民警-下拉数据
        cjryList: [], // 参加人员-下拉数据
        spr: "", //下一步审批人
        formItem: { // 合议表单
          hysj: new Date(),
          hydd: "",
          zcc: "",
          jlr: "",
          jfkhxzmj: "",
          cjry: "",
          bhList: []
        },
      };
    },
    components: { // 组件
      confirmbox, // 确认弹窗组件
      loading // 加载中组件
    },
    methods: { // 方法
      /**
       * @name 打开附件弹窗
       * @param {any} index 索引值
       */
      openAttachModal(index) {
        this.$refs.attach.open()
        this.attachIndex = index
      },
      /**
       * @name 打开删除弹窗
       * @param {any} index 索引值
       * @param {any} bh 删除文件编号
       */
      openDeleteModal(index, bh) {
        this.$refs.attach1.open()
        this.deleteFile.index = index
        this.deleteFile.bh = bh
      },
      /**
       * @name 删除所有人员
       * @param {any} flag 标志位
       */
      delAllPerson: function(flag) {
        var _this = this
        if (flag) {
          if (_this.waitChoosePerson.length != 0) {
            if (_this.savedPerson.length != 0) {
              _this.backDataClearList()
            }
            _this.clearList()
            _this.clearFormData()
            _this.rjzFormData.sjmc = ''
            _this.rjzFormData.fsdd = ''
            _this.rjzFormData.fsrq = ''
            _this.editStatus = 'new'
          }
        } else {}
        _this.showConfirm = false
      },
      /**
       * @name 删除主罪犯
       * @param {any} flag 标志位
       */
      delSinglePerson: function(flag) {
        var _this = this
        if (flag) {
          var item = _this.delItemS.item
          var index = _this.delItemS.index
          // this.waitChoosePerson.splice(
          //     index,
          //     1,
          //     JSON.parse(JSON.stringify(this.formateData))
          // );
          //日记载编号存在就删除数据库中的日记载
          if (item.bh != undefined && item.bh != "") {
            _this.backDelZf(item.bh)
          }
          //删除页面的数据（注：只能删索引5个以下的？？？）
          for (var i = 0; i < 5; i++) {
            _this.waitChoosePerson.splice(index * 5, 1);
          }
          _this.delItemS = {}
        } else {}
        _this.showConfirm2 = false
      },
      /**
       * @name 删除连坐罪犯
       * @param {any} flag 标志位
       */
      del2Person: function(flag) {
        var _this = this
        var index = _this.level2DelIndex
        if (flag) {
          //从一级罪犯中去掉to
          //获取当前二级罪犯的from属性
          var from = this.waitChoosePerson[index].from;
          var bh = this.waitChoosePerson[index].bh;
          var zfbh = this.waitChoosePerson[index].zfbh;
          //在当前罪犯的to属性里，找符合的二级罪犯编号，删除下标
          var formateDT = JSON.parse(JSON.stringify(this.formateData))
          formateDT.from = from
          this.waitChoosePerson.splice(index, 1, formateDT);
          //在罪犯to属性不为空的里面找编号是上面二级罪犯from对应的罪犯
          for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
            if (this.waitChoosePerson[i].to != []) {
              if (this.waitChoosePerson[i].zfbh == from) {
                for (var j = 0, len = this.waitChoosePerson[i].to.length; j < len; j++) {
                  if (this.waitChoosePerson[i].to[j] == zfbh) {
                    this.waitChoosePerson[i].to.splice(j, 1);
                    break;
                  }
                }
              }
            }
          }
          if (bh != undefined && bh != "") {
            this.backDelZf(bh)
          }
        } else {}
        _this.showConfirm3 = false
      },
      /**
       * @name 格式化时间
       * @param {any} row
       * @param {any} column
       */
      df: function(row, column) {
        return row != undefined ? row.substr(0, 10) : "";
      },
      /**
       * @name 建议分数处理
       */
      yjfsValidator: function() {
        var _this = this
        var advise = _this.rjzFormData.jyfsfw;
        var value = _this.rjzFormData.yjfs;
        var khlx = _this.rjzFormData.khlx;
        var trueYjfs = parseInt(value);
        if(isNaN(trueYjfs)) {
          return false;
        }
        var fzjldw = _this.rjzFormData.fzjldw; // 分值计量单位
        var flag = false;
        if (khlx == "6") {
          if (value == advise) {
            flag = true;
          }
        } else {
          if (advise.indexOf(",") > -1) {
            var arr = advise.split(",");
            for (var i = 0; i < arr.length; i++) {
              if (value == arr[i]) {
                flag = true;
              }
            }
          } else if (advise.indexOf("-") > -1) {
            var arr = advise.split("-");
            var min = parseInt(arr[0]);
            if(fzjldw > 1) {
              var max = parseInt(arr[1]);
              var n = (max - min)/fzjldw;
              if(n > 0) {
                for(var i=0;i<=n;i++) {
                  if((min+fzjldw*i)==trueYjfs) {
                    flag = true;
                    break;
                  }
                }
              } else if(trueYjfs == min){
                flag = true;
              }
            } else if (fzjldw == 0 || fzjldw == 1) {
              if (trueYjfs >= min && trueYjfs <= max) {
                flag = true;
              }
            }
          } else if ((advise.indexOf(",") == -1 || advise.indexOf("-") == -1) && advise != '') {
            if (value == advise) {
              flag = true;
            }
          } else if (value != '') {
            flag = true;
          } else {
            flag = false;
          }
        }
        if (!flag) {
          // Artery.message.info("分值输入错误！");
        } else {
          return flag
        }
      },
      /**
       * @name 处理意见触发方法
       */
      clyjChange() {
        var _this = this
        if (_this.rjzFormData.clyj == 1) {
          _this.rjzFormData.jyfsfw = '300'
        } else if (_this.rjzFormData.clyj == 2) {
          _this.rjzFormData.jyfsfw = '600'
        } else if (_this.rjzFormData.clyj == 3) {
          _this.rjzFormData.jyfsfw = '900'
        }
        _this.isSaved = false
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
        //加分
        if (khlx == 4) {
          _this.rjzFormData.jyfsfw = value.jffz;
        }
        //扣分
        if (khlx == 3 || khlx == 9) {
          _this.rjzFormData.jyfsfw = value.kffz;
        }
        //专项加分
        if (khlx == 6) {
          _this.rjzFormData.jyfsfw = value.zxjffz;
        }
        //取消教育基础分是手动
        if (value.qxjyjcfx != undefined && value.qxjyjcfx.indexOf("8") > -1) {
          if (_this.rjzFormData.qxjcfSelectedArry == "") {
            //默认遵规守纪和联号无违纪
            _this.rjzFormData.qxjcfSelectedArry = ["2", "6"];
          }
          this.$refs.qxjcfWindow.open();
        }
      },
      /**
       * @name 确认手动选择条款
       */
      qxjcfConfirm() {
        let _this = this;
        var qxjyjcfxArr = _this.rjzFormData.qxjcfSelectedArry;
        if (qxjyjcfxArr != undefined && qxjyjcfxArr.length > 0) {
          for (var i = 0; i < qxjyjcfxArr.length; i++) {
            if ((i + 1) == qxjyjcfxArr.length) {
              _this.qxjcfx += qxjyjcfxArr[i];
            } else {
              _this.qxjcfx += (qxjyjcfxArr[i] + ";");
            }
          }
        }
        this.$refs.qxjcfWindow.close();
      },
      /**
       * @name 动态查询条款
       * @param {any} quert
       * @param {any} callback
       */
      khyjMethod: function(quert, callback) {
        let _this = this;
        var khlx = _this.rjzFormData.khlx;
        var khxm = _this.rjzFormData.khxm;
        if (khlx == undefined || khlx == null || khlx == "") {
          Artery.message.info({
              content:"请选择考核类型！",
              duration:3
          });
          return;
        }
        if (khxm == undefined || khxm == null || khxm == "") {
          Artery.message.info({
              content:"请选择考核部分！",
              duration:3
          });
          return;
        }
        var _data4 = [];
        var params = {
          key: quert,
          tkdymk: khlx,
          khxm: khxm,
        };
        //记事本类型无限制
        if (khlx == "1") {
          params.tkdymk = "";
        }
        _this.postRequest("/api/v1/tkwh/getTkListByParam", params)
          .then(resp => {
            var _resData = resp.data;
            if (_resData == null || _resData == undefined) {
              return
            }
            for (var i = 0; i < _resData.length; i++) {
              var fzjldw = 0;
              if(_resData[i].hasOwnProperty("fzjldw") && _resData[i].fzjldw != null) {
                fzjldw = _resData[i].fzjldw;
              }
              _data4.push({
                id: _resData[i].tkbh,
                name: _resData[i].tkbh + "-" + _resData[i].tknr.slice(0, 85),
                khlx: _resData[i].tkdymk,
                qxjyjcfx: _resData[i].qxjyjcfx,
                jffz: _resData[i].jffz,
                kffz: _resData[i].kffz,
                zxjffz: _resData[i].zxjffz,
                fzjldw: fzjldw
              });
            }
            callback(_data4);
            // if(_this.$refs.khyjRef.currentData.length==0){
            //   _this.rjzFormData.khyj = ''
            //   Artery.message.error("请选择有效考核依据！");
            // }
          })
          .catch(function(error) {
            Artery.message.error({
              content:"网络异常，请重试！",
              duration:3
            });
          });
      },
      /**
       * @name 展开收起
       * @param {any} item
       */
      toggle: function(item) {
        item.toggle = !item.toggle;
        this.$refs.rjzPersonScroll.update()
      },
      /**
       * @name 点击罪犯编号
       * @param {any} item
       * @param {any} index
       */
      zfbhClick: function(item, index) {
        let _this = this;
        //点击罪犯编号，如果已经保存，右侧展示数据，没保存过，展示空
        if (item.bh && item.bh != null && item.bh != "") {
          _this
            .getRequest("/api/v1/rjz/getRjzByBh/" + item.bh)
            .then(resp => {
              if (resp && resp.status == 200) {
                // 这里为临时处理，因为会报undefined
                _this.rjzFormData = {};
                _this.rjzFormData = resp.data;
                _this.$set(_this.rjzFormData, "jbqx", []);
                // _this.$set(_this.rjzFormData, "qj", resp.data.qj);
                // _this.rjzFormData.qj  = resp.data.qj
                _this.$set(_this.rjzFormData, "uploadfiles", []);
                _this.$set(_this.rjzFormData, "khyjOld", resp.data.khyj);
                _this.rjzFormData.jbqx.push(resp.data.jbksrq == undefined ? '' : resp.data.jbksrq.replace(/-/g, "/").substr(0, 10));
                _this.rjzFormData.jbqx.push(resp.data.jbjsrq == undefined ? '' : resp.data.jbjsrq.replace(/-/g, "/").substr(0, 10));
                _this.getKhlxAndKhxm(_this.rjzFormData.khyj, 1)
                if(_this.rjzFormData.khlx == '5'||_this.rjzFormData.khlx == '6'){ // 如果是单项处罚的话
                  _this.clyjChange()
                }
                _this.readProp = true
                //如果单选的话，除自己外所有勾选设置成false
                if (index != undefined) {
                  for (var i = 0; i < _this.waitChoosePerson.length; i++) {
                    if (i == index) {
                      _this.waitChoosePerson[index].checked = true;
                    } else {
                      _this.waitChoosePerson[i].checked = false;
                    }
                  }
                }
                // setTimeout(function(){
                //   // _this.rjzFormData.khyj = _this.$refs.khyjRef.currentData[0].name
                // },100)
                //如果是训诫，扣分，和单项处罚，展示联号框
                // _this.showLh(_this.realChoosePerson[0]);
              }
            });
        } else if (item.hasOwnProperty('jkftzdBs')) {
          // 加扣分通知单
          if (index != undefined) {
            for (var i = 0; i < _this.waitChoosePerson.length; i++) {
              if (i == index) {
                _this.waitChoosePerson[index].checked = true;
              } else {
                _this.waitChoosePerson[i].checked = false;
              }
            }
          }
          _this.rjzFormData.zysy = item.zyss
          _this.rjzFormData.yjfs = item.yjfs
          _this.rjzFormData.khyj = item.khyj
          _this.rjzFormData.fsrq = item.createTime.substr(0, 10)
          _this.readProp = true
          _this.getKhlxAndKhxm(_this.rjzFormData.khyj, 2)
        } else { //普通新增
          _this.rjzFormData.files = []
        }
      },
      /**
       * @name 根据考核依据获取考核类型和考核部分
       * @param {any} khyj
       * @param {any} type
       */
      getKhlxAndKhxm: function(khyj, type) {
        var _this = this
        if (khyj == '') {
          return
        }
        khyj = khyj.replace(/\//g,"-");
        _this
          .getRequest("/api/v1/tkwh/getTkByTkbh/" + khyj)
          .then(resp => {
            if (resp && resp.status == 200) {
              if(resp.data.tknr != undefined){
                _this.rjzFormData.khyj = _this.rjzFormData.khyj + "-" + resp.data.tknr
              }else{
                _this.rjzFormData.khyj = _this.rjzFormData.khyj
              }
              if (type == 2) {
                _this.rjzFormData.khlx = resp.data.tkdymk.split(';')[0]
              }
              var khlx = _this.rjzFormData.khlx
              if (khlx == 4) {
                _this.rjzFormData.jyfsfw = resp.data.jffz;
              }
              //扣分
              if (khlx == 3) {
                _this.rjzFormData.jyfsfw = resp.data.kffz;
              }
              //专项加分
              if (khlx == 6) {
                _this.rjzFormData.jyfsfw = resp.data.zxjffz;
              }
              if (khlx == 9) {
                _this.rjzFormData.jyfsfw = resp.data.kffz; // 暂外违规
              }
              _this.rjzFormData.khxm = resp.data.khxm;
              _this.rjzFormData.fzjldw = resp.data.fzjldw // 分值计量单位
            }
          })
      },
      /**
       * @name 手动上传
       * @param {any} file
       */
      handleUpload: function(file) {
        this.rjzFormData.uploadfiles.push(file);

        this.$refs.scroll1.update()
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
              _this.$nextTick(function() {
                _this.$refs.scroll1.update();
              });
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
        this.$refs.scroll1.update()
        this.$refs.attach.close()
      },
      /**
       * @name 校验存在联号罪犯的罪犯下，需要填写两名联号罪犯
       */
      atLeast2() {
        let _this = this;
        var waitZfList = _this.waitChoosePerson;
        var zfList = _this.turnRjzZfList(waitZfList);
        if (zfList == undefined || zfList == null) {
          return true;
        }
        for (var i = 0; i < zfList.length; i++) {
          if (zfList[i].bh == undefined || zfList[i].bh == "" || zfList[i].bh == null) {
            continue;
          }
          if (zfList[i].from == undefined || zfList[i].from == "" || zfList[i].from == null) {
            if (zfList[i].toggle && zfList[i].to.length < 2) {
              return false;
            }
          }
        }
        return true;
      },
      /**
       * @name 合议
       */
      heyiClick() {
        //校验存在联号罪犯的罪犯下，需要填写两名联号罪犯，否则不能合议
        let _this = this;
        if(!_this.isSaved){
            Artery.message.info({
                content:"保存后才能合议！",
                duration:3
            });
            return;
        }
        for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
          if (_this.waitChoosePerson[i].selectable == true) {
            Artery.message.info({
                content:"全部保存后才能合议！",
                duration:3
            });
            return;
          }
        }
        if (_this.waitChoosePerson.length == 0) {
          Artery.message.info({
                content:"合议至少要有一个人！",
                duration:3
          });
          return;
        }
        if (!_this.atLeast2()) {
          Artery.message.info({
              content:"存在联号罪犯的罪犯至少需要保存两名联号罪犯才能合议！",
              duration:3
          });
          return;
        }
        _this.$refs.heyiWindow.open();
        this.getRequest("/api/v1/system/getUser").then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data) {
              let userList = resp.data;
              _this.zcrList = userList;
              _this.jlrList = userList;
              _this.jfkhmjList = userList;
              _this.cjryList = userList;
              let selectedUserList = [];
              let cjry = [];
              for (var i = 0; i < userList.length; i++) {
                selectedUserList.push(userList[i].code);
                cjry.push(userList[i].code);
              }
              //计分考核民警
              this.formItem.jfkhxzmj = selectedUserList;
              //参加人员
              this.formItem.cjry = cjry;
            }
          }
        });
      },
      /**
       * @name 保存日记载
       */
      saveRjz() {
        let _this = this;
        let dataList = _this.realChoosePerson;
        //选择罪犯的校验
        if (dataList == undefined || dataList.length == 0) {
          Artery.message.info({
             content:"请选择罪犯",
             duration:3
          });
          return;
        }
        let isTrue = _this.validateForm()
        if(!_this.validateFiles()) {
          return
        }
        if (isTrue) {
          // 只要保存就要重新合议
          _this.isHeyi = false
          _this.isSaved = true // 是否保存
          //选择的是一个，并且有日记载编号进入编辑
          if (
            dataList.length == 1 &&
            dataList[0].bh &&
            dataList[0] != "" &&
            dataList[0] != null
          ) {
            _this.updateRjz(false);
          } else {
            _this.addRjz();
          }
          _this.editStatus = 'edit';
        }
      },
      /**
       * @name 校验文件是否有空文件
       */
      validateFiles() {
        var _this = this;
        var files = _this.rjzFormData.uploadfiles;
        for (var i = 0; i < files.length; i++) {
          if (files[i].size == 0) {
            Artery.message.info("存在空文件，请重新上传文件！");
            return false;
          }
        }
        return true;
      },
      /**
       * @name 更新日记载编号
       * @param {any} bh 编号
       */
      updateRjzBh(bh) {
        var _this = this
        // 通过编号查找对应的日记载
        for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
          if (_this.waitChoosePerson[i].bh == bh) { // 找到自己
            var zfbh = _this.waitChoosePerson[i].zfbh
            var from = _this.waitChoosePerson[i].from
            var to = _this.waitChoosePerson[i].to
            // 判断当前日记载是主罪犯还是从罪犯
            if (from == '') {
              // 如果是主罪犯，那么查找它对应的所有从罪犯，将它的从罪犯中的ZBh，更新为bh
              for (var j = 0, len2 = to.length; j < len2; j++) {
                var zfbh2 = to[j]
                for (var k = 0, len3 = _this.waitChoosePerson.length; k < len; k++) {
                  if (_this.waitChoosePerson[k].zfbh == zfbh2) { // 找到自己
                    _this.waitChoosePerson[k].zBh = bh
                  }
                }
              }
            } else {
              // 如果是从罪犯，那么查找它对应的主罪犯，并将主罪犯CBh中的关于自己的信息，更新为bh（需要单签从罪犯的zfbh）
              for (var l = 0, len4 = _this.waitChoosePerson.length; l < len; l++) {
                if (_this.waitChoosePerson[l].zfbh == from) { // 找到自己
                  var to2 = _this.waitChoosePerson[l].to
                  for (var m = 0, len5 = to2.length; m < len5; m++) {
                    var zfbh3 = to2[m]
                    if (zfbh3 == zfbh) {
                      _this.$set(_this.waitChoosePerson[l].cBh, m, bh)
                    }
                  }
                }
              }
            }
          }
        }
      },
      /**
       * @name 新增日记载
       */
      addRjz() {
        let _this = this;
        let dataList = _this.realChoosePerson;
        //罪犯对象列表
        let zfList = [];
        //加扣分通知单罪犯信息主键列表
        let zfxxBhList = [];
        for (var i = 0; i < dataList.length; i++) {
          var zfxxBh = dataList[i].zfxxBh;
          var obj = {
            zfxxBh: zfxxBh,
            fromBh: dataList[i].zBh,
            zfxxBhs: dataList[i].cBh
          };
          zfList.push(obj);
          // 有加扣分通知单标志，添加
          if (
            dataList[i].jkftzdBs &&
            dataList[i].jkftzdBs == 1
          ) {
            zfxxBhList.push(zfxxBh);
          }
        }

        let params = {
          fsrq: new Date(_this.formatDate(_this.rjzFormData.fsrq).replace(/-/g, "/").substr(0, 10)),
          fsdd: _this.rjzFormData.fsdd,
          sjmc: _this.rjzFormData.sjmc,
          khlx: _this.rjzFormData.khlx,
          khxm: _this.rjzFormData.khxm,
          zysy: _this.rjzFormData.zysy,
          qj: _this.rjzFormData.qj,
          khyj: _this.rjzFormData.khyj.split("-")[0],
          clyj: _this.rjzFormData.clyj,
          yjfs: _this.rjzFormData.yjfs,
          jbts: _this.jbsc,
          jbksrq: _this.rjzFormData.jbqx[0] == undefined ? '' : new Date(_this.formatDate(_this.rjzFormData.jbqx[0]).replace(/-/g, "/").substr(0, 10)),
          jbjsrq: _this.rjzFormData.jbqx[1] == undefined ? '' : new Date(_this.formatDate(_this.rjzFormData.jbqx[1]).replace(/-/g, "/").substr(0, 10)),
          jkzk: _this.rjzFormData.jkzk,
          wfjyflx: _this.rjzFormData.wfjyflx,
          qxjyjcfx: _this.rjzFormData.qxjyjcfx,
          zfList: zfList
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
        _this.isLoading = true
        _this.uploadFileRequest("/api/v1/rjz/addRjz", formData).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false
            Artery.message.success("保存成功！");
            var bhMap = resp.data;
            for (var i = 0; i < dataList.length; i++) {
              var zfxxBh = dataList[i].zfxxBh;
              var bh = bhMap[zfxxBh]; // 返回值
              dataList[i].bh = bh;
              dataList[i].checked = false;
              _this.$set(dataList[i], "selectable", false);
              _this.$set(dataList[i], "khlx", _this.rjzFormData.khlx);
              //如果是训诫，扣分，和单项处罚，展示联号框
              _this.showLh(dataList[i]);
              //保存后生成日记载编号更新
              _this.updateRjzBh(bh)
            }
            _this.bcBh = bhMap.bcBh;
            //更新日记载通知单
            if (zfxxBhList != null && zfxxBhList.length > 0) {
              _this.isLoading = true
              _this
                .postRequest("/api/v1/jkftzd/rjzUpdate", _this.scorePersonBh)
                .then(resp => {
                  if (resp && resp.status == 200) {
                    _this.isLoading = false
                  } else {
                    return;
                  }
                });
            }
            // _this.clearFormData();
          } else {
            setTimeout(function() {
              _this.isLoading = false
            }, 6000)
            Artery.message.error({
                 content:resp.data,
                 duration:3
            });
          }
        });
      },
      /**
       * @name 更新日记载
       */
      updateRjz(flag) {
        let _this = this;
        let dataList = _this.realChoosePerson;
        var savedPerson = _this.savedPerson;
        //罪犯对象列表
        let zfList = [];
        var rjzBhList = [];
        //加扣分通知单罪犯信息主键列表
        let zfxxBhList = [];
        for (var i = 0; i < savedPerson.length; i++) {
          rjzBhList.push(savedPerson[i].bh)
        }
        for (var i = 0; i < dataList.length; i++) {
          var zfxxBh = dataList[i].zfxxBh;
          var obj = {
            zfxxBh: zfxxBh,
            fromBh: dataList[i].zBh,
            zfxxBhs: dataList[i].cBh
          };
          zfList.push(obj);
        }
        let params = {
          bh: dataList[0].bh,
          hyjlBh: dataList[0].hyjlBh,
          fsrq: new Date(_this.formatDate(_this.rjzFormData.fsrq).replace(/-/g, "/").substr(0, 10)),
          fsdd: _this.rjzFormData.fsdd,
          sjmc: _this.rjzFormData.sjmc,
          khlx: _this.rjzFormData.khlx,
          khxm: _this.rjzFormData.khxm,
          zysy: _this.rjzFormData.zysy,
          qj: _this.rjzFormData.qj,
          khyj: _this.rjzFormData.khyj.split("-")[0],
          clyj: _this.rjzFormData.clyj,
          yjfs: _this.rjzFormData.yjfs,
          jbts: _this.jbsc,
          jbksrq: _this.rjzFormData.jbqx[0] == undefined ? '' : new Date(_this.formatDate(_this.rjzFormData.jbqx[0]).replace(/-/g, "/").substr(0, 10)),
          jbjsrq: _this.rjzFormData.jbqx[1] == undefined ? '' : new Date(_this.formatDate(_this.rjzFormData.jbqx[1]).replace(/-/g, "/").substr(0, 10)),
          jkzk: _this.rjzFormData.jkzk,
          wfjyflx: _this.rjzFormData.wfjyflx,
          qxjyjcfx: _this.rjzFormData.qxjyjcfx,
          zfList: zfList,
          rjzBhList: rjzBhList
        };
        var formData = new FormData();
        var files = _this.rjzFormData.uploadfiles;
        if (files != undefined && files.length > 0) {
          for (var i = 0; i < _this.rjzFormData.uploadfiles.length; i++) {
            formData.append("files", _this.rjzFormData.uploadfiles[i]);
          }
        }
        formData.append("rjz", JSON.stringify(params));
        _this.isLoading = true
        _this.uploadFileRequest("/api/v1/rjz/updateRjz", formData).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false
            if (resp.data.msg != undefined) {
              Artery.message.success(resp.data.msg);
              return
            }
            Artery.message.success("更新成功！");
            var bh = resp.data.bh
            var khlxChange = resp.data.khlxChange
            for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
              if (_this.waitChoosePerson[i].bh == bh) {
                // 如果from == '' 说明是一级节点
                if (_this.waitChoosePerson[i].from == '' && khlxChange) {
                  _this.showLh(_this.waitChoosePerson[i]);
                  var from = _this.waitChoosePerson[i].zfbh;
                  var to = _this.waitChoosePerson[i].to;
                  _this.waitChoosePerson[i].khlx = _this.rjzFormData.khlx
                }
              }
              if (_this.waitChoosePerson[i].from == '' && khlxChange) {
                for (var j = 0, len2 = to.length; j < len2; j++) {
                  // 删除连坐
                  _this.backDelZf(to[i])
                }
                //在罪犯to属性不为空的里面找编号是上面二级罪犯from对应的罪犯
                for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
                  if (_this.waitChoosePerson[i].to != []) {
                    if (_this.waitChoosePerson[i].zfbh == from) {
                      _this.waitChoosePerson[i].to = []
                      var data = JSON.parse(JSON.stringify(_this.formateData))
                      data.from = from
                      for (var j = 1, len = 5; j < len; j++) {
                        _this.$set(_this.waitChoosePerson, i + j, data)
                      }
                    }
                  }
                }
              }
            }
            //将罪犯日记载列表变为未合议的状态
            let waitList = _this.waitChoosePerson;
            for (var i = 0; i < waitList.length; i++) {
              waitList[i].hyjlBh = "";
              waitList[i].sfhy = "0";
            }
            if(flag){
             let waitZfList = _this.waitChoosePerson;
              var zfList = _this.turnRjzZfList(waitZfList);
              var params2 = []
              for (var i = 0; i < zfList.length; i++) {
                var obj = {
                  bh: zfList[i].bh,
                  zt: "102",
                  spr: _this.spr
                };
                params2.push(obj);
              }
              _this.tijiaoStatus = true
              _this.isLoading = true

        _this.postRequest("/api/v1/rjz/submitRjz", params2).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false
            _this.tijiaoStatus = false
            Artery.message.success("提交成功！");
            _this.$refs.xybsprWindow.close();
            _this.clearList();
            _this.clearFormData();
            _this.clearHyFormData();
            _this.bcBh = "" //考核类型
            _this.rjzFormData.hyjlBh = "" //考核部分
            _this.$router.push({ path: "/dayRecord"});
          } else {
            setTimeout(function() {
              _this.isLoading = false
            }, 6000)
            Artery.message.success({
               content:resp.data,
               duration:3
            });
          }
        });
        _this.rjzFormData.sjmc = ''
        _this.rjzFormData.fsdd = ''
        _this.rjzFormData.fsrq = _this.fsrqFormat
        _this.editStatus = 'new'
            }

          } else {
            setTimeout(function() {
              _this.isLoading = false
            }, 6000)
          }
        });
      },
      /**
       * @name 展示联号框
       * @param {any} data
       * @description 如果是训诫，扣分，和单项处罚，展示联号框
       */
      showLh(data) {
        let _this = this;
        if (_this.rjzFormData.khlx == 2 || _this.rjzFormData.khlx == 3 || _this.rjzFormData.khlx == 5) {
          _this.$set(data, "lianhao", true);
          _this.$set(data, "toggle", true);
        } else {
          _this.$set(data, "lianhao", false);
          _this.$set(data, "toggle", false);
        }
      },
      /**
       * @name 展示联号框
       * @param {any} data
       * @description 如果是训诫，扣分，和单项处罚，展示联号框
       */
      showLhByLx(data) {
        let _this = this;
        if (data.khlx != undefined && data.khlx != null && (data.khlx == 2 || data.khlx == 3 || data.khlx == 5)) {
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
        var _this = this;
        var params = {
          zfbh: zfbh,
          xm: xm,
          szxz: szxz,
          gz: gz,
          dept: dept
        }
        _this.postRequest("/api/v1/system/getZfxx", params).then(resp => {
          // 将数据绑定上属性
          let resplist = resp.data;
          if (resplist != undefined) {
            for (var i = 0; i < resplist.length; i++) {
              _this.$set(resplist[i], "zfxxBh", resplist[i].bh);
              _this.$delete(resplist[i], "bh");
              _this.$set(
                resplist[i],
                "zfxm",
                resplist[i].xm
              );
              _this.$set(resplist[i], "selectable", true);
              _this.$set(resplist[i], "checked", false);
              _this.$set(resplist[i], "from", "");
              _this.$set(resplist[i], "to", []);
            }
            if (resplist && resplist != null) {
              _this.requestData1 = resplist;
            }
            _this.popData = JSON.parse(JSON.stringify(_this.requestData1));
            for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
              for (var j = 0, len2 = _this.popData.length; j < len2; j++) {
                if (_this.waitChoosePerson[i].zfbh == _this.popData[j].zfbh) {
                  _this.popData[j].selectable = false;
                }
              }
            }
          } else {
            _this.popData = [];
            return;
          }
          // _this.popData = resplist;
          // for (var i = 0; i < resplist.length; i++) {
          //   _this.popData[i].zfxm = resplist[i].xm
          // }
        });
      },
      /**
       * @name 将待选择的罪犯列表转变为有日记载编号的罪犯列表
       * @param {any} waitZfList
       * @description
       */
      turnRjzZfList(waitZfList) {
        var zfList = [];
        if (waitZfList == undefined || waitZfList.length == 0) {
          return;
        }
        //组装成有数据的罪犯日记载列表
        for (var i = 0; i < waitZfList.length; i++) {
          if (
            waitZfList[i].bh != undefined &&
            waitZfList[i].bh != "" &&
            waitZfList[i].bh != null
          ) {
            zfList.push(waitZfList[i]);
          }
        }
        return zfList;
      },
      /**
       * @name 确认提交
       * @description
       */
      confirmTijiao() {
        let _this = this;
        if (_this.spr == '') {
          Artery.message.info({
             content:"请选择下一步审批人",
             duration:3
          })
          return;
        }
        if (_this.tijiaoStatus) {
          Artery.message.info({
             content:"请不要重复提交",
             duration:3
          })
          return;
        }
        _this.updateRjz(true)
      },
      /**
       * @name 清空所有人操作
       * @description
       */
      clearListAll() {
        var _this = this
        if (_this.waitChoosePerson.length != 0) {
          _this.showConfirm = true
        }
      },
      /**
       * @name 清空右侧表单
       * @description
       */
      clearFormData() {
        //日记载表单
        //字段
        this.rjzFormData.zfxxBh = "" //罪犯信息编号
        // this.rjzFormData.fsrq //发生日期
        // this.rjzFormData.fsdd //发生地点
        // this.rjzFormData.sjmc //事件描述
        this.rjzFormData.khlx = "3" //考核类型
        this.rjzFormData.khxm = "1" //考核部分
        this.rjzFormData.zysy = "" //主要事由
        this.rjzFormData.qj = "" //情节
        this.rjzFormData.khyj = "" //考核依据
        this.rjzFormData.clyj = "" //处理意见
        this.rjzFormData.yjfs = "" //建议分数
        this.rjzFormData.jbts = "" //禁闭时长
        this.rjzFormData.jbqx = [] //禁闭期限
        this.rjzFormData.jbksrq = "" //禁闭开始日期
        this.rjzFormData.jbjsrq = "" //禁闭结束日期
        this.rjzFormData.wfjyflx = "", //违反监狱法类型
        this.rjzFormData.uploadfiles = [] //上传的附件
        this.rjzFormData.jkzk = "" //健康状况
        this.rjzFormData.files = [] //显示的附件
      },
      /**
       * @name 清空合议表单
       * @description
       */
      clearHyFormData() {
          this.formItem.hysj = new Date()
          this.formItem.hydd = ""
          this.formItem.zcc = ""
          this.formItem.jlr = ""
          this.formItem.jfkhxzmj = ""
          this.formItem.cjry = ""
          this.formItem.bhList = []

      },
      /**
       * @name 保存并导出
       * @description
       */
      saveExport() {
        let _this = this;
        if (!_this.checkBt(_this.formItem)) {
          return;
        }
        //处理计分考核小组民警值
        let jfkhxzmj = _this.formItem.jfkhxzmj;
        let mjStrs = "";
        for (let i = 0; i < jfkhxzmj.length; i++) {
          if (jfkhxzmj[i] != "") {
            mjStrs += jfkhxzmj[i] + ";";
          }
        }
        //处理参加人员值
        let cjry = _this.formItem.cjry;
        let cjryStrs = "";
        for (let i = 0; i < cjry.length; i++) {
          if (cjry[i] != "") {
            cjryStrs += cjry[i] + ";";
          }
        }
        // _this.formItem.jfkhxzmj = mjStrs;
        // _this.formItem.cjry = cjryStrs;
        for (var i = 0; i < _this.waitChoosePerson.length; i++) {
          if (_this.waitChoosePerson[i].bh != "" && _this.waitChoosePerson[i].khlx != '2') {
            _this.formItem.bhList.push(_this.waitChoosePerson[i].bh);
          }
        }
        let params = {
          bh: "",
          hysj: _this.formItem.hysj,
          hydd: _this.formItem.hydd,
          zcc: _this.formItem.zcc,
          jlr: _this.formItem.jlr,
          jfkhxzmj: mjStrs,
          cjry: cjryStrs,
          bhList: _this.formItem.bhList
        };
        if (_this.formItem.bhList.length == 0) {
          Artery.message.info({
             content:"全部都是训诫不需要合议！",
             duration:3
          });
          return
        }
        _this.isLoading = true
        _this.postRequest("/api/v1/hy/exportHy", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false
            // 合议成功修改状态
            _this.isHeyi = true
            Artery.message.info("导出成功！");
            var zfList = _this.waitChoosePerson;
            for (var i = 0; i < zfList.length; i++) {
              _this.$set(zfList[i], "hyjlBh", resp.data.bh);
              _this.$set(zfList[i], "sfhy", resp.data.sfhy);
            }
            _this.exportHyWs(resp.data.bh, resp.data.wsmc);
            _this.$refs.heyiWindow.close();
          } else {
            setTimeout(function() {
              _this.isLoading = false
            }, 6000)
            Artery.message.info({
                 content:"导出失败！",
                 duration:3
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
        let writServerUrl = JSON.parse(localStorage.getItem("writServerUrl"));
        window.location.href = "/writ/api/v1/writ/hyws/hy/" + hyjlbh + "/" + wsmc + "/word";
      },
      /**
       * @name 保存并打印
       * @description
       */
      savePrint() {
        let _this = this;
        if (!_this.checkBt(_this.formItem)) {
          return;
        }
        //处理计分考核小组民警值
        let jfkhxzmj = _this.formItem.jfkhxzmj;
        let mjStrs = "";
        for (let mj in jfkhxzmj) {
          mjStrs += mj + ";";
        }
        //处理参加人员值
        let cjry = _this.formItem.cjry;
        let cjryStrs = "";
        for (let cjryStr in cjry) {
          cjryStrs += cjryStr + ";";
        }
        // _this.formItem.jfkhxzmj = mjStrs;
        // _this.formItem.cjry = cjryStrs;
        for (var i = 0; i < _this.waitChoosePerson.length; i++) {
          if (_this.waitChoosePerson[i].bh != "" && _this.waitChoosePerson[i].khlx != '2') {
            _this.formItem.bhList.push(_this.waitChoosePerson[i].bh);
          }
        }
        let params = {
          bh: "",
          hysj: _this.formItem.hysj,
          hydd: _this.formItem.hydd,
          zcc: _this.formItem.zcc,
          jlr: _this.formItem.jlr,
          jfkhxzmj: mjStrs,
          cjry: cjryStrs,
          bhList: _this.formItem.bhList
        };
        _this.isLoading = true
        _this.postRequest("/api/v1/hy/printHy", _this.formItem).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false
            // 合议成功修改状态
            _this.isHeyi = true
            Artery.message.info("打印成功！");
            var zfList = _this.waitChoosePerson;
            for (var i = 0; i < zfList.length; i++) {
              _this.$set(zfList[i], "hyjlBh", resp.data.bh);
              _this.$set(zfList[i], "sfhy", resp.data.sfhy);
            }
            _this.$refs.heyiWindow.close();
          } else {
            setTimeout(function() {
              _this.isLoading = false
            }, 6000)
            Artery.message.info({
                 content:"打印失败！",
                 duration:3
            });
          }
        });
      },
      /**
       * @name 手动校验合议必填项
       * @param {any} formItem
       * @description
       */
      checkBt(formItem) {
        if (formItem.hysj == "") {
          Artery.message.error({
              content:"合议时间不能为空",
              duration:3
          });
          return false;
        }
        if (formItem.zcc == "") {
          Artery.message.error({
              content:"主持人不能为空",
              duration:3
          });
          return false;
        }
        if (formItem.jlr == "") {
          Artery.message.error({
             content:"记录人不能为空",
             duration:3
          });
          return false;
        }
        if (formItem.jfkhxzmj == "") {
          Artery.message.error({
              content:"计分考核民警不能为空",
              duration:3
          });
          return false;
        }
        if (formItem.cjry == "") {
          Artery.message.error({
              content:"参加人员不能为空",
              duration:3
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
          item.selectable = true
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
      addPersonToList(params, parent) {
        var _this = this;
        //清空过滤项
        var columnLen = _this.$refs.list1Table.store.states.columns
        var columnLen2 = _this.$refs.list2Table.store.states.columns
        for (var i = 0, len = columnLen.length; i < len; i++) {
          columnLen[i].filterValue = ''
        }
        for (var j = 0, len2 = columnLen2.length; j < len2; j++) {
          columnLen[j].filterValue = ''
        }
        var formateData = JSON.parse(JSON.stringify(_this.formateData));
        switch (params) {
          case 1:
            {
              var arryLen = _this.waitChoosePerson.length;
              for (var i = 0, len = _this.tempData.length; i < len; i++) {
                _this.$set(_this.tempData[i], "toggle", false);
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + arryLen,
                  JSON.parse(JSON.stringify(_this.tempData[i]))
                );
                formateData.from = JSON.parse(JSON.stringify(_this.tempData[i])).zfbh;
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 1 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 2 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 3 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 4 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.rjzFormData.uploadfiles = []
                _this.rjzFormData.files = []
              }
              this.$refs.editWidiow1.close();
              this.$refs.editWidiow1
              break;
            }
          case 2:
            {
              //加扣分通知单
              var arryLen = _this.waitChoosePerson.length;
              for (var i = 0, len = _this.tempData.length; i < len; i++) {
                _this.$set(_this.tempData[i], 'disabled', true)
                _this.$set(_this.tempData[i], 'selectable', false)
                _this.$set(_this.tempData[i], 'khyj', _this.tempData[i].bhTk)
                _this.$set(_this.tempData[i], 'yjfs', _this.tempData[i].fz)
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + arryLen,
                  JSON.parse(JSON.stringify(_this.tempData[i]))
                );
                formateData.from = JSON.parse(JSON.stringify(_this.tempData[i])).zfbh;
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 1 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 2 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 3 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.$set(
                  _this.waitChoosePerson,
                  i * 5 + 4 + arryLen,
                  JSON.parse(JSON.stringify(formateData))
                );
                _this.rjzFormData.uploadfiles = []
                _this.rjzFormData.files = []
              }
              this.$refs.editWidiow2.close();
              break;
            }
          case 3:
            {
              this.$refs.editWidiow3.close();
              this.tempData[0].from = JSON.parse(JSON.stringify(this.currentPoint.relationNode)).zfbh;
              this.tempData[0].zBh = JSON.parse(JSON.stringify(this.currentPoint.relationNode)).bh;
              this.currentPoint.relationNode.to.push(this.tempData[0].zfbh);
              this.waitChoosePerson.splice(
                this.currentPoint.currentIndex,
                1,
                JSON.parse(JSON.stringify(this.tempData[0]))
              );
              _this.rjzFormData.uploadfiles = []
              _this.rjzFormData.files = []
              break;
            }
        }
      },
      /**
       * @name 编辑罪犯到列表
       * @description
       */
      editPersonToList() {
        var _this = this;
        var newWaitChoosePerson = [];
        var formateData = JSON.parse(JSON.stringify(_this.formateData));
        var arryLen = _this.waitChoosePersonLevel1.length;
        for (var i = 0; i < arryLen; i++) {
          var level2Count = _this.waitChoosePersonLevel1[i].to.length;
          var zfbh = _this.waitChoosePersonLevel1[i].zfbh
          newWaitChoosePerson.push(_this.waitChoosePersonLevel1[i]);
          for (var j = 0; j < _this.waitChoosePerson.length; j++) {
            if (_this.waitChoosePerson[j].from == zfbh) {
              newWaitChoosePerson.push(_this.waitChoosePerson[j]);
            }
          }
          formateData.from = zfbh
          while (level2Count < 4) {
            newWaitChoosePerson.push(formateData);
            level2Count++
          }
        }
        // _this.waitChoosePerson = newWaitChoosePerson
        for (var k = 0; k < newWaitChoosePerson.length; k++) {
          _this.$set(_this.waitChoosePerson, k, newWaitChoosePerson[k])
        }
      },
      /**
       * @name 罪犯关联关系重建
       * @description
       */
      relationRebuid() {
        var _this = this
        var wp = _this.waitChoosePerson
        var len = wp.length
        // 如果有zBh，说明是连坐罪犯，通过主编号，找到主罪犯，将当前对象的bh赋给查到的主罪犯的to
        for (var i = 0; i < len; i++) {
          if (wp[i].zBh != '') {
            var zfbh = wp[i].zfbh
            for (var j = 0; j < len; j++) {
              if (wp[j].bh == wp[i].zBh) {
                wp[j].to.push(zfbh)
              }
            }
          }
        }
        // 如果有cBh，说明是主罪犯，通过遍历cBh，找到从罪犯，将从罪犯的from赋为当前对象的bh
        for (var k = 0; k < len; k++) {
          if (wp[k].cBh.length != 0) {
            var zfbh2 = wp[k].zfbh
            for (var l = 0, len2 = wp[k].cBh.length; l < len2; l++) {
              var theCbh = wp[k].cBh[l]
              for (var m = 0; m < len; m++) {
                if (wp[m].bh == theCbh) {
                  wp[m].from = zfbh2
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
        if (!checked) {
          this.checkAll = false
          this.$refs.allC._data.currentChecked = false
          this.waitChoosePerson.forEach(function(v, k) {
            if (v["selectable"]) {
              v["checked"] = false;
            }
          });
        } else {
          this.checkAll = true
          this.$refs.allC._data.currentChecked = true
          this.waitChoosePerson.forEach(function(v, k) {
            if (v["selectable"]) {
              v["checked"] = true;
            } else {
              v["checked"] = false;
            }
          });
        }
      },
      /**
       * @name 删除日记载
       * @param {any} bh
       * @description
       */
      backDelZf: function(bh) {
        this.deleteRequest("/api/v1/rjz/deleteRjz/" + bh).then(resp => {
          if (resp && resp.status == 200) {} else {
            Artery.message.error("删除失败！请联系管理人员！");
          }
        });
      },
      /**
       * @name 删除一级罪犯
       * @param {any} item
       * @param {any} index
       * @description
       */
      delItem: function(item, index) {
        var _this = this
        _this.showConfirm2 = true
        _this.delItemS = {
          item,
          index
        }
      },
      /**
       * @name 删除连坐罪犯
       * @param {any} index
       * @description
       */
      level2del(index) {
        var _this = this
        _this.showConfirm3 = true
        _this.level2DelIndex = index
      },
      /**
       * @name 清空列表
       * @description
       */
      clearList() {
        var _this = this
        this.status.clear = true;
        this.waitChoosePerson = [];
      },
      /**
       * @name 重置可编辑
       * @description
       */
      resetDisable: function() {},
      /**
       * @name 清空后台操作
       * @description
       */
      backDataClearList() {
        var _this = this
        //请求后台批量删除
        _this.postRequest("/api/v1/rjz/batchDeleteRjz/", this.savedPerson).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.info("清空成功！");
          } else {
            Artery.message.error({
               content:"清空失败！",
               duration:3
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
        item.checked = !item.checked;
        this.$set(this.choosePerson, index, item);
        //如果勾选的话，禁选的勾选设置成false
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (this.waitChoosePerson[i].selectable == false) {
            this.waitChoosePerson[i].checked = false;
          }
        }
      },
      /**
       * @name 事件录入展开收起效果
       * @description
       */
      changeEventStatus() {
        this.status.eventWriteStatus = !this.status.eventWriteStatus;
        this.$refs.scroll1.update()
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
        let waitZfList = _this.waitChoosePerson;
        var zfList = _this.turnRjzZfList(waitZfList);
        if (zfList == undefined || zfList == null) {
          return;
        }
        //判断是否合议
        for (var i = 0; i < zfList.length; i++) {
          if (zfList[i].hyjlBh == undefined || zfList[i].hyjlBh == "" || zfList[i].hyjlBh == null) {
            return true;
          }
        }
        return false;
      },
      /**
       * @name 提交：弹出选择审批人弹窗
       * @description
       */
      tijiao() {
        let _this = this;
        let isTrue = _this.validateForm()
        if(!isTrue) {
          return;
        }
        if(!_this.validateFiles()) {
          return
        }
        var zfList = _this.waitChoosePerson;
        var params = [];
        for (var i = 0; i < zfList.length; i++) {
          var obj = {
            bh: zfList[i].bh,
          };
          params.push(obj);
        }
        _this.isLoading = true
        _this.postRequest("/api/v1/rjz/beforeSubmitRjz", params).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading = false
            var taskId = resp.data;
            var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
            var taskParams = {
              curTaskId: taskId,
              spAuthority: "jy.imp.jfkh.splc.rjzsp.",
              corpId: userInfo.corpId
            }
            _this.getRequest("/api/v1/system/getTaskNextSprs", taskParams).then(resp => {
              if (resp && resp.status == 200) {
                _this.xybsprSelectData = resp.data;
              } else {
                setTimeout(function() {
                  _this.isLoading = false
                }, 6000)
              }
            });
            _this.$refs.xybsprWindow.open();
          } else {
            setTimeout(function() {
              _this.isLoading = false
            }, 6000)
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
          //查询加扣分通知单
          _this.getRequest("/api/v1/jkftzd/rjzGet/").then(resp => {
            if (resp && resp.status == 200) {
              // 将数据绑定上属性
              let resplist = resp.data.ArrayList;
              if (resplist) {
                for (var i = 0; i < resplist.length; i++) {
                  // _this.$set(resplist[i], "zfxxBh", resplist[i].bh)
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
                  content:"查询失败！请重试或联系管理人员！",
                  duration:3
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
              let resplist = resp.data;
              if (resplist != undefined) {
                for (var i = 0; i < resplist.length; i++) {
                  _this.$set(resplist[i], "zfxxBh", resplist[i].bh);
                  _this.$delete(resplist[i], "bh");
                  _this.$set(
                    resplist[i],
                    "zfxm",
                    resplist[i].xm
                  );
                  _this.$set(resplist[i], "selectable", true);
                  _this.$set(resplist[i], "checked", false);
                  _this.$set(resplist[i], "from", "");
                  _this.$set(resplist[i], "to", []);
                  _this.$set(resplist[i], "zBh", "");
                  _this.$set(resplist[i], "cBh", []);
                }
              }
              _this.switchMethod(
                resplist,
                type,
                param1,
                param2,
                param3,
                param4
              );
            } else {
              Artery.message.error({
                 content:"查询失败！请重试或联系管理人员！",
                 duration:3
              }
              );
            }
          });
        }
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
        var newDateT = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
        return newDateT;
      },
      /**
       * @name 查询的方式
       * @param {any} zfList
       * @description
       */
      switchMethod(zfList, type, param1, param2, param3, param4) {
        let _this = this;
        switch (type) {
          case 1:
            {
              if (zfList && zfList != null) {
                _this.requestData1 = zfList;
              }
              _this.popData = JSON.parse(JSON.stringify(_this.requestData1));
              for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
                for (var j = 0, len2 = _this.popData.length; j < len2; j++) {
                  if (_this.waitChoosePerson[i].zfbh == _this.popData[j].zfbh) {
                    _this.popData[j].selectable = false;
                  }
                }
              }
              this.$refs.editWidiow1.open();
              break;
            }
          case 2:
            {
              if (zfList && zfList != null) {
                _this.requestData2 = zfList;
              }
              this.popData = JSON.parse(JSON.stringify(this.requestData2));
              for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
                for (var j = 0, len2 = this.popData.length; j < len2; j++) {
                  if (this.waitChoosePerson[i].zfbh == this.popData[j].zfbh) {
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
          case 3:
            {
              if (zfList && zfList != null) {
                _this.requestData3 = zfList;
              }
              this.currentPoint.currentIndex = param2;
              this.currentPoint.currentNode = param1;
              this.currentPoint.relationNode = param3;
              this.popData = JSON.parse(JSON.stringify(this.requestData3));
              for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
                for (var j = 0, len2 = this.popData.length; j < len2; j++) {
                  if (this.waitChoosePerson[i].zfbh == this.popData[j].zfbh) {
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
        // 发生日期 必填
        if (this.rjzFormData.fsrq == '') {
          Artery.message.info(
            {
                content:"请选择发生日期",
                 duration:3
            }
          );
          return false
        }
        // 发生地点 字数不超过50个字 非必填
        if (this.rjzFormData.fsdd.length > 200) {
          Artery.message.info(
            {
                 content:"发生地点字数不能超过50个字！",
                 duration:3
            }
          );
          return false
        }
        // 事件描述 字数不超过200个字 非必填
        if (this.rjzFormData.sjmc.length > 200) {
          Artery.message.info({
             content:"事件描述字数不能超过200个字！",
             duration:3
          }
          );
          return false
        }
        // 类型 必填
        if (this.rjzFormData.khlx == '') {
          Artery.message.info(
            {
                 content:"请选择考核类型",
                 duration:3
            }
          );
          return false
        }
        // 考核部分 必填
        if (this.rjzFormData.khxm == '') {
          Artery.message.info(
            {
                content:"请选择考核部分",
                duration:3
            }
          );
          return false
        }
        // 主要事由 字数不超过23个字 必填
        if (this.rjzFormData.zysy == '') {
          Artery.message.info({
              content:"主要事由必填！",
              duration:3
          }
          );
          return false
        }
        if (this.rjzFormData.zysy.length > 23) {
          Artery.message.info({
              content:"主要事由字数不能超过23个字！",
              duration:3
          }
          );
          return false
        }
        // 考核类型为记事本不校验情节
        if (this.rjzFormData.khlx != '1' && this.rjzFormData.khlx != '9') {
          // 情节 必填
          if (this.rjzFormData.qj == '') {
            Artery.message.info({
                content:"请选择情节",
                duration:3
            }
            );
            return false
          }
        }
        // 考核依据 必填
        if (this.rjzFormData.khyj == '' && this.rjzFormData.khlx != '1') {
          Artery.message.info({
               content:"请选择考核依据",
               duration:3
          }
          );
          return false
        }
        // 考核类型为单项处罚不校验处理意见
        if (this.rjzFormData.khlx == '5') {
          // 处理意见 必填
          if (this.rjzFormData.clyj == '') {
            Artery.message.info({
                  content:"请选择处理意见",
                  duration:3
            }
            );
            return false
          }
        }
        // 考核类型为训诫不校验建议分数
        if (this.rjzFormData.khlx != '2' && this.rjzFormData.khlx != '1') {
          // 建议分数 必填
          if (!this.yjfsValidator()) {
            Artery.message.info({
                 content:"请正确填写建议分数",
                 duration:3
            }
            );
            return false
          }
        }
        // 考核类型为单项处罚以及处理意见为禁闭时校验
        if (this.rjzFormData.khlx == '5' && this.rjzFormData.clyj == '3') {
          // 禁闭期限 必填
          if (this.rjzFormData.jbqx == []||(this.rjzFormData.jbqx[0] == ''&&this.rjzFormData.jbqx[1] == '')) {
            Artery.message.info({
                content:"请选择禁闭期限",
                duration:3
            }
            );
            return false
          }
        }
        if (this.rjzFormData.khlx == '5') {
          // 违反监狱法 必填
          if (this.rjzFormData.wfjyflx == '') {
            Artery.message.info({
                content:"请选择违反监狱法",
                duration:3
            }
            );
            return false
          }
        }
        if (this.rjzFormData.khlx == '5' && this.rjzFormData.clyj == '3') {
          // 健康状况 必填 字数不超过50个字
          if (this.rjzFormData.jkzk == "") {
            Artery.message.info({
              content: "请选择健康状况",
              duration: 3
            });
            return false;
          } else if (this.rjzFormData.jkzk.length > 50) {
            Artery.message.info({
                 content:"健康状况不能超过50个字",
                 duration:3
            });
            return false
          }
        }
        return true
      },
      /**
       * @name 点击切换类型
       * @description
       */
      khlxChange: function(param1, param2, param3) {
        var _this = this
        _this.isSaved = false
        if (_this.readProp == true) {
          _this.readProp = false
        } else {
          // if(this.rjzFormData.bh != undefined && this.rjzFormData.bh != ''){
          //   return
          // }
          var _this = this;
          if (param1 == 6) {
            _this.rjzFormData.jyfsfw = '100'
          } else {
            _this.rjzFormData.jyfsfw = ''
          }
          if (param1 == 5) {}
          // // 如果类型不是训诫/扣分/单项处罚，左侧不显示连坐罪犯，并清空数据
          // if (!(param1 == "2" || param1 == "3" || param1 == "5")) {
          //     //   _this.status.secendShow = false;
          //     _this.waitChoosePerson.forEach(function(item, index) {
          //         if (item.from != "") {
          //             _this.$set(
          //                 _this.waitChoosePerson,
          //                 index,
          //                 JSON.parse(JSON.stringify(_this.formateData))
          //             );
          //         }
          //     });
          // } else {
          //     //   _this.status.secendShow = true;
          // }
          switch (param1) {
            //类型为"记事本"
            case "1":
              {
                //必填项仅有类型、发生时间、主要事由
                //不展示情节
                _this.rjzFormData.qj = ""; //情节
                _this.rjzFormData.wfjyflx = ""; //违反监狱法
                _this.rjzFormData.jbts = ""; //禁闭时长
                _this.rjzFormData.jbqx = []; //禁闭期限
                _this.rjzFormData.jbksrq = ""; //禁闭开始日期
                _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
                _this.rjzFormData.khyj = ""; // 考核依据
                _this.rjzFormData.yjfs = ""; // 建议分数
                _this.isJsb = true // 记事本判断改为真
                break;
              }
              //类型为"训诫"
            case "2":
              {
                //考核依据、建议分数不显示
                _this.rjzFormData.wfjyflx = ""; //违反监狱法
                _this.rjzFormData.khyj = ""; // 考核依据
                _this.rjzFormData.qj = ""; //情节
                _this.rjzFormData.yjfs = ""; //建议分数
                _this.rjzFormData.jbts = ""; //禁闭时长
                _this.rjzFormData.jbqx = []; //禁闭期限
                _this.rjzFormData.jbksrq = ""; //禁闭开始日期
                _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
                _this.isJsb = false // 记事本判断改为假
                //情节-轻微
                break;
              }
              //类型为"扣分"
            case "3":
              {
                //情节为较轻、一般、严重
                _this.rjzFormData.wfjyflx = ""; //违反监狱法
                _this.rjzFormData.qj = ""; //情节
                _this.rjzFormData.jbts = ""; //禁闭时长
                _this.rjzFormData.jbqx = []; //禁闭期限
                _this.rjzFormData.jbksrq = ""; //禁闭开始日期
                _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
                _this.rjzFormData.khyj = ""; // 考核依据
                _this.rjzFormData.yjfs = ""; // 建议分数
                _this.isJsb = false // 记事本判断改为假
                break;
              }
              //类型为"加分"
            case "4":
              {
                _this.rjzFormData.wfjyflx = ""; //违反监狱法
                _this.rjzFormData.qj = ""; //情节
                _this.rjzFormData.clyj = ""; //处理意见
                _this.rjzFormData.jbts = ""; //禁闭时长
                _this.rjzFormData.jbqx = []; //禁闭期限
                _this.rjzFormData.jbksrq = ""; //禁闭开始日期
                _this.rjzFormData.jbjsrq = ""; //禁闭结束日期
                _this.rjzFormData.khyj = ""; // 考核依据
                _this.rjzFormData.yjfs = ""; // 建议分数
                _this.isJsb = false // 记事本判断改为假
                break;
              }
              //类型为"单项处罚"
            case "5":
              {
                _this.rjzFormData.wfjyflx = ""; //违反监狱法
                _this.rjzFormData.qj = ""; //情节
                _this.rjzFormData.khyj = ""; // 考核依据
                _this.rjzFormData.yjfs = ""; // 建议分数
                //情节为特别严重，展示处理意见，警告、记过、禁闭
                //禁闭-禁闭期限，禁闭时长
                //违反监狱法
                _this.isJsb = false // 记事本判断改为假
                break;
              }
              //类型为"专项加分"
            case "6":
              {
                _this.rjzFormData.wfjyflx = ""; //违反监狱法
                _this.rjzFormData.qj = ""; //情节
                _this.rjzFormData.khyj = ""; // 考核依据
                _this.rjzFormData.yjfs = ""; // 建议分数
                _this.isJsb = false // 记事本判断改为假
                //情节为特别突出
                break;
              }
          }
        }
      },
      /**
       * @name 点击切换切换考核部分
       * @description
       */
      khxmChange: function(param1, param2, param3) {
        var _this = this
        _this.isSaved = true
        if (_this.readProp == true) {
          _this.readProp = false
        } else {
          if (_this.rjzFormData.khyjOld != '') {
            _this.rjzFormData.khyj = _this.rjzFormData.khyjOld
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
          _this.rjzFormData.yjfs = ""; // 建议分数
        }
      },
      /**
       * @name 获取列表右侧信息
       * @description
       */
      getRightList: function(str) {
        var _this = this;
        let params = str;
        //查询罪犯信息
        _this.getRequest("/api/v1/rjz/getRjzByBh/" + params).then(resp => {
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
        var _this = this
        for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
          if (_this.waitChoosePerson[i].bh == bh) {
            return i
          }
        }
      },
      /**g
       * @name 填充数据
       * @description
       */
      setData: function() {
        let _this = this;
        if (typeof(_this.$route.query.zfListMap) != 'string' && _this.$route.query.editStatus != 'new') {
          localStorage.setItem("dayRecordEdit", JSON.stringify(_this.$route.query));
        }
        if (_this.$route.query.editStatus != undefined) {
          _this.editStatus = _this.$route.query.editStatus;
        }
        if (_this.editStatus == "edit" || _this.editStatus == "view") {
          var zfList = JSON.parse(localStorage.getItem("dayRecordEdit")).zfListMap.zfRjzList;
          var rjzBhList = JSON.parse(localStorage.getItem("dayRecordEdit")).zfListMap.rjzBhList;
          if (zfList != undefined && zfList.length > 0 && rjzBhList != undefined && rjzBhList.length > 0) {
            _this.bcBh = zfList[0].bcBh; //为了保证同一组保存的数据，再添加新数据也同一个保存编号
            _this.waitChoosePerson = zfList;
            for (var i = 0; i < _this.waitChoosePerson.length; i++) {
              //回填 罪犯列表信息
              _this.$set(_this.waitChoosePerson[i], "selectable", false);
              _this.$set(_this.waitChoosePerson[i], "checked", false);
              _this.showLhByLx(_this.waitChoosePerson[i]);
              if (_this.waitChoosePerson[i].from != undefined && _this.waitChoosePerson[i].from != null) {
                _this.$set(_this.waitChoosePerson[i], "from", _this.waitChoosePerson[i].from);
                _this.$set(_this.waitChoosePerson[i], "to", []);
              } else if (_this.waitChoosePerson[i].to != undefined && _this.waitChoosePerson[i].to != null) {
                _this.$set(_this.waitChoosePerson[i], "to", _this.waitChoosePerson[i].to);
                _this.$set(_this.waitChoosePerson[i], "from", '');
              } else {
                _this.$set(_this.waitChoosePerson[i], "from", '');
                _this.$set(_this.waitChoosePerson[i], "to", []);
                _this.$set(_this.waitChoosePerson[i], "zBh", '');
                _this.$set(_this.waitChoosePerson[i], "cBh", []);
              }
            }
            var obj = {
              bh: rjzBhList[0]
            };
            _this.relationRebuid()
            //重构数据格式
            _this.editPersonToList();
            //获取重构后的数据格式对应的当前项索引
            var getIndex = _this.getIndexFromEdit(rjzBhList[0])
            //点击显示罪犯日记载的详细信息
            _this.zfbhClick(obj, getIndex);
          }
          if (_this.editStatus == "view") {
            _this.disabledSelect();
          }
        }
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
       * @name 判断是否所有罪犯都是训诫类型
       * @description
       */
      isAllXjPerson() {
        var _this = this
        if (_this.khlx2Person.length == _this.savedPerson.length) {
          return true
        } else {
          return false
        }
      },
      /**
       * @name 考核意见初始化
       * @description
       */
      khyjInit(value) {
        let _this = this;
        _this.tkSeleteList = [];
        var params = {
          key: value,
          // khlx:_this.rjzFormData.khlx,
          // khxm:_this.rjzFormData.khxm,
        }
        _this.getRequest("/api/v1/tkwh/getTkListByKey", params).then(resp => {
          var _resData = resp.data;
          if (_resData == null || _resData == undefined) {
            return
          }
          for (var i = 0; i < _resData.length; i++) {
            var obj = {
              code: _resData[i].tkbh,
              name: _resData[i].tkbh + _resData[i].tknr.slice(0, 80),
              qxjyjcfx: _resData[i].qxjyjcfx,
              jffz: _resData[i].jffz,
              kffz: _resData[i].kffz,
              zxjffz: _resData[i].zxjffz
            }
            _this.tkSeleteList.push(obj);
          }
        });
      }
    },
    computed: {
      /**
       * @name 情节下拉数据
       * @description
       */
      newQjSelectData: function() {

        var qjSelectData = (this.qjSelectData = []);
        var khlx = this.rjzFormData.khlx;
        if (khlx == 2) {
          qjSelectData = [{
            code: "1",
            codeType: "qingwei",
            name: "轻微"
          }];
        } else if (khlx == 3) {
          qjSelectData = [{
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
          qjSelectData = [{
            code: "5",
            codeType: "tuchu",
            name: "突出"
          }];
        } else if (khlx == 5) {
          qjSelectData = [{
            code: "6",
            codeType: "tbyz",
            name: "特别严重"
          }];
        } else if (khlx == 6) {
          qjSelectData = [{
            code: "7",
            codeType: "tbtc",
            name: "特别突出"
          }];
        }
        return qjSelectData;
      },
      /**
       * @name 判断是否有罪犯的考核类型为记事本
       * @description
       */
      isJsb:{
        get:function(){
          var _this = this
          for (var i = 0, len = _this.waitChoosePerson.length; i < len; i++) {
            if (_this.waitChoosePerson[i].khlx == "1") {
              return true
            }
          }
          return false
        },

        set: function (newValue) {
          return newValue
        }
      },
      /**
       * @name 考核意见校验
       * @description
       */
      khyjValidate: function() {
        return (this.rjzFormData.khlx != '2') ? this.rules.require : this.rules.unrequire
      },
      /**
       * @name 考核意见校验
       * @description
       */
      filterWaitChoosePerson: function() {
        var waitChoosePerson = this.waitChoosePerson.slice(0);
        for (var i = 0; i < waitChoosePerson.length; i++) {
          if (waitChoosePerson[i].zfbh == "") {
            waitChoosePerson.splice(i, 1);
            i--;
          }
        }
        return waitChoosePerson;
      },
      /**
       * @name 训诫人员
       * @description
       */
      khlx2Person: function() {
        var returnArr = [];
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (
            this.waitChoosePerson[i].khlx == '2'
          ) {
            returnArr.push(this.waitChoosePerson[i]);
          }
        }
        return returnArr;
      },
      /**
       * @name 添加到列表的罪犯
       * @description
       */
      realPerson: function() {
        var returnArr = [];
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (
            this.waitChoosePerson[i].zfbh != ""
          ) {
            returnArr.push(this.waitChoosePerson[i]);
          }
        }
        return returnArr;
      },
      /**
       * @name 勾选的罪犯
       * @description
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
       * @name 勾选的罪犯的名称
       * @description
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
       * @name 保存过的罪犯的名称
       * @description
       */
      savedPerson: function() {
        var returnArr = [];
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (this.waitChoosePerson[i].bh != undefined && this.waitChoosePerson[i].bh != '') {
            returnArr.push(this.waitChoosePerson[i]);
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
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (this.waitChoosePerson[i].jkftzdBs != undefined && this.waitChoosePerson[i].jkftzdBs != '') {
            returnArr.push(this.waitChoosePerson[i]);
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
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (this.waitChoosePerson[i].jkftzdBs != undefined && this.waitChoosePerson[i].jkftzdBs != '') {
            returnArr.push(this.waitChoosePerson[i].tzdBh);
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
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (this.waitChoosePerson[i].hyjlBh != undefined && this.waitChoosePerson[i].hyjlBh != '') {
            returnArr.push(this.waitChoosePerson[i]);
          }
        }
        return returnArr;
      },
      /**
       * @name 仅主罪犯
       * @description
       */
      waitChoosePersonLevel1: function() {
        var returnArr = [];
        for (var i = 0, len = this.waitChoosePerson.length; i < len; i++) {
          if (this.waitChoosePerson[i].from == '') {
            returnArr.push(this.waitChoosePerson[i]);
          }
        }
        return returnArr;
      },
      /**
       * @name 当前时间
       * @description
       */
      nowDate: function() {
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth() + 1 < 10 ? ('0' + (now.getMonth() + 1)) : (now.getMonth() + 1)
        var day = now.getDate() < 10 ? ('0' + now.getDate()) : now.getDate()
        return year + "-" + month + "-" + day
      },
      /**
       * @name 发生日期格式化
       * @description
       */
      fsrqFormat: function() {
        var newDate = this.rjzFormData.fsrq;
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
        return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate()
      },
      /**
       * @name 禁闭时间
       * @description
       */
      jbsc: function() {
        var returnData;
        if (this.rjzFormData.jbqx == undefined) {
          this.rjzFormData.jbqx = []
        }
        if (((this.rjzFormData.jbqx[0] == undefined || this.rjzFormData.jbqx[0] == "") && this.rjzFormData.jbqx[1] == undefined) || this.rjzFormData.jbqx[1] == "") {
          returnData = "";
        } else {
          returnData =
            (new Date(this.rjzFormData.jbqx[1]) - new Date(this.rjzFormData.jbqx[0])) / 86400000 + 1;
        }
        return returnData;
      },
      /**
       * @name 禁闭开始时间
       * @description
       */
      jbksrq: function() {
        if (this.rjzFormData.jbqx == undefined) {
          this.rjzFormData.jbqx = []
          this.rjzFormData.jbqx[0] == "";
        }
        return this.rjzFormData.jbqx[0].replace(/-/g, "/").substr(0, 10);
      },
      /**
       * @name 禁闭结束时间
       * @description
       */
      jbjsrq: function() {
        if (this.rjzFormData.jbqx == undefined) {
          this.rjzFormData.jbqx = []
          this.rjzFormData.jbqx[1] == "";
        }
        return this.rjzFormData.jbqx[1].replace(/-/g, "/").substr(0, 10);
      }
    },
    created() {
      let _this = this;
      _this.setData();
      if (_this.rjzFormData.fsrq == '') {
        _this.rjzFormData.fsrq = _this.nowDate
      }
      // _this.khyjInit();
    },
    mounted() {
            var _this = this
      _this.$refs.scroll1.update()
      // 取消基础分
      var qxjcfSelectData = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111011"];
      qxjcfSelectData.splice(6,1)
      _this.qxjcfSelectData = qxjcfSelectData
      // 违反监狱法-下拉数据
      _this.wfjyfSelectData = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111016"];
      // 处理意见-下拉数据
      _this.clyjSelectData = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111004"];
      // 考核类型-下拉数据
      _this.khlxSelectData = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111001"];
      for(var i =0;i<_this.khlxSelectData.length;i++){
        _this.$set(this.khlxSelectData[i],'disabled',true)
      }
      // 考核部分-下拉数据
      _this.khxmSelectData = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111002"];
      for(var i =0;i<_this.khxmSelectData.length;i++){
        _this.$set(this.khxmSelectData[i],'disabled',true)
      }
    },
    watch: {
      rjzFormData: {
        handler(newValue, oldValue) {　　　　　　
          this.$refs.scroll1.update()　　　　
        },deep: true
      },
      waitChoosePersonLevel1: function(val, oldVal) {
        this.$nextTick(function() {
          this.$refs.rjzPersonScroll.update()
        })
      }
    }
  };
</script>

<style scoped>
  .aty-form-item-required .aty-form-item-label:before {
    content: '*';
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
  .search_list_level2 {
    padding-left: 20px;
    text-align: left;
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
</style>
