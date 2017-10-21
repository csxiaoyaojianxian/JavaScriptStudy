import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
} from 'react-native';
  
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        nickname:'sunshine',
        times:0
      }
    }
  }

  componentDidMount() {
    // get set remove
    AsyncStorage
      .getItem('user')
      .catch((err)=>{
        console.log(err);
        console.log('get fails');
      })
      .then((data)=>{
        console.log('data return');
        console.log(data); 
        if(data){
          data = JSON.parse(data);
        }else{
          data = this.state.user;
        }
        this.setState({
          user:data
        },function(){
          data.times++;
          var userData = JSON.stringify(data);
          AsyncStorage
            .setItem('user',userData)
            .catch(function(err){
              console.log(err);
              console.log('save fails');
            })
            .then(function(data){
              console.log(data);
              console.log('save ok');
            });
        })
      });
/*
      AsyncStorage.removeItem('user')
        .then(function(){// 即使不存在也不catch
          console.log('remove ok');
        })
*/
      // 批量操作
      AsyncStorage.multiSet([['user1','1'],['user2','2']])
        .then(function(){
          console.log('save ok');
        });
      AsyncStorage.multiGet(['user1','user2','user'])
        .then(function(data){
          console.log(data);
        });
/*
      AsyncStorage.multiRemove(['user1','user2'])
        .then(function(data){
          console.log(data);
          console.log(JSON.parse(data[2][1]));
        })
*/
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>
          {this.state.user.nickname}:{this.state.user.times}
        </Text>
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

module.exports = Account;