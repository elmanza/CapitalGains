import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./utils/middlewares/index.js";
import { config } from './config/index.js';
import path from "path";
import { fileURLToPath } from 'url';

export default class Server {
  constructor(){
    this.app = express();
    this.settings();
    this.views();
    this.middlewares();
    this.routes();
    this.catchErros();
  }

  settings(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended:true}));
    this.app.use(express.static('./src/public'))
  }

  views(){
    this.app.set("views", "./src/views/ejs");
    this.app.set("view engine", "ejs");
  }

  middlewares(){
    this.app.use(cors('*'));
  }

  routes(){
    this.app.get('/', (req,res,next)=>res.render("index", {}));
    
    routes(this.app);
  }

  catchErros(){
    this.app.use(errorHandler);
    this.app.use(notFound);
  }

  listen(){
    this.app.listen(config.port, () => { console.log(`Server on http://localhost:${config.port}`)})
  }

}