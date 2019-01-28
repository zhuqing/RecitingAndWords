// pages/word/WordAndShortWord/WordAndShortWord.js
const WordUtil = require("../../../utils/word/Word.js")
const WordInfo = require("../../../template/word/wordinfo/WordInfo.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     wordList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.loadData(options.id)
  },

  loadData:function(id){
    var that = this
    WordUtil.findWordsBySegmentId(id,function(words){
      console.log(words)
      that.setData({
       
        wordList:words
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

  },

  playWord:function(e){
    console.log(e.currentTarget.dataset)
    WordUtil.play("word", e.currentTarget.dataset.src)
  }
})