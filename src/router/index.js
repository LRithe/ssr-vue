import Vue from 'vue'
import Router from 'vue-router'

// const createListView = id => () => import('@/views/CreateListView').then(m => m.default(id))
// const Hello = () => import('@/components/Hello')
import Hello from '@/components/Hello'
import {createListView} from '@/views/CreateListView'
import Book from '@/views/Book.vue'

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/hello',
        name: 'Hello',
        component: Hello
      },
      {
        path: '/technology/:page(\\d+)?',
        name: 'technology',
        component: createListView('technology', '科技科普')
      },
      {
        path: '/book/:bookId',
        name: 'book',
        component: Book
      },
      { path: '/', redirect: '/technology/1' }
    ]
  })
}
