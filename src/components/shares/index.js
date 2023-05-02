import { Router } from "express";
import Share from "./controllers/shareController.js";

export default app =>{
  const router = new Router();
  app.use('/shares', router);
  const share = new Share();
  router.get('/', share.proccesParam);
  router.post('/', share.proccesPayload);
}