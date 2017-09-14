//search.js
const AV = require('../../utils/av-weapp-min');

Page({
  data: {
    inputShowed: false,
    inputVal: ""
  },


  searchPost:function(e) {
    new AV.Query('Post')
      .contains('title',e)
      .greaterThanOrEqualTo('subPostCount',1)
      .include('createdBy')
      .find()
      .then(posts => this.setData({ posts }))
      .catch(console.error);
    console.log(e)
  },

  quickSearch: function(e) {
    console.log(e.currentTarget.dataset.text);
    this.searchPost(e.currentTarget.dataset.text);

    this.setData({
      inputVal: e.currentTarget.dataset.text,
      inputShowed: true
    });


  },
  


  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e.detail.value);

    this.searchPost(e.detail.value);

    this.setData({
      inputVal: e.detail.value
    });
  }
});