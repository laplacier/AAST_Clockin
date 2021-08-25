const db = require('../models');
const { Op } = require("sequelize");
const { parse } = require('json2csv');
const fs = require('fs');

exports.index = (req, res) => {
  res.render('index', { title: 'House of Wrynn' });
}

exports.staffPost = async (req, res, next) => {
  try {
    const staffExists = await db.staff.findOne({
      where: { rfid: req.body.rfid }
    });

    if(!staffExists) {
      //Add character to database, pulling name and class_id from submission form
      res.render('index', { message: "Sorry, we couldn't find you in the database..." });
    } else {
      const punch = await db.punches.create({
        staff_id: staffExists.id,
      });
      var d = new Date();
      res.render('index', { message: `Punched at ${d.toLocaleTimeString()} for ${staffExists.first_name} ${staffExists.last_name}!` });
    }
  } catch(error) {
    next(error);
  }
}

exports.punchesGet = async (req, res, next) => {
  try {
    const punches = await db.punches.findAll({
      where: { deleted_at: null },
      include: db.staff,
      limit: 200
    });
    if(!punches) {
      punches = '';
      res.render('punches', { message: "Sorry, we couldn't find you in the database..." });
    } else {
      for(i=0; i<punches.length; i++) {
        var d = new Date(punches[i].createdAt);
        punches[i].readableTime = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
      }
      res.render('punches', { punches });
    }
  } catch(error) {
    next(error);
  }
}

exports.punchesPost = async (req, res, next) => {
  const fields = ['readableTime', 'staff.last_name', 'staff.first_name'];
  const opts = { fields };

  try {
    const punches = await db.punches.findAll({
      where: { deleted_at: null },
      include: db.staff,
      limit: 1000
    });
    if(!punches) {
      punches = '';
      res.render('punches', { message: "Sorry, we couldn't find punches in the database..." });
    } else {
      for(i=0; i<punches.length; i++) {
        var d = new Date(punches[i].createdAt);
        punches[i].readableTime = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
      }
      const csv = parse(punches, opts);
      //console.log(csv);
      fs.writeFile('punches.csv', csv, function(err) {
        if (err) throw err;
        console.log('punches file saved');
      });
      res.render('punches', { punches });
    }
  } catch(error) {
    next(error);
  }
}
