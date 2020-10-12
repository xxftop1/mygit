<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap">
      <div class="main_name"><aty-breadcrumb  can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
      <aty-scroll :speed="53" class="aty-scroll-1" ref="scroll" :show="false">
      <div class="main_box">
        <div class="tabs_main_box">
            <h2 class="table-title">{{jlData.xm}}（{{jlData.zfBh}}）</h2>
            <div class="fd-title fd-jl-title">
                <div class="fd-title-item1" >{{jlData.jzrq}}</div>
                <div class="fd-title-item2"><div class="status-box"><span class="status" :class="spztFontColor">{{spzt}}</span>
                  <span class="dxqk" v-if="jlData.jlsyqk!=''" :formatter="dxqkf" :class="fontColor">{{dxqkf}}</span></div></div>
                 <aty-text  class="fd-hyjl-link"></aty-text>
            </div>
            <aty-panel class="fd-sypanel fd-jl-panel">
                <table class="fd-sytable">
                    <tr>
                        <td>
                            <label>考核开始月份</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.ksrq"></aty-text>
                        </td>
                        <td>
                            <label>考核截止月份</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.jzrq"></aty-text>
                        </td>
                        <td>
                            <label>上期余分</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.sqyf"></aty-text>
                        </td>
                        <td>
                            <label>本期教育改造</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.bqjygzf"></aty-text>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>本期劳动改造</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.bqldgzf"></aty-text>
                        </td>
                        <td>
                            <label>累计积分</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.ljjf"></aty-text>
                        </td>
                        <td>
                            <label>奖励类别</label>
                        </td>
                        <td>
                            <aty-text v-text="jllbf"></aty-text>
                        </td>
                        <td>
                            <label>本期余分</label>
                        </td>
                        <td>
                            <aty-text v-text="jlData.bqyf"></aty-text>
                        </td>
                    </tr>
                    <tr v-if="jlData.bz">
                        <td>
                            <label>修改原因</label>
                        </td>
                        <td :colspan="7">
                            <aty-text v-text="jlData.bz"></aty-text>
                        </td>
                    </tr>
                    <tr v-if="showJlspb">
                        <td>
                            <label>奖励审批表</label>
                        </td>
                        <td :colspan="7" v-if="showJlspb" class="jlspb">
                          <aty-text v-text="jlData.jlspb"   @click="gojlspb(jlData)" ></aty-text>
                        </td>
                    </tr>
                </table>
            </aty-panel>
            <aty-table :pageable-data="jlData.spjlData" style="width: 100%; " :exp-all="false"  :exp-current-page="false">
              <aty-table-column prop="spsj" label="时间">
              </aty-table-column>
              <aty-table-column prop="dqbzmc" label="审批流程">
              </aty-table-column>
              <aty-table-column prop="clr" label="经办人">
              </aty-table-column>
              <aty-table-column prop="clyj" label="意见" :showOverflowTooltip="false">
                <template slot-scope="scope">
                  <div  v-text="scope.row.clyj"  :title="scope.row.clyj"></div>
                </template>
              </aty-table-column>
            </aty-table>
            <aty-row class="fd-upload" v-if="showHyjl && (jlData.hasOwnProperty('hyjlList') && jlData.hyjlList.length > 0)">
              <aty-col span="24" class="fd-files">
                <span class="fd-attach">合议记录：</span>
                <template>
                  <ul class="fileList">
                    <li v-for="(item,index) in jlData.hyjlList" :key="index">
                      <aty-link :text="item.entityName" :href="item.url" target="_parent" class="a_color" ></aty-link>
                    </li>
                  </ul>
                </template>
              </aty-col>
            </aty-row>
            <aty-panel class="fd-jl-panel" v-if="jlData.jlsyqk != '3' && showQxyy && jlData.qxyy!=''">
                <aty-row  class="fd-jl-row">
                    <aty-col :span="24">
                      <span class="fd-jl-label">取消原因：</span>
                      {{jlData.qxyy}}
                    </aty-col>
                </aty-row>
            </aty-panel>
          <aty-panel class="fd-jl-panel" v-if="jlData.jlsyqk == '3' && jlData.qxyy!='' &&
          (jlData.hasOwnProperty('jxjs') && (jlData.jxjs == null || jlData.jxjs.length == 0))">
            <aty-row  class="fd-jl-row">
              <aty-col :span="6"><span class="fd-jl-label">换取减刑时间：</span>{{jlData.qxyy}}</aty-col>
            </aty-row>
          </aty-panel>
            <aty-panel class="fd-jl-panel" v-if="showJxjs">
                <aty-row  class="fd-jl-row" v-for="(item,index) in jlData.jxjs" :key="index">
                    <aty-col :span="6" v-if="item.hqsj!=''"><span class="fd-jl-label">换取时间：</span>{{item.hqsj}}</aty-col>
                    <aty-col :span="6" v-if="item.cdsj!=''"><span class="fd-jl-label">裁定时间：</span>{{item.cdsj}}</aty-col>
                    <aty-col :span="6" v-if="item.cdjg!=''"><span class="fd-jl-label">裁定结果：</span>{{item.cdjg}}</aty-col>
                </aty-row>
            </aty-panel>
            <aty-panel class="fd-jl-panel" v-if="showJfqk">
                <aty-row  class="fd-jl-row">
                  <aty-col :span="24" v-show="jlData.dxwzjl!=''"><span class="fd-jl-label">物质奖励：</span>{{jlData.dxwzjl}}</aty-col>
                  <aty-col :span="24" v-show="jlData.dxrq!=''"><span class="fd-jl-label">兑现日期：</span>{{jlData.dxrq}}</aty-col>
                  <aty-col :span="24" v-show="jlData.dxjlmj!=''"><span class="fd-jl-label">经办民警：</span>{{jlData.dxjlmj}}</aty-col>
                </aty-row>
            </aty-panel>
          <!-- table區域 end -->
        </div>
      </div>
      </aty-scroll>
    </div>
    <!-- 内容部分end -->
