const fs = require('fs');

const Sauce = require('../models/sauce')


exports.creatSauce = async (req, res, next) => {
  const thingObject = JSON.parse(req.body.sauce);
  delete thingObject._id;
  const thing = new Sauce({
    ...thingObject,
    usersLiked: [],
    usersDisliked: [],
    likes: 0,
    dislikes: 0,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  try {
    await thing.save();
    res.status(201).json({ message: 'Objet enregistré !'})
  } catch(error) {
    res.status(400).json({ error });
  }
};

exports.modifySauce = (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
}; 

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
  };

exports.likeSauce = (req, res, next) => {
   
  Sauce.updateOne({ _id: req.params.id }, { $pull: {usersLiked: req.body.userId, usersDisliked: req.body.userId}})
    .then(() => res.status(200).json({ message: 'supression des userID du document !'}))
    .catch(error => res.status(400).json({ error }));

  if (req.body.like === 0){
    
    Sauce.findOne({ _id: req.params.id })
      .then(thing => {
        const disliked = thing.usersDisliked;
        const dislikedLenght = disliked.length;
        const liked = thing.usersLiked;
        const likedLenght = liked.length;
        Sauce.updateOne({ _id: req.params.id }, {dislikes:dislikedLenght, likes:likedLenght})
      .then(() => res.status(200).json({ message: 'dislike envoyé !'}))
      .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    
    
  } 
  
  else if (req.body.like === -1) {
    Sauce.updateOne({ _id: req.params.id }, { $push: {usersDisliked:req.body.userId}})
      .then(() => res.status(200).json({ message: 'userId envoyé !'}))
      .catch(error => res.status(400).json({ error }));
      
      Sauce.findOne({ _id: req.params.id })
      .then(thing => {
        const disliked = thing.usersDisliked;
        const dislikedLenght = disliked.length;
        console.log(disliked,dislikedLenght);
        Sauce.updateOne({ _id: req.params.id }, {dislikes:dislikedLenght})
      .then(() => res.status(200).json({ message: 'dislike envoyé !'}))
      .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    
  } 
  
  else if (req.body.like === 1){
    Sauce.updateOne({ _id: req.params.id }, { $push: {usersLiked: req.body.userId}})
      .then(() => res.status(200).json({ message: 'userId envoyé !'}))
      .catch(error => res.status(400).json({ error }));

      Sauce.findOne({ _id: req.params.id })
      .then(thing => {
        const liked = thing.usersLiked;
        const likedLenght = liked.length;
        console.log(liked,likedLenght);
        Sauce.updateOne({ _id: req.params.id }, {likes:likedLenght})
      .then(() => res.status(200).json({ message: 'like envoyé !'}))
      .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error })); 
  }

};

