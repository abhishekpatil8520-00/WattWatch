import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <Header />
      <main style={{ flex: '1', display: 'flex', flexDirection: 'column', paddingTop: '72px' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
