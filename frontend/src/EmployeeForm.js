import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeForm = ({ fetchEmployees }) => {
    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/employees', { name, position, salary });
        fetchEmployees();
        setName('');
        setPosition('');
        setSalary('');
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Position</label>
                <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
            </div>
            <div className="form-group">
                <label>Salary</label>
                <input type="number" className="form-control" value={salary} onChange={(e) => setSalary(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary">Add Employee</button>
        </form>
    );
};

export default EmployeeForm;
