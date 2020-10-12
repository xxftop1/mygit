<template>
  <div>
    <!-- 内容部分start -->
    <div class="cfb_bg"></div>
    <div class="cfb_box">
      <div class="cfb_title">
        <p>提示</p>
        <div @click="closeBox" class="cfb_close">X</div>
      </div>
      <div class="cfb_text">{{confirmtext}}</div>
      <div class="cfb_butn">
        <a @click="confirmYes" class="cfb_yes">确认</a>
        <a @click="closeBox" class="cfb_no">取消</a>
      </div>
    </div>
    <!-- 内容部分end -->
  </div>
</template>

<script>
  export default {
    // 接受父组件的值
    props: {
      confirmtext: String,
    },
    data: function () {
      return {

      };
    },
    created() {

    },
    mounted() {
    },
    methods: {
      closeBox() {
        this.$emit('butnClick',false);
      },
      confirmYes() {
        this.$emit('butnClick',true);
      }
    }
  };
</script>
<style scoped>
.cfb_bg{
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.cfb_box{
  width: 20%;
  height: 210px;
  background-color: #fff;
  position: absolute;
  left: 40%;
  top: 30%;
  z-index: 20;
  border: 1px solid #188aff;
  border-radius: 5px;
}
.cfb_title{
  width: 100%;
  height: 40px;
  background-color: #188aff;
  line-height: 40px;
}
.cfb_title p{
  float: left;
  color: #fff;
  margin-left: 13px;
}
.cfb_title .cfb_close{
  float: right;
  margin-right: 13px;
  color: #fff;
  cursor: pointer;
}
.cfb_text{
  color: #333;
  font-size: 14px;
  text-align: center;
  margin-top: 45px;
}
.cfb_butn{
  text-align: center;
  margin-top: 45px;
}
.cfb_butn .cfb_yes{
  display: inline-block;
  width: 85px;
  height: 30px;
  border: 1px solid #188aff;
  background-color: #188aff;
  color: #fff;
  line-height: 30px;
  border-radius: 3px;
  margin: 0 8px;
}
.cfb_butn .cfb_no{
  display: inline-block;
  width: 85px;
  height: 30px;
  border: 1px solid #0279f3;
  background-color: #fff;
  color: #0279f3;
  line-height: 30px;
  border-radius: 3px;
  margin: 0 8px;
}
</style>

