import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Register.css'
import { Button, Form, Label, Icon, Header, Divider } from 'semantic-ui-react'


class Register extends Component {
  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        name: '',
      };

  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onAuthRegisterRequesting(this.state.email, this.state.password, this.state.name)
    this.setState({
      email: '',
      password: '',
    })

  }

    render() {
      const { closing } = this.props;
        return(
          <div className={`animated ${closing?'fadeOut':'fadeIn'} fadeIn Register`} >
            <Form onSubmit={this.handleSubmit}>
              <Header as='h2' icon>
                <Icon name='signup' />
                Register
              </Header>
              <Form.Field>
                <Label pointing="below">Email</Label>
                <input
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                  placeholder="Email"
                />
              </Form.Field>
              <Form.Field>
                <Label pointing="below">Password</Label>
                <input
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                  placeholder="Password"
                />
              </Form.Field>
              <Form.Field>
                <Label pointing="below">Name</Label>
                <input
                  type="text"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                  placeholder="Name"
                />
              </Form.Field>
              <Button type='submit'>Register</Button>
            </Form>
            <Divider/>
            <Link to='/login'><Button>Login</Button></Link>
            <Button onClick={this.props.onAuthLoginWithFacebook}>Facebook Login</Button>
          </div>
        );
    }
}


export default Register;
