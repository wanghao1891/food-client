/**
 * Food Client
 * https://github.com/wanghao1891/food-client
 */

'use strict';
import React, {
  AppRegistry,
  Component
} from 'react-native';

var SigninView = require('./signin');

class foodmobile extends Component {
  render() {
    return (
      <SigninView>
      </SigninView>
    );
  }
}

AppRegistry.registerComponent('foodmobile', () => foodmobile);
