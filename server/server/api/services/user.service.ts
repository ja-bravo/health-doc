import L from '../../common/logger'
import database from '../../common/database';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const type = 'user';
export class UserService {
  async register(user, password): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    const dbUser = await database.insert<{_id}>({user, password: hash}, type);
    const token = jwt.sign({id: dbUser._id}, process.env.SESSION_SECRET);
    return Promise.resolve(token);
  }

  async signIn(user, password): Promise<{token?, error?}> {
    L.info(`Sign in`);
    const dbUser = (await database.find({type, user}))[0];
    if(dbUser && dbUser.password) {
      const result = await bcrypt.compare(password, dbUser.password);
      
      if(result) {
        const token = jwt.sign({id: dbUser._id}, process.env.SESSION_SECRET, {expiresIn: '8h'});
        return Promise.resolve({token});
      }
      else {
        return Promise.resolve({error: 'Not found'});
      }
    }
    return Promise.resolve({error: 'Not found'});
  }
}

export default new UserService();