var React = require('react');
import Icon from 'react-native-vector-icons/Ionicons';
var Video = require('react-native-video').default;
import Button from 'react-native-button';

var RN = require('react-native');
var StyleSheet = RN.StyleSheet;
var Text = RN.Text;
var View = RN.View;
var Dimensions = RN.Dimensions;
var ActivityIndicator = RN.ActivityIndicator;
var TouchableOpacity = RN.TouchableOpacity;
var ScrollView = RN.ScrollView;
var Image = RN.Image;
var ListView = RN.ListView;
var TextInput = RN.TextInput;
var Modal = RN.Modal;
var AlertIOS = RN.AlertIOS;

var config = require('../common/config');
var request = require('../common/request');

// 获取屏幕宽度
var width = Dimensions.get('window').width;

// 存放取得的数据
var cachedResults = {
  nextPage:1,
  items:[],
  total:0
};

var Detail = React.createClass({
  getInitialState() {
    var data = this.props.data;
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      // 视频数据
      data:data,
      // 评论数据
      dataSource:ds.cloneWithRows([]),

      // 是否出错
      videoOk:true,
      // video loads，显示菊花
      videoLoaded:false,
      // 播放按钮
      playing:false,
      // 暂停
      paused:false,
      // 进度条
      videoProgress:0.01,
      videoTotal:0,
      currentTime:0,
      // video player
      rate:1,
      muted:true,
      resizeMode:'contain',
      repeat:false,

      // modal
      content:'',
      animationType:'none',
      modalVisible:false,
      // 评论
      isSending:false,
    }
  },
  // 返回上一页
  _pop(){
    this.props.navigator.pop();
  },

  _onLoadStart(){
    console.log('load start');
  },
  _onLoad(){
    console.log('loads');
  },
  _onProgress(data){
    console.log(data);
    // console.log('progress');
    // 设置菊花消失
    if(!this.state.videoLoaded){
      this.setState({
        videoLoaded: true,
      })
    }
    // 进度条
    var duration = data.playableDuration;
    var currentTime = data.currentTime;
    var percent = Number((currentTime / duration).toFixed(2));
    var newState = {
      videoTotal:duration,
      currentTime:Number(data.currentTime.toFixed(2)),
      videoProgress:percent,
    }
    if(!this.state.videoLoaded){
      newState.videoLoaded = true;
    }
    // 重复播放按钮
    if(!this.state.playing && currentTime <= duration){
      newState.playing = true;
    }
    this.setState(newState);
  },
  _onEnd(){
    console.log('end');
    this.setState({
      videoProgress:1,
      playing:false,
    });
  },
  _onError(e){
    this.setState({
      videoOk:false
    });
    console.log(e);
    console.log('error');
  },
  _rePlay(){
    this.refs.videoPlayer.seek(0);
  },
  _pause(){
    if(!this.state.paused){
      this.setState({
        paused:true
      })
    }
  },
  _resume(){
    if(this.state.paused){
      this.setState({
        paused:false
      })
    }
  },

  componentDidMount() {
    this._fetchData();
  },

  // 获取数据
  _fetchData(page) {
    // 设置 this 指向
    var that = this;
    
    this.setState({
      isRefreshing:true
    })
    
    // 使用 common 中封装的异步获取数据方法
    request.get(config.api.base + config.api.comment,{
        creation:124,
        accessToken:'123a',
        page:page
      })
      .then((data) => {
        if(data.success){
          // 将获取的数据追加到 cachedResults 中
          var items = cachedResults.items.slice();

          items = items.concat(data.data);
          cachedResults.nextPage += 1;
          cachedResults.items = items;
          cachedResults.total = data.total;
          
          that.setState({
            isLoadingTail:false,
            dataSource:that.state.dataSource.cloneWithRows(cachedResults.items)
          });
        }
      })
      .catch((error) => {
        this.setState({
          isLoadingTail:false
        });
        console.warn(error);
      });
  },

  // 是否还有更多数据
  _hasMore() {
    return cachedResults.items.length < cachedResults.total;
  },

  // 获取更多数据
  _fetchMoreData() {
    if(!this._hasMore() || this.state.isLoadingTail){
      return;
    }
    var page = cachedResults.nextPage;
    this._fetchData(page);
  },

  // 刷新
  _onRefresh() {
    if(this._hasMore() || this.state.isRefreshing){
      return;
    }
    this._fetchData(0);
  },

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

  },

  _renderRow(row){
    return (
      <View key={row._id} style={styles.replyBox}>
        <Image style={styles.replyAvatar} source={{uri:row.replyBy.avatar}} />
        <View style={styles.reply}>
          <Text style={styles.replyNickname}>{row.replyBy.nickname}</Text>
          <Text style={styles.replyContent}>{row.content}</Text>
        </View>
      </View>
    )
  },

  _focus(){
    this._setModalVisible(true);
  },
  _blur(){

  },
  _closeModal(){
    this._setModalVisible(false);
  },
  _setModalVisible(isVisible){
    this.setState({
      modalVisible:isVisible
    })
  },

  _renderHeader(){
    var data = this.state.data;
    return (
      <View style={styles.listHeader}>
        <View style={styles.infoBox}>
          <Image style={styles.avatar} source={{uri:data.author.avatar}} />
          <View style={styles.descBox}>
            <Text style={styles.nickname}>{data.author.nickname}</Text>
            <Text style={styles.title}>{data.title}</Text>
          </View>
        </View>
        <View style={styles.commentBox}>
          <View style={styles.comment}>
            <TextInput
              placeholder='敢不敢评论一个...'
              style={styles.content}
              multiline={true}
              onFocus={this._focus}
            />
          </View>
        </View>
        <View style={styles.commentArea}>
          <Text style={styles.commentTitle}>精彩评论</Text>
        </View>
      </View>
    );
  },
  _submit(){
    var that = this;
    if(!this.state.content){
      return AlertIOS.alert('留言不能为空');
    }
    if(this.state.isSending){
      return AlertIOS.alert('正在评论中');
    }

    this.setState({
      isSending:true
    },function(){
      var body = {
        accessToken:'abc',
        creation:'123',
        content:this.state.content
      }
      var url = config.api.base + config.api.comment;

      request.post(url,body)
        .then(function(data){
          if(data&&data.success){
            var items = cachedResults.items.slice();
            var content = that.state.content;

            items = [{
              content: that.state.content,
              replyBy:{
                avatar:'http://www.csxiaoyao.com/src/img/logo.png',
                nickname:"sunshine"
              }
            }].concat(items);

            cachedResults.items = items;
            cachedResults.total = cachedResults.total+1;

            that.setState({
              content:'',
              isSending:false,
              dataSource:that.state.dataSource.cloneWithRows(cachedResults.items)
            });

            that._setModalVisible(false);
          }
        })
        .catch((err)=>{
          console.log(err);
          that.setState({
            isSending:false
          })
          that._setModalVisible(false);
          AlertIOS.alert('留言失败，稍后重试');
        })
    });
  },

  render(){
    var data = this.props.data;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBox} onPress={this._pop}>
            <Icon name='ios-arrow-back' style={styles.backIcon} />
            <Text style={styles.backText}>返回</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOflines={1}>视频详情页</Text>
        </View>
        <View style={styles.videoBox}>
          <Video
            ref='videoPlayer'
            source={{uri:data.video}}
            style={styles.video}
            volume={5}
            paused={this.state.paused}
            rate={this.state.rate}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            repeat={this.state.repeat}

            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onProgress={this._onProgress}
            onEnd={this._onEnd}
            onError={this._onError} />

            {
              // 视频出错
              !this.state.videoOk && <Text style={styles.failText}>视频出错了！很抱歉</Text>
            }

            {
              // 菊花
              !this.state.videoLoaded && 
              <ActivityIndicator color='#ee735c' style={styles.loading} />
            }

            {
              // 重播
              this.state.videoLoaded && !this.state.playing 
              ? <Icon 
                onPress={this._rePlay}
                name='ios-play'
                size={48}
                style={styles.playIcon} />
              : null
            }

            {
              // 暂停
              this.state.videoLoaded && this.state.playing
              ? <TouchableOpacity onPress={this._pause} style={styles.pauseBtn}>
                {
                  this.state.paused
                  ? <Icon onPress={this._resume} name='ios-play' size={48} style={styles.resumeIcon} />
                  : <Text></Text>
                }
              </TouchableOpacity>
              :null
            }
            <View style={styles.progressBox}>
              <View style={[styles.progressBar,{width:width*this.state.videoProgress}]}></View>
            </View>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderHeader={this._renderHeader}
          renderFooter={this._renderFooter}
          onEndReached={this._fetchMoreData}
          onEndReachedThreshold={20}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          />

          <Modal 
            animationType={'fade'}
            visible={this.state.modalVisible}
            onRequestClose={()=>{this._setModalVisible(false)}}>
            <View style={styles.modalContainer}>
              <Icon
                onPress={this._closeModal}
                name='ios-close-outline'
                style={styles.closeIcon} />

                <View style={styles.commentBox}>
                  <View style={styles.comment}>
                    <TextInput
                      placeholder='敢不敢评论一个...'
                      style={styles.content}
                      multiline={true}
                      onFocus={this._focus}
                      onBlur={this._blur}
                      defaultValue={this.state.content}
                      onChangeText={(text)=>{
                        this.setState({
                          content:text
                        })
                      }}
                    />
                  </View>
                </View>

                <Button style={styles.submitBtn} onPress={this._submit}>评论</Button>

            </View>
          </Modal>
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  modalContainer:{
    flex:1,
    paddingTop:45,
    backgroundColor:'#fff'
  },
  closeIcon:{
    alignSelf:'center',
    fontSize:30,
    color:'#ee753c'
  },
  submitBtn:{
    width:width-20,
    padding:16,
    marginTop:20,
    marginBottom:20,
    borderWidth:1,
    borderColor:'#ee753c',
    borderRadius:4,
    fontSize:18,
    color:'#ee753c'
  },
  header:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    height:64,
    paddingTop:20,
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth:1,
    borderColor:'rgba(0,0,0,0.1)',
    backgroundColor:'#fff',
  },
  backBox:{
    position:'absolute',
    left:12,
    top:32,
    width:50,
    flexDirection:'row',
    alignItems:'center'
  },
  headerTitle:{
    width:width-120,
    textAlign:'center'
  },
  backIcon:{
    color:'#999',
    fontSize:20,
    marginRight:5
  },
  backText:{
    color:'#999'
  },
  videoBox:{
    width:width,
    height:width*0.56,
    backgroundColor:'#000'
  },
  video:{
    width:width,
    height:width*0.56,
    backgroundColor:'#000'
  },
  failText:{
    position:'absolute',
    left:0,
    top:90,
    width:width,
    textAlign:'center',
    color:'#fff',
    backgroundColor:'transparent'
  },
  loading:{
    position:'absolute',
    left:0,
    top:80,
    width:width,
    alignSelf:'center',
    backgroundColor:'transparent'
  },
  progressBox:{
    width:width,
    height:2,
    backgroundColor:'#ccc'
  },
  progressBar:{
    width:1,
    height:2,
    backgroundColor:'#ff6600'
  },
  playIcon:{
    position:'absolute',
    top:90,
    left:width/2-30,
    width:60,
    height:60,
    paddingTop:8,
    paddingLeft:22,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:30,
    color:'#ed7b66'
  },
  pauseBtn:{
    position:'absolute',
    left:0,
    top:0,
    width:width,
    height:360,
  },
  resumeIcon:{
    position:'absolute',
    top:80,
    left:width/2-30,
    width:60,
    height:60,
    paddingTop:8,
    paddingLeft:22,
    backgroundColor:'transparent',
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:30,
    color:'#ed7b66'
  },
  infoBox:{
    width:width,
    flexDirection:'row',
    justifyContent:'center',
    marginTop:10
  },
  avatar:{
    width:60,
    height:60,
    marginRight:10,
    marginLeft:10,
    borderRadius:30
  },
  descBox:{
    flex:1
  },
  nickname:{
    fontSize:18
  },
  title:{
    marginTop:8,
    fontSize:16,
    color:'#666'
  },
  replyBox:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:10,
  },
  replyAvatar:{
    width:40,
    height:40,
    marginRight:10,
    marginLeft:10,
    borderRadius:20,
  },
  replyNickname:{
    color:'#666'
  },
  replyContent:{
    marginTop:4,
    color:'#666'
  },
  reply:{
    flex:1
  },
  loadingMore:{
    marginVertical:20
  },
  loadingText:{
    color:'#777',
    textAlign:'center'
  },
  listHeader:{
    marginTop:10,
    width:width,
  },
  commentBox:{
    marginTop:10,
    marginBottom:10,
    padding:8,
    width:width,
  },
  content:{
    paddingLeft:2,
    color:'#333',
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius: 4,
    fontSize:14,
    height:80
  },
  commentArea:{
    width:width,
    paddingBottom:6,
    paddingLeft:10,
    paddingRight:10,
    borderBottomWidth:1,
    borderBottomColor:'#eee'
  },
  commentTitle:{

  },

});

module.exports = Detail;