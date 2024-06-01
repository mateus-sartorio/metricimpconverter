"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (request, response, next) => {
    const input = request.query.input;

    let initNum;
    let invalidNum = false;
    try {
      initNum = Number(convertHandler.getNum(input));
    } catch (e) {
      invalidNum = true;
    }

    let initUnit;
    let invalidUnit;
    try {
      initUnit = convertHandler.getUnit(input);
    } catch (e) {
      invalidUnit = true;
    }

    if (!invalidNum && !invalidUnit) {
      const returnNum = Number(convertHandler.convert(initNum, initUnit));
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const string = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit,
      );

      response.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
    } else {
      let message;
      if (invalidNum && invalidUnit) {
        message = "invalid number and unit";
      } else if (invalidNum) {
        message = "invalid number";
      } else if (invalidUnit) {
        message = "invalid unit";
      }
      response.type("txt").send(message);
    }
  });
};
