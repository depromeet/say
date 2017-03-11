import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'
import "./Loading.css";

class Loading extends Component {
    render() {
      const visible = this.props.visible;
      if(!visible) return null;
      return (
        <div className="Loading-wrapper">
          <Icon loading name='spinner' size='big' />

        </div>
      );
    }
}

export default Loading;
