const express = require('express');
const router = express.Router();
const path = require('path');

// Import controllers
// const quadBuildController = require('../controllers/quadBuildController');

// Route for Home Page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

// Route for Builds Page
router.get('/builds', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/builds.html'));
});

// Route for Contact Page
router.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/contact.html'));
});

// Route for Parts Page
router.get('/parts', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/parts.html'));
});

// Route for Service Page
router.get('/service', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/service.html'));
});

// // Route for API endpoint to fetch all quad builds
// router.get('/api/quad-builds', quadBuildController.getAllQuadBuilds);

module.exports = router;