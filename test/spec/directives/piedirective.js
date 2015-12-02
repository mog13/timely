'use strict';

describe('Directive: pieDirective', function () {

  // load the directive's module
  beforeEach(module('timelyApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pie-directive></pie-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pieDirective directive');
  }));
});
