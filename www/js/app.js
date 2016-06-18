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

.state('register', {
url: '/register',
templateUrl: 'templates/register.html',
controller: 'loginCtrl',
cache:false
})

.state('tour1', {
url: '/tour1',
templateUrl: 'templates/tour1.html',
controller: 'loginCtrl',
cache:false
})

.state('tour2', {
url: '/tour2',
templateUrl: 'templates/tour2.html',
controller: 'AccountCtrl',
cache:false
})

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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

  .state('app.reminder', {
    url: '/reminder',
    views: {
      'menuContent': {
        templateUrl: 'templates/reminder.html',
        controller: 'ReminderCtrl'
      }
    }
  })

  .state('app.getdiet', {
    url: '/getdiet',
    views: {
      'menuContent': {
        templateUrl: 'templates/getdiet.html',
      }
    }
  })

  .state('app.diet', {
    url: '/diet',
    views: {
      'menuContent': {
        templateUrl: 'templates/diet.html'
      }
    }
  })

  .state('app.exercise', {
      url: '/exercise',
      views: {
        'menuContent': {
          templateUrl: 'templates/exercise.html'
        }
      }
    })

    .state('app.news', {
      url: '/news',
      views: {
        'menuContent': {
          templateUrl: 'templates/news.html',
          //controller: 'PlaylistsCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/protected');
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
