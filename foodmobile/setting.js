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

      <View style={styles.user}>
      <Text style={{borderWidth: 0}}>Welcome {this.props.username}!</Text>
      </View>

      <View style={styles.host}>
      <TextInput
    style={styles.input}
    onChangeText={(host) => this.setState({host: host})}
    value={this.state.host}
    placeholder='Host'/>

      <TouchableHighlight
    style={styles.button}
    onPress={this.show_singin_view}
    underlayColor='white'
      >
      <Text style={styles.button_text}>Save</Text>
      </TouchableHighlight>
      </View>

      <View style={styles.category}>
      <TouchableHighlight
    style={styles.button}
    onPress={this.show_creating_category}
    underlayColor='white'
      >
      <View style={styles.category_view}>
      <Text style={styles.category_text_left}>Category</Text>
      <Text>></Text>
      </View>
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
    host: this.props.host || 'http://pourquoi.wang:6006',
    username: this.props.username
  };
}

function show_singin_view() {
  var host = this.state.host;
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
        host: this.state.host
      });
    })
    .catch((err) => console.log('AsyncStorage error:', err.message))
    .done();
}

function show_creating_category() {
  this.props.navigator.push({
    id: 'create_category',
    host: this.state.host,
    sid: this.props.sid
  });
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  show_singin_view: show_singin_view,
  sign_out: sign_out,
  show_creating_category: show_creating_category
};

var ConfigurationView = React.createClass(options);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  user: {
    flexDirection: 'row',
    //borderWidth: 1,
    //alignSelf: 'stretch',
    justifyContent: 'center',
    //alignItems: 'center'
    marginTop: 5,
    padding: 5
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
  },
  category: {
    //borderWidth: 1,
    marginTop: 5,
    padding: 5,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  category_view: {
    flexDirection: 'row'
  },
  category_text_left: {
    width: 250
  }
});

module.exports = ConfigurationView;
