<template>
  <div>
        <div class="jf_nav">
            <ul ref="ulList" class="jf_nav_box">
              <li class="fd-menu-item" style="width:115px;line-height:44px;">
                <span class="fd-all-function" @click="showQbgn" @mouseover="showQbgn">全部功能</span>
                <ul class="fd-submenu"  v-if="this.qbgnShow">
                  <li class="fd-submenu-item arrow" v-if="allFunction.rjzShow"  :class="$route.path.indexOf('/dayRecord') != -1 ? 'active_nav':''">
                    <router-link :to="{path:''}">日记载</router-link>
                    <ul class='fd-submenu-thirdmenu' >
                      <li class="item1" v-if="rjzdjShow" @click.stop="qbgnClick">
                        <router-link :to="{path:'/dayRecord/addDayRecord'}">日记载登记</router-link>
                      </li>
                      <li class="item2" v-if="rjzlbShow" @click.stop="qbgnClick">
                        <router-link :to="{path:'/dayRecord'}">日记载列表</router-link>
                      </li>
                      <li v-if="rjzhzShow" class="item3" @click.stop="qbgnClick">
                        <router-link :to="{path:'/dayRecord/dayRecordSum'}">日记载汇总</router-link>
                      </li>
                      <li v-if="wldderjzShow" class="item4" @click.stop="qbgnClick">
                        <router-link :to="{path:'/dayRecord/dayRecordWork'}">无劳动定额罪犯日记载</router-link>
                      </li>
                    </ul>
                  </li>
                  <li v-if="allFunction.zpyShow" :class="$route.path == '/weekDiscussion' ? 'active_nav':''" style="padding-left: 15px;" @click.stop="qbgnClick">
                    <router-link :to="{path:'/weekDiscussion'}">周评议</router-link>
                  </li>
                  <li style="padding-left: 15px;" v-if="allFunction.ygsShow" :class="$route.path.indexOf('/monthPublicity') != -1 ? 'active_nav':''" @click="monthPublicity" @click.stop="qbgnClick">月公示</li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.jlShow" :class="($route.path == '/rewardList' ? 'active_nav':'') || ($route.path == '/rewardDetails' ? 'active_nav':'') || ($route.path == '/rewardPeopleDetails' ? 'active_nav':'') || ($route.path == '/newReward' ? 'active_nav':'')">
                    <router-link :to="{path:'/rewardList'}">奖励</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.bjShow" :class="$route.name == 'record'|| $route.name =='addRecord' || $route.name =='addRecordList' || $route.name =='addRecordDetail' ? 'active_nav':''">
                    <router-link :to="{path:'/record/addRecordList'}">补记</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.fcfhShow" :class="$route.path.indexOf('/reviewCheck') != -1 ? 'active_nav':''">
                    <router-link :to="{path:'/reviewCheckList'}">复查复核</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.jkftzdShow" :class="($route.path == '/addPointList' ? 'active_nav':'') || ($route.path == '/newPointList' ? 'active_nav':'')">
                    <router-link :to="{path:'/addPointList'}">加扣分通知单</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.tkwhShow" :class="$route.path == '/clause' ? 'active_nav':''">
                    <router-link :to="{path:'/clause'}">条款维护</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.jyfxblShow" :class="$route.path == '/educationScale' ? 'active_nav':''">
                    <router-link :to="{path:'/educationScale'}">教育分项比例设定</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.jfkhhzShow" :class="$route.path == '/summary' ? 'active_nav':''">
                    <router-link :to="{path:'/summary'}">计分考核概况汇总表</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.lssjdrShow" :class="$route.path == '/addHistoryData' ? 'active_nav':''">
                    <router-link :to="{path:'/addHistoryData'}">历史数据导入</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.zfxxwhShow" :class="$route.path == '/criminalInfo' ? 'active_nav':''">
                    <router-link :to="{path:'/criminalInfo'}">罪犯信息维护</router-link>
                  </li>
                  <li style="padding-left: 15px;" @click.stop="qbgnClick" v-if="allFunction.gzpjShow" :class="$route.path == '/workEvaluation' ? 'active_nav':''">
                    <router-link :to="{path:'/workEvaluation'}">工作评价</router-link>
                  </li>
                </ul>
              </li>
              <li :class="$route.path == '/' ? 'active_nav':''">
                  <router-link :to="{path:'/'}">首页</router-link>
              </li>
              <li v-if="rjzShow" @click.stop='navShow'  :class="$route.path.indexOf('/dayRecord') != -1 ? 'active_nav':''">
                  <router-link :to="{path:''}">日记载</router-link>
                  <ul class='secondNav' v-if="this.show" id="dayRecordNav">
                    <li class="item1" v-if="rjzdjShow" @click.stop="rjzSecondCdClick">
                      <router-link :to="{path:'/dayRecord/addDayRecord'}">日记载登记</router-link>
                    </li>
                    <li class="item2" v-if="rjzlbShow" @click.stop="rjzSecondCdClick">
                        <router-link :to="{path:'/dayRecord'}">日记载列表</router-link>
                    </li>
                    <li v-if="rjzhzShow" class="item3" @click.stop="rjzSecondCdClick">
                        <router-link :to="{path:'/dayRecord/dayRecordSum'}">日记载汇总</router-link>
                    </li>
                    <li v-if="wldderjzShow" class="item4" @click.stop="rjzSecondCdClick">
                        <router-link :to="{path:'/dayRecord/dayRecordWork'}">无劳动定额罪犯日记载</router-link>
                    </li>
                  </ul>
              </li>
              <li v-if="zpyShow" :class="$route.path == '/weekDiscussion' ? 'active_nav':''">
                    <router-link :to="{path:'/weekDiscussion'}">周评议</router-link>
              </li>
              <li v-if="ygsShow" :class="$route.path.indexOf('/monthPublicity') != -1 ? 'active_nav':''" @click="monthPublicity">月公示</li>
              <li v-if="jlShow" :class="($route.path == '/rewardList' ? 'active_nav':'') || ($route.path == '/rewardDetails' ? 'active_nav':'') || ($route.path == '/rewardPeopleDetails' ? 'active_nav':'') || ($route.path == '/newReward' ? 'active_nav':'')">
                    <router-link :to="{path:'/rewardList'}">奖励</router-link>
              </li>
               <li v-if="bjShow" :class="$route.name == 'record'|| $route.name =='addRecord' || $route.name =='addRecordList' || $route.name =='addRecordDetail' ? 'active_nav':''">
                    <router-link :to="{path:'/record/addRecordList'}">补记</router-link>
              </li>
              <li v-if="fcfhShow" :class="$route.path.indexOf('/reviewCheck') != -1 ? 'active_nav':''">
                  <router-link :to="{path:'/reviewCheckList'}">复查复核</router-link>
              </li>
              <li v-if="jkftzdShow" :class="($route.path == '/addPointList' ? 'active_nav':'') || ($route.path == '/newPointList' ? 'active_nav':'')">
                  <router-link :to="{path:'/addPointList'}">加扣分通知单</router-link>
              </li>
              <li v-if="tkwhShow" :class="$route.path == '/clause' ? 'active_nav':''">
                    <router-link :to="{path:'/clause'}">条款维护</router-link>
              </li>
              <li v-if="jyfxblShow" :class="$route.path == '/educationScale' ? 'active_nav':''">
                  <router-link :to="{path:'/educationScale'}">教育分项比例设定</router-link>
              </li>
              <li v-if="jfkhhzShow" :class="$route.path == '/summary' ? 'active_nav':''">
                  <router-link :to="{path:'/summary'}">计分考核概况汇总表</router-link>
              </li>
              <li v-if="lssjdrShow" :class="$route.path == '/addHistoryData' ? 'active_nav':''">
                  <router-link :to="{path:'/addHistoryData'}">历史数据导入</router-link>
              </li>
              <li v-if="zfxxwhShow" :class="$route.path == '/criminalInfo' ? 'active_nav':''">
                  <router-link :to="{path:'/criminalInfo'}">罪犯信息维护</router-link>
              </li>
              <li v-if="gzpjShow" :class="$route.path == '/workEvaluation' ? 'active_nav':''">
                  <router-link :to="{path:'/workEvaluation'}">工作评价</router-link>
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      ulList: "",
      show: false,
      qbgnShow: true,
      curUser: "",
      rjzShow: false,
      zpyShow: false,
      ygsShow: false,
      bjShow: false,
      fcfhShow: false,
      jkftzdShow: false,
      tkwhShow: false,
      lssjdrShow: false,
      zfxxwhShow: false,
      gzpjShow: false,
      rjzhzShow: false,
      wldderjzShow: false,
      rjzdjShow: false,
      rjzlbShow: false,
      jlShow: false,
      jfkhhzShow: false,
      jyfxblShow: false,
      allFunction: {
        rjzShow: false,
        zpyShow: false,
        ygsShow: false,
        bjShow: false,
        fcfhShow: false,
        jkftzdShow: false,
        tkwhShow: false,
        lssjdrShow: false,
        zfxxwhShow: false,
        gzpjShow: false,
        jlShow: false,
        jfkhhzShow: false,
        jyfxblShow: false
      },
      right: {
        qdkhmd: false,
        jygzf: false,
        ldgzf: false,
        ycs: false,
        yhz: false,
        py: false,
        wc: false
      },
      isPy: false,
      userXb: "default",
      menuNumLimit: 11,
      screenWidth: document.body.clientWidth // 屏幕尺寸
    };
  },
  created() {
    this.changeMenuNumLimit();
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth;
        this.changeMenuNumLimit();
        this.qbgn();
      })()
    }
    this.getCurUser();
    let _this = this;
    document.addEventListener("click", function(e) {
      _this.navHide();
    });
  },
  methods: {
    queryYpy() {
      var _this = this;
      var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var params = {
        corp: curUserInfo.corpId,
        dept: curUserInfo.deptId,
        khny: this.formatLastMonth(new Date()) // 月公示年月。String类型 必须
      };
      _this.getRequest(_this.apis.api0124, params).then(resp => {
        if (resp && resp.status == 200) {
          _this.isPy = resp.data.Boolean;
        }
      });
    },
    /**
     * 月公示跳转控制
     */
    monthPublicity() {
      var _this = this;
      var curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      var params = {
        corp: curUserInfo.corpId,
        dept: curUserInfo.deptId,
        khny: this.formatLastMonth(new Date()) // 月公示年月。String类型 必须
      };
      _this.queryYpy();
      _this.postRequest(_this.apis.api0011, params).then(resp => {
        if (resp && resp.status == 200) {
          var path = "";
          if (resp.data == ""&&curUserInfo.sfgyzf) {
            path = "/monthPublicity/evaluateList";
            Artery.message.info({
              content: "未获取到当月流程",
              duration: 3
            });
          }
          if (curUserInfo.sfgyzf) {
            if (resp.data.sfqdkhmd == "2" && _this.right.qdkhmd) {
              path = "/monthPublicity/evaluateList";
            }
            if (
              resp.data.sfqdkhmd == "1" &&
              resp.data.sfzzjyjcf == "2" &&
              _this.right.jygzf
            ) {
              path = "/monthPublicity/educationScore";
            }
            if (
              resp.data.sfzzjyjcf == "1" &&
              resp.data.sfwcldjcfsp == "2" &&
              _this.right.ldgzf
            ) {
              path = "/monthPublicity/laborScore";
            }
            if (
              resp.data.sfwcldjcfsp == "1" &&
              resp.data.sfwcycs == "2" &&
              _this.right.ycs
            ) {
              path = "/monthPublicity/monthFirstInstance";
            }
            if (
              resp.data.sfwcycs == "1" &&
              resp.data.sfwcyhz == "2" &&
              _this.right.yhz
            ) {
              path = "/monthPublicity/monthCollection";
            }
            if (
              resp.data.sfwcyhz == "1" &&
              resp.data.sfwcpy == "2" &&
              _this.right.py
            ) {
              path = "/monthPublicity/conference";
            }
            if (resp.data.sfwcpy == "1" && _this.right.wc) {
              path = "/monthPublicity/over";
            }
          } else {
            if (_this.right.wc) {
              path = "/monthPublicity/over";
            }
            if (_this.right.py) {
              path = "/monthPublicity/conference";
            }
          }
          _this.$router.push({ path: path });
        } else {
        }
      });
    },
    /**
     * 日记载二级菜单点击收起
     */
    rjzSecondCdClick() {
      let _this = this;
      _this.navHide();
    },
    /**
     * 全部功能点击收起
     */
    qbgnClick() {
      let _this = this;
      _this.qbgnShow = false;
    },
    getUserPic() {
      let curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if (curUserInfo != null) {
        let xb = curUserInfo.xb;
        if (xb === "1") {
          this.userXb = "1";
        }
        if (xb === "2") {
          this.userXb = "2";
        }
      }
    },
    getCurUser() {
      let _this = this;
      let curUserInfo = JSON.parse(localStorage.getItem(_jfkh.curUserInfo));
      if (curUserInfo != null) {
        let rightList = curUserInfo.userRightList;
        _this.rjzShow = _this.checkLinkShow("jy.imp.jfkh.rjz.rjzcd", rightList);
        _this.zpyShow = _this.checkLinkShow("jy.imp.jfkh.zpy.zpycd", rightList);
        _this.ygsShow = _this.checkLinkShow("jy.imp.jfkh.ygs.ygscd", rightList);
        _this.bjShow = _this.checkLinkShow("jy.imp.jfkh.bj.bjcd", rightList);
        _this.jlShow = _this.checkLinkShow("jy.imp.jfkh.jl.jlcd", rightList);
        _this.fcfhShow = _this.checkLinkShow(
          "jy.imp.jfkh.fcfh.fcfhcd",
          rightList
        );
        _this.jkftzdShow = _this.checkLinkShow(
          "jy.imp.jfkh.jkftzd.jkftzdcd",
          rightList
        );
        _this.tkwhShow = _this.checkLinkShow(
          "jy.imp.jfkh.tkwh.tkwhcd",
          rightList
        );
        _this.jfkhhzShow = _this.checkLinkShow(
          "jy.imp.jfkh.jfkhgkhzb",
          rightList
        );
        _this.jyfxblShow = _this.checkLinkShow(
          "jy.imp.jfkh.jyblfxsd",
          rightList
        );
        _this.lssjdrShow = _this.checkLinkShow("jy.imp.jfkh.lssjdr", rightList);
        _this.zfxxwhShow = _this.checkLinkShow("jy.imp.jfkh.zfxxwh", rightList);
        _this.gzpjShow = _this.checkLinkShow("jy.imp.jfkh.gzpj", rightList);
        _this.rjzhzShow = _this.checkLinkShow(
          "jy.imp.jfkh.rjz.rjzhz",
          rightList
        );
        _this.wldderjzShow = _this.checkLinkShow(
          "jy.imp.jfkh.rjz.wlddezfrjz",
          rightList
        );
        _this.rjzdjShow = _this.checkLinkShow("jy.imp.jfkh.rjz.xz", rightList);
        _this.rjzlbShow = _this.checkLinkShow(
          "jy.imp.jfkh.rjz.rjzlbcd",
          rightList
        );
        _this.right.qdkhmd = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.qdkhmd",
          rightList
        );
        _this.right.jygzf = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.jygzf",
          rightList
        );
        _this.right.ldgzf = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.ldgzf",
          rightList
        );
        _this.right.ycs = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.ycs",
          rightList
        );
        _this.right.yhz = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.yhz",
          rightList
        );
        _this.right.py = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.py",
          rightList
        );
        _this.right.wc = _this.checkLinkShow(
          "jy.imp.jfkh.ygs.ygslc.wc",
          rightList
        );
      }
      _this.qbgn();
    },
    //功能菜单个数判断
    qbgn() {
      var index = 0;
      let _this = this;
      if (_this.rjzShow) {
        _this.allFunction.rjzShow = true;
        index = index + 1;
      }
      if (_this.ygsShow) {
        _this.allFunction.ygsShow = true;
        index = index + 1;
      }
      if (_this.zpyShow) {
        _this.allFunction.zpyShow = true;
        index = index + 1;
      }
      if (_this.jlShow) {
        _this.allFunction.jlShow = true;
        index = index + 1;
      }
      if (_this.bjShow) {
        _this.allFunction.bjShow = true;
        index = index + 1;
      }
      if (_this.fcfhShow) {
        _this.allFunction.fcfhShow = true;
        index = index + 1;
      }
      if (_this.jkftzdShow) {
        _this.allFunction.jkftzdShow = true;
        index = index + 1;
      }
      if (_this.tkwhShow) {
        _this.allFunction.tkwhShow = true;
        index = index + 1;
      }
      if (_this.jyfxblShow) {
        _this.allFunction.jyfxblShow = true;
        index = index + 1;
        if (index > this.menuNumLimit) {
          _this.jyfxblShow = false;
        }
      }
      if (_this.jfkhhzShow) {
        _this.allFunction.jfkhhzShow = true;
        index = index + 1;
        if (index > this.menuNumLimit) {
          _this.jfkhhzShow = false;
        }
      }
      if (_this.lssjdrShow) {
        _this.allFunction.lssjdrShow = true;
        index = index + 1;
        if (index > this.menuNumLimit) {
          _this.lssjdrShow = false;
        }
      }
      if (_this.zfxxwhShow) {
        _this.allFunction.zfxxwhShow = true;
        index = index + 1;
        if (index > this.menuNumLimit) {
          _this.zfxxwhShow = false;
        }
      }
      if (_this.gzpjShow) {
        _this.allFunction.gzpjShow = true;
        index = index + 1;
        if (index > this.menuNumLimit) {
          _this.gzpjShow = false;
        }
      }
    },
    changeMenuNumLimit(){
      if(this.screenWidth){
        if(this.screenWidth > 1440){
            this.menuNumLimit = 10;
        } else if(this.screenWidth > 1366 && this.screenWidth <= 1440){
            this.menuNumLimit = 9;
        } else if(this.screenWidth <= 1366){
            this.menuNumLimit = 8;
        }
      }
    },
    navShow() {
      this.show = true;
    },
    navHide() {
      this.show = false;
    },
    showQbgn() {
      this.qbgnShow = true;
    },
    navClick(idx) {}
    // checkLinkShow(rightKey, rightList) {
    //   if ($.inArray(rightKey, rightList) != -1) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  }
};
</script>
<style>
/* 头部样式 */
.top_bg {
  width: 100%;
  height: 492px;
  background: url(../../assets/images/w-jpg2.jpg) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}
