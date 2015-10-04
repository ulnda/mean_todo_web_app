angular.module('app.tasks.controllers', []).controller('TasksController',
  ['$scope', '$state', '$modal', 'Task', ($scope, $state, $modal, Task) ->

    $scope.tasks = Task.query()

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
      task.$delete ->
        $modalInstance.dismiss('ok')
        $state.go $state.current, {}, { reload: true }

    $scope.cancel = ->
      $modalInstance.dismiss('cancel')
]).controller('NewTaskController', ['$scope', '$state', '$modal', 'Task', 
  ($scope, $state, $modal, Task) ->

    $scope.task = new Task()

    $scope.createTask = ->
      $scope.task.$save ->
        $state.go('tasks.all')
]).controller('EditTaskController', ['$scope', '$state', '$stateParams', '$modal', 
  'Task', ($scope, $state, $stateParams, $modal, Task) ->

    $scope.task = Task.get { id: $stateParams.id }

    $scope.updateTask = ->
      $scope.task.$update ->
        $state.go('tasks.all')
])