const { nextTick } = require("process");
const {
  selectData,
  selectFarms,
  selectFarmers,
  selectApplications,
  selectProducts,
  addFarmers,
} = require("./models");
const { farmerSchema } = require("./validation/farmer.schema");

// GETs

exports.getData = async (req, res, next) => {
  try {
    const data = await selectData();
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

exports.getFarms = async (req, res, next) => {
  try {
    const data = await selectFarms();
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

exports.getFarmers = async (req, res, next) => {
  try {
    const data = await selectFarmers();
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    const data = await selectApplications();
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const data = await selectProducts();
    res.status(200).send({ data });
  } catch (err) {
    next(err);
  }
};

// POSTs

exports.postFarmers = async (req, res, next) => {
  try {
    const valid = await farmerSchema.isValid(req.body);
    if (!valid) {
      res.status(400).send("Request body is invalid");
    } else {
      const data = await addFarmers(req.body);
      res.status(201).send(data);
    }
  } catch (err) {
    next(err);
  }
};
