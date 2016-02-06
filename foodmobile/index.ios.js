/**
 * Food Client
 * https://github.com/wanghao1891/food-client
 */

'use strict';
import React, {
  AppRegistry,
  Component,
  Navigator
} from 'react-native';

var SigninView = require('./signin');
var SignupView = require('./signup');
var ShowView = require('./show');

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
    return <SigninView navigator={navigator} />;
  case 'signup':
    return <SignupView navigator={navigator} />;
  case 'show':
    return <ShowView navigator={navigator}
    sid={route.sid} />;
  default:
    return <SigninView navigator={navigator} />;
  }
}

var options = {
  render: render,
  render_scene: render_scene
};

var foodmobile = React.createClass(options);

AppRegistry.registerComponent('foodmobile', () => foodmobile);
