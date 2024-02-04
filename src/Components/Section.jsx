import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"

const token = localStorage.getItem("userToken");
const decoded = token ? jwtDecode(token) : {};
const id = decoded.user.id;

function Section() {
    const [showForm, setShowForm] = useState(false);
    const [expense, setExpense] = useState({});

    const fetchExpense = async () => {
        try {
            await axios.get(`http://localhost:3000/home/user-expenses/${id}`)
                .then((res) => {
                    setExpense(res.data);
                })
        } catch (err) {
            console.error(err);
        }
    }

    console.log(id);
    console.log(expense)

    useEffect(() => {
        fetchExpense();
    }, [expense]);

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <div className="mt-2">
            {showForm ? null : <button className="float-end me-1 " onClick={toggleForm}>Add Expense</button>}
            {/* {showForm && ( */}
            <Formik
                initialValues={{
                    date: '',
                    paidTo: '',
                    paidFor: '',
                    amount: 0,
                    description: ''
                }}
                validationSchema={Yup.object().shape({
                    userId: id,
                    date: Yup.date()
                        .required('Required'),
                    paidTo: Yup.string()
                        .min(2, 'Too Short!')
                        .max(50, 'Too Long!')
                        .required('Required'),
                    paidFor: Yup.string()
                        .required('Required'),
                    amount: Yup.number()
                        .required('Required'),
                    description: Yup.string(),
                    balance: Yup.number()
                        .required('Required')
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log(JSON.stringify(values));

                    axios({
                        method: 'POST',
                        url: 'http://localhost:3000/auth/add-expence',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        data: JSON.stringify(values),
                    })
                        .then(response => {
                            console.log(JSON.stringify(values));
                            console.log(response.data);
                            setSubmitting(false);
                            resetForm();
                            setShowForm(!setShowForm);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            setSubmitting(false);
                        })
                }}>
                {({ isSubmitting }) => (
                    <Form className="m-5">
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="date">Date</label>
                            <Field type="date" name="date" className="form-control" />
                            <ErrorMessage name='date' >
                                {msg => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="paidto" >Paid To</label>
                            <Field type="text" name='paidTo' className="form-control" />
                            <ErrorMessage className="text-danger" name='paidTo' >
                                {msg => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        {/* Password input  */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="paidFor">Paid For</label>
                            <Field type="text" name='paidFor' className="form-control" />
                            <ErrorMessage name='paidFor'>
                                {msg => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="amount">Amount</label>
                            <Field type="number" name='amount' className="form-control" />
                            <ErrorMessage name='amount' >
                                {msg => <div className="text-danger">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="description">Description</label>
                            <Field type="text" name='description' className="form-control" />
                            {/* <ErrorMessage name='description' component="div"></ErrorMessage> */}
                        </div>


                        <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitting}>
                            Sign up
                        </button>

                        {/* Submit button  */}
                        {/* <div className="justify-content-center"> */}
                        {/* <button type="submit" className="btn btn-primary btn-block mb-4"  disabled={isSubmitting}>
                                    Add
                                </button> */}
                        {/* <button className="btn btn-danger btn-block mb-4 ms-4" onClick={toggleForm}>Cancel</button> */}
                        {/* </div> */}
                    </Form>
                )}
            </Formik>
            {/* )} */}
            <div>
                <div>S.No</div>
                <div>Date</div>
                <div>Paid To</div>
                <div>Paid For</div>
                <div>Amount</div>
                <div>Balance</div>
            </div>
            {expense.data.map((exp, index) => {
                console.log(exp.amount);
            })}
        </div>
    )
}

export default Section