</template>

<script>
export default {
    data(){
        return{
            breadcrumbdata: [
                {
                    name: '奖励',
                    href: "/rewardList"
                },
                {
                    name: '奖励详情',
                    href: "/rewardDetails"
                }
            ],
            jlData:{
                bh:'',
                xm:'',
                zfBh:'',
                zfxxbh:'',
                spzt:'',
                jlsyqk:'',
                cbny:'',
                ksrq:'',
                jzrq:'',
                sqyf:'',
                bqjygzf:'',
                hyjlbh:'',
                bqldgzf:'',
                jlpc:'',
                ljjf:'',
                jllb:'',
                bqyf:'',
                jbmjyj:'',
                bz:'',
                jlspb:'',
                qxyy:'',
                dxwzjl:'',
                dxrq:'',
                dxjlmj:'',
                spjlData:[],
                hyjlList:[],
                jf:{},
                jxjs:[]
            },
            tableData:[
                {

                }
            ],
            store:null,
            showHyjl:false,
            showQxyy:false,
            showJxjs:false,
            showJf:false,
            showJfqk:false,
        }
    },
    methods:{
      //查看奖励文书
      gojlspb(jlData){
        let _this = this;
        var ztbh = jlData.zfBh;
        var ywlb = "jl";
        var ywbh = jlData.bh;
        var wsmc = "罪犯奖励审批表-"+jlData.xm ;
        _this.getRequest("/api/v1/jl/viewSpws/" + ywbh).then(resp => {
          if (resp &&resp.status == 200) {
                let url = _writ.base_path+"/view/" +ztbh +"/" +ywlb +"/" +ywbh +"/" +wsmc;
                window.open(url);
          } else {
            Artery.message.info("生成文书失败，请重试或联系管理人员！");
          }
        });
      }
    },
    computed:{
       fontColor(){
          //暂时以文字判断，取到单值后改为单值判断
          let style=''
          this.showHyjl = true
          if(this.jlData.jlsyqk && this.jlData.jlsyqk!=''){
            if(this.jlData.jlsyqk ==='1'){
                style = 'yellow'
            }else if(this.jlData.jlsyqk ==='4'){
                this.showQxyy = true
                style = 'red'
            }else{
              if(this.jlData.jlsyqk === '2'){
                this.showJf = true
              }
              if(this.jlData.jlsyqk === '3'){
                this.showJxjs = true
              }
              style = 'blue'
            }
          }
          return  style
       },
       spztFontColor(){
          //暂时以文字判断，取到单值后改为单值判断
          let style=''
          if(this.jlData.spzt && this.jlData.spzt!=''){
            if(this.jlData.spzt ==='102'){
                style = 'red'
            }
          }
          return  style;
       },
       spzt(){
          if(this.jlData.spzt === '102'){
             return "退回"
          }
          if(this.jlData.spzt === '100'){
             return "待审批"
          }
          if(this.jlData.spzt === '103'){
             return "审批通过"
          }
          if(this.jlData.spzt === '101'){
             return "审批不通过"
          }
          if(this.jlData.spzt === '104'){
             return "已取消"
          }
       },
      //奖励类别转义
      jllbf: function() {
        if (this.jlData.jllb === "1") {
          return "表扬";
        }
        if (this.jlData.jllb=== "2") {
          return "物质奖励";
        }

      },
      //兑现状态转义
      dxqkf: function() {
        if(this.jlData.jlsyqk === "1"){
            return "待兑现";
        }
        if(this.jlData.jlsyqk === "2"){
          return "计发";
        }
        if(this.jlData.jlsyqk === "3"){
          return "兑现减刑假释";
        }
        if(this.jlData.jlsyqk === "4"){
          return "取消奖励";
        }
      },
      showJlspb(){
           if(this.jlData.spzt ==='100' || this.jlData.spzt ==='审批中' || this.jlData.spzt ==='102'){
              if(this.jlData.spzt ==='102'){
                 this.showHyjl = false
              }
              return false
           }else{
               return true
           }
       }
    },
    mounted(){
        var userInfo = JSON.parse(localStorage.getItem(_jfkh.normalCodeList));
    },
    created(){
        if(localStorage.getItem("jlData")){
         let query = JSON.parse(localStorage.getItem("jlData"));
         var _this = this;
         var params = {
           bh: query.bh
         };
         //根据编号获取奖励详情
         _this.postRequest("/api/v1/jl/getJlXqs", params).then(resp => {
           if (resp && resp.status == 200) {
             _this.jlData = resp.data;
             if( _this.jlData.dxwzjl!=null){
               _this.showJfqk = true
             }
              if( _this.jlData.qxyy!=null){
               _this.showQxyy = true
             }
             //根据奖励批次获取合议记录文件
             let jlpc = _this.jlData.jlpc;
             _this.getRequest("/api/v1/jl/getJlHys/"+ jlpc + "/").then(resp => {
               if (resp && resp.status == 200) {
                 _this.jlData.hyjlList =  resp.data;
                 if( _this.jlData.hasOwnProperty('hyjlList') && _this.jlData.hyjlList.length>0){
                   _this.showHyjl = true;
                 }
               }
             })
            this.$nextTick(function(){
                this.$refs.scroll.update()
            })
           }
         })
       }
    },
    updated(){
        this.$refs.scroll.update()
    }
}
</script>

