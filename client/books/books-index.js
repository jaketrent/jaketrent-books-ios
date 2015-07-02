var React = require('react-native')

var actions = require('./books-actions')
var BookDetail = require('./book-detail')
var BooksList = require('./books-list')
var store = require('./books-store')

// This controller view exists as beneath NavigatorIOS so that as props
// change, the proper listeners are in place to update the view component
module.exports = class BooksIndex extends React.Component {
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
  handleRowPress(book) {
    this.props.navigator.push({
      title: book.title,
      component: BookDetail,
      passProps: { book }
    });
  }
  render() {
    return (
      <BooksList books={this.state.books} onRowPress={this.handleRowPress.bind(this)} />
    )
  }
}
