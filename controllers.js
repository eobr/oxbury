const {
  selectData,
  selectFarms,
  selectFarmers,
  selectApplications,
  selectProducts,
} = require("./models");

exports.getData = (req, res) => {
  selectData().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getFarms = (req, res) => {
  selectFarms().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getFarmers = (req, res) => {
  selectFarmers().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getApplications = (req, res) => {
  selectApplications().then((data) => {
    res.status(200).send({ data });
  });
};

exports.getProducts = (req, res) => {
  selectProducts().then((data) => {
    res.status(200).send({ data });
  });
};
