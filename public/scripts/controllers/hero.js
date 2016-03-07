app.controller('heroController', ['$scope', '$http', function($scope, $http) {
  $http.get('/powers').then(
    function (res) {
      $scope.powers = res.data;
    },
    function (err) {
      console.log(err);
    }
  );

  $scope.submit = function () {
    // Send new hero info to database
    $http.post('/hero',
      {
        alias: $scope.alias,
        first_name: $scope.first_name,
        last_name: $scope.last_name,
        city: $scope.city,
        power_name: $scope.selected
      }).then(
      function (res) {
        // Reset the input fields so that the user can create a new hero
        $scope.alias = '';
        $scope.first_name = '';
        $scope.last_name = '';
        $scope.city = '';
        $scope.power_name = '';
      },
      function (err) {

      })
  }
}]);