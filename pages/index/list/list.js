// pages/index/list/list.js

var that = null,
  menuName = '',
  request = require('../../../common/request.js');
Page({
  data: {
    menu: '',
    list: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    that = this;
    menuName = options.name;
  },
  onReady: function () {
    // 页面渲染完成
    request.request(getMenuUrl(menuName), 'GET', {}, function (res) {
      that.setData({
        list: res.content,
        menu: menuName
      })
    });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  clickHandler: function (e) {
    try {
      //参数无法传递参数，故而使用本地存储 
      wx.setStorageSync('options', getOptions(e.currentTarget.dataset));
    } catch (e) {
    }
    wx.navigateTo({
      url: getNavigateUrl(menuName)
    });
  }
})

function getMenuUrl(name) {
  var url = '';
  switch (name) {
    case 'timeline':
      url = 'awesome/api/all.json';
      break;
    case 'project':
      url = 'project/api/all.json';
      break;
    case 'tool':
      url = 'toolbox/api/all.json';
      break;
    case 'passage':
      url = 'articles/api/all.json';
      break;
  }
  return url;
}

function getNavigateUrl(name) {
  var url = '';
  switch (name) {
    case 'timeline':
      url = '../timeline/timeline';
      break;
    case 'project':
      url = '../panel/panel';
      break;
    default:
      url = '../markdown/markdown';
  }
  return url;
}

function getOptions(dataset) {
  var obj = {}, list = that.data.list;
  var index = dataset.index,
    i = dataset.i,
    j = dataset.j;
  switch (menuName) {
    case 'timeline':
      obj = list[index].timeline;
      break;
    case 'project':
      obj = list[i].subdomains[j].projects;
      break;
    default:
      obj = list[index].path;
  }
  return obj;
}