/**
 * Show the food infomation
 */

'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView
} from 'react-native';

function render() {
  return (
//      <View style={styles.container}>
//      <Text>Welcome! {this.props.sid}</Text>
//      <ListView
//    dataSource={this.state.data_source}
//    renderRow={this.render_row}
//    style={styles.list_view}
//      />
//      </View>

      <View>

      <View style={styles.container}>
      <Text>Welcome! {this.props.sid}</Text>
      </View>

      <ListView
    dataSource={this.state.data_source}
    renderRow={this.render_row}
    style={styles.list_view}
      />

      </View>
  );
}

function get_initial_state() {
  return {
    data_source: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    }),
    loaded: false
  };
}

function render_row(e) {
  return (
      <View style={styles.list_element_view}>
      <Text>{e.name}</Text>
      </View>
  );
}

function component_did_mount() {
  fetch('http://127.0.0.1:6006/api/food', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    }
  })
    .then((response) => response.json())
    .then((response_data) => {
      /*this.setState({
       dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
       loaded: true
       });*/
      console.log(response_data);

      this.setState({
        data_source: this.state.data_source.cloneWithRows(response_data.data),
        loaded: true
      });
    })
    .done();
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  render_row: render_row,
  componentDidMount: component_did_mount
};

var ShowView = React.createClass(options);

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 65,
    marginBottom: 30,
    alignItems: 'center'
  },
  list_view: {
    paddingLeft: 30,
    paddingRight: 30
    //backgroundColor: '#F5FCFF'
  },
  list_element_view: {
    flex: 1,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    marginTop: 20
  }
});

module.exports = ShowView;
