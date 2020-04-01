// On contrôle ici le format de ce qu'on veut recevoir avant de le stocker

const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({ // +  identifiant unique créé par MongoDB ;
  userId: { type: String, required: true }, //  identifiant unique MongoDB pour l'utilisateur qui a créé lasauce
  name: { type: String, required: true }, // nom de la sauce 
  manufacturer: { type: String, required: true }, // fabricant de la sauce 
  description: { type: String, required: true }, // description de la sauce 
  mainingredient: { type: String, required: true }, // principal ingrédient dans la sauce 
  imageUrl: { type: String, required: true }, // string de l'image de la sauce téléchargée par l'utilisateur 
  heat: { type: Number, required: true }, // nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number, required: true }, // nombre d'utilisateurs qui aiment la sauce
  dislikes: { type: Number, required: true }, //  nombre d'utilisateurs qui n'aiment pas la sauce
  usersliked: { type: String, required: true }, //  tableau d'identifiants d'utilisateurs ayant aimé la sauce 
  usersdisliked: { type: String, required: true }, //  tableau d'identifiants d'utilisateurs n'ayant pas aiméla sauce 
});

module.exports = mongoose.model('thing', thingSchema);

