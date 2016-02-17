/**
 * Date Picker for iOS
 */

'use strict';

import React, {
  DatePickerIOS
} from 'react-native';

function render() {
  return (
      <DatePickerIOS
    date={this.props.date}
    mode={this.props.mode}
    timeZoneOffsetInMinutes={this.props.time_zone_offset_in_hours * 60}
    onDateChange={this.props.on_date_change}
      />
  );
}

var options = {
  render: render
};

var DatePicker = React.createClass(options);

module.exports = DatePicker;
