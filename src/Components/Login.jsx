import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useUserContext } from './UserContext/UserContext'
import './Login.css'
import axios from 'axios'

//Validation Schema using yup
const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at lease 8 characters.')
        .required('Required'),
});

function Login() {

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
       await axios({
            method: 'POST',
            url: 'https://pettycash-manager-7lxm.onrender.com/auth/login',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(values),
        })
            .then((response) => {
                localStorage.setItem('userToken', response.data.token);
                setUser({ token: response.data.token })
                navigateTo('/home');
                setSubmitting(false);
            })
            .catch(function (error) {
                setFieldError(error.response.data.message == 'user not found' ? 'email' : 'password', error.response.data.message);
                setSubmitting(false);
            })
    };

    const { setUser } = useUserContext();
    const navigateTo = useNavigate();

    return (
        // Section: Design Block 
        <section className="background-radial-gradient overflow-hidden">
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                            Petty Cash <br />
                            <span style={{ color: "hsl(218, 81%, 55%)" }}>Manager</span>
                        </h1>
                        <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                            Petty cash is a small amount of cash that is kept on the company
                            premises to pay for minor cash needs. Examples of these payments
                            areoffice supplies, cards, flowers, and so forth.
                        </p>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                        <h3 className='mt-3 ms-5'>Login</h3>
                            <div className="card-body px-4 py-3 px-md-5">
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={LoginSchema}
                                    onSubmit={handleSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            {/* Email input  */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" style={{ fontWeight: 'bold', fontSize : '14px'}} htmlFor="email">Email address</label>
                                                <Field type="email" name="email" className="form-control" />
                                                <ErrorMessage name='email'>
                                                    {msg => <div className="text-danger" style={{ fontWeight: 'bold', fontSize : '13px'}}>{msg}</div>}
                                                </ErrorMessage>

                                            </div>

                                            {/* Password input  */}
                                            <div className="form-outline mb-4">
                                                <label className="form-label" style={{ fontWeight: 'bold', fontSize : '14px'}} htmlFor="password">Password</label>
                                                <Field type="password" name="password" className="form-control" />
                                                <ErrorMessage name='password'>
                                                    {msg => <div className="text-danger" style={{ fontWeight: 'bold', fontSize : '13px'}}>{msg}</div>}
                                                </ErrorMessage>
                                                <div>
                                                </div>
                                            </div>

                                            {/* Submit button  */}
                                            <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitting}>
                                                Login
                                            </button>
                                            <br />
                                            <p>Not a member? <Link to="/register">Register</Link></p>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Login