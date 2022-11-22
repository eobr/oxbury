const supertest = require("supertest");
const { resetData } = require("../data/utils.js");
const server = require("../server");

const request = supertest(server);

afterAll(() => {
  resetData();
});

test("/api", async () => {
  const { body } = await request.get("/api").expect(200);
  expect(body.message).toBe("ok");
});

describe("GET /api/data", () => {
  it("returns data from data.json", () => {
    return request
      .get("/api/data")
      .expect(200)
      .then((res) => {
        expect(res.body.data).toHaveProperty("application");
        expect(res.body.data).toHaveProperty("farmer");
        expect(res.body.data).toHaveProperty("farm");
        expect(res.body.data).toHaveProperty("product");
      });
  });
});
