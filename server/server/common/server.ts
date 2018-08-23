import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import l from './logger';
import scheduler from './scheduler';
import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as helmet from 'helmet';
import database from './database';

const app = express();

export default class ExpressServer {
  constructor() {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(cors());
    scheduler.init();

    const opts: any = {};
    opts.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.authScheme = 'Bearer';
    opts.secretOrKey = process.env.SESSION_SECRET;
    opts.issuer = 'HealthDoc';

    passport.use('user', new passportJWT.Strategy(opts, async (jwt, done) => {
      l.info('jwt');
      const user = (await database.find({_id: jwt.id, type: 'user'}))[0];
      if(user) {
        return done(null, user);
      }
      else {
        return done(null,false);
      }
      
    }));

    app.use(passport.initialize());
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  }

  listen(port: number = parseInt(process.env.PORT)): Application {
    const welcome = port => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${port}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}