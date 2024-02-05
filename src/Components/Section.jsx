import React, { useState, useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useUserContext } from './UserContext/UserContext'
import * as Yup from 'yup'
import './Section.css'
import axios from "axios"
import { jwtDecode } from "jwt-decode"

//Validation schema for inputs
const ValidateSchema = Yup.object().shape({
    date: Yup.date()
        .required('Required'),
    paidTo: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    paidFor: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    amount: Yup.number()
        .required('Required'),
    description: Yup.string(),
});

function Section() {

    const [showAddMoney, setShowAddMoney] = useState(false);

    //Exporting state and functions from context
    const {
        showForm,
        setShowForm, expense,
        loading, error, edit,
        editInitialValues, deleteRow,
        fetchExpense, addNewExpense,
        editRow, handleEdit,
    } = useUserContext();

    //Decode token to get userId
    const token = localStorage.getItem("userToken");
    const decodedToken = token ? jwtDecode(token) : {};
    const userId = decodedToken.user.id;


    useEffect(() => {
        fetchExpense(userId);
    }, [expense]);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error}</p>;

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const initValues = {
        date: '',
        paidTo: '',
        paidFor: '',
        amount: 0,
        description: ''
    }

    return (
        <div className="mt-2">
            <div className="d-flex mb-2 bg-primar-subtle">
                <section>
                    {(showForm) ? null : <button className="btn btn-outline-primary me-1 " onClick={toggleForm}>Add Expense</button>}
                </section>
                <section>
                    {(!showAddMoney) ? <button className="btn btn-outline-danger me-1 " onClick={() => setShowAddMoney(!showAddMoney)}>Add Money</button> : null}
                </section>
                {showAddMoney ? (
                    <Formik
                        initialValues={{ amount: '' }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            const currentBalance = expense.currentBalance;
                            // USed to add money
                            axios({
                                method: 'POST',
                                url: 'https://pettycash-manager-7lxm.onrender.com/home/add-balance',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                data: JSON.stringify({ userId, ...values, currentBalance })
                            })
                                .then(response => {
                                    console.log(JSON.stringify({ userId, ...values, currentBalance }));
                                    console.log(response.data);
                                    setSubmitting(false);
                                    resetForm();
                                    setShowAddMoney(!showAddMoney);
                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                    setSubmitting(false);
                                })
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="d-flex">
                                    <div className="">
                                        <Field type="text" name="amount" className="form-control" />
                                    </div>
                                    <div className=" ms-2">
                                        <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isSubmitting}>
                                            Add Money
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>) : null}
            </div>
            <div style={{ fontWeight: "bold" }} >Balance : {expense.currentBalance}</div>
            {showForm && (
                <Formik
                    initialValues={(edit) ? editInitialValues : initValues}
                    validationSchema={ValidateSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                        if (!edit) {
                            addNewExpense(values, userId, { setSubmitting, resetForm });
                        }
                        else {
                            editRow(values, userId, { setSubmitting, resetForm });
                        }
                    }}>
                    {({ isSubmitting }) => (


                        <Form className="m-5">
                            {/* Date field */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="date">Date</label>
                                <Field type="date" name="date" className="form-control" />
                                <ErrorMessage name='date' >
                                    {msg => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {/* Paid to field */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="paidto" >Paid To</label>
                                <Field type="text" name='paidTo' className="form-control" />
                                <ErrorMessage className="text-danger" name='paidTo' >
                                    {msg => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {/* PAid for field */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="paidFor">Paid For</label>
                                <Field type="text" name='paidFor' className="form-control" />
                                <ErrorMessage name='paidFor'>
                                    {msg => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {/* Amount field */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="amount">Amount</label>
                                <Field type="number" name='amount' className="form-control" />
                                <ErrorMessage name='amount' >
                                    {msg => <div className="text-danger">{msg}</div>}
                                </ErrorMessage>
                            </div>

                            {/* Description field */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="description">Description</label>
                                <Field type="text" name='description' className="form-control" />
                            </div>

                            {/* Submit button  */}
                            <div className="justify-content-center">
                                <button type="submit" className="btn btn-primary btn-block mb-4"
                                    disabled={isSubmitting}>
                                    {(edit) ? 'Update' : 'Add'}
                                </button>
                                <button className="btn btn-danger btn-block mb-4 ms-4" onClick={toggleForm}>Cancel</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
            {/* Table for shoe list */}
            <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}>
                <div className="mask d-flex align-items-center h-100">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '700px' }}>
                                            <table className="table table-striped mb-0">
                                                <thead style={{ backgroundColor: "#002d72" }}>
                                                    <tr>
                                                        <th scope="col">S.NO</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Paid To</th>
                                                        <th scope="col">Paid For</th>
                                                        <th scope="col">Amount</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Balance</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Creating row for each element */}
                                                    {expense.data.map((exp, index) => (
                                                        <tr key={exp._id}>
                                                            <td>{index + 1}</td>
                                                            <td>{exp.date}</td>
                                                            <td>{exp.paidTo}</td>
                                                            <td>{exp.paidFor}</td>
                                                            <td>{exp.amount}</td>
                                                            <td>{exp.description}</td>
                                                            <td>{exp.balance}</td>
                                                            <td>
                                                                <button className='btn btn-primary p-1 '
                                                                    onClick={() => handleEdit(exp)}
                                                                    style={{ fontSize: '14px' }}><i className="bi bi-pen"></i> Edit</button>
                                                                <button className='btn btn-danger p-1 ms-2 ' type="button" onClick={() => deleteRow(userId, exp._id)} style={{ fontSize: '14px' }}><i className="bi bi-trash"></i> Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Section