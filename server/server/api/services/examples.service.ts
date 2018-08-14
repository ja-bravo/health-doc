import L from '../../common/logger'
import database from '../../common/database';

let id = 0;
interface Example {
  id: number,
  name: string
};

const examples: Example[] = [
    { id: id++, name: 'example 0' }, 
    { id: id++, name: 'example 1' }
];

export class ExamplesService {
  all(): Promise<Example[]> {
    L.info(examples, 'fetch all examples');
    database.insert({id: 1, name: 'Project 1'}, 'project');
    return database.find({});
  }

  byId(id: number): Promise<Example> {
    L.info(`fetch example with id ${id}`);
    return this.all().then(r => r[id])
  }

  create(name: string): Promise<Example> {
    L.info(`create example with name ${name}`);
    const example: Example = {
      id: id++,
      name
    };
    examples.push(example)
    return Promise.resolve(example);
  } 
}

export default new ExamplesService();