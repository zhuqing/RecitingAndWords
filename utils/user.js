const app = getApp()
const Common = require("./common.js")

let HOST = 'https://www.leqienglish.com/'
let appid = 'wxcd8caacdbc65467e'//appid需自己提供，此处的appid我随机编写
let secret = '2a60000d360dba6816af1f28abe291a1'//secret需自己提供，此处的secret我随机编写
let USER_DATA = 'USER_DATA';

function login(unionId){
  var l = Common.getHost() + 'user/findUserByOtherSysId?otherSysId=' + unionId
  wx.request({
    url: l,
    data: {},
    header: {
      'Content-Type': 'application/json'
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    success: function (res) {
      var obj = {};
      //没找到用户需要注册
      if(res.data.status == -1){
        userRegist()
        return;
      }
      var user = JSON.parse(res.data.data)
      wx.setStorageSync(USER_DATA, user)
      console.log(user);
    }
  });
}

function userRegist(){
  var userInfo = wx.getStorageSync('userInfo')
  var user = wx.getStorageSync('user')
 
  wx.request({
    url: HOST+'user/regist',
    data:{
      name:userInfo.nickName,
      sex:userInfo.gender,
      otherSysId: user.unionid,
      type:4,//小程序
      imagePath: avatarUrl
    },
    method:'POST',
    success:function(e){
      if (res.data.status == -1) {
        return;
      }
    }
  })
}

/**
 * 获取用户的ID
 */
function getUserId(){
  var user = wx.getStorageSync(USER_DATA)
  if(user != null){
    return user.id;
  }

  return "";
}

function hasLogin(){

}

function findUnionId(code){
 
  var l = HOST + 'wechatCheck/getUserInfo?appid=' + appid + '&secret=' + secret + '&jsCode=' + code + '&grantType=authorization_code';
  wx.request({
    url: l,
    data: {},
    header: {
      'Content-Type': 'application/json'
    },
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    // header: {}, // 设置请求的 header  
    success: function (res) {
      var obj = {};
      var resultStr = res.data.data
      resultStr = resultStr.substring(1, resultStr.length - 1).replace(/\\/g, '');

      var result = JSON.parse(resultStr)
      obj.openid = result.openid;
      obj.unionid = result.unionid;
      obj.expires_in = Date.now() + result.expires_in;
      console.log(obj);
      login(obj.unionid)
      wx.setStorageSync('user', obj);//存储openid  
    }
  });
}


module.exports = {
   login:login,
  findUnionId: findUnionId,
  getUserId: getUserId,
}