/**
 * Show the food infomation
 */

'use strict';

import React, {
  StyleSheet,
  Text,
  View
} from 'react-native';

function render() {
  return (
      <View style={styles.container}>
      <Text>Welcome!</Text>
      </View>
  );
}

var options = {
  render: render
};

var ShowView = React.createClass(options);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  }
});

module.exports = ShowView;
