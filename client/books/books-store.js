var actions = require('./books-actions')
var alt = require('../common/alt')

class BooksStore {
  constructor() {
    this.bindListeners({
      handleFetchSuccess: actions.FETCH_SUCCESS
    })
    this.books = []
  }
  handleFetchSuccess(books) {
    this.books = books
  }
}

module.exports = alt.createStore(BooksStore, 'BooksStore')