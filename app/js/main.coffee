module = angular.module('app', ['app.tasks', 'ui.bootstrap', 'ui.router', 
  'dndLists'])

module.config(['$locationProvider', '$urlRouterProvider', ($locationProvider, 
  $urlRouterProvider) ->

    $urlRouterProvider.otherwise ($injector) ->
      $state = $injector.get('$state')
      $state.go('tasks.all')

    $locationProvider.html5Mode(true)
])
