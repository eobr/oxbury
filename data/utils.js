const fsPromise = require("fs/promises");

exports.resetData = async () => {
  const resetData = await fsPromise.readFile(`${__dirname}/reset.json`, "utf8");

  await fsPromise.writeFile(
    `${__dirname}/data.json`,
    JSON.stringify(JSON.parse(resetData), null, 4)
  );
};
