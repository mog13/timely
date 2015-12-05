'use strict';

describe('Service: activitiesService', function () {

  // load the service's module
  beforeEach(module('timelyApp'));

  // instantiate service
  var activitiesServiceInstance;
  beforeEach(inject(function (activitiesService) {
    activitiesServiceInstance = activitiesService;
  }));

  it('should always have a default (distraction) with a duration of 0', function () {
    expect(activitiesServiceInstance.activities.length).toBe(1);
    expect(activitiesServiceInstance.activities[0].duration).toBe(1);
  });

  it('should be able to add a new activity ', function () {
    activitiesServiceInstance.addNewActivity('test', 'blue', 0);
    expect(activitiesServiceInstance.activities[1].name).toBe('test');
    expect(activitiesServiceInstance.activities[1].colour).toBe('blue');
    expect(activitiesServiceInstance.activities[1].duration).toBe(1);
    expect(activitiesServiceInstance.activities[1].id).toBe(1);
  });

  it('should use default duration of 1', function () {
    activitiesServiceInstance.addNewActivity('test', 'blue');
    expect(activitiesServiceInstance.activities[1].name).toBe('test');
    expect(activitiesServiceInstance.activities[1].colour).toBe('blue');
    expect(activitiesServiceInstance.activities[1].duration).toBe(1);
    expect(activitiesServiceInstance.activities[1].id).toBe(1);
  });

  it('should return the correct total duration', function () {
    activitiesServiceInstance.addNewActivity('test', 'blue', 1);
    activitiesServiceInstance.addNewActivity('test', 'blue', 3);
    activitiesServiceInstance.addNewActivity('test', 'blue', 5);
    expect(activitiesServiceInstance.getTotalDuration()).toBe(10);
  });

  it('When a new activity is created it should be active', function () {
    activitiesServiceInstance.addNewActivity('test', 'blue', 1);
    expect(activitiesServiceInstance.activities[1].id).toBe(activitiesServiceInstance.selectedActivity.id);
  })


});
