/**
 * Singup View
 */

'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

var config = require('./config');

function render() {
  return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Food
        </Text>
      <Text style={styles.description, {fontSize: 15, marginBottom: 5}}>
          Record the detail of food
        </Text>
        <View style={styles.flowRight}>
          <TextInput
             style={styles.signInput}
             onChangeText={(username) => this.setState({username})}
            value={this.state.username}
             placeholder='Name'/>
          <TextInput
             style={styles.signInput}
             onChange={this.on_password_change}
             value={this.state.password}
             secureTextEntry={true}
             placeholder='Password'/>
        </View>
        <TouchableHighlight style={styles.button}
                            onPress={this.signup}
                            underlayColor='white'>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
      </View>
  );
}

function get_initial_state() {
  return {
    username: '',
    password: ''
  };
}

function on_username_change(event) {
  this.setState({ username: event.nativeEvent.text });
}

function on_password_change(event) {
  this.setState({password: event.nativeEvent.text});
}

function signup() {
  //this.setState({username: '456'});
  //console.log('username:', this.state.username);
  //console.log('password:', this.state.password);

  fetch(this.props.host + '/api/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })
  })
    .then((response) => response.json())
    .then((response_data) => {
      var sid = response_data.sid;

      this.props.navigator.push({
        id: 'food_list',
        sid: sid,
        username: this.state.username,
        host: this.props.host
      });

      var user = {
        name: this.state.username,
        sid: response_data.sid
      };
      AsyncStorage.setItem(config.async_storage_key.user, JSON.stringify(user))
        .then(() => console.log('Save user to disk: ', user))
        .catch((err) => console.log('AsyncStorage error:', err.message))
        .done();
    })
    .catch((err) => {
      console.warn(err);
    })
    .done();
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  signup: signup,
  on_username_change: on_username_change,
  on_password_change: on_password_change
};

var SignupView = React.createClass(options);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    //color: '#656565'
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center'
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  signInput: {
    //width: 200,
    //borderColor: '#48BBEC',
    //borderRadius: 8,
    //color: '#48BBEC'
    height: 36,
    padding: 4,
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
    marginBottom: 5,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    //fontSize: 18,
    //color: 'white',
    alignSelf: 'center'
  }
});

module.exports = SignupView;
