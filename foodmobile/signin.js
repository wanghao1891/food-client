/**
 * Singin View
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
    onPress={this.signin}
    underlayColor='white'>
      <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.button}
    onPress={this.show_singup_view}
    underlayColor='white'>
      <Text style={styles.buttonText}>Sign up</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}
    onPress={this.show_setting_view}
    underlayColor='white'>
      <Text style={styles.buttonText}>Setting</Text>
      </TouchableHighlight>
      </View>
  );
}

function get_initial_state() {
  return {
    username: 'John',
    password: '1'
  };
}

function on_username_change(event) {
  this.setState({ username: event.nativeEvent.text });
}

function on_password_change(event) {
  this.setState({password: event.nativeEvent.text});
}

function show_singup_view() {
  this.props.navigator.push({
    id: 'signup',
    host: this.props.host
  });
}

function show_setting_view() {
  this.props.navigator.push({
    id: 'setting'
  });
}

function signin() {
  //console.log('username:', this.state.username);
  //console.log('password:', this.state.password);

  var url = this.props.host + '/api/auth/signin';
  console.log('signin url:', url);

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: this.state.username,
      password: this.state.password
    })
  })
    .then((response) => response.json())
    .then((response_data) => {
      //console.log(this.state.username);
      //console.log(response_data);

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
  show_singup_view: show_singup_view,
  signin: signin,
  getInitialState: get_initial_state,
  on_username_change: on_username_change,
  on_password_change: on_password_change,
  show_setting_view: show_setting_view
};

var SigninView = React.createClass(options);

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    //color: '#656565'
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
    //color: '#48BBEC',
    borderWidth: 1,
    //borderBottomWidth: 1,
    //borderLeftWidth: 1,
    //borderRightWidth: 1,
    justifyContent: 'center',
    textAlign: 'center',
    height: 36,
    padding: 4,
    marginBottom: 5,
    flex: 4,
    fontSize: 15
  },
  button: {
    height: 36,
    //width: 60,
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#48BBEC',
    //borderColor: '#48BBEC',
    //borderBottomWidth: 1,
    //borderLeftWidth: 1,
    //borderRightWidth: 1,
    //borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    //marginTop: 20,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    //fontSize: 18,
    //color: 'white',
    alignSelf: 'center'
  }
});

module.exports = SigninView;
