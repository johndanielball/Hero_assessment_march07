var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/iota');

mongoose.model(
  'SuperPowers',
  new Schema({
      "super_powers": Array
    },
    {
      collection: 'SuperPowers'
    }
  ));

mongoose.model(
  'Heroes',
  new Schema({
      "alias": String,
      "first_name": String,
      "last_name": String,
      "city": String,
      "power_name": String
    },
    {
      collection: 'Heroes'
    }
  ));

var SuperPowers = mongoose.model('SuperPowers');
var Hero = mongoose.model('Heroes');

// This route will activate if the url is just /heroes so it will return all the heroes in the database unfiltered by super power
router.get('/heroes', function(req, res) {
  //retrieve all the heros from the database.

  Hero.find({}, function(err, data) {
    if (err) {
      console.log('ERR: ', err);
    }

    res.send(data);
  })
});

// This route will activate if the url is heroes/ plus a super power like heroes/super strength
// so it will only query heroes based on super power
router.get('/heroes/:power_name', function (req, res) {
  // retrieve all the heroes from the database.

  Hero.find({
    power_name: req.params.power_name
  }, function(err, data) {
    if (err) {
      console.log('ERR: ', err);
    }

    res.send(data);
  })
});

// This route is used for the Hero template drop down to set the super power of a new Hero,
// and it is used in the Heroes template to filter which heroes are displayed.
router.get('/powers', function(req, res) {
  // retrieve all the heroes from the database.

  SuperPowers.find({}, function(err, data) {
    if(err) {
      console.log('ERR: ', err);
    }

    res.send(data[0].super_powers);
  });
});

router.post('/hero', function(req, res) {
  console.log(req.body);

  var addedHero = new Hero({
    "alias": req.body.alias,
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "city": req.body.city,
    "power_name": req.body.power_name
  });

  addedHero.save(function(err, data) {
    if(err) {
      console.log('ERR: ', err);
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

// Not enough time to complete the delete function. :(



module.exports = router;