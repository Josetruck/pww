const profiles = require('./profiles.controllers')

test("User1 es la id 1", async () => {
    const data = await profiles.getById(1);
    expect(data.firstname).toBe('user1');
  });

  test("Get by id funciona con string", async () => {
    const data = await profiles.getById("1");
    expect(data.firstname).toBe("user1");
  });

  test("Undefined devuelve null", async () => {
    const data = await profiles.getById(undefined);
    expect(data).toBe(null);
  });
