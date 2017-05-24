angular.module('roundNumbers', [])

.filter('roundNumber', [function() {
    return function(num) {
        return Math.round(num * 100) / 100
    };
}]);