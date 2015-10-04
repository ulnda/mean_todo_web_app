module = angular.module('app.tasks.services', [])

module.factory('Task', ['$resource', 'API_TASKS_ENDPOINT', ($resource, 
  API_TASKS_ENDPOINT) ->

    $resource(API_TASKS_ENDPOINT, { id: '@id' },
      headers:
        'Content-Type': 'application/json'
      update:
        method: 'PUT'
    )
]).value('API_TASKS_ENDPOINT', 'http://localhost:3000/tasks/:id')