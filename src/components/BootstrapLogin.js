import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app)

const BootstrapLogin = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('');

    const handleSubmit = event => {
        event.preventDefault()
        setSuccess(false)
        const form = event.target;
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess(true)
            })
            .catch(error => {
                console.error('error', error)
            })
    }


    const handleEmailBlur = event => {
        const email = event.target.value;
        setUserEmail(email);
    }

    const handleForgetPassword = () => {
        if (!userEmail) {
            alert('Please enter your email')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('Password reset email sent. Please check your email')
            })
            .catch((error) => {
                console.error('error', error)
            });
    }
    return (
        <div className='w-50 mx-auto'>
            <h2>Please Login!!!</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleEmailBlur} type="email" name='email' placeholder="Enter email" required />

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>

                {/* <p className='text-danger'>{passwordError}</p> */}
                {
                    success && <p className='text-success'>User Login Successful</p>
                }
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p><small>New to this website? Please <Link to='/register'>Register</Link></small></p>
            <p><small>Forget Password?<Button onClick={handleForgetPassword}>Reset password</Button></small></p>
        </div>
    );
};

export default BootstrapLogin;