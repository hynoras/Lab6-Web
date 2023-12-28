import './App.css';
import Post from './components/Post';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase';
import ImageUpload from './components/imageUpload';
import axios from './axios';
// import Pusher from 'pusher-js';

// const pusher = new Pusher('5601e06d285cef4e6836', {
//   cluster: 'ap2',
// });

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function App() {
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [posts, setPosts] = useState([
    {
      username: "1 cai gi do",
      caption: "That la tho mong",
      imageUrl: "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-01.jpg"
    },
    {
      username: "Something beautifully",
      caption: "Such a beautiful scenery",
      imageUrl: "https://www.thedesignwork.com/wp-content/uploads/2011/10/Random-Pictures-of-Conceptual-and-Creative-Ideas-04.jpg"
    }
  ]);

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //     } else {
  //       setUser(null);
  //     }
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [user, username]);

  // const fetchPosts = async () => {
  //   await axios.get('/sync').then((response) => setPosts(response.data));
  // };

  // useEffect(() => {
  //   const channel = pusher.subscribe('posts');
  //   channel.bind('inserted', (data) => {
  //     fetchPosts();
  //   });
  // }, []);

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) =>
        authUser.user.updateProfile({ displayName: username })
      )
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  // const signIn = (e) => {
  //   e.preventDefault();
  //   auth.signInWithEmailAndPassword(email, password).catch((error) =>
  //     alert(error.message)
  //   );

  //   setOpenSignIn(false);
  // };

  return (
    <div className="app">
      <Modal show={open} onHide={() => setOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="app__signup">
            <img
              className="app__headerImage"
              src="logo192.png"
              alt="Header"
            />
            <Form.Group controlId="formBasicUsername">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={signUp}>
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <div className="app__header">
        <img className="app__headerImage" src="logo192.png" alt="Header" />
      </div>
      <Button onClick={() => setOpen(true)}>Sign Up</Button>
      {posts.map((post) => (
        <Post
          key={post._id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
