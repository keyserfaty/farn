'use strict';

angular.module('login.services', [])
.factory('loginService', ['$localStorage', '$window', 
  function($localStorage, $window) {
  var url = 'http://localhost:3000/api/auth/facebook';
  var loginWindow, token, hasToken, facebookID, hasFacebookID;

  return {
    login: function () {
      loginWindow = $window.open(url, '_blank', 'location=no, toolbar=no, hidden=yes');
      loginWindow.addEventListener('loadstart', function (event) {
        hasToken = event.url.indexOf('/oauth_token=');
        hasFacebookID = event.url.indexOf('&facebookID=');

        if (hasToken > -1 && hasFacebookID > -1) {
          token = event.url.match('/oauth_token=(.*)&facebookID=')[1];
          facebookID = event.url.match('&facebookID=(.*)')[1];
          // the big deal
          console.log(token, facebookID);
          loginWindow.close();
          location.href = location.pathname;
        }
      });
    }
  };
}]);