<style scoped>
  .fd-sytable td.jlspb{
      text-align:left;
      color:#0099ff;
      padding-left:20px;
  }
  .fd-sytable td.jlspb *:hover{
      text-decoration:underline;
      cursor:pointer;
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
  .fd-jl-panel{
      margin:15px 0;
  }
  .fd-upload {
    text-align: left;
    margin-bottom:15px;
  }
  .fd-jl-title{
      margin-top:15px;
  }
  .fd-attach{
      font-weight:bold;
      color:#333;
      font-size: 14px;
      line-height:30px;
  }
  .status-box{
      float:right;
  }
  .status-box span{
      color:#297eb7;
      /* font-weight:bold; */
      font-size:14px;
      line-height:24px;
  }
  .status-box span.dxqk{
      margin:0 20px;
  }
  .status-box span.red{
      color:red;
  }
  .status-box span.yellow{
      color:#ff8c00;
  }
  .fd-jl-panel{
      background-color: #f5f8fb;
      border: 1px solid #e7eef5;
      padding: 20px;
  }
  .fd-jl-row{
      margin:0;
      text-align:left;
      font-size:14px;
      line-height:30px;
  }
  .fd-jl-label{
      font-weight:bold;
      color:#333;
      width: 100px;
      display: inline-block;
      text-align:right;
      margin-right:5px;
  }
  .table-title{
    text-align: center;
    padding: 0 20px;
  }
</style>


