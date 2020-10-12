<template>
    <div class="loading-box" v-show="isLoading">
      <img src="../../assets/images/loadingPic.gif" class="loading-img">
    </div>
</template>

<script>
export default {
    name:'loading',
    data(){
        return{

        }
    },
    props:{
        isLoading:Boolean
    }
}
</script>

<style scoped>
.loading-box{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index: 9999;
    background:rgba(255,255,255,0.5);
}
img.loading-img{
    width:600px;
    height:337px;
    display:block;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    z-index:10000;
    margin:auto;
}
</style>

