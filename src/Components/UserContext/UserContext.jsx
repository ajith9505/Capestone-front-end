import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode"
import axios from "axios";


const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userToken');
  }

  const [showForm, setShowForm] = useState(false);
  const [expense, setExpense] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
  const [rowId, setRowId] = useState('');
  const [editInitialValues, setEditInitialValues] = useState({
    date: '',
    paidTo: '',
    paidFor: '',
    amount: 0,
    description: ''
  });

  const deleteRow = async (userId, rowId) => {
    axios({
      method: 'DELETE',
      url: 'https://pettycash-manager-7lxm.onrender.com/home/delete',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ userId, rowId })
    })
      .then(response => {
        console.log(JSON.stringify({ userId, rowId }));
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
  }

  const fetchExpense = async (userId) => {

    try {
      const response = await fetch(`https://pettycash-manager-7lxm.onrender.com/home/user-expenses/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setExpense(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const addNewExpense = ( values, userId, { setSubmitting, resetForm } ) => {
    axios({
      method: 'POST',
      url: 'https://pettycash-manager-7lxm.onrender.com/home/add-expence',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ userId, ...values })
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
  }

  const editRow = ( values, userId, { setSubmitting, resetForm } ) => {
    axios({
      method: 'PUT',
      url: 'https://pettycash-manager-7lxm.onrender.com/home/edit',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({ userId, rowId, ...values })
    })
      .then(response => {
        console.log(JSON.stringify(values));
        console.log(response.data);
        setSubmitting(false);
        resetForm();
        setShowForm(!setShowForm);
        setEdit(!edit);
      })
      .catch(error => {
        console.error('Error:', error);
        setSubmitting(false);
      })
  }

  const handleEdit = (data) => {
    setRowId(data._id);
    setEdit(!edit);
    setEditInitialValues({
      date: data.date,
      paidTo: data.paidTo,
      paidFor: data.paidFor,
      amount: data.amount,
      description: data.description
    });
    setShowForm(!showForm);
  }

  return (
    <UserContext.Provider
      value={{
        user, setUser,
        logout,
        showForm, setShowForm,
        expense, loading, error,
        edit, editInitialValues,
        deleteRow, fetchExpense, 
        addNewExpense, editRow, handleEdit,
      }}>
      {children}
    </UserContext.Provider>
  );
};