import React, {Component} from 'react';
import "./Message.css";

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      closing: false
    };
  }

  componentWillReceiveProps(nextProps){
    if(this.props.visible && !nextProps.visible){
      this.setState({
        closing: true
      });

      setTimeout(
        () => {
          this.setState({
            closing: false
          });
        }, 1000
      );
    }
  }

  render() {
    const { message, visible } = this.props;
    const { closing } = this.state;

    if(!visible && !closing) return null;
    return (
      <div className="Message-wrapper">
        <div className={`Message ${closing?'bounceOut':'bounceIn'} animated bounceIn`}>
          {message}
        </div>
      </div>
    );
  }
}

export default Message;
