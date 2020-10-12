<template>
  <!-- 内容部分start -->
  <div class="main_area fd-home-wrap">
    <div class="main_name">
      <aty-breadcrumb can-click separator=">" :data="breadcrumbdata"></aty-breadcrumb>
    </div>
    <div class="main_box fd-rewrad-box">
      <div class="tabs_main_box">
        <div class="dr_edit_butn">
          <router-link :to="{path:'/rewardList'}">
            <aty-button class="dr_edit_b1" type="primary">
              <img src="../../assets/images/menu.png">
              奖励列表
            </aty-button>
          </router-link>
          <!-- 新增通知单操作按钮 start -->
          <div class="fd-operator-btns">
            <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.hy')" class="npl_botm_butn" type="primary"
                        @click="showHeyiModal">合议
            </aty-button>
            <!-- <aty-button   class="npl_botm_butn" type="primary">打印</aty-button> -->
            <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.dcjl')" class="npl_botm_butn" type="primary"
                        @click="exportJlList()">导出
            </aty-button>
            <aty-button v-show="checkButtonShow('jy.imp.jfkh.jl.xzjl')" class="npl_botm_butn" type="primary"
                        @click="submit">提交
            </aty-button>
          </div>
          <!-- 新增通知单操作按钮 end -->
        </div>
        <!-- table區域 start -->
        <div class="fd-scroll-box">
          <aty-scroll :speed="53" class="aty-scroll-3" ref="scroll" :show="false">
            <aty-table
              class="npl_table fd-addpoint-table"
              :pageable-data="tableData"
              style="width: 100%;" :exp-all="false" :exp-current-page="false">
              <aty-table-column type="index" label="序号" width="50" :showOverflowTooltip="false"></aty-table-column>
              <aty-table-column prop="xm" label="罪犯姓名">
                <!--<template slot-scope="props" >-->
                <!--&lt;!&ndash;<a :title="props.row.xm"  v-text="props.row.xm" :href = "zfxxUrl + props.row.zfxxBh"  target="_blank"></a>&ndash;&gt;-->
                <!--</template>-->
              </aty-table-column>
              <aty-table-column prop="zfBh" label="罪犯编号"></aty-table-column>
              <aty-table-column prop="ksrq" label="开始月份"></aty-table-column>
              <aty-table-column prop="jzrq" label="截止月份"></aty-table-column>
              <aty-table-column prop="sqyf" label="上期余分"></aty-table-column>
              <aty-table-column prop="bqjygzf" label="本期教育改造"></aty-table-column>
              <aty-table-column prop="bqldgzf" label="本期劳动改造"></aty-table-column>
              <aty-table-column prop="ljjf" label="累计积分"></aty-table-column>
              <aty-table-column prop="jllb" label="奖励类别" :formatter="jllxf">
                <template slot-scope="scope" v-if="jllbDataList.length">
                  <select class="npl_seleted fd-khyj-select" v-model="scope.row.jllb"
                          @change="changeItem(scope,'jllb')">
                    <option v-for="option in jllbDataList" v-bind:value="option.code">{{ option.name }}</option>
                  </select>
                </template>
              </aty-table-column>
              <aty-table-column prop="bqyf" label="本期余分"></aty-table-column>
              <aty-table-column prop="bz"  label="备注">
                <template slot-scope="scope">
                  <p class="search_option_text" v-if="scope.row.sfytjxd == false" >{{scope.row.bz}}</p>
                </template>
              </aty-table-column>
            </aty-table>
          </aty-scroll>
        </div>
        <!-- table區域 end -->
      </div>
    </div>
    <!-- 合议记录start -->
    <aty-modal :mask-closable="false" class="rl_pop_box jl-Modal" closable="" ref="heyiWindow" width="650" title="合议">
      <div class="pop_main_box">
        <aty-form :label-width="110" :data="heyiFormData" ref="form">
          <aty-row>
            <aty-col span="12">
              <aty-form-item label="合议时间">
                <aty-date-picker v-model="heyiFormData.hysj" format="yyyy-MM-dd" :options="options" show-time=""
                                 clearable></aty-date-picker>
              </aty-form-item>
            </aty-col>
            <aty-col span="12">
              <aty-input label="地点" v-model="heyiFormData.hydd" clearable></aty-input>
            </aty-col>
          </aty-row>
          <aty-row>
            <aty-col span="12">
              <aty-select transfer class="aty-form-item-required" label="主持人" :data="zcrList"
                          v-model="heyiFormData.zcr" clearable></aty-select>
            </aty-col>
            <aty-col span="12">
              <aty-select transfer class="aty-form-item-required" label="记录人" :data="jlrList"
                          v-model="heyiFormData.jlr" clearable></aty-select>
            </aty-col>
          </aty-row>
          <aty-textarea label="备注" v-model="heyiFormData.bz"></aty-textarea>
          <aty-select transfer class="aty-form-item-required more_select_delete" label="计分考核民警"
                      @change="showQxry" :data="jfkhmjList" multiple v-model="heyiFormData.jfkhxzmj" clearable>
          </aty-select>
          <aty-select transfer class="aty-form-item-required more_select_delete" label="参加人员" :data="cjryList"
                      @change="showQxry" multiple v-model="heyiFormData.cjry" clearable>
          </aty-select>
          <aty-row v-if="isShowQxry">
            <aty-col span="4">
              <aty-text :text="'缺席人员'" class="hy-fond-size"></aty-text>
            </aty-col>
            <aty-col span="20">
              <aty-table :pageable-data="heyiFormData.qxTableData" height="150" border>
                <aty-table-column v-if="false" prop="qxry" width="70px" label="缺席人员"></aty-table-column>
                <aty-table-column prop="qxryXm" width="190px" label="姓名"></aty-table-column>
                <aty-table-column prop="qxyy" label="缺席原因">
                  <template slot-scope="scope">
                    <input class="hy_table_input" v-model="scope.row.qxyy"/>
                  </template>
                </aty-table-column>
              </aty-table>
            </aty-col>
          </aty-row>
          <aty-row class="fd-btns-hy">
            <aty-col span="20">
              <aty-text :text="'注：本系统生成的合议记录仅是一个草稿，如行文不通请导出后进行修改'" class="z-fond-size"/>
            </aty-col>
          </aty-row>
          <aty-form-item class="fd-btns-hy">
            <aty-button class="fd-btn-blue fd-save-clause" text="保存并导出" @click="saveExport()"></aty-button>
          </aty-form-item>
        </aty-form>
      </div>
    </aty-modal>
    <aty-modal title="提交" footer-hide closable="" ref="yxbSpModal" width="500" :mask-closable="false"
               class="xybsp-modal">
      <aty-select v-model="spr" :data="xybsprList" label="下一步审批人" clearable></aty-select>
      <aty-button class="search_option_butn1" type="primary" @click.native="tjSubmit">
        <span>提交</span>
      </aty-button>
    </aty-modal>
    <!--备注弹窗start-->
    <aty-modal title="修改原因" footer-hide closable="" ref="beizhuWindow" width="650" :mask-closable="false"
               class="pop_main_box" @on-cancel="checkHasCriminal">
      <aty-textarea v-model="bz" placeholder="请输入修改原因" clearable></aty-textarea>
      <div class="drw_save_butn">
        <aty-button class="search_option_butn1" type="primary" @click.native="add(true)"><span>确定</span></aty-button>
        <aty-button class="search_option_butn2" type="default" @click.native="close"><span>取消</span></aty-button>
      </div>
    </aty-modal>
    <!--合议记录end -->
    <loading :isLoading="isLoading"></loading>
  </div>
  <!-- 内容部分end -->
