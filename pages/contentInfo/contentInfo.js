// pages/contentInfo/contentInfo.js
const app = getApp()
const utils = require("../../utils/util.js")
const UserUtil = require("../../utils/user.js")
const HeartUtil = require("../../utils/heart.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentId:'',
    content:{},
    title:'',
    widthImagePath:'',
    segmentList:[],
    operationbarItems: [
      {
        id:'return',
        icon: '../../icons/return_icon.png',
        title: '返回'
      },
      {
        id: 'listen',
        icon: '../../icons/listen_icon.png',
        title: '听音频'
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var awesomeNum = 'operationbarItems[2].title'
    this.setData(
      { contentId: options.id,
        widthImagePath: options.widthImagePath,
        [awesomeNum]: options.awesomeNum,
      
       title:options.title}
    )

    HeartUtil.hasHearted(options.id,this.hasHearted)
    this.loadData()
  },

  hasHearted:function(hasHearted){
    var icon = 'operationbarItems[2].icon'
   
    if(hasHearted){
      this.setData(
        {
          [icon]: '../../icons/heart_red.png'
        })
    }else{
      this.setData(
        {
          [icon]: '../../icons/heart.png'
        })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },



  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  onShareAppMessage: function () {

  },

  segmentTitleTap:function(e){
    var id = e.currentTarget.dataset['id']
    var title = e.currentTarget.dataset['title']
    wx.navigateTo({
      url: '../segmentInfo/segmentInfo?id=' + id + '&title=' + title
    })
  },

  loadData: function () {
    wx.showToast({
      title: '数据加载中...',
    }) 

    var that = this
    wx.request({
      url: app.globalData.HOST+ 'segment/findByContentId?contentId='+this.data.contentId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
       // console.log(res.data.data)
        var datas = JSON.parse(res.data.data)
       
        that.setData({ segmentList: datas })
      }
    })
  },

  onclickItem:function(e){
   // templates.onclick(e)
  },

  onclick:function(e){
    console.log("点击了" + e.currentTarget.dataset.item.id)
    var id = e.currentTarget.dataset.item.id

    switch(id){
      case 'return':
          wx.navigateBack()
          break
      case 'heart':
        var content = wx.getStorageSync(this.data.contentId)
        HeartUtil.heartedContent(this.data.contentId)
        var awesomeNum = 'operationbarItems[2].title'
        var icon = 'operationbarItems[2].icon'
        this.setData(
          {
           
            [awesomeNum]: content.awesomeNum +1,
            [icon]: '../../icons/heart_red.png'
          
          }
        )
          break
          case 'share':
            wx.onShareAppMessage()
    }
  }
})