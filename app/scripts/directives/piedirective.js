'use strict';

/**
 * @ngdoc directive
 * @name timelyApp.directive:pieDirective
 * @description
 * # pieDirective
 */
angular.module('timelyApp')
  .directive('pieDirective', function (activitiesService) {
    return {
      template: '<div id="holder"></div>',
      restrict: 'E',
        scope: {
            segdata: '='
        },
      link: function postLink(scope, element, attrs) {

          var backColour = attrs.backcol;
          var rapSegs = [];
          var paper, chart;

        // @todo move to  utility service
          function ColorLuminance(hex, lum) {

              // validate hex string
              hex = String(hex).replace(/[^0-9a-f]/gi, '');
              if (hex.length < 6) {
                  hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
              }
              lum = lum || 0;

              // convert to decimal and change luminosity
              var rgb = "#", c, i;
              for (i = 0; i < 3; i++) {
                  c = parseInt(hex.substr(i*2,2), 16);
                  c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
                  rgb += ("00"+c).substr(c.length);
              }

              return rgb;
          }



          Raphael.fn.pieChart = function (cx, cy, r, segments, stroke) {

            if(paper== undefined) paper = this;
            if(chart == undefined) chart = this.set();
            var rad = Math.PI / 180;


              function getLine(cx, cy, r, startAngle, endAngle) {
              var x1 = cx + r * Math.cos(-startAngle * rad),
                x2 = cx + r * Math.cos(-endAngle * rad),
                y1 = cy + r * Math.sin(-startAngle * rad),
                y2 = cy + r * Math.sin(-endAngle * rad);
              return ["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"].toString();
            }




              //iterate over all the saved segments checking there is still a corresponding segment

                for(var i= 0,len=segments.length;i<len;i++)
                {
                  //if the current segments path is undefined then make one
                  if(rapSegs[i] === undefined)
                  {
                   var seg= {
                    segpath : paper.path([]).attr({
                       fill: ColorLuminance(segments[i].colour, 0.2),
                       stroke: stroke,
                       "stroke-width": 0
                     }),
                     segpath2 : paper.path([]).attr({
                      fill: ColorLuminance(segments[i].colour, 0.2),
                      stroke: stroke,
                      "stroke-width": 0
                    })
                  };
                    seg.segpath.mouseover(function(){
                     // seg.segpath.scale(1.1, 1.1, cx, cy);
                    }).mouseout(function(){
                     // seg.segpath.scale(0.9, 0.9, cx, cy);
                    });
                    rapSegs.push(seg);
                    chart.push(rapSegs[i].segpath);
                    chart.push(rapSegs[i].segpath2);
                  }
                }


              var angle = 0,
                  total = 0,
                  start = 0;
                  var process = function (j) {
                      var value = segments[j].duration,
                          angleplus = 360 * value / total;

                    rapSegs[j].segpath.attr({path:getLine(cx, cy, r, angle, angle + angleplus),fill:segments[j].colour, stroke: stroke, "stroke-width": 0});
                    rapSegs[j].segpath2.attr({path:getLine(cx, cy, r*0.85, angle, angle + angleplus),fill: ColorLuminance(segments[j].colour,0.2), stroke: stroke, "stroke-width": 0});


                    // p = sector(cx, cy, r, angle, angle + angleplus, {fill:segments[j].colour, stroke: stroke, "stroke-width": 0}),
                          //p2 = sector(cx, cy, r*0.85, angle, angle + angleplus, {fill: ColorLuminance(segments[j].colour,0.2), stroke: stroke, "stroke-width": 0}),
                          //txt = paper.text(cx + (r + delta + 15) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), segments[j].name).attr({fill: bcolor, stroke: "none", opacity: 1, "font-family": 'Fontin-Sans, Arial', "font-size": "20px"});

                          //p.scale(1.1, 1.1, cx, cy);
                         // p2.scale(1.1,1.1,cx,cy);
                        //  p.attr({"stroke-width":2});


                      angle += angleplus;

                      start += .1;
                  };

              for (var i = 0, ii = segments.length; i < ii; i++) {
                  total += segments[i].duration;
              }

              for (var i = 0; i < ii; i++) {
                  process(i);
              }

              //centrall circle to make doughnut
              var circle = paper.circle(cx, cy, r*0.75).attr({fill:backColour, "stroke-width":0});
              chart.push(circle);
                //title
              var perc = paper.text(cx, cy -40,activitiesService.selectedActivity.name).attr({
                  fill: '#222222',
                  stroke: "none",
                  opacity: 1,
                  "font-family": 'Fontin-Sans, Arial',
                  "font-size": "30px"
              });
              chart.push(perc);
                  //percentage
                  var perc = paper.text(cx, cy, activitiesService.getSegmentPercentage(activitiesService.selectedActivity.name).toFixed(2)+'%').attr({
                      fill: '#222222',
                      stroke: "none",
                      opacity: 1,
                      "font-family": 'Fontin-Sans, Arial',
                      "font-size": "20px"
                  });
                  chart.push(perc);



              return chart;
          };

          var doughnut = Raphael(holder, 500, 500);

          scope.$watch('segdata', function(value) {

              doughnut.pieChart(250, 250, 150, scope.segdata, "#000");
          },true);


      }
    };
  });
