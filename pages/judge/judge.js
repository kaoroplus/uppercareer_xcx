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
    imagePosition: 550
    
  },

  onTapCompose: function () {

    wx.navigateTo({
      url: '../compose/compose'
    })

  },

  onTapAgree: function () {
    currentUser = app.globalData.user.toJSON().objectId;
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

    var voteJudgement = new AV.Object('VoteJudgement');// 构建 vote 对象
    voteJudgement.set('isAgree', true);
    var targetUser = AV.Object.createWithoutData('_User', currentUser);
    voteJudgement.set('createdBy', targetUser);
    var targetJudgement = AV.Object.createWithoutData('Judgement', currentJudgement);
    voteJudgement.set('forJudgement', targetJudgement);

    console.log(currentUser);
    console.log(currentJudgement);

    voteJudgement.save();

    index++;
    console.log('agree'+index);
    if (index >= judgements.length) {
      wx.redirectTo({
        url: '../compose/compose'
      })

    }
    else {
      this.fetchJudgement(100);
    }



  },

  onTapDisagree: function () {
    currentUser = app.globalData.user.toJSON().objectId;
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

    var voteJudgement = new AV.Object('VoteJudgement');// 构建 vote 对象
    voteJudgement.set('isAgree', false);
    var targetUser = AV.Object.createWithoutData('_User', currentUser);
    voteJudgement.set('createdBy', targetUser);
    var targetJudgement = AV.Object.createWithoutData('Judgement', currentJudgement);
    voteJudgement.set('forJudgement', targetJudgement);

    console.log(currentUser);
    console.log(currentJudgement);

    voteJudgement.save();

    index++;

    if (index >= judgements.length) {
      wx.redirectTo({
        url: '../compose/compose'
      })

    }
    else{
      this.fetchJudgement(100);
    }




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
        /*
        for (var operIndex = 0; operIndex < judgeHistory.length; operIndex++)
        {
          console.log('judgeHistory = ' + judgeHistory[operIndex]);

          if (currentJudgement == judgeHistory[operIndex])
          {
            isOperated = true;
            break;
          }
        }
        */

        wx.getStorage({
          key: currentJudgement,
          success: function(res) {isOperated = true},
        })

        if (isOperated){
          index++;
          that.fetchJudgement(100);
          console.log('107' + index);
        }
        else{
          console.log('114');
          var agreeCount = judgements[index].get('agreeCount');
          var disagreeCount = judgements[index].get('disagreeCount');
        
          if (agreeCount != 0 || disagreeCount != 0) {
            var ratio = disagreeCount / (agreeCount + disagreeCount) * 100;
          }
          //生成随机背景
          var random = Math.random() * 1000;

          that.setData({
            judgement: judgements[index],
            votePercent: ratio,
            imagePosition: random
          });

        }

        if (index >= judgement.length) {
          wx.redirectTo({
            url: '../compose/compose'
          })

        }


      },

      function (error) {
        // 异常处理
        console.error(error);
      });
  },

  fetchUserJudgement: function () {
    judgeHistory = [];
    var that = this;
    currentUser = app.globalData.user.toJSON().objectId;
    var createdBy = AV.Object.createWithoutData('createdBy', currentUser);
    new AV.Query('VoteJudgement')
      .descending('createdAt')
      .equalTo('createdBy', createdBy)
      .find()
      .then(function (result) {
/*
        for(var i = 0; i < result.length; i++){
          var id = result[i].get('forJudgement');
          judgeHistory.push(id.id);
          console.log(id.id)

        }
        console.log(judgeHistory)
*/
        for (var i = 0; i < result.length; i++){
          wx.setStorage({
            key: result[i].get('forJudgement').id,
            data: result[i].get('forJudgement').isAgreed,
          })
        }


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
    index = 0;
    this.fetchJudgement(100);
    this.fetchUserJudgement();
  
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
    return {
      title: "某人有个看法想让你评价一下",
      path: '/pages/judge/judge',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  
  }
})