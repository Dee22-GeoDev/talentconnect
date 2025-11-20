const express = require('express');
const router = express.Router();
const jobCtrl = require('../controllers/jobController');
const auth = require('../middleware/authMiddleware');

router.get('/', jobCtrl.list);
router.post('/', auth, jobCtrl.create);
router.get('/:id', jobCtrl.get);
router.put('/:id', auth, jobCtrl.update);
router.delete('/:id', auth, jobCtrl.remove);

module.exports = router;