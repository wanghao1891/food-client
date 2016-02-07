/**
 * Create food
 */

'use strict';

import React, {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';

function render() {
  return (
      <View>

      <View style={styles.container}>
      <Text>Add Food</Text>
      </View>

      <View style={styles.name_container}>
      <Text>Name: </Text>
      <TextInput
    style={styles.name_input}
    onChange={this.on_foodname_change}
    value={this.state.foodname}
    placeholder='Name'
      >
      </TextInput>
      </View>

      <TouchableHighlight style={styles.button}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Add</Text>
      </TouchableHighlight>
      </View>
  );
}

function get_initial_state() {
  return {
    foodname: ''
  };
}

function on_foodname_change(event) {
  this.setState({ foodname: event.nativeEvent.text});
}

function create_food() {
  console.log('username:', this.state.username);
  console.log('password:', this.state.password);

  fetch('http://127.0.0.1:6006/api/food', {
    method: 'POST',
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
  create_food: create_food
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
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
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
