module = angular.module('app.tasks', ['ui.router', 'app.tasks.controllers'])

module.config(['$stateProvider', '$locationProvider', ($stateProvider,
  $locationProvider) ->

    $stateProvider.state('tasks'
      abstract: true
      url: '/tasks'
      templateUrl: 'templates/tasks/main.html'
    ).state('tasks.all'
      url: ''
      controller: 'TasksController'
      templateUrl: 'templates/tasks/index.html'
    ).state('tasks.new'
      url: '/new'
      controller: 'NewTaskController'
      templateUrl: 'templates/tasks/new.html'
    ).state('tasks.edit'
      url: '/:id/edit'
      controller: 'EditTaskController'
      templateUrl: 'templates/tasks/edit.html'
    )
])