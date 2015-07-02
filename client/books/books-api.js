
// TODO: figure out why books-actions#fetchSuccess is undefined without this
var actions
function getActions() {
  if (!actions)
    actions = require('./books-actions')

  return actions
}

function camelize(str) {
  return str.replace(/(_\w)/g, (str) => str[1].toUpperCase())
}

function camelCase(obj) {
  return Object.keys(obj).reduce((memo, key) => {
    memo[camelize(key)] = obj[key]
    return memo
  }, {})
}

exports.fetch = function fetchBooks() {
  fetch('http://data.jaketrent.com/api/v1/books')
    .then((res) => {
      return {
        res,
        json: res.json()
      }
    })
    .then((resAndJson) => {
      var res = resAndJson.res
      resAndJson.json.then((json) => {
        if (res.status >= 200 && res.status < 300) {
          var books = json.books.map((book) => camelCase(book))
          console.log('books', books)
          getActions().fetchSuccess(books)
        } else {
          // TODO: errors
        }
      })
    })
    //.catch((err) => {
      // What's in the box?!
    //})
}