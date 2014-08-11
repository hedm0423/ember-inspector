import BasicAdapter from "adapters/basic";
var $ = Ember.$;

export default BasicAdapter.extend({
  init: function() {
    this._super();
    this._connect();
  },

  sendMessage: function(options) {
    options = options || {};
    window.emberInspector.w.postMessage(options, window.emberInspector.url);
  },

  _connect: function() {
    var self = this;
    window.addEventListener('message', function(e) {
      if (e.origin !== window.emberInspector.url) {
        return;
      }
      var message = e.data;
      if (message.from === 'devtools') {
        self._messageReceived(message);
      }
    });

    $(window).on('unload', function() {
        self.sendMessage({
          unloading: true
        });
    });
  }
});