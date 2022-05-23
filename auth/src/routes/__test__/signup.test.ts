import request from "supertest";
import { app } from "../../app";

it("returns a 201 on successful sigup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@teste.com", password: "password" })
    .expect(201);
});
