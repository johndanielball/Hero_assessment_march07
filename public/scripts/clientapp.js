var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/hero', {
      templateUrl: 'public/views/templates/hero.html',
      controller: 'heroController'
    })
    .when('/heroes', {
      templateUrl: 'public/views/templates/heroes.html',
      controller: 'heroesController'
    })
    .otherwise({
      redirectTo: 'hero'
    })
}]);