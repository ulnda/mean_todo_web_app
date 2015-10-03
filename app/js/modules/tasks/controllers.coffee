angular.module('app.tasks.controllers', []).controller('TasksController',
  ['$scope', '$state', '$modal', ($scope, $state, $modal) ->
    $scope.tasks = [
      { id: 1, title: 'Some Title 1' },
      { id: 2, title: 'Some Title 2' },
      { id: 3, title: 'Some Title 3' },
      { id: 4, title: 'Some Title 4' }
    ]
])