// pages/contentInfo/contentInfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentId:'',
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
    this.setData(
      { contentId: options.id,
        widthImagePath: options.widthImagePath,
       title:options.title}
    )

    this.loadData()
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
      url: 'https://www.leqienglish.com/segment/findByContentId?contentId='+this.data.contentId,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.hideToast();
        console.log(res.data.data)
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
          case 'share':
        wx.onShareAppMessage()
    }
  }
})