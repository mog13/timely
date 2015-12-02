'use strict';

/**
 * @ngdoc directive
 * @name timelyApp.directive:pieDirective
 * @description
 * # pieDirective
 */
angular.module('timelyApp')
  .directive('pieDirective', function () {
    return {
      template: '<div id="holder"></div>',
      restrict: 'E',
        scope: {
            segdata: '='
        },
      link: function postLink(scope, element, attrs) {

          Raphael.fn.pieChart = function (cx, cy, r, segments, stroke) {
              var paper = this,
                  rad = Math.PI / 180,
                  chart = this.set();

              function sector(cx, cy, r, startAngle, endAngle, params) {
                  var x1 = cx + r * Math.cos(-startAngle * rad),
                      x2 = cx + r * Math.cos(-endAngle * rad),
                      y1 = cy + r * Math.sin(-startAngle * rad),
                      y2 = cy + r * Math.sin(-endAngle * rad);
                  return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
              }

              var angle = 0,
                  total = 0,
                  start = 0,
                  process = function (j) {
                      //console.log(segments[j]);
                      var value = segments[j].duration,
                          angleplus = 360 * value / total,
                          popangle = angle + (angleplus / 2),
                          color = "hsb(" + start + ", 1, .5)",
                          ms = 500,
                          delta = 30,
                          bcolor = "hsb(" + start + ", 1, 1)",
                          p = sector(cx, cy, r, angle, angle + angleplus, {fill:segments[j].colour, stroke: stroke, "stroke-width": 0}),
                          txt = paper.text(cx + (r + delta + 15) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), segments[j].name).attr({fill: bcolor, stroke: "none", opacity: 1, "font-family": 'Fontin-Sans, Arial', "font-size": "20px"});
                      p.mouseover(function () {
                          p.animate({scale: [1.1, 1.1, cx, cy]}, ms, "elastic");
                          txt.animate({opacity: 1}, ms, "elastic");
                      }).mouseout(function () {
                          p.animate({scale: [1, 1, cx, cy]}, ms, "elastic");
                          txt.animate({opacity: 0}, ms);
                      });
                      angle += angleplus;
                      chart.push(p);
                      chart.push(txt);
                      start += .1;
                  };
              for (var i = 0, ii = segments.length; i < ii; i++) {
                  total += segments[i].duration;
              }
              for (var i = 0; i < ii; i++) {
                  process(i);
              }
              var circle = paper.circle(cx, cy, r*0.75).attr({fill:'white', "stroke-width":0});
              chart.push(circle);
              return chart;
          };
          var doughnut = Raphael(holder, 500, 500);
          scope.$watch('segdata', function(value) {
              doughnut.clear();
              doughnut.pieChart(250, 250, 150, scope.segdata, "#000");
          },true);


      }
    };
  });
