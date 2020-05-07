const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/sauce');

const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.creatSauce); 
router.post('/:id/like', auth, stuffCtrl.likeSauce); 
  
router.put('/:id', auth, multer, stuffCtrl.modifySauce); 
  
router.delete('/:id', auth, stuffCtrl.deleteSauce); 
  
router.get('/:id', auth, stuffCtrl.getOneSauce); 
  
router.get('/', auth, stuffCtrl.getAllSauces); 

module.exports = router;
