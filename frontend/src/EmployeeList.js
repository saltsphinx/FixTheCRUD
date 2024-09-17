import React from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = ({ employees, fetchEmployees }) => {
    // Add Delete functionality
    // Remove the comment for axios 

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.position}</td>
                        <td>{employee.salary}</td>
                        <td>
                            <button className="btn btn-danger" >Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EmployeeList;
