import React from 'react';
import PolicyWrapper from './PolicyContextWrapper';
import CompanyPolicyPage from './CompanyPolicyPage';

const Content: React.FC = () => {
  return (
    <div className="h-screen text-sm bg-slate-50">
      <PolicyWrapper>
        <CompanyPolicyPage />
      </PolicyWrapper>
    </div>
  );
};

export default Content;
