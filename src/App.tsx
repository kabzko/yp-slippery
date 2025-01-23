import React, { Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Login = React.lazy(() => import('@/pages/login/Content'));
const ForgotPassword = React.lazy(() => import('@/pages/forgot-password/Content'));
const ChangePassword = React.lazy(() => import('@/pages/change-password/Content'));

function App() {
  return (
    <Router>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path='/signin' element={<Login />} />
          <Route path='/reset-password' element={<ForgotPassword />} />
          <Route path='/v2/change-password' element={<ChangePassword />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
