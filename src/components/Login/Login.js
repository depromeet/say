import React, { Component } from 'react';
import './Login.css'
import { Button, Icon } from 'semantic-ui-react'


class Login extends Component {

    render() {
        const { closing } = this.props;
        return(
          <div className={`animated ${closing?'fadeOut':'fadeIn'} fadeIn Login`} >
            <div className="button-wrapper">
              <Button onClick={this.props.onAuthAnonymouslyLoginFromGirl}><Icon name='female'/> Login</Button>
            </div>
            <div className="button-wrapper">
              <Button onClick={this.props.onAuthAnonymouslyLoginFromBoy}><Icon name='male'/> Login</Button>
            </div>
          </div>
        );
    }
}


export default Login;
