// pages/resultshare/resultshare.js
var wxCharts = require('../../utils/wxcharts-shangzhi.js');
var app = getApp();
var radarChart = null;
var jsonResult = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'匿名用户'
  
  },

  onTapHome: function () {

    wx.switchTab({
      url: '../index/index'
    })

  },

  onTapTry: function () {
    wx.redirectTo({
      url: '../quizcover/quizcover'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.jsonStr);
    jsonResult = options.jsonStr;
    let result = JSON.parse(jsonResult);

    var windowWidth = 320;
    var chartData = new Array();
    chartData.push(result[0]);
    chartData.push(result[1]);
    chartData.push(result[2]);
    chartData.push(result[3]);
    chartData.push(result[4]);
    chartData.push(result[5]);

    if(result.length == 7){
      this.setData({
        user: result[6],
      })

    }



    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['现实型', '传统型', '管理型', '社会型', '艺术型', '研究型'],
      series: [{
        name: '职业性格类型',
        data: chartData,
        color: '#4ec046'
      }],
      width: 300,
      height: 300,
      dataLabel: false,
      extra: {
        radar: {
          max: 10
        }
      }
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