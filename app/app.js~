var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster','ui.bootstrap']);
//var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);



app.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/login', {
            title: 'Login',
            templateUrl: 'partials/login.html',
            controller: 'authCtrl'
        })
            .when('/logout', {
                title: 'Logout',
                templateUrl: 'partials/login.html',
                controller: 'logoutCtrl'
            })
            .when('/signup', {
                title: 'Signup',
                templateUrl: 'partials/signup.html',
                controller: 'authCtrl'
            })
            .when('/dashboard', {
                title: 'Dashboard',
                templateUrl: 'partials/dashboard.html',
                controller: 'productsCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'authCtrl',
                role: '0'
            })
            .otherwise({
                redirectTo: '/login'
            });
  }])
    .run(function ($rootScope, $location, Data) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            $rootScope.authenticated = false;
var nextUrl = next.$$route.originalPath;
            Data.get('session').then(function (results) {
            if (results.uid) {
                    $rootScope.authenticated = true;
                    $rootScope.uid = results.uid;
                    $rootScope.name = results.name;
                    $rootScope.email = results.email;
              if (nextUrl == '/login') {
                         $location.path("/dashboard");
                    }

                } else {
                    
                    if (nextUrl != '/signup' && nextUrl != '/login') {
                         $location.path("/login");
                    }
                }
            });
        });
    });
