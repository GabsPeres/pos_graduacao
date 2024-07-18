const app = require("./app");
const request = require("supertest")(app);
const UserRepository = require("./repository");
const { MongoClient, ObjectId } = require("mongodb");

describe("User API", () => {
  let client;
  let collection;
  let repository;

  beforeAll(async () => {
    const dsn =
      "mongodb://root:root@localhost?retryWrites=true&writeConcern=majority";
    client = new MongoClient(dsn);
    await client.connect();
    collection = client.db("users_db").collection("users");
    repository = new UserRepository(collection);
  });

  afterAll(() => {
    client.close();
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  test("Listar os usuários", async () => {
    await repository.create({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const response = await request
      .get("/users")
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
    );
  });

  test("Detalhar um usuário", async () => {
    const user = await repository.create({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const response = await request
      .get(`/users/${user._id}`)
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
    );
  });

  test("Detalhar um usuário que não existe retorna 404", async () => {
    const response = await request
      .get("/users/0")
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toEqual(404);
    expect(response.body).toStrictEqual({
      error: 404,
      message: "UserNotFound",
    });
  });

  test("Cadastrar um novo usuário em XML deve retornar 400", async () => {
    const response = await request
      .post("/users")
      .set("Content-Type", "application/xml")
      .send(
        "<user><name>Gabriella</name><email>gabriella@teste.com</email><password>123456</password></user>"
      )
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: 400,
      message: "ContentTypeNotSupported",
    });
  });

  test("Cadastrar um novo usuário", async () => {
    const response = await request
      .post("/users")
      .send({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
    );
    expect(response.body.id).not.toBe(undefined);
  });

  test("Editar um usuário existente", async () => {
    const user = await repository.create({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const response = await request
      .put(`/users/${user._id}`)
      .send({
        name: "Gabriella Peres",
        email: "gabriellap@teste.com",
        password: "123456",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella Peres",
        email: "gabriellap@teste.com",
        password: "123456",
      })
    );
  });

  test("Editar um usuário inexistente", async () => {
    const response = await request
      .put("/users/0")
      .send({
        name: "João",
        email: "joao@teste.com",
        password: "123",
      })
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: 404,
      message: "UserNotFound",
    });
  });

  test("Remover um usuário existente", async () => {
    const user = await repository.create({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const response = await request.delete(`/users/${user._id}`);
    expect(response.statusCode).toBe(204);
    expect(response.body).toStrictEqual({});
  });

  test("Remover um usuário inexistente", async () => {
    const response = await request
      .delete("/users/0")
      .expect("Content-Type", /application\/json/);

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: 404,
      message: "UserNotFound",
    });
    expect(response.clientError).toBe(true);
  });
});
