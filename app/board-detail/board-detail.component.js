'use strict';

// Register `boardDetail` component, along with its associated controller and template
angular.module('boardDetail').component('boardDetail', {
    templateUrl: '/board-detail/board-detail.template.html',
    controller: ['$http', '$routeParams',
        function BoardDetailController($http, $routeParams) {

            var self = this;

            self.addColumn = function (board, id, name) {
                board.push(new Column(id, name));
            };

            self.addSheet = function (column) {
                column.push(new Sheet('', '', [], [], '', {
                        estimatedTime: '',
                        spentTime: 0,
                        remaningTime: '',
                        timeFormat: ''
                    }, [], []
                ));
            };

            self.addCheckList = function (checklist, name, description) {
                var name = name ? name : '';
                var description = description ? description : '';
                checklist.push(new CheckList(name, description, false));
            };

            self.addItem = function (array, item) {
                var item = item ? item : '';
                array.push(item);
            };

            self.timeConvertToMinutes = function (time) {
                var timeArray = [];
                timeArray = time.length > 1 ? time.split(' ') : timeArray.push(time);
                var minutes;
                var hours;
                var days;
                var months;
                for (var t in timeArray) {
                    if (timeArray[t].indexOf("m") != -1) {
                        minutes = timeArray[t];
                    }
                    if (timeArray[t].indexOf("h") != -1) {
                        hours = timeArray[t];
                    }
                    if (timeArray[t].indexOf("d") != -1) {
                        days = timeArray[t];
                    }
                    if (timeArray[t].indexOf("M") != -1) {
                        months = timeArray[t];
                    }
                }

                if (minutes == undefined) {
                    minutes = 0
                }
                if (hours == undefined) {
                    hours = 0
                }
                if (days == undefined) {
                    days = 0
                }
                if (months == undefined) {
                    months = 0
                }

                return parseInt(minutes) + (parseInt(hours) * 60) + (parseInt(days) * 24 * 60) + (parseInt(months) * 30 * 24 * 60);
            };

            self.timeConvertFromMinutes = function (time) {
                var time = time || 0;

                var minutesInMonth = 43200;
                var minutesInday = 1440;
                var minutesInHour = 60;

                var totalMonth;
                var totalDays;
                var totalHours;
                var totalMinutes;

                if (time > minutesInMonth) {
                    totalMonth = time / minutesInMonth;
                    if (totalMonth % 1 != 0) {
                        totalDays = (totalMonth % 1) * minutesInMonth / minutesInday;
                        if (totalDays % 1 != 0) {
                            totalHours = (totalDays % 1) * minutesInday / minutesInHour;
                            if (totalHours % 1 != 0) {
                                totalMinutes = (totalHours % 1) * minutesInHour;
                            }
                        }
                    }
                }

                if (time > minutesInday && time < minutesInMonth) {
                    totalDays = time / minutesInday;
                    if (totalDays % 1 != 0) {
                        totalHours = (totalDays % 1) * minutesInday / minutesInHour;
                        if (totalHours % 1 != 0) {
                            totalMinutes = (totalHours % 1) * minutesInHour;
                        }
                    }
                }

                if (time > minutesInHour && time < minutesInday) {
                    totalHours = time / minutesInHour;
                    if (totalHours % 1 != 0) {
                        totalMinutes = (totalHours % 1) * minutesInHour;
                    }
                }

                if (time < minutesInHour) {
                    totalMinutes = time;
                }

                var convertedTime = [];

                if (totalMinutes) {
                    convertedTime.push(Math.round(totalMinutes) + 'm ');
                }

                if (totalHours) {
                    convertedTime.push(Math.floor(totalHours) + 'h ');
                }

                if (totalDays) {
                    convertedTime.push(Math.floor(totalDays) + 'd ');
                }

                if (totalMonth) {
                    convertedTime.push(Math.floor(totalMonth) + 'M');
                }

                return convertedTime.join(' ');
            };


            self.getColumnTime = function (columnSheets, timeType) {

                var filteredTime = columnSheets.map(function (sheet) {
                    return sheet.timeTraking[timeType] ? sheet.timeTraking[timeType] : 0;
                }).filter(function (phaseTimeSpend) {
                    return phaseTimeSpend != undefined && phaseTimeSpend != null && phaseTimeSpend != '';
                });

                if (filteredTime.length == 1) {
                    return self.timeConvertToMinutes(filteredTime[0]);
                } else if (filteredTime.length == 0) {
                    return [0];
                } else {
                    var convertedTimeArray = filteredTime.map(function (item) {
                        return self.timeConvertToMinutes(item);
                    });
                    return convertedTimeArray.reduce(function (sum, current) {
                        return sum + current;
                    });
                }
            };

            self.getCheckedChecklists = function (sheet) {
                if (!sheet.checklists) return;
                return sheet.checklists.map(function (item) {
                    return item.checked;
                }).filter(function (item) {
                    return item == true;
                });
            };

            $http.get('boards/' + $routeParams.boardId + '.json').then(function (response) {
                self.board = response.data;
            });
        }
    ]
});
