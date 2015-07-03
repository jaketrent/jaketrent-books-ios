var parseLinkHeader = require('parse-link-header')

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

function hasNextPageHeader(res) {
  return res.headers && res.headers && res.headers.map && res.headers.map.link && res.headers.map.link[0]
}

exports.fetch = function fetchBooks(url) {
  if (!url)
    url = 'http://data.jaketrent.com/api/v1/books?page=1'

  fetch(url.trim())
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

          var linkHeader
          if (hasNextPageHeader(res))
            linkHeader = parseLinkHeader(res.headers.map.link[0])

          getActions().fetchSuccess({ books, linkHeader })
        } else {
          // TODO: errors
        }
      })
    })
    .catch((err) => {
      console.log('err', err)
      throw err
    })
}