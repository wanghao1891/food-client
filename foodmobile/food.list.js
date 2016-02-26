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
  TouchableOpacity,
  ActionSheetIOS,
  Dimensions
} from 'react-native';

var moment = require('moment');
var Popover = require('./popover');
var Screen = Dimensions.get('window');
var Swipeout = require('react-native-swipeout');
var _ = require('lodash');
var CheckBox = require('./checkbox.js');

var filters = [
  'Cancel',
  'Expired',
  'Expiring',
  'Normal',
  'All',
];

//      <View style={{height: Screen.height - 120, borderBottomWidth: 1}}>
//      <ListView
//    dataSource={this.state.data_source}
//    renderRow={this.render_row}
//    style={styles.list_view}
//    renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
//    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
//      />
//      </View>
function render() {
  return (
      <View style={{flex: 1}}>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>Welcome! {this.props.username}</Text>

      <TouchableOpacity
    style={styles.filter_food}
    ref='button'
    onPress={this.show_filter}
    underlayColor='#99d9f4'>
      <Text style={styles.filter_food_text}>Filter</Text>
      </TouchableOpacity>

      <Popover
    isVisible={this.state.popover_isvisible}
    fromRect={this.state.popover_rect}
    onClose={this.close_popover}
      >

      <View style={{backgroundColor: '#48BBEC'}}>
      <TouchableHighlight>
      <Text>All</Text>
      </TouchableHighlight>
      <TouchableHighlight>

      <Text>Expiring</Text>
      </TouchableHighlight>
      <TouchableHighlight>

      <Text>Expired</Text>
      </TouchableHighlight>
      </View>

      </Popover>

      <TouchableOpacity style={styles.edit_food}
    onPress={this.edit_food}
    underlayColor='#99d9f4'>
      <Text style={styles.edit_food_text}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.create_food}
    onPress={this.create_food}
    underlayColor='#99d9f4'>
      <Text style={styles.create_food_text}>Add</Text>
      </TouchableOpacity>
      </View>

      <View style={styles.list_header}>
      <Text style={styles.list_text}>Name</Text>
      <Text style={styles.list_text}>Purchase</Text>
      <Text style={styles.list_text}>Expiration</Text>
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
    popover_rect: {},
    edit_mode: false,
    food_list: [],
    checked: false
  };
}

function show_filter() {
  ActionSheetIOS.showActionSheetWithOptions({
    options: filters,
    cancelButtonIndex: 0
  }, (button_index) => {
    this.get_food_list(filters[button_index].toLowerCase());
  });
}

function get_food_list(type) {
  if(type === 'cancel') {
    return;
  }

  var url = this.props.host + '/api/food/' + type;
  console.log('get_food_list url:', url);
  fetch(url, {
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
        food_list: response_data.data,
        loaded: true
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .done();
}

function show_food_detail(food) {
  this.props.navigator.push({
    id: 'food_detail',
    sid: this.props.sid,
    username: this.props.username,
    host: this.props.host,
    food: food
  });
}

function show_popover() {
  this.refs.button.measure((ox, oy, width, height, px, py) => {
    this.setState({
      popover_isvisible: true,
      popover_rect: {x: px, y: py + 60, width: width, height: height}
    });
  });
}

function close_popover() {
  this.setState({popover_isvisible: false});
}

function render_row(e) {
  console.log('render_row:', e);
  console.log('this.edit_mode:', this.state.edit_mode);
  if(this.state.edit_mode) {
    return (
        <View style={styles.list_element_view}>
        <CheckBox
      label=''
      checked={e.checked}
      onChange={(checked) => {
        console.log('I am checked', checked);
        this.setState({checked: true});

        var food_list = _.map(this.state.food_list, function(food) {
          if(food._id == e._id) {
            var _food = _.cloneDeep(food);
            _food.checked = true;
            return _food;
          } else {
            return food;
          }
        });

        this.setState({
          edit_mode: true,
          food_list: food_list,
          data_source: this.state.data_source.cloneWithRows(food_list)
        });
      }}
        />

        <Text style={styles.list_text}>{e.name}</Text>
        <Text style={styles.list_text}>{e.purchase_date ? moment.unix(e.purchase_date/1000).format('MM/DD/YYYY') : ''}</Text>
        <Text> - </Text>
        <Text style={styles.list_text}>{e.expiration_date ? moment.unix(e.expiration_date/1000).format('MM/DD/YYYY') : ''}</Text>

        </View>
    );
  } else {
    let swipeout_buttons = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        onPress: this.delete_food.bind(this, e)
      }
    ];

    return (
        <Swipeout
      right={swipeout_buttons}
      backgroundColor='white'
      autoClose={true}
        >
        <TouchableOpacity
      onPress={this.show_food_detail.bind(this, e)}
        >
        <View style={styles.list_element_view}>
        <Text style={styles.list_text}>{e.name}</Text>
        <Text style={styles.list_text}>{e.purchase_date ? moment.unix(e.purchase_date/1000).format('MM/DD/YYYY') : ''}</Text>
        <Text> - </Text>
        <Text style={styles.list_text}>{e.expiration_date ? moment.unix(e.expiration_date/1000).format('MM/DD/YYYY') : ''}</Text>
        </View>
        </TouchableOpacity>
        </Swipeout>
    );
  }
}

