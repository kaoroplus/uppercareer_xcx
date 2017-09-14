// post.js
const AV = require('../../utils/av-weapp-min');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onTapAnswer: function(e) {
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

    console.log(options.extra);
    var postId = options.extra;

    var that = this;

    new AV.Query('Post')
      //.include('forQuestion')
      .include('createdBy')
      .get(postId)
      .then(function (post) {

        var content = post.get('content');
        if(content === null){

          content = '该问题未添加具体说明';

        }
        var title = post.get('title');

        content = content.replace(/<li>/g, '<p>');
        content = content.replace(/<\/li>/g, '</p>');
        console.log(content);
        WxParse.wxParse('parsedContent', 'html', content, that, 40);
        that.setData({ content });
        that.setData({ post });
        that.setData({ title });
      },

      function (error) {
        // 异常处理
        console.error(error);
      });

    var answersForPost = AV.Object.createWithoutData('forQuestion', postId);
    new AV.Query('Answer')
      .equalTo('forQuestion', answersForPost)
      .ascending('voteDiff')
      .include('createdBy')
      .find()
      .then(function (answers) {
        
        var answerArr = [];
        var answer = '';
        for (let i = 0; i < answers.length; i++) {
          answer = answers[i].get('content');
          answer = answer.replace(/<li>/g, '<p>');
          answer = answer.replace(/<\/li>/g, '</p>');
          answer = answer.trim();
          //answer = answer.substr(0, 100);
          answerArr.push(answer)

          WxParse.wxParse('reply' + i, 'html', answerArr[i], that);
          if (i === answers.length - 1) {
            WxParse.wxParseTemArray("replyTemArray", 'reply', answers.length, that)
          }

        }
        that.setData({ answers });
      },

      function (error) {
        // 异常处理
        console.error(error);
      });

  
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
  onShareAppMessage: function () {
  
  }
})