import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@renderer/components/Button/Button';

import './Home.css';

// i know i'm being pedantic doing this but muh type safety
type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <div className="home__content">
        <div className="home__header">
          <h1>Valence</h1>
          <p>Electron-based ATProto client.</p>
        </div>
        <div className="home__actions">
          <Link to="/login">
            <Button style={{ width: '150px' }}>Login</Button>
          </Link>
          <Link to="/register">
            <Button style={{ width: '150px' }}>Register</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
