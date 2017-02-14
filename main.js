'use strict';

var origin = 'https://cnodejs.org';
var unreadCount = 0;
var errorMsg = '';
var accessTokenCachekey = 'cnode-accessToken';
var interval = 60000;

window.chrome.browserAction.onClicked.addListener(function() {
  if (unreadCount) {
    window.open(origin + '/my/messages');
  } else {
    window.open(origin);
  }
});

var timer = setInterval(function () {
  var accessToken = window.localStorage.getItem(accessTokenCachekey);
  if (!accessToken) return;
  window.fetch(origin + '/api/v1/message/count?accesstoken=' + accessToken)
    .then(res => res.json())
    .then(function (res) {
      if (res.success) {
        errorMsg = '';
        unreadCount = res.data;
        renderCount();
      } else {
        errorMsg = res.error_msg;
        unreadCount = 0;
        renderError();
      }
    })
    .catch(function (e) {
      errorMsg = e.message;
      unreadCount = 0;
      renderError();
    })
}, interval);

function renderCount() {
  var color = [65, 131, 196, 255];
  render(getCountString(unreadCount), color);
}

function renderError() {
  var color = [166, 41, 41, 255];
  var title = errorMsg;
  render('X', color, title);
}

function render(text, color, title) {
  window.chrome.browserAction.setBadgeText({ text: text });
  window.chrome.browserAction.setBadgeBackgroundColor({ color: color });
  if (title) {
    window.chrome.browserAction.setTitle({ title: title });
  }
};

function getCountString(count) {
  if (count === 0) {
    return '';
  } else if (count > 9999) {
    return '∞';
  }
  return String(count);
};