.jf_top {
  width: 100%;
  height: 61px;
  position: relative;
  border-bottom: 1px solid #3290ef;
  line-height: 61px;
}
.jf_top .jf_logo {
  display: block;
  width: 39px;
  height: 38px;
  float: left;
  margin-left: 20px;
  margin-top: 10px;
}
.jf_top .jf_logo_text {
  font-size: 24px;
  color: #fff;
  float: left;
  margin-left: 11px;
}
.jf_top .jf_head_icon {
  float: right;
}
.jf_top .jf_head_icon li {
  float: left;
  margin-right: 20px;
  cursor: pointer;
}
.jf_nav_box {
  padding: 0 20px;
}
.jf_nav .jf_nav_box > li:first-child {
  padding: 0 5px;
}
.jf_top .jf_head_name {
  float: right;
  margin-right: 20px;
  color: #fff;
}

.jf_top .jf_head_right {
  float: right;
}

.jf_top .jf_head_pic {
  border-radius: 100%;
  margin-right: 20px;
}

/* 导航样式 */
.jf_nav {
  position: relative;
  width: 100%;
  height: 47px;
  /* border-bottom: 1px solid #3290ef; */
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  line-height: 47px;
}
.jf_nav > ul {
  height: 47px;
}
.jf_nav > .jf_nav_box > li {
  float: left;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  padding: 0 28px;
  cursor: pointer;
}
.jf_nav > .jf_nav_box > li > a {
  color: #fff;
  display: block;
}
.jf_nav > .jf_nav_box > .active_nav {
  background: url(../../assets/images/w-png6.png) repeat-x;
}
/* .jf_nav .jf_nav_box li:hover{
    background: url(../../images/w-png6.png) repeat-x;
} */
.secondNav {
  position: absolute;
  z-index: 10;
  background-color: #2291f9;
  box-shadow: 3px 0 7px rgba(2, 45, 80, 0.15);
  margin-left: -65px;
  color: #fff;
  /* padding: 5px 0; */
  /* border-top:3px solid #fde121;
  top:44px; */
}
.secondNav > li {
  /* float: left; */
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  line-height: 43px;
}
.secondNav > li a {
  margin: 0 15px;
  padding: 8px 0;
  height: 43px;
  border-bottom: 1px solid #42a2fc;
}
.secondNav > li:hover {
  background: #65b2fb;
  color: #fff;
}
/* .secondNav > li.item1{
  background:url("../../assets/images/item1.png") no-repeat 8px center;
}
.secondNav > li.item2{
  background:url("../../assets/images/item2.png") no-repeat 8px center;
}
.secondNav > li.item3{
  background:url("../../assets/images/item3.png") no-repeat 8px center;
}
.secondNav > li.item4{
  background:url("../../assets/images/item4.png") no-repeat 8px center;
} */
.secondNav > li a:hover {
  color: #fff;
}
.secondNav a {
  color: #fff;
  cursor: pointer;
  display: block;
  height: 28px;
  line-height: 28px;
}
.secondNav a:hover:before {
  background: #fff;
}
.fd-menu {
  float: left;
  height: 50px;
  line-height: 50px;
}
.fd-menu .fd-menu-item {
  position: relative;
  color: #fff;
  min-width: 120px;
  font-size: 16px;
  text-align: center;
  margin: 0 10px;
  height: 50px;
}
.fd-menu-item:hover {
  cursor: pointer;
  border-bottom: solid 3px #fade21;
  background: linear-gradient(
    -85deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.2)
  );
  background: -webkit-linear-gradient(
    -85deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.2)
  );
}
.fd-menu-item:hover .fd-submenu {
  display: block;
}
.fd-submenu {
  position: absolute;
  top: 48px;
  left: 20px;
  width: 10%;
  display: none;
  z-index: 99;
  background: #055ecd;
  font-size: 14px;
  min-width: 192px;
}
.fd-submenu .fd-submenu-item {
  padding: 8px 0px;
  text-align: center;
  line-height: 25px;
  background-size: 15px 15px;
}
.fd-submenu .fd-submenu-item.arrow {
  text-align: left;
  background: url(../../assets/images/arrow.png) no-repeat 165px center;
  padding-right: 15px;
  text-indent: 15px;
}
.fd-submenu-item:hover {
  color: #fade21;
}
.fd-submenu-item:hover .fd-submenu-thirdmenu {
  display: block;
}
.fd-submenu-thirdmenu {
  position: absolute;
  width: 200px;
  top: 0;
  left: 68px;
  margin-left: 124px;
  display: none;
  background: #2291f9;
  z-index: 99;
}
.fd-submenu-thirdmenu li{
  padding: 5px 0;
}
.fd-fourthmenu {
  position: absolute;
  z-index: 99;
  width: 180px;
  min-height: 100%;
  top: 0;
  left: 36px;
  margin-left: 164px;
  display: none;
  background: #e6f3ff;
}
.fd-fourthmenu .fd-fourthmenu-item {
  color: #333;
  padding: 8px 0;
}
.fd-submenu-thirdmenu-item:hover .fd-fourthmenu {
  display: block;
}
.fd-submenu-thirdmenu .fd-submenu-thirdmenu-item {
  padding: 8px 0;
  color: #fff;
  text-align: center;
}
.fd-submenu-thirdmenu .fd-submenu-thirdmenu-item.arrow {
  background: url(../../assets/images/arrow.png) no-repeat 175px center;
}
.fd-fourthmenu .fd-fourthmenu-item:hover {
  color: #2291f9;
  background: rgba(101, 178, 251, 0.3);
}
.fd-submenu-thirdmenu .fd-submenu-thirdmenu-item.arrow:hover {
  background: rgba(101, 178, 251, 0.3) url(../../assets/images/arrow.png) no-repeat
    175px center;
}
.fd-submenu-thirdmenu .fd-submenu-thirdmenu-item:hover {
  background: rgba(101, 178, 251, 0.3);
}
.fd-view-container {
  width: 100%;
  padding: 0px 20px 20px;
}

