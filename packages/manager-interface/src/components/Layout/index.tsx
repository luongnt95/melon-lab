import React, { Fragment } from 'react'
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import Content from '~/design/Layout';

const fixedTop = {
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1,
};

const fixedBottom = {
  position: 'fixed',
  width: '100%',
  bottom: 0,
  zIndex: 1,
};

const Layout = ({ children, noHeader = false, headerProps = {} }) => (
  <Fragment>
    {!noHeader && (
      <div style={fixedTop}>
        <Header {...headerProps} />
      </div>
    )}

    <Content foo="bar">{children}</Content>

    <div style={fixedBottom}>
      <Footer />
    </div>
  </Fragment>
);

export default Layout;