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
var Popover = require('react-native-popover');
var Screen = Dimensions.get('window');
var Swipeout = require('react-native-swipeout');
var _ = require('lodash');
var CheckBox = require('react-native-checkbox');
var ActionSheet = require('@remobile/react-native-action-sheet');
var RefreshableListView = require('react-native-refreshable-listview');

var filters = [
  'Cancel',
  'Expired',
  'Expiring',
  'Normal',
  'All',
];

//      <ListView
//    dataSource={this.state.data_source}
//    renderRow={this.render_row}
//    style={styles.list_view}
//    renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
//    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
//      />

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
  var filter_button,
      category_button,
      edit_button,
      add_button,
      cancel_button,
      edit_operation_view,
      select_all_button;

  if(this.state.edit_mode) {
    filter_button = null;
    category_button = null;
    edit_button = null;
    add_button = null;

    select_all_button = (
        <TouchableOpacity style={styles.select_all}
      onPress={this.toggle_select_all}
      underlayColor='#99d9f4'>
        <Text style={styles.select_all_text}>{this.state.select_all_name}</Text>
        </TouchableOpacity>
    );

    cancel_button = (
        <TouchableOpacity style={styles.cancel}
      onPress={this.exit_edit_mode}
      underlayColor='#99d9f4'>
        <Text style={styles.cancel_text}>Cancel</Text>
        </TouchableOpacity>
    );

    edit_operation_view = (
        <View style={styles.edit_operation_view}>
        <TouchableOpacity style={styles.delete_all}
      onPress={this.delete_all}
      underlayColor='#99d9f4'>
        <Text style={styles.delete_all_text}>Delete All</Text>
        </TouchableOpacity>
        </View>
    );
  } else {
    filter_button = (
        <TouchableOpacity
      style={styles.filter_food}
      ref='button'
      onPress={this.show_filter}
      underlayColor='#99d9f4'>
        <Text style={styles.filter_food_text}>Filter</Text>
        </TouchableOpacity>
    );

    category_button = (
        <TouchableOpacity
      style={styles.category_food}
      ref='button'
      onPress={this.show_category}
      underlayColor='#99d9f4'>
        <Text style={styles.category_food_text}>Category</Text>
        </TouchableOpacity>
    );

    edit_button = (
        <TouchableOpacity style={styles.edit_food}
      onPress={this.edit_food}
      underlayColor='#99d9f4'>
        <Text style={styles.edit_food_text}>Edit</Text>
        </TouchableOpacity>
    );

    add_button = (
        <TouchableOpacity style={styles.create_food}
      onPress={this.create_food}
      underlayColor='#99d9f4'>
        <Text style={styles.create_food_text}>Add</Text>
        </TouchableOpacity>
    );

    select_all_button = null;

    cancel_button = null;

    edit_operation_view = null;
  }

  var category_action_sheet = (
      <ActionSheet
    visible={this.state.show_category_action_sheet}
    onCancel={() => this.setState({show_category_action_sheet: false})} >

      {this.state.category_list.map(function(element, index) {
        return (
            <ActionSheet.Button
          onPress={() => this.process_filter('Expired')}
          key={index}
            >
            {element.name}
          </ActionSheet.Button>
        );
      })}

      </ActionSheet>
  );

  return (
      <View style={{flex: 1}}>

      <View style={styles.header}>
      <Text style={{textAlign: 'center', marginTop: 10}}>{this.state.title}</Text>

      {filter_button}
    {category_button}
    {select_all_button}

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

      {edit_button}

    {add_button}

    {cancel_button}
      </View>

      <View style={styles.list_header}>
      <Text style={styles.list_header_text}>Name</Text>
      <Text style={styles.list_header_text}>Purchase</Text>
      <Text style={styles.list_header_text}>Expiration</Text>
      </View>

      <RefreshableListView
    dataSource={this.state.data_source}
    renderRow={this.render_row}
    style={styles.list_view}
    refreshDescription="Refreshing..."
    loadData={this.get_food_list}
    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
      />

      {edit_operation_view}

    {category_action_sheet}

      <ActionSheet
    visible={this.state.show_filter_action_sheet}
    onCancel={() => this.setState({show_filter_action_sheet: false})} >
      <ActionSheet.Button
    onPress={() => this.process_filter('Expired')}
      >Expired</ActionSheet.Button>
      <ActionSheet.Button
    onPress={() => this.process_filter('Expiring')}
      >Expiring</ActionSheet.Button>
      <ActionSheet.Button
    onPress={() => this.process_filter('Normal')}
      >Normal</ActionSheet.Button>
      <ActionSheet.Button
    onPress={() => this.process_filter('All')}
      >All</ActionSheet.Button>
      </ActionSheet>

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
    title: 'All',
    select_all_name: 'Select All',
    show_filter_action_sheet: false,
    show_category_action_sheet: false,
    category_list: []
  };
}

