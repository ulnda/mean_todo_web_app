angular.module('app.tasks.controllers', []).controller('TasksController',
  ['$scope', '$state', '$modal', ($scope, $state, $modal) ->

    $scope.tasks = [
      { id: 1, title: 'Some Title 1' },
      { id: 2, title: 'Some Title 2' },
      { id: 3, title: 'Some Title 3' },
      { id: 4, title: 'Some Title 4' }
    ]

    $scope.removeTask = (task) ->
      $modal.open
        templateUrl: 'templates/tasks/removing_modal.html'
        controller: 'TaskRemovingModalController'
        size: 'sm'
        resolve:
          task: ->
            task
]).controller('TaskRemovingModalController', ['$modalInstance', '$scope',
  '$state', 'task', ($modalInstance, $scope, $state, task) ->

    $scope.task = task

    $scope.ok = ->
      #task.$delete ->
      $modalInstance.dismiss('ok')
      $state.go $state.current, {}, { reload: true }

    $scope.cancel = ->
      $modalInstance.dismiss('cancel')
]).controller('NewTaskController', ['$scope', '$state', '$modal', ($scope, 
  $state, $modal) ->

    $scope.task = {}

    $scope.createTask = ->
      console.log($scope.task)
]).controller('EditTaskController', ['$scope', '$state', '$modal', ($scope, 
  $state, $modal) ->

    $scope.task = { id: 3, title: '112233', description: '445566' }

    $scope.updateTask = ->
      console.log($scope.task)
])