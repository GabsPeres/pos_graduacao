const UserRepository = require("./repository");
const { MongoClient, ObjectId } = require("mongodb");

describe("UserRepository", () => {
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

  afterAll(async () => {
    await client.close();
  });

  beforeEach(async () => {
    await collection.deleteMany({});
  });

  test("Procurar por um usuário", async () => {
    const insertResult = await collection.insertOne({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const user = await repository.find(insertResult.insertedId.toString());

    expect(user).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
    );
  });

  test("Listar todos os usuários", async () => {
    await collection.insertOne({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const users = await repository.findAll();

    expect(users.length).toBe(1);

    expect(users[0]).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
    );
  });

  test("Criar um novo usuário", async () => {
    const user = await repository.create({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    expect(user).toStrictEqual(
      expect.objectContaining({
        name: "Gabriella",
        email: "gabriella@teste.com",
        password: "123456",
      })
    );
  });

  test("Atualizar um usuário", async () => {
    const insertResult = await collection.insertOne({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const userId = insertResult.insertedId.toString();

    const updatedUser = {
      name: "Gabriella Peres",
      email: "gabriellap@teste.com",
      password: "123456789",
    };
    await repository.update(userId, updatedUser);

    const updatedDocument = await repository.find(userId);

    expect(updatedDocument).toStrictEqual(expect.objectContaining(updatedUser));
  });

  test("Remover um usuário", async () => {
    const insertResult = await collection.insertOne({
      name: "Gabriella",
      email: "gabriella@teste.com",
      password: "123456",
    });

    const userId = insertResult.insertedId.toString();

    await repository.delete(userId);

    const deletedDocument = await repository.find(userId);

    expect(deletedDocument).toBeNull();
  });
});
