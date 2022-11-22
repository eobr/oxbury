const fsPromise = require("fs/promises");

exports.selectData = () => {
  return fsPromise.readFile("./data/data.json", "utf8").then((res) => {
    const data = JSON.parse(res);
    return data;
  });
};
