import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
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
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

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

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register....!!!</h2>
            <Form onSubmit={handleSubmitRegister}>
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