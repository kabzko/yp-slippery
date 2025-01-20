import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Industry from '@/pages/admin/Industry';
import EmployeeRegistration from '@/pages/admin/Employee-Registration';
import Timekeeper from '@/pages/admin/Timekeeper';
import Payroll from '@/pages/admin/Payroll';
import CompanyPolicy from '@/pages/admin/Company-Policy';
import SelfService from '@/pages/admin/Self-Service';

import Login from '@/components/pages/login/Content';
import ForgotPassword from '@/components/pages/forgot-password/Content';
import ChangePassword from '@/components/pages/change-password/Content';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/industry" element={<Industry />} />
        <Route path="/employee-registration" element={<EmployeeRegistration />} />
        <Route path="/timekeeper" element={<Timekeeper />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/company-policy" element={<CompanyPolicy />} />
        <Route path="/self-service" element={<SelfService/>} />
      </Routes>
    </Router>
  );
}

export default App;
