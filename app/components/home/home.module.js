'use strict';

// Declare app level module which depends on views, and components
angular.module('app.home', ['ui.router']).
config(['$stateProvider', function($stateProvider) {
  $stateProvider
  
    .state('home',{
        
        url: '/home',
        template:'<p>{{home.data}}</p>',
        controller:'homeCtrl as home'
  
        
        
    });
}]);     