<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap fd-index-wrap">
    <div class="main_name"><aty-breadcrumb :data="breadcrumbdata" can-click separator=">" ></aty-breadcrumb></div>
    <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
    <!-- <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false"> -->
      <div class="main_box">
        <div v-if="jyStore != null" class="bl-style">
          <span>监狱给本单位设定比例如下：</span>
          <span>
            认罪悔罪优秀{{jyStore[0].rzhzblArry[0]}}%、良好{{jyStore[0].rzhzblArry[1]}}%；
            遵规守纪优秀{{jyStore[0].zgsjblArry[0]}}%、良好{{jyStore[0].zgsjblArry[1]}}%；
            生活卫生优秀{{jyStore[0].shwsblArry[0]}}%、良好{{jyStore[0].shwsblArry[1]}}%；
            接受教育优秀{{jyStore[0].jsjyblArry[0]}}%、良好{{jyStore[0].jsjyblArry[1]}}%；
            劳动态度优秀{{jyStore[0].ldtdblArry[0]}}%、良好{{jyStore[0].ldtdblArry[1]}}%；
            联号无违纪优秀{{jyStore[0].lhwwjblArry[0]}}%、良好{{jyStore[0].lhwwjblArry[1]}}%
          </span>
        </div>
        <!-- table區域 start -->
        <aty-table
          class="es_table fd-edu-table"
          :pageable-data="tableData"
          style="width: 100%;" ref="jytable">
          <aty-table-column
            prop="isSaveable" v-if="false"
            label="是否可以保存">
          </aty-table-column>
          <aty-table-column
            type="index"
            label="序号" class-name="jyw0" :showOverflowTooltip="false">
          </aty-table-column>
          <aty-table-column
            v-if="jqFlag == 1"
            prop="dept"
            label="监区" class-name="jyw1">
            <template slot-scope="scope">
              <a :title="scope.row.deptName"  v-text="scope.row.deptName" ></a>
            </template>
          </aty-table-column>
          <aty-table-column
            v-if="jqFlag == 2"
            prop="dept"
            label="单位" class-name="jyw1">
            <template slot-scope="scope">
              <a :title="scope.row.deptName"  v-text="scope.row.deptName" ></a>
            </template>
          </aty-table-column>
          <aty-table-column
            prop="jqrs"
            label="监区人数" class-name="jyw2">
          </aty-table-column>
          <aty-table-column label="认罪悔罪(%)" ref="rzhz">
            <aty-table-column  label="优秀" prop="rzhzyxbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag">
                  <input class="es_table_input"  v-model="scope.row.rzhzyxbl" @keyup="rzhzKeyUpEvent(scope.row,1,scope)"
                         @blur="blurEvent(scope.row,'rzhz.yx','【认罪悔罪】【优秀】',scope.row.rzhzyxbl)"
                         :class="{error: parseInt(scope.row.rzhzyxbl)>100 || (parseInt(scope.row.rzhzyxbl)<100&&parseInt(scope.row.rzhzlhbl)<100)&&(parseInt(scope.row.rzhzyxbl)+parseInt(scope.row.rzhzlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.rzhzyxbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="良好" prop="rzhzlhbl"  class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.rzhzlhbl"
                                                      @keyup="rzhzKeyUpEvent(scope.row,2,scope)"
                                                      @blur="blurEvent(scope.row,'rzhz.lh','【认罪悔罪】【良好】',scope.row.rzhzlhbl)"
                                                      :class="{error:parseInt(scope.row.rzhzlhbl)>100 || (parseInt(scope.row.rzhzyxbl)<100&&parseInt(scope.row.rzhzlhbl)<100)&&(parseInt(scope.row.rzhzyxbl)+parseInt(scope.row.rzhzlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.rzhzlhbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="一般" prop="rzhzybbl"  class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.rzhzybbl"  @keyup="rzhzKeyUpEvent(scope.row,3,scope)" :class="{error:parseInt(scope.row.rzhzybbl)>100}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.rzhzybbl}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="遵规守纪(%)">
            <aty-table-column  label="优秀" prop="zgsjyxbl"  class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.zgsjyxbl"
                                                      @keyup="zgsjKeyUpEvent(scope.row,1)"
                                                      @blur="blurEvent(scope.row,'zgsj.yx','【遵规守纪】【优秀】',scope.row.zgsjyxbl)"
                                                      :class="{error: parseInt(scope.row.zgsjyxbl)>100 || (parseInt(scope.row.zgsjyxbl)<100&&parseInt(scope.row.zgsjlhbl)<100)&&(parseInt(scope.row.zgsjyxbl)+parseInt(scope.row.zgsjlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.zgsjyxbl == '' ? "0" : scope.row.zgsjyxbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="良好" prop="zgsjlhbl"  class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.zgsjlhbl"
                                                      @keyup="zgsjKeyUpEvent(scope.row,2)"
                                                      @blur="blurEvent(scope.row,'zgsj.lh','【遵规守纪】【良好】',scope.row.zgsjlhbl)"
                                                      :class="{error: parseInt(scope.row.zgsjlhbl)>100 || (parseInt(scope.row.zgsjyxbl)<100&&parseInt(scope.row.zgsjlhbl)<100)&&(parseInt(scope.row.zgsjyxbl)+parseInt(scope.row.zgsjlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.zgsjlhbl == '' ? "0" : scope.row.zgsjlhbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="一般" prop="zgsjybbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.zgsjybbl" @keyup="zgsjKeyUpEvent(scope.row,3)" :class="{error:parseInt(scope.row.zgsjybbl)>100}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.zgsjybbl == '' ? "0" : scope.row.zgsjybbl}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="生活卫生(%)">
            <aty-table-column  label="优秀" prop="shwsyxbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.shwsyxbl"
                                                      @keyup="shwsKeyUpEvent(scope.row,1)"
                                                      @blur="blurEvent(scope.row,'shws.yx','【生活卫生】【优秀】',scope.row.shwsyxbl)"
                                                      :class="{error: parseInt(scope.row.shwsyxbl)>100 || (parseInt(scope.row.shwsyxbl)<100&&parseInt(scope.row.shwslhbl)<100)&&(parseInt(scope.row.shwsyxbl)+parseInt(scope.row.shwslhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.shwsyxbl == '' ? "0" : scope.row.shwsyxbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="良好" prop="shwslhbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.shwslhbl"
                                                      @keyup="shwsKeyUpEvent(scope.row,2)"
                                                      @blur="blurEvent(scope.row,'shws.lh','【生活卫生】【良好】',scope.row.shwslhbl)"
                                                      :class="{error: parseInt(scope.row.shwslhbl)>100 || (parseInt(scope.row.shwsyxbl)<100&&parseInt(scope.row.shwslhbl)<100)&&(parseInt(scope.row.shwsyxbl)+parseInt(scope.row.shwslhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.shwslhbl == '' ? "0" : scope.row.shwslhbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="一般" prop="shwsybbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input" v-model="scope.row.shwsybbl"  @keyup="shwsKeyUpEvent(scope.row,3)" :class="{error:parseInt(scope.row.shwsybbl)>100}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.shwsybbl == '' ? "0" : scope.row.shwsybbl}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="接受教育(%)">
            <aty-table-column  label="优秀" prop="jsjyyxbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.jsjyyxbl"
                                                      @keyup="jsjyKeyUpEvent(scope.row,1)"
                                                      @blur="blurEvent(scope.row,'jsjy.yx','【接受教育】【优秀】',scope.row.jsjyyxbl)"
                                                      :class="{error: parseInt(scope.row.jsjyyxbl)>100 || (parseInt(scope.row.jsjyyxbl)<100&&parseInt(scope.row.jsjylhbl)<100)&&(parseInt(scope.row.jsjyyxbl)+parseInt(scope.row.jsjylhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.jsjyyxbl == '' ? "0" : scope.row.jsjyyxbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="良好" prop="jsjylhbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.jsjylhbl"
                                                      @keyup="jsjyKeyUpEvent(scope.row,2)"
                                                      @blur="blurEvent(scope.row,'jsjy.lh','【接受教育】【良好】',scope.row.jsjylhbl)"
                                                      :class="{error: parseInt(scope.row.jsjylhbl)>100 || (parseInt(scope.row.jsjyyxbl)<100&&parseInt(scope.row.jsjylhbl)<100)&&(parseInt(scope.row.jsjyyxbl)+parseInt(scope.row.jsjylhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.jsjylhbl == '' ? "0" : scope.row.jsjylhbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="一般" prop="jsjyybbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.jsjyybbl" @keyup="jsjyKeyUpEvent(scope.row,3)" :class="{error:parseInt(scope.row.jsjyybbl)>100}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.jsjyybbl == '' ? "0" : scope.row.jsjyybbl}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="劳动态度(%)">
            <aty-table-column  label="优秀" prop="ldtdyxbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.ldtdyxbl"
                                                      @keyup="ldtdKeyUpEvent(scope.row,1)"
                                                      @blur="blurEvent(scope.row,'ldtd.yx','【劳动态度】【优秀】',scope.row.jsjyyxbl)"
                                                      :class="{error: parseInt(scope.row.ldtdyxbl)>100 || (parseInt(scope.row.ldtdyxbl)<100&&parseInt(scope.row.ldtdlhbl)<100)&&(parseInt(scope.row.ldtdyxbl)+parseInt(scope.row.ldtdlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.ldtdyxbl == '' ? "0" : scope.row.ldtdyxbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="良好" prop="ldtdlhbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.ldtdlhbl"
                                                      @keyup="ldtdKeyUpEvent(scope.row,2)"
                                                      @blur="blurEvent(scope.row,'ldtd.lh','【劳动态度】【良好】',scope.row.jsjylhbl)"
                                                      :class="{error: parseInt(scope.row.ldtdlhbl)>100 || (parseInt(scope.row.ldtdyxbl)<100&&parseInt(scope.row.ldtdlhbl)<100)&&(parseInt(scope.row.ldtdyxbl)+parseInt(scope.row.ldtdlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.ldtdlhbl == '' ? "0" : scope.row.ldtdlhbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="一般" prop="ldtdybbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.ldtdybbl" @keyup="ldtdKeyUpEvent(scope.row,3)" :class="{error:parseInt(scope.row.ldtdybbl)>100}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.ldtdybbl == '' ? "0" : scope.row.ldtdybbl}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column label="联号无违纪(%)">
            <aty-table-column  label="优秀" prop="lhwwjyxbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.lhwwjyxbl"
                                                      @blur="blurEvent(scope.row,'lhwwj.yx','【联号无违纪】【优秀】',scope.row.lhwwjyxbl)"
                                                      @keyup="lhwwjKeyUpEvent(scope.row,1)" :class="{error: parseInt(scope.row.lhwwjyxbl)>100 || (parseInt(scope.row.lhwwjyxbl)<100&&parseInt(scope.row.lhwwjlhbl)<100)&&(parseInt(scope.row.lhwwjyxbl)+parseInt(scope.row.lhwwjlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.lhwwjyxbl == '' ? "0" : scope.row.lhwwjyxbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="良好" prop="lhwwjlhbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.lhwwjlhbl"
                                                      @keyup="lhwwjKeyUpEvent(scope.row,2)"
                                                      @blur="blurEvent(scope.row,'lhwwj.lh','【联号无违纪】【良好】',scope.row.lhwwjlhbl)"
                                                      :class="{error: parseInt(scope.row.lhwwjlhbl)>100 || (parseInt(scope.row.lhwwjyxbl)<100&&parseInt(scope.row.lhwwjlhbl)<100)&&(parseInt(scope.row.lhwwjyxbl)+parseInt(scope.row.lhwwjlhbl)>100)}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.lhwwjlhbl == '' ? "0" : scope.row.lhwwjlhbl}}</div>
              </template>
            </aty-table-column>
            <aty-table-column  label="一般" prop="lhwwjybbl" class-name="jyw2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="scope.row.editflag"><input class="es_table_input"  v-model="scope.row.lhwwjybbl" @keyup="lhwwjKeyUpEvent(scope.row,3)" :class="{error:parseInt(scope.row.lhwwjybbl)>100}"></div>
                <div v-if="!scope.row.editflag">{{scope.row.lhwwjybbl == '' ? "0" : scope.row.lhwwjybbl}}</div>
              </template>
            </aty-table-column>
          </aty-table-column>
          <aty-table-column  v-if="!userInfo.sfgyzf" label="操作" class-name="jyw2" :showOverflowTooltip="false">
            <template slot-scope="scope">
              <i>
                <img v-if="!scope.row.editflag" @click="editButn(scope)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png">
                <img v-else  @click="saveButn(scope)" title="保存" class="table_butn" src="../../assets/images/save-blue.png">
              </i>
            </template>
          </aty-table-column>
        </aty-table>
        <!-- table區域 end -->
      </div>
    <!-- </aty-scroll> -->
    </happy-scroll>
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
        popFlag: false,
        breadcrumbdata: [],
        // table数据
        tableData: [],
        // 1 是监狱 2 是监区
        jqFlag: '',
        isLoading:false,
        tableDataResult:[],
        userInfo:null,
        store:null,
        rsSum:null,
        jyStore:null,//监狱比例设定
        jqStore:null, //监区比例设定,
        jySet:null
      };
    },
    watch: {},
    created() {
      this.userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      //判断当前登录人所属 监狱 或监区
      var params = {
        corp:this.userInfo.corpId,
        dept:this.userInfo.deptId
      }
      if(this.userInfo.spdj =="3") {
        var sjjyjb = this.userInfo.deptType === '2' && this.userInfo.pDeptType != '5';
        var sjjqjb = this.userInfo.deptType === '5' || (this.userInfo.deptType == '2' && this.userInfo.pDeptType == '5') ||
          (this.userInfo.deptType == '3' && this.userInfo.pDeptType != '5') || this.userInfo.pDeptType == '31';
        if(sjjyjb){
          this.jqFlag = '1';
        }else if(sjjqjb){
          this.jqFlag = '2';
        }
      }else if(this.userInfo.spdj =="2") {
        var ejjyjb = this.userInfo.deptType === '2';
        if(ejjyjb) {
          this.jqFlag = '2';
        }
      }
      //拼接面包屑
      let temp = {
        name: this.userInfo.deptName+"教育分项比例设定",
        href: "/educationScale",
        bh: this.userInfo.deptId
      };
      this.breadcrumbdata.push(temp)
      this.getList(params)
      //根据当前登录人设置jqFlag，计算设定人数
      this.getComputedReaultByUser()
    },
    mounted() {},
    methods: {
      /**
       * 鉴于每次编辑设定时发请求，请求次数过多，现在页面加载时就计算好所有需要的值
       * 情形1：允许监狱不设定监区比例，直接由监区设定分监区
       * 情形2：先由监狱设定监区比例，再由监区设定分监区比例，监区设定分监区时，需要先取当前监区被设定的比例，计算人数，并判断是否超过监狱设定的比例
       * 情形3：先由监区设定分监区比例，再由监狱设定监区比例，监狱设定监区比例时，需要获取当前监区下所有分监区的比例，计算人数，如果输入合理，分监区总人数超出时，给出提示，正常保存
       */
      getComputedReaultByUser(){
        //编辑时获取当前监区或监狱的比例设定
        let params ={}
        if(this.jqFlag === '1'){ //监狱
          //如果当前编辑的是监区的比例设定，参数为当前所编辑监区的编号,请求获取当前监区下所有分监区的比例设定，结果是数组
          params={
            sfJy:true
          }
        }
        if(this.jqFlag === '2'){ //监区
           params={
            sfJy:false
          }
          //如果当前是监区编辑分监区的比例设定，需要先获取当前分监区所在监区的编号，请求获取分监区所在监区的比例设定，结果是对象
        }
        this.getRequest("/api/v1/jyfxblpz/getPzMap",params).then(resp => {
              if(this.jqFlag === '1'){
                if(resp.status==200 && resp.data ){
                  this.jqStore = resp.data
                }
              }
              if(this.jqFlag === '2' ){
                let deptId = this.userInfo.deptId
                if(resp.status==200 && resp.data && resp.data[deptId].length > 0){
                  this.jyStore = resp.data[deptId]
                }
              }
            this.calRsSum();
        })
      },
      /**
       * 计算比例总和
       */
      calRsSum() {
        let _this = this;
        _this.rsSum = {
          rzhz:{yx:'0',lh:'0',yb:'0'},
          zgsj:{yx:'0',lh:'0',yb:'0'},
          shws:{yx:'0',lh:'0',yb:'0'},
          jsjy:{yx:'0',lh:'',yb:'0'},
          ldtd:{yx:'0',lh:'',yb:'0'},
          lhwwj:{yx:'0',lh:'',yb:'0'}
        }
        if(_this.jqFlag === '1'){ //监狱
          //计算各分监区所在监区的人数总和
          if(_this.jqStore){
            var list = _this.jqStore[scope.row.dept]
            list.forEach(function(item,index){
              _this.rsSum.rzhz.yx  = parseInt(_this.rsSum.rzhz.yx) + parseInt(_this.getRsByData(item)['rzhz'][0])
              _this.rsSum.rzhz.lh  = parseInt(_this.rsSum.rzhz.lh) + parseInt(_this.getRsByData(item)['rzhz'][1])
              _this.rsSum.rzhz.yb  = parseInt(_this.rsSum.rzhz.yb) + parseInt(_this.getRsByData(item)['rzhz'][2])

              _this.rsSum.zgsj.yx  = parseInt(_this.rsSum.zgsj.yx) + parseInt(_this.getRsByData(item)['zgsj'][0])
              _this.rsSum.zgsj.lh  = parseInt(_this.rsSum.zgsj.lh) + parseInt(_this.getRsByData(item)['zgsj'][1])
              _this.rsSum.zgsj.yb  = parseInt(_this.rsSum.zgsj.yb) + parseInt(_this.getRsByData(item)['zgsj'][2])

              _this.rsSum.shws.yx  = parseInt(_this.rsSum.shws.yx) + parseInt(_this.getRsByData(item)['shws'][0])
              _this.rsSum.shws.lh  = parseInt(_this.rsSum.shws.lh) + parseInt(_this.getRsByData(item)['shws'][1])
              _this.rsSum.shws.yb  = parseInt(_this.rsSum.shws.yb) + parseInt(_this.getRsByData(item)['shws'][2])

              _this.rsSum.jsjy.yx  = parseInt(_this.rsSum.jsjy.yx) + parseInt(_this.getRsByData(item)['jsjy'][0])
              _this.rsSum.jsjy.lh  = parseInt(_this.rsSum.jsjy.lh) + parseInt(_this.getRsByData(item)['jsjy'][1])
              _this.rsSum.jsjy.yb  = parseInt(_this.rsSum.jsjy.yb) + parseInt(_this.getRsByData(item)['jsjy'][2])

              _this.rsSum.ldtd.yx  = parseInt(_this.rsSum.ldtd.yx) + parseInt(_this.getRsByData(item)['ldtd'][0])
              _this.rsSum.ldtd.lh  = parseInt(_this.rsSum.ldtd.lh) + parseInt(_this.getRsByData(item)['ldtd'][1])
              _this.rsSum.ldtd.yb  = parseInt(_this.rsSum.ldtd.yb) + parseInt(_this.getRsByData(item)['ldtd'][2])

              _this.rsSum.lhwwj.yx  = parseInt(_this.rsSum.lhwwj.yx) + parseInt(_this.getRsByData(item)['lhwwj'][0])
              _this.rsSum.lhwwj.lh  = parseInt(_this.rsSum.lhwwj.lh) + parseInt(_this.getRsByData(item)['lhwwj'][1])
              _this.rsSum.lhwwj.yb  = parseInt(_this.rsSum.lhwwj.yb) + parseInt(_this.getRsByData(item)['lhwwj'][2])
            })
          }else{
            return
          }
        }
        if(this.jqFlag === '2'){ //监区设定比例参考上级监狱设定的比例，计算监狱设定人数各项总和
          if(this.jyStore && this.jyStore.length > 0){
            this.jySet = this.jyStore[0]
            _this.rsSum.rzhz.yx  = parseInt(_this.getRsByData(this.jySet)['rzhz'][0])
            _this.rsSum.rzhz.lh  = parseInt(_this.getRsByData(this.jySet)['rzhz'][1])
            _this.rsSum.rzhz.yb  = parseInt(_this.getRsByData(this.jySet)['rzhz'][2])

            _this.rsSum.zgsj.yx  = parseInt(_this.getRsByData(this.jySet)['zgsj'][0])
            _this.rsSum.zgsj.lh  = parseInt(_this.getRsByData(this.jySet)['zgsj'][1])
            _this.rsSum.zgsj.yb  = parseInt(_this.getRsByData(this.jySet)['zgsj'][2])

            _this.rsSum.shws.yx  = parseInt(_this.getRsByData(this.jySet)['shws'][0])
            _this.rsSum.shws.lh  = parseInt(_this.getRsByData(this.jySet)['shws'][1])
            _this.rsSum.shws.yb  = parseInt(_this.getRsByData(this.jySet)['shws'][2])

            _this.rsSum.jsjy.yx  = parseInt(_this.getRsByData(this.jySet)['jsjy'][0])
            _this.rsSum.jsjy.lh  = parseInt(_this.getRsByData(this.jySet)['jsjy'][1])
            _this.rsSum.jsjy.yb  = parseInt(_this.getRsByData(this.jySet)['jsjy'][2])

            _this.rsSum.ldtd.yx  = parseInt(_this.getRsByData(this.jySet)['ldtd'][0])
            _this.rsSum.ldtd.lh  = parseInt(_this.getRsByData(this.jySet)['ldtd'][1])
            _this.rsSum.ldtd.yb  = parseInt(_this.getRsByData(this.jySet)['ldtd'][2])

            _this.rsSum.lhwwj.yx  = parseInt(_this.getRsByData(this.jySet)['lhwwj'][0])
            _this.rsSum.lhwwj.lh  = parseInt(_this.getRsByData(this.jySet)['lhwwj'][1])
            _this.rsSum.lhwwj.yb  = parseInt(_this.getRsByData(this.jySet)['lhwwj'][2])
          }else{
            return
          }
        }
      },
      getList(params){
        var _this = this;
        _this.isLoading = true
        this.postRequest(_this.apis.api0083, params).then(resp => {
          if (resp && resp.status == 200) {
            _this.tableData = []
            _this.tableDataResult = []
            _this.tableDataResult = resp.data;
            _this.tableDataResult.forEach(function(item,index){
              let temp ={
                bh:item.bh,
                jqrs:item.jqrs,
                dept:item.dept,
                deptName:item.deptName,
                rzhzyxbl:item.rzhzblArry[0],
                rzhzlhbl:item.rzhzblArry[1],
                rzhzybbl:item.rzhzblArry[2],

                zgsjyxbl:item.zgsjblArry[0],
                zgsjlhbl:item.zgsjblArry[1],
                zgsjybbl:item.zgsjblArry[2],

                shwsyxbl:item.shwsblArry[0],
                shwslhbl:item.shwsblArry[1],
                shwsybbl:item.shwsblArry[2],

                jsjyyxbl:item.jsjyblArry[0],
                jsjylhbl:item.jsjyblArry[1],
                jsjyybbl:item.jsjyblArry[2],

                ldtdyxbl:item.ldtdblArry[0],
                ldtdlhbl:item.ldtdblArry[1],
                ldtdybbl:item.ldtdblArry[2],

                lhwwjyxbl:item.lhwwjblArry[0],
                lhwwjlhbl:item.lhwwjblArry[1],
                lhwwjybbl:item.lhwwjblArry[2],
                editflag:false
              }
              _this.tableData.push(temp);
            })
            _this.isLoading = false
          }else{
            setTimeout(function(){
              this.isLoading=false
              Artery.message.error({
                 content:"获取数据失败",
                 duration:3
              });
            },5000)
          }
        });
      },
      /**
       * 编辑时
       */
      editButn(scope) {
        let _this =this
        var flag = false;
        _this.tableData.forEach(function (item) {
          if(item.editflag) {
            flag = true;
          }
        });
        if(flag) {
          Artery.message.info({
            content:"请保存上一条配置！",
            duration:3
          });
          return;
        }
        _this.getComputedReaultByUser();
        scope.row.editflag = true;
        scope.row.isSaveable = true;
      },
      /**
       * 根据比例计算各项人数
       */
      getRsByData(item){
        let rs = {
          rzhz:[],
          zgsj:[],
          shws:[],
          jsjy:[],
          ldtd:[],
          lhwwj:[]
        }
        //认罪悔罪人数
        for(var i = 0;i <3; i++){
          let temp  =  parseInt(item.jqrs) * (item.rzhzblArry[i] === '' ? 1 : parseInt(item.rzhzblArry[i])/ 100)
          rs.rzhz.push(temp)
        }
        //遵规守纪人数
        for(var i = 0;i <3; i++){
          let temp  =  parseInt(item.jqrs) * (item.zgsjblArry[i] === '' ? 1 : parseInt(item.zgsjblArry[i])/ 100)
          rs.zgsj.push(temp)
        }
        //生活卫生人数
        for(var i = 0;i <3; i++){
          let temp  =  parseInt(item.jqrs) * (item.shwsblArry[i] === '' ? 1 : parseInt(item.shwsblArry[i])/ 100)
          rs.shws.push(temp)
        }
        //接受教育人数
        for(var i = 0;i <3; i++){
          let temp  =  parseInt(item.jqrs) * (item.jsjyblArry[i] === '' ? 1 : parseInt(item.jsjyblArry[i])/ 100)
          rs.jsjy.push(temp)
        }
        //劳动态度人数
        for(var i = 0;i <3; i++){
          let temp  =  parseInt(item.jqrs) * (item.ldtdblArry[i] === '' ? 1 : parseInt(item.ldtdblArry[i])/ 100)
          rs.ldtd.push(temp)
        }
        //联号无违纪人数
        for(var i = 0;i <3; i++){
          let temp  =  parseInt(item.jqrs) * (item.lhwwjblArry[i] === '' ? 1 : parseInt(item.lhwwjblArry[i])/ 100)
          rs.lhwwj.push(temp)
        }
        return  rs
      },
      computebl(item){
        let rzhzyxbl = item.rzhzyxbl ==='' || item.rzhzyxbl == null ? 0 : parseInt(item.rzhzyxbl)
        let rzhzlhbl = item.rzhzlhbl ==='' || item.rzhzlhbl == null ? 0 : parseInt(item.rzhzlhbl)
        let rzhzybbl = item.rzhzybbl ==='' || item.rzhzybbl == null ? 0 : parseInt(item.rzhzybbl)
        let zgsjyxbl = item.zgsjyxbl ==='' || item.zgsjyxbl == null ? 0 : parseInt(item.zgsjyxbl)
        let zgsjlhbl = item.zgsjlhbl ==='' || item.zgsjlhbl == null ? 0 : parseInt(item.zgsjlhbl)
        let zgsjybbl = item.zgsjybbl ==='' || item.zgsjybbl == null ? 0 : parseInt(item.zgsjybbl)
        let shwsyxbl = item.shwsyxbl ==='' || item.shwsyxbl == null ? 0 : parseInt(item.shwsyxbl)
        let shwslhbl = item.shwslhbl ==='' || item.shwslhbl == null ? 0 : parseInt(item.shwslhbl)
        let shwsybbl = item.shwsybbl ==='' || item.shwsybbl == null ? 0 : parseInt(item.shwsybbl)
        let jsjyyxbl = item.jsjyyxbl ==='' || item.jsjyyxbl == null ? 0 : parseInt(item.jsjyyxbl)
        let jsjylhbl = item.jsjylhbl ==='' || item.jsjylhbl == null ? 0 : parseInt(item.jsjylhbl)
        let jsjyybbl = item.jsjyybbl ==='' || item.jsjyybbl == null ? 0 : parseInt(item.jsjyybbl)
        let ldtdyxbl = item.ldtdyxbl ==='' || item.ldtdyxbl == null ? 0 : parseInt(item.ldtdyxbl)
        let ldtdlhbl = item.ldtdlhbl ==='' || item.ldtdlhbl == null ? 0 : parseInt(item.ldtdlhbl)
        let ldtdybbl = item.ldtdybbl ==='' || item.ldtdybbl == null ? 0 : parseInt(item.ldtdybbl)
        let lhwwjyxbl = item.lhwwjyxbl ==='' || item.lhwwjyxbl == null ? 0 : parseInt(item.lhwwjyxbl)
        let lhwwjlhbl = item.lhwwjlhbl ==='' || item.lhwwjlhbl == null ? 0 : parseInt(item.lhwwjlhbl)
        let lhwwjybbl = item.lhwwjybbl ==='' || item.lhwwjybbl == null ? 0 : parseInt(item.lhwwjybbl)
        return {
          rzhz:{rzhzyxbl:rzhzyxbl,rzhzlhbl:rzhzlhbl,rzhzybbl:rzhzybbl},
          zgsj:{zgsjyxbl:zgsjyxbl,zgsjlhbl:zgsjlhbl,zgsjybbl:zgsjybbl},
          shws:{shwsyxbl:shwsyxbl,shwslhbl:shwslhbl,shwsybbl:shwsybbl},
          jsjy:{jsjyyxbl:jsjyyxbl,jsjylhbl:jsjylhbl,jsjyybbl:jsjyybbl},
          ldtd:{ldtdyxbl:ldtdyxbl,ldtdlhbl:ldtdlhbl,ldtdybbl:ldtdybbl},
          lhwwj:{lhwwjyxbl:lhwwjyxbl,lhwwjlhbl:lhwwjlhbl,lhwwjybbl:lhwwjybbl}
        }
      },
      // 保存按钮
      saveButn(scope) {
        var _this = this;
        let item = scope.row;
        if(!_this.popFlag) {
          item.editflag = false;
          return;
        }
        if(!scope.row.isSaveable) {
          return;
        }
        let result = _this.computebl(scope.row)
        if(result.rzhz.rzhzyxbl>100 || result.rzhz.rzhzlhbl>100 || result.zgsj.zgsjyxbl>100 || result.zgsj.zgsjlhbl>100
        || result.shws.shwsyxbl>100 || result.shws.shwslhbl>100 || result.jsjy.jsjyyxbl>100 || result.jsjy.jsjylhbl>100
        || result.ldtd.ldtdyxbl>100 || result.ldtd.ldtdlhbl>100 || result.lhwwj.lhwwjyxbl>100 || result.lhwwj.lhwwjlhbl>100){
          Artery.message.error({
            content:"单项不能超过100，请重新输入",
            duration:3
          });
          scope.row.isSaveable = false;
          return
        }
        //判断各项优秀良好之和是否超过100，是则提示 否则进入保存
        if(result.rzhz.rzhzyxbl + result.rzhz.rzhzlhbl>100 || result.zgsj.zgsjyxbl+result.zgsj.zgsjlhbl>100 || result.shws.shwsyxbl+result.shws.shwslhbl>100
          || result.jsjy.jsjyyxbl+result.jsjy.jsjylhbl>100 || result.ldtd.ldtdyxbl+result.ldtd.ldtdlhbl>100 || result.lhwwj.lhwwjyxbl+result.lhwwj.lhwwjlhbl>100){
          Artery.message.error({
            content:"各项优秀良好之和比例不能超过100，请检查输入是否正确！",
            duration:3
          });
          scope.row.isSaveable = false;
          return
        }
        let temp={
          bh:item.bh,
          // jqrs:item.jqrs,
          dept:item.dept,
          rzhzblArry:[item.rzhzyxbl,item.rzhzlhbl,item.rzhzybbl],
          zgsjblArry:[item.zgsjyxbl,item.zgsjlhbl,item.zgsjybbl],
          shwsblArry:[item.shwsyxbl,item.shwslhbl,item.shwsybbl],
          jsjyblArry:[item.jsjyyxbl,item.jsjylhbl,item.jsjyybbl],
          ldtdblArry:[item.ldtdyxbl,item.ldtdlhbl,item.ldtdybbl],
          lhwwjblArry:[item.lhwwjyxbl,item.lhwwjlhbl,item.lhwwjybbl],
        }
        this.$set(this.tableDataResult,scope.$index,temp);
        // 保存调取接口
        this.postRequest(_this.apis.api0082,temp).then(resp => {
          if (resp && resp.status == 200) {
            scope.row.isSaveable = true;
            item.editflag = false;
            Artery.message.success("设定成功");
          }
        })
      },
      showMessage(){
        let bl1 = arguments[0];
        let bl2 = arguments[1];
        let msg = arguments[2];
        let msg1 = arguments[3];
        // let tempArr = arguments[4].split('.')
        if(parseInt(bl1) > 100){
          Artery.message.error({
            content:msg + "单项比例不能超过100！",
            duration:3
          });
          return false
        }
        if(parseInt(bl1) + parseInt(bl2) > 100){
          Artery.message.error({
            content:msg1 + "比例之和不能超过" + 100 + "！",
            duration:3
          });
          return false
        }

      },
      /**
       * 认罪悔罪输入事件 参数1： row  参数2 ：分项
       */
      rzhzKeyUpEvent(item,id,scope){
        if(id === 1){
          item.rzhzyxbl=item.rzhzyxbl.replace(/[^0-9]/g, "");
          this.showMessage(item.rzhzyxbl,item.rzhzlhbl,"【认罪悔罪】优秀","【认罪悔罪】优秀良好");
        }
        if(id === 2){
          item.rzhzlhbl=item.rzhzlhbl.replace(/[^0-9]/g, "");
          this.showMessage(item.rzhzlhbl,item.rzhzyxbl,"【认罪悔罪】良好","【认罪悔罪】优秀良好")
        }
        if(id === 3){
          item.rzhzybbl=item.rzhzybbl.replace(/[^0-9]/g, "");
          if(parseInt(item.rzhzybbl) > 100){
            Artery.message.error({
                content:"【认罪悔罪】一般单项比例不能超过100！",
                duration:3
            });
          }
        }
      },
      /**
       *@description 比例人数校验
       */
      blurEvent(item,str,msg,bl){
        this.popFlag = true;
        item.isSaveable = true;
        let arg1 = str.split('.')[0]
        let arg2 = str.split('.')[1]
        if(this.jqFlag === '1'){
          if(this.rsSum[arg1][arg2]!=0 && (bl!==''&&this.rsSum[arg1][arg2] > parseInt(item.jqrs)*(bl/100))){
            Artery.notice.warning({
              title: '系统通知',
              desc: item.deptName+"下各单位设定的"+msg+"比例超过了您设定的"+msg+"比例范围",
              duration:5
            });
            return false
          }
        }
        if(this.jqFlag === '2'){
          let rzhzyxRs = 0
          let rzhzlhRs = 0
          let zgsjyxRs = 0
          let zgsjlhRs = 0
          let shwsyxRs = 0
          let shwslhRs = 0
          let jsjyyxRs = 0
          let jsjylhRs = 0
          let ldtdyxRs = 0
          let ldtdlhRs = 0
          let lhwwjyxRs = 0
          let lhwwjlhRs = 0
          this.tableData.forEach(function(item,index){
              rzhzyxRs = rzhzyxRs + parseFloat(item.jqrs*((item['rzhzyxbl']==='' ? 0 : item['rzhzyxbl'])/100))
              rzhzlhRs = rzhzlhRs + parseFloat(item.jqrs*((item['rzhzlhbl']==='' ? 0 : item['rzhzlhbl'])/100))
              zgsjyxRs = zgsjyxRs + parseFloat(item.jqrs*((item['zgsjyxbl']==='' ? 0 : item['zgsjyxbl'])/100))
              zgsjlhRs = zgsjlhRs + parseFloat(item.jqrs*((item['zgsjlhbl']==='' ? 0 : item['zgsjlhbl'])/100))
              shwsyxRs = shwsyxRs + parseFloat(item.jqrs*((item['shwsyxbl']==='' ? 0 : item['shwsyxbl'])/100))
              shwslhRs = shwslhRs + parseFloat(item.jqrs*((item['shwslhbl']==='' ? 0 : item['shwslhbl'])/100))
              jsjyyxRs = jsjyyxRs + parseFloat(item.jqrs*((item['jsjyyxbl']==='' ? 0 : item['jsjyyxbl'])/100))
              jsjylhRs = jsjylhRs + parseFloat(item.jqrs*((item['jsjylhbl']==='' ? 0 : item['jsjylhbl'])/100))
              ldtdyxRs = ldtdyxRs + parseFloat(item.jqrs*((item['ldtdyxbl']==='' ? 0 : item['ldtdyxbl'])/100))
              ldtdlhRs = ldtdlhRs + parseFloat(item.jqrs*((item['ldtdlhbl']==='' ? 0 : item['ldtdlhbl'])/100))
              lhwwjyxRs = lhwwjyxRs + parseFloat(item.jqrs*((item['lhwwjyxbl']==='' ? 0 : item['lhwwjyxbl'])/100))
              lhwwjlhRs = lhwwjlhRs + parseFloat(item.jqrs*((item['lhwwjlhbl']==='' ? 0 : item['lhwwjlhbl'])/100))
          })
          if(this.jyStore && this.jyStore.length > 0){
            if("rzhz.yx" == str && rzhzyxRs > this.rsSum.rzhz.yx){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【认罪悔罪】【优秀】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("rzhz.lh" == str && rzhzlhRs > this.rsSum.rzhz.lh){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【认罪悔罪】【良好】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("zgsj.yx" == str && zgsjyxRs > this.rsSum.zgsj.yx){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【遵规守纪】【优秀】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("zgsj.lh" == str && zgsjlhRs > this.rsSum.zgsj.lh){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【遵规守纪】【良好】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("shws.yx" == str && shwsyxRs > this.rsSum.shws.yx){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【生活卫生】【优秀】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("shws.lh" == str && shwslhRs > this.rsSum.shws.lh){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【生活卫生】【良好】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("jsjy.yx" == str && jsjyyxRs > this.rsSum.jsjy.yx){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【接受教育】【优秀】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("jsjy.lh" == str && jsjylhRs > this.rsSum.jsjy.lh){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【接受教育】【良好】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("ldtd.yx" == str && ldtdyxRs > this.rsSum.ldtd.yx){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【劳动态度】【优秀】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("ldtd.lh" == str && ldtdlhRs > this.rsSum.ldtd.lh){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【劳动态度】【良好】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("lhwwj.yx" == str && lhwwjyxRs > this.rsSum.lhwwj.yx){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【联号无违纪】【优秀】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
            if("lhwwj.lh" == str && lhwwjlhRs > this.rsSum.lhwwj.lh){
              Artery.notice.warning({
                title: '系统通知',
                desc: "您设定的【联号无违纪】【良好】比例超过了"+this.userInfo.deptName+"设定的比例范围",
                duration:5
              });
              item.isSaveable = false;
            }
          }
        }
      },
      /**
       * 遵规守纪输入事件 参数1： row  参数2 ：分项
       */
      zgsjKeyUpEvent(item,id){
        if(id === 1){
          item.zgsjyxbl=item.zgsjyxbl.replace(/[^0-9]/g, "");
          this.showMessage(item.zgsjyxbl,item.zgsjlhbl,"【遵规守纪】优秀","【遵规守纪】优秀良好");
        }
        if(id === 2){
          item.zgsjlhbl=item.zgsjlhbl.replace(/[^0-9]/g, "");
          this.showMessage(item.zgsjlhbl,item.zgsjyxbl,"遵规守纪良好","【遵规守纪】优秀良好")
        }
        if(id === 3){
          item.zgsjybbl=item.zgsjybbl.replace(/[^0-9]/g, "");
          if(parseInt(item.zgsjybbl) > 100){
            Artery.message.info({
                content:"【遵规守纪】一般单项比例不能超过100！",
                duration:3
            });
          }
        }
      },
      /**
       * 生活卫生输入事件 参数1： row  参数2 ：分项
       */
      shwsKeyUpEvent(item,id){
        if(id === 1){
          item.shwsyxbl=item.shwsyxbl.replace(/[^0-9]/g, "");
          this.showMessage(item.shwsyxbl,item.shwslhbl,"【生活卫生】优秀","【生活卫生】优秀良好");
        }
        if(id === 2){
          item.shwslhbl=item.shwslhbl.replace(/[^0-9]/g, "");
          this.showMessage(item.shwslhbl,item.shwsyxbl,"【生活卫生】良好","【生活卫生】优秀良好")
        }
        if(id === 3){
          item.shwsybbl=item.shwsybbl.replace(/[^0-9]/g, "");
          if(parseInt(item.shwsybbl) > 100){
            Artery.message.info({
                content:"【生活卫生】一般单项比例不能超过100！",
                duration:3
            });
          }
        }
      },
      /**
       * 接受教育输入事件 参数1： row  参数2 ：分项
       */
      jsjyKeyUpEvent(item,id){
        if(id === 1){
          item.jsjyyxbl=item.jsjyyxbl.replace(/[^0-9]/g, "");
          this.showMessage(item.jsjyyxbl,item.jsjylhbl,"【接受教育】优秀","【接受教育】优秀良好");
        }
        if(id === 2){
          item.jsjylhbl=item.jsjylhbl.replace(/[^0-9]/g, "");
          this.showMessage(item.jsjylhbl,item.jsjyyxbl,"【接受教育】良好","【接受教育】优秀良好")
        }
        if(id === 3){
          item.jsjyybbl=item.jsjyybbl.replace(/[^0-9]/g, "");
          if(parseInt(item.jsjyybbl) > 100){
            Artery.message.info({
               content:"【接受教育】一般单项比例不能超过100！",
               duration:3
            });
          }
        }
      },
      /**
       * 劳动态度输入事件 参数1： row  参数2 ：分项
       */
      ldtdKeyUpEvent(item,id){
        if(id === 1){
          item.ldtdyxbl=item.ldtdyxbl.replace(/[^0-9]/g, "");
          this.showMessage(item.ldtdyxbl,item.ldtdlhbl,"【劳动态度】优秀","【劳动态度】优秀良好");
        }
        if(id === 2){
          item.ldtdlhbl=item.ldtdlhbl.replace(/[^0-9]/g, "");
          this.showMessage(item.ldtdlhbl,item.ldtdyxbl,"【劳动态度】良好","【劳动态度】优秀良好")
        }
        if(id === 3){
          item.ldtdybbl=item.ldtdybbl.replace(/[^0-9]/g, "");
          if(parseInt(item.ldtdybbl) > 100){
            Artery.message.info({
               content:"【劳动态度】一般单项比例不能超过100！",
               duration:3
            });
          }
        }
      },
      /**
       * 联号无违纪输入事件 参数1： row  参数2 ：分项
       */
      lhwwjKeyUpEvent(item,id){
        if(id === 1){
          item.lhwwjyxbl=item.lhwwjyxbl.replace(/[^0-9]/g, "");
          this.showMessage(item.lhwwjyxbl,item.lhwwjlhbl,"【联号无违纪】优秀","【联号无违纪】优秀良好");
        }
        if(id === 2){
          item.lhwwjlhbl=item.lhwwjlhbl.replace(/[^0-9]/g, "");
          this.showMessage(item.lhwwjlhbl,item.lhwwjyxbl,"【联号无违纪】良好","【联号无违纪】优秀良好")
        }
        if(id === 3){
          item.lhwwjybbl=item.lhwwjybbl.replace(/[^0-9]/g, "");
          if(parseInt(item.lhwwjybbl) > 100){
            Artery.message.info({
               content:"【联号无违纪】一般单项比例不能超过100！",
               duration:3
            });
          }
        }
      }
    },
  };
</script>
<style scoped>
  .table_butn{
    margin: 0 4px;
    cursor: pointer;
  }
  .es_table_input{
    width: 40px;
    height: 23px;
    border: 1px solid #c3ccd4;
    border-radius: 3px;
    text-align:center;
  }
  .es_table_input{
    outline:none;
  }
  .es_table_input.error:focus,
  .es_table_input.error{
    border: 1px solid #f60;
  }
  .fd-slide-container {
    width:100%;
    height:32px;
    margin-bottom:15px;
    position:relative;
    padding-left:210px;
}
.fd-slide-container .fd-slide-tip {
    width:180px;
    height: 32px;
    position:absolute;
    left:0;
    top:0;
    background:url(../../assets/images/top_tip.png) no-repeat;
    background-size:100% 100%;
    color:#fff;
    text-align: center;
    line-height:28px;
}
.fd-slide-container .fd-slide-tip:after {
    display: block;
    content:'';
    width:22px;
    height: 32px;
    background:url(../../assets/images/top_tip_arrow.png) no-repeat;
    position: absolute;
    top:0;
    right:-22px;
}
.fd-slide-container .fd-slide-bar {
    width:100%;
    height: 25px;
    position: relative;
    top:3px;
    background:linear-gradient(to right,#edf2fd,#e8f5fe);
    background:-o-linear-gradient(to right,#edf2fd,#e8f5fe);
    background:-ms-linear-gradient(to right,#edf2fd,#e8f5fe);
    background:-moz-linear-gradient(to right,#edf2fd,#e8f5fe);
    background:-webkit-linear-gradient(to right,#edf2fd,#e8f5fe);
    border-radius:0 20px 20px 0;
}
.fd-slide-container .fd-slide-bar:after {
    display: block;
    content:'';
    border-top:solid 25px #edf2fd;
    border-left:solid 19px transparent;
    position: absolute;
    top:0;
    left:-19px;
}
.bl-style {
  font-size: 15px;
  margin-bottom: 20px;
}
</style>

