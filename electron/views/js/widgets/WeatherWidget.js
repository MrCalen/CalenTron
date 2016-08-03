app.directive('weatherWidget', function() {
    return {
        'restrict' : 'E',
        'template': 'weather-widget.html',
        'controller' : function ($scope) {
            console.log("Weather Widget");
        }
    }
});