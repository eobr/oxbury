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
    const res = await request
      .get("/api/data")
      .set("Authorization", "testToken")
      .expect(200);
    expect(res.body.data).toHaveProperty("application");
    expect(res.body.data).toHaveProperty("farmer");
    expect(res.body.data).toHaveProperty("farm");
    expect(res.body.data).toHaveProperty("product");
  });
});
describe("GET /api/farms", () => {
  it("returns data from data.json", async () => {
    const res = await request
      .get("/api/farms")
      .set("Authorization", "testToken")
      .expect(200);
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
    const res = await request
      .get("/api/farmers")
      .set("Authorization", "testToken")
      .expect(200);
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
    const res = await request
      .get("/api/products")
      .set("Authorization", "testToken")
      .expect(200);
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
    const res = await request
      .get("/api/applications")
      .set("Authorization", "testToken")
      .expect(200);
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
  it("returns correct data with single query", async () => {
    const farmer_id = 1215200;
    const res = await request
      .get(`/api/applications/?farmer_id=${farmer_id}`)
      .set("Authorization", "testToken")
      .expect(200);
    expect(res.body.data.length).toBe(3);
    expect(res.body.data.every((x) => x.farmer_id === farmer_id)).toBe(true);
  });
  it("returns correct data with multiple queries", async () => {
    const farmer_id = 1215200;
    const type = "flexi_credit";
    const res = await request
      .get(`/api/applications/?farmer_id=${farmer_id}&type=${type}`)
      .set("Authorization", "testToken")
      .expect(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.data.every((x) => x.farmer_id === farmer_id)).toBe(true);
    expect(res.body.data.every((x) => x.type === type)).toBe(true);
  });
  it("returns 404 if no data was found with queries", async () => {
    const farmer_id = 99999999;
    const res = await request
      .get(`/api/applications/?farmer_id=${farmer_id}`)
      .set("Authorization", "testToken")
      .expect(404);
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
      .set("Authorization", "testToken")
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
      .set("Authorization", "testToken")
      .expect(400);
  });
});

describe("DELETE /api/farmer/:id", () => {
  it("deletes a farmer from data.json", async () => {
    const farmerId = 1252257;
    await request
      .delete(`/api/farmers/${farmerId}`)
      .set("Authorization", "testToken")
      .expect(200);
    const farmers = await selectFarmers();
    const indexOfDeletedFarmer = farmers.findIndex((x) => x.id === farmerId);
    expect(indexOfDeletedFarmer).toEqual(-1);
  });
  it("returns 404 if farmer id does not exist", async () => {
    await request
      .delete("/api/farmers/999999")
      .set("Authorization", "testToken")
      .expect(404);
  });
});

describe("PATCH /api/farmers", () => {
  it("adds new farmer to data.json", async () => {
    const farmerId = 1880293;
    const reqBody = {
      id: farmerId,
      name: "test",
      age: 99,
      phone_number: "07777777777",
      farm_id: 99999,
    };
    const res = await request
      .patch(`/api/farmers/${farmerId}`)
      .send(reqBody)
      .set("Authorization", "testToken")
      .expect(200);
    const addedFarmer = res.body;
    const farmers = await selectFarmers();
    const patchedFarmer = farmers.find((x) => x.id === farmerId);
    expect(patchedFarmer).toEqual(reqBody);
  });

  it("returns 400 if request body has been invalidated by schema", async () => {
    const farmerId = 1921858;
    await request
      .patch(`/api/farmers/${farmerId}`)
      .send({
        test: 999,
        test2: "test",
      })
      .set("Authorization", "testToken")
      .expect(400);
  });
  it("returns 404 if farmer id does not exist", async () => {
    const farmerId = 99999;
    const reqBody = {
      id: farmerId,
      name: "test",
      age: 99,
      phone_number: "07777777777",
      farm_id: 99999,
    };
    await request
      .patch(`/api/farmers/${farmerId}`)
      .send(reqBody)
      .set("Authorization", "testToken")
      .expect(404);
  });
});
describe("Pagination tests", () => {
  it("returns paginated data with default page num and limit", async () => {
    const firstFarmer = {
      id: 1945189,
      name: "James Miller",
      age: 54,
      phone_number: "07700900345",
      farm_id: 1535538,
    };
    const res = await request
      .get("/api/farmers")
      .set("Authorization", "testToken")
      .expect(200);
    expect(res.body.data.length).toEqual(30);
    expect(res.body.data[0]).toEqual(firstFarmer);
  });
  it("returns paginated data with queried page and limit", async () => {
    const thirdFarmer = {
      id: 1359197,
      name: "Beatrice Labarge",
      age: 56,
      phone_number: "07700900413",
      farm_id: 1266435,
    };
    const page = 3;
    const limit = 1;
    const res = await request
      .get(`/api/farmers/?page=${page}&limit=${limit}`)
      .set("Authorization", "testToken")
      .expect(200);
    expect(res.body.data.length).toEqual(1);
    expect(res.body.data[0]).toEqual(thirdFarmer);
  });
});
describe("Auth Tests", () => {
  it("Returns data when given correct Auth Header", async () => {
    await request
      .get("/api/farmers")
      .set("Authorization", "testToken")
      .expect(200);
  });
  it("Returns 401 when given incorrect Auth Header", async () => {
    await request
      .get("/api/farmers")
      .set("Authorization", "wrongToken")
      .expect(401);
  });
});
