import api from 'create-api'
export const getDrawDetail = function (drawNum) {
  return api.get('/v2/draws/'+ drawNum )
}

export const changePage = function ({drawNum, page}) {
  return api.get('/v2/draws/' + drawNum + '/reveals?size=7&page='+page)
}

export const getBookList = function ({keyword, page}) {
  return api.get('book/search?q='+keyword+'&start='+(page-1)*8+'&count=8')
}

export const getBookInfo = function ({bookId}) {
  return api.get('book/'+bookId)
}
