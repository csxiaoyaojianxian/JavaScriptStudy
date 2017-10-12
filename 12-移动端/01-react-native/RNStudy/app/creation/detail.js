var React = require('react');
import Icon from 'react-native-vector-icons/Ionicons';

var Video = require('react-native-video').default;

var RN = require('react-native');
var StyleSheet = RN.StyleSheet;
var Text = RN.Text;
var View = RN.View;
var Dimensions = RN.Dimensions;
var ActivityIndicator = RN.ActivityIndicator;
var TouchableOpacity = RN.TouchableOpacity;

// 获取屏幕宽度
var width = Dimensions.get('window').width;

var Detail = React.createClass({
  getInitialState() {
    var data = this.props.data;
    return {
      data:data,
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

      rate:1,
      muted:true,
      resizeMode:'contain',
      repeat:false,
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
      </View>
    );
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
    height:360,
    backgroundColor:'#000'
  },
  video:{
    width:width,
    height:360,
    backgroundColor:'#000'
  },
  failText:{
    position:'absolute',
    left:0,
    top:180,
    width:width,
    textAlign:'center',
    color:'#fff',
    backgroundColor:'transparent'
  },
  loading:{
    position:'absolute',
    left:0,
    top:140,
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
    top:140,
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
    top:140,
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
});

module.exports = Detail;