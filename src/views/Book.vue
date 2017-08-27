<template>
  <div id="book">
    <Row>
      <Col span="24" class="book-title">
        <p>{{bookInfo.title}}</p>
      </Col>
    </Row>
    <Row type="flex" class="indro" algin="middle" justify="center">
      <Col span="4">
        <img :src="bookInfo.image" alt="">
      </Col>
      <Col span="20" class="book-info">
      <p>作者：<span v-for="author in bookInfo.author">{{author}}</span></p>
      <p>副标题：{{bookInfo.subtitle}}</p>
      <p>页数：{{bookInfo.pages}}</p>
      <p>价格：{{bookInfo.price}}￥</p>
      <p>出版年：{{bookInfo.pubdate}}</p>
      <p>出版社：{{bookInfo.publisher}}</p>
      <p>装帧：{{bookInfo.binding}}</p>
      <!--<p>ISBN：{{bookInfo.isbn13}}</p>-->
      </Col>
    </Row>
    <Row type="flex" class="book-content" algin="middle" justify="center">
      <Col span="24" class="summary">
        <p class="small-title">内容简介......</p>
        <p ref="summary">{{bookInfo.summary}}</p>
      </Col>
    </Row>
    <Row type="flex" class="book-content" algin="middle" justify="center">
      <Col span="24" class="author-intro">
      <p class="small-title">作者简介......</p>
      <p>{{bookInfo.author_intro}}</p>
      </Col>
    </Row>
    <Row type="flex" class="book-content" algin="middle" justify="center">
      <Col span="24">
      <p class="small-title">目录......</p>
      <pre>{{bookInfo.catalog}}</pre>
      </Col>
    </Row>
  </div>
</template>

<script>
  import { clamps } from '@/assets/js/clamp.js'
  import {mapState, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'book-info',
    components: {},
    data () {
      return {
        msg: 'dfsd\nfgdf'
      }
    },
    asyncData ({ store, route: { params: { bookId }}}) {
      return [store.dispatch('getBookInfo', {bookId: bookId})]
    },
    beforeMount: function () {
      this.$store.dispatch('getBookInfo', {bookId: this.bookId})
    },
    updated: function () {
      clamps(this.$refs.summary, 2)
    },
    computed: {
      ...mapState({
        bookInfo: state => state.bookList.bookInfo,
      }),
      bookId: function () {
        return parseInt(this.$store.state.route.params.bookId)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../assets/scss/common.scss";
  .book-title {
    color: $base-color;
    font-size: 26px;
    text-align: left;
    font-weight: bold;
  }
  .indro {
    text-align: left;
    p {
      font-size: 13px;
      margin-bottom: 3px;
    }
    margin-bottom: 40px;
  }
  .book-content {
    margin: 40px auto;
    text-align: left;
    .small-title {
      color: $base-color;
      font-size: 16px;
      font-weight: bold;
    }
  }
</style>
