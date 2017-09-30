/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
var React = require('react');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View
} = require("react-native");

var Son = React.createClass({
  getDefaultProps() {
    console.log("child","getDefaultProps");
  },

  getInitialState() {
    console.log("child","getInitialState");
    return {
      times:this.props.times
    }
  },
  componentWillMount() {
    console.log("child","componentWillMount");
  },
  componentDidMount() {
    console.log("child","componentDidMount");
  },
  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log("child","componentWillReceiveProps");
    this.setState({
      times:this.props.times
    })
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log("child","shouldComponentUpdate");
    return true;
  },
  componentWillUpdate(nextProps, nextState) {
    console.log("child","componentWillUpdate");
  },
  componentDidUpdate(prevProps, prevState) {
    console.log("child","componentDidUpdate");
  },
  timesReset(){
    this.props.timesReset();
  },
  timesPlus(){
    var times = this.state.times;
    times++;
    this.setState({
      times: times
    });
  },

  render() {
    console.log("child","render");
    return (
      <View style={styles.container}>
        <Text style={styles.welcome} onPress={this.timesPlus}>
          儿子：有本事揍我啊！
        </Text>
        <Text style={styles.instructions}>
          你居然揍我 {this.state.times} 次
        </Text>
        <Text style={styles.instructions} onPress={this.timesReset}>
          信不信我亲亲你
        </Text>
      </View>
    );
  }
});

//
var test = React.createClass({
  getDefaultProps() {
    console.log("father","getDefaultProps");
  },

  getInitialState() {
    console.log("father","getInitialState");
    return {
      hit:true,
      times:2
    }
  },

  componentWillMount() {
    console.log("father","componentWillMount");
  },
  componentDidMount() {
    console.log("father","componentDidMount");
  },
  shouldComponentUpdate(nextProps, nextState) {
    console.log("father","shouldComponentUpdate");
    return true;
  },
  componentWillUpdate(nextProps, nextState) {
    console.log("father","componentWillUpdate");
  },
  componentDidUpdate(prevProps, prevState) {
    console.log("father","componentDidUpdate");
  },

  timesReset() {
    this.setState({
      times:0
    })
  },
  timesPlus(){
    var times = this.state.times;
    times += 3;
    this.setState({
      times: times
    });
  },

  render() {
    console.log("father","render");
    return (
      <View style={styles.container}>
        {
          this.state.hit
          ? <Son times={this.state.times} timesReset={this.timesReset}/>
          : null
        }
        <Text style={styles.welcome} onPress={this.timesReset}>
          老子说：心情好，放你一马
        </Text>
        <Text style={styles.instructions} onPress={this.willHit}>
          到底揍不揍
        </Text>
        <Text style={styles.instructions}>
          就揍了你 {this.state.times} 次而已
        </Text>
        <Text style={styles.instructions} onPress={this.timesPlus}>
          不听话再揍你 3 次
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
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
