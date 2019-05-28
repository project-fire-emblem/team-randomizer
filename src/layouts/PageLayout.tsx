import React from 'react';

import Navbar from '../components/navigation/MainNavbar';

const PageLayout: React.FC = props => {
  return (
    <main>
      <Navbar />
      {props.children}
    </main>
  );
};

export default PageLayout;
