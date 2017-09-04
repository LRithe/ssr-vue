<template>
    <div>
        <div class="search">
            <Row>
                <Col span="6" offset="2">
                    <span>豆瓣阅读</span>
                </Col>
                <Col span="10">
                    <Input v-model="keyword" placeholder="Please enter" @on-enter="search" @on-blur="search">
                    <Button slot="append" icon="ios-search" @click="search"></Button>
                </Input>
                </Col>
            </Row>
        </div>
        <Row class="tag">
            <Col span="6">
            <Tag type="dot" color="green">{{keyword}}</Tag>
            </COl>
        </Row>
        <Row v-for="book in books" :key="book.id" class="book-list" v-if="!!book" type="flex" algin="middle" justify="center">
            <Col span="4">
                <router-link :to="{ name: 'book', params: { bookId: book.id }}">
                    <img :src="book.image" alt="">
                </router-link>
            </Col>
            <Col span="20" class="book-info">
                <p>{{book.title}}</p>
                <p>作者：<span v-for="author in book.author">{{author}}</span></p>
                <p>总页数：{{book.pages}}</p>
                <p>价格：{{book.price}}￥</p>
                <p>出版日期：{{book.pubdate}}</p>
                <p>出版社：{{book.publisher}}</p>
                <p class="summary" ref="summary">{{book.summary}}</p>
            </Col>
        </Row>
        <Page :total=total :current=currentPage show-elevator class="page" :page-size='8' @on-change="pageChange"></Page>
    </div>
</template>

<script>
  import { clamps } from '@/assets/js/clamp.js'
  import {mapState, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'item-list',
    components: {},
    props: {
      type: String
    },
    data () {
      return {
        keyword: this.$store.state.route.query.q === undefined ? '文学' : this.$store.state.route.query.q,
      }
    },
    beforeMount: function () {
      this.$store.dispatch('getBookList', {
        keyword: this.keyword,
        page: this.currentPage
      })
    },
    methods: {
      search: function () {
        this.$store.dispatch('getBookList', {
          keyword: this.keyword,
          page: 1
        })
      },
      pageChange: function (page) {
        this.$router.push({ name: 'technology', params: { page: page }, query: { q: this.keyword }})
      }
    },
    updated: function () {
      clamps(this.$refs.summary, 2)
    },
    computed: {
      ...mapState({
        books: state => state.bookList.books,
        total: state => state.bookList.total
      }),
      ...mapGetters({
        totalPages: 'totalPages'
      }),
      currentPage: function () {
        return parseInt(this.$store.state.route.params.page)
      }
    },
    filters: {
      upperCase: function (string) {
        if (!!string){
          return string.toUpperCase()
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../assets/scss/common.scss";

    .search {
        margin-bottom: 80px;
        span {
            font-size: 24px;
            line-height: 32px;
            color: $base-color;
        }
    }

    .book-info {
        text-align: left;
        p {
            margin-bottom: 3px;
        }
    }

    .tag {
        text-align: left;
        margin-bottom: 30px;
    }

    .book-list {
        padding: 30px 0;
        border-top: 1px dashed #ccc;
    }

    .page {
        margin: 50px auto;
    }
</style>