function create_food() {
  this.props.navigator.push({
    id: 'create_food',
    sid: this.props.sid,
    username: this.props.username,
    host: this.props.host
  });
}

function delete_food(food) {
  var url = this.props.host + '/api/food/' + food._id;
  console.log('delete_food url:', url);
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    }
  })
    .then((response) => response.json())
    .then((response_data) => {
      console.log(response_data);

      this.get_food_list('all');
    })
    .catch((err) => {
      console.log(err);
    })
    .done();
}

function edit_food() {
  var food_list = _.cloneDeep(this.state.food_list);
//  food_list = _.map(food_list, function(e) {
//    e.edit_mode = true;
//    //e.name = 'test';
//    //food_list.push(e);
//
//    return e;
//  });
  console.log('edit_food food_list:', food_list);
  console.log('compare:', this.state.food_list[0] === food_list[0]);
  this.setState({
    edit_mode: true,
    food_list: food_list,
    data_source: this.state.data_source.cloneWithRows(food_list)
  });
}

function component_did_mount() {
  this.get_food_list('all');
}

var options = {
  render: render,
  getInitialState: get_initial_state,
  render_row: render_row,
  componentDidMount: component_did_mount,
  create_food: create_food,
  show_popover: show_popover,
  close_popover: close_popover,
  show_filter: show_filter,
  get_food_list: get_food_list,
  delete_food: delete_food,
  show_food_detail: show_food_detail,
  edit_food: edit_food
};

var ShowView = React.createClass(options);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    //position: 'absolute',
    //top: 0,
    //left: 0,
    //right: 0,
    height: 50,
    //paddingLeft: 30,
    //paddingRight: 30,
    //marginTop: 65,
    //marginBottom: 30,
    alignItems: 'center',
    //backgroundColor: '#48BBEC',
    justifyContent: 'center'
  },
  list_header: {
//    paddingLeft: 30,
//    paddingRight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 20,
    borderBottomWidth: 1
  },
  list_text: {
    //borderWidth: 1,
    height: 26,
    width: 80
  },
  list_view: {
//    flex: 2,
//    flexDirection: 'row',
    //marginTop: 60,
    //height: 300,
    //paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30
    //backgroundColor: '#F5FCFF'
  },
  list_element_view: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
    //marginTop: 20,
    //borderWidth: 1,
    padding: 10
  },
  filter_food: {
    position: 'absolute',
    top: 20,
    left: 0,
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  filter_food_text: {
    //fontSize: 20,
    //color: 'white',
    alignSelf: 'center'
  },
  create_food: {
    position: 'absolute',
    top: 20,
    //left: 0,
    right: 0,
    //marginTop: 30,
    height: 30,
    width: 60,
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
    //fontSize: 30,
    //color: 'white',
    alignSelf: 'center'
  },
  edit_food: {
    position: 'absolute',
    top: 20,
    //left: 0,
    right: 60,
    //marginTop: 30,
    height: 30,
    width: 60,
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
  edit_food_text: {
    //fontSize: 30,
    //color: 'white',
    alignSelf: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

module.exports = ShowView;
