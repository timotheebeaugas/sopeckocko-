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
    res.status(201).json({ message: 'Registered object !'})
  } catch(error) {
    res.status(400).json({ error });
  }
};

exports.modifySauce = async (req, res, next) => {
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  try{
    await Sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    res.status(200).json({ message: 'Object modified !'})
  } catch(error) {
    res.status(400).json({ error });
  }
}; 

exports.deleteSauce = async (req, res, next) => {
  try{
  let thing = await Sauce.findOne({ _id: req.params.id })
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, async () => {
        try{
         await  Sauce.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Object deleted !'})
        }
        catch(error) {
          res.status(400).json({ error });
        }
    })
  }
  catch(error) {
    res.status(400).json({ error });
  }
};

exports.getOneSauce = async (req, res, next) => {
  try{
   let thing = await Sauce.findOne({ _id: req.params.id })
    res.status(200).json(thing)
  }
  catch(error) {
    res.status(400).json({ error });
  }
};

exports.getAllSauces = async (req, res, next) => {
  try{
    let things = await Sauce.find()
      res.status(200).json(things)
    }
    catch(error) {
      res.status(400).json({ error });
    }
};

exports.likeSauce = async (req, res, next) => {
  try{ 
 
    await Sauce.updateOne({ _id: req.params.id }, { $pull: {usersLiked: req.body.userId, usersDisliked: req.body.userId}})

    if (req.body.like === 0){
     let thing = await Sauce.findOne({ _id: req.params.id })
          const disliked = thing.usersDisliked;
          const dislikedLenght = disliked.length;
          const liked = thing.usersLiked;
          const likedLenght = liked.length;
        await  Sauce.updateOne({ _id: req.params.id }, {dislikes:dislikedLenght, likes:likedLenght})
        res.status(200).json({ message: 'No like !'})      
    } 

    else if (req.body.like === -1) {
       await Sauce.updateOne({ _id: req.params.id }, { $push: {usersDisliked:req.body.userId}})
        
       let thing = await Sauce.findOne({ _id: req.params.id })
        if(!thing){ res.status(500).json({ error })
        return }
          const disliked = thing.usersDisliked;
          const dislikedLenght = disliked.length;
        await  Sauce.updateOne({ _id: req.params.id }, {dislikes:dislikedLenght})
        res.status(200).json({ message: 'Sauce disliked !'}) 
    } 

    else if (req.body.like === 1){
      await Sauce.updateOne({ _id: req.params.id }, { $push: {usersLiked: req.body.userId}})
        
  
      let thing = await Sauce.findOne({ _id: req.params.id })
        if(!thing){ res.status(500).json({ error })
        return }
          const liked = thing.usersLiked;
          const likedLenght = liked.length;
        await Sauce.updateOne({ _id: req.params.id }, {likes:likedLenght})
        res.status(200).json({ message: 'Sauce liked !'})
    }

    }

    catch(error) {
      res.status(400).json({ error });
    }
 
  };