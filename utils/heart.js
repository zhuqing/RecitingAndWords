const User = require("./user.js")
const Common = require("./common.js")
/**
 * 点赞
 */
function heartedContent( id) {
  var userId = User.getUserId()
 
  wx.request({
    url: Common.getHost() + 'english/content/awesome?userId=' + userId + '&id=' + id,
    method: 'PUT'
  })
}

/**
 * 点赞
 */
function heartedSegment(id) {
  var userId = User.getUserId()
 // console.log(app.globalData.HOST + "\t" + userId + "\t" + id)
  wx.request({
    url: Common.getHost() + 'english/segment/awesome?userId=' + userId + '&id=' + id,
    method: 'PUT'

  })
}

/**
 * 是否已经点赞了
 */
function hasHearted(id , callback){
  var userId = User.getUserId()
  wx.request({
    url: Common.getHost() + 'userHearted/findByUserIdAndTargetId?userId=' + userId + '&targetId=' + id,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success:function(e){
      console.log(e.data)
      if(e.data.status == 0){
        callback(true)
      }else{
        callback(false)
      }
    }
  })
}

function getRed(){
  return "";
}

module.exports = {
  heartedContent: heartedContent,
  heartedSegment: heartedSegment,
  hasHearted: hasHearted,
}
