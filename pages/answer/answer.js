// answer.js
var util = require('../../utils/util.js')
const AV = require('../../utils/av-weapp-min');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment:'',
    answerId:'',
    title:'',
    hidden: false,
  
  },


  backward: function() {
    wx.navigateBack({
      delta: 1
    })

  },

  home: function () {
    wx.switchTab({
      url: '../index/index'
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var answerId = options.extra;
    console.log(answerId);
    this.setData({
      answerId: answerId
    });
    var that = this;

    new AV.Query('Answer')
      .include('forQuestion')
      .include('createdBy')
      .get(answerId)
      .then(function (answer) {

        var content = answer.get('content');
        var question = answer.get('forQuestion');
        var title = question.get('title');

        content = content.replace(/<li>/g, '<p>');
        content = content.replace(/<\/li>/g, '</p>');
        WxParse.wxParse('parsedContent', 'html', content, that, 40);
        that.setData({ content });
        that.setData({ answer });
        that.setData({
          title:title
        })
        that.setData({
          hidden: true
        });
      },

      function (error) {
        // 异常处理
        console.error(error);
      });

    //viewCount计数器+1
    var answer = AV.Object.createWithoutData('Answer', answerId);
    // 修改属性
    answer.increment('viewCount', 1);
    // 保存到云端
    answer.save();

    //如果登陆，记录浏览数据
    if (app.globalData.userInfo === null) {

    }
    else {
      var user = new AV.Query('Browse_History');
      var historyUser = AV.Object.createWithoutData('_User', app.globalData.user.toJSON().objectId);
      user.equalTo('forUser', historyUser);
      

      var answer = new AV.Query('Browse_History');
      var historyAnswer = AV.Object.createWithoutData('Answer', answerId);
      answer.equalTo('forAnswer', historyAnswer);

      new AV.Query
        .and(user,answer)
        .find()
        .then(function (history) {
          that.setData({ history });
          if(history.length > 0){
            var historyId = history[0].get('objectId');
            console.log(historyId);
            var updateHistory = AV.Object.createWithoutData('Browse_History', historyId);
            updateHistory.save();
          }
          else{
            console.log('newhistory')
            var browseHistory = new AV.Object('Browse_History');// 构建 History 对象
            var targetUser = AV.Object.createWithoutData('_User', app.globalData.user.toJSON().objectId);
            browseHistory.set('forUser', targetUser);
            var targetAnswer = AV.Object.createWithoutData('Answer', answerId);
            browseHistory.set('forAnswer', targetAnswer);
            browseHistory.save();//保存到云端
          }

          
        },

        function (error) {
          // 异常处理
          console.error(error);
        });
     
    }


    var commentsForAnswer = AV.Object.createWithoutData('forAnswer', answerId);
    new AV.Query('Comment')
      .equalTo('forAnswer', commentsForAnswer)
      .descending('createdAt')
      .include('createdBy')
      .find()
      .then(comments => this.setData({ comments }))
      .catch(console.error);
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '（尚职）' + this.data.title,
      path: '/pages/answer/answer?extra=' + this.data.answerId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }



  
  },

})



  /* 评论代码
  commentInput:function(e){
    this.setData({
      comment: e.detail.value
    });
  },



  send:function(e){

    //未登录则弹出登陆框
    if (app.globalData.userInfo === null) {
      wx.showToast({
        title: '未登陆',
        icon: 'success',
        duration: 2000
      })
    }
    else{
      if(this.data.comment.length != 0) {
        var createdBy = '59926daca22b9d00570d778c';// 小程序预设用户
        var forAnswer = this.data.answerId;
        var commentBody = this.data.comment;
        console.log(createdBy);
        console.log(forAnswer);
        console.log(commentBody);

        var comment = new AV.Object('Comment');// 构建 Comment 对象
        comment.set('content', commentBody);
        var targetUser = AV.Object.createWithoutData('_User', createdBy);
        comment.set('createdBy', targetUser);
        var targetAnswer = AV.Object.createWithoutData('Answer', forAnswer);
        comment.set('forAnswer', targetAnswer);


        console.log(comment);

        comment.save();//保存到云端

        //计数器+1
        var answer = AV.Object.createWithoutData('Answer', forAnswer);
        // 修改属性
        answer.increment('subPostCount', 1);
        // 保存到云端
        answer.save();









  wx.showToast({
    title: '评论成功',
    icon: 'success',
    duration: 2000
  })

}
      else {


  }
    }
  },


*/
