'use strict';

/**
 * @ngdoc service
 * @name timelyApp.utilitiesService
 * @description
 * # utilitiesService
 * Service in the timelyApp.
 */
angular.module('timelyApp')
  .service('utilitiesService', function () {
    var that = this;

    /**
     * change a given color by a certain luminance
     * @param hex
     * @param lum
     * @returns {string}
     * @constructor
     */
    that.ColorLuminance = function(hex, lum) {

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
  });
