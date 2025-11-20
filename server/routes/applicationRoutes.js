const express = require('express');
const router = express.Router();
const appCtrl = require('../controllers/applicationController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, appCtrl.list);
router.post('/', auth, appCtrl.create);
router.get('/:id', auth, appCtrl.get);
router.put('/:id', auth, appCtrl.update);
router.delete('/:id', auth, appCtrl.remove);

module.exports = router;