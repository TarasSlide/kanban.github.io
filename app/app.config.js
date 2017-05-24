'use strict';

angular.
module('kanbanApp').
config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider.
        when('/boards', {
            template: '<board-list></board-list>'
        }).
        when('/boards/:boardId', {
            template: '<board-detail></board-detail>'
        }).
        otherwise('/boards');
    }
]);
