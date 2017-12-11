import React, { Component } from 'react';
import {
  TabBarIOS,
  AppRegistry,
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
class Edit extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Edit</Text>
        <FontAwesome name="qq" size={80} color="#4F8EF7" />
      </View>
    )
  }
}
class Account extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text>Account</Text>
        <FontAwesome name="weibo" size={80} color="#4F8EF7" />
      </View>
    )
  }
}
class RNStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'list'}
  }

  render() {
      return (
        <TabBarIOS tintColor="white">
          
          <Icon.TabBarItem
            iconName='ios-videocam-outline'
            selectedIconName='ios-videocam'
            selected={this.state.selectedTab === 'list'}
            onPress={() => {
              this.setState({
                selectedTab: 'list',
              });
            }}>
            <List />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            iconName='ios-recording-outline'
            selectedIconName='ios-recording'
            selected={this.state.selectedTab === 'edit'}
            onPress={() => {
              this.setState({
                selectedTab: 'edit',
              });
            }}>
            <Edit />
          </Icon.TabBarItem>
          <Icon.TabBarItem
            iconName='ios-more-outline'
            selectedIconName='ios-more'
            selected={this.state.selectedTab === 'account'}
            onPress={() => {
              this.setState({
                selectedTab: 'account',
              });
            }}>
            <Account />
          </Icon.TabBarItem>

        </TabBarIOS>
      );
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

AppRegistry.registerComponent('RNStudy', () => RNStudy);