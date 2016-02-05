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
      </View>
  );
}

function show_singup_view() {
  this.props.navigator.push({
    id: 'signup'
  });
}

function signin() {
  //this.setState({username: '456'});
  console.log('username:', this.state.username);
  console.log('password:', this.state.password);

  fetch('http://127.0.0.1:6006/api/auth/signin', {
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
    .then((responseData) => {
      /*this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
        loaded: true
       });*/
      this.props.navigator.push({id: 'show'});
      console.log(responseData);
    })
    .done();
}

var options = {
  render: render,
  show_singup_view: show_singup_view,
  signin: signin
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
