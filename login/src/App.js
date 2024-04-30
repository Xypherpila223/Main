import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentLogin from './component/StudentLogin';
import RegistrationForm from './component/RegistrationForm';
import LoginForm from './component/LoginForm';
import SchoolPage from './component/SchoolPage';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SchoolPage />} />
                <Route path="/StudentLogin" element={<StudentLogin />} />
                <Route path="/registration" element={<RegistrationForm />} />
                <Route path="/LoginForm" element={<LoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
