const express = require("express");

const osricRoutes = express.Router();

const dbo = require("../db/conn");

// const ObjectId = require("mongodb").ObjectId;

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

module.exports = osricRoutes;
