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
  DatePickerIOS,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';

var moment = require('moment');
var DatePicker = require('./date.picker');

function render() {
  var date_picker = (
      <View style={styles.data_picker}>
      <TouchableOpacity
    onPress={this.toggle_date_picker}
    style={{padding:5, alignItems: 'flex-end'}}
      >
      <Text>Done</Text>
      </TouchableOpacity>
      <DatePicker
    date={this.state.date}
    mode='date'
    time_zone_offset_in_hours={this.state.time_zone_offset_in_hours * 60}
    on_date_change={this.on_date_change}
      />
      </View>
  );

  return (
      <View>

      <View style={styles.container}>
      <Text>Add Food</Text>
      </View>

      <View style={styles.name_container}>
      <Text style={{width: 80}}>Name: </Text>
      <TextInput
    style={styles.name_input}
    onChange={this.on_foodname_change}
    value={this.state.foodname}
    placeholder='Name'
      >
      </TextInput>
      </View>

      <View style={styles.exp_container}>
      <Text style={{width: 80}}>Exp.: </Text>

      <TouchableWithoutFeedback
    onPress={this.toggle_date_picker}
      >
      <View style={styles.input}>
      <Text>
      {moment(this.state.date).format('YYYY-MM-DD')}
      </Text>
      </View>
      </TouchableWithoutFeedback>
      </View>

      <View style={styles.name_container}>
      <TouchableHighlight style={styles.button}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button}
    onPress={this.props.navigator.pop}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Cancel</Text>
      </TouchableHighlight>
      </View>

      {this.state.date_picker_mode == 'visible' ? date_picker : <View/>}

      </View>
  );
}

function get_initial_state() {
  return {
    foodname: '',
    date: new Date(),
    time_zone_offset_in_hours: (-1) * (new Date()).getTimezoneOffset() / 60,
    date_picker_mode: 'hidden'
  };
}

function toggle_date_picker() {
  var mode = this.state.date_picker_mode == 'hidden' ? 'visible' : 'hidden';
  this.setState({date_picker_mode: mode});
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
  toggle_date_picker: toggle_date_picker
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
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 25,
    marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
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

module.exports = CreateFoodView;
