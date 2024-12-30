import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@renderer/components/Button/Button';

import './Home.css';

// i know i'm being pedantic doing this but muh type safety
type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <Link to="/about">
        <Button>Go to About</Button>
      </Link>
    </div>
  );
}

export default Home;
