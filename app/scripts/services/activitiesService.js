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

        that.activities = [{name:'distraction',colour:'#B10409',duration:1,selected:true}];
        that.selectedActivity = that.activities[0];

        that.addNewActivity = function(_name,_col,_duration)
        {
          var activity = {};
            activity.name = _name;
            activity.colour = _col;
            activity.duration = _duration ||1;
            activity.id =   that.activities.length;
            that.activities.push(activity);
            that.selectedActivity = activity;
        };


        that.getActivityById = function(id)
        {
            for(var i= 0, len =that.activities.length; i<len;i++) {
                if (that.activities[i].id === id) {
                   return that.activities[i];
                }
            }
            return null;
        };

        that.increaseActivity = function( amount){
            amount = amount|| 1;
            that.selectedActivity.duration += amount;
        };


        that.getTotalDuration = function(){
            var total =0;
            for(var i= 0, len =  that.activities.length; i<len;i++) {
                total +=   that.activities[i].duration;
            }
            return total;
        };

        that.getSegmentPercentage = function(id){
            var amount =  that.getActivityById(id).duration;
            var total = that.getTotalDuration();
            return (amount/total)*100;
        };

        that.setSelectedActivity= function(activity){
            for(var i = 0, len = that.activities.length; i < len; i++){
                that.activities[i].selected = false
            }
            that.selectedActivity = activity;
            that.selectedActivity.selected = true;
        };



  });
