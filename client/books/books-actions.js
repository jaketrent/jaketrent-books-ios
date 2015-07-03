var alt = require('../common/alt')
var api = require('./books-api')

class BooksActions {
  fetchSuccess(books) {
    this.dispatch(books)
  }
  fetch(url) {
    api.fetch(url)
    this.dispatch(url)
  }
}

module.exports = alt.createActions(BooksActions)
