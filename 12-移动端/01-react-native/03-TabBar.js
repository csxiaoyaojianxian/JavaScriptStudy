
var React = require('react');
var ReactNative = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  Component,
  AppRegistry,
  TabBarIOS,
  StyleSheet,
  Text,
  View
} = ReactNative;

var rn = React.createClass({

  displayName: 'TabBarExample',

  getInitialState: function() {
    return {
      selectedTab: 'blueTab',
    };
  },

  render: function() {
    return (
      <TabBarIOS tintColor="white">
        <Icon.TabBarItem
          iconName='ios-videocam-outline'
          selectedIconName='ios-videocam'
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'blueTab',
            });
          }}>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-recording-outline'
          selectedIconName='ios-recording'
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
              notifCount: this.state.notifCount + 1,
            });
          }}>
        </Icon.TabBarItem>
        <Icon.TabBarItem
          iconName='ios-more-outline'
          selectedIconName='ios-more'
          onPress={() => {
            this.setState({
              selectedTab: 'greenTab',
              presses: this.state.presses + 1
            });
          }}>
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  },

});

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

AppRegistry.registerComponent('rn', () => rn);
