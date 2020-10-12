<template>
  <div class="main_area fd-home-wrap" style="overflow-y:hidden">
    <div class="main_name">
      <aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false" @scroll="scrollEvent">
      <div class="main_box">
        <aty-row class="search_panel">
          <router-link :to="{path:'/reviewCheckList'}">
            <aty-button class="fd-btn-green  fl fd-btn-link">
              <i><img src="../../assets/images/menu.png"></i>
              <span>
            复查复核列表
            </span>
            </aty-button>
          </router-link>
        </aty-row>
        <aty-panel class="fd-sypanel">
          <table class="fd-sytable">
            <tr>
              <td>
                <label>罪犯姓名</label>
              </td>
              <td>
                <aty-text v-text="zysy.zfxm"></aty-text>
              </td>
              <td>
                <label>罪犯编号</label>
              </td>
              <td>
                <aty-text v-text="zysy.zfbh"></aty-text>
              </td>
              <td>
                <label>主要事由</label>
              </td>
              <td colspan="3">
                <aty-text v-text="zysy.zysy1"></aty-text>
              </td>
            </tr>
            <tr>
              <td>
                <label>发生时间</label>
              </td>
              <td>
                <aty-text v-text="zysy.fsrq"></aty-text>
              </td>
              <td>
                <label>类型</label>
              </td>
              <td>
                <aty-text v-text="zysy.khlx"></aty-text>
              </td>
              <td>
                <label>考核项目</label>
              </td>
              <td>
                <aty-text v-text="zysy.khxm"></aty-text>
              </td>
              <td>
                <label>原处理意见</label>
              </td>
              <td>
                <aty-text v-text="zysy.clyj"></aty-text>
              </td>
            </tr>
          </table>
        </aty-panel>
        <aty-form :label-width="100" ref="form" class="fd-form-fc">
          <aty-row>
            <aty-col span="6">
              <aty-form-item :label-width="100" label="申请时间">
                <aty-date-picker v-model="sqsj" :disabled="true" class="cc_date_pick" type="date" clearable
                                 :editable="false"></aty-date-picker>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-textarea :label-width="100" :disabled="true"  class="cc_textarea" label="申请理由" :max="500"
                        v-model="sqly" :autosize="{minRows:4,maxRows:20}" :maxlength="500" placeholder="请输入"></aty-textarea>
          <aty-textarea v-if="prisonAreaFlag == '2'" :label-width="100" class="cc_textarea" label="复查情况"
                        :max="500" v-model="fcqk" :autosize="{minRows:4,maxRows:20}" :maxlength="500" required
                        :show-message="false" placeholder="请输入"></aty-textarea>
          <aty-row class="fd-upload"  v-if="files.length > 0">
            <aty-col span="24" class="fd-files">
              <span class="fd-attach" v-model="files">相关附件：</span>
              <template>
                <ul class="fileList">
                  <li v-for="(item,index) in files" :key="index"><aty-link :text="item.entityName" :href="item.url"
                     target="_parent" class="a_color"></aty-link></li>
                </ul>
              </template>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '1'">
            <aty-col span="6">
              <aty-form-item :label-width="100" label="审批意见" class="fd-yj-select required">
                <aty-select class="ca_select_wid" :data="spyjList" v-model="spyj" @change="spyjChange" clearable
                            :show-message="false"></aty-select>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '1'">
            <aty-textarea :class="spyj=='100'?'cc_textarea':'cc_textarea required'" :label-width="100" label="备注" :maxlength="500" v-model="bz" :autosize="{minRows:4,maxRows:20}" placeholder="请输入"></aty-textarea>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '1' && xybShow">
            <aty-col span="6">
              <aty-form-item :label-width="100" label="下一步审批人" class="fd-yj-select required">
                <aty-select class="ca_select_wid" :data="xybSprList" v-model="spr" clearable :show-message="false"></aty-select>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2'">
            <aty-col span="6">
              <aty-form-item :label-width="100" label="复查意见" class="fd-yj-select required">
                <aty-select class="ca_select_wid" :data="fcyjList" v-model="fcyj" @change="fcyjChange" clearable
                            :show-message="false"></aty-select>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && gzyjShow">
            <aty-col span="6">
              <aty-form-item :label-width="100" label="更正意见" class="fd-yj-select required">
                <aty-select class="ca_select_wid" :data="gzyjList" v-model="gzyj" @change="gzyjChange" clearable
                            :show-message="false"></aty-select>
              </aty-form-item>
            </aty-col>
            <aty-col v-if="clyjShow" span="6">
              <aty-form-item :label-width="100" label="处理意见" class="fd-yj-select required">
                <aty-select class="ca_select_wid" :data="clyjList" v-model="clyj" @change="clyjChange" clearable
                            :show-message="false"></aty-select>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && qjTkShow" >
            <aty-col span="6">
              <aty-form-item :label-width="100" label="情节" class="fd-yj-select required">
                <aty-select  class="ca_select_wid" transfer v-model="qj" :data="newQjSelectData" clearable
                             :show-message="false"></aty-select>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && qjTkShow">
            <aty-col  span="24">
              <aty-form-item :label-width="100" label="考核依据" class="aty-form-item-required">
                <aty-auto-complete transfer :value="khyj" ref="khyjRef" v-model="khyj" @change="khyjChange"
                                   :simple="false" placeholder="" remote :remote-method="khyjMethod" clearable
                                   :limit=1000></aty-auto-complete>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && jyfsShow">
            <aty-col span="6">
              <aty-form-item :label-width="100" label="建议分数" class="fd-yj-select required">
                <aty-input :disabled="(gzyj == '6'|| gzyj == '5')" v-model="jyfs" :clearable=jyfsClear
                           :show-message="false"></aty-input>
              </aty-form-item>
            </aty-col>
            <aty-col>
              <aty-form-item v-if="gzyj !='2' && jyfsClear && khyj !=''" label="范围：">
                <aty-text v-text="jyfsfw"></aty-text>
              </aty-form-item>
            </aty-col>
            <aty-col>
              <aty-form-item v-if="jyfsClear && fzjldw != 0 && khyj != ''" label="计量单位：">
                <aty-text v-text="fzjldw"></aty-text>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && gzyj =='5' && clyj=='3'">
            <aty-col>
              <aty-form-item  label="禁闭期限" class="aty-form-item-required ">
                <aty-date-picker  v-model="jbqx" @change="jbqxChange" type="daterange" format="yyyy-MM-dd"
                                  placeholder="选择日期和时间" clearable></aty-date-picker>
              </aty-form-item>
            </aty-col>
            <aty-col v-if = "jbqx !=''">
              <aty-form-item label="禁闭时长" class="aty-form-item-required ">
                <aty-text placeholder="请填写禁闭时长" v-text="jbsc" class="fd-jbsc"></aty-text>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && gzyj =='5'">
            <aty-col span = 24>
              <aty-form-item  label="违反监狱法" class="aty-form-item-required">
                <aty-select transfer v-model="wfjyflx" :data="wfjyfSelectData" clearable></aty-select>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-row v-if="prisonAreaFlag == '2' && gzyj == '5' && clyj== '3'">
            <aty-col span = 24>
              <aty-form-item label="健康状况" class="aty-form-item-required ">
                <aty-input v-model="jkzk" placeholder="请填写健康状况" clearable></aty-input>
              </aty-form-item>
            </aty-col>
          </aty-row>
          <aty-panel class="btm-btns">
            <aty-button  text="确定" class="fd-btn-blue fd-save-clause" @click="commitButn">
              <span>确定</span>
            </aty-button>
          </aty-panel>
        </aty-form>
      </div>
    </aty-scroll>
    <loading :isLoading="isLoading"></loading>
  </div>
