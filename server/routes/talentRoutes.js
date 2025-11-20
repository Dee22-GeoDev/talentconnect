const express = require('express');
const router = express.Router();
const talentCtrl = require('../controllers/talentController');
const auth = require('../middleware/authMiddleware');

router.get('/', talentCtrl.list);
router.post('/', auth, talentCtrl.create);
router.get('/:id', talentCtrl.get);
router.put('/:id', auth, talentCtrl.update);
router.delete('/:id', auth, talentCtrl.remove);

module.exports = router;