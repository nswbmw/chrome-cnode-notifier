'use strict';

var accessTokenCachekey = 'cnode-accessToken';

document.addEventListener('DOMContentLoaded', function() {
  var accessTokenElement = document.getElementById('accessToken');
  var accessToken = window.localStorage.getItem(accessTokenCachekey);
  if (accessToken) {
    accessTokenElement.value = accessToken;
  }
  accessTokenElement.addEventListener('change', function() {
    var newAccessToken = accessTokenElement.value;
    window.localStorage.setItem(accessTokenCachekey, newAccessToken);
  });
});
