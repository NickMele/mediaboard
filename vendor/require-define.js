'use strict'

// Shim in vendor libraries and frameworks so they can be treated as modules.
require.define({
  'jquery': function(require, exports, module) {
    return module.exports = $;
  },
  'react': function(require, exports, module) {
    return module.exports = React;
  }
});
