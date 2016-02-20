/**
 * Food Client
 * https://github.com/wanghao1891/food-client
 */

'use strict';
import React, {
  Component,
  Navigator
} from 'react-native';

var SigninView = require('./signin');
var SignupView = require('./signup');
//var FoodListView = require('./food.list');
var FoodListView = require('./tab.bar');
var CreateFoodView = require('./create.food');
var ConfigurationView = require('./configuration');

//var HOST = 'http://192.168.77.160:6006';
var HOST = 'http://192.168.1.103:6006';

function render() {
  return (
      <Navigator
    initialRoute={{ message: 'First Scene' }}
    renderScene={this.render_scene}
    configureScene={(route) => {
      if (route.sceneConfig) {
        return route.sceneConfig;
      }
      return Navigator.SceneConfigs.FloatFromBottom;
    }}
    />
  );
}

function render_scene(route, navigator) {
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
  case 'configuration':
    return <ConfigurationView navigator={navigator} />;
  default:
    return <SigninView
    navigator={navigator}
    host={HOST}
      />;
  }
}

var options = {
  render: render,
  render_scene: render_scene
};

var foodmobile = React.createClass(options);

module.exports = foodmobile;