.fd-nav-container {
  width: 100%;
  height: 50px;
  line-height: 46px;
  border-bottom: solid 1px rgba(255, 255, 255, 0.5);
}

.fd-all-function {
  position: relative;
  top: 2px;
  color: #fff;
  padding-left: 20px;
  font-size: 16px;
  cursor: pointer;
}

.aty-menu-light {
  background: none;
}

.aty-menu {
  /* float: left; */
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
}

.aty-menu-horizontal .aty-menu-item,
.aty-menu-horizontal .aty-menu-submenu {
  padding: 0 30px;
  border: 0;
  color: #fff;
  font-size: 16px;
  border: 0;
}
.settings .aty-select-dropdown {
  left: 100px;
}

.fd-nav-container .aty-menu-item,
.fd-nav-container .aty-menu-submenu {
  border: 0;
  color: #fff;
  font-size: 16px;
  border: 0;
}

.fd-nav-container .aty-select-dropdown {
  padding: 0;
  border-radius: 0;
}

.fd-nav-container .aty-menu-submenu .aty-select-dropdown .aty-menu-item {
  color: #fff;
  background: none;
  text-align: center;
}

.fd-question {
  width: 16px;
  height: 16px;
  background: url(../../assets/images/w-png4.png) no-repeat center;
  float: left;
  margin-right: 20px;
  margin-top: 22px;
  cursor: pointer;
}
</style>

