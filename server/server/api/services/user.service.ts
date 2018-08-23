import L from '../../common/logger'
import database from '../../common/database';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const type = 'user';
export class UserService {
  async register(user, password): Promise<string> {
    L.info('Register')
    const hash = bcrypt.hashSync(password, 10);
    const dbUser = await database.insert<{ _id }>({ user, password: hash }, type);
    const token = jwt.sign({ id: dbUser._id }, process.env.SESSION_SECRET, { expiresIn: '4h', issuer: 'HealthDoc' });
    return Promise.resolve(token);
  }

  async isFirstTime(): Promise<boolean> {
    L.info('Is first time');

    const count = await database.count({ type });
    return Promise.resolve(count == 0);
  }

  async signIn(user, password): Promise<{ token?, error?}> {
    L.info(`Sign in`);
    const dbUser = (await database.find({ type, user }))[0];
    if (dbUser && dbUser.password) {
      const result = bcrypt.compareSync(password, dbUser.password);

      if (result) {
        const token = jwt.sign({ id: dbUser._id }, process.env.SESSION_SECRET, { expiresIn: '4h', issuer: 'HealthDoc' });
        return Promise.resolve({ token });
      }
      else {
        return Promise.resolve({ error: 'Not found' });
      }
    }
    return Promise.resolve({ error: 'Not found' });
  }
}

export default new UserService();