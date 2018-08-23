import * as Datastore from 'nedb';

class Database {
  private store: Datastore;

  constructor() {
    const options = {
      filename: `${process.env.DATABASE}/data.db`,
      timestampData: true,
      autoload: true,
    };
    this.store = new Datastore(options);
  }

  find<T>(opts, sort?, limit?): Promise<T> {
    return new Promise((fulfill, reject) => {
      if (!sort) {
        this.store.find(opts, (err, docs) => {
          if (err) return reject(err);
          return fulfill(docs);
        });
      }
      else {
        let cursor = this.store.find(opts).sort(sort);
        cursor = limit ? cursor.limit(limit) : cursor;

        cursor.exec((err, docs) => {
          if (err) return reject(err);
          return fulfill((docs as any));
        });
      }
    });
  }

  insert<T>(data, type): Promise<T> {
    return new Promise((fulfill, reject) => {
      this.store.insert({ ...data, type }, (err, doc) => {
        if (err) return reject(err);
        return fulfill(doc);
      });
    });
  }

  delete(id, type): Promise<number> {
    return new Promise((fulfill, reject) => {
      this.store.remove({ _id: id, type }, (e, n) => {
        if (e) return reject(e);
        return fulfill(n);
      })
    });
  }

  update(data, type): Promise<any> {
    return new Promise((fulfill, reject) => {
      this.store.update({ _id: data._id, type }, { $set: data }, {}, (e, n, upsert) => {
        if (e) return reject(e);
        return fulfill(n);
      });
    });
  }

  count(opts): Promise<number> {
    return new Promise((fulfill, reject) => {
      this.store.count(opts, (err, docs) => {
        if (err) return reject(err);
        return fulfill(docs);
      });
    });
  }
}

const database = new Database();

export default database;
