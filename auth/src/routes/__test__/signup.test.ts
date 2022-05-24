import request from "supertest";
import { app } from "../../app";

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test.com", password: "password" })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "p" })
    .expect(400);
});

it("returns a 400 with missing email or password", async () => {
  return request(app).post("/api/users/signup").send({}).expect(400);
});

it("disallows duplicated emails ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@teste.com", password: "password" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@teste.com", password: "password" })
    .expect(400);
});

it("returns a 201 on successful sigup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@teste.com", password: "password" })
    .expect(201);
});

it("sets a cookie after a successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@teste.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
