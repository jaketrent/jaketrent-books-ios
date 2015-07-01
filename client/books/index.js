var React = require('react-native')

var actions = require('./books-actions')
var BooksList = require('./books-list')
var store = require('./books-store')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React

module.exports = class Books extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.handleStoreStateChange = this.handleStoreStateChange.bind(this)
  }
  componentDidMount() {
    store.listen(this.handleStoreStateChange)
    actions.fetch()
  }
  componentWillUnmount() {
    store.unlisten(this.handleStoreStateChange)
  }
  handleStoreStateChange() {
    this.setState(store.getState())
  }
  render() {
    return (
      <BooksList books={this.state.books} />
    )
  }
}
