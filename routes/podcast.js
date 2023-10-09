const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcast');

// Courses Card
router.post('/podcast', podcastController.createPodcast);
router.get('/podcasts', podcastController.getPodcasts);
router.get('/podcast/:podcastId', podcastController.getPodcast);

module.exports = router;