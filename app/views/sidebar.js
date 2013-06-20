var _ = require('underscore');
var Backbone = require('backbone');

var views = {
  branches: require('./sidebar/branches'),
  history: require('./sidebar/history'),
  orgs: require('./sidebar/orgs'),
  settings: require('./sidebar/settings')
};

var templates = require('../../dist/templates');

module.exports = Backbone.View.extend({
  template: _.template(templates.drawer),

  subviews: [],

  initialize: function(options) {
    _.bindAll(this);
  },

  initSubview: function(subview, options) {
    if (!views[subview]) return false;

    options = _.clone(options) || {};

    this[subview] = new views[subview](options);
    this[subview].setElement(this.$el.find('#' + subview));

    this.subviews.push(this[subview]);
    // this.subviews[subview] = this[subview];

    // TODO: is this.subviews being filled with abandoned views preventing garbage collection?
    console.log(this.subviews);

    this.renderSubview(subview);
  },

  renderSubview: function(subview) {
    this[subview].render();
  },

  render: function(options) {
    this.$el.html(this.template());

    _.invoke(this.subviews, 'render');

    return this;
  },

  open: function() {
    debugger;

    // TODO: call when in 'tree'/repo mode and when authenticated but no mode (profile)?
    this.$el.toggleClass('open', true);
    this.$el.toggleClass('mobile', false);

    return false;
  },

  close: function() {
    this.$el.toggleClass('open mobile', false);
  },

  remove: function() {
    _.invoke(this.subviews, 'remove');
    this.subviews = [];

    Backbone.View.prototype.remove.apply(this, arguments);
  }
});