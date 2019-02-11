//index.js
//获取应用实例
const app = getApp()
const utils = require("../../../utils/util.js")
const Content = require("../../../utils/entity/Content.js")
const Segment = require("../../../utils/entity/segment/Segment.js")
Page({
  data: {
    httpurl: app.globalData.HOST,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    playStatus: 'STOP',
    currentPlayIndex: -1,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    contentList: [],
    playBarItem: {
      play_icon: "../../../icons/play_orange.png",
      max:100
    }
  },

  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      httpurl: app.globalData.HOST
    });
    this.loadData()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //点击标题或图片事件
  contentTitleTap: function(e) {

    var id = e.currentTarget.dataset['id']

    wx.navigateTo({
      url: '../contentInfo/contentInfo?id=' + id
    })
  },


  loadData: function() {
    wx.showLoading({
      title: '数据加载中...',
    })
    var that = this

    Content.findAll((datas) => {
      wx.hideLoading();
      console.log(datas)
      that.setData({
        contentList: datas
      })
    })

  },

  contentPlayTap: function(e) {
    var index = e.currentTarget.dataset.index
    this.startPlay(index)
  
  },

  playOrStopPlayer: function(e) {

    if(this.data.currentPlayIndex <0){
     this.setData({
       currentPlayIndex:0
     })
    }
    if (this.data.playStatus == 'STOP') {
      this.startPlay(this.data.currentPlayIndex )
    } else {
     this.stop()
    }
  },

  nextPlayer:function(e){
    var playIndex = this.data.currentPlayIndex +1

    if (playIndex >= this.data.contentList.length) {
      playIndex = 0
    }

    this.startPlay(playIndex)
  },

  previousPlayer:function(e){
     var playIndex = this.data.currentPlayIndex-1
     if(playIndex<0){
       playIndex = this.data.contentList.length-1
     }

    this.startPlay(playIndex)
  },

  slider2change:function(e){
   console.log(e.detail.value)
  },

  startPlay:function(index){

    var icon = "../../../icons/pause_orange.png"
    var play_icons = "playBarItem.play_icon"

    this.setData({
      currentPlayIndex: index,
      playStatus: 'PLAY',
      [play_icons]: icon
    })
  },

  stop:function(e){
    var icon = "../../../icons/pause_orange.png"
    var play_icons = "playBarItem.play_icon"

    this.setData({
      playStatus: 'STOP',
      [play_icons]: icon
    })
  }

  

  
})