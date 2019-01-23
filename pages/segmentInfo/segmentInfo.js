// pages/segmentInfo/segmentInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    segmentId:'',
    title:'',
    segemntItems:[]
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

  }
})