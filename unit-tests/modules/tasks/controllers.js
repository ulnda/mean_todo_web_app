describe('TasksController', function() {
  beforeEach(module('app'));

  var $scope, modal;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    modal = jasmine.createSpyObj('modal', ['open']);
    _$controller_('TasksController', { $scope: $scope, $modal: modal });
  }));

  describe('$scope.removeTask', function() {
    it('show a modal window to delete the task selected', function() {
      $scope.tasks = [{ id: 1, title: 'Some Task', description: 'Some Task Description' }];
      expect($scope.tasks.length).toBeGreaterThan(0);
    });
  });
});

describe('TaskRemovingModalController', function() {
  beforeEach(module('app'));

  var $scope;
  var $httpBackend;
  var task;
  var modalInstance;
  var $state;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    $state = jasmine.createSpyObj('$state', ['go']);
    $state.current = 'tasks.all';
    modalInstance = jasmine.createSpyObj('modalInstance', ['close', 'dismiss']);
    task = {
      $delete: function(callback) {
        callback();
      }
    };
    _$controller_('TaskRemovingModalController', { $scope: $scope, 
      task: task, $modalInstance: modalInstance, $state: $state });
  }));

  describe('$scope.ok', function() {
    it('close window', function() {
      $scope.ok();
      expect(modalInstance.dismiss).toHaveBeenCalledWith('ok');
    });  

    it('redirect to tasks list', function() {
      $scope.ok();
      expect($state.go).toHaveBeenCalledWith('tasks.all', {}, { reload: true });
    }); 
  });

  describe('$scope.cancel', function() {
    it('close window', function() {
      $scope.cancel();
      expect(modalInstance.dismiss).toHaveBeenCalledWith('cancel');
    }); 
  });
});

describe('NewTaskController', function() {
  beforeEach(module('app'));

  var $scope, $state;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    $state = jasmine.createSpyObj('$state', ['go']);
    _$controller_('NewTaskController', { $scope: $scope, $state: $state });
  }));

  describe('$scope.createTask', function() {
    it('redirect to tasks list', function() {
      $scope.task = {
        $save: function(callback) {
          callback();
        }
      };
      $scope.createTask();
      expect($state.go).toHaveBeenCalledWith('tasks.all');
    });
  });
});

describe('UpdateTaskController', function() {
  beforeEach(module('app'));

  var $scope, $state;

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $scope = _$rootScope_.$new();
    $state = jasmine.createSpyObj('$state', ['go']);
    _$controller_('EditTaskController', { $scope: $scope, $state: $state });
  }));

  describe('$scope.updateTask', function() {
    it('redirect to tasks list', function() {
      $scope.task = {
        $update: function(callback) {
          callback();
        }
      };
      $scope.updateTask();
      expect($state.go).toHaveBeenCalledWith('tasks.all');
    });
  });
});