/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class test extends Component {
  constructor(props) {
    super(props);
    this.state = {times:0}
  }
  timesPlus(){
    let times = this.state.times;
    times++;
    this.setState({
      times: times
    });
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  render() {
    console.log("render");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus.bind(this)}>
          click me!
        </Text>
        <Text style={styles.instructions}>
          clicked {this.state.times} times
        </Text>
      </View>
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('test', () => test);
