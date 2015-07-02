var React = require('react-native')

var { View, Text, StyleSheet, Image } = React

class BookRow extends React.Component {
  render() {
    var book = this.props.book
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
}

BookRow.defaultProps = {
  book: {}
}

var styles = StyleSheet.create({
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

module.exports = BookRow