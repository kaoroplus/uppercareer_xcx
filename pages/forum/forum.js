// forum.js
var util = require('../../utils/util.js')
const AV = require('../../utils/av-weapp-min');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var page = 0;
var filterType = 'subPostCount';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    page : 0,
    answers: null,
    hidden:false,
    selected: true,
    selected1: false
  },

  fetchArticle: function () {
    var that = this;
    new AV.Query('Article')
      .descending('index')
      .limit(5)
      .find()
      .then(function (articles) {
        that.setData({ articles });
        that.setData({
          hidden: true
        });


      },

      function (error) {
        // 异常处理
        console.error(error);
      });
  },

  fetchAnswer: function( itemCount, filter ){
    var that = this;
    new AV.Query('Answer')
      .addDescending(filter)
      .limit(itemCount)
      //.include('forQuestion')
      .include('createdBy')
      .include('forQuestion')
      .find()
      .then(function (answers) {
        that.setData({ answers });
        that.setData({
          hidden: true
        });


      },

      function (error) {
        // 异常处理
        console.error(error);
      });

  },

  articleDetail: function (e) {
    var id = e.currentTarget.id;
    console.log(id);

    wx.navigateTo({
      url: '../article/article?extra=' + id
    })
  },

  answerDetail: function (e) {
    var id = e.currentTarget.id;
    console.log(id);

    wx.navigateTo({
      url: '../answer/answer?extra=' + id
    })
  },

  filterRecent: function() {
    filterType = 'createdAt';
    this.fetchAnswer(20, filterType);
    this.setData({
      hidden: false
    });
    this.setData({
      selected: false,
      selected1: true
    })

  },

  filterHot: function () {
    filterType = 'subPostCount';
    this.fetchAnswer(20, filterType);
    this.setData({
      hidden: false
    });
    this.setData({
      selected1: false,
      selected: true
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

    this.fetchAnswer(20, filterType);
    this.fetchArticle();
    
  



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
    this.fetchAnswer(20, filterType);
    page = 0;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    page++;
    var count = (page + 1) * 20;
    console.log(page);

    this.fetchAnswer(count, filterType);

    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})