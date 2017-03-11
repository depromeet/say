import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import './Post.css';

const Post = (props) => {
  const post = props.post;
  const userInfo = post.userInfo;
  return (
    <Card className={`animated fadeIn Card`}>
      <Card.Content>
        <Card.Header>
          {}
        </Card.Header>
        <Card.Description>
          {userInfo.gender === 'girl'?<Icon name='female'/>:<Icon name='male'/>}
          {post.contents}
        </Card.Description>
      </Card.Content>
      {post.fileUrl!==null?<Image src={post.fileUrl} />:''}
    </Card>
  );
};

export default Post;
