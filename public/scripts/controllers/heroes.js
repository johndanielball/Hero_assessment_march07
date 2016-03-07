app.controller('heroesController', ['$scope', '$http', function($scope, $http) {

  //Get the hero names for the drop down so that the user can filter which heroes to view based on their super power
  $http.get('/powers').then(
    function (res) {
      $scope.powers = res.data;
    },
    function (err) {
      console.log(err);
  });

  //Get all the heroes by default so that the template can bind to the $scope.heroes array
  $http.get('/heroes').then(
    function (res) {
      $scope.heroes = res.data;
    },
    function (err) {
      console.log(err);
  });

  // This is bound to the drop down so that the user can select a superpower,
  // it then calls the heroes/ plus super power route and reassigned the $scope.heroes
  // array so that the page refreshes the heroes displayed
  $scope.filter = function (power_name) {
    $http.get('/heroes/' + power_name).then(
      function (res) {
        $scope.heroes = res.data;
      },
      function (err) {
        console.log(err);
      }
    );
  };
}]);