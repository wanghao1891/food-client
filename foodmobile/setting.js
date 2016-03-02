/**
 * Configration View for IP Address
 */

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
      <View style={{flex: 1}}>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>Setting</Text>
      </View>

      <View style={styles.host}>
      <TextInput
    style={styles.input}
    onChangeText={(host) => this.setState({host})}
    value={this.state.host}
    placeholder='Host'/>

      <TouchableHighlight
    style={styles.button}
    onPress={this.show_singin_view}
    underlayColor='white'>
      <Text style={styles.button_text}>Save</Text>
      </TouchableHighlight>
      </View>

      <View style={{padding: 5}}>
      <TouchableHighlight
    style={styles.button}
    onPress={this.sign_out}
    underlayColor='white'>
      <Text style={styles.button_text}>Sign out</Text>
      </TouchableHighlight>
      </View>

      </View>
  );
}

function get_initial_state() {
  return {
    host: 'pourquoi.wang:6006'
  };
}

function show_singin_view() {
  var host = 'http://' + this.state.host;
  AsyncStorage.setItem(config.async_storage_key.host, host)
    .then(() => {
      console.log('Save host to disk:', host);

      this.props.navigator.push({
        id: 'signin',
        host: host
      });
    })
    .catch((err) => console.log('AsyncStorage error:', err.message))
    .done();
}

function sign_out() {
  AsyncStorage.removeItem(config.async_storage_key.user)
    .then(() => {
      console.log('Remove user from disk:');

      this.props.navigator.push({
        id: 'signin',
        host: 'http://' + this.state.host
      });
    })
    .catch((err) => console.log('AsyncStorage error:', err.message))
    .done();
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  show_singin_view: show_singin_view,
  sign_out: sign_out
};

var ConfigurationView = React.createClass(options);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  host: {
    flexDirection: 'row',
    marginTop: 5,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  input: {
    height: 36,
    padding: 5,
    marginRight: 5,
    flex: 4,
    fontSize: 15,
    borderWidth: 1
  },
  button: {
    height: 36,
    borderWidth: 1,
    padding: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button_text: {
    alignSelf: 'center'
  }
});

module.exports = ConfigurationView;
