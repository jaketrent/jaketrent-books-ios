var React = require('react-native')

var actions = require('./books-actions')
var BookDetail = require('./book-detail')
var BooksList = require('./books-list')
var commonStyles = require('../common/styles')
var store = require('./books-store')

var { View, ScrollView, StyleSheet, Image } = React

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
    // TODO: handle turning off loading
  }
  handleRowPress(book) {
    this.props.navigator.push({
      title: book.title,
      component: BookDetail,
      passProps: { book }
    });
  }
  handleListEndReached() {
    //if (store.hasNextPage()) {
    //  actions.fetch(store.getNextPage())
    //  this.setState({ isLoading: true })
    // }
  }
  renderLoading() {
    if (this.state.isLoading)
      return <ActivityIndicatorIOS
        animating={true}
        style={styles.loader}
        size="large"
      />
  }
  render() {
    return (
      <ScrollView contentInset={{top: -60}}>
        <Image style={styles.logo} source={require('image!booksLogo')} />
        <BooksList books={this.state.books}
                   onRowPress={this.handleRowPress.bind(this)}
                   onEndReached={this.handleListEndReached.bind(this)}
          />
      </ScrollView>
    )
  }
}

var styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 200,
    marginTop: 80,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  loader: {
    height: 80,
    alignItems: 'center',
    justifyContent: 'center'
  }
})