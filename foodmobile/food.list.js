/**
 * Show the food infomation
 */

'use strict';

var moment = require('moment');

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
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
      <Text>Welcome! {this.props.username}</Text>
      </View>

      <TouchableHighlight style={styles.create_food}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.button_text}>Add</Text>
      </TouchableHighlight>

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
      <Text>{e.name} {moment.unix(e.expiration_date/1000).format('YYYY-MM-DD')}</Text>
      </View>
  );
}

function create_food() {
  this.props.navigator.push({
    id: 'create_food',
    sid: this.props.sid,
    username: this.props.username
  });
}

function component_did_mount() {
  fetch(this.props.host + '/api/food', {
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
  componentDidMount: component_did_mount,
  create_food: create_food
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
  },
  create_food: {
    height: 30,
    width: 50,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 5,
    marginLeft: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  button_text: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = ShowView;