'use strict';

/**
 * @ngdoc function
 * @name timelyApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timelyApp
 */
angular.module('timelyApp')
  .controller('MainCtrl', function ($scope,activitiesService) {

        $scope.selectedActivity = activitiesService.activities[0];

        setInterval(function() {

            activitiesService.increaseActivity($scope.selectedActivity.name,1);
            $scope.$apply();}, 1000);

        $scope.newActivity= {
            name:'',
            colour:Please.make_color({
                golden: false, //disable default
                full_random: true //go full random
            })
        };

        activitiesService.addNewActivity('test','yellow',5);

        $scope.getActivities =function(){
            return activitiesService.activities;
        };

        $scope.getPercentage = function(activity){
          return activitiesService.getSegmentPercentage(activity.name);
        };

        $scope.setSelected = function(activity){
            $scope.selectedActivity = activity;
        };

        $scope.isSelected = function(activity){
          return(activity.id === $scope.selectedActivity.id);
        };

        $scope.addNewActivity = function(){
            activitiesService.addNewActivity($scope.newActivity.name,$scope.newActivity.colour,0);
            $scope.newActivity.colour = Please.make_color({
                    golden: false, //disable default
                    full_random: true //go full random
                });
        };

        $scope.convertTime = function(duration){

            if(duration <=60){
                return duration;
            }
           var seconds =  duration%60;
           var mins = Math.floor(duration/60);
            if(mins < 60){
                return mins + ":" + seconds;
            }
            var mins = mins %60;
            var hours = Math.floor(mins /60);
            return hours+ ":" + mins+ ":" + seconds;
        };



  });
