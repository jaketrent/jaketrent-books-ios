var Button = require('react-native-button')
var moment = require('moment')
var React = require('react-native')

var { View, Text, StyleSheet, Image, ScrollView, LinkingIOS } = React

class BookDetail extends React.Component {
  handleBuyPress(url) {
    LinkingIOS.openURL(url)
  }
  handleReviewPress(url) {
    LinkingIOS.openURL(url)
  }
  renderReview(book) {
    if (book.reviewUrl && book.reviewUrl.length > 0)
      return <Button style={styles.reviewUrl} onPress={this.handleReviewPress.bind(this, book.reviewUrl)}>
        My Review
      </Button>
  }
  render() {
    var book = this.props.book
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.image}
                 source={{ uri: book.coverUrl }} />
          <Text style={styles.title}>
            {book.title}
          </Text>
          <Text style={styles.author}>
            {book.author}
          </Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.completeDate}>
            Completed {moment(book.completeDate).format('D MMMM YYYY')}
          </Text>
          {this.renderReview(book)}
        </View>
        <View style={styles.body}>
          <Text style={styles.description}>
            {book.description}
          </Text>
          <Button style={styles.affiliateUrl} onPress={this.handleBuyPress.bind(this, book.affiliateUrl)}>
            Buy Book
          </Button>
        </View>
      </ScrollView>
    )
  }
}

BookDetail.defaultProps = {
  book: {}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  image: {
    flex: 1,
    height: 270,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  title: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 15
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic'
  },
  meta: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: '#D7D7D7',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 30,
    marginBottom: 30
  },
  completeDate: {
    flex: 1
  },
  reviewUrl: {
    flex: 1,
    textAlign: 'right'
  },
  body: {
    marginBottom: 40
  },
  description: {
    fontSize: 18
  },
  affiliateUrl: {
    marginTop: 30
  }
})

module.exports = BookDetail