</template>

<script>
  import loading from '../base/loading'

  export default {
    components: {
      loading: loading
    },
    data: function () {
      return {
        ryMap: {},//合议人员的编码与姓名对应关系
        isShowQxry: false,//是否展示缺席人员
        breadcrumbdata: [
          {
            name: '奖励',
            href: "/rewardList"
          },
          {
            name: '新增奖励',
            href: '/newReward'
          }
        ],
        tableData: [],
        heyiFormData: {
          bh: '',
          hysj: '',
          hydd: '',
          zcr: '',
          jlr: '',
          jfkhxzmj: [],
          cjry: [],
          hynr: '',
          bz: '',
          bhList: [],
          jfkhMjCzlx: '',
          qxTableData: []
        },
        spr: '',
        zfxxUrl: _zfxxDetail.url,
        xybsprList: [],
        //提交审批table数据
        spvoData: [],
        //业务id
        taskid: [],
        //主持人
        zcrList: [],
        //计分考核民警
        jfkhmjList: [],
        jlrList: [],
        //参加人员
        cjryList: [],
        options: {
          disabledDate: function (date) {
            return date && date.valueOf() >= Date.now();
          }
        },
        isHeyiSaved: false,
        isJlListExported: false,
        isLoading: false,
        canClick: true,
        //奖励推荐备注
        bz:"",
        tableD:[],
        jllbDataList: [
          {
            code: "1",
            name: "表扬"
          },
          {
            code: "2",
            name: "物质奖励"
          }
        ],
      }
    },
    created() {
      //检查是否有达到600分的罪犯，自动带入
      this.checkHasCriminal()
    },
    watch: {
      jfkhxzmj(newValue, oldValue) {
        var _this = this;
        var cjry = _this.heyiFormData.cjry;
        var union = newValue.concat(cjry).uniquelize();
        var minus = [];
        union.forEach(function (o) {
          if (!newValue.contains(o)) {
            minus.push(o);
          }
        });
        if (minus.length == 0) {
          return;
        }
        for (var i = 0; i < _this.heyiFormData.cjry.length; i++) {
          if (minus.contains(_this.heyiFormData.cjry[i])) {
            _this.heyiFormData.cjry.splice(i, 1);
            i--;
          }
        }
      },
      tableData(val, oldVal) {
        this.$nextTick(function () {
          this.$refs.scroll.update()
        })
      }
    },
    computed: {
      jfkhxzmj() {
        return this.heyiFormData.jfkhxzmj;
      },
    },
    methods: {
      /**
       * 改变下拉值
       * @param
       */
      changeItem(item,type) {
        var _this = this;
        var params = {
          bh: item.row.bh,
        };
        _this.tableD=item.row;
        switch (type) {
          case "jllb": {
            _this.$set(params,"jllb",item.row.jllb);
            break;
          }
        }
        if(item.row.sfytjxd){
          this.$refs.beizhuWindow.open();
        }else {
          _this.bz = "";
          _this.add(false);
        }
      },
      /**
       * 关闭备注弹窗
       */
      close(){
        this.$refs.beizhuWindow.close()
      },
      /**
       * 新增奖励保存
       */
      add(flag) {
        var _this = this;
        if(flag && !_this.bz) {
          Artery.message.error("请填写修改原因!");
          return;
        }
        if(_this.tableD){
          let params = _this.tableD;
          params.bz = _this.bz;
          _this.isLoading = true;
          _this.postRequest("/api/v1/jl/preserveJl", params).then(resp => {
            if (resp && resp.status == 200) {
              _this.bz = '';
              this.checkHasCriminal();
              this.$refs.beizhuWindow.close();
            }
          });
        }else{
          Artery.message.info("列表为空,无法提交！");
        }
        _this.isLoading = false;
      },
      /**
       * @name 是否显示缺席人员
       */
      showQxry() {
        var _this = this;
        var list = [];
        var jfkhmjList = _this.heyiFormData.jfkhxzmj;
        var cjryList = _this.heyiFormData.cjry;
        jfkhmjList.forEach(function (item) {
          list[item] = item;
        });
        cjryList.forEach(function (item) {
          delete list[item];
        });
        list = Object.keys(list);
        var qxTableData = _this.heyiFormData.qxTableData;
        qxTableData.splice(0, qxTableData.length);
        if (list.length == 0) {
          _this.isShowQxry = false;
        } else {
          _this.isShowQxry = true;
          list.forEach(function (item) {
            var obj = {
              qxry: item,
              qxryXm: _this.ryMap[item],
              qxyy: ""
            }
            qxTableData.push(obj);
          });
        }
      },
      /**
       * 设置当前时间
       */
      setDate() {
        var myDate = new Date();
        //获取当前年月，设置时间下拉框默认选项
        let month = myDate.getMonth() + 1;
        let year = myDate.getFullYear();
        let day = myDate.getDate();
        month = month < 10 ? '0' + month : month
        day = day < 10 ? '0' + day : day
        this.heyiFormData.hysj = year + "-" + month + "-" + day;
      },
      /**
       * 导出新增奖励列表
       */
      exportJlList() {
        let _this = this;
        let cbny;
        var myDate = new Date();
        //获取当前年月，设置时间下拉框默认选项
        let month = myDate.getMonth();
        let year = myDate.getFullYear();
        if (month < 10) {
          cbny = year + "-" + "0" + (month);
        } else {
          cbny = year + "-" + (month);
        }
        //导出操作，操作完成回调中将状态置为true
        let url = _server.serverName + "/api/v1/jl/exportJl?cbny=" + cbny;
        window.location.href = url;
        _this.isJlListExported = true;
      },
      /**
       * 合议记录弹窗保存并导出操作
       */
      saveExport() {
        let _this = this;
        if (this.heyiFormData.zcr === '') {
          Artery.message.info({
            content: "【合议】主持人为必填",
            duration: 3
          });
          return false
        }
        if (this.heyiFormData.jlr === '') {
          Artery.message.info({
            content: "【合议】记录人为必填",
            duration: 3
          });
          return false
        }
        if (this.heyiFormData.jfkhxzmj === '') {
          Artery.message.info({
            content: "【合议】计分考核民警为必填",
            duration: 3
          });
          return false
        }
        if (this.heyiFormData.cjry === '') {
          Artery.message.info({
            content: "【合议】参加人员为必填",
            duration: 3
          });
          return false
        }
        for (var i = 0; i < _this.tableData.length; i++) {
          if (_this.tableData[i].bh != "") {
            _this.heyiFormData.bhList.push(_this.tableData[i].bh);
          }
        }
        let mjStrs = "";
        for (let i = 0; i < _this.heyiFormData.jfkhxzmj.length; i++) {
          // 处理计分考核小组民警值
          if (_this.heyiFormData.jfkhxzmj[i] != "") {
            mjStrs += _this.heyiFormData.jfkhxzmj[i] + ";";
          }
        }

        let cjryStrs = "";
        for (let i = 0; i < _this.heyiFormData.cjry.length; i++) {
          // 处理参加人员值
          if (_this.heyiFormData.cjry[i] != "") {
            cjryStrs += _this.heyiFormData.cjry[i] + ";";
          }
        }

        let params = {
          bh: this.heyiFormData.bh,
          hysj: this.heyiFormData.hysj,
          hydd: this.heyiFormData.hydd,
          zcc: this.heyiFormData.zcr,
          jlr: this.heyiFormData.jlr,
          jfkhxzmj: mjStrs,
          cjry: cjryStrs,
          bhList: _this.heyiFormData.bhList,
          bz: _this.heyiFormData.bz,
          qxryList: _this.heyiFormData.qxTableData
        };
        this.isLoading = true
        if (this.canClick) {
          this.canClick = false
          this.postRequest("/api/v1/hy/exportHyJl", params).then(resp => {
            if (resp && resp.status == 200) {
              //保存成功将状态置为true
              this.isHeyiSaved = true;
              Artery.message.info("导出成功！");
              _this.exportHyWs(resp.data.bh, resp.data.wsmc);
              this.$refs.heyiWindow.close()
              this.canClick = true
            }
            this.isLoading = false
          })
        }
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
       * 新增奖励提交
       */
      submit() {
        var _this = this;
        if (_this.tableData.length > 0) {
          let params = _this.tableData;
          _this.isLoading = true
          _this.postRequest("/api/v1/jl/beforeSubmitJl", params).then(resp => {
            if (resp && resp.status == 200) {
              _this.tableData = resp.data;
              _this.taskid = resp.data[0].taskid;
              var userInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
              var taskParams = {
                curTaskId: _this.taskid,
                spAuthority: "jy.imp.jfkh.splc.jlsp.",
                corpId: userInfo.corpId
              };
              _this.getRequest("/api/v1/system/getTaskNextSprs", taskParams).then(resp => {
                if (resp && resp.status == 200) {
                  _this.xybsprList = resp.data;
                  _this.$refs.yxbSpModal.open();
                  _this.isLoading = false
                }
              });
            }
          });
        } else {
          Artery.message.success("列表为空,无法提交！");
        }
      },
      /**
       * 显示合议弹窗
       */
      showHeyiModal() {
        this.$refs.heyiWindow.open()
        this.isHeyiSaved = false
        this.setDate()
        var _this = this
        _this.getRequest("/api/v1/system/getUser").then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data) {
              let userList = resp.data;
              _this.pieceHyry(userList);
            }
          }
        });
      }, /**
       * @name 拼装合议的人员信息
       * @param 查询出的人员列表
       */
      pieceHyry(userList) {
        var _this = this;
        _this.getRequest("/api/v1/system/getUser").then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data) {
              _this.zcrList = resp.data;
              _this.jlrList = resp.data;
              _this.jfkhmjList = resp.data;
              _this.cjryList = resp.data;
            }
          }
        });
        let selectedUserList = [];
        let cjry = [];
        for (var i = 0; i < userList.length; i++) {
          var code = userList[i].code;
          selectedUserList.push(code);
          cjry.push(code);
          _this.ryMap[code] = userList[i].name;
        }
        //计分考核民警
        _this.heyiFormData.jfkhxzmj = selectedUserList;
        //参加人员
        _this.heyiFormData.cjry = cjry;
        _this.showQxry();
      },

      /**
       * 下一步审批提交
       */
      tjSubmit() {
        let _this = this;
        if (this.spr === '') {
          Artery.message.info({
            content: "请选择下一步审批人",
            duration: 3
          });
          return false
        }
        //下一步审批请求接口
        for (let i = 0; i < _this.tableData.length; i++) {
          var zfxxBh = _this.tableData[i].zfxxBh;
          var taskId = _this.tableData[0].taskid;
          var bh = _this.tableData[i].bh;
          var zfxm = _this.tableData[i].xm;
          var jllb = _this.tableData[i].jllb;
          var ob = {
            bh: bh,
            zfxxBh: zfxxBh,
            taskId: taskId,
            spr: _this.spr,
            zfxm: zfxm,
            jllb: jllb
          };
          _this.spvoData.push(ob);
        }
        var params = _this.spvoData;
        _this.isLoading = true
        _this.postRequest("/api/v1/jl/submitJl", params).then(resp => {
          if (resp && resp.status == 200) {
            Artery.message.success("提交成功！");
            _this.isLoading = false
            _this.$refs.yxbSpModal.close();
            this.$router.push({path: "/rewardList"});
          } else {
            _this.$refs.yxbSpModal.close();
            Artery.message.error({
              content: "提交失败！",
              duration: 3
            });

          }
        })
      },
      //查看罪犯详细信息
      goZfxx(item) {
        let bh = item.row.zfxxBh;
        let url = "http://172.25.16.102:8080/zfda/?" + bh;
        window.open(url);
      },
      //查询可评定奖励罪犯
      checkHasCriminal() {
        //查询满600分罪犯接口
        this.isLoading = true
        this.getRequest("/api/v1/jl/getJl").then(resp => {
          if (resp && resp.status == 200) {
            if (resp.data.ArrayList) {
              this.tableData = resp.data.ArrayList;
              this.$nextTick(function () {
                this.$refs.scroll.update()
              })
            } else {
              this.tableData = [];
              Artery.message.info({
                content: "没有达到600分的罪犯!",
                duration: 3
              });
            }
          }
          this.isLoading = false
        });
      },
      //奖励类别转义
      jllxf: function (row, column) {
        if (row === "1") {
          return "表扬";
        }
        if (row === "2") {
          return "物质奖励";
        }
      }
    }
  };
