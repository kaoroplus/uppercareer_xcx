//index.js
const AV = require('../../utils/av-weapp-min');
var page = 0;





//获取应用实例
var app = getApp()
Page({
  data: {
    articles: [],
    userInfo: {},
    hidden: false,
  },

fetchArticle: function(limit){
  var that = this;
  new AV.Query('Article')
    .descending('index')
    .limit(limit)
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

  onReady: function() {
    this.fetchArticle(20);

  },

  //事件处理函数
  articleDetail: function(e) {
    var id = e.currentTarget.id;
    console.log(id);

    wx.navigateTo({
      url: '../article/article?extra=' + id
    })
  },


  
  onLoad: function () {


  },

  onPullDownRefresh: function () {

    wx.stopPullDownRefresh();
    page = 0;
    this.fetchArticle(20);

  },

  onReachBottom: function () {

    page++;
    var count = (page + 1) * 20;
    console.log(page);

    this.fetchArticle(count);

    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
  },


})
