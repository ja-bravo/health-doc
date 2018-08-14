import * as Datastore from 'nedb';

class Database {
  private store: Datastore;

  constructor() {
    const options = {
      filename: `${process.env.database}/data.db`,
      timestampData: true,
      autoload: true,
    };
    this.store = new Datastore(options);
  }

  find<T>(opts): Promise<T> {
    return new Promise((fulfill, reject) => {
      this.store.find(opts, (err, docs) => {
        if (err) return reject(err);
        return fulfill(docs);
      });
    });
  }

  insert(data, type) {
    return new Promise((fulfill, reject) => {
      this.store.insert({ ...data, type }, (err, doc) => {
        if (err) return reject(err);
        return fulfill(doc);
      });
    });
  }
}

const database = new Database();

export default database;
