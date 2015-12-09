'use strict';

/**
 * @ngdoc service
 * @name timelyApp.activitysService
 * @description
 * # activitysService
 * Service in the timelyApp.
 */
angular.module('timelyApp')
  .service('activitiesService', function () {
    var that = this;


    that.resetActivities = function () {
      that.activities = [{name: 'distraction', colour: '#B10409', duration: 1, selected: true, id: 0}];
      that.selectedActivity = that.activities[0];
      that.previousActivity = null;
    };

    that.resetActivities();


    that.addNewActivity = function (_name, _col, _duration) {
      var activity = {};
      activity.name = _name;
      activity.colour = _col;
      activity.duration = _duration || 1;
      activity.id = that.activities.length;
      that.activities.push(activity);
      that.selectedActivity = activity;
      that.setSelectedActivity(that.selectedActivity);
    };


    that.getActivityById = function (id) {
      for (var i = 0, len = that.activities.length; i < len; i++) {
        if (that.activities[i].id === id) {
          return that.activities[i];
        }
      }
      return null;
    };

    that.increaseActivity = function (amount) {
      amount = amount || 1;
      that.selectedActivity.duration += amount;

    };


    that.getTotalDuration = function () {
      var total = 0;
      for (var i = 0, len = that.activities.length; i < len; i++) {
        total += that.activities[i].duration;
      }
      return total;
    };

    that.getSegmentPercentage = function (id) {
      var amount = that.getActivityById(id).duration;
      var total = that.getTotalDuration();
      return (amount / total) * 100;
    };

    that.setSelectedActivity = function (activity) {
      for (var i = 0, len = that.activities.length; i < len; i++) {
        that.activities[i].selected = false
      }
      that.selectedActivity = activity;
      that.selectedActivity.selected = true;

      //if we are not in distraction then we dont need to keep a record of where weve come from
      if (that.selectedActivity.id !== 0) {
        that.previousActivity = null;
      }
    };

    that.getSelectedActivity = function () {
      return that.getActivityById(that.selectedActivity.id);
    };

    that.distractionPressed = function () {

      //there was no previous activity so switch to distraction
      if (that.previousActivity === null) {
        // only do something if the current activity isnt distraction
        if (that.selectedActivity.id !== 0) {
          //store previous activity
          that.previousActivity = that.selectedActivity;
          that.setSelectedActivity(that.activities[0]);
        }
      }
      else { // if there was a previous activity then return to it
        that.setSelectedActivity(that.previousActivity);
      }
    };

    that.saveToLocalStorage = function () {
      localStorage.setItem("activities", JSON.stringify(that.activities));
      localStorage.setItem("time", new Date());

    };

    that.getTimeDifference = function () {
      if (localStorage.time) {
        //add the transition
        var curDate = new Date();
        var lastDate = new Date(localStorage.time);
        return (curDate - lastDate) / 1000;
      }
      return -1;
    };

    that.loadFromLocalStorage = function (triggerThreshold) {
      if (localStorage.activities) {
        if (that.getTimeDifference() > triggerThreshold) {
          that.activities = JSON.parse(localStorage.activities);
          for (var i = 0, len = that.activities.length; i < len; i++) {
            if (that.activities[i].selected) {
              that.setSelectedActivity((that.activities[i]));
            }
          }

          that.getSelectedActivity().duration += Math.floor(that.getTimeDifference());
        }

      }


    };


    that.clearActivities = function () {
      that.resetActivities();
      localStorage.clear();
    }


  });
