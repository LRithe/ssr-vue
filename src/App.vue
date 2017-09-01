<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "./assets/scss/common.scss";
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #495060;
        padding-bottom: 50px;
        margin: 60px auto;
        max-width: 800px;
        width: 100%;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;

    }
</style>
