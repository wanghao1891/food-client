/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var url = 'localhost:';

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Component
} = React;

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
             style={styles.searchInput}
             onChangeText={(username) => this.setState({username})}
             value={this.state.username}
             placeholder='Name'/>
          <TextInput
             style={styles.searchInput}
             onChange={this.on_password_change}
             value={this.state.password}
             secureTextEntry={true}
             placeholder='Password'/>
        </View>
        <TouchableHighlight style={styles.button}
                            onPress={this.signin}
                            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableHighlight>
      </View>
  );
}

function getInitialState() {
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
      console.log(responseData);
    })
    .done();
}

var options = {
  render: render,
  getInitialState: getInitialState,
  on_username_change: on_username_change,
  on_password_change: on_password_change,
  signin: signin
};

var mobile = React.createClass(options);

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

AppRegistry.registerComponent('mobile', () => mobile);
