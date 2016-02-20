/**
 * Tab Bar for iOS
 */

'use strict';

import React, {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Image
} from 'react-native';

var All = require('./food.list');

import TabNavigator from 'react-native-tab-navigator';

function render() {
  return (
      <TabNavigator>
      <TabNavigator.Item
    selected={this.state.selected_tab === 'all'}
    title='Food'
    renderIcon={() => <Image source={require('./flux.png')} />}
    badgeText='1'
    onPress={() => this.setState({ selected_tab: 'all' })}>
      <All
    navigator={this.props.navigator}
    host={this.props.host}
    sid={this.props.sid}
    username={this.props.username}
      />
      </TabNavigator.Item>
      <TabNavigator.Item
    selected={this.state.selected_tab === 'me'}
    title='Me'
    renderIcon={() => <Image source={require('./flux.png')} />}
    onPress={() => this.setState({ selected_tab: 'me' })}>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>Coming soon!</Text>
      </View>
      </TabNavigator.Item>
      </TabNavigator>
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
