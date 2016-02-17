/**
 * Food Client for iOS
 * https://github.com/wanghao1891/food-client
 */

'use strict';
import React, {
  AppRegistry
} from 'react-native';

var foodmobile = require('./cross.platform');
//var foodmobile = require('./ListViewExample');

AppRegistry.registerComponent('foodmobile', () => foodmobile);
