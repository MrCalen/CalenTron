app.directive('tramWidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'tramWidget.html',
        controller: function ($scope, $http, $timeout) {

            $scope.size = 'small';
            $scope.access_token = localStorage.getItem('access_token');
            $scope.url = window.url;

            $scope.fetchData = function () {
                $timeout(function () {
                    $scope.fetchTramway();
                    $scope.fetchSubway();
                    $scope.fetchData();
                }, 120000); // 2 min
            };

            $scope.fetchTramway = function () {
                $scope.loadingTramway = true;
                $http.get($scope.url + "/api/tram?token=" + $scope.access_token)
                .then(function (data) {
                    $scope.tram = data.data;
                    $scope.loadingTramway = false;
                });
            };
            $scope.fetchSubway = function () {
                $scope.loadingSubway = true;
                $http.get($scope.url + "/api/subway?token=" + $scope.access_token)
                .then(function (data) {
                    $scope.subway = data.data;
                    $scope.loadingSubway = false;
                });
            };

            $scope.fetchTramway();
            $scope.fetchSubway();
            $scope.fetchData();

        }
    };
});