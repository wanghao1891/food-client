/**
 * Category detail
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
      <TouchableHighlight style={styles.button}
    onPress={this.update_food}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
      </View>

      </View>
  );
}

function get_initial_state() {
  //console.log('expiration_date:', this.props.food.expiration_date);

  return {
    foodname: this.props.category.name,
    error: ''
  };
}


function on_foodname_change(event) {
  this.setState({ foodname: event.nativeEvent.text});
}

function update_food() {
  var url = this.props.host + '/api/food/configuration/' + this.props.category._id;

  //console.log('foodname:', this.state.foodname);
  //console.log('expired:', this.state.date);
  //console.log('update_food url:', url);

  fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    },
    body: JSON.stringify({
      name: this.state.foodname
    })
  })
    .then((response) => response.json())
    .then((response_data) => {
      if(response_data.code === 200) {
        this.props.navigator.push({
          id: 'category_list',
          sid: this.props.sid,
          username: this.props.username,
          host: this.props.host
        });
      } else {
        this.setState({error: 'Save failed!'});
      }
      //console.log(this.state.username);
      //console.log(response_data);
    })
    .done();
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  on_foodname_change: on_foodname_change,
  update_food: update_food
};

var FoodDetailView = React.createClass(options);

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
