import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TimekeeperWrapper from './TimekeeperContextWrapper';
import Page from './PageComponent';
import AccountWrapper from './AccountContext';

export default function Content() {
  return (
    <div className="h-screen text-sm bg-slate-50">
      <TimekeeperWrapper>
        <Header />
        <AccountWrapper>
          <Page />
          <Footer />
        </AccountWrapper>
      </TimekeeperWrapper>
    </div>
  );
}
