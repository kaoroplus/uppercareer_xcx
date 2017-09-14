 const AV = require('./utils/av-weapp-min');

AV.init({
  appId: '5q64oCbVIxab3nINcBWYPX0N-gzGzoHsz',
  appKey: 'Jh7yCtlomE6N2nfetkAsLhpD',
});





//app.js
App({
  onLaunch: function () {

    AV.User.loginWithWeapp().then(user => {
      console.log(user)
      // 调用小程序 API，得到用户信息
      //wx.openSetting({ success: (res) => { console.log(res); } });
      wx.getUserInfo({
        success: ({ userInfo }) => {
          // 更新当前用户的信息
          user.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            this.globalData.user = user
            this.globalData.userInfo = userInfo
            var userId = this.globalData.user.toJSON().objectId;
            console.log(this.globalData.userInfo)
            //更新nickname和头像url
            var _user = AV.Object.createWithoutData('_User', userId);
            var portrait = this.globalData.user.toJSON().avatarUrl;
            var nickname = this.globalData.user.toJSON().nickName;
            // 修改属性
            _user.set('nickname', nickname);
            _user.set('portrait', portrait);
            // 保存到云端
            _user.save();
          }).catch(console.error);
        },
        fail: function (res) {
          console.log(res)
        }
      })
    }).catch(error => console.error(error))



  },

  globalData:{
    userInfo:null,
    user:null
  }
})