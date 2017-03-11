import React from 'react';
import { Card } from 'semantic-ui-react'
import './Post.css';

const Post = (props) => {
  const userInfo = props.userInfo;
  return (
    <Card className={`animated fadeIn Card`}>
      <Card.Content
        header={userInfo.gender}
        description={props.contents}
      />
    </Card>
  );
};

export default Post;
