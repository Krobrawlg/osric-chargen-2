const express = require("express");

const osricRoutes = express.Router();

const dbo = require("../server/db/conn");

const ObjectId = require("mongodb").ObjectId;

osricRoutes.route("/generalStore").get(function (req, res) {
  let db_connect = dbo.getDb("generalStoreItems");
  db_connect
    .collection("equipment")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/armour").get(function (req, res) {
  let db_connect = dbo.getDb("armourList");
  db_connect
    .collection("armour")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/weapons").get(function (req, res) {
  let db_connect = dbo.getDb("weaponList");
  db_connect
    .collection("weapons")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/missileWeapons").get(function (req, res) {
  let db_connect = dbo.getDb("missileWeaponList");
  db_connect
    .collection("missile-weapons")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/classes").get(function (req, res) {
  let db_connect = dbo.getDb("classes");
  db_connect
    .collection("classes")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/races").get(function (req, res) {
  let db_connect = dbo.getDb("races");
  db_connect
    .collection("races")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/characters/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let newCharacter = {
    name: req.body.name,
    stats: req.body.stats,
    race: req.body.race,
    job: req.body.job,
    inventory: req.body.inventory,
  };
  db_connect
    .collection("characters")
    .insertOne(newCharacter, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

osricRoutes.route("/characters").get(function (req, res) {
  let db_connect = dbo.getDb("characters");
  db_connect
    .collection("characters")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

osricRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let deleteCharacter = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("characters")
    .deleteOne(deleteCharacter, function (err, obj) {
      if (err) throw err;
      console.log("character deleted");
      response.status(obj);
    });
});

module.exports = osricRoutes;
