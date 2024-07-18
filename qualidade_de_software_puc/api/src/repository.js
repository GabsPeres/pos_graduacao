const mongo = require("mongodb");
class UserRepository {
  constructor(collection) {
    this.collection = collection;
  }

  async find(id) {
    return await this.collection.findOne({
      _id: new mongo.ObjectId(id),
    });
  }

  async findAll() {
    const result = await this.collection.find({});
    return result.toArray();
  }

  async create(user) {
    await this.collection.insertOne(user);
    return user;
  }

  async update(id, updatedUser) {
    await this.collection.updateOne(
      { _id: new mongo.ObjectId(id) },
      {
        $set: updatedUser,
      }
    );
    return await this.find(id);
  }

  async delete(id) {
    await this.collection.deleteOne({ _id: new mongo.ObjectId(id) });
  }
}

module.exports = UserRepository;
