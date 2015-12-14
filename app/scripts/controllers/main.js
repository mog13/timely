'use strict';

/**
 * @ngdoc function
 * @name timelyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timelyApp
 */
angular.module('timelyApp')
  .controller('MainCtrl', function ($scope, activitiesService) {

    $scope.newActivity = {
      name: '',
      colour: Please.make_color({
        golden: false, //disable default
        full_random: true //go full random
      })
    };

    setInterval(function () {
      activitiesService.increaseActivity(1);
      $scope.$apply();
    }, 1000);


    activitiesService.loadFromLocalStorage(1);
    activitiesService.saveToLocalStorage();
    setInterval(function () {
      activitiesService.loadFromLocalStorage(6);
      activitiesService.saveToLocalStorage();
      $scope.$apply();
    }, 5000);


    /**
     * interface for service variables
     * @returns {Array|*}
     */
    $scope.getActivities = function () {
      return activitiesService.activities;
    };
    /**
     * interface for service variables
     * @param activity
     */
    $scope.getPercentage = function (activity) {
      return activitiesService.getSegmentPercentage(activity.name);
    };

    /**
     * interface for service variables
     * @param activity
     */
    $scope.setSelected = function (activity) {
      activitiesService.setSelectedActivity(activity);
    };

    /**
     * returns a boolean if the given activity matches the selceted on
     * @param activity
     * @returns {boolean}
     */
    $scope.isSelected = function (activity) {
      return (activity.id === activitiesService.selectedActivity.id);
    };

    /**
     * Adds a new activity and generates a new colour for the next one
     */
    $scope.addNewActivity = function () {
      activitiesService.addNewActivity($scope.newActivity.name, $scope.newActivity.colour, 0);
      $scope.newActivity.colour = Please.make_color({
        golden: false, //disable default
        full_random: true //go full random
      });
      $('#new-activity-input').val('');
    };

    /**
     * Makes sure time is presented in the format 00:00:00
     * @param number
     * @returns {string}
     */
    function padTime(number) {
      return (number < 10 ? '0' : '') + number
    }

    /**
     * converts tiem to hours, minuites and days
     * @param duration
     * @returns {string}
     */
    $scope.convertTime = function (duration) {

      var seconds, minutes, hours;

      seconds = duration % 60;
      minutes = Math.floor(duration / 60);
      hours = Math.floor(minutes / 60);
      minutes = minutes % 60;

      return padTime(hours) + ":" + padTime(minutes) + ":" + padTime(seconds);
    };

    /**
     * Gets the class for which icon should be shown for the distraction button
     * @returns {*}
     */
    $scope.distractionIcon = function () {
      if (activitiesService.selectedActivity.id === 0) {
        return 'fa fa-ban fa-2x';
      }
      return 'fa fa-bolt fa-2x';
    };

    /**
     * Returns if the distraction button should be disabled
     * @returns {*}
     */
    $scope.isDistractionDisabled = function () {
      if (activitiesService.selectedActivity.id === 0 && activitiesService.previousActivity === null) {
        return 'disabled';
      }
      return '';
    };

    /**
     * interface for service variables
     */
    $scope.distractionPressed = function () {
      activitiesService.distractionPressed();
    };

    /**
     * interface for service variables
     */
    $scope.clearPressed = function () {
      activitiesService.clearActivities();
    };

  });
