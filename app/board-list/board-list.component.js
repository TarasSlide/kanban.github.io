'use strict';

// Register `boardList` component, along with its associated controller and template
angular.module('boardList').component('boardList', {
    templateUrl: '/board-list/board-list.template.html',
    controller: ['$http', function BoardListController($http) {
        var self = this;

        this.addBoard = function (board, id, name) {
            board.push(new Board(id, name));
        };

        $http.get('boards/boards.json').then(function (response) {
            self.boards = response.data;
        });
    }]
});
