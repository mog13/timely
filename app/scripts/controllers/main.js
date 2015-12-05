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

    activitiesService.addNewActivity('test',Please.make_color({
      golden: false, //disable default
      full_random: true //go full random
    }),5);
    activitiesService.addNewActivity('test',Please.make_color({
      golden: false, //disable default
      full_random: true //go full random
    }),5);
    activitiesService.addNewActivity('test',Please.make_color({
      golden: false, //disable default
      full_random: true //go full random
    }),5);

        $scope.newActivity= {
            name:'',
            colour:Please.make_color({
                golden: false, //disable default
                full_random: true //go full random
            })
        };

        setInterval(function() {
            activitiesService.increaseActivity(1);
            $scope.$apply();}, 1000);





        $scope.getActivities =function(){
            return activitiesService.activities;
        };

        $scope.getPercentage = function(activity){
          return activitiesService.getSegmentPercentage(activity.name);
        };

        $scope.setSelected = function(activity){
            activitiesService.setSelectedActivity(activity);
        };

        $scope.isSelected = function(activity){
          return(activity.id === activitiesService.selectedActivity.id);
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
