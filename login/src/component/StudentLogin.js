import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import studentImage from '../img/student1.jpg';
import '../App.css'; 

function StudentLogin() {
    const [loginMethod, setLoginMethod] = useState('username');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleToggleMethod = () => {
        setLoginMethod(prevMethod => prevMethod === 'username' ? 'email' : 'username');
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('https://d53xrvhv-3001.asse.devtunnels.ms/studentaccount');
            const data = await response.json();
            const foundUser = data.find(user => user.username === username && user.password === password);
            if (foundUser) {
                alert('Login successful!');
                // Redirect to another page
                navigate('/page1');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container1">
            <div className="login-box1">
                <div className="left-side">
                    <div className="logo">
                        <img src={studentImage} alt="Student Friendly Logo" />
                        <div className="logo-text">STUDENT</div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="form-group1">
                        <label htmlFor="username">{loginMethod === 'username' ? 'Username:' : 'Email:'}</label>
                        <input
                            type={loginMethod === 'username' ? 'text' : 'email'}
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={loginMethod === 'username' ? 'Enter your username' : 'Enter your email'}
                        />
                    </div>
                    <div className="form-group1">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="login-method">
                        <Link to="/registration">Register?</Link>
                        <Link to="/LoginForm">Forgot Password?</Link>
                    </div>
                    <button id="toggleMethod" onClick={handleToggleMethod}>{loginMethod === 'username' ? 'Login with Email' : 'Login with Username'}</button>
                    <div className="form-group1">
                        <button id="loginButton" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLogin;
