import React, { Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import('@/pages/login/Content'));
const ForgotPassword = React.lazy(() => import('@/pages/forgot-password/Content'));
const ChangePassword = React.lazy(() => import('@/pages/change-password/Content'));
const Industry = React.lazy(() => import('@/pages/admin/Industry'));
const SelfService = React.lazy(() => import('@/pages/admin/Self-Service'));

function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/signin' element={<Login />} />
          <Route path='/reset-password' element={<ForgotPassword />} />
          <Route path='/slippery/change-password' element={<ChangePassword />} />
          <Route path='/industry' element={<Industry />} />
          <Route path='/self-service' element={<SelfService />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
