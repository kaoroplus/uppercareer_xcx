// pages/compose/compose.js
const AV = require('../../utils/av-weapp-min');
var app = getApp();

Page({

  

  data: {
    content: "",
    isSubmitDisabled: true,
    files: [],
    isUploadHidden:false,
    lock: false
  },

  onTouchend: function (e) {
    if (this.data.lock) {
      //开锁
      setTimeout(() => {
        this.setData({ lock: false });
      }, 100);
    }

  },

  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths,
          isUploadHidden: true
        });
        
      }
    })
  },

  previewImage: function (e) {
    //检查锁
    if (this.data.lock) {
      return;
    }
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  deleteImage: function (e) {
    //锁住preview
    this.setData({ lock: true });

    var that = this;
    wx.showModal({
      title: '删除图像',
      content: '是否确认删除？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          that.setData({
            files: [],
            isUploadHidden: false
          });

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },


  onTapSubmit: function (options) {

    if (this.data.content.length != 0) {
      var createdBy = app.globalData.user.toJSON().objectId;// 小程序预设用户
      var judgementBody = this.data.content;
      console.log(createdBy);
      console.log(judgementBody);



      var judgement = new AV.Object('Judgement');// 构建 Comment 对象
      judgement.set('content', judgementBody);
      var targetUser = AV.Object.createWithoutData('_User', createdBy);
      judgement.set('createdBy', targetUser);


      var tempFilePath = this.data.files[0];

      if (tempFilePath != null) {

        new AV.File('image-judgement.jpg', {
          blob: {
            uri: tempFilePath,
          },
        }).save()
        .then(function (file)
        {
          var url = file.url();
          console.log(url);
          judgement.set('imageUrl',url);
          judgement.save();

          }, function (error) {
            // 异常处理
            console.error(error);
          });

      }

      else {
        judgement.set('imageUrl', 'no-image');
        judgement.save();
      }

      


    }

    wx.redirectTo({
      url: '../judge/judge'
    })


  },

  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    });

    if (this.data.content.length != 0) {
      this.setData({
        isSubmitDisabled: false
      });
    }

    if (this.data.content.length == 0) {
      this.setData({
        isSubmitDisabled: true
      });
    }
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