</script>
<style scoped>
  .fd-rewrad-box .tabs_main_box {
    height: 100%;
  }

  .fd-scroll-box {
    height: calc(100% - 50px);
    margin-top: 20px;
  }

  .fd-scroll-box .aty-scroll {
    height: 100%;
  }

  .fd-operator-btns {
    float: right;
    margin: 0 auto;
  }

  .fd-khyj-select .aty-select-dropdown-list {
    float: left;
  }

  .dr_edit_b1 {
    height: 30px;
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    background-color: #00ccbb;
    border-color: #00ccbb;
    margin-right: 12px;
  }

  .dr_edit_b1 * {
    vertical-align: middle;
  }

  .dr_edit_b1:hover {
    background-color: #0fdbca;
    border-color: #0fdbca;
  }

  .table_butn {
    margin: 0 4px;
    cursor: pointer;
  }

  .npl_table_input {
    width: 100%;
    height: 30px;
    border: 1px solid #dddee1;
    border-radius: 3px;
    color: #333;
  }

  .fd-addpoint-table .npl_table_input {
    padding: 0 10px;
    font-size: 12px;
  }

  .npl_upload, .npl_botm_butn {
    display: inline-block;
    /* margin-top: 20px; */
    margin-right: 5px;
    vertical-align: middle;
  }

  .pop_main_box {
    padding: 20px 20px;
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    overflow: hidden;
  }
  .npl_seleted{
    min-height: 30px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dddee1;
    width: 100%;
    color: #657180;
    font-size: 12px;
  }
</style>
