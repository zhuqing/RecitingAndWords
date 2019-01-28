
const Common = require("../common.js")

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


  const innerAudioContext = wx.createInnerAudioContext()
  innerAudioContext.autoplay = true
  //innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
  // innerAudioContext.src = './source/夜场.mp3'
  // innerAudioContext.src = './source/dj.wav'
  innerAudioContext.src = Common.getHost() + 'file/download?path=' + src,
    console.log(Common.getHost() + 'file/download?path=' + src)
  innerAudioContext.onPlay(() => {
    console.log('开始播放')
  })


}


module.exports = {
  findWordsBySegmentId: findWordsBySegmentId,//获取段下的单词
  play: play,
}