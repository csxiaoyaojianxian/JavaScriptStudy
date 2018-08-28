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

import List from './app/creation/index';
import Edit from './app/edit/index';
import Account from './app/account/index';

class RNStudy extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'list'}
  }

  render() {
    return (
      <TabBarIOS tintColor="#ee735c">
        
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          badge={5}
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