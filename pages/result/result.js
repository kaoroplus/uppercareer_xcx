// result.js

var wxCharts = require('../../utils/wxcharts-shangzhi.js');
var app = getApp();
var radarChart = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    result : {
      realistic: 5,
      enterprise: 6,
      common: 4,
      artistic: 8,
      social: 2,
      investigate: 10
    }
  
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
    var chartData = new Array();
    chartData.push(this.data.result.realistic);
    chartData.push(this.data.result.enterprise);
    chartData.push(this.data.result.common);
    chartData.push(this.data.result.realistic);
    chartData.push(this.data.result.artistic);
    chartData.push(this.data.result.investigate);


    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['现实型', '管理型', '传统型', '艺术型', '社会型', '研究型'],
      series: [{
        name: '职业性格类型',
        data: chartData,
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