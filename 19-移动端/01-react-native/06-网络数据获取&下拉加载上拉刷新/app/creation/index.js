import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

// 获取两种字体库
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
// 封装方法处理请求
import request from '../common/request';
// 获取配置信息
import config from '../common/config';

// 获取屏幕宽度
var width = Dimensions.get('window').width;

// 存放取得的数据
var cachedResults = {
  nextPage:1,
  items:[],
  total:0
};

class List extends Component {
  constructor(props) {
    super(props);
    // ListView 初始化
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      // ListView 初始数据数组
      dataSource: ds.cloneWithRows([]),
      // 是否加载到尾部
      isLoadingTail:false,
      // 是否刷新
      isRefreshing:false,
    };
  }

  // 加载一条数据
  _renderRow(row){
    return (
      // TouchableHighlight 整体点击组件
      <TouchableHighlight>
        <View style={styles.item}>
          <Text style={styles.title}>{row.title}</Text>
          <Image /* 缩略图 */
            source={{url:row.thumb}}
            style={styles.thumb}
          >
            <Icon
              /* 播放图标 */
              name='ios-play'
              size={28}
              style={styles.play} />
          </Image>
          
          <View style={styles.itemFooter}>
            <View style={styles.handleBox}>
              <Icon
                name='ios-heart-outline'
                size={28}
                style={styles.up} />
              <Text style={styles.handleText}>喜欢</Text>
            </View>
            <View style={styles.handleBox}>
              <Icon
                name='ios-chatboxes-outline'
                size={28}
                style={styles.commentIcon} />
              <Text style={styles.handleText}>评论</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  // 组件加载完获取数据
  componentDidMount() {
    this._fetchData();
  }

  // 获取数据
  _fetchData(page) {
    // 设置 this 指向
    var that = this;
    // page = 0 刷新
    // page != 0  判断是否加载到尾部(是否正在加载数据，初始为false)
    // -- true:正在加载，不必重复加载
    // -- false:当前没有加载数据，可以加载
    if(page!=0){
      this.setState({
        isLoadingTail:true
      })
    }else{
      this.setState({
        isRefreshing:true
      })
    }
    
    // 使用 common 中封装的异步获取数据方法
    request.get(config.api.base + config.api.creations,{
        accessToken:'sunshine',
        page:page
      })
      .then((data) => {
        if(data.success){
          // 将获取的数据追加到 cachedResults 中
          var items = cachedResults.items.slice();
          // 加载数据
          if(page!=0){
            items = items.concat(data.data);
            cachedResults.nextPage += 1;
          }
          // 下拉刷新
          else{
            items = data.data.concat(items);
          }
          
          cachedResults.items = items;
          cachedResults.total = data.total;
          
          setTimeout(function(){
            if(page!=0){
              // 置后通过修改状态
              // 1.重置允许获取数据
              // 2.显示 cachedResults 中数据
              that.setState({
                isLoadingTail:false,
                dataSource:that.state.dataSource.cloneWithRows(cachedResults.items)
              });
            }else{
              that.setState({
                isRefreshing:false,
                dataSource:that.state.dataSource.cloneWithRows(cachedResults.items)
              });
            }
            
          },20);
          
        }
      })
      .catch((error) => {
        if(page!=0){
          // 获取数据失败也要重置允许获取数据
          this.setState({
            isLoadingTail:false
          })
        }else{
          this.setState({
            isRefreshing:false
          })
        }
        console.warn(error);
      });
  }

  // 是否还有更多数据
  _hasMore() {
    return cachedResults.items.length < cachedResults.total;
  }

  // 获取更多数据
  _fetchMoreData() {
    if(!this._hasMore() || this.state.isLoadingTail){
      return;
    }
    var page = cachedResults.nextPage;
    this._fetchData(page);
  }

  // 刷新
  _onRefresh() {
    if(this._hasMore() || this.state.isRefreshing){
      return;
    }
    this._fetchData(0);
  }

  // 底部状态显示切换( 菊花 / 没有更多了 )
  _renderFooter(){
    // 首次加载数据前不显示“没有更多了”
    if(!this._hasMore() && cachedResults.total != 0){
      return (
        <View style={styles.loadingMore}>
          <Text style={styles.loadingText}>没有更多了</Text>
        </View>
      );
    }

    if(!this.state.isLoadingTail){
      return <View style={styles.loadingMore} />
    }
    // 显示菊花
    return <ActivityIndicator style={styles.loadingMore} />;

  }

  render(){
    // ListView 组件
    // -- dataSource
    // -- renderRow
    // -- renderFooter 底部内容
    // -- onEndReached 到达底部触发
    // -- onEndReachedThreshold 距离底部XXX开始加载数据
    // -- refreshControl 下拉刷新
    // -- enableEmptySections 不添加会有黄色警告
    // -- showsVerticalScrollIndicator 显示滚动条
    // -- automaticallyAdjustContentInsets IOS专属属性
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>列表页面</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._fetchMoreData.bind(this)}
          onEndReachedThreshold={20}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff6600"
              title="拼命加载中..."
            />
          }
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header:{
    paddingTop:25,
    paddingBottom:12,
    backgroundColor:'#ee735c'
  },
  headerTitle:{
    color:'#fff',
    fontSize:16,
    textAlign:'center',
    fontWeight:'600'
  },
  item:{
    width:width,
    marginBottom:10,
    backgroundColor:'#fff'
  },
  thumb:{
    width:width,
    height:width*0.5,
    resizeMode:'cover'
  },
  title:{
    padding:10,
    fontSize:18,
    color:'#333'
  },
  itemFooter:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#eee'
  },
  handleBox:{
    padding:10,
    flexDirection:'row',
    width:width/2-0.56,
    justifyContent:'center',
    backgroundColor:'#fff'
  },
  play:{
    position:'absolute',
    bottom:14,
    right:14,
    width:46,
    height:46,
    paddingTop:9,
    paddingLeft:18,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:23,
    color:'#ed7b66'
  },
  handleText:{
    paddingLeft:12,
    fontSize:18,
    color:'#333'
  },
  up:{
    fontSize:22,
    color:'#333'
  },
  commentIcon:{
    fontSize:22,
    color:'#333'
  },
  loadingMore:{
    marginVertical:20
  },
  loadingText:{
    color:'#777',
    textAlign:'center'
  }
});

module.exports = List;