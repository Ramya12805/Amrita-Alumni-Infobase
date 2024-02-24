// educationHistoryController.js
const pool = require('../db');

const getEducationHistory = async () => { // corrected the function declaration
    const q = 'SELECT * FROM education_history';
    try {
        const [data, fields] = await pool.query(q); // added 'await' to wait for the query to finish
        console.log('Education history fetched successfully:', data);
        return data;
    } catch (err) {
        console.error('Error fetching Education History:', err.message);
        return [];
    }
};

module.exports = {
    getEducationHistory,
};
