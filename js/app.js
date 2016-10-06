// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    
$stateProvider

.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
})

.state('app.load', {
    url: '/loadServer',
    viws: {
        'menuContent': {
            controller: 'LoadServer'
        }
    }
})

.state('app.login', {
    url: '/login',
    views: {
        'menuContent': {
            templateUrl: 'templates/login/login.html',
            controller: 'AppLogin'
        }
    },
    cache: false
})

.state('app.register', {
    url: '/register',
    views: {
        'menuContent': {
            templateUrl: 'templates/register/register.html',
        }
    }
})

.state('app.acceptRegister', {
    url: '/acceptRegister',
    views: {
        'menuContent': {
            templateUrl: 'templates/register/dados.html',
            controller: 'AppRegister'
        }
    }
})

.state('app.showvacancy', {
    url: '/showvacancy',
    views: {
        'menuContent': {
            templateUrl: 'templates/vacancies.html',
            controller: 'AppVacancy'
        }
    }
})

.state('app.showparks', {
    url: '/showparks',
    views: {
        'menuContent': {
            templateUrl: 'templates/parksopen.html',
            controller: 'AppParks'
        }
    },
    cache: false
})



.state('master', {
    url: '/master',
    abstract: true,
    templateUrl: 'templates/login/loginMaster/menu.html'
})

.state('master.init', {
    url: '/init',
    views: {
        'menuContent': {
            templateUrl: 'templates/login/loginMaster/login.html',
            controller: ''
        }
    }
})

.state('admin', {
    url: '/admin',
    abstract: true,
    templateUrl: 'templates/login/loginAdmin/menu.html'
})

.state('admin.init', {
    url: '/init',
    views: {
        'menuContent': {
            templateUrl: 'templates/login/loginAdmin/login.html',
            controller: ''
        }
    }
})

.state('func', {
    url: '/func',
    abstract: true,
    templateUrl: 'templates/login/loginFunc/menu.html'
})

.state('func.init', {
    url: '/init',
    views: {
        'menuContent': {
            templateUrl: 'templates/login/loginFunc/login.html',
            controller: ''
        }
    }
})

.state('client', {
    url: '/client',
    abstract: true,
    templateUrl: 'templates/login/loginClient/menu.html'
})

.state('client.init', {
    url: '/init',
    views: {
        'menuContent': {
            templateUrl: 'templates/login/loginClient/login.html',
            controller: ''
        }
    }
})

.state('client.registerVacancy', {
    url: '/registerVacancy',
    views: {
        'menuContent': {
            templateUrl: 'templates/login/loginClient/registerVacancy.html',
            controller: 'RegisterVacancy'
        }
    },
    cache: false
})

.state('app.init', {
    url: '/init',
    views: {
        'menuContent': {
            templateUrl: 'templates/init.html'
        }
    }
})

.state('app.sair', {
    url: '/sair',
    views: {
        'menuContent': {
            controller: 'sair'
        }
    },
    cache: false
})

/*.state('app.single', {
    url: '/playlists/:playlistId',
        views: {
        'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
    }
}
*/

// if none of the above states are matched, use this as the fallback
$urlRouterProvider.otherwise('/app/init');
$httpProvider.defaults.headers.common = {};
$httpProvider.defaults.headers.post = {};
$httpProvider.defaults.headers.put = {};
$httpProvider.defaults.headers.patch = {};
});
