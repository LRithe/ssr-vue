<template>
    <div class="test" id="winning-record">
        <div class="container">
            <winning></winning>
        </div>
    </div>
</template>

<script>
  import Winning from '@/components/WinningRecord.vue'
  export default {
    name: 'Test',
    components: {Winning},
    asyncData: function ({store}) {
      return [store.dispatch('getDrawDetail', 589765216)]
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
