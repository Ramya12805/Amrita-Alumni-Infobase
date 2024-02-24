// clubsGroupsController.js
const pool = require('../db');

// get all clubs and groups
const getAllClubsGroups = async () => {
    const queryString = `SELECT * FROM Clubs`;
    try {
        const result = await pool.query(queryString);
        return result;
    }
    catch (err) {
        console.error('Error getting clubs/groups:', err.message);
    }
};

const addClubGroup = async (data) => {
    const { alumini_id, club_name, description } = data;
    const q = 'INSERT INTO clubs_groups (alumini_id, club_name, description) VALUES (?, ?, ?)';
    try {
        await pool.query(q, [alumini_id, club_name, description]);
        console.log('Club/Group added successfully.');
    } catch (err) {
        console.error('Error adding Club/Group:', err.message);
    }
};

const deleteClubGroup = async (clubGroupId) => {
    const deleteQuery = 'DELETE FROM clubs_groups WHERE club_id = ?';
    try {
        await pool.query(deleteQuery, [clubGroupId]);
        console.log('Club/Group deleted successfully.');
    } catch (err) {
        console.error('Error deleting Club/Group:', err.message);
    }
};

module.exports = {
    getAllClubsGroups,
    addClubGroup,
    deleteClubGroup,
};