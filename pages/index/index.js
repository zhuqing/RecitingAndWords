//index.js
//获取应用实例
const app = getApp()
const utils = require("../../utils/util.js")

Page({
  data: {
    httpurl: app.globalData.HOST,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    contentList: []
  
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
    this.setData({ httpurl: app.globalData.HOST });
    this.loadData()
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

//点击标题或图片事件
  contentTitleTap:function(e){
 
    var id = e.currentTarget.dataset['id']
    var title = e.currentTarget.dataset['title']
    var widthImagePath = e.currentTarget.dataset['image']
    var awesomeNum = e.currentTarget.dataset['awesome']

    wx.navigateTo({
      url: '../contentInfo/contentInfo?id=' + id + '&title=' + title + '&widthImagePath=' + widthImagePath + '&awesomeNum=' + awesomeNum
    })
  },


  loadData:function(){
    wx.showToast({
      title: '数据加载中...', 
    }) 
    var that = this 
    wx.request({
      url: app.globalData.HOST+'english/content/findAll',
      method:'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        console.log(res.data.data) 
        var datas = JSON.parse(res.data.data)
        for(var i = 0 ; i < datas.length ; i++){
          //对每个Content缓存
          wx.setStorageSync(datas[i].id, datas[i])
          datas[i].createDateFormate = utils.formatTime(datas[i].createDate, 'Y/M/D h:m:s')
        }
        that.setData({ contentList: datas })
      }
    })
  }
})
