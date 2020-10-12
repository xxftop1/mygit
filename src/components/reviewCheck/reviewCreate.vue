<template>
  <div class="main_area fd-home-wrap">
    <div class="main_name">
      <aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false">
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
                <aty-text v-text="sj.zfxm"></aty-text>
              </td>
              <td>
                <label>罪犯编号</label>
              </td>
              <td>
                <aty-text v-text="sj.zfbh"></aty-text>
              </td>
              <td>
                <label>主要事由</label>
              </td>
              <td colspan="3">
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
        <aty-form :label-width="100" ref="form" class="fd-form-fc fd-review-fc">
          <aty-textarea class="cc_textarea" label="复查情况及更正意见" :max="500" v-model="fcqk" :autosize="{minRows:4,maxRows:20}" :maxlength="500" required :show-message="false" placeholder="请输入"></aty-textarea>
          <aty-textarea class="cc_textarea" label="申请理由" :max="500" v-model="sqly" :autosize="{minRows:4,maxRows:20}" :maxlength="500" required :show-message="false" placeholder="请输入"></aty-textarea>
          <aty-row class="fd-upload">
            <aty-upload :multiple="true" label="相关附件：" :label-width="100" prop="label"  :min="20" action="#" :before-upload="handleUpload" :show-message="false" :show-upload-list="true">
              <aty-button type="ghost" class="fd-btn-green fd-btn-upload">
                <i><img src="../../assets/images/upload.png"></i>
                上传
              </aty-button>
            </aty-upload>
            <template>
              <ul class="fileList fd-fc-list">
                <li v-for="(item,index) in bjFiles" :key="index"><aty-text :text="item.name"></aty-text>
                  <aty-text @click="openAttachModal(index)">
                    <aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon>
                  </aty-text>
                </li>
              </ul>
            </template>
            <aty-form-item v-if="editPage == 'edit'">
              <aty-panel class="delFile ylfiles" v-for="(item,index) in ylfiles" :key="index">
                <aty-text v-text="item.entityName"></aty-text>
                <aty-text @click="openDeleteModal(item.bh,index)"><aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon></aty-text>
              </aty-panel>
            </aty-form-item>
          </aty-row>
          <aty-panel class="btm-btns">
            <aty-button  text="保存" class="fd-btn-blue fd-save-clause" @click="saveButn">
              <i>
                <img src="../../assets/images/save.png">
              </i>
              <span>保存</span>
            </aty-button>
            <aty-button  text="保存" class="fd-btn-blue fd-save-clause" @click="saveUpButn">
              <span>保存并呈报</span>
            </aty-button>
          </aty-panel>
        </aty-form>
        <!-- 批量提交 弹窗 -->
        <aty-modal title="提交" footer-hide closable="" ref="pltjWindow" width="500" :mask-closable="false" class="xybsp-modal">
          <aty-select v-model="spr" :data="xybspr" label="下一步审批人"></aty-select>
          <aty-button class="search_option_butn1" type="primary" @click="submit">
            <span>确定</span>
          </aty-button>
        </aty-modal>
        <aty-modal title="删除附件"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach" closable  width="400" @on-ok="deleteUploadFile"  :mask-closable="false">
          <aty-text text="确定要删除此附件？"></aty-text>
        </aty-modal>
        <aty-modal title="删除附件"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach1" closable  width="400" @on-ok="delFile"  :mask-closable="false">
          <aty-text text="确定要删除此附件？"></aty-text>
        </aty-modal>
        <!-- 批量提交 弹窗 -->
      </div>
      <loading :isLoading="isLoading"></loading>
    </aty-scroll>
  </div>
</template>

