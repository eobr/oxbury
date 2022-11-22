const fsPromise = require("fs/promises");

exports.selectData = () => {
  return fsPromise.readFile("./data/data.json", "utf8").then((res) => {
    const data = JSON.parse(res);
    return data;
  });
};

exports.selectFarms = async () => {
  const data = await this.selectData();
  return data.farm;
};

exports.selectFarmers = async () => {
  const data = await this.selectData();
  return data.farmer;
};

exports.selectProducts = async () => {
  const data = await this.selectData();
  return data.product;
};

exports.selectApplications = async () => {
  const data = await this.selectData();
  return data.application;
};
