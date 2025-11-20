const express = require('express');
const router = express.Router();
const trCtrl = require('../controllers/trainingController');
const auth = require('../middleware/authMiddleware');

router.get('/', trCtrl.list);
router.post('/', auth, trCtrl.create);
router.get('/:id', trCtrl.get);
router.put('/:id', auth, trCtrl.update);
router.delete('/:id', auth, trCtrl.remove);

module.exports = router;