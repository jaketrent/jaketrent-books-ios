'use strict'

var React = require('react-native')

var Books = require('./client/books/index')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React

var BooksBrowser = React.createClass({
  render: function() {
    return (
      <Books />
    )
  }
})

AppRegistry.registerComponent('BooksBrowser', () => BooksBrowser)