</template>

<script>
  import loading from '../base/loading'
  export default {
    components: {
      loading:loading
    },
    data: function() {
      return {
        breadcrumbdata:[
          {
            name:'复查复核',
            href:"/reviewCheckList"
          },
          {
            name:'复查审批',
            href:'/reviewCheck/checkApproval'
          }
        ],
        zysy: {
          zfxm:"",
          zfbh:"",
          zysy1: "",
          fsrq: "",
          khlx: "",
          khxm: "",
          clyj: ""
        },
        select1: [],
        endDate: {
          year: null,
          month: null,
          fullyear: null
        },
        startDate: {
          year: null,
          month: null,
          fullyear: null
        },
        reasonList: [],
        // 复查情况
        fcqk: '',
        // 申请理由
        sqly: '',
        // 监区审批 分监区审批 判断标识 1 - 监区审批 2 - 分监区审批
        prisonAreaFlag: '1',
        // 申请时间
        sqsj: '',
        // 审批意见下拉列表
        spyjList: [
          {
            code: '100',
            name: '通过'
          },
          {
            code: '102',
            name: '退回'
          }
        ],
        spyj: '100',
        // 复查意见下拉列表
        fcyjList: [
          {
            code: '103',
            name: '更正'
          },
          {
            code: '101',
            name: '驳回'
          }
        ],
        fcyj: '',
        // 更正意见下拉列表
        gzyjList: [],
        gzyj: '',
        // 建议分数
        jyfs: '',
        // 更正意见是否展示
        gzyjShow: false,
        // 建议分数是否展示
        jyfsShow: false,
        // 处理意见是否展示
        clyjShow: false,
        clyj: '',
        files:[],
        bz:'',
        xybSprList:[
        ],
        bh:'',
        spr:'',
        //类型的单值代码
        lxCode:'',
        //下一步审批人是否显示
        xybShow:true,
        store:null,
        //当前任务id
        curTaskId:'',
        isLoading:false,
        // 情节条款显示
        qjTkShow:false,
        qj:'',
        khyj:'',
        fzjldw:'',//分值计量单位
        jyfsfw:'',//建议分数范围
        jbqx: [], // 禁闭期限，
        wfjyflx: "", // 违反监狱法类型
        wfjyfSelectData: [], // 违反监狱法-下拉数据,
        jkzk: "", // 健康状况
        //日记载可能需要的数据
        jbts: "", // 禁闭时长
        jbksrq: "", // 禁闭开始日期
        jbjsrq: "", // 禁闭结束日期,
        jyfsClear:true//建议分数清空
      };
    },
    methods: {
      /**
       * 滚动时触发document对象的click事件解决下拉问题
       */
      scrollEvent(_top, _left, scrollBar) {
        if (scrollBar.$el != undefined) {
          this.$root.$el.click();
        }
      },
      //禁闭时长校验
      jbqxChange(value,name,index,event) {
        var _this = this;
        if(value[0] != "" && value[1] != "") {
          var dayNum = (new Date(value[1]) - new Date(value[0])) / 86400000;
          if(dayNum > 14) {
            _this.jbqx = [];
            Artery.message.info("禁闭时长不能超过15天！");
          }
        }
      },
      // 确定按钮
      commitButn() {
        var bh = this.store.fcfh.bh;
        var _this = this;
        if (_this.spyj != "100" && (_this.bz == "" || _this.bz.trim() == "")) {
          Artery.message.info({
            content:"备注不能为空",
            duration:3
          });
          return;
        }
        if(_this.prisonAreaFlag == '1'){
          if (_this.xybShow && (_this.spr =='' ||  _this.spr ==null)) {
            Artery.message.info({
                content:"下一步审批人不能为空",
                duration:3
            });
            return;
          }
          if (_this.spyj == "" ||  _this.spyj == null) {
            Artery.message.info({
                content:"审批意见不能为空",
                duration:3
            });
            return;
          }
        }
        if(_this.prisonAreaFlag == '2'){
          if(_this.fcqk =='' ||  _this.fcqk ==null){
            Artery.message.info({
                content:"复查情况不能为空",
                duration:3
            });
            return;
          }
          if (_this.fcyj == "" ||  _this.fcyj == null) {
            Artery.message.info({
                content:"复查意见不能为空",
                duration:3
            });
            return;
          }
          if (_this.gzyjShow && (_this.gzyj == "" ||  _this.gzyj == null)) {
            Artery.message.info({
                content:"更正意见不能为空",
                duration:3
            });
            return;
          }
          if (_this.clyjShow && (_this.clyj == "" ||  _this.clyj == null)) {
            Artery.message.info({
               content:"处理意见不能为空",
               duration:3
            });
            return;
          }
          if (_this.jyfsShow && (_this.jyfs == "" ||  _this.jyfs == null)) {
            Artery.message.info({
               content:"建议分数不能为空",
               duration:3
            });
            return;
          }
          if (_this.qjTkShow && (_this.qj == "" || _this.qj == null )) {
            Artery.message.info({
                content:"情节不能为空",
                duration:3
            });
            return;
          }
          if (_this.qjTkShow && (_this.khyj == "" || _this.khyj == null )) {
            Artery.message.info({
                content:"考核依据不能为空",
                duration:3
            });
            return;
          } else if (_this.khyj != "") {
            //考核依据的校验
            var khyjList = this.$refs.khyjRef.currentData;
            var khyjFlag = false;
            for(var i=0;i < khyjList.length;i++) {
              if(_this.khyj == khyjList[i].name.replace(/<em>/,"").replace(/<\/em>/,"")) {
                khyjFlag = true;
                break;
              }
            }
            if(!khyjFlag) {
              Artery.message.error({
                content:'请正确选择考核依据！',
                duration:3
              });
              return;
            }
          }
          //违反监狱法校验
          if (_this.gzyj === '5' && (_this.wfjyflx == '' || _this.wfjyflx == null)) {
            Artery.message.info({
                content:"违反监狱法不能为空",
                duration:3
            });
            return;
          }
          //禁闭-禁闭期限校验
          if (_this.gzyj === '5' && _this.clyj === '3' && (_this.jbqx.length == 0 || _this.jbqx == [] || (_this.jbqx[0] == "" && _this.jbqx[1] == ""))) {
            Artery.message.info({
                content:"禁闭期限不能为空",
                duration:3
            });
            return;
          }
          //禁闭-健康状况
          if (_this.gzyj === '5' && _this.clyj === '3' && (_this.jkzk == "" ||  _this.jkzk == null)) {
            Artery.message.info({
                content:"健康状况不能为空",
                duration:3
            });
            return;
          } else if (_this.jkzk.length > 50) {
            Artery.message.info({
                 content:"健康状况不能超过50个字",
                 duration:3
            });
            return false;
          }
          //填写的分数校验
          if (_this.jyfs !="" && !_this.yjfsValidator()) {
            Artery.message.info({
                 content:"请填写正确分数",
                 duration:3
            });
            return;
          }
          if (_this.clyjShow && (_this.clyj == "" || _this.clyj == null)) {
            Artery.message.info({
               content:"请填写处理意见",
               duration:3
            });
            return;
          }
        }
        //分监区审批
        if (this.prisonAreaFlag == '1'){
          var spParams ={
            bh:bh,
            bz:_this.bz,
            zt:_this.spyj,
            taskId:_this.store.fcfh.taskid,
            createUserID:_this.store.fcfh.fqr,
            dqspr:_this.spr,
            yspr:_this.store.fcfh.yspr+";"+this.store.fcfh.spr,
            lx:this.store.fcfh.lx
          };
          _this.isLoading=true
          _this.postRequest("/api/v1/fcfh/fjqSpFcfh/", spParams).then(resp => {
            if (resp && resp.status == 200) {
              _this.isLoading=false
              Artery.message.info("审批成功");
              this.$router.push({ path: "/reviewCheckList" });
            }else{
              setTimeout(function(){
                _this.isLoading=false
              },6000)
              Artery.message.error({
                  content:"审批失败",
                  duration:3
              });
            }
          });
        } else {
          var spParams ={
            bh:bh,
            bz:this.fcqk,
            zt:this.fcyj,
            jyclyj:this.gzyj,
            cfjyyj:this.clyj,
            fcqk:this.fcqk,
            rjzBh:this.store.fcfh.rjzbh,
            taskId:this.store.fcfh.taskid,
            lx:this.store.fcfh.lx,
            dqspr:JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userId,
            //已审批人是原先已审批人+上一个审批人
            yspr:_this.store.fcfh.yspr+";"+this.store.fcfh.spr,
            zfxxBh:this.store.fcfh.zfxxbh,
            zfbh:this.store.fcfh.zfbh,
            fcx:this.store.fcfh.fcx,
            qj:this.qj,
            khyj:this.khyj.split("-")[0],
            createDeptId:_this.store.fcfh.deptid
          };
          if (this.jyfs != '') {
            spParams.jyfs = Math.abs(this.jyfs);
          }
          //原处理意见是禁闭
          var yclyj = this.store.fcfh.yclyj;
          if (yclyj != '' && yclyj ==="禁闭") {
            spParams.yclyj = "3";
          } else if (yclyj != '' && yclyj ==="警告") {
            spParams.yclyj = "1";
          } else if (yclyj != '' && yclyj ==="记过") {
            spParams.yclyj = "2";
          }
          if (_this.gzyj === '5') {
            spParams.jkzk = _this.jkzk
            spParams.wfjyflx = _this.wfjyflx;
            if (_this.clyj === '3') {
              spParams.jbts = _this.jbsc;
              spParams.jbksrq = _this.jbqx[0] == undefined ? '' : new Date(_this.formatDate(_this.jbqx[0]).replace(/-/g, "/").substr(0, 10)); // 禁闭开始日期
              spParams.jbjsrq =_this.jbqx[1] == undefined ? '' : new Date(_this.formatDate(_this.jbqx[1]).replace(/-/g, "/").substr(0, 10)); // 禁闭结束日期
            }
          }
          //监区审批
          _this.isLoading=true
          _this.postRequest("/api/v1/fcfh/jqSpFcfh/", spParams).then(resp => {
            if (resp && resp.status == 200) {
              _this.isLoading=false
              Artery.message.info("审批成功");
              this.$router.push({ path: "/reviewCheckList" });
            }else{
              setTimeout(function(){
                _this.isLoading=false
              },6000)
              Artery.message.error({
                  content:"审批失败",
                  duration:3
              });
            }
          });
        }
      },
      //审批意见改变
      spyjChange(value,name,index,event) {
        if (value === "100"){
          this.xybShow = true;
        } else {
          this.spr = '';
          this.xybShow = false;
        }
      },
      //获取当前任务的下一步审批人
      getSpr() {
        let _this = this;
        var xybSprParams = {
          curTaskId:_this.curTaskId,
          spAuthority:"jy.imp.jfkh.splc.fcfhsp.",
          corpId:JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).corpId
        };
        //获取下一步审批人,先开启提请流程，返回taskId
        _this.getRequest("/api/v1/system/getTaskNextSprs/",xybSprParams).then(resp => {
          if (resp && resp.status == 200) {
            _this.xybSprList=[];
            _this.xybSprList = resp.data;
          }
        });
      },
      // 复查意见改变
      fcyjChange() {
        this.gzyj=''
        var fcx = this.store.fcfh.fcx;
        if (this.fcyj === '103') {
          this.gzyjList=[]
          this.gzyjShow = true;
          if (fcx === '4') {
            this.gzyjList.push({code: '8', name: '取消加分'});
          } else if (fcx === '3') {
            this.gzyjList.push({code: '9', name: '取消扣分'});
          } else if (fcx === '6') {
            this.gzyjList.push({code: '10', name: '取消专项加分'});
          } else if (fcx === '5') {
            this.gzyjList.push({code: '11', name: '取消单项处罚'});
          } else if (fcx === '2') {
            this.gzyjList.push({code: '12', name: '取消训诫'});
          } else if (fcx === '7') {
            //奖励
            this.gzyjList.push({code: '13', name: '取消奖励'});
            this.gzyjList.push({code: '7', name: '物质奖励'});
            this.gzyjList.push({code: '14', name: '表扬'});
            return;
          } else if (fcx === '9') {
            this.gzyjList.push({code: '15', name: '取消暂外违规'});
            return;
          }
          this.gzyjList.push({code: '4', name: '加分'});
          this.gzyjList.push({code: '3', name: '扣分'});
          this.gzyjList.push({code: '6', name: '专项加分'});
          this.gzyjList.push({code: '2', name: '训诫'});
          this.gzyjList.push({code: '5', name: '单项处罚'});
        } else {
          this.gzyjShow = false;
          this.jyfsShow = false;
          this.clyjShow = false;
          this.qjTkShow = false;
          this.qk();
        }
      },
      // 更正意见改变
      gzyjChange() {
        this.qk();
        if(this.gzyj === '4' || this.gzyj === '3' || this.gzyj === '6' || this.gzyj === '5'){
          this.jyfsShow = true;
        }else{
          this.jyfsShow = false;
        }
        if(this.gzyj === '6'){
          this.jyfs = '100';
        }

        if(this.gzyj === '5'){
          this.clyjShow = true;
        }else{
          this.clyjShow = false;
        }
        //情节条款显示
        if (this.gzyj === '4' || this.gzyj === '3' || this.gzyj === '6' || this.gzyj === '2' || this.gzyj === '5') {
          this.qjTkShow = true;
        } else {
          this.qjTkShow = false;
        }
        if (this.gzyj === '6' || this.gzyj === '5') {
          this.jyfsClear = false;
        } else {
          this.jyfsClear = true;
        }
      },
      clyjChange () {
        this.qj = '';
        this.khyj = '';
        this.wfjyflx ='';
        this.jbqx = [];
        this.jkzk = '';
        if (this.clyj !="") {
          if (this.clyj === "1") {
            this.jyfs = "300";
          } else if (this.clyj === "2") {
            this.jyfs = "600";
          } else {
            this.jyfs = "900";
          }
        }
      },
      //更正意见、复查意见变更清空数据
      qk:function () {
        if (this.jyfs != '') {
          this.jyfs = '';
        }
        if (this.clyj != '') {
          this.clyj = '';
        }
        this.qj = '';
        this.khyj = '';
        this.jkzk = '';
        this.jbqx = [];
        this.wfjyflx ='';
        this.fzjldw = '';
        this.jyfsfw = '';
      },
      //考核项目转换
      khxzh: function (row, column) {
        var key = "30111002-"+row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      //考核类型转换
      khlxZh:function (row, column) {
        var key = "30111001-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      },
      getRouter(routers,name){
        for(var i=0;i<routers.length;i++){
          if(routers[i].name===name){
            return routers[i]
          }
        }
      },
      /**
       * @name 考核依据改变事件
       * @param {any} value
       */
      khyjChange: function(value) {
        let _this = this;
        var khlx = _this.gzyj;
        //分值计量单位
        _this.fzjldw = value.fzjldw;
        // 加分
        if (khlx == 4) {
          _this.jyfsfw = value.jffz;
        }
        // 扣分
        if (khlx == 3) {
          _this.jyfsfw = value.kffz;
        }
      },
      /**
       * @name 动态查询条款
       * @param {any} query
       * @param {any} callback
       */
      khyjMethod: function(query, callback) {
        let _this = this;
        var khlx = _this.gzyj;
        var khxm = _this.store.fcfh.khxm;
        if (khlx == undefined || khlx == null || khlx == "") {
          Artery.message.info({
               content:"请选择考核类型！",
               duration:3
          });
          return;
        }

        if (khxm == undefined || khxm == null || khxm == "") {
          Artery.message.info({
              content:"请选择考核项目！",
              duration:3
          });
          return;
        }

        var khyjData = [];

        var params = {
          key:query,
          tkdymk: khlx,
          khxm: khxm,
        };
        _this.postRequest("/api/v1/tkwh/getTkListByParam", params)
          .then(resp => {
            var resData = resp.data;
            if (resData == null || resData == undefined || resData.length == 0) {
              return
            }
            for (var i = 0; i < resData.length; i++) {
              var fzjldw = 0;
              if (resData[i].hasOwnProperty("fzjldw") && resData[i].fzjldw != null) {
                fzjldw = resData[i].fzjldw;
              }
              khyjData.push({
                id: resData[i].tkbh,
                name: resData[i].tkbh + "-" + resData[i].tknr.slice(0, 85),
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
          .catch(function (error) {
            Artery.message.error({
                content:"网络异常，请重试！",
                duration:3
            });
          });
      },
      /**
       * @name 建议分数处理
       */
      yjfsValidator: function() {
        let _this = this;
        var advise = _this.jyfsfw; // 返回的建议分数
        var yjfs = _this.jyfs; // 填写的建议分数
        var trueYjfs = parseInt(yjfs);
        if(isNaN(trueYjfs)) {
          return false;
        }
        var fzjldw = _this.fzjldw; // 分值计量单位
        var flag = false; // 返回值
        if(this.jyfsShow) {
          if (advise.indexOf(",") > -1) {
            var arr = advise.split(",");
            for (var i = 0; i < arr.length; i++) {
              if (yjfs == arr[i]) {
                flag = true;
                return flag
              }
            }
          } else if (advise.indexOf("-") > -1) {
            var arr = advise.split("-");
            var min = parseInt(arr[0]);
            if(fzjldw >= 1) {
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
            if (yjfs == advise) {
              flag = true;
            }
          } else if (yjfs != '') {
            flag = true;
          } else {
            flag = false;
          }
        }
        return flag
      },
      /**
       * @name 工具：格式化日期
       * @param {any} comeTime
       * @description
       */
      formatDate(comeTime) {
        //解决IE的转换问题
        if(comeTime == undefined || comeTime == '' || comeTime == null) {
          return '';
        }
        var newDate = comeTime;
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
    },
    watch:{
      sqly:function(val,oldVal){
        this.$refs.scroll.update()
      },
      fcqk:function(val,oldVal){
        this.$refs.scroll.update()
      },
      bz:function(val,oldVal){
        this.$refs.scroll.update()
      },
      spyj:function(val,oldVal){
        this.$refs.scroll.update()
      },
      fcyj:function(val,oldVal){
        this.$refs.scroll.update()
      },
      gzyj:function(val,oldVal){
        this.$refs.scroll.update()
      },
      clyj:function(val,oldVal){
        this.$refs.scroll.update()
      }
    },
    computed: {
      /**
       * @name 情节下拉数据
       * @description
       */
      newQjSelectData: function() {
        // var qjSelectData = (this.qjSelectData = []);
        var qjSelectData = [];
        var khlx = this.gzyj;
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
       * @name 禁闭时间
       * @description
       */
      jbsc: function() {
        var returnData;
        if (this.jbqx == undefined) {
          this.jbqx = []
        }
        if ((this.jbqx[0] == undefined || this.jbqx[0] == "") && (this.jbqx[1] == undefined || this.jbqx[1] == "")) {
          returnData = "";
        } else {
          returnData =
            (new Date(this.jbqx[1]) - new Date(this.jbqx[0])) / 86400000 + 1;
        }
        return returnData;
      },
      // 处理意见下拉列表
      clyjList() {
        return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))[_sigleCode.cfclyj];
      },
    },
    mounted() {
      this.$nextTick(function(){
        this.$refs.scroll.update()
      })
      // 违反监狱法-下拉数据
      this.wfjyfSelectData = JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))["30111016"]
    },
    created(){
      this.store=JSON.parse(localStorage.getItem("checkApprovalData"))
      this.prisonAreaFlag = this.store.prisonAreaFlag;
      this.zysy.zfxm = this.store.fcfh.zfxm;
      this.zysy.zfbh = this.store.fcfh.zfbh;
      this.zysy.zysy1 = this.store.fcfh.zysy;
      this.zysy.fsrq = this.store.fcfh.fsrq;
      this.zysy.khlx = this.store.fcfh.fcx;
      if (this.zysy.khlx !='' && this.zysy.khlx != null) {
        this.zysy.khlx = this.khlxZh(this.zysy.khlx,'');
      }
      this.zysy.khxm = this.store.fcfh.khxm;
      if (this.zysy.khxm !='' && this.zysy.khxm !=null) {
        this.zysy.khxm = this.khxzh(this.zysy.khxm,"");
      }
      this.zysy.clyj = this.store.fcfh.yclyj;
      this.sqsj = this.store.fcfh.sqsj;
      this.sqly = this.store.fcfh.sqly;
      this.fcqk = this.store.fcfh.fcqk;
      for (var i=0;i< this.store.fhfhMap.length;i++){
        let fileVo = this.store.fhfhMap[i];
        fileVo.url = _server.serverName+"/api/v1/system/downloadFileByEntityBh/" + this.store.fhfhMap[i].bh;
        this.files.push(this.store.fhfhMap[i]);
      }
      this.curTaskId = this.store.fcfh.taskid;
      //加载下一步审批人
      this.getSpr();
    },
  };
</script>

<style scoped>
  .aty-form-item-required{
    width:100%;
    left:0;
  }
  .fd-yj-select .aty-select{
    position:relative;
  }
  .fd-yj-select .aty-select-dropdown{
    width:100%;
    left:0 !important;
  }
  .fd-attach{
    width:100px;
    display:inline-block;
    text-align:right;
  }
  .fd-form-fc {
    padding-top: 40px;
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
  .search_option_box .search_option_text {
    display: inline-block;
    width: 126px;
    text-align: right;
    height: 100%;
    position: absolute;
    top: 0;
    left: 32px;
  }
  .search_option_input,
  .required .aty-form-item-required,
  .search_option_box .aty-date-picker {
    width: calc(100% - 190px);
    position: absolute;
    top: 0;
    left: 158px;
    right: 0;
  }
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
  .cc_date_pick{
    text-align: left;
  }
  .ca_select_wid{
    width: 187px;
  }
  .a_color{
    color:#0099ff !important;
  }
  .fd-jbsc {
    height: 32px;
    line-height: 32px;
  }
</style>
