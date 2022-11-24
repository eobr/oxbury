const supertest = require("supertest");
const { resetData } = require("../data/utils.js");
const { selectFarmers } = require("../models.js");
const server = require("../server");

const request = supertest(server);

afterAll(async () => {
  await resetData();
});

test("/api", async () => {
  const { body } = await request.get("/api").expect(200);
  expect(body.message).toBe("ok");
});

describe("GET /api/data", () => {
  it("returns data from data.json", async () => {
    const res = await request.get("/api/data").expect(200);
    expect(res.body.data).toHaveProperty("application");
    expect(res.body.data).toHaveProperty("farmer");
    expect(res.body.data).toHaveProperty("farm");
    expect(res.body.data).toHaveProperty("product");
  });
});
describe("GET /api/farms", () => {
  it("returns data from data.json", async () => {
    const res = await request.get("/api/farms").expect(200);
    expect(res.body.data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        num_cows: expect.any(Number),
        num_chickens: expect.any(Number),
        num_pigs: expect.any(Number),
        acres_farmed: expect.any(Number),
      })
    );
  });
});
describe("GET /api/farmers", () => {
  it("returns data from data.json", async () => {
    const res = await request.get("/api/farmers").expect(200);
    expect(res.body.data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        age: expect.any(Number),
        phone_number: expect.any(String),
        farm_id: expect.any(Number),
      })
    );
  });
});
describe("GET /api/products", () => {
  it("returns data from data.json", async () => {
    const res = await request.get("/api/products").expect(200);
    expect(res.body.data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        type: expect.any(String),
        name: expect.any(String),
      })
    );
  });
});
describe("GET /api/applications", () => {
  it("returns data from data.json", async () => {
    const res = await request.get("/api/applications").expect(200);
    expect(res.body.data[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        type: expect.any(String),
        amount_requested: expect.any(Number),
        status: expect.any(String),
        product_id: expect.any(Number),
        farmer_id: expect.any(Number),
      })
    );
  });
});
describe("POST /api/farmers", () => {
  it("adds new farmer to data.json", async () => {
    const res = await request
      .post("/api/farmers")
      .send({
        id: 999,
        name: "test",
        age: 99,
        phone_number: "07777777777",
        farm_id: 99999,
      })
      .expect(201);
    const addedFarmer = res.body;
    const farmers = await selectFarmers();
    const newFarmer = farmers.pop();
    expect(newFarmer).toEqual(addedFarmer);
  });

  it("returns 400 if request body has been invalidated by schema", async () => {
    await request
      .post("/api/farmers")
      .send({
        test: 999,
        test2: "test",
      })
      .expect(400);
  });
});
