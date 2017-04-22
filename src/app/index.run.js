(function() {
  'use strict';

  angular
    .module('twitter')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
