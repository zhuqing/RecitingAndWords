
const Common = require("../common.js")
const FileUtil = require("../FileUtil.js")
function findWordsBySegmentId(segmentId,callback){
  wx.request({
    url: Common.getHost() +'english/word/findBySegmentId?segmentId='+segmentId,
    method:'GET',
    success:function(e){
      if(e.data.status < 0){
        return;
      }
      callback(JSON.parse(e.data.data))
    }
  })
}

function play(word,src){
  // wx.playBackgroundAudio({
  //   //播放地址
  //   dataUrl: Common.getHost() +'file/download?path='+src,
  //   title: word,
  //   //图片地址
  //   coverImgUrl: '../../icons/word_icon.png'

  // })
  console.log(src)

  FileUtil.loadFile(src,function(file){
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = file
    console.log(file)
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
  })


  


}


module.exports = {
  findWordsBySegmentId: findWordsBySegmentId,//获取段下的单词
  play: play,
}