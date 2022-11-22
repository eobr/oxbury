const fsPromise = require("fs/promises");

exports.resetData = () => {
  fsPromise.readFile(`${__dirname}/reset.json`, "utf8").then((res) => {
    fsPromise.writeFile(
      `${__dirname}/data.json`,
      JSON.stringify(JSON.parse(res), null, 4)
    );
  });
};
