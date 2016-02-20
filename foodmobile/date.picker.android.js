/**
 * Date Picker for Android
 */

'use strict';

import React, {
  View
} from 'react-native';

var CalendarPicker = require('react-native-calendar-picker');

function render() {
  return (
      <View style={{backgroundColor: 'white'}}>
      <CalendarPicker
    selectedDate={this.props.date}
    onDateChange={this.props.on_date_change}
      />
      </View>
  );
}

var options = {
  render: render
};

var DatePicker = React.createClass(options);

module.exports = DatePicker;
