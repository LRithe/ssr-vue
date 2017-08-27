<template>
    <div class="content">
        <div class="main">
            <p class="text-center record-title">Winning Record</p>
            <div class="record-content">
                <ul class="list-unstyled">
                    <li class="record-list" v-for="item in winningRecords">
                        <div class="row">
                            <div class="col-xs-9 col-sm-10">
                                <p class="pull-left record-avatar">
                                    <img :src="item.user.avatar" alt="" class="img-circle">
                                </p>
                                <div class="record-text text-left">
                                    <p>
                                        <span>{{item.user.nickname}}</span>
                                        got the
                                        <a href="#">{{drawDetail.title}}</a>
                                    </p>
                                    <p class="record-time">
                                        {{ item.reveal_time | createFormatTime(item.reveal_time) }}
                                    </p>
                                </div>
                            </div>
                            <div class="col-xs-3 col-sm-2 clearfix">
                                <p>
                                    Spend: {{item.coin_amount}}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <nav aria-label="Page navigation" class="text-center">
            <ul class="pagination">
                <li>
                    <a :class="{disabled: current<=1}" href="javascript:void(0)" aria-label="Previous"
                       @click="previousPage()">
                        <span aria-hidden="true" class="glyphicon glyphicon-menu-left"></span>
                    </a>
                </li>
                <li v-for="page in pages" :class="{active: current === page.num}" @click="selectPageNum(page.num)"><a
                    href="javascript:void(0)">{{page.num}}</a></li>
                <li>
                    <a :class="{disabled: current>=totalPages}" href="javascript:void(0)" aria-label="Next"
                       @click="nextPage()">
                        <span aria-hidden="true" class="glyphicon glyphicon-menu-right"></span>
                    </a>
                </li>
            </ul>
        </nav>
        <h1 class="text-center">{{drawDetail.title}}</h1>
    </div>
</template>

<script>
  import {mapState, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'winning-record',
    data: function () {
      return {
        visible: false,
        drawNum: 589765216,
        current: 1,
        pages: [{num: 1}]
      }
    },
    asyncData: function ({store}) {
      return [store.dispatch('changePage', {drawNum: 589765216, page: 1})]
    },
    created: function () {
      this.$store.dispatch('getDrawDetail', this.drawNum)
      this.$store.dispatch('changePage', {drawNum: this.drawNum, page: 1}).then(() => {
        let number =this.totalPages > 5 ? 5 : this.totalPages
        for (let i = 1; i < number; i++) {
          this.pages.push({num: parseInt(i) + 1})
        }
      })
    },
    computed: {
      ...mapState({
        share_part: state => state.share.share_part,
        drawDetail: state => state.share.drawDetail,
        winningRecords: state => state.share.winningRecords,
        totalPages: state => state.share.totalPages
      }),
      ...mapGetters({
        productionTitle: 'title'
      })
    },
    methods: {
      show: function () {
        this.visible = true;
      },
      previousPage: function () {
        if (this.current > 1) {
          this.current--
          this.$store.dispatch('changePage', {drawNum: this.drawNum, page: this.current}).then(() => {
            if (this.pages[0].num > 1) {
              for (let i in this.pages) {
                this.pages[i].num -= 1
              }
            }
          })
        }
      },
      nextPage: function () {
        if (this.current < this.totalPages) {
          this.current++
          this.$store.dispatch('changePage', {drawNum: this.drawNum, page: this.current}).then(() => {
            if (this.pages[this.pages.length - 1].num < this.totalPages) {
              for (let i in this.pages) {
                this.pages[i].num += 1
              }
            }
          })
        }
      },
      selectPageNum: function (num) {
        this.current = num
        this.$store.dispatch('changePage', {drawNum: this.drawNum, page: this.current}).then(() => {
          if (this.pages[this.pages.length - 1].num < this.totalPages) {
            if (num >= 3 && num <= this.totalPages - 2) {
              for (let i in this.pages) {
                console.log(i)
                if (i === 2) {
                  this.pages[i].num = this.current
                } else {
                  this.pages[i].num = parseInt(this.current) + parseInt(i) - 2
                }
              }
            }
          }
        })
      }
    },
    filters: {
      createFormatTime: function (stringTime) {
        var localDate = new Date(stringTime)
        var year = localDate.getFullYear()
        var month = localDate.getMonth() + 1
        var date = localDate.getDate()
        var hour = localDate.getHours()
        var minutes = localDate.getMinutes()
        var seconds = localDate.getSeconds()
        month = month < 10 ? '0' + month : month
        date = date < 10 ? '0' + date : date
        hour = hour < 10 ? '0' + hour : hour
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        return year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + seconds
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import '../assets/scss/shareProduct';

    .content {
        h1 {
            color: #3ab981;
        }
    }
</style>
