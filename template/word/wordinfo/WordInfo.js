var wordInfo = {
  playWord: function (event) {
    console.log("点击了" + event.currentTarget.dataset.src)
  }
}

//导出，供外部使用
export default wordInfo