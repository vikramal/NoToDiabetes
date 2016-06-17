// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'starter.controllers','firebase'])
.value ("AUTHREF",new Firebase ("https://no2diabetes.firebaseio.com/"))
.value("ITEMREF", new Firebase ("https://no2diabetes.firebaseio.com/notodiabetes"))

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('protected', {
  url: '/protected',
  templateUrl: 'templates/protected.html',
  controller: 'protectedCtrl',
  cache:false
  })

  .state('login', {
  url: '/login',
  templateUrl: 'templates/login.html',
 controller: 'loginCtrl',
 cache:false
})

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    
    .state('app.reminder', {
      url: '/reminder',
      views: {
        'menuContent': {
          templateUrl: 'templates/reminder.html',
          controller: 'ReminderCtrl'
        }
      }
    })

    .state('app.vaccount', {
    url: '/vaccount',
    views: {
      'menuContent': {
        templateUrl: 'templates/vaccount.html',
        controller: 'AccountCtrl',
        cache:false
      }
    }
  })

    .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('protected');
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
