import React from 'react';
import { getAuth } from "firebase/auth";
import app from '../firebase/firebase.init';

const auth = getAuth(app);

const Register = () => {
    const handleSubmitRegister = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)
    }
    return (
        <div>
            <form onSubmit={handleSubmitRegister}>
                <input type="email" name="email" id="" placeholder="Your email" />
                <br />
                <input type="password" name="password" id="" placeholder="Your password" />
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;