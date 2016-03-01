'use strict';

// Declare app level module which depends on views, and components
angular.module('app', ['ngRoute', 'app.home', 'app.test'
]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
  $locationProvider.html5Mode(true); 
  $routeProvider.otherwise({redirectTo: 'home'});
}]);    