const { selectData } = require("./models");

exports.getData = (req, res) => {
  selectData().then((data) => {
    res.status(200).send({ data });
  });
};
