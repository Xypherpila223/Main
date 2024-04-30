import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../registration.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        schoolId: '',
        email: '',
        lastname: '',
        course: '',
        firstname: '',
        section: '',
        middleInitial: '',
        year: '',
        age: '',
        contact: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        axios.post('https://d53xrvhv-3002.asse.devtunnels.ms/studentprofile', formData)
            .then(response => {
                setFormData({
                    schoolId: '',
                    email: '',
                    lastname: '',
                    course: '',
                    firstname: '',
                    section: '',
                    middleInitial: '',
                    year: '',
                    age: '',
                    contact: '',
                    username: '',
                    password: '',
                    confirmPassword: ''
                });

                axios.post('https://d53xrvhv-3001.asse.devtunnels.ms/studentaccount', {
                    username: formData.username,
                    password: formData.password,
                })
                    .then(response => {
                        alert('Form data sent successfully');
                        alert('Username and password sent successfully');
                        navigate('/StudentLogin');
                    })
                    .catch(error => {
                        console.error('Error sending username and password:', error);
                        setErrorMessage('Error sending username and password');
                    });
            })
            .catch(error => {
                console.error('Error sending student profile data:', error);
                setErrorMessage('Error sending student profile data');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <h1 className="center-text">Student Register</h1>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="schoolId">School ID:</label>
                        <input
                            type="text"
                            id="schoolId"
                            name="schoolId"
                            placeholder="Enter your school ID"
                            value={formData.schoolId}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Enter your last name"
                            value={formData.lastname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="course">Course:</label>
                        <select
                            id="course"
                            name="course"
                            value={formData.course}
                            onChange={handleInputChange}
                        >
                            <option value="">Select course</option>
                            <option value="BSCS">BSCS</option>
                            <option value="BSBA">BSBA</option>
                            <option value="BSTM">BSTM</option>
                            <option value="BSHM">BSHM</option>
                            <option value="BSED">BSED</option>
                            <option value="BSPOLSCI">BSPOLSCI</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Enter your first name"
                            value={formData.firstname}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="section">Section:</label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            placeholder="Enter your section"
                            value={formData.section}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="middleInitial">M.I:</label>
                        <input
                            type="text"
                            id="middleInitial"
                            name="middleInitial"
                            maxLength="1"
                            placeholder="Enter your middle initial"
                            value={formData.middleInitial}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">Year Level:</label>
                        <select
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleInputChange}
                        >
                            <option value="">Select year level</option>
                            <option value="1ST YEAR">1ST YEAR</option>
                            <option value="2ND YEAR">2ND YEAR</option>
                            <option value="3RD YEAR">3RD YEAR</option>
                            <option value="4TH YEAR">4TH YEAR</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Enter your age"
                            value={formData.age}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact:</label>
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            placeholder="Enter your contact number"
                            value={formData.contact}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <button type="submit">Register</button>
                {errorMessage && <div className="error">{errorMessage}</div>}
            </div>
            <footer>
                <p>© SCCInventory - For school purpose only</p>
            </footer>
        </form>
    );
};

export default RegistrationForm;
