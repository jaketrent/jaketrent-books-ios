var React = require('react-native')

var actions = require('./books-actions')
var BookDetail = require('./book-detail')
var BooksList = require('./books-list')
var commonStyles = require('../common/styles')
var store = require('./books-store')

var { ActivityIndicatorIOS, StyleSheet, View } = React

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
    this.setState(store.getState(), () => {
      this.setState({ isLoading: false })
    })
  }
  handleRowPress(book) {
    this.props.navigator.push({
      title: book.title,
      component: BookDetail,
      passProps: { book }
    });
  }
  handleListEndReached() {
    if (store.hasNextPage()) {
      actions.fetch(store.getNextPageUrl())
      this.setState({ isLoading: true })
    }
  }
  renderLoader() {
    if (this.state.isLoading)
      return <ActivityIndicatorIOS
        animating={true}
        style={styles.loader}
        size="small"
      />
  }
  render() {
    return (
      <View style={commonStyles.wrapper}>
        <BooksList books={this.state.books}
                   onRowPress={this.handleRowPress.bind(this)}
                   onEndReached={this.handleListEndReached.bind(this)}
        />
        {this.renderLoader()}
      </View>
    )
  }
}

var styles = StyleSheet.create({
  loader: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})