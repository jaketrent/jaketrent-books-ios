var React = require('react-native')

var BooksIndex = require('./books-index')
var commonStyles = require('../common/styles')

var { NavigatorIOS } = React

module.exports = class Index extends React.Component {
  render() {
    return (
      <NavigatorIOS style={commonStyles.wrapper}
                    initialRoute={{
                      component: BooksIndex,
                      title: 'Books'
                    }} />
    )
  }
}
