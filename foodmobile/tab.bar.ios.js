/**
 * Tab Bar for iOS
 */

'use strict';

import React, {
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';

var All = require('./food.list');
var Setting = require('./setting');

function render() {
  return (
      <TabBarIOS
    barTintColor='white'
      >
      <TabBarIOS.Item
    title='Food'
    icon={require('./flux.png')}
    selected={this.state.selected_tab === 'all'}
    onPress={() => {
      this.setState({
        selected_tab: 'all'
      });
    }}
      >
      <All
    navigator={this.props.navigator}
    host={this.props.host}
    sid={this.props.sid}
    username={this.props.username}
      />
      </TabBarIOS.Item>

      <TabBarIOS.Item
    title='Setting'
    icon={require('./flux.png')}
    selected={this.state.selected_tab === 'experied'}
    onPress={() => {
      this.setState({
        selected_tab: 'experied'
      });
    }}
      >
      <Setting
    navigator={this.props.navigator}
    host={this.props.host}
    sid={this.props.sid}
    username={this.props.username}
      />
      </TabBarIOS.Item>
      </TabBarIOS>
  );
}

function get_initial_state() {
  return {
    selected_tab: 'all'
  };
}

var options = {
  render: render,
  getInitialState: get_initial_state
};

var tab_bar = React.createClass(options);

module.exports = tab_bar;
