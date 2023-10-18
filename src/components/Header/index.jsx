
import { Component } from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="Header">
      <h1>Pokemon Explorer</h1>
      <nav>
        <button>
          <Link to="/">Gallery</Link>
        </button>
        <button>
          <Link to="/list">List View</Link>
        </button>
      </nav>
    </header>
  );
};

export default Header;
