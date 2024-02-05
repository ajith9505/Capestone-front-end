import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

//Validation Schema using yup
const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password must be at lease 8 characters.')
    .required('Required'),
});

function Register() {
  const navigateTo = useNavigate();
  return (
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
              <div className="card-body px-4 py-5 px-md-5">
                <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={RegistrationSchema}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log(JSON.stringify({ values }));

                    axios({
                      method: 'POST',
                      url: 'https://pettycash-manager-7lxm.onrender.com/auth/register',
                      mode: 'cors',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      data: JSON.stringify({ ...values }),
                    })
                      .then(response => {
                        console.log(JSON.stringify(values));
                        // Assuming successful registration if no errors
                        navigateTo('/');
                        // Handle response data here
                        console.log(response.data);
                        setSubmitting(false);
                        resetForm()
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        setSubmitting(false);
                      })
                  }}>
                  {({ isSubmitting }) => (
                    <Form>
                      {/* 2 column grid layout with text inputs for the first and last names  */}

                    {/* Name input */}
                      <div className="form-outline">
                        <label className="form-label" >Name</label>
                        <Field type="text" name="name" className="form-control" />
                        <ErrorMessage name='name' component="div"></ErrorMessage>
                      </div>


                      {/* Email input  */}
                      <div className="form-outline mb-4">
                        <label className="form-label" >Email address</label>
                        <Field type="email" name='email' className="form-control" />
                        <ErrorMessage name='email' component="div"></ErrorMessage>
                      </div>

                      {/* Password input  */}
                      <div className="form-outline mb-4">
                        <label className="form-label" >Password</label>
                        <Field type="password" name='password' className="form-control" />
                        <ErrorMessage name='password' component="div"></ErrorMessage>
                      </div>

                      {/* Submit button  */}
                      <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitting}>
                        Sign up
                      </button>
                      <Link to="/">Login</Link>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register