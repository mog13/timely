'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('timelyApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should properly sanitize time', function () {
    expect(scope.convertTime(10)).toBe('00:00:10');
    expect(scope.convertTime(70)).toBe('00:01:10');
    expect(scope.convertTime(630)).toBe('00:10:30');
    expect(scope.convertTime(3600)).toBe('01:00:00');
    expect(scope.convertTime(3661)).toBe('01:01:01');
    expect(scope.convertTime(36000)).toBe('10:00:00');

  });
});
