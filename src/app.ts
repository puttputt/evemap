import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as reflectMetaData from 'reflect-metadata';

import MapRouter from './routes/MapRouter';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.engine('.html', require('ejs').__express);
    this.express.set('views', __dirname + '/views');
    this.express.set('view engine', 'html');
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    this.express.use('/', MapRouter);
  }

}

export default new App().express;