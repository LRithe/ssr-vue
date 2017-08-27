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
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #495060;
        margin-top: 60px;
    }
</style>
