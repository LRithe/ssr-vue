import { createApp } from './main'

const isDev = process.env.NODE_ENV !== 'production'
const { app, router, store } = createApp()

const getAllAsyncData = function (component){
  let stores = []
  function loopComponent (component) {
    if (typeof component.asyncData !== 'undefined') {
      for(let a of component.asyncData({store, route: router.currentRoute})) {
        stores.push(a)
      }
    }
    if (typeof component.components !== 'undefined') {
      for (let c in component.components){
        loopComponent(component.components[c])
      }
    }
  }
  loopComponent(component)
  return stores
}

export default context => {
  return new Promise((resolve, reject) => {
    const s = isDev && Date.now()

    const { url } = context
    const fullPath = router.resolve(url).route.fullPath

    if (fullPath !== url) {
      reject({ url: fullPath })
    }

    router.push(url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        reject({ code: 404 })
      }
      let allAsyncData = getAllAsyncData(matchedComponents[0])
      Promise.all(allAsyncData).then(() => {
        isDev && console.log(`data pre-fetch: ${Date.now() - s}ms`)
        context.state = store.state
        resolve(app)
      }).catch(reject)
    }, reject)
  })
}
