const express = require('express');

const authSrv = require('./services/auth');
const registration = require('./controllers/registration');
const session = require('./controllers/session');
const courseAdmin = require('./controllers/course-admin');
const coursePublic = require('./controllers/course-public');

const router = express.Router();

// registration
router.post('/registrations', registration.create);

// session
router.post('/sessions/login', session.login);
router.delete('/sessions/logout', authSrv.authenticateUser, session.logout);
router.get('/sessions/current-user', authSrv.authenticateUser, session.getCurrentUser);

// admin
router.get('/admin/courses', courseAdmin.all);
router.post('/admin/courses', courseAdmin.create);
router.get('/admin/courses/:id', courseAdmin.show);
router.put('/admin/courses/:id', courseAdmin.update);
router.delete('/admin/courses/:id', courseAdmin.destroy);

// public
router.get('/public/courses', coursePublic.all);
router.get('/public/courses/:id', coursePublic.show);

module.exports = router;
