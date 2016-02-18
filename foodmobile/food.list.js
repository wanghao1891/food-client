/**
 * Show the food infomation
 */

'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  RecyclerViewBackedScrollView,
  TouchableOpacity
} from 'react-native';

var moment = require('moment');
var Popover = require('./popover');

function render() {
  return (
      <View style={{flex: 1}}>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>Welcome! {this.props.username}</Text>

      <TouchableOpacity
    style={styles.filter_food}
    ref='button'
    onPress={this.show_popover}
    underlayColor='#99d9f4'>
      <Text style={styles.filter_food_text}>v</Text>
      </TouchableOpacity>

      <Popover
    isVisible={this.state.popover_isvisible}
    fromRect={this.state.popover_rect}
    onClose={this.close_popover}
      >
      <Text>popover</Text>
      </Popover>

      <TouchableOpacity style={styles.create_food}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.create_food_text}>+</Text>
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
    loaded: false,
    popover_isvisible: false,
    popover_rect: {}
  };
}

function show_popover() {
  this.refs.button.measure((ox, oy, width, height, px, py) => {
    this.setState({
      popover_isvisible: true,
      popover_rect: {x: px, y: py, width: width, height: height}
    });
  });
}

function close_popover() {
  this.setState({popover_isvisible: false});
}

function render_row(e) {
  return (
      <View style={styles.list_element_view}>
      <Text style={{width: 80}}>{e.name}</Text>
      <Text style={{width: 80}}>{e.purchase_date ? moment.unix(e.purchase_date/1000).format('MM/DD/YYYY') : ''}</Text>
      <Text> - </Text>
      <Text style={{width: 80}}>{e.expiration_date ? moment.unix(e.expiration_date/1000).format('MM/DD/YYYY') : ''}</Text>
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
  create_food: create_food,
  show_popover: show_popover,
  close_popover: close_popover
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
//    flex: 2,
//    flexDirection: 'row',
    marginTop: 60,
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
  filter_food: {
    position: 'absolute',
    top: 20,
    left: 20,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filter_food_text: {
    fontSize: 28,
    color: 'white',
    alignSelf: 'center'
  },
  create_food: {
    position: 'absolute',
    top: 20,
    //left: 0,
    right: 20,
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
  create_food_text: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

module.exports = ShowView;
