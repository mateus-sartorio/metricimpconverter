function ConvertHandler() {
  this.getNum = function (input) {
    const regex1 = /^[a-zA-Z]+$/;
    let matchResult = input.match(regex1);
    if (matchResult) {
      return 1;
    }

    const regex2 = /^(\d+\.?\d*)([a-zA-Z]+)/;
    matchResult = input.match(regex2);
    if (matchResult) {
      return Number(matchResult[1]);
    }

    const regex3 = /^(\d+\.?\d*)\/(\d+\.?\d*)([a-zA-Z]+)/;
    matchResult = input.match(regex3);
    if (matchResult) {
      return Number(matchResult[1] / matchResult[2]);
    }

    throw new Error();
  };

  this.getUnit = function (input) {
    const unitRegex = /[a-zA-Z]+$/;
    let result = input.match(unitRegex)[0];

    if (result) {
      result = result.toLowerCase();

      if (result === "l") {
        return "L";
      } else if (
        result === "gal" ||
        result === "mi" ||
        result === "km" ||
        result === "lbs" ||
        result === "kg"
      ) {
        return result;
      }
    }

    throw new Error();
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        throw new Error(`No unit matches ${initUnit}`);
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        throw new Error(`No unit matches ${unit}`);
    }

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        throw new Error(`No unit matches ${unit}`);
    }

    return Number(result).toFixed(5);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result;

    result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

    return result;
  };
}

module.exports = ConvertHandler;
