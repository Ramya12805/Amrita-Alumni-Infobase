// employmentHistoryController.js
const pool = require('../db');

// get all data
const getEmploymentHistory = async () => {
    const q = 'SELECT * FROM employment';
    try {
        const [data, fields] = await pool.query(q);
        console.log('Employment history fetched successfully:', data);
        return data;
    } catch (err) {
        console.error('Error fetching Employment History:', err.message);
        return [];
    }
};

const addEmploymentHistory = async (data) => {
    const { alumini_id, emp_start_date, emp_end_date, job_description, first_name, last_name } = data;
    const q = 'INSERT INTO employment (alumini_id, emp_start_date, emp_end_date, job_description, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        await pool.query(q, [alumini_id, emp_start_date, emp_end_date, job_description, first_name, last_name]);
        console.log('Employment history added successfully.');
    } catch (err) {
        console.error('Error adding Employment History:', err.message);
    }
};

const deleteEmploymentHistory = async (employmentId) => {
    const deleteQuery = 'DELETE FROM employment WHERE employee_id = ?';
    try {
        await pool.query(deleteQuery, [employmentId]);
        console.log('Employment history deleted successfully.');
    } catch (err) {
        console.error('Error deleting Employment History:', err.message);
    }
};

const updateEmploymentHistory = async (employmentId, newData) => {
    const { emp_start_date, emp_end_date, job_description, first_name, last_name } = newData;
    const q = 'UPDATE employment SET emp_start_date = ?, emp_end_date = ?, job_description = ?, first_name = ?, last_name = ? WHERE employee_id = ?';
    try {
        await pool.query(q, [emp_start_date, emp_end_date, job_description, first_name, last_name, employmentId]);
        console.log('Employment history updated successfully.');
    } catch (err) {
        console.error('Error updating Employment History:', err.message);
    }
};

module.exports = {
    getEmploymentHistory,
    addEmploymentHistory,
    deleteEmploymentHistory,
    updateEmploymentHistory,
};