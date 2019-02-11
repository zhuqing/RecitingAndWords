

const Common = require("../common.js")
const User = require("../user.js")
const Utils = require("../util.js")
const FileUtil = require("../FileUtil.js")
function addContent(content){
   wx.setStorageSync(content.id , content)
}

function getContent(id){
   return wx.getStorageSync(id)
}

function findAll(callback){
  var datas = wx.getStorageSync("temp_FIND_ALL")
  if(datas){
    callback(datas)
  }

  wx.request({
    url: Common.getHost() + 'english/content/findAll',
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
    
    if(res.data.status != 0){
      return
    }
      var datas = JSON.parse(res.data.data)
      add(datas)
      wx.setStorageSync("temp_FIND_ALL", datas)
      callback(datas)
    }
  })
}

/**
 * 数据加入缓存中
 */
function add(datas) {
  for (var i = 0; i < datas.length; i++) {
    //对每个Content缓存

    var data = datas[i]
    wx.setStorageSync(data.id, data)
    data.createDateFormate = Utils.formatTime(data.createDate, 'Y/M/D h:m:s')
    console.log(data)
    FileUtil.loadTempFile(data.widthImagePath,(path)=>{
     
    data.localPath = path
    wx.setStorageSync(data.id, data)
      changeImagePath(data.id,path)
    })
  }
}

function changeImagePath(id,path ){
  var datas = wx.getStorageSync("temp_FIND_ALL")
  if (datas) {
    for(var  data in datas){
      if(data.id == id){
        data.localPath = path
      }
    }
  }
}


module.exports = {
  addContent: addContent,
  getContent: getContent,
  findAll: findAll
}
