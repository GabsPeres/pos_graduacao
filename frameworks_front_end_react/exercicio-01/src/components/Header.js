import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header() {
    return (
      <div>
        <header className="App-header">
          <h1>LOGO</h1>
          <ul className='Topic'>
            <li>Topic 1</li>
            <li>Topic 2</li>
            <li>Topic 3</li>
            <li>Topic 4</li>
          </ul>
          <div className='search-box'>
            <input type='text' placeholder='Search' className='search-input'></input>
            <span className='icon'>
              <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </span>
          </div>
        </header>
      </div>
    );
  }

  export default Header;