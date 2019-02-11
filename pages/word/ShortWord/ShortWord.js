// pages/word/ShortWord/ShortWord.js
const Segment = require("../../../utils/entity/segment/Segment.js")
const ShortWord = require("../../../utils/entity/shortword/ShortWord.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shortWordList:[],
    segment:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this


    // Segment.getById(options.id,(data)=>{
    //    that.setData({
    //      segment:data
    //    })
    // })
    console.log(options.id)
    this.loadShortWord(options.id)
  },

  loadShortWord:function(segmentId){
    var that = this
    ShortWord.getBySegmentId(segmentId,(datas)=>{
      that.setData({
        shortWordList: datas
      })
    })
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

  }
})