const {
  getData,
  getApplications,
  getFarms,
  getFarmers,
  getProducts,
  postFarmers,
  deleteFarmers,
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

apiRouter.post("/farmers", postFarmers);

apiRouter.delete("/farmers/:farmerId", deleteFarmers);

module.exports = apiRouter;
