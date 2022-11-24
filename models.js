const fsPromise = require("fs/promises");
const fs = require("fs");

// GETs

exports.selectData = async () => {
  const res = await fsPromise.readFile("./data/data.json", "utf8");
  const data = await JSON.parse(res);
  return data;
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

exports.selectApplications = async ({
  id = null,
  type = null,
  amount_requested = null,
  status = null,
  product_id = null,
  farmer_id = null,
}) => {
  const data = await this.selectData();
  const dataCopy = { ...data };
  const applications = dataCopy.application;
  const filters = [];
  if (id) filters.push((x) => x.id === Number(id));
  if (type) filters.push((x) => x.type === type);
  if (status) filters.push((x) => x.status === status);
  if (product_id) filters.push((x) => x.product_id == product_id);
  if (farmer_id) filters.push((x) => x.farmer_id == Number(farmer_id));
  if (amount_requested) {
    filters.push((x) => x.amount_requested == amount_requested);
  }
  if (filters.length) {
    const filteredData = filters.reduce((d, f) => d.filter(f), applications);
    if (filteredData.length) return filteredData;
    else return false;
  }
  return applications;
};

// POSTs

exports.addFarmers = async (newFarmer) => {
  const data = await this.selectData();
  const dataCopy = { ...data };
  dataCopy.farmer.push(newFarmer);

  await fsPromise.writeFile(
    "./data/data.json",
    JSON.stringify(dataCopy, null, 4)
  );
  return newFarmer;
};

// DELETEs

exports.removeFarmers = async (farmerId) => {
  const data = await this.selectData();
  const dataCopy = { ...data };
  const farmerIndex = dataCopy.farmer.findIndex((x) => x.id === farmerId);

  if (farmerIndex === -1) return false;

  dataCopy.farmer.splice(farmerIndex, 1);

  await fsPromise.writeFile(
    "./data/data.json",
    JSON.stringify(dataCopy, null, 4)
  );
  return `Farmer ${farmerId} successfully deleted`;
};

// PATCHs

exports.editFarmers = async (updatedFarmer, farmerId) => {
  const data = await this.selectData();
  const dataCopy = { ...data };
  const farmerIndex = dataCopy.farmer.findIndex((x) => x.id === farmerId);
  if (farmerIndex === -1) return false;

  dataCopy.farmer.splice(farmerIndex, 1, updatedFarmer);

  await fsPromise.writeFile(
    "./data/data.json",
    JSON.stringify(dataCopy, null, 4)
  );
  return `Farmer ${farmerId} successfully patched`;
};

