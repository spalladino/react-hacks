import Reflux from 'reflux';
import React from 'react/addons';

var InfinityScroll = React.createClass({

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    // From http://stackoverflow.com/a/9439807/12791
    window.onscroll = (ev) => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        if (this.props.onScrollToEnd) {
          this.props.onScrollToEnd();
        }
      }
    };
    return <div />;
  }

});

export default InfinityScroll;





