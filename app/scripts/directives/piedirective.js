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
          var centralCircle,activeTitle,activePercentage
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

            //We only want to set things up once, then update them. This is to stop copious redraws and help ease of animation and interaction etc
            if(paper== undefined) paper = this;
            if(chart == undefined) chart = this.set();

            if(centralCircle == undefined){
              centralCircle = paper.circle(cx, cy, r*0.95).attr({fill:backColour, "stroke-width":0});
              chart.push(centralCircle);
            }

            if(activeTitle === undefined)
            {
              activeTitle = paper.text(cx, cy -40,activitiesService.selectedActivity.name).attr({
                fill: '#c1c1c5',
                stroke: "none",
                opacity: 1,
                "font-family": 'Fontin-Sans, Arial',
                "font-size": "30px"
              });
              chart.push(activeTitle);
            }

            if(activePercentage ===undefined){
              activePercentage = paper.text(cx, cy, activitiesService.getSegmentPercentage(activitiesService.selectedActivity.id).toFixed(2)+'%').attr({
                fill: '#B1B1B5',
                stroke: "none",
                opacity: 1,
                "font-family": 'Fontin-Sans, Arial',
                "font-size": "20px"
              });
              chart.push(activePercentage);
            }


            var rad = Math.PI / 180;


              function getLine(cx, cy, r, startAngle, endAngle,n) {
                n = n || 0.76;
                var x1 = cx + r * Math.cos(-startAngle * rad),
                  x2 = cx + r * Math.cos(-endAngle * rad),
                  y1 = cy + r * Math.sin(-startAngle * rad),
                  y2 = cy + r * Math.sin(-endAngle * rad),
                  sx =  cx + r * n * Math.cos(-startAngle * rad),
                  sy =  cy + r * n *Math.sin(-startAngle * rad),
                  sx2 =  cx + r * n * Math.cos(-endAngle * rad),
                  sy2 =  cy + r * n *Math.sin(-endAngle * rad);

                return ["M",sx,sy,"L",x1,y1,"A", r, r,0, +(endAngle - startAngle > 180), 0, x2, y2,"L",sx2,sy2,"A", r*n, r*n,0, +(endAngle - startAngle > 180),1, sx, sy].toString();
               // return ["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"].toString();
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
                    var tempr = r, n =0.9;

                    if(segments[j].selected){
                      tempr*=1.1;
                      n = 0.81;
                    }
                    rapSegs[j].segpath.attr({path:getLine(cx, cy, tempr, angle, angle + angleplus),fill:segments[j].colour, stroke: stroke, "stroke-width": 0});
                    rapSegs[j].segpath2.attr({path:getLine(cx, cy, r*0.85, angle, angle + angleplus,0.9),fill: ColorLuminance(segments[j].colour,0.2), stroke: stroke, "stroke-width": 0});

                      angle += angleplus;
                      start += .1;
                  };

              for (var i = 0, ii = segments.length; i < ii; i++) {
                  total += segments[i].duration;
              }
              for (var i = 0; i < ii; i++) {
                  process(i);
              }

              activeTitle.attr({test:activitiesService.selectedActivity.name});
              activePercentage.attr({text:activitiesService.getSegmentPercentage(activitiesService.selectedActivity.id).toFixed(2)+'%'});
              return chart;
          };

          var doughnut = Raphael(holder, 500, 500);

          scope.$watch('segdata', function(value) {

              doughnut.pieChart(250, 250, 150, scope.segdata, "#000");
          },true);


      }
    };
  });
