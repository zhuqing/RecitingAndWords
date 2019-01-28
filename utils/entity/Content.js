
function addContent(content){
   wx.setStorageSync(content.id , content)
}

function getContent(id){
   return wx.getStorageSync(id)
}


module.exports = {
  addContent: addContent,
  getContent: getContent,
}
