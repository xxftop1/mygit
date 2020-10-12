<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap fd-index-wrap">
      <loading :isLoading="isLoading"></loading>
      <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
      <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
      <div class="main_box">
        <div class="tabs_main_box">
          <div class="dr_edit_butn">
            <aty-button class="dr_edit_b1" type="primary" @click="goAddList()">
              <img src="../../assets/images/menu.png">
              加分扣分通知单列表
            </aty-button>
            <!-- 新增通知单操作按钮 start -->
            <div class="fd-operator-btns">
              <aty-button v-if="editPage != 'edit'" @click="downList()" class="npl_botm_butn" type="primary">下载样表</aty-button>
              <aty-upload v-if="editPage != 'edit'" class="npl_upload" :on-success="fileSuccess" :action="UploadUrl()" :show-upload-list="false">
                <aty-button type="primary">
                  导入
                </aty-button>
              </aty-upload>
              <aty-button v-if="editPage != 'edit'" @click="createList()" class="npl_botm_butn" type="primary">新增</aty-button>
              <aty-button @click="giveButn()" class="npl_botm_butn" type="primary">下发</aty-button>
            </div>
            <!-- 新增通知单操作按钮 end -->
          </div>
          <!-- table區域 start -->
          <aty-table
            class="npl_table fd-addpoint-table"
            :pageable-data="tableData"
            style="width: 100%; margin-top: 20px;" :exp-all="false"  :exp-current-page="false" @row-click="rowClick">
            <aty-table-column
              type="index"
              label="序号"
              width="50"  :showOverflowTooltip="false">
            </aty-table-column>
            <aty-table-column label="监区" width="200"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editFlag">
                  <aty-select-tree class="nomal_tree search_option_input" name="valueobject2" ref="selectTree1"
                                   :data="treeData2" v-model="scope.row.jqId" @change="getZf(scope)" clearable></aty-select-tree>
                </div>
                <div :title="scope.row.jqmc" v-if="!scope.row.editFlag">{{scope.row.jqmc}}</div>
              </template>
            </aty-table-column>
            <aty-table-column
              label="编号（姓名）"
              width="210"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editFlag">
                  <aty-select v-model="scope.row.zfmc" name="valueobject1" ref="zfSelect" :data="zfSeleteList" :filterable="true"></aty-select>
                </div>
                <div :title="scope.row.zfxm" v-if="!scope.row.editFlag">{{scope.row.zfxm}}</div>
              </template>
            </aty-table-column>
            <aty-table-column
              label="发生日期"
              width="130"  :showOverflowTooltip="false">
              <template slot-scope="scope" >
                <div v-if="scope.row.editFlag">
                  <aty-date-picker clearable :options="options3" v-model="scope.row.fsrq" class="dr_date_pick" @change="dateChange" type="date"></aty-date-picker>
                </div>
                <div :title="scope.row.fsrq" v-if="!scope.row.editFlag">{{scope.row.fsrq}}</div>
              </template>
            </aty-table-column>
            <aty-table-column label="主要事实"  :showOverflowTooltip="false" width="310" >
              <template slot-scope="scope">
                <div v-if="scope.row.editFlag"><input class="npl_table_input" v-model="scope.row.zyss" maxlength="23"
                                                      clearable></div>
                <div :title="scope.row.zyss" v-if="!scope.row.editFlag">{{scope.row.zyss}}</div>
              </template>
            </aty-table-column>
            <aty-table-column
              label="考核依据"  :showOverflowTooltip="false">
              <template slot-scope="scope" v-if="tkSeleteList.length">
                <div v-if="scope.row.editFlag">
                  <aty-select class="npl_seleted fd-khyj-select" v-model="scope.row.bhTk" :data="tkSeleteList" :filterable="true" clearable ></aty-select>
                </div>
                <div :title="scope.row.bhTk" v-if="!scope.row.editFlag">{{scope.row.bhTk}}</div>
              </template>
            </aty-table-column>
            <aty-table-column
              label="加扣分分数"
              width="90"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editFlag"><input class="npl_table_input" v-model="scope.row.fz" clearable></div>
                <div :title="scope.row.fz" v-if="!scope.row.editFlag">{{scope.row.fz}}</div>
              </template>
            </aty-table-column>
            <aty-table-column
              label="操作"
              width="160" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <i>
                  <img v-if="!scope.row.editFlag" @click="editButn(scope)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png">
                  <img v-if="!scope.row.editFlag" @click="deleteDialog(scope)" title="删除" class="table_butn" src="../../assets/images/w-png23.png">
                  <img v-if="scope.row.editFlag" @click="saveButn(scope)" title="保存" class="table_butn" src="../../assets/images/save-blue.png">
                  <img v-if="scope.row.editFlag" @click="addDeleteButn(scope)" title="删除" class="table_butn" src="../../assets/images/w-png23.png">
                </i>
              </template>
            </aty-table-column>
          </aty-table>
          <aty-modal title="删除加扣分通知单"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" closable ref="deleteJkftzd" width="400" @on-ok="deleteJkftzd" @on-cancel="cancelDelete" :mask-closable="false">
            <aty-text text="确定要删除这条加扣分通知单吗？"></aty-text>
          </aty-modal>
        </div>
      </div>
      </happy-scroll>
    </div>
</template>

<script>
  import loading from "../base/loading";
  export default {
    data: function() {
      return {
        breadcrumbdata:[
          {
              name:'加扣分通知单',
              href:"/addPointList"
          },
          {
              name:'新增加扣分通知单',
              href:"/newPointList"
          }
        ],
        options3: {
          disabledDate: function(date) {
            return date && date.valueOf() >= Date.now();
          }
        },
        jyName:'',
        jqName:'',
        jyId: '',
        khyj:'',
        jqId:'',
        jqmc:'',
        jkftzdbh:'',
        zfxm:'',
        selectRowIndex:'',
        // table数据
        tableData: [
          {
            index:0,
            bh: '',
            jyId: '',
            jymc: '',
            jqId: '',
            jqmc: '',
            zfmc: '',
            fsrq: '',
            fz: '',
            zyss: '',
            tkId: '',
            bhTk: '',
            // 是否在编辑状态
            editFlag: true,
          },
        ],
        // 每次保存返回的id
        idCodeArr:[],
        // 监狱下拉数据
        jySeleteList: [
        ],
        prisonSelete: 'op1',
        // 监区下拉数据
        jqSeleteList: [
        ],
        prisonAreaSelete: 'opa1',
        // 考核依据下拉数据
        tkSeleteList: [
        ],
        // 罪犯下拉数据
        zfSeleteList: [
        ],
        reasonSelete: 'opr1',
        // 日期是否改变标识
        dateIsChange: false,
        // 是否是编辑标识
        editPage: "",
        valueobject:{},
        valueobject2:{},
        treeData: [],
        allCorpZfxx: [],
        treeData2: [],
        param:{},
        store:null,
        isLoading: false,
      };
    },
    components: {
      loading
    },
    created() {
      var _this = this
      this.store=JSON.parse(localStorage.getItem("addPointData"))
      if(this.store){
        this.editPage = this.store.edit;
        if(this.editPage == "edit"){
          this.param.jqId = this.store.row.jqId;
          this.breadcrumbdata[1].name="加扣分通知单编辑"
          this.tableData = [];
          this.tableData.push(this.store.row);
          var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
          var deptType = userInfo.deptType;
          var corpId = this.tableData[0].jyId;
          //是否可选择非关押罪犯部门 true：不可选 false:可选
          var isSelectFgyzf = true;
          //获取监区信息
          this.getRequest("/api/v1/system/getJq/"+corpId+"/"+deptType+"/"+isSelectFgyzf).then(resp => {
            if (resp && resp.status == 200) {
              for (let index in resp.data.ArrayList) {
                this.$set(this.treeData2, index, resp.data.ArrayList[index])
              }
              this.$refs.selectTree1.update(this.treeData2);
            }
          });
          this.getRequest("/api/v1/zfxxwh/getZfxx/"+this.store.row.jqId).then(resp=> {
            debugger;
            if (resp && resp.status == 200) {
              _this.zfSeleteList = [];
              for(var i=0;i<resp.data.length;i++){
                var code = resp.data[i].zfbh;
                var name = resp.data[i].zfbh+"|"+ resp.data[i].xm;
                var params ={
                  code:code,
                  name:name
                }
                this.zfSeleteList.push(params);
              }
            }
          });
        }
      }
      this.initData();
    },
    mounted() {
    },
    methods: {
      rowClick(row,name,event){
        if(row.jqId != null && row.jqId != ""){
          this.getZfxx(row.jqId);
        }else{
          this.zfSeleteList = [];
        }
      },
      getZfxx(dept){
        let _this = this;
        this.getRequest("/api/v1/zfxxwh/getZfxx/"+dept).then(resp=> {
          if (resp && resp.status == 200) {
            _this.zfSeleteList = [];
              for(var i=0;i<resp.data.length;i++){
                var code = resp.data[i].zfbh;
                var name = resp.data[i].zfbh+"|"+ resp.data[i].xm;
                var params ={
                  code:code,
                  name:name
                }
                _this.zfSeleteList.push(params);
            }
          }
        });
      },
      getZf(item){
        if(item.row.zfmc != null && item.row.zfmc != ""){
          item.row.zfmc = null;
        }
      },
      // 跳转到addlist页面
      goAddList() {
        this.$router.push({path: '/addPointList'});
      },
      //初始化监狱下拉列表
      initData(){
        var _this = this;
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var params = {
          corp:userInfo.corpId
        }
        this.postRequest("/api/v1/system/getZfxx",params).then(resp=> {
          if (resp && resp.status == 200) {
            for(var i=0;i<resp.data.length;i++){
              var code = resp.data[i].zfbh;
              var name = resp.data[i].xm
              var params ={
                code:code,
                name:name
              }
              _this.$set(this.allCorpZfxx,i,params);
            }
          }
        });
        this.getJq();
        this.postRequest("/api/v1/tkwh/getTkListByParam").then(resp =>{
          if(resp && resp.status == 200){
            for(var i=0;i<resp.data.length;i++){
              var code = resp.data[i].tkbh;
              var name = resp.data[i].tkbh+ resp.data[i].tknr;
              var params ={
                code:code,
                name:name
              }
              _this.$set(this.tkSeleteList,i,params);
            }
          }
        });
      },
      //获取监区下拉列表
      getJq(treeNodeData,name,event){
        // if(treeNodeData == null){
        //   return;
        // }
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var deptType = userInfo.deptType;
        var corpId = userInfo.corpId;
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = true;
        //获取监区信息
        this.getRequest("/api/v1/system/getJq/"+corpId+"/"+deptType+"/"+isSelectFgyzf).then(resp => {
          if (resp && resp.status == 200) {
            this.treeData2 = [];
            for (let index in resp.data.ArrayList) {
              this.$set(this.treeData2, index, resp.data.ArrayList[index])
            }
            this.$refs.selectTree1.update(this.treeData2)
          }
        });
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
      // 编辑按钮
      editButn(item) {
        item.row.editFlag = true;
        this.jymc = item.row.jymc;
        //获取罪犯信息
        this.getRequest("/api/v1/zfxxwh/getZfxx/"+item.row.jqId).then(resp=> {
          if (resp && resp.status == 200) {
            this.zfSeleteList = [];
            for(var i=0;i<resp.data.length;i++){
              var code = resp.data[i].zfbh;
              var name = resp.data[i].zfbh+"|"+ resp.data[i].xm;
              var params ={
                code:code,
                name:name
              }
              this.$set(this.zfSeleteList,i,params);
            }
          }
        });
        //获取监区
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        var deptType = userInfo.deptType;
        var corpId = item.row.jyId;
        //是否可选择非关押罪犯部门 true：不可选 false:可选
        var isSelectFgyzf = true;
        //获取监区信息
        this.getRequest("/api/v1/system/getJq/"+corpId+"/"+deptType+"/"+isSelectFgyzf).then(resp => {
          if (resp && resp.status == 200) {
            this.treeData2 = [];
            for (let index in resp.data.ArrayList) {
              this.$set(this.treeData2, index, resp.data.ArrayList[index])
            }
            this.$refs.selectTree1.update(this.treeData2)
          }
        });
      },
      // 保存按钮
      saveButn(item) {
        // 非空校验
        if(this.treeValue == "" || this.treeValue2 == "" || item.row.zfmc == "" || item.row.fsrq == "" || item.row.fz == "" || item.row.zyss == "" ||
          item.row.bhTk == ""){
          Artery.message.info({
            content:"各项不能为空",
            duration:3
          });
          return;
        }
        if(/[^\d\.-]/g.test(item.row.fz)) {
          Artery.message.info({
            content:"分值只能输入数字",
            duration:3
          });
          this.value='';
          return;
        }
        item.row.editFlag = false;

        // 格式化日期
        if(!this.dateIsChange ){
          item.row.fsrq = this.dateFormat(new Date(item.row.fsrq))
        }
        if(item.row.fsrq != null ){
          item.row.fsrq = this.dateFormat(new Date(item.row.fsrq))
        }
        for(var i = 0; i < this.tkSeleteList.length; i++){
          if(item.row.bhTk == this.tkSeleteList[i].code){
            item.row.bhTk = this.tkSeleteList[i].code;
          }
        }
        for(var i = 0; i < this.allCorpZfxx.length; i++){
          if(item.row.zfmc == this.allCorpZfxx[i].code){
            item.row.zfxm = this.allCorpZfxx[i].code+"|"+this.allCorpZfxx[i].name;
          }
        }
        for(var i = 0; i < this.treeData.length; i++){
          if(item.row.jyId == this.treeData[i].id){
            item.row.jymc = this.treeData[i].name;
          }
        }
        for (var i = 0; i < this.treeData2.length; i++) {
          if(this.treeData2[i].children != null && this.treeData2[i].children.length > 0) {
            for (var j = 0; j < this.treeData2[i].children.length; j++) {
              if (item.row.jqId == this.treeData2[i].children[j].id) {
                item.row.jqmc = this.treeData2[i].name + this.treeData2[i].children[j].name;
              }
            }
          } else {
            for (var i = 0; i < this.treeData2.length; i++) {
              if (item.row.jqId == this.treeData2[i].id) {
                item.row.jqmc = this.treeData2[i].name;
              }
            }
          }
        }

        // 调取保存接口
        var params = {
          bh:item.row.bh,
          jymc: item.row.jyId,
          jqmc: item.row.jqId,
          zfmc: item.row.zfmc,
          fsrq: item.row.fsrq,
          fz: item.row.fz,
          zyss: item.row.zyss,
          bhTk: item.row.bhTk
        }

        this.postRequest("/api/v1/jkftzd/jkfAdd",params).then(resp=> {
          if (resp && resp.status == 200) {
            item.row.bh = resp.data.HashMap.bh;
            this.idCodeArr.push(resp.data.HashMap.bh)
            Artery.message.info({
               content:"保存成功",
               duration:1.5
            });
          }else{
            Artery.message.info({
               content:"保存失败",
               duration:3
            });
          }
        })

      },
      //点击删除弹窗
      deleteDialog (props){
        this.$refs.deleteJkftzd.open()
        this.selectRowIndex=props.$index
        this.jkftzdbh = props.row.bh
      },
      //取消删除
      cancelDelete(){
        this.$refs.deleteJkftzd.close()
      },
      //删除加扣分通知单内容
      deleteJkftzd(){
        this.tableData.splice(this.selectRowIndex,1);
        var bh = this.jkftzdbh;
        this.deleteRequest("/api/v1/jkftzd/jkfDelete/"+bh).then(resp=> {
          if (resp && resp.status == 200) {
            Artery.message.info({
               content:"删除成功",
               duration:1.5
            });
          }else{
            Artery.message.info({
               content:"删除失败",
               duration:3
            });
          }
        })
        this.$refs.deleteJkftzd.close()
      },
      // 下载样表
      downList() {
        window.location.href = _server.serverName+"/api/v1/jkftzd/jkftzdListXZ"
      },
      // 文件上传成功
      fileSuccess(item) {
        debugger
        var data = item.ArrayList[item.ArrayList.length-1];
        if(data.hasOwnProperty("idList") && data.idList != null && data.idList.length > 0){
          alert(item.ArrayList[item.ArrayList.length-1].idList);
        }else {
          for (var i = 0; i < item.ArrayList.length; i++) {
            item.ArrayList[i].fsrq = item.ArrayList[i].fsrq.substr(0, 10);
          }
          this.tableData = this.tableData.concat(item.ArrayList);
          for (var i = 0; i < item.ArrayList.length; i++) {
            this.idCodeArr.push(item.ArrayList[i].bh)
          }
          Artery.message.info({
              content:"导入成功",
              duration:1.5
          });
        }
      },
      // 文件上传路径
      UploadUrl() {
        return _server.serverName+"/api/v1/jkftzd/jkftzdListDr"
      },
      // 新增按钮
      createList() {
        var params = {
          index:this.tableData.length,
          jyId: '',
          jqId: '',
          zfmc: '',
          fsrq: '',
          fz: '',
          zyss: '',
          bhTk: '',
          // 是否在编辑状态
          editFlag: true,
        }
        this.tableData.push(params)
      },
      // 新增时删除按钮
      addDeleteButn(item) {
        debugger;
        this.tableData.splice(item.$index,1);
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].index = i;
        }
      },
      // 下发按钮
      giveButn() {
        // 调取接口
        var idCode = this.idCodeArr;
        if(this.idCodeArr.length <= 0){
          Artery.message.info({
              content:"数据未保存，请保存后再点击下发",
              duration:3
          });
          return;
        }else {
          this.putRequest("/api/v1/jkftzd/jkfPublishList/" + idCode).then(resp => {
            if (resp && resp.status == 200) {
              Artery.message.info({
                 content:"下发成功",
                 duration:1.5
              });
              this.$router.push({path: '/addPointList'});
            } else {
              Artery.message.info({
                 content:"下发失败",
                 duration:3
              });
            }
          });
        }
      },
      dateChange() {
        this.dateIsChange = true;
      },
    }
  };
</script>
<style scoped>
  .fd-operator-btns{
    float:right;
    margin:0 auto;
  }
  .fd-khyj-select  .aty-select-dropdown-list{
    float:left;
  }
  .dr_edit_b1{
    height: 30px;
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    background-color: #00ccbb;
    border-color: #00ccbb;
    margin-right: 12px;
  }
  .dr_edit_b1 *{
    vertical-align: middle;
  }
  .dr_edit_b1:hover{
    background-color: #0fdbca;
    border-color: #0fdbca;
  }
  .table_butn{
    margin: 0 4px;
    cursor: pointer;
  }
  .npl_table_input{
    width: 100%;
    height: 30px;
    border: 1px solid #dddee1;
    border-radius: 3px;
    color: #333;
  }
  .fd-addpoint-table  .npl_table_input{
    padding:0 10px;
    font-size:12px;
  }
  .npl_upload,.npl_botm_butn{
    display: inline-block;
    /* margin-top: 20px; */
    margin-right: 5px;
    vertical-align: middle;
  }
</style>
