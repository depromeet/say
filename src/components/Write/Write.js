import React, { Component } from 'react';
import { Button, Form, Label, Input } from 'semantic-ui-react'
import "./Write.css";


class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contents: ''
        };

    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.onCreatePost(this.state.contents, this.props.userInfo)
      this.setState({contents: ''})
    }

    render() {
        return(
          <div className="write-wrapper">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field className='input-box'>
                  <Input
                    placeholder='Post Content'
                    value={this.state.contents}
                    onChange={e => this.setState({ contents: e.target.value })}
                     />
                </Form.Field>
                <Button
                  type='submit'
                  className='submit-button'>
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </div>
        );
    }
}


export default Write;
