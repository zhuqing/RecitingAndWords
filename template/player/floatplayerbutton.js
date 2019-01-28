var context = null
var createContext = function(){
  if(context != null){
    return context
  }
   context = wx.createCanvasContext("play_canvas", this)
   return context
}

var play = function(){
  
}

export default createContext