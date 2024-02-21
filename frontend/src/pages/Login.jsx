import React, { useEffect, useState } from 'react';
import '../css/App.css'; // Import your CSS file for login styles
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backend_urls, frontend_urls } from '../urrls';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setError('Username and password are required.');
            return;
        }
        if (username.length < 4 || password.length < 4) {
            setError('Username and password must be at least 4 characters long.');
            return;
        }
        // If validation passes, proceed with checking user
        checkUser(username, password);
    };

    const checkUser = (username, password) => {
        const data = {
            username: username,
            password: password
        };

        axios.post(
            backend_urls.check_user,
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
            setError('Failed to log in. Please try again.');
            navigate(frontend_urls.register)
        });
    };

    useEffect(
        () => {
            const user = localStorage.getItem("@user")
            if (user) {
                navigate(frontend_urls.home)
            }
        }, []
    )

    return (
        <div className='login-container'>
            <div className='login-form'>
                <div className='m-auto' style={{color:'black'}}>Login</div>
                <form onSubmit={handleSubmit}>
                {error && <div className="error" style={{color:'red', fontSize: '14px'}}>*{error}</div>}
                    <div className='input-group'>
                        <label htmlFor='username'>Name</label>
                        <input type='text' id='username' value={username} onChange={handleUsernameChange} placeholder='Enter your name' />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={handlePasswordChange} placeholder='Enter your password' />
                    </div>
                    <button type="submit" className='btn-submit'>Submit</button>
                </form>
                <div style={{color:'black', fontSize: '16px'}}>not registerd. <Link to={frontend_urls.register}>click here</Link> </div>
            </div>
        </div>
    );
}

export default Login;
