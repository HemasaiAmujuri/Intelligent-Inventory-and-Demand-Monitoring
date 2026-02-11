const request = require("supertest");
const app = require("../../../app"); // make sure this points to your Express app

describe("POST /api/user/register", () => {              //group all test cases
  it("should register a user with valid input", async () => {        //first test case  it() is used to define one test case.
    const res = await request(app)  // send fake http request to app
      .post("/api/user/register")   //check api url
      .send({ name: "Demo User",   // sample payload
    email: "demo@example.com",
    mobile: "1234567890",
    password: "demoPass"});

    expect(res.statusCode).toBe(201);     //check correct or not
    expect(res.body.message).toBe("Registered Successfully");    
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty("_id"); // user object returned
  });

  it("should fail if name or email or mobile or password missing", async () => {         //second test case
    const res = await request(app)
      .post("/api/user/register")
      .send({ name: "", email: "", password: "", mobile: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing Required Fields");
    expect(res.body.success).toBe(false);
  });
});
