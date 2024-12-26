import AttendanceLog from './pages/AttendanceLog';
import Auth from './pages/Auth';
import CheckInOut from './pages/CheckInOut';
import Dashboard from './pages/Dashboard';
import FacialAuth from './pages/FaceAuth';
import { RegisterPage } from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faceauth" element={<FacialAuth/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/checkinout" element={<CheckInOut/>}/>
        <Route path="/attendanceLog" element={<AttendanceLog/>}/>
      </Routes>
    </Router>
  );
}

export default App;
