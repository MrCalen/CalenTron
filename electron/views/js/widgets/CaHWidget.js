app.directive('cahWidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'cahWidget.html',
        controller: function ($scope, $http) {

            var access_token = localStorage.getItem('access_token');
            $scope.fetch = function () {
                $http.get(window.url + "/api/cah?token=" + access_token)
                .then(function (data) {
                    $scope.img = data.data.result;
                });
            };

            $scope.fetch();
        }
    };
});