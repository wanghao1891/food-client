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
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  TouchableOpacity
} from 'react-native';

function render() {
  return (
      <View style={{flex: 1}}>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>Welcome! {this.props.username}</Text>

      <TouchableOpacity style={styles.create_food}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.button_text}>+</Text>
      </TouchableOpacity>
      </View>

      <ListView
    dataSource={this.state.data_source}
    renderRow={this.render_row}
    style={styles.list_view}
    renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    //paddingLeft: 30,
    //paddingRight: 30,
    //marginTop: 65,
    //marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#48BBEC',
    justifyContent: 'center'
  },
  list_view: {
    marginTop: 65,
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
    position: 'absolute',
    top: 20,
    //left: 0,
    right: 0,
    //marginTop: 30,
    height: 30,
    width: 30,
    //flex: 1,
    //flexDirection: 'row',
    //backgroundColor: '#48BBEC',
    //borderColor: '#48BBEC',
    //borderWidth: 1,
    //borderRadius: 8,
    //marginBottom: 5,
    //marginLeft: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_text: {
    fontSize: 35,
    color: 'white',
    alignSelf: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

module.exports = ShowView;
