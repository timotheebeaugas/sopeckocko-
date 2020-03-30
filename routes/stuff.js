const express = require('express');
const router = express.Router();

// Importation et application de la fonction à la Route
const stuffCtrl = require('../controllers/stuff');


// requête POST
router.post('/', stuffCtrl.creatThing);
  
// Route PUT pour modifier l'objet en fonction de son ID
router.put('/:id', stuffCtrl.modifyThing);
  
// Route DELETE
router.delete('/:id', stuffCtrl.deleteThing);
  
// requête GET //
  
// un objet par id
router.get('/:id', stuffCtrl.getOneThing);
  
// tous les objets
router.get('/', stuffCtrl.getAllThings);

module.exports = router;
