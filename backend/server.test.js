import request from 'supertest'
import server from './server.js'


describe("POST /api/user/login", () => {
  describe("given a email and password", () => {

    test("should respond with a 200 status code", async () => {
      const response = await request(server).post("/api/user/login").send({
        email: "julfekar.shaikh@graymatrix.com",
        password: "Qwerty@123"
      })
      expect(response.statusCode).toBe(200)
    })
    test("should specify json in the content type header", async () => {
      const response = await request(server).post("/api/user/login").send({
        email: "julfekar.shaikh@graymatrix.com",
        password: "Qwerty@123"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    test("response has email", async () => {
      const response = await request(server).post("/api/user/login").send({
        email: "julfekar.shaikh@graymatrix.com",
        password: "Qwerty@123"
      })
      expect(response.body.email).toBeDefined()
    })
  })

  describe("when the email and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {email: ""},
        {password: ""},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(server).post("/api/user/login").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})