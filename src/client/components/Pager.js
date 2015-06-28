import Reflux from 'reflux';
import React from 'react/addons';

var Pager = React.createClass({
  render: function() {
    return <div className="pager">
      <a className={ (this.prevEnabled() ? "" : "pure-button-disabled") + " pure-button"} onClick={this.onPrev}>Prev</a>
      <span className="pageNumber">{this.props.currentPage}</span>
      <a className={ (this.nextEnabled() ? "" : "pure-button-disabled") + " pure-button"} onClick={this.onNext}>Next</a>
    </div>;
  },

  prevEnabled: function() {
    return (this.props.currentPage > 1);
  },

  nextEnabled: function() {
    return (this.props.currentPage < this.props.numPages);
  },

  onPrev: function(ev) {
    ev.preventDefault();
    if (this.prevEnabled()) this.onPageChange(this.props.currentPage-1);
  },

  onNext: function(ev) {
    ev.preventDefault();
    if (this.nextEnabled()) this.onPageChange(this.props.currentPage+1);
  },

  onInputChange: function(ev) {
    this.onPageChange(parseInt(ev.target.value));
  },

  onPageChange: function(page) {
    this.props.onPageChange(page);
  }
});

export default Pager;
