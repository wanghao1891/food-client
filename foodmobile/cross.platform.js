/**
 * Food Client
 * https://github.com/wanghao1891/food-client
 */

'use strict';
import React, {
  Component,
  Navigator,
  AsyncStorage,
  View,
  Text
} from 'react-native';

var SigninView = require('./signin');
var SignupView = require('./signup');
//var FoodListView = require('./food.list');
var FoodListView = require('./tab.bar');
var CreateFoodView = require('./create.food');
var Setting = require('./setting');
var FoodDetailView = require('./food.detail');
var config = require('./config');

var HOST = 'http://192.168.77.161:6006';
//var HOST = 'http://192.168.1.108:6006';

function get_initial_state() {
  return {
    initial_route: {},
    loaded: false
  };
}

function component_did_mount() {
  //console.log('component_did_mount start');

  AsyncStorage.getItem(config.async_storage_key.user)
    .then((value) => {
      var user = JSON.parse(value);
      console.log('Saved user: ', user);

      AsyncStorage.getItem(config.async_storage_key.host)
        .then((value) => {
          console.log('Saveed host:', value);

          var initial_route;
          if(user) {
            initial_route = {
              id: 'food_list',
              sid: user.sid,
              host: value || HOST,
              username: user.name
            };
          } else {
            initial_route = {
              id: 'signin',
              host: value || HOST
            };
          }
          this.setState({
            initial_route: initial_route,
            loaded: true
          });
        })
        .catch((err) => {
          console.log('AsyncStorage error:', err.message);
        })
        .done();
    })
    .catch((err) => {
      console.log('AsyncStorage error:', err.message);
    })
    .done();

  //console.log('component_did_mount end');
}

function render() {
  //console.log('render initial_route:', this.state.initial_route);
  if(this.state.loaded) {
    return (
        <Navigator
      initialRoute={this.state.initial_route}
      renderScene={this.render_scene}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
      }}
        />
    );
  } else {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading, please wait for a moment...</Text>
        </View>
    );
  }
}

function render_scene(route, navigator) {
  //console.log('render_scene route:', route);
  switch(route.id) {
  case 'signin':
    return <SigninView
    navigator={navigator}
    host={route.host}
      />;
  case 'signup':
    return <SignupView
    navigator={navigator}
    host={route.host}
      />;
  case 'food_list':
    return <FoodListView
    navigator={navigator}
    host={route.host}
    sid={route.sid}
    username={route.username}
      />;
  case 'create_food':
    return <CreateFoodView
    navigator={navigator}
    host={route.host}
    sid={route.sid}
    username={route.username}
      />;
  case 'setting':
    return <Setting
    navigator={navigator}
    host={HOST}
      />;
  case 'food_detail':
    return <FoodDetailView
    navigator={navigator}
    food={route.food}
    host={route.host}
    sid={route.sid}
      />;
  default:
    return <SigninView
    navigator={navigator}
    host={HOST}
      />;
  }
}

var options = {
  render: render,
  render_scene: render_scene,
  getInitialState: get_initial_state,
  componentDidMount: component_did_mount
};

var foodmobile = React.createClass(options);

module.exports = foodmobile;
