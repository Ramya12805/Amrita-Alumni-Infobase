// router.js
const express = require('express');
const router = express.Router();
const aluminiController = require('../controllers/aluminiController');
const eventsController = require('../controllers/eventController');
const clubsGroupsController = require('../controllers/clubsGroupsController');
const educationHistoryController = require('../controllers/educationHistoryController');
const employmentHistoryController = require('../controllers/employmentHistoryController');
const contactController = require('../controllers/contactController');

// Home page route
router.get('/home', (req, res) => {
    res.render('index');
});

// Alumini routes
router.get('/alumini', async (req, res) => {
    const alumini = await aluminiController.renderAlumini();
    res.render('alumini', { alumini });
});

router.get('/add-alumini', (req, res) => {
    res.render('add-alumini');
});

router.get('/delete-alumini', async (req, res) => {
    const alumini = await aluminiController.renderAlumini();
    res.render('delete-alumini', { alumini });
});

router.get('/update-alumini', async (req, res) => {
    const alumini = await aluminiController.renderAlumini();
    res.render('update-alumini', { alumini });
});


router.post('/alumini/add', async (req, res) => {
    await aluminiController.addAlumini(req.body);
    res.redirect('/alumini');
});

router.post('/alumini/delete', async (req, res) => {
    const aluminiId = req.body.alumini_id;
    const data = await aluminiController.deleteAlumini(aluminiId);
    res.redirect('/alumini');
});

router.post('/alumini/update', async (req, res) => {
    const aluminiId = req.params.id;
    await aluminiController.updateAlumini(aluminiId, req.body);
    res.redirect('/alumini');
});


// Events routes

router.get('/events', async (req, res) => {
    const events = await eventsController.renderEvents();
    res.render('events', { events });
});

router.get('/add-event', async (req, res) => {
    res.render('add-event');
});

router.get('/delete-event', async (req, res) => {
    res.render('delete-event');
});

router.post('/events/add-event', async (req, res) => {
    await eventsController.addEvent(req.body);
    res.redirect('/events');
});

router.post('/delete-event', async (req, res) => {
    const eventId = req.body.event_id;
    await eventsController.deleteEvent(eventId);
    res.redirect('/events');
});

// Clubs & Groups routes
router.post('/clubs-groups/add', async (req, res) => {
    await clubsGroupsController.addClubGroup(req.body);
    res.redirect('/clubs-groups');
});

router.get('/clubs-groups', async (req, res) => {
    res.render('Clubs');
});

router.get('/Clubs', async (req, res) => {
    res.render('Clubs');
});

router.get('/young-alumni', async (req, res) => {
    res.render('youngalumni');
});

router.get('/youngalumni', async (req, res) => {
    res.render('youngalumni');
});

router.post('/clubs-groups/delete/:id', async (req, res) => {
    const clubGroupId = req.params.id;
    await clubsGroupsController.deleteClubGroup(clubGroupId);
    res.redirect('/clubs-groups');
});

// Education History routes
router.get('/education-history', async (req, res) => {
    const educationHistory = await educationHistoryController.getEducationHistory();
    res.render('education-history', { educationHistory });
});

// Employment History routes

router.get('/employment-history', async (req, res) => {
    const employmentHistory = await employmentHistoryController.getEmploymentHistory();
    res.render('employment-history', { employmentHistory });
});

router.post('/employment-history/add', async (req, res) => {
    await employmentHistoryController.addEmploymentHistory(req.body);
    res.redirect('/employment-history');
});

router.post('/employment-history/delete/:id', async (req, res) => {
    const employmentId = req.params.id;
    await employmentHistoryController.deleteEmploymentHistory(employmentId);
    res.redirect('/employment-history');
});

router.post('/employment-history/update/:id', async (req, res) => {
    const employmentId = req.params.id;
    await employmentHistoryController.updateEmploymentHistory(employmentId, req.body);
    res.redirect('/employment-history');
});

//contact

router.get('/contact-alumini', async (req, res) => {
    const contactInfo = await contactController.getContactInfo();
    res.render('contact', { contactInfo });
});

module.exports = router;