import React, { Component } from 'react';
import { Button, Form, Input, Icon, Image } from 'semantic-ui-react'
import "./Write.css";
import Dropzone from 'react-dropzone';


class Write extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contents: '',
          file: null
        };
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.props.onCreatePost(this.props.userInfo, this.state.contents, this.state.file)
      this.setState({contents: '', file: null})
    }

    onDrop = (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles[0]!==undefined){
        this.setState({...this.state, file: acceptedFiles[0]});
      }else{
        this.props.onPostShowMessage("2MB 이하로만 가능합니다.")
      }
    }

    render() {
        return(
          <div className="write-wrapper">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Field className='input-box'>
                  <Input
                    placeholder='너의 아무말을 보여줘😏'
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
              <div className='image-box'>
                <Dropzone onDrop={this.onDrop} maxSize={2097152} accept={`image/*`} className={`drop-zone`}>
                  <div className='explanation'>
                    {this.state.file!==null?<Image src={this.state.file.preview}/>:<Icon name="image" size="big"/>}
                  </div>
                </Dropzone>
              </div>
            </Form>
          </div>
        );
    }
}


export default Write;
