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
  TouchableHighlight
} from 'react-native';

function render() {
  return (
      <View style={styles.container}>
      <Text style={styles.description}>
      Food
    </Text>
      <Text style={styles.description}>
      Record the detail of food
    </Text>
      <View style={styles.flowRight}>
      <TextInput
    style={styles.signInput}
    onChangeText={(username) => this.setState({username})}
    value={this.props.username}
    placeholder='Name'/>
      <TextInput
    style={styles.signInput}
    onChange={this.on_password_change}
    value={this.props.password}
    secureTextEntry={true}
    placeholder='Password'/>
      </View>
      <TouchableHighlight style={styles.button}
    onPress={this.signin}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Sign in</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}
    onPress={this.show_singup_view}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Sign up</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button}
    onPress={this.show_configuration_view}
    underlayColor='#99d9f4'>
      <Text style={styles.buttonText}>Setting</Text>
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

function show_singup_view() {
  this.props.navigator.push({
    id: 'signup',
    host: this.props.host
  });
}

function show_configuration_view() {
  this.props.navigator.push({
    id: 'configuration'
  });
}

function signin() {
  console.log('username:', this.state.username);
  console.log('password:', this.state.password);
  console.log('host:', this.props.host);

  fetch(this.props.host + '/api/auth/signin', {
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
      console.log(this.state.username);
      console.log(response_data);

      this.props.navigator.push({
        id: 'food_list',
        sid: response_data.sid,
        username: this.state.username,
        host: this.props.host
      });
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
  show_configuration_view: show_configuration_view
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
    textAlign: 'center',
    color: '#656565'
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  signInput: {
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

module.exports = SigninView;
