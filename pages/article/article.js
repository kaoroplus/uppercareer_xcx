//logs.js
var util = require('../../utils/util.js')
const AV = require('../../utils/av-weapp-min');
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()


Page({

  data: {
    hidden: false,
    articleId: '',
    title:'',
    
  },



  backward: function () {
    wx.navigateBack({
      delta: 1
    })

  },

  home: function () {
    wx.switchTab({
      url: '../index/index'
    })

  },




  onLoad: function (options) {

    var articleId = options.extra;
    this.setData({ articleId });
    var cover = '';   
    var that = this;
    
    new AV.Query('Article')
      .include('reference')
      .get(articleId)
      .then(function (article) {
        
        var content = article.get('content');
        var reference = article.get('reference');
        var title = article.get('title');
        that.setData({
          title: title
        })


        content = content.replace(/<li>/g, '<p>');
        content = content.replace(/<\/li>/g, '</p>');


        WxParse.wxParse('parsedContent', 'html', content, that, 40);
        that.setData({ content });
        that.setData({ article });
        var referenceContent = reference.get('content');
        referenceContent = referenceContent.replace(/<li>/g, '<p>');
        referenceContent = referenceContent.replace(/<\/li>/g, '</p>');
        WxParse.wxParse('parsedReference', 'html', referenceContent, that, 40);
        that.setData({ referenceContent }); 
        that.setData({ hidden:true });


        
        
      }, 
      
      function (error) {
        // 异常处理
        console.error(error);
      });

    //viewCount计数器+1
    var article = AV.Object.createWithoutData('Article', articleId);
    // 修改属性
    article.increment('viewCount', 1);
    // 保存到云端
    article.save();

/*
    var commentsForArticle = AV.Object.createWithoutData('forArticle', articleId);
    new AV.Query('Comment_Article')
      .equalTo('forArticle', commentsForArticle)
      .ascending('createdAt')
      .include('createdBy')
      .find()
      .then(comments => this.setData({ comments }))
      .catch(console.error);

    
    */


    
    //WxParse.wxParse('content', 'html', content, that, 5);
 
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
      path: '/pages/article/article?extra=' + this.data.articleId,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }




  },
  

})
