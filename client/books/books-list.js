var React = require('react-native')

var {
  StyleSheet,
  Text,
  Image,
  View,
  ListView
} = React

class BooksList extends React.Component {
  constructor(props) {
    super(props)

    console.log('this.props.books', this.props.books)
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.props.books)
    }
  }
  componentWillReceiveProps(newProps) {
    console.log('newProps.books', newProps.books)
    if (newProps.books)
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(newProps.books)
      })
  }
  renderBook(book) {
    return (
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
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView dataSource={this.state.dataSource}
                  renderRow={this.renderBook.bind(this)} />
      </View>

    )
  }
}
BooksList.defaultProps = {
  books: []
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
    height: 150,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
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

