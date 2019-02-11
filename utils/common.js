let HOST = 'https://www.leqienglish.com/'
let appid = 'wxcd8caacdbc65467e'//appid需自己提供，此处的appid我随机编写
let secret= '2a60000d360dba6816af1f28abe291a1'//secret需自己提供，此处的secret我随机编写
let success = 0;
function getAppId(){
  return appid;
}

function getHost(){
   return HOST;
}

function getSecret(){
   return secret;
}

module.exports = {
  getAppId: getAppId,//保存登录的用户信息
  getSecret: getSecret,//保存开门的钥匙
  getHost: getHost,//host接口
}