var alt = require('../common/alt')
var api = require('./books-api')

class BooksActions {
  fetchSuccess(books) {
    this.dispatch(books)
  }
  fetch() {
    api.fetch()
    this.dispatch()
  }
}

module.exports = alt.createActions(BooksActions)
