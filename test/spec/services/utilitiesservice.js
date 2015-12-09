'use strict';

describe('Service: utilitiesService', function () {

  // load the service's module
  beforeEach(module('timelyApp'));

  // instantiate service
  var utilitiesService;
  beforeEach(inject(function (_utilitiesService_) {
    utilitiesService = _utilitiesService_;
  }));

  it('should do something', function () {
    expect(!!utilitiesService).toBe(true);
  });

});
