import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import './Post.css';

const Post = (props) => {
  const userInfo = props.userInfo;
  return (
    <Card className={`animated fadeIn Card`}>
      <Card.Content>
        <Card.Header>
          {}
        </Card.Header>
        <Card.Description>
          {userInfo.gender === 'girl'?<Icon name='female'/>:<Icon name='male'/>}
          {props.contents}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default Post;
