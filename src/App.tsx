import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Industry = lazy(() => import('./pages/admin/Industry'));
const EmployeeRegistration = lazy(() => import('./pages/admin/Employee-Registration'));
const Timekeeper = lazy(() => import('./pages/admin/Timekeeper'));
const Payroll = lazy(() => import('./pages/admin/Payroll'));
const CompanyPolicy = lazy(() => import('./pages/admin/Company-Policy'));
const SelfService = lazy(() => import('./pages/admin/Self-Service'));

function App() {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/employee-registration" element={<EmployeeRegistration />} />
          <Route path="/timekeeper" element={<Timekeeper />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/company-policy" element={<CompanyPolicy />} />
          <Route path="/self-service" element={<SelfService/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
