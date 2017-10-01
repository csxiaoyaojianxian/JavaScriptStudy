import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

class List extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>List</Text>
        <FontAwesome name="address-book" size={80} color="#4F8EF7" />
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

module.exports = List;