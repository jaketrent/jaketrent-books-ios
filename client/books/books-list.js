var React = require('react-native')

var commonStyles = require('../common/styles')

var {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  Image,
  TouchableHighlight
} = React

class BooksList extends React.Component {
  constructor(props) {
    super(props)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.getRows(this.props))
    }
  }
  getRows(props) {
    return [{ isHeader: true }].concat(props.books)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.books)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.getRows(newProps))
      })
  }
  renderBook(book) {
    return (
      <TouchableHighlight
        underlayColor="#007aff"
        onPress={this.props.onRowPress.bind(null, book)}>
        <View style={styles.row}>
          <Image style={styles.image}
            source={{ uri: book.coverUrl }} />
          <View style={styles.body}>
            <Text style={styles.title}>
              {book.title}
            </Text>
            <Text style={styles.author}>
              {book.author}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  renderHeader() {
    return <Image source={require('image!booksLogo')} style={styles.logo} />
  }
  renderRow(row) {
    return row.isHeader ? this.renderHeader() : this.renderBook(row)
  }
  render() {
    return (
        <ListView dataSource={this.state.dataSource}
                  onEndReached={this.props.onEndReached}
                  onEndReachedThreshold={this.props.onEndReachedThreshold}
                  renderRow={this.renderRow.bind(this)}
                  contentInset={{ top: -40 }}
                  styles={commonStyles.wrapper} />
    )
  }
}
BooksList.defaultProps = {
  books: [],
  onRowPress: () => {},
  onEndReachedThreshold: 500
}
module.exports = BooksList

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    paddingTop: 0,
    height: 150,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  logo: {
    height: 100,
    width: 200,
    marginTop: 80,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  image: {
    flex: 1,
    height: 100,
    width: 50,
    resizeMode: 'contain'
  },
  body: {
    flex: 3,
    paddingLeft: 20
  },
  title: {
    fontSize: 20,
    paddingBottom: 6
  },
  author: {
    fontSize: 14,
    fontStyle: 'italic'
  }
})

