/**
 * Food detail
 */

'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  Dimensions
} from 'react-native';

var moment = require('moment');
var DatePicker = require('./date.picker');
var Screen = Dimensions.get('window');
var dismiss_keyboard = require('dismissKeyboard');

function render() {
  var date_picker_purchase = (
      <View style={styles.data_picker}>
      <TouchableOpacity
    onPress={this.toggle_purchase_date_picker}
    style={{padding:5, alignItems: 'flex-end'}}
      >
      <Text>Done</Text>
      </TouchableOpacity>
      <DatePicker
    date={this.state.purchase_date}
    mode='date'
    time_zone_offset_in_hours={this.state.time_zone_offset_in_hours * 60}
    on_date_change={this.on_purchase_date_change}
      />
      </View>
  );

  date_picker_purchase = (
      <View style={date_picker_styles.container}>
      <View style={date_picker_styles.actionSheetContainer}>
      <TouchableOpacity
    style={date_picker_styles.touchableOpacity}
    activeOpacity={1}
    onPress={this.on_purchase_date_close} />
      <DatePicker
    date={this.state.purchase_date}
    mode='date'
    time_zone_offset_in_hours={this.state.time_zone_offset_in_hours * 60}
    on_date_change={this.on_purchase_date_change}
      />
      <View style={date_picker_styles.separator}/>
      <TouchableOpacity
    onPress={this.on_purchase_date_close}
    style={date_picker_styles.button}>
      <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
    style={date_picker_styles.touchableOpacity}
    activeOpacity={1}
    onPress={this.on_purchase_date_close} />
      </View>
      </View>
  );

  var date_picker_expiration = (
      <View style={styles.data_picker}>
      <TouchableOpacity
    onPress={this.toggle_expiration_date_picker}
    style={{padding:5, alignItems: 'flex-end'}}
      >
      <Text>Done</Text>
      </TouchableOpacity>
      <DatePicker
    date={this.state.expiration_date}
    mode='date'
    time_zone_offset_in_hours={this.state.time_zone_offset_in_hours * 60}
    on_date_change={this.on_expiration_date_change}
      />
      </View>
  );

  date_picker_expiration = (
      <View style={date_picker_styles.container}>
      <View style={date_picker_styles.actionSheetContainer}>
      <TouchableOpacity
    style={date_picker_styles.touchableOpacity}
    activeOpacity={1}
    onPress={this.on_expiration_date_close} />
      <DatePicker
    date={this.state.expiration_date}
    mode='date'
    time_zone_offset_in_hours={this.state.time_zone_offset_in_hours * 60}
    on_date_change={this.on_expiration_date_change}
      />
      <View style={date_picker_styles.separator}/>
      <TouchableOpacity
    onPress={this.on_expiration_date_close}
    style={date_picker_styles.button}>
      <Text>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
    style={date_picker_styles.touchableOpacity}
    activeOpacity={1}
    onPress={this.on_expiration_date_close} />
      </View>
      </View>
  );

  var foodname_picker = (
      <Picker
    style={styles.name_picker}
    selectedValue={this.state.language}
    onValueChange={(lang) => this.setState({language: lang})}>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
      </Picker>
  );

  return (
      <View>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>Food Detail</Text>

      <TouchableOpacity
    style={styles.cancel}
    ref='button'
    onPress={this.props.navigator.pop}
    underlayColor='#99d9f4'>
      <Text style={styles.cancel_text}>Cancel</Text>
      </TouchableOpacity>
      </View>

      <View>
      <Text style={{color: 'red', textAlign: 'center'}}>{this.state.error}</Text>
      </View>

      <View style={styles.item_container}>
      <Text style={{width: 80}}>Name: </Text>
      <TextInput
    style={styles.name_input}
    onChange={this.on_foodname_change}
    value={this.state.foodname}
    placeholder='Name'
    onFocus={this.toggle_foodname_picker}
    onBlur={this.toggle_foodname_picker}
      >
      </TextInput>
      </View>

      <View style={styles.item_container}>
      <Text style={{width: 80}}>Pur.: </Text>

      <TouchableWithoutFeedback
    onPress={this.toggle_purchase_date_picker}
      >
      <View style={styles.input}>
      <Text>
      {moment(this.state.purchase_date).format('MM/DD/YYYY')}
      </Text>
      </View>
      </TouchableWithoutFeedback>
      </View>

      <View style={styles.item_container}>
      <Text style={{width: 80}}>Exp.: </Text>

      <TouchableWithoutFeedback
    onPress={this.toggle_expiration_date_picker}
      >
      <View style={styles.input}>
      <Text>
      {moment(this.state.expiration_date).format('MM/DD/YYYY')}
      </Text>
      </View>
      </TouchableWithoutFeedback>
      </View>

      <View style={styles.item_container}>
      <TouchableHighlight style={styles.button}
    onPress={this.update_food}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
      </View>

      {this.state.date_picker_purchase_mode == 'visible' ? date_picker_purchase : <View/>}

    {this.state.date_picker_expiration_mode == 'visible' ? date_picker_expiration : <View/>}

    {this.state.foodname_picker_mode == 'visible' ? foodname_picker : <View/>}

      </View>
  );
}

