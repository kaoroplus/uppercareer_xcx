// pages/judge/judge.js
const AV = require('../../utils/av-weapp-min');
var app = getApp();
var index = 0;
var judgements = [];
var currentUser = "";
var currentJudgement = "";
var judgeHistory = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    votePercent: 50,
    judgementIndex: 0,
    judgement: null,
  },

  onTapCompose: function () {

    wx.navigateTo({
      url: '../compose/compose'
    })

  },

  onTapAgree: function () {
    //投票值显示归零
    this.setData({
      votePercent: 50
    });
    //agreeCount计数器+1
    var judgement = AV.Object.createWithoutData('Judgement', currentJudgement);
    // 修改属性
    judgement.increment('agreeCount', 1);
    // 保存到云端
    judgement.save();

    var voteJudgement = new AV.Object('VoteJudgement');// 构建 Comment 对象
    voteJudgement.set('isAgree', true);
    var targetUser = AV.Object.createWithoutData('_User', currentUser);
    voteJudgement.set('createdBy', targetUser);
    var targetJudgement = AV.Object.createWithoutData('Judgement', currentJudgement);
    voteJudgement.set('forJudgement', targetJudgement);

    console.log(currentUser);
    console.log(currentJudgement);

    voteJudgement.save();

    index++;
    this.fetchJudgement(10);



  },

  onTapDisagree: function () {
    //投票值显示归零
    this.setData({
      votePercent: 50
    });
    //agreeCount计数器+1
    var judgement = AV.Object.createWithoutData('Judgement', currentJudgement);
    // 修改属性
    judgement.increment('disagreeCount', 1);
    // 保存到云端
    judgement.save();
    index++;
    this.fetchJudgement(10);



  },

  fetchJudgement: function (limit) {
    var that = this;
    new AV.Query('Judgement')
      .descending('createdAt')
      .limit(limit)
      .include('createdBy')
      .find()
      .then(function (judgement) {
        judgements = judgement
        console.log(judgements);
        currentJudgement = judgements[index].get('objectId');
        console.log('currentJudgement = ' + currentJudgement);

        var isOperated = false;
        for (var operIndex = 0; operIndex < judgeHistory.length; operIndex++)
        {
          console.log('judgeHistory = ' + judgeHistory[operIndex]);

          if (currentJudgement == judgeHistory[operIndex])
          {
            isOperated = true;
            break;
          }
        }

        if (isOperated){
          index++;
          console.log('currentJudgement = if 104');

          that.setData({
            judgementIndex: 7,
          });
          console.log('111');
        }
        else{
          console.log('114');
          var agreeCount = judgements[index].get('agreeCount');
          var disagreeCount = judgements[index].get('disagreeCount');
          currentUser = app.globalData.user.toJSON().objectId;
          if (agreeCount != 0 || disagreeCount != 0) {
            var ratio = disagreeCount / (agreeCount + disagreeCount) * 100;
          }
          that.setData({
            judgement: judgements[index],
            votePercent: ratio
          });
          console.log(this.data.judgement);

        }

      },

      function (error) {
        // 异常处理
        console.error(error);
      });
  },

  fetchUserJudgement: function () {
    var that = this;
    currentUser = app.globalData.user.toJSON().objectId;
    var createdBy = AV.Object.createWithoutData('createdBy', currentUser);
    new AV.Query('VoteJudgement')
      .descending('createdAt')
      .equalTo('createdBy', createdBy)
      .find()
      .then(function (result) {

        for(var i = 0; i < result.length; i++){
          var id = result[i].get('forJudgement');
          judgeHistory.push(id.id);
          console.log(id.id)

        }

        console.log(judgeHistory)

      },
      function (error) {
        // 异常处理
        console.error(error);
      });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchUserJudgement();


  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    index = 0;
    this.fetchJudgement(10);


  
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