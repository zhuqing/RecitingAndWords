var context = null

var createContext = function(){
  if(context){
    return context
  }
   context = wx.createCanvasContext("play_canvas")
   return context
}

var updateStatus = function(playItem){
  var context = createContext()
  updateBackground(playItem,context)
  context.drawImage(playItem.icon,10,10,40,40)
  context.draw()
  
}


var updateBackground = function (playItem,context){
  context.beginPath(); 
  context.arc(30,30,30,0,2*Math.PI)
  context.setFillStyle("darkgray")
  context.fill()
  updatePercent(playItem.percent, context)
  context.beginPath(); 
  context.arc(30, 30, 28, 0, 2 * Math.PI)
  context.setFillStyle('whitesmoke')
  context.fill()
  //
}

var updatePercent = function (percent, context){
  context.beginPath();
  context.arc(30, 30, 30, -Math.PI/2, 2 * Math.PI * percent - Math.PI/2)
  context.setFillStyle("#ed742e")
  context.fill()
}

var floatPlayerClickHandler = function(e){

}


module.exports = {
  updateStatus: updateStatus,
  floatPlayerClickHandler: floatPlayerClickHandler,
}
