var actions = require('./books-actions')
var alt = require('../common/alt')

class BooksStore {
  constructor() {
    this.bindListeners({
      handleFetchSuccess: actions.FETCH_SUCCESS
    })
    this.exportPublicMethods({
      hasNextPage: this.hasNextPage.bind(this),
      getNextPageUrl: this.getNextPageUrl.bind(this)
    })
    this.books = []
  }
  handleFetchSuccess(payload) {
    this.books = this.books.concat(payload.books)
    this.linkHeader = payload.linkHeader
  }
  hasNextPage() {
    return !!this.linkHeader && !!this.linkHeader.next && !!this.linkHeader.next.url
  }
  getNextPageUrl() {
    return this.linkHeader.next.url
  }
}

module.exports = alt.createStore(BooksStore, 'BooksStore')