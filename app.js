//app.js
const UserUtil = require("./utils/user.js")
const FileUtil = require("./utils/FileUtil.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var that = this
    FileUtil.clearTempStorage()

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.getUserInfo({
            success: function (res) {
              var objz = {};
              objz.avatarUrl = res.userInfo.avatarUrl;
              objz.nickName = res.userInfo.nickName;
              console.log(res.userInfo);
              wx.setStorageSync('userInfo', res.userInfo);//存储userInfo
            }
          });

          UserUtil.findUnionId(res.code)
         
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    HOST:'https://www.leqienglish.com/',
    appid: 'wxcd8caacdbc65467e',//appid需自己提供，此处的appid我随机编写
    secret: '2a60000d360dba6816af1f28abe291a1',//secret需自己提供，此处的secret我随机编写

  }
})