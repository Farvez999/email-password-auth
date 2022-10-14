import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const BootstrapRegister = () => {
    const [passwordError, setPasswordError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const handleSubmitRegister = (event) => {
        event.preventDefault();
        setRegisterSuccess(false)
        const form = event.target;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(name, email, password);

        if (!/(?=.*[A-Z])/.test(password)) {
            setPasswordError('Please provide at least one uppercase')
            return;
        }
        if (password.length < 6) {
            setPasswordError('Please password should be 6 characters')
            return;
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setPasswordError('Please least one special character')
            return;
        }
        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setRegisterSuccess(true)
                form.reset()
                verifyEmail()
                updateUserProfile(name)
            })
            .catch(error => {
                console.error('error', error)
                setPasswordError(error.message)
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('Please check your email and verify')
            });
    }

    const updateUserProfile = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('Display name update')
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register....!!!</h2>
            <Form onSubmit={handleSubmitRegister}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Enter your Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter your name" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>

                <p className='text-danger'>{passwordError}</p>
                {
                    registerSuccess && <p className='text-success'>User Create Successful</p>
                }
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
            <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
        </div>
    );
};

export default BootstrapRegister;