import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="body-container">
    <Navbar className="nav-container" />
    <div className="content-container">
      {children}
    </div>
  </div>
);

export default Layout;
