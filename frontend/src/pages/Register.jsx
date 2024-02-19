import React, { useEffect, useState } from 'react';
import '../css/App.css'; // Import your CSS file for login styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { backend_urls, frontend_urls } from '../urrls';

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        // If validation passes, proceed with registration
        registerUser(username, password);
    };

    const registerUser = (username, password) => {
        const data = {
            username: username,
            password: password
        };

        axios.post(
            backend_urls.register_user,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            console.log('Response:', response.data);
            localStorage.setItem('@user', response.data.user_id)
            navigate(frontend_urls.home);
        })
        .catch(error => {
            console.error('Error:', error);
            setError('Registration failed. Please try again.');
        });
    };


    useEffect(
        () => {

            const userId = localStorage.getItem('@user')

            if (userId) {
                navigate("/")
            }

        }, []
    )


    return (
        <div className='register-container'>
            <div className='register-form'>
                <div className='text-center' style={{ color: 'black' }}>Register</div>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error" style={{ color: 'red', fontSize: '14px' }}>*{error}</div>}
                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' id='username' value={username} onChange={handleUsernameChange} placeholder='Enter your username' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={handlePasswordChange} placeholder='Enter your password' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='confirmPassword'>Confirm Password</label>
                        <input type='password' id='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder='Confirm your password' />
                    </div>
                    <button type="submit" className='btn-submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
