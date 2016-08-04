app.directive('twitchWidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'twitchWidget.html',
        controller: function ($scope, $http, $timeout) {
            var access_token = localStorage.getItem('access_token');
            $scope.fetch = function () {
                $http.get(window.url + "/api/twitch?token=" + access_token)
                .success(function (data) {
                    $scope.streams = data.result;
                })
            };

            $scope.fetch();
        }
    };
});