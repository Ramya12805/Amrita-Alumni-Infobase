const pool = require('../db');

const getContactInfo = async (aluminiId) => {
    const q = 'SELECT * FROM contact';
    try {
        const [data, fields] = await pool.query(q);
        console.log('Contact information fetched successfully:', data);
        return data;
    } catch (err) {
        console.error('Error fetching Contact Information:', err.message);
        return null;
    }
};

module.exports = {
    getContactInfo,
};
