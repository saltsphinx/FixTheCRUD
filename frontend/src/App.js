import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    const fetchEmployees = async () => {
        const response = await axios.get('http://localhost:3001/employees');
        setEmployees(response.data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className={darkMode ? 'container dark-mode' : 'container'}>
            <h1 className="my-4">Fix The CRUD</h1>
            <button className="btn btn-secondary mb-3" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <EmployeeForm fetchEmployees={fetchEmployees} />
            <EmployeeList employees={employees} fetchEmployees={fetchEmployees} />
        </div>
    );
};

export default App;
