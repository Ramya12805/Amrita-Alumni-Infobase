// eventsController.js
const pool = require('../db');

const renderEvents = async () => {
    const queryString = 'SELECT * FROM events ORDER BY event_date DESC';
    try {
        const result = await pool.query(queryString);
        return result[0];
    } catch (err) {
        console.error('Error getting Events:', err.message);
    }
};

// Render add event page
const renderAddEvent = async (req, res) => {
    res.render('add-event');
};

const addEvent = async (data) => {
    const { alumini_id, event_id, alumini_attending, event_date, city, pincode, event_desc, street } = data;
    const insertQuery = 'INSERT INTO events (alumini_id,event_id, alumini_attending, event_date, city, pincode, event_desc, street) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    try {
        await pool.query(insertQuery, [alumini_id, event_id, alumini_attending, event_date, city, pincode, event_desc, street]);
        console.log('Event added successfully.');
    } catch (err) {
        console.error('Error adding Event:', err.message);
    }
};

// Render delete event page
const renderDeleteEvent = async (req, res) => {
    res.render('delete.event');
};

const deleteEvent = async (eventId) => {
    const deleteQuery = 'DELETE FROM events WHERE event_id = ?';
    try {
        await pool.query(deleteQuery, [eventId]);
        console.log('Event deleted successfully.');
    } catch (err) {
        console.error('Error deleting Event:', err.message);
    }
};

module.exports = {
    renderEvents,
    renderAddEvent,
    addEvent,
    renderDeleteEvent,
    deleteEvent,
};