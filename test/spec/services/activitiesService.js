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
  });

  it('should set previous activity to null when setting selected unless it is setting a distraction', function () {
    expect(activitiesServiceInstance.previousActivity).toBe(null);
    activitiesServiceInstance.addNewActivity('test', 'blue', 1);
    activitiesServiceInstance.distractionPressed();
    expect(activitiesServiceInstance.previousActivity).toBe(activitiesServiceInstance.activities[1]);

    activitiesServiceInstance.setSelectedActivity(activitiesServiceInstance.activities[1]);
    expect(activitiesServiceInstance.previousActivity).toBe(null);
  });

  it('should reset the activities just to distraction', function () {
    activitiesServiceInstance.previousActivity = {};
    activitiesServiceInstance.addNewActivity('test', 'blue', 1);
    activitiesServiceInstance.addNewActivity('test2', 'blue', 1);
    activitiesServiceInstance.resetActivities();
    expect(activitiesServiceInstance.activities.length).toBe(1);
    expect(activitiesServiceInstance.selectedActivity.id).toBe(0);
  });

  it('shouldn\'t keep a record of previous activity if we havn\'t moved into distraction', function () {
    activitiesServiceInstance.addNewActivity('test', 'blue', 1);
    activitiesServiceInstance.setSelectedActivity(activitiesServiceInstance.activities[1]);
    expect(activitiesServiceInstance.previousActivity).toBe(null);
  });

  it('should keep a record of previous activity if we have moved into distraction from button press (and then move back)', function () {
    activitiesServiceInstance.addNewActivity('test', 'blue', 1);
    activitiesServiceInstance.setSelectedActivity(activitiesServiceInstance.activities[1]);
    activitiesServiceInstance.distractionPressed();
    expect(activitiesServiceInstance.previousActivity).toBe(activitiesServiceInstance.activities[1]);
    expect(activitiesServiceInstance.selectedActivity).toBe(activitiesServiceInstance.activities[0]);
    activitiesServiceInstance.distractionPressed();
    expect(activitiesServiceInstance.selectedActivity).toBe(activitiesServiceInstance.activities[1]);
    expect(activitiesServiceInstance.previousActivity).toBe(null);
  });


});
