import ItemList from './ItemList.vue'

const camelize = str => str.charAt(0).toUpperCase() + str.slice(1)

export function createListView (type) {
  return {
    name: `${type}-stories-view`,
    asyncData ({ store, route: { params: { page }, query: { q }}}) {
      return [store.dispatch('getBookList', {keyword: q === 'undefined' ? '文学' : q, page: page})]
    },
    title: type,
    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
