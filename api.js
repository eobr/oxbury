const {
  getData,
  getApplications,
  getFarms,
  getFarmers,
  getProducts,
} = require("./controllers");
const apiRouter = require("express").Router();

apiRouter.get("/", (_, res) => {
  res.json({ message: "ok" });
});

apiRouter.get("/data", getData);
apiRouter.get("/applications", getApplications);
apiRouter.get("/farms", getFarms);
apiRouter.get("/farmers", getFarmers);
apiRouter.get("/products", getProducts);

module.exports = apiRouter;
