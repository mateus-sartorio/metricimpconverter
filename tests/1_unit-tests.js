const chai = require("chai");
const assert = chai.assert;
const expect = chai.expect;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("getNum", function () {
    test("convertHandler should correctly read a whole number input", function () {
      assert.equal(convertHandler.getNum("1L"), 1);
    });

    test("convertHandler should correctly read a decimal number input", function () {
      assert.equal(convertHandler.getNum("1.2L"), 1.2);
    });

    test("convertHandler should correctly read a fractional input", function () {
      assert.equal(convertHandler.getNum("1/2L"), 1 / 2);
    });

    test("convertHandler should correctly read a fractional input with a decimal", function () {
      assert.equal(convertHandler.getNum("4.5/2L"), 4.5 / 2);
    });

    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function () {
      expect(() => convertHandler.getNum("3/2/3L")).to.throw(Error);
      assert.equal(true, true);
    });

    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function () {
      assert.equal(convertHandler.getNum("L"), 1);
    });
  });

  suite("getUnit", function () {
    test("convertHandler should correctly read each valid input unit", function () {
      expect(() => convertHandler.getUnit("gal")).to.not.throw(Error);
      expect(() => convertHandler.getUnit("L")).to.not.throw(Error);
      expect(() => convertHandler.getUnit("mi")).to.not.throw(Error);
      expect(() => convertHandler.getUnit("km")).to.not.throw(Error);
      expect(() => convertHandler.getUnit("lbs")).to.not.throw(Error);
      expect(() => convertHandler.getUnit("kg")).to.not.throw(Error);

      assert.equal(true, true);
    });

    test("convertHandler should correctly return an error for an invalid input unit", function () {
      expect(() => convertHandler.getUnit("gm")).to.throw(Error);
      assert.equal(true, true);
    });

    test("convertHandler should return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getUnit("gal"), "gal");
      assert.equal(convertHandler.getUnit("L"), "L");
      assert.equal(convertHandler.getUnit("mi"), "mi");
      assert.equal(convertHandler.getUnit("km"), "km");
      assert.equal(convertHandler.getUnit("lbs"), "lbs");
      assert.equal(convertHandler.getUnit("kg"), "kg");
    });
  });

  suite("spelloutUnit", function () {
    test("convertHandler should correctly return an error for an invalid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
    });
  });

  suite("convert", function () {
    test("convertHandler should correctly convert gal to L", function () {
      assert.equal(convertHandler.convert(0, "gal"), 0);
      assert.equal(convertHandler.convert(1, "gal"), 3.78541);
      assert.equal(convertHandler.convert(2, "gal"), 2 * 3.78541);
    });

    test("convertHandler should correctly convert L to gal", function () {
      assert.equal(convertHandler.convert(0, "L"), 0);
      assert.equal(convertHandler.convert(1, "L"), 0.26417);
      assert.equal(convertHandler.convert(2, "L"), 0.52834);
    });

    test("convertHandler should correctly convert mi to km", function () {
      assert.equal(convertHandler.convert(0, "mi"), 0);
      assert.equal(convertHandler.convert(1, "mi"), 1.60934);
      assert.equal(convertHandler.convert(2, "mi"), 2 * 1.60934);
    });

    test("convertHandler should correctly convert km to mi", function () {
      assert.equal(convertHandler.convert(0, "km"), 0);
      assert.equal(convertHandler.convert(1, "km"), 0.62137);
      assert.equal(convertHandler.convert(2, "km"), 1.24275);
    });

    test("convertHandler should correctly convert lbs to kg", function () {
      assert.equal(convertHandler.convert(0, "lbs"), 0);
      assert.equal(convertHandler.convert(1, "lbs"), 0.45359);
      assert.equal(convertHandler.convert(2, "lbs"), 0.90718);
    });

    test("convertHandler should correctly convert kg to lbs", function () {
      assert.equal(convertHandler.convert(0, "kg"), 0);
      assert.equal(convertHandler.convert(1, "kg"), 2.20462);
      assert.equal(convertHandler.convert(2, "kg"), 4.40925);
    });
  });
});
