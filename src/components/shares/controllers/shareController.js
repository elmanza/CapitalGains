import boom from '@hapi/boom';
import ShareService from "../services/shareService.js";
import { parseJSONArrays } from "../../../utils/functions/_arrays.js";

export default class Share {

  proccesParam(req, res, next){
    try {
      let { operations } = req.query;
      if(!operations) throw new Error('Invalid Query');
      const jsonArrays = parseJSONArrays(operations);
      res.json({response: Share.proccesShares(jsonArrays)});
    } catch (error) {
      return next(boom.badRequest(error));
    }
  }

  proccesPayload(req, res, next){
    try {
      let ops = req.body;
      if(JSON.stringify(ops) === '{}') throw new Error('Invalid Payload');
      res.json({response: Share.proccesShares([ops])});
    } catch (error) {
      return next(boom.badRequest(error));
    }
  }

  static proccesShares(jsonArrays){
    try {
      let response = '';
      jsonArrays.forEach(operations =>{
        let result = new ShareService(operations).procces();
        console.log(result);
        response += JSON.stringify(result);
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}