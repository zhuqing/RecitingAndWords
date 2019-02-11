// pages/segmentInfo/segmentInfo.js

const Player = require("../../utils/player/Player.js")
const Segment = require("../../utils/entity/segment/Segment.js")
const FloatPlayer = require("../../template/player/floatplayerbutton.js")
const FileUtil = require("../../utils/FileUtil.js") 
const HeartUtil = require("../../utils/heart.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentInnerAudioContext:null,
    recorderManager:null,
    segmentId:'',
    scrollToId:"segmentId_0",
    title:'',
    segment:{},
    segemntItems:[],
    selectedIndex:-1,
    recording:false,
    playerStatus:{
      status:'STOP',

    },
   // screen_height_hasbar:100rpx,
    playAndRecordIndex:-1,
    playAndReocrdItem:{
      play_icon:"../../icons/leqi_play.png",
      record_icon:"../../icons/leqi_record.png",
      replay_icon:"../../icons/leqi_play_record.png"
    },
    simplePlayerItem:{
      bottom:50,
      right:20,
      percent:0.0,
      src:'../../icons/play_orange.png'
    },
    operationbarItems: [
      {
        id: 'return',
        icon: '../../icons/return_icon.png',
        title: '返回'
      },
      {
        id: 'word',
        icon: '../../icons/word_icon.png',
        title: '单词'
      },
      {
        id: 'shortWord',
        icon: '../../icons/shortword.png',
        title: '短语'
      },
      {
        id: 'heart',
        icon: '../../icons/heart.png',
        title: '赞'
      },
      {
        id: 'share',
        icon: '../../icons/share.png',
        title: '分享'
      },
    ]
    
  },

  itemClickHandler:function(e){
    
    this.pause()
    var index = e.currentTarget.dataset['index']
    this.setData({
      selectedIndex: index,
    })
    this.playSegmentByIndex(index)
  
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
     segmentId:options.id,
     title:options.title
   })
   this.loadData()
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.createCanvasContext("play_canvas", this)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   this.pause()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("onHide")
    this.pause()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onUnload")
    this.pause()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */


  loadData:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var that = this
    Segment.getById(this.data.segmentId, (segment)=>{
      wx.hideLoading();
      HeartUtil.heartedSegment

      var content = segment.content
     
      var datas = Segment.toSegmentItems(content)
      this.setData({
        segemntItems: datas,
        segment:segment
      })
      HeartUtil.hasHearted(segment.id, this.hasHearted)
    })
    
  },
 
  hasHearted: function (hasHearted) {
    var icon = 'operationbarItems[3].icon'
    var awesomeNum = 'operationbarItems[3].title'
    var title = "点赞"
    if (this.data.segment.awesomeNum != 0){
      title = this.data.segment.awesomeNum 
    }
  
    if (hasHearted) {
      this.setData(
        {
          [awesomeNum]: title,
          [icon]: '../../icons/heart_red.png'
        })
    } else {
      this.setData(
        {
          [awesomeNum]: title,
          [icon]: '../../icons/heart.png'
        })
    }
  },
  onclick: function (e) {
    console.log("点击了" + e.currentTarget.dataset.item.id)
    var id = e.currentTarget.dataset.item.id

    switch (id) {
      case 'return':
        this.initPlayRecord();
        this.initPlayItemBar();
        wx.navigateBack()
        break
        case 'word':
        this.toWordPage()
        break
      case 'shortWord':
        this.toShortWordPage()
        break
      case 'heart':
        HeartUtil.heartedSegment(this.data.segmentId)
        var awesomeNum = 'segment.awesomeNum'
        this.setData(
          {
            [awesomeNum]: this.data.segment.awesomeNum + 1,  
          }
        )

        this.hasHearted(true)
        break
      case 'share':
        //this.onShareAppMessage(null)
      break;
    }
  },
  onShareAppMessage:function(res){
    return {
      title: this.data.segment.title,
      path: '/pages/segmentInfo/segmentInfo?id='+this.data.segment.id,
      imageUrl: "",
      success: (res) => {
        console.log("转发成功", res);
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }


  },

  toWordPage:function(){
    wx.navigateTo({
      url: '../word/WordAndShortWord/WordAndShortWord?id=' + this.data.segmentId 
    })
  },


  toShortWordPage: function () {
    wx.navigateTo({
      url: '../word/ShortWord/ShortWord?id=' + this.data.segmentId
    })
  },

  simplePlayerClickHandler:function(e){
    console.log(this.data.playerStatus.status )
    if(this.data.playerStatus.status == 'PLAY'){

      this.pause()
      return
    }
    if(this.data.currentInnerAudioContext!=null){
      this.startPlay()
      this.data.currentInnerAudioContext.play()
      return
    }
    
    var that = this
    Segment.getById(this.data.segmentId,(s)=>{
      that.player(s.audioPath)
    });
    
  },

  startPlay:function(){
    console.log("startPlay")
    var plaustatus = 'playerStatus.status'
    var playerItem = 'simplePlayerItem.src'
    this.setData({
      [plaustatus]: 'PLAY',
      [playerItem]: '/icons/pause_orange.png'
    })
    
   

   // FloatPlayer.updateStatus(this.data.playerItem)
  },

  pause:function(){
    console.log("pause")
   if(this.data.currentInnerAudioContext != null){
     this.data.currentInnerAudioContext.pause()
   }

    var plaustatus = 'playerStatus.status'
    var playerItem = 'simplePlayerItem.src'
    this.setData({
      [plaustatus]: 'STOP',
      [playerItem]: '/icons/play_orange.png'
    })
  
    
    //FloatPlayer.updateStatus(this.data.playerItem)
  },


  player: function (path){
   
    let that = this
    wx.showLoading({
      title: '加载音频...',
    })

    this.setData({
      playAndRecordIndex: -1,
    })
    FileUtil.loadFile(path, (localPath) => {
      wx.hideLoading()
      that.startPlay()
      
      var innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = localPath
      innerAudioContext.autoplay = true
      innerAudioContext.onPlay((res)=>{

        innerAudioContext.onTimeUpdate((t) => {
          that.currentSelected(innerAudioContext.currentTime*1000,innerAudioContext.duration*1000)
          if (innerAudioContext.currentTime >= innerAudioContext.duration){
            that.pause()
          }
        })
       
      })

      that.setData({
        currentInnerAudioContext: innerAudioContext
      })
     
    })
  },


  currentSelected:function(currentTime,duration){
 
    for(var i = 0 ; i < this.data.segemntItems.length ; i++){
      var segmentItem = this.data.segemntItems[i]

      if(currentTime >= segmentItem.start && currentTime <= segmentItem.end){
        if(this.data.selectedIndex == i){
          break;
        }
        this.setData({
          selectedIndex:i,
          scrollToId:"segmentId_"+i
        })
        break
      }
    }

    var playerItem = 'playerItem.percent'
    var percent = currentTime / duration

    //console.log(percent)

    this.setData({
      [playerItem]: percent
    })
   // FloatPlayer.updateStatus(this.data.playerItem)
  },

  //播放点击的句子
  playSegmentByIndex:function(index){
    
    this.setData({
      playAndRecordIndex: index,
     
    })

    this.playingStatus()

    this.playerSegmentItem(index)

  },

//播放句子
   playerSegmentItem: function (index) {
     var segmentItem = this.data.segemntItems[index]
     var segment = this.data.segment;
    let that = this
    wx.showLoading({
      title: '加载音频...',
    })

  
     FileUtil.loadFile(segment.audioPath, (localPath) => {
      wx.hideLoading()
      
      var innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = localPath
      innerAudioContext.startTime = segmentItem.start/1000.0
      innerAudioContext.autoplay = true
    
      innerAudioContext.onPlay((res) => {

        innerAudioContext.onTimeUpdate((t) => {
          if (innerAudioContext.currentTime >= segmentItem.end / 1000.0 ){
            that.pause()
            that.startRecord(segmentItem.end - segmentItem.start)
          }
          if (innerAudioContext.currentTime >= innerAudioContext.duration) {
            that.pause()
          }
        })

      })

      that.setData({
        currentInnerAudioContext: innerAudioContext
      })

    })
  },

  startRecord:function(during){
    if(this.data.recording){
      return
    }
    console.log('==startRecord')
    this.recordingStatus()

    this.setData({
      recording:true
    })

    var that = this
    const recorderManager = wx.getRecorderManager()
    const options = {
      duration: 10000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 50
    }
    recorderManager.start(options)
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      that.setData({
        recording: false
      })
      that.playRecord(res.tempFilePath)
    })
    this.setData({
      recorderManager: recorderManager
    })


    setTimeout(function(){
      console.log("endRecord---")
      recorderManager.stop()
    }
    ,during)
  },

  playRecord:function(tempPath){
    
    this.playRecordStatus()
    var that = this

    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = tempPath
    innerAudioContext.onPlay(() => {
     
      innerAudioContext.onTimeUpdate()
    })
    innerAudioContext.onEnded((res)=>{
      console.log(res)
      that.initPlayItemBar()
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

    this.setData({
      currentInnerAudioContext: innerAudioContext
    })
  },

  initPlayItemBar:function(){
    let play_icon = "playAndReocrdItem.play_icon"
    let record_icon = "playAndReocrdItem.record_icon"
    let replay_icon = "playAndReocrdItem.replay_icon"
    this.setData({
     
      [play_icon]: "../../icons/leqi_play.png",
      [record_icon]: "../../icons/leqi_record.png",
      [replay_icon]: "../../icons/leqi_play_record.png"
    })
  },

  playRecordStatus:function(){
    let play_icon = "playAndReocrdItem.play_icon"
    let record_icon = "playAndReocrdItem.record_icon"
    let replay_icon = "playAndReocrdItem.replay_icon"
    this.setData({

      [play_icon]: "../../icons/leqi_play.png",
      [record_icon]: "../../icons/leqi_record.png",
      [replay_icon]: "../../icons/leqi_record_playing.png"
    })
  },

  recordingStatus:function(){
    let play_icon = "playAndReocrdItem.play_icon"
    let record_icon = "playAndReocrdItem.record_icon"
    let replay_icon = "playAndReocrdItem.replay_icon"
    this.setData({
     
      [play_icon]: "../../icons/leqi_play.png",
      [record_icon]: "../../icons/leqi_recording.png",
      [replay_icon]: "../../icons/leqi_play_record.png"
    })
  },

  playingStatus:function(){
    let play_icon = "playAndReocrdItem.play_icon"
    let record_icon = "playAndReocrdItem.record_icon"
    let replay_icon = "playAndReocrdItem.replay_icon"
    this.setData({
      [play_icon]: "../../icons/leqi_stop.png",
      [record_icon]: "../../icons/leqi_record.png",
      [replay_icon]: "../../icons/leqi_play_record.png"
    })
  },

  initPlayRecord:function(){
    if(this.data.currentInnerAudioContext != null){
      this.data.currentInnerAudioContext.pause()
    }

    if(this.data.recorderManager != null){
      this.data.recorderManager.pause()
    }
  },

  playAndRecordPlay:function(e){
    console.log(e)
  },
  playAndRecordRecord:function(e){
    console.log(e)
  },
  playAndRecordRePlay: function (e) {
    console.log(e)
  }

})