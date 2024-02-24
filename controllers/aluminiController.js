// aluminiController.js
const pool = require('../db');

const renderAlumini = async (data) => {
    const q = 'SELECT * FROM alumini';
    try {
        const [data, fields] = await pool.query(q);
        console.log('Alumini fetched successfully');
        return data;
    } catch (err) {
        console.error('Error fetching Alumini:', err.message);
        return [];
    }
};

// Render add-alumini page
const renderAddAlumini = async (req, res) => {
    res.render('add-alumini');
};

const addAlumini = async (data) => {
    const { current_employer, first_name, last_name, dob, gender, graduation_year, current_job_title, department } = data;
    const q = 'INSERT INTO alumini (current_employer, first_name, last_name, dob, gender, graduation_year, current_job_title, department) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    try {
        await pool.query(q, [current_employer, first_name, last_name, dob, gender, graduation_year, current_job_title, department]);
        console.log('Alumini added successfully.');
    } catch (err) {
        console.error('Error adding Alumini:', err.message);
    }
};

// Render delete-alumini page
const renderDeleteAlumini = async (req, res) => {
    const alumini = await renderAlumini();
    res.render('delete-alumini', { alumini });
};

const deleteAlumini = async (aluminiId) => {
    try {
        // Delete from contact table
        await pool.query('DELETE FROM contact WHERE alumini_id = ?', [aluminiId]);

        // Delete from education_history table
        await pool.query('DELETE FROM education_history WHERE alumini_id = ?', [aluminiId]);

        // Delete from employment table
        await pool.query('DELETE FROM employment WHERE alumini_id = ?', [aluminiId]);

        // Delete from events table
        await pool.query('DELETE FROM events WHERE alumini_id = ?', [aluminiId]);

        // Delete from skills table
        await pool.query('DELETE FROM skills WHERE alumini_id = ?', [aluminiId]);

        // Delete from alumini table
        await pool.query('DELETE FROM alumini WHERE alumini_id = ?', [aluminiId]);

        console.log('Alumini deleted successfully.');
    } catch (err) {
        console.error('Error deleting Alumini:', err.message);
    }
};

// Render Update alumini page
const renderUpdateAlumini = async (req, res) => {
    const alumini = await renderAlumini();
    res.render('update-alumini', { alumini });
};

const updateAlumini = async (aluminiId, newData) => {
    const { current_employer, first_name, last_name, dob, gender, graduation_year, current_job_title, department } = newData;
    const q = 'UPDATE alumini SET current_employer = ?, first_name = ?, last_name = ?, dob = ?, gender = ?, graduation_year = ?, current_job_title = ?, department = ? WHERE alumini_id = ?';
    try {
        await pool.query(q, [current_employer, first_name, last_name, dob, gender, graduation_year, current_job_title, department, aluminiId]);
        console.log('Alumini updated successfully.');
    } catch (err) {
        console.error('Error updating Alumini:', err.message);
    }
};

module.exports = {
    renderAlumini,
    renderAddAlumini,
    renderDeleteAlumini,
    addAlumini,
    deleteAlumini,
    renderUpdateAlumini,
    updateAlumini,
};