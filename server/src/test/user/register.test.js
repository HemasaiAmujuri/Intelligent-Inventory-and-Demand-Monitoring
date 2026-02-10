const request = require("supertest");
const app = require("../../../app"); // make sure this points to your Express app

describe("POST /api/user/register", () => {
  it("should register a user with valid input", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({ name: "Demo User",
    email: "demo@example.com",
    mobile: "1234567890",
    password: "demoPass"});

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Registered Successfully");
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id"); // user object returned
  });

  it("should fail if email or password missing", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({ name: "", email: "", password: "", mobile: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing Required Fields");
    expect(res.body.success).toBe(false);
  });
});
