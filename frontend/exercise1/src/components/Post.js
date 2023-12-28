import React from 'react';
import { Image, Figure } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css';

const Post = ({ username, caption, imageUrl }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Figure>
          <Figure.Image
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <Figure.Caption>
            <h3>{username}</h3>
          </Figure.Caption>
        </Figure>
      </div>
      <Image className="post__image" src={imageUrl} alt="React" fluid />
      <Figure.Caption className="post__text">
        <strong>{username}</strong>
        {caption}
      </Figure.Caption>
    </div>
  );
};

export default Post;
