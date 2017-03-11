import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Login.css'
import { Button } from 'semantic-ui-react'


class Login extends Component {
  constructor(props) {
      super(props);
  }

    render() {
        const { closing } = this.props;
        return(
          <div className={`animated ${closing?'fadeOut':'fadeIn'} fadeIn Login`} >
            <div className="button-wrapper">
              <Button onClick={this.props.onAuthAnonymouslyLoginFromGirl}>Girl Login</Button>
            </div>
            <div className="button-wrapper">
              <Button onClick={this.props.onAuthAnonymouslyLoginFromBoy}>Boy Login</Button>
            </div>
          </div>
        );
    }
}


export default Login;
