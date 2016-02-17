/**
 * Date Picker for iOS
 */

'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

var CalendarPicker = require('react-native-calendar-picker');

function render() {
  return (
      <View style={styles.data_picker}>
      <TouchableOpacity
    onPress={this.props.toggle_date_picker}
    style={{padding:5, alignItems: 'flex-end'}}
      >
      <Text>Done</Text>
      </TouchableOpacity>

      <CalendarPicker
    selectedDate={this.props.date}
    onDateChange={this.props.on_date_change} />
      </View>
  );
}

var options = {
  render: render
};

var DatePicker = React.createClass(options);

const styles = StyleSheet.create({
  date_picker: {
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 500,
    borderColor: '#CCC',
    backgroundColor: '#FFF'
  },
  input: {
    height: 40,
    justifyContent: 'center',
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10
  }
});

module.exports = DatePicker;