function get_initial_state() {
  console.log('expiration_date:', this.props.food.expiration_date);

  return {
    foodname: this.props.food.name,
    purchase_date: new Date(this.props.food.purchase_date),
    expiration_date: new Date(this.props.food.expiration_date),
    time_zone_offset_in_hours: (-1) * (new Date()).getTimezoneOffset() / 60,
    date_picker_purchase_mode: 'hidden',
    date_picker_expiration_mode: 'hidden',
    foodname_picker_mode: 'hidden',
    error: ''
  };
}

function toggle_purchase_date_picker() {
  var mode = this.state.date_picker_purchase_mode == 'hidden' ? 'visible' : 'hidden';
  this.setState({date_picker_purchase_mode: mode});

  dismiss_keyboard();

//  if(mode == 'visible' && this.state.date_picker_expiration_mode == 'visible') {
//    this.setState({date_picker_expiration_mode: 'hidden'});
//  }
}

function toggle_expiration_date_picker() {
  var mode = this.state.date_picker_expiration_mode == 'hidden' ? 'visible' : 'hidden';
  this.setState({date_picker_expiration_mode: mode});

  dismiss_keyboard();

//  if(mode == 'visible' && this.state.date_picker_purchase_mode == 'visible') {
//    this.setState({date_picker_purchase_mode: 'hidden'});
//  }
}

function toggle_foodname_picker() {
//  var mode = this.state.foodname_picker_mode == 'hidden' ? 'visible' : 'hidden';
//  this.setState({foodname_picker_mode: mode});
}

function on_foodname_change(event) {
  this.setState({ foodname: event.nativeEvent.text});
}

function on_purchase_date_change(date) {
  this.setState({purchase_date: date});
}

function on_purchase_date_close() {
  this.setState({date_picker_purchase_mode: 'hidden'});
}

function on_expiration_date_change(date) {
  this.setState({expiration_date: date});
}

function on_expiration_date_close() {
  this.setState({date_picker_expiration_mode: 'hidden'});
}

function on_foodname_focus() {
  this.toggle_name_picker();
}

function on_foodname_blur() {
  this.toggle_name_picker();
}

function update_food() {
  var url = this.props.host + '/api/food/' + this.props.food._id;

  console.log('foodname:', this.state.foodname);
  console.log('expired:', this.state.date);
  console.log('update_food url:', url);

  fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    },
    body: JSON.stringify({
      name: this.state.foodname,
      purchase_date: this.state.purchase_date.getTime(),
      expiration_date: this.state.expiration_date.getTime()
    })
  })
    .then((response) => response.json())
    .then((response_data) => {
      if(response_data.code === 200) {
        this.props.navigator.push({
          id: 'food_list',
          sid: this.props.sid,
          username: this.props.username,
          host: this.props.host
        });
      } else {
        this.setState({error: 'Save failed!'});
      }
      console.log(this.state.username);
      console.log(response_data);
    })
    .done();
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  on_foodname_change: on_foodname_change,
  on_purchase_date_change: on_purchase_date_change,
  on_expiration_date_change: on_expiration_date_change,
  update_food: update_food,
  toggle_purchase_date_picker: toggle_purchase_date_picker,
  toggle_expiration_date_picker: toggle_expiration_date_picker,
  toggle_foodname_picker: toggle_foodname_picker,
  on_purchase_date_close: on_purchase_date_close,
  on_expiration_date_close: on_expiration_date_close
};

var FoodDetailView = React.createClass(options);

var date_picker_styles = StyleSheet.create({
  container:{
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: 'transparent',
    position: 'absolute'

  },
  actionSheetContainer: {
    height: Screen.height,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  datePicker: {
    backgroundColor: 'white'
  },
  touchableOpacity: {
    flex: 1
  },
  button: {
    paddingVertical: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCC'
  }
});

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 65,
    marginBottom: 30,
    alignItems: 'center'
  },
  item_container: {
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  name_input: {
    //width: 200,
    //borderColor: '#48BBEC',
    //borderRadius: 8,
    //color: '#48BBEC'
    height: 36,
    padding: 4,
    marginTop: 10,
    marginBottom: 5,
    flex: 4,
    fontSize: 15,
    borderWidth: 1
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#48BBEC',
    //borderColor: '#48BBEC',
    borderWidth: 1,
    //borderRadius: 8,
    marginTop: 25,
    //marginRight: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    //fontSize: 18,
    //color: 'white',
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
  name_picker: {
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    borderColor: '#CCC',
    backgroundColor: '#48BBEC'
  },
  input: {
    height: 40,
    width: 180,
    justifyContent: 'center',
    padding: 5,
    //borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10
  },
  header: {
    //position: 'absolute',
    //top: 0,
    //left: 0,
    //right: 0,
    height: 50,
    //paddingLeft: 30,
    //paddingRight: 30,
    //marginTop: 65,
    //marginBottom: 30,
    borderBottomWidth: 1,
    alignItems: 'center',
    //backgroundColor: '#48BBEC',
    justifyContent: 'center'
  },
  cancel: {
    //borderWidth: 1,
    position: 'absolute',
    top: 20,
    left: 20,
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancel_text: {
    //borderWidth: 1,
    //fontSize: 18,
    //color: 'white',
    alignSelf: 'center'
  }
});

module.exports = FoodDetailView;
