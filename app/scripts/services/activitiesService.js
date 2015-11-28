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
        that.activities = [{name:'distraction',color:'red',duration:0}];

        that.addNewActivity = function(_name,_col,_duration)
        {
          var activity = {};
            activity.name = _name;
            activity.colour = _col;
            activity.duration = _duration ||0;
            activity.id =   that.activities.length;
            that.activities.push(activity);
        };


        that.getActivityByName = function(name)
        {
            for(var i= 0, len =that.activities.length; i<len;i++) {
                if (that.activities[i].name === name) {
                   return that.activities[i];
                }
            }
            return null;
        };

        that.increaseActivity = function(name, amount){
            amount = amount|| 1;
            that.getActivityByName().duration += amount;
        };


        that.getTotalDuration = function(){
            var total =0;
            for(var i= 0, len =  that.activities.length; i<len;i++) {
                total +=   that.activities[i].duration;
            }
            return total;
        };

        that.getSegmentPercentage = function(name){
            var amount =  that.getActivityByName(name).duration;
            var total = that.getTotalDuration();
            return (amount/total)*100;
        }


  });
