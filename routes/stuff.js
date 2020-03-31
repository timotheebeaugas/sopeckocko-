const express = require('express');
const router = express.Router();

// Importation de l'authentification
const auth = require('../middleware/auth');

// Importation et application de la fonction à la Route
const stuffCtrl = require('../controllers/stuff');


// requête POST
router.post('/', auth, stuffCtrl.creatThing);
  
// Route PUT pour modifier l'objet en fonction de son ID
router.put('/:id', auth, stuffCtrl.modifyThing);
  
// Route DELETE
router.delete('/:id', auth, stuffCtrl.deleteThing);
  
// requête GET //
  
// un objet par id
router.get('/:id', auth, stuffCtrl.getOneThing);
  
// tous les objets
router.get('/', auth, stuffCtrl.getAllThings);

module.exports = router;
