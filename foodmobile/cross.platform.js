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

var HOST = 'http://192.168.77.161:6006';
//var HOST = 'http://192.168.1.101:6006';

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
    host={HOST}
      />;
  case 'signup':
    return <SignupView navigator={navigator} />;
  case 'food_list':
    return <FoodListView
    navigator={navigator}
    host={HOST}
    sid={route.sid}
    username={route.username}
      />;
  case 'create_food':
    return <CreateFoodView
    navigator={navigator}
    host={HOST}
    sid={route.sid}
    username={route.username}
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
  render_scene: render_scene
};

var foodmobile = React.createClass(options);

module.exports = foodmobile;
