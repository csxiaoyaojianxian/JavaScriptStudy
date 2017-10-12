import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

class Detail extends Component {
  // 返回上一页
  _backToList(){
    this.props.navigator.pop();
  }
  render(){
    var row = this.props.row;
    return (
      <View style={styles.container}>
        <Text onPress={this._backToList.bind(this)}>详情页面，参数{row._id}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

module.exports = Detail;