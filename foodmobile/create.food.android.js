/**
 * Create food
 */

'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  DatePickerAndroid,
  TouchableWithoutFeedback
} from 'react-native';

console.log('DatePickerAndroid:', DatePickerAndroid);

var CalendarPicker = require('react-native-calendar-picker');

async function show_picker(stateKey, options) {
  console.log('DatePickerAndroid:', DatePickerAndroid);
  try {
    var newState = {};
    const {action, year, month, day} = await DatePickerAndroid.open(options);
    if (action === DatePickerAndroid.dismissedAction) {
      newState[stateKey + 'Text'] = 'dismissed';
    } else {
      var date = new Date(year, month, day);
      newState[stateKey + 'Text'] = date.toLocaleDateString();
      newState[stateKey + 'Date'] = date;
    }
    this.setState(newState);
  } catch ({code, message}) {
    console.warn(`Error in example '${stateKey}': `, message);
  }
}

//      <View style={styles.exp_container}>
//      <Text>Exp.</Text>
//      <TouchableWithoutFeedback
//    onPress={this.show_picker.bind(this, 'simple', {date: this.state.date})}>
//      <Text style={styles.text}>pick a date</Text>
//      </TouchableWithoutFeedback>
//      </View>

function render() {
  return (
      <View>

      <View style={styles.container}>
      <Text>Add Food</Text>
      </View>

      <View style={styles.name_container}>
      <TextInput
    style={styles.name_input}
    onChange={this.on_foodname_change}
    value={this.state.foodname}
    placeholder='Name'
      >
      </TextInput>
      </View>

      <View style={styles.exp_container}>
      <Text>Exp.</Text>

      <CalendarPicker
    selectedDate={this.state.date}
    onDateChange={this.on_date_change} />

      <Text style={styles.selectedDate}>Date:  { this.state.date.toString() } </Text>
      </View>

      <View style={styles.name_container}>
      <TouchableHighlight style={styles.button}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
      </View>

      </View>
  );
}

function get_initial_state() {
  return {
    foodname: '',
    date: new Date(),
    time_zone_offset_in_hours: (-1) * (new Date()).getTimezoneOffset() / 60
  };
}

function on_foodname_change(event) {
  this.setState({ foodname: event.nativeEvent.text});
}

function on_date_change(date) {
  this.setState({date: date});
}

function create_food() {
  console.log('foodname:', this.state.foodname);
  console.log('expired:', this.state.date);

  fetch(this.props.host + '/api/food', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    },
    body: JSON.stringify({
      name: this.state.foodname,
      expiration_date: this.state.date.getTime()
    })
  })
    .then((response) => response.json())
    .then((response_data) => {
      /*this.setState({
       dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
       loaded: true
       });*/
      this.props.navigator.push({
        id: 'food_list',
        sid: this.props.sid,
        username: this.props.username
      });
      console.log(this.state.username);
      console.log(response_data);
    })
    .done();
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  on_foodname_change: on_foodname_change,
  on_date_change: on_date_change,
  create_food: create_food,
  show_picker: show_picker
};

var CreateFoodView = React.createClass(options);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 65,
    marginBottom: 30,
    alignItems: 'center'
  },
  name_container: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  name_input: {
    //width: 200,
    height: 36,
    padding: 4,
    marginBottom: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  exp_container: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  button: {
    height: 36,
    flex: 1,
    //flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 25,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = CreateFoodView;
