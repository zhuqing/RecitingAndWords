const Common = require("../../common.js")
const Utils = require("../../util.js")
//
/**
 * 文章ID获取文章下的段集合,先从缓存中获取数据
 */
function getSegmentByContentId(contentId, callback) {
  
  var datas = wx.getStorageSync("segment" + contentId)
  if (datas) {
    callback(datas)
  }


  wx.request({
    url: Common.getHost() + 'segment/findByContentId?contentId=' + contentId,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function(res) {
      if (res.status != Common.success) {
        return;
      }
      var datas = JSON.parse(res.data.data)
      callback(datas)
      wx.setStorageSync("segment" + contentId, datas)
      add(datas)
    }
  })
}

/**
 * 根据ID获取数据
 */
function getById(segmentId,callback){

  var data = wx.getStorageSync(segmentId)
  if (data) {
    callback(data)
    return;
  }

  wx.request({
    url: Common.getHost() + 'segment/findById?id=' + segmentId,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      if (res.status != Common.success) {
        return;
      }
      var data = JSON.parse(res.data.data)
      callback(data)
      wx.setStorageSync(data.id, data)
 
    }  
  })

}
/**
 * 把内容按句子分段
 */
function toSegmentItems(content) {
  var contentArr = content.split("\n")
  var items = []
  for (var i = 0; i < contentArr.length; i++) {
    var contentEngAndCh = contentArr[i].split('>::<')
    var data = toSegmentItem(contentEngAndCh)
    if (data != undefined) {
      items.push(data)
    }

  }

  return items
}


function toSegmentItem(arr) {
  console.log(arr)
  var segmentItem = {}
  if (arr.length == 2) {
    segmentItem.ch = arr[1]
  }

  var timeAndEng = arr[0].split("-->")
  if (timeAndEng.length != 2) {
    return
  }
  segmentItem.eng = timeAndEng[1];

  var timeAndEnd = timeAndEng[0].split("==>");
  if (timeAndEng.length != 2) {
    return
  }
  
  segmentItem.start = parseFloat(timeAndEnd[0])
  segmentItem.end = parseFloat(timeAndEnd[1])

  return segmentItem

}
/**
 * 数据都加入缓存中
 */
function add(datas){
  for(var i = 0 ; i < datas.length ; i++){
    var data = datas[i]
    data.createDateFormate = Utils.formatTime(data.createDate, 'Y/M/D h:m:s')
    wx.setStorageSync(data.id, data)
  }
}

module.exports = {
  getSegmentByContentId: getSegmentByContentId,
  getById: getById,
  toSegmentItems: toSegmentItems,
}