function process_filter(name) {
  this.get_food_list(name.toLowerCase());
  this.setState({
    show_filter_action_sheet: false,
    title: name
  });
}

function show_filter() {
  this.setState({show_filter_action_sheet: true});

  /*ActionSheetIOS.showActionSheetWithOptions({
    options: filters,
    cancelButtonIndex: 0
  }, (button_index) => {
    this.setState({title: filters[button_index]});

    this.get_food_list(filters[button_index].toLowerCase());
  });*/
}

function show_category() {
  this.setState({show_category_action_sheet: true});
}

function get_food_list(type) {
  if(type === 'cancel') {
    return;
  }

  console.log('type is:', typeof type);
  if(!type || typeof type == 'function') {
    type = this.state.title.toLowerCase();
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
      //console.log(response_data);

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

function get_configuration_list(type, callback) {
  if(type === 'cancel') {
    return;
  }

//  console.log('type is:', typeof type);
//  if(!type || typeof type == 'function') {
//    type = this.state.title.toLowerCase();
//  }

  var url = this.props.host + '/api/food/configuration/' + type;
  console.log('get_configuration_list url:', url);
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
      console.log('get_configuration_list data:', response_data);

      callback(response_data.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .done();
}

function get_category_list() {
  var self = this;
  self.get_configuration_list('category', function(data) {
    console.log('get_category_list');
    self.setState({
      category_list: data
    });
  });
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
  //console.log('render_row:', e);
  //console.log('this.edit_mode:', this.state.edit_mode);

  var list_text = (
      <View style={styles.list_text_view}>
      <Text style={styles.list_text}>{e.name}</Text>
      <Text style={styles.list_text}>{e.purchase_date ? moment.unix(e.purchase_date/1000).format('MM/DD/YYYY') : ''}</Text>
      <Text> - </Text>
      <Text style={styles.list_text}>{e.expiration_date ? moment.unix(e.expiration_date/1000).format('MM/DD/YYYY') : ''}</Text>
      </View>
  );

  if(this.state.edit_mode) {
    return (
        <View style={styles.list_element_view}>
        <CheckBox
      label=''
      checked={e.checked}
      onChange={(checked) => {
        //console.log('I am checked', checked);

        var food_list = _.map(this.state.food_list, function(food) {
          if(food._id == e._id) {
            var _food = _.cloneDeep(food);
            _food.checked = _food.checked ? false : true;
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

        {list_text}

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
      right={swipeout_buttons}x
      autoClose={true}
        >
        <TouchableOpacity
      onPress={this.show_food_detail.bind(this, e)}
        >
        <View style={styles.list_element_view}>

        {list_text}

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
  //console.log('delete_food url:', url);
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
      //console.log(response_data);

      var food_list = _.filter(this.state.food_list, function(e) {
        return (e._id !== food._id);
      });
      this.setState({
        food_list: food_list,
        data_source: this.state.data_source.cloneWithRows(food_list)
      });
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
  //console.log('edit_food food_list:', food_list);
  //console.log('compare:', this.state.food_list[0] === food_list[0]);
  this.setState({
    edit_mode: true,
    food_list: food_list,
    data_source: this.state.data_source.cloneWithRows(food_list)
  });
}

function exit_edit_mode() {
  var food_list = _.cloneDeep(this.state.food_list);

  //console.log('exit_edit_mode food_list:', food_list);
  //console.log('compare:', this.state.food_list[0] === food_list[0]);
  this.setState({
    edit_mode: false,
    food_list: food_list,
    data_source: this.state.data_source.cloneWithRows(food_list)
  });
}

function toggle_select_all() {
  var name,
      checked;
  if(this.state.select_all_name === 'Select All') {
    name = 'Unselect All';
    checked = true;
  } else {
    name = 'Select All';
    checked = false;
  }

  var food_list = _.cloneDeep(this.state.food_list);
  food_list = _.map(food_list, function(e) {
    e.checked = checked;

    return e;
  });
  //console.log('toggle_select_all food_list:', food_list);
  //console.log('toggle_select_all compare:', this.state.food_list[0] === food_list[0]);
  this.setState({
    food_list: food_list,
    data_source: this.state.data_source.cloneWithRows(food_list),
    select_all_name: name
  });
}

function delete_all() {
  var delete_object_list = _.filter(this.state.food_list, function(e) {
    return e.checked;
  });

  //console.log('delete_all delete_object_list:', delete_object_list);

  var delete_id_list = _.reduce(delete_object_list, function(result, e) {
    //console.log('result:', result);
    result.push(e._id);
    return result;
  }, []);

  //console.log('delete_all delete_id_list:', delete_id_list);

  var url = this.props.host + '/api/food';
  //console.log('delete_all url:', url);
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      sid: this.props.sid
    },
    body: JSON.stringify({food_id_list: delete_id_list})
  })
    .then((response) => response.json())
    .then((response_data) => {
      //console.log(response_data);

      //this.get_food_list('all');

      var food_list = _.filter(this.state.food_list, function(e) {
        return (delete_id_list.indexOf(e._id) == -1);
      });
      this.setState({
        food_list: food_list,
        data_source: this.state.data_source.cloneWithRows(food_list)
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .done();
}

function component_did_mount() {
  this.get_food_list('all');
  this.get_category_list();
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
  show_category: show_category,
  get_food_list: get_food_list,
  delete_food: delete_food,
  show_food_detail: show_food_detail,
  edit_food: edit_food,
  exit_edit_mode: exit_edit_mode,
  toggle_select_all: toggle_select_all,
  delete_all: delete_all,
  process_filter: process_filter,
  get_category_list: get_category_list,
  get_configuration_list: get_configuration_list
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
  list_text_view: {
    //borderWidth: 1,
    flexDirection: 'row',
    height: 26,
    justifyContent: 'center',
    alignItems: 'center'
  },
  list_text: {
    //borderWidth: 1,
    //textAlign: 'auto',
    //height: 26,
    width: 80
  },
  list_header_text: {
    //borderWidth: 1,
    //height: 26,
    width: 80
  },
  list_view: {
    //flex: 2,
    //flexDirection: 'row',
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
  category_food: {
    position: 'absolute',
    top: 20,
    left: 60,
    height: 30,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  category_food_text: {
    //fontSize: 20,
    //color: 'white',
    alignSelf: 'center'
  },
  select_all: {
    position: 'absolute',
    top: 20,
    left: 0,
    height: 30,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  select_all_text: {
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
  cancel: {
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
  cancel_text: {
    //fontSize: 30,
    //color: 'white',
    alignSelf: 'center'
  },
  edit_operation_view: {
    //position: 'absolute',
    //bottom: 49,
    //left: 0,
    //right: 0,
    //borderWidth: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopWidth: 1,
    height: 25
  },
  delete_all: {

  },
  delete_all_text: {
    alignSelf: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  }
});

module.exports = ShowView;
