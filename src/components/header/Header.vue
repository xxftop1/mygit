<template>
  <div class="fd-header">
    <img class="fd-logo" src="../../assets/images/w-png1.png">
    <div class="fd-logo-text">监狱一站式综合管理平台 <span>计分考核子系统</span></div>
    <div class="fd-admin-container">
      <div class="fd-user">
        <img v-if="userXb == '1'"  src="../../assets/images/man.png">
        <img v-if="userXb == '2'"  src="../../assets/images/women.png">
        <img v-if="userXb == 'default'" src="../../assets/images/people-icon.png">
      </div>
      <div class="fd-user-name" v-text="curUser"></div>
      <!--<assistant></assistant>-->
      <div class="fd-question" title="点击下载用户手册" @click="downLoadUserManual"></div>
    </div>
  </div>
</template>

<script>
  import assistant from "../assistant/assistant.vue";
  export default {
    name: 'Heads',
    components: {
      assistant,
    },
    created(){
      this.getCurUser();

    },
    data() {
      return {
        curUser: '',
        userXb: '1'
      }
    },
    methods: {
      getCurUser() {
        let data = localStorage.getItem(_jfkh.curUserInfo);
        if (data) {
          let curUserInfo = JSON.parse(data);
          if(curUserInfo != null){
             this.generateUserDisplayInfo(curUserInfo);
             this.getUserXb(curUserInfo);
          }
        } else {
          this.getCurUserInfo();
        }
      },
      //后台请求获取当前人员信息
      getCurUserInfo(){
        this.getRequest("/api/v1/system/getCurUserInfo").then(resp => {
            if (resp && resp.status == 200) {
              let result = resp.data;
              if(result != null){
                this.generateUserDisplayInfo(result);
                this.getUserXb(result);
              }
            }
          });
      },
      //拼接当前人员展示信息
      generateUserDisplayInfo(curUserInfo){
        let _this = this;
        if (curUserInfo.deptName == null) {
            _this.curUser = curUserInfo.userName;
        } else {
            _this.curUser = curUserInfo.deptName + " " + curUserInfo.userName;
        }
      },
      //获取当前人员性别，展示人员头像
      getUserXb(curUserInfo){
        let xb = curUserInfo.xb;
        if(xb === "1"){
          this.userXb = '1';
        }
        if(xb === "2"){
          this.userXb = '2';
        }
      },
      //下载用户手册
      downLoadUserManual(){
        window.location.href = _server.serverName + "/api/v1/system/downloadUserManual";
      }
    }
  }
</script>

<style scoped>
  .fd-header {
    width: 100%;
    height: 60px;
    border-bottom: solid 1px rgba(255, 255, 255, 0.5);
  }

  .fd-logo {
    float: left;
    margin-left: 25px;
    margin-top: 10px;
  }

  .fd-logo-text {
    float: left;
    font-size: 24px;
    color: #fff;
    margin-left: 10px;
    margin-top: 11px;
    font-weight: bold;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .fd-logo-text span {
    font-size:18px;
  }

  .fd-admin-container {
    float: right;
  }

  .fd-user {
    width: 44px;
    height: 44px;
    border-radius: 100%;
    float: left;
    border: #3691ee 3px solid;
    /* background: #fff; */
    overflow: hidden;
    margin-top: 8px;
    margin-right: 20px;
  }

  .fd-user img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  .fd-user-name {
    float: left;
    margin-right: 20px;
    color: #fff;
    margin-top: 20px;
    font-size: 13px;
  }

  .fd-code {
    width: 15px;
    height: 16px;
    background: url(../../assets/images/w-png3.png) no-repeat center;
    float: left;
    margin-right: 20px;
    margin-top: 22px;
    cursor: pointer;
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

  .fd-exit {
    width: 16px;
    height: 15px;
    background: url(../../assets/images/w-png5.png) no-repeat center;
    float: left;
    margin-right: 15px;
    margin-top: 22px;
    cursor: pointer;
  }
</style>
