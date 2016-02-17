/**
 * Date Picker for Android
 */

'use strict';

import React from 'react-native';

var CalendarPicker = require('react-native-calendar-picker');

function render() {
  return (
      <CalendarPicker
    selectedDate={this.props.date}
    onDateChange={this.props.on_date_change}
      />
  );
}

var options = {
  render: render
};

var DatePicker = React.createClass(options);

module.exports = DatePicker;
