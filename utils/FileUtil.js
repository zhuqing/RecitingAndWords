
const Common = require("./common.js")
//下载文件，如果本地存在，返回本地路径,不下载
function loadFile(path,callback){
 console.log(wx.getStorageInfoSync())
  
 
var filePath = wx.getStorageSync(path)
if(filePath){
  callback(filePath);
  console.log('callback' + filePath)
  return
}

  wx.downloadFile({
    url: Common.getHost() + 'file/download?path=' + path, // 仅为示例，并非真实的资源
    success(res) {
      
      if (res.statusCode === 200) {
        saveFile(path,res.tempFilePath,callback)
      }
    },
    fail(res){
      console.log("error\t"+res)
    }
  })
}

//把文件存入缓存
function saveFile(id,tempFilePath,callback){
  console.log('saveFile,id=' + id)

  wx.saveFile({
    tempFilePath: tempFilePath,
    success(res) {
      callback(res.savedFilePath)
      console.log('res.savedFilePath=' + res.savedFilePath)
      wx.setStorageSync(id, res.savedFilePath)
      console.log('id=' + id)
    },
    fail(res){
      callback(tempFilePath)
      var message = res.errMsg.toString()
      deleteOldestFile()
    }
  })
}



/**
 * 下载临时文件
 */
function loadTempFile(path, callback){
 

  var filePath = wx.getStorageSync("temp_"+path)
  if (filePath) {
    callback(filePath);
    return
  }
  wx.downloadFile({
    url: Common.getHost() + 'file/download?path=' + path, // 仅为示例，并非真实的资源
    success(res) {

      if (res.statusCode === 200) {
        callback(res.tempFilePath)
        wx.setStorageSync("temp_" + path, res.tempFilePath)
      }
    },
    fail(res) {
      console.log("error\t" + res)
    }
  })

}

/**
 * 删除一个最早加载的文件
 */
function deleteOldestFile(){
  wx.getSavedFileList({
    success: function (res) {
      var fileList = res.fileList
      var oldestFileInfo = null
      var max = 0;
      
      for(var i = 0 ; i < fileList.length ; i++){
        var fileInfo = fileList[i]
        if(fileInfo.createTime>max){
          max = fileInfo.createTime
          oldestFileInfo = fileInfo
        }
      }

      if(oldestFileInfo == null){
        return;
      }
     console.log("delete+"+oldestFileInfo.filePath)
      wx.removeSavedFile({
        filePath: oldestFileInfo.filePath,
      })
    }
  })
}

/**
 * 清除临时缓存
 */
function clearTempStorage(){
  var tempKeys = wx.getStorageInfoSync().keys
  for (var i = 0; i < tempKeys.length; i++) {
    var key = tempKeys[i]

    if (key.indexOf("temp_")==0){
      wx.removeStorageSync(key)
    }

  }
}

module.exports = {
  loadFile: loadFile,
  clearTempStorage:clearTempStorage,
  loadTempFile: loadTempFile
}