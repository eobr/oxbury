const { getData } = require("./controllers");
const apiRouter = require("express").Router();

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.get("/data", getData);

module.exports = apiRouter;
