<template>
     <div class="main_area fd-home-wrap">
        <div class="main_name">条款维护<aty-breadcrumb  can-click="" separator=">"></aty-breadcrumb></div>
        <div class="main_box fd-clause-main">
            <div class="fd-clause-list">
                <aty-row class="fd-add-flow">
                    <aty-button class="fd-btn-green  fl fd-btn-link" @click="addTkEvent()">
                        <i><img src="../../assets/images/upload.png"></i>
                        <span>添加条款</span>
                    </aty-button>
                    <aty-button class="fd-btn-green  fl fd-btn-link" @click="deleteRecordDialog()">
                        <i><img src="../../assets/images/delete.png"></i>
                        <span>删除条款</span>
                    </aty-button>
                </aty-row>
                <!-- 删除条款弹出框 -->
                 <aty-modal ok-text="确定" cancel-text="取消" closable ref="deleteTk" width="400" title="删除条款" class="fd-bj-modal" @on-ok="deleteTk" :mask-closable="false">
                    <aty-text text="确定要删除此条款吗？"></aty-text>
                </aty-modal>
                <!-- 添加流程弹出框 -->
                <aty-modal ok-text="确定" cancel-text="取消" closable ref="addTklc" width="400" title="添加流程"
                           class="fd-bj-modal" @on-ok="addTklcColumn" :mask-closable="false">
                    <aty-text text="确定要保存当前编辑的条款并添加流程吗？"></aty-text>
                </aty-modal>
                <!-- <aty-scroll :speed="53"> -->
                  <template v-if="this.treeData.length">
                    <!--<aty-scroll :speed="53" class="aty-clause-tree" ref="treeScroll" >-->
                    <happy-scroll class="tk-scroll" resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
                      <div class="fd-scroll-box">
                       <aty-select-tree class="tkwh_tree search_option_input fd-tkwh-tree" name="valueobject"
                                        ref="selectTree" :data="treeData" v-model="treeValue" @change="treeChange"
                                        clearable>
                       </aty-select-tree>
                      </div>
                    </happy-scroll>
                  </template>
                <!-- </aty-scroll> -->
            </div>
            <div class="fd-clause-add" >
              <!-- <aty-scroll :speed="53" class="aty-scroll-clause" ref="clauseScroll" :show="false"> -->
                <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
                  <div class="fd-scroll-box">
                    <div class="fd-title">
                        <div class="fd-title-item1">编辑条款</div>
                        <div class="fd-title-item2"></div>
                    </div>
                    <aty-form :data="bjtkForm" ref="tkForm" :label-width="166">
                        <aty-input  v-model="bjtkForm.tkbh"  label="条款编号：" placeholder="请输入条款编号"  class="fd-short-input required"   clearable  @keyup="keyupEvent" ref="tkbh" :show-message="false"></aty-input>
                        <aty-textarea label="条款内容："  v-model="bjtkForm.tknr"  rows="4" :maxlength='200'  ref="tknr" :show-message="false" class="required" :autosize="{minRows:4,maxRows:20}"  placeholder="请输入"></aty-textarea>
                        <aty-radio-group label="考核项目：" v-model="bjtkForm.khxm.value"   :data-list="bjtkForm.khxm.dataList"  ref="khxm" :show-message="false" class="required"></aty-radio-group>
                        <aty-checkbox-group label="考核对应模块："   v-model="bjtkForm.tkdymk.select" :data="tkdymkData" :data-list="bjtkForm.tkdymk.dataList" @change="khmkSelectChange" class="fd-checkbox-khmk required"   ref="khdymk" :show-message="false"></aty-checkbox-group>

                    <div class="fd-model-panel fd-model-panel1"  v-if="isThisModelShow('4')">
                        <div class="fd-form-panel">
                                <aty-input  v-model="bjtkForm.jffz"  label="加分分值：" placeholder="请输入分值"   class="fd-short-input fd-num-input fl required"   clearable   @keyup="fzkeyupEvent('1')" ref="jffz" :show-message="false"></aty-input>
                                <aty-input  v-model="bjtkForm.fzjldw"  label="分值计量单位：" placeholder="请输入单位"  class="fd-short-input  fd-num-input fl required" clearable  pattern="^[1-9]\d*$" pattern-message="请输入非0正整数"  v-if="isShowfzjldw" ref="fzjldw1"  @keyup="scoreNumOnly(1)" :show-message="false"></aty-input>
                                <aty-input  v-model="bjtkForm.dyljzgjf"  label="当月累计最高加分分值："  placeholder="请输入分值"  class="fd-short-input fd-clear-input" clearable  @keyup="scoreNumOnly(2)"></aty-input>
                                <aty-radio-group label="所属教育基础分分项：" v-model="bjtkForm.ssjyjcffx.value"  :data-list="bjtkForm.ssjyjcffx.dataList" class="fd-radio-jcf">
                                </aty-radio-group>
                        </div>
                        <aty-row class="fd-add-flow" v-show="false">
                            <aty-button class="fd-btn-green  fl fd-btn-link" @click="addTklcDialog('4')" v-show="false">
                                <i><img src="../../assets/images/upload.png"></i>
                                <span>添加流程</span>
                            </aty-button>
                        </aty-row>
                        <div  class="fd-table-flow" v-if="jftableData.length > 0" v-show="false">
                            <aty-table
                                :pageable-data="jftableData"
                                style="width: 100%; " stripe="" :exp-all="false"  :exp-current-page="false">
                                    <aty-table-column
                                    prop="fz"
                                    label="加分分值"
                                    width="156" :showOverflowTooltip="false">
                                    <!-- <template slot-scope="scope">
                                        <aty-input  v-model="bjtkForm.tkbh"   ></aty-input>
                                    </template> -->
                                    <template slot-scope="scope">
                                        <!--<aty-input  v-model="scope.row.jffz"   ></aty-input>-->
                                        <div v-if="scope.row.editFlag"><aty-input  v-model="scope.row.fz"   :title="scope.row.fz"></aty-input></div>
                                        <div :title="scope.row.fz" v-if="!scope.row.editFlag">{{scope.row.fz}}</div>
                                    </template>
                                </aty-table-column>
                                <aty-table-column
                                    prop="splcBh"
                                    label="审批流程" :showOverflowTooltip="false">
                                    <template slot-scope="scope" v-if="splcList.length">
                                        <aty-select class="search_option_input" v-if="scope.row.editFlag" :data="splcList" v-model="scope.row.splcBh" :title="scope.row.splcBh"></aty-select>
                                        <div :title="scope.row.lcmc" v-if="!scope.row.editFlag">{{scope.row.lcmc}}</div>
                                    </template>
                                </aty-table-column>
                                <aty-table-column label="操作" width="160"  :showOverflowTooltip="false">
                                    <template slot-scope="scope">
                                        <i class="operator">
                                        <img @click="saveTklc(scope)" title="保存" class="table_butn" src="../../assets/images/save-blue.png" v-if="scope.row.editFlag">
                                        <img @click="editTklc(scope)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png" v-else>
                                        </i>
                                        <i  class="operator">
                                        <img @click="delTklc(scope)" title="删除" class="table_butn" src="../../assets/images/w-png23.png" >
                                        </i>
                                    </template>
                                </aty-table-column>
                            </aty-table>
                        </div>
                    </div>

                    <div class="fd-model-panel fd-model-pane2"  v-show="isThisModelShow('3')">
                        <div class="fd-form-panel">
                            <aty-input  v-model="bjtkForm.kffz"  label="扣分分值：" placeholder="请输入分值"   class="fd-short-input fd-num-input fl required" clearable  @keyup="fzkeyupEvent('2')" ref="kffz" :show-message="false"></aty-input>
                            <aty-input  v-model="bjtkForm.fzjldw"  label="分值计量单位：" placeholder="请输入单位" pattern="^[1-9]\d*$" pattern-message="请输入非0正整数"  class="fd-short-input  fd-num-input fl required" clearable  v-if="isShowfzjldw2"  ref="fzjldw2"  @keyup="scoreNumOnly(1)" :show-message="false"></aty-input>
                            <aty-radio-group label="对基础分的影响：" v-model="bjtkForm.djcfyx.value"  :data-list="bjtkForm.djcfyx.dataList" class="fd-radio-jcf  fd-clear-input"> </aty-radio-group>
                            <aty-checkbox-group label="取消教育基础分：" v-model="bjtkForm.qxjyjcfx.select" :show-message="false"  :data-list="bjtkForm.qxjyjcfx.dataList" class="fd-checkbox-khmk"></aty-checkbox-group>
                            <aty-radio-group label="对考核积分的影响：" v-model="bjtkForm.dkhjfyx.value"  :data-list="bjtkForm.dkhjfyx.dataList" class="fd-radio-jcf  fd-clear-input"> </aty-radio-group>
                            <aty-radio-group label="对奖励的影响：" v-model="bjtkForm.djlyx.value"  :data-list="bjtkForm.djlyx.dataList" class="fd-radio-jcf  fd-clear-input"> </aty-radio-group>
                        </div>
                        <aty-row class="fd-add-flow" v-show="false">
                            <aty-button class="fd-btn-green  fl fd-btn-link" @click="addTklcDialog('3')">
                                <i><img src="../../assets/images/upload.png"></i>
                                <span>添加流程</span>
                            </aty-button>
                        </aty-row>
                        <div  class="fd-table-flow" v-if="kftableData.length > 0">
                            <aty-table
                                :pageable-data="kftableData"
                                style="width: 100%; " stripe="" :exp-all="false"  :exp-current-page="false">
                                    <aty-table-column
                                    prop="fz"
                                    label="扣分分值"
                                    width="156" >
                                    <template slot-scope="scope" :showOverflowTooltip="false">
                                        <div v-if="scope.row.editFlag"><aty-input  v-model="scope.row.fz"   :title="scope.row.fz"></aty-input></div>
                                        <div :title="scope.row.fz" v-if="!scope.row.editFlag">{{scope.row.fz}}</div>
                                    </template>
                                </aty-table-column>
                                <aty-table-column
                                    prop="splcBh"
                                    label="审批流程" :showOverflowTooltip="false">
                                    <template slot-scope="scope" v-if="splcList.length">
                                        <aty-select class="search_option_input" v-if="scope.row.editFlag" :data="splcList" v-model="scope.row.splcBh" :title="scope.row.splcBh"></aty-select>
                                        <div :title="scope.row.lcmc" v-if="!scope.row.editFlag">{{scope.row.lcmc}}</div>
                                    </template>
                                </aty-table-column>
                                <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
                                   <template slot-scope="scope">
                                        <i  class="operator">
                                        <img @click="saveTklc(scope)" title="保存" class="table_butn" src="../../assets/images/save-blue.png" v-if="scope.row.editFlag">
                                        <img @click="editTklc(scope)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png" v-else>
                                        </i>
                                        <i  class="operator">
                                        <img @click="delTklc(scope)" title="删除" class="table_butn" src="../../assets/images/w-png23.png" >
                                        </i>
                                    </template>
                                </aty-table-column>
                            </aty-table>
                        </div>
                    </div>

                    <div class="fd-model-panel fd-model-panel3" v-show="isThisModelShow('6')">
                        <div class="fd-form-panel">
                            <aty-input  v-model="bjtkForm.zxjffz"  label="专项加分分值：" placeholder="请输入分值"   class="fd-short-input fd-num-input fl required" clearable    ref="zxjffz" @keyup="scoreNumOnly(3)" :show-message="false"></aty-input>
                        </div>
                        <aty-row class="fd-add-flow" v-show="false">
                            <aty-button class="fd-btn-green  fl fd-btn-link" @click="addTklcDialog('6')">
                                <i><img src="../../assets/images/upload.png"></i>
                                <span>添加流程</span>
                            </aty-button>
                        </aty-row>
                        <div  class="fd-table-flow" v-if="zxjftableData.length > 0" v-show="false">
                            <aty-table
                                :pageable-data="zxjftableData"
                                style="width: 100%; " stripe="" :exp-all="false"  :exp-current-page="false">
                                    <aty-table-column
                                    prop="fz"
                                    label="专项加分分值"
                                    width="156"  :showOverflowTooltip="false">
                                    <!-- <template slot-scope="scope">
                                        <aty-input  v-model="bjtkForm.tkbh"   ></aty-input>
                                    </template> -->
                                    <template slot-scope="scope">
                                        <!--<aty-input  v-model="scope.row.jffz"   ></aty-input>-->
                                        <div v-if="scope.row.editFlag"><aty-input  v-model="scope.row.fz"></aty-input></div>
                                        <div :title="scope.row.fz" v-if="!scope.row.editFlag">{{scope.row.fz}}</div>
                                    </template>
                                </aty-table-column>
                                <aty-table-column
                                    prop="splcBh"
                                    label="审批流程" :showOverflowTooltip="false">
                                    <template slot-scope="scope" v-if="splcList.length">
                                        <aty-select class="search_option_input" v-if="scope.row.editFlag" :data="splcList" v-model="scope.row.splcBh" :title="scope.row.splcBh"></aty-select>
                                        <div :title="scope.row.lcmc" v-if="!scope.row.editFlag">{{scope.row.lcmc}}</div>
                                    </template>
                                </aty-table-column>
                                <aty-table-column label="操作" width="160" :showOverflowTooltip="false">
                                    <template slot-scope="scope">
                                        <i  class="operator">
                                        <img @click="saveTklc(scope)" title="保存" class="table_butn" src="../../assets/images/save-blue.png" v-if="scope.row.editFlag">
                                        <img @click="editTklc(scope)" title="编辑" class="table_butn" src="../../assets/images/w-png22.png" v-else>
                                        </i>
                                        <i  class="operator">
                                        <img @click="delTklc(scope)" title="删除" class="table_butn" src="../../assets/images/w-png23.png" >
                                        </i>
                                    </template>
                                </aty-table-column>
                            </aty-table>
                        </div>
                    </div>

                    <!--<div class="fd-model-panel fd-model-panel4" v-show="isThisModelShow('5')">-->
                    <div class="fd-model-panel fd-model-panel4" v-show="false">
                        <div class="fd-form-panel">
                            <aty-select  label="警告审批流程：" :show-message="false"  class="fd-short-input fd-num-input fl" clearable></aty-select>
                            <aty-select  label="记过审批流程：" :show-message="false"  class="fd-short-input fd-num-input fl" clearable></aty-select>
                            <aty-select  label="禁闭审批流程：" :show-message="false"  class="fd-short-input fd-num-input fl" clearable></aty-select>
                        </div>
                    </div>
                    <!--<div class="fd-model-panel fd-model-panel5" v-show="isThisModelShow('2')">-->
                    <div class="fd-model-panel fd-model-panel5" v-show="false">
                        <div class="fd-form-panel">
                            <aty-select  label="训诫审批流程：" :show-message="false"  class="fd-short-input fd-num-input fl" ::data="xjSplcList" clearable></aty-select>
                        </div>
                    </div>
                   </aty-form>
              <!-- </aty-scroll> -->
              </div>
                </happy-scroll>
            </div>
        </div>
        <aty-button  text="保存" class="fd-btn-blue fd-save-clause" @click="saveButn">
            <i>
                <img src="../../assets/images/save.png">
            </i>
            <span>保存</span>
        </aty-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      bjtkForm: {
        bh: "",
        tkbh: "",
        tknr: "",
        jffz: "",
        kffz: "",
        fzjldw: "",
        khxm: {
          value: "",
          dataList: [
            {
              code: "1",
              codeType: "khxm",
              name: "教育"
            },
            {
              code: "2",
              codeType: "khxm",
              name: "劳动"
            },
            {
              code: "3",
              codeType: "khxm",
              name: "无"
            }
          ]
        },
        tkdymk: {
          select: [],
          dataList: [
            {
              code: "4",
              codeType: "tkdymk",
              name: "加分"
            },
            {
              code: "3",
              codeType: "tkdymk",
              name: "扣分"
            },
            {
              code: "6",
              codeType: "tkdymk",
              name: "专项加分"
            },
            {
              code: "5",
              codeType: "tkdymk",
              name: "单项处罚"
            },
            {
              code: "2",
              codeType: "tkdymk",
              name: "训诫"
            },
            {
              code: "9",
              codeType: "tkdymk",
              name: "暂外违规"
            }
          ]
        },
        ssjyjcffx: {
          value: "",
          dataList: [
            {
              code: "2",
              codeType: "ssjyjcffx",
              name: "认罪悔罪"
            },
            {
              code: "3",
              codeType: "ssjyjcffx",
              name: "遵规守纪"
            },
            {
              code: "4",
              codeType: "ssjyjcffx",
              name: "生活卫生"
            },
            {
              code: "5",
              codeType: "ssjyjcffx",
              name: "接受教育"
            },
            {
              code: "6",
              codeType: "ssjyjcffx",
              name: "劳动态度"
            },
            {
              code: "7",
              codeType: "ssjyjcffx",
              name: "联号无违纪"
            },
            {
              code: "8",
              codeType: "ssjyjcffx",
              name: "手动选择"
            }
          ]
        },
        //扣分 对基础分的影响
        djcfyx: {
          value: "",
          dataList: [
            {
              code: "1",
              codeType: "djcfyx",
              name: "无影响"
            },
            {
              code: "2",
              codeType: "djcfyx",
              name: "取消教育基础分"
            },
            {
              code: "3",
              codeType: "djcfyx",
              name: "取消劳动基础分"
            },
            {
              code: "4",
              codeType: "djcfyx",
              name: "取消全部基础分"
            }
          ]
        },
        //取消教育基础分
        qxjyjcfx: {
          select: [],
          dataList: [
            /*
            {
              code: "1",
              codeType: "qxjyjcfx",
              name: "选择全部"
            },*/
            {
              code: "2",
              codeType: "qxjyjcfx",
              name: "认罪悔罪"
            },
            {
              code: "3",
              codeType: "qxjyjcfx",
              name: "遵规守纪"
            },
            {
              code: "4",
              codeType: "qxjyjcfx",
              name: "生活卫生"
            },
            {
              code: "5",
              codeType: "qxjyjcfx",
              name: "接受教育"
            },
            {
              code: "6",
              codeType: "qxjyjcfx",
              name: "劳动态度"
            },
            {
              code: "7",
              codeType: "qxjyjcfx",
              name: "联号无违纪"
            },
            {
              code: "8",
              codeType: "qxjyjcfx",
              name: "手动选择"
            }
          ]
        },
        //对考核积分影响
        dkhjfyx: {
          value: "",
          dataList: [
            {
              code: "1",
              codeType: "dkhjfyx",
              name: "无影响"
            },
            {
              code: "2",
              codeType: "dkhjfyx",
              name: "取消已有考核积分"
            }
          ]
        },
        //对奖励影响
        djlyx: {
          value: "",
          dataList: [
            {
              code: "1",
              codeType: "djlyx",
              name: "无影响"
            },
            {
              code: "2",
              codeType: "djlyx",
              name: "取消所有奖励"
            }
          ]
        }
      },
      //审批流程列表,调用获取流程列表接口
      splcList: [],
      tableData: [],
      // 下拉树 数据
      treeValue: "",
      valueobject: {},
      jftableData: [],
      kftableData: [],
      zxjftableData: [],
      // 点击的树id
      treeId: "",
      treeData: [],
      tkbhList: [],
      treeTkbh: "",
      curTkbh: "",
      curType: "",
      xjSplcList:[],
      operateType:'insert'

    };
  },
  created() {
    //this.getTklcpzList();
    this.getTkTreeData();
    this.getTkbhData();
    // this.getSplcList();
  },
  methods: {
    keyupEvent() {
      this.bjtkForm.tkbh = this.bjtkForm.tkbh.replace(/[^(\d|/)]/g, "");
    },
    scoreNumOnly(param){
      if(param == 1){
        this.bjtkForm.fzjldw = this.bjtkForm.fzjldw.replace(/[^0-9]/g, "")
      }
      if(param == 2){
        this.bjtkForm.dyljzgjf = this.bjtkForm.dyljzgjf.replace(/[^0-9]/g, "")
      }
      if(param == 3){
        this.bjtkForm.zxjffz = this.bjtkForm.zxjffz.replace(/[^0-9]/g, "")
      }
    },
    fzkeyupEvent() {
      var param = arguments[0];
      if (param === "1") {
        this.bjtkForm.jffz = this.bjtkForm.jffz.replace(/[^0-9,-]/g, "");
      }
      if (param === "2") {
        this.bjtkForm.kffz = this.bjtkForm.kffz.replace(/[^0-9,-]/g, "");
      }
    },
    addStepEvent(type) {
      // var type = arguments[0];
      let temp = null;
      temp = {
        bh: "",
        tkBh: "",
        fz: "",
        splc: "",
        editFlag: true
      };
      switch (type) {
        case "4":
          this.jftableData.push(temp);
          break;
        case "3":
          this.kftableData.push(temp);
          break;
        case "6":
          this.zxjftableData.push(temp);
          break;
      }
    },
    //添加条款时时事件
    addTkEvent() {
      this.curTkbh = "";
      // this.treeTkbh = "";
      this.operateType = 'insert';
      this.clearForm();
    },
    //获取条款树
    getTkTreeData(type) {
      let _this = this;
      this.getRequest("/api/v1/tkwh/getTkTree").then(resp => {
        if (resp && resp.status == 200) {
          _this.treeData = resp.data;
          if (type === "reload") {
            _this.$refs.selectTree.update(resp.data);
          }
        } else {
          Artery.message.info({
            content:"获取条款树出错！",
            duration:3
          });
        }
      });
    },
    //获取已有条款编号数据
    getTkbhData() {
      let _this = this;
      this.getRequest("/api/v1/tkwh/getTkbhList").then(resp => {
        if (resp && resp.status == 200) {
          _this.tkbhList = resp.data;
        }
      });
    },
    //点击删除弹窗
    deleteRecordDialog() {
      if (this.treeId === "") {
        Artery.message.info({
            content:"请选择一个条款再进行删除！",
            duration:3
        });
        return;
      }
      this.$refs.deleteTk.open();
    },
    //删除条款
    deleteTk() {
      let tkBh = this.treeId;
      this.deleteRequest("/api/v1/tkwh/deleteTk/" + tkBh).then(resp => {
        if (resp && resp.status == 200) {
          this.$refs.deleteTk.close();
          //重新加载条款树
          this.getTkTreeData("reload");
          this.getTkbhData();
          // //清空右侧编辑form
          this.clearForm();
          this.treeValue='';
          this.treeId="";
          this.treeTkbh="";
          this.operateType = 'insert';
          this.$nextTick(function(){
            this.$refs.treeScroll.update()
          })
        } else {
          Artery.message.info({
            content:"删除条款失败！",
            duration:3
          });
          this.$refs.deleteTk.close();
        }
      });
    },
    //点击添加条款流程
    addTklcDialog() {
      if (!this.bjtkForm.tkdymk.select || this.bjtkForm.tkdymk.select == "") {
        Artery.message.info({
           content:"请先选择考核项目",
           duration:3
        });
        return;
      }
      this.curType = arguments[0];
      this.$refs.addTklc.open();
    },
    // //取消添加条款流程
    // cancelAddTklc() {
    //   this.$refs.addTklc.close();
    // },
    //添加条款流程
    addTklcColumn() {
      this.$refs.addTklc.close();
      this.saveButn("addTklc");
      this.getSplcList();
      this.queryTklcpz();
    },
    //获取审批流程列表
    getSplcList() {
      var params = {
        ssywmk: "rjz",
        lx: this.curType
      };
      this.postRequest("/api/v1/sp/selectSplcList/", params).then(resp => {
        if (resp && resp.status == 200) {
          for (var i = 0; i < resp.data.ArrayList.length; i++) {
            var code = resp.data.ArrayList[i].bh;
            var name = resp.data.ArrayList[i].lcmc;
            var result = {
              code: code,
              name: name
            };
            this.$set(this.splcList, i, result);
          }
        }
      });
    },
    // 下拉树更改
    treeChange(treeNode, name, event) {
      this.treeId = treeNode.id;
      this.operateType = 'update';

      this.getRequest("/api/v1/tkwh/getTkByBh/" + this.treeId).then(resp => {
        if (resp && resp.status == 200) {
          let resultData = resp.data;
          this.treeTkbh = resultData.tkbh;
          this.curTkbh = resultData.bh;
          this.bjtkForm.bh = resultData.bh;
          this.bjtkForm.tkbh = resultData.tkbh;
          this.bjtkForm.tknr = resultData.tknr;
          this.bjtkForm.khxm.value = resultData.khxm;
          var tkdymkValue = resultData.tkdymk;
          let tkdymkArray = tkdymkValue.split(";");
          let newTkdymkArray = [];
          if (tkdymkArray != null) {
            for(var i = 0;i<tkdymkArray.length;i++){
              if(tkdymkArray[i] == ""){
                continue;
              }
              newTkdymkArray.push(tkdymkArray[i]);
            }
            this.bjtkForm.tkdymk.select = newTkdymkArray;
          }
          this.bjtkForm.jffz = resultData.jffz;
          this.bjtkForm.fzjldw = resultData.fzjldw;
          this.bjtkForm.dyljzgjf = resultData.dyljzgjf;
          this.bjtkForm.ssjyjcffx.value = resultData.ssjyjcffx;
          this.bjtkForm.kffz = resultData.kffz;
          this.bjtkForm.djcfyx.value = resultData.djcfyx;

          var qxjyjcffxValue = resultData.qxjyjcfx;
          let qxjyjcffxArray = qxjyjcffxValue.split(";");
          if (qxjyjcffxArray != null) {
            this.bjtkForm.qxjyjcfx.select = qxjyjcffxArray;
          }
          this.bjtkForm.dkhjfyx.value = resultData.dkhjfyx;
          this.bjtkForm.djlyx.value = resultData.djlyx;
          this.bjtkForm.zxjffz = resultData.zxjffz;

          this.jftableData = [];
          this.kftableData = [];
          this.zxjftableData = [];
          // this.$nextTick(function(){
          //   this.$refs.clauseScroll.update()
          // })
        } else {
          Artery.message.info({
             content:"获取此条款信息出错！",
             duration:3
          });
        }
      });
    },

    // 保存按钮
    saveButn(opType) {
      if (this.operateType == 'insert' && this.bjtkForm.tkbh != "" && this.checkLinkShow(this.bjtkForm.tkbh, this.tkbhList)) {
        Artery.message.warning({
            content:"该编号已存在！",
            duration:3
        });
        return;
      }
      let tkbh = this.bjtkForm.tkbh;
      if (this.treeTkbh && this.treeTkbh != "" && this.curTkbh == "") {
        if (tkbh.lastIndexOf("/"+this.treeTkbh) <= 0) {
          Artery.message.warning({
             content:"该条款必须以/" + this.treeTkbh + "结尾！",
             duration:3
          });
          return;
        }
        if(tkbh == this.treeTkbh) {
          Artery.message.warning({
            content:"该条款不能是" + this.treeTkbh + "！",
            duration:3
          });
          return;
        }
      }
      if(this.bjtkForm.tkbh == ''){
          Artery.message.warning({
             content:"条款编号为必填项",
             duration:3
          });
          return
      }
      if(this.bjtkForm.tknr == ''){
          Artery.message.warning({
             content:"条款内容为必填项",
             duration:3
          });
          return
      }
      if(this.bjtkForm.khxm.value == ''){
          Artery.message.warning({
             content:"考核项目为必填项",
             duration:3
          });
          return
      }
      if(this.bjtkForm.tkdymk.select.length == 0){
          Artery.message.warning({
             content:"考核对应模块为必填项",
             duration:3
          });
          return
      }else{
        for(var i=0;i<this.bjtkForm.tkdymk.select.length;i++){
          let temp= this.bjtkForm.tkdymk.select[i]
          if(temp === '4'){//加分
             if(this.bjtkForm.jffz == ''){
                Artery.message.warning({
                   content:"加分分值为必填项",
                   duration:3
                });
                return
             }else if(!/^(0|[1-9][0-9]*)([,-]([1-9][0-9]*))?([,]([1-9][0-9]*))*$/.test(this.bjtkForm.jffz)){
                Artery.message.warning({
                   content:"加分分值必须输入非负正数或以,分隔的多个数字或以-分隔的数字范围",
                   duration:3
                });
                return
             }else if(this.isShowfzjldw && this.$refs.fzjldw1.value ==''){
                Artery.message.warning({
                   content:"加分分值计量单位为必填项",
                   duration:3
                });
                return
             }else{
                continue;
             }
          }else if(temp === '3'){//扣分
            if(this.bjtkForm.kffz == ''){
                Artery.message.warning("扣分值为必填项");
                return
             }else if(!/^(0|[1-9][0-9]*)([,-]([1-9][0-9]*))?([,]([1-9][0-9]*))*$/.test(this.bjtkForm.kffz)){
                Artery.message.warning({
                   content:"扣分分值必须输入非负正数或以,分隔的多个数字或以-分隔的数字范围",
                   duration:3
                });
                return
             }else if(this.isShowfzjldw2 && this.$refs.fzjldw2.value ==''){
                Artery.message.warning({
                   content:"扣分分值计量单位为必填项",
                   duration:3
                });
                return
             }else{
                continue;
             }
          }else if(temp === '6'){//单项加分
            if(this.bjtkForm.zxjffz == ''){
              Artery.message.warning({
                   content:"专项加分为必填项",
                   duration:3
              });
              return;
            }
          }else{
             continue;
          }
        }
      }
      //条款对应模块
      let params = {};
      let tkdymk = this.bjtkForm.tkdymk.select;
      let tkdymkStrs = "";
      for (let i = 0; i < tkdymk.length; i++) {
        if (tkdymk[i] != "") {
          tkdymkStrs += tkdymk[i] + ";";
        }
      }
      params.tkdymk = tkdymkStrs;
      //取消教育基础分项
      let qxjyjcfx = this.bjtkForm.qxjyjcfx.select;
      if (qxjyjcfx != null) {
        let qxjyjcfxStrs = "";
        for (let i = 0; i < qxjyjcfx.length; i++) {
          if (qxjyjcfx[i] != "") {
            qxjyjcfxStrs += qxjyjcfx[i] + ";";
          }
        }
        params.qxjyjcfx = qxjyjcfxStrs;
      }
      params.bh = this.bjtkForm.bh;
      params.tkbh = this.bjtkForm.tkbh;
      params.tknr = this.bjtkForm.tknr;
      params.khxm = this.bjtkForm.khxm.value;
      params.jffz = this.bjtkForm.jffz;
      params.fzjldw = this.bjtkForm.fzjldw;
      params.dyljzgjf = this.bjtkForm.dyljzgjf;
      params.zxjffz = this.bjtkForm.zxjffz;
      params.kffz = this.bjtkForm.kffz;
      params.djcfyx = this.bjtkForm.djcfyx.value;
      params.dkhjfyx = this.bjtkForm.dkhjfyx.value;
      params.djlyx = this.bjtkForm.djlyx.value;
      params.ssjyjcffx = this.bjtkForm.ssjyjcffx.value;
      params.zxjffz = this.bjtkForm.zxjffz;
      params.ftkBh = this.treeId;
      //TODO 还差3个流程
      this.submitTk(params, opType);
    },
    submitTk(params, opType) {
      this.postRequest("/api/v1/tkwh/saveTk", params).then(resp => {
        // this.$refs['form'].validate(function(valid) {
        if (resp && resp.status == 200) {
          Artery.message.info({
             content:"保存成功",
             duration:1.5
          });
          //重新加载条款树
          this.getTkTreeData("reload");
          this.getTkbhData();
          this.curTkbh = resp.data;
          this.treeTkbh = "";
          this.treeId = "";
          //清除右侧form
          if (opType != "addTklc") {
            this.clearForm();
            this.treeValue=''
            this.treeId=""
            this.$nextTick(function(){
              this.$refs.treeScroll.update()
            })
          }
          // this.$nextTick(function(){
          //     this.$refs.clauseScroll.update()
          // })
        } else {
          Artery.message.info({
             content:"保存失败",
             duration:3
          });
        }
      });
    },
    //获取条款流程配置列表
    getTklcpzList: function() {
      var tkBh = "12312312321312asdasdas          ";
      var fz = "";
      var _this = this;
      this.getRequest(
        "/api/v1/tk/getTkSplcpzList/tkBh=" + tkBh + "/fz=" + fz
      ).then(resp => {
        _this.tableData = resp.data.ArrayList;
      });
    },
    khmkSelectChange(currentChecked, currentDataItem, name) {
      var _this = this;
      // this.$refs.clauseScroll.update()
      var data = _this.bjtkForm.tkdymk.dataList;
      var khxm = _this.bjtkForm.khxm.dataList;
      if(currentChecked.length > 0){
        var tkdymk  = _this.bjtkForm.tkdymk.select;
        if(tkdymk.length > 0) {
          for(var i=0;i<tkdymk.length;i++) {
            if(tkdymk[i] != "9") {
              _this.$set(data[5],"disabled",true);
              break;
            } else {
              for(var i=0;i<data.length;i++) {
                if(data[i].code == "9") {
                  _this.$set(khxm[1],"disabled",true);
                  _this.$set(khxm[2],"disabled",true);
                  _this.$set(data[i],"disabled",false);
                } else {
                  _this.$set(khxm[1],"disabled",false);
                  _this.$set(khxm[2],"disabled",false);
                  _this.$set(data[i],"disabled",true);
                }
              }
            }
          }
        }
      } else {
        for(var i=0;i<data.length;i++) {
          _this.$set(data[i],"disabled",false);
        }
        _this.$set(khxm[1],"disabled",false);
        _this.$set(khxm[2],"disabled",false);
      }
    },
    isThisModelShow: function(item) {
      if (item && item === "2") {
        // this.queryXjSplc();
      }
      return this.bjtkForm.tkdymk.select.indexOf(item) != -1 ? true : false;
    },
    //查询训诫审批流程
    queryXjSplc() {
      var params = {
        ssywmk: "rjz",
        lx: "2"
      };
      this.postRequest("/api/v1/sp/selectSplcList/", params).then(resp => {
        if (resp && resp.status == 200) {
          for (var i = 0; i < resp.data.ArrayList.length; i++) {
            var code = resp.data.ArrayList[i].bh;
            var name = resp.data.ArrayList[i].lcmc;
            var result = {
              code: code,
              name: name
            };
            this.$set(this.xjSplcList, i, result);
          }
        }
      });
    },
    saveTklc: function(item) {
      // 非空校验
      if (item.row.fz == "") {
        Artery.message.info({
             content:"分值不能为空!",
             duration:3
        });
        return;
      }
      if (item.row.splcBh == "") {
        Artery.message.info({
            content:"流程不能为空!",
            duration:3
        });
        return;
      }
      item.row.editFlag = false;
      var bh = item.row.bh;
      var tkbh = item.row.tkBh;
      if (tkbh == "") {
        tkbh = this.curTkbh;
      }
      var params = {
        bh: bh,
        tkbh: tkbh,
        fz: item.row.fz,
        splcBh: item.row.splcBh,
        tklx: this.curType
      };
      if (bh === "") {
        this.addTklc(item, params);
      } else {
        this.updateTklc(params);
      }
    },
    //清除右侧form
    clearForm() {
      this.bjtkForm.bh = "";
      this.bjtkForm.tkbh = "";
      this.bjtkForm.tknr = "";
      this.bjtkForm.khxm.value = "";
      this.bjtkForm.tkdymk.select = [];
      this.bjtkForm.jffz = "";
      this.bjtkForm.fzjldw = "";
      this.bjtkForm.dyljzgjf = "";
      this.bjtkForm.ssjyjcffx.value = "";
      this.bjtkForm.kffz = "";
      this.bjtkForm.djcfyx.value = "";
      this.bjtkForm.qxjyjcfx.select = [];
      this.bjtkForm.dkhjfyx.value = "";
      this.bjtkForm.djlyx.value = "";
      this.bjtkForm.zxjffz = "";
    },
    //修改条款流程
    editTklc: function(item) {
      item.row.editFlag = true;
    },
    //删除条款流程
    delTklc(item) {
      var bh = item.row.bh;
      if(bh == ""){
        return;
      }
      this.deleteRequest("/api/v1/tk/deleteTkSplcpz/" + bh).then(resp => {
        if (resp && resp.status == 200) {
          this.queryTklcpz();
          Artery.message.info({
             content:"删除成功",
             duration:1.5
          });
        } else {
          Artery.message.info({
             content:"删除失败",
             duration:3
          });
        }
      });
      //this.tableData.splice(item.$index, 1);
    },
    //添加条款流程
    addTklc: function(item, params) {
      this.postRequest("/api/v1/tk/addTkSplcpz/", params).then(resp => {
        if (resp && resp.status == 200) {
          item.row.bh = resp.data;
          this.queryTklcpz();
          Artery.message.info({
             content:"保存成功",
             duration:3
          });
        } else {
          Artery.message.info({
             content:"保存失败",
             duration:3
          });
        }
      });
    },
    //修改条款流程
    updateTklc: function(params) {
      this.postRequest("/api/v1/tk/updateTkSplcpz/", params).then(resp => {
        if (resp && resp.status == 200) {
          this.queryTklcpz();
          Artery.message.info({
             content:"保存成功",
             duration:1.5
          });
        } else {
          Artery.message.info({
             content:"保存失败",
             duration:3
          });
        }
      });
    },
    queryTklcpz() {
      let _this = this;
      var params = {
        tkBh: this.curTkbh,
        tklx: this.curType
      };
      this.getRequest("/api/v1/tk/getTkSplcpzList", params).then(resp => {
        if (resp && resp.status == 200) {
          if (resp.data.length > 0) {
            if ("4" === this.curType) {
              _this.jftableData = resp.data;
            }
            if ("3" === this.curType) {
              _this.kftableData = resp.data;
            }
            if ("6" === this.curType) {
              _this.zxjftableData = resp.data;
            }
          } else {
            _this.jftableData = [];
            _this.kftableData = [];
            _this.zxjftableData = [];
          }
          // if(type === "add"){
          this.addStepEvent(this.curType);
          // }
        } else {
          Artery.message.error({
            content:"获取条款流程配置出错！",
            duration:3
          });
        }
      });
    }
  },
  computed: {
    /**
     * 动态显示条款对应模块
     * @returns {*[]}
     */
    tkdymkData() {
      var _this = this;
      var khxm= _this.bjtkForm.khxm.value;
      var khxmList= _this.bjtkForm.khxm.dataList
      var data = _this.bjtkForm.tkdymk.dataList;
      var tkdymk  = _this.bjtkForm.tkdymk.select;
      if(khxm == "") {
        for (var i = 0; i < khxmList.length; i++) {
          _this.$set(khxmList[i], "disabled", false);
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i].code == "9") {
            _this.$set(data[i], "disabled", true);
          } else {
            _this.$set(data[i], "disabled", false);
          }
        }
      }else if(tkdymk.length > 0) {
        var flag = false;
        for (var i = 0; i < tkdymk.length; i++) {
          if (tkdymk[i] != "9") {
            flag = true;
          }
        }
        if(flag) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].code == "9") {
              _this.$set(data[i], "disabled", true);
            } else {
              _this.$set(data[i], "disabled", false);
            }
          }
        }
      }else if(khxm != "1") {
        for(var i=0;i<data.length;i++) {
          if(data[i].code == "9") {
            _this.$set(data[i],"disabled",true);
          } else {
            _this.$set(data[i],"disabled",false);
          }
        }
        for(var i=0;i<tkdymk.length;i++) {
          if(tkdymk[i] == "9") {
            tkdymk.splice(i,1);
            break;
          }
        }
      }else if(tkdymk.length == 0){
        _this.$set(data[5],"disabled",false);
      }
      return data;
    },
    isShowfzjldw: function() {
      var jffz = this.bjtkForm.jffz;
      if (jffz != undefined && jffz != "" && jffz.toString().indexOf("-") != -1) {
        return true;
      } else {
        return false;
      }
    },
    isShowfzjldw2: function() {
      var kffz = this.bjtkForm.kffz;
      if (kffz != undefined && kffz != "" && kffz.toString().indexOf("-") != -1) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
.fd-home-wrap .aty-form {
  height: calc(100% - 95px);
}
.fd-table-flow .aty-table tr td .cell {
  padding: 0 10px;
  margin: 5px 0;
}
.fd-clause-add .aty-form-item-label {
  font-size: 14px;
  color: #333;
  font-weight: bold;
  padding-right: 5px;
}
.fd-short-input .aty-input-box {
  width: 226px;
}
.fd-clause-add .aty-input {
  height: 35px;
}
.fd-clause-add .aty-form-item {
  margin-bottom: 19px;
}
.fd-clause-add .fd-table-flow .aty-form-item {
  margin-bottom: 0;
}
.fd-clause-add .aty-form-item.fd-num-input {
  width: 50%;
}
.fd-clear-input {
  clear: both;
}
.fd-clause-add .aty-form-item.fd-checkbox-khmk {
  margin-bottom: 20px;
}
.fd-clause-add .aty-form-item.fd-radio-jcf {
  margin-bottom: 0;
}
.fd-add-flow {
  margin-top: 0;
  background: #f5f8fb;
  padding-left: 12px;
  padding-bottom: 18px;
}
.fd-add-flow .fd-btn-green.aty-btn {
  font-size: 14px;
  padding: 4px 20px;
}
.fd-table-flow {
  padding: 0 10px;
  background: #f5f8fb;
}
.fd-form-panel .aty-form-item-label {
  width: 166px;
  float: left;
}
.fd-form-panel .aty-form-item-content {
  width: calc(100% - 166px);
  /* float: left; */
}
.fd-clause-add .aty-checkbox-group-item,
.fd-clause-add .aty-radio-wrapper {
  margin-right: 15px;
}
.fd-clause-add .aty-table tr:nth-child(even) {
  background: #f5f8fb;
}
/* .fd-clause-add .aty-table tr {
  background: #f5f8fb;
} */
.fd-clause-add .aty-checkbox + span {
  margin-left: 4px;
}
.fd-table-footer {
  height: 40px;
  position: absolute;
  /* border-top: 1px solid #dce0e8; */
  /* margin-bottom:22px; */
  position: relative;
}
.fd-table-footer > div {
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  top: 0;
  color: #333;
  font-size: 14px;
}
.fd-footer-item1 {
  width: 156px;
  left: 0;
}
.fd-footer-item2 {
  left: 156px;
  right: 160px;
}
.fd-footer-item3 {
  width: 160px;
  right: 0;
}
</style>
<style scoped>
.fd-clause-main{
  border: 1px solid #dbe4ed;
  background-color: #fff;
}
.fd-model-panel {
  margin-bottom: 10px;
  border: 1px solid #dce0e8;
  border-radius: 3px;
}
.fd-home-wrap .main_box {
   height: calc(100% - 105px);
}
.main_box {
  position: relative;
}
.fd-clause-list {
  width: 445px;
  height: 100%;
  background: #f6f8fb;
  border: 1px solid #e7eef5;
  padding: 20px;
  /* float:left; */
}
.fd-clause-list .fd-add-flow {
  border-bottom: 1px solid #e7eef5;
}
.fd-clause-list .fd-btn-green {
  margin-right: 16px;
}
.fd-clause-add {
  /* padding-left:465px; */
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 485px;
  right: 20px;
  overflow: auto;
  /* overflow-y:scroll;
    overflow-x:hidden; */
}
.fd-form-panel {
  background: #f5f8fb;
  padding: 20px 20px 8px 0;
  overflow: hidden;
}
.fd-save-clause {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  margin: auto;
  width: 72px;
  font-size: 14px;
}
.tk-scroll{
  height:90% !important;
}
  .fd-scroll-box {
    width: 99%;
  }
</style>

