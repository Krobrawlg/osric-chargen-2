const express = require("express");

const generalStoreRoutes = express.Router();

const dbo = require("../db/conn");

const ObjectId = require("mongodb").ObjectId;

generalStoreRoutes.route("/generalStore").get(function (req, res) {
  let db_connect = dbo.getDb("generalStoreItems");
  db_connect
    .collection("equipment")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = generalStoreRoutes;
