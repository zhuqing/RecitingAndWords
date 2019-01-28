// pages/segmentInfo/segmentInfo.js

const Player = require("../../utils/player/player.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    segmentId:'',
    title:'',
    segemntItems:[],
    selectedIndex:-1,
    playerItem:{
      imagePath:'../../icons/play_orange.png',
      bottom:10,
      right:20
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
        title: '单词/短语'
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
    
    
    console.log(e)
    var index = e.currentTarget.dataset['index']
    this.setData({
      selectedIndex: index,
    
    })

    var that = this

    wx.getSystemInfo({
      success: function(res) {
        that.setData({
       
          playerItem: {
            left:res.windowWidth-100,
            top:res.windowHeight - 100,
          }
        })
      },
    })
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

  loadData:function(){
    wx.showToast({
      title: '数据加载中...',
    })

    var that = this
    wx.request({
      url: 'https://www.leqienglish.com/segment/findById?id=' + this.data.segmentId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        console.log(res.data.data)
        var segment = JSON.parse(res.data.data)

        var content = segment.content
        that.toSegmentItems(content)
       
      }
    })
  },
  toSegmentItems:function(content){
    var contentArr = content.split("\n")
    var items = []
    for(var i = 0 ; i < contentArr.length ; i++){
      var contentEngAndCh = contentArr[i].split('>::<')
      var data = this.toSegmentItem(contentEngAndCh)
      if(data != undefined){
        items.push(data)
      }
      
    }

    this.setData({
      segemntItems: items
    })
    
    console.log(content)
  },

  toSegmentItem:function(arr){
    var segmentItem = {}
    if(arr.length == 2){
      segmentItem.ch = arr[1]
    }

    var timeAndEng = arr[0].split("-->")
    if (timeAndEng.length!=2){
      return
    }
    segmentItem.eng = timeAndEng[1];

    var timeAndEnd = timeAndEng[0].split("==>");
    if (timeAndEng.length != 2) {
      return
    }
    segmentItem.start = timeAndEnd[0]
    segmentItem.end = timeAndEnd[1]

    return segmentItem

  },
  onclick: function (e) {
    console.log("点击了" + e.currentTarget.dataset.item.id)
    var id = e.currentTarget.dataset.item.id

    switch (id) {
      case 'return':
        wx.navigateBack()
        break
        case 'word':
        this.toWordPage()
        break
      case 'heart':
        var content = wx.getStorageSync(this.data.contentId)
        HeartUtil.heartedContent(this.data.contentId)
        var awesomeNum = 'operationbarItems[2].title'
        var icon = 'operationbarItems[2].icon'
        this.setData(
          {

            [awesomeNum]: content.awesomeNum + 1,
            [icon]: '../../icons/heart_red.png'

          }
        )
        break
      case 'share':
        wx.onShareAppMessage()
    }
  },

  toWordPage:function(){
    wx.navigateTo({
      url: '../word/WordAndShortWord/WordAndShortWord?id=' + this.data.segmentId 
    })
  }

})