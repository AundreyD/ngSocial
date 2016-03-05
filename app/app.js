'use strict';

// Declare app level module which depends on views, and components
angular.module('ngsocial', [
  'ngRoute',
  'ngsocial.facebook'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/facebook'});
}]);
