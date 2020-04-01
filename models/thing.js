// On contrôle ici le format de ce qu'on veut recevoir avant de le stocker

const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({ 
  _id: { type: String, required: true }, // +  identifiant unique créé par MongoDB
  name: { type: String, required: true }, // nom de la sauce 
  manufacturer: { type: String, required: true }, // fabricant de la sauce 
  description: { type: String, required: true }, // description de la sauce 
  heat: { type: Number, required: true }, // nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number, required: true }, // nombre d'utilisateurs qui aiment la sauce
  dislikes: { type: Number, required: true }, //  nombre d'utilisateurs qui n'aiment pas la sauce
  imageUrl: { type: String, required: true }, // string de l'image de la sauce téléchargée par l'utilisateur 
  mainPepper: { type: String, required: true }, // principal ingrédient dans la sauce 
  usersLiked: { type: String, required: true }, //  tableau d'identifiants d'utilisateurs ayant aimé la sauce 
  usersDisliked: { type: String, required: true }, //  tableau d'identifiants d'utilisateurs n'ayant pas aiméla sauce 
  userId: { type: String, required: true }, //  identifiant unique MongoDB pour l'utilisateur qui a créé lasauce
});

module.exports = mongoose.model('thing', thingSchema);

