app.directive('weatherWidget', function () {
    return {
        restrict: 'E',
        templateUrl: 'weatherWidget.html',
        controller: function ($scope, $http) {
            var skycons = new Skycons({"color": "white"});
            skycons.add("weather", Skycons.PARTLY_CLOUDY_DAY);
            skycons.play();


            $scope.url = window.url;
            $scope.token = localStorage.getItem('access_token');
            $scope.lastPrevision = null;

            function mainToIcon(main) {
                switch (main) {
                    case "Clouds":
                        return "cloudy";
                    case "Clear":
                        return "clear-day";
                    default:
                        return main;
                }
            }

            $scope.fetchData = function () {
                $http.get($scope.url + '/api/weather?token=' + $scope.token)
                    .then(function (data) {
                        data = data.data;
                        var last = data.list[0];
                        $scope.lastPrevision = {
                            time: last.dt_txt,
                            main: last.weather[0].main,
                            temp: Math.round(last.main.temp - 273.15),
                            city: data.city.name
                        };
                        skycons.set("weather", mainToIcon($scope.lastPrevision.main));
                    })
                    .catch(function (data) {
                        //
                    })
                    ;
            };
            $scope.fetchData();
        }
    }
});