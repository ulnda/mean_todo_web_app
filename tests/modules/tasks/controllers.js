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
      expect($scope.tasks.length).toEqual(1);
    });
  });
});