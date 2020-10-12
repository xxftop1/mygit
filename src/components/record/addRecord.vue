<template>
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
    <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
    <div class="main_box">
      <aty-row class="search_panel">
        <aty-button class="fd-btn-green  fl fd-btn-link" @click="goAddRecordList()">
          <i><img src="../../assets/images/menu.png"></i>
          <span>
            补记列表
          </span>
        </aty-button>
        <aty-button  text="保存" class="fd-btn-blue fr" @click.native="saveAndToList">
          <i>
            <img src="../../assets/images/save.png">
          </i>
          <span>保存</span>
        </aty-button>
      </aty-row>
      <div class="fd-filter-panel">
        <aty-form :data="bjForm" ref="bjForm">
          <aty-row class="search_option_box fd-bj-row">
            <aty-col  span="8" class="search_option_marginb required">
              <p class="search_option_text">罪犯姓名/编号：</p>
              <aty-input class="search_option_input" name="zfxmbh" readonly  required :rules="rules.required"
                         v-model="bjForm.zfxmbh" @click.native="openModalEvent"  clearable :show-message="false">
              </aty-input>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required">
              <p class="search_option_text">中止考核日期：</p>
              <aty-date-picker class="dr_date_pick" type="date" :editable="false"  required  :rules="rules.required"
                               name="endDate" v-model="bjForm.endDate.fullyear" @change="endDateChange" clearable
                               :show-message="false">
              </aty-date-picker>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required">
              <p class="search_option_text">开始考核日期：</p>
              <aty-date-picker class="dr_date_pick" type="date" :editable="false" required  :rules="rules.required"
                               name="startDate" v-model="bjForm.startDate.fullyear" @change="startDateChange"
                               clearable :show-message="false" ref="startDate">
              </aty-date-picker>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required">
              <p class="search_option_text">补记原因：</p>
              <aty-select class="search_option_input" v-model="bjForm.bjyy" required :rules="rules.required"
                          :data="reasonList" @change="bjyySelectChange" clearable :show-message="false">
              </aty-select>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required"  v-if="isSpecial">
              <p class="search_option_text">看守所：</p>
              <aty-radio-group name="sftq" v-model="bjForm.sftq" :data-list="radioGroup" :rules="rules.required" :show-message="false"  @change="sftqHandler"></aty-radio-group>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required" v-if="isGuilty">
              <p class="search_option_text">是否有罪：</p>
              <aty-radio-group  name="sfyz" v-model="bjForm.sfyz"  :data-list="radioGroup" :rules="rules.required" :show-message="false" @change="sfyzHandler"></aty-radio-group>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required" v-if="isAddSentence">
              <p class="search_option_text">是否加刑：</p>
              <aty-radio-group  name="sfjx" v-model="bjForm.sfjx"  :data-list="radioGroup" :rules="rules.required" :show-message="false" @change="sfjxHandler"></aty-radio-group>
            </aty-col>
            <aty-col  span="8" class="search_option_marginb required" v-if="isHonest">
              <p class="search_option_text">是否坦白过：</p>
              <aty-radio-group  name="sftbg" v-model="bjForm.sftbg"  :data-list="radioGroup" :rules="rules.required" :show-message="false"  @change="sftbgHandler"></aty-radio-group>
            </aty-col>
          </aty-row>
        </aty-form>
        <p v-if="type == 3" class="score-row">前三个月基础分平均分：<span class="score">{{pjf}}</span> 分</p>
      </div>
      <template  v-if="type == 1" class="bj-table">
        <aty-table
          class="es_table fd-bj-table"
          :pageable-data="tableData"
          style="width: 100%; margin-top: 20px;" ref="table" :row-class-name="tableRowClassName" :exp-all="false"  :exp-current-page="false">
          <aty-table-column
            prop="bjny"
            label="年月"
            width="120px"  class-name="yearMonth">
          </aty-table-column>
          <aty-table-column label="基础分" prop="jcfArry">
            <aty-table-column  label="教育" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag" class="required">
                  <input class="es_table_input required"  :required="true"   v-model="scope.row.jcfArry[0]"
                         @blur="validator('基础分（教育）',scope.row.jcfArry[0],haveCapacity?65:100)" type="number">
                </div>
                <div v-else>{{scope.row.jcfArry[0] == '' ? "0" : scope.row.jcfArry[0]}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag" class="required">
                  <input class="es_table_input required" required="true" v-model="scope.row.jcfArry[1]"
                         @blur="validator('基础分（劳动）',scope.row.jcfArry[1],haveCapacity?35:0)"  type="number">
                </div>
                <div v-if="!scope.row.editflag">{{scope.row.jcfArry[1] == '' ? "0" : scope.row.jcfArry[1]}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="加分">
            <aty-table-column  label="教育" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag">
                  <input class="es_table_input"  v-model="scope.row.jfArry[0]"
                         @blur="validator('加分（教育）',scope.row.jfArry[0],32)"  type="number">
                </div>
                <div v-else>{{scope.row.jfArry[0] == '' ? "0" : scope.row.jfArry[0]}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag">
                  <input class="es_table_input"  v-model="scope.row.jfArry[1]"
                         @blur="validator('加分（劳动）',scope.row.jfArry[1],haveCapacity?17:0)"  type="number">
                </div>
                <div v-if="!scope.row.editflag">{{scope.row.jfArry[1] == '' ? "0" : scope.row.jfArry[1]}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="扣分">
            <aty-table-column  label="教育" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag">
                  <input class="es_table_input"  v-model="scope.row.kfArry[0]"
                         @blur="validatorSz('扣分（教育）',scope.row.kfArry[0])"  type="number">
                </div>
                <div v-else>{{scope.row.kfArry[0] == '' ? "0" : scope.row.kfArry[0]}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.kfArry[1]"  type="number"></div>
                <div v-if="!scope.row.editflag">{{scope.row.kfArry[1] == '' ? "0" : scope.row.kfArry[1]}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="单项处罚">
            <aty-table-column  label="教育" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.dxcfArry[0]"  type="number"></div>
                <div v-else>{{scope.row.dxcfArry[0] == '' ? "0" : scope.row.dxcfArry[0]}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.dxcfArry[1]"  type="number"></div>
                <div v-if="!scope.row.editflag">{{scope.row.dxcfArry[1] == '' ? "0" : scope.row.dxcfArry[1]}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="专项加分">
            <aty-table-column  label="教育" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.zxjfArry[0]"  type="number"></div>
                <div v-else>{{scope.row.zxjfArry[0] == '' ? "0" : scope.row.zxjfArry[0]}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="劳动" width="80"  :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.zxjfArry[1]"  type="number"></div>
                <div v-if="!scope.row.editflag">{{scope.row.zxjfArry[1] == '' ? "0" : scope.row.zxjfArry[1]}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column
            prop="hj"
            label="合计" width="80" :showOverflowTooltip="false" >
            <template slot-scope="scope">
              <span  v-text="getTotalResult(scope)"></span>
            </template>
          </aty-table-column>
          <aty-table-column
            prop="bz"
            label="备注"  :showOverflowTooltip="false">
            <template slot-scope="scope" >
              <div v-if="scope.row.editflag"><input class="es_table_input bz-input"  v-model="scope.row.bz" :maxlength="100"></div>
              <div v-if="!scope.row.editflag"  :title="scope.row.bz">{{scope.row.bz}}</div>
            </template>
          </aty-table-column>
        </aty-table>
      </template>
      <template v-else-if="type == 2">
        <aty-row class="search_option_box fd-bj-row">
          <aty-col  span="8" class="search_option_marginb">
            <p class="search_option_text">处理意见：</p>
            <aty-text class="punish">取消已有奖励和考核积分</aty-text>
          </aty-col>
        </aty-row>
      </template>
      <template  v-else>
        <aty-row class="fd-score-list" v-if="scoreList.length > 0">
          <template v-for="(item,index) in dateList" >
            <aty-col span="4" :key="item.index" :class="{required:!(index==(dateList.length-1))}">
              <template>
                <div class="score-inner">
                  <h3>{{item.year}}-{{item.month}}</h3>
                  <aty-input label="分数：" v-model="item.score" class="score-input"  v-if="index !=(dateList.length-1)"
                             :rules="rules.scorelist" @keyup="keyupEvent(item)" :show-message="false" :disabled="true">
                  </aty-input>
                  <aty-input label="分数：" v-model="item.score" class="score-input" @keyup="keyupEvent(item)" :show-message="false" v-else></aty-input>
                </div>
              </template>
            </aty-col>
          </template>
        </aty-row>
      </template>
      <template>
        <aty-row class="fd-upload fd-bj-upload">
          <aty-upload :multiple="true"
                      :class="{required:isUploadRequired}"  label="相关附件："
                      :required="isUploadRequired"
                      :label-width="100" prop="label"
                      :min="20" action="#"
                      :max-size="200*1024"
                      :before-upload="handleUpload"
                      :show-message="true"  accept=".doc,.docx,.pdf,.jpg,.jpeg,.bmp,.png,.xls,.xlsx"
                      :show-upload-list="true" submit-with-form  @on-exceeded-size="exceededSizeEvent">
            <aty-button type="ghost" class="fd-btn-green fd-btn-upload">
              <i><img src="../../assets/images/upload.png"></i>
              上传
            </aty-button>
          </aty-upload>
          <template>
            <ul class="fileList">
              <li v-for="(item,index) in bjFiles" :key="index">
                <aty-text :text="item.name"></aty-text>
                <aty-text @click="openAttachModal(index)">
                  <aty-icon type="android-close" size="16" style="color: #f00; margin-left:10px;"></aty-icon>
                </aty-text>
              </li>
            </ul>
          </template>
        </aty-row>
      </template>
    </div>
    <!-- </aty-scroll> -->
    </happy-scroll>
    <!-- pop tab1 弹窗 -->
    <aty-modal class="rl_pop_box fd-bj-zfxmTable" ref="modal" width="650" closable="" :mask-closable="false" height="400">
      <div class="pop_title">罪犯姓名/编号</div>
      <div class="pop_main_box">
        <aty-table :pageable-data="popTableData" style="width: 608px;" class="popTable" @row-click="rowSelectChange"
                   :row-class-name="tableRowClassName" @load-data="loadData"  height="400" :exp-all="false"
                   :exp-current-page="false">
          <aty-table-column prop="xm" label="罪犯姓名" filter-type="string"  :showOverflowTooltip="false" width="314px">
            <template slot-scope="scope">
              <span class="circle radio" :class="{check:scope.$index === selectIndex}"></span>
              <aty-text class="name">{{scope.row.xm}}</aty-text>
            </template>
          </aty-table-column>
          <aty-table-column prop="zfbh" label="罪犯编号" filter-type="string" width="294px">
          </aty-table-column>
        </aty-table>
      </div>
    </aty-modal>
    <aty-modal title="删除附件"  class="fd-bj-modal" ok-text="确定" cancel-text="取消" ref="attach" closable  width="400" @on-ok="deleteUploadFile"  :mask-closable="false">
      <aty-text text="确定要删除此附件？"></aty-text>
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
    data: function() {
      return {
        csrq:"",//罪犯出生日期
        ywldnl:"",//有无劳动能力
        breadcrumbdata: [{
            name: '补记',
            href: "/record/addRecordList"
          },
          {
            name: '新增补记',
            href: '/record/addRecord'
          }
        ],
        isLoading:false,
        barVisiable: false, //进度条
        precent: 0,
        loadingStatus: false, //按钮上传状态
        selectIndex:'',
        jcfSum:'',
        jfSum:'',
        kfSum:'',
        dxcfSum:'',
        zxjfSum:'',
        score:'',
        zfxxbh:'',
        bjForm:{
          zfxmbh:'',
          endDate:{
            year:null,
            month:null,
            fullyear:null
          },
          startDate:{
            year:null,
            month:null,
            fullyear:null
          },
          bjyy:'',
          sftq:'',
          sfyz:'',
          sfjx:'',
          sftbg:''
        },
        clyj:'',
        pjf:'0',
        radioGroup:[
          {
            code: '1',
            codeType:'radioGroup',
            name: '是'
          },
          {
            code: '2',
            codeType:'radioGroup',
            name: '否'
          }
        ],
        scoreList:[],
        bjmxList:[],
        tableData:[],
        bjFiles:[],
        rules:{
          required:[
            {
              required:true,
              message:'该项为必填'
            }
          ],
          scorelist:[
            {
              type:'number',
              message: "分数必须为数值",
              trigger: "blur",
              validator:function(rule,value,callback){
                var reg=/^(-?[1-9]\d*)|0$/
                if(reg.test(value)){
                  callback()
                }
              }
            },
            {
              required:true,
              message:"该项为必填"
            }
          ],
        },
        popTableData:[],
        bjxzShow:true,
        curUserInfo:{},
        zfxxbh:'',
        attachIndex:'',
        /*劳动平均分*/
        ldPjf:'0',
        /*教育平均分*/
        jyPjf:'0'
      }
    },
    methods:{
      sftqHandler(){
        this.bjForm.sfyz=''
        this.bjForm.sfjx=''
        this.bjForm.sftbg=''
        // this.$refs.scroll.update()
      },
      sfyzHandler(){
        this.bjForm.sfjx=''
        this.bjForm.sftbg=''
        // this.$refs.scroll.update()
      },
      sfjxHandler(){
        this.bjForm.sftbg=''
        // this.$refs.scroll.update()
      },
      sftbgHandler(){
        // this.$refs.scroll.update()
      },
      keyupEvent(item){
        item.score = item.score.replace(/[^(\d|.\-)]/g, "");
      },
      exceededSizeEvent(){
        Artery.message.info({
           content:"上传文件不能超过200M",
           duration:3
        });
      },
      getTotalResult(scope){
        var result=parseInt(scope.row.jcfArry[0]=='' ? "0":scope.row.jcfArry[0]) + parseInt(scope.row.jcfArry[1] == '' ? "0":scope.row.jcfArry[1]) + parseInt(scope.row.jfArry[0]) + parseInt(scope.row.jfArry[1]) - Math.abs(scope.row.kfArry[0]) - Math.abs(scope.row.kfArry[1]) - Math.abs(scope.row.dxcfArry[0]) - Math.abs(scope.row.dxcfArry[1]) + Math.abs(scope.row.zxjfArry[0]) + Math.abs(scope.row.zxjfArry[1])
        scope.row.hj=result
        return result
      },
      // 跳转补记列表页
      goAddRecordList() {
        this.$router.push({path: '/record/addRecordList'});
      },
      /**
       * 删除上传文件
       */
      deleteUploadFile: function() {
        this.bjFiles.splice(this.attachIndex, 1);
        // this.$refs.scroll.update()
        this.$refs.attach.close()
      },
      getCurUserInfo() {
        let _this = this;
        _this.curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
        let rightList = curUserInfo.userRightList;
        _this.bjxzShow = this.checkLinkShow("jy.imp.jfkh.bj_xz", rightList);
      },
      tableRowClassName({row, rowIndex}){
        row.index = rowIndex;
      },
      rowSelectChange(row,event,column){
        this.selectIndex=row.index
        this.bjForm.zfxmbh=row.xm;
        this.zfxxbh = row.bh;
        this.csrq = row.csrq;
        this.ywldnl = row.ywldnl;
        this.$refs.modal.close()
      },
      openModalEvent(){
        this.$refs.modal.open()
      },
      openAttachModal(index){
        this.$refs.attach.open()
        this.attachIndex=index
      },
      //初始化罪犯姓名编号
      loadData: function (queryInfo) {
        var _this = this;
        var list = queryInfo.filterList;
        var zfbh = "";
        var xm = "";
        if (list != undefined && list.length > 0) {
          for (var i = 0; i < list.length; i++) {
            if (list[i].column == "zfbh") {
              zfbh = list[i].value;
            }
            if (list[i].column == "xm") {
              xm = list[i].value;
            }
          }
        }
        var params = {
          zfbh: zfbh,
          xm: xm,
          corp:JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).corpId,
          dept:JSON.parse(localStorage.getItem(_jfkh.curUserInfo)).deptId
        }
        _this.postRequest("/api/v1/system/getZfxx", params).then(resp => {
          if (resp.data == undefined || resp.data.length == 0) {
            _this.popTableData = [];
            return;
          }
          _this.popTableData = [];
          _this.popTableData = resp.data;
        });
      },
      validator(name,input,range,scope,params){
        var reg=null
        if(range === 32){
          reg = new RegExp("^(\\d|[12]\\d|3[012])$");
        }else if(range === 35){
          reg = new RegExp("^(\\d|[12]\\d|3[012345])$");
        }else if(range === 17){
          reg = new RegExp("^(\\d|[1][01234567])$");
        }else if(range === 65){
          reg = new RegExp("^(\\d|[12345]\\d|6[012345])$");
        }else if(range === 100){
          reg = new RegExp("^(\\d|[1-9]\\d|100)$");
        }else if(range === 0) {
          reg = new RegExp("^[0]$");
        }else{
          reg = new RegExp("^(\\d$)");
        }
        if(!reg.test(input)) {
          Artery.message.info({
             content:name+"只能输入数字，范围0-"+range,
             duration:3
          });
        }
      },
      validatorSz(name,input){
        var reg=null
        reg = new RegExp("^(\\d|[1-9]\\d|10000)$");
        if(!reg.test(input)) {
          Artery.message.info({
             content:name+"只能输入数字",
             duration:3
          });
        }
      },
      handleUpload: function(f) {
        var _this = this;
        this.bjFiles.push(f);
        // this.$refs.scroll.update()
        return false;
      },
      //特请页面
      tqym() {
        for (var i =0; i< this.dateList.length; i++) {
          var tq ={
            bjny:'',
            jcfArry:['',''],
            jfArry:['0','0'],
            kfArry:['0','0'],
            dxcfArry:['0','0'],
            zxjfArry:['0','0'],
            hj:'',
            bz:"",
            editflag:true
          };
          var bjny = this.dateList[i].year+"-"+this.dateList[i].month;
          tq.bjny = bjny;
          this.tableData.push(tq);
          // this.$refs.scroll.update()
        }
      },
      //计算平均分
      jspjf() {
        var params = {
          zfxxbh:this.zfxxbh,
          khyf: this.bjForm.endDate.year+"-"+(this.bjForm.endDate.month)
        }
        this.getRequest("/api/v1/bj/getLdPjf",params).then(resp=>{
          if (resp && resp.status == 200) {
            this.ldPjf = resp.data;
            this.getRequest("/api/v1/bj/getJyPjf",params).then(resp1=>{
              if (resp1 && resp1.status == 200) {
                this.jyPjf = resp1.data;
                this.pjf ='0';
                this.pjf = parseInt(this.ldPjf) + parseInt(this.jyPjf);
                if (this.scoreList !=null && this.scoreList.length >0) {
                  for (var i=0;i<this.scoreList.length;i++) {
                    if (i === this.scoreList.length-1) {
                      this.scoreList[i].score="";
                    } else {
                      this.scoreList[i].score = this.pjf;
                    }
                  }
                }
              }
            })
          }
        })
      },
      saveAndToList(){
        let _this=this
        //判断罪犯编号空
        if (this.bjForm.zfxmbh =="" || this.bjForm.zfxmbh ==null) {
          Artery.message.info({
             content:"罪犯姓名编号为空",
             duration:3
          });
          return;
        }
        if (this.bjForm.bjyy =="" || this.bjForm.bjyy ==null) {
          Artery.message.info({
              content:"补记原因为空",
              duration:3
          });
          return;
        }
        if (this.bjForm.endDate.fullyear =="" || this.bjForm.endDate.fullyear ==null) {
          Artery.message.info({
              content:"中止考核日期为空",
              duration:3
          });
          return;
        }
        if (this.bjForm.startDate.fullyear =="" || this.bjForm.startDate.fullyear ==null) {
          Artery.message.info({
              content:"开始考核日期为空",
              duration:3
          })
          return;
        }
        if (this.bjForm.startDate.fullyear < this.bjForm.endDate.fullyear) {
          Artery.message.info({
              content:"开始考核日期必须在中止日期之后",
              duration:3
          });
          return;
        }
        if (this.isSpecial && (this.bjForm.sftq =="" ||this.bjForm.sftq ==null)) {
          Artery.message.info({
              content:"请选择看守所",
              duration:3
          });
          return;
        }
        if (this.isGuilty && (this.bjForm.sfyz =="" ||this.bjForm.sfyz ==null)) {
          Artery.message.info({
              content:"请选择是否有罪",
              duration:3
          });
          return;
        }
        if (this.isAddSentence && (this.bjForm.sfjx =="" ||this.bjForm.sfjx ==null)) {
          Artery.message.info({
              content:"请选择是否加刑",
              duration:3
          });
          return;
        }if (this.isHonest && (this.bjForm.sftbg =="" ||this.bjForm.sftbg ==null)) {
          Artery.message.info({
              content:"请选择是否坦白过",
              duration:3
          });
          return;
        }
        if(this.type == 3){
          this.bjmxList=[]
          for (var i =0; i< this.dateList.length; i++) {
            var bjny = this.dateList[i].year + "-" + this.dateList[i].month;
            var fs = this.dateList[i].score;
            var jcfArry=["0","0"];
            if (fs != "") {
              jcfArry =[this.jyPjf,this.ldPjf];
            }
            this.bjmxList.push({bjny: bjny, fs: fs,jcfArry:jcfArry});
            if (i != (this.dateList.length - 1)) {
              if (this.dateList[i].score === "") {
                Artery.message.info({
                    content:"除最后一项其余为必填",
                    duration:3
                });
                return;
              }
            }
            if (i == (this.dateList.length - 1) && this.dateList[i].score != "" && this.dateList[i].score != this.pjf) {
              Artery.message.info({
                    content:"分数必须跟前三个月平均分保持一致",
                    duration:3
              });
              return;
            }
          }
        }
        if(this.type == 1){
          this.bjmxList = this.tableData;
          for (var i =0; i< this.tableData.length; i++) {
            if(this.tableData[i].jcfArry[0] ==''){
              Artery.message.info({
                  content:"基础分（教育）为必填项",
                  duration:3
              })
              return;
            }
            var yldnlJy = parseInt(this.tableData[i].jcfArry[0])<0 || parseInt(this.tableData[i].jcfArry[0])>65;
            var wldnlJy = parseInt(this.tableData[i].jcfArry[0])<0 || parseInt(this.tableData[i].jcfArry[0])>100;
            if(this.haveCapacity?yldnlJy:wldnlJy){
              Artery.message.info({
                  content:this.haveCapacity?"基础分（教育）输入范围0-65":"基础分（教育）输入范围0-100",
                  duration:3
              })
              return;
            }
            if(this.tableData[i].jcfArry[1] ==''){
              Artery.message.info({
                  content:"基础分（劳动）为必填项",
                  duration:3
              })
              return;
            }
            var yldnlLd = parseInt(this.tableData[i].jcfArry[1])<0 || parseInt(this.tableData[i].jcfArry[1])>35;
            var wldnlLd = parseInt(this.tableData[i].jcfArry[1]) != 0;
            if(this.haveCapacity?yldnlLd:wldnlLd){
              Artery.message.info({
                  content:this.haveCapacity?"基础分（劳动）输入范围0-35":"基础分（劳动）输入范围0-0",
                  duration:3
              })
              return;
            }
            if(parseInt(this.tableData[i].jfArry[0])<0 || parseInt(this.tableData[i].jfArry[0])>32){
              Artery.message.info({
                  content:"加分（教育）输入范围0-32",
                  duration:3
              })
              return;
            }
            var yldnlJfLd = parseInt(this.tableData[i].jfArry[1])<0 || parseInt(this.tableData[i].jfArry[1])>17;
            var wldnlJfLd = parseInt(this.tableData[i].jfArry[1]) != 0;
            if(this.haveCapacity?yldnlJfLd:wldnlJfLd){
              Artery.message.info({
                  content:this.haveCapacity?"加分（劳动）输入范围0-17":"加分（劳动）输入范围0-0",
                  duration:3
              })
              return;
            }
          }
          if (this.bjFiles.length == 0) {
            Artery.message.info({
                content:"看守所页面请上传附件",
                duration:3
            });
            return;
          }
        }
        //有罪页面分数置成零
        if(this.type == 2){
          this.bjmxList=[]
          for (var i =0; i< this.dateList.length; i++) {
            var bjny = this.dateList[i].year + "-" + this.dateList[i].month;
            var fs = "0";
            var jcfArry =["0","0"];
            this.bjmxList.push({bjny: bjny, fs: fs,jcfArry:jcfArry});
          }
        }
        let params = {
          bj:{
            bjrq: new Date(),
            bjyy: this.bjForm.bjyy,
            kskhrq: this.bjForm.startDate.fullyear,
            sfjx: this.bjForm.sfjx,
            sftbg: this.bjForm.sftbg,
            sftq: this.bjForm.sftq,
            sfyz: this.bjForm.sfyz,
            zfxxBh: this.zfxxbh,
            zzkhrq: this.bjForm.endDate.fullyear,
            bjbz:this.type
          },
          bjmxList:this.bjmxList
        };
        let formData = new FormData();
        this.barVisiable = true;
        this.loadingStatus = true;
        //开始文件上传
        for(let i=0;i<=this.bjFiles.length;i++){
          formData.append("files", this.bjFiles[i]);
        }
        this.isLoading=true
        formData.append("bj", JSON.stringify(params));
        this.uploadFileRequest("/api/v1/bj/addBj", formData).then(resp => {
          if (resp && resp.status == 200) {
            var msg = resp.data.bjbh;
            this.isLoading=false
            Artery.message.info("保存成功");
            this.$router.push({ path: "/record/addRecordList" });
          } else {
            setTimeout(function(){
              _this.isLoading=false
               Artery.message.error({
                   content:"保存失败",
                   duration:3
               });
            },6000)
          }
        });
      },
      bjyySelectChange(value,name,index,event){
        //当下拉选择时将radio设为默认
        this.bjForm.sftq=''
        this.bjForm.sfyz=''
        this.bjForm.sfjx=''
        this.bjForm.sftbg=''
      },
      startDateChange(value,name){
        this.bjForm.startDate=this.camputeDate(value)
        if(this.bjForm.endDate.fullyear =='' || this.bjForm.endDate.fullyear === null){
          Artery.message.info({
               content:"请先选择中止考核日期",
               duration:3
          });
        }else{
          this.createMonthList()
          this.tqym();
        }
      },
      endDateChange(value,name){
        if(this.bjForm.startDate.fullyear!==null){
          this.bjForm.startDate.fullyear =null
        }
        this.bjForm.endDate.fullyear=null;
        this.bjForm.endDate=this.camputeDate(value);
        if (this.bjForm.zfxmbh !="" && this.bjForm.endDate !="") {
          this.jspjf();
        }
        if (value != "") {
          Artery.message.info({
              content:"请选择开始考核日期",
              duration:3
          });
        }
      },
      createMonthList(){
        this.scoreList=[]
        this.tableData=[]
        if(this.bjForm.startDate.fullyear<this.bjForm.endDate.fullyear){
          Artery.message.info({
            content:"开始考核日期必须在中止日期之后",
            duration:3
          });
          return
        }else{
          let months=(this.bjForm.startDate.year - this.bjForm.endDate.year)*12  + (this.bjForm.startDate.month - this.bjForm.endDate.month)+1
          let _this=this
          let tempYear=parseInt(this.bjForm.startDate.year)
          let tempMonth=parseInt(this.bjForm.startDate.month)
          for(var i =0;i < months; i++){
            let temp={
              year:'',
              month:'',
              score:0
            }
            if(tempMonth == 0){
              tempYear=tempYear-1
              tempMonth=12
            }
            temp.month=tempMonth
            temp.year=tempYear
            let x=tempMonth
            tempMonth--
            if(parseInt(x)<10){
              x='0'+x
            }
            temp.month =x
            temp.score=_this.pjf == '0'? 0+"":_this.pjf
            this.scoreList.push(temp)
          }
          this.scoreList[0].score=''
          // this.scoreList[months-1].score=''
          // this.$refs.scroll.update()
        }
      },
      camputeDate:function(value){
        let fullyear=value
        let tempArr=value.toString().split('-')
        let year =tempArr[0]
        let month =tempArr[1].replace(/\b(0+)/gi,"")
        return {
          year:year,
          month:month,
          fullyear:fullyear
        }
      },
      //新增补记保存行数据
      editButn (scope) {
        this.tableData[scope.$index].editflag = true
      },
      saveButn (scope) {
        this.tableData[scope.$index].editflag = false
      }
    },
    watch:{
      zfxmbh(newValue, oldValue){
        if (newValue ==='' || newValue === null) {
          return;
        }
        if (this.bjForm.endDate ==="" || this.bjForm.endDate ===null) {
          return;
        }
        if (this.bjForm.zfxmbh !="" && this.bjForm.endDate !="") {
          this.jspjf();
        }
      },
    },
    computed:{
      zfxmbh() {
        return this.bjForm.zfxmbh;
      },
      /**
       * @description 有无劳动能力
       */
      haveCapacity() {
        var _this = this;
        var age = _this.jsGetAge(_this.csrq);
        if(_yesOrNo.no == _this.ywldnl  || age < 16) {
          return false;
        }
        if(_yesOrNo.no != _this.ywldnl) {
          return true;
        }
      },
      isSpecial:function(){
        return this.bjForm.bjyy === '2'
      },
      isGuilty:function(){
        return this.bjForm.bjyy === '3' || this.bjForm.bjyy === '4' || (this.bjForm.bjyy === '2' && this.bjForm.sftq === '2')
      },
      isAddSentence:function(){
        return this.bjForm.sfyz === '1'
      },
      isHonest:function(){
        return this.bjForm.sfjx === '1'
      },
      type:function(){
        if(this.bjForm.bjyy === "2" && this.bjForm.sftq === '1'){
          return 1
        }else if((this.bjForm.bjyy==="2" && this.bjForm.sftq === '2' && this.bjForm.sfyz==='1' && this.bjForm.sfjx === '1' && this.bjForm.sftbg === '2')
          || (this.bjForm.bjyy==="3" && this.bjForm.sfyz==='1' && this.bjForm.sfjx === '1' && this.bjForm.sftbg === '2')
          || (this.bjForm.bjyy==="4" && this.bjForm.sfyz==='1' && this.bjForm.sfjx === '1' && this.bjForm.sftbg === '2')){
          return 2
        }else{
          return 3
        }
      },
      dateList:function(){
        return this.scoreList.reverse();
      },
      isUploadRequired:function(){
        if (this.type === 1) {
          return true;
        } else {
          return false;
        }
      },
      reasonList() {
        return JSON.parse(localStorage.getItem(_jfkh.normalCodeTypeList))[_sigleCode.bjyy];
      }
    },
    mounted() {

    },
    created() {
      // this.getCurUserInfo();
    }
  }
</script>

<style scoped>
  /* 弹出框样式 */
  .pop_title{
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
  .pop_main_box{
    padding: 20px 20px;
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  .fd-upload .aty-form-item{
    margin-bottom:0;
    height:30px;
  }
  .aty-table .cell .required:before,
  .required .search_option_text:before{
    content:'*';
    color:red;
    padding-right:5px;
  }
  input.es_table_input{
    width:80%;
    margin:auto;
    text-align:center;
  }
  input.es_table_input.bz-input{
    text-align:left;
  }
  .punish{
    float:left;
    padding-left:126px;
  }
  .fd-home-wrap{
    height:100%;
    /* overflow:hidden; */
  }
  .fd-home-wrap .main_box{
    min-height:calc(100% - 80px);
  }
  .fd-bj-table .cell  input.es_table_input{
    height:25px;
    line-height:25px;
  }
  .search_option_box .search_option_text{
    display: inline-block;
    width: 126px;
    text-align: right;
    height:100%;
    position:absolute;
    top:0;
    left:32px;
  }
  .required .score-input.aty-form-item-required{
    width:100%;
    left:0;
  }
  .search_option_input,
    /* .required  .aty-form-item-required, */
  .search_option_box .aty-date-picker{
    width:calc(100% - 190px);
    position:absolute;
    top:0;
    left:158px;
    right:0;
  }
  .fd-search-btn{
    text-align:right;
  }
  .fd-bj-row.aty-row .aty-col-span-8{
    /* padding-right:65px; */
    padding:0 32px;
    position:relative;
    height:32px;
    line-height:32px;
    margin:10px 0;
  }
  .fd-bj-row.aty-row .aty-radio-group{
    float:left;
    padding-left:136px;
  }
  .fd-bj-row.aty-row .aty-radio-wrapper{
    margin-right: 42px;
  }
  .search_panel .aty-btn  img{
    margin-right:5px;
    margin-top:-2px;
  }
  .score-row{
    line-height:20px;
    padding-left:90px;
    text-align:left;
    margin-bottom:10px;
  }
  .fd-score-list{
    margin:0 -10px 20px;
  }
  .fd-score-list.aty-row{
    text-align:left;
  }
  .fd-score-list.aty-row h3{
    line-height:40px;
    border-bottom:1px solid #e7eef5;
    padding:0 20px;
  }
  .score{
    color:#f16868;
  }
  .fd-score-list .aty-col{
    /* height:115px;
    background:#f5f8fb;
    border:1px solid #e7eef5; */
    padding:0 10px 10px;
  }
  .fd-score-list .score-inner{
    height:115px;
    background:#f5f8fb;
    border:1px solid #e7eef5;
  }
  .fd-score-list .aty-col .aty-form-item{
    margin:16px 0 24px;
    padding:0 9px;
    height:35px;
    line-height:35px;
  }
  .fd-upload{
    text-align:left;
  }
  .fd-score-list .score-input{
    position:relative;
  }
  span.name{
    display:inline-block;
    position:absolute;
    top:10px;
    left:0;
    width:100%;
    height:23px;
    z-index:10;
    margin:auto;
    background:transparent;
    padding-left:30px;
  }
  .popTable table td .radio{
    float:left;
    margin-left:10px;
  }
  span.circle{
    width: 14px;
    height: 14px;
    display:inline-block;
    background-color: #fff;
    border: 1px solid #dddee1;
    border-radius: 50%;
  }
  span.circle.check{
    border-color: #39f;
    position:relative;
  }
  span.circle.check:after{
    position: absolute;
    width: 8px;
    height: 8px;
    left: 2px;
    top: 2px;
    border-radius: 6px;
    display: table;
    border-top: 0;
    border-left: 0;
    content: ' ';
    background-color: #39f;
    display:inline-block;
  }
  .popTable .aty-table tr{
    cursor:pointer;
  }
</style>
