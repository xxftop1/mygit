<template>
  <div class="fd-assistant">
    <aty-poptip placement="bottom-end" class="fd-tools" @popper-show="shwoAss" @popper-hide="hideAss">
      <img src="../../assets/images/assistant.png" title="助手小T">
      <div slot="content" class="poptipCss">
        <aty-iframe ref="assPage" auto-height></aty-iframe>
      </div>
    </aty-poptip>
  </div>
</template>

<script>
    export default {
      name: "assistant",
      methods: {
        /**
         * 打开助手小T页面
         */
        shwoAss() {
          this.$refs.assPage.$el.src="/assistant/index.html";
        },
        /**
         * 关闭助手小T页面
         */
        hideAss() {
          this.$refs.assPage.$el.src="";
        },
      }
    }
</script>
