<template>
  <div id="app" v-if="isShow"   @click="clickevent">
    <Header></Header>
    <Navi></Navi>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Navi from "./components/navigation/Navi.vue";
import axios from "axios";
export default {
  data() {
    return {
      isShow: false,
      isRouterAlive: true,
      pids:
        "30100001;30111001;30111002;30111003;30111004;30111005;30111006;30111007;30111008;30111009;30111010;30111011;30111012;30111013;30111014;30111015;30111016;30111017;30111018;30111019"
    };
  },
  components: {
    Header,
    Navi
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  created() {
    let _this = this;
    axios
      .all([
        _this.getCurUserInfo(),
        _this.getNomalCodeTypeList(),
        _this.getNomalCodeList(),
        _this.getWritServerUrl(),
        _this.getQsjy()
      ])
      .then(
        axios.spread(function(acct, perms) {
          _this.isShow = true;
        })
      );
  },
  methods: {
    reload() {
      var _this = this;
      _this.isRouterAlive = false;
      _this.$nextTick(function() {
        _this.isRouterAlive = true;
      });
    },
    //获取当前登录人信息
    getCurUserInfo() {
      let data = localStorage.getItem(_jfkh.curUserInfo);
      let _this = this;
      // return _this.getRequest("/api/v1/system/getCurUserInfo").then(resp => {
      return _this.getRequest(_this.apis.com0003).then(resp => {
        if (resp && resp.status == 200) {
          localStorage.setItem(_jfkh.curUserInfo, JSON.stringify(resp.data));
        } else {
          console.error("获取当前登录人信息出错");
        }
      });
    },
    //获取单值代码值类型列表
    getNomalCodeTypeList() {
      let data = localStorage.getItem(_jfkh.normalCodeTypeList);
      if (data) {
        return;
      }
      //计分考核系统用到的所有pid
      let _this = this;
      let params = {
        pids: _this.pids
      };
      // return this.getRequest("/api/v1/normalcodes/batch",params).then(resp => {
      return this.getRequest(_this.apis.com0004, params).then(resp => {
        if (resp && resp.status == 200) {
          localStorage.setItem(_jfkh.normalCodeTypeList, JSON.stringify(resp.data));
        } else {
          console.error("获取单值代码值类型列表出错！");
        }
      });
    },

    //获取单值代码列表
    getNomalCodeList() {
      let data = localStorage.getItem(_jfkh.normalCodeList);
      if (data) {
        return;
      }
      //计分考核系统用到的所有pid
      let _this = this;
      let params = {
        pids: _this.pids
      };
      //  return this.getRequest("/api/v1/system/getNormalCodeList",params).then(resp => {
      return this.getRequest(_this.apis.com0005, params).then(resp => {
        if (resp && resp.status == 200) {
          localStorage.setItem(_jfkh.normalCodeList, JSON.stringify(resp.data));
        } else {
          console.error("获取单值代码值列表出错！");
        }
      });
    },
    //获取文书服务地址
    getWritServerUrl() {
      var _this = this;
      let data = localStorage.getItem("writServerUrl");
      if (data) {
        return;
      }
      // return  this.getRequest("/api/v1/system/getWritServerUrl").then(resp => {
      return this.getRequest(_this.apis.com0006).then(resp => {
        if (resp && resp.status == 200) {
          localStorage.setItem("writServerUrl", JSON.stringify(resp.data));
        } else {
          console.error("获取文书服务地址出错！");
        }
      });
    },

    //获取乔司监狱
    getQsjy() {
      var _this = this;
      let data = localStorage.getItem("qsjy");
      if (data) {
        return;
      }
      // this.getRequest("/api/v1/system/getQsjy").then(resp =>{
      this.getRequest(_this.apis.com0007).then(resp => {
        if (resp && resp.status == 200) {
          localStorage.setItem("qsjy", JSON.stringify(resp.data));
        } else {
          console.error("获取乔司监狱出错！");
        }
      });
    },
    /**
     * 全局的点击事件
     */
    clickevent() {}
  }
};
</script>

<style>
html,
body,
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: url(assets/images/w-jpg2.jpg) no-repeat center top;
  background-size: 100% 490px;
  width: 100%;
  height: 100%;
}
body {
  overflow: hidden;
}
#app {
  min-width: 1366px;
  min-height: 700px;
}
.hideInput {
  display: none;
}
</style>
