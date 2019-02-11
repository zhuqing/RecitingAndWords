const Common = require("../../common.js")

function getBySegmentId(segmentId,callback){
  wx.request({
    url: Common.getHost() + 'shortWord/findBySegmentId?segmentId=' + segmentId,
    method: 'GET',
    success: function (e) {
      if (e.data.status < 0) {
        return;
      }
      var datas = JSON.parse(e.data.data)
     
      for(var i = 0 ; i < datas.length ; i++ ){
        var data = datas[i]
        data.sentences = []
       
        getSentenceByShortWordId(i,data.id,(index , sentences) =>{
         
          datas[index].sentences = sentences
          callback(datas)
        })
      }
     
    }
  })
}

function getSentenceByShortWordId(index,shortWordId ,callback){
  wx.request({
    url: Common.getHost() + 'sentence/findByShortWordId?shortWordId=' + shortWordId,
    method: 'GET',
    success: function (e) {
      if (e.data.status < 0) {
        return;
      }

      callback(index,JSON.parse(e.data.data))
    }
  })
}


module.exports = {
  getBySegmentId: getBySegmentId,//获取段下的单词
}