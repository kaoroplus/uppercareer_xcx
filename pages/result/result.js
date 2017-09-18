// result.js

var wxCharts = require('../../utils/wxcharts-shangzhi.js');
var app = getApp();
var radarChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  onTapHome: function () {

    wx.redirectTo({
      url: '../forum/forum'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var windowWidth = 320;


    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['传统', '管理', '社会', '艺术', '研究', '现实'],
      series: [{
        name: '职业性格类型',
        data: [9, 1, 5, 5, 7, 2],
        color:'#4ec046'
      }],
      width: 300,
      height: 300,
      dataLabel:false,
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