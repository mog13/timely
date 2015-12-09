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
    }),60);
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


    activitiesService.loadFromLocalStorage();
    setInterval(function() {
      activitiesService.saveToLocalStorage();
      activitiesService.loadFromLocalStorage();
      $scope.$apply();
      }, 10000);





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


        function padTime(number) {
          return (number < 10 ? '0' : '') + number
        }

        $scope.convertTime = function(duration){

          var seconds,minutes,hours;

          seconds = duration%60;
          minutes =  Math.floor(duration/60);
          hours =  Math.floor(minutes/60);
          minutes = minutes%60;


            return padTime(hours)+ ":" + padTime(minutes)+ ":" + padTime(seconds);
        };

    $scope.distractionIcon = function()
    {
      if(activitiesService.selectedActivity.id ===0)
      {
        return 'fa fa-ban fa-2x';
      }
      return 'fa fa-bolt fa-2x';
    };

    $scope.isDistractionDisabled = function()
    {
      if(activitiesService.selectedActivity.id ===0 && activitiesService.previousActivity === null){
        return 'disabled';
      }
      return '';
    };

    $scope.distractionPressed = function(){
      activitiesService.distractionPressed();
    };

    $scope.clearPressed = function(){
      activitiesService.clearActivities();
    };

  });
