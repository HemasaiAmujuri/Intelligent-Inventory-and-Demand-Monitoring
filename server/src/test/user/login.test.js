const request = require("supertest");
const app = require("../../../app");


describe("POST api/user/login", () => {
    it("should login with valid input", async() => {
      const res = await request(app)   // send fake http request to app
         .post("/api/user/login")      //check api Url
         .send({                       //sample payload
            email : "sai3@gmail.com",
            password : "1234567890"
         });

         expect(res.statusCode).toBe(200);  //check correct or not
         expect(res.body.message).toBe("Login Successful");
         expect(res.body.success).toBe(true);
    });


    it("should fail if email and password missing", async() => {
        const res = await request(app)
          .post("/api/user/login")
          .send({
             email : "",
             password : ""
          });

          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe("Email and password are required");
          expect(res.body.success).toBe(false)
    });
});