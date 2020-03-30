// On importe les élements dont on a besoin

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');

// connection à mangoDB
mongoose.connect('mongodb+srv://admin1:HQZ5VkFEukx3KQwT@cluster0-ia7i3.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Autorise tout le monde à acceder à toutes les fonctionalitées de l'API

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Paser avec body-parser

app.use(bodyParser.json());

// On retrouve les routes + la racine de l'adresse de l'API

app.use('/api/stuff', stuffRoutes);

module.exports = app;