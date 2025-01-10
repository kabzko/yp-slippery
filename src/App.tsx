import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/admin/Dashboard';
import Industry from './pages/admin/Industry';
import EmployeeRegistration from './pages/admin/Employee-Registration';
import Timekeeper from './pages/admin/Timekeeper';
import Payroll from './pages/admin/Payroll';
import CompanyPolicy from './pages/admin/Company-Policy';
import SelfService from './pages/admin/Self-Service';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
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