<script>
  import loading from '../base/loading'
  export default {
    components: {
      loading: loading
    },
    data: function () {
      return {
        breadcrumbdata: [
          {
            name: '复查复核',
            href: "/reviewCheckList"
          },
          {
            name: '新增复核',
            href: '/reviewCheck/reviewCreate'
          }
        ],
        sj: {
          zfxm: "",
          zfbh: "",
          zysy: "",
          fsrq: "",
          khlx: "",
          khxm: "",
          clyj: ""
        },
        // 复查情况
        fcqk: '',
        // 申请理由
        sqly: '',
        bjFiles: [],
        editPage: "",
        ylfiles: [], //预览附件
        //审批人
        spr: "",
        //审批人假数据
        xybspr: [],
        store: null,
        attachIndex: '',
        deleteFile: {
          index: '',
          bh: ''
        },
        curTask: '',
        tqBh: '',
        isLoading: false
      };
    },
    methods: {
      handleUpload: function(f) {
        var _this = this;
        this.bjFiles.push(f);
        this.$refs.scroll.update()
        return false;
      },
      // 保存
      saveButn() {
        if (this.fcqk =='' ||  this.fcqk ==null) {
          Artery.message.info({
            content:"复查情况及更正意见不能为空",
            duration:3
          });
          return;
        }
        if (this.sqly =='' ||  this.sqly ==null) {
          Artery.message.info({
             content:"申请理由不能为空",
             duration:3
          });
          return;
        }
        let formData = new FormData();
        if(this.editPage == "edit") {
          let editParams = {
            fcfh:{
              sqly: this.sqly,
              bh:this.bh,
              lx:"2"
            }
          };
          formData.append("fh", JSON.stringify(editParams));
        } else {
          let params = {
            fcfh:{
              sqly: this.sqly,
              fcx: this.store.fcfh.fcx,
              zfxxBh:this.store.fcfh.zfxxbh,
              fcqk:this.fcqk,
              sqsj: this.store.fcfh.sqsj,
              rjzBh:this.store.fcfh.rjzbh,
              fcBh:this.store.fcfh.bh,
              lx:'2'
            },
            fcmx: {
              lx:this.store.fcfh.fcx,
              khxm:this.store.fcfh.khxm,
              yclyj:this.store.fcfh.yclyj,
              fssj: this.sj.fsrq,
              zysy:this.store.fcfh.zysy
            },
            task:this.curTask
          };
          formData.append("fh", JSON.stringify(params));
        }
        for(let i=0;i<=this.bjFiles.length;i++){
          formData.append("files", this.bjFiles[i]);
        }
        this.isLoading=true
        if (this.tqBh == "") {
          this.uploadFileRequest("/api/v1/fcfh/saveFh", formData).then(resp => {
            if (resp && resp.status == 200) {
              this.isLoading=false
              Artery.message.info("保存成功");
              //保存后跳转到待办页面
              this.$router.push({ path: "/reviewCheckList" });
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
          this.$router.push({ path: "/reviewCheckList" });
        }
      },
      // 保存并呈报
      saveUpButn() {
        if (this.fcqk =='' ||  this.fcqk ==null) {
          Artery.message.info({
              content:"复查情况及更正意见不能为空",
              duration:3
          });
          return;
        }
        if (this.sqly =='' ||  this.sqly ==null) {
          Artery.message.info({
              content:"申请理由不能为空",
              duration:3
          });
          return;
        }
        var yspr ="";
        if (this.spr !='' && this.spr !=null) {
          yspr= JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userId+";";
        }
        let formData = new FormData();
        if(this.editPage == "edit") {
          let editParams = {
            fcfh:{
              sqly: this.sqly,
              bh:this.bh,
              dqspr:this.spr,
              // yspr:yspr,
              lx:"2"
            }
          };
          formData.append("fh", JSON.stringify(editParams));
        } else {
          let params = {
            fcfh:{
              sqly: this.sqly,
              fcx: this.store.fcfh.fcx,
              zfxxBh:this.store.fcfh.zfxxbh,
              fcqk:this.fcqk,
              sqsj: this.store.fcfh.sqsj,
              fcrq:this.store.fcfh.fcrq,
              dqspr:this.spr,
              // yspr:yspr,
              rjzBh:this.store.fcfh.rjzbh,
              fcBh:this.store.fcfh.bh,
              lx:'2'
            },
            fcmx: {
              lx:this.store.fcfh.fcx,
              khxm:this.store.fcfh.khxm,
              yclyj:this.store.fcfh.yclyj,
              fssj: this.sj.fsrq,
              zysy:this.store.fcfh.zysy
            }
          };
          formData.append("fh", JSON.stringify(params));
        }
        for(let i=0;i<=this.bjFiles.length;i++){
          formData.append("files", this.bjFiles[i]);
        }

        var xybSprParams = {
          curTaskId:"",
          spAuthority:"jy.imp.jfkh.splc.fcfhsp.",
          corpId:JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).corpId
        };
        var tjParam = {
          bh: this.tqBh,
          lx: "2"
        }
        let _this = this;
        _this.isLoading=true;
        try {
          //第一次保存并呈报、编辑保存并呈报
          if (_this.tqBh == "") {
            _this.uploadFileRequest("/api/v1/fcfh/saveFh", formData).then(resp => {
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
        var yspr ="";
        if (this.spr !='' && this.spr !=null) {
          yspr= JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).userId;
        }
        //编辑保存并呈报
        if (_this.curTask =="") {
          var task ={
            id:_this.store.fcfh.taskid,
            taskDefinitionKey:_this.store.fcfh.spjdkey,
          }
          _this.curTask = task;
        }
        let params = {
          fcfh:{
            bh: _this.tqBh,
            dqspr:_this.spr,
            yspr:yspr,
            lx:"2"
          },
          task:_this.curTask
        };
        _this.isLoading=true
        formData.append("fcfh",JSON.stringify(params));
        _this.postRequest("/api/v1/fcfh/cbFcfh", formData).then(resp => {
          if (resp && resp.status == 200) {
            _this.isLoading=false
            Artery.message.info("保存并呈报成功");
            _this.$refs.pltjWindow.close();
            //保存后跳转到待办页面
            _this.$router.push({ path: "/reviewCheckList" });
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
      delFile: function(item,index) {
        this.deleteRequest("/api/v1/system/deleteFile/"+ this.deleteFile.bh).then(resp=> {
          if (resp && resp.status == 200) {
            Artery.message.info("删除成功");
            this.ylfiles.splice(this.deleteFile.index,1);
            this.$refs.attach1.close()
            this.$nextTick(function(){
              this.$refs.scroll.update()
            })
          } else {
            Artery.message.error({
               content:"删除失败",
               duration:3
            });
            this.$refs.attach1.close()
            this.$nextTick(function(){
              this.$refs.scroll.update()
            })
          }
        });
      },
      openDeleteModal(bh,index){
        this.$refs.attach1.open()
        this.deleteFile.index=index
        this.deleteFile.bh=bh
      },
      /**
       * 打开提示删除弹窗
       */
      openAttachModal(index){
        this.$refs.attach.open()
        this.attachIndex=index
      },
      /**
       * 删除上传文件
       */
      deleteUploadFile: function() {
        this.bjFiles.splice(this.attachIndex, 1);
        this.$refs.scroll.update()
        this.$refs.attach.close()
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
      //处理意见转换
      clyjZh:function (row, column) {
        var key = "30111008-" + row;
        var value = JSON.parse(localStorage.getItem(_jfkh.normalCodeList))[key];
        return row != undefined ? (value != undefined ? value.name :"") : "";
      }
    },
    computed: {},
    watch:{
      fcqk:function(val,oldVal){
        this.$refs.scroll.update()
      },
      sqly:function(val,oldVal){
        this.$refs.scroll.update()
      }
    },
    mounted() {
      this.$refs.scroll.update()
    },
    created() {
      //新增页面
      //编辑页面
      this.store=JSON.parse(localStorage.getItem("reviewEditData"))
      if (this.store == null) {
        this.store = JSON.parse(localStorage.getItem("xzFhData"));
      }
      this.editPage = this.store.edit;
      if(this.editPage == "edit") {
        this.breadcrumbdata[1].name="复核编辑"
        this.bh = this.store.fcfh.bh;
        for (var i = 0; i < this.store.files.length; i++) {
          this.ylfiles.push(this.store.files[i])
        }
        this.sqly = this.store.fcfh.sqly;
      }
      this.sj.zysy = this.store.fcfh.zysy;
      this.sj.fsrq = this.store.fcfh.fsrq;
      this.sj.khlx = this.store.fcfh.fcx;
      if (this.sj.khlx !='' && this.sj.khlx != null) {
        this.sj.khlx = this.khlxZh(this.sj.khlx,'');
      }
      this.sj.khxm = this.store.fcfh.khxm;
      if (this.sj.khxm !='' && this.sj.khxm !=null) {
        this.sj.khxm = this.khxzh(this.sj.khxm,"");
      }
      this.sj.clyj = this.store.fcfh.yclyj;
      this.sj.zfxm = this.store.fcfh.zfxm;
      this.sj.zfbh = this.store.fcfh.zfbh;
      if (this.store.fcfh.fcqk) {
        this.fcqk = this.store.fcfh.fcqk;
      }
      if (this.store.fcfh.jyclyj) {
        //更正意见转换
        var clyj = this.clyjZh(this.store.fcfh.jyclyj,null);
        this.fcqk = this.fcqk+"\n"+clyj
      }
    }
  };
</script>

<style scoped>
  .fd-review-fc .cc_textarea.aty-form-item{
    margin-bottom:20px;
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
  .ylfiles{
    color: #0099ff;
    font-size: 14px;
    line-height: 34px;
    height:34px;
    cursor: pointer;
  }
</style>
