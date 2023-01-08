const supertest = require('supertest')
const app = require ('./server')
const api = supertest(app)

test("respuesta de la api", async () => {
    await api.get("/Images/1/1672913886188--IMG_20210803_184842.jpg")
    .expect(200)
    .expect('content-type', /image\/jpeg/)
  });