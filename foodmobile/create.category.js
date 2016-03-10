/**
 * Create category
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
var Screen = Dimensions.get('window');
var dismiss_keyboard = require('dismissKeyboard');

function render() {
  return (
      <View>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>Add category</Text>

      <TouchableOpacity
    style={styles.cancel}
    ref='button'
    onPress={this.props.navigator.pop}
    underlayColor='#99d9f4'>
      <Text style={styles.cancel_text}>Cancel</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.item_container}>
      <Text style={{width: 80}}>Name: </Text>
      <TextInput
    style={styles.name_input}
    onChange={this.on_category_name_change}
    value={this.state.category_name}
    placeholder='Name'
      >
      </TextInput>
      </View>

      <View style={styles.item_container}>
      <TouchableHighlight style={styles.button}
    onPress={this.create_category}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
      </View>

      </View>
  );
}

function get_initial_state() {
  return {
    category_name: ''
  };
}

function create_category() {
  var url = this.props.host + '/api/food/configuration';
  console.log('create_category url:', url);

  var body = JSON.stringify({
      name: this.state.category_name,
      type: 'category'
  });
  console.log('create_category body:', body);

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    },
    body: body
  })
    .then((response) => response.json())
    .then((response_data) => {
      this.props.navigator.push({
        id: 'food_list',
        sid: this.props.sid,
        username: this.props.username,
        host: this.props.host
      });
      //console.log(this.state.username);
      //console.log(response_data);
    })
    .done();
}

function on_category_name_change(event) {
  console.log('on_category_name_change event:', event);
  this.setState({ category_name: event.nativeEvent.text});
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  create_category: create_category,
  on_category_name_change: on_category_name_change
};

var CreateCategoryView = React.createClass(options);

const styles = StyleSheet.create({
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

module.exports = CreateCategoryView;
