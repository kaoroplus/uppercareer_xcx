// result.js

var wxCharts = require('../../utils/wxcharts-shangzhi.js');
var app = getApp();
var radarChart = null;
var jsonResult = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isSaveHidden: false,
    isBackHidden: true,

  
  },

  onTapHome: function () {

    wx.switchTab({
      url: '../index/index'
    })

  },

  onTapSave: function() {

    var that = this;
  

    var path;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 500,
      height: 500,
      //destWidth: 100,
      //destHeight: 100,
      canvasId: 'radarCanvas',
      success: function (res) {
        console.log(res.tempFilePath)
        path = res.tempFilePath
      }
    })

    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              wx.saveImageToPhotosAlbum({
                filePath: path,
                complete(c) {
                  console.log(c)
                },
                success(data) {
                  wx.showModal({
                    title: '保存成功',
                    content: '测试结果已保存至相册。',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        that.setData({
                          isBackHidden: false,
                          isSaveHidden: true
                        });

                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                },
                fail(f) {
                  wx.showModal({
                    title: '保存失败',
                    content: '您的机型暂时不支持小程序图片保存，请截图保存。',
                    showCancel: false,
                    success: function (res) {
                      if (res.confirm) {
                        that.setData({
                          isBackHidden: false,
                          isSaveHidden: true
                        });

                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                },
              })
            }
          })
        }
        if (res.authSetting['scope.writePhotosAlbum']){
          wx.saveImageToPhotosAlbum({
            filePath: path,
            complete(c) {
              console.log(c)
            },
            success(data) {
              wx.showModal({
                title: '保存成功',
                content: '测试结果已保存至相册.',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      isBackHidden: false,
                      isSaveHidden: true
                    });
 
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
            },
            fail(f) {
              wx.showModal({
                title: '保存失败',
                content: '您的机型暂时不支持小程序图片保存，请截图保存。',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      isBackHidden: false,
                      isSaveHidden: true
                    });

                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })
              console.log(f);
            },
          })

        }
      }
    })
  },

  onTapBack: function() {
    wx.redirectTo({
      url: '../quizcover/quizcover'
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.jsonStr);
    
    let result = JSON.parse(options.jsonStr);

    var resultForUser = new Array();
    
    resultForUser.push(result.realistic);
    resultForUser.push(result.common);
    resultForUser.push(result.enterprise);
    resultForUser.push(result.social);
    resultForUser.push(result.artistic);
    resultForUser.push(result.investigate);
    if (app.globalData.userInfo != null) {
      resultForUser.push(app.globalData.userInfo.nickName);
    }
    jsonResult = JSON.stringify(resultForUser);
    
    var windowWidth = 320;
    var chartData = new Array();
    chartData.push(result.realistic);
    chartData.push(result.common);
    chartData.push(result.enterprise);
    chartData.push(result.social);
    chartData.push(result.artistic);
    chartData.push(result.investigate);


    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['现实型', '传统型', '管理型', '社会型', '艺术型', '研究型'],
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
  onShareAppMessage: function (res) {
    var userName = '匿名用户';
    if(app.globalData.userInfo != null) {
      userName = app.globalData.userInfo.nickName;
    }
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: userName + '的职业人格是：',
      path: '/pages/resultshare/resultshare?jsonStr=' + jsonResult,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  
  }
})