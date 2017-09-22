// profile.js
var app = getApp();
const AV = require('../../utils/av-weapp-min');
var page = 0;


Page({
  

  /**
   * 页面的初始数据
   */
  data: {
    history:null

  },



  onTapExplore:function(){

    wx.redirectTo({
      url: '../forum/forum'
    })

  },

  onTapFind: function () {
    wx.redirectTo({
      url: '../judge/judge'
    })

  },

  onTapEvaluate: function () {
    wx.redirectTo({
      url: '../quizcover/quizcover'
    })

  },

  fetchHistory: function (itemCount) {
    var currentUser = AV.Object.createWithoutData('forUser', app.globalData.user.toJSON().objectId);
    
    new AV.Query('Browse_History')
      .addDescending('updatedAt')
      .equalTo('forUser', currentUser)
      .include('forAnswer')
      .include('forAnswer.forQuestion')
      .include('forAnswer.createdBy')
      .limit(itemCount)
      .find()
      .then(history => this.setData({ history }))
      .catch(console.error);

  },


  historyDetail: function (e) {
    var id = e.currentTarget.id;
    console.log(id);

    wx.navigateTo({
      url: '../answer/answer?extra=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

  

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    var avatarUrl = app.globalData.userInfo.avatarUrl;
    var nickName = app.globalData.userInfo.nickName;
    this.setData({nickName, avatarUrl});
    console.log(avatarUrl);
    if (app.globalData.userInfo === null) {
      AV.User.loginWithWeapp().then(user => {
        console.log(user)
        // 调用小程序 API，得到用户信息
        //wx.openSetting({ success: (res) => { console.log(res); } });
        wx.getUserInfo({
          success: ({ userInfo }) => {
            // 更新当前用户的信息
            user.set(userInfo).save().then(user => {
              // 成功，此时可在控制台中看到更新后的用户信息
              app.globalData.user = user
              app.globalData.userInfo = userInfo
              var userId = app.globalData.user.toJSON().objectId;
              console.log(app.globalData.userInfo)
              //更新nickname和头像url

              var _user = AV.Object.createWithoutData('_User', userId);
              var portrait = app.globalData.user.toJSON().avatarUrl;
              var nickname = app.globalData.user.toJSON().nickName;
              // 修改属性
              if (_user.get())
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


    }

    this.fetchHistory(20);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

    wx.stopPullDownRefresh();
    if (app.globalData.userInfo === null) {
      AV.User.loginWithWeapp().then(user => {
        console.log(user)
        // 调用小程序 API，得到用户信息
        //wx.openSetting({ success: (res) => { console.log(res); } });
        wx.getUserInfo({
          success: ({ userInfo }) => {
            // 更新当前用户的信息
            user.set(userInfo).save().then(user => {
              // 成功，此时可在控制台中看到更新后的用户信息
              app.globalData.user = user
              app.globalData.userInfo = userInfo
              var userId = app.globalData.user.toJSON().objectId;
              console.log(app.globalData.userInfo)
              //更新nickname和头像url

              var _user = AV.Object.createWithoutData('_User', userId);
              var portrait = app.globalData.user.toJSON().avatarUrl;
              var nickname = app.globalData.user.toJSON().nickName;
              // 修改属性
              if (_user.get())
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


    }
    this.fetchHistory